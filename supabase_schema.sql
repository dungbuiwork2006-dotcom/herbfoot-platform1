-- =====================================================================
-- HERBFOOT SECURE DATABASE SCHEMA & ROW LEVEL SECURITY (RLS)
-- =====================================================================

-- 1. BẢNG PHÂN QUYỀN QUẢN TRỊ (ADMIN PROFILES)
CREATE TABLE IF NOT EXISTS admin_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    role VARCHAR(20) DEFAULT 'admin', -- 'admin', 'editor'
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Hàm bảo mật kiểm tra xem người dùng hiện tại có phải là Admin không
CREATE OR REPLACE FUNCTION is_admin() 
RETURNS BOOLEAN 
LANGUAGE plpgsql 
SECURITY DEFINER
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM admin_profiles 
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$;

-- 2. BẢNG LÔ SẢN XUẤT (BATCHES)
CREATE TABLE IF NOT EXISTS batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_code VARCHAR(50) UNIQUE NOT NULL,
    production_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'draft', -- 'draft' (nháp), 'published' (công bố), 'archived'
    qc_status VARCHAR(20) DEFAULT 'PASSED',
    qc_notes TEXT,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. BẢNG NGUYÊN LIỆU THỰC TẾ (BATCH_INGREDIENTS)
CREATE TABLE IF NOT EXISTS batch_ingredients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id UUID NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    supplier_origin VARCHAR(250) NOT NULL,
    standard VARCHAR(100) DEFAULT 'VietGAP',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. BẢNG QUY TRÌNH SẢN XUẤT (BATCH_PROCESS_STEPS)
CREATE TABLE IF NOT EXISTS batch_process_steps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id UUID NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
    step_number VARCHAR(10) NOT NULL,
    phase_name VARCHAR(150) NOT NULL,
    description TEXT,
    quality_checkpoint VARCHAR(200),
    completed_at DATE,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. BẢNG KIỂM SOÁT CHẤT LƯỢNG & TÀI LIỆU MINH CHỨNG (BATCH_QUALITY_RECORDS)
CREATE TABLE IF NOT EXISTS batch_quality_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id UUID NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
    test_category VARCHAR(150) NOT NULL,
    testing_unit VARCHAR(150),
    result_status VARCHAR(50) DEFAULT 'ĐẠT TIÊU CHUẨN',
    certificate_code VARCHAR(100),
    document_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. BẢNG SẢN PHẨM ĐỊNH DANH (PRODUCT_ITEMS)
CREATE TABLE IF NOT EXISTS product_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    serial_number VARCHAR(50) UNIQUE NOT NULL,
    batch_id UUID NOT NULL REFERENCES batches(id) ON DELETE RESTRICT,
    status VARCHAR(20) DEFAULT 'draft', -- 'draft', 'published', 'recalled'
    scan_count INT DEFAULT 0,
    first_scanned_at TIMESTAMPTZ,
    last_scanned_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_products_serial_number ON product_items (serial_number);
CREATE INDEX IF NOT EXISTS idx_products_batch_id ON product_items (batch_id);

-- =====================================================================
-- KÍCH HOẠT BẢO MẬT ROW LEVEL SECURITY (RLS)
-- =====================================================================
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE batch_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE batch_process_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE batch_quality_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_items ENABLE ROW LEVEL SECURITY;

-- 1. CHÍNH SÁCH BẢNG ADMIN_PROFILES:
CREATE POLICY "Admins can view profiles" ON admin_profiles
    FOR SELECT TO authenticated USING (auth.uid() = id OR is_admin());

-- 2. CHÍNH SÁCH BẢNG BATCHES:
-- Khách công khai CHỈ ĐƯỢC XEM (SELECT) lô đã được Quản trị viên duyệt công bố ('published')
CREATE POLICY "Public can view published batches" ON batches
    FOR SELECT TO anon, authenticated
    USING (status = 'published');

-- Quản trị viên có toàn quyền CRUD (INSERT, UPDATE, DELETE, SELECT tất cả kể cả draft)
CREATE POLICY "Admin full access on batches" ON batches
    FOR ALL TO authenticated
    USING (is_admin())
    WITH CHECK (is_admin());

-- 3. CHÍNH SÁCH CHO CÁC BẢNG NGUYÊN LIỆU, QUY TRÌNH, QC:
-- Khách chỉ xem nếu lô liên kết đã ở trạng thái 'published'
CREATE POLICY "Public view ingredients of published batch" ON batch_ingredients
    FOR SELECT TO anon, authenticated
    USING (EXISTS (SELECT 1 FROM batches WHERE batches.id = batch_ingredients.batch_id AND batches.status = 'published'));

CREATE POLICY "Admin full access on ingredients" ON batch_ingredients
    FOR ALL TO authenticated
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "Public view process of published batch" ON batch_process_steps
    FOR SELECT TO anon, authenticated
    USING (EXISTS (SELECT 1 FROM batches WHERE batches.id = batch_process_steps.batch_id AND batches.status = 'published'));

CREATE POLICY "Admin full access on process" ON batch_process_steps
    FOR ALL TO authenticated
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "Public view quality of published batch" ON batch_quality_records
    FOR SELECT TO anon, authenticated
    USING (EXISTS (SELECT 1 FROM batches WHERE batches.id = batch_quality_records.batch_id AND batches.status = 'published'));

CREATE POLICY "Admin full access on quality" ON batch_quality_records
    FOR ALL TO authenticated
    USING (is_admin())
    WITH CHECK (is_admin());

-- 4. CHÍNH SÁCH CHO BẢNG PRODUCT_ITEMS:
-- Khách công khai CHỈ ĐƯỢC XEM sản phẩm có status = 'published' và thuộc lô đã 'published'
CREATE POLICY "Public view published products" ON product_items
    FOR SELECT TO anon, authenticated
    USING (
        status = 'published' AND 
        EXISTS (SELECT 1 FROM batches WHERE batches.id = product_items.batch_id AND batches.status = 'published')
    );

-- Quản trị viên có toàn quyền thêm, cập nhật trạng thái (draft/published/recalled), xóa
CREATE POLICY "Admin full access on products" ON product_items
    FOR ALL TO authenticated
    USING (is_admin())
    WITH CHECK (is_admin());

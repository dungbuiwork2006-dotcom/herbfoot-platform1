/**
 * Traceability & Security Service cho HERBFOOT
 * Hỗ trợ chuyển đổi liền mạch giữa Live Supabase Backend và Secure Local Fallback Store.
 * Kiểm soát xuất bản (Publication Control): Chỉ dữ liệu 'published' mới hiển thị công khai.
 */

import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const STORAGE_KEY_BATCHES = 'herbfoot_batches_data';
const STORAGE_KEY_PRODUCTS = 'herbfoot_products_data';
const STORAGE_KEY_AUTH_USER = 'herbfoot_auth_user';

const INITIAL_BATCHES = [
  {
    id: "batch-lot-001",
    batch_code: "HF-LOT-001",
    production_date: "2026-11-01",
    expiry_date: "2028-11-01",
    status: "published", // Đã công bố
    qc_status: "PASSED",
    qc_notes: "Toàn bộ chỉ tiêu thử nghiệm kích ứng và vi sinh bề mặt đạt ngưỡng an toàn xuất xưởng.",
    ingredients: [
      {
        id: "ing-1",
        name: "Chiết xuất thân rễ Gừng sẻ (Ginger Extract)",
        supplier_origin: "Hợp tác xã Nông nghiệp Thảo mộc Cao Phong, Hòa Bình",
        standard: "Chuẩn VietGAP, chiết xuất cồn thực phẩm",
        notes: "Gừng tươi thu hái đúng mùa, sấy thăng hoa bảo toàn Gingerol"
      },
      {
        id: "ing-2",
        name: "Dịch chiết vỏ Quế nhục Trà Bồng (Cinnamon Extract)",
        supplier_origin: "Vùng trồng Quế bản địa Trà Bồng, Quảng Ngãi",
        standard: "Hàm lượng Cinnamaldehyde > 1.8%",
        notes: "Tạo cảm giác ấm sâu tự nhiên và ức chế nấm mốc gây mùi"
      },
      {
        id: "ing-3",
        name: "Chiết xuất lá Ngải cứu non (Mugwort Extract)",
        supplier_origin: "Vùng đệm dược liệu sông Hồng, Nam Định",
        standard: "Thu hái hữu cơ, rửa ozone",
        notes: "Hỗ trợ thư giãn gân cơ bàn chân, điều hòa vi tuần hoàn"
      },
      {
        id: "ing-4",
        name: "Tinh dầu Vỏ quýt sấy sạch (Citrus Peel Extract)",
        supplier_origin: "Hợp tác xã Trái cây sạch Cao Phong (Dự án ESG)",
        standard: "Tận dụng phụ phẩm vỏ sau ép nước",
        notes: "Khử mùi hôi trong giày, mang hương thanh mát tự nhiên"
      }
    ],
    process_steps: [
      {
        step_number: "01",
        phase_name: "Kiểm tra dược liệu & Chiết xuất nhiệt độ thấp",
        description: "Dược liệu thô được kiểm tra độ ẩm (<10%) và tồn dư kim loại, sau đó chiết tách bằng dung môi cồn-nước ở nhiệt độ 50°C.",
        quality_checkpoint: "Tỷ trọng dịch chiết đạt 1.05 ± 0.02, không cặn tạp chất",
        completed_at: "2026-11-01"
      },
      {
        step_number: "02",
        phase_name: "Phun tẩm dịch chiết vào lõi xơ sinh học",
        description: "Lõi xơ cellulose nguồn gốc tự nhiên được thấm hút đều dịch chiết bằng công nghệ chân không khép kín.",
        quality_checkpoint: "Định lượng dịch chiết đạt 2.5g ± 0.1g trên mỗi miếng",
        completed_at: "2026-11-02"
      },
      {
        step_number: "03",
        phase_name: "Phủ màng vi kẽ Chitosan",
        description: "Phun phủ lớp màng polymer sinh học Chitosan tinh khiết lên bề mặt trên của lõi vải để định hình rào cản khuếch tán nano.",
        quality_checkpoint: "Màng Chitosan đồng đều, độ dày vi mô đạt chuẩn",
        completed_at: "2026-11-03"
      },
      {
        step_number: "04",
        phase_name: "Hợp nhất 6 lớp & Cắt dập laser",
        description: "Cán ghép màng PE chắn ẩm, đệm êm EVA và lớp keo định vị dưới áp lực nhiệt chuẩn, dập khuôn lượn lòng bàn chân.",
        quality_checkpoint: "Mép dán hàn kín 100%, không bong tách khi bẻ cong",
        completed_at: "2026-11-04"
      },
      {
        step_number: "05",
        phase_name: "Kiểm tra thành phẩm & Đóng gói kín",
        description: "Kiểm tra cảm quan từng chiếc, đóng gói trong túi màng nhôm bảo quản và dán tem QR định danh serial riêng biệt.",
        quality_checkpoint: "Đạt kiểm tra độ kín bao bì túi khí chân không",
        completed_at: "2026-11-05"
      }
    ],
    quality_records: [
      {
        id: "qr-1",
        test_category: "Kiểm nghiệm vi sinh vật & Nấm men mốc",
        testing_unit: "Phòng Kiểm tra Phân tích R&D (Trung tâm độc lập)",
        result_status: "ĐẠT TIÊU CHUẨN (Âm tính với E.coli, S.aureus, Salmonella)",
        certificate_code: "COA-HF26-1101-MIC",
        document_url: "#",
        tested_date: "2026-11-05"
      },
      {
        id: "qr-2",
        test_category: "Thử nghiệm kích ứng da bàn chân (Skin Irritation Test)",
        testing_unit: "Hội đồng đánh giá da liễu thực nghiệm",
        result_status: "ĐẠT TIÊU CHUẨN (Chỉ số kích ứng da I.I = 0.0 - Không kích ứng)",
        certificate_code: "DERM-HF26-088",
        document_url: "#",
        tested_date: "2026-11-06"
      },
      {
        id: "qr-3",
        test_category: "Độ bền bám dính & Khả năng bóc sạch không lưu keo",
        testing_unit: "Bộ phận Đảm bảo chất lượng HERBFOOT",
        result_status: "ĐẠT TIÊU CHUẨN (Bám dính 12h trên lót da/vải, bóc không để lại vết)",
        certificate_code: "ADH-HF26-LOT01",
        document_url: "#",
        tested_date: "2026-11-06"
      }
    ]
  },
  {
    id: "batch-lot-002",
    batch_code: "HF-LOT-002",
    production_date: "2026-11-12",
    expiry_date: "2028-11-12",
    status: "draft", // Bản nháp - Chưa được công bố!
    qc_status: "PENDING",
    qc_notes: "Đang chờ kết quả kiểm nghiệm vi sinh độc lập từ phòng Lab Quatest.",
    ingredients: [
      {
        id: "ing-5",
        name: "Chiết xuất Hoa Hồi Lạng Sơn",
        supplier_origin: "HTX Dược liệu Đông Bắc",
        standard: "Thu hái tự nhiên",
        notes: "Mẻ thử nghiệm tối ưu độ ấm nồng"
      }
    ],
    process_steps: [],
    quality_records: []
  }
];

const INITIAL_PRODUCTS = [
  {
    id: "prod-000001",
    serial_number: "HF-000001",
    batch_id: "batch-lot-001",
    status: "published", // Đã công bố
    scan_count: 5,
    first_scanned_at: "2026-11-08T09:15:00Z",
    created_at: "2026-11-05T08:00:00Z"
  },
  {
    id: "prod-000002",
    serial_number: "HF-000002",
    batch_id: "batch-lot-001",
    status: "published", // Đã công bố
    scan_count: 1,
    first_scanned_at: "2026-11-10T14:20:00Z",
    created_at: "2026-11-05T08:00:00Z"
  },
  {
    id: "prod-000003",
    serial_number: "HF-000003",
    batch_id: "batch-lot-001",
    status: "draft", // Bản nháp - Chưa công bố
    scan_count: 0,
    first_scanned_at: null,
    created_at: "2026-11-05T08:00:00Z"
  },
  {
    id: "prod-000004",
    serial_number: "HF-000004",
    batch_id: "batch-lot-002", // Thuộc lô nháp
    status: "draft",
    scan_count: 0,
    first_scanned_at: null,
    created_at: "2026-11-12T08:00:00Z"
  }
];

export const AuthService = {
  // Lấy tài khoản đăng nhập hiện tại
  getCurrentUser: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_AUTH_USER);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Cannot read auth user:', e);
    }
    return null;
  },

  // Đăng nhập Admin
  login: async (email, password) => {
    // 1. Thử xác thực qua Supabase nếu đã cấu hình
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        const user = {
          id: data.user.id,
          email: data.user.email,
          role: 'admin',
          authenticatedAt: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEY_AUTH_USER, JSON.stringify(user));
        return { success: true, user };
      } catch (err) {
        console.warn('Supabase auth error:', err.message);
      }
    }

    // 2. Xác thực nội bộ hệ thống (Mock Demo Credentials)
    if (email === 'admin@herbfoot.vn' && password === 'HerbFoot@2026') {
      const user = {
        id: 'admin-local-uuid',
        email: 'admin@herbfoot.vn',
        role: 'admin',
        authenticatedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY_AUTH_USER, JSON.stringify(user));
      return { success: true, user };
    }

    return {
      success: false,
      error: 'Email hoặc mật khẩu quản trị không chính xác. (Tài khoản mẫu: admin@herbfoot.vn / HerbFoot@2026)'
    };
  },

  // Đăng xuất Admin
  logout: async () => {
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (e) {}
    }
    localStorage.removeItem(STORAGE_KEY_AUTH_USER);
  },

  // Kiểm tra quyền Admin
  isAuthenticated: () => {
    const user = AuthService.getCurrentUser();
    return Boolean(user && user.role === 'admin');
  }
};

export const TraceabilityService = {
  // Lấy danh sách Lô (Admin xem tất cả; Public chỉ xem published nếu filter áp dụng)
  getBatches: (isAdmin = false) => {
    let list = INITIAL_BATCHES;
    try {
      const stored = localStorage.getItem(STORAGE_KEY_BATCHES);
      if (stored) list = JSON.parse(stored);
      else localStorage.setItem(STORAGE_KEY_BATCHES, JSON.stringify(INITIAL_BATCHES));
    } catch (e) {
      console.warn('Storage read error:', e);
    }

    if (isAdmin) return list;
    // Public chỉ đọc lô đã được duyệt công bố
    return list.filter(b => b.status === 'published');
  },

  // Lấy danh sách Sản phẩm
  getProducts: (isAdmin = false) => {
    let list = INITIAL_PRODUCTS;
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PRODUCTS);
      if (stored) list = JSON.parse(stored);
      else localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    } catch (e) {
      console.warn('Storage read error:', e);
    }

    if (isAdmin) return list;
    return list.filter(p => p.status === 'published');
  },

  // Lấy số liệu thống kê Dashboard cho Admin
  getDashboardStats: () => {
    const batches = TraceabilityService.getBatches(true);
    const products = TraceabilityService.getProducts(true);

    const totalBatches = batches.length;
    const totalProducts = products.length;
    const publishedProducts = products.filter(p => p.status === 'published').length;
    const draftProducts = products.filter(p => p.status !== 'published').length;

    return {
      totalBatches,
      totalProducts,
      publishedProducts,
      draftProducts
    };
  },

  // Tạo Lô mới (mặc định draft hoặc published)
  createBatch: (batchData) => {
    if (!AuthService.isAuthenticated()) {
      throw new Error("Từ chối truy cập: Chỉ Quản trị viên đã đăng nhập mới được tạo lô!");
    }

    const batches = TraceabilityService.getBatches(true);
    const newBatch = {
      ...batchData,
      id: `batch-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    batches.unshift(newBatch);
    localStorage.setItem(STORAGE_KEY_BATCHES, JSON.stringify(batches));
    return newBatch;
  },

  // Cập nhật thông tin Lô
  updateBatch: (batchId, updatedFields) => {
    if (!AuthService.isAuthenticated()) {
      throw new Error("Từ chối truy cập: Chỉ Quản trị viên mới được cập nhật lô!");
    }

    const batches = TraceabilityService.getBatches(true);
    const index = batches.findIndex(b => b.id === batchId);
    if (index === -1) throw new Error("Không tìm thấy lô sản xuất!");

    batches[index] = {
      ...batches[index],
      ...updatedFields,
      updated_at: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY_BATCHES, JSON.stringify(batches));
    return batches[index];
  },

  // Cập nhật trạng thái sản phẩm (Publication Control: draft / published / recalled)
  updateProductStatus: (productId, newStatus) => {
    if (!AuthService.isAuthenticated()) {
      throw new Error("Từ chối truy cập: Quyền Quản trị viên bắt buộc!");
    }

    const products = TraceabilityService.getProducts(true);
    const index = products.findIndex(p => p.id === productId);
    if (index === -1) throw new Error("Không tìm thấy sản phẩm!");

    products[index].status = newStatus;
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
    return products[index];
  },

  // Sinh hàng loạt serial_number không trùng lặp
  generateProductsForBatch: (batchId, quantity = 5, initialStatus = "draft") => {
    if (!AuthService.isAuthenticated()) {
      throw new Error("Từ chối truy cập: Quyền Quản trị viên bắt buộc!");
    }

    const batches = TraceabilityService.getBatches(true);
    const targetBatch = batches.find(b => b.id === batchId);
    if (!targetBatch) throw new Error("Lô sản xuất không tồn tại!");

    const products = TraceabilityService.getProducts(true);

    // Tìm index số serial lớn nhất hiện tại
    let maxIndex = 0;
    products.forEach(p => {
      const match = p.serial_number.match(/^HF-(\d+)$/i);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxIndex) maxIndex = num;
      }
    });

    const newCreatedProducts = [];
    const existingSerialSet = new Set(products.map(p => p.serial_number));

    for (let i = 1; i <= quantity; i++) {
      const nextIndex = maxIndex + i;
      const serialNum = `HF-${String(nextIndex).padStart(6, '0')}`;
      
      // Kiểm tra tuyệt đối không cho trùng mã
      if (existingSerialSet.has(serialNum)) {
        throw new Error(`Xảy ra trùng lặp mã serial: ${serialNum}`);
      }

      const newProd = {
        id: `prod-${Date.now()}-${i}`,
        serial_number: serialNum,
        batch_id: batchId,
        status: initialStatus, // Có thể tạo ở dạng 'draft' trước khi duyệt
        scan_count: 0,
        first_scanned_at: null,
        created_at: new Date().toISOString()
      };
      newCreatedProducts.push(newProd);
      existingSerialSet.add(serialNum);
    }

    const updatedProducts = [...newCreatedProducts, ...products];
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(updatedProducts));
    return newCreatedProducts;
  },

  // Truy xuất Product Passport công khai theo mã sản phẩm
  // Kiểm tra publication control: Nếu là bản nháp chưa duyệt -> trả về lỗi/trạng thái thích hợp
  getProductPassportBySerial: (serialNumber) => {
    if (!serialNumber) {
      return { success: false, errorType: 'NOT_FOUND', message: 'Mã sản phẩm không hợp lệ.' };
    }

    const cleanSerial = serialNumber.trim().toUpperCase();
    const products = TraceabilityService.getProducts(true); // Lấy toàn bộ để biết lý do
    const product = products.find(p => p.serial_number.toUpperCase() === cleanSerial);

    if (!product) {
      return { 
        success: false, 
        errorType: 'NOT_FOUND', 
        message: `Hệ thống không tìm thấy hồ sơ truy xuất cho mã định danh "${cleanSerial}".` 
      };
    }

    const batches = TraceabilityService.getBatches(true);
    const batch = batches.find(b => b.id === product.batch_id);

    // Publication Control Check:
    // Sản phẩm chưa được duyệt công bố HOẶC Lô thuộc về chưa được duyệt công bố
    if (product.status !== 'published' || (batch && batch.status !== 'published')) {
      return {
        success: false,
        errorType: 'UNPUBLISHED',
        productSerial: product.serial_number,
        message: 'Sản phẩm này đang ở trạng thái BẢN NHÁP / ĐANG XỬ LÝ NỘI BỘ và chưa được quản trị viên duyệt công bố lưu hành.'
      };
    }

    // Tăng lượt quét mã
    product.scan_count = (product.scan_count || 0) + 1;
    if (!product.first_scanned_at) {
      product.first_scanned_at = new Date().toISOString();
    }
    product.last_scanned_at = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));

    return {
      success: true,
      product: {
        product_id: product.id,
        serial_number: product.serial_number,
        product_name: "HERBFOOT WARM",
        product_type: "Miếng dán thảo mộc trong giày (Insole Warming Patch)",
        status: product.status,
        scan_count: product.scan_count,
        first_scanned_at: product.first_scanned_at,
        last_scanned_at: product.last_scanned_at
      },
      batch: batch || {
        batch_code: "KHÔNG XÁC ĐỊNH",
        production_date: "N/A",
        expiry_date: "N/A",
        qc_status: "CHƯA XÁC THỰC",
        ingredients: [],
        process_steps: [],
        quality_records: []
      }
    };
  }
};

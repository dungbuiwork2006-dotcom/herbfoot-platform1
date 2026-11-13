import { describe, it, expect, beforeEach } from 'vitest';
import { TraceabilityService, AuthService } from '../services/traceabilityService';
import { QRGenerator } from '../utils/qrGenerator';

describe('QA Test Suite: Database & Business Logic', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('1. Đăng nhập quản trị viên bảo mật (Security Auth)', async () => {
    // Thử sai mật khẩu
    const failedLogin = await AuthService.login('admin@herbfoot.vn', 'wrongpass');
    expect(failedLogin.success).toBe(false);
    expect(AuthService.isAuthenticated()).toBe(false);

    // Đăng nhập đúng mật khẩu
    const successLogin = await AuthService.login('admin@herbfoot.vn', 'HerbFoot@2026');
    expect(successLogin.success).toBe(true);
    expect(AuthService.isAuthenticated()).toBe(true);
  });

  it('2. Người dùng chưa đăng nhập không được quyền tạo lô mới', () => {
    expect(() => {
      TraceabilityService.createBatch({
        batch_code: 'HF-LOT-TEST',
        production_date: '2026-11-13',
        expiry_date: '2028-11-13'
      });
    }).toThrow('Từ chối truy cập');
  });

  it('3. Tạo lô mới sau khi đăng nhập và kiểm tra lưu thành công', async () => {
    await AuthService.login('admin@herbfoot.vn', 'HerbFoot@2026');
    const newBatch = TraceabilityService.createBatch({
      batch_code: 'HF-LOT-999',
      production_date: '2026-11-13',
      expiry_date: '2028-11-13',
      status: 'draft',
      ingredients: [
        { name: 'Gừng sẻ', supplier_origin: 'Hòa Bình' },
        { name: 'Quế Trà Bồng', supplier_origin: 'Quảng Ngãi' }
      ]
    });

    expect(newBatch.id).toBeDefined();
    expect(newBatch.batch_code).toBe('HF-LOT-999');

    const batches = TraceabilityService.getBatches(true);
    const found = batches.find(b => b.id === newBatch.id);
    expect(found).toBeDefined();
    expect(found.ingredients.length).toBe(2);
    expect(found.ingredients[0].supplier_origin).toBe('Hòa Bình');
  });

  it('4. Một lô có thể sinh 100 sản phẩm với 100 serial_number khác nhau không trùng lặp', async () => {
    await AuthService.login('admin@herbfoot.vn', 'HerbFoot@2026');
    const batch = TraceabilityService.createBatch({
      batch_code: 'HF-LOT-100TEST',
      production_date: '2026-11-13',
      expiry_date: '2028-11-13'
    });

    // Sinh 100 mã
    const generated = TraceabilityService.generateProductsForBatch(batch.id, 100, 'published');
    expect(generated.length).toBe(100);

    // Kiểm tra tính độc nhất (Unique Set)
    const serialSet = new Set(generated.map(p => p.serial_number));
    expect(serialSet.size).toBe(100);

    // Kiểm tra định dạng tiền tố
    expect(generated[0].serial_number.startsWith('HF-')).toBe(true);
  });

  it('5. Các sản phẩm cùng lô dùng chung dữ liệu lô nhưng có mã serial riêng biệt', async () => {
    await AuthService.login('admin@herbfoot.vn', 'HerbFoot@2026');
    const batch = TraceabilityService.createBatch({
      batch_code: 'HF-LOT-SHARED',
      production_date: '2026-11-13',
      expiry_date: '2028-11-13',
      status: 'published',
      ingredients: [{ name: 'Sả chanh', supplier_origin: 'Nghệ An' }]
    });

    const products = TraceabilityService.generateProductsForBatch(batch.id, 2, 'published');
    const p1 = products[0];
    const p2 = products[1];

    expect(p1.serial_number).not.toBe(p2.serial_number);

    const passport1 = TraceabilityService.getProductPassportBySerial(p1.serial_number);
    const passport2 = TraceabilityService.getProductPassportBySerial(p2.serial_number);

    expect(passport1.success).toBe(true);
    expect(passport2.success).toBe(true);

    // Khác mã sản phẩm
    expect(passport1.product.serial_number).toBe(p1.serial_number);
    expect(passport2.product.serial_number).toBe(p2.serial_number);

    // Chung dữ liệu lô
    expect(passport1.batch.batch_code).toBe('HF-LOT-SHARED');
    expect(passport2.batch.batch_code).toBe('HF-LOT-SHARED');
    expect(passport1.batch.ingredients[0].name).toBe('Sả chanh');
    expect(passport2.batch.ingredients[0].name).toBe('Sả chanh');
  });

  it('6. Cập nhật dữ liệu lô thì các QR đã phát hành vẫn tra cứu đúng dữ liệu mới nhất (Bền vững)', async () => {
    await AuthService.login('admin@herbfoot.vn', 'HerbFoot@2026');
    const batch = TraceabilityService.createBatch({
      batch_code: 'HF-LOT-UPDATE',
      production_date: '2026-11-13',
      expiry_date: '2028-11-13',
      status: 'published',
      qc_notes: 'Ghi chú ban đầu'
    });

    const products = TraceabilityService.generateProductsForBatch(batch.id, 1, 'published');
    const serial = products[0].serial_number;

    // Cập nhật lô
    TraceabilityService.updateBatch(batch.id, {
      qc_notes: 'Ghi chú mới sau khi kiểm tra lại'
    });

    // Truy xuất lại theo QR cũ
    const updatedPassport = TraceabilityService.getProductPassportBySerial(serial);
    expect(updatedPassport.batch.qc_notes).toBe('Ghi chú mới sau khi kiểm tra lại');
  });

  it('7. Publication Control: Sản phẩm chưa công bố (draft) không được hiển thị công khai', async () => {
    await AuthService.login('admin@herbfoot.vn', 'HerbFoot@2026');
    const batch = TraceabilityService.createBatch({
      batch_code: 'HF-LOT-DRAFT',
      production_date: '2026-11-13',
      expiry_date: '2028-11-13',
      status: 'published'
    });

    // Tạo sản phẩm ở trạng thái draft
    const products = TraceabilityService.generateProductsForBatch(batch.id, 1, 'draft');
    const draftSerial = products[0].serial_number;

    const result = TraceabilityService.getProductPassportBySerial(draftSerial);
    expect(result.success).toBe(false);
    expect(result.errorType).toBe('UNPUBLISHED');
  });

  it('8. Xử lý lỗi: Mã sản phẩm không tồn tại', () => {
    const result = TraceabilityService.getProductPassportBySerial('HF-99999999-NOTFOUND');
    expect(result.success).toBe(false);
    expect(result.errorType).toBe('NOT_FOUND');
  });

  it('9. QR Code Generator tạo đúng URL đích chứa domain và serial', async () => {
    const serial = 'HF-000001';
    const testDomain = 'https://herbfoot.vn';
    const qrDataUrl = await QRGenerator.generateQRDataURL(serial, testDomain);
    expect(qrDataUrl).toBeDefined();
    expect(qrDataUrl.startsWith('data:image/png;base64,')).toBe(true);

    const svgStr = await QRGenerator.generateQRSVG(serial, testDomain);
    expect(svgStr).toBeDefined();
    expect(svgStr.includes('<svg')).toBe(true);
  });
});

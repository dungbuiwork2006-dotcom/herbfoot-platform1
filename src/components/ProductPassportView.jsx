import React, { useEffect, useState } from 'react';
import { TraceabilityService } from '../services/traceabilityService';
import { PRODUCT_LAYERS } from '../data/herbfootContent';
import { 
  ShieldCheck, 
  Calendar, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Leaf, 
  QrCode, 
  Sparkles, 
  ArrowLeft,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Clock,
  WifiOff
} from 'lucide-react';

export default function ProductPassportView({ serialNumber, onBackToHome }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeLayerTab, setActiveLayerTab] = useState(2);

  useEffect(() => {
    setLoading(true);
    try {
      const res = TraceabilityService.getProductPassportBySerial(serialNumber);
      setData(res);
    } catch (e) {
      setData({ success: false, errorType: 'DB_ERROR', message: 'Lỗi kết nối cơ sở dữ liệu: ' + e.message });
    } finally {
      setLoading(false);
    }
  }, [serialNumber]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF9F5] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 border-4 border-[#2D4A3E] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-sm font-medium text-[#4D6151]">Đang truy xuất hồ sơ điện tử sản phẩm...</p>
      </div>
    );
  }

  // 1. Xử lý Lỗi: Sản phẩm chưa công bố (Publication Control)
  if (data && !data.success && data.errorType === 'UNPUBLISHED') {
    return (
      <div className="min-h-screen bg-[#FBF9F5] flex flex-col items-center justify-center p-6 text-center">
        <div className="p-8 max-w-md bg-white rounded-3xl border-2 border-[#E7D4B2] shadow-xl space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#FFF5DC] text-[#9A6B1A] flex items-center justify-center">
            <Clock className="w-8 h-8 text-[#9A6B1A]" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#FFF0CD] text-[#7A5412]">
            Hồ sơ chưa công bố
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#1E3125]">
            Sản phẩm đang được xử lý nội bộ
          </h2>
          <p className="text-xs text-[#5D6F60] leading-relaxed">
            Mã sản phẩm <strong>"{data.productSerial || serialNumber}"</strong> hiện đang ở trạng thái <em>bản nháp nội bộ</em> hoặc thuộc lô sản xuất đang trong quá trình nghiệm thu. Hồ sơ sẽ tự động hiển thị công khai ngay sau khi được Quản trị viên duyệt công bố.
          </p>
          <button
            onClick={onBackToHome}
            className="w-full py-3 px-6 rounded-xl bg-[#2D4A3E] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#1E332B] transition-colors"
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  // 2. Xử lý Lỗi: Mất kết nối DB hoặc lỗi hệ thống
  if (data && !data.success && data.errorType === 'DB_ERROR') {
    return (
      <div className="min-h-screen bg-[#FBF9F5] flex flex-col items-center justify-center p-6 text-center">
        <div className="p-8 max-w-md bg-white rounded-3xl border border-[#DFD5C2] shadow-xl space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#F3F4F6] text-[#4B5563] flex items-center justify-center">
            <WifiOff className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#1E3125]">
            Mất kết nối máy chủ
          </h2>
          <p className="text-xs text-[#5D6F60] leading-relaxed">
            Hệ thống không thể tải dữ liệu lô sản xuất lúc này. Vui lòng kiểm tra lại kết nối mạng hoặc thử lại sau vài giây.
          </p>
          <button
            onClick={onBackToHome}
            className="w-full py-3 px-6 rounded-xl bg-[#2D4A3E] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#1E332B] transition-colors"
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  // 3. Xử lý Lỗi: Mã không tồn tại
  if (!data || !data.success || !data.product) {
    return (
      <div className="min-h-screen bg-[#FBF9F5] flex flex-col items-center justify-center p-6 text-center">
        <div className="p-8 max-w-md bg-white rounded-3xl border border-[#DFD5C2] shadow-xl space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#FCE8E6] text-[#C53030] flex items-center justify-center">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#1E3125]">
            Mã sản phẩm không tồn tại
          </h2>
          <p className="text-xs text-[#5D6F60] leading-relaxed">
            Hệ thống không tìm thấy hồ sơ truy xuất cho mã định danh <strong>"{serialNumber}"</strong>. Vui lòng kiểm tra lại tem QR trên vỏ hộp hoặc liên hệ hỗ trợ khách hàng.
          </p>
          <button
            onClick={onBackToHome}
            className="w-full py-3 px-6 rounded-xl bg-[#2D4A3E] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#1E332B] transition-colors"
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  const { product, batch } = data;

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#243324] pb-20">
      
      {/* Top Mobile-First Brand Bar */}
      <div className="sticky top-0 z-30 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#E5DAC8] px-4 py-3 flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#2D4A3E] hover:text-[#192D23] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về trang chủ</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#2D4A3E] flex items-center justify-center text-white">
            <Leaf className="w-3.5 h-3.5 text-[#CBE2C8]" />
          </div>
          <span className="font-serif font-bold text-sm tracking-wider uppercase text-[#1E3125]">
            HERBFOOT
          </span>
        </div>

        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-[#E2EDE0] text-[#244E33] font-semibold">
          PASSPORT
        </span>
      </div>

      <div className="max-w-3xl mx-auto px-4 pt-6 space-y-6">

        {/* 1. Header Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-b from-[#2D4A3E] to-[#1C3229] text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#8BB887]/20 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase font-mono tracking-widest text-[#BBDAB5] bg-white/10 px-3 py-1 rounded-full border border-white/10">
                Official Digital Product Passport
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[#A8D4A2] font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#75C482]" />
                ĐÃ XÁC THỰC LƯU HÀNH
              </span>
            </div>

            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
                {product.product_name}
              </h1>
              <p className="text-xs text-[#CFE0CC] mt-1 font-light">
                {product.product_type}
              </p>
            </div>

            {/* Serial & Batch Identification */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
                <span className="text-[10px] uppercase tracking-wider text-[#A7C8A3] block font-mono">
                  Mã sản phẩm (Serial)
                </span>
                <span className="text-lg font-mono font-bold text-white tracking-wide">
                  {product.serial_number}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
                <span className="text-[10px] uppercase tracking-wider text-[#A7C8A3] block font-mono">
                  Mã Lô sản xuất (Batch ID)
                </span>
                <span className="text-lg font-mono font-bold text-white tracking-wide">
                  {batch.batch_code}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#A6C4A2] pt-1 border-t border-white/10">
              <span>Lượt quét mã: <strong>{product.scan_count} lần</strong></span>
              {product.scan_count > 10 && (
                <span className="text-[#FBBF24] font-semibold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Chú ý số lượt quét cao
                </span>
              )}
              <span>Lần đầu: {product.first_scanned_at ? new Date(product.first_scanned_at).toLocaleDateString('vi-VN') : 'Mới khởi tạo'}</span>
            </div>
          </div>
        </div>

        {/* 2. Dates Card */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-white border border-[#DDD3BF] space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#687C6B] block">Ngày sản xuất</span>
            <div className="flex items-center gap-2 text-sm font-bold text-[#1E3125]">
              <Calendar className="w-4 h-4 text-[#3C6450]" />
              <span>{batch.production_date}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#DDD3BF] space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#687C6B] block">Hạn sử dụng</span>
            <div className="flex items-center gap-2 text-sm font-bold text-[#1E3125]">
              <Calendar className="w-4 h-4 text-[#3C6450]" />
              <span>{batch.expiry_date}</span>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-[#E6EFE3] border border-[#C6DCBF] space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#234A31] block">Trạng thái QC</span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#19592F]">
              <CheckCircle2 className="w-4 h-4 text-[#2E7D47]" />
              <span>{batch.qc_status}</span>
            </div>
          </div>
        </div>

        {/* 3. Actual Ingredients (Xử lý trường hợp thiếu dữ liệu nguyên liệu) */}
        <div className="p-6 rounded-3xl bg-white border border-[#DDD3C0] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#EDE4D5] pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#355B46] bg-[#E5EDE2] px-2.5 py-0.5 rounded-md">
                Minh bạch thành phần thực tế
              </span>
              <h2 className="font-serif text-xl font-bold text-[#1E3125] mt-1">
                Nguyên liệu thực tế của lô {batch.batch_code}
              </h2>
            </div>
            <span className="text-xs text-[#708472] font-mono">
              {batch.ingredients?.length || 0} thành phần
            </span>
          </div>

          {(!batch.ingredients || batch.ingredients.length === 0) ? (
            <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#DFD6C3] text-xs text-[#768778] italic text-center">
              Chưa có thông tin nguyên liệu chi tiết cho lô sản xuất này.
            </div>
          ) : (
            <div className="space-y-3">
              {batch.ingredients.map((ing, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E5DAC7] space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-bold text-[#1E3125] flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#2D4A3E] text-white text-[10px] flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      {ing.name}
                    </h3>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-[#E2EDE0] text-[#285038] shrink-0">
                      {ing.standard}
                    </span>
                  </div>

                  <div className="text-xs text-[#4F6051] space-y-1 pl-7">
                    <div>
                      <strong className="text-[#203326]">Nguồn gốc & Nhà cung ứng công khai:</strong> {ing.supplier_origin}
                    </div>
                    {ing.notes && (
                      <div className="text-[#6C7E6E] italic text-[11px]">
                        * {ing.notes}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 4. Production Journey */}
        <div className="p-6 rounded-3xl bg-white border border-[#DDD3C0] shadow-xs space-y-4">
          <div className="border-b border-[#EDE4D5] pb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#355B46] bg-[#E5EDE2] px-2.5 py-0.5 rounded-md">
              Hành trình chế tác
            </span>
            <h2 className="font-serif text-xl font-bold text-[#1E3125] mt-1">
              Quy trình sản xuất thực tế của lô
            </h2>
          </div>

          <div className="space-y-4">
            {batch.process_steps?.map((step, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF8F3] border border-[#E5DAC7]">
                <div className="w-10 h-10 rounded-xl bg-[#2D4A3E] text-white flex flex-col items-center justify-center shrink-0">
                  <span className="text-[8px] uppercase tracking-wider text-[#B2D4AF]">Bước</span>
                  <span className="text-xs font-bold leading-none">{step.step_number}</span>
                </div>

                <div className="flex-1 space-y-1.5 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-bold text-sm text-[#1E3125]">
                      {step.phase_name}
                    </h3>
                    {step.completed_at && (
                      <span className="text-[10px] font-mono text-[#788B7B]">
                        Hoàn thành: {step.completed_at}
                      </span>
                    )}
                  </div>
                  <p className="text-[#516253] leading-relaxed">
                    {step.description}
                  </p>
                  <div className="pt-1 text-[#2B4B38] font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3C6450] shrink-0" />
                    <span>Nghiệm thu: {step.quality_checkpoint}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Product Structure (Interactive 6 Layers) */}
        <div className="p-6 rounded-3xl bg-white border border-[#DDD3C0] shadow-xs space-y-4">
          <div className="border-b border-[#EDE4D5] pb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#355B46] bg-[#E5EDE2] px-2.5 py-0.5 rounded-md">
              Cấu tạo vật lý
            </span>
            <h2 className="font-serif text-xl font-bold text-[#1E3125] mt-1">
              Cấu trúc 6 tầng của miếng dán HERBFOOT WARM
            </h2>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {PRODUCT_LAYERS.map(l => (
              <button
                key={l.layerNumber}
                onClick={() => setActiveLayerTab(l.layerNumber)}
                className={`py-2 px-1 rounded-xl text-center text-xs font-semibold transition-all border ${
                  activeLayerTab === l.layerNumber
                    ? 'bg-[#2D4A3E] text-white border-[#1E332B] shadow-xs'
                    : 'bg-[#FAF8F3] text-[#4F6051] border-[#DFD6C3] hover:bg-white'
                }`}
              >
                Lớp {l.layerNumber}
              </button>
            ))}
          </div>

          {(() => {
            const current = PRODUCT_LAYERS.find(l => l.layerNumber === activeLayerTab) || PRODUCT_LAYERS[0];
            return (
              <div className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#DFD6C3] space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-base font-bold text-[#1E3125]">
                    {current.name}
                  </h3>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-[#E5EDE2] text-[#2F523E]">
                    {current.highlight}
                  </span>
                </div>
                <div className="text-xs text-[#4F6051] space-y-1.5">
                  <p><strong>Vật liệu:</strong> {current.material}</p>
                  <p><strong>Vai trò trong sản phẩm:</strong> {current.role}</p>
                </div>
              </div>
            );
          })()}
        </div>

        {/* 6. Quality Assurance & Documents */}
        <div className="p-6 rounded-3xl bg-white border border-[#DDD3C0] shadow-xs space-y-4">
          <div className="border-b border-[#EDE4D5] pb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#355B46] bg-[#E5EDE2] px-2.5 py-0.5 rounded-md">
              Bằng chứng số công khai
            </span>
            <h2 className="font-serif text-xl font-bold text-[#1E3125] mt-1">
              Kết quả kiểm tra chất lượng & Báo cáo minh chứng
            </h2>
          </div>

          <div className="space-y-3">
            {batch.quality_records?.map((qr, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E2D7C4] space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-sm font-bold text-[#1E3125]">
                    {qr.test_category}
                  </h3>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-[#E1EDE0] text-[#1E5C32] self-start sm:self-auto">
                    {qr.result_status.includes('ĐẠT') ? 'ĐẠT CHUẨN' : qr.result_status}
                  </span>
                </div>

                <div className="text-xs text-[#526354] space-y-1">
                  <p><strong>Đơn vị thực hiện:</strong> {qr.testing_unit}</p>
                  <p className="text-[11px] text-[#2E4A37]">
                    <strong>Kết quả:</strong> {qr.result_status}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#EAE0D0] flex items-center justify-between text-[11px]">
                  <span className="font-mono text-[#718473]">
                    Mã hồ sơ: {qr.certificate_code}
                  </span>
                  <span className="text-[#355C47] font-semibold flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" /> Minh chứng công khai
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FFFBF0] border border-[#E5D7B7] text-[11px] text-[#786438] italic">
            * Dữ liệu minh chứng trên được đối chiếu theo thời gian thực từ cơ sở dữ liệu kiểm nghiệm của HERBFOOT.
          </div>
        </div>

      </div>

    </div>
  );
}

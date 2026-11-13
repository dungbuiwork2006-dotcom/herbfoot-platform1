import React from 'react';
import { X, QrCode, ShieldCheck, Calendar, Layers, CheckCircle2, AlertTriangle, FileText, ArrowLeft, ExternalLink } from 'lucide-react';
import { PRODUCT_LAYERS } from '../data/herbfootContent';

export default function ProductPassportModal({ serialCode, onClose }) {
  // Dữ liệu mô phỏng theo đúng kiến trúc DB đã thiết kế
  const demoData = {
    serialCode: serialCode || "HF-0001",
    scanCount: 3,
    status: "published",
    isActive: true,
    batch: {
      batchCode: "BATCH-202611-01",
      manufacturingDate: "05/11/2026",
      expiryDate: "05/11/2028",
      qcStatus: "PASSED",
      qcInspector: "Phòng Kiểm tra Chất lượng HERBFOOT (Demo)",
      actualIngredients: [
        { name: "Chiết xuất Gừng sẻ tự nhiên", origin: "Hòa Bình", ratioNote: "Dược liệu VietGAP đã kiểm nghiệm tồn dư" },
        { name: "Chiết xuất Quế Trà Bồng", origin: "Quảng Ngãi", ratioNote: "Hàm lượng Cinnamaldehyde chuẩn hóa" },
        { name: "Chiết xuất Ngải cứu đồng bằng", origin: "Hưng Yên", ratioNote: "Thu hái tươi, sấy chân không" },
        { name: "Tinh dầu Vỏ quýt sấy sạch", origin: "Hòa Bình (Phụ phẩm ESG)", ratioNote: "Tái chế tuần hoàn sạch" }
      ],
      processCheckpoints: [
        { step: "Chiết tách dịch chiết", result: "Đạt độ nhớt & nồng độ chất khô chuẩn" },
        { step: "Thấm tẩm lõi xơ sinh học", result: "Độ dàn trải đồng đều 99.2%" },
        { step: "Phủ màng Chitosan", result: "Độ dày màng nano đạt ngưỡng thiết kế" },
        { step: "Cán ghép 6 tầng & Cắt khuôn", result: "Mép dán kín, lực bóc tách đạt chuẩn" },
        { step: "Đóng gói túi màng chắn ẩm", result: "Độ kín chân không đạt tiêu chuẩn" }
      ],
      publicDocuments: [
        { title: "Phiếu kiểm tra chỉ tiêu vi sinh vật lô sản xuất (Demo)", code: "COA-2026-0891" },
        { title: "Báo cáo thử nghiệm độ kích ứng da người tình nguyện (Demo)", code: "STR-2026-012" }
      ]
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FBF9F5] rounded-3xl border-2 border-[#D8CCB8] shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-[#2D4A3E] text-[#F3EFE6] px-6 py-4 flex items-center justify-between border-b border-[#3B6151] shrink-0">
          <div className="flex items-center gap-2.5">
            <QrCode className="w-5 h-5 text-[#BBD6B4]" />
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#B5D4AF] block">
                Digital Product Passport (Thử nghiệm)
              </span>
              <h2 className="font-serif text-lg font-bold text-white leading-tight">
                Hồ Sơ Điện Tử: {demoData.serialCode}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#20362D] hover:bg-[#15251F] text-[#B5C7B7] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* Demo Data Disclaimer Badge */}
          <div className="p-3 rounded-xl bg-[#FFF9E6] border border-[#E8D49E] flex items-center gap-2.5 text-xs text-[#7A6126]">
            <AlertTriangle className="w-4 h-4 shrink-0 text-[#8C702E]" />
            <span>
              <strong>Ghi chú:</strong> Đây là giao diện hiển thị mẫu của trang <code>/product/:serialCode</code>. Dữ liệu mang tính mô phỏng thiết kế hệ thống.
            </span>
          </div>

          {/* Top Status & Verification Badge */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#F4EFE6] border border-[#DDD3BF] space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#6D7F6F] block">Mã sản phẩm (Serial)</span>
              <span className="text-base font-bold font-mono text-[#1E3125]">{demoData.serialCode}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F4EFE6] border border-[#DDD3BF] space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#6D7F6F] block">Mã Lô (Batch ID)</span>
              <span className="text-base font-bold font-mono text-[#1E3125]">{demoData.batch.batchCode}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#E2EDE0] border border-[#C5DDC2] space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#2A4937] block">Kiểm định chất lượng</span>
              <span className="text-sm font-bold text-[#1C5E33] flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> ĐẠT TIÊU CHUẨN
              </span>
            </div>
          </div>

          {/* Dates & Validity */}
          <div className="flex flex-wrap items-center justify-between p-4 rounded-2xl bg-white border border-[#E0D7C5] text-xs text-[#4F6051] gap-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#3C6350]" />
              <span>Ngày sản xuất: <strong>{demoData.batch.manufacturingDate}</strong></span>
            </div>
            <div>
              <span>Hạn sử dụng: <strong>{demoData.batch.expiryDate}</strong></span>
            </div>
            <div className="text-[#788879]">
              <span>Lượt quét mã: <strong>{demoData.scanCount} lần</strong></span>
            </div>
          </div>

          {/* Actual Ingredients of this Specific Batch */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-base font-bold text-[#1E3125]">
                1. Nguyên liệu thực tế sử dụng trong lô này
              </h4>
              <span className="text-[10px] text-[#718474] uppercase tracking-wider font-mono">
                {demoData.batch.actualIngredients.length} thành phần thực tế
              </span>
            </div>

            <div className="space-y-2">
              {demoData.batch.actualIngredients.map((ing, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white border border-[#DFD6C3] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-[#1F3326] block">{ing.name}</span>
                    <span className="text-[#687C6B] text-[11px]">{ing.ratioNote}</span>
                  </div>
                  <span className="text-[11px] px-2.5 py-1 rounded-md bg-[#EBF2E8] text-[#2F523E] font-medium shrink-0">
                    {ing.origin}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quality & Process Checkpoints */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-[#1E3125]">
              2. Kết quả kiểm tra công đoạn sản xuất
            </h4>
            <div className="p-4 rounded-2xl bg-[#F6F2E8] border border-[#DCD1BC] space-y-2 text-xs">
              {demoData.batch.processCheckpoints.map((cp, idx) => (
                <div key={idx} className="flex items-start justify-between gap-4 border-b border-[#E6DCC9] pb-1.5 last:border-0 last:pb-0">
                  <span className="text-[#4E5E50]">{cp.step}</span>
                  <span className="font-semibold text-[#254131] text-right flex items-center gap-1 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#356349]" /> {cp.result}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Public Documents & Certificates */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-[#1E3125]">
              3. Tài liệu kiểm nghiệm công khai
            </h4>
            <div className="space-y-2">
              {demoData.batch.publicDocuments.map((doc, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white border border-[#DDD3C0] flex items-center justify-between text-xs hover:border-[#2D4A3E] transition-colors cursor-pointer">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#355B46]" />
                    <span className="font-medium text-[#203326]">{doc.title}</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#718473] flex items-center gap-1">
                    {doc.code} <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-[#EFE9DD] px-6 py-4 flex items-center justify-between border-t border-[#DFD5C2] shrink-0">
          <span className="text-[11px] text-[#697A6B]">
            Hệ thống xác thực minh bạch HERBFOOT Traceability
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold bg-[#2D4A3E] text-white rounded-xl hover:bg-[#1E332B] transition-colors"
          >
            Đóng hồ sơ
          </button>
        </div>

      </div>
    </div>
  );
}

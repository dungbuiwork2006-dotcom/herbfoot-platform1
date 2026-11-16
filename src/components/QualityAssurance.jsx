import React from 'react';
import { QUALITY_STANDARDS } from '../data/herbfootContent';
import { ShieldCheck, FileText, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export default function QualityAssurance() {
  return (
    <section id="qa" className="py-20 bg-[#F4EFE6]/70 border-b border-[#E8DFD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E3125]">
            Hệ thống kiểm soát chất lượng (Quality Assurance)
          </h2>
          <p className="text-[#59695B] text-base leading-relaxed">
            Danh mục các chỉ tiêu kỹ thuật được theo dõi nghiêm ngặt. Chúng tôi chỉ công bố kết quả khi đã có dữ liệu thực tế được đo lường chính xác.
          </p>
        </div>

        {/* Honest Data Banner */}
        <div className="mb-12 p-4 rounded-2xl bg-[#F6EEDF] border border-[#DECFB5] max-w-4xl mx-auto flex items-center gap-3 text-xs text-[#6B5A34]">
          <AlertTriangle className="w-5 h-5 text-[#8A7132] shrink-0" />
          <span>
            <strong>Nguyên tắc đạo đức nghiên cứu:</strong> Dự án không tự bịa các số liệu chứng nhận phòng lab (như ISO, FDA, CE) khi chưa có văn bản công nhận chính thức từ cơ quan thẩm quyền.
          </span>
        </div>

        {/* Standards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {QUALITY_STANDARDS.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-8 rounded-3xl bg-[#FAF8F3] border border-[#DDD3BF] shadow-xs space-y-4 hover:border-[#A2C2A6] transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-serif text-lg font-bold text-[#1E3125] leading-snug">
                  {item.category}
                </h3>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase shrink-0 bg-[#E8EFE3] text-[#2E543E] border border-[#CCDBC4]">
                  {item.status.includes('Đã') ? 'Đã nghiệm thu' : 'Đang thử nghiệm'}
                </span>
              </div>

              <div className="text-xs text-[#526354] leading-relaxed">
                <strong className="text-[#23382A] block mb-1">Mục đích kiểm soát:</strong>
                {item.purpose}
              </div>

              <div className="p-3.5 rounded-xl bg-white/70 border border-[#E3D9C7] space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#677A6A] flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#355B46]" />
                  Tài liệu minh chứng dự kiến:
                </span>
                <p className="text-xs text-[#3B4D3F] italic">
                  {item.evidence}
                </p>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#718273] pt-1">
                <Clock className="w-3.5 h-3.5 text-[#3C644F]" />
                <span>Trạng thái hồ sơ: <strong>{item.status}</strong></span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

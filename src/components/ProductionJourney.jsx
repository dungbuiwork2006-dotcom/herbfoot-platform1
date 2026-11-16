import React from 'react';
import { PRODUCTION_TIMELINE } from '../data/herbfootContent';
import { CheckCircle2, Factory, FileCheck, ArrowDown } from 'lucide-react';

export default function ProductionJourney() {
  return (
    <section id="process" className="py-20 bg-[#FBF9F5] border-b border-[#E8DFD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E3125]">
            Hành trình 5 giai đoạn sản xuất HERBFOOT WARM
          </h2>
          <p className="text-[#566658] text-base leading-relaxed">
            Quy trình sản xuất khép kín từ khâu tiếp nhận dược liệu thô đến khi kích hoạt tem QR truy xuất định danh độc nhất cho từng sản phẩm.
          </p>
        </div>

        {/* 5-Stage Timeline Vertical / Stepper */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Connecting Line */}
          <div className="hidden md:block absolute left-8 top-8 bottom-8 w-0.5 bg-[#D8CCB7]"></div>

          <div className="space-y-8">
            {PRODUCTION_TIMELINE.map((step, idx) => (
              <div key={step.step} className="relative flex flex-col md:flex-row items-start gap-6 group">
                
                {/* Step Indicator Badge */}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-[#2D4A3E] text-[#F3EFE6] flex flex-col items-center justify-center shrink-0 border-4 border-[#FBF9F5] shadow-md group-hover:bg-[#1E332B] transition-colors">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#A4C4A0]">Giai đoạn</span>
                  <span className="font-serif text-xl font-bold leading-none">{step.step}</span>
                </div>

                {/* Step Content Card */}
                <div className="flex-1 p-6 sm:p-8 rounded-3xl bg-[#FAF7F0] border border-[#DDD3BF] group-hover:border-[#9EBCA1] transition-all shadow-xs space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8DDCB] pb-3">
                    <span className="text-xs uppercase tracking-wider font-bold text-[#3B624D]">
                      {step.phase}
                    </span>
                    <span className="text-[11px] font-mono text-[#748777] bg-[#EAE2D3] px-2.5 py-1 rounded-md">
                      Mục kiểm soát: {step.step}/05
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#1E3125]">
                    {step.title}
                  </h3>

                  <p className="text-sm text-[#4E6050] leading-relaxed">
                    {step.description}
                  </p>

                  <div className="pt-3 border-t border-[#E8DDCB] flex items-center gap-2 text-xs text-[#2A4434]">
                    <CheckCircle2 className="w-4 h-4 text-[#3C6450] shrink-0" />
                    <span><strong>Tiêu chuẩn nghiệm thu:</strong> {step.standard}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Traceability Connection Callout */}
        <div className="mt-16 p-6 rounded-3xl bg-[#EBE4D5] border border-[#D5C6AF] max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-lg font-bold text-[#1E3125]">
              Mọi công đoạn đều được ghi nhận vào hồ sơ lô
            </h4>
            <p className="text-xs text-[#556657]">
              Thông số ngày sản xuất, hạn sử dụng và kết quả QC từng mẻ đều được liên kết tự động tới mã QR trên bao bì.
            </p>
          </div>
          <a
            href="#passport-quick"
            className="px-5 py-2.5 text-xs font-semibold bg-[#2D4A3E] text-white rounded-full hover:bg-[#1E332B] transition-colors shrink-0"
          >
            Xem mẫu Product Passport
          </a>
        </div>

      </div>
    </section>
  );
}

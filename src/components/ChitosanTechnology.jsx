import React from 'react';
import { Sparkles, Shield, Cpu, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';

export default function ChitosanTechnology() {
  return (
    <section id="chitosan" className="py-20 bg-[#F4EFE6]/60 border-b border-[#E8DFD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E3125]">
            Công nghệ màng sinh học Chitosan
          </h2>
          <p className="text-[#59695B] text-base leading-relaxed">
            Khai thác tiềm năng của polymer sinh học tự nhiên có nguồn gốc từ vỏ giáp xác, hướng tới kiểm soát giải phóng hoạt chất và tạo rào chắn bảo vệ lõi thảo dược.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Scientific Info & Explanations */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="p-6 rounded-3xl bg-[#FAF8F2] border border-[#DDD3BF] space-y-3">
              <h3 className="font-serif text-xl font-bold text-[#1E3125] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#385E4B]" />
                Chitosan là gì?
              </h3>
              <p className="text-sm text-[#506152] leading-relaxed">
                Chitosan là một polymer sinh học mạch thẳng tự nhiên, được điều chế thông qua quá trình khử acetyl của chitin (thành phần chính trong vỏ tôm, cua, phụ phẩm ngành chế biến thủy sản). Chitosan nổi bật với đặc tính tương thích sinh học cao, tự phân hủy sinh học và có hoạt tính kháng vi sinh vật tự nhiên nhờ nhóm amin tích điện dương.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm uppercase tracking-wider font-bold text-[#355744]">
                Định hướng ứng dụng trong cấu trúc HERBFOOT WARM:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-[#DFD5C2] space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1E3125]">
                    <Shield className="w-4 h-4 text-[#385E4B]" />
                    <span>Lớp màng điều biến (Controlled Release)</span>
                  </div>
                  <p className="text-xs text-[#58695A] leading-relaxed">
                    Định hướng phủ màng Chitosan lên bề mặt lõi vải nhằm điều tiết tốc độ bay hơi của tinh dầu gừng, quế, giúp hơi ấm và hương thơm tỏa đều từ 6-8 tiếng thay vì bốc hơi nhanh.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#DFD5C2] space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1E3125]">
                    <RefreshCw className="w-4 h-4 text-[#385E4B]" />
                    <span>Hỗ trợ hạn chế vi khuẩn gây mùi</span>
                  </div>
                  <p className="text-xs text-[#58695A] leading-relaxed">
                    Khảo sát tiềm năng ức chế vi sinh vật kỵ khí trong môi trường giày kín thông qua tương tác điện tích giữa chuỗi Chitosan và màng tế bào vi khuẩn.
                  </p>
                </div>
              </div>
            </div>

            {/* Scientific Ethics Disclaimer */}
            <div className="p-4 rounded-2xl bg-[#FFFBF0] border border-[#E8D7B7] flex items-start gap-3 text-xs text-[#786438]">
              <AlertCircle className="w-5 h-5 shrink-0 text-[#8C7436] mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-[#57441B] block">Nguyên tắc công bố khoa học trung thực:</span>
                <p>
                  HERBFOOT <strong>không khẳng định hiệu quả kháng khuẩn 100% hoặc an toàn tuyệt đối</strong> khi các chỉ số chưa hoàn tất toàn bộ chu kỳ thử nghiệm lâm sàng độc lập. Mọi tác động kháng khuẩn nêu trên đều ở mức độ định hướng nghiên cứu và báo cáo thử nghiệm phòng thí nghiệm nội bộ.
                </p>
              </div>
            </div>

          </div>

          {/* Conceptual Bio-membrane Graphic */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-3xl bg-linear-to-b from-[#2D4A3E] to-[#1C3229] text-[#F3EFE6] border-2 border-[#527764] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#8AA888]/20 rounded-full blur-2xl"></div>

              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#B8D4B4] bg-[#22392F] px-2.5 py-1 rounded-md">
                    Chitosan Bio-matrix
                  </span>
                  <span className="w-3 h-3 rounded-full bg-[#75C482] animate-pulse"></span>
                </div>

                <div className="space-y-2">
                  <h4 className="font-serif text-2xl font-bold text-white">
                    Cơ chế Màng Vi Kẽ
                  </h4>
                  <p className="text-xs text-[#C7DAC5] leading-relaxed">
                    Mạng lưới polymer tạo thành các kênh khuếch tán nano siêu vi:
                  </p>
                </div>

                {/* Simplified visual model */}
                <div className="p-5 rounded-2xl bg-[#182C24] border border-[#3E6350] space-y-3 font-mono text-[11px]">
                  <div className="flex items-center justify-between text-[#8EAF8B]">
                    <span>[Mặt trên]</span>
                    <span>Thoát hơi ấm dịu</span>
                  </div>
                  <div className="h-2 rounded-full bg-linear-to-r from-[#6A9A80] via-[#A8CDB4] to-[#6A9A80] opacity-80"></div>
                  <div className="text-center text-[#BBD2B8] text-[10px]">
                    Lớp phủ Chitosan siêu mỏng
                  </div>
                  <div className="h-6 rounded-lg bg-[#305041] border border-dashed border-[#577E6A] flex items-center justify-center text-[10px] text-[#DCECE0]">
                    Lõi ngậm dịch chiết thảo mộc tự nhiên
                  </div>
                </div>

                <div className="space-y-2 text-xs text-[#BFD6BC]">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#8CB589]" />
                    <span>Nguồn gốc tái chế từ phụ phẩm thủy sản</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#8CB589]" />
                    <span>Phân hủy tự nhiên, không ô nhiễm vi nhựa</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

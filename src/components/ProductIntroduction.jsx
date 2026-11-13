import React from 'react';
import { Flame, ShieldCheck, Wind, Clock, Check, AlertCircle } from 'lucide-react';

export default function ProductIntroduction() {
  const steps = [
    {
      num: "01",
      title: "Làm sạch lót giày",
      desc: "Lau sạch bụi bẩn và đảm bảo mặt trong hoặc lót giày khô ráo trước khi dán."
    },
    {
      num: "02",
      title: "Bóc lớp giấy bảo vệ",
      desc: "Nhẹ nhàng gỡ lớp giấy lót phủ keo acrylic phía mặt dưới của miếng dán."
    },
    {
      num: "03",
      title: "Dán cố định vào giày",
      desc: "Đặt miếng dán vào vị trí nửa trước hoặc hõm bàn chân bên trong giày, ấn miết nhẹ."
    },
    {
      num: "04",
      title: "Tận hưởng cảm giác ấm dịu",
      desc: "Đi tất/vớ bình thường và xỏ giày. Hương thơm thảo mộc và hơi ấm sẽ tỏa nhẹ nhàng."
    }
  ];

  return (
    <section id="product" className="py-20 bg-[#FBF9F5] border-b border-[#EAE1D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#5C705F] font-semibold bg-[#EAE2D3] px-3.5 py-1.5 rounded-full border border-[#D8CEBC]">
            Giải pháp chuyên biệt
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E3125]">
            HERBFOOT WARM – Miếng dán thảo mộc trong giày
          </h2>
          <p className="text-[#566658] text-base leading-relaxed">
            Thiết kế giải phẫu học mỏng nhẹ, vừa vặn không gây cộm, phối hợp tác động kép: Giữ ấm thảo dược & Kiểm soát môi trường vi mô bên trong giày.
          </p>
        </div>

        {/* Feature Grid & Visual Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Visual Presentation */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="p-8 sm:p-10 rounded-3xl bg-linear-to-br from-[#EFEAE0] via-[#FAF7F0] to-[#E3DAC8] border border-[#DDD3BF] shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#95B291]/20 rounded-full blur-2xl"></div>
              
              <div className="space-y-6 relative z-10">
                <div className="inline-block px-3 py-1 rounded-md bg-[#2D4A3E] text-[#F3EFE6] text-xs font-semibold tracking-wide">
                  Quy cách: Cặp 2 miếng / Túi chống ẩm
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E3125]">
                  Thiết kế siêu mỏng 1.8mm, không làm chật cỡ giày
                </h3>

                <p className="text-sm text-[#4E5E50] leading-relaxed">
                  HERBFOOT WARM được thiết kế để đặt vừa vặn ngay dưới phần đệm trước hoặc hõm gan bàn chân. Độ dày tinh gọn kết hợp lớp đệm EVA đàn hồi nhẹ giúp bạn bước đi tự nhiên như không mang miếng dán phụ trợ.
                </p>

                {/* Expected Benefits */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#3D6652] text-[#F3EFE6] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm text-[#273B2E]">
                      <strong>Ấm dịu sinh lý:</strong> Tác động nhiệt độ ôn hòa từ tinh dầu gừng, quế, không gây bỏng rát hay nóng gắt như hóa chất tổng hợp.
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#3D6652] text-[#F3EFE6] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm text-[#273B2E]">
                      <strong>Khử mùi & Hút ẩm:</strong> Màng sinh học Chitosan và tinh chất thảo dược giúp hạn chế mùi hôi chân đặc trưng khi đi giày nhiều giờ.
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#3D6652] text-[#F3EFE6] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm text-[#273B2E]">
                      <strong>Thư giãn cơ bắp:</strong> Hương thảo dược tự nhiên xoa dịu đôi chân mỏi sau các buổi tập luyện hoặc ca trực dài.
                    </span>
                  </div>
                </div>

                {/* Important notice */}
                <div className="p-3.5 rounded-xl bg-[#FAF6EC] border border-[#D5C6AA] flex items-start gap-2.5 text-xs text-[#7A6B48]">
                  <AlertCircle className="w-4 h-4 shrink-0 text-[#8C7536] mt-0.5" />
                  <span>
                    * Lưu ý: Sản phẩm là miếng dán chăm sóc tiện ích hỗ trợ ngoài da, không thay thế các liệu pháp điều trị bệnh lý y khoa.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* How to use */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#667768] font-bold">
                Hướng dẫn sử dụng
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#1E3125]">
                Bốn bước đơn giản để sưởi ấm đôi chân
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {steps.map((s) => (
                <div key={s.num} className="p-5 rounded-2xl bg-[#F6F2E9] border border-[#E0D5C3] space-y-2 hover:border-[#ADC2A5] transition-all">
                  <span className="font-serif text-2xl font-bold text-[#2D4A3E]">
                    {s.num}
                  </span>
                  <h4 className="text-sm font-semibold text-[#1F3327]">
                    {s.title}
                  </h4>
                  <p className="text-xs text-[#58685A] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-[#EBE4D5] border border-[#D6C9B3] text-xs text-[#4F5E52] space-y-1">
              <p className="font-semibold text-[#1F3327]">Khuyến nghị thời gian:</p>
              <p>Mỗi miếng dán duy trì hiệu quả tỏa hương ấm dịu tối ưu trong khoảng 6 - 8 giờ liên tục. Khuyên dùng một lần trong ngày và thay mới sau mỗi chu kỳ mang giày dài.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

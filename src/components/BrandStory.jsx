
import React from 'react';
import {
  Lightbulb,
  Target,
  Footprints,
  Leaf,
  ShieldCheck
} from 'lucide-react';

export default function BrandStory() {
  return (
    <section
      id="story"
      className="py-20 bg-[#E8EDE3] border-b border-[#D5DFD0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#5C705F] font-semibold bg-[#E4DDD0] px-3.5 py-1.5 rounded-full border border-[#D5CBB9]">
            Khởi Nguồn & Sứ Mệnh
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E3125] font-normal leading-tight">
            Từ nỗi niềm của những đôi chân lạnh trong giày kín đến giải pháp thảo mộc bản địa
          </h2>

          <p className="text-[#59695B] text-base leading-relaxed">
            Chúng tôi tin rằng sự thoải mái thực sự bắt đầu từ nền tảng
            vững chãi nhất của cơ thể: đôi bàn chân.
          </p>
        </div>

        {/* Main Botanical Image */}
        <div className="relative mb-14 overflow-hidden rounded-[2rem] border border-[#DFD5C2] shadow-sm">
          <img
            src="/Herbal Foot Care in Harmony.png"
            alt="HERBFOOT - Chăm sóc bàn chân hài hòa cùng thảo mộc"
            className="w-full h-[280px] sm:h-[380px] lg:h-[440px] object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#1E3125]/65 via-[#1E3125]/20 to-transparent" />

          <div className="absolute inset-y-0 left-0 flex flex-col justify-center p-8 sm:p-12 lg:p-16 max-w-2xl">
            <span className="text-[#E8DCC2] text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold mb-4">
              HERBFOOT · Botanical Innovation
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white leading-snug mb-4">
              Hài hòa giữa tinh hoa thảo mộc và công nghệ sinh học
            </h3>

            <p className="text-white/85 text-sm sm:text-base leading-relaxed max-w-lg">
              Từ nguồn nguyên liệu thực vật bản địa đến giải pháp chăm sóc
              bàn chân hiện đại, HERBFOOT hướng tới sự thoải mái và minh bạch
              trong từng sản phẩm.
            </p>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Pillar 1: The Problem */}
          <div className="p-8 rounded-3xl bg-[#FBF9F5] border border-[#DFD5C2] shadow-sm flex flex-col justify-between hover:border-[#B5C7AE] hover:shadow-md transition-all duration-300">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EBE3D3] flex items-center justify-center">
                <Footprints className="w-6 h-6 text-[#2D4A3E]" />
              </div>

              <span className="text-[11px] font-bold uppercase tracking-wider text-[#798A7B]">
                Vấn đề nhóm nhận diện
              </span>

              <h3 className="font-serif text-xl font-bold text-[#1E3125]">
                Đôi chân lạnh, bí bách & mồ hôi trong giày
              </h3>

              <p className="text-sm text-[#546456] leading-relaxed">
                Người làm việc văn phòng, nhân viên đứng liên tục nhiều giờ,
                hoặc người di chuyển trong mùa lạnh thường xuyên gặp tình
                trạng lạnh bàn chân, bí khí, kèm theo cảm giác ê mỏi và mùi
                hôi khó chịu khi mang giày bít kín.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#EDE5D6] text-xs text-[#708072] italic">
              "Sự thoải mái của đôi chân là một phần quan trọng trong
              trải nghiệm vận động mỗi ngày."
            </div>
          </div>

          {/* Pillar 2: The Idea */}
          <div className="p-8 rounded-3xl bg-[#FBF9F5] border border-[#DFD5C2] shadow-sm flex flex-col justify-between hover:border-[#B5C7AE] hover:shadow-md transition-all duration-300">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E2ECE0] flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-[#2D4A3E]" />
              </div>

              <span className="text-[11px] font-bold uppercase tracking-wider text-[#798A7B]">
                Ý tưởng hình thành
              </span>

              <h3 className="font-serif text-xl font-bold text-[#1E3125]">
                Giao thoa giữa dược liệu cổ truyền & màng sinh học
              </h3>

              <p className="text-sm text-[#546456] leading-relaxed">
                Thay vì dùng các chất làm ấm hóa học nhân tạo hoặc hương
                liệu che phủ mùi tạm bợ, HERBFOOT lựa chọn khai thác dịch
                chiết thảo mộc Việt như Gừng, Quế, Ngải cứu, kết hợp cùng
                công nghệ màng sinh học Chitosan.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#EDE5D6] text-xs text-[#708072] italic">
              "Tận dụng nguồn thảo dược bản địa kết hợp tri thức vật liệu
              sinh học hiện đại."
            </div>
          </div>

          {/* Pillar 3: Brand Value */}
          <div className="p-8 rounded-3xl bg-[#FBF9F5] border border-[#DFD5C2] shadow-sm flex flex-col justify-between hover:border-[#B5C7AE] hover:shadow-md transition-all duration-300">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EBE3D3] flex items-center justify-center">
                <Target className="w-6 h-6 text-[#2D4A3E]" />
              </div>

              <span className="text-[11px] font-bold uppercase tracking-wider text-[#798A7B]">
                Giá trị HERBFOOT cam kết
              </span>

              <h3 className="font-serif text-xl font-bold text-[#1E3125]">
                Chân thực, an toàn & trách nhiệm sinh thái
              </h3>

              <p className="text-sm text-[#546456] leading-relaxed">
                HERBFOOT hướng tới sự minh bạch trong thông tin nguyên liệu,
                quy trình chế tạo và kết quả kiểm nghiệm. Hệ sinh thái tem
                định danh Product Passport giúp người dùng có thể truy xuất
                thông tin sản phẩm một cách thuận tiện.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#EDE5D6] text-xs text-[#708072] italic">
              "Minh bạch nguồn gốc là nền tảng cho niềm tin vào sản phẩm."
            </div>
          </div>

        </div>

        {/* Closing Statement */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          <Leaf className="w-5 h-5 text-[#71866D]" />

          <p className="text-sm text-[#59695B] font-medium">
            HERBFOOT – Kết nối thảo mộc bản địa, công nghệ sinh học và
            giá trị bền vững.
          </p>

          <ShieldCheck className="w-5 h-5 text-[#71866D]" />
        </div>

      </div>
    </section>
  );
}

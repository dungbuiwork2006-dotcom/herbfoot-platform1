import React from 'react';
import { Compass, Lightbulb, Target, Sparkles, Footprints, ShieldAlert } from 'lucide-react';

export default function BrandStory() {
  return (
    <section id="story" className="py-20 bg-[#F4EFE6]/60 border-b border-[#EAE1D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#5C705F] font-semibold bg-[#E4DDD0] px-3.5 py-1.5 rounded-full border border-[#D5CBB9]">
            Khởi Nguồn & Sứ Mệnh
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E3125] font-normal leading-tight">
            Từ nỗi niềm của những đôi chân lạnh trong giày kín đến giải pháp thảo mộc bản địa
          </h2>
          <p className="text-[#59695B] text-base leading-relaxed">
            Chúng tôi tin rằng sự thoải mái thực sự bắt đầu từ nền tảng vững chãi nhất của cơ thể: đôi bàn chân.
          </p>
        </div>

        {/* 3 Core Pillars of Brand Story */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1: The Problem */}
          <div className="p-8 rounded-3xl bg-[#FBF9F5] border border-[#DFD5C2] shadow-sm flex flex-col justify-between hover:border-[#B5C7AE] transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EBE3D3] flex items-center justify-center text-[#2D4A3E]">
                <Footprints className="w-6 h-6 text-[#2D4A3E]" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#798A7B]">
                Vấn đề nhóm nhận diện
              </span>
              <h3 className="font-serif text-xl font-bold text-[#1E3125]">
                Đôi chân lạnh, bí bách & mồ hôi trong giày
              </h3>
              <p className="text-sm text-[#546456] leading-relaxed">
                Người làm việc văn phòng, nhân viên đứng liên tục nhiều giờ, hoặc người di chuyển trong mùa lạnh thường xuyên gặp tình trạng lạnh cóng bàn chân, bí khí, kèm theo cảm giác ê mỏi và mùi hôi khó chịu khi mang giày bít kín.
              </p>
            </div>
            <div className="pt-6 border-t border-[#EDE5D6] text-xs text-[#708072] italic">
              "Bàn chân chứa hơn 7.000 đầu mút dây thần kinh và nhiều huyệt đạo liên quan mật thiết tới sức khỏe tổng thể."
            </div>
          </div>

          {/* Pillar 2: The Idea */}
          <div className="p-8 rounded-3xl bg-[#FBF9F5] border border-[#DFD5C2] shadow-sm flex flex-col justify-between hover:border-[#B5C7AE] transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E2ECE0] flex items-center justify-center text-[#2D4A3E]">
                <Lightbulb className="w-6 h-6 text-[#2D4A3E]" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#798A7B]">
                Ý tưởng hình thành
              </span>
              <h3 className="font-serif text-xl font-bold text-[#1E3125]">
                Giao thoa giữa dược liệu cổ truyền & màng sinh học
              </h3>
              <p className="text-sm text-[#546456] leading-relaxed">
                Thay vì dùng các chất làm ấm hóa học nhân tạo hoặc hương liệu che phủ mùi tạm bợ, HERBFOOT chọn con đường khai thác dịch chiết thảo mộc Việt (Gừng, Quế, Ngải cứu...) phối hợp cùng công nghệ màng sinh học Chitosan để duy trì độ ấm dịu và kiểm soát ẩm tự nhiên.
              </p>
            </div>
            <div className="pt-6 border-t border-[#EDE5D6] text-xs text-[#708072] italic">
              "Tận dụng sức mạnh thảo dược dân tộc kết hợp tri thức vật liệu sinh thái hiện đại."
            </div>
          </div>

          {/* Pillar 3: Brand Value */}
          <div className="p-8 rounded-3xl bg-[#FBF9F5] border border-[#DFD5C2] shadow-sm flex flex-col justify-between hover:border-[#B5C7AE] transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EBE3D3] flex items-center justify-center text-[#2D4A3E]">
                <Target className="w-6 h-6 text-[#2D4A3E]" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#798A7B]">
                Giá trị HERBFOOT cam kết
              </span>
              <h3 className="font-serif text-xl font-bold text-[#1E3125]">
                Chân thực, an toàn & trách nhiệm sinh thái
              </h3>
              <p className="text-sm text-[#546456] leading-relaxed">
                Chúng tôi không đưa ra những lời hứa thần kỳ vượt quá khoa học. Mọi thông tin về nguyên liệu, quy trình chế tạo và bằng chứng thử nghiệm đều được công khai minh bạch qua hệ sinh thái tem định danh Product Passport.
              </p>
            </div>
            <div className="pt-6 border-t border-[#EDE5D6] text-xs text-[#708072] italic">
              "Minh bạch nguồn gốc là lời khẳng định danh dự của người làm sản phẩm tự nhiên."
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

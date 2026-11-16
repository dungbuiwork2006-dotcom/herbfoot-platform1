import React, { useState } from 'react';
import { RESEARCH_INGREDIENTS } from '../data/herbfootContent';
import { Info, Sparkles, AlertTriangle, Layers, MapPin, Tag } from 'lucide-react';

export default function BotanicalIngredients() {
  const [selectedIngredient, setSelectedIngredient] = useState(RESEARCH_INGREDIENTS[0]);

  return (
    <section id="ingredients" className="py-20 bg-[#F4EFE6]/80 border-b border-[#E8DFD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E3125]">
            Hệ thực vật bản địa trong đề tài nghiên cứu
          </h2>
          <p className="text-[#59695B] text-base leading-relaxed">
            Danh mục 8 loại thảo dược tự nhiên được đội ngũ R&D khảo sát và thử nghiệm chiết xuất nhằm tìm kiếm công thức ấm dịu tối ưu cho lòng bàn chân.
          </p>
        </div>

        {/* Clear Disclaimers & Distinction Notice */}
        <div className="mb-10 p-5 rounded-2xl bg-[#FFFBF2] border-2 border-[#E7D6B5] shadow-xs flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#F0DEB4] text-[#825C17] flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-[#825C17]" />
          </div>
          <div className="flex-1 text-xs text-[#6B5A34] space-y-1">
            <strong className="text-sm font-semibold text-[#54431E] block">
              Quy tắc Minh bạch: Phân biệt Nguyên liệu Nghiên cứu & Nguyên liệu Lô thực tế
            </strong>
            <p>
              Đây là <strong>8 loại nguyên liệu nằm trong hướng nghiên cứu thực nghiệm</strong> của dự án HERBFOOT. Chúng tôi <strong>không mặc định</strong> cả 8 loại đều có mặt đồng thời trong mọi sản phẩm. Thành phần thực tế của từng lô sẽ được ghi nhận và tra cứu chính xác tuyệt đối qua <strong>Mã Lô (Batch ID)</strong> tại trang Product Passport.
            </p>
          </div>
        </div>

        {/* Ingredients Grid (8 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {RESEARCH_INGREDIENTS.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedIngredient(item)}
              className={`p-6 rounded-3xl cursor-pointer transition-all flex flex-col justify-between border ${
                selectedIngredient.id === item.id
                  ? 'bg-[#FBF9F5] border-[#2D4A3E] shadow-md ring-2 ring-[#2D4A3E]/10'
                  : 'bg-[#FAF7F0] border-[#DFD6C4] hover:border-[#ADC0A5] hover:shadow-xs'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E5ECE0] text-[#2F5240]">
                    {item.tag}
                  </span>
                  <span className="text-[10px] text-[#7E8F80] font-mono">
                    R&D Sample
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-xl font-bold text-[#1E3125]">
                    {item.vietnameseName}
                  </h3>
                  <p className="text-xs italic text-[#708072] font-serif">
                    {item.scientificName}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 text-xs text-[#526354]">
                  <div>
                    <span className="font-medium text-[#2C3F32]">Bộ phận dùng:</span> {item.usedPart}
                  </div>
                  <div>
                    <span className="font-medium text-[#2C3F32]">Hoạt chất chính:</span>{' '}
                    <span className="text-[#3A5645] font-mono text-[11px]">{item.activeCompounds}</span>
                  </div>
                </div>

                <div className="text-xs text-[#58685A] pt-2 line-clamp-3 leading-relaxed border-t border-[#EAE1D1]">
                  {item.intendedRole}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#EAE1D1] flex items-center justify-between text-[11px]">
                <span className="text-[#748576] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#3E6551]" />
                  {item.origin.split('(')[0]}
                </span>
                <span className="text-[#2D4A3E] font-semibold">
                  Chi tiết &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Ingredient Detail Spotlight Drawer / Modal Area */}
        <div className="mt-12 p-8 rounded-3xl bg-[#FAF8F2] border border-[#DDD3C0] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#355B47] bg-[#E3ECE0] px-3 py-1 rounded-md">
                Hồ sơ chi tiết nguyên liệu nghiên cứu
              </span>
              <h3 className="font-serif text-3xl font-bold text-[#1E3125]">
                {selectedIngredient.vietnameseName}
              </h3>
              <p className="text-sm italic font-serif text-[#657868]">
                Tên khoa học: {selectedIngredient.scientificName}
              </p>
              <div className="text-xs text-[#4F6052] pt-2">
                <strong>Giai đoạn R&D:</strong> {selectedIngredient.status}
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#495B4C]">
              <div className="p-4 rounded-2xl bg-white/60 border border-[#E0D7C5] space-y-1">
                <span className="font-bold text-[#1E3125] block">Bộ phận khai thác:</span>
                <p>{selectedIngredient.usedPart}</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/60 border border-[#E0D7C5] space-y-1">
                <span className="font-bold text-[#1E3125] block">Hoạt chất đặc trưng nhận diện:</span>
                <p className="font-mono text-[#2B4B3A]">{selectedIngredient.activeCompounds}</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/60 border border-[#E0D7C5] space-y-1 sm:col-span-2">
                <span className="font-bold text-[#1E3125] block">Vai trò dự kiến trong sản phẩm:</span>
                <p className="text-sm leading-relaxed">{selectedIngredient.intendedRole}</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/60 border border-[#E0D7C5] space-y-1 sm:col-span-2">
                <span className="font-bold text-[#1E3125] block">Nguồn gốc khảo sát thực địa:</span>
                <p>{selectedIngredient.origin}</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

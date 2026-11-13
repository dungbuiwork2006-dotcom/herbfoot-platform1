import React, { useState } from 'react';
import { PRODUCT_LAYERS } from '../data/herbfootContent';
import { Layers, ShieldCheck, Eye, Sparkles } from 'lucide-react';

export default function ProductStructure() {
  const [activeLayer, setActiveLayer] = useState(2); // default layer 2 or 3

  return (
    <section id="structure" className="py-20 bg-[#FBF9F5] border-b border-[#E8DFD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#5C705F] font-semibold bg-[#EAE2D3] px-3.5 py-1.5 rounded-full border border-[#D8CEBC]">
            Kỹ Thuật Kết Cấu
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E3125]">
            Mô phỏng phân lớp cấu tạo (Exploded View)
          </h2>
          <p className="text-[#566658] text-base leading-relaxed">
            Kết cấu 6 lớp vật liệu theo đúng thiết kế thực tế đã được xác nhận: từ bề mặt tiếp xúc êm ái đến lõi thảo mộc và đế cố định.
          </p>
        </div>

        {/* Interactive Exploded View Diagram & Detail List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Exploded Layers Representation */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-8 rounded-3xl bg-linear-to-b from-[#F2ECE1] to-[#E3D8C3] border border-[#D8CBBA] shadow-inner relative">
            <div className="w-full text-center mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#637566]">
                Sơ đồ bóc tách tầng lớp (Từ trên xuống dưới)
              </span>
            </div>

            {/* Exploded Stack */}
            <div className="w-full max-w-md space-y-3 py-4">
              {PRODUCT_LAYERS.map((layer) => {
                const isSelected = activeLayer === layer.layerNumber;
                return (
                  <div
                    key={layer.layerNumber}
                    onClick={() => setActiveLayer(layer.layerNumber)}
                    className={`relative p-3.5 rounded-2xl cursor-pointer transition-all duration-300 transform flex items-center justify-between border ${
                      isSelected
                        ? 'bg-[#2D4A3E] text-white shadow-lg translate-x-2 border-[#1E332B] scale-[1.02]'
                        : 'bg-white/80 text-[#25392C] hover:bg-white hover:translate-x-1 border-[#D3C7B2]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        isSelected ? 'bg-[#436A59] text-white' : 'bg-[#EAE2D3] text-[#294236]'
                      }`}>
                        {layer.layerNumber}
                      </span>
                      <div className="text-left">
                        <div className="text-xs font-bold leading-snug">
                          {layer.name.split('(')[0]}
                        </div>
                        <div className={`text-[10px] ${isSelected ? 'text-[#C5DAC3]' : 'text-[#6A7C6D]'}`}>
                          {layer.highlight}
                        </div>
                      </div>
                    </div>

                    <div className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/10">
                      Lớp {layer.layerNumber}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 text-[11px] text-[#788879] italic flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#3D6350]" />
              Nhấp vào từng lớp để xem chi tiết vật liệu & chức năng
            </div>
          </div>

          {/* Right Column: Active Layer Detail Breakdown */}
          <div className="lg:col-span-6 space-y-6">
            {(() => {
              const current = PRODUCT_LAYERS.find(l => l.layerNumber === activeLayer) || PRODUCT_LAYERS[0];
              return (
                <div className="p-8 rounded-3xl bg-[#FAF8F3] border-2 border-[#D8CCB8] shadow-md space-y-6 animate-fadeIn">
                  <div className="flex items-center justify-between pb-4 border-b border-[#E5DAC8]">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-[#2D4A3E] text-white flex items-center justify-center font-bold text-sm">
                        {current.layerNumber}
                      </span>
                      <span className="text-xs uppercase tracking-wider font-bold text-[#627664]">
                        Thông số lớp cấu trúc
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#E5ECE0] text-[#2B4B39] text-xs font-semibold">
                      {current.highlight}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#1E3125]">
                      {current.name}
                    </h3>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#DFD6C4] space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#526555] block">
                      Vật liệu cấu thành:
                    </span>
                    <p className="text-sm font-medium text-[#203427]">
                      {current.material}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#526555] block">
                      Vai trò & Cơ chế hoạt động:
                    </span>
                    <p className="text-sm text-[#465749] leading-relaxed">
                      {current.role}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E5DAC8] text-xs text-[#738475] italic">
                    * Lưu ý: Toàn bộ 6 tầng cấu trúc đã được định hình theo hồ sơ thiết kế kỹ thuật, không tự ý tráo đổi vị trí các lớp để đảm bảo khả năng chắn ẩm và phân tán hơi ấm.
                  </div>
                </div>
              );
            })()}
          </div>

        </div>

      </div>
    </section>
  );
}

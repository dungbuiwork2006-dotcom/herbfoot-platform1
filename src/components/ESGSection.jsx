import React from 'react';
import { ESG_COMMITMENTS } from '../data/herbfootContent';
import { Leaf, Recycle, HeartHandshake, ShieldCheck, CheckCircle } from 'lucide-react';

export default function ESGSection() {
  return (
    <section id="esg" className="py-20 bg-[#FBF9F5] border-b border-[#E8DFD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E3125]">
            Cam kết ESG & Kinh tế tuần hoàn
          </h2>
          <p className="text-[#566658] text-base leading-relaxed">
            Chúng tôi định hình mô hình sản xuất có trách nhiệm ngay từ ngày đầu: tôn trọng nguồn nguyên liệu tự nhiên, tận dụng phụ phẩm và cam kết minh bạch thông tin.
          </p>
        </div>

        {/* 4 ESG Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {ESG_COMMITMENTS.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-[#FAF7F0] border border-[#DDD3BF] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#8EAE8C] transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#E2ECE0] text-[#294837]">
                    {item.pillar}
                  </span>
                  <span className="text-[11px] text-[#718273] font-medium italic">
                    {item.status}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#1E3125]">
                  {item.title}
                </h3>

                <p className="text-sm text-[#4E6050] leading-relaxed">
                  {item.content}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8DDCB] flex items-center gap-2 text-xs text-[#2A4434]">
                <CheckCircle className="w-4 h-4 text-[#3C6450] shrink-0" />
                <span>Chỉ công bố nội dung đã thực hiện hoặc ghi rõ là định hướng</span>
              </div>
            </div>
          ))}
        </div>

        {/* Circular Economy Flow Diagram */}
        <div className="p-8 sm:p-10 rounded-3xl bg-linear-to-r from-[#2D4A3E] via-[#355A4B] to-[#253D33] text-[#F3EFE6] max-w-5xl mx-auto shadow-xl">
          <div className="max-w-2xl space-y-2 mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[#B5D6B1]">
              Sơ đồ chu trình tuần hoàn dự kiến
            </span>
            <h4 className="font-serif text-2xl font-bold text-white">
              Từ phụ phẩm thiên nhiên đến sản phẩm chăm sóc bước chân
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            <div className="p-4 rounded-2xl bg-[#1C3329] border border-[#446A57] space-y-2">
              <span className="font-mono text-[11px] text-[#A6C8A2] block font-bold">01. Thu nhận phụ phẩm</span>
              <p className="text-[#DEEADE]">Vỏ cam/quýt sau ép nước & vỏ giáp xác sau chế biến thủy hải sản.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#1C3329] border border-[#446A57] space-y-2">
              <span className="font-mono text-[11px] text-[#A6C8A2] block font-bold">02. Tách chiết sinh học</span>
              <p className="text-[#DEEADE]">Chiết xuất tinh dầu vỏ quýt tự nhiên & điều chế Chitosan tinh khiết.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#1C3329] border border-[#446A57] space-y-2">
              <span className="font-mono text-[11px] text-[#A6C8A2] block font-bold">03. Hoàn nguyên sinh thái</span>
              <p className="text-[#DEEADE]">Miếng dán có khả năng phân hủy sinh học, giảm gánh nặng rác thải nhựa.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { ArrowRight, QrCode, Sparkles, Shield, HeartHandshake, CheckCircle2 } from 'lucide-react';
import heroBgImage from '../assets/hero-bg.png';

export default function HeroSection({ onSearchSerial }) {
  const [quickSerial, setQuickSerial] = useState('');

  const handleQuickSearch = (e) => {
    e.preventDefault();
    if (quickSerial.trim() && onSearchSerial) {
      onSearchSerial(quickSerial.trim().toUpperCase());
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-[#EAE2D5]">
      {/* Background image trực tiếp rõ ràng 100% */}
      <img 
        src={heroBgImage} 
        alt="HERBFOOT background" 
        className="absolute inset-0 -z-20 w-full h-full object-cover object-center" 
      />
      {/* Lớp phủ chuyển màu sáng trong suốt */}
      <div className="absolute inset-0 -z-10 bg-white/70 lg:bg-linear-to-r lg:from-[#F7F4EC]/90 lg:via-[#F7F4EC]/75 lg:to-transparent" />

      {/* Background organic blur gradients */}
      <div className="absolute top-0 right-10 -z-10 w-96 h-96 bg-[#E3ECD7]/50 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 -z-10 w-80 h-80 bg-[#EEDFC6]/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Statement & CTA */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5ECE0] border border-[#CCDBC4] text-[#294638] text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#3F6854]" />
              <span>Dự án Sáng kiến Thảo mộc & Công nghệ Màng Sinh học</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#1D3025] leading-[1.2]">
              Hơi ấm thảo mộc tự nhiên nâng niu từng bước chân người Việt
            </h1>

            <p className="text-[#4E5F52] text-base sm:text-lg leading-relaxed max-w-2xl font-light">
              <strong className="font-semibold text-[#1D3025]">HERBFOOT WARM</strong> — Miếng dán thảo mộc sử dụng bên trong giày, ứng dụng dịch chiết thực vật kết hợp lớp màng sinh học Chitosan nhằm tạo cảm giác ấm dịu, hỗ trợ khử mùi và chăm sóc sức khỏe đôi bàn chân sau nhiều giờ di chuyển.
            </p>

            {/* Micro value badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-[#F4EFE6]/80 border border-[#E2D8C6] flex items-start gap-2.5">
                <Shield className="w-4 h-4 text-[#3C6450] shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xs font-semibold text-[#1F3327]">Minh bạch từng lô</h2>
                  <p className="text-[11px] text-[#637265] mt-0.5">Mã QR riêng cho từng sản phẩm</p>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#F4EFE6]/80 border border-[#E2D8C6] flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#3C6450] shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xs font-semibold text-[#1F3327]">Màng Chitosan</h2>
                  <p className="text-[11px] text-[#637265] mt-0.5">Điều biến giải phóng dịch chiết</p>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#F4EFE6]/80 border border-[#E2D8C6] col-span-2 sm:col-span-1 flex items-start gap-2.5">
                <HeartHandshake className="w-4 h-4 text-[#3C6450] shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xs font-semibold text-[#1F3327]">Định hướng ESG</h2>
                  <p className="text-[11px] text-[#637265] mt-0.5">Tái tuần hoàn phụ phẩm sinh học</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#story"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#2D4A3E] text-[#F3EFE6] text-sm font-semibold tracking-wide hover:bg-[#1F342B] transition-all shadow-md hover:shadow-lg"
              >
                <span>Khám phá hành trình sản phẩm</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#ingredients"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#EAE3D2] text-[#294236] text-sm font-semibold tracking-wide hover:bg-[#DCD2BC] border border-[#D5C7AF] transition-all"
              >
                <span>Nghiên cứu nguyên liệu</span>
              </a>
            </div>

            {/* Quick QR Barcode Lookup Banner */}
            <div id="passport-quick" className="p-4 rounded-2xl bg-white/70 border border-[#DDD3C1] shadow-xs mt-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#3D5B4B] mb-2">
                <QrCode className="w-4 h-4 text-[#2D4A3E]" />
                <span>Tra cứu Product Passport (Thử nghiệm)</span>
              </div>
              <form onSubmit={handleQuickSearch} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Nhập mã sản phẩm (Ví dụ: HF-0001, HF-0002...)"
                  value={quickSerial}
                  onChange={(e) => setQuickSerial(e.target.value)}
                  className="flex-1 px-4 py-2.5 text-xs bg-[#FBF9F5] border border-[#CFBFA5] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#2D4A3E] text-[#1E3024] placeholder-[#8F9F90]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold bg-[#2D4A3E] text-white rounded-xl hover:bg-[#1E332B] transition-colors shrink-0"
                >
                  Truy xuất hồ sơ
                </button>
              </form>
              <p className="text-[11px] text-[#7A8A7C] mt-2 italic">
                * Mã định danh trên mỗi tem QR sẽ dẫn thẳng tới trang hồ sơ lô sản xuất tương ứng.
              </p>
            </div>
          </div>

          {/* Right Column: Hero Visual Concept */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Product Representation Mock Card */}
              <div className="relative z-10 rounded-3xl bg-linear-to-b from-[#FAF7F0] to-[#EFE8DC] p-6 sm:p-8 border border-[#E0D5C1] shadow-xl">
                
                {/* Product Badge */}
                <div className="flex items-center justify-between pb-4 border-b border-[#E3D7C4]">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#1E3126]">
                      HERBFOOT WARM
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#2D4A3E] text-[#F3EFE6] text-[10px] font-semibold uppercase tracking-wider">
                    Insole Patch
                  </span>
                </div>

                {/* Conceptual Product Image Display */}
                <div className="my-6 relative rounded-2xl overflow-hidden border border-[#D8CBB3] shadow-md group">
                  <img 
                    src="/hero-bg.png" 
                    alt="Herbal Comfort Insole and Sneaker" 
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Botanical accents around */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-medium text-[#294235] border border-[#D5C6AE] shadow-xs">
                    Chiết xuất gừng & quế
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-medium text-[#294235] border border-[#D5C6AE] shadow-xs">
                    Màng Chitosan kháng khuẩn
                  </div>
                </div>

                {/* Card metadata footer */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs text-[#526354]">
                    <span>Khu vực sử dụng:</span>
                    <strong className="text-[#1D3025] font-medium">Bên trong lòng giày / lót giày</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#526354]">
                    <span>Cơ chế tỏa nhiệt:</span>
                    <strong className="text-[#1D3025] font-medium">Ấm dịu thảo mộc tự nhiên</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#526354]">
                    <span>Quy cách mẫu:</span>
                    <strong className="text-[#1D3025] font-medium">Cặp miếng dán siêu mỏng, êm ái</strong>
                  </div>
                </div>

              </div>

              {/* Decorative accent element */}
              <div className="absolute -bottom-4 -left-4 -z-10 w-full h-full rounded-3xl bg-[#D6CBB7]/50 border border-[#C7BBA5]"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

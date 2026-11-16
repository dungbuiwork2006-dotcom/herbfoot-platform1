
import React, { useState } from 'react';
import {
  ArrowRight,
  QrCode,
  Sparkles,
  Shield,
  HeartHandshake
} from 'lucide-react';

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
    <section className="relative isolate overflow-hidden border-b border-[#EAE2D5]">

      {/* Full Background Image */}
      <img
        src={heroBgImage}
        alt="HERBFOOT botanical background"
        className="absolute inset-0 -z-20 w-full h-full object-cover object-center"
      />

      {/* Background Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#F7F4EC]/45 via-[#F7F4EC]/25 to-[#F7F4EC]/5" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">

        <div className="max-w-3xl space-y-6">

          {/* Main Heading */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#1D3025] leading-[1.2]">
            Hơi ấm thảo mộc tự nhiên nâng niu từng bước chân người Việt
          </h1>

          {/* Description - Improved Contrast */}
          <p className="text-[#304638] text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
            <strong className="font-bold text-[#1D3025]">
              HERBFOOT WARM
            </strong>
            {' '}— Miếng dán thảo mộc sử dụng bên trong giày, ứng dụng dịch chiết thực vật kết hợp lớp màng sinh học Chitosan nhằm tạo cảm giác ấm dịu, hỗ trợ khử mùi và chăm sóc sức khỏe đôi bàn chân sau nhiều giờ di chuyển.
          </p>

          {/* Product Values */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">

            {/* Value 1 */}
            <div className="p-3 rounded-xl bg-[#F4EFE6]/85 backdrop-blur-sm border border-[#E2D8C6] flex items-start gap-2.5">
              <Shield className="w-4 h-4 text-[#3C6450] shrink-0 mt-0.5" />

              <div>
                <h2 className="text-xs font-semibold text-[#1F3327]">
                  Minh bạch từng lô
                </h2>
                <p className="text-[11px] text-[#637265] mt-0.5">
                  Mã QR riêng cho từng sản phẩm
                </p>
              </div>
            </div>

            {/* Value 2 */}
            <div className="p-3 rounded-xl bg-[#F4EFE6]/85 backdrop-blur-sm border border-[#E2D8C6] flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#3C6450] shrink-0 mt-0.5" />

              <div>
                <h2 className="text-xs font-semibold text-[#1F3327]">
                  Màng Chitosan
                </h2>
                <p className="text-[11px] text-[#637265] mt-0.5">
                  Điều biến giải phóng dịch chiết
                </p>
              </div>
            </div>

            {/* Value 3 */}
            <div className="p-3 rounded-xl bg-[#F4EFE6]/85 backdrop-blur-sm border border-[#E2D8C6] flex items-start gap-2.5">
              <HeartHandshake className="w-4 h-4 text-[#3C6450] shrink-0 mt-0.5" />

              <div>
                <h2 className="text-xs font-semibold text-[#1F3327]">
                  Định hướng ESG
                </h2>
                <p className="text-[11px] text-[#637265] mt-0.5">
                  Tái tuần hoàn phụ phẩm sinh học
                </p>
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
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#EAE3D2]/90 text-[#294236] text-sm font-semibold tracking-wide hover:bg-[#DCD2BC] border border-[#D5C7AF] transition-all"
            >
              <span>Nghiên cứu nguyên liệu</span>
            </a>

          </div>

          {/* Quick Product Passport Lookup */}
          <div
            id="passport-quick"
            className="p-4 rounded-2xl bg-white/85 backdrop-blur-sm border border-[#DDD3C1] shadow-sm mt-6"
          >

            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#3D5B4B] mb-2">
              <QrCode className="w-4 h-4 text-[#2D4A3E]" />

              <span>
                Tra cứu Product Passport (Thử nghiệm)
              </span>
            </div>

            <form
              onSubmit={handleQuickSearch}
              className="flex flex-col sm:flex-row gap-2"
            >
              <input
                type="text"
                placeholder="Nhập mã sản phẩm (Ví dụ: HF-0001, HF-0002...)"
                value={quickSerial}
                onChange={(e) => setQuickSerial(e.target.value)}
                className="flex-1 px-4 py-2.5 text-xs bg-[#FBF9F5] border border-[#CFBFA5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D4A3E] text-[#1E3024] placeholder-[#8F9F90]"
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

      </div>

    </section>
  );
}

import React from 'react';
import { Leaf, QrCode, Mail, MapPin, Phone, ShieldCheck, Heart } from 'lucide-react';

export default function Footer({ onOpenPassportDemo }) {
  return (
    <footer className="bg-[#1C2C24] text-[#E5DDD0] pt-16 pb-12 border-t border-[#2D4539]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#2C4236]">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2D4A3E] flex items-center justify-center text-[#E5DDD0] border border-[#486B5B]">
                <Leaf className="w-5 h-5 text-[#B6D6AF]" />
              </div>
              <div>
                <span className="font-serif tracking-widest text-2xl font-bold text-white uppercase">
                  HERBFOOT
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#9BB39D] block font-light">
                  Botanical Insole Warmth & Chitosan Technology
                </span>
              </div>
            </div>

            <p className="text-sm text-[#A9B9AB] leading-relaxed max-w-sm">
              Dự án nghiên cứu & phát triển dòng sản phẩm chăm sóc lòng bàn chân từ hệ thảo dược Việt Nam, kết hợp màng sinh học Chitosan và hệ thống minh bạch Product Passport.
            </p>

            <div className="text-xs text-[#8BA08E] space-y-1">
              <p>• Tên thương hiệu: <strong>HERBFOOT</strong></p>
              <p>• Dòng sản phẩm chủ lực: <strong>HERBFOOT WARM</strong></p>
              <p>• Nền tảng truy xuất: <strong>Product Passport Hệ Thống 1-Nhiều</strong></p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white">
              Điều hướng nhanh
            </h4>
            <ul className="space-y-2 text-xs text-[#B5C5B7]">
              <li><a href="#story" className="hover:text-white transition-colors">Câu chuyện thương hiệu</a></li>
              <li><a href="#product" className="hover:text-white transition-colors">Sản phẩm HERBFOOT WARM</a></li>
              <li><a href="#ingredients" className="hover:text-white transition-colors">Hệ thảo dược nghiên cứu (8 loại)</a></li>
              <li><a href="#structure" className="hover:text-white transition-colors">Cấu tạo 6 lớp (Exploded View)</a></li>
              <li><a href="#chitosan" className="hover:text-white transition-colors">Công nghệ màng sinh học Chitosan</a></li>
              <li><a href="#process" className="hover:text-white transition-colors">Quy trình sản xuất 5 giai đoạn</a></li>
              <li><a href="#qa" className="hover:text-white transition-colors">Kiểm soát chất lượng QA</a></li>
              <li><a href="#esg" className="hover:text-white transition-colors">Cam kết phát triển bền vững ESG</a></li>
            </ul>
          </div>

          {/* Traceability Portal */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white flex items-center gap-2">
              <QrCode className="w-4 h-4 text-[#8CB589]" />
              Hệ thống Truy xuất nguồn gốc
            </h4>

            <p className="text-xs text-[#A9B9AB] leading-relaxed">
              Mỗi sản phẩm vật lý lưu hành đều có 01 mã tem QR định danh riêng. Quét tem trên vỏ hộp để truy xuất dữ liệu ngày sản xuất, thành phần lô và hồ sơ kiểm định.
            </p>

            <div className="p-4 rounded-2xl bg-[#24392F] border border-[#375546] space-y-3">
              <span className="text-[11px] font-semibold text-[#C3DAC0] block">
                Truy cập hồ sơ thử nghiệm mẫu:
              </span>
              <button
                onClick={() => onOpenPassportDemo && onOpenPassportDemo('HF-0001')}
                className="w-full py-2.5 px-4 rounded-xl bg-[#8CB589] hover:bg-[#7DA87A] text-[#16271F] font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <QrCode className="w-4 h-4" />
                <span>Xem mẫu Product Passport: HF-0001</span>
              </button>
            </div>

            <div className="text-[11px] text-[#7E9681] italic">
              * Hệ thống bảo mật 1 URL duy nhất: /product/:serialCode
            </div>
          </div>

        </div>

        {/* Bottom Credits & Integrity Statement */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7F9483] gap-4">
          <p>© 2026 HERBFOOT Project. Bảo lưu mọi quyền.</p>
          <p className="flex items-center gap-1.5 text-center">
            <ShieldCheck className="w-4 h-4 text-[#8CB589]" />
            Cam kết khoa học trung thực • Không tạo số liệu và chứng nhận giả mạo
          </p>
        </div>

      </div>
    </footer>
  );
}

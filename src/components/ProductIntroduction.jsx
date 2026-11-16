
import React from 'react';
import {
  Leaf,
  ShieldCheck,
  Wind,
  ArrowUpRight,
  Check,
  Sparkles,
  Footprints,
  Package
} from 'lucide-react';

export default function ProductIntroduction() {
  const features = [
    {
      icon: <Leaf className="w-5 h-5" />,
      number: "01",
      title: "Chiết xuất thảo mộc",
      desc: "Ứng dụng các thành phần có nguồn gốc thực vật như gừng và quế, mang đến hương thơm thảo mộc đặc trưng."
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      number: "02",
      title: "Màng sinh học Chitosan",
      desc: "Kết hợp lớp màng sinh học Chitosan trong cấu trúc sản phẩm, hướng tới hỗ trợ kiểm soát môi trường bên trong giày."
    },
    {
      icon: <Wind className="w-5 h-5" />,
      number: "03",
      title: "Thiết kế mỏng nhẹ",
      desc: "Cấu trúc gọn nhẹ, dễ bố trí bên trong giày mà không cần thay thế toàn bộ phần lót giày."
    }
  ];

  const steps = [
    {
      num: "01",
      title: "Làm sạch vị trí dán",
      desc: "Đảm bảo mặt trong giày hoặc bề mặt lót giày sạch và khô ráo."
    },
    {
      num: "02",
      title: "Bóc lớp giấy bảo vệ",
      desc: "Nhẹ nhàng bóc lớp giấy bảo vệ keo ở mặt dưới của miếng dán."
    },
    {
      num: "03",
      title: "Đặt miếng dán vào giày",
      desc: "Dán vào vị trí phù hợp bên trong giày, chẳng hạn khu vực trước bàn chân hoặc hõm bàn chân."
    },
    {
      num: "04",
      title: "Sử dụng như bình thường",
      desc: "Ấn nhẹ để cố định miếng dán, sau đó đi tất và sử dụng giày như thường ngày."
    }
  ];

  return (
    <section
      id="product"
      className="relative overflow-hidden bg-[#F7F4EC] py-24 sm:py-28"
    >
      {/* Background decoration */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-32 w-96 h-96 rounded-full bg-[#B9C9B2]/25 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* SECTION HEADER */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.12] text-[#203A2B]">
            Chạm vào sự
            <span className="block italic text-[#66866A] mt-2">
              ấm lành từ thiên nhiên
            </span>
          </h2>

          <p className="max-w-2xl mx-auto mt-7 text-sm sm:text-base leading-8 text-[#596C5A]">
            HERBFOOT WARM – Miếng dán thảo mộc sử dụng bên trong giày,
            kết hợp dịch chiết thực vật và màng sinh học Chitosan
            trong một thiết kế mỏng nhẹ, tiện lợi.
          </p>

        </div>


        {/* MAIN PRODUCT PRESENTATION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

          {/* IMAGE AREA */}
          <div className="lg:col-span-7">

            <div className="relative h-full min-h-[380px] sm:min-h-[500px] rounded-[2rem] overflow-hidden bg-[#DCE5D6] border border-[#C5D2BE]">

              {/* IMAGE PLACEHOLDER */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">

                <div className="w-16 h-16 rounded-full bg-white/60 flex items-center justify-center mb-5">
                  <Package className="w-7 h-7 text-[#66836A]" />
                </div>

                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#66836A]">
                  Product visual
                </span>

                <p className="mt-3 font-serif text-xl sm:text-2xl text-[#36513A]">
                  Hình ảnh sản phẩm HERBFOOT WARM
                </p>

                <p className="mt-2 text-xs sm:text-sm text-[#718271] max-w-xs leading-6">
                  Khu vực dành cho hình ảnh miếng dán thảo mộc
                  khi bạn hoàn thiện hình ảnh sản phẩm.
                </p>

              </div>

              {/* Bottom label */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3">

                <div className="px-4 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-white/70">
                  <span className="text-[10px] sm:text-xs font-medium tracking-wide text-[#36513A]">
                    HERBFOOT WARM
                  </span>
                </div>

                <div className="px-4 py-2.5 rounded-full bg-[#294735]/90 backdrop-blur-md">
                  <span className="text-[10px] sm:text-xs text-[#F5F3E9] tracking-wide">
                    Botanical innovation
                  </span>
                </div>

              </div>

            </div>

          </div>


          {/* PRODUCT INFORMATION */}
          <div className="lg:col-span-5 flex flex-col justify-center">

            <div className="mb-8">

              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#789078]">
                About the product
              </span>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#203A2B] leading-tight mt-4">
                Nhỏ gọn trong giày.
                <span className="block italic text-[#66866A] mt-1">
                  Dịu nhẹ mỗi bước chân.
                </span>
              </h3>

              <p className="mt-5 text-sm leading-7 text-[#5B6D5C]">
                Không phải một chiếc lót giày thông thường,
                HERBFOOT WARM được phát triển dưới dạng miếng dán
                thảo mộc riêng biệt, có thể bố trí trực tiếp bên trong giày.
              </p>

            </div>


            {/* PRODUCT SPECS */}
            <div className="grid grid-cols-2 gap-3 mb-8">

              <div className="rounded-2xl bg-white/65 border border-[#CFD9C9] p-4">
                <span className="text-[10px] uppercase tracking-widest text-[#7B8C79]">
                  Quy cách
                </span>
                <p className="mt-2 text-base font-semibold text-[#294735]">
                  Cặp 2 miếng
                </p>
              </div>

              <div className="rounded-2xl bg-white/65 border border-[#CFD9C9] p-4">
                <span className="text-[10px] uppercase tracking-widest text-[#7B8C79]">
                  Thiết kế
                </span>
                <p className="mt-2 text-base font-semibold text-[#294735]">
                  Mỏng nhẹ
                </p>
              </div>

            </div>


            {/* FEATURES */}
            <div className="space-y-5">

              {features.map((feature) => (
                <div
                  key={feature.number}
                  className="flex items-start gap-4 group"
                >

                  <div className="w-11 h-11 shrink-0 rounded-xl bg-[#D5E0D0] border border-[#C3D2BE] flex items-center justify-center text-[#426448] group-hover:bg-[#36543E] group-hover:text-white transition-all duration-300">
                    {feature.icon}
                  </div>

                  <div className="flex-1 pt-0.5">

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold tracking-widest text-[#8B9C86]">
                        {feature.number}
                      </span>

                      <h4 className="text-sm font-semibold text-[#294735]">
                        {feature.title}
                      </h4>
                    </div>

                    <p className="mt-1.5 text-xs sm:text-sm leading-6 text-[#637363]">
                      {feature.desc}
                    </p>

                  </div>

                </div>
              ))}

            </div>


            {/* NOTE */}
            <div className="mt-8 pt-6 border-t border-[#C8D4C3] flex items-start gap-3">

              <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-[#789078]" />

              <p className="text-[11px] leading-5 text-[#72816F]">
                Sản phẩm hướng tới mục đích chăm sóc và mang lại trải nghiệm
                sử dụng tiện lợi, không thay thế các phương pháp điều trị y khoa.
              </p>

            </div>

          </div>

        </div>


        {/* DIVIDER */}
        <div className="flex items-center gap-5 my-20 sm:my-24">

          <div className="h-px flex-1 bg-[#C7D3C1]" />

          <div className="w-10 h-10 rounded-full border border-[#B9C9B3] bg-white/60 flex items-center justify-center">
            <Footprints className="w-4 h-4 text-[#66836A]" />
          </div>

          <div className="h-px flex-1 bg-[#C7D3C1]" />

        </div>


        {/* HOW TO USE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

          {/* LEFT TITLE */}
          <div className="lg:col-span-4">

            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#789078]">
              Simple application
            </span>

            <h3 className="font-serif text-3xl sm:text-4xl text-[#203A2B] leading-tight mt-4">
              Sử dụng dễ dàng
              <span className="block italic text-[#66866A]">
                chỉ với 4 bước
              </span>
            </h3>

            <p className="mt-5 text-sm leading-7 text-[#637363]">
              Tối giản thao tác sử dụng để HERBFOOT WARM
              có thể đồng hành cùng bạn trong những hoạt động thường ngày.
            </p>

            <div className="mt-8 inline-flex items-center gap-2 text-[#4F704F]">
              <Check className="w-4 h-4" />
              <span className="text-xs font-semibold tracking-wide">
                Nhanh chóng · Tiện lợi · Linh hoạt
              </span>
            </div>

          </div>


          {/* RIGHT STEPS */}
          <div className="lg:col-span-8">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {steps.map((step, index) => (
                <div
                  key={step.num}
                  className="relative p-6 sm:p-7 rounded-3xl bg-[#F7F8F3]/80 border border-[#CFD9C9] hover:bg-white hover:-translate-y-1 hover:shadow-lg hover:shadow-[#294735]/5 transition-all duration-300"
                >

                  <div className="flex items-center justify-between mb-7">

                    <span className="font-serif text-4xl text-[#91A68C]/70">
                      {step.num}
                    </span>

                    <div className="w-9 h-9 rounded-full bg-[#E3EBDD] flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4 text-[#527052]" />
                    </div>

                  </div>

                  <h4 className="text-base font-semibold text-[#294735]">
                    {step.title}
                  </h4>

                  <p className="mt-3 text-xs sm:text-sm leading-6 text-[#697969]">
                    {step.desc}
                  </p>

                  {index < 3 && (
                    <div className="hidden sm:block absolute -right-2 top-1/2 w-4 h-4 rounded-full bg-[#DCE5D6] border border-[#B9C9B3] z-10" />
                  )}

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

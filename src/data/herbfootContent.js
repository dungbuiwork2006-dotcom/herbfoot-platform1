// Danh sách 8 nguyên liệu nghiên cứu thực nghiệm
// Lưu ý: Đây là danh mục nguyên liệu nằm trong hướng nghiên cứu của HERBFOOT.
// Nguyên liệu thực tế của từng sản phẩm sẽ phụ thuộc vào hồ sơ của từng lô (Batch Passport).

export const RESEARCH_INGREDIENTS = [
  {
    id: "ginger",
    vietnameseName: "Gừng",
    scientificName: "Zingiber officinale",
    usedPart: "Thân rễ (Củ)",
    activeCompounds: "Gingerol, Shogaol, Zingiberene",
    intendedRole: "Hỗ trợ tạo cảm giác ấm áp dễ chịu, thúc đẩy lưu thông tuần hoàn vi mạch vùng bàn chân.",
    origin: "Vùng trồng đồi núi Hòa Bình, Việt Nam (định hướng thu mua VietGAP)",
    status: "Đang thử nghiệm dịch chiết cồn/nước",
    tag: "Ấm áp & Thư giãn"
  },
  {
    id: "mugwort",
    vietnameseName: "Ngải cứu",
    scientificName: "Artemisia argyi / Artemisia vulgaris",
    usedPart: "Lá và ngọn non",
    activeCompounds: "Cineol, Thujone, Flavonoids, Tanin",
    intendedRole: "Hỗ trợ làm dịu nhức mỏi cơ chân, kháng khuẩn nhẹ bề mặt da, điều hòa khí huyết bàn chân.",
    origin: "Đồng bằng Bắc Bộ (Hưng Yên, Nam Định)",
    status: "Đang thử nghiệm tối ưu tỷ lệ dịch chiết",
    tag: "Làm dịu & Phục hồi"
  },
  {
    id: "cinnamon",
    vietnameseName: "Quế",
    scientificName: "Cinnamomum cassia",
    usedPart: "Vỏ thân (Nhục quế), cành non",
    activeCompounds: "Cinnamaldehyde, Eugenol",
    intendedRole: "Tỏa hương thơm ấm nồng đặc trưng, hỗ trợ ức chế vi sinh vật gây mùi hôi chân trong giày kín.",
    origin: "Vùng quế Trà Bồng (Quảng Ngãi) & Yên Bái",
    status: "Đã chuẩn hóa dịch chiết tinh dầu",
    tag: "Khử mùi & Ấm sâu"
  },
  {
    id: "clove",
    vietnameseName: "Đinh hương",
    scientificName: "Syzygium aromaticum",
    usedPart: "Nụ hoa khô",
    activeCompounds: "Eugenol (chiếm 70-90%), Acetyleugenol",
    intendedRole: "Hương thơm thanh khiết, hỗ trợ kháng nấm và vi khuẩn yếm khí gây mùi ẩm mốc trong giày.",
    origin: "Nguyên liệu khảo sát nhập khẩu / nông hộ liên kết",
    status: "Nghiên cứu hàm lượng an toàn tiếp xúc da",
    tag: "Kháng khuẩn & Hương thơm"
  },
  {
    id: "lemongrass",
    vietnameseName: "Sả",
    scientificName: "Cymbopogon citratus",
    usedPart: "Thân và lá",
    activeCompounds: "Citral, Geraniol, Myrcene",
    intendedRole: "Mang lại cảm giác sảng khoái, tươi mát, trung hòa các phân tử mùi khó chịu do mồ hôi chân.",
    origin: "Tây Nguyên & Nghệ An",
    status: "Đang đánh giá độ lưu hương trên màng xơ",
    tag: "Tươi mát & Sảng khoái"
  },
  {
    id: "star-anise",
    vietnameseName: "Đại hồi (Hoa hồi)",
    scientificName: "Illicium verum",
    usedPart: "Quả hình sao khô",
    activeCompounds: "Trans-anethole, Estragole, Terpineol",
    intendedRole: "Tạo nốt hương ngọt ấm truyền thống Á Đông, phối hợp giữ nhiệt và khử mùi bền bỉ.",
    origin: "Lạng Sơn, Việt Nam",
    status: "Nghiên cứu tương thích với màng Chitosan",
    tag: "Ấm ngọt & Bảo toàn mùi"
  },
  {
    id: "citrus-peel",
    vietnameseName: "Vỏ cam / quýt (Trần bì)",
    scientificName: "Citrus reticulata / Citrus sinensis",
    usedPart: "Vỏ quả chín phơi sấy",
    activeCompounds: "Limonene, Hesperidin, Nobiletin",
    intendedRole: "Tận dụng phụ phẩm nông nghiệp sau vắt nước, đem lại mùi thơm thanh mát sảng khoái và chống oxy hóa.",
    origin: "Vùng trồng cây có múi Hòa Bình / Tiền Giang (Dự án ESG phụ phẩm)",
    status: "Thử nghiệm tái chế sinh thái (Circular economy)",
    tag: "ESG & Thanh khiết"
  },
  {
    id: "lavender",
    vietnameseName: "Oải hương",
    scientificName: "Lavandula angustifolia",
    usedPart: "Hoa và cành mang hoa",
    activeCompounds: "Linalool, Linalyl acetate",
    intendedRole: "Hương thảo mộc dịu nhẹ, hỗ trợ thư giãn tinh thần sau một ngày vận động hoặc đứng nhiều giờ.",
    origin: "Nguồn nguyên liệu đối chứng khảo nghiệm hương học",
    status: "Khảo sát thị hiếu người dùng",
    tag: "Thư giãn & Giảm stress"
  }
];

// Cấu trúc sản phẩm (Exploded View) theo đúng thứ tự xác nhận thực tế
export const PRODUCT_LAYERS = [
  {
    layerNumber: 1,
    name: "Lớp vải bảo vệ bề mặt (Top Non-woven Fabric)",
    material: "Vải không dệt thân thiện da chân, thoáng khí",
    role: "Tiếp xúc gián tiếp với lòng bàn chân hoặc lót tất; tạo cảm giác mềm mại êm ái, cho phép hơi ẩm và mùi thơm khuếch tán đồng đều mà không gây cộm rát.",
    highlight: "Mềm mại & Thoáng khí"
  },
  {
    layerNumber: 2,
    name: "Lớp phủ màng sinh học Chitosan (Chitosan Bio-coating)",
    material: "Màng Chitosan polyme sinh học nguồn gốc giáp xác",
    role: "Lớp phủ trung gian giúp điều tiết tốc độ giải phóng dịch chiết thảo mộc, giữ ổn định hoạt chất và bảo vệ lõi xơ cellulose.",
    highlight: "Công nghệ sinh học điều biến"
  },
  {
    layerNumber: 3,
    name: "Lõi vải chứa dịch chiết thảo mộc (Core Infused Layer)",
    material: "Lõi xơ bông/cellulose tự nhiên ngấm dịch chiết thảo mộc",
    role: "Trái tim của sản phẩm: Lưu giữ dịch chiết cô đặc từ các loại thảo dược tự nhiên; cung cấp hương thơm ấm dịu và hoạt chất thư giãn bền bỉ suốt ngày dài.",
    highlight: "Hồ chứa tinh chất thảo dược"
  },
  {
    layerNumber: 4,
    name: "Màng mỏng PE chắn ẩm (PE Barrier Film)",
    material: "Polyethylene film chuyên dụng chống thấm",
    role: "Ngăn dịch chiết và độ ẩm thấm ngược làm bẩn hoặc ẩm ướt phần đế lót bên trong của đôi giày.",
    highlight: "Chống thấm ngược bảo vệ giày"
  },
  {
    layerNumber: 5,
    name: "Lớp đệm đàn hồi EVA (EVA Cushioning Base)",
    material: "Ethylene Vinyl Acetate siêu nhẹ, định hình form",
    role: "Tạo độ êm nâng đỡ nhẹ nhàng, giảm chấn khi bước đi và giữ miếng dán không bị xô lệch, gấp mép khi vận động mạnh.",
    highlight: "Êm ái & Chống xô lệch"
  },
  {
    layerNumber: 6,
    name: "Lớp keo dán định vị & Giấy lót bảo vệ (Adhesive & Release Liner)",
    material: "Keo acrylic sinh học chịu nhiệt nhẹ + Giấy láng silicon",
    role: "Giúp cố định miếng dán chắc chắn vào mặt trong hoặc lót giày; dễ dàng bóc tách mà không để lại vết keo dính bẩn khi thay thế.",
    highlight: "Cố định chắc - Dễ bóc bỏ"
  }
];

// Hành trình 5 giai đoạn sản xuất (Production Timeline)
export const PRODUCTION_TIMELINE = [
  {
    step: "01",
    phase: "Chuẩn bị & Chiết xuất nguyên liệu",
    title: "Tuyển chọn dược liệu & Chiết tách tinh chất",
    description: "Thảo mộc từ các vùng trồng liên kết được làm sạch, kiểm tra tạp chất, sấy chuẩn độ ẩm và tiến hành chiết xuất dung môi nước/cồn thực phẩm ở nhiệt độ kiểm soát nhằm bảo toàn hoạt chất nhạy cảm nhiệt.",
    standard: "Độ ẩm dược liệu < 12%, không tồn dư kim loại nặng."
  },
  {
    step: "02",
    phase: "Tạo lõi vải chứa dịch chiết",
    title: "Thấm tẩm dịch chiết vào lõi xơ sinh học",
    description: "Lõi xơ cellulose/vải dệt tự nhiên được định lượng và phun thấm đồng đều dịch chiết thảo mộc bằng công nghệ phân tán siêu âm, sau đó sấy ổn định trạng thái.",
    standard: "Định lượng dịch chiết đồng nhất trên từng đơn vị diện tích (±3%)."
  },
  {
    step: "03",
    phase: "Phủ màng Chitosan",
    title: "Tạo màng sinh học Chitosan bảo vệ",
    description: "Phun phủ dung dịch Chitosan tinh khiết lên bề mặt lõi vải để hình thành lớp màng sinh học siêu mỏng. Lớp màng này đóng vai trò màng chắn điều biến và ổn định dịch chiết.",
    standard: "Độ dày lớp phủ đạt chuẩn vi mô, khô tự nhiên trong phòng sạch."
  },
  {
    step: "04",
    phase: "Lắp ráp miếng dán đa tầng",
    title: "Hợp nhất 6 lớp cấu trúc & Cắt định hình",
    description: "Dây chuyền cán ghép nhiệt-áp các lớp: vải bảo vệ, màng Chitosan, lõi thảo mộc, màng chắn PE, đệm EVA và lớp keo bảo vệ theo đúng trật tự thiết kế, sau đó cắt laser định hình lượn theo lòng bàn chân.",
    standard: "Mép hàn mép cắt phẳng mịn, độ bám dính giữa các lớp bền vững."
  },
  {
    step: "05",
    phase: "Kiểm tra & Hoàn thiện",
    title: "Kiểm soát chất lượng, Đóng gói & Kích hoạt định danh",
    description: "Lấy mẫu ngẫu nhiên kiểm tra độ dính, độ đồng đều mùi và vi sinh vật. Sản phẩm đạt chuẩn được đóng trong túi nhôm chắn sáng và dán tem QR định danh riêng cho từng sản phẩm.",
    standard: "Mỗi sản phẩm có 1 Serial Number độc nhất gắn với Lô xuất xưởng."
  }
];

// Các hạng mục Kiểm soát chất lượng (QA/QC)
export const QUALITY_STANDARDS = [
  {
    id: "qc-01",
    category: "Kiểm tra vi sinh vật bề mặt & nấm mốc",
    purpose: "Đảm bảo miếng dán không nhiễm nấm men, nấm mốc hay tụ cầu gây kích ứng da chân trong môi trường kín.",
    status: "Đang tiến hành thử nghiệm phòng lab",
    evidence: "Dự kiến lưu trữ phiếu kiểm nghiệm COA từ đơn vị đo lường độc lập (Quatest / Viện Pasteur)"
  },
  {
    id: "qc-02",
    category: "Độ pH & Độ an toàn kích ứng qua da",
    purpose: "Kiểm tra dung dịch chiết và bề mặt tiếp xúc đảm bảo tương thích với pH sinh lý tự nhiên của da bàn chân (pH 4.5 - 6.0).",
    status: "Đang thử nghiệm mẫu nội bộ",
    evidence: "Báo cáo thử nghiệm kích ứng da (Skin Sensitization Test Report)"
  },
  {
    id: "qc-03",
    category: "Độ bền bám dính & Không để lại keo",
    purpose: "Đo lực bám dính trên các chất liệu lót giày (da thuộc, vải dệt, cao su) sau 8-12 giờ sử dụng liên tục.",
    status: "Đã hoàn thành thử nghiệm thực địa cơ bản",
    evidence: "Bảng dữ liệu kiểm tra độ bong tróc và kiểm tra vết dính sau bóc"
  },
  {
    id: "qc-04",
    category: "Tốc độ giải phóng & Lưu giữ hương thơm",
    purpose: "Đánh giá mức độ tỏa hương và duy trì cảm giác ấm dễ chịu qua thời gian sử dụng 4h - 8h.",
    status: "Đang đánh giá cảm quan & hàm lượng bay hơi",
    evidence: "Biểu đồ sắc ký khí (GC-MS) định tính các hợp chất bay hơi theo thời gian"
  }
];

// Cam kết phát triển bền vững ESG
export const ESG_COMMITMENTS = [
  {
    pillar: "Environmental (Môi trường)",
    title: "Tận dụng phụ phẩm nông nghiệp & Thủy sản",
    status: "Định hướng nghiên cứu trọng tâm",
    content: "HERBFOOT hướng tới việc tái chế vỏ cam quýt sau chế biến đồ uống và vỏ giáp xác (tôm, cua) thành nguồn Chitosan sinh học giá trị cao, góp phần giảm áp lực rác thải hữu cơ theo mô hình kinh tế tuần hoàn (Circular Economy)."
  },
  {
    pillar: "Environmental (Môi trường)",
    title: "Vật liệu phân hủy sinh học thân thiện",
    status: "Đang thực hiện từng phần",
    content: "Thay thế dần các màng nhựa tổng hợp bằng cellulose tái sinh và polymer sinh học có khả năng phân hủy tự nhiên trong điều kiện ủ công nghiệp."
  },
  {
    pillar: "Social (Xã hội)",
    title: "Liên kết sinh kế cùng nông hộ bản địa",
    status: "Định hướng phát triển vùng nguyên liệu",
    content: "Ưu tiên hợp tác và cam kết bao tiêu với các tổ hợp tác trồng quế, hồi, gừng, sả tại các vùng miền núi phía Bắc và Tây Nguyên theo tiêu chuẩn thu hái bền vững."
  },
  {
    pillar: "Governance (Quản trị)",
    title: "Minh bạch hóa truy xuất nguồn gốc (Traceability)",
    status: "Đã hoàn thiện thiết kế hệ thống Product Passport",
    content: "Mỗi sản phẩm đều mang một mã số minh bạch liên kết trực tiếp với hồ sơ lô sản xuất thực tế. Chúng tôi từ chối tuyên truyền các thông số sai lệch hoặc chứng nhận chưa kiểm định."
  }
];

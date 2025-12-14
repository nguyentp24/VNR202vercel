import React from 'react';
import { TimelineEvent, LeadershipPoint, MapPoint, QuizQuestion } from './types';

export const TIMELINE_DATA: TimelineEvent[] = [
  {
    year: "1954",
    title: "Hiệp định Genève",
    description: "Kết thúc cuộc kháng chiến chống Pháp. Miền Bắc giải phóng, bắt đầu thời kỳ quá độ lên CNXH.",
    image: "https://bcp.cdnchinhphu.vn/334894974524682240/2024/4/25/1gionevoa-17140129931551422933117.jpg",
    details: "Hiệp định Giơnevơ được ký kết ngày 21/7/1954, chấm dứt cuộc chiến tranh Đông Dương lần thứ nhất. Việt Nam tạm thời bị chia cắt tại vĩ tuyến 17, với miền Bắc do Việt Nam Dân chủ Cộng hòa quản lý và miền Nam do Quốc gia Việt Nam (sau là Việt Nam Cộng hòa) quản lý.",
    keyPoints: [
      "Pháp công nhận độc lập, chủ quyền, thống nhất và toàn vẹn lãnh thổ của Việt Nam",
      "Việt Nam tạm thời chia làm hai miền, lấy vĩ tuyến 17 làm ranh giới",
      "Dự kiến tổng tuyển cử thống nhất đất nước vào tháng 7/1956",
      "Miền Bắc hoàn toàn giải phóng, bắt đầu xây dựng CNXH"
    ]
  },
  {
    year: "1955-1957",
    title: "Khôi phục kinh tế",
    description: "Miền Bắc hoàn thành cải cách ruộng đất, khôi phục kinh tế sau chiến tranh.",
    image: "https://img.loigiaihay.com/picture/2020/0205/nong-dan-nhan-ruong-dat.png",
    details: "Sau 9 năm kháng chiến chống Pháp, miền Bắc bị tàn phá nặng nề. Đảng và Nhà nước tập trung khôi phục kinh tế, hàn gắn vết thương chiến tranh. Cải cách ruộng đất được tiến hành để xóa bỏ chế độ sở hữu ruộng đất phong kiến.",
    keyPoints: [
      "Hoàn thành cải cách ruộng đất, chia ruộng cho nông dân",
      "Khôi phục các cơ sở công nghiệp, giao thông vận tải",
      "Ổn định đời sống nhân dân sau chiến tranh",
      "Củng cố miền Bắc làm hậu phương vững chắc cho cách mạng"
    ]
  },
  {
    year: "1/1959",
    title: "Nghị quyết 15",
    description: "Bước ngoặt lịch sử: Đảng xác định con đường cách mạng miền Nam là sử dụng bạo lực cách mạng.",
    highlight: true,
    image: "https://thinhvuongvietnam.com/Content/UploadFiles/EditorFiles/images/2022/Quy3/hntw15-khoa-ii03072022101103.jpg",
    details: "Hội nghị Trung ương lần thứ 15 (khóa II) họp tháng 1/1959 đã đánh dấu bước chuyển lớn trong đường lối cách mạng miền Nam. Nghị quyết xác định con đường cách mạng miền Nam là khởi nghĩa giành chính quyền về tay nhân dân bằng con đường bạo lực cách mạng.",
    keyPoints: [
      "Xác định con đường bạo lực cách mạng cho miền Nam",
      "Kết hợp đấu tranh chính trị với đấu tranh vũ trang",
      "Mở đường cho phong trào Đồng Khởi",
      "Thành lập Đoàn 559 (19/5/1959) mở đường Trường Sơn"
    ]
  },
  {
    year: "9/1960",
    title: "Đại hội Đảng III",
    description: "Đề ra đường lối chiến lược chung cho cả nước: Tiến hành đồng thời hai chiến lược cách mạng ở hai miền.",
    highlight: true,
    image: "https://baotayninh.vn/image/fckeditor/upload/2020/20200728/images/115_2020-dai-hoi-iii.jpg",
    details: "Đại hội đại biểu toàn quốc lần thứ III của Đảng họp tại Hà Nội từ ngày 5 đến 10/9/1960. Đây là Đại hội 'xây dựng CNXH ở miền Bắc và đấu tranh hòa bình thống nhất nước nhà'. Đại hội đã hoàn chỉnh đường lối cách mạng Việt Nam trong giai đoạn mới.",
    keyPoints: [
      "Miền Bắc: Cách mạng XHCN - vai trò 'quyết định nhất'",
      "Miền Nam: Cách mạng dân tộc dân chủ - vai trò 'quyết định trực tiếp'",
      "Đề ra Kế hoạch 5 năm lần thứ nhất (1961-1965)",
      "Bầu đồng chí Lê Duẩn làm Bí thư thứ nhất"
    ]
  },
  {
    year: "12/1960",
    title: "Thành lập MTDTGP Miền Nam",
    description: "Mặt trận Dân tộc Giải phóng miền Nam Việt Nam ra đời, tập hợp rộng rãi các tầng lớp nhân dân.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCQ8afsvMMQk24FOtbtFbU82zGGJsEISAfag&s",
    details: "Ngày 20/12/1960, tại xã Tân Lập, huyện Châu Thành, tỉnh Tây Ninh, Mặt trận Dân tộc Giải phóng miền Nam Việt Nam được thành lập. Đây là kết quả thắng lợi của phong trào Đồng Khởi và là hình thức mặt trận rộng rãi đoàn kết mọi tầng lớp nhân dân miền Nam.",
    keyPoints: [
      "Thành lập tại Tây Ninh ngày 20/12/1960",
      "Kết quả thắng lợi của phong trào Đồng Khởi",
      "Tập hợp mọi tầng lớp nhân dân yêu nước chống Mỹ",
      "Lãnh đạo cuộc đấu tranh giải phóng miền Nam"
    ]
  },
  {
    year: "1961-1965",
    title: "Chống 'Chiến tranh đặc biệt'",
    description: "Quân dân miền Nam đánh bại chiến lược 'Chiến tranh đặc biệt' của Mỹ với các chiến thắng vang dội.",
    image: "https://file3.qdnd.vn/data/images/5/2020/12/23/phucthang/11.jpg",
    details: "Từ năm 1961, Mỹ thực hiện chiến lược 'Chiến tranh đặc biệt' ở miền Nam - dùng quân đội Sài Gòn, cố vấn Mỹ, vũ khí Mỹ. Quân dân ta kiên cường đấu tranh theo phương châm 'Hai chân, Ba mũi, Ba vùng' và giành được nhiều thắng lợi quan trọng.",
    keyPoints: [
      "Chiến thắng Ấp Bắc (2/1/1963) - đánh bại 'trực thăng vận', 'thiết xa vận'",
      "Chiến thắng Bình Giã (12/1964)",
      "Chiến thắng Ba Gia, Đồng Xoài (1965)",
      "Phá sản chiến lược 'Chiến tranh đặc biệt' của Mỹ"
    ]
  }
];

export const LEADERSHIP_POINTS: LeadershipPoint[] = [
  {
    id: 1,
    title: "Đường lối chiến lược chung",
    quote: "Miền Bắc là nền tảng, miền Nam là tiền tuyến.",
    content: "Đảng xác định tiến hành đồng thời: Cách mạng XHCN ở miền Bắc và Cách mạng dân tộc dân chủ nhân dân ở miền Nam.",
    example: "Đại hội Đại biểu toàn quốc lần thứ III (9/1960).",
    icon: 'Flag'
  },
  {
    id: 2,
    title: "Chuyển hướng chỉ đạo (1959)",
    quote: "Con đường phát triển cơ bản của cách mạng Việt Nam ở miền Nam là khởi nghĩa giành chính quyền về tay nhân dân.",
    content: "Chuyển từ đấu tranh chính trị đơn thuần sang kết hợp đấu tranh chính trị với đấu tranh vũ trang.",
    example: "Nghị quyết 15 (1/1959) dẫn đến phong trào Đồng Khởi.",
    icon: 'Flame'
  },
  {
    id: 3,
    title: "Chi viện Bắc - Nam",
    quote: "Thóc không thiếu một cân, quân không thiếu một người.",
    content: "Tổ chức tuyến đường vận tải chiến lược Bắc - Nam (Đường Hồ Chí Minh) trên bộ và trên biển.",
    example: "Đoàn 559 (xẻ dọc Trường Sơn) và Đoàn 759 (Đường Hồ Chí Minh trên biển).",
    icon: 'Users'
  },
  {
    id: 4,
    title: "Nghệ thuật quân sự",
    quote: "Bám thắt lưng địch mà đánh.",
    content: "Kết hợp đấu tranh quân sự với đấu tranh chính trị và binh vận (Ba mũi giáp công).",
    example: "Chiến thắng Ấp Bắc (1963) đánh bại thuật trực thăng vận, thiết xa vận.",
    icon: 'Swords'
  },
  {
    id: 5,
    title: "Xây dựng lực lượng",
    quote: "Đoàn kết, đoàn kết, đại đoàn kết.",
    content: "Tập hợp lực lượng toàn dân tộc trong các mặt trận thống nhất.",
    example: "Mặt trận Tổ quốc VN (miền Bắc) & Mặt trận Dân tộc Giải phóng (miền Nam).",
    icon: 'Book'
  }
];

export const MAP_POINTS: MapPoint[] = [
  {
    id: 'hn',
    x: 48,
    y: 8,
    label: "Hà Nội",
    desc: "Thủ đô, Trái tim của cả nước, nơi ra đời Nghị quyết 15 (1/1959). Trung tâm chỉ đạo chiến lược cách mạng hai miền.",
    type: "capital"
  },
  {
    id: 'd559',
    x: 42,
    y: 18,
    label: "Đoàn 559",
    desc: "Thành lập ngày 19/5/1959, phụ trách mở đường Trường Sơn (Đường Hồ Chí Minh trên bộ), vận chuyển vũ khí, quân nhu, bộ đội từ Bắc vào Nam.",
    type: "military"
  },
  {
    id: 'd759',
    x: 58,
    y: 22,
    label: "Đoàn 759",
    desc: "Thành lập ngày 23/10/1961, phụ trách Đường Hồ Chí Minh trên biển. Vận chuyển vũ khí bằng tàu thuyền từ miền Bắc vào các bến bí mật ven biển miền Nam.",
    type: "navy"
  },
  {
    id: 'ts1',
    x: 38,
    y: 30,
    label: "Đường Trường Sơn - Bắc",
    desc: "Đoạn phía Bắc của Đường Hồ Chí Minh, xuyên qua đất Lào. Hành lang vận chuyển chiến lược nối liền hậu phương với tiền tuyến.",
    type: "route"
  },
  {
    id: 'ts2',
    x: 35,
    y: 45,
    label: "Đường Trường Sơn - Trung",
    desc: "Đoạn giữa của tuyến đường, vượt qua Tây Nguyên. Nơi đặt các kho hậu cần, trạm giao liên bí mật.",
    type: "route"
  },
  {
    id: 'ts3',
    x: 40,
    y: 60,
    label: "Đường Trường Sơn - Nam",
    desc: "Đoạn cuối của tuyến đường, dẫn vào các căn cứ miền Đông Nam Bộ và đồng bằng sông Cửu Long.",
    type: "route"
  },
  {
    id: 'tay_nguyen',
    x: 50,
    y: 52,
    label: "Tây Nguyên",
    desc: "Địa bàn chiến lược quan trọng. Nơi đặt các căn cứ kháng chiến và là điểm trung chuyển quân, vũ khí từ Bắc vào Nam.",
    type: "base"
  },
  {
    id: 'rung_sac',
    x: 58,
    y: 75,
    label: "Đặc công Rừng Sác",
    desc: "Căn cứ địa cách mạng ở vùng rừng ngập mặn. Đoàn 10 Đặc công Rừng Sác hoạt động táo bạo, đánh phá kho tàng, tàu địch ngay sát nách Sài Gòn.",
    type: "special"
  },
  {
    id: 'cu_chi',
    x: 52,
    y: 72,
    label: "Địa đạo Củ Chi",
    desc: "Hệ thống địa đạo dài hơn 200km, là căn cứ bí mật của quân dân Củ Chi. Nơi đây được mệnh danh là 'đất thép thành đồng'.",
    type: "base"
  },
  {
    id: 'sg',
    x: 56,
    y: 80,
    label: "Sài Gòn",
    desc: "Sào huyệt của Mỹ - Ngụy. Nơi diễn ra các phong trào đấu tranh chính trị sôi sục của công nhân, học sinh, sinh viên, phật tử.",
    type: "city"
  },
  {
    id: 'bt',
    x: 50,
    y: 88,
    label: "Bến Tre",
    desc: "Cái nôi của phong trào Đồng Khởi (1/1960). Nơi nhân dân đứng lên dùng gậy tầm vông, giáo mác phá tan hệ thống kìm kẹp của địch.",
    type: "uprising"
  },
  {
    id: 'tay_ninh',
    x: 45,
    y: 75,
    label: "Tây Ninh",
    desc: "Nơi thành lập Mặt trận Dân tộc Giải phóng miền Nam Việt Nam (20/12/1960). Căn cứ địa cách mạng quan trọng.",
    type: "base"
  },
  {
    id: 'ap_bac',
    x: 52,
    y: 83,
    label: "Ấp Bắc",
    desc: "Nơi diễn ra trận Ấp Bắc (2/1/1963), đánh bại chiến thuật 'trực thăng vận', 'thiết xa vận' của Mỹ-Ngụy. Chứng minh quân dân miền Nam có thể đánh thắng quân đội hiện đại.",
    type: "battle"
  }
];

export const QUIZ_DATA: QuizQuestion[] = [
  {
    id: 1,
    question: "Sau Hiệp định Giơnevơ (7/1954), đặc điểm nổi bật của tình hình Việt Nam là gì?",
    options: [
      "Cả nước hoàn toàn giải phóng và đi lên chủ nghĩa xã hội.",
      "Đất nước tạm thời bị chia cắt làm hai miền với hai chế độ chính trị khác nhau.",
      "Miền Nam được giải phóng, miền Bắc tiếp tục đấu tranh chống Pháp.",
      "Mỹ trực tiếp đưa quân viễn chinh vào xâm lược cả hai miền Nam - Bắc."
    ],
    correctAnswer: 1, // B
    explanation: "Sau Hiệp định Giơnevơ (7/1954), đất nước bị chia làm hai miền có chế độ chính trị, xã hội khác nhau: miền Bắc hoàn toàn giải phóng đi lên CNXH, miền Nam trở thành thuộc địa kiểu mới của Mỹ."
  },
  {
    id: 2,
    question: "Nghị quyết Hội nghị lần thứ 16 Ban Chấp hành Trung ương Đảng (4/1959) đã xác định nguyên tắc nào cho phong trào hợp tác hóa nông nghiệp ở miền Bắc?",
    options: [
      "Cưỡng chế, tập trung và bao cấp.",
      "Tự nguyện, cùng có lợi và quản lý dân chủ.",
      "Khẩn trương, nhanh chóng và quy mô lớn.",
      "Nhà nước nắm toàn quyền quản lý ruộng đất."
    ],
    correctAnswer: 1, // B
    explanation: "Tháng 4/1959, Hội nghị lần thứ 16 BCH Trung ương Đảng thông qua Nghị quyết về hợp tác hóa nông nghiệp, xác định ba nguyên tắc là: 'tự nguyện, cùng có lợi và quản lý dân chủ'."
  },
  {
    id: 3,
    question: "Bản dự thảo 'Đề cương đường lối cách mạng Việt Nam ở miền Nam' do đồng chí Lê Duẩn khởi thảo (8/1956) đã khẳng định điều gì?",
    options: [
      "Nhân dân miền Nam phải chờ đợi tổng tuyển cử để thống nhất đất nước.",
      "Cần tranh thủ sự ủng hộ của quốc tế để đàm phán hòa bình.",
      "Nhân dân miền Nam chỉ có con đường cứu nước và tự cứu mình là con đường cách mạng.",
      "Cần tập trung phát triển kinh tế tư bản chủ nghĩa tại miền Nam."
    ],
    correctAnswer: 2, // C
    explanation: "Đề cương khẳng định 'nhân dân miền Nam chỉ có con đường cứu nước và tự cứu mình, là con đường cách mạng' trước chế độ độc tài Mỹ - Diệm."
  },
  {
    id: 4,
    question: "Hội nghị Trung ương lần thứ 15 (1/1959) đã xác định phương hướng cơ bản của cách mạng miền Nam là gì?",
    options: [
      "Chỉ sử dụng đấu tranh chính trị hòa bình.",
      "Chỉ sử dụng đấu tranh vũ trang để giành chính quyền.",
      "Khởi nghĩa giành chính quyền về tay nhân dân bằng con đường bạo lực, kết hợp đấu tranh chính trị với đấu tranh vũ trang.",
      "Chờ đợi sự chi viện quân sự toàn diện từ các nước xã hội chủ nghĩa."
    ],
    correctAnswer: 2, // C
    explanation: "Nghị quyết 15 (1/1959) xác định con đường cơ bản là khởi nghĩa giành chính quyền, sử dụng bạo lực cách mạng kết hợp đấu tranh chính trị với đấu tranh vũ trang."
  },
  {
    id: 5,
    question: "Tuyến đường vận tải chiến lược trên bộ (Đường 559 - Đường mòn Hồ Chí Minh) được hình thành vào thời gian nào?",
    options: [
      "Ngày 19/5/1959.",
      "Ngày 23/10/1961.",
      "Ngày 20/12/1960.",
      "Ngày 17/1/1960."
    ],
    correctAnswer: 0, // A
    explanation: "Đoàn 559 được thành lập và tuyến đường vận tải chiến lược trên bộ (Đường Hồ Chí Minh) được hình thành từ ngày 19/5/1959."
  },
  {
    id: 6,
    question: "Kết quả lớn nhất của phong trào 'Đồng khởi' (1959-1960) là sự ra đời của tổ chức nào?",
    options: [
      "Mặt trận Tổ quốc Việt Nam.",
      "Quân giải phóng miền Nam Việt Nam.",
      "Mặt trận Dân tộc giải phóng miền Nam Việt Nam.",
      "Liên minh các lực lượng dân tộc, dân chủ và hòa bình Việt Nam."
    ],
    correctAnswer: 2, // C
    explanation: "Ngày 20/12/1960, tại Tây Ninh, Mặt trận Dân tộc giải phóng miền Nam Việt Nam được thành lập, đánh dấu thắng lợi của phong trào Đồng khởi."
  },
  {
    id: 7,
    question: "Đại hội đại biểu toàn quốc lần thứ III của Đảng (9/1960) xác định cách mạng xã hội chủ nghĩa ở miền Bắc giữ vai trò như thế nào?",
    options: [
      "Vai trò quyết định trực tiếp.",
      "Vai trò quyết định nhất.",
      "Vai trò hỗ trợ hậu cần.",
      "Vai trò quan trọng thứ yếu."
    ],
    correctAnswer: 1, // B
    explanation: "Đại hội III xác định cách mạng XHCN ở miền Bắc giữ vai trò 'quyết định nhất', còn cách mạng miền Nam giữ vai trò 'quyết định trực tiếp'."
  },
  {
    id: 8,
    question: "Trong Kế hoạch Nhà nước 5 năm lần thứ nhất (1961 - 1965), phong trào thi đua nào là biểu tượng của thanh niên miền Bắc?",
    options: [
      "Ba nhất.",
      "Gió Đại Phong.",
      "Ba sẵn sàng.",
      "Ba đảm đang."
    ],
    correctAnswer: 2, // C
    explanation: "Thanh niên có phong trào 'Ba sẵn sàng'. (Ba nhất: Quân đội, Gió Đại Phong: Nông nghiệp, Ba đảm đang: Phụ nữ)."
  },
  {
    id: 9,
    question: "Chiến lược 'Chiến tranh đặc biệt' của Mỹ ở miền Nam Việt Nam (1961-1965) được thực hiện dựa trên công thức cơ bản nào?",
    options: [
      "Quân đội Mỹ, Vũ khí Mỹ.",
      "Quân đội Sài Gòn, Cố vấn Mỹ, Vũ khí và phương tiện chiến tranh của Mỹ.",
      "Quân đội Mỹ, Quân đồng minh, Quân đội Sài Gòn.",
      "Lực lượng không quân, hải quân Mỹ, Quân đội Sài Gòn."
    ],
    correctAnswer: 1, // B
    explanation: "'Chiến tranh đặc biệt' là dùng người Việt đánh người Việt: Quân đội Sài Gòn + Cố vấn Mỹ + Vũ khí Mỹ."
  },
  {
    id: 10,
    question: "Trong chiến lược 'Chiến tranh đặc biệt', Mỹ và chính quyền Sài Gòn coi biện pháp nào là 'quốc sách'?",
    options: [
      "Tăng cường viện trợ kinh tế.",
      "Mở rộng chiến tranh phá hoại miền Bắc.",
      "Dồn dân lập 'ấp chiến lược'.",
      "Sử dụng chất độc hóa học."
    ],
    correctAnswer: 2, // C
    explanation: "Mỹ dự định lập 17.000 ấp chiến lược để tách dân khỏi cách mạng và coi đây là 'quốc sách' của chiến lược này."
  },
  {
    id: 11,
    question: "Chiến thắng quân sự nào của quân dân miền Nam vào ngày 2/1/1963 đã đánh bại các chiến thuật 'trực thăng vận', 'thiết xa vận' của Mỹ?",
    options: [
      "Chiến thắng Bình Giã.",
      "Chiến thắng Ấp Bắc.",
      "Chiến thắng Ba Gia.",
      "Chiến thắng Đồng Xoài."
    ],
    correctAnswer: 1, // B
    explanation: "Chiến thắng Ấp Bắc (Mỹ Tho) ngày 2/1/1963 đã đánh bại các chiến thuật tân kỳ 'trực thăng vận', 'thiết xa vận'."
  },
  {
    id: 12,
    question: "Các chiến thắng Bình Giã, Ba Gia, Đồng Xoài (đến giữa năm 1965) có ý nghĩa chiến lược gì?",
    options: [
      "Mở đầu cho phong trào Đồng khởi.",
      "Buộc Mỹ phải tuyên bố phi Mỹ hóa chiến tranh.",
      "Làm phá sản về cơ bản chiến lược 'Chiến tranh đặc biệt' của Mỹ.",
      "Kết thúc hoàn toàn cuộc kháng chiến chống Mỹ."
    ],
    correctAnswer: 2, // C
    explanation: "Các chiến thắng này đã làm phá sản về cơ bản chiến lược 'Chiến tranh đặc biệt', buộc Mỹ phải chuyển sang 'Chiến tranh cục bộ'."
  }
];
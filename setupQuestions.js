import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';

// Config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAfqzdpIEFzK06dAnm7y6vhDO6aqs15AWY",
  authDomain: "chat-app-5396e.firebaseapp.com",
  projectId: "chat-app-5396e",
  storageBucket: "chat-app-5396e.appspot.com",
  messagingSenderId: "30357547888",
  appId: "1:30357547888:web:b1f337ef5271f78a25bdb5",
  measurementId: "G-15J84L6KTP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Data câu hỏi
const questions = [
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

// Xóa tất cả câu hỏi cũ
async function deleteAllQuestions() {
  console.log('🗑️ Đang xóa câu hỏi cũ...');
  const querySnapshot = await getDocs(collection(db, 'questions'));
  console.log(`📊 Tìm thấy ${querySnapshot.size} câu hỏi cần xóa`);
  
  for (const doc of querySnapshot.docs) {
    await deleteDoc(doc.ref);
  }
  console.log('✅ Đã xóa tất cả câu hỏi cũ');
}

// Import vào Firestore
async function importQuestions() {
  console.log('📝 Bắt đầu thêm câu hỏi mới...');
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    await addDoc(collection(db, 'questions'), q);
    console.log(`✅ Đã thêm câu ${i + 1}/10: ${q.question}`);
  }
  console.log('🎉 Hoàn thành! Đã thêm 10 câu hỏi mẫu');
}

// Chạy script
async function runSetup() {
  try {
    await deleteAllQuestions();
    await importQuestions();
  } catch (error) {
    console.error('❌ Lỗi:', error);
  }
}

runSetup();

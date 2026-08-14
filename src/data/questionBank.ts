import { Question } from '../types';

export const QUESTION_BANK: Question[] = [
  // ==========================================
  // --- CHƯƠNG I: PHẢN ỨNG HOÁ HỌC ---
  // ==========================================
  // Bài 2: Phản ứng hoá học
  {
    id: 'Q2.1',
    lessonId: 2,
    chapterId: 1,
    subject: 'chemistry',
    difficulty: 'nhan_biet',
    question: 'Quá trình nào sau đây là biến đổi hoá học?',
    options: [
      'Đốt cháy cồn trong đĩa.',
      'Hơ nóng chiếc thìa inox.',
      'Hoà tan muối ăn vào nước.',
      'Nước hoa trong lọ mở nắp bị bay hơi.'
    ],
    correctIndex: 0,
    explanation: 'Đốt cháy cồn (ethanol tác dụng với oxygen sinh ra khí carbon dioxide và hơi nước) là biến đổi hoá học vì có chất mới được tạo thành.',
    bookReference: 'SBT KHTN 8 - Bài 2.1 (Trang 5 & 115)',
    hint: 'Biến đổi hoá học luôn tạo ra chất mới khác biệt chất ban đầu.'
  },
  {
    id: 'Q2.2',
    lessonId: 2,
    chapterId: 1,
    subject: 'chemistry',
    difficulty: 'nhan_biet',
    question: 'Quá trình nào sau đây chỉ xảy ra biến đổi vật lí?',
    options: [
      'Đốt cháy củi trong bếp.',
      'Thắp sáng bóng đèn dây tóc.',
      'Đốt sợi dây đồng trên lửa đèn cồn.',
      'Để sợi dây thép ngoài không khí ẩm bị gỉ.'
    ],
    correctIndex: 1,
    explanation: 'Thắp sáng bóng đèn dây tóc chỉ làm dây tóc nóng lên và phát sáng, không sinh ra chất mới nên là biến đổi vật lí.',
    bookReference: 'SBT KHTN 8 - Bài 2.2 (Trang 5 & 115)',
    hint: 'Biến đổi vật lí chỉ thay đổi trạng thái, hình dạng, không sinh ra chất mới.'
  },
  {
    id: 'Q2.5',
    lessonId: 2,
    chapterId: 1,
    subject: 'chemistry',
    difficulty: 'thong_hieu',
    question: 'Khi đốt nến (paraffin), nến chảy lỏng thấm vào bấc, hoá hơi rồi cháy trong không khí tạo thành CO2 và H2O. Giai đoạn nào là biến đổi hoá học?',
    options: [
      'Giai đoạn nến nóng chảy từ thể rắn sang lỏng.',
      'Giai đoạn nến lỏng thấm vào bấc và hoá hơi.',
      'Giai đoạn hơi nến cháy trong không khí tạo thành carbon dioxide và hơi nước.',
      'Cả ba giai đoạn trên đều là biến đổi hoá học.'
    ],
    correctIndex: 2,
    explanation: 'Nến chảy lỏng và hoá hơi là biến đổi vật lí (chỉ đổi trạng thái). Giai đoạn hơi nến cháy tạo ra chất mới (CO2 và H2O) là biến đổi hoá học.',
    bookReference: 'SBT KHTN 8 - Bài 2.5 (Trang 6 & 115)',
    hint: 'Chỉ giai đoạn cháy tạo khí CO2 và H2O mới là biến đổi hoá học.'
  },
  {
    id: 'Q2.6',
    lessonId: 2,
    chapterId: 1,
    subject: 'chemistry',
    difficulty: 'nhan_biet',
    question: 'Dấu hiệu nào sau đây chứng tỏ có phản ứng hoá học xảy ra?',
    options: [
      'Có sự thay đổi màu sắc, xuất hiện chất khí hoặc chất kết tủa, tỏa nhiệt.',
      'Chỉ có sự thay đổi kích thước của vật thể.',
      'Vật thể chuyển từ thể rắn sang thể lỏng.',
      'Vật thể bị chia nhỏ thành nhiều mảnh vụn.'
    ],
    correctIndex: 0,
    explanation: 'Các dấu hiệu nhận biết phản ứng hoá học: thay đổi màu sắc, sủi bọt khí, xuất hiện kết tủa, phát sáng hoặc toả/thu nhiệt.',
    bookReference: 'SGK KHTN 8 - Bài 2',
    hint: 'Phản ứng hoá học kèm theo sự xuất hiện chất mới có tính chất khác.'
  },

  // Bài 3: Mol và tỉ khối chất khí
  {
    id: 'Q3.1',
    lessonId: 3,
    chapterId: 1,
    subject: 'chemistry',
    difficulty: 'van_dung',
    question: 'Tính số mol nguyên tử Potassium (K) có trong 8,428 × 10^22 nguyên tử K:',
    options: [
      '0,14 mol',
      '0,25 mol',
      '1,40 mol',
      '0,07 mol'
    ],
    correctIndex: 0,
    explanation: 'Số mol nguyên tử K = (8,428 × 10^22) / (6,022 × 10^23) = 0,14 mol.',
    bookReference: 'SBT KHTN 8 - Bài 3.1a (Trang 8 & 116)',
    hint: 'n = N / N_A với N_A = 6,022 × 10^23.'
  },
  {
    id: 'Q3.7',
    lessonId: 3,
    chapterId: 1,
    subject: 'chemistry',
    difficulty: 'van_dung',
    question: 'Ở điều kiện chuẩn (25 °C, 1 bar), thể tích của 1,5 mol khí Methane (CH4) là bao nhiêu?',
    options: [
      '33,600 L',
      '37,185 L',
      '24,790 L',
      '49,580 L'
    ],
    correctIndex: 1,
    explanation: 'Áp dụng công thức V = n × 24,79 = 1,5 × 24,79 = 37,185 L.',
    bookReference: 'SBT KHTN 8 - Bài 3.7a (Trang 9 & 117)',
    hint: 'Ở đkc (25 °C, 1 bar), 1 mol khí chiếm thể tích 24,79 lít.'
  },
  {
    id: 'Q3.10',
    lessonId: 3,
    chapterId: 1,
    subject: 'chemistry',
    difficulty: 'thong_hieu',
    question: 'Tỉ khối đối với không khí của khí ammonia (NH3) là bao nhiêu (biết M_kk = 29 g/mol)?',
    options: [
      'd = 0,586 (nhẹ hơn không khí)',
      'd = 1,706 (nặng hơn không khí)',
      'd = 1,259 (nặng hơn không khí)',
      'd = 0,980 (xấp xỉ không khí)'
    ],
    correctIndex: 0,
    explanation: 'M_NH3 = 14 + 3 = 17 g/mol. Tỉ khối d(NH3/kk) = 17 / 29 ≈ 0,586 < 1 => khí NH3 nhẹ hơn không khí.',
    bookReference: 'SBT KHTN 8 - Bài 3.10 (Trang 9 & 117)',
    hint: 'd(A/kk) = M_A / 29.'
  },
  {
    id: 'Q3.12',
    lessonId: 3,
    chapterId: 1,
    subject: 'chemistry',
    difficulty: 'nhan_biet',
    question: 'Khối lượng mol của một chất là gì?',
    options: [
      'Là khối lượng tính bằng gam của 1 mol chất đó (N_A nguyên tử hoặc phân tử chất đó).',
      'Là thể tích chiếm bởi 1 gam chất đó.',
      'Là số lượng hạt nguyên tử có trong 1 kilôgam chất.',
      'Là tỉ số khối lượng giữa chất đó và khí hydrogen.'
    ],
    correctIndex: 0,
    explanation: 'Khối lượng mol (kí hiệu M) của một chất là khối lượng tính bằng gam của N_A nguyên tử hoặc phân tử chất đó.',
    bookReference: 'SGK KHTN 8 - Bài 3',
    hint: 'Đơn vị của khối lượng mol là g/mol.'
  },

  // Bài 4: Dung dịch và nồng độ
  {
    id: 'Q4.1',
    lessonId: 4,
    chapterId: 1,
    subject: 'chemistry',
    difficulty: 'van_dung',
    question: 'Khối lượng H2O2 có trong 30 g dung dịch nồng độ 3% là:',
    options: [
      '10 g',
      '3 g',
      '0,9 g',
      '0,1 g'
    ],
    correctIndex: 2,
    explanation: 'Áp dụng công thức: m_ct = (m_dd × C%) / 100% = (30 × 3) / 100 = 0,9 g.',
    bookReference: 'SBT KHTN 8 - Bài 4.1 (Trang 11 & 119)',
    hint: 'm_ct = m_dd × C% / 100%.'
  },
  {
    id: 'Q4.2',
    lessonId: 4,
    chapterId: 1,
    subject: 'chemistry',
    difficulty: 'van_dung',
    question: 'Khối lượng NaOH có trong 300 mL dung dịch nồng độ 0,15 M là (biết M_NaOH = 40 g/mol):',
    options: [
      '1,8 g',
      '0,045 g',
      '4,5 g',
      '0,125 g'
    ],
    correctIndex: 0,
    explanation: 'n_NaOH = CM × V = 0,15 × 0,3 = 0,045 mol. Khối lượng m_NaOH = 0,045 × 40 = 1,8 g.',
    bookReference: 'SBT KHTN 8 - Bài 4.2 (Trang 11 & 119)',
    hint: 'Đổi 300 mL = 0,3 L; n = CM × V; m = n × M.'
  },
  {
    id: 'Q4.5',
    lessonId: 4,
    chapterId: 1,
    subject: 'chemistry',
    difficulty: 'nhan_biet',
    question: 'Dung dịch chưa bão hoà là dung dịch:',
    options: [
      'Có thể hoà tan thêm chất tan ở một nhiệt độ xác định.',
      'Không thể hoà tan thêm chất tan ở một nhiệt độ xác định.',
      'Có lượng chất tan nhiều hơn lượng dung môi.',
      'Có màu sắc đậm đặc.'
    ],
    correctIndex: 0,
    explanation: 'Dung dịch chưa bão hoà là dung dịch vẫn có thể hoà tan thêm chất tan ở nhiệt độ xác định.',
    bookReference: 'SGK KHTN 8 - Bài 4',
    hint: 'Chưa bão hòa nghĩa là vẫn còn khả năng hòa tan thêm.'
  },

  // Bài 5: Định luật bảo toàn khối lượng và PTHH
  {
    id: 'Q5.1',
    lessonId: 5,
    chapterId: 1,
    subject: 'chemistry',
    difficulty: 'van_dung',
    question: 'Một lá sắt nặng 28 g để ngoài không khí phản ứng với oxygen tạo ra gỉ sắt. Sau một thời gian cân lại thấy khối lượng là 31,2 g. Khối lượng oxygen đã phản ứng là:',
    options: [
      '3,2 g',
      '1,6 g',
      '6,4 g',
      '24,8 g'
    ],
    correctIndex: 0,
    explanation: 'Theo định luật bảo toàn khối lượng: m_Fe + m_O2 = m_gỉ sắt => m_O2 = 31,2 - 28 = 3,2 g.',
    bookReference: 'SBT KHTN 8 - Bài 5.1 (Trang 15 & 125)',
    hint: 'Tổng khối lượng các chất tham gia = tổng khối lượng các sản phẩm.'
  },
  {
    id: 'Q5.3',
    lessonId: 5,
    chapterId: 1,
    subject: 'chemistry',
    difficulty: 'thong_hieu',
    question: 'Trong một phản ứng hoá học, các chất phản ứng biến đổi thành sản phẩm là do:',
    options: [
      'Số lượng các nguyên tử bị thay đổi sau phản ứng.',
      'Liên kết giữa các nguyên tử bị phá vỡ và hình thành liên kết mới.',
      'Các nguyên tố biến đổi thành nguyên tố khác.',
      'Khối lượng của mỗi nguyên tử bị giảm đi.'
    ],
    correctIndex: 1,
    explanation: 'Trong phản ứng hoá học, số lượng nguyên tử mỗi nguyên tố được giữ nguyên, chỉ có liên kết giữa các nguyên tử thay đổi làm phân tử này biến thành phân tử khác.',
    bookReference: 'SGK KHTN 8 - Bài 5',
    hint: 'Bản chất phản ứng là sự sắp xếp lại liên kết giữa các nguyên tử.'
  },

  // Bài 6: Tính theo PTHH
  {
    id: 'Q6.1',
    lessonId: 6,
    chapterId: 1,
    subject: 'chemistry',
    difficulty: 'van_dung',
    question: 'Đốt cháy hoàn toàn 6,2 g phosphorus (P) trong khí oxygen, thu được khối lượng oxide P2O5 là (cho P=31, O=16):',
    options: [
      '14,2 g',
      '28,4 g',
      '11,0 g',
      '22,0 g'
    ],
    correctIndex: 0,
    explanation: 'n_P = 6,2 / 31 = 0,2 mol. PTHH: 4P + 5O2 -> 2P2O5. n_P2O5 = 0,2 / 2 = 0,1 mol. m_P2O5 = 0,1 × 142 = 14,2 g.',
    bookReference: 'SBT KHTN 8 - Bài 6.1 (Trang 19 & 128)',
    hint: 'Tìm số mol P -> viết PTHH -> tỉ lệ mol -> khối lượng P2O5.'
  },
  {
    id: 'Q6.11',
    lessonId: 6,
    chapterId: 1,
    subject: 'chemistry',
    difficulty: 'van_dung',
    question: 'Nhiệt phân 19,6 g KClO3 thu được 0,18 mol O2. Hiệu suất của phản ứng nhiệt phân là (K=39, Cl=35,5, O=16):',
    options: [
      '25%',
      '50%',
      '75%',
      '60%'
    ],
    correctIndex: 2,
    explanation: 'n_KClO3 = 19,6 / 122,5 = 0,16 mol. PTHH: 2KClO3 -> 2KCl + 3O2. n_O2 lý thuyết = 0,16 × 1,5 = 0,24 mol. H = (0,18 / 0,24) × 100% = 75%.',
    bookReference: 'SBT KHTN 8 - Bài 6.11 (Trang 20 & 129)',
    hint: 'H = (lượng thực tế / lượng lý thuyết) × 100%.'
  },

  // Bài 7: Tốc độ phản ứng và chất xúc tác
  {
    id: 'Q7.1',
    lessonId: 7,
    chapterId: 1,
    subject: 'chemistry',
    difficulty: 'nhan_biet',
    question: 'Than cháy trong bình khí oxygen nhanh và mãnh liệt hơn cháy trong không khí. Yếu tố đã làm tăng tốc độ của phản ứng này là:',
    options: [
      'Tăng nhiệt độ.',
      'Tăng nồng độ chất phản ứng.',
      'Tăng diện tích bề mặt tiếp xúc.',
      'Dùng chất xúc tác.'
    ],
    correctIndex: 1,
    explanation: 'Nồng độ oxygen trong bình khí oxygen tinh khiết cao hơn nhiều so với trong không khí (~21%), làm tăng tần số va chạm hiệu quả giữa các phân tử.',
    bookReference: 'SBT KHTN 8 - Bài 7.1 (Trang 23 & 131)',
    hint: 'Nồng độ chất phản ứng càng lớn thì tốc độ phản ứng càng nhanh.'
  },
  {
    id: 'Q7.4',
    lessonId: 7,
    chapterId: 1,
    subject: 'chemistry',
    difficulty: 'thong_hieu',
    question: 'Chất xúc tác là chất có vai trò gì trong phản ứng hoá học?',
    options: [
      'Làm tăng tốc độ phản ứng nhưng không bị biến đổi về chất và lượng sau phản ứng.',
      'Làm giảm tốc độ phản ứng và biến thành chất mới sau phản ứng.',
      'Làm tăng khối lượng sản phẩm tạo thành.',
      'Là chất tham gia phản ứng và bị tiêu hao hoàn toàn.'
    ],
    correctIndex: 0,
    explanation: 'Chất xúc tác làm tăng tốc độ phản ứng hoá học mà không bị tiêu hao hay biến đổi sau phản ứng.',
    bookReference: 'SGK KHTN 8 - Bài 7',
    hint: 'Xúc tác đẩy nhanh phản ứng nhưng được bảo toàn khối lượng và tính chất.'
  },

  // ==========================================
  // --- CHƯƠNG II: MỘT SỐ HỢP CHẤT THÔNG DỤNG ---
  // ==========================================
  // Bài 8: Acid
  {
    id: 'Q8.2',
    lessonId: 8,
    chapterId: 2,
    subject: 'chemistry',
    difficulty: 'nhan_biet',
    question: 'Dung dịch / chất lỏng nào sau đây làm đổi màu quỳ tím thành đỏ?',
    options: [
      'Nước đường.',
      'Nước cất.',
      'Giấm ăn.',
      'Nước muối sinh lí.'
    ],
    correctIndex: 2,
    explanation: 'Giấm ăn chứa acetic acid (CH3COOH) có tính acid nên làm quỳ tím hóa đỏ.',
    bookReference: 'SBT KHTN 8 - Bài 8.2 (Trang 26 & 132)',
    hint: 'Dung dịch acid làm quỳ tím chuyển sang màu đỏ.'
  },
  {
    id: 'Q8.16',
    lessonId: 8,
    chapterId: 2,
    subject: 'chemistry',
    difficulty: 'thong_hieu',
    question: 'Xoong, nồi đun nấu lâu ngày thường có lớp cặn CaCO3 bám dưới đáy. Trong gia đình có thể dùng chất nào sau đây để loại bỏ cặn an toàn?',
    options: [
      'Dung dịch nước muối ăn.',
      'Giấm ăn hoặc nước cốt chanh.',
      'Nước xà phòng giặt.',
      'Dung dịch nước vôi trong.'
    ],
    correctIndex: 1,
    explanation: 'Giấm ăn (chứa CH3COOH) hoặc chanh (chứa citric acid) tác dụng với CaCO3 tạo muối tan và giải phóng khí CO2.',
    bookReference: 'SBT KHTN 8 - Bài 8.16 (Trang 28 & 134)',
    hint: 'Acid tác dụng với muối carbonate tạo khí CO2 và làm tan cặn.'
  },

  // Bài 9: Base - Thang pH
  {
    id: 'Q9.6',
    lessonId: 9,
    chapterId: 2,
    subject: 'chemistry',
    difficulty: 'thong_hieu',
    question: 'Người nông dân thường dùng chất nào sau đây để khử độ chua (giảm độ acid) của đất trồng trọt?',
    options: [
      'Vôi tôi Ca(OH)2 hoặc vôi bột CaO.',
      'Hydrochloric acid (HCl).',
      'Muối ăn (NaCl).',
      'Cát mịn.'
    ],
    correctIndex: 0,
    explanation: 'Vôi (CaO/Ca(OH)2) có tính base, sẽ trung hòa lượng acid dư trong đất chua, đưa pH đất về mức thích hợp cho cây trồng.',
    bookReference: 'SBT KHTN 8 - Bài 9.6 (Trang 29 & 135)',
    hint: 'Dùng base để trung hoà acid trong đất chua.'
  },
  {
    id: 'Q9.2',
    lessonId: 9,
    chapterId: 2,
    subject: 'chemistry',
    difficulty: 'nhan_biet',
    question: 'Dung dịch có giá trị pH = 9 thuộc môi trường nào sau đây?',
    options: [
      'Môi trường base (kiềm).',
      'Môi trường acid.',
      'Môi trường trung tính.',
      'Môi trường muối khoáng.'
    ],
    correctIndex: 0,
    explanation: 'Thang pH: pH < 7 là môi trường acid, pH = 7 là trung tính, pH > 7 là môi trường base (kiềm).',
    bookReference: 'SGK KHTN 8 - Bài 9',
    hint: 'pH > 7 là môi trường base.'
  },

  // Bài 10: Oxide
  {
    id: 'Q10.5',
    lessonId: 10,
    chapterId: 2,
    subject: 'chemistry',
    difficulty: 'nhan_biet',
    question: 'Chất nào sau đây là oxide lưỡng tính (vừa tác dụng với dung dịch acid, vừa tác dụng với dung dịch base kiềm)?',
    options: [
      'Fe2O3',
      'CaO',
      'SO3',
      'Al2O3'
    ],
    correctIndex: 3,
    explanation: 'Al2O3 (nhôm oxide) và ZnO là các oxide lưỡng tính tiêu biểu trong chương trình KHTN 8.',
    bookReference: 'SBT KHTN 8 - Bài 10.5 (Trang 31 & 138)',
    hint: 'Al2O3 và ZnO là các oxide lưỡng tính điển hình.'
  },
  {
    id: 'Q10.2',
    lessonId: 10,
    chapterId: 2,
    subject: 'chemistry',
    difficulty: 'nhan_biet',
    question: 'Chất nào sau đây là oxide acid?',
    options: [
      'SO2',
      'Na2O',
      'BaO',
      'CuO'
    ],
    correctIndex: 0,
    explanation: 'SO2 (sulfur dioxide) là oxide của phi kim tương ứng với acid H2SO3 nên là oxide acid.',
    bookReference: 'SGK KHTN 8 - Bài 10',
    hint: 'Oxide acid thường là oxide của phi kim (SO2, CO2, SO3, P2O5).'
  },

  // Bài 11: Muối
  {
    id: 'Q11.2',
    lessonId: 11,
    chapterId: 2,
    subject: 'chemistry',
    difficulty: 'nhan_biet',
    question: 'Phản ứng nào sau đây KHÔNG tạo ra sản phẩm là muối?',
    options: [
      'Acid tác dụng với base.',
      'Kim loại tác dụng với oxygen.',
      'Acid tác dụng với oxide base.',
      'Base tác dụng với oxide acid.'
    ],
    correctIndex: 1,
    explanation: 'Kim loại tác dụng với oxygen tạo ra oxide kim loại (oxide base), không tạo ra muối.',
    bookReference: 'SBT KHTN 8 - Bài 11.2 (Trang 33 & 139)',
    hint: 'Kim loại + Oxygen -> Oxide kim loại.'
  },
  {
    id: 'Q11.6',
    lessonId: 11,
    chapterId: 2,
    subject: 'chemistry',
    difficulty: 'thong_hieu',
    question: 'Để nhận biết ion sulfate (SO4^2-) trong dung dịch muối, người ta thường dùng thuốc thử nào?',
    options: [
      'Dung dịch BaCl2 hoặc Ba(OH)2 (tạo kết tủa trắng BaSO4 không tan trong acid).',
      'Dung dịch NaCl.',
      'Quỳ tím.',
      'Dung dịch phenolphtalein.'
    ],
    correctIndex: 0,
    explanation: 'Dung dịch chứa ion Ba2+ (như BaCl2, Ba(OH)2) tạo kết tủa trắng BaSO4 bền vững không tan trong acid, dùng để nhận biết gốc SO4^2-.',
    bookReference: 'SGK KHTN 8 - Bài 11',
    hint: 'Ion Ba2+ kết tủa trắng với ion SO4^2-.'
  },

  // Bài 12: Phân bón hoá học
  {
    id: 'Q12.1',
    lessonId: 12,
    chapterId: 2,
    subject: 'chemistry',
    difficulty: 'nhan_biet',
    question: 'Nguyên tố nào sau đây KHÔNG phải là nguyên tố dinh dưỡng đa lượng trong phân bón cho cây trồng?',
    options: [
      'Sodium (Na).',
      'Potassium (K).',
      'Nitrogen (N).',
      'Phosphorus (P).'
    ],
    correctIndex: 0,
    explanation: 'Bộ ba nguyên tố đa lượng cần thiết cho cây trồng là N (Đạm), P (Lân), K (Kali). Sodium (Na) không phải nguyên tố đa lượng.',
    bookReference: 'SBT KHTN 8 - Bài 12.1 (Trang 37 & 142)',
    hint: 'Phân đa lượng N-P-K (Đạm - Lân - Kali).'
  },
  {
    id: 'Q12.3',
    lessonId: 12,
    chapterId: 2,
    subject: 'chemistry',
    difficulty: 'thong_hieu',
    question: 'Phân đạm (cung cấp nguyên tố Nitrogen) có vai trò chính gì đối với cây trồng?',
    options: [
      'Kích thích cây đẻ nhánh, nảy chồi, phát triển cành lá và sinh trưởng nhanh.',
      'Kích thích ra rễ và đậu hoa kết quả.',
      'Giúp cây chịu hạn, chịu rét và cứng cáp.',
      'Chỉ cung cấp độ ẩm cho đất.'
    ],
    correctIndex: 0,
    explanation: 'Phân đạm kích thích sự phát triển thân, cành, lá; phân lân kích thích rễ và ra hoa; phân kali tăng sức chống chịu và cứng cây.',
    bookReference: 'SGK KHTN 8 - Bài 12',
    hint: 'Đạm phát lá, Lân kích rễ, Kali bền cây.'
  },

  // ==========================================
  // --- CHƯƠNG III: KHỐI LƯỢNG RIÊNG VÀ ÁP SUẤT ---
  // ==========================================
  // Bài 13: Khối lượng riêng
  {
    id: 'Q13.4',
    lessonId: 13,
    chapterId: 3,
    subject: 'physics',
    difficulty: 'van_dung',
    question: 'Một khối hộp chữ nhật có kích thước 3 cm × 4 cm × 5 cm, khối lượng 48 g. Khối lượng riêng của vật liệu làm khối hộp là:',
    options: [
      '0,8 g/cm³',
      '0,48 g/cm³',
      '0,6 g/cm³',
      '2,88 g/cm³'
    ],
    correctIndex: 0,
    explanation: 'Thể tích V = 3 × 4 × 5 = 60 cm³. Khối lượng riêng D = m / V = 48 / 60 = 0,8 g/cm³.',
    bookReference: 'SBT KHTN 8 - Bài 13.4 (Trang 41 & 144)',
    hint: 'D = m / V.'
  },
  {
    id: 'Q13.1',
    lessonId: 13,
    chapterId: 3,
    subject: 'physics',
    difficulty: 'nhan_biet',
    question: 'Đơn vị hợp pháp của khối lượng riêng trong hệ SI là:',
    options: [
      'kg/m³',
      'g/cm³',
      'N/m³',
      'kg/L'
    ],
    correctIndex: 0,
    explanation: 'Đơn vị SI của khối lượng riêng là kilôgam trên mét khối (kg/m³).',
    bookReference: 'SGK KHTN 8 - Bài 13',
    hint: 'Đơn vị SI chuẩn của m là kg, V là m³ -> kg/m³.'
  },

  // Bài 14: Thực hành đo khối lượng riêng
  {
    id: 'Q14.1',
    lessonId: 14,
    chapterId: 3,
    subject: 'physics',
    difficulty: 'thong_hieu',
    question: 'Để xác định khối lượng riêng của một hòn sỏi có hình dạng bất kì, ta cần dùng những dụng cụ nào?',
    options: [
      'Cân điện tử (đo m) và bình chia độ chứa nước (đo V bằng thể tích nước dâng lên).',
      'Thước kẻ và lực kế.',
      'Nhiệt kế và cốc thủy tinh.',
      'Đồng hồ bấm giây và cân lò xo.'
    ],
    correctIndex: 0,
    explanation: 'Cân dùng để đo khối lượng m, bình chia độ chứa nước để đo thể tích V của vật rắn không thấm nước: V = V2 - V1.',
    bookReference: 'SGK KHTN 8 - Bài 14',
    hint: 'Đo m bằng cân, đo V bằng bình tràn hoặc bình chia độ.'
  },

  // Bài 15: Áp suất trên một bề mặt
  {
    id: 'Q15.4',
    lessonId: 15,
    chapterId: 3,
    subject: 'physics',
    difficulty: 'van_dung',
    question: 'Một áp lực 9 N tác dụng vuông góc lên một diện tích 3 m² gây ra áp suất là:',
    options: [
      '12 N/m²',
      '3 N/m²',
      '27 N/m²',
      '0,33 N/m²'
    ],
    correctIndex: 1,
    explanation: 'Áp suất p = F / S = 9 / 3 = 3 N/m² (hay 3 Pa).',
    bookReference: 'SBT KHTN 8 - Bài 15.4 (Trang 44 & 145)',
    hint: 'p = F / S (Pa).'
  },
  {
    id: 'Q15.1',
    lessonId: 15,
    chapterId: 3,
    subject: 'physics',
    difficulty: 'thong_hieu',
    question: 'Để giảm áp suất tác dụng lên mặt sàn khi đi trên vùng đầm lầy hoặc tuyết mềm, người ta thường:',
    options: [
      'Mang giày có đế rộng bản hoặc ván trượt tuyết.',
      'Đi giày cao gót nhọn.',
      'Tăng thêm tải trọng trên người.',
      'Đi bằng đầu ngón chân.'
    ],
    correctIndex: 0,
    explanation: 'Tăng diện tích tiếp xúc S sẽ làm giảm áp suất p = F/S, giúp không bị lún sâu vào bùn đầm lầy hoặc tuyết.',
    bookReference: 'SGK KHTN 8 - Bài 15',
    hint: 'Tăng diện tích tiếp xúc S để giảm áp suất p.'
  },

  // Bài 16: Áp suất chất lỏng - Khí quyển
  {
    id: 'Q16.1',
    lessonId: 16,
    chapterId: 3,
    subject: 'physics',
    difficulty: 'thong_hieu',
    question: 'Phát biểu nào sau đây là SAI khi nói về áp suất chất lỏng?',
    options: [
      'Áp suất chất lỏng tác dụng lên đáy bình, thành bình và các vật ở trong lòng nó.',
      'Vật nhúng càng sâu trong chất lỏng thì áp suất chất lỏng tác dụng lên vật càng lớn.',
      'Đơn vị đo áp suất chất lỏng là N/m³.',
      'Đơn vị đo áp suất chất lỏng là Pa (hoặc N/m²).'
    ],
    correctIndex: 2,
    explanation: 'Đơn vị đo áp suất là Pascal (Pa) hoặc N/m². Đơn vị N/m³ là của trọng lượng riêng d.',
    bookReference: 'SBT KHTN 8 - Bài 16.1 (Trang 45 & 146)',
    hint: 'Đơn vị của áp suất là Pa, N/m³ là đơn vị của trọng lượng riêng.'
  },
  {
    id: 'Q16.4',
    lessonId: 16,
    chapterId: 3,
    subject: 'physics',
    difficulty: 'nhan_biet',
    question: 'Hiện tượng nào sau đây là do áp suất khí quyển gây ra?',
    options: [
      'Dùng ống hút để hút nước ngọt từ cốc vào miệng.',
      'Vật rơi tự do từ trên cao xuống.',
      'Nam châm hút chiếc đinh sắt.',
      'Nước chảy từ trên thác cao xuống.'
    ],
    correctIndex: 0,
    explanation: 'Khi hút không khí trong ống hút ra, áp suất trong ống giảm, áp suất khí quyển bên ngoài đẩy nước dâng lên vào miệng.',
    bookReference: 'SGK KHTN 8 - Bài 16',
    hint: 'Áp suất khí quyển ép chất lỏng dâng lên trong ống hút.'
  },

  // Bài 17: Lực đẩy Archimedes
  {
    id: 'Q17.3',
    lessonId: 17,
    chapterId: 3,
    subject: 'physics',
    difficulty: 'thong_hieu',
    question: 'Treo một vật nặng vào lực kế ở ngoài không khí thì lực kế chỉ giá trị P1, nhúng chìm vật vào nước thì lực kế chỉ P2. So sánh đúng là:',
    options: [
      'P1 = P2',
      'P1 > P2',
      'P1 < P2',
      'P1 ≥ P2'
    ],
    correctIndex: 1,
    explanation: 'Khi nhúng vào nước, vật chịu thêm lực đẩy Archimedes FA hướng thẳng đứng lên trên, do đó số chỉ lực kế P2 = P1 - FA < P1.',
    bookReference: 'SBT KHTN 8 - Bài 17.3 (Trang 49 & 147)',
    hint: 'FA đẩy ngược chiều trọng lực nên làm giảm số chỉ lực kế.'
  },
  {
    id: 'Q17.5',
    lessonId: 17,
    chapterId: 3,
    subject: 'physics',
    difficulty: 'van_dung',
    question: 'Một vật có thể tích 0,002 m³ được nhúng chìm hoàn toàn trong nước (trọng lượng riêng của nước d = 10000 N/m³). Độ lớn lực đẩy Archimedes tác dụng lên vật là:',
    options: [
      '20 N',
      '200 N',
      '2 N',
      '5000 N'
    ],
    correctIndex: 0,
    explanation: 'F_A = d × V = 10000 × 0,002 = 20 N.',
    bookReference: 'SGK KHTN 8 - Bài 17',
    hint: 'F_A = d × V.'
  },

  // ==========================================
  // --- CHƯƠNG IV: TÁC DỤNG LÀM QUAY CỦA LỰC ---
  // ==========================================
  // Bài 18: Tác dụng làm quay của lực - Moment lực
  {
    id: 'Q18.1',
    lessonId: 18,
    chapterId: 4,
    subject: 'physics',
    difficulty: 'nhan_biet',
    question: 'Tác dụng làm quay của lực lên một vật quanh một trục hoặc một điểm được đặc trưng bởi đại lượng nào?',
    options: [
      'Vận tốc quay.',
      'Áp lực của lực.',
      'Moment lực.',
      'Khối lượng của vật.'
    ],
    correctIndex: 2,
    explanation: 'Moment lực đặc trưng cho tác dụng làm quay của lực và phụ thuộc vào độ lớn của lực cũng như cánh tay đòn (khoảng cách từ trục quay đến giá của lực).',
    bookReference: 'SBT KHTN 8 - Bài 18.1 (Trang 51 & 148)',
    hint: 'M = F × d (N.m).'
  },
  {
    id: 'Q18.3',
    lessonId: 18,
    chapterId: 4,
    subject: 'physics',
    difficulty: 'van_dung',
    question: 'Tác dụng một lực 50 N vuông góc vào cờ lê cách ốc vít một khoảng d = 0,2 m. Moment của lực này là:',
    options: [
      '10 N.m',
      '250 N.m',
      '100 N.m',
      '2,5 N.m'
    ],
    correctIndex: 0,
    explanation: 'Áp dụng công thức Moment lực: M = F × d = 50 × 0,2 = 10 N.m.',
    bookReference: 'SGK KHTN 8 - Bài 18',
    hint: 'M = F × d.'
  },

  // Bài 19: Đòn bẩy và ứng dụng
  {
    id: 'Q19.1',
    lessonId: 19,
    chapterId: 4,
    subject: 'physics',
    difficulty: 'thong_hieu',
    question: 'Một xe đạp có bán kính líp xe là 3 cm, bán kính bánh xe là 36 cm. Phát biểu nào dưới đây là đúng?',
    options: [
      'Bánh xe cho lợi về đường đi 3 lần.',
      'Líp xe quay nhanh gấp 12 lần bánh xe.',
      'Lực tác dụng ở líp xe lớn gấp 12 lần lực tác dụng ở lốp xe.',
      'Lực tác dụng ở bánh xe lớn gấp 12 lần lực tác dụng ở líp xe.'
    ],
    correctIndex: 2,
    explanation: 'Tỉ số cánh tay đòn là 36 / 3 = 12 lần. Do đó lực tác dụng ở líp xe phải lớn gấp 12 lần lực cản ở mép lốp xe.',
    bookReference: 'SBT KHTN 8 - Bài 19.1 (Trang 53 & 149)',
    hint: 'Quy tắc cân bằng đòn bẩy F1.d1 = F2.d2.'
  },
  {
    id: 'Q19.2',
    lessonId: 19,
    chapterId: 4,
    subject: 'physics',
    difficulty: 'nhan_biet',
    question: 'Vật dụng nào sau đây là ứng dụng của đòn bẩy có điểm tựa nằm ở giữa điểm đặt lực tác dụng và lực nâng vật?',
    options: [
      'Kéo cắt giấy, bập bênh.',
      'Xe cút kít chở đất.',
      'Cần câu cá.',
      'Nhíp nhổ tóc.'
    ],
    correctIndex: 0,
    explanation: 'Kéo cắt giấy và bập bênh có trục quay (điểm tựa O) nằm ở khoảng giữa hai đầu tác dụng lực.',
    bookReference: 'SGK KHTN 8 - Bài 19',
    hint: 'Đòn bẩy loại 1: điểm tựa O nằm ở giữa.'
  },

  // ==========================================
  // --- CHƯƠNG V: ĐIỆN ---
  // ==========================================
  // Bài 20: Hiện tượng nhiễm điện do cọ xát
  {
    id: 'Q20.1',
    lessonId: 20,
    chapterId: 5,
    subject: 'physics',
    difficulty: 'nhan_biet',
    question: 'Khi cọ xát thanh thuỷ tinh vào mảnh lụa thì hiện tượng xảy ra là:',
    options: [
      'Thanh thủy tinh bị nóng chảy.',
      'Cả hai vật đều bị nhiễm điện.',
      'Chỉ có thanh thủy tinh nhiễm điện, lụa không nhiễm điện.',
      'Thanh thủy tinh hút thanh nam châm.'
    ],
    correctIndex: 1,
    explanation: 'Khi cọ xát, electron dịch chuyển từ thủy tinh sang lụa khiến thủy tinh nhiễm điện dương còn lụa nhiễm điện âm (cả hai đều nhiễm điện).',
    bookReference: 'SBT KHTN 8 - Bài 20.1 (Trang 55 & 150)',
    hint: 'Cọ xát làm electron chuyển dịch giữa 2 vật, cả 2 cùng nhiễm điện trái dấu.'
  },

  // Bài 21: Dòng điện - Nguồn điện
  {
    id: 'Q21.1',
    lessonId: 21,
    chapterId: 5,
    subject: 'physics',
    difficulty: 'nhan_biet',
    question: 'Dòng điện trong kim loại là dòng chuyển dời có hướng của các hạt nào?',
    options: [
      'Các electron tự do.',
      'Các ion dương.',
      'Các ion âm.',
      'Các nguyên tử kim loại.'
    ],
    correctIndex: 0,
    explanation: 'Trong kim loại, các electron tự do dịch chuyển có hướng dưới tác dụng của điện trường tạo thành dòng điện.',
    bookReference: 'SGK KHTN 8 - Bài 21',
    hint: 'Kim loại có vô số hạt electron tự do mang điện tích âm.'
  },

  // Bài 22: Mạch điện đơn giản
  {
    id: 'Q22.1',
    lessonId: 22,
    chapterId: 5,
    subject: 'physics',
    difficulty: 'thong_hieu',
    question: 'Thiết bị nào sau đây có chức năng tự động ngắt mạch điện khi cường độ dòng điện tăng quá mức cho phép (đoản mạch hoặc quá tải)?',
    options: [
      'Cầu chì hoặc aptomat (cầu dao tự động).',
      'Công tắc hai chiều.',
      'Bóng đèn sợi đốt.',
      'Vôn kế.'
    ],
    correctIndex: 0,
    explanation: 'Cầu chì và aptomat bảo vệ mạch điện bằng cách tự ngắt nguồn khi dòng điện vượt ngưỡng an toàn.',
    bookReference: 'SGK KHTN 8 - Bài 22',
    hint: 'Cầu chì và Aptomat là thiết bị bảo vệ quá tải.'
  },

  // Bài 23: Tác dụng của dòng điện
  {
    id: 'Q23.1',
    lessonId: 23,
    chapterId: 5,
    subject: 'physics',
    difficulty: 'nhan_biet',
    question: 'Để mạ vàng hoặc mạ bạc một vật bằng kim loại, người ta ứng dụng tác dụng nào của dòng điện?',
    options: [
      'Tác dụng nhiệt.',
      'Tác dụng phát sáng.',
      'Tác dụng hoá học.',
      'Tác dụng sinh lí.'
    ],
    correctIndex: 2,
    explanation: 'Mạ điện là ứng dụng tác dụng hoá học của dòng điện khi chạy qua dung dịch điện phân chứa muối kim loại.',
    bookReference: 'SBT KHTN 8 - Bài 23.1 (Trang 60 & 153)',
    hint: 'Mạ điện là hiện tượng điện phân hoá học.'
  },

  // Bài 24: Cường độ dòng điện và hiệu điện thế
  {
    id: 'Q24.4',
    lessonId: 24,
    chapterId: 5,
    subject: 'physics',
    difficulty: 'thong_hieu',
    question: 'Khi mắc ampe kế vào mạch điện để đo cường độ dòng điện, điều quan trọng nhất cần chú ý là:',
    options: [
      'Chốt (+) mắc về phía cực dương nguồn và không được mắc trực tiếp hai chốt ampe kế vào hai cực nguồn.',
      'Mắc song song ampe kế với bóng đèn.',
      'Mắc trực tiếp ampe kế vào hai cực của pin để đo công suất.',
      'Chốt (-) mắc vào cực dương của nguồn điện.'
    ],
    correctIndex: 0,
    explanation: 'Ampe kế có điện trở rất nhỏ, phải mắc nối tiếp và đúng cực (+)(-). Tuyệt đối không mắc trực tiếp vào nguồn vì sẽ gây đoản mạch làm cháy ampe kế.',
    bookReference: 'SBT KHTN 8 - Bài 24.4 (Trang 65 & 154)',
    hint: 'Ampe kế mắc nối tiếp, đúng cực (+)(-).'
  },

  // Bài 25: Thực hành đo I và U
  {
    id: 'Q25.1',
    lessonId: 25,
    chapterId: 5,
    subject: 'physics',
    difficulty: 'nhan_biet',
    question: 'Để đo hiệu điện thế giữa hai đầu một bóng đèn đang sáng, ta cần mắc vôn kế như thế nào?',
    options: [
      'Mắc song song vôn kế với hai đầu bóng đèn sao cho chốt (+) nối về cực dương nguồn.',
      'Mắc nối tiếp vôn kế vào mạch chính.',
      'Mắc vôn kế nối tiếp với ampe kế.',
      'Mắc chốt (-) của vôn kế về cực dương nguồn.'
    ],
    correctIndex: 0,
    explanation: 'Vôn kế có điện trở rất lớn, được mắc SONG SONG với thiết bị cần đo hiệu điện thế và đúng chiều cực (+)(-).',
    bookReference: 'SGK KHTN 8 - Bài 25',
    hint: 'Ampe kế nối tiếp, Vôn kế song song.'
  },

  // ==========================================
  // --- CHƯƠNG VI: NHIỆT ---
  // ==========================================
  // Bài 26: Năng lượng nhiệt và nội năng
  {
    id: 'Q26.1',
    lessonId: 26,
    chapterId: 6,
    subject: 'physics',
    difficulty: 'nhan_biet',
    question: 'Tính chất nào sau đây KHÔNG PHẢI của phân tử, nguyên tử?',
    options: [
      'Chuyển động không ngừng hỗn loạn.',
      'Chuyển động càng nhanh thì nhiệt độ của vật càng cao.',
      'Giữa các phân tử có lực hút và lực đẩy tương tác.',
      'Giữa các phân tử cấu tạo nên vật không có khoảng cách.'
    ],
    correctIndex: 3,
    explanation: 'Các phân tử luôn có khoảng cách với nhau, phát biểu "không có khoảng cách" là sai.',
    bookReference: 'SBT KHTN 8 - Bài 26.1 (Trang 72 & 157)',
    hint: 'Giữa các nguyên tử, phân tử luôn tồn tại khoảng cách.'
  },

  // Bài 27: Thực hành đo năng lượng nhiệt
  {
    id: 'Q27.1',
    lessonId: 27,
    chapterId: 6,
    subject: 'physics',
    difficulty: 'van_dung',
    question: 'Để đun nóng 1 kg nước tăng thêm 10 °C, nhiệt lượng cần truyền là bao nhiêu (biết nhiệt dung riêng của nước c = 4200 J/kg.K)?',
    options: [
      '42000 J',
      '4200 J',
      '420 J',
      '84000 J'
    ],
    correctIndex: 0,
    explanation: 'Q = m × c × Δt = 1 × 4200 × 10 = 42000 J.',
    bookReference: 'SGK KHTN 8 - Bài 27',
    hint: 'Q = m.c.Δt.'
  },

  // Bài 28: Sự truyền nhiệt
  {
    id: 'Q28.3',
    lessonId: 28,
    chapterId: 6,
    subject: 'physics',
    difficulty: 'thong_hieu',
    question: 'Bức xạ nhiệt KHÔNG PHẢI là hình thức truyền nhiệt năng chủ yếu trong trường hợp nào sau đây?',
    options: [
      'Nhiệt năng từ Mặt Trời truyền đến Trái Đất qua chân không.',
      'Bếp lửa truyền hơi ấm đến người đứng gần bếp.',
      'Đầu một thanh đồng được hơ nóng truyền sang đầu kia.',
      'Dây tóc bóng đèn truyền nhiệt đến vỏ bóng đèn thuỷ tinh.'
    ],
    correctIndex: 2,
    explanation: 'Sự truyền nhiệt dọc theo thanh kim loại đồng từ đầu này sang đầu kia là hình thức DẪN NHIỆT, không phải bức xạ nhiệt.',
    bookReference: 'SBT KHTN 8 - Bài 28.3 (Trang 76 & 159)',
    hint: 'Dẫn nhiệt là hình thức truyền nhiệt chủ yếu trong chất rắn.'
  },

  // Bài 29: Sự nở vì nhiệt
  {
    id: 'Q29.1',
    lessonId: 29,
    chapterId: 6,
    subject: 'physics',
    difficulty: 'thong_hieu',
    question: 'Hai cốc thuỷ tinh lồng chặt vào nhau bị khít lại. Muốn tách rời hai cốc ra dễ dàng, ta làm cách nào?',
    options: [
      'Ngâm cả hai cốc vào nước nóng.',
      'Ngâm cả hai cốc vào nước đá lạnh.',
      'Ngâm cốc dưới vào nước nóng, cốc trên thả nước đá vào.',
      'Ngâm cốc dưới vào nước lạnh, cốc trên đổ nước sôi vào.'
    ],
    correctIndex: 2,
    explanation: 'Cốc dưới ngâm nước nóng sẽ nở ra, cốc trên gặp nước đá lạnh sẽ co lại, giúp tách rời hai cốc dễ dàng.',
    bookReference: 'SBT KHTN 8 - Bài 29.1 (Trang 79 & 161)',
    hint: 'Nóng nở ra, lạnh co lại.'
  },

  // ==========================================
  // --- CHƯƠNG VII: SINH HỌC CƠ THỂ NGƯỜI ---
  // ==========================================
  // Bài 30: Khái quát cơ thể người
  {
    id: 'Q30.1',
    lessonId: 30,
    chapterId: 7,
    subject: 'biology',
    difficulty: 'nhan_biet',
    question: 'Ở cơ thể người, cơ quan nào sau đây nằm trong khoang bụng?',
    options: [
      'Thực quản.',
      'Tim.',
      'Phổi.',
      'Dạ dày.'
    ],
    correctIndex: 3,
    explanation: 'Dạ dày, gan, ruột, thận... nằm trong khoang bụng (ngăn cách với khoang ngực chứa tim, phổi bởi cơ hoành).',
    bookReference: 'SBT KHTN 8 - Bài 30.1 (Trang 83 & 162)',
    hint: 'Khoang bụng nằm dưới cơ hoành.'
  },

  // Bài 31: Hệ vận động
  {
    id: 'Q31.1',
    lessonId: 31,
    chapterId: 7,
    subject: 'biology',
    difficulty: 'nhan_biet',
    question: 'Bộ xương ở người trưởng thành có khoảng 206 xương được chia làm 3 phần chính gồm:',
    options: [
      'Xương đầu, xương thân và xương chi (tay, chân).',
      'Xương sọ, xương sống và xương sườn.',
      'Xương tay, xương chân và xương ngực.',
      'Xương đòn, xương chậu và xương cột sống.'
    ],
    correctIndex: 0,
    explanation: 'Bộ xương người gồm 3 phần: Xương đầu (sọ mặt, sọ não), Xương thân (cột sống, lồng ngực), Xương chi (chi trên và chi dưới).',
    bookReference: 'SBT KHTN 8 - Bài 31.1 (Trang 84 & 163)',
    hint: 'Xương đầu - Xương thân - Xương chi.'
  },

  // Bài 32: Dinh dưỡng và tiêu hoá
  {
    id: 'Q32.1',
    lessonId: 32,
    chapterId: 7,
    subject: 'biology',
    difficulty: 'nhan_biet',
    question: 'Các cơ quan trong ống tiêu hoá của người theo đúng thứ tự từ trên xuống dưới gồm:',
    options: [
      'Miệng, thực quản, dạ dày, gan, ruột non, ruột già.',
      'Miệng, hầu, thực quản, dạ dày, tụy, ruột non, ruột già.',
      'Miệng, hầu, thực quản, dạ dày, ruột non, ruột già, hậu môn.',
      'Miệng, thực quản, dạ dày, túi mật, ruột non, ruột già.'
    ],
    correctIndex: 2,
    explanation: 'Ống tiêu hóa gồm: miệng -> hầu -> thực quản -> dạ dày -> ruột non -> ruột già -> hậu môn. Gan, tụy, mật là các tuyến tiêu hóa.',
    bookReference: 'SBT KHTN 8 - Bài 32.1 (Trang 85 & 163)',
    hint: 'Miệng -> Hầu -> Thực quản -> Dạ dày -> Ruột non -> Ruột già -> Hậu môn.'
  },

  // Bài 33: Máu và hệ tuần hoàn
  {
    id: 'Q33.6',
    lessonId: 33,
    chapterId: 7,
    subject: 'biology',
    difficulty: 'thong_hieu',
    question: 'Tại sao nhóm máu O được gọi là nhóm máu "chuyên cho" trong hệ nhóm máu ABO?',
    options: [
      'Vì hồng cầu nhóm O không có kháng nguyên A và B, không bị kháng thể người nhận gây kết dính.',
      'Vì huyết tương nhóm O không có kháng thể alpha và beta.',
      'Vì người nhóm máu O có nhiều máu hơn các nhóm khác.',
      'Vì nhóm máu O có chứa kháng nguyên đặc biệt chống lại virus.'
    ],
    correctIndex: 0,
    explanation: 'Hồng cầu nhóm máu O không chứa kháng nguyên A và B, do đó khi truyền vào cơ thể người nhận, kháng thể trong huyết tương người nhận không kết dính được hồng cầu O.',
    bookReference: 'SBT KHTN 8 - Bài 33.6 (Trang 89 & 166)',
    hint: 'Hồng cầu nhóm O không mang kháng nguyên A, B.'
  },

  // Bài 34: Hệ hô hấp
  {
    id: 'Q34.1',
    lessonId: 34,
    chapterId: 7,
    subject: 'biology',
    difficulty: 'thong_hieu',
    question: 'Khi cơ thể người thực hiện cử động thở ra bình thường, xương sườn và cơ hoành hoạt động như thế nào?',
    options: [
      'Xương sườn nâng lên, cơ hoành co làm thể tích lồng ngực tăng.',
      'Xương sườn nâng lên, cơ hoành dãn làm thể tích lồng ngực giảm.',
      'Xương sườn hạ xuống, cơ hoành dãn ra khiến thể tích lồng ngực giảm, ép khí ra ngoài.',
      'Xương sườn hạ xuống, cơ hoành co khiến thể tích lồng ngực tăng.'
    ],
    correctIndex: 2,
    explanation: 'Khi thở ra: các cơ hô hấp dãn, xương sườn hạ xuống, cơ hoành dãn vòm lên làm giảm thể tích lồng ngực và đẩy không khí ra ngoài.',
    bookReference: 'SBT KHTN 8 - Bài 34.1 (Trang 90 & 167)',
    hint: 'Thở ra: cơ dãn, lồng ngực hạ xuống thu hẹp thể tích.'
  },

  // Bài 35: Hệ bài tiết
  {
    id: 'Q35.1',
    lessonId: 35,
    chapterId: 7,
    subject: 'biology',
    difficulty: 'nhan_biet',
    question: 'Đơn vị chức năng của thận (nephron) gồm các thành phần nào cấu tạo nên?',
    options: [
      'Cầu thận, nang cầu thận và ống thận.',
      'Ống dẫn nước tiểu, bóng đái và ống đái.',
      'Vỏ thận, tủy thận và bể thận.',
      'Động mạch thận và tĩnh mạch thận.'
    ],
    correctIndex: 0,
    explanation: 'Mỗi đơn vị chức năng của thận gồm có: Cầu thận (búi mao mạch), nang cầu thận (nang Bowman) và hệ thống ống thận.',
    bookReference: 'SGK KHTN 8 - Bài 35',
    hint: 'Đơn vị thận = Cầu thận + Nang cầu thận + Ống thận.'
  },

  // Bài 36: Điều hoà môi trường trong cơ thể
  {
    id: 'Q36.6',
    lessonId: 36,
    chapterId: 7,
    subject: 'biology',
    difficulty: 'nhan_biet',
    question: 'Chỉ số nồng độ glucose trong máu người bình thường khi đói dao động trong khoảng nào?',
    options: [
      'Từ 1,0 mmol/L đến 2,5 mmol/L',
      'Từ 3,9 mmol/L đến 6,4 mmol/L',
      'Từ 8,5 mmol/L đến 12,0 mmol/L',
      'Từ 15,0 mmol/L đến 20,0 mmol/L'
    ],
    correctIndex: 1,
    explanation: 'Chỉ số glucose trong máu của người bình thường lúc đói là 3,9 - 6,4 mmol/L. Vượt quá ngưỡng này kéo dài là dấu hiệu đái tháo đường.',
    bookReference: 'SBT KHTN 8 - Bài 36.6 (Trang 94 & 169)',
    hint: 'Mức đường huyết bình thường lúc đói: 3,9 - 6,4 mmol/L.'
  },

  // Bài 37: Hệ thần kinh và giác quan
  {
    id: 'Q37.8',
    lessonId: 37,
    chapterId: 7,
    subject: 'biology',
    difficulty: 'thong_hieu',
    question: 'Người bị tật cận thị thì ảnh của vật quan sát ở xa sẽ hội tụ ở vị trí nào trong mắt?',
    options: [
      'Ở phía trước màng lưới (võng mạc).',
      'Đúng ngay trên màng lưới.',
      'Ở phía sau màng lưới.',
      'Ở thể thủy tinh.'
    ],
    correctIndex: 0,
    explanation: 'Mắt cận thị có thể tích cầu mắt dài hoặc thể thủy tinh quá phồng khiến tia sáng hội tụ trước màng lưới. Cần đeo thấu kính phân kì để khắc phục.',
    bookReference: 'SBT KHTN 8 - Bài 37.8 (Trang 95 & 169)',
    hint: 'Cận thị: ảnh hội tụ TRƯỚC màng lưới.'
  },

  // Bài 38: Hệ nội tiết
  {
    id: 'Q38.4',
    lessonId: 38,
    chapterId: 7,
    subject: 'biology',
    difficulty: 'nhan_biet',
    question: 'Tuyến nội tiết nào tiết ra hai hormone Insulin và Glucagon để điều hoà đường huyết?',
    options: [
      'Tuyến yên.',
      'Tuyến giáp.',
      'Tuyến tụy.',
      'Tuyến trên thận.'
    ],
    correctIndex: 2,
    explanation: 'Tuyến tụy tiết Insulin (hạ đường huyết khi đường tăng) và Glucagon (tăng đường huyết khi đường giảm) giúp nồng độ glucose máu luôn ổn định.',
    bookReference: 'SBT KHTN 8 - Bài 38.4 (Trang 96 & 170)',
    hint: 'Tuyến tụy tiết Insulin và Glucagon.'
  },

  // Bài 39: Da và điều hoà thân nhiệt
  {
    id: 'Q39.1',
    lessonId: 39,
    chapterId: 7,
    subject: 'biology',
    difficulty: 'thong_hieu',
    question: 'Khi trời nóng bức hoặc lao động nặng nhọc, cơ thể điều hòa thân nhiệt bằng cách nào?',
    options: [
      'Giãn mao mạch dưới da và tăng tiết mồ hôi để tỏa nhiệt.',
      'Co mao mạch dưới da và run giật cơ.',
      'Giảm nhịp thở và tích trữ mỡ dưới da.',
      'Ngừng bài tiết mồ hôi.'
    ],
    correctIndex: 0,
    explanation: 'Khi nóng, mao mạch dưới da giãn giúp máu mang nhiệt đến bề mặt, đồng thời tuyến mồ hôi tiết mồ hôi bốc hơi mang theo nhiệt lượng làm mát cơ thể.',
    bookReference: 'SGK KHTN 8 - Bài 39',
    hint: 'Trời nóng: Giãn mạch + toát mồ hôi để tỏa nhiệt.'
  },

  // Bài 40: Sinh sản ở người
  {
    id: 'Q40.1',
    lessonId: 40,
    chapterId: 7,
    subject: 'biology',
    difficulty: 'nhan_biet',
    question: 'Quá trình thụ tinh bình thường ở người diễn ra tại vị trí nào?',
    options: [
      'Ở 1/3 phía ngoài của ống dẫn trứng (vòi trứng).',
      'Tại buồng tử cung.',
      'Tại buồng trứng.',
      'Tại âm đạo.'
    ],
    correctIndex: 0,
    explanation: 'Trứng thụ tinh với tinh trùng thường diễn ra ở 1/3 phía ngoài của ống dẫn trứng, sau đó hợp tử di chuyển về tử cung để làm tổ.',
    bookReference: 'SGK KHTN 8 - Bài 40',
    hint: 'Thụ tinh diễn ra ở 1/3 ngoài ống dẫn trứng.'
  },

  // ==========================================
  // --- CHƯƠNG VIII: SINH VẬT VÀ MÔI TRƯỜNG ---
  // ==========================================
  // Bài 41: Môi trường sống và nhân tố sinh thái
  {
    id: 'Q41.1',
    lessonId: 41,
    chapterId: 8,
    subject: 'biology',
    difficulty: 'nhan_biet',
    question: 'Môi trường sống của sinh vật bao gồm các yếu tố nào sau đây?',
    options: [
      'Tác động riêng rẽ đến sinh vật.',
      'Bao quanh sinh vật, có quan hệ mật thiết và ảnh hưởng đến sự sinh tồn, phát triển của sinh vật.',
      'Chỉ gồm các yếu tố không sống như đất, nước, không khí.',
      'Chỉ gồm các loài sinh vật sống cùng nhau.'
    ],
    correctIndex: 1,
    explanation: 'Môi trường sống là nơi sinh sống của sinh vật, bao gồm tất cả các nhân tố xung quanh có ảnh hưởng trực tiếp hoặc gián tiếp đến sinh vật.',
    bookReference: 'SBT KHTN 8 - Bài 41.1 (Trang 100 & 171)',
    hint: 'Môi trường bao gồm tất cả nhân tố xung quanh tác động đến sinh vật.'
  },

  // Bài 42: Quần thể sinh vật
  {
    id: 'Q42.1',
    lessonId: 42,
    chapterId: 8,
    subject: 'biology',
    difficulty: 'nhan_biet',
    question: 'Quần thể sinh vật là gì?',
    options: [
      'Tập hợp các cá thể thuộc nhiều loài khác nhau cùng sống trong một khu vực.',
      'Tập hợp các cá thể thuộc cùng một loài, cùng sinh sống trong một khoảng không gian xác định, vào một thời điểm nhất định và có khả năng sinh sản.',
      'Tập hợp các cây trồng và vật nuôi do con người nhốt chung một chuồng.',
      'Tất cả các loài động vật trong một khu rừng.'
    ],
    correctIndex: 1,
    explanation: 'Khái niệm chuẩn: Quần thể là tập hợp các cá thể cùng loài, cùng sinh sống trong không gian và thời gian xác định, có khả năng giao phối sinh sản tạo thế hệ mới.',
    bookReference: 'SBT KHTN 8 - Bài 42.1 (Trang 102 & 172)',
    hint: 'Quần thể: Cùng loài - Cùng không gian - Cùng thời gian - Sinh sản được.'
  },

  // Bài 43: Quần xã sinh vật
  {
    id: 'Q43.1',
    lessonId: 43,
    chapterId: 8,
    subject: 'biology',
    difficulty: 'nhan_biet',
    question: 'Loài ưu thế trong quần xã sinh vật là gì?',
    options: [
      'Loài đóng vai trò quan trọng do có số lượng cá thể nhiều, sinh khối lớn hoặc hoạt động mạnh.',
      'Loài chỉ có ở một quần xã xác định mà không có ở nơi khác.',
      'Loài có kích thước cá thể to lớn nhất.',
      'Loài ăn thịt đứng đầu chuỗi thức ăn.'
    ],
    correctIndex: 0,
    explanation: 'Loài ưu thế là loài có số lượng đông, sinh khối lớn hoặc có ảnh hưởng chi phối đến hoạt động của quần xã (ví dụ: cây thông trong rừng thông).',
    bookReference: 'SGK KHTN 8 - Bài 43',
    hint: 'Loài ưu thế: Số lượng nhiều, sinh khối lớn, vai trò chi phối.'
  },

  // Bài 44: Hệ sinh thái
  {
    id: 'Q44.5',
    lessonId: 44,
    chapterId: 8,
    subject: 'biology',
    difficulty: 'thong_hieu',
    question: 'Sơ đồ nào dưới đây thể hiện đúng một chuỗi thức ăn trong hệ sinh thái trên cạn?',
    options: [
      'Cây lúa → Sâu ăn lá → Ếch đồng → Rắn nước → Đại bàng.',
      'Cây lúa → Rắn nước → Ếch đồng → Sâu ăn lá → Đại bàng.',
      'Đại bàng → Rắn nước → Ếch đồng → Sâu ăn lá → Cây lúa.',
      'Sâu ăn lá → Cây lúa → Ếch đồng → Đại bàng → Rắn nước.'
    ],
    correctIndex: 0,
    explanation: 'Chuỗi thức ăn bắt đầu từ sinh vật sản xuất (Cây lúa) -> sinh vật tiêu thụ bậc 1 (Sâu) -> bậc 2 (Ếch) -> bậc 3 (Rắn) -> bậc 4 (Đại bàng).',
    bookReference: 'SBT KHTN 8 - Bài 44.5 (Trang 107 & 173)',
    hint: 'Sinh vật sản xuất -> Tiêu thụ bậc 1 -> Tiêu thụ bậc 2...'
  },

  // Bài 45: Sinh quyển
  {
    id: 'Q45.1',
    lessonId: 45,
    chapterId: 8,
    subject: 'biology',
    difficulty: 'nhan_biet',
    question: 'Sinh quyển là gì?',
    options: [
      'Là toàn bộ các khu vực có sự sống trên Trái Đất (bao gồm lớp đất, lớp nước và tầng đối lưu của khí quyển).',
      'Chỉ bao gồm toàn bộ các đại dương trên Trái Đất.',
      'Chỉ gồm phần mặt đất lục địa nơi con người sinh sống.',
      'Là tầng ôzôn bao quanh Trái Đất.'
    ],
    correctIndex: 0,
    explanation: 'Sinh quyển gồm toàn bộ sinh vật sống và môi trường sống của chúng trên thạch quyển, thủy quyển và khí quyển.',
    bookReference: 'SGK KHTN 8 - Bài 45',
    hint: 'Sinh quyển bao gồm toàn bộ thế giới sinh vật trên Trái Đất.'
  },

  // Bài 46: Cân bằng tự nhiên
  {
    id: 'Q46.1',
    lessonId: 46,
    chapterId: 8,
    subject: 'biology',
    difficulty: 'thong_hieu',
    question: 'Hiện tượng số lượng cá thể của một quần thể bị kìm hãm ở mức độ nhất định bởi các mối quan hệ sinh thái trong quần xã được gọi là:',
    options: [
      'Hiện tượng khống chế sinh học.',
      'Hiện tượng thoái hóa giống.',
      'Hiện tượng ưu thế lai.',
      'Hiện tượng đột biến gen.'
    ],
    correctIndex: 0,
    explanation: 'Khống chế sinh học là hiện tượng số lượng cá thể của quần thể này bị số lượng cá thể của quần thể khác kìm hãm, duy trì trạng thái cân bằng sinh học.',
    bookReference: 'SGK KHTN 8 - Bài 46',
    hint: 'Khống chế sinh học giúp duy trì cân bằng tự nhiên.'
  },

  // Bài 47: Bảo vệ môi trường
  {
    id: 'Q47.2',
    lessonId: 47,
    chapterId: 8,
    subject: 'biology',
    difficulty: 'nhan_biet',
    question: 'Định nghĩa đúng nhất về ô nhiễm môi trường là:',
    options: [
      'Chỉ là sự biến đổi tính chất vật lí của bầu khí quyển.',
      'Là sự biến đổi tính chất vật lí, hoá học, sinh học của môi trường, gây ảnh hưởng xấu đến sức khoẻ con người và sinh vật.',
      'Chỉ là sự tích tụ rác thải sinh hoạt ở các đô thị.',
      'Là hiện tượng nhiệt độ Trái Đất lạnh đi vào mùa đông.'
    ],
    correctIndex: 1,
    explanation: 'Ô nhiễm môi trường là sự biến đổi tính chất vật lí, hoá học, sinh học của thành phần môi trường không phù hợp tiêu chuẩn kĩ thuật, gây hại con người và sinh quyển.',
    bookReference: 'SBT KHTN 8 - Bài 47.2 (Trang 112 & 174)',
    hint: 'Ô nhiễm môi trường gây biến đổi tiêu cực lý, hoá, sinh.'
  }
];

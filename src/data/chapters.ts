import { Chapter } from '../types';

export const CHAPTERS_DATA: Chapter[] = [
  {
    id: 1,
    romanNumeral: 'CHƯƠNG I',
    title: 'PHẢN ỨNG HOÁ HỌC',
    subject: 'chemistry',
    lessons: [
      { id: 2, chapterId: 1, subject: 'chemistry', title: 'Bài 2. Phản ứng hoá học', description: 'Biến đổi vật lí và hoá học, dấu hiệu và diễn biến phản ứng' },
      { id: 3, chapterId: 1, subject: 'chemistry', title: 'Bài 3. Mol và tỉ khối chất khí', description: 'Khái niệm Mol, khối lượng mol, thể tích mol chất khí (24,79 L)' },
      { id: 4, chapterId: 1, subject: 'chemistry', title: 'Bài 4. Dung dịch và nồng độ', description: 'Độ tan S, nồng độ phần trăm C%, nồng độ mol CM và pha chế' },
      { id: 5, chapterId: 1, subject: 'chemistry', title: 'Bài 5. Định luật bảo toàn khối lượng và PTHH', description: 'Định luật BTKL, lập và cân bằng phương trình hoá học' },
      { id: 6, chapterId: 1, subject: 'chemistry', title: 'Bài 6. Tính theo phương trình hoá học', description: 'Tính lượng chất, xác định chất dư - thiếu, hiệu suất phản ứng H%' },
      { id: 7, chapterId: 1, subject: 'chemistry', title: 'Bài 7. Tốc độ phản ứng và chất xúc tác', description: 'Các yếu tố ảnh hưởng tốc độ phản ứng, vai trò chất xúc tác' }
    ]
  },
  {
    id: 2,
    romanNumeral: 'CHƯƠNG II',
    title: 'MỘT SỐ HỢP CHẤT THÔNG DỤNG',
    subject: 'chemistry',
    lessons: [
      { id: 8, chapterId: 2, subject: 'chemistry', title: 'Bài 8. Acid', description: 'Khái niệm acid, tính chất hóa học và các acid thông dụng (HCl, H2SO4)' },
      { id: 9, chapterId: 2, subject: 'chemistry', title: 'Bài 9. Base. Thang pH', description: 'Khái niệm base kiềm và không tan, thang đo pH, phản ứng trung hòa' },
      { id: 10, chapterId: 2, subject: 'chemistry', title: 'Bài 10. Oxide', description: 'Phân loại oxide base, oxide acid, oxide lưỡng tính, oxide trung tính' },
      { id: 11, chapterId: 2, subject: 'chemistry', title: 'Bài 11. Muối', description: 'Khái niệm, tính tan của muối, phản ứng trao đổi trong dung dịch' },
      { id: 12, chapterId: 2, subject: 'chemistry', title: 'Bài 12. Phân bón hoá học', description: 'Phân đạm (N), phân lân (P), phân kali (K), phân NPK và quy tắc 4 đúng' }
    ]
  },
  {
    id: 3,
    romanNumeral: 'CHƯƠNG III',
    title: 'KHỐI LƯỢNG RIÊNG VÀ ÁP SUẤT',
    subject: 'physics',
    lessons: [
      { id: 13, chapterId: 3, subject: 'physics', title: 'Bài 13. Khối lượng riêng', description: 'Công thức D = m/V, đơn vị kg/m3 và g/cm3' },
      { id: 14, chapterId: 3, subject: 'physics', title: 'Bài 14. Thực hành xác định khối lượng riêng', description: 'Xác định khối lượng riêng của vật rắn và chất lỏng' },
      { id: 15, chapterId: 3, subject: 'physics', title: 'Bài 15. Áp suất trên một bề mặt', description: 'Áp lực và công thức áp suất p = F/S (Pa)' },
      { id: 16, chapterId: 3, subject: 'physics', title: 'Bài 16. Áp suất chất lỏng. Áp suất khí quyển', description: 'Áp suất chất lỏng truyền mọi hướng, áp suất khí quyển' },
      { id: 17, chapterId: 3, subject: 'physics', title: 'Bài 17. Lực đẩy Archimedes', description: 'Định luật Archimedes FA = d.V và điều kiện vật nổi, chìm' }
    ]
  },
  {
    id: 4,
    romanNumeral: 'CHƯƠNG IV',
    title: 'TÁC DỤNG LÀM QUAY CỦA LỰC',
    subject: 'physics',
    lessons: [
      { id: 18, chapterId: 4, subject: 'physics', title: 'Bài 18. Tác dụng làm quay của lực. Moment lực', description: 'Tác dụng làm quay của lực, moment lực M = F.d' },
      { id: 19, chapterId: 4, subject: 'physics', title: 'Bài 19. Đòn bẩy và ứng dụng', description: 'Các loại đòn bẩy, ứng dụng trong đời sống và cơ thể người' }
    ]
  },
  {
    id: 5,
    romanNumeral: 'CHƯƠNG V',
    title: 'ĐIỆN',
    subject: 'physics',
    lessons: [
      { id: 20, chapterId: 5, subject: 'physics', title: 'Bài 20. Hiện tượng nhiễm điện do cọ xát', description: 'Điện tích dương và âm, tương tác hút - đẩy tĩnh điện' },
      { id: 21, chapterId: 5, subject: 'physics', title: 'Bài 21. Dòng điện, nguồn điện', description: 'Bản chất dòng điện trong kim loại, các loại nguồn điện (pin, acquy)' },
      { id: 22, chapterId: 5, subject: 'physics', title: 'Bài 22. Mạch điện đơn giản', description: 'Sơ đồ mạch điện, cầu chì, rơle, aptomat' },
      { id: 23, chapterId: 5, subject: 'physics', title: 'Bài 23. Tác dụng của dòng điện', description: 'Tác dụng nhiệt, phát sáng, hoá học, sinh lí của dòng điện' },
      { id: 24, chapterId: 5, subject: 'physics', title: 'Bài 24. Cường độ dòng điện và hiệu điện thế', description: 'Đại lượng I (Ampe) và U (Vôn), cách sử dụng ampe kế, vôn kế' },
      { id: 25, chapterId: 5, subject: 'physics', title: 'Bài 25. Thực hành đo I và U', description: 'Kĩ năng mắc mạch đo cường độ dòng điện và hiệu điện thế' }
    ]
  },
  {
    id: 6,
    romanNumeral: 'CHƯƠNG VI',
    title: 'NHIỆT',
    subject: 'physics',
    lessons: [
      { id: 26, chapterId: 6, subject: 'physics', title: 'Bài 26. Năng lượng nhiệt và nội năng', description: 'Chuyển động phân tử, khái niệm năng lượng nhiệt và nội năng' },
      { id: 27, chapterId: 6, subject: 'physics', title: 'Bài 27. Thực hành đo năng lượng nhiệt bằng joulemeter', description: 'Nhiệt lượng Q = mcΔt, đo năng lượng nhiệt' },
      { id: 28, chapterId: 6, subject: 'physics', title: 'Bài 28. Sự truyền nhiệt', description: 'Dẫn nhiệt, đối lưu, bức xạ nhiệt và hiệu ứng nhà kính' },
      { id: 29, chapterId: 6, subject: 'physics', title: 'Bài 29. Sự nở vì nhiệt', description: 'Sự nở vì nhiệt của chất rắn, lỏng, khí và ứng dụng băng kép' }
    ]
  },
  {
    id: 7,
    romanNumeral: 'CHƯƠNG VII',
    title: 'SINH HỌC CƠ THỂ NGƯỜI',
    subject: 'biology',
    lessons: [
      { id: 30, chapterId: 7, subject: 'biology', title: 'Bài 30. Khái quát về cơ thể người', description: 'Cấu tạo khoang ngực, bụng và phối hợp giữa các hệ cơ quan' },
      { id: 31, chapterId: 7, subject: 'biology', title: 'Bài 31. Hệ vận động ở người', description: 'Bộ xương, hệ cơ, cong vẹo cột sống, loãng xương, sơ cứu gãy xương' },
      { id: 32, chapterId: 7, subject: 'biology', title: 'Bài 32. Dinh dưỡng và tiêu hoá ở người', description: 'Cấu tạo ống tiêu hóa, các tuyến tiêu hóa, xây dựng khẩu phần ăn' },
      { id: 33, chapterId: 7, subject: 'biology', title: 'Bài 33. Máu và hệ tuần hoàn của cơ thể', description: 'Huyết tương, hồng cầu, nhóm máu ABO, vaccine, đo huyết áp, sơ cứu' },
      { id: 34, chapterId: 7, subject: 'biology', title: 'Bài 34. Hệ hô hấp ở người', description: 'Cơ chế thông khí, trao đổi khí ở phế nang, tác hại khói thuốc' },
      { id: 35, chapterId: 7, subject: 'biology', title: 'Bài 35. Hệ bài tiết ở người', description: 'Cấu tạo đơn vị thận, cơ chế tạo nước tiểu, suy thận và chạy thận' },
      { id: 36, chapterId: 7, subject: 'biology', title: 'Bài 36. Điều hoà môi trường trong cơ thể', description: 'Cân bằng nội môi, nồng độ glucose máu, acid uric và bệnh gút' },
      { id: 37, chapterId: 7, subject: 'biology', title: 'Bài 37. Hệ thần kinh và các giác quan', description: 'Não bộ, tủy sống, tật cận thị/viễn thị, cấu tạo tai' },
      { id: 38, chapterId: 7, subject: 'biology', title: 'Bài 38. Hệ nội tiết ở người', description: 'Tuyến yên, tuyến giáp, tuyến tụy, hormone điều hòa đường huyết' },
      { id: 39, chapterId: 7, subject: 'biology', title: 'Bài 39. Da và điều hoà thân nhiệt ở người', description: 'Cấu tạo 3 lớp da, phản xạ toát mồ hôi, co giãn mao mạch' },
      { id: 40, chapterId: 7, subject: 'biology', title: 'Bài 40. Sinh sản ở người', description: 'Cơ quan sinh dục, chu kì kinh nguyệt, tránh thai, phòng bệnh lây qua đường tình dục' }
    ]
  },
  {
    id: 8,
    romanNumeral: 'CHƯƠNG VIII',
    title: 'SINH VẬT VÀ MÔI TRƯỜNG',
    subject: 'biology',
    lessons: [
      { id: 41, chapterId: 8, subject: 'biology', title: 'Bài 41. Môi trường sống và các nhân tố sinh thái', description: 'Nhân tố vô sinh, hữu sinh và quy luật giới hạn sinh thái' },
      { id: 42, chapterId: 8, subject: 'biology', title: 'Bài 42. Quần thể sinh vật', description: 'Khái niệm, kích thước, mật độ, tỉ lệ giới tính, tháp tuổi' },
      { id: 43, chapterId: 8, subject: 'biology', title: 'Bài 43. Quần xã sinh vật', description: 'Độ đa dạng, loài ưu thế, loài đặc trưng và bảo tồn' },
      { id: 44, chapterId: 8, subject: 'biology', title: 'Bài 44. Hệ sinh thái', description: 'Chuỗi thức ăn, lưới thức ăn, tháp sinh thái năng lượng' },
      { id: 45, chapterId: 8, subject: 'biology', title: 'Bài 45. Sinh quyển', description: 'Các khu sinh học trên cạn và thủy vực trên Trái Đất' },
      { id: 46, chapterId: 8, subject: 'biology', title: 'Bài 46. Cân bằng tự nhiên', description: 'Khống chế sinh học, trạng thái cân bằng động của quần thể' },
      { id: 47, chapterId: 8, subject: 'biology', title: 'Bài 47. Bảo vệ môi trường', description: 'Tác động của con người, ô nhiễm môi trường và biến đổi khí hậu' }
    ]
  }
];

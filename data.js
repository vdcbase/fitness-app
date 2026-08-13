// =============================================
// DATA: Lịch tập tuần + checklist items
// =============================================

const SCHEDULE = [
  {
    weekday: 0, // Sunday
    title: "Nghỉ Ngơi Hoàn Toàn",
    subtitle: "Gia đình & tái tạo năng lượng",
    type: "rest",
    emoji: "😴",
    color: "#a855f7",
    tip: "Nghỉ ngơi là một phần của quá trình tập luyện. Cơ thể phát triển khi ngủ! 💪",
    items: [
      { id: "sun_1", text: "👨‍👩‍👧 Thư giãn bên gia đình", cat: "general" },
      { id: "sun_2", text: "🍽️ Ăn uống đầy đủ, vui vẻ", cat: "nutrition" },
      { id: "sun_3", text: "💧 Uống đủ 2L nước", cat: "nutrition" },
      { id: "sun_4", text: "😴 Ngủ đủ 8 tiếng tối nay", cat: "recovery" },
      { id: "sun_5", text: "📋 Lên kế hoạch cho tuần mới", cat: "general" },
    ]
  },
  {
    weekday: 1, // Monday
    title: "Kháng Lực – Ngực & Tay Sau",
    subtitle: "Push: Ngực, vai, triceps",
    type: "workout",
    emoji: "💪",
    color: "#f97316",
    tip: "Giữ form đúng quan trọng hơn số lượng. Chậm mà chắc! 🎯",
    items: [
      { id: "mon_1", text: "🔥 Khởi động 5-10 phút", cat: "exercise" },
      { id: "mon_2", text: "💪 Chống đẩy dốc xuống: 4 tổ × 12 cái", cat: "exercise" },
      { id: "mon_3", text: "🦵 Squat nhảy: 4 tổ × 15 cái", cat: "exercise" },
      { id: "mon_4", text: "🧘 Giãn cơ sau tập 5-10 phút", cat: "recovery" },
      { id: "mon_5", text: "🥛 Uống Whey ngay sau tập", cat: "nutrition" },
      { id: "mon_6", text: "🍗 Ăn đủ protein bữa tối", cat: "nutrition" },
      { id: "mon_7", text: "😴 Ngủ trước 11 giờ đêm", cat: "recovery" },
    ]
  },
  {
    weekday: 2, // Tuesday
    title: "Nghỉ Ngơi Phục Hồi",
    subtitle: "Cơ bắp đang phục hồi và phát triển",
    type: "recovery",
    emoji: "🔄",
    color: "#3b82f6",
    tip: "Ngày phục hồi quan trọng như ngày tập. Ăn đủ protein để cơ phát triển! 🌱",
    items: [
      { id: "tue_1", text: "🚶 Đi bộ nhẹ 20-30 phút", cat: "exercise" },
      { id: "tue_2", text: "🍳 Ăn đủ bữa sáng", cat: "nutrition" },
      { id: "tue_3", text: "🥗 Ăn đủ bữa trưa", cat: "nutrition" },
      { id: "tue_4", text: "🥛 1/2 muỗng Whey bữa phụ chiều", cat: "nutrition" },
      { id: "tue_5", text: "🍽️ Ăn đủ bữa tối", cat: "nutrition" },
      { id: "tue_6", text: "💧 Uống đủ 2L nước", cat: "nutrition" },
      { id: "tue_7", text: "😴 Ngủ đủ 7-8 tiếng", cat: "recovery" },
    ]
  },
  {
    weekday: 3, // Wednesday
    title: "Kháng Lực – Lưng & Tay Trước",
    subtitle: "Pull: Lưng, biceps, core",
    type: "workout",
    emoji: "🏋️",
    color: "#f97316",
    tip: "TUT = kéo chậm, kiểm soát từng cm. Ít reps đúng vẫn tốt hơn nhiều reps sai! 🎯",
    items: [
      { id: "wed_1", text: "🔥 Khởi động 5-10 phút", cat: "exercise" },
      { id: "wed_2", text: "🏋️ Kéo xà đơn chậm TUT: 3 tổ × 6-8 cái", cat: "exercise" },
      { id: "wed_3", text: "💪 Chống đẩy thường: 3 tổ × 15 cái", cat: "exercise" },
      { id: "wed_4", text: "🧘 Giãn cơ sau tập 5-10 phút", cat: "recovery" },
      { id: "wed_5", text: "🥛 Uống Whey ngay sau tập", cat: "nutrition" },
      { id: "wed_6", text: "🍗 Ăn đủ protein bữa tối", cat: "nutrition" },
      { id: "wed_7", text: "😴 Ngủ đủ 7-8 tiếng", cat: "recovery" },
    ]
  },
  {
    weekday: 4, // Thursday
    title: "Nghỉ Ngơi Phục Hồi",
    subtitle: "Lưng & tay đang hồi phục",
    type: "recovery",
    emoji: "🔄",
    color: "#3b82f6",
    tip: "Hôm nay nghỉ để nạp lại cho buổi Full Body ngày mai. Ăn đủ tinh bột! ⚡",
    items: [
      { id: "thu_1", text: "🧘 Yoga hoặc giãn cơ nhẹ", cat: "exercise" },
      { id: "thu_2", text: "🍳 Ăn đủ bữa sáng", cat: "nutrition" },
      { id: "thu_3", text: "🥗 Ăn đủ bữa trưa", cat: "nutrition" },
      { id: "thu_4", text: "🥛 1/2 muỗng Whey bữa phụ chiều", cat: "nutrition" },
      { id: "thu_5", text: "🍽️ Ăn đủ bữa tối", cat: "nutrition" },
      { id: "thu_6", text: "💧 Uống đủ 2L nước", cat: "nutrition" },
      { id: "thu_7", text: "😴 Ngủ đủ 7-8 tiếng", cat: "recovery" },
    ]
  },
  {
    weekday: 5, // Friday
    title: "Kháng Lực – Toàn Thân",
    subtitle: "Full body: Pull + Push + Legs",
    type: "workout",
    emoji: "🔥",
    color: "#f97316",
    tip: "Buổi tập quan trọng nhất tuần! Dồn hết sức vào đây. 🔥",
    items: [
      { id: "fri_1", text: "🔥 Khởi động 5-10 phút", cat: "exercise" },
      { id: "fri_2", text: "🏋️ Kéo xà: 3 tổ (tối đa cái)", cat: "exercise" },
      { id: "fri_3", text: "💪 Chống đẩy dốc xuống: 3 tổ", cat: "exercise" },
      { id: "fri_4", text: "🦵 Squat giữ 1 giây: 4 tổ × 20 cái", cat: "exercise" },
      { id: "fri_5", text: "🧘 Giãn cơ toàn thân 10 phút", cat: "recovery" },
      { id: "fri_6", text: "🥛 Uống Whey ngay sau tập", cat: "nutrition" },
      { id: "fri_7", text: "😴 Ngủ sớm, chuẩn bị chạy Thứ 7", cat: "recovery" },
    ]
  },
  {
    weekday: 6, // Saturday
    title: "Chạy Bộ Bản Sắc",
    subtitle: "Cardio: 5km với Pace 5",
    type: "cardio",
    emoji: "🏃",
    color: "#22c55e",
    tip: "Chạy theo nhịp yêu thích, không áp lực. Pace 5 là tốc độ hoàn hảo! 🌟",
    items: [
      { id: "sat_1", text: "🍌 Ăn 1 quả chuối (30 phút trước chạy)", cat: "nutrition" },
      { id: "sat_2", text: "🥛 1/2 muỗng Whey trước khi chạy", cat: "nutrition" },
      { id: "sat_3", text: "🔥 Khởi động & giãn cơ chân", cat: "exercise" },
      { id: "sat_4", text: "🏃 Chạy 5km với Pace 5 yêu thích", cat: "exercise" },
      { id: "sat_5", text: "🍚 Bù tinh bột sau khi chạy", cat: "nutrition" },
      { id: "sat_6", text: "💧 Uống 500ml-1L nước sau chạy", cat: "nutrition" },
      { id: "sat_7", text: "😴 Ngủ sớm để nghỉ Chủ Nhật", cat: "recovery" },
    ]
  }
];

const TYPE_LABEL = {
  workout: "Kháng Lực",
  recovery: "Phục Hồi",
  cardio: "Cardio",
  rest: "Nghỉ Ngơi"
};

const DAY_SHORT = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
const DAY_FULL  = ["Chủ Nhật","Thứ Hai","Thứ Ba","Thứ Tư","Thứ Năm","Thứ Sáu","Thứ Bảy"];

// =============================================
// SERVICE WORKER – Cache offline + Notifications
// =============================================

const CACHE = 'fitness-v1';
const ASSETS = ['/', '/index.html', '/styles.css', '/app.js', '/data.js', '/manifest.json'];

// Install: cache all assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

// Activate: remove old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: cache-first strategy
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

// Message from app
self.addEventListener('message', e => {
  if (e.data?.type === 'SCHEDULE_NOTIFS') scheduleAll();
});

// ---- Notification scheduling via periodic check ----
// iOS PWA doesn't support background sync well, so we use
// a trick: schedule immediate notification and rely on user
// opening the app each morning.

function scheduleAll() {
  const now = new Date();
  const hour = now.getHours();
  const min  = now.getMinutes();
  const day  = now.getDay(); // 0=Sun...6=Sat

  const msgs = {
    morning: [
      "😴 Chủ Nhật – nghỉ ngơi hoàn toàn. Sạc pin cho tuần mới!",
      "💪 Thứ Hai – Ngực & Tay sau. Sẵn sàng chưa?",
      "🔄 Thứ Ba – Ngày phục hồi. Ăn đủ và uống đủ nước!",
      "🏋️ Thứ Tư – Lưng & Tay trước. Kéo xà TUT hôm nay!",
      "💤 Thứ Năm – Phục hồi. Cơ bắp đang phát triển!",
      "🔥 Thứ Sáu – Full Body! Buổi tập quan trọng nhất tuần!",
      "🏃 Thứ Bảy – Chạy 5km! Đừng quên chuối + Whey trước.",
    ]
  };

  // Gửi thông báo nhắc nhở tùy giờ mở app
  if (hour < 10) {
    showNotif('🌅 Thể Dục Hàng Ngày', msgs.morning[day]);
  } else if (hour >= 17 && hour < 20 && [1,3,5].includes(day)) {
    const wMsgs = [,'💪 Giờ tập Ngực & Tay sau!',,'🏋️ Giờ tập Lưng & Tay trước!',,'🔥 Full Body! Let\'s go!'];
    showNotif('⏰ Đến Giờ Tập!', wMsgs[day] || 'Đến giờ tập rồi!');
  } else if (hour >= 14 && hour < 16 && [2,4].includes(day)) {
    showNotif('🥛 Bữa Phụ Chiều', 'Nhớ uống 1/2 muỗng Whey nhé!');
  } else if (hour >= 21 && hour < 23) {
    showNotif('🌙 Giờ Đi Ngủ', '😴 Ngủ đủ giấc = cơ phát triển tốt hơn. Ngủ ngon!');
  }
}

function showNotif(title, body) {
  self.registration.showNotification(title, {
    body,
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    vibrate: [100, 50, 100],
  });
}

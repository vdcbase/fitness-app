// =============================================
// APP.JS – Logic chính: render, checklist, streak
// =============================================

// ---------- Storage helpers ----------
function dateKey(date = new Date()) {
  return date.toISOString().slice(0, 10); // "yyyy-mm-dd"
}

function loadProgress() {
  try { return JSON.parse(localStorage.getItem('progress') || '{}'); }
  catch { return {}; }
}

function saveProgress(data) {
  localStorage.setItem('progress', JSON.stringify(data));
}

function toggleItem(itemId) {
  const data = loadProgress();
  const key  = dateKey();
  if (!data[key]) data[key] = [];
  const idx = data[key].indexOf(itemId);
  if (idx === -1) data[key].push(itemId);
  else data[key].splice(idx, 1);
  saveProgress(data);
  renderToday();
  updateBadge();
}

function isCompleted(itemId, key = dateKey()) {
  const data = loadProgress();
  return (data[key] || []).includes(itemId);
}

function ratioForDay(schedule, key = dateKey()) {
  const data = loadProgress();
  const done = (data[key] || []).filter(id => schedule.items.some(i => i.id === id));
  return schedule.items.length ? done.length / schedule.items.length : 0;
}

function calcStreak() {
  const data = loadProgress();
  let count = 0;
  const d = new Date();
  for (let i = 0; i < 90; i++) {
    const k = dateKey(d);
    const w = d.getDay();
    const s = SCHEDULE[w];
    const done = (data[k] || []).filter(id => s.items.some(it => it.id === id));
    const ratio = s.items.length ? done.length / s.items.length : 0;
    if (ratio >= 0.8) { count++; d.setDate(d.getDate() - 1); }
    else break;
  }
  return count;
}

// ---------- Navigation ----------
let currentPage = 'today';

function navigate(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  document.querySelector(`[data-page="${page}"]`).classList.add('active');
  currentPage = page;
  if (page === 'today')   renderToday();
  if (page === 'weekly')  renderWeekly();
  if (page === 'profile') renderProfile();
}

// ---------- TODAY ----------
function renderToday() {
  const now  = new Date();
  const day  = SCHEDULE[now.getDay()];
  const key  = dateKey();
  const data = loadProgress();
  const done = (data[key] || []).filter(id => day.items.some(i => i.id === id));
  const ratio = day.items.length ? done.length / day.items.length : 0;
  const pct  = Math.round(ratio * 100);

  const dateStr = now.toLocaleDateString('vi-VN', {
    weekday:'long', day:'2-digit', month:'2-digit', year:'numeric'
  });

  document.getElementById('page-today').innerHTML = `
    <div class="page-scroll">
      <div class="section-header">
        <h1>Hôm Nay</h1>
      </div>

      <!-- Header card -->
      <div class="card header-card" style="--accent:${day.color}">
        <div class="header-left">
          <p class="date-text">${dateStr}</p>
          <h2 class="day-title">${day.title}</h2>
          <p class="day-sub">${day.subtitle}</p>
        </div>
        <div class="header-right">
          <span class="big-emoji">${day.emoji}</span>
          <span class="type-badge" style="color:${day.color};background:${day.color}22">
            ${TYPE_LABEL[day.type]}
          </span>
        </div>
      </div>

      <!-- Progress -->
      <div class="card progress-card">
        <div class="ring-wrap">
          <svg viewBox="0 0 80 80" class="ring-svg">
            <circle cx="40" cy="40" r="32" class="ring-bg" style="stroke:${day.color}22"/>
            <circle cx="40" cy="40" r="32" class="ring-fg" style="stroke:${day.color};
              stroke-dasharray:${ratio * 201} 201"/>
          </svg>
          <span class="ring-pct">${pct}%</span>
        </div>
        <div class="progress-info">
          <p class="prog-label">Tiến độ hôm nay</p>
          <p class="prog-count">${done.length}/${day.items.length} nhiệm vụ</p>
          ${calcStreak() > 0 ? `<p class="streak-badge">🔥 ${calcStreak()} ngày liên tiếp</p>` : ''}
        </div>
      </div>

      <!-- Checklist -->
      <div class="card checklist-card">
        <h3 class="card-title">Checklist</h3>
        <ul class="checklist">
          ${day.items.map(item => {
            const done = isCompleted(item.id);
            return `
            <li class="check-item ${done ? 'done' : ''}" onclick="toggleItem('${item.id}')">
              <span class="check-icon">${done ? '✅' : '⭕'}</span>
              <span class="check-text">${item.text}</span>
            </li>`;
          }).join('')}
        </ul>
      </div>

      <!-- Tip -->
      <div class="card tip-card" style="background:${day.color}11;border-left:4px solid ${day.color}">
        <span class="tip-icon">💡</span>
        <p class="tip-text">${day.tip}</p>
      </div>
    </div>
  `;
}

// ---------- WEEKLY ----------
function renderWeekly() {
  const todayW = new Date().getDay();
  const rows = SCHEDULE.map(day => {
    const now = new Date();
    const diff = day.weekday - todayW;
    const d = new Date(now); d.setDate(now.getDate() + diff);
    const k = dateKey(d);
    const ratio = ratioForDay(day, k);
    const pct = Math.round(ratio * 100);
    const isToday = day.weekday === todayW;
    return `
      <div class="card week-card ${isToday ? 'today-card' : ''}"
           style="${isToday ? `--accent:${day.color};border:1.5px solid ${day.color}55` : ''}">
        <div class="week-left">
          <span class="week-emoji">${day.emoji}</span>
          <span class="week-dayname" style="${isToday ? `color:${day.color};font-weight:700` : ''}">
            ${DAY_SHORT[day.weekday]}
          </span>
        </div>
        <div class="week-mid">
          <p class="week-title ${isToday ? '' : 'muted'}">${day.title}</p>
          <p class="week-sub">${day.subtitle}</p>
          <div class="mini-bar-bg">
            <div class="mini-bar-fg" style="width:${pct}%;background:${day.color}"></div>
          </div>
        </div>
        <div class="week-right">
          <span class="type-badge sm" style="color:${day.color};background:${day.color}22">
            ${TYPE_LABEL[day.type]}
          </span>
          <span class="week-pct">${ratio >= 0.8 ? '✅' : pct > 0 ? pct + '%' : ''}</span>
        </div>
      </div>`;
  }).join('');

  document.getElementById('page-weekly').innerHTML = `
    <div class="page-scroll">
      <div class="section-header"><h1>Lịch Tuần</h1></div>
      ${rows}
    </div>`;
}

// ---------- PROFILE ----------
function renderProfile() {
  const streak = calcStreak();
  const bmi = (60 / (1.70 * 1.70)).toFixed(1);
  const todayW = new Date().getDay();
  const dots = SCHEDULE.map(day => {
    const now = new Date();
    const diff = day.weekday - todayW;
    const d = new Date(now); d.setDate(now.getDate() + diff);
    const ratio = ratioForDay(day, dateKey(d));
    return `<div class="week-dot-wrap">
      <div class="week-dot" style="background:${ratio >= 0.8 ? day.color : day.color + '22'}">
        ${ratio >= 0.8 ? '✓' : day.emoji}
      </div>
      <span class="week-dot-label">${DAY_SHORT[day.weekday]}</span>
    </div>`;
  }).join('');

  document.getElementById('page-profile').innerHTML = `
    <div class="page-scroll">
      <div class="section-header"><h1>Hồ Sơ</h1></div>

      <!-- Avatar -->
      <div class="card avatar-card">
        <div class="avatar">💪</div>
        <h2>Bạn</h2>
        <p class="muted">Sinh ngày 30/03/1988 · 38 tuổi</p>
        ${streak > 0 ? `<p class="streak-badge big">🔥 ${streak} ngày streak</p>` : ''}
      </div>

      <!-- Stats -->
      <div class="card">
        <h3 class="card-title">Chỉ số cơ thể</h3>
        <div class="stat-grid">
          <div class="stat-tile blue">
            <span class="stat-icon">📏</span>
            <span class="stat-label">Chiều cao</span>
            <span class="stat-val">170 cm</span>
          </div>
          <div class="stat-tile green">
            <span class="stat-icon">⚖️</span>
            <span class="stat-label">Cân nặng</span>
            <span class="stat-val">60 kg</span>
          </div>
          <div class="stat-tile orange">
            <span class="stat-icon">❤️</span>
            <span class="stat-label">BMI</span>
            <span class="stat-val">${bmi}</span>
          </div>
          <div class="stat-tile green">
            <span class="stat-icon">✅</span>
            <span class="stat-label">Tình trạng</span>
            <span class="stat-val">Bình thường</span>
          </div>
        </div>
      </div>

      <!-- Week dots -->
      <div class="card">
        <h3 class="card-title">Tuần này</h3>
        <div class="week-dots">${dots}</div>
      </div>

      <!-- Notifications -->
      <div class="card notif-card">
        <h3 class="card-title">Thông báo</h3>
        <p class="muted" style="margin-bottom:12px">
          6:30 sáng · Giờ tập · Whey chiều · 22:00 ngủ
        </p>
        <button class="btn-primary" onclick="requestNotifications()">
          🔔 Bật thông báo
        </button>
        <p id="notif-status" class="notif-status"></p>
      </div>
    </div>`;

  checkNotifStatus();
}

// ---------- NOTIFICATIONS ----------
function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

function iOSVersion() {
  const m = navigator.userAgent.match(/OS (\d+)_/);
  return m ? parseInt(m[1]) : 0;
}

function isStandalone() {
  return window.navigator.standalone === true;
}

function requestNotifications() {
  const el = document.getElementById('notif-status');

  // Chưa mở từ icon màn hình chính
  if (isIOS() && !isStandalone()) {
    el.textContent = '⚠️ Hãy mở app từ icon trên màn hình chính, không mở từ Safari';
    return;
  }

  // iOS quá cũ (< 16.4)
  if (isIOS() && iOSVersion() < 16) {
    el.textContent = '⚠️ Cần iOS 16.4 trở lên. iPhone của bạn đang dùng iOS ' + iOSVersion();
    showAlarmFallback();
    return;
  }

  // Trình duyệt không hỗ trợ (Android Chrome cũ...)
  if (!('Notification' in window)) {
    el.textContent = '❌ Trình duyệt không hỗ trợ – thử dùng Safari';
    showAlarmFallback();
    return;
  }

  Notification.requestPermission().then(perm => {
    if (perm === 'granted') {
      el.textContent = '✅ Đã bật thông báo!';
      // Gửi thông báo test ngay
      new Notification('🌟 Thể Dục Hàng Ngày', {
        body: 'Thông báo đã bật! Mở app mỗi sáng để nhận nhắc nhở.',
        icon: './icons/icon-192.png'
      });
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(reg => {
          reg.active?.postMessage({ type: 'SCHEDULE_NOTIFS' });
        });
      }
    } else if (perm === 'denied') {
      el.textContent = '🚫 Đã từ chối – vào Cài đặt → Thể Dục → Thông báo để bật lại';
    } else {
      el.textContent = '⚠️ Chưa cấp quyền thông báo';
    }
  });
}

function checkNotifStatus() {
  const el = document.getElementById('notif-status');
  if (!el) return;

  if (isIOS() && !isStandalone()) {
    el.textContent = '⚠️ Mở từ icon màn hình chính để dùng thông báo';
  } else if (!('Notification' in window)) {
    el.textContent = isIOS()
      ? '⚠️ Cần iOS 16.4+ để dùng thông báo PWA'
      : '❌ Trình duyệt không hỗ trợ thông báo';
    showAlarmFallback();
  } else if (Notification.permission === 'granted') {
    el.textContent = '✅ Thông báo đã được bật';
  } else if (Notification.permission === 'denied') {
    el.textContent = '🚫 Đã từ chối – vào Cài đặt để bật lại';
    showAlarmFallback();
  }
}

function showAlarmFallback() {
  const card = document.querySelector('.notif-card');
  if (!card || document.getElementById('alarm-tip')) return;
  const tip = document.createElement('div');
  tip.id = 'alarm-tip';
  tip.style.cssText = 'margin-top:12px;padding:12px;background:#fff9f5;border-radius:10px;border-left:3px solid #f97316';
  tip.innerHTML = `
    <p style="font-size:13px;font-weight:600;margin-bottom:6px">📱 Dùng báo thức iPhone thay thế:</p>
    <p style="font-size:12px;color:#666;line-height:1.6">
      • 6:30 sáng – Nhắc mở app xem lịch tập<br>
      • 18:00 T2, T4, T6 – Giờ tập kháng lực<br>
      • 7:00 sáng T7 – Chuẩn bị chạy bộ<br>
      • 15:00 T3, T5 – Uống Whey buổi chiều<br>
      • 22:00 – Nhắc đi ngủ
    </p>
    <a href="clock-alarm://" style="display:inline-block;margin-top:8px;font-size:12px;color:#f97316;font-weight:600">
      ⏰ Mở app Đồng Hồ →
    </a>`;
  card.appendChild(tip);
}

function updateBadge() {
  if ('setAppBadge' in navigator) {
    const day = SCHEDULE[new Date().getDay()];
    const key = dateKey();
    const data = loadProgress();
    const remaining = day.items.filter(i => !((data[key] || []).includes(i.id))).length;
    navigator.setAppBadge(remaining || 0);
  }
}

// ---------- INIT ----------
window.addEventListener('DOMContentLoaded', () => {
  renderToday();
  updateBadge();
});

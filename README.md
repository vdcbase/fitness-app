# 🏋️ Thể Dục Hàng Ngày – PWA

App nhắc nhở tập thể dục theo lịch tuần cá nhân. Hoạt động trên iPhone như app thật.

## Deploy lên GitHub Pages (miễn phí)

### Bước 1: Tạo tài khoản GitHub
Vào https://github.com → Sign up (nếu chưa có)

### Bước 2: Tạo repository mới
1. Click **"New repository"** (nút xanh góc trên phải)
2. Repository name: `fitness-app`
3. Chọn **Public**
4. Click **"Create repository"**

### Bước 3: Upload files từ Linux Mint

Mở Terminal, chạy lần lượt:

```bash
# Cài git nếu chưa có
sudo apt install git -y

# Di chuyển vào thư mục PWA
cd /media/vdc/E/Body/FitnessPWA

# Khởi tạo git
git init
git add .
git commit -m "Initial commit - Fitness PWA"

# Kết nối với GitHub (thay YOUR_USERNAME bằng tên GitHub của bạn)
git remote add origin https://github.com/YOUR_USERNAME/fitness-app.git
git branch -M main
git push -u origin main
```

Khi push sẽ hỏi username + password GitHub.
> ⚠️ Dùng **Personal Access Token** thay password:
> GitHub → Settings → Developer settings → Personal access tokens → Generate new token → tick "repo"

### Bước 4: Bật GitHub Pages
1. Vào repository trên GitHub
2. **Settings → Pages**
3. Source: chọn **"Deploy from a branch"**
4. Branch: **main** → folder: **/ (root)**
5. Click **Save**
6. Đợi 1-2 phút → link xuất hiện: `https://YOUR_USERNAME.github.io/fitness-app`

---

## Cài lên iPhone

1. Mở **Safari** trên iPhone (bắt buộc dùng Safari, không dùng Chrome)
2. Truy cập link: `https://YOUR_USERNAME.github.io/fitness-app`
3. Nhấn icon **Chia sẻ** (hình vuông có mũi tên lên) ở thanh dưới Safari
4. Chọn **"Thêm vào Màn hình chính"**
5. Đặt tên: `Thể Dục` → **Thêm**

App sẽ xuất hiện trên màn hình chính với icon cam, mở fullscreen như app thật! 🎉

---

## Bật thông báo (iOS 16.4+)

Sau khi thêm vào màn hình chính:
1. Mở app từ icon (quan trọng – không mở từ Safari)
2. Tab **Hồ Sơ** → nhấn **"Bật thông báo"**
3. Chọn **"Allow"**

---

## Test nhanh trên máy Linux

```bash
cd /media/vdc/E/Body/FitnessPWA
python3 -m http.server 8080
```
Mở trình duyệt: http://localhost:8080

# 👟 KicksSpace - E-Commerce Shoe Store

KicksSpace là một ứng dụng web thương mại điện tử chuyên cung cấp các mẫu giày thể thao, giày thời trang chính hãng. Dự án được xây dựng với giao diện **Premium UI/UX**, tích hợp đầy đủ các chức năng mua sắm từ xem sản phẩm, giỏ hàng, đến hệ thống quản lý tài khoản và trang quản trị (Admin Dashboard).

---

## ✨ Tính năng nổi bật (Features)

### Dành cho Khách hàng (User)
- **🛍️ Mua sắm dễ dàng:** Trang chủ nổi bật, danh sách sản phẩm với bộ lọc thông minh (theo danh mục, thương hiệu, mức giá).
- **📝 Chi tiết sản phẩm:** Xem thông tin sản phẩm trực quan, chọn Kích thước (Size) và Màu sắc (Color) trước khi đặt mua.
- **🛒 Quản lý giỏ hàng:** Cập nhật số lượng, tính toán tổng tiền tự động (Real-time).
- **💳 Thanh toán mô phỏng (Checkout):** Biểu mẫu giao hàng và trả về mã đơn hàng thành công.
- **🔐 Hệ thống Tài khoản:** Đăng ký và Đăng nhập mượt mà.

### Dành cho Quản trị viên (Admin)
- **📊 Bảng Điều khiển (Dashboard):** Thống kê nhanh doanh thu, số lượng đơn hàng mới, sản phẩm đang bán.
- **📦 Quản lý Sản phẩm:** Bảng dữ liệu sản phẩm hiển thị thông tin trực quan.
- **🛡️ Phân quyền an toàn:** Route Guards chặn quyền truy cập trái phép vào trang quản trị.

---

## 🛠 Công nghệ sử dụng (Tech Stack)

Dự án được xây dựng hoàn toàn bằng hệ sinh thái Javascript hiện đại:

- **Framework:** [Vue.js 3](https://vuejs.org/) (Composition API)
- **Build Tool:** [Vite](https://vitejs.dev/) (Tốc độ khởi tạo siêu nhanh)
- **State Management:** [Pinia](https://pinia.vuejs.org/) (Quản lý trạng thái Auth, Giỏ hàng, Sản phẩm)
- **Routing:** [Vue Router 4](https://router.vuejs.org/) (Tạo các trang SPA)
- **Styling:** Vanilla CSS kết hợp CSS Variables (Tối ưu hóa hiệu suất, giao diện Premium).

---

## 🚀 Hướng dẫn cài đặt (Installation & Setup)

Yêu cầu môi trường: **Node.js** (Phiên bản 16 trở lên).

**1. Clone dự án về máy:**
```bash
git clone git@github.com:nthun1325/Quan-Ly-Ban-Day-Dep-No-Data.git
cd Quan-Ly-Ban-Day-Dep-No-Data
```

**2. Cài đặt các thư viện phụ thuộc (Dependencies):**
```bash
npm install
```

**3. Chạy Server ở môi trường phát triển (Development):**
```bash
npm run dev
```

**4. Build mã nguồn để đưa lên Production:**
```bash
npm run build
```

---

## 🔑 Tài khoản mặc định để thử nghiệm (Mock Accounts)

- **Tài khoản Admin:** 
  - Email: `admin@kicksspace.com`
  - Mật khẩu: *(Bất kỳ)*
- **Tài khoản User:** Đăng ký tự do qua màn hình Register hoặc đăng nhập với email bất kỳ khác `admin`.

---

## 📂 Cấu trúc thư mục (Folder Structure)

```text
src/
├── assets/          # Hình ảnh, file SVG
├── components/      # Các Component dùng chung (Header, Footer, ProductCard)
├── data/            # Mock data (Dữ liệu giày, thương hiệu giả lập)
├── pages/           # Chứa các giao diện trang chính (Home, Shop, Cart...)
│   └── admin/       # Chứa các trang dành cho Admin
├── router/          # Định tuyến các trang (Vue Router)
├── stores/          # Quản lý State toàn cục bằng Pinia
├── styles/          # Hệ thống CSS Variables & Utilities
├── App.vue          # Component gốc của Vue
└── main.js          # File cấu hình khởi chạy Vue App
```

---
*Dự án này là phiên bản Front-end mô phỏng dữ liệu (No-Data / Mock Data) với mục tiêu làm quen và rèn luyện kỹ năng xây dựng giao diện ứng dụng React/Vue lớn.*

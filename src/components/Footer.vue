<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="footer-brand">
          <router-link to="/" class="logo">
            <span class="logo-icon">👟</span>
            <span class="logo-text">KicksSpace</span>
          </router-link>
          <p class="footer-desc text-body">
            Nơi cung cấp những đôi giày chính hãng, đẳng cấp với trải nghiệm mua sắm tuyệt vời nhất.
          </p>
        </div>

        <!-- Links -->
        <div>
          <h4 class="footer-title">Cửa hàng</h4>
          <ul class="footer-links">
            <li><router-link to="/shop">Tất cả sản phẩm</router-link></li>
            <li><router-link to="/shop?category=Nam">Giày Nam</router-link></li>
            <li><router-link to="/shop?category=Nữ">Giày Nữ</router-link></li>
            <li><router-link to="/shop?category=Trẻ em">Giày Trẻ em</router-link></li>
          </ul>
        </div>

        <div>
          <h4 class="footer-title">Hỗ trợ</h4>
          <ul class="footer-links">
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Chính sách đổi trả</a></li>
            <li><a href="#">Chính sách bảo hành</a></li>
            <li><a href="#">Liên hệ</a></li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h4 class="footer-title">Đăng ký nhận tin</h4>
          <p class="footer-desc text-body">
            Nhận thông tin mới nhất về sản phẩm và khuyến mãi.
          </p>
          <form class="newsletter-form" @submit.prevent>
            <input type="email" placeholder="Email của bạn" class="input-field" />
            <button type="submit" class="btn btn-primary mt-2 w-full">Đăng ký</button>
          </form>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2026 KicksSpace. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--color-surface);
  padding: 4rem 0 2rem;
  border-top: 1px solid var(--color-border);
  margin-top: auto;
}

.footer-grid {
  margin-bottom: 3rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.logo-icon {
  font-size: 1.5rem;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-primary);
}

.footer-desc {
  margin-bottom: 1rem;
}

.footer-title {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--color-primary);
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-links a {
  color: var(--color-text-light);
  transition: color var(--transition-fast);
}

.footer-links a:hover {
  color: var(--color-primary);
  text-decoration: underline;
}

.newsletter-form .input-field {
  margin-bottom: 0.5rem;
}

.w-full {
  width: 100%;
}

.mt-2 {
  margin-top: 0.5rem;
}

.footer-bottom {
  padding-top: 2rem;
  border-top: 1px solid var(--color-border);
  text-align: center;
  color: var(--color-text-light);
  font-size: 0.875rem;
}
</style>

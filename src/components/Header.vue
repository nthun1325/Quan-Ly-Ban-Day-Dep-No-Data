<template>
  <header class="header">
    <div class="container header-container">
      <router-link to="/" class="logo">
        <span class="logo-icon">👟</span>
        <span class="logo-text">KicksSpace</span>
      </router-link>

      <nav class="nav-links">
        <router-link to="/" class="nav-link">Trang chủ</router-link>
        <router-link to="/shop" class="nav-link">Cửa hàng</router-link>
        <a href="#about" class="nav-link">Về chúng tôi</a>
        <a href="#contact" class="nav-link">Liên hệ</a>
      </nav>

      <div class="header-actions">
        <div class="search-box">
          <input 
            type="text" 
            placeholder="Tìm kiếm..." 
            v-model="searchQuery"
            @keyup.enter="handleSearch"
            class="input-field search-input"
          />
        </div>
        
        <div class="auth-section">
          <template v-if="authStore.isAuthenticated">
            <div class="user-menu">
              <span class="user-greeting">Chào, {{ authStore.user.name }}</span>
              <router-link v-if="authStore.isAdmin" to="/admin" class="nav-link admin-link">Admin</router-link>
              <button @click="handleLogout" class="nav-link logout-text-btn">Đăng xuất</button>
            </div>
          </template>
          <template v-else>
            <router-link to="/login" class="nav-link">Đăng nhập</router-link>
            <router-link to="/register" class="btn btn-primary btn-sm">Đăng ký</router-link>
          </template>
        </div>

        <router-link to="/cart" class="cart-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span v-if="cartStore.cartTotalItems > 0" class="cart-badge">{{ cartStore.cartTotalItems }}</span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cartStore';
import { useProductStore } from '../stores/productStore';
import { useAuthStore } from '../stores/authStore';

const router = useRouter();
const cartStore = useCartStore();
const productStore = useProductStore();
const authStore = useAuthStore();
const searchQuery = ref('');

const handleSearch = () => {
  productStore.setFilter({ search: searchQuery.value });
  router.push('/shop');
};

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.header {
  background-color: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-icon {
  font-size: 2rem;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-primary);
  letter-spacing: -0.02em;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  font-weight: 500;
  color: var(--color-text);
  position: relative;
}

.nav-link:hover, .router-link-active.nav-link {
  color: var(--color-primary);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--color-primary);
  transition: width var(--transition-fast);
}

.nav-link:hover::after, .router-link-active.nav-link::after {
  width: 100%;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.search-input {
  padding: 0.5rem 1rem;
  border-radius: var(--radius-full);
  width: 200px;
}

.cart-icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: background-color var(--transition-fast);
}

.auth-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-greeting {
  font-weight: 600;
  color: var(--color-primary);
}

.admin-link {
  color: var(--color-error) !important;
}

.logout-text-btn {
  font-weight: 500;
  color: var(--color-text-light);
  padding: 0;
}

.logout-text-btn:hover {
  color: var(--color-error);
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.cart-icon:hover {
  background-color: var(--color-surface);
}

.cart-badge {
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--color-accent);
  color: var(--color-primary);
  font-size: 0.75rem;
  font-weight: 700;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transform: translate(25%, -25%);
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  .search-box {
    display: none;
  }
}
</style>

<template>
  <div class="admin-dashboard">
    <!-- Admin Sidebar -->
    <aside class="admin-sidebar">
      <div class="admin-brand">
        <router-link to="/" class="logo">
          <span class="logo-icon">👟</span>
          <span class="logo-text">KicksSpace</span>
        </router-link>
        <div class="admin-badge">Admin Panel</div>
      </div>
      
      <nav class="admin-nav">
        <a href="#" class="admin-nav-link active">
          <span>📊</span> Tổng quan
        </a>
        <a href="#" class="admin-nav-link">
          <span>📦</span> Sản phẩm
        </a>
        <a href="#" class="admin-nav-link">
          <span>🛒</span> Đơn hàng
        </a>
        <a href="#" class="admin-nav-link">
          <span>👥</span> Khách hàng
        </a>
      </nav>
      
      <div class="admin-sidebar-footer">
        <button @click="handleLogout" class="logout-btn">
          <span>🚪</span> Đăng xuất
        </button>
      </div>
    </aside>

    <!-- Admin Main Content -->
    <main class="admin-main">
      <header class="admin-header">
        <h1 class="text-h2">Tổng quan</h1>
        <div class="admin-user-info">
          <span>Xin chào, <strong>{{ authStore.user?.name }}</strong></span>
        </div>
      </header>

      <div class="admin-content-inner">
        <!-- Stats Cards -->
        <div class="stats-grid">
          <div class="stat-card">
            <h3 class="stat-title">Tổng doanh thu</h3>
            <p class="stat-value">124.500.000 đ</p>
            <span class="stat-trend positive">+15% so với tháng trước</span>
          </div>
          <div class="stat-card">
            <h3 class="stat-title">Đơn hàng mới</h3>
            <p class="stat-value">45</p>
            <span class="stat-trend positive">+5% so với tháng trước</span>
          </div>
          <div class="stat-card">
            <h3 class="stat-title">Sản phẩm đang bán</h3>
            <p class="stat-value">{{ productStore.products.length }}</p>
            <span class="stat-trend neutral">Ổn định</span>
          </div>
        </div>

        <!-- Product Table -->
        <div class="admin-panel mt-8">
          <div class="panel-header">
            <h2 class="text-h3">Danh sách sản phẩm</h2>
            <button class="btn btn-primary btn-sm">Thêm sản phẩm</button>
          </div>
          
          <div class="table-responsive">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Hình ảnh</th>
                  <th>Tên sản phẩm</th>
                  <th>Thương hiệu</th>
                  <th>Giá (VNĐ)</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in productStore.products" :key="product.id">
                  <td>{{ product.id }}</td>
                  <td>
                    <img :src="product.images[0]" class="table-img" alt="product" />
                  </td>
                  <td class="font-medium">{{ product.name }}</td>
                  <td>{{ product.brand }}</td>
                  <td>{{ formatPrice(product.price) }}</td>
                  <td>
                    <div class="action-buttons">
                      <button class="action-btn edit" title="Sửa">✏️</button>
                      <button class="action-btn delete" title="Xóa">🗑️</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/authStore';
import { useProductStore } from '../../stores/productStore';

const router = useRouter();
const authStore = useAuthStore();
const productStore = useProductStore();

onMounted(() => {
  if (!authStore.isAdmin) {
    router.push('/');
  }
});

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price);
};

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  min-height: 100vh;
  background-color: var(--color-surface);
}

/* Sidebar */
.admin-sidebar {
  width: 260px;
  background-color: white;
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
}

.admin-brand {
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.logo-icon { font-size: 1.5rem; }
.logo-text {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-primary);
}

.admin-badge {
  display: inline-block;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  background-color: var(--color-primary);
  color: white;
  padding: 0.125rem 0.5rem;
  border-radius: var(--radius-sm);
  font-weight: 600;
}

.admin-nav {
  flex: 1;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.admin-nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  color: var(--color-text-light);
  font-weight: 500;
  transition: all var(--transition-fast);
}

.admin-nav-link:hover {
  background-color: var(--color-surface);
  color: var(--color-primary);
}

.admin-nav-link.active {
  background-color: var(--color-primary);
  color: white;
}

.admin-sidebar-footer {
  padding: 1.5rem;
  border-top: 1px solid var(--color-border);
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem;
  color: var(--color-error);
  font-weight: 600;
  border-radius: var(--radius-md);
  transition: background-color var(--transition-fast);
}

.logout-btn:hover {
  background-color: #fee2e2;
}

/* Main Content */
.admin-main {
  flex: 1;
  margin-left: 260px;
  min-height: 100vh;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: white;
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 5;
}

.admin-content-inner {
  padding: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.stat-card {
  background-color: white;
  padding: 1.5rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
}

.stat-title {
  font-size: 0.875rem;
  color: var(--color-text-light);
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.stat-trend {
  font-size: 0.875rem;
  font-weight: 500;
}

.stat-trend.positive { color: var(--color-success); }
.stat-trend.neutral { color: var(--color-text-light); }

.mt-8 { margin-top: 2rem; }

.admin-panel {
  background-color: white;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.table-responsive {
  overflow-x: auto;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
}

.admin-table th,
.admin-table td {
  padding: 1rem 1.5rem;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

.admin-table th {
  background-color: var(--color-surface);
  font-weight: 600;
  color: var(--color-text-light);
  font-size: 0.875rem;
}

.admin-table tbody tr:hover {
  background-color: var(--color-surface);
}

.table-img {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-sm);
  object-fit: cover;
}

.font-medium { font-weight: 500; }

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  background-color: var(--color-surface);
  transition: all var(--transition-fast);
}

.action-btn:hover {
  background-color: var(--color-border);
}
</style>

<template>
  <div class="user-dashboard container section-padding">
    <div class="dashboard-layout">
      <!-- Sidebar -->
      <aside class="dashboard-sidebar">
        <div class="user-profile">
          <div class="avatar">
            {{ userInitials }}
          </div>
          <div class="user-info">
            <h3 class="user-name">{{ authStore.user?.name }}</h3>
            <p class="user-email">{{ authStore.user?.email }}</p>
          </div>
        </div>

        <nav class="dashboard-nav">
          <button 
            class="nav-item" 
            :class="{ active: activeTab === 'profile' }"
            @click="activeTab = 'profile'"
          >
            <span>👤</span> Thông tin cá nhân
          </button>
          <button 
            class="nav-item" 
            :class="{ active: activeTab === 'orders' }"
            @click="activeTab = 'orders'"
          >
            <span>📦</span> Lịch sử đơn hàng
          </button>
          <button 
            class="nav-item" 
            :class="{ active: activeTab === 'wishlist' }"
            @click="activeTab = 'wishlist'"
          >
            <span>❤️</span> Sản phẩm yêu thích
          </button>
          <button @click="handleLogout" class="nav-item text-error">
            <span>🚪</span> Đăng xuất
          </button>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="dashboard-content">
        <!-- Profile Tab -->
        <div v-if="activeTab === 'profile'" class="tab-pane animate-fade-in">
          <h2 class="text-h2 mb-6">Thông tin cá nhân</h2>
          <div class="profile-card">
            <form @submit.prevent>
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">Họ và tên</label>
                  <input type="text" class="input-field" :value="authStore.user?.name" />
                </div>
                <div class="form-group">
                  <label class="form-label">Email</label>
                  <input type="email" class="input-field" :value="authStore.user?.email" disabled />
                  <small class="hint-text">Không thể thay đổi địa chỉ email.</small>
                </div>
                <div class="form-group full-width">
                  <label class="form-label">Số điện thoại</label>
                  <input type="tel" class="input-field" placeholder="Chưa cập nhật" />
                </div>
                <div class="form-group full-width">
                  <label class="form-label">Địa chỉ mặc định</label>
                  <input type="text" class="input-field" placeholder="Chưa cập nhật địa chỉ" />
                </div>
              </div>
              <button class="btn btn-primary mt-6">Cập nhật thông tin</button>
            </form>
          </div>
        </div>

        <!-- Orders Tab -->
        <div v-if="activeTab === 'orders'" class="tab-pane animate-fade-in">
          <h2 class="text-h2 mb-6">Lịch sử đơn hàng</h2>
          <div class="empty-state">
            <span class="empty-icon">🛍️</span>
            <h3 class="text-h3 mt-4 mb-2">Bạn chưa có đơn hàng nào</h3>
            <p class="text-body mb-6">Hãy khám phá các sản phẩm và đặt đơn hàng đầu tiên của bạn!</p>
            <router-link to="/shop" class="btn btn-primary">Mua sắm ngay</router-link>
          </div>
        </div>

        <!-- Wishlist Tab -->
        <div v-if="activeTab === 'wishlist'" class="tab-pane animate-fade-in">
          <h2 class="text-h2 mb-6">Sản phẩm yêu thích</h2>
          <div class="empty-state">
            <span class="empty-icon">❤️</span>
            <h3 class="text-h3 mt-4 mb-2">Chưa có sản phẩm yêu thích</h3>
            <p class="text-body mb-6">Lưu lại những đôi giày bạn yêu thích để mua sau.</p>
            <router-link to="/shop" class="btn btn-outline">Khám phá sản phẩm</router-link>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const activeTab = ref('profile');

onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push('/login');
  }
});

const userInitials = computed(() => {
  if (!authStore.user?.name) return 'U';
  return authStore.user.name.charAt(0).toUpperCase();
});

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.user-dashboard {
  padding-top: 2rem;
  padding-bottom: 4rem;
}

.dashboard-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 992px) {
  .dashboard-layout {
    grid-template-columns: 280px 1fr;
    gap: 3rem;
  }
}

/* Sidebar */
.dashboard-sidebar {
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: 2rem;
  height: fit-content;
}

.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--color-border);
}

.avatar {
  width: 80px;
  height: 80px;
  background-color: var(--color-primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.user-name {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.user-email {
  font-size: 0.875rem;
  color: var(--color-text-light);
}

.dashboard-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: var(--radius-md);
  font-weight: 500;
  color: var(--color-text);
  transition: all var(--transition-fast);
  text-align: left;
  width: 100%;
}

.nav-item:hover {
  background-color: var(--color-border);
}

.nav-item.active {
  background-color: var(--color-primary);
  color: white;
}

.text-error {
  color: var(--color-error);
}
.text-error:hover {
  background-color: #fee2e2;
}

/* Main Content */
.mb-6 { margin-bottom: 1.5rem; }
.mt-6 { margin-top: 1.5rem; }
.mt-4 { margin-top: 1rem; }
.mb-2 { margin-bottom: 0.5rem; }

.profile-card {
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: 2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr 1fr;
  }
  .full-width {
    grid-column: 1 / -1;
  }
}

.form-label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.input-field:disabled {
  background-color: var(--color-border);
  cursor: not-allowed;
}

.hint-text {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: var(--color-text-light);
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px dashed var(--color-border);
}

.empty-icon {
  font-size: 4rem;
  display: block;
}
</style>

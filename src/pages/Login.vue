<template>
  <div class="auth-page container section-padding">
    <div class="auth-box">
      <h1 class="text-h2 text-center mb-6">Đăng nhập</h1>
      <p class="text-body text-center mb-6">Đăng nhập để trải nghiệm mua sắm tuyệt vời hơn.</p>
      
      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group mb-4">
          <label class="form-label">Email</label>
          <input 
            type="email" 
            v-model="email" 
            class="input-field" 
            placeholder="Nhập email của bạn" 
            required 
          />
          <small class="hint-text">Gợi ý: Dùng admin@kicksspace.com để vào Admin</small>
        </div>
        
        <div class="form-group mb-6">
          <label class="form-label">Mật khẩu</label>
          <input 
            type="password" 
            v-model="password" 
            class="input-field" 
            placeholder="Nhập mật khẩu" 
            required 
          />
        </div>
        
        <button type="submit" class="btn btn-primary w-full login-btn">Đăng nhập</button>
      </form>
      
      <div class="auth-links mt-6 text-center">
        <span class="text-body">Chưa có tài khoản? </span>
        <router-link to="/register" class="text-primary font-medium hover-underline">Đăng ký ngay</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');

const handleLogin = () => {
  if (email.value && password.value) {
    authStore.login(email.value, password.value);
    if (authStore.isAdmin) {
      router.push('/admin');
    } else {
      router.push('/');
    }
  }
};
</script>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px - 300px); /* Adjust based on header/footer */
}

.auth-box {
  width: 100%;
  max-width: 450px;
  background-color: var(--color-surface);
  padding: 3rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.text-center { text-align: center; }
.mb-4 { margin-bottom: 1rem; }
.mb-6 { margin-bottom: 1.5rem; }
.mt-6 { margin-top: 1.5rem; }
.w-full { width: 100%; }

.form-label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.hint-text {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: var(--color-text-light);
}

.login-btn {
  padding: 1rem;
  font-size: 1.125rem;
}

.font-medium { font-weight: 500; }
.hover-underline:hover { text-decoration: underline; }
</style>

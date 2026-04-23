<template>
  <div class="checkout-page container section-padding">
    <div v-if="orderPlaced" class="order-success">
      <div class="success-icon">🎉</div>
      <h1 class="text-h2">Đặt hàng thành công!</h1>
      <p class="text-body mt-4">Cảm ơn bạn đã mua sắm tại KicksSpace.</p>
      <p class="text-body mb-8">Mã đơn hàng của bạn là: <strong>#{{ orderId }}</strong></p>
      <router-link to="/" class="btn btn-primary">Quay về trang chủ</router-link>
    </div>

    <div v-else class="checkout-layout">
      <!-- Checkout Form -->
      <div class="checkout-form">
        <h2 class="text-h2 mb-6">Thông tin giao hàng</h2>
        
        <form @submit.prevent="placeOrder">
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Họ và tên</label>
              <input type="text" class="input-field" required placeholder="Nhập họ và tên" />
            </div>
            
            <div class="form-group">
              <label class="form-label">Số điện thoại</label>
              <input type="tel" class="input-field" required placeholder="Nhập số điện thoại" />
            </div>
            
            <div class="form-group full-width">
              <label class="form-label">Địa chỉ email</label>
              <input type="email" class="input-field" required placeholder="Nhập email" />
            </div>
            
            <div class="form-group full-width">
              <label class="form-label">Địa chỉ giao hàng</label>
              <input type="text" class="input-field" required placeholder="Nhập địa chỉ nhận hàng" />
            </div>
          </div>

          <h3 class="text-h3 mt-8 mb-4">Phương thức thanh toán</h3>
          <div class="payment-methods">
            <label class="payment-method active">
              <input type="radio" name="payment" checked />
              <div class="method-info">
                <span class="method-name">Thanh toán khi nhận hàng (COD)</span>
              </div>
            </label>
          </div>

          <button type="submit" class="btn btn-primary w-full mt-8 submit-btn">
            Xác nhận đặt hàng
          </button>
        </form>
      </div>

      <!-- Order Summary -->
      <div class="order-summary">
        <h3 class="summary-title">Tóm tắt đơn hàng</h3>
        
        <div class="summary-items">
          <div v-for="(item, index) in cartStore.items" :key="index" class="summary-item">
            <div class="item-img">
              <img :src="item.product.images[0]" :alt="item.product.name" />
              <span class="item-qty">{{ item.quantity }}</span>
            </div>
            <div class="item-info">
              <span class="item-name">{{ item.product.name }}</span>
              <span class="item-meta">{{ item.size }} / {{ item.color }}</span>
            </div>
            <div class="item-price">
              {{ formatPrice(item.product.price * item.quantity) }}
            </div>
          </div>
        </div>

        <div class="summary-divider"></div>

        <div class="summary-row">
          <span class="text-body">Tạm tính</span>
          <span class="font-medium">{{ formatPrice(cartStore.cartTotalAmount) }}</span>
        </div>
        <div class="summary-row">
          <span class="text-body">Phí vận chuyển</span>
          <span class="font-medium">Miễn phí</span>
        </div>
        
        <div class="summary-divider"></div>
        
        <div class="summary-row total-row">
          <span>Tổng cộng</span>
          <span>{{ formatPrice(cartStore.cartTotalAmount) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cartStore';

const router = useRouter();
const cartStore = useCartStore();

const orderPlaced = ref(false);
const orderId = ref('');

onMounted(() => {
  if (cartStore.items.length === 0 && !orderPlaced.value) {
    router.push('/cart');
  }
});

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const placeOrder = () => {
  // Simulate API call
  setTimeout(() => {
    orderId.value = Math.random().toString(36).substr(2, 9).toUpperCase();
    orderPlaced.value = true;
    cartStore.clearCart();
    window.scrollTo(0, 0);
  }, 1000);
};
</script>

<style scoped>
.checkout-page {
  padding-top: 2rem;
  padding-bottom: 4rem;
}

.checkout-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

@media (min-width: 1024px) {
  .checkout-layout {
    grid-template-columns: 3fr 2fr;
  }
}

.mb-6 { margin-bottom: 1.5rem; }
.mt-8 { margin-top: 2rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-8 { margin-bottom: 2rem; }

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

.payment-methods {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.payment-method {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.payment-method.active {
  border-color: var(--color-primary);
  background-color: var(--color-surface);
}

.method-name {
  font-weight: 500;
}

.w-full { width: 100%; }
.submit-btn { padding: 1rem; font-size: 1.125rem; }

/* Order Summary */
.order-summary {
  background-color: var(--color-surface);
  padding: 2rem;
  border-radius: var(--radius-lg);
  height: fit-content;
}

.summary-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.summary-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.item-img {
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: var(--radius-md);
  background-color: white;
  border: 1px solid var(--color-border);
  flex-shrink: 0;
}

.item-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-md);
}

.item-qty {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: var(--color-primary);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.item-name {
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

.item-meta {
  font-size: 0.875rem;
  color: var(--color-text-light);
}

.item-price {
  font-weight: 600;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.summary-divider {
  border: 0;
  height: 1px;
  background-color: var(--color-border);
  margin: 1.5rem 0;
}

.font-medium { font-weight: 500; }

.total-row {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-primary);
  margin-bottom: 0;
}

.order-success {
  text-align: center;
  padding: 4rem 0;
  max-width: 600px;
  margin: 0 auto;
}

.success-icon {
  font-size: 5rem;
  margin-bottom: 1.5rem;
}
</style>

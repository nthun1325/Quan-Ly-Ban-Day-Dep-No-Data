<template>
  <div class="cart-page container section-padding">
    <h1 class="text-h2 page-title">Giỏ hàng của bạn</h1>

    <div v-if="cartStore.items.length === 0" class="empty-cart">
      <div class="empty-icon">🛒</div>
      <h3 class="text-h3 mb-2">Giỏ hàng đang trống</h3>
      <p class="text-body mb-4">Hãy thêm một vài sản phẩm để bắt đầu mua sắm.</p>
      <router-link to="/shop" class="btn btn-primary">Tiếp tục mua sắm</router-link>
    </div>

    <div v-else class="cart-layout">
      <!-- Cart Items -->
      <div class="cart-items">
        <div class="cart-header">
          <span>Sản phẩm</span>
          <span>Số lượng</span>
          <span>Tổng cộng</span>
        </div>

        <div v-for="(item, index) in cartStore.items" :key="index" class="cart-item">
          <div class="item-product">
            <button @click="cartStore.removeFromCart(index)" class="remove-btn" aria-label="Xóa sản phẩm">
              &times;
            </button>
            <div class="item-img-wrapper">
              <img :src="item.product.images[0]" :alt="item.product.name" />
            </div>
            <div class="item-info">
              <router-link :to="`/product/${item.product.id}`" class="item-name">{{ item.product.name }}</router-link>
              <div class="item-meta">
                <span>Size: {{ item.size }}</span> | 
                <span>Màu: {{ item.color }}</span>
              </div>
              <div class="item-price">{{ formatPrice(item.product.price) }}</div>
            </div>
          </div>

          <div class="item-quantity">
            <div class="quantity-control">
              <button @click="cartStore.updateQuantity(index, item.quantity - 1)" class="qty-btn" :disabled="item.quantity <= 1">-</button>
              <input type="number" :value="item.quantity" readonly class="qty-input" />
              <button @click="cartStore.updateQuantity(index, item.quantity + 1)" class="qty-btn">+</button>
            </div>
          </div>

          <div class="item-total">
            {{ formatPrice(item.product.price * item.quantity) }}
          </div>
        </div>
      </div>

      <!-- Cart Summary -->
      <div class="cart-summary">
        <h3 class="summary-title">Tóm tắt đơn hàng</h3>
        
        <div class="summary-row">
          <span>Tạm tính</span>
          <span>{{ formatPrice(cartStore.cartTotalAmount) }}</span>
        </div>
        <div class="summary-row">
          <span>Phí vận chuyển</span>
          <span>Miễn phí</span>
        </div>
        
        <hr class="summary-divider" />
        
        <div class="summary-row total-row">
          <span>Tổng cộng</span>
          <span>{{ formatPrice(cartStore.cartTotalAmount) }}</span>
        </div>

        <router-link to="/checkout" class="btn btn-primary w-full mt-4 checkout-btn">
          Tiến hành thanh toán
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cartStore';

const cartStore = useCartStore();

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};
</script>

<style scoped>
.cart-page {
  padding-top: 2rem;
  padding-bottom: 4rem;
}

.page-title {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.empty-cart {
  text-align: center;
  padding: 4rem 0;
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.mb-2 { margin-bottom: 0.5rem; }
.mb-4 { margin-bottom: 1rem; }

.cart-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .cart-layout {
    grid-template-columns: 2fr 1fr;
  }
}

.cart-header {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
  font-weight: 600;
  color: var(--color-text-light);
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .cart-header {
    display: none;
  }
}

.cart-item {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  align-items: center;
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--color-border);
}

@media (max-width: 768px) {
  .cart-item {
    grid-template-columns: 1fr;
    gap: 1rem;
    position: relative;
  }
  
  .item-total {
    text-align: right;
  }
}

.item-product {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.remove-btn {
  font-size: 1.5rem;
  color: var(--color-text-light);
  transition: color var(--transition-fast);
}

.remove-btn:hover {
  color: var(--color-error);
}

.item-img-wrapper {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-md);
  overflow: hidden;
  background-color: var(--color-secondary);
  flex-shrink: 0;
}

.item-img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-name {
  font-weight: 600;
  color: var(--color-primary);
  display: block;
  margin-bottom: 0.25rem;
}

.item-name:hover {
  text-decoration: underline;
}

.item-meta {
  font-size: 0.875rem;
  color: var(--color-text-light);
  margin-bottom: 0.25rem;
}

.item-price {
  font-weight: 600;
}

.quantity-control {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.qty-btn {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  background-color: var(--color-surface);
  transition: background-color var(--transition-fast);
}

.qty-btn:hover:not(:disabled) {
  background-color: var(--color-border);
}

.qty-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.qty-input {
  width: 40px;
  height: 30px;
  text-align: center;
  border: none;
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 600;
}

.qty-input:focus {
  outline: none;
}

.item-total {
  font-weight: 700;
  color: var(--color-primary);
}

/* Summary */
.cart-summary {
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

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.summary-divider {
  border: 0;
  height: 1px;
  background-color: var(--color-border);
  margin: 1.5rem 0;
}

.total-row {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-primary);
  margin-bottom: 0;
}

.w-full { width: 100%; }
.mt-4 { margin-top: 1.5rem; }

.checkout-btn {
  padding: 1rem;
}
</style>

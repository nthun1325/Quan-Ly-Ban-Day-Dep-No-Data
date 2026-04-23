<template>
  <div class="product-detail-page container section-padding" v-if="product">
    <div class="detail-grid">
      <!-- Product Images -->
      <div class="product-gallery">
        <div class="main-image-wrapper">
          <img :src="activeImage" :alt="product.name" class="main-image" />
        </div>
        <div class="thumbnail-list" v-if="product.images.length > 1">
          <button 
            v-for="(img, index) in product.images" 
            :key="index"
            class="thumb-btn"
            :class="{ active: activeImage === img }"
            @click="activeImage = img"
          >
            <img :src="img" :alt="`${product.name} ${index}`" class="thumb-image" />
          </button>
        </div>
      </div>

      <!-- Product Info -->
      <div class="product-info">
        <div class="breadcrumb">
          <router-link to="/">Trang chủ</router-link> / 
          <router-link to="/shop">Cửa hàng</router-link> / 
          <span class="current">{{ product.name }}</span>
        </div>

        <div class="product-header">
          <p class="brand">{{ product.brand }}</p>
          <h1 class="text-h2 title">{{ product.name }}</h1>
          <div class="rating-review">
            <span class="rating">⭐ {{ product.rating }}</span>
            <span class="reviews">({{ product.reviews }} đánh giá)</span>
          </div>
          <p class="price">{{ formatPrice(product.price) }}</p>
        </div>

        <div class="product-description">
          <p class="text-body">{{ product.description }}</p>
        </div>

        <div class="product-options">
          <!-- Size Selection -->
          <div class="option-group">
            <div class="flex justify-between items-center mb-2">
              <h4 class="option-title">Kích thước</h4>
              <a href="#" class="size-guide">Hướng dẫn chọn size</a>
            </div>
            <div class="size-grid">
              <button 
                v-for="size in product.sizes" 
                :key="size"
                class="size-btn"
                :class="{ active: selectedSize === size }"
                @click="selectedSize = size"
              >
                {{ size }}
              </button>
            </div>
            <p v-if="sizeError" class="error-msg">Vui lòng chọn kích thước</p>
          </div>

          <!-- Color Selection -->
          <div class="option-group">
            <h4 class="option-title mb-2">Màu sắc</h4>
            <div class="color-flex">
              <button 
                v-for="color in product.colors" 
                :key="color"
                class="color-btn"
                :class="{ active: selectedColor === color }"
                @click="selectedColor = color"
              >
                {{ color }}
              </button>
            </div>
            <p v-if="colorError" class="error-msg">Vui lòng chọn màu sắc</p>
          </div>

          <!-- Quantity -->
          <div class="option-group">
            <h4 class="option-title mb-2">Số lượng</h4>
            <div class="quantity-control">
              <button @click="decreaseQuantity" class="qty-btn" :disabled="quantity <= 1">-</button>
              <input type="number" v-model="quantity" min="1" class="qty-input" />
              <button @click="increaseQuantity" class="qty-btn">+</button>
            </div>
          </div>
        </div>

        <div class="action-buttons">
          <button @click="handleAddToCart" class="btn btn-primary w-full add-to-cart-btn">
            Thêm vào giỏ hàng
          </button>
          <button class="btn btn-outline wishlist-btn">
            Yêu thích
          </button>
        </div>
        
        <!-- Toast Notification -->
        <div class="toast" :class="{ show: showToast }">
          Đã thêm vào giỏ hàng!
        </div>
      </div>
    </div>
  </div>
  <div v-else class="container section-padding text-center">
    <h2 class="text-h2">Không tìm thấy sản phẩm</h2>
    <router-link to="/shop" class="btn btn-primary mt-4">Quay lại cửa hàng</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '../stores/productStore';
import { useCartStore } from '../stores/cartStore';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const cartStore = useCartStore();

const product = ref(null);
const activeImage = ref('');
const selectedSize = ref(null);
const selectedColor = ref(null);
const quantity = ref(1);

const sizeError = ref(false);
const colorError = ref(false);
const showToast = ref(false);

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const loadProduct = () => {
  const id = route.params.id;
  const p = productStore.getProductById(id);
  if (p) {
    product.value = p;
    activeImage.value = p.images[0];
    selectedSize.value = null;
    selectedColor.value = p.colors[0]; // Auto select first color
    quantity.value = 1;
    sizeError.value = false;
    colorError.value = false;
  }
};

onMounted(() => {
  loadProduct();
});

watch(() => route.params.id, () => {
  loadProduct();
});

const decreaseQuantity = () => {
  if (quantity.value > 1) quantity.value--;
};

const increaseQuantity = () => {
  quantity.value++;
};

const handleAddToCart = () => {
  let hasError = false;
  if (!selectedSize.value) {
    sizeError.value = true;
    hasError = true;
  } else {
    sizeError.value = false;
  }

  if (!selectedColor.value) {
    colorError.value = true;
    hasError = true;
  } else {
    colorError.value = false;
  }

  if (hasError) return;

  cartStore.addToCart(product.value, selectedSize.value, selectedColor.value, quantity.value);
  
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};
</script>

<style scoped>
.product-detail-page {
  padding-top: 2rem;
  padding-bottom: 4rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

@media (min-width: 992px) {
  .detail-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.product-gallery {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.main-image-wrapper {
  background-color: var(--color-secondary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  aspect-ratio: 1 / 1;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity var(--transition-normal);
}

.thumbnail-list {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.thumb-btn {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 2px solid transparent;
  flex-shrink: 0;
  transition: border-color var(--transition-fast);
}

.thumb-btn.active {
  border-color: var(--color-primary);
}

.thumb-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  display: flex;
  flex-direction: column;
}

.breadcrumb {
  font-size: 0.875rem;
  color: var(--color-text-light);
  margin-bottom: 1.5rem;
}

.breadcrumb a:hover {
  color: var(--color-primary);
}

.breadcrumb .current {
  color: var(--color-text);
  font-weight: 500;
}

.brand {
  font-size: 1rem;
  color: var(--color-text-light);
  margin-bottom: 0.5rem;
}

.title {
  margin-bottom: 1rem;
}

.rating-review {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
}

.rating {
  font-weight: 600;
  color: var(--color-accent);
}

.reviews {
  color: var(--color-text-light);
}

.price {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-primary);
  margin-bottom: 2rem;
}

.product-description {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--color-border);
}

.option-group {
  margin-bottom: 1.5rem;
}

.option-title {
  font-weight: 600;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.size-guide {
  font-size: 0.875rem;
  color: var(--color-text-light);
  text-decoration: underline;
}

.size-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
}

.size-btn {
  padding: 0.75rem 0;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-weight: 500;
  transition: all var(--transition-fast);
}

.size-btn:hover {
  border-color: var(--color-primary);
}

.size-btn.active {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.color-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.color-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  transition: all var(--transition-fast);
}

.color-btn.active {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.quantity-control {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.qty-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
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
  width: 50px;
  height: 40px;
  text-align: center;
  border: none;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  -moz-appearance: textfield;
}

.qty-input::-webkit-outer-spin-button,
.qty-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.qty-input:focus {
  outline: none;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.w-full {
  width: 100%;
}

.add-to-cart-btn {
  flex: 1;
}

.wishlist-btn {
  width: 50px;
  padding: 0;
}

.error-msg {
  color: var(--color-error);
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: var(--color-success);
  color: white;
  padding: 1rem 2rem;
  border-radius: var(--radius-md);
  font-weight: 600;
  box-shadow: var(--shadow-lg);
  transform: translateY(100px);
  opacity: 0;
  transition: all var(--transition-normal);
  z-index: 1000;
}

.toast.show {
  transform: translateY(0);
  opacity: 1;
}

.text-center {
  text-align: center;
}

.mt-4 {
  margin-top: 1rem;
}
</style>

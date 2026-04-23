<template>
  <div class="product-card">
    <div class="product-image-container">
      <router-link :to="`/product/${product.id}`">
        <img :src="product.images[0]" :alt="product.name" class="product-image" loading="lazy" />
      </router-link>
      <div v-if="product.isNew" class="badge-new">Mới</div>
      <button class="wishlist-btn" aria-label="Add to wishlist">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>
    </div>
    
    <div class="product-info">
      <div class="product-brand">{{ product.brand }}</div>
      <router-link :to="`/product/${product.id}`" class="product-name">
        <h3>{{ product.name }}</h3>
      </router-link>
      <div class="product-price">{{ formatPrice(product.price) }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
});

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};
</script>

<style scoped>
.product-card {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: transform var(--transition-normal);
  background-color: var(--color-background);
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image-container {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background-color: var(--color-secondary);
  border-radius: var(--radius-md);
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.badge-new {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: var(--color-primary);
  color: white;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: var(--radius-sm);
  text-transform: uppercase;
}

.wishlist-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
  opacity: 0;
  transform: translateY(-10px);
}

.product-card:hover .wishlist-btn {
  opacity: 1;
  transform: translateY(0);
}

.wishlist-btn:hover {
  color: var(--color-error);
}

.product-info {
  padding: 1rem 0;
}

.product-brand {
  font-size: 0.875rem;
  color: var(--color-text-light);
  margin-bottom: 0.25rem;
}

.product-name h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-name:hover h3 {
  color: var(--color-primary-light);
}

.product-price {
  font-weight: 700;
  color: var(--color-primary);
}
</style>

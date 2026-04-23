<template>
  <div class="home">
    <!-- Hero Banner -->
    <section class="hero">
      <div class="container hero-container">
        <div class="hero-content animate-fade-in">
          <h1 class="text-h1">Bước chân phong cách. <br/><span class="text-primary">Tự tin tỏa sáng.</span></h1>
          <p class="text-body hero-desc">
            Khám phá bộ sưu tập giày thể thao và thời trang mới nhất. 
            Thiết kế độc quyền, chất lượng hoàn hảo.
          </p>
          <div class="hero-actions">
            <router-link to="/shop" class="btn btn-primary">Mua sắm ngay</router-link>
            <router-link to="/shop?sort=new" class="btn btn-outline">Xem bộ sưu tập mới</router-link>
          </div>
        </div>
        <div class="hero-image-wrapper">
          <!-- Placeholder banner image -->
          <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Hero Banner" class="hero-img" />
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="categories container section-padding">
      <h2 class="text-h2 section-title">Danh mục nổi bật</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <router-link v-for="cat in productStore.categories" :key="cat" :to="`/shop?category=${cat}`" class="category-card">
          <div class="category-content">
            <h3 class="text-h3">{{ cat }}</h3>
          </div>
        </router-link>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="featured-products container section-padding">
      <div class="flex justify-between items-center section-header">
        <h2 class="text-h2 section-title">Sản phẩm nổi bật</h2>
        <router-link to="/shop" class="view-all-link">Xem tất cả &rarr;</router-link>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <ProductCard v-for="product in productStore.featuredProducts" :key="product.id" :product="product" />
      </div>
    </section>

    <!-- New Arrivals -->
    <section class="new-arrivals container section-padding">
      <div class="flex justify-between items-center section-header">
        <h2 class="text-h2 section-title">Hàng mới về</h2>
        <router-link to="/shop" class="view-all-link">Xem tất cả &rarr;</router-link>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <ProductCard v-for="product in productStore.newProducts" :key="product.id" :product="product" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { useProductStore } from '../stores/productStore';
import ProductCard from '../components/ProductCard.vue';

const productStore = useProductStore();
</script>

<style scoped>
.section-padding {
  padding: 4rem 0;
}

.section-title {
  margin-bottom: 2rem;
  color: var(--color-primary);
}

.section-header {
  margin-bottom: 2rem;
}

.section-header .section-title {
  margin-bottom: 0;
}

.view-all-link {
  font-weight: 600;
  color: var(--color-primary-light);
}

.view-all-link:hover {
  text-decoration: underline;
  color: var(--color-primary);
}

/* Hero Section */
.hero {
  background-color: var(--color-secondary);
  padding: 4rem 0;
  overflow: hidden;
}

.hero-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.hero-content {
  flex: 1;
  max-width: 500px;
}

.hero-desc {
  margin: 1.5rem 0 2rem;
  font-size: 1.125rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
}

.hero-image-wrapper {
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
}

.hero-img {
  max-width: 100%;
  border-radius: var(--radius-lg);
  transform: rotate(-10deg);
  transition: transform var(--transition-normal);
  box-shadow: var(--shadow-xl);
}

.hero-img:hover {
  transform: rotate(0deg) scale(1.05);
}

/* Categories */
.category-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 2rem;
  text-align: center;
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 150px;
}

.category-card:hover {
  background-color: var(--color-primary);
  color: white;
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.category-card:hover .text-h3 {
  color: white;
}

@media (max-width: 768px) {
  .hero-container {
    flex-direction: column;
    text-align: center;
  }
  
  .hero-content {
    max-width: 100%;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-img {
    transform: none;
    margin-top: 2rem;
  }
}
</style>

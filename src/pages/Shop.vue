<template>
  <div class="shop-page container section-padding">
    <div class="shop-header flex justify-between items-center">
      <h1 class="text-h2">Cửa hàng</h1>
      
      <div class="sort-box">
        <select v-model="sortOption" @change="applySort" class="input-field sort-select">
          <option value="default">Mặc định</option>
          <option value="price-asc">Giá: Thấp đến Cao</option>
          <option value="price-desc">Giá: Cao xuống Thấp</option>
        </select>
      </div>
    </div>

    <div class="shop-layout">
      <!-- Sidebar Filters -->
      <aside class="shop-sidebar">
        <div class="filter-group">
          <h3 class="filter-title">Danh mục</h3>
          <ul class="filter-list">
            <li>
              <button 
                class="filter-btn" 
                :class="{ active: productStore.selectedCategory === '' }"
                @click="setCategory('')"
              >
                Tất cả
              </button>
            </li>
            <li v-for="cat in productStore.categories" :key="cat">
              <button 
                class="filter-btn" 
                :class="{ active: productStore.selectedCategory === cat }"
                @click="setCategory(cat)"
              >
                {{ cat }}
              </button>
            </li>
          </ul>
        </div>

        <div class="filter-group">
          <h3 class="filter-title">Thương hiệu</h3>
          <ul class="filter-list">
            <li>
              <button 
                class="filter-btn" 
                :class="{ active: productStore.selectedBrand === '' }"
                @click="setBrand('')"
              >
                Tất cả
              </button>
            </li>
            <li v-for="brand in productStore.brands" :key="brand">
              <button 
                class="filter-btn" 
                :class="{ active: productStore.selectedBrand === brand }"
                @click="setBrand(brand)"
              >
                {{ brand }}
              </button>
            </li>
          </ul>
        </div>

        <button @click="productStore.clearFilters" class="btn btn-outline w-full mt-4">Xóa bộ lọc</button>
      </aside>

      <!-- Product Grid -->
      <main class="shop-main">
        <div v-if="productStore.filteredProducts.length === 0" class="empty-state">
          <p class="text-body">Không tìm thấy sản phẩm nào phù hợp với bộ lọc.</p>
          <button @click="productStore.clearFilters" class="btn btn-primary mt-4">Xóa bộ lọc</button>
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard v-for="product in productStore.filteredProducts" :key="product.id" :product="product" />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '../stores/productStore';
import ProductCard from '../components/ProductCard.vue';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();

const sortOption = ref('default');

const applySort = () => {
  productStore.setFilter({ sort: sortOption.value });
};

const setCategory = (cat) => {
  productStore.setFilter({ category: cat });
  updateQuery();
};

const setBrand = (brand) => {
  productStore.setFilter({ brand: brand });
  updateQuery();
};

const updateQuery = () => {
  const query = {};
  if (productStore.selectedCategory) query.category = productStore.selectedCategory;
  if (productStore.selectedBrand) query.brand = productStore.selectedBrand;
  router.push({ query });
};

onMounted(() => {
  // Sync from URL query
  if (route.query.category) {
    productStore.setFilter({ category: route.query.category });
  }
  if (route.query.brand) {
    productStore.setFilter({ brand: route.query.brand });
  }
  if (route.query.search) {
    productStore.setFilter({ search: route.query.search });
  }
  sortOption.value = productStore.sortOption;
});

watch(() => route.query, (newQuery) => {
  if (!newQuery.category && !newQuery.brand && !newQuery.search) {
    productStore.clearFilters();
  }
});
</script>

<style scoped>
.shop-page {
  padding-top: 2rem;
  padding-bottom: 4rem;
}

.shop-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.sort-select {
  width: auto;
  min-width: 200px;
}

.shop-layout {
  display: flex;
  gap: 2rem;
}

.shop-sidebar {
  width: 250px;
  flex-shrink: 0;
}

.shop-main {
  flex: 1;
}

.filter-group {
  margin-bottom: 2rem;
}

.filter-title {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--color-primary);
}

.filter-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-btn {
  text-align: left;
  padding: 0.5rem;
  width: 100%;
  color: var(--color-text-light);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.filter-btn:hover {
  background-color: var(--color-surface);
  color: var(--color-primary);
}

.filter-btn.active {
  font-weight: 600;
  color: var(--color-primary);
  background-color: var(--color-secondary);
}

.empty-state {
  text-align: center;
  padding: 4rem 0;
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
}

.w-full { width: 100%; }
.mt-4 { margin-top: 1rem; }

@media (max-width: 768px) {
  .shop-layout {
    flex-direction: column;
  }
  
  .shop-sidebar {
    width: 100%;
  }
}
</style>

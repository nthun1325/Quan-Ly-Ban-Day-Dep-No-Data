import { defineStore } from 'pinia';
import { mockProducts, categories, brands } from '../data/products';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: mockProducts,
    categories: categories,
    brands: brands,
    searchQuery: '',
    selectedCategory: '',
    selectedBrand: '',
    sortOption: 'default' // 'default', 'price-asc', 'price-desc'
  }),
  getters: {
    filteredProducts: (state) => {
      let result = state.products;

      // Filter by search
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        result = result.filter(p => p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query));
      }

      // Filter by category
      if (state.selectedCategory) {
        result = result.filter(p => p.category === state.selectedCategory);
      }

      // Filter by brand
      if (state.selectedBrand) {
        result = result.filter(p => p.brand === state.selectedBrand);
      }

      // Sort
      if (state.sortOption === 'price-asc') {
        result = [...result].sort((a, b) => a.price - b.price);
      } else if (state.sortOption === 'price-desc') {
        result = [...result].sort((a, b) => b.price - a.price);
      }

      return result;
    },
    featuredProducts: (state) => {
      return state.products.filter(p => p.isFeatured);
    },
    newProducts: (state) => {
      return state.products.filter(p => p.isNew);
    },
    getProductById: (state) => {
      return (id) => state.products.find(p => p.id === id);
    }
  },
  actions: {
    setFilter({ category, brand, search, sort }) {
      if (category !== undefined) this.selectedCategory = category;
      if (brand !== undefined) this.selectedBrand = brand;
      if (search !== undefined) this.searchQuery = search;
      if (sort !== undefined) this.sortOption = sort;
    },
    clearFilters() {
      this.selectedCategory = '';
      this.selectedBrand = '';
      this.searchQuery = '';
      this.sortOption = 'default';
    }
  }
});

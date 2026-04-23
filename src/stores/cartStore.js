import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [], // { product, size, color, quantity }
  }),
  getters: {
    cartTotalAmount: (state) => {
      return state.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    },
    cartTotalItems: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    }
  },
  actions: {
    addToCart(product, size, color, quantity = 1) {
      const existingItem = this.items.find(
        (item) => item.product.id === product.id && item.size === size && item.color === color
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({ product, size, color, quantity });
      }
    },
    removeFromCart(index) {
      this.items.splice(index, 1);
    },
    updateQuantity(index, quantity) {
      if (quantity > 0) {
        this.items[index].quantity = quantity;
      }
    },
    clearCart() {
      this.items = [];
    }
  }
});

import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null, // { email, name, role }
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    isAdmin: (state) => state.user?.role === 'admin'
  },
  actions: {
    login(email, password) {
      // Mock login
      if (email === 'admin@gmail.com') {
        this.user = { email, name: 'Administrator', role: 'admin' };
      } else {
        this.user = { email, name: email.split('@')[0], role: 'user' };
      }
      return true;
    },
    register(name, email, password) {
      // Mock register
      this.user = { email, name, role: 'user' };
      return true;
    },
    logout() {
      this.user = null;
    }
  }
});

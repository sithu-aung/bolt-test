import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    async login(email: string, password: string) {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      // Simulate successful login
      this.user = { email }
      this.token = 'fake-jwt-token'
      localStorage.setItem('token', this.token)
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    },
    async checkAuth() {
      const token = localStorage.getItem('token')
      if (token) {
        // Simulate API call to validate token
        await new Promise(resolve => setTimeout(resolve, 500))
        this.user = { email: 'user@example.com' }
        this.token = token
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
})
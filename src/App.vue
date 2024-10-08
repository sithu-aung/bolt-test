<template>
  <div id="app" class="min-h-screen bg-gray-100">
    <header v-if="authStore.isAuthenticated" class="bg-white shadow">
      <nav class="container mx-auto px-6 py-3">
        <ul class="flex space-x-4">
          <li><router-link to="/" class="text-gray-800 hover:text-blue-500">Dashboard</router-link></li>
          <li><router-link to="/customers" class="text-gray-800 hover:text-blue-500">Customers</router-link></li>
          <li><router-link to="/contacts" class="text-gray-800 hover:text-blue-500">Contacts</router-link></li>
          <li><router-link to="/deals" class="text-gray-800 hover:text-blue-500">Deals</router-link></li>
          <li><button @click="logout" class="text-gray-800 hover:text-blue-500">Logout</button></li>
        </ul>
      </nav>
    </header>
    <main class="container mx-auto px-6 py-8">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'

const router = useRouter()
const authStore = useAuthStore()

onMounted(() => {
  authStore.checkAuth()
})

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
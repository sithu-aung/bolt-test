<template>
  <div class="login min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="email" class="block mb-1">Email</label>
          <input id="email" v-model="email" type="email" required class="input w-full" />
        </div>
        <div>
          <label for="password" class="block mb-1">Password</label>
          <input id="password" v-model="password" type="password" required class="input w-full" />
        </div>
        <button type="submit" class="btn w-full">Login</button>
      </form>
      <p v-if="error" class="mt-4 text-red-500">{{ error }}</p>
      <p class="mt-4 text-sm text-gray-600">
        For testing, use any email and password combination.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')

const handleSubmit = async () => {
  try {
    await authStore.login(email.value, password.value)
    router.push('/')
  } catch (err) {
    error.value = 'Invalid email or password'
  }
}
</script>
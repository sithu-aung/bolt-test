<template>
  <div class="customer-edit p-6">
    <h1 class="text-3xl font-bold mb-6">Edit Customer</h1>
    <CustomerForm v-if="customer" :customer="customer" @submit="handleSubmit" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCrmStore } from '../stores/crm'
import CustomerForm from '../components/CustomerForm.vue'

const route = useRoute()
const router = useRouter()
const crmStore = useCrmStore()

const customer = computed(() => {
  return crmStore.customers.find(c => c.id === parseInt(route.params.id as string))
})

const handleSubmit = () => {
  router.push({ name: 'Customers' })
}
</script>
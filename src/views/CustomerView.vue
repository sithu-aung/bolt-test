<template>
  <div v-if="customer" class="customer-view p-6">
    <h1 class="text-3xl font-bold mb-6">{{ customer.name }}</h1>
    <div class="bg-white rounded-lg shadow p-6">
      <p><strong>Company:</strong> {{ customer.company }}</p>
      <p><strong>Email:</strong> {{ customer.email }}</p>
      <p><strong>Phone:</strong> {{ customer.phone }}</p>
    </div>
    <h2 class="text-2xl font-bold mt-8 mb-4">Related Deals</h2>
    <table class="w-full bg-white rounded-lg shadow">
      <thead>
        <tr>
          <th class="p-3 text-left">Title</th>
          <th class="p-3 text-left">Value</th>
          <th class="p-3 text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="deal in relatedDeals" :key="deal.id" class="border-t">
          <td class="p-3">{{ deal.title }}</td>
          <td class="p-3">${{ deal.value }}</td>
          <td class="p-3">{{ deal.status }}</td>
        </tr>
      </tbody>
    </table>
    <button @click="editCustomer" class="btn mt-4">Edit Customer</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCrmStore } from '../stores/crm'

const route = useRoute()
const router = useRouter()
const crmStore = useCrmStore()

const customer = computed(() => {
  return crmStore.customers.find(c => c.id === parseInt(route.params.id as string))
})

const relatedDeals = computed(() => {
  return crmStore.deals.filter(deal => deal.customerId === customer.value?.id)
})

onMounted(async () => {
  await Promise.all([
    crmStore.fetchCustomers(),
    crmStore.fetchDeals(),
  ])
})

const editCustomer = () => {
  router.push({ name: 'CustomerEdit', params: { id: customer.value.id } })
}
</script>
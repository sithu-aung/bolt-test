<template>
  <div class="deals p-6">
    <h1 class="text-3xl font-bold mb-6">Deals</h1>
    <div class="mb-4">
      <input v-model="search" placeholder="Search deals..." class="input w-full max-w-xs" />
    </div>
    <table class="w-full bg-white rounded-lg shadow">
      <thead>
        <tr>
          <th class="p-3 text-left">Title</th>
          <th class="p-3 text-left">Value</th>
          <th class="p-3 text-left">Status</th>
          <th class="p-3 text-left">Customer</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="deal in filteredDeals" :key="deal.id" class="border-t">
          <td class="p-3">{{ deal.title }}</td>
          <td class="p-3">${{ deal.value.toLocaleString() }}</td>
          <td class="p-3">{{ deal.status }}</td>
          <td class="p-3">{{ getCustomerName(deal.customerId) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCrmStore } from '../stores/crm'

const crmStore = useCrmStore()
const search = ref('')

onMounted(() => {
  crmStore.fetchDeals()
  crmStore.fetchCustomers()
})

const filteredDeals = computed(() => {
  return crmStore.deals.filter(deal =>
    deal.title.toLowerCase().includes(search.value.toLowerCase()) ||
    getCustomerName(deal.customerId).toLowerCase().includes(search.value.toLowerCase())
  )
})

const getCustomerName = (customerId: number) => {
  const customer = crmStore.customers.find(c => c.id === customerId)
  return customer ? customer.name : 'Unknown'
}
</script>
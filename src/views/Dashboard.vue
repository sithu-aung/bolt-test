<template>
  <div class="dashboard p-6">
    <h1 class="text-3xl font-bold mb-6">Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-xl font-semibold mb-2">Total Customers</h3>
        <p class="text-4xl font-bold">{{ totalCustomers }}</p>
      </div>
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-xl font-semibold mb-2">Total Contacts</h3>
        <p class="text-4xl font-bold">{{ totalContacts }}</p>
      </div>
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-xl font-semibold mb-2">Open Deals</h3>
        <p class="text-4xl font-bold">{{ openDeals }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useCrmStore } from '../stores/crm'

const crmStore = useCrmStore()

onMounted(async () => {
  await Promise.all([
    crmStore.fetchCustomers(),
    crmStore.fetchContacts(),
    crmStore.fetchDeals(),
  ])
})

const totalCustomers = computed(() => crmStore.totalCustomers)
const totalContacts = computed(() => crmStore.totalContacts)
const openDeals = computed(() => crmStore.openDeals)
</script>
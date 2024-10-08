<template>
  <div class="customers p-6">
    <h1 class="text-3xl font-bold mb-6">Customers</h1>
    <div class="mb-4">
      <input v-model="search" placeholder="Search customers..." class="input w-full max-w-xs" />
    </div>
    <table class="w-full bg-white rounded-lg shadow">
      <thead>
        <tr>
          <th class="p-3 text-left">Name</th>
          <th class="p-3 text-left">Company</th>
          <th class="p-3 text-left">Email</th>
          <th class="p-3 text-left">Phone</th>
          <th class="p-3 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in filteredCustomers" :key="customer.id" class="border-t">
          <td class="p-3">{{ customer.name }}</td>
          <td class="p-3">{{ customer.company }}</td>
          <td class="p-3">{{ customer.email }}</td>
          <td class="p-3">{{ customer.phone }}</td>
          <td class="p-3">
            <button @click="editCustomer(customer)" class="btn bg-yellow-500 hover:bg-yellow-600 mr-2">Edit</button>
            <button @click="viewCustomer(customer)" class="btn bg-blue-500 hover:bg-blue-600">View</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="showAddForm = true" class="btn mt-4">Add Customer</button>

    <div v-if="showAddForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 class="text-2xl font-bold mb-4">Add Customer</h2>
        <CustomerForm @submit="handleFormSubmit" />
        <button @click="showAddForm = false" class="btn bg-gray-500 hover:bg-gray-600 mt-4">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCrmStore } from '../stores/crm'
import CustomerForm from '../components/CustomerForm.vue'

const router = useRouter()
const crmStore = useCrmStore()

const search = ref('')
const showAddForm = ref(false)

onMounted(() => {
  crmStore.fetchCustomers()
})

const filteredCustomers = computed(() => {
  return crmStore.customers.filter(customer =>
    customer.name.toLowerCase().includes(search.value.toLowerCase()) ||
    customer.company.toLowerCase().includes(search.value.toLowerCase()) ||
    customer.email.toLowerCase().includes(search.value.toLowerCase())
  )
})

const editCustomer = (customer) => {
  router.push({ name: 'CustomerEdit', params: { id: customer.id } })
}

const viewCustomer = (customer) => {
  router.push({ name: 'CustomerView', params: { id: customer.id } })
}

const handleFormSubmit = () => {
  showAddForm.value = false
  crmStore.fetchCustomers()
}
</script>
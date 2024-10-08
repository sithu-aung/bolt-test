<template>
  <div class="contacts p-6">
    <h1 class="text-3xl font-bold mb-6">Contacts</h1>
    <div class="mb-4">
      <input v-model="search" placeholder="Search contacts..." class="input w-full max-w-xs" />
    </div>
    <table class="w-full bg-white rounded-lg shadow">
      <thead>
        <tr>
          <th class="p-3 text-left">Name</th>
          <th class="p-3 text-left">Email</th>
          <th class="p-3 text-left">Phone</th>
          <th class="p-3 text-left">Company</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in filteredContacts" :key="contact.id" class="border-t">
          <td class="p-3">{{ contact.name }}</td>
          <td class="p-3">{{ contact.email }}</td>
          <td class="p-3">{{ contact.phone }}</td>
          <td class="p-3">{{ contact.company }}</td>
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
  crmStore.fetchContacts()
})

const filteredContacts = computed(() => {
  return crmStore.contacts.filter(contact =>
    contact.name.toLowerCase().includes(search.value.toLowerCase()) ||
    contact.email.toLowerCase().includes(search.value.toLowerCase()) ||
    contact.company.toLowerCase().includes(search.value.toLowerCase())
  )
})
</script>
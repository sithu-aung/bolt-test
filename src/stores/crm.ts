import { defineStore } from 'pinia'

export const useCrmStore = defineStore('crm', {
  state: () => ({
    customers: [
      { id: 1, name: 'Acme Corp', company: 'Acme Corporation', email: 'info@acme.com', phone: '123-456-7890' },
      { id: 2, name: 'Globex', company: 'Globex Corporation', email: 'contact@globex.com', phone: '987-654-3210' },
      { id: 3, name: 'Initech', company: 'Initech Industries', email: 'support@initech.com', phone: '456-789-0123' },
    ],
    contacts: [
      { id: 1, name: 'John Doe', email: 'john@acme.com', phone: '111-222-3333', company: 'Acme Corporation' },
      { id: 2, name: 'Jane Smith', email: 'jane@globex.com', phone: '444-555-6666', company: 'Globex Corporation' },
      { id: 3, name: 'Bob Johnson', email: 'bob@initech.com', phone: '777-888-9999', company: 'Initech Industries' },
    ],
    deals: [
      { id: 1, title: 'Software License', value: 50000, status: 'open', customerId: 1 },
      { id: 2, title: 'Consulting Contract', value: 25000, status: 'closed', customerId: 2 },
      { id: 3, title: 'Hardware Upgrade', value: 75000, status: 'open', customerId: 3 },
    ],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchCustomers() {
      // Simulate API call
      this.loading = true
      await new Promise(resolve => setTimeout(resolve, 500))
      this.loading = false
      // Data is already in state, no need to update
    },
    async fetchContacts() {
      // Simulate API call
      this.loading = true
      await new Promise(resolve => setTimeout(resolve, 500))
      this.loading = false
      // Data is already in state, no need to update
    },
    async fetchDeals() {
      // Simulate API call
      this.loading = true
      await new Promise(resolve => setTimeout(resolve, 500))
      this.loading = false
      // Data is already in state, no need to update
    },
    // ... (keep other actions as they are)
  },
  getters: {
    totalCustomers: (state) => state.customers.length,
    totalContacts: (state) => state.contacts.length,
    openDeals: (state) => state.deals.filter(deal => deal.status === 'open').length,
  },
})
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Dashboard from '../views/Dashboard.vue'
import Customers from '../views/Customers.vue'
import CustomerView from '../views/CustomerView.vue'
import CustomerEdit from '../views/CustomerEdit.vue'
import Contacts from '../views/Contacts.vue'
import Deals from '../views/Deals.vue'
import Login from '../views/Login.vue'

const routes = [
  { path: '/', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/customers', component: Customers, meta: { requiresAuth: true } },
  { path: '/customers/:id', component: CustomerView, name: 'CustomerView', meta: { requiresAuth: true } },
  { path: '/customers/:id/edit', component: CustomerEdit, name: 'CustomerEdit', meta: { requiresAuth: true } },
  { path: '/contacts', component: Contacts, meta: { requiresAuth: true } },
  { path: '/deals', component: Deals, meta: { requiresAuth: true } },
  { path: '/login', component: Login },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
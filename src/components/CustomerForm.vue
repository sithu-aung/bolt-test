<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label for="name" class="block mb-1">Name</label>
      <input id="name" v-model="form.name" required class="input w-full" />
    </div>
    <div>
      <label for="company" class="block mb-1">Company</label>
      <input id="company" v-model="form.company" required class="input w-full" />
    </div>
    <div>
      <label for="email" class="block mb-1">Email</label>
      <input id="email" v-model="form.email" type="email" required class="input w-full" />
    </div>
    <div>
      <label for="phone" class="block mb-1">Phone</label>
      <input id="phone" v-model="form.phone" class="input w-full" />
    </div>
    <button type="submit" class="btn">{{ customer ? 'Update' : 'Add' }} Customer</button>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCrmStore } from '../stores/crm'

const props = defineProps({
  customer: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['submit'])

const form = ref({
  name: '',
  company: '',
  email: '',
  phone: '',
})

const crmStore = useCrmStore()

onMounted(() => {
  if (props.customer) {
    form.value = { ...props.customer }
  }
})

const handleSubmit = async () => {
  if (props.customer) {
    await crmStore.updateCustomer({ ...props.customer, ...form.value })
  } else {
    await crmStore.addCustomer(form.value)
  }
  emit('submit')
}
</script>
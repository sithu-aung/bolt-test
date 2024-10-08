<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label for="title" class="block mb-1">Title</label>
      <input id="title" v-model="form.title" required class="input w-full" />
    </div>
    <div>
      <label for="value" class="block mb-1">Value</label>
      <input id="value" v-model="form.value" type="number" required class="input w-full" />
    </div>
    <div>
      <label for="status" class="block mb-1">Status</label>
      <select id="status" v-model="form.status" required class="input w-full">
        <option value="open">Open</option>
        <option value="closed">Closed</option>
        <option value="lost">Lost</option>
      </select>
    </div>
    <div>
      <label for="customer" class="block mb-1">Customer</label>
      <select id="customer" v-model="form.customerId" required class="input w-full">
        <option v-for="customer in crmStore.customers" :key="customer.id" :value="customer.id">
          {{ customer.name }}
        </option>
      </select>
    </div>
    <button type="submit" class="btn">{{ deal ? 'Update' : 'Add' }} Deal</button>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCrmStore } from '../stores/crm'

const props = defineProps({
  deal: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['submit'])

const form = ref({
  title: '',
  value: 0,
  status: 'open',
  customerId: null,
})

const crmStore = useCrmStore()

onMounted(() => {
  if (props.deal) {
    form.value = { ...props.deal }
  }
})

const handleSubmit = async () => {
  if (props.deal) {
    await crmStore.updateDeal({ ...props.deal, ...form.value })
  } else {
    await crmStore.addDeal(form.value)
  }
  emit('submit')
}
</script>
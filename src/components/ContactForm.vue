<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label for="name" class="block mb-1">Name</label>
      <input id="name" v-model="form.name" required class="input w-full" />
    </div>
    <div>
      <label for="email" class="block mb-1">Email</label>
      <input id="email" v-model="form.email" type="email" required class="input w-full" />
    </div>
    <div>
      <label for="phone" class="block mb-1">Phone</label>
      <input id="phone" v-model="form.phone" class="input w-full" />
    </div>
    <div>
      <label for="company" class="block mb-1">Company</label>
      <input id="company" v-model="form.company" class="input w-full" />
    </div>
    <button type="submit" class="btn">{{ contact ? 'Update' : 'Add' }} Contact</button>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCrmStore } from '../stores/crm'

const props = defineProps({
  contact: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['submit'])

const form = ref({
  name: '',
  email: '',
  phone: '',
  company: '',
})

const crmStore = useCrmStore()

onMounted(() => {
  if (props.contact) {
    form.value = { ...props.contact }
  }
})

const handleSubmit = async () => {
  if (props.contact) {
    await crmStore.updateContact({ ...props.contact, ...form.value })
  } else {
    await crmStore.addContact(form.value)
  }
  emit('submit')
}
</script>
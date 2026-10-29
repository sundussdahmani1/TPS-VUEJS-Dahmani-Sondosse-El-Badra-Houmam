<template>
  <div v-if="open" class="modal-backdrop" @click.self="$emit('cancel')">
    <div class="modal" role="dialog" aria-modal="true">
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
      <div class="modal-actions">
        <button class="btn btn-ghost" @click="$emit('cancel')">Annuler</button>
        <button class="btn btn-danger" :disabled="busy" @click="$emit('confirm')">
          {{ busy ? 'Suppression…' : 'Oui, supprimer' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmModal',
  props: {
    open: { type: Boolean, default: false },
    title: { type: String, default: 'Confirmation' },
    message: { type: String, default: '' },
    busy: { type: Boolean, default: false }
  },
  emits: ['confirm', 'cancel']
}
</script>

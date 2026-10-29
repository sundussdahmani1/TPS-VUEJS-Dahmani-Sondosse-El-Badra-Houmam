<template>
  <form class="job-form" @submit.prevent="submit">
    <div class="field full">
      <label for="title">Titre du poste *</label>
      <input id="title" type="text" v-model.trim="form.title" placeholder="Ex : Développeur Vue.js" />
    </div>

    <div class="field">
      <label for="company">Entreprise</label>
      <input id="company" type="text" v-model.trim="form.company" placeholder="Nom de l'entreprise" />
    </div>

    <div class="field">
      <label for="location">Ville</label>
      <input id="location" type="text" v-model.trim="form.location" placeholder="Ex : Safi" />
    </div>

    <div class="field">
      <label for="contract">Type de contrat</label>
      <select id="contract" v-model="form.contract">
        <option v-for="c in contracts" :key="c" :value="c">{{ c }}</option>
      </select>
    </div>

    <div class="field">
      <label for="salary">Salaire mensuel (MAD) *</label>
      <input id="salary" type="number" min="0" step="100" v-model.number="form.salary" />
    </div>

    <div class="field">
      <label for="experience">Années d'expérience *</label>
      <input id="experience" type="number" min="0" max="40" v-model.number="form.experience" />
    </div>

    <div class="field">
      <label for="createdAt">Date de création</label>
      <input id="createdAt" type="date" v-model="form.createdAt" />
    </div>

    <div class="field full">
      <label for="description">Description *</label>
      <textarea id="description" rows="6" v-model.trim="form.description" placeholder="Missions, profil recherché, avantages…"></textarea>
    </div>

    <ul class="errors full" v-if="touched && errors.length">
      <li v-for="e in errors" :key="e">{{ e }}</li>
    </ul>

    <div class="form-actions full">
      <button type="button" class="btn btn-ghost" @click="$emit('cancel')">Annuler</button>
      <button type="submit" class="btn btn-primary" :disabled="busy">
        {{ busy ? 'Enregistrement…' : submitLabel }}
      </button>
    </div>
  </form>
</template>

<script>
import { CONTRACTS } from '../constants.js'

function emptyJob() {
  return {
    title: '',
    company: '',
    location: '',
    contract: 'CDI',
    salary: 0,
    experience: 0,
    createdAt: new Date().toISOString().slice(0, 10),
    description: ''
  }
}

export default {
  name: 'JobForm',
  props: {
    initial: { type: Object, default: null },
    submitLabel: { type: String, default: 'Enregistrer' },
    busy: { type: Boolean, default: false }
  },
  emits: ['submit', 'cancel'],
  data() {
    return {
      contracts: CONTRACTS,
      form: { ...emptyJob(), ...(this.initial || {}) },
      touched: false
    }
  },
  computed: {
    errors() {
      const list = []
      if (!this.form.title) list.push('Le titre est obligatoire.')
      if (!this.form.description) list.push('La description est obligatoire.')
      if (typeof this.form.salary !== 'number' || this.form.salary < 0) {
        list.push('Le salaire doit être un nombre positif.')
      }
      if (typeof this.form.experience !== 'number' || this.form.experience < 0) {
        list.push("Les années d'expérience doivent être un nombre positif.")
      }
      return list
    }
  },
  methods: {
    submit() {
      this.touched = true
      if (this.errors.length) return
      this.$emit('submit', { ...this.form })
    }
  }
}
</script>

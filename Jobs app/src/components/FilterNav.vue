<template>
  <section class="filter-nav">
    <div class="field grow">
      <label for="search">Recherche</label>
      <input
        id="search"
        type="text"
        placeholder="Titre, entreprise ou ville…"
        :value="modelValue.search"
        @input="update('search', $event.target.value)"
      />
    </div>

    <div class="field">
      <label for="contract">Contrat</label>
      <select id="contract" :value="modelValue.contract" @change="update('contract', $event.target.value)">
        <option value="">Tous</option>
        <option v-for="c in contracts" :key="c" :value="c">{{ c }}</option>
      </select>
    </div>

    <div class="field">
      <label for="maxExp">Expérience max.</label>
      <select id="maxExp" :value="modelValue.maxExperience" @change="update('maxExperience', $event.target.value)">
        <option value="">Peu importe</option>
        <option v-for="n in [0, 1, 2, 3, 5]" :key="n" :value="String(n)">
          {{ n === 0 ? 'Débutant' : `≤ ${n} an${n > 1 ? 's' : ''}` }}
        </option>
      </select>
    </div>

    <div class="field">
      <label for="sort">Trier par</label>
      <select id="sort" :value="modelValue.sort" @change="update('sort', $event.target.value)">
        <option v-for="o in sortOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
      </select>
    </div>

    <button type="button" class="btn btn-ghost" @click="$emit('reset')">Réinitialiser</button>
  </section>
</template>

<script>
import { CONTRACTS, SORT_OPTIONS } from '../constants.js'

export default {
  name: 'FilterNav',
  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },
  emits: ['update:modelValue', 'reset'],
  data() {
    return {
      contracts: CONTRACTS,
      sortOptions: SORT_OPTIONS
    }
  },
  methods: {
    update(key, value) {
      this.$emit('update:modelValue', { ...this.modelValue, [key]: value })
    }
  }
}
</script>

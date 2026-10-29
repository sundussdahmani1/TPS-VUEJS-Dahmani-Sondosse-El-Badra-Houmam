<template>
  <section class="page-head">
    <div>
      <h1>Publier une offre</h1>
      <p class="muted">Renseignez les informations du nouvel emploi.</p>
    </div>
  </section>

  <p class="state error" v-if="error">{{ error }}</p>

  <JobForm
    submit-label="Publier l'offre"
    :busy="saving"
    @submit="save"
    @cancel="$router.push({ name: 'home' })"
  />
</template>

<script>
import JobForm from '../components/JobForm.vue'
import { createJob } from '../api.js'

export default {
  name: 'AddJob',
  components: { JobForm },
  data() {
    return { saving: false, error: '' }
  },
  methods: {
    async save(job) {
      this.saving = true
      this.error = ''
      try {
        const created = await createJob(job)
        this.$router.push({ name: 'job-detail', params: { id: created.id } })
      } catch (err) {
        this.error = "L'offre n'a pas pu être enregistrée."
      } finally {
        this.saving = false
      }
    }
  }
}
</script>

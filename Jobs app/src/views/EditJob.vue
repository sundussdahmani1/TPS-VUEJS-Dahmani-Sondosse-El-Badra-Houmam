<template>
  <section class="page-head">
    <div>
      <h1>Modifier l'offre</h1>
      <p class="muted">Les champs sont pré-remplis avec les valeurs actuelles.</p>
    </div>
  </section>

  <p class="state" v-if="loading">Chargement…</p>
  <p class="state error" v-else-if="error">{{ error }}</p>

  <JobForm
    v-if="job"
    :initial="job"
    submit-label="Enregistrer les modifications"
    :busy="saving"
    @submit="save"
    @cancel="back"
  />
</template>

<script>
import JobForm from '../components/JobForm.vue'
import { getJob, updateJob } from '../api.js'

export default {
  name: 'EditJob',
  components: { JobForm },
  data() {
    return { job: null, loading: true, saving: false, error: '' }
  },
  async mounted() {
    try {
      this.job = await getJob(this.$route.params.id)
    } catch (err) {
      this.error = 'Offre introuvable.'
    } finally {
      this.loading = false
    }
  },
  methods: {
    async save(data) {
      this.saving = true
      this.error = ''
      try {
        await updateJob(this.$route.params.id, data)
        this.$router.push({ name: 'job-detail', params: { id: this.$route.params.id } })
      } catch (err) {
        this.error = "Les modifications n'ont pas pu être enregistrées."
      } finally {
        this.saving = false
      }
    },
    back() {
      this.$router.push({ name: 'job-detail', params: { id: this.$route.params.id } })
    }
  }
}
</script>

<template>
  <p class="state" v-if="loading">Chargement…</p>

  <div class="state error" v-else-if="error">
    <p>{{ error }}</p>
    <router-link to="/" class="btn btn-ghost">Retour aux offres</router-link>
  </div>

  <article class="detail" v-else-if="job">
    <router-link to="/" class="back-link">← Retour aux offres</router-link>

    <header class="detail-head">
      <div>
        <span class="tag" :class="`tag-${job.contract.toLowerCase()}`">{{ job.contract }}</span>
        <h1>{{ job.title }}</h1>
        <p class="company">{{ job.company }} · {{ job.location }}</p>
      </div>
      <div class="detail-actions">
        <router-link :to="{ name: 'edit-job', params: { id: job.id } }" class="btn btn-primary">✏️ Modifier</router-link>
        <button class="btn btn-danger-soft" @click="confirmOpen = true">🗑 Supprimer</button>
      </div>
    </header>

    <dl class="facts">
      <div>
        <dt>Salaire</dt>
        <dd>{{ formatSalary(job.salary) }}</dd>
      </div>
      <div>
        <dt>Expérience</dt>
        <dd>{{ formatExperience(job.experience) }}</dd>
      </div>
      <div>
        <dt>Date de création</dt>
        <dd>{{ formatDate(job.createdAt) }}</dd>
      </div>
    </dl>

    <section class="description">
      <h2>Description du poste</h2>
      <p>{{ job.description }}</p>
    </section>

    <ConfirmModal
      :open="confirmOpen"
      title="Supprimer cette offre ?"
      :message="`« ${job.title} » sera définitivement supprimée. Cette action est irréversible.`"
      :busy="deleting"
      @confirm="remove"
      @cancel="confirmOpen = false"
    />
  </article>
</template>

<script>
import ConfirmModal from '../components/ConfirmModal.vue'
import { getJob, deleteJob } from '../api.js'
import { formatSalary, formatDate, formatExperience } from '../constants.js'

export default {
  name: 'JobDetail',
  components: { ConfirmModal },
  data() {
    return {
      job: null,
      loading: true,
      error: '',
      confirmOpen: false,
      deleting: false
    }
  },
  async mounted() {
    try {
      this.job = await getJob(this.$route.params.id)
    } catch (err) {
      this.error = `Offre introuvable (id ${this.$route.params.id}).`
    } finally {
      this.loading = false
    }
  },
  methods: {
    formatSalary,
    formatDate,
    formatExperience,
    async remove() {
      this.deleting = true
      try {
        await deleteJob(this.job.id)
        this.$router.push({ name: 'home' })
      } catch (err) {
        this.confirmOpen = false
        this.error = "La suppression a échoué."
        this.job = null
      } finally {
        this.deleting = false
      }
    }
  }
}
</script>

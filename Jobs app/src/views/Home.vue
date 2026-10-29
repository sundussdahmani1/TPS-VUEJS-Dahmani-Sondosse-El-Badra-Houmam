<template>
  <section class="page-head">
    <div>
      <h1>Offres d'emploi</h1>
      <p class="muted">{{ filteredJobs.length }} offre(s) sur {{ jobs.length }}</p>
    </div>
    <router-link to="/add" class="btn btn-primary">＋ Nouvel emploi</router-link>
  </section>

  <FilterNav v-model="filters" @reset="resetFilters" />

  <p class="state" v-if="loading">Chargement des offres…</p>

  <div class="state error" v-else-if="error">
    <p>{{ error }}</p>
    <button class="btn btn-ghost" @click="loadJobs">Réessayer</button>
  </div>

  <p class="state" v-else-if="filteredJobs.length === 0">Aucune offre ne correspond à votre recherche.</p>

  <div class="job-grid" v-else>
    <JobCard v-for="job in filteredJobs" :key="job.id" :job="job" />
  </div>
</template>

<script>
import FilterNav from '../components/FilterNav.vue'
import JobCard from '../components/JobCard.vue'
import { getJobs } from '../api.js'

const defaultFilters = () => ({
  search: '',
  contract: '',
  maxExperience: '',
  sort: 'recent'
})

export default {
  name: 'Home',
  components: { FilterNav, JobCard },
  data() {
    return {
      jobs: [],
      loading: true,
      error: '',
      filters: defaultFilters()
    }
  },
  computed: {
    filteredJobs() {
      const { search, contract, maxExperience, sort } = this.filters
      const q = search.trim().toLowerCase()

      const result = this.jobs.filter(job => {
        const matchesSearch =
          !q ||
          [job.title, job.company, job.location].some(v => (v || '').toLowerCase().includes(q))
        const matchesContract = !contract || job.contract === contract
        const matchesExperience = maxExperience === '' || job.experience <= Number(maxExperience)
        return matchesSearch && matchesContract && matchesExperience
      })

      const sorters = {
        recent: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        'salary-desc': (a, b) => b.salary - a.salary,
        'salary-asc': (a, b) => a.salary - b.salary,
        'experience-asc': (a, b) => a.experience - b.experience
      }
      return result.sort(sorters[sort])
    }
  },
  mounted() {
    this.loadJobs()
  },
  methods: {
    async loadJobs() {
      this.loading = true
      this.error = ''
      try {
        this.jobs = await getJobs()
      } catch (err) {
        this.error = "Impossible de joindre l'API. Lancez-la avec « npm run api »."
      } finally {
        this.loading = false
      }
    },
    resetFilters() {
      this.filters = defaultFilters()
    }
  }
}
</script>

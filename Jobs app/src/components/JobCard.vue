<template>
  <router-link :to="{ name: 'job-detail', params: { id: job.id } }" class="job-card">
    <div class="job-card-head">
      <h3>{{ job.title }}</h3>
      <span class="tag" :class="`tag-${job.contract.toLowerCase()}`">{{ job.contract }}</span>
    </div>
    <p class="company">{{ job.company }} · {{ job.location }}</p>
    <p class="excerpt">{{ excerpt }}</p>
    <div class="job-card-foot">
      <strong class="salary">{{ formatSalary(job.salary) }}</strong>
      <span class="muted">{{ formatExperience(job.experience) }}</span>
    </div>
    <span class="muted small">Publiée le {{ formatDate(job.createdAt) }}</span>
  </router-link>
</template>

<script>
import { formatSalary, formatDate, formatExperience } from '../constants.js'

export default {
  name: 'JobCard',
  props: {
    job: {
      type: Object,
      required: true,
      validator(value) {
        return typeof value.title === 'string' && value.title.trim() !== ''
      }
    }
  },
  computed: {
    excerpt() {
      const text = this.job.description || ''
      return text.length > 110 ? `${text.slice(0, 110)}…` : text
    }
  },
  methods: {
    formatSalary,
    formatDate,
    formatExperience
  }
}
</script>

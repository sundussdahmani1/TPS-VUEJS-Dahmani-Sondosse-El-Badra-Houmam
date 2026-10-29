<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Cette page n'existe pas.</p>
    <router-link to="/" class="btn btn-primary">Retour à l'accueil</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<template>
  <header class="topbar">
    <router-link to="/" class="brand"> Jobs<span>App</span></router-link>
    <nav>
      <router-link to="/" exact-active-class="active">Offres</router-link>
      <router-link to="/add" active-class="active">Publier une offre</router-link>
    </nav>
  </header>
  <main class="container">
    <router-view />
  </main>
</template>

<script>
export default {
  name: 'App'
}
</script>

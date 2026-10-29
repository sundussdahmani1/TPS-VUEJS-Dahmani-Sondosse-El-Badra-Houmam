<script>
function livreVide() {
  return { title: '', author: '', year: new Date().getFullYear(), genre: 'Roman', isFav: false, keywords: [] }
}

export default {
  name: 'AddBookForm',
  emits: ['add-book'],

  data() {
    return {
      genres: ['Roman', 'Science-fiction', 'Conte', 'Essai', 'Policier', 'Poésie'],
      newBook: livreVide(),
      nouveauMotCle: ''
    }
  },


  mounted() {
    this.$refs.titreInput.focus()
  },

  computed: {
    formulaireValide() {
      return this.newBook.title.trim() !== '' && this.newBook.author.trim() !== ''
    }
  },

  methods: {
   
    submit() {
      if (!this.formulaireValide) return
      this.$emit('add-book', { ...this.newBook, keywords: [...this.newBook.keywords] })
      this.newBook = livreVide()
      this.nouveauMotCle = ''
      this.$refs.titreInput.focus()
    },
    ajouterMotCle() {
      const mot = this.nouveauMotCle.trim()
      if (mot && !this.newBook.keywords.includes(mot)) {
        this.newBook.keywords.push(mot)
      }
      this.nouveauMotCle = ''
    },
    retirerMotCle(mot) {
      this.newBook.keywords = this.newBook.keywords.filter(k => k !== mot)
    }
  }
}
</script>

<template>
  <form class="add-form" @submit.prevent="submit">
    <h2>Ajouter un livre</h2>

    <div class="field">
      <label for="title">Titre</label>
      <input id="title" ref="titreInput" type="text" v-model.trim="newBook.title" placeholder="Titre du livre" />
    </div>

    <div class="field">
      <label for="author">Auteur</label>
      <input id="author" type="text" v-model.lazy="newBook.author" placeholder="Nom de l'auteur" />
    </div>

    <div class="field">
      <label for="year">Année</label>
      <input id="year" type="number" v-model.number="newBook.year" />
    </div>

    <div class="field">
      <label for="genre">Genre</label>
      <select id="genre" v-model="newBook.genre">
        <option v-for="g in genres" :key="g" :value="g">{{ g }}</option>
      </select>
    </div>

    <div class="field checkbox">
      <input id="isFav" type="checkbox" v-model="newBook.isFav" />
      <label for="isFav">Favori</label>
    </div>

    <div class="field full">
      <label for="kw">Mots-clés (Entrée pour valider)</label>
      <input id="kw" type="text" v-model="nouveauMotCle" @keyup.enter="ajouterMotCle" placeholder="ex : science-fiction" />
      <div class="chips" v-if="newBook.keywords.length">
        <span class="chip" v-for="mot in newBook.keywords" :key="mot">
          {{ mot }}
          <button type="button" @click="retirerMotCle(mot)" title="Retirer">×</button>
        </span>
      </div>
    </div>

    <button class="btn-add" type="submit" :disabled="!formulaireValide">Ajouter</button>
  </form>
</template>

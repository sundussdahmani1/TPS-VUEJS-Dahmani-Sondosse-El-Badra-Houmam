<script>
import AddBookForm from './components/AddBookForm.vue'
import BookList from './components/BookList.vue'

const initialBooks = [
  { id: 1, title: 'Le Petit Prince', author: 'Antoine de Saint-Exupéry', year: 1943, genre: 'Conte', isFav: true, keywords: ['enfance', 'philosophie'] },
  { id: 2, title: "L'Étranger", author: 'Albert Camus', year: 1942, genre: 'Roman', isFav: false, keywords: ['absurde'] },
  { id: 3, title: 'Dune', author: 'Frank Herbert', year: 1965, genre: 'Science-fiction', isFav: false, keywords: ['désert', 'politique'] },
  { id: 4, title: '1984', author: 'George Orwell', year: 1949, genre: 'Science-fiction', isFav: true, keywords: ['dystopie'] }
]

export default {
  name: 'App',
  components: { AddBookForm, BookList },


  data() {
    return {
      books: [],
      loading: true
    }
  },


  mounted() {
    setTimeout(() => {
      this.books = initialBooks
      this.loading = false
    }, 600)
  },

  computed: {
    nbFavoris() {
      return this.books.filter(b => b.isFav).length
    }
  },

  methods: {
    addBook(book) {
      const nextId = this.books.length ? Math.max(...this.books.map(b => b.id)) + 1 : 1
      this.books.push({ ...book, id: nextId })
    },
    toggleFav(id) {
      const book = this.books.find(b => b.id === id)
      if (book) book.isFav = !book.isFav
    },
    deleteBook(id) {
      this.books = this.books.filter(b => b.id !== id)
    }
  }
}
</script>

<template>
  <header>
    <h1> Catalogue de livres</h1>
    <p>{{ books.length }} livre(s) · {{ nbFavoris }} favori(s)</p>
  </header>

  <AddBookForm @add-book="addBook" />


  <p class="loading" v-show="loading">Chargement des livres…</p>

  <BookList
    :books="books"
    @toggle-fav="toggleFav"
    @delete-book="deleteBook"
  />
</template>

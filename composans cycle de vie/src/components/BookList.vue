<script>
import BookCard from './BookCard.vue'

export default {
  name: 'BookList',
  components: { BookCard },


  props: {
    books: {
      type: Array,
      required: true
    }
  },

  emits: ['toggle-fav', 'delete-book']
}
</script>

<template>
  <div class="book-list">
    <BookCard
      v-for="book in books"
      :key="book.id"
      :book="book"
      @toggle-fav="$emit('toggle-fav', $event)"
    >
    
      <template #actions>
        <button class="btn btn-danger" @click="$emit('delete-book', book.id)">
          Supprimer
        </button>
      </template>
    </BookCard>
  </div>
  <p class="empty" v-if="books.length === 0">Aucun livre à afficher.</p>
</template>

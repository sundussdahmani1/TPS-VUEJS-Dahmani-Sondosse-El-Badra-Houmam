<script>
export default {
  name: 'BookCard',


  props: {
    book: {
      type: Object,
      required: true,
      validator(book) {
        return typeof book.title === 'string' && book.title.trim() !== ''
      }
    }
  },

  emits: ['toggle-fav']
}
</script>

<template>
  <div class="book" :class="{ fav: book.isFav }">
    <h3>{{ book.title }}</h3>
    <p class="author">{{ book.author }} · {{ book.year }}</p>

    <div class="meta">
      <span class="tag">{{ book.genre }}</span>
    </div>

    <div class="chips" v-if="book.keywords && book.keywords.length">
      <span class="chip" v-for="k in book.keywords" :key="k">{{ k }}</span>
    </div>

    <div class="book-actions">
     
      <button class="btn btn-fav" @click="$emit('toggle-fav', book.id)">
        {{ book.isFav ? '★ Retirer des favoris' : '☆ Favori' }}
      </button>

      <span class="badge-fav" v-if="book.isFav"> Favori</span>

     
      <slot name="actions"></slot>
    </div>
  </div>
</template>

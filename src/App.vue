<template>
  <div id="app">
    <b-container>
      <b-row class="mb-4">
        <b-col md="8" sm="12">
          <b-pagination
            :value="pagination.page"
            :total-rows="pagination.total"
            :per-page="pagination.per_page"
            aria-controls="my-table"
            @input="onPageClick"
          />
        </b-col>
        <b-col md="4" sm="12">
          <b-form-input
            :value="title"
            type="search"
            placeholder="Start typing..."
            :debounce="300"
            @update="handleTitleInput"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col md="10">
          <h2>List</h2>
          <div v-if="loading">
            <b-spinner style="width: 5rem; height: 5em;" type="grow" label="Loading..."></b-spinner>
          </div>
          <template v-else>
            <b-row cols-lg="5">
              <b-col v-for="movie in movies" :key="movie.imdbID" class="mb-4">
                <TheMovie
                  :movie="movie"
                  class="h-100"
                  :isFavorite="isFavorite(movie.imdbID)"
                  @addToFavorites="addFavorite(movie)"
                  @removeFromFavorites="removeFavorite(movie.imdbID)"
                />
              </b-col>
            </b-row>
          </template>
        </b-col>
        <b-col md="2">
          <h2>Favorites</h2>
          <template v-if="favorites.length">
            <TheMovie
              v-for="movie in favorites"
              :key="movie.imdbID"
              :movie="movie"
              :isFavorite="isFavorite(movie.imdbID)"
              @addToFavorites="addFavorite(movie)"
              @removeFromFavorites="removeFavorite(movie.imdbID)"
            />
          </template>
          <p v-else>No favorites</p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import TheMovie from '@/components/TheMovie'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    TheMovie,
  },
  created() {
    this.getMovies()
  },
  computed: {
    ...mapState([
      'pagination',
      'loading',
      'title',
      'movies',
      'favorites'
    ]),
    ...mapGetters(['isFavorite']),
  },
  methods: {
    ...mapMutations(['set', 'addFavorite', 'removeFavorite']),
    ...mapActions(['getMovies', 'setPage']),
    onPageClick(page) {
      this.setPage(page)
    },
    handleTitleInput(e) {
      this.set(['title', e])
      this.setPage(1)
    },
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>

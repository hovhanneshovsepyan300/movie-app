<template>
	<b-card
    class="mb-2"
  >
  <b-card-title>
    {{ movie.Title }}
    <div class="favorite-button" :class="{ active: isFavorite }" @click="toggleFavorite">
      <b-icon icon="star-fill"></b-icon>
    </div>
  </b-card-title>
    <b-card-text>
      <p class="mb-0">Year: {{ movie.Year }}</p>
      <p class="mb-0">IMDb ID: <code>{{ movie.imdbID }}</code></p>
    </b-card-text>

    <template #footer>
      <b-button href="#" variant="primary" @click="goTo">More on IMDb</b-button>
    </template>
  </b-card>
</template>

<script>
	export default {
		name: 'TheMovie',
		props: {
			movie: {
				type: Object,
			},
      isFavorite: {
        type: Boolean,
        default: false,
      }
		},
    methods: {
      goTo() {
        const url = "https://www.imdb.com/title/"
        window.open(url + this.movie.imdbID, '_blank')
      },
      toggleFavorite() {
        if (this.isFavorite) {
          this.$emit('removeFromFavorites')
        } else {
          this.$emit('addToFavorites')
        }
      },
    }
	}
</script>

<style lang="scss" scoped>
.favorite-button {
  cursor: pointer;
  display: inline-block;
  transition: color .2s;

  &:hover {
    color: #ff8800aa;
  }

  &.active {
    color: #f80;
  }
}
</style>

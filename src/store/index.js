import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const endpoint = "https://jsonmock.hackerrank.com/api/movies/search?"

export default new Vuex.Store({
  state: {
    movies: [],
    favorites: [],
    loading: false,
    title: '',
    pagination: {
      page: 1,
      per_page: 10,
      total: 0,
    }
  },
  getters: {
    isFavorite(state) {
      return id => state.favorites.some(movie => movie.imdbID === id)
    },
  },
  mutations: {
    set(state, [prop, val]) {
      state[prop] = val
    },
    setPagination(state, [prop, val]) {
      state.pagination[prop] = val
    },
    addFavorite(state, movie) {
      state.favorites.push(movie)
    },
    removeFavorite(state, id) {
      state.favorites = state.favorites.filter(movie => movie.imdbID !== id)
    },
  },
  actions: {
    getMovies({ state, commit }) {
      commit('set', ['loading', true])

      return fetch(endpoint + new URLSearchParams({
        Title: state.title,
        page: state.pagination.page,
      }))
      .then(res => res.json())
      .then(data => {
        const { per_page, total, data: movies } = data
        commit('setPagination', ['per_page', per_page])
        commit('setPagination', ['total', total])
        commit('set', ['movies', movies])

        commit('set', ['loading', false])
      })
    },
    setPage({ commit, dispatch }, val) {
      commit('setPagination', ['page', val])

      dispatch('getMovies')
    },
  },
  plugins: [
    createPersistedState({
      paths: [
        'favorites',
      ],
    }),
  ],
})

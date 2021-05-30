import { searchMulty } from '../api'
export default {
  state: {
    movies: [],
    persones: []
  },

  mutations: {
    filterState (state, payload) {
      if (!payload.results) {
        state.movies = []
        state.persones = []
      } else {
        state.movies = payload.results.filter(function (num) {
          return num.media_type === 'movie'
        })
        state.persones = payload.results.filter(function (num) {
          return num.media_type === 'person'
        })
      }
    }
  },

  actions: {
    async asyncChangeValue ({commit}, val) {
      const CopyPromise = await searchMulty(val)
      commit('filterState', CopyPromise)
    }
  },

  getters: {
    croppedValueMovies (state) {
      return state.movies.slice(0, 2)
    },
    croppedValuePersones (state) {
      return state.persones.slice(0, 2)
    }
  }
}

<template>
    <v-responsive
        max-width="260">
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    @keyup.enter="asyncSearch"
                    v-model='search'
                    @keyup="getValue"
                    dense
                    flat
                    hide-details
                    rounded
                    solo-inverted
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
            </template>
            <v-list>
                <v-list-item-title v-if="!movies.length && !persones.length" class="pl-3">Введите корректный текст</v-list-item-title>
                <v-list-item-title v-if="movies.length" class="pl-3">Фильмы</v-list-item-title>
                <v-col
                v-for="(movie, i) in movies"
                :key="i"
                cols="12"
                class="pl-1 pr-1 pb-0 pt-1"
                >
                  <router-link :to="'/result/' + movie.id">
                    <v-card
                        dark
                        link
                        
                    >
                    <v-img
                      max-height="150"
                      max-width="400"
                      :src="`https://image.tmdb.org/t/p/original${movie.backdrop_path}`">
                        <div class="d-flex flex-no-wrap justify-space-between">
                          <div>
                              <v-card-title
                              class="text-h5"
                              v-text="movie.title"
                              ></v-card-title>
                              <div class="wrapper-valuation-num green--text ml-4">
                              {{ movie.vote_average }}
                              </div>
                              <v-card-subtitle v-text="movie.original_title"></v-card-subtitle>
                          </div>
                        </div>
                        </v-img>
                    </v-card>
                  </router-link>
                </v-col>
            </v-list>
            <v-list>
                <v-list-item-title v-if="persones.length" class="pl-3">Актеры</v-list-item-title>
                <v-col
                v-for="(person, i) in persones"
                :key="i"
                cols="12"
                class="pb-0 pt-1"
                >
                  <router-link :to="'/person/' + person.id">
                    <v-card
                        dark
                        link
                        
                    >
                        <div class="d-flex flex-no-wrap justify-space-between">
                          <div>
                              <v-card-title
                              class="text-h5"
                              v-text="person.name"
                              ></v-card-title>
                              <v-card-subtitle v-text="person.artist"></v-card-subtitle>
                          </div>
                          <v-avatar
                              class="ma-3"
                              size="75"
                              tile
                          >
                              <v-img :src="`https://image.tmdb.org/t/p/original${person.profile_path}`"></v-img>
                          </v-avatar>
                        </div>
                    </v-card>
                  </router-link>
                </v-col>
            </v-list>
        </v-menu>
    </v-responsive>

</template>

<script>
// import { searchMulty } from '../../api'
export default {
  name: 'SearchMenu',
  data: function () {
    return {
      search: ''
    }
  },
  methods: {
    getValue (e) {
      this.$store.dispatch('asyncChangeValue', e.target.value)
    }
  },
  computed: {
    movies () {
      return this.$store.getters.croppedValueMovies
    },
    persones () {
      return this.$store.getters.croppedValuePersones
    }
  },
  watch: {}
}
</script>
<style scoped>
</style>

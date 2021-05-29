<template>
    <v-responsive
        max-width="260">
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    @keyup.enter="asyncSearch"
                    v-model='search'
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
                <v-list-item-title class="pl-3">Фильмы</v-list-item-title>
                <v-col
                v-for="(movie, i) in movies"
                :key="i"
                cols="12"
                class="pb-0 pt-1"
                >
                    <v-card
                        dark
                        link
                    >
                        <div class="d-flex flex-no-wrap justify-space-between">
                          <div>
                              <v-card-title
                              class="text-h5"
                              v-text="movie.title"
                              ></v-card-title>

                              <v-card-subtitle v-text="movie.artist"></v-card-subtitle>
                          </div>
                          <v-avatar
                              class="ma-3"
                              size="75"
                              tile
                          >
                              <v-img :src="movie.src"></v-img>
                          </v-avatar>
                        </div>
                    </v-card>
                </v-col>
            </v-list>
            <v-list v-if="actors">
                <v-list-item-title class="pl-3">Актеры</v-list-item-title>
                <v-col
                v-for="(actor, i) in actors"
                :key="i"
                cols="12"
                class="pb-0 pt-1"
                >
                    <v-card
                        dark
                        link
                    >
                        <div class="d-flex flex-no-wrap justify-space-between">
                          <div>
                              <v-card-title
                              class="text-h5"
                              v-text="actor.title"
                              ></v-card-title>

                              <v-card-subtitle v-text="actor.artist"></v-card-subtitle>
                          </div>
                          <v-avatar
                              class="ma-3"
                              size="75"
                              tile
                          >
                              <v-img :src="actor.src"></v-img>
                          </v-avatar>
                        </div>
                    </v-card>
                </v-col>
            </v-list>
        </v-menu>
    </v-responsive>

</template>

<script>
import { searchMulty } from '../../api'
export default {
  name: 'SearchMenu',
  data: function () {
    return {
      search: '',
      movies: [
        {
          color: '#1F7087',
          src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Supermodel',
          artist: 'Foster the People'
        },
        {
          color: '#952175',
          src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
          title: 'Halcyon Days',
          artist: 'Ellie Goulding'
        }
      ],
      actors: null
    }
  },
  watch: {
    async search () {
      const CopyPromise = await searchMulty(this.search)
      console.log(CopyPromise)
    }
  }
}
</script>

<template>
  <v-container>
    <h1>TOP 100</h1>
    <v-row justify="space-around">
      <v-col
        class="pa-0"
        v-for="(elevation, i) in elevations"
        :key="elevation.id"
        cols="12"
        md="12"
      >
        <v-sheet
          class="pa-3 flex"
        >
          <span
          class="title count"
          >
            {{ (i + 1) }}
          </span>
          <v-sheet
            :elevation=4
            class="mx-12"
            height="150"
            width="100"
          >
            <v-img
              max-height="150"
              max-width="100"
              :src=elevation.poster
            ></v-img>
          </v-sheet>
          <v-list-item three-line>
                <v-list-item-content>
                    <v-list-item-title>{{ elevation.title }}</v-list-item-title>
                    <v-list-item-subtitle>
                    {{ elevation.date }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                    {{ elevation.overview }}
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-row
            class="wrapper-valuation">
                <v-rating
                  background-color="grey"
                  color="warning"
                  hover
                  length="5"
                  readonly
                  size="15"
                  :value="elevation.populStar"
                ></v-rating>
                <div class="wrapper-valuation-num green--text ml-4">
                {{ elevation.popularity }}
                </div>
            </v-row>
          </v-sheet>
        <v-divider >
        </v-divider>
      </v-col>
    </v-row>
    <div class="text-center pt-7">
      <v-pagination
        v-model="page"
        :length="5"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import prom from '../../api'
export default {
  data: () => ({
    page: 1,
    elevations: []
  }),
  mounted () {
    const created = async () => {
      const CopyPromise = await prom(this.page)
      CopyPromise.results.forEach(el => {
        let move = {}
        move.title = el.title
        move.date = el.release_date
        move.overview = el.overview
        move.popularity = el.vote_average
        move.poster = `https://image.tmdb.org/t/p/original${el.poster_path}`
        move.populStar = el.vote_average / 2
        move.id = el.id
        this.elevations.push(move)
      })
      // createdNewElem(CopyPromise)
      // console.log(CopyPromise)
    }
    created()
  },
  methods: {
    createdNewElem: (promise) => {
      promise.forEach(el => {
        let move = {}
        move.title = el.title
        move.date = el.release_date
        move.overview = el.overview
        move.popularity = el.vote_average
        move.poster = `https://image.tmdb.org/t/p/original${el.poster_path}`
        move.populStar = el.vote_average / 2
        move.id = el.id
        this.elevations.push(move)
      })
    }
  },
  watch: {
    async page () {
      console.log(this)
      const copy = await prom(this.page)
      console.log(copy.results)
      createdNewElem(copy.results)
    }
  }
}
</script>

<style scoped>
    .flex {
        display: flex;
    }
    .wrapper-valuation{
        display: flex;
        flex-flow: row nowrap;
        align-self: center;
    }
    .wrapper-valuation-num{
        align-self: center;
    }
    .count{
      min-width: 20px;
    }
</style>

<template >
    <v-container>
      <h1>{{ title }}</h1>
      <h3 class="font-italic pb-5">{{ originalTitle }}</h3>
        <v-layout class="pb-5" row>
            <v-flex xs5
            class="pt-5 pl-5">
                <v-img
                    max-width="350"
                    :src=poster
                ></v-img>
            </v-flex>
            <v-flex xs7
            class="pt-5 pr-5 pl-5 pb-5">
                <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                          <th class="text-left">
                              Name
                          </th>
                          <th class="text-left">
                              Value
                          </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="(item, i) in infoAboutTheMovie"
                        :key="i"
                        >
                        <td>{{ item.name }}</td>
                        <td >{{ item.value | filterValue }}</td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </v-flex>
        </v-layout>
          <h2>Обзор</h2>
          <v-row>
            <v-col cols="12">
              <p>{{ overview }}</p>
            </v-col>
          </v-row>
          <h2>Рейтинги TMDB</h2>
          <v-row >
            <v-col>
              <v-rating
              v-model="vote_average"
              color="warning"
              hover
              length="10"
              readonly
              size="50"
              ></v-rating>
            </v-col>
            <v-col  class="rating">
              <h2 text-color="green" :class="vote_average >= 7 ? 'green--text': 'grey--text'" class="rating_text">{{ vote_average }}</h2>
            </v-col>
          </v-row>
          <h2>Рейтинги КиноHome</h2>
          <v-row>
            <v-col>
              <v-rating
                v-model="vote_kinohome"
                color="warning"
                hover
                length="10"
                size="50"
              ></v-rating>
            </v-col>
            <v-col class="rating">
              <h2 :class="vote_kinohome >= 7 ? 'green--text': 'grey--text'" class="rating_text">{{ vote_kinohome }}</h2>
            </v-col>
          </v-row>
    </v-container>
</template>

<script>
import { getMovieOnId } from '../../api'
export default {
  data: function () {
    return {
      id: this.$router.currentRoute.params['id'],
      poster: '',
      title: '',
      originalTitle: '',
      overview: '',
      vote_average: null,
      vote_kinohome: 0,
      infoAboutTheMovie: null
    }
  },

  mounted () {
    const createdMovie = async () => {
      const CopyPromise = await getMovieOnId(this.id)
      this.createdNewElem(CopyPromise)
    }
    createdMovie()
  },

  methods: {
    createdNewElem (promise) {
      this.infoAboutTheMovie = []
      const getArrayDate = function (arrayDataMovie) {
        let value = []
        arrayDataMovie.forEach(el => {
          let obj = {}
          obj.id = el.id
          obj.name = el.name
          value.push(obj)
        })
        return value
      }
      this.title = promise.title
      this.originalTitle = promise.original_title
      this.overview = promise.overview
      this.vote_average = promise.vote_average
      this.poster = `https://image.tmdb.org/t/p/original${promise.poster_path}`
      this.infoAboutTheMovie.push({name: 'Год производства', value: promise.release_date.substr(0, 4)})
      this.infoAboutTheMovie.push({name: 'Страна', value: getArrayDate(promise.production_countries)})
      this.infoAboutTheMovie.push({name: 'Компания', value: getArrayDate(promise.production_companies)})
      this.infoAboutTheMovie.push({name: 'Жанр', value: getArrayDate(promise.genres)})
      this.infoAboutTheMovie.push({name: 'Слоган', value: promise.tagline})
      this.infoAboutTheMovie.push({ name: 'Бютжет', value: promise.budget })
      this.infoAboutTheMovie.push({ name: 'Сборы', value: promise.revenue })
    }
  },

  filters: {
    filterValue (value) {
      if (Array.isArray(value)) {
        let arr = []
        value.forEach(el => {
          arr.push(el.name)
        })
        return arr.join(', ')
      }
      if (!isNaN(value) && value > 10000) {
        let m = String(value).match(/^(.*?)((?:[,.]\d+)?|)$/)
        if (m) {
          return `${m[1].replace(/\B(?=(?:\d{3})*$)/g, ' ') + m[2]} $`
        }
      }
      return value
    }
  },

  watch: {
    $route (toR, fromR) {
      this.id = toR.params['id']
      this.vote_kinohome = 0
      const createdMovie = async () => {
        const CopyPromise = await getMovieOnId(this.id)
        this.createdNewElem(CopyPromise)
      }
      createdMovie()
    }
  }
}
</script>
<style scoped>
h3 {
  color: grey
}
.rating {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.rating_text {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 30px;
}
</style>

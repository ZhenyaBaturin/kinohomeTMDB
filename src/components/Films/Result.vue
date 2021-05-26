<template >
    <v-container>
      <h1>{{ title }}</h1>
      <h3 class="font-italic pb-5">{{ originalTitle }}</h3>
        <v-layout class="pb-5" row>
            <v-flex xs5
            class="pt-5 pl-5">
                <v-img
                    lazy-src="https://picsum.photos/id/11/10/6"
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
        <v-layout row>
          <h2>Обзор</h2>
          <v-flex>
            <p>{{ overview }}</p>
          </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { getMovieId } from '../../api'
export default {
  data: function () {
    return {
      id: this.$router.currentRoute.params['id'],
      poster: '',
      title: '',
      originalTitle: '',
      overview: '',
      infoAboutTheMovie: null
    }
  },

  mounted () {
    const createdMovie = async () => {
      const CopyPromise = await getMovieId(this.id)
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
      this.poster = `https://image.tmdb.org/t/p/original${promise.poster_path}`
      this.infoAboutTheMovie.push({name: 'Год производства', value: promise.release_date.substr(0, 4)})
      this.infoAboutTheMovie.push({name: 'Страна', value: getArrayDate(promise.production_countries)})
      this.infoAboutTheMovie.push({name: 'Компания', value: getArrayDate(promise.production_companies)})
      this.infoAboutTheMovie.push({name: 'Жанр', value: getArrayDate(promise.genres)})
      this.infoAboutTheMovie.push({name: 'Слоган', value: promise.tagline})
      this.infoAboutTheMovie.push({name: 'Бютжет', value: `${promise.budget} $`})
      this.infoAboutTheMovie.push({name: 'Сборы', value: `${promise.revenue} $`})
      console.log(promise)
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
      return value
    }
  }
}
</script>
<style scoped>
h3 {
  color: grey
}
</style>

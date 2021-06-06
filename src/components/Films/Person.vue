<template >
    <v-container>
      <h1>{{ title }}</h1>
        <v-layout class="pb-5" row>
            <v-flex xs5 md5 lg3
            class="pt-5 pl-5">
                <v-carousel
                height="600"
                hide-delimiters>
                  <v-carousel-item
                    height="500"
                    v-for="(item,i) in profile_path"
                    :key="i"
                    :src="item"
                  ></v-carousel-item>
                </v-carousel>
            </v-flex>
            <v-flex xs7 md7 lg9
            class="pt-5 pr-5 pl-5 pb-5">
                <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                          <th class="text-left">
                              О персоне
                          </th>
                          <th class="text-left">

                          </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="(item, i) in infoAboutThePerson"
                        :key="i"
                        >
                        <td>{{ item.name }}</td>
                        <td >{{ item.value }}</td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </v-flex>
        </v-layout>
          <h2>Биография</h2>
          <v-row>
            <v-col cols="12">
              <p>{{ overview }}</p>
            </v-col>
          </v-row>
    </v-container>
</template>

<script>
import { getPersonOnId, getPersonOnIdMovie, getPersonOnIdTv, getPersonOnIdExt, getPersonOnIdImg, getGenre } from '../../api'
export default {
  data: function () {
    return {
      id: this.$router.currentRoute.params['id'],
      profile_path: [],
      title: '',
      overview: '',
      infoAboutThePerson: null
    }
  },

  mounted () {
    const createdMovie = async () => {
      const CopyPromise = await getPersonOnId(this.id)
      const movie = await getPersonOnIdMovie(this.id)
      const tv = await getPersonOnIdTv(this.id)
      const ext = await getPersonOnIdExt(this.id)
      const img = await getPersonOnIdImg(this.id)
      const genre = await getGenre()
      this.createdNewElem(CopyPromise, movie, tv, ext, img, genre)
      console.log(CopyPromise)
      console.log(movie)
      this.sortArray(movie.cast)
    }
    createdMovie()
  },

  methods: {
    createdNewElem (promise, movie, tv, ext, img, genre) {
      img.profiles.forEach((item) => {
        this.profile_path.push(`https://image.tmdb.org/t/p/original${item.file_path}`)
      })
      this.infoAboutThePerson = []
      this.title = promise.name
      this.overview = promise.biography
      this.infoAboutThePerson.push({name: 'Карьера', value: '-'})
      this.infoAboutThePerson.push({name: 'Пол', value: promise.gender === 1 ? 'Женский' : 'Мужской'})
      this.infoAboutThePerson.push({name: 'Дата рождения', value: this.getDate(promise.birthday)})
      this.infoAboutThePerson.push({name: 'Место рождение', value: promise.place_of_birth})
      this.infoAboutThePerson.push({name: 'Дата смерти', value: this.getDate(promise.deathday)})
      this.infoAboutThePerson.push({name: 'Жанр', value: this.getGenre(genre, movie.cast).join(', ')})
    },

    getGenre (genre, arrMovie) {
      const collectionGenre = new Set()
      const arrGenre = []
      arrMovie.forEach((item) => {
        item.genre_ids.forEach(elem => collectionGenre.add(elem))
      })
      collectionGenre.forEach((item) => {
        genre.genres.forEach((elem) => {
          if (item === elem.id) {
            arrGenre.push(elem.name)
            return false
          }
        })
      })
      return arrGenre
    },

    sortArray (arr) {
      const x = arr.sort((prev, next) => prev.release_date.substr(0, 4) - next.release_date.substr(0, 4)).reverse()
    },

    getDate (date) {
      if (date) {
        const month = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']
        let numMonth = date.substr(5, 2) - 1
        if (numMonth[0] === 0) {
          numMonth = date.substr(6, 1) - 1
        }
        return `${date.substr(8, 2)} ${month[numMonth]} ${date.substr(0, 4)}`
      }
    }
  },

  filters: {
  },

  watch: {
    $route (toR, fromR) {
      this.id = toR.params['id']
      this.profile_path = []
      const createdMovie = async () => {
        const CopyPromise = await getPersonOnId(this.id)
        const movie = await getPersonOnIdMovie(this.id)
        const tv = await getPersonOnIdTv(this.id)
        const ext = await getPersonOnIdExt(this.id)
        const img = await getPersonOnIdImg(this.id)
        this.createdNewElem(CopyPromise, movie, tv, ext, img)
      }
      createdMovie()
    }
  }
}
</script>
<style scoped>
</style>

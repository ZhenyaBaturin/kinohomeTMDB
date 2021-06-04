<template >
    <v-container>
      <h1>{{ title }}</h1>
      <h3 class="font-italic pb-5">{{ originalTitle }}</h3>
        <v-layout class="pb-5" row>
            <v-flex xs5
            class="pt-5 pl-5">
                <v-img
                    max-width="350"
                    :src=profile_path
                ></v-img>
            </v-flex>
            <v-flex xs7
            class="pt-5 pr-5 pl-5 pb-5">
                <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                          <th class="text-left">
                              О персоне
                          </th>
                          <th class="text-left">
                              -
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
    </v-container>
</template>

<script>
import { getPersonOnId } from '../../api'
export default {
  data: function () {
    return {
      id: this.$router.currentRoute.params['id'],
      profile_path: '',
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
      const CopyPromise = await getPersonOnId(this.id)
      this.createdNewElem(CopyPromise)
      console.log(CopyPromise)
    }
    createdMovie()
  },

  methods: {
    createdNewElem (promise) {
      this.profile_path = `https://image.tmdb.org/t/p/original${promise.profile_path}`
      this.title = promise.name
    }
  },

  filters: {
  },

  watch: {
  }
}
</script>
<style scoped>
</style>

<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list color="transparent">
        <v-list-item
          v-for="menu in menus"
          :key="menu.title"
          :to="menu.url"
          link
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ menu.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider class="my-2"></v-divider>

        <v-list-item
          v-for="log in linkLogin"
          :key="log.title"
          :to=log.url
          link
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ log.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="white"
      flat
    >
      <v-container class="py-0 fill-height">
          <v-app-bar-nav-icon
          @click="drawer = !drawer"
          class="hidden-md-and-up"
          ></v-app-bar-nav-icon>
          <v-img
            :src=img
            @click="drawer = !drawer"
            max-height="48"
            max-width="250"
            class="hidden-sm-and-down image"
          ></v-img>
          {{resultSearch}}
        <v-spacer></v-spacer>
        <SearchMenu />
        <v-menu
          v-if="isUserLoggedIn"
          open-on-hover
          offset-y
        >
        <template
        v-slot:activator="{ on, attrs }">
          <v-avatar
            class="deep-orange ml-5"
            color="grey darken-1"
            size="32"
            dark
            v-bind="attrs"
            v-on="on"
          ></v-avatar>
        </template>

      <v-list>
        <v-list-item
          v-for="(link) in links"
          :key="link.title"
          :to="link.url"
          link
        >
          <v-list-item-title>{{ link.title }}</v-list-item-title>
        </v-list-item>
        <v-list-item
          @click=onLogout
          link
        >
          <v-list-item-title>Выход</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col>
            <v-sheet
              class="pa-5"
              min-height="70vh"
              rounded="lg"
            >
              <router-view></router-view>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <template v-if="error">
      <v-snackbar
        v-model="snackbar"
        :multi-line="multiLine"
      >
      {{ error }}
        <template v-slot:action="{ attrs }">
          <v-btn
            color="red"
            text
            v-bind="attrs"
            @click="closeError()"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </template>
    <v-footer
      color="grey darken-1"
      padless
    >
      <v-row
        justify="center"
        no-gutters
      >
        <v-btn
          v-for="footer in footerInfo"
          :key="footer.title"
          color="white"
          text
          rounded
          class="my-2"
        >
          {{ footer.title }}
        </v-btn>
        <v-col
        color="grey darken-1"
          class="lighten-2 py-4 text-center white--text"
          cols="12"
        >
        text
          {{ new Date().getFullYear() }} — <strong>КиноHome</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>

</template>

<script>
import img from '../build/logoza.ru.png'
import { searchMulty } from './api'
import SearchMenu from './components/SearchPanal/SearchMenu'

export default {
  name: 'App',
  components: {
    SearchMenu
  },
  data: function () {
    return {
      search: '',
      multiLine: true,
      snackbar: true,
      img,
      drawer: false,
      resultSearch: '',
      links: [
        {title: 'Мои Оценки ', url: '/estimation'},
        {title: 'Мои Сообщения', url: '/message'},
        {title: 'Мои Фильмы', url: '/movies'},
        {title: 'Мои Друзья', url: '/friends'}
      ],
      menus: [
        {title: 'Топ 100', url: '/top'},
        {title: 'Сегодня в кино', url: '/today'},
        {title: 'Жанры', url: '/genres'},
        {title: 'Премьеры', url: '/premiere'}
      ],
      footerInfo: [
        {title: 'О нас ', url: '/about_us'},
        {title: 'Команда', url: '/team'},
        {title: 'Реклама', url: '/advertisement'},
        {title: 'Соглашения', url: '/agreement'},
        {title: 'Предложения', url: '/proposal'}
      ]
    }
  },

  computed: {
    error () {
      return this.$store.getters.error
    },
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    },
    linkLogin () {
      if (!this.isUserLoggedIn) {
        return [
          {title: 'Логин', url: '/login'},
          {title: 'Регистрация', url: '/registration'}
        ]
      }
    }
  },

  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    },
    onLogout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/')
    },
    asyncSearch: (event) => {
      event.target.value = ''
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
<style scoped>
.image {
  cursor: pointer;
}
</style>

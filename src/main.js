// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import vuetify from '@/plugins/vuetify'
import fb from 'firebase/app'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  vuetify,
  components: { App },
  template: '<App/>',
  created () {
    var firebaseConfig = {
      apiKey: 'AIzaSyBnPqcjbiJ5GQ37fGXX9QEbVyysJ8u8hco',
      authDomain: 'base-kinohome.firebaseapp.com',
      projectId: 'base-kinohome',
      storageBucket: 'base-kinohome.appspot.com',
      messagingSenderId: '431557469048',
      appId: '1:431557469048:web:e41e311f6b4d8f5f8d1e8d'
    }
    fb.initializeApp(firebaseConfig)
    // для сохранение авторизации
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
  }
})

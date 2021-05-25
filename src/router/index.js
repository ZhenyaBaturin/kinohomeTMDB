import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'
import HomeFilm from '@/components/HomeFilm'
import Genres from '@/components/Films/Genres'
import Premiere from '@/components/Films/Premiere'
import Today from '@/components/Films/Today'
import Top from '@/components/Films/Top'
import Registration from '@/components/Auth/Registration'
import Login from '@/components/Auth/Login'
import Estimation from '@/components/User/Estimation'
import Movies from '@/components/User/Movies'
import Message from '@/components/User/Message'
import Friends from '@/components/User/Friends'
import Exit from '@/components/User/Exit'
import ResultOfSearch from '@/components/Films/ResultOfSearch'
import Film from '@/components/Films/Film'
import Result from '@/components/Films/Result'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomeFilm',
      component: HomeFilm
    },
    {
      path: '/genres',
      name: 'Genres',
      component: Genres
    },
    {
      path: '/premiere',
      name: 'Premiere',
      component: Premiere
    },
    {
      path: '/today',
      name: 'Today',
      component: Today
    },
    {
      path: '/top',
      name: 'Top',
      component: Top
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/registration',
      name: 'Registration',
      component: Registration
    },
    {
      path: '/message',
      name: 'Message',
      component: Message,
      beforeEnter: AuthGuard
    },
    {
      path: '/estimation',
      name: 'Estimation',
      component: Estimation,
      beforeEnter: AuthGuard
    },
    {
      path: '/movies',
      name: 'Movies',
      component: Movies,
      beforeEnter: AuthGuard
    },
    {
      path: '/friends',
      name: 'Friends',
      component: Friends,
      beforeEnter: AuthGuard
    },
    {
      path: '/exit',
      name: 'Exit',
      component: Exit
    },
    {
      path: '/resultOfSearch',
      name: 'ResultOfSearch',
      component: ResultOfSearch
    },
    {
      path: '/film',
      name: 'Film',
      component: Film
    },
    {
      path: '/result',
      name: 'Result',
      component: Result
    }
  ],
  mode: 'history'
})

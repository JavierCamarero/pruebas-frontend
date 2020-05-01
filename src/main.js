import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap';
import store from './store'
import axios from 'axios'
require("babel-core/register");
require("babel-polyfill");
import 'vue-select/dist/vue-select.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vuelidate from 'vuelidate'
import {
  faCartPlus, faTimesCircle
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faTimesCircle,
  faCartPlus
  )

  Vue.component('font-awesome-icon', FontAwesomeIcon)

  axios.defaults.baseURL = 'https://eshop-deve.herokuapp.com/api/v2';
  axios.defaults.headers.common['Authorization'] = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkM2NIVUVibVJoc1EzeXhNbzV2VnliSTFzaDZCSDJZRCIsImlhdCI6MTU4NTkzMjYzNDU0OH0.tMSht_M3ryQl5IqCirhYR1gb8j3FQ26vILT4Qpx4XrdFz-zUmqbgFYiKTaZHPpB85etRIMhxVoZf6tOrHy0fnA'

  Vue.use(VueRouter)
  Vue.use(Vuelidate)

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store
})

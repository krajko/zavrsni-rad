import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import moment from 'moment'

import './app.scss'

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuelidate);

Vue.mixin({
  filters: {
    fromNow(date) {
      return moment(date).fromNow();
    },

    dateTime(date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    }
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import translate from './mixins/translate'
import store from './store'

Vue.mixin(translate);

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})

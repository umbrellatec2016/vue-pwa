// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import 'leaflet/dist/leaflet.css';
import App from './App';
import router from './router';
import store from './store';


Vue.use(VueMaterial);
Vue.config.productionTip = false;


Vue.use(VueMaterial);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});


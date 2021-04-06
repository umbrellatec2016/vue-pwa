import Vue from 'vue';
import Router from 'vue-router';
import Lista from '@/components/Lista';
import User from '@/components/User';
import Favorites from '@/components/Favorites';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Lista',
      component: Lista,
    },
    {
      path: '/user/:id',
      name: 'User',
      component: User,
      props: true,
    },
    {
      path: '/favorites',
      name: 'Favorites',
      component: Favorites,
    },
  ],
});

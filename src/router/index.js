import Vue from 'vue';
import Router from 'vue-router';

import clientRecord from  '@/components/clientRecord';
import Login from  '@/components/login/login';

//  order
import CreateOrderIndex from '@/components/order/index'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'Login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    // {
    //   path: '/clientRecord/:id',
    //   name: 'clientRecord',
    //   component: clientRecord
    // },
    // {
    //   path: '/',
    //   redirect: 'CreateOrderIndex',
    // },
    {
      path: '/CreateOrderIndex',
      name: 'CreateOrderIndex',
      component: CreateOrderIndex
    }

  ]
})

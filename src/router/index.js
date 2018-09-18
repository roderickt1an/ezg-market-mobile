import Vue from 'vue';
import Router from 'vue-router';

// import clientRecord from  '@/components/clientRecord';
import Login from  '@/components/login/login';

//  index
import index from '@/components/order/index'
//  create_customer
import createCustomer from '@/components/customer_company/newClient/clientAdd'
import createCompany from '@/components/customer_company/newClient/companyAdd'

//  customerIndex
import customerList from '@/components/customerIndex/customerList'
import customerIndex from '@/components/customerIndex/customerIndex'

//  companyIndex
import companyList from '@/components/companyIndex/companyList'
// import companyIndex from '@/components/companyIndex/companyIndex'

//  orderIndex
import orderList from '@/components/order/orderList'

//  workorderIndex
import workorderIndex from '@/components/workorder/workorderList'

Vue.use(Router);

export default new Router({
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      redirect: 'Login'
    },
    //  登录页面
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    //  首页
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/createCustomer',
      name: 'createCustomer',
      component: createCustomer
    },
    {
      path: '/createCompany',
      name: 'createCompany',
      component: createCompany
    },
    //  客户组
    {
      path: '/customerList',
      name: 'customerList',
      component: customerList
    },
    {
      path: '/customer/:id',
      name: 'customerIndex',
      component: customerIndex
    },
    {
      path: '/company/:id',
      name: 'companyList',
      component: companyList
    },
    {
      path: '/order/:id',
      name: 'orderList',
      component: orderList
    },
    {
      path: '/workorderIndex/:id',
      name: 'workorderIndex',
      component: workorderIndex
    }
  ]
})

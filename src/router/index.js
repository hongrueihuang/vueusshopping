import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/pages/Home'
import Login from '../components/pages/Login'
import Dashboard from '../components/pages/Dashboard'
import Products from '../components/pages/Products'
import Orders from '../components/pages/Orders'
import Coupon from '../components/pages/Coupon'
import Detail from '../components/pages/Detail'
import MainPage from '../components/pages/MainPage'
import Checkout from '../components/pages/Checkout'
import CustomInfo from '../components/pages/CustomInfo'
import ShoppingDetail from '../components/pages/ShoppingDetail'
import Pay from '../components/pages/Pay'
import Commodity from '../components/pages/Commodity'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path:'/',
      name: '',
      component: Home,
      children: [
        {
          name: 'MainPage',
          path: '/',
          component: MainPage
        },
        {
          name: 'Detail',
          path: '/home/:id',
          component: Detail
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'orders',
          name: 'Orders',
          component: Orders,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'coupon',
          name: 'Coupon',
          component: Coupon,
          meta: {
            requiresAuth: true
          }
        }
      ],
    },
    {
      path: '/checkout',
      name: '',
      component: Checkout,
      children: [
        {
          path: '/',
          name: 'CustomInfo',
          component: CustomInfo
        },
        {
          path: '/pay/:id',
          name: 'Pay',
          component: Pay
        },
        {
          path: 'shoppingdetail/:id',
          name: 'ShoppingDetail',
          component: ShoppingDetail
        }
      ]
    },
  ]
})

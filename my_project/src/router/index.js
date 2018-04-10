import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Userinfo from '@/components/Userinfo'
import Storage_1 from '@/components/Storage'
import Location from '@/components/Location'
import Goods from '@/components/Goods'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/user',
      name: 'Userinfo',
      component: Userinfo
    },
    {
      path: '/storage',
      name: 'Storage',
      component: Storage_1
    },
    {
      path: '/storage/location',
      name: 'Location',
      component: Location
    }
    ,
    {
      path: '/good',
      name: 'Goods',
      component: Goods
    }
  ]
})

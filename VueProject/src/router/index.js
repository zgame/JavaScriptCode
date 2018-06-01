import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import zsw from '@/components/zsw'
import form from '@/components/form'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/zsw',
      name: 'zsw',
      component: zsw
    },
    {
      path: '/form',
      name: 'form',
      component: form
    }
  ]
})

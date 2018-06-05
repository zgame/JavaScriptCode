import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  // 下面是完整的页面， 没有侧边栏
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  // { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  // { path: '/edit', component: () => import('@/views/dashboard/editor/index'), hidden: true },

  // 下面都是带侧边栏的页面
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    name: 'Dashboard',
    // hidden: true,
    // meta: { title: '主页', icon: 'dashboard', noCache: true },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        meta: { title: '主面板', icon: 'dashboard', noCache: true },
        component: () => import('@/views/dashboard/index')
      }
    ]
  },
  {
    path: '/editor',
    component: Layout,
    // redirect: 'editor',
    name: 'editor',
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'dashboard-editor',
        meta: { title: '权限编辑', icon: 'dashboard', noCache: true },
        component: () => import('@/views/dashboard/editor/index')
      }
    ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 根据权限增加的侧边栏
export const asyncRouterMap = [
  {
    path: '/form',
    component: Layout,
    meta: { title: '表单', icon: 'form', roles: ['admin'] },
    children: [
      // {
      //   path: 'index',
      //   name: 'Form',
      //   component: () => import('@/views/form/index'),
      //   meta: { title: '表单', icon: 'form' }
      //   // meta: { title: '表单', icon: 'form', roles: ['admin'] }
      // },
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '表单', icon: 'form' }
        // meta: { title: '表单', icon: 'form', roles: ['admin'] }
      }
    ]
  }, // ,
  // {
  //   path: '/article',
  //   component: Layout,
  //   meta: { title: '综合表格', icon: 'table', roles: ['admin', 'view'] },
  //   children: [
  //     // {
  //     //   path: 'index',
  //     //   name: 'article',
  //     //   component: () => import('@/views/table/complexTable'),
  //     //   meta: { title: '文章列表', icon: 'table' }
  //     //   // meta: { title: '文章列表', icon: 'table', roles: ['admin', 'View'] }
  //     // },
  //     {
  //       path: 'index',
  //       name: 'article',
  //       component: () => import('@/views/table/complexTable'),
  //       meta: { title: '综合表格', icon: 'table' }
  //       // meta: { title: '文章列表', icon: 'table', roles: ['admin', 'View'] }
  //     }
  //
  //   ]
  // }

  {
    path: '/table',
    component: Layout,
    redirect: '/table/table',
    name: 'Example',
    meta: { title: '表格', icon: 'example', roles: ['admin'] },
    children: [
      {
        path: 'index',
        name: 'article',
        component: () => import('@/views/table/complexTable'),
        meta: { title: '综合表格', icon: 'table' }
        // meta: { title: '文章列表', icon: 'table', roles: ['admin', 'View'] }
      },
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '普通表格', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '修改表格', icon: 'tree' }
      },
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/table/admin'),
        meta: { title: 'admin test', icon: 'tree' }
      }
    ]
  },
  {
    path: '/charts',
    component: Layout,
    redirect: 'noredirect',
    name: 'charts',
    meta: { title: '图形', icon: 'chart', roles: ['admin'] },
    children: [
      {
        path: 'keyboard',
        component: () => import('@/views/charts/keyboard'),
        name: 'keyboardChart',
        meta: { title: 'keyboardChart', icon: 'chart', noCache: true }
      },
      {
        path: 'line',
        component: () => import('@/views/charts/line'),
        name: 'lineChart',
        meta: { title: 'lineChart', icon: 'excel', noCache: true }
      },
      {
        path: 'mixchart',
        component: () => import('@/views/charts/mixChart'),
        name: 'mixChart',
        meta: { title: 'mixChart', icon: 'chart', noCache: true }
      }
    ]
  }
  // ,
  // { path: '*', redirect: '/404', hidden: true }
]


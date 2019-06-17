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
    path: '/all_statistic',
    component: Layout,
    meta: { title: '总表', icon: 'chart', roles: ['admin'] },
    children: [
      {
        path: 'all_statistic',
        name: 'all_statistic',
        component: () => import('@/views/tbAllStatistic/allstatistic'),
        meta: { title: '总统计表', icon: 'chart' }
        // meta: { title: '表单', icon: 'form', roles: ['admin'] }          // 权限是express 返回的数组，里面包含各个字符串定义
      }
    ]
  },
  {
    path: '/recharge',
    component: Layout,
    meta: { title: '营收', icon: 'example', roles: ['admin'] },
    children: [
      {
        path: 'recharge',
        name: 'recharge',
        component: () => import('@/views/tbRecharge/recharge'),
        meta: { title: '收入表', icon: 'table' }
        // meta: { title: '表单', icon: 'form', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/server_list',
    component: Layout,
    meta: { title: '服务器列表', icon: 'tree', roles: ['admin'] },
    children: [
      {
        path: 'server_list',
        name: 'server_list',
        component: () => import('@/views/tbServerList/index'),
        meta: { title: '服务器列表', icon: 'tree' }
        // meta: { title: '表单', icon: 'form', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/server_state',
    component: Layout,
    meta: { title: '服务器状态', icon: 'tree', roles: ['admin'] },
    children: [
      {
        path: 'server_state',
        name: 'server_state',
        component: () => import('@/views/tbServerState/index'),
        meta: { title: '服务器状态', icon: 'excel' }
        // meta: { title: '表单', icon: 'form', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/game_state',
    component: Layout,
    redirect: '/game_state/game_state',
    meta: { title: '游戏状态', icon: 'dashboard', roles: ['admin'] },
    children: [
      {
        path: 'game_state',
        name: 'game_state',
        component: () => import('@/views/tbGameState/index'),
        meta: { title: '实时状态', icon: 'dashboard' }
        // meta: { title: '表单', icon: 'form', roles: ['admin'] }
      },
      {
        path: 'game_state_record',
        name: 'game_state_record',
        component: () => import('@/views/tbGameState/gameStateRecord'),
        meta: { title: '历史状态', icon: 'excel' }
        // meta: { title: '表单', icon: 'form', roles: ['admin'] }
      },
      {
        path: 'game_state_points',
        name: 'game_state_points',
        component: () => import('@/views/tbGameState/gameStatePoints'),
        meta: { title: '小奖池日志', icon: 'form' }
        // meta: { title: '表单', icon: 'form', roles: ['admin'] }
      },
      {
        path: 'game_state_jackpot',
        name: 'game_state_jackpot',
        component: () => import('@/views/tbGameState/gameStateJackpot'),
        meta: { title: '大奖池日志', icon: 'form' }
        // meta: { title: '表单', icon: 'form', roles: ['admin'] }
      },
      {
        path: 'game_state_tiger',
        name: 'game_state_tiger',
        component: () => import('@/views/tbGameState/gameStateTiger'),
        meta: { title: '老虎机日志', icon: 'form' }
        // meta: { title: '表单', icon: 'form', roles: ['admin'] }
      },
      {
        path: 'game_state_card',
        name: 'game_state_card',
        component: () => import('@/views/tbGameState/gameStateCard'),
        meta: { title: '翻牌日志', icon: 'form' }
        // meta: { title: '表单', icon: 'form', roles: ['admin'] }
      },
      {
        path: 'game_state_blood',
        name: 'game_state_blood',
        component: () => import('@/views/tbGameState/gameStateBlood'),
        meta: { title: '热血模式日志', icon: 'form' }
        // meta: { title: '表单', icon: 'form', roles: ['admin'] }
      },
      {
        path: 'game_state_wheel',
        name: 'game_state_wheel',
        component: () => import('@/views/tbGameState/gameStateWheel'),
        meta: { title: '轮盘日志', icon: 'form' }
        // meta: { title: '表单', icon: 'form', roles: ['admin'] }
      },
      {
        path: 'game_state_mail',
        name: 'game_state_mail',
        component: () => import('@/views/tbGameState/gameStateMail'),
        meta: { title: '邮件日志', icon: 'form' }
        // meta: { title: '表单', icon: 'form', roles: ['admin'] }
      },
      {
        path: 'game_state_sign_in',
        name: 'game_state_sign_in',
        component: () => import('@/views/tbGameState/gameStateSignIn'),
        meta: { title: '签到日志', icon: 'form' }
        // meta: { title: '表单', icon: 'form', roles: ['admin'] }
      },
      {
        path: 'game_state_clock_gold',
        name: 'game_state_clock_gold',
        component: () => import('@/views/tbGameState/gameStateClockGold'),
        meta: { title: '整点日志', icon: 'form' }
        // meta: { title: '表单', icon: 'form', roles: ['admin'] }
      },
      {
        path: 'game_state_vip_dole',
        name: 'game_state_vip_dole',
        component: () => import('@/views/tbGameState/gameStateVipDole'),
        meta: { title: 'VIP救济日志', icon: 'form' }
        // meta: { title: '表单', icon: 'form', roles: ['admin'] }
      },
      {
        path: 'game_state_lucky_wheel',
        name: 'game_state_lucky_wheel',
        component: () => import('@/views/tbGameState/gameStateLuckyWheel'),
        meta: { title: '幸运轮盘日志', icon: 'form' }
        // meta: { title: '表单', icon: 'form', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/user_data',
    component: Layout,
    redirect: '/user_data/user_data',
    meta: { title: '玩家数据', icon: 'form', roles: ['admin'] },
    children: [
      {
        path: 'user_data',
        name: 'user_data',
        component: () => import('@/views/tbUserData/userData'),
        meta: { title: '玩家数据', icon: 'form' }
        // meta: { title: '表单', icon: 'form', roles: ['admin'] }
      },
      {
        path: 'log_record',
        name: 'log_record',
        component: () => import('@/views/tbUserData/userLogRecord'),
        meta: { title: '玩家日志', icon: 'excel' }
        // meta: { title: '表单', icon: 'form', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/game_manager',
    component: Layout,
    redirect: '/game_manager/game_manager',
    meta: { title: '游戏管理', icon: 'example', roles: ['admin'] },
    children: [
      {
        path: 'notice',
        name: 'notice',
        component: () => import('@/views/tbGameManager/editNotice'),
        meta: { title: '游戏公告', icon: 'form' }
        // meta: { title: '表单', icon: 'form', roles: ['admin'] }
      },
      {
        path: 'tip',
        name: 'tip',
        component: () => import('@/views/tbGameManager/editTip'),
        meta: { title: '跑马灯', icon: 'table' }
        // meta: { title: '表单', icon: 'form', roles: ['admin'] }
      },
      {
        path: 'user_confine',
        name: 'user_confine',
        component: () => import('@/views/tbGameManager/userConfine'),
        meta: { title: '封号名单', icon: 'chart' }
        // meta: { title: '表单', icon: 'form', roles: ['admin'] }
      },
      {
        path: 'mail',
        name: 'mail',
        component: () => import('@/views/tbGameManager/editMail'),
        meta: { title: '邮件', icon: 'excel' }
        // meta: { title: '表单', icon: 'form', roles: ['admin'] }
      },
      {
        path: 'ip',
        name: 'ip',
        component: () => import('@/views/tbGameManager/editWhiteIp'),
        meta: { title: 'IP白名单', icon: 'chart' }
        // meta: { title: '表单', icon: 'form', roles: ['admin'] }
      }
    ]
  },
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
        path: 'dash',
        name: 'dash',
        component: () => import('@/views/dash/index'),
        meta: { title: 'dash', icon: 'tree' }
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


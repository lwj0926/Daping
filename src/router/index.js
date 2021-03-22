import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '@/layout'

Vue.use(Router)

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-admin-template-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin', 'admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [

  // {
  //   path: '/',
  //   // component: () => import('@/views/login/index'),
  //   redirect: '/login',
  //   hidden: true
  // },
  // {
  //   path: '/login',
  //   component: () => import('@/views/login/index'),
  //   hidden: true
  // }
  {
    path: '/',
    component: () => import('@/views/login/index'),
    redirect: '/login',
    children: [{
      path: '/login',
      component: () => import('@/views/login/index'),
      hidden: true
    }]
  },

  // ]

  // export const asyncRoutes = [
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     name: 'Dashboard',
  //     component: () => import('@/views/dashboard/index'),
  //     meta: { title: '首页', icon: 'el-icon-data-line' }
  //   },
  //   {
  //     path: 'dashboardtwo',
  //     name: 'dashboardtwo',
  //     component: () => import('@/views/dashboard/indexTwo'),
  //     meta: { title: '二级首页', icon: 'el-icon-data-line' }
  //   }]
  // },
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/indexTwo',
    meta: { roles: ['admin', 'admin-level2', 'user-level2', 'admin-level3', 'user-level3'] },
    // component: () => import('@/views/dashboard/index'),

    children: [{
      path: 'index',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'el-icon-data-line', roles: ['admin', 'admin-level3', 'user-level3'] }
    },
    {
      path: 'indextwo',
      name: 'indextwo',
      component: () => import('@/views/dashboard/indexTwo'),
      meta: { title: '首页', icon: 'el-icon-data-line', roles: ['admin', 'admin-level2', 'user-level2'] }
    }]
  },
  {
    path: '/product',
    component: Layout,
    redirect: '/product/list',
    name: 'product',
    meta: { title: '生产管理', icon: 'el-icon-s-operation', roles: ['admin', 'admin-level2', 'user-level2', 'admin-level3', 'user-level3'] },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/product/list'),
        meta: { title: '日报汇总', roles: ['admin', 'admin-level2', 'user-level2'] }
      },
      {
        path: 'edit',
        name: 'edit',
        component: () => import('@/views/product/edit'),
        meta: { title: '日报填报', roles: ['admin', 'admin-level2', 'user-level2', 'admin-level3', 'user-level3'] }
      }
    ]
  },
  {
    path: '/plan',
    component: Layout,
    redirect: '/plan/branch/month',
    name: 'plan',
    meta: { title: '计划管理', icon: 'el-icon-date', roles: ['admin', 'admin-level2', 'user-level2', 'admin-level3', 'user-level3'] },
    children: [
      {
        path: 'branch/month',
        name: 'branchMonth',
        component: () => import('@/views/plan/branch/month'),
        meta: { title: '分公司月计划', roles: ['admin', 'admin-level2', 'user-level2'] }
      },
      {
        path: 'branch/year',
        name: 'branchYear',
        component: () => import('@/views/plan/branch/year'),
        meta: { title: '分公司年计划', roles: ['admin', 'admin-level2', 'user-level2'] }
      },
      {
        path: 'upstream/edit',
        name: 'upstreamEdit',
        component: () => import('@/views/plan/upstream/edit'),
        meta: { title: '上游计划', roles: ['admin', 'admin-level3', 'user-level3'] }
      },
      {
        path: 'upstream/list',
        name: 'upstreamList',
        component: () => import('@/views/plan/upstream/list'),
        meta: { title: '上游计划汇总', roles: ['admin', 'admin-level2', 'user-level2'] }
      }
    ]
  },
  {
    path: '/report',
    component: Layout,
    redirect: '/report/download',
    name: 'report',
    alwaysShow: true,
    meta: { title: '报表管理', icon: 'el-icon-document', roles: ['admin', 'admin-level2', 'user-level2'] },
    children: [
      {
        path: 'download',
        name: 'download',
        component: () => import('@/views/report/download'),
        meta: { title: '生产日报', roles: ['admin', 'admin-level2', 'user-level2'] }
      }
    ]
  },
  {
    path: '/sys',
    component: Layout,
    redirect: '/sys/org',
    name: 'sys',
    meta: { title: '系统管理', icon: 'el-icon-s-tools', roles: ['admin', 'admin-level2'] },
    children: [
      {
        path: 'org',
        name: 'org',
        component: () => import('@/views/org'),
        meta: { title: '组织管理', roles: ['admin', 'admin-level2'] }
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/user'),
        meta: { title: '用户管理', roles: ['admin', 'admin-level2'] }
      }
    ]
  },
  {
    path: '/screen',
    component: () => import('@/views/screen/layout/index'),
    redirect: '/screen/home',
    hidden: true,
    children: [
      {
        path: '/screen/home', //component: () => import('@/views/screen/dashboard/index')
      },
      // { path: '/screen/guanxian', component: () => import('@/views/screen/guanxian/index') },

    ]

  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }

]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

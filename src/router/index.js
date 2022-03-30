import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/configurations',
    component: Layout,
    redirect: '/configurations',
    children: [
      {
        path: '',
        component: () => import('@/views/Configurations/index'),
        hidden: false,
        meta: { title: 'Configurations', icon: 'el-icon-s-tools', noCache: true }
      }
    ]
  },
  // {
  //   path: '/profile',
  //   component: Layout,
  //   redirect: '/profile/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/profile/index'),
  //       name: 'Profile',
  //       meta: { title: 'Profile', icon: 'user', noCache: true }
  //     }
  //   ]
  // },
  // Users
  {
    path: '/users',
    component: Layout,
    redirect: '/users',
    children: [
      {
        path: '',
        component: () => import('@/views/Users/index.vue'),
        name: 'Users',
        meta: { title: 'Users', icon: 'el-icon-user-solid', noCache: true }
      },
      {
        path: 'add',
        component: () => import('@/views/Users/Create.vue'),
        name: 'Add User',
        hidden: true,
        meta: { title: 'Add User', icon: 'user', noCache: true }
      },
      {
        path: 'update/:id',
        component: () => import('@/views/Users/Update.vue'),
        name: 'Update User',
        hidden: true,
        meta: { title: 'Update User', icon: 'user', noCache: true }
      },
      {
        path: ':id',
        component: () => import('@/views/Users/Read.vue'),
        name: 'User Detail',
        hidden: true,
        meta: { title: 'User Detail', icon: 'user', noCache: true }
      }
    ]
  },
  // Bookings
  {
    path: '/bookings',
    component: Layout,
    redirect: '/bookings',
    children: [
      {
        path: '',
        component: () => import('@/views/Bookings/index.vue'),
        name: 'Bookings',
        meta: { title: 'Bookings', icon: 'el-icon-s-grid', noCache: true }
      },
      {
        path: 'add/:userId',
        component: () => import('@/views/Bookings/Create.vue'),
        name: 'Add Booking',
        hidden: true,
        meta: { title: 'Add User', icon: 'user', noCache: true }
      },
      {
        path: 'update/:id',
        component: () => import('@/views/Bookings/Update.vue'),
        name: 'Update Booking',
        hidden: true,
        meta: { title: 'Update Booking', icon: 'user', noCache: true }
      }
    ]
  },
  // Invoices
  {
    path: '/invoices',
    component: Layout,
    redirect: '/invoices',
    children: [
      {
        path: '',
        component: () => import('@/views/Invoices/index.vue'),
        name: 'Invoices',
        meta: { title: 'Invoices', icon: 'el-icon-document', noCache: true }
      },
      {
        path: ':id',
        component: () => import('@/views/Invoices/Read.vue'),
        name: 'Read Invoice',
        hidden: true,
        meta: { title: 'Read Invoice', icon: 'el-icon-user-solid', noCache: true }
      },
      // {
      //   path: 'add/:userId',
      //   component: () => import('@/views/Bookings/Create.vue'),
      //   name: 'Add Booking',
      //   hidden: true,
      //   meta: { title: 'Add User', icon: 'user', noCache: true }
      // },
      // {
      //   path: 'update/:id',
      //   component: () => import('@/views/Bookings/Update.vue'),
      //   name: 'Update Booking',
      //   hidden: true,
      //   meta: { title: 'Update Booking', icon: 'user', noCache: true }
      // }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
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

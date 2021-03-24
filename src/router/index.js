import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';
import permission from '@/utils/permission';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/component/login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页',
      hidden: false,
    },
    children: [
      {
        path: '/index',
        name: 'Index',
        meta: {
          title: '统计',
          hidden: false,
          icon: 'book',
        },
        component: () => import('@/views/page/Index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      hidden: true,
    },
    component: Login,
  },
];

const ansyncRouter = [
  {
    path: '/product',
    name: 'Product',
    meta: {
      title: '商品',
      hidden: false,
    },
    component: () => import('@/views/layout/Home.vue'),
    children: [
      {
        path: 'list',
        name: 'ProductList',
        meta: {
          title: '商品列表',
          hidden: false,
          icon: 'appstore',
        },
        component: () => import('@/views/page/ProductList.vue'),
      },
      {
        path: 'add',
        name: 'ProductAdd',
        meta: {
          title: '商品添加',
          hidden: false,
          icon: 'cloud',
        },
        component: () => import('@/views/page/ProductAdd.vue'),
      },
      {
        path: 'edit/:id',
        name: 'ProductEdit',
        meta: {
          title: '商品编辑',
          hidden: true,
        },
        component: () => import('@/views/page/ProductAdd.vue'),
      },
      {
        path: 'category',
        name: 'Category',
        meta: {
          title: '商品类别',
          hidden: false,
        },
        component: () => import('@/views/page/ProductCategory.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

let flag = false;

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.userInfo.username && store.state.userInfo.appkey) {
      if (!flag) {
        const allowRouter = permission(store.state.userInfo.role, ansyncRouter);
        store.dispatch('addRouter', routes.concat(allowRouter)).then(() => {
          router.addRoutes(allowRouter);
          next();
        });
        // console.log(store.state.menuRouters);
        flag = true;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});
export default router;

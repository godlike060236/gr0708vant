import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index,
        redirect: '/product',
        children: [
            {
                path: '/product',
                name: 'Product',
                component: () => import('../views/product')
            },
            {
                path: '/cart',
                name: 'Cart',
                component: () => import('../views/cart')
            },
            {
                path: '/person',
                name: 'Person',
                component: () => import('../views/person')
            },
            {
                path: '/classify',
                name: 'Classify',
                component: () => import('../views/classify'),
            },
        ]
    },
    {
        path: '/search',
        name: 'Search',
        component: () => import('../views/search')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
    },
    {
        path: '/detail',
        name: 'Detail',
        component: () => import('../views/product/detail')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login')
    },
    {
        path: '/userInfo',
        name: 'UserInfo',
        component: () => import('../views/person/UserInfo')
    },
    {
        path: '/registration',
        name: 'Registration',
        component: () => import('../views/login/registration')
    },
    {
        path: '/forgotPassword',
        name: 'ForgotPassword',
        component: () => import('../views/login/forgotPassword')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

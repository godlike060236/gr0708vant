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
    {
        path: '/address',
        name: 'Address',
        component: () => import('../views/person/address')
    },
    {
        path: '/addressEdit',
        name: 'AddressEdit',
        component: () => import('../views/person/addressEdit'),
        // 如果props设置为true，$route.params将被设置为组件属性
        //props: true
    },
    {
        path: '/order',
        name: 'Order',
        component: () => import('../views/order')
    },
    {
        path: '/orderAddress',
        name: 'OrderAddress',
        component: () => import('../views/order/address')
    },
    {
        path: '/orderAddressEdit',
        name: 'OrderAddressEdit',
        component: () => import('../views/order/addressEdit')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

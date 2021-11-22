import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '@/views/home';
import search from '@/views/search';
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: home,
    },
    {
        path: '/search',
        name: 'search',
        component: search,
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;

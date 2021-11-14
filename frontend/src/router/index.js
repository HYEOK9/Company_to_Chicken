import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '@/views/home';
import search from '@/views/search';
import result from '@/views/result';
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
    {
        path: '/search/result',
        name: 'result',
        component: result,
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;

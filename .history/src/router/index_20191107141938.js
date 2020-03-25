import Vue from 'vue'
import Router from 'vue-router'
import index from '@/page/index'
import DriverBinding from '@/page/DriverBinding'
import BindingSuccess from '@/page/BindingSuccess'
import ClientBinding from '@/page/ClientBinding'
import OpenIdLoding from '@/page/OpenIdLoding'
import Detile from '@/page/Detile'

Vue.use(Router)


const router = new Router({
    mode: 'hash',
    base: '/Weixin/vue/',
    routes: [{
            path: '/index',
            name: 'index',
            meta: {
                title: '首页'
            },
            component: index
        },
        {
            path: '/DriverBinding',
            name: 'DriverBinding',
            meta: {
                title: '司机绑定app'
            },
            component: DriverBinding
        },
        {
            path: '/BindingSuccess',
            name: 'BindingSuccess',
            meta: {
                title: '绑定成功'
            },
            component: BindingSuccess
        },
        {
            path: '/ClientBinding',
            name: 'ClientBinding',
            meta: {
                title: '客户绑定'
            },
            component: ClientBinding

        },
        {
            path: '/OpenIdLoding',
            name: 'OpenIdLoding',
            meta: {
                title: 'OpenId获取'
            },
            component: OpenIdLoding

        },
        {
            path: '/Detile',
            name: 'Detile',
            meta: {
                title: 'OpenId获取'
            },
            component: Detile

        }


    ]
});
router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});
export default router;
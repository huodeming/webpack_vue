
import VueRouter from 'vue-router';
//3.创建并导入 要用的 vue 组件.
import account from './main/Account.vue';
import goodslist from './main/GoodsList.vue';
import login from './main/login.vue';
import reg from './main/reg.vue';

//4.创建路由对象
var router = new VueRouter({
    routes: [
        {
            path: '/account', 
            component: account,
            children:[
                {path: 'login', component: login},
                {path: 'reg', component: reg}
            ]
        },
        {path: '/goodslist', component: goodslist}
    ]
});
//把router暴露出去.
export default router;
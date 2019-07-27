
/**
 * 得到的只是运行时包,注意, 这样在导入的Vue构造函数功能不完整,只提供了 runtime-only 的方式,并没有提供网页中用javascript标签导入那样的功能.
 * 回顾包的查找规则:
 *  1.找项目根目录中有没有node_modules目录,
 *  2.在node_modules目录中,找对应的文件夹,如 vue
 *  3.在vue目录中,找package.json的包配置文件.
 *  4.在package.json文件中,查找main属性[它是入口,指定了这个包在被加载时加载的文件]
 *  综上所述,如果我们想加载Vue时,加载完整功能的vue,可以
 *      1.改node_modules/vue/package.json文件中的 main属性值.
 *      2.可以在这直接引入完整功能的vue文件.
            //import Vue from 'vue';
            import Vue from '../node_modules/vue/dist/vue.js';
 *      3.按第1点设置(import Vue from 'vue'),然后在webpack.config.js文件中增加一个配置项,开发时有个缺点,一改配置文件,就要重启项目
            resolve: {
                alias: {
                    //修改vue被导入时候包的路径.
                    "vue$": "vue/dist/vue.js"
                }
            }
 * 
 */
//import Vue from 'vue';
//import Vue from '../node_modules/vue/dist/vue.js';

//var login = {template: "<h2>这是login组件,是使用网页中的形式创建出来的组件</h2>"};
import Vue from 'vue';
/**
 * 导入login组件,会出问题,因为webpack无法打包.vue文件,需安装相关loader 及依赖项.
 *  安装: 
 *      npm i vue-loader vue-template-compiler -D 
 *  配置:webpack.config.js文件下,如果是早期版本(V15之前,不包含,如"vue-loader": "^13.3.0",),前2项配置可以不写,只需配置路由规则就行了.
 *      1.const VueLoaderPlugin = require('vue-loader/lib/plugin')
 *      2.plugins:[new VueLoaderPlugin(),],
 *      3.module: {rules: [{test: /\.vue$/, use: 'vue-loader'},],}
 * 不管怎么样,vue的runtime-only下,组件不能通过实例把它放到页面上,如:components:{login} 它在浏览器中就会报错.
 * 此时,我们可以通过实例的render 把组件放到页面上.但要注意,render会直接替换掉#app的所有内容.包括#app这个标签.
 * 
 */

import login from './login.vue';

var vm = new Vue({
    el:'#app',
    data: {
        msg: '123'
    },
    methods: {},
    //可以简写成箭头函数.c是形参,当代码只有一行时,大括号可以省略不写,不写return,它默认就是return.
    render: c => c(login),
    /* render: function(createElements){
        return createElements(login);
    }, */
/*      components:{
        login
    }  */

});
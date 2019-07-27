
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

import Vue from 'vue';
import login from './login.vue';

var vm = new Vue({
    el:'#app',
    data: {
        msg: '123'
    },
    methods: {},
    //可以简写成箭头函数.c是形参,当代码只有一行时,大括号可以省略不写,不写return,它默认就是return.
    render: c => c(login),
    // render: function(createElements){
    //     return createElements(login);
    // },
    // components:{
    //     login
    // }

}); 


/**
 * 总结梳理: webpack中如何使用vue===============================================================
 * 1. 安装vue包, npm i vue -S
 * 2. 由于在webpack中,推荐使用.vue 后缀名组件模板文件文件定义组件,需要安装 loader 加载器, npm i vue-loader vue-template-compiler -D 
 * 3. 配置vue-loader : v15以后分三步:
 *      1.const VueLoaderPlugin = require('vue-loader/lib/plugin')
 *      2.plugins:[new VueLoaderPlugin(),],
 *      3.module: {rules: [{test: /\.vue$/, use: 'vue-loader'},],}
 * 4. 在main.js中.导入vue模块: import Vue from 'vue';
 * 5. 新建一个文件为.vue后缀的组件,如 login.vue 文件中由三部分组成: <template></template> <script></scrtip> <style></style>
 * 6. 在main.js中,导入这个组件, import login from './login.vue';
 * 7. 在main.js中,创建一个vm实例, var vm = new Vue({el:'#app',render:c => c(login)});
 * 8. 在index.html中创建一个id为app的元素,作为 vm 实例要控制的区域;
 * 
 * 
 */

/**
 * 关于开发规范问题,注意下面两种规范,统一用一种  我们选择ES6方式.
 * 在ES6中,与Node一样,也通过规范的形式,规定了如何 导入 和 导出 模块
 *  1.使用export 模块名称 from '模块标识符'     或不要模块名称导入    import '路径'
 *  2.使用 export default 和 export 向外暴露成员
 * 
 * 在Node中
 *  1.使用 var 名称 = require('标块标识符');
 *  2.使用 module.exports  和 exports 来暴露成员
 * 
 * 我们创建js/test.js来演示
 */


//注意:一个模块中文件中,只允许用export default一次,如果想暴露多个成员,可以使用export来暴露多个成员.
//import huodeming from './js/test.js';
//console.log(huodeming);//成功输出对象.

//export使用方法如下,注意:export暴露的成员可以按需导出.export导出的成员,必须按原名名来使用,但也可以用(原名 as 别名)的方式来改名.
import huodeming, { title, name as aa } from './js/test.js';
console.log(huodeming);//成功输出对象.
console.log(title);
console.log(aa);



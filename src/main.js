
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
import Vue from '../node_modules/vue/dist/vue.js';



var vm = new Vue({
    el:'#app',
    data: {
        msg: '123'
    },
    methods: {},

});
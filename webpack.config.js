const path = require('path');
const webpack = require('webpack');

const VueLoaderPlugin = require('vue-loader/lib/plugin')

const htmlWebpackPlugin = require('html-webpack-plugin');
//这个配置文件,其实就是一个JS文件,通过 Node 的的模块操作,向外暴露了一个配置对象.
module.exports = {
    //指定webpack运行模式,新版本才不会出警告!!!!!!!!!!!!!!!!!!!!!!!!!!
    mode: 'development',
    //在配置文件中,需要手动指定入口 与  出口.
    //入口
    entry: path.join(__dirname, './src/main.js'),
    //输出文件相关配置
    output:{
        path: path.join(__dirname, './dist/'),
        filename: 'bundle.js',
    },
    devServer: {
        open: true,
        port: 3000,
        //contentBase: 'src',
        hot: true
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            //指定模板页面
            template: path.join(__dirname, './src/index.html'),
            //指定生成的页面
            filename: 'index.html'
        }),
        new VueLoaderPlugin(),
    ], 
    module: {
        rules: [
            {test: /\.css$/, use: ['style-loader','css-loader']},
            {test: /\.less$/, use: ['style-loader','css-loader','less-loader']},
            {test: /\.scss$/, use: ['style-loader','css-loader','sass-loader']},
            {test: /\.(jpeg|jpg|jpe|gif|png|bmp)$/, use: 'url-loader?limit=20877'},
            {test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader'},
            {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},
            {test: /\.vue$/, use: 'vue-loader'},
        ],
    },
    resolve: {
        alias: {
            //修改vue被导入时候包的路径.
            //"vue$": "vue/dist/vue.js"
        }
    }
}
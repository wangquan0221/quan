// 这是webpack 的配置文件

const path = require("path")

const webpack = require("webpack")

const htmlWebpackPlugin = require("html-webpack-plugin");

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    // 入口
    entry: path.join(__dirname,"/src/main.js"),

    // 出口
    output:{
        path:path.join(__dirname,"/dist"),
        filename: "bundle.js"
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            template:path.join(__dirname,"./src/index.html"),
            filename:"index.html"
        }),
        new VueLoaderPlugin()
    ],

    // 模式
    mode:"development",
    module:{
        rules:[
            { test: /\.css$/,use: ["style-loader","css-loader"]},
            { test: /\.less$/,use: ["style-loader","css-loader","less-loader"]},
            { test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader?limit=205,556&name=[hash:8]-[name].[ext]'},
            //处理字体的loader
            { test:/\.(ttf|eot|svg|woff|woff2)$/,use:"url-loader"},
            { test:/\.js$/,use: ['babel-loader'],exclude:/node_module/},
            { test:/\.vue$/,use:"vue-loader"}
        ]
    },

    resolve:{
        alias:{
            "vue$" : "vue/dist/vue.js"
        }
    }


}
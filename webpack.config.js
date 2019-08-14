const path = require('path');

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        inject: true,
        hash: true,
        chunks: ['common', name]
    }
};

// webpack config
var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    externals: {
        'jquery': 'window.jQuery'
    },
    module: {
        // loaders: [
        //     { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader", "less-loader") }
        // ]
        rules:[
            {
                test:/\.css$/,
                //注意：这里还需要更改一下
                use:ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    },
    plugins: [
        // 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        // 把css单独打包到文件
        new ExtractTextPlugin('css/[name].css'),
        // html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login'))
    ]
};

module.exports = config;
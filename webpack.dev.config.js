const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const baseConfig = require('./webpack.base.config');

const devConfig = {
    mode: "development",
    entry: [
        "@babel/polyfill",
        "react-hot-loader/babel",
        path.join(__dirname, 'src/index.js')
    ],
    output: {
        /*这里本来应该是[chunkhash]的，但是由于[chunkhash]和react-hot-loader不兼容。只能妥协*/
        filename: '[name].[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
        ]
    },
    devtool: 'inline-source-map',

    // 配置开发环境下的本地服务器
    devServer: {
        port: 8088,
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: true,
        // host: '0.0.0.0',
        proxy: {
            "/api/*": "http://localhost:8088/"
        }
    },

};

module.exports = merge(baseConfig, devConfig);

/////////////////////////////////////////////////////////////////////

// const path = require('path');
// const webpack = require('webpack');
// //处理模板html自动引入JS
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// //js压缩插件
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// module.exports = {
//     mode: "development",
//     entry: [
//         "@babel/polyfill",
//         "react-hot-loader/babel",
//         path.join(__dirname, 'src/index.js')
//     ],
//     output: {
//         path: path.resolve(__dirname, 'dist'), //输出文件的路径
//         filename: '[name].[hash].js', //输出的文件名
//         chunkFilename: '[name].[chunkhash].js'
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.(js|jsx)?$/,
//                 exclude: /node_modules/,
//                 loader: "babel-loader"
//             },
//             {
//                 test: /\.css$/,
//                 use: [
//                     'style-loader',
//                     'css-loader'
//                 ]
//             },
//             {
//                 test: /\.(png|jpg|gif)$/,
//                 use: [{
//                     loader: 'url-loader',
//                     options: {
//                         limit: 8192
//                     }
//                 }]
//             }
//         ]
//     },
//     devtool: 'inline-source-map',

//     // 配置开发环境下的本地服务器
//     devServer: {
//         port: 8088,
//         contentBase: path.join(__dirname, './dist'),
//         historyApiFallback: true,
//         // host: '0.0.0.0',
//         proxy: {
//             "/api/*": "http://localhost:8088/"
//         }
//     },

//     // 文件路径优化
//     resolve: {
//         alias: {
//             views: path.join(__dirname, 'src/views'),
//             components: path.join(__dirname, 'src/components'),
//             router: path.join(__dirname, 'src/router'),
//             actions: path.join(__dirname, 'src/redux/actions'),
//             reducers: path.join(__dirname, 'src/redux/reducers'),
//         }
//     },
    
//     plugins: [
//         /**
//          * chunks 代码块,vendor 为固定静态资源splitChunks配置,各个模板的入口 对应entry入口模块
//          */
//         new HtmlWebpackPlugin({
//             filename: 'index.html',
//             template: 'src/index.html',
//         }),
//     ]
// };
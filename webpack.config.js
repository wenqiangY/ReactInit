
const path = require('path');
const webpack = require('webpack');
// 处理模板html自动引入JS
const HtmlWebpackPlugin = require('html-webpack-plugin');
// js压缩插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// 每次打包清空dist目录
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 抽离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
module.exports = {
    mode: "production",
    entry: [
        "react-hot-loader/babel",
        path.join(__dirname, 'src/index.js')
    ],
    output: {
        path: path.resolve(__dirname, 'dist'), //输出文件的路径
        filename: '[name].[hash].js', //输出的文件名
        chunkFilename: '[name].[chunkhash].js'
    },
    module: {
        rules: [{
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(sa|sc|le|c)ss$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            }
        ]
    },

    // 文件路径优化
    resolve: {
        alias: {
            views: path.join(__dirname, 'src/views'),
            components: path.join(__dirname, 'src/components'),
            router: path.join(__dirname, 'src/router'),
            actions: path.join(__dirname, 'src/redux/actions'),
            reducers: path.join(__dirname, 'src/redux/reducers'),
        }
    },
    /**
     * 一些优化配置
     */

    plugins: [
        new CleanWebpackPlugin(),
        new UglifyJsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        /**
         * chunks 代码块,vendor 为固定静态资源splitChunks配置,各个模板的入口 对应entry入口模块
         */
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
        new webpack.HashedModuleIdsPlugin(),
    ],
    // 抽离公共的不会更改的模块(react,react-router...),不在更改名称从而使用户不必多次缓存同样的代码
    optimization: {
        splitChunks: { //分割代码块

            cacheGroups: { //缓存组 缓存公共代码

                commons: { //公共模块 
                    name: "commons",
                    chunks: "initial", //入口处开始提取代码
                    minSize: 0, //代码最小多大，进行抽离
                    minChunks: 2, //代码复 2 次以上的抽离
                },
                // vendor:{    //比较优雅的分离打包配置：将重复引入的第三方包抽离出来
                //     priority:1,     //优先级
                //     test:/node_modules/,    //引用的代码包位置
                //     chunks:'initial',   //代码入口
                //     minSize:0,      //代码最小大小 
                //     minChunks:2  //最少引用次数
                // }
                vendors: {
                    test: /node_modules/,
                    name: 'vendors',
                    minSize: 0,
                    minChunks: 1,
                    chunks: 'initial',
                    priority: 1 // 该配置项是设置处理的优先级，数值越大越优先处理 
                }
            }
        }
    }
};
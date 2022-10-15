const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinCssExtractPlugin = require('mini-css-extract-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const JavaScriptObfuscator = require('webpack-obfuscator'); // 对打包后输出的dist中的js文件进行加密
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const normalCssLoader = (extractLoader) => {
    return extractLoader ?  [
        MinCssExtractPlugin.loader,
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins:[
                    'postcss-preset-env'
                ]
              },
            },
        },
        extractLoader
    ]:[
        MinCssExtractPlugin.loader,
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins:[
                    'postcss-preset-env'
                ]
              },
            },
        },
    ]
}

module.exports = {
    // mode:'production',//会对代码进行压缩
    mode:'development',
    // entry:'./src/index.js',//打包的入口文件
    entry:{
        main:path.resolve(__dirname,'src/index.js')
    },
    output:{
        filename:'js/bundle.js',//打包输出文件的文件名
        path: path.resolve(__dirname,'dist'),//打包输出文件位置
        clean: true ,//是否开启每次打包自动清除上一次打包的资源
        assetModuleFilename:"static/media/[hash:10][ext][query]"//一些媒体资源
    },
    //开启webpack5的缓存机制，对于提升非首次的打包速度很明显
    // cache: {
    //     type: 'filesystem'
    // },
    module:{
        rules:[
            {
                test:/\.css$/i,
                use:normalCssLoader()
            },
            {
                test:/\.less$/i,
                use:normalCssLoader('less-loader')
            },
            {
                test:/\.s[a|c]ss$/i,
                use:normalCssLoader('sass-loader')
            },
            {
                test:/\.m?js$/,
                exclude:[/node_modules/],
                use:[
                    // 'thread-loader', // 开启多线程
                    {
                        loader:'babel-loader',
                        options:{
                            presets:['@babel/preset-env']
                        }
                    }
                ]
            }
        ]
    },
    externals:{
        echarts: 'echarts'
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'src/index.html')//以自己定义的html为模版生成html
        }),
        new MinCssExtractPlugin({
            filename:'css/[name].css' //编译css到一个独立的文件，可以避免打包后页面的闪现（会以link方式引入css）
        }),
        new EslintWebpackPlugin(),// eslint检测需要有eslintrc.js配置文件
        new CssMinimizerPlugin(), // css压缩
        // new JavaScriptObfuscator(),
        // new BundleAnalyzerPlugin({
        //     analyzerPort:3004,
        //     openAnalyzer:false
        // })
    ],
    optimization:{
        usedExports:true,
        minimize:true,
        //对一些动态引入的资源进行拆分打包
        // splitChunks:{
        //     chunks:'all'
        // }
    },
    devtool:'eval',
    //webpack解析模块时加载的选项
    resolve:{
        //会自动补全文件后缀
        extensions:['.js','.jsx','.json']
    },
    devServer:{
        host:'localhost',
        port:30001,
        open:true,
        hot:true,
        historyApiFallback:true //解决前段路由刷新404的问题
    }
}
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// const _cleanwebpackplugin = require('clean-webpack-plugin');
// const CleanWebpackPlugin = _cleanwebpackplugin.CleanWebpackPlugin;

module.exports = {
    entry: {
        "app.bundle": './src/app.js',
        'contact':'./src/contact.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].[chunkhash].js'
    },
    devServer: {
        port: 8999,
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:'Custom template',
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                collapseWhitespace: true,
            },
            hash: true,
            chunks:['app.bundle']
        }),
        new HtmlWebpackPlugin({
            title:'contact page',
            template: './src/contact.html',
            filename: 'contact.html',
            minify: {
                collapseWhitespace: true,
            },
            hash: true,
            excludeChunks:['app.bundle']
        }),
        new ExtractTextPlugin('style.css'),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [{
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: ['css-loader', 'sass-loader']
                })
            },
            // 这两行是处理 react 相关的内容
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }
};
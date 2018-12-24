const webpack = require("webpack");
const { readFileSync } = require("fs");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const indexContent = readFileSync("./public/index.html");

module.exports = {
    mode: "development",
    target: "web",
    devtool: 'inline-source-map',
    entry: {
        index: "./src/index.tsx",
        ltr: "./src/components/index-ltr.scss",
        rtl: "./src/components/index-rtl.scss",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".scss"]
    },
    output: {
        path: `${__dirname}/public/assets`,
        filename: "[name].js"
    },
    module: {
        rules: [{
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    // fallback: 'style-loader',
                    use: [
                        { use: 'css-loader' },
                        { use: 'sass-loader' },
                        // { loader: 'postcss-loader', options: { parser: 'sugarss', exec: true } }
                    ]

                })
            },
            {
                test: /\.js$/,
                loader: `babel-loader`,
                exclude: /node_modules\/(?!(@vesta)\/).*/,
                query: {
                    presets: [
                        ["@babel/env", { "modules": false }]
                    ]
                }
            },
            {
                test: /\.tsx?$/,
                use: ["ts-loader"]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(`${__dirname}/public/assets`),
        new ExtractTextPlugin({
            filename: `[name].css`,
            // allChunks: true,
        }),
        new HtmlWebpackPlugin({
            title: "Testing Title",
            template: "./public/index.html"
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    optimization: {
        minimize: false,
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            name: true,
            cacheGroups: {
                commons: { test: /[\\/]node_modules[\\/]/, name: "lib", chunks: "all" }
            }
        },
    },
    devServer: {
        contentBase: `${__dirname}/public`,
        publicPath: '/assets/',
        compress: true,
        disableHostCheck: true,
        historyApiFallback: true,
        host: "localhost",
        hot: true,
        https: false,
        inline: true,
        overlay: true,
        watchContentBase: true,
    }
};
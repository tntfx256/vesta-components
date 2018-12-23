const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    mode: "development",
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
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
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
                use: [{
                    loader: "ts-loader",
                    options: {}
                }]
            },
        ]
    },
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
    plugins: [
        new ExtractTextPlugin({
            filename: `[name].css`,
            allChunks: true,
        }),
    ],
    devServer: {
        contentBase: `${__dirname}/public`,
        compress: true,
        host: "localhost",
        hot: true,
        hotOnly: true,
        https: false,
        open: true,
        overlay: true,
        port: 9000,
        watchContentBase: true,
    }
};
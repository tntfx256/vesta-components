const webpack = require("webpack");

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
        path: `${__dirname}/dist`,
        filename: "[name].js"
    },
    module: {
        rules: [{
                test: /\.scss$/,
                use: [{
                    loader: "sass-loader",
                    options: {
                        // includePaths: [`${__dirname}/components/index-ltr.scss`, `${__dirname}/components/index-rtl.scss`] 
                    }
                }]
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
        // noEmitOnErrors: true,
        namedChunks: true,
        namedModules: true,
        splitChunks: {
            // chunks: "all",
            // minChunks: 1,
            cacheGroups: {
                commons: { test: /[\\/]node_modules[\\/]/, name: "lib", chunks: "all" }
            }
        },

    },
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "lib",
        //     minChunks: Infinity,
        // })
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
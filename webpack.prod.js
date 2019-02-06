const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename:  '[hash].css',
            chunkFilename: '[hash].css',
        }),
        new ngAnnotatePlugin({
            add: true,
            // other ng-annotate options here
        })
    ],
 
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: '../'
                        }
                    },
                    "css-loader"
                ]
            },
        ]
    }
});

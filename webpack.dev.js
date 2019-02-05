
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    resolve:{
        extensions:['.ts','.js','.html','.css']
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader'},
            { test: /\.html$/, loader: "html-loader" },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=10000'}
        ]
    },
});

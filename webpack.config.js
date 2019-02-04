const path = require("path");

module.exports = {
    mode:'development',
    context: path.join(__dirname,'src'),
    entry:'./app.ts',
    output:{
        path: path.join(__dirname,'dist'),
        filename: 'bundle.js'
    },
    resolve:{
        extensions:['.ts','.js','.html','.less']
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader'},
            { test: /\.html$/, loader: "html-loader" },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=10000'}
        ]
    },
    devServer: {
        inline: true,
        port: 3000,
        hot: true
      }

}
/**
 * Created by lizhe on 2016/5/23.
 */
var path = require('path');

module.exports = {
    entry: {
        index: './src/index.jsx',
        login: './src/login.jsx'
    },
    output: {
        path: path.join(__dirname, '/public/dist'),
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader'
        }, {
            test: /\.jsx$/,
            loader: 'babel-loader!jsx-loader?harmony'
        }]
    }
}
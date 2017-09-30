const path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        'babel-polyfill',
        './src/app',
        './src/main.scss',
        'webpack-dev-server/client?http://localhost:8080'
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './src')
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.(scss)$/,
                //exclude: /node_modules/,
                //SWITCH: for one css file
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader'
                }),
                //SWITCH: or for inline css
                /* use: [
                    {
                        loader: 'style-loader', // inject CSS to page
                    }, {
                        loader: 'css-loader', // translates CSS into CommonJS modules
                    }, {
                        loader: 'sass-loader' // compiles SASS to CSS
                    }] */
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin({ // define where to save the file
            filename: 'styles.css',
            allChunks: true,
        }),
    ],
    devServer: {
        contentBase: "./src"
    }
};
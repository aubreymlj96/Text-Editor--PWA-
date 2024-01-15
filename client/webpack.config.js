const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
module.exports = {
    mode: 'development',
    entry: {
        main: './src/js/index.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './index.html',
            title: 'Text-Editor'
        }),
        new InjectManifest({
            swSrc: './src/sw.js',
            swDest 'service-worker.js',
        }),
        new MiniCssExtractPlugin(),
        new WebpackPwaManifest({
            name: 'text-editor',
            short_name: 'Text-Editor',
            description: 'Use this to edit',
            background_color: 'blue',
            theme_color: 'blue',
            start_url: './',
            publicPath: './',
            icons:[
                {
                src: path.resolve('./client/favicon.ico'),
                sizes: [96, 128, 192, 256, 384, 512],
                destination: path.join('client', 'icons'),
                }
            ]
        })
    ],
    // TODO: Add CSS loaders and babel to webpack.
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.css$/i,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader', 
                    options: {
                        presents: ['@babel/present-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
                    }}
            }
        ]
    }
}



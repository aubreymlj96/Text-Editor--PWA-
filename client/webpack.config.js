const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
// const { MiniCssExtractPlugin } = require('css-loader');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
// const WorkboxPlugin = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
module.exports = {
    mode: 'development',
    entry: {
        main: './src/js/index.js',
        install: './src/js/install.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './index.html',
            title: 'Text-Editor'
        }),
        new InjectManifest({
            swSrc: './src-sw.js',
            swDest: 'src-sw.js',
        }),
        // new MiniCssExtractPlugin(),
        // new GenerateSW({
        //     // runtimeCaching: [{
        //     //     urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
        //     //     handler: 'CacheFirst',
        //     //     options: {
        //     //         cacheName: 'images'
        //     //     }
        //     // }]
        // }),
        new WebpackPwaManifest({
            name: 'text-editor',
            short_name: 'Text-Editor',
            description: 'Use this to edit',
            background_color: 'blue',
            theme_color: 'blue',
            start_url: '/',
            publicPath: '/',
            fingerprints: false,
            inject: true,
            icons:[
                {
                src: path.resolve('src/images/logo.png'),
                sizes: [96, 128, 192, 256, 384, 512],
                destination: path.join('assets', 'icons'),
                }
            ]
        })
    ],
    // TODO: Add CSS loaders and babel to webpack.
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', 
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
                    }}
            }
        ]
    }
}



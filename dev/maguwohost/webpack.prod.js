const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AutoPrefixer = require('autoprefixer');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const outputPath = './dist/';
const srcPath = './src/';

module.exports = merge(common, {
    mode: 'production',
    output: {
        path: path.join(__dirname, outputPath),
        filename: '[name].bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, outputPath),
        compress: true,
        hot: false,
        port: 8080
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin()
        ]
    },
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]',
                        },
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]',
                            limit: 10 * 1024
                        },
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [{ loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [AutoPrefixer()]
                        }
                    }, { loader: 'sass-loader' }]
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            path: path.join(__dirname, outputPath),
            filename: 'style.css'
        })
    ]
});

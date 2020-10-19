const path = require('path');
const autoprefixer = require('autoprefixer');
const css_mqpacker = require('css-mqpacker');
const copyWebpackPlugin = require('copy-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cssnano = require('cssnano');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/'
}

module.exports = {
    externals: {
        paths: PATHS,
    },
    entry: {
        app: `${PATHS.src}/js`,
    },
    output: {
        filename: `${PATHS.assets}js/[name].[hash].js`,
        path: PATHS.dist,
        publicPath: '/'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    chunks: 'all',
                    test: /node_modules/,
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [{
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]'
            }
        },{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/'
        },{
            test: /\.css$/,
            use: [
                "style-loader",
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: { sourceMap: true }
                },{
                    loader: "sass-loader",
                    options: { sourceMap: true }
                },{
                    loader: "postcss-loader",
                    options: { sourceMap: true, 
                        plugins: [
                            autoprefixer(
                                {
                                    browsers:['ie >= 8', 'last 3 version']
                                }
                            ),
                            css_mqpacker(),
                            cssnano()
                        ]
                    }
                }
            ]
        }, {
            test: /\.scss$/,
            use: [
                "style-loader",
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: { sourceMap: true }
                },{
                    loader: "sass-loader",
                    options: { sourceMap: true }
                },{
                    loader: "postcss-loader",
                    options: { sourceMap: true, 
                        plugins: [
                            autoprefixer(
                                {
                                    browsers:['ie >= 8', 'last 3 version']
                                }
                            ),
                            css_mqpacker(),
                            cssnano()
                        ]
                    }
                }
            ]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: `${PATHS.assets}css/[name].[hash].css`,
        }),
        new htmlWebpackPlugin({
            hash: false,
            template: `${PATHS.src}/index.html`,
            filename: './index.html'
        }),
        new copyWebpackPlugin({
            patterns: [
                {
                    from: `${PATHS.src}/static`, to: `${PATHS.dist}/static`
                },
                {
                    from: `${PATHS.src}/${PATHS.assets}/img`, to: `${PATHS.dist}/${PATHS.assets}img`
                }
            ]
        })
    ]
}

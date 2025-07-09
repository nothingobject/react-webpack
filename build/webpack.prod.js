const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')


module.exports = merge(baseConfig, {
    mode:process.env.NODE_ENV || 'production',
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(), // 去重压缩css
            new TerserPlugin({ // 压缩JS代码
                terserOptions: {
                    compress: {
                        drop_console: false, // 去除console
                    },
                },
            }), // 压缩JavaScript

        ],
    },
    plugins: [
        // new BundleAnalyzerPlugin(), // 打包分析插件
    ]

})
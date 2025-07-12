const path = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.js');


module.exports = merge(baseConfig, {
  mode: "development",
  devServer: {
    // static: {
    //     directory: path.join(__dirname, ''),
    // }, // 静态文件目录
    // compress: false, // 启用gzip压缩
    client: {
      overlay: false, //开发环境下的浏览器报错浮层（红色报错遮罩）是否显示
    },

    // 代理配置
    proxy: [
      {
        context: ["/api"],
        target: "http://localhost:3000",
        pathRewrite: { "^/api": "" },
        changeOrigin: true,
      },
    ],
    open: true, // 自动打开浏览器
    port: 8888, // 端口号
    hot: true, // 热更新
    historyApiFallback: true, // 当使用HTML5 History API时，所有的跳转将fallback到index.html
  },
  optimization: {
    // 优化配置
    splitChunks: {
      chunks: "all",
    },
  },
  devtool: "eval-cheap-module-source-map", // 源码调试模式,后面会讲
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
  ],
});

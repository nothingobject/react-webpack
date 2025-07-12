const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, "../src/index.js"),

    output: {
        filename: "[name].[hash:8].js",
        path: path.resolve(__dirname, "../dist"), // 打包后的目录
        publicPath: "/", // 当 publicPath 未设置或为空字符串时，Webpack 会生成相对路径的资源引用，跳转未定义的路径例如/home/notfound 时，浏览器会尝试从当前路径/home加载资源，导致404错误
    },

    // 其他配置
    resolve: {
        extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
            ".json",
            ".module.less",
            ".less",
        ],
        alias: {
            "@": path.resolve(__dirname, "../src"),
        },
        modules: ["node_modules"], // 指定Webpack在解析第三方模块时的搜索路径‌
        // 使用这些选项优化模块解析
        preferRelative: true, // 优先使用相对路径
        // mainFields: ['browser', 'module', 'main'], // 按顺序解析package.json中的字段
        symlinks: false, // 不解析符号链接
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.join(__dirname, "../src"),
                use: [
                    {
                        loader: "thread-loader",
                        options: {
                            workers: 4, // 设置线程数 (建议设置为 CPU 核心数的一半)
                        },
                    },
                    {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: false,
                        },
                    },
                ],
                exclude: /node_modules/, // 排除 node_modules 目录
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                namedExport: false,
                                localIdentName: "[name]__[local]___[hash:base64:5]", // 自定义类名格式
                            },
                        },
                    },
                    "postcss-loader",
                    "less-loader",
                ],
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, // 匹配图片文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    },
                },
                generator: {
                    filename: "static/images/[name][ext]", // 文件输出目录和命名
                },
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, // 匹配视频和音频文件
                type: "asset/resource",
                generator: {
                    filename: "static/videos/[name][ext]",
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // 匹配字体文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    },
                },
                generator: {
                    filename: "static/fonts/[name][ext]",
                },
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.join(__dirname, "../public/index.html"),
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash:8].css",
            chunkFilename: "chunk/[id].[contenthash:8].css",
        }),
        new CleanWebpackPlugin(),
    ],
};

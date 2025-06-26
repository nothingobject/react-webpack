# 从零搭建 react 模板 【React 18 + Webpack 5 + Antd 5 + React-Router 6 】

环境 node v18 +
## 前言

之前做项目都是用的现成的 umi 、 antd-pro 、create-react-app 等现成的 react 框架或脚手架，这次重新找工作打算沉淀一下 webpack 技术，前 2 天心血来潮打算构建一份可用的 react 基础脚手架，从webpack 初始化搞起，到配置 Babel、配置 Plugin，再到配置 react-router，用的基本都是目前主流的，也方便随时回头看，每一步在 README.md 都有对应的解析

## 项目目录

```
│  .babelrc
│  .gitignore
│  LICENSE
│  package.json
│  postcss.config.js
│  README.md
│  index.html
├─build
│  ├─webpack.base.js
│  ├─webpack.dev.js
│  └─webpack.prod.js
├─dist
├─mock
│  └─index.json
├─public
├─readmeimgs (仅供 readme 图片存储用)
└─src
    │  index.js
    │  global.less
    ├─components
    ├─pages
    ├─router
    ├─static
    ├─store
    └─utils
        utils.js
```


## 初始化项目

yarn init


## 配置webpack

### 安装 webpack 5

```json
yarn add webpack webpack-cli webpack-dev-server webpack-merge -D
```

### 出入口配置

```js
{
    entry: path.resolve(__dirname, "../src/*.js"),
    output: {
        filename: "[name].[hash:8].js",
        path: path.resolve(__dirname, "../dist"), // 打包后的目录
    },
}

```

### 配置 resolve模块解析

#### extensions

指定模块引入时不需要的扩展名，例如 .js、.jsx 等，这样在引入组件时可以省略

#### alias

配置模块的别名，可以简化模块的引用路径

```js
    resolve: {
        extensions: [".js", ".jsx", ".less", ".css"],
        alias: {
            "@": path.resolve(__dirname, "../src"),
        },
    },
```

例如：import Index from "../src/home/index.js|jsx"，可以写成 import Index from "@/home/index"，省略后缀名,简化路径

#### modules

配置解析模块时应该搜索的目录，默认是 ['node_modules']

```js
module.exports = {
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
};
```

#### mainFiles

配置在目录中优先解析的文件，默认是 ['index']

```js
module.exports = {
  resolve: {
    mainFiles: ['main', 'index'],
  },
};
```

#### mainFields

配置在寻找包时应该查找的字段，例如 ['browser', 'module', 'main']

```js
module.exports = {
  resolve: {
    mainFields: ['browser', 'module', ]
  },
};
```

### 配置loader(Less样式、图片等资源、js)

```json
yarn add less less-loader style-loader css-loader url-loader mini-css-extract-plugin postcss-loader autoprefixer -D
```

#### 处理js|jsx

```js
    rules:[
        {
            test: /\.(js|jsx)$/,
            include: path.join(__dirname, "../src"),
            use: [
                {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                    },
                },
            ],
        }
    ]

```

#### 处理less

```json
yarn add less less-loader style-loader css-loader postcss-loader autoprefixer -D
```

style-loader：将样式注入到html的 style 标签

css-loader：解析css文件，将CSS转化为CommonJS

postcss-loader：处理css中的css前缀，新版配置在postcss.config.js中，webpack 里仅保留名称即可

autoprefixer：自动添加css前缀，配置在postcss.config.js中

less-loader：将less编译成css

```js
    rules:[
        {
            test: /\.less$/,
            use: [
                "style-loader",
                "css-loader",
                "postcss-loader",
                "less-loader",
            ]
        },
        {
            test: /\.css$/,
            use: [
                "style-loader",
                "css-loader",
                "postcss-loader"
            ]
        },
    ]

```

#### 处理图片、视频、字体、文件等资源

webpack 5内置了 asset 资源处理功能，可以自动处理图片、视频、字体、文件等资源，无需额外配置模块

```js
rules:[
    {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, // 匹配图片文件
        type: "asset", // type选择asset
        parser: {
            dataUrlCondition: {
                maxSize: 10 * 1024, // 小于10kb转base64位
            }
        },
        generator:{ 
            filename:'static/images/[name][ext]', // 文件输出目录和命名
        },
    },
    {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, // 匹配视频和音频文件
        type: 'asset/resource', 
        generator: {
            filename: 'static/videos/[name][ext]',
        }
    },
    {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // 匹配字体文件
        type: "asset", // type选择asset
        parser: {
            dataUrlCondition: {
                maxSize: 10 * 1024, // 小于10kb转base64位
            }
        },
        generator: {
            filename: 'static/fonts/[name][ext]',
        }
    }
]
```

##### 注意

存在html 标签使用相对路径页面不显示问题
![alt text](./readmeimgs/image.png)
![alt text](./readmeimgs/image1.png)

在 webpack + react 的项目中，直接写相对路径无法被 webpack 的 loader 正确处理，最终打包后路径会失效，
正确做法：用 import 或 require 引入图片，视频同理

兼容处理方案：
![alt text](./readmeimgs/image2.png)
可自行探索尝试

### 配置Babel

Babel 是一个广泛使用的 JavaScript 编译器，主要用于将 ES6/ESNext 代码转换为向后兼容的 JavaScript 代码，以便在旧版浏览器或其他环境中运行。随着 Babel 的发展，从 Babel 6 到 Babel 7 发生了许多重大变化，特别是在配置方式和插件系统上，提到Babel版本的时候，通常是指@babel/core这个Babel核心包的版本

#### 安装

```json
yarn add babel-loader  @babel/core @babel/preset-react @babel/preset-env @babel/plugin-transform-runtime -D
```
<!-- babel-plugin-import  -->

#### babel-loader

用于将 ES6+ 语法转换为 ES5 语法，使代码在旧版本的浏览器中也能运行。例如对于我们项目中的jsx文件我们需要通过一个"转译器"将项目中的jsx文件转化成js文件，babel-loader在这里充当的就是这个转译器。

#### @babel/core

babel-loader仅仅识别出了jsx文件，内部核心转译功能需要@babel/core这个核心库，@babel/core模块就是负责内部核心转译实现的

#### @babel/preset-env

@babel/prest-env是babel转译过程中的一些预设，它负责将一些基础的es 6+语法，比如const/let...转译成为浏览器可以识别的低级别兼容性语法，但并不会对于一些es6+并没有内置一些高版本语法的实现比如Promise等polyfill，你可以将它理解为语法层面的转化不包含高级别模块(polyfill)的实现

#### @babel/plugin-transform-runtime

上边我们提到了对于一些高版本内置模块，比如Promise/Generate等等@babel/preset-env并不会转化，所以@babel/plugin-transform-runtime就是帮助我们来实现这样的效果的,他会在我们项目中如果使用到了Promise之类的模块之后去实现一个低版本浏览器的polyfill

1.减少重复代码
它会把一些 Babel 转换后常用的辅助函数（比如 _extends, _classCallCheck 等）提取到单独的模块里，避免每个文件都生成一份，减小打包体积。

2.避免全局污染
它会把 Promise、Symbol、Generator 等新特性用到的 polyfill 变成“局部引入”，不会污染全局对象，避免和第三方库冲突。

3.支持 async/await
配合 regenerator: true，可以让 Babel 正确转换 async/await 语法。



#### @babel/preset-react

是一组预设，内置了一系列babel plugin去转化jsx代码成为我们想要的js代码,可以将.jsx文件转化为js文件的同时将jsx标签转化为React.createElement的形式。

babel-loader + @babel/preset-react 一般一起使用，在webpack的构建过程中，babel-loader作为中间人，处理.js文件。当webpack遇到.js文件时，它会调用babel-loader来处理这些文件。babel-loader再调用Babel进行代码转译，最终返回给webpack继续打包过程‌



#### babel-plugin-import （版本不适用）

是 Babel 的插件，用于按需加载第三方库，减少项目大小。antd V5 采用了CSS-in-JS 本身具有按需加载的能力，因此无需使用 babel-plugin-import 来按需加载。

旧的一些Babel：

babel-plugin-import 用于按需加载第三方库，减少项目大小。antd V5 采用了CSS-in-JS 本身具有按需加载的能力，因此无需使用 

@babel/plugin-proposal-class-properties 用于支持 ES6 的类Class属性语法（已废弃）

@babel/plugin-transform-class-properties 是将类的属性（properties）提升至类的构造函数中，已预设在@babel/preset-env中（已淘汰）



#### Babel 6 配置

在 Babel 6 中，配置通常是通过 .babelrc 文件或 package.json 中的 babel 字段来完成的

##### .babelrc 文件

```json
{
    "presets": ["@babel/preset-env", "@babel/preset-react"],
    "plugins": ["@babel/plugin-transform-runtime"]
}
```


##### .package.json 文件

```json
{

  "babel": {
    "presets": ["@babel/preset-env", "@babel/preset-react"],
    "plugins": ["@babel/plugin-transform-runtime"]
  }

}
```

#### Babel 7 配置

Babel 7 引入了几个重大变化，其中最重要的是对预设（presets）和插件（plugins）的拆分，以及对配置方式的改进。Babel 7 使用 @babel/core 作为核心库，并使用 @babel/preset-env 和其他具体的预设或插件。

使用 .babelrc 或 babel.config.js

##### .babelrc 文件

```json
{
    "presets": ["@babel/preset-env", "@babel/preset-react"],
    "plugins": [
        [

            "import",
            {
                "libraryName": "antd",
                "libraryDirectory": "es",
                "style": true
            }
        ],
        [
            "@babel/plugin-transform-runtime",
            {
                "regenerator": true
            }
        ]
    ]
}
```

##### babel.config.js 文件

```js
module.exports = {
    presets: [
        "@babel/preset-env",
        "@babel/preset-react"
    ],
    plugins: [
        [
            //  antd V5 已不再支持
            "import",
            {
                libraryName: "antd",
                libraryDirectory: "es",
                style: true
            }
        ],
        [
            "@babel/plugin-transform-runtime",
            {
                "regenerator": true
            }
        ]
    ]
};
```

### 配置 Plugin


#### 压缩文件（Css 压缩、Js 压缩）

```json
yarn add css-minimizer-webpack-plugin terser-webpack-plugin -D
```

css-minimizer-webpack-plugin 压缩、去重css，比较耗时，只用在打包项目时，在webpack.prod.js中配置

terser-webpack-plugin 实现打包后JS代码的压缩，比较耗时，只用在打包项目时，在webpack.prod.js中配置

#### Html、服务

```json
yarn add html-webpack-plugin webpack-dev-server clean-webpack-plugin mini-css-extract-plugin -D
```

html-webpack-plugin 处理HTML资源。它会为你创建一个空的HTML文件，并自动引入打包输出的所有资源（比如JavaScript和CSS文件）

webpack-dev-server 创建服务，方便你本地开发时调试

clean-webpack-plugin 打包前自动清理上一次的输出目录文件

mini-css-extract-plugin 将CSS单独提取出来，生成独立的CSS文件

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
plugins: [
    new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.join(__dirname, "../index.html"),
    }),
    new MiniCssExtractPlugin({
        filename: "[name].[contenthash:8].css",
        chunkFilename: "chunk/[id].[contenthash:8].css"
    }),
    new CleanWebpackPlugin(),
]
```

#### tree-shaking、source-map、webpack-bundle-analyzer、gzip 优化

```json
yarn add webpack-bundle-analyzer -D
```

```json
yarn add compression-webpack-plugin -D (开启 gzip用)
```

webpack5默认开启tree-shaking（当打包的mode为production时），默认开启source-map，可以查看打包后代码的源码，方便调试。

tree-shaking 只打包用到的代码，没用到的代码不打包

```js
{
    mode: 'production'
}
```

source-map 源代码，体积较大，方便排查错误,一般在开发环境配置

```js
{
    mode: 'development',
    devtool: 'eval-cheap-module-source-map'
}

```

webpack-bundle-analyzer 生成一个分析打包结果的页面，方便查看打包结果，一般在生产环境配置

```js
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

plugins: [
    new BundleAnalyzerPlugin(),
]
```

#### gzip优化

开启Gzip后，大大提高用户的页面加载速度，因为gzip的体积比原文件小很多，需要后端的配合，在webpack.prod.js中配置

```js
const CompressionPlugin = require('compression-webpack-plugin')

plugins: [    
    // gzip
    new CompressionPlugin({
      algorithm: 'gzip',
      threshold: 10240,
      minRatio: 0.8
    })
]
```

## 安装 react 18 

```json
yarn add react@18.2.0 react-dom@18.2.0 react-router-dom@6.30.0 -S
```

## 安装redux（需要就安装）

```json
yarn add redux react-redux -S
```

## 安装UI（antd5.x）

```json
yarn add antd @ant-design/icons -S
```

## 配置router

1.安装 router 后，在根目录src 里面的 index.js文件中引入配置 BrowserRouter 或者 HashRouter ，
2.在src下新建pages文件夹建好对应的页面，
3.在src下新建router文件夹，然后在router文件夹下新建index.js文件，然后在index.js文件中写入以下代码

![alt text](./readmeimgs/image3.png)

以上两种，一种用 routers 直接包裹 router，一种用 useRoutes Hooks ，都可以实现路由的配置

后续可能会加上权限控制、动态路由等功能

## 注释
webpack.config.js

loader 加载器的执行顺序是从右到左，从下到上，仅在同一个 rule 中起作用

1、-S (--save)

用于将包添加到项目的 dependencies，表示这是在生产环境中运行时所需的依赖。

例如：npm install package-name -S，这将把 package-name 添加到 dependencies 中。

2、-D (--save-dev)

用于将包添加到项目的 devDependencies，表示这是在开发阶段所需的依赖，例如测试工具、构建工具等。

例如：npm install package-name -D，这将把 package-name 添加到 devDependencies 中







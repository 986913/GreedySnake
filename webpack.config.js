const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin'); //引入插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //引入插件

// webpack中所有的配置信息都应该写在module.exports中
module.exports = {
  //指定入口文件
  entry: './src/index.ts',

  //指定打包文件所有目录
  output: {
    // 指定打包文件的目录
    path: path.resolve(__dirname, 'dist'),
    // 打包后文件的名字
    filename: 'bundle.js',
    // 告诉webpack 不要使用arrow function 和 const
    environment: {
      arrowFunction: false,
      const: false,
    },
  },

  // 指定webpack打包时要使用的模块
  module: {
    // 指定要加载的规则

    rules: [
      // 设置ts文件的处理
      {
        test: /\.ts$/, // 指定规则生效的文件
        exclude: /node-modules/,
        /* 
          Loader的执行顺序是从下往上执行的：
          我用ts-loader加载器和babel-loader加载器 去处理所有以.ts结尾的文件:
            先用ts-loader去把TS转为JS,
            然后再用babel-loader去把新版本的JS转成各个版本的JS（支持在IE等其他浏览器上的使用）
        */
        use: [
          // 配置babel
          {
            loader: 'babel-loader', // 指定加载器
            // 设置babel
            options: {
              // 设置预定义的环境
              presets: [
                [
                  '@babel/preset-env', //指定环境的插件
                  //配置信息
                  {
                    // 要兼容的目标浏览器们：chrome & ie
                    targets: {
                      chrome: '58',
                      ie: '11',
                    },
                    corejs: '3', // 用哪个版本的corejs, 比如可以给老的浏览器引入ES6的Promise等等
                    useBuiltIns: 'usage', // 使用corejs的方式: 按需加载 （代码要是写了prmose再去引入）
                  },
                ],
              ],
            },
          },
          'ts-loader',
        ],
      },

      // 设置less文件的处理
      {
        test: /\.less$/, // 指定规则生效的文件
        /* Loader的执行顺序是从下往上执行的：
          less-loader --> postcss-loader -> css-loader --> style-loader 
        */
        use: [
          'style-loader',
          'css-loader',
          //引入postcss - 用来解决css兼容老版本浏览器的，就像babel一样
          {
            loader: 'postcss-loader', // 指定加载器
            // 设置postcss
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      browsers: 'last 2 versions',
                    },
                  ],
                ],
              },
            },
          },
          'less-loader',
        ],
      },
    ],
  },

  // 配置webpack插件
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
    }),
    new CleanWebpackPlugin(), //每次build时候，确保先清空dist目录，然后再build. 确保dist目录是新的,
  ],

  // 用来设置 引用模块
  resolve: {
    extensions: ['.ts', '.js'], // 返回他俩结尾的文件，都可以作为模块使用
  },

  mode: 'development',
};

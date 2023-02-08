const path=require('path')// node.js核心模块用来处理路径问题
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports ={
 //入口
 entry:'./src/main.js',
 //出口 __dirname 的变量
 output:{
    // path:path.resolve(__dirname,'dist'),//绝对路径
    path:undefined,
    filename:'static/js/main.js',
    //自动清空上次打包内容
    //原理是，在打包前，将path整个目录内容清空，再进行打包
    // clean:true,

 },
 //加载器
 module:{
    rules:[
        //loader
        {
            //  执行循序。从右到左（从下到上）
            test: /\.css$/i, //不区分大小写检测.css文件
            use: [
                "style-loader",//将js中css通过创建style标签添加到html文件中生效
                 "css-loader"//将css资源编译成commonjs的模块到js中
            ], //
        },
        {
            test: /\.less$/i,
            use: [
              // compiles Less to CSS
              "style-loader",
              "css-loader",
              "less-loader",//将less编译成css文件
            ],
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
              // Creates `style` nodes from JS strings
              "style-loader",
              // Translates CSS into CommonJS
              "css-loader",
              // Compiles Sass to CSS
              "sass-loader",
            ],
        },
        {
            test: /\.styl$/,
            use: [
                // Creates `style` nodes from JS strings
                "style-loader",
                // Translates CSS into CommonJS
                "css-loader",
                // Compiles stylus to CSS
                "stylus-loader",
              ],
          },
          {
            test: /\.(png|jpe?g|gif|webp|svg)$/,
            type:"asset",
            parser:{
                dataUrlCondition:{
                    //小于10kb的图片转base64
                    //优点，建设请求数量 缺点，体积会变大
                    maxSize:16*1024  //10kb
                }
            },
            generator:{
                //输出图片名称
                //hash:10 哈希值取前10位
                filename:"static/images/[hash:10][ext][query]"
            }
          },
          {
            test: /\.(ttf|woff2?|map3|map4|avi)$/,
            type:"asset/resource",
            generator:{
                //输出图片名称
                //hash:10 哈希值取前10位
                filename:"static/media/[hash:10][ext][query]"
            }
          },
          {
            test: /\.m?js$/,
            exclude: /node_modules/,//排除node_modules中的js文件(这些文件不处理)
            use: {
              loader: 'babel-loader',
                //   options: {
                //     presets: [
                //       ['@babel/preset-env', { targets: "defaults" }]
                //     ]
                //   }
            }
          }
    ]
 },
 plugins:[
    //插件的位置
    new ESLintPlugin({
        //检查哪些文件
        context:path.resolve(__dirname,'../src')
    }),
    new HtmlWebpackPlugin({
        //模板，以public/index.html文件创建新的html文件
        //新的html文件特点 1.结构和原来一致 2.自动引入打包输出的资源
        template:path.resolve(__dirname,"../public/index.html")
    })
 ],
 //开发服务器 不会输出资源，在内存中编译打包
 devServer:{
   host:"localhost",
   port:"3000",
   open:true
 },
 //模式
 mode:'development'
}
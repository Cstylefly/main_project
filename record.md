<!-- sourceMap是为了生成源代码和构建后代码的映射关系（可以精确提示知道方法出错的地方） -->
<!-- HMR 热模块替换（性能会变好，打包编译速度会相应变快，正常情况只会对css起作用，对于js需要额外做处理。开发中基本都不用，会引入相应loader来达到同等效果） -->
<!-- OneOf 每个文件只能被其中一个命中，提高打包速度-->
<!-- 多进程打包（针对于打包时间很慢可以使用,因为开启多进程本身会耗时，thread-loader） -->
<!-- treeShaking 只打包引用的js方法(生产环境默认打开) -->
<!-- code Split 分割js文件、按需加载（使用import动态引入） -->
<!-- 多入口打包处理公共模块 -->
<!-- PWA、CoreJs -->



<!-- 一些遇到的报错解决方案 -->

//eslint 报错 ESLint Parsing error: Unexpected token 
// .eslintrc.js   添加 "ecmaVersion": 2018

//eslint 报错 Definition for rule '@typescript-eslint/no-unused-vars' was not found
// .eslintrc.js   添加 plugins:['@typescript-eslint'] rules中添加"@typescript-eslint/no-unused-vars": "off" 下载依赖 @typescript-eslint/eslint-plugin
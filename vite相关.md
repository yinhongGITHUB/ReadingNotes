#### cdn 资源加速

把静态资源 js、css、图片资源放在 cdn 上，vite 共享配置设置 base， base 配置主要影响的是构建产物中所有静态资源（如 JS、CSS、图片、字体等）的引用路径，会自动加上 base 前缀，实现利用 cdn 加速的效果

#### vite 如何兼容低浏览器

利用插件：@vitejs/plugin-legacy

vite build 后，会生成两份代码：

现代版：针对支持 ESM 的浏览器，体积更小
兼容版：针对旧版浏览器，经过 Babel 转换和 polyfill 填充

```js
import legacy from "@vitejs/plugin-legacy";
export default {
  plugins: [
    legacy({
      // 自动读取 package.json 中的 browserslist 配置
      targets: "browserslist",

      // 额外的 polyfill（针对 IE11）
      additionalLegacyPolyfills: [
        "regenerator-runtime/runtime", // 支持 async/await
        "whatwg-fetch", // 支持 fetch API
      ],

      // 为现代浏览器提供部分 polyfill
      modernPolyfills: ["es.promise.finally", "es/map", "es/set"],

      // 优化 chunks 分割
      renderLegacyChunks: true,

      // 压缩兼容版代码
      minify: true,
    }),
  ],
};
```

Polyfill（垫片） 是一段代码，用于为旧版浏览器提供现代 JavaScript 或 CSS 特性的兼容实现。当目标浏览器不支持某些新特性时，Polyfill 可以 “填补” 这些缺口，使代码在旧浏览器中正常运行。

当你执行 npm run build 时，process.env.npm_lifecycle_event 的值为 "build"

#### package.json 中兼容低版本浏览器

支持以下两种格式：

```js
// 数组格式
{
  "browserslist": [
    "last 2 versions",    // 每个浏览器的最后两个版本
    "not dead",           // 排除已停止更新的浏览器
    ">= 0.2%",            // 全球使用率超过 0.2% 的浏览器
    "ie >= 11"            // 兼容 IE11 及以上
  ]
}
{
  "browserslist": {
    "production": [
      "> 0.5%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
// 字符串格式
{
  "browserslist": "last 2 versions, not dead, >= 0.2%, ie >= 11"
}
```

#### vite 的预解析

optimizeDeps 是 Vite 配置中的依赖优化选项，用于控制开发环境下对依赖（主要是 node_modules 里的包）的预构建行为。

```js
export default {
  optimizeDeps: {
    include: ["lodash", "axios"], // 指定要预构建的依赖
    // include: ['esm-dep > cjs-dep'], 让 Vite 预构建某个依赖包（esm-dep）中的某个子依赖（cjs-dep），而不是整个包。
    exclude: ["some-big-lib"], // 指定不需要预构建的依赖
  },
};
```

#### vite 的默认分包最小限制

vite 的 chunkSizeWarningLimit 默认为 500kb 超过会警告

#### 对 vite 的理解

说说对 vite 的理解，什么是 bundleless 呢？

从面向文件编程到模块化到 bundleless

必要的指数储备：模块化
模块化规范：commonjs、amd、cmd、esm(es module)

正是有个 esm 的浏览器支持，才有 bundleless 方案

什么是 bundleless（bundle 打包 less 少打点）？
bundle：比如 webpack 需要通过模块化规范支持，依赖分析完之后构建依赖图，depGraph
bundleless：提倡少打包

编码资源（源文件）有哪些？

- js（ts tsx jsx vue）浏览器的 esm 支持引入 js 但是（ts tsx jsx vue）没法直接支持，bundleless 不需要打包
- css
- png
- svg

esm 引入文件的时候是**先进后出**的过程 比如按顺序引入 1.js 2.js 3.js，会打印，3 2 1

- 输出到某一个指定目录

本地可以用 npm i http-serve 去启动一个本地服务，但是现在还没有热更新

- 开发一个开发服务器

产物构建机制
产物的构建从来不是依赖于打包工具，而是依赖**编译**工具
webpack 里面 要编译 js 哪些，我们用什么？babel(编译工具，把 es6 编译成 es5)
vite 里面

- 开发环境 应用 js（js 不用打包直出） 代码资源 ts tsx jsx vue，样式资源：css（原生的浏览器不认识这些，没法直接 esm 的方式引入）字体 woff2

- 用 esbulid 来构建：ts tsx jsx(esbulid.transform():esbulid 进行编译)
- postcss 来构建: css
- 需要针对需要打包的资源，做转换的处理
  插件化机制来实现对于不同资源，打包的具体工作， **vite-plugin-xxx**,比如 vite-plugin-vue vite-plugin-react 都是用来做上述三个转换工具的，一般 vue 框架自带
- 优化：
  - 已经编译的内容 需要缓存
  - 增量缓存
  - HMR
    esbuild 缺点：DTS 文件需要自行处理（DTS 文件就是类型文件）、es5 一下不支持

构建环境
用 rollup 来打包，开发环境时用 esbuild 来编译
优化：构建工具来处理，tree-shaking

#### vite 的构建过程，实现原理？

##### 开发构建（vite 本地开发服务）

1. 项目初始化：读取并解析 vite.confing.js 配置文件
2. 启动开发服务：基于 express 启动 http 服务器
3. ESM 模块化：利用浏览器的原生 ESM 进行模块加载
4. 按需编译：试试编译请求的模块
5. 热模块替换（HMR）：通过 WebSocket 实现模块的局部更新
6. Source Maps：自动生成 Source Maps，便于调试（Source Maps 是一种将编译后的代码（如压缩后的 JavaScript、转译后的 7. TypeScript/ESNext、CSS 预处理器生成的 CSS）映射回原始源代码的技术。）

#### esbuild 的具体解析过程

- 解析阶段（Parsing）
  AST 构建：将源代码（JS/TS/JSX）解析为抽象语法树（AST），该过程直接在 Go 内存中高效完成。
  依赖收集：遍历 AST 识别 import/reuire 语句，递归收集所有依赖模块。
- 转换阶段（Transformation）
  语法转换：根据目标环境（如 --target=es2015）将高版本语法（如箭头函数、可选链）编译为低版本兼容代码。
  Tree Shaking：静态分析未使用的导出代码（如未引用的函数），直接在 AST 层面删除。
- 捆绑阶段（Bundling）
  模块合并：将所有依赖模块按照引用关系合并为一个或多个输出文件，减少浏览器请求次数。
  作用域提升（Scope Hoisting）：通过分析变量作用域，将多个模块的代码合并到一个函数作用域中，提升运行效率。
- 输出阶段（Output）
  代码生成：将优化后的 AST 重新生成为 JavaScript 代码，并应用压缩、分割等配置。
  资源处理：处理 CSS、图片等非 JS 资源，支持导入、内联或提取为独立文件。

##### 线上构建

项目初始化：读取并解析 vite.confing.js 配置文件
入口解析：使用 Rollup 构建模块依赖图
插件处理：通过插件系统进行代码转换、压缩和资源处理（例如插件：vite-plugin-vue）
Tree Shanking：移除未使用的代码
代码拆分：将代码拆分成多个模块
生成输出：打包生成最终的输出文件
资源优化：css 和静态资源
缓存策略：未静态资源添加内容哈希，便于缓存管理

npm init -y
快速初始化 Node.js 项目的命令，它会自动生成一个默认的 package.json 文件

读出来的 file 读出来是一个 的代码字符串 （编译原理：其实就是对字符串对一系列的操作，代码就是看作字符串）

#### vite 是 rollup 打包：

1. 采用的就是 Tree Shaking
2. Scope Hoisting：将所有模块的作用域提升到顶层，减少闭包包裹带来的性能开销，同时也有助于进一步优化 Tree Shaking。

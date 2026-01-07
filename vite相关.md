#### cdn 资源加速

把静态资源 js、css、图片资源放在 cdn 上，vite 共享配置设置 base， base 配置主要影响的是构建产物中所有静态资源（如 JS、CSS、图片、字体等）的引用路径，会自动加上 base 前缀，实现利用 cdn 加速的效果

#### vite 如何兼容低浏览器

1. 利用插件：@vitejs/plugin-legacy

```js
import legacy from "@vitejs/plugin-legacy";

export default {
  plugins: [
    legacy({
      targets: ["defaults", "not IE 11"], // 也可以写 'IE 11' 兼容 IE
    }),
  ],
};
```

2.  package.json 用 browserslist

```js
"browserslist": [
  "> 1%",// 表示全球市场份额大于 1% 的浏览器都要兼容。
  "last 2 versions",// 表示每个主流浏览器的最近两个大版本都要兼容（如 Chrome 最新的两个版本、Firefox 最新的两个版本等）。
  "not dead",// 不包括官方已停止维护的浏览器
  "ie >= 11"// 表示要兼容 IE11 及以上版本（如果有更高版本的 IE，也会兼容）。
]
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

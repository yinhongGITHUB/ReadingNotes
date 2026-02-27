# Sentry 相关面试题总结（稳定性方向）

## 1. Sentry 的核心原理是什么？它是如何捕获前端异常的？

- Sentry 通过全局监听（如 window.onerror、window.onunhandledrejection）和框架集成（Vue/React 插件）自动捕获 JS 报错、Promise 异常。
- 捕获后收集堆栈、环境、用户操作等信息，上报到 Sentry 服务端。

## 2. Sentry 如何实现白屏监控？有哪些常见的白屏检测方法？

- 监控资源加载错误、JS 报错、页面渲染超时等，判断页面是否白屏。
- 可自定义埋点，检测关键节点渲染情况，长时间无内容则上报白屏。

## 3. Sentry 如何进行性能监控？能采集哪些 Web Vitals 指标？

- 支持自动采集 Web Vitals（如 FCP、LCP、CLS、FID 等），分析页面加载和交互性能。
- 可监控自定义事务（如路由切换、接口请求耗时），上报慢操作、卡顿等。

## 4. Sentry 捕获到异常后，如何保证数据的可靠上报与隐私安全？

- 支持离线缓存、重试机制，保证异常数据可靠上报。
- 可配置数据脱敏、忽略敏感字段，防止隐私泄露。

## 5. Sentry 在 Vue/React/Node 项目中如何集成？有哪些常用配置？

- 提供各类 SDK，简单初始化即可集成。
- 常用配置有 dsn、环境、采样率、忽略规则、source map 上传等。

## 6. Sentry 如何处理 source map，如何还原压缩后的错误堆栈？

- 支持上传 source map，自动还原压缩/混淆后的错误堆栈，便于定位源码位置。

## 7. Sentry 如何与企业自有监控体系（如日志、告警平台）对接？

- 支持 Webhook、API、邮件、钉钉/企业微信等多种告警方式，可与自有平台联动。

## 8. Sentry 的采样、忽略、去重等机制是怎样的？如何防止误报和刷屏？

- 支持采样率配置、错误去重、忽略指定错误/路径，防止误报和异常刷屏。

## 9. Sentry 如何定位和分析线上白屏、卡顿、接口慢等稳定性问题？

- 结合异常日志、性能数据、用户操作轨迹，快速定位白屏、卡顿、慢接口等问题根因。

## 10. Sentry 的优缺点、与其他监控方案（如 Fundebug、阿里 ARMS）对比？

- 优点：开源、功能全、支持多端、可自建、社区活跃。
- 缺点：部分高级功能需付费，自建运维成本较高。
- 对比：Sentry 更通用，Fundebug/ARMS 更本土化，适合不同企业需求。

# sentry 使用

1. 注册账号并创建项目
   访问 https://sentry.io/ 注册账号，创建新项目，选择前端（如 JavaScript、Vue、React）或后端（Node.js）类型，获取 dsn 地址。

2. 安装 Sentry SDK
   前端项目（以 Vue 为例）：

```js
npm install @sentry/vue
```

3. 初始化 Sentry
   在入口文件（如 main.js）添加：

**dsn 地址：**是 Sentry 分配给你项目的唯一数据上报地址

```js
import * as Sentry from "@sentry/vue";
// npm install @sentry/tracing
import { BrowserTracing } from "@sentry/tracing";
import Vue from "vue";
import App from "./App.vue";

// 只在生产环境开启
if (process.env.NODE_ENV === "production") {
  Sentry.init({
    app: Vue,
    dsn: "你的dsn地址",
    integrations: [new BrowserTracing()],
    // 没有 integrations: [new BrowserTracing()]，Sentry 只会采集错误日志（即自动捕获代码执行过程中的同步和异步错误），不会采集性能数据。
    // 加上这行后，Sentry 会自动监控页面性能、慢操作、卡顿等，帮助你分析线上性能瓶颈。
    tracesSampleRate: 1.0, // 性能采样率，0~1
    environment: "production", // 环境名
    release: "v1.0.0", // 版本号
    ignoreErrors: ["ResizeObserver loop limit exceeded", "Script error"], // 忽略错误
    beforeSend(event, hint) {
      // 自定义上报前处理
      // 可以对 event 做过滤、脱敏等
      return event;
    },
    attachStacktrace: true, // 附加堆栈
  });
}
```

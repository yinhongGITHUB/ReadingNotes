#### node 进程 如何捕获异常

分为**同步异常**和**异步异常**

1. try...catch：用于同步代码块，捕获代码块内的异常。
2. promise 的 .catch()：用于异步 Promise，捕获 reject 或抛出的异常。
3. process.on('uncaughtException', handler)：监听未捕获的同步异常，防止进程崩溃。
4. process.on('unhandledRejection', handler)：监听未处理的 Promise 异常。

```js
// 同步异常
try {
  throw new Error("同步异常");
} catch (err) {
  console.error("捕获到异常:", err);
}

// 异步异常
Promise.reject("异步异常").catch((err) => {
  console.error("Promise 异常:", err);
});

// 全局异常
process.on("uncaughtException", (err) => {
  console.error("未捕获异常:", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("未处理的 Promise 异常:", reason);
});
```

- uncaughtException：

当同步代码或回调函数中有未被 try...catch 捕获的异常时，Node 会触发该事件。可以用 process.on('uncaughtException', handler) 监听，避免进程直接崩溃。适合做日志记录、告警等兜底处理，但不建议继续运行进程，最好及时退出或重启。

- unhandledRejection：

当 Promise 被 reject 后没有 .catch() 处理时，会触发该事件。可以用 process.on('unhandledRejection', handler) 监听，捕获未处理的异步异常。适合做全局监控和日志，但同样建议修复代码逻辑，避免依赖兜底。

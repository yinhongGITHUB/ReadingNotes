#### 如何使用 WebSocket?避免传统的为了获取某个状态不断地轮询，反复发送无效查询请求耗费了大量的带宽和 CPU 资源

WebSocket 由浏览器环境提供的一个原生 API

- 第一个参数：url（必填）

WebSocket 服务器的地址，必须以 ws:// 或 wss://（加密）开头。
例如："ws://example.com/socket" 或 "wss://example.com/socket"

- 第二个参数：protocols（可选）

可以是一个字符串或字符串数组，指定子协议（协议协商），用于和服务器约定通信格式。
例如："json" 或 ["json", "xml"]

```js
const socket = new WebSocket("ws://example.com/socket);
// 或者对于安全连接使用 wss://
socket.onopen = function () {
  console.log("Connection opened");
  // 向服务器发送消息
  socket.send("Hello Server!");
};

socket.onmessage = function (event) {
  console.log("Message from server ", event.data);
};

socket.onerror = function (error) {
  // 当不再需要 WebSocket 连接时，可以调用 close() 方法关闭连接：
  socket.close();
  console.log("WebSocket error: ", error);
};

socket.onclose = function () {
  console.log("Connection closed");
};
```

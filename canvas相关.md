## 1. Canvas 是啥？怎么用？

### 【Canvas 坐标系说明】

Canvas 默认坐标系是左上角为 (0,0)，x 向右，y 向下。
也就是说，所有绘图的起点、图片、文字等，默认都是以左上角为原点。

#### 怎么把原点设置到画布中心？

可以用 ctx.translate() 方法，把坐标系整体平移。

比如：

```js
// 假设画布宽400高300
ctx.translate(200, 150); // 现在 (0,0) 就在画布中心了
// 之后所有绘图的坐标，都是以中心为原点
ctx.fillRect(-50, -50, 100, 100); // 以中心为起点画一个正方形
```

// 注意：translate 只影响后续操作，且是累加的。可以用 ctx.save()/ctx.restore() 管理状态。

```html
<canvas
  id="myCanvas"
  width="400"
  height="300"
  style="border:1px solid #ccc;"
></canvas>
```

### 1.2 拿到画笔（上下文对象）

```js
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d"); // 2d画笔，后面所有操作都靠它
// 如果你想玩3D，可以用：canvas.getContext('webgl') 或 'webgl2'，这样就是WebGL 3D画布了
// 例子：const gl = canvas.getContext('webgl'); // 这是3D上下文

// 【3D画布(WebGL)怎么用？】
// WebGL 是专门用来画3D的，和2d完全不一样，API更底层。
// 下面是最简单的WebGL用法：清空画布为红色
/*
const gl = canvas.getContext('webgl');
gl.clearColor(1, 0, 0, 1); // RGBA，1是最大值
// 清空颜色缓冲区
gl.clear(gl.COLOR_BUFFER_BIT);
*/
// 真正画3D物体需要写着色器、传顶点数据等，建议用three.js等库更简单
```

---

## 2. 怎么画图形？

### 2.1 画矩形

```js
// 画实心矩形
ctx.fillStyle = "skyblue";
ctx.fillRect(10, 10, 100, 50);
// 画空心矩形
ctx.strokeStyle = "red";
ctx.strokeRect(130, 10, 100, 50);
// 擦除一块区域
ctx.clearRect(20, 20, 30, 20);

// 参数说明：fillRect/strokeRect/clearRect(x, y, width, height)
// x, y 是左上角坐标，width, height 是宽高
```

### 2.2 画线和多边形

```js
ctx.beginPath(); // 开始一条新路径
ctx.moveTo(10, 80); // 起点
ctx.lineTo(110, 80); // 画到
ctx.lineTo(60, 130); // 再画到
ctx.closePath(); // 闭合
ctx.stroke(); // 描边
ctx.fill(); // 填充
```

### 2.3 画圆和弧

```js
ctx.beginPath(); // 开始新路径
ctx.arc(200, 100, 40, 0, Math.PI * 2); // 画一个圆（圆心200,100，半径40，0到2π）
ctx.stroke(); // 描边（空心圆）

ctx.beginPath(); // 再开始新路径
ctx.arc(300, 100, 40, 0, Math.PI); // 画一个半圆（圆心300,100，半径40，0到π）
// 0到π的意思是：从0弧度（右侧）画到π弧度（左侧），也就是上半圆
// arc的第四第五个参数分别是起始角和终止角，单位是弧度（Math.PI=180°，Math.PI*2=360°）
ctx.fill(); // 填充（实心半圆）
```

### 2.4 画曲线

```js
// 【什么是贝塞尔曲线？】
// 贝塞尔曲线是一种用“控制点”来描述的平滑曲线，常用于绘图、动画、路径等。
// 你可以理解为：起点和终点之间，拉着一根“橡皮筋”，中间的控制点像手指拉着它，曲线就会被“拽弯”。
// 常见类型：
// - 二次贝塞尔曲线：1 个控制点（quadraticCurveTo）
// - 三次贝塞尔曲线：2 个控制点（bezierCurveTo）
// 控制点越多，曲线越灵活。

// 二次贝塞尔曲线（1个控制点）
ctx.beginPath(); // 开始新路径
ctx.moveTo(50, 200); // 起点
ctx.quadraticCurveTo(100, 150, 150, 200); // 控制点(100,150)，终点(150,200)
ctx.stroke(); // 描边

// 三次贝塞尔曲线（2个控制点）
ctx.beginPath(); // 开始新路径
ctx.moveTo(200, 200); // 起点
ctx.bezierCurveTo(220, 150, 280, 250, 300, 200); // 控制点1(220,150)，控制点2(280,250)，终点(300,200)
ctx.stroke(); // 描边

// 总结：
// quadraticCurveTo(cp1x, cp1y, x, y) —— 二次贝塞尔，1 个控制点
// bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) —— 三次贝塞尔，2 个控制点
// beginPath() 每次都要开新路径，否则会连在一起
// moveTo() 设置起点

// 说明：stroke() 是只画线条轮廓（空心），fill() 是填充曲线包围的区域（实心）。
// 贝塞尔曲线一般用 stroke，只有闭合曲线时用 fill 才有填充效果。
```

## 3. 怎么设置样式？

### 3.1 填充色、边框色、透明度

```js
ctx.fillStyle = "orange"; // 填充色
ctx.strokeStyle = "#333"; // 边框色
ctx.globalAlpha = 0.7; // 整体透明度
```

### 3.2 线条样式（所有线相关的属性）

```js
// 线宽
ctx.lineWidth = 1; // 默认1像素，可自定义
// 虚线
ctx.setLineDash([10, 5]); // [实线长度, 空白长度]
// 线头样式
ctx.lineCap = "butt"; // 可选值：
//   butt   —— 默认, 平头（直接截断）
//   round  —— 圆头（线头半圆）
//   square —— 方头（比butt多出半个线宽）
// 拐角样式
ctx.lineJoin = "miter"; // 可选值：
//   miter  —— 默认, 尖角（外延尖尖的）
//   round  —— 圆角
//   bevel  —— 斜角（切掉一个角）
```

### 3.3 渐变色

```js
// 线性渐变
let grad = ctx.createLinearGradient(10, 10, 110, 10); // 创建线性渐变对象，起点(10,10)，终点(110,10)
// 注意：这里的 (10,10) 到 (110,10) 是“渐变色带”的起点和终点坐标，决定颜色怎么分布
// 它和后面 fillRect 画的矩形位置可以不一样，渐变是按这条线来算的
// 如果 fillRect 画的区域比渐变线还大，渐变会延伸/重复；如果区域小于渐变线，只会显示一部分
// 所以“渐变线”坐标是控制颜色分布方向和范围的，和矩形位置没有强绑定
grad.addColorStop(0, "red"); // 渐变起点颜色为红色（0表示起点）
grad.addColorStop(1, "blue"); // 渐变终点颜色为蓝色（1表示终点）
ctx.fillStyle = grad; // 设置填充样式为刚才创建的渐变
ctx.fillRect(10, 250, 100, 30); // 用渐变色填充一个矩形
// 这样配置后，最终效果就是：在画布上 (10,250) 位置画出一个宽100高30、从左到右颜色由红变蓝的渐变矩形
// 你会看到左边是红色，右边是蓝色，中间会平滑过渡，非常炫酷

// 放射渐变
let rgrad = ctx.createRadialGradient(200, 250, 10, 200, 250, 40); // 创建放射（圆形）渐变，内圆心(200,250)半径10，外圆心(200,250)半径40
rgrad.addColorStop(0, "yellow"); // 内圆颜色为黄色
rgrad.addColorStop(1, "green"); // 外圆颜色为绿色
ctx.fillStyle = grad; // 设置填充样式为放射渐变
// fillStyle 支持的所有类型：
// 1. 纯色字符串（所有 CSS 颜色格式）：如 'red'、'#ff0'、'rgb(0,0,0)'、'rgba(0,0,0,0.5)'、'hsl(120,100%,50%)' 等
// 2. 渐变对象（Gradient）：ctx.createLinearGradient(...) 或 ctx.createRadialGradient(...) 创建的对象
// 3. 图案对象（Pattern）：ctx.createPattern(img/canvas/video, repeatMode) 创建的对象
// 例：
//   ctx.fillStyle = 'orange'; // 纯色
//   ctx.fillStyle = grad;     // 渐变对象（如上）
//   ctx.fillStyle = pattern;  // 图案对象
// 【什么时候用图案对象？】
// 比如你想用一张图片、canvas 或 video 作为填充，让它像瓷砖一样平铺在区域里，就用 pattern
// 例子：用图片平铺填充矩形
// const img = new Image();
// img.src = 'xxx.png';
// img.onload = function() {
//   let pattern = ctx.createPattern(img, 'repeat');
//   ctx.fillStyle = pattern;
//   ctx.fillRect(0, 0, 200, 200); // 效果：用图片在 200x200 区域里平铺
// }
// 只有这三类，不能直接用数组、对象、数字等其它类型
ctx.fillRect(150, 220, 100, 60); // 用放射渐变填充一个矩形
```

## 4. 怎么写字？

### 4.1 画文字

```js
ctx.font = "20px Arial"; // 字体
ctx.fillStyle = "purple";/
// purple 是 CSS 标准颜色名，代表紫色
// 你还可以用 'red'（红）、'blue'（蓝）、'green'（绿）、'yellow'（黄）、'black'（黑）、'white'（白）等英文单词作为颜色名
ctx.fillText("Hello Canvas", 10, 300); // 实心字
ctx.strokeStyle = 'red'; // 设置描边颜色为红色
ctx.strokeText("描边文字", 10, 330); // 空心字
```

### 4.2 测量文字宽度

```js
let w = ctx.measureText("Hello Canvas").width;
console.log(w);
```

## 5. 怎么画图片和操作像素？

### 5.1 画图片

```js
const img = new Image();
img.src = "https://example.com/image.png";
img.onload = function () {
  ctx.drawImage(img, 250, 10, 100, 100); // 图片加载完再画
};
```

### 5.2 裁剪图片

```js
// ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)
// 作用：把图片的一部分裁剪出来，画到画布的指定位置和大小
// 参数说明：
//   img —— 图片对象（Image、Canvas、Video等）
//   sx, sy —— 裁剪区域的左上角坐标（在图片上的位置）
//   sw, sh —— 裁剪区域的宽高（在图片上截多大）
//   dx, dy —— 画到画布上的左上角坐标
//   dw, dh —— 在画布上绘制的宽高（可以缩放）
//
// 举例：只画图片的中间 100x100 区域，放到画布(50,50)位置，缩放成 200x200
// ctx.drawImage(img, 50, 50, 100, 100, 50, 50, 200, 200);
//
// 注意：
// - sw/sh/dw/dh 不能为负数，否则不会绘制
// - 如果裁剪区域超出图片本身，会自动截取图片内的部分
// - 也可以用 ctx.drawImage(img, dx, dy) 或 ctx.drawImage(img, dx, dy, dw, dh) 只指定目标区域，不裁剪
```

### 5.3 操作像素

```js
// 【操作像素是干嘛的？】
// 操作像素就是直接读取、修改画布上的每一个像素点的颜色数据
// 你可以实现：图片特效（反色、灰度、马赛克）、局部修改、抠图、检测颜色、生成二维码等
// 适合做各种“像 PS 一样”的底层图像处理
// 常用 API：ctx.getImageData、ctx.putImageData

// 第一步：获取画布上 (10,10) 到 (110,110) 这块区域的像素数据，宽高100x100
let imageData = ctx.getImageData(10, 10, 100, 100);
// imageData.data 是一个 Uint8ClampedArray，里面存着每个像素的 RGBA 值
let data = imageData.data;
// 遍历所有像素，每4个一组（R,G,B,A）
for (let i = 0; i < data.length; i += 4) {
  // data[i] 是红色通道，data[i+1] 绿色，data[i+2] 蓝色，data[i+3] 透明度
  data[i] = 255 - data[i]; // 反色
  // 这里只反转了红色通道，如果想全部反色，可以：
  // data[i] = 255 - data[i];     // R
  // data[i+1] = 255 - data[i+1]; // G
  // data[i+2] = 255 - data[i+2]; // B
  // data[i+3] 保持不变（A，透明度）
}
// 把修改后的像素数据重新放回画布的同一位置
ctx.putImageData(imageData, 10, 10);
```

## 6. 怎么做变换？（平移、旋转、缩放）

```js
ctx.save(); // 保存当前状态
ctx.translate(100, 100); // 平移
ctx.rotate(Math.PI / 4); // 旋转45度
ctx.scale(1.5, 1.5); // 放大1.5倍
// 这里 x、y 都是 1.5，表示横向和纵向都放大 1.5 倍
ctx.fillRect(0, 0, 50, 50);
// 在当前坐标系下，画一个左上角(0,0)，宽50高50的实心矩形
// 如果前面用了 scale 缩放，这个矩形会被放大或缩小
// 比如 scale(1.5, 1.5) 后，这里实际画出来的是 75x75 的矩形
ctx.restore(); // 恢复状态
// 恢复到上一次 ctx.save() 时的所有设置（包括坐标变换、样式等）
// 常用于做完一组变换/样式后，回到之前的状态，避免影响后续绘图
```

## 7. 状态保存和恢复

```js
ctx.save(); // 保存当前所有设置
// ...做一些操作
ctx.restore(); // 恢复到上一次保存的状态
```

## 8. 怎么做动画和交互？

### 8.1 动画（让图动起来）

#### 【requestAnimationFrame 是啥？】

requestAnimationFrame 是浏览器自带的动画调度 API，不是自定义的，也不是 canvas 专属的。

- 作用：让你可以“让浏览器在下一帧自动帮你执行一个函数”，常用于做动画，让动画流畅不卡顿。
- 用法：你把你的绘图函数（比如 draw）传进去，浏览器会自动循环调用，实现动画效果。
- 优点：
  - 自动跟随屏幕刷新率（一般 60 帧/秒），动画更丝滑。
  - 浏览器会在页面不显示时自动暂停，省电省资源。
  - 比 setTimeout/setInterval 更适合做动画。
- 区别：
  - setTimeout/setInterval 是“定时器”，不管页面卡不卡都按固定时间执行，可能掉帧。
  - requestAnimationFrame 是“按浏览器节奏来”，不卡顿时每秒 60 次，卡顿时会自动降帧，动画不会乱。

简单例子：

```js
let x = 0;
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空整个画布（从左上角(0,0)到右下角，全都擦掉，像橡皮擦一遍）
  ctx.fillRect(x, 50, 50, 50); // 画方块
  x += 2;
  requestAnimationFrame(draw); // 下一帧再画
}
draw();
```

// 这样写，方块会一直往右动，动画非常流畅。
// 你只需要在每一帧里画出“当前状态”，然后用 requestAnimationFrame 循环调用即可。
// 不用自己管定时、不卡顿、不卡帧。

### 8.2 交互（响应鼠标等）

```js
canvas.addEventListener("click", function (e) {
  const x = e.offsetX,
    y = e.offsetY;
  // 判断点中了哪里
});
```

## 9. 一些高级玩法

### 9.1 图层混合

```js
ctx.globalCompositeOperation = "lighter"; // 叠加、变亮等
// 【详细说明】
// globalCompositeOperation 是 canvas 里用来设置“新画的内容和原有内容怎么混合”的属性。
// 你可以理解为“图层混合模式”，类似 PS 里的图层混合。
// 常见的模式有：
// - source-over（默认）：新内容盖在旧内容上
// - destination-over：新内容画在旧内容下
// - lighter：颜色叠加，越叠越亮
// - multiply：颜色相乘，变暗
// - screen：变亮
// - xor：交集区域透明
// - copy：只保留新内容
// ...还有很多

// 例子：
/\*
ctx.globalCompositeOperation = 'source-over'; // 默认，后画的在上面
ctx.fillStyle = 'red';
ctx.fillRect(20, 20, 100, 100);
ctx.fillStyle = 'blue';
ctx.globalAlpha = 0.5;
ctx.fillRect(60, 60, 100, 100); // 蓝色半透明盖在红色上

ctx.globalCompositeOperation = 'lighter'; // 叠加
ctx.fillStyle = 'yellow';
ctx.fillRect(100, 100, 100, 100); // 颜色会和下面的叠加变亮
\*/
// 不同模式下，重叠区域的颜色会有不同的混合效果。
// 可以多试试不同的 globalCompositeOperation 值，感受下效果。

// 先画A图片，再画B图片，B会盖住A
ctx.drawImage(imgA, 0, 0);
ctx.drawImage(imgB, 0, 0); // B在A上面

// 如果想A在B上面，就调换顺序
ctx.drawImage(imgB, 0, 0);
ctx.drawImage(imgA, 0, 0); // A在B上面

- canvas 里没有“图层”概念，谁后画谁在上面。
- 也就是说，图片的“层级”完全靠绘制顺序决定。

// ------------------------------ canvas 把画布转化成图片并下载 ------------------------------
const canvas = document.getElementById('myCanvas');
const url = canvas.toDataURL('image/png');
const a = document.createElement('a');
a.href = url;
a.download = 'canvas.png';
a.click();
```

### 9.2 阴影效果

```js
ctx.shadowColor = "rgba(0,0,0,0.5)"; // 设置阴影颜色，这里是半透明黑色（rgba格式，最后的0.5表示50%透明）
ctx.shadowBlur = 10; // 设置阴影的模糊程度，数值越大越虚，像羽化一样
ctx.shadowOffsetX = 5; // 阴影在水平方向的偏移量，正数往右，负数往左
ctx.shadowOffsetY = 5; // 阴影在垂直方向的偏移量，正数往下，负数往上
ctx.fillRect(50, 200, 100, 50); // 画一个带阴影的实心矩形（左上角在50,200，宽100高50），阴影效果会自动加在这个矩形四周
```

## 10. 怎么适配高分屏？

```js
const dpr = window.devicePixelRatio || 1; // 获取当前屏幕的设备像素比（dpr），比如2K/4K屏会大于1，普通屏是1
canvas.width = 400 * dpr; // 设置画布的实际像素宽度，乘以dpr，画布更大更细腻
canvas.height = 300 * dpr; // 设置画布的实际像素高度，也乘以dpr
canvas.style.width = "400px"; // 但页面上显示的宽度还是400px（不变）
canvas.style.height = "300px"; // 页面上显示的高度还是300px（不变）
ctx.scale(dpr, dpr); // 把画布坐标系整体缩放dpr倍，这样画出来的内容不会变大，但会变得更清晰细腻，适配高分屏

canvas.width / canvas.height 是“画布的实际像素尺寸”，决定了底层有多少像素可以画，影响渲染精度和内容大小。比如 width=800，画布有800个像素宽。

canvas.style.width / style.height 是“页面上显示的尺寸”，决定了canvas在网页上看起来有多大（比如400px），只是CSS样式，不影响底层像素数量。
 - 总结：dpr越大，canvas实际像素越多，画面越清晰，这样才能适配高分屏，不然就糊了。
```

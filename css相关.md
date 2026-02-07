##### user-select

用于控制用户是否可以选中元素的文本

##### pointer-events

用于控制元素是否能成为鼠标、触摸等指针事件的目标。设置 pointer-events: none; 后，元素及其子元素都无法被点击、hover、拖拽等

#### 鼠标事件相关属性（event）

clientX：鼠标相对于视口左上角的 X 坐标
clientY：鼠标相对于视口左上角的 Y 坐标
pageX：鼠标相对于整个文档左上角的 X 坐标（包含滚动距离）
pageY：鼠标相对于整个文档左上角的 Y 坐标
screenX：鼠标相对于屏幕左上角的 X 坐标
screenY：鼠标相对于屏幕左上角的 Y 坐标
offsetX：鼠标相对于事件源元素左上角的 X 坐标
offsetY：鼠标相对于事件源元素左上角的 Y 坐标
滚动相关属性（DOM 元素或 document）
scrollTop：元素已滚动的垂直距离（像素）
scrollLeft：元素已滚动的水平距离（像素）
scrollHeight：元素内容的总高度（包括未显示部分）
scrollWidth：元素内容的总宽度（包括未显示部分）
clientHeight：元素可视区域的高度（不含滚动条）
clientWidth：元素可视区域的宽度（不含滚动条）
offsetHeight：元素的高度（包括内边距和边框）
offsetWidth：元素的宽度（包括内边距和边框）

#### css 环境变量

```js
padding: env(safe-area-inset-top, 20px) env(safe-area-inset-right, 20px)
env(safe-area-inset-bottom, 20px) env(safe-area-inset-left, 20px);
// 用于适配刘海屏、异形屏等设备的安全区域
padding-bottom: calc(constant(safe-area-inset-bottom) + 40rpx);// 兼容老版本 注意：constant必须写在env上面
padding-bottom: calc(env(safe-area-inset-bottom) + 40rpx);
```

#### 文字省略号 css 设置

```js
text-overflow: ellipsis;
// 超出部分用省略号 ... 显示（只对单行有效，配合 overflow: hidden 和 white-space: nowrap）。
overflow: hidden;
// 超出容器的内容隐藏，不显示。
display: -webkit-box;
// 让元素成为弹性盒子模型，支持多行截断（需要 Webkit 内核，适用于小程序和部分浏览器）。
-webkit-box-orient: vertical;
// 设置弹性盒子的排列方向为垂直方向。
-webkit-line-clamp: 1;
// 限制显示的行数为 1 行，超出部分用省略号显示。
```

#### CSS 选择器

##### 一、CSS 选择器类型

1. 基本选择器
   元素选择器：div、span、p 等，选中所有该标签元素。
   类选择器：.class，选中所有 class 属性包含 class 的元素。
   ID 选择器：#id，选中 id 属性为 id 的元素。
   通配符选择器：\*，选中页面上的所有元素（优先级最低）。
2. 属性选择器
   [attr]：选中有该属性的元素。
   [attr=value]：选中属性值等于 value 的元素。
   [attr^=value]：属性值以 value 开头。
   [attr$=value]：属性值以 value 结尾。
   [attr*=value]：属性值包含 value。
3. 伪类选择器
   状态伪类：:hover、:active、:focus、:visited 等。
   结构伪类：:first-child、:last-child、:nth-child(n)、:not()、:empty 等。
4. 伪元素选择器
   ::before、::after、::first-line、::first-letter 等。
5. 组合选择器
   后代选择器：A B，选中所有在 A 元素内的 B 元素（不限层级）。
   子选择器：A > B，选中所有作为 A 元素直接子元素的 B 元素。
   相邻兄弟选择器：A + B，选中紧跟在 A 元素后的第一个 B 元素。
   通用兄弟选择器：A ~ B，选中同一父元素下，A 元素后面的所有 B 元素。
   分组选择器：div, .class, #id，选中所有满足任一条件的元素。
6. 多同级选择器（复合类选择器）
   .a.b.c.d.e.f：选中同时拥有 a、b、c、d、e、f 这六个类名的元素。

##### 二、优先级（Specificity）详细规则

CSS 优先级由四个部分组成，分别用四位数字表示（a, b, c, d）：

优先级位 说明 计数方式
a 行内样式（style 属性） 每出现一次加 1
b ID 选择器（#id） 每出现一次加 1
c 类选择器（.class）、属性选择器（[attr]）、伪类（:hover） 每出现一次加 1
d 元素选择器（div）、伪元素（::before）、通配符（\*） 每出现一次加 1
优先级计算举例：

行内样式：style="color:red" → (1,0,0,0)

#header .nav li.active a:hover

#header：b=1
.nav、.active、:hover：c=3
li、a：d=2
总优先级：(0,1,3,2)
.a.b.c.d.e.f

6 个类选择器：c=6
总优先级：(0,0,6,0)
div

元素选择器：d=1
总优先级：(0,0,0,1)

-

通配符选择器：d=1（但实际优先级最低）
[type="text"]:focus

属性选择器：c=1
伪类选择器：c=1
总优先级：(0,0,2,0)
优先级比较规则：

先比较 a，再比较 b，再比较 c，最后比较 d。
优先级高的样式覆盖低优先级的样式。
优先级相同，后写的样式覆盖前面的样式（层叠性）。
!important 可强制提升优先级，覆盖所有普通样式（但不建议滥用）。

##### 三、浏览器默认样式

浏览器会为 HTML 元素设置默认样式（如 body 的 margin，h1 的 font-size）。
默认样式优先级最低，任何自定义样式都会覆盖它。
可以用 \_ { all: unset; } 或 reset.css/normalize.css 清除默认样式。

##### 四、多个同级选择器不加空格（如 .a.b.c.d.e.f）

.a.b.c.d.e.f 是复合类选择器，表示元素必须同时拥有 a、b、c、d、e、f 这六个类名。
优先级为 (0,0,6,0)，比单一类选择器高，比 ID 选择器低。
只有 <div class="a b c d e f"> 这样的元素会被选中。

##### 五、所有选择器优先级对比表

选择器类型 示例 优先级 (a,b,c,d)
行内样式 <div style="..."> (1,0,0,0)
ID 选择器 #id (0,1,0,0)
类选择器 .class (0,0,1,0)
属性选择器 [type="text"] (0,0,1,0)
伪类选择器 :hover (0,0,1,0)
元素选择器 div (0,0,0,1)
伪元素选择器 ::before (0,0,0,1)
通配符选择器 \_ (0,0,0,1)
复合类选择器 .a.b.c.d.e.f (0,0,6,0)
后代选择器 .a .b (0,0,2,0)
子选择器 .a > .b (0,0,2,0)
相邻兄弟选择器（选中紧跟在 A 元素后面的第一个 B 元素。） .a + .b (0,0,2,0)
通用兄弟选择器（选中同一父元素下，A 元素后面的所有 B 元素（不限距离，只要在 A 后面）） .a ~ .b (0,0,2,0)
分组选择器 div, .class (0,0,0,1)/(0,0,1,0)
!important color: red !important 覆盖所有

##### 总结：

CSS 选择器类型丰富，优先级由选择器类型和数量决定。
复合类选择器（如 .a.b.c.d.e.f）优先级较高，只有同时拥有所有类名的元素才会被选中。
通配符选择器优先级最低，常用于全局样式重置。
浏览器默认样式优先级最低，任何自定义样式都能覆盖。
优先级高的样式覆盖低优先级，!important 最高但应谨慎使用。

#### CSS 动画属性详解

**一、transition 相关属性**

- transition-property：指定要过渡的 CSS 属性，如 width、background-color 等。
- transition-duration：过渡动画持续时间，单位 s 或 ms。
- transition-timing-function：过渡的速度曲线（如 linear、ease、ease-in、ease-out、cubic-bezier）。
- transition-delay：动画延迟开始的时间。
- transition：复合属性，简写形式：transition: property duration timing-function delay;

**二、animation 相关属性**

- @keyframes：定义动画关键帧。
- animation-name：指定要应用的关键帧动画名称。
- animation-duration：动画持续时间。
- animation-timing-function：动画的速度曲线。
- animation-delay：动画延迟开始的时间。
- animation-iteration-count：动画播放次数，可为数字或 infinite。
- animation-direction：动画播放方向（normal、reverse、alternate、alternate-reverse）。
- animation-fill-mode：动画结束后元素的状态（none、forwards、backwards、both）。
- animation-play-state：动画的播放与暂停（running、paused）。
- animation：复合属性，简写形式：animation: name duration timing-function delay iteration-count direction fill-mode play-state;

**三、常见动画用法示例**

```css
.box {
  transition: all 0.3s ease;
}
.box:hover {
  background: red;
  width: 200px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.fade {
  animation: fadeIn 1s ease-in;
}
```

---

#### CSS 3D 变换属性

**一、常用 3D 变换属性**

- transform: 3D 变换的核心属性，可组合多种变换。

  - rotateX(deg)：绕 X 轴旋转
  - rotateY(deg)：绕 Y 轴旋转
  - rotateZ(deg)：绕 Z 轴旋转
  - translateX(px)：沿 X 轴平移
  - translateY(px)：沿 Y 轴平移
  - translateZ(px)：沿 Z 轴平移（需开启 3D 环境）
  - scaleX(n)、scaleY(n)、scaleZ(n)：沿各轴缩放
  - perspective(n)：设置 3D 透视距离
  - matrix3d(...)：3D 变换矩阵

- transform-style: 决定子元素是否保留 3D 变换（flat/preserve-3d）。
- perspective: 为元素设置透视效果（通常加在父元素上）。
- perspective-origin: 透视点的位置。
- backface-visibility: 控制元素背面是否可见（visible/hidden）。

**二、3D 变换常见用法**

```css
/*
  .cube 立方体容器，常用于3D场景演示
  每个属性说明如下：
*/
.cube {
  transform: rotateX(45deg) rotateY(45deg) translateZ(100px); /*
    依次：
    rotateX(45deg)：绕X轴旋转45度，让立方体有立体感
    rotateY(45deg)：绕Y轴旋转45度，进一步增强空间效果
    translateZ(100px)：整体向屏幕外（Z轴正方向）移动100px，使其离视角更远
  */
  transform-style: preserve-3d; /*
    让子元素（立方体的各个面）保留各自的3D变换效果，形成真正的立体结构
  */
  perspective: 800px; /*
    设置观察者到屏幕的距离（透视距离），数值越小立体感越强，越大越平
    一般加在父容器上，影响其所有子元素的3D变换
  */
}
.cube-face {
  backface-visibility: hidden; /*
    当元素背面朝向用户时是否可见，hidden 表示背面不可见，常用于3D翻转动画
  */
}
```

**三、注意事项**

- 3D 变换需要浏览器支持，部分老旧浏览器可能不兼容。
- 使用 3D 变换时，建议为父元素设置 perspective，父元素设置 transform-style: preserve-3d（必须设置在父级，子元素设置无效），这样子元素的 3D 变换才能被保留，形成立体结构。
- backface-visibility 可用于制作翻转动画时隐藏背面。

---

#### CSS 媒体查询（Media Queries）

媒体查询是 CSS3 中的一个重要特性，用于根据设备的特性（如屏幕宽度、分辨率、方向等）应用不同的样式规则，是实现响应式设计的核心技术。

##### 一、基本语法

媒体查询有两种使用方式：

1. **在 CSS 文件中使用 @media 规则**

```css
@media media-type and (media-feature) {
  /* CSS 样式规则 */
}
```

2. **在 HTML 中使用 link 标签**

```html
<link
  rel="stylesheet"
  media="media-type and (media-feature)"
  href="style.css"
/>
```

##### 二、媒体类型（Media Types）

| 媒体类型       | 说明                     | 常用程度 |
| -------------- | ------------------------ | -------- |
| `all`          | 适用于所有设备（默认值） | ⭐⭐⭐   |
| `screen`       | 用于电脑屏幕、平板、手机 | ⭐⭐⭐   |
| `print`        | 用于打印预览和打印页面   | ⭐⭐     |
| `speech`       | 用于屏幕阅读器           | ⭐       |
| ~~`handheld`~~ | 已废弃，不建议使用       | ❌       |

##### 三、常用媒体特性（Media Features）

**1. 宽度相关**

```css
/* 最小宽度：当视口宽度 >= 768px 时生效 */
@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}

/* 最大宽度：当视口宽度 <= 767px 时生效 */
@media (max-width: 767px) {
  .container {
    width: 100%;
  }
}

/* 精确宽度：当视口宽度 = 768px 时生效（不推荐） */
@media (width: 768px) {
  /* ... */
}

/* 宽度范围：推荐使用现代语法 */
@media (768px <= width <= 1024px) {
  .container {
    width: 960px;
  }
}
```

**2. 高度相关**

```css
/* 最小高度 */
@media (min-height: 600px) {
  .sidebar {
    position: fixed;
  }
}

/* 最大高度 */
@media (max-height: 500px) {
  .header {
    height: 50px;
  }
}
```

**3. 设备方向**

```css
/* 横屏模式（宽度 > 高度） */
@media (orientation: landscape) {
  .gallery {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* 竖屏模式（高度 > 宽度） */
@media (orientation: portrait) {
  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

**4. 设备像素比（分辨率）**

```css
/* 高清屏（Retina 屏幕） */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .logo {
    background-image: url("logo@2x.png");
  }
}

/* 超高清屏（3倍屏） */
@media (-webkit-min-device-pixel-ratio: 3), (min-resolution: 288dpi) {
  .logo {
    background-image: url("logo@3x.png");
  }
}
```

**5. 颜色和显示能力**

```css
/* 支持悬停（判断是否有鼠标等精确指针设备） */
@media (hover: hover) {
  .button:hover {
    background: #007bff;
  }
}

/* 不支持悬停（触摸屏设备） */
@media (hover: none) {
  .button:active {
    background: #007bff;
  }
}

/* 支持任意指针（鼠标、触摸笔等） */
@media (pointer: fine) {
  .clickable {
    padding: 5px;
  }
}

/* 粗指针（手指触摸） */
@media (pointer: coarse) {
  .clickable {
    padding: 15px; /* 增大点击区域 */
  }
}
```

**6. 暗黑模式（Dark Mode）**

```css
/* 浅色模式（默认） */
@media (prefers-color-scheme: light) {
  body {
    background: #ffffff;
    color: #000000;
  }
}

/* 暗黑模式 */
@media (prefers-color-scheme: dark) {
  body {
    background: #1a1a1a;
    color: #ffffff;
  }
}
```

**7. 减少动画（尊重用户偏好）**

```css
/* 用户未设置减少动画偏好（默认） */
@media (prefers-reduced-motion: no-preference) {
  .animate {
    transition: all 0.3s ease;
  }
}

/* 用户偏好减少动画 */
@media (prefers-reduced-motion: reduce) {
  .animate {
    transition: none;
  }
}
```

##### 四、逻辑运算符

**1. and（与）**

```css
/* 同时满足多个条件 */
@media screen and (min-width: 768px) and (max-width: 1024px) {
  .container {
    width: 960px;
  }
}
```

**2. or（或）- 使用逗号 `,` 表示**

```css
/* 满足任意一个条件即可 */
@media (max-width: 767px), (orientation: portrait) {
  .sidebar {
    display: none;
  }
}
```

**3. not（非）**

```css
/* 排除某个条件 */
@media not screen and (min-width: 768px) {
  .mobile-only {
    display: block;
  }
}
```

**4. only（仅）**

```css
/* 仅在支持媒体查询的浏览器中生效（用于兼容老浏览器） */
@media only screen and (min-width: 768px) {
  /* ... */
}
```

##### 五、常见响应式断点（Breakpoints）

```css
/* 超小屏幕（手机，小于 576px） */
@media (max-width: 575px) {
  .container {
    width: 100%;
    padding: 0 15px;
  }
}

/* 小屏幕（手机横屏、小平板，>= 576px） */
@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}

/* 中等屏幕（平板，>= 768px） */
@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
  .nav {
    display: flex;
  }
}

/* 大屏幕（桌面，>= 992px） */
@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}

/* 超大屏幕（大桌面，>= 1200px） */
@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}

/* 超超大屏幕（>= 1400px） */
@media (min-width: 1400px) {
  .container {
    max-width: 1320px;
  }
}
```

##### 六、实用示例

**1. 移动优先（Mobile First）策略**

```css
/* 默认样式（移动端） */
.nav {
  display: block;
}

.nav-item {
  width: 100%;
  padding: 10px;
}

/* 逐步适配更大屏幕 */
@media (min-width: 768px) {
  .nav {
    display: flex;
  }
  .nav-item {
    width: auto;
  }
}
```

**2. 桌面优先（Desktop First）策略**

```css
/* 默认样式（桌面端） */
.sidebar {
  width: 250px;
  position: fixed;
  left: 0;
}

/* 逐步适配更小屏幕 */
@media (max-width: 991px) {
  .sidebar {
    width: 100%;
    position: static;
  }
}
```

**3. 打印样式优化**

```css
@media print {
  /* 隐藏不需要打印的元素 */
  .no-print,
  .nav,
  .footer,
  .ads {
    display: none !important;
  }

  /* 优化打印样式 */
  body {
    font-size: 12pt;
    color: #000;
    background: #fff;
  }

  a::after {
    content: " (" attr(href) ")"; /* 打印链接地址 */
  }
}
```

**4. 响应式图片**

```css
/* 小屏使用小图 */
.hero {
  background-image: url("hero-small.jpg");
}

/* 中等屏使用中图 */
@media (min-width: 768px) {
  .hero {
    background-image: url("hero-medium.jpg");
  }
}

/* 大屏使用大图 */
@media (min-width: 1200px) {
  .hero {
    background-image: url("hero-large.jpg");
  }
}

/* 高清屏使用 2x 图片 */
@media (min-width: 1200px) and (-webkit-min-device-pixel-ratio: 2) {
  .hero {
    background-image: url("hero-large@2x.jpg");
  }
}
```

**5. 容器查询（Container Queries）- 现代特性**

```css
/* 注意：需要浏览器支持 Container Queries */
.card-container {
  container-type: inline-size;
  container-name: card;
}

/* 当容器宽度 >= 400px 时 */
@container card (min-width: 400px) {
  .card {
    display: flex;
    flex-direction: row;
  }
}
```

##### 七、最佳实践

1. **优先使用 min-width（移动优先）**

   - 移动优先策略更易维护，符合渐进增强原则
   - 先写移动端样式，再用 `min-width` 逐步增强

2. **避免重叠的断点**

   ```css
   /* ❌ 不推荐：断点重叠 */
   @media (max-width: 768px) {
   }
   @media (min-width: 768px) {
   }

   /* ✅ 推荐：避免重叠 */
   @media (max-width: 767px) {
   }
   @media (min-width: 768px) {
   }
   ```

3. **使用 em 或 rem 单位定义断点**

   ```css
   /* 使用 em 更好地适配用户字体设置 */
   @media (min-width: 48em) {
     /* 768px / 16px = 48em */
   }
   ```

4. **测试多种设备**

   - 使用浏览器开发者工具的设备模拟功能
   - 在真实设备上测试（手机、平板、桌面）

5. **性能优化**
   - 避免在媒体查询中加载过多资源
   - 使用 `picture` 元素和 `srcset` 属性优化图片加载

##### 八、浏览器兼容性

| 特性                        | Chrome | Firefox | Safari | Edge | IE  |
| --------------------------- | ------ | ------- | ------ | ---- | --- |
| 基本媒体查询                | ✅     | ✅      | ✅     | ✅   | 9+  |
| `prefers-color-scheme`      | 76+    | 67+     | 12.1+  | 79+  | ❌  |
| `prefers-reduced-motion`    | 74+    | 63+     | 10.1+  | 79+  | ❌  |
| `hover` / `pointer`         | 41+    | 64+     | 9+     | 12+  | ❌  |
| Container Queries           | 105+   | 110+    | 16+    | 105+ | ❌  |
| 范围语法 `(width >= 768px)` | 104+   | 102+    | 16.4+  | 104+ | ❌  |

##### 九、调试技巧

```css
/* 使用特殊背景色快速识别当前断点 */
body {
  background: lightblue; /* 移动端 */
}

@media (min-width: 768px) {
  body {
    background: lightgreen; /* 平板 */
  }
}

@media (min-width: 1200px) {
  body {
    background: lightyellow; /* 桌面 */
  }
}
```

##### 十、注意事项

- 媒体查询不会增加 CSS 选择器的优先级
- `@media` 规则内的样式仍然遵循正常的层叠规则
- 使用 `@import` 结合媒体查询会影响性能，应避免使用
- 移动设备需要在 HTML 中添加 viewport 元标签：

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

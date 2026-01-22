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

padding: env(safe-area-inset-top, 20px) env(safe-area-inset-right, 20px)
env(safe-area-inset-bottom, 20px) env(safe-area-inset-left, 20px);
用于适配刘海屏、异形屏等设备的安全区域
constant(safe-area-inset-bottom) // 兼容老版本 注意：constant必须写在env上面
env(safe-area-inset-bottom)

#### 文字省略号 css 设置

text-overflow: ellipsis;
超出部分用省略号 ... 显示（只对单行有效，配合 overflow: hidden 和 white-space: nowrap）。
overflow: hidden;
超出容器的内容隐藏，不显示。
display: -webkit-box;
让元素成为弹性盒子模型，支持多行截断（需要 Webkit 内核，适用于小程序和部分浏览器）。
-webkit-box-orient: vertical;
设置弹性盒子的排列方向为垂直方向。
-webkit-line-clamp: 1;
限制显示的行数为 1 行，超出部分用省略号显示。

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
相邻兄弟选择器 .a + .b (0,0,2,0)
通用兄弟选择器 .a ~ .b (0,0,2,0)
分组选择器 div, .class (0,0,0,1)/(0,0,1,0)
!important color: red !important 覆盖所有

##### 总结：

CSS 选择器类型丰富，优先级由选择器类型和数量决定。
复合类选择器（如 .a.b.c.d.e.f）优先级较高，只有同时拥有所有类名的元素才会被选中。
通配符选择器优先级最低，常用于全局样式重置。
浏览器默认样式优先级最低，任何自定义样式都能覆盖。
优先级高的样式覆盖低优先级，!important 最高但应谨慎使用。

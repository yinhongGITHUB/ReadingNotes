

##### 进化史：

LiveScript ->JavaScript and ECMAScript规范

##### 浏览器中的JavaScript能做什么？

- 在网页中添加新的 HTML，修改网页已有内容和网页的样式。
- 响应用户的行为，响应鼠标的点击，指针的移动，按键的按动。
- 向远程服务器发送网络请求，下载和上传文件（所谓的 [AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)) 和 [COMET](https://en.wikipedia.org/wiki/Comet_(programming)) 技术）。
- 获取或设置 cookie，向访问者提出问题或发送消息。
- 记住客户端的数据（“本地存储”）。

##### 浏览器中的JavaScript不能做什么？

- js不能直接访问操作系统
- 统一浏览器的标签页、窗口之间通常是没有联系的（同源策略）
- js可以通过互联网与当前页面所在的服务器进行通信，但是从其他网站/域的服务器中接受数据的能力被削弱了。（需要响应头里面有明确的协议去允许）

##### 代码质量：

###### 1.分支结构：

![image-20220705155030568](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20220705155030568.png)

###### 2.行的长度：

一行尽量不要超过一个屏幕。实在太长的话，可以采用如下方式。

```js
// 回勾引号 ` 允许将字符串拆分为多行
let str = `
  ECMA International's TC39 is a group of JavaScript developers,
  implementers, academics, and more, collaborating with the community
  to maintain and evolve the definition of JavaScript.
`
```

###### 3.缩进

水平方向：2或4个空格（主要是代码对齐）

垂直方向：其实就是在各个逻辑块之间，留一行空行例如：

```js
function pow(x, n) {
  let result = 1;
  // 下面就是垂直方向的缩进，便于提升代码可读性
  //              <--
  for (let i = 0; i < n; i++) {
    result *= x;
  }
    
  //              <--
  return result;
}
```

###### 4.分号：

js虽然不强制每一行后续必须有分号，但是，在JavaScript中，极少数情况下，换行符又是不会被解释为分号，这种代码就容易出错。

##### 求幂

```js
alert( 2 ** 2 ); // 2² = 4
alert( 2 ** 3 ); // 2³ = 8
alert( 2 ** 4 ); // 2⁴ = 16
```

##### prompt 用法

弹出一个可输入的对话框,

```js
result = window.prompt(text, value);
// text 表示提示信息
// value 文本输入框的默认值
// result 用户在文本输入框输入的最终值
var sign = prompt("你是什么星座的？");
if (sign == "天蝎座"){
   alert("哇！我也是天蝎座的耶！");
}
```

##### 注释

尽量采用jsDoc的注释风格，并避免 “ 解释型 ” 注释

 “ 解释型 ” 注释定义：

```js
// 这里的代码会先做这件事（……）然后做那件事（……）

```

正确的jsDoc注释：（本质：直接说出代码的功能，而不需要解释每行代码做了什么）

```js
/**
 * 返回 x 的 n 次幂的值。
 *
 * @param {number} x 要改变的值。
 * @param {number} n 幂数，必须是一个自然数。
 * @return {number} x 的 n 次幂的值。
 */
function pow(x, n) {
  ...
}
```

###### 扩展： “ 自描述型 ” 代码

```js
// 即将一部分代码独立出去，面向对象编程，只关注某个函数做了什么，
function showPrimes(n) {
  for (let i = 2; i < n; i++) {
    if (!isPrime(i)) continue;
    alert(i);
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if (n % i == 0) return false;
  }

  return true;
}
```

##### 如何判断一个对象的属性是否存在

###### 1.in运算符

```js
let user = { name: "John", age: 30 };

alert( "age" in user ); // true，user.age 存在
alert( "blabla" in user ); // false，user.blabla 不存在。
```

###### 2.if判断

```js
let user = { name: "John", age: 30 };
if(user.name=== undefined)
```

##### 对象属性的循序

“ 有特别的顺序 ”：1.整数属性会被进行排序，2.其他属性则按照创建的顺序显示。

“整数属性”指的是一个可以在不做任何更改的情况下与一个整数进行相互转换的字符串。如：“49”、“41”

但是，“1.2”、“+49” 是不行的。

所以，如果不想要整数属性的排序，那么可以在每个属性前面加一个“+”，欺骗程序，达到理想预期。

###### 1.判断对象是否为空

```js
function isEmpty(obj) {
  for (let key in obj) {
    // 如果进到循环里面，说明有属性。
    return false;
  }
  return true;
}
```



##### 垃圾回收

###### 1.解决的问题：识别内存的死区

###### 2.判定规则：如果一个对象可以通过一些指针链从一个定义为活的对象到达，那么它就是活的。其他的都是垃圾。

即：如果一个对象被根对象或另一个活动对象指向（指向其实就是某对象的属性引用了这个对象），则该对象是*活动的*

```js
// 这就是一个根对象下的活动对象
let a = {
    name:"张三"
}
a = null
// 那么此时{name:"张三"}这个对象就没有被活动对象指向了，就成了垃圾
```

##### 可选链?.

###### 1.定义：

注意：?.  这个叫做可选链，并不要理解为? 和 . 分开理解是错的

```js
let user = {}; // user 没有 address 属性

alert( user?.address?.street ); // undefined（不报错）

```

###### 2.注意事项

`?.`前的变量必须已声明

不要过度使用可选链

###### 3.其他变体: 

 ?.()   调用方法

```js
let userAdmin = {
  admin() {
    alert("I am admin");
  }
};

let userGuest = {};
userAdmin.admin?.(); // I am admin
userGuest.admin?.(); // 啥都没发生（没有这样的方法）
```

 ?.[]   获取对象属性

```js
let key = "firstName";

let user1 = {
  firstName: "John"
};

let user2 = null;

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined

```

##### Symbol不可转换成其他类型，例如字符串

```js
let a = Symbol("1")
alert(a)// 这里会报错，alert会强制转换成字符串输出，但是Symbol不可转换，故报错
```

注意：alert会打印字符串，给它的值，会强制转换成字符串，转不了就报错

##### 字符串调用方法的过程

注意：原始类型本身不是一个对象,只是创建了一个临时对象去储存这个原始类型的值

```js
let str = "Hello";

alert( str.toUpperCase() ); // HELLO

1. 字符串 str 是一个原始值。因此，在访问其属性时，会创建一个包含字符串字面值的特殊对象，并且具有可用的方法，例如 toUpperCase()。
2. 该方法运行并返回一个新的字符串（由 alert 显示）。
3. 特殊对象被销毁，只留下原始值 str。
```

```js
let str = "Hello";

str.test = 5; // (*)

alert(str.test);
// undefined（非严格模式）
// 报错（严格模式）。
/*
为什么？让我们看看在 (*) 那一行到底发生了什么：

当访问 str 的属性时，一个“对象包装器”被创建了。
在严格模式下，向其写入内容会报错。
否则，将继续执行带有属性的操作，该对象将获得 test 属性，但是此后，“对象包装器”将消失，因此在最后一行，str 并没有该属性的踪迹。
*/
```

##### null/undefined 没有任何方法，从某种意义上说，他们是 ” 最原始的 “ 

##### 数字表示

```js
1e3 === 1 * 1000// e3 表示有3个0
1e-3 === 1 / 1000 // e-3 表示除以3个0
```

##### 0.1+0.2 !== 0.3

###### 理解：

```js
什么是 0.1？0.1 就是 1 除以 10，1/10，即十分之一。在十进制数字系统中，这样的数字表示起来很容易。将其与三分之一进行比较：1/3。三分之一变成了无限循环小数 0.33333(3)。
// 加入十进制，进行比较，更加便于理解
在二进制数字系统中，可以保证以 2 的整数次幂作为除数时能够正常工作，其他数作为除数时，都会出现无限小数的情况
使用二进制数字系统无法 精确 存储 0.1 或 0.2，就像没有办法将三分之一存储为十进制小数一样。

0.1.toFixed(20)// 0.10000000000000000555
0.2.toFixed(20)// 0.20000000000000001110
0.3.toFixed(20)// 0.29999999999999998890
0.4.toFixed(20)// 0.40000000000000002220
0.5.toFixed(20)// 0.50000000000000000000// 只有分母是2的整数次幂时，才会准确存储
```

###### 解决办法：

注意：0.1和0.2都扩大十倍，确实可以准确计算，那0.28+0.14呢？扩大一百倍，但是还是不等于0.42

**所以，倍数扩大可以减小误差，但是不能消除误差**

更优的解决办法是：**及时斩断尾巴**。说出这种话就表示，js本身语言的缺陷就是不能表示小数，这是无法消除的，只能想办法避免。

##### 0 和 -0

在储存时，还有一位符号位，这种区别并不明显，因为运算符将它们视为相同的值。

##### 注意：在所有数字函数中，包括 `isFinite`，空字符串或仅有空格的字符串均被视为 `0`

##### 用`Object.is` 进行比较

有一个特殊的内建方法 `Object.is`，它类似于 `===` 一样对值进行比较，但它对于两种边缘情况更可靠：

1. 它适用于 `NaN`：`Object.is(NaN, NaN) ===> true`，这是件好事(此时NaN的唯一性仿佛消失了)。
2. 值 `0` 和 `-0` 是不同的：`Object.is(0,-0) === false`，从技术上讲这是对的，因为在内部，数字的符号位可能会不同，即使其他所有位均为零。

在所有其他情况下，`Object.is(a, b)` 与 `a === b` 相同。

这种比较方式经常被用在 JavaScript 规范中。当内部算法需要比较两个值是否完全相同时，它使用 `Object.is`（内部称为 [SameValue](https://tc39.github.io/ecma262/#sec-samevalue)）。

##### 取固定区域随机整数数的方法

```js
function randomInteger(min, max){
    //加一是为了确保每个整数取到的概率都是一样的   因为Math.random()是0到1的随机数，但是不包括1所以要加一
    let rand = min + Math.random() * (max + 1 - min)
    //向下取整
    return Math.floor(rand)
}
```

##### splice

允许负向索引

```js
let arr = [1, 2, 5];

// 从索引 -1（尾端前一位）
// 删除 0 个元素，
// 然后插入 3 和 4
arr.splice(-1, 0, 3, 4);

alert( arr ); // 1,2,3,4,5
// 负几就是尾端的前几位，很容易注意到，splice是没有办法直接再最后一位之后添加元素的
```

##### concat

如果**类数组**对象具有 `Symbol.isConcatSpreadable` 属性，那么它就会被 `concat` 当作一个数组来处理：此对象中的元素将被添加

```js
let arr = [1, 2];

let arrayLike = {
  0: "something",
  1: "else",
  [Symbol.isConcatSpreadable]: true,
  length: 2
};

alert( arr.concat(arrayLike) ); // 1,2,something,else
```

##### includes可以处理NaN

```js
const arr = [NaN];
alert( arr.indexOf(NaN) ); // -1（错，应该为 0）
alert( arr.includes(NaN) );// true（正确）
// 这是因为 includes 是在比较晚的时候才被添加到 JavaScript 中的，并且在内部使用了更新了的比较算法。
```


























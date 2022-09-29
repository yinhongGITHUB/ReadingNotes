
##### 书本类型：电子书
##### 书本链接：https://zh.javascript.info

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

![image-20220705155030568](https://github.com/yinhongGITHUB/ReadingNotes/blob/main/images/ModernJSTutorial/image-20220705155030568.png)

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

注：concat不会改变原数组，不管是下方的arr或者arrayLike，而是返回一个新数组

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

##### sort

sort默认将数组中的值变成字符串，然后用他们的UTF-16 进行比较，例如：

```js
let arr = [ 1, 2, 15 ];

// 该方法重新排列 arr 的内容
arr.sort();

alert( arr );  // 1, 15, 2
// 因为 "2" > "15" 所以2会排在15后面
// 想要解决这个问题
arr.sort( (a, b)=> a - b ) 
// a、b是两个相邻的项
// 回调函数返回值为正数时，a、b互换。为0时，a、b不动。为负数时，a、b不动
```

##### localeCompare

比较两个字符串的大小，可配合上面的sort使用

```js
let countries = ['Österreich', 'Andorra', 'Vietnam']; 
countries.sort( (a, b) => a.localeCompare(b)
// 前提，字符串对象下面才有这个方法，用于比较两个字符串的大小
```

##### 可迭代的对象的关键

1. Symbol.iterator：迭代器，

2. next()方法

```js
// 写法一     
let obj = {
        from: 1,
        to: 5,
        // 迭代器 
        [Symbol.iterator]() {
          this.current = this.from;
          return this;
        },
		// 下一步	
        // next() 方法返回的结果的格式必须是 {done: Boolean, value: any}，当 done=true 时，表示循环结束，否则 value 是下一个值
        next() {
          if (this.current <= this.to) {
            return { done: false, value: this.current++ };
          } else {
            return { done: true };
          }
        },
      };

      for (let key of obj) {
        console.log(key);// 1,2,3,4,5
      }
// 写法二（推荐⭐）
let range = {
    from:1,
    to:5,
}
// 给range加一个迭代器，迭代器可以让当前对象变成一个可枚举的对象
range[Symbol.iterator] = function(){
    return {
        current: this.from,
        last: this.to,
        next:function(){
            if(this.current <= this.last){
                return {
                    done:false,
                	value:this.current++,
                }
            }else{
                return {
                    done:true
                }
            }
        }
    }
}

      for (let key of range) {
        console.log(key);// 1,2,3,4,5
      }
```

##### 关于Map你不知道的事情

###### 1.map获取数据的两种方式

```js

// 第一种
map.get(key)
// 第二种,这样会将该map视为JavaScript的plain object，因此它暗含了所有相应的限制（仅支持string/symbol）而且，map[key]获取不到正常设置的map元素，例子如下：
map[key]
    let a = new Map([
        ["name", "张三"],
        [21, "李四"],
      ]);

      console.log(a.get("name"));
      let key = "name";
      a[key] = 2;
      console.log(a[key]);
// 此时map数据结构如下，可以明显看到，set设置的元素和直接map[key]设置的元素是完全不同的，所以不可能互通拿取（互通拿取定义：set设置的元素，map[key]获取不到）
```

![image-20220926105518658](https://github.com/yinhongGITHUB/ReadingNotes/blob/main/images/ModernJSTutorial/image-20220926105518658.png)

###### 2.Map的key可以是对象以及任意类型，既然如此，`Map` 是怎么比较键的？

`Map` 使用 [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero) 算法来比较键是否相等。它和严格等于 `===` 差不多，但区别是 `NaN` 被看成是等于 `NaN`。所以 `NaN` 也可以被用作键。

这个算法不能被改变或者自定义。

###### 3.**链式调用**

每一次 `map.set` 调用都会返回 map 本身，所以我们可以进行“链式”调用：

```javascript
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```

###### 3.关于map如何迭代

```js
map.keys() —— 遍历并返回一个包含所有键的可迭代对象，
map.values() —— 遍历并返回一个包含所有值的可迭代对象，
map.entries() —— 遍历并返回一个包含所有实体 [key, value] 的可迭代对象，for..of 在默认情况下使用的就是这个。
```

注意：迭代的顺序与插入值的顺序相同

##### set注意事项

set是没有 “ 键 ” 的，只有值，并且，每个值只能出现一次。

##### Array.from注意事项

```js
 var obj = new Object({
        name: "web_sea",
        age: 18,
        isRich: [false, true],
      });
      //将对象转成数组
      var objs = [];
      for (var i in obj) {
        objs.push(obj[i]);
      }

      var arrObj = Array.from(objs);
      console.log("objs:", objs); //objs: [ 'web_sea', 18, [false,true] ]
      console.log("arrObj:", arrObj); //arrObj:[ 'web_sea', 18, [false,true] ]
      //我们要改变objs子对象的值；
      objs[2][0] = "哈哈哈哈";
      //改变第一层数据的值
      objs[1] = 50;
      console.log("改变objs后objs:", objs); //[ 'web_sea', 50, [ true, true ] ]
      console.log("改变objs后arrObj:", arrObj); //arrObj:[ 'web_sea', 18, [ true, true ] ]
```

结论：Array.from的子对象是浅拷贝，所以，Array.from是浅拷贝，但是Array.from的第一层还是深拷贝的，这点要注意哦

##### WeakMap注意事项

1. ###### WeakMap的key**只能是**对象，而且这个key已经会被垃圾回收机制回收，但是map的key，只要存了，就不会丢失。如下：

```js
// 1. weakMap的key只能是对象
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // 正常工作（以对象作为键）

// 不能使用字符串作为键
weakMap.set("test", "Whoops"); // Error，因为 "test" 不是一个对象
let john = { name: "John" };

// 2. weakMap的key就算存储了值，也已经会被垃圾回收机制回收内存
let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // 覆盖引用

// john 被从内存中删除了！
// 注意： 如果 john 消失，"..." 将会被自动清除
```

2. ###### WeakMap有如下方法，暂不支持获取WeakMap的所有键/值的方法

```js
weakMap.get(key)
weakMap.set(key, value)
weakMap.delete(key)
weakMap.has(key)
```

3. ###### 使用场景

使用场景一：

例如，我们有用于处理用户访问计数的代码。收集到的信息被存储在 map 中：一个用户对象作为键，其访问次数为值。当一个用户离开时（该用户对象将被垃圾回收机制回收），这时我们就不再需要他的访问次数了。

下面是一个使用 `Map` 的计数函数的例子：

```js
// 📁 visitsCount.js
let visitsCountMap = new Map(); // map: user => visits count

// 递增用户来访次数
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
// 📁 main.js
let john = { name: "John" };

countUser(john); // count his visits

// 不久之后，john 离开了
john = null;
```

现在，`john` 这个对象应该被垃圾回收，但它仍在内存中，因为它是 `visitsCountMap` 中的一个键。

当我们移除用户时，我们需要清理 `visitsCountMap`，否则它将在内存中无限增大。在复杂的架构中，这种清理会成为一项繁重的任务。

我们可以通过使用 `WeakMap` 来避免这样的问题：

```js
// 📁 visitsCount.js
let visitsCountMap = new WeakMap(); // weakmap: user => visits count

// 递增用户来访次数
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

总结：WeakMap和Map的区别就是，WeakMap不需要手动去清楚，避免了很多麻烦，当john离开时，利用垃圾清除机制，自动清楚了该条数据。

##### WeakSet注意事项

WeakSet跟WeakMap的特性差不多，也是只能添加对象

##### WeakMap/WeakSet大总结

`WeakMap/WeakSet` 完成其主要工作 —— 为在其它地方存储/管理的对象数据提供“额外”存储。即额外存储的数据会随着对象的消失而消失。

`WeakMap` 是类似于 `Map` 的集合，它仅允许对象作为键，并且一旦通过其他方式无法访问这些对象，垃圾回收便会将这些对象与其关联值一同删除。

`WeakSet` 是类似于 `Set` 的集合，它仅存储对象，并且一旦通过其他方式无法访问这些对象，垃圾回收便会将这些对象删除。




















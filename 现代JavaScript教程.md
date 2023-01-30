
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

#####  对象结构赋值时注意点

###### 1.当解构时和let不在一行时，防止被当成代码块解析

```js
let title, width, height;

// 这一行发生了错误
{title, width, height} = {title: "Menu", width: 200, height: 100};
// 报错原因：
// js把 “ 主代码流 ” 的{}当作一个代码块，而不是一个结构赋值语句，就会报错
// 解决办法如下：用括号括起来就可以了
({title, width, height} = {title: "Menu", width: 200, height: 100});
```

###### 2.解构赋值再函数参数上的妙用

```js
// 这样在调用函数时，首先参数对象成了非必填项，当所有参数都用默认值时，可以直接调用而不用传入空对象
// 然后从空对象上面进行解构赋值的属性都给予了默认值
function showMenu({ title = "Menu", width = 100, height = 200 } = {}) {
  alert( `${title} ${width} ${height}` );
}

showMenu();
```

##### 基准测试的定义

这种性能测量通常称为“基准测试（benchmark）”。

比如计算两个同样功能的函数哪个更快

##### JSON.stringify的三个参数

第一个参数：需要转编码的值

第二个参数：一个函数或一个数组，两个参数，(key,value)=>{} key就是对象的key，value就是对象的value，可以设置哪些属性被转化成JSON字符串。数组的话就是字符串数组，包括哪些属性被转化成JSON字符串的key。

第三个参数：格式化空格的数量（即JSON字符串会换行，每行前面有几个空格呢？就是这里设置的）

注意：跟JSON.parse不同，第二个参数函数，就是设置哪些属性进返回结果的，所以直接判断哪些熟悉可以进结果。

```js
let meetup = {
      title: "Conference",
      participants: [{ name: "John" }, { name: "Alice" }],
    };

console.log(
  JSON.stringify(meetup, function replacer(key, value) {
     return key == "title" ? undefined : value;
  })
); 
```



##### JSON.parse的两个参数

第一个参数：需要转编码的值。

第二个参数：一个函数,两个参数，(key,value)=>{} key就是对象的key，value就是对象的value，可以设置哪些属性返回什么哪些不返回。

注意：函数必须有  return value;不然会是undefined。

```js
     let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

      let meetup = JSON.parse(str, function (key, value) {
        if (key == "date") return undefined;
        return value;
      });

      console.log(meetup);
```

##### 箭头函数

箭头函数没有自身的 `this`。现在我们知道了它们也没有特殊的 `arguments` 对象

`arguments` 只是一个类数组的可迭代对象，并没有数组对象的那些方法。

##### Array.from

将可迭代对象转化出真正的数组

```js
let str = "Hello";

// Array.from 将可迭代对象转换为数组
alert( Array.from(str) ); // H,e,l,l,o
```

##### 如何判断两个数组中的内容相同？

```js
JSON.stringify(arr1) === JSON.stringify(arr2)
```

##### 扩展运算符注意点

```js
let a = [1,2,3]
let b = [...a]
// 如果只有一层，确实是深拷贝
let a = [1,2,{name:"张三"}]
let b = [...a]
第一层确实是深拷贝了，第二层没有
```

##### js的预解析机制

1. var和函数都会被预解析（即变量提升和函数提升）
2. 变量**声明会被提升，但是赋值不会。**函数则是整个都提升了，比较函数可没有赋值的等于号

```js
var a = 1
function a(){
    console.log(1)
}
console.log(a) // 1
```

##### var注意事项

全局作用域下var声明的变量或者直接a=1的变量，会被挂载到window上面

##### 函数作用域this指向的问题

函数内的this是谁调用它就是谁

##### llFE形成的块级作用域(不推荐使用)

也叫立即调用函数

```js
(function(){
    console.log("哈哈哈哈")
})()
// 这里可以传参数
(function(i){
    console.log("哈哈哈哈")
})(i)
```

##### 全局对象

在浏览器中，使用var声明的全局函数和全局变量会成为全局对象的属性。

（注意：function声明的函数也会挂载到全局对象上）

##### 函数对象

每个函数其实都是一个对象

###### 内建属性name（它返回的是字符串类型的函数名）

```js
function test(){
    
}
let test = function() {
    
}
console.log(test.name)// test 每个函数其实都是一个对象，对象下面有个name属性，其实就是函数名（注意： 名字是string类型）
```

但有时，也会出现引擎无法推测名字的情况

```js
// 函数是在数组中创建的
let arr = [function() {}];

alert( arr[0].name ); // <空字符串>
// 引擎无法设置正确的名字，所以没有值
```

###### 内建属性length（它返回函数入参的个数）

```js
function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}

alert(f1.length); // 1
alert(f2.length); // 2
alert(many.length); // 2
```

**pointer-events**

pointer-events 属性是一个指针属性，是用于控制在什么条件下特定的图形元素可以成为指针事件的目标。pointer-events 属性有很多值，但是对于浏览器来说，适用于 **HTML** 元素的只有三个值，其它的几个值都是针对 **SVG** 元素的

```js
1. none：该元素永远不会成为鼠标事件的 target。但是，当其后代元素的 pointer-events 属性指定其他值时，鼠标事件可以指向后代元素，在这种情况下，鼠标事件将在捕获或冒泡阶段触发父元素的事件侦听器 (鼠标的动作将不能被该元素及其子元素所捕获，但是能够被其父元素所捕获)。
2. auto：默认值，表示指针事件已启用；此时元素会响应指针事件，阻止这些事件在其下面的元素上触发。对于 SVG 内容，该值与 visiblePainted 效果相同。
3. inherit：将使用 pointer-events 元素的父级的值。
```

##### 自定义属性

```js
function sayHi() {
  alert("Hi");

  // 计算调用次数
  sayHi.counter++;
}
sayHi.counter = 0; // 初始值

sayHi(); // Hi
sayHi(); // Hi

alert( `Called ${sayHi.counter} times` ); // Called 2 times
/*
被赋值给函数的属性，比如 sayHi.counter = 0，不会 在函数内定义一个局部变量 counter。换句话说，属性 counter 和变量 let counter 是毫不相关的两个东西。
我们可以把函数当作对象，在它里面存储属性，但是这对它的执行没有任何影响。变量不是函数属性，反之亦然。它们之间是平行的。
*/
```

##### 命名函数表达式

```js
/*
关于名字 func 有两个特殊的地方，这就是添加它的原因：

它允许函数在内部引用自己。
它在函数外是不可见的。

添加func的好处是：防止sayHi被外部代码改变 或者 出现变量重名的情况导致sayHi 无法正常工作
*/
let sayHi = function func(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
    func("Guest"); // 使用 func 再次调用函数自身或者 sayHi('test')调用自身都可以
  }
};

sayHi(); // Hello, Guest

// 但这不工作：
func(); // Error, func is not defined（在函数外不可见）
```

##### 关于alert()与console.log()对于toString的自调用

###### **[1]alert()**

  [1.1]有阻塞作用，不点击确定，后续代码无法继续执行

  [1.2]alert()只能输出string,如果alert输出的是对象会自动调用toString()方法

​    e.g. alert([1,2,3]);//'1,2,3'

  [1.3]alert不支持多个参数的写法,只能输出第一个值

​    e.g. alert(1,2,3);//1

###### **[2]console.log()**

  [2.1]在打印台输出

  [2.2]可以打印任何类型的数据  注意：其实console.log也会自动调用toString()方法

​    e.g. console.log([1,2,3]);//[1,2,3]

  [2.3]支持多个参数的写法

​    e.g. console.log(1,2,3)// 1 2 3  

##### “ new Function ”语法

通过字符串来创建函数

```js
eg:
let sum = new Function('a', 'b', 'return a + b');
alert( sum(1, 2) ); // 3

eg:
let sayHi = new Function('alert("Hello")');
sayHi(); // Hello

// 使用场景：
let str = ... 动态地接收来自服务器的代码 ...
let func = new Function(str);
func();

```

注意： new Function所声明的函数其this指向全局环境，并**不指向**当前的词法环境

```js
function getFunc() {
  let value = "test";

  let func = new Function('alert(value)');

  return func;
}

getFunc()(); // error: value is not defined   无法访问到当前词法作用域的局部变量

// 但是下方这样是可以的
  let value = "test";
  let func = new Function('alert(value)');
// 可以访问到全局环境下定义的全局变量
```

##### 调度：setTimeout 和 setInterval

###### **嵌套的 `setTimeout` 相较于 `setInterval` 能够更精确地设置两次执行之间的延时。**

setInterval 

```js
eg:
let i = 1;
setInterval(function() {
  func(i++);
}, 100);

执行间隔为：100毫秒  或者  func执行的时间（出现的情况就是 func执行时间大于100毫秒时出现）

原因：
因为 func 的执行所花费的时间“消耗”了一部分间隔时间
也可能出现这种情况，就是 func 的执行所花费的时间比我们预期的时间更长，并且超出了 100 毫秒。
在这种情况下，JavaScript 引擎会等待 func 执行完成，然后检查调度程序，如果时间到了，则 立即 再次执行它。
极端情况下，如果函数每次执行时间都超过 delay 设置的时间，那么每次调用之间将完全没有停顿。

```

setTimeout

```js
eg:
let i = 1;
setTimeout(function run() {
  func(i++);
  setTimeout(run, 100);
}, 100);
执行间隔为：func本身执行时间 + 100毫秒
```

值得注意的是：**零延时实际上不为零****（在浏览器中）**

```js
eg: setTimeout(func, 0)
```

在浏览器环境下，嵌套定时器的运行频率是受限制的。根据 [HTML5 标准](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers) 所讲：“经过 5 重嵌套定时器之后，时间间隔被强制设定为至少 4 毫秒”。

##### 对象的属性标志

```js
value - 当前属性的值
writable — 如果为 true，则值可以被修改，否则它是只可读的。
enumerable — 如果为 true，则会被在循环中列出，否则不会被列出。
configurable — 如果为 true，则此属性可以被删除，这些特性也可以被修改，否则不可以。
    *注意，当configurable为false时，上面三个属性标志都不能修改*
```

Object.getOwnPropertyDescriptor(obj, propertyName)可以查询对象的某个属性的/*详细信息/*

**obj** 需要从中获取信息的对象

**propertyName **属性的名称

```js
let user = {
  name: "John"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/* 属性描述符：
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/
```

Object.defineProperty(obj, propertyName, descriptor) 可以设置对象的某个属性需要应用的描述符

**obj** , **propertyName** 要应用描述符的对象及其属性。

**descriptor** 要应用的属性描述符对象。

```js
let user = {};

Object.defineProperty(user, "name", {
  value: "John"
});

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": "John",
  "writable": false,
  "enumerable": false,
  "configurable": false
}
 */
```

注意：在使用Object.defineProperty时，第三个参数 描述符对象。空对象就默认那三个**属性标志**为false，value为undefined




























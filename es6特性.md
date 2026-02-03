# ES6（ECMAScript 2015）新特性全览

ES6 是 JavaScript 语言的重大升级，带来了大量新特性，主要包括：

## 1. let 和 const

- let：块级作用域变量声明。
  ```js
  let a = 1;
  a = 2; // 可以重新赋值
  ```
- const：块级作用域常量声明。
  ```js
  const PI = 3.14;
  // PI = 3; // 报错，不能重新赋值
  ```

## 2. 块级作用域

- 新增块级作用域，避免变量提升和全局污染。
  ```js
  {
    let x = 10;
    const y = 20;
  }
  // console.log(x, y); // 报错，x 和 y 只在块内有效
  ```

## 3. 模板字符串

- 使用反引号（`）定义字符串，支持插值表达式和多行字符串。
  ```js
  const name = "张三";
  const msg = `你好，${name}！\n今天是：${new Date().toLocaleDateString()}`;
  console.log(msg);
  ```

## 4. 解构赋值

- 支持数组和对象的解构赋值，简化变量提取。
  ```js
  // 数组解构
  const [a, b] = [1, 2];
  // 对象解构
  const { x, y } = { x: 10, y: 20 };
  ```

## 5. 箭头函数

- 更简洁的函数写法，自动绑定 this。
  ```js
  const add = (a, b) => a + b;
  console.log(add(1, 2)); // 3
  ```

#### 箭头函数的特点

1. 没有自己的 this
   箭头函数不会创建自己的 this，内部 this 继承自外层作用域（词法作用域）。
   适合用在回调、定时器等场景，避免 this 指向混乱。

2. 没有 arguments 对象
   箭头函数内部没有 arguments，需用 rest 参数 ...args 获取参数。

3. 不能作为构造函数
   不能用 new 调用箭头函数，否则会报错。

4. 没有 prototype 属性
   箭头函数没有 prototype，不能用作类（这里的类指的是**构造函数**）或原型方法。

5. 不能使用 super 和 new.target
   箭头函数内部不能用 super 和 new.target。

## 6. 默认参数值

- 函数参数支持默认值。
  ```js
  function greet(name = "游客") {
    return `你好，${name}`;
  }
  console.log(greet()); // 你好，游客
  ```

## 7. 剩余参数和扩展运算符

- ...rest 用于收集剩余参数。
  ```js
  function sum(...nums) {
    return nums.reduce((a, b) => a + b, 0);
  }
  sum(1, 2, 3); // 6
  ```
- ...spread 用于展开数组、对象等。
  ```js
  const arr1 = [1, 2];
  const arr2 = [...arr1, 3]; // [1, 2, 3]
  const obj1 = { a: 1 };
  const obj2 = { ...obj1, b: 2 }; // {a: 1, b: 2}
  ```

## 8. 对象字面量增强

- 属性简写、方法简写、计算属性名。
  ```js
  const age = 18;
  const person = {
    age, // 属性简写
    sayHi() {
      // 方法简写
      console.log("Hi");
    },
    ["user" + "Id"]: 123, // 计算属性名
  };
  ```

## 9. Symbol 类型

- 新增原始数据类型 Symbol，常用于对象属性唯一标识。
  ```js
  const s1 = Symbol("desc");
  const obj = {};
  obj[s1] = 123;
  ```

## 10. Set 和 Map

- Set：无重复值的集合。
  ```js
  const s = new Set([1, 2, 2, 3]); // {1, 2, 3}
  s.add(4);
  s.has(2); // true
  ```
- Map：键值对集合，键可为任意类型。
  ```js
  const m = new Map();
  m.set("a", 1);
  m.set({ x: 1 }, 2);
  m.get("a"); // 1
  ```

##### map 的循环

```js
const map = new Map([
  ["a", 1],
  ["b", 2],
]);
const iterator = map.entries();
// const iterator = map.values();
// const iterator = map.keys();

console.log(iterator.next().value); // ['a', 1]
console.log(iterator.next().value); // ['b', 2]
```

## 11. for...of 循环

- 用于遍历可迭代对象（数组、Set、Map、字符串等）。

  ```js
  for (const item of [1, 2, 3]) {
    console.log(item);
  }
  ```

##### for...of 和 for...in 的区别如下：

1. 遍历内容不同：

for...in 遍历对象的“可枚举属性名”（包括原型链上的），适合遍历对象属性。
for...of 遍历“可迭代对象”的值（如数组、Set、Map、字符串等），适合遍历集合的元素。

2. 适用对象不同：

for...in 适用于对象、数组（但不推荐遍历数组）。
for...of 只能用于实现了迭代器协议的对象（如数组、Set、Map、字符串等）。

3. 返回值不同：

for...in 返回的是属性名（字符串）。
for...of 返回的是元素的值。

4. 推荐用法：

遍历对象属性用 for...in。
遍历数组、Set、Map、字符串等集合用 for...of。

```js
const arr = [10, 20, 30];
for (const i in arr) {
  console.log(i); // 0, 1, 2
}
for (const v of arr) {
  console.log(v); // 10, 20, 30
}
```

## 12. 类（Class）

- 新的类语法，支持继承、构造函数、静态方法等。
  ```js
  class Animal {
    constructor(name) {
      this.name = name;
    }
    say() {
      console.log("My name is " + this.name);
    }
    static info() {
      return "动物类";
    }
  }
  class Dog extends Animal {
    bark() {
      console.log("汪汪");
    }
  }
  ```

## 13. 模块化（ES Module）

- import/export 语法，支持模块化开发。
  ```js
  // a.js
  export const foo = 123;
  // b.js
  import { foo } from "./a.js";
  ```

## 14. Promise

- 原生支持 Promise，简化异步编程。
  ```js
  const p = new Promise((resolve, reject) => {
    setTimeout(() => resolve("ok"), 1000);
  });
  p.then((res) => console.log(res));
  ```

## 15. 生成器（Generator）

- function\* 语法，yield 关键字，支持迭代和异步流程控制。
  ```js
  function* gen() {
    yield 1;
    yield 2;
  }
  const g = gen();
  console.log(g.next()); // {value: 1, done: false}
  ```

## 16. Proxy 和 Reflect

- Proxy：拦截对象操作。
  ```js
  const obj = { a: 1 };
  const proxy = new Proxy(obj, {
    get(target, key) {
      return key in target ? target[key] : 0;
    },
  });
  proxy.a; // 1
  proxy.b; // 0
  ```
- Reflect：操作对象的新 API。
  ```js
  Reflect.set(obj, "b", 2);
  Reflect.get(obj, "b"); // 2
  ```

## 17. 新的内置方法

- Array、Object、String、Number、Math、RegExp 等新增大量方法。
  ```js
  [1, 2, 3].includes(2); // true
  Object.assign({}, { a: 1 }); // {a: 1}
  Number.isNaN(NaN); // true
  Math.trunc(3.14); // 3
  /abc/.test("abc"); // true
  ```

## 18. Number、Math、String、Array 扩展

- Number.isNaN、Number.isFinite、Math.trunc、Math.sign 等。
  ```js
  Number.isNaN(NaN); // true
  Math.sign(-5); // -1
  Math.trunc(3.99); // 3
  ```
- String.includes、startsWith、endsWith、repeat、padStart、padEnd。
  ```js
  "hello".includes("ll"); // true
  "abc".padStart(5, "0"); // '00abc'
  "abc".repeat(2); // 'abcabc'
  ```
- Array.from、Array.of、find、findIndex、fill、copyWithin、entries、keys、values。
  ```js
  Array.from("foo"); // ['f','o','o']
  Array.of(1, 2, 3); // [1,2,3]
  [1, 2, 3].find((x) => x > 1); // 2
  [1, 2, 3].fill(0, 1, 2); // [1,0,3]
  ```

## 19. 新的数据结构

- WeakSet、WeakMap。
  ```js
  const ws = new WeakSet();
  const wm = new WeakMap();
  let obj = {};
  ws.add(obj);
  wm.set(obj, 123);
  ```

##### WeakMap 与 Map 的区别：

1. 键类型：

Map 的键可以是任意类型（对象或基本类型）。
WeakMap 的键只能是对象（且不能是 null），不能用基本类型作为键。

2. 垃圾回收：

Map 对键是强引用，只有手动删除才会释放。
WeakMap 对键是弱引用，如果键对象没有其他引用，会被垃圾回收，WeakMap 自动移除对应的键值对。
可遍历性：

Map 支持 size 属性和 forEach、keys、values、entries 等遍历方法。
WeakMap 不能遍历，没有 size 属性，也没有遍历方法。

3. 应用场景：

Map 适合需要完整数据结构、可遍历、可统计的场景。
WeakMap 适合做对象的私有数据存储、缓存、DOM 关联等，防止内存泄漏。

##### WeakSet 与 Set 的区别：

1. 元素类型：

Set 的元素可以是任意类型。
WeakSet 的元素只能是对象，不能是基本类型。

2. 垃圾回收：

Set 强引用元素，只有手动删除才会释放。
WeakSet 弱引用对象元素，对象无其他引用时会被自动回收，WeakSet 自动移除。
可遍历性：

Set 支持 size 属性和 forEach、keys、values、entries 等遍历方法。
WeakSet 不能遍历，没有 size 属性，也没有遍历方法。

3. 应用场景：

Set 适合需要完整集合、可遍历、可统计的场景。
WeakSet 适合存储对象引用、临时集合，防止内存泄漏。

## 20. 二进制和八进制字面量

- 0b/0B 表示二进制，0o/0O 表示八进制。
  ```js
  let bin = 0b1010; // 10
  let oct = 0o12; // 10
  ```

## 21. 新的 API

- Object.assign、Object.is、Object.setPrototypeOf、Object.getOwnPropertySymbols 等。
  ```js
  Object.assign({}, { a: 1 });
  Object.is(NaN, NaN); // true
  Object.setPrototypeOf({}, null);
  Object.getOwnPropertySymbols({ [Symbol("id")]: 1 });
  ```

## 22. 尾调用优化

- 支持尾递归优化（部分实现）。
  ```js
  function factorial(n, acc = 1) {
    if (n <= 1) return acc;
    return factorial(n - 1, n * acc); // 尾递归
  }
  factorial(5); // 120
  ```

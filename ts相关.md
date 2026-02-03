#### 一些关于类型的判断

```js
enum activeNameEnum {
store_key = 'store_label',
business_key = 'business_label',
}

// keyof typeof activeNameEnum 的类型是 "store_key" | "business_key"
type TabKeys = keyof typeof activeNameEnum;

// 用法示例
let tab: TabKeys;
tab = "store_key"; // 合法
tab = "business_key"; // 合法
// tab = "store_label"; // 不合法，类型检查会报错

let a: typeof activeNameEnum;
// a = activeNameEnum; // 合法
// a = activeNameEnum.store_label; // 不合法

let b: activeNameEnum;
// b = activeNameEnum.store_label; // 合法
// b = 'store_label'; // 合法
// b = activeNameEnum; // 不合法

```

#### ts 的索引签名

TypeScript 要求：数字索引签名的值类型，必须是字符串索引签名值类型的子类型。
因为在 JavaScript 中，所有的数字索引其实都会被转换为字符串索引（如 obj[1] 等价于 obj["1"]）。
所以 TypeScript 规定，字符串索引类型要兼容数字索引类型，否则会导致类型不安全。
举个例子：

```js
interface Example {
  [key: string]: Animal; // 字符串索引
  [index: number]: Dog; // 数字索引
}
obj[1]其实会去拿obj["1"],也就是说，输入obj[1]和obj["1"]拿到的值是同一个，但是，做类型检查时，obj["1"]是Animal，obj[1]是Dog，又由于拿obj[1]会被转化成obj["1"]，
也就意味着 Dog必须是Animal的子类型
```

#### ts 索引签名的三种类型

```js
interface Example {
  [key: string]: string;
  [key: number]: string;
  [key: symbol]: string;
}
```

#### 抽象类和抽象方法

```js
abstract class Shape {
  abstract getArea(): number; // 抽象方法，必须由子类实现

  // 普通方法（非抽象方法），可以有具体实现
  describe(): void {
    console.log("这是一个形状");
  }
}

// 不能直接 new Shape()，会报错：Cannot create an instance of an abstract class

// 子类继承抽象类，必须实现所有抽象方法
class Circle extends Shape {
  radius: number;

  constructor(radius: number) {
    super();
    this.radius = radius;
  }

  // 实现抽象方法
  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle extends Shape {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
  }

  // 实现抽象方法
  getArea(): number {
    return this.width * this.height;
  }
}

// 使用示例
const circle = new Circle(5);
console.log(circle.getArea()); // 78.53981633974483
circle.describe(); // "这是一个形状"

const rect = new Rectangle(4, 6);
console.log(rect.getArea()); // 24
```

#### 类的类型限制

implements 限制类的类型，但是只能约束 public 成员，不能约束 private 或 protected。

```js
interface Animal {
  name: string;
  speak(): void;
}

class Dog implements Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  speak() {
    console.log("汪汪");
  }
}
```

上例中，Dog 必须有 name 属性和 speak 方法，否则会报错。

#### 构造器签名

interface ClockConstructor {
new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
tick();
}
构造函数实例化之后，的实例对象必须是 ClockInterface 类型

#### never 类型

在 TypeScript 中，never 表示“永远不会发生的类型”，即没有任何值能赋给它。

1. 不会返回的函数
   function throwError(): never {
   throw new Error('error');
   }
2. 一个函数里面无限循环 while(true){}

#### 存取器

```js
let passcode = "secret passcode";

class Employee {
private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }

}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
alert(employee.fullName);
}
```

注意：

1. 只带有 get 不带有 set 的存取器自动被推断为 readonly
2. 存取器（getter/setter）本质上是类的内部方法，可以直接访问和更改 private 变量

#### 三种 ts 类的成员变量类型介绍

1. private（私有变量）
   只能在类的内部访问，外部无法访问或修改。
   不能被子类直接访问。

```js
    class Person {
    private age: number;
    constructor(age: number) {
        this.age = age;
    }
    getAge() {
        return this.age; // 类内部可访问
    }
    }

    const p = new Person(18);
    console.log(p.getAge()); // 18
    // console.log(p.age); // 报错：age 是私有属性
```

2. protected（受保护变量）
   只能在类及其子类内部访问，外部无法访问。
   子类可以访问和修改。

```js
    class Animal {
    protected name: string;
    constructor(name: string) {
        this.name = name;
    }
    }
    class Dog extends Animal {
    bark() {
        console.log(this.name + " 汪汪");
    }
    }
    const d = new Dog("小黑");
    d.bark(); // 小黑 汪汪
    // console.log(d.name); // 报错：name 是受保护属性
```

3. public（公有变量，默认）
   类内、子类、类外都能访问。
   不写修饰符时默认就是 public。

```js
    class Cat {
    public color: string;
    constructor(color: string) {
        this.color = color;
    }
    }
    const c = new Cat("白色");
    console.log(c.color); // 白色
```

总结：
private：仅类内部可访问，最严格。
protected：类和子类可访问，外部不可访问。
public：任何地方都能访问，最宽松。

#### 类型操作符

四种有趣的实验

##### 第一种 定义变量只能是固定的枚举对象类型

```js
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}


// typeof Direction 得到枚举对象类型
let a:typeof Direction // a的值只能是 a = Direction; // 只允许这样
// a = {
//   Up: "UP",
//   Down: "DOWN"
// }
// 是不被允许的

```

##### 第二种 定义变量只能是枚举的所有的 key 取值类型（-----推荐-----）

```js
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}


// keyof typeof Direction 得到所有枚举成员值（key）的联合类型
type DirectionKeys = keyof typeof Direction; // "Up" | "Down" | "Left" | "Right"

let a: DirectionKeys = "Up"; // 合法
// let a: DirectionKeys = "UP"; // 报错，必须是成员值（key），不是成员值（key）会报错
```

##### 第三种 定义变量只能是枚举的所有的 value 取值类型

注意：第三种和第四种的区别是

第三种 可以直接 a = 'UP'
第四种不行，第四种只能 a = Direction.Up

```js
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}

// "UP" | "DOWN" | "LEFT" | "RIGHT"
let v: Direction[keyof typeof Direction] = "UP";    // 合法
// let v: DirectionValue = "Up"; // 报错
```

##### 第四种 定义变量只能是该枚举下的取值（取值方式必须是 Direction.xxx）（-----推荐-----）

```js
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}


let a:Direction
/**
 *
 * 那么 a 的取值只能是 Direction 枚举的 value，也就是：
 * a = Direction.Up;    // "UP"
 * a = Direction.Down;  // "DOWN"
 * a = Direction.Left;  // "LEFT"
 * a = Direction.Right; // "RIGHT"
 * 不能直接赋值为字符串 "UP"、"DOWN" 等，必须用 Direction.Up
 */

/**
 * 类型断言也可以：
 * a = "UP" as Direction; // 这样也可以，但不推荐
 */
```

#### TypeScript：type 和 interface 的区别

##### 1. 基本定义

- `interface`：用于定义对象的结构（属性、方法），主要用于面向对象编程中的类型约束。
- `type`：类型别名，可以为任意类型（基本类型、联合类型、元组、对象等）起别名。

##### 2. 扩展性

- `interface` 支持多次声明同名接口，会自动合并。
- `type` 不能重复声明同名类型。

##### 3. 继承和实现

- `interface` 可以通过 `extends` 继承其他接口，也可以被类 `implements` 实现。
- `type` 也可以通过交叉类型（`&`）扩展，但不能被类 `implements`。

##### 4. 表达能力

- `type` 能表示更复杂的类型（如联合类型、元组、映射类型等）。
- `interface` 主要用于描述对象结构。

##### 5. 示例

```ts
// interface 示例
interface Person {
  name: string;
  age: number;
}

// type 示例
// 对象类型
type Animal = {
  name: string;
  age: number;
};
// 联合类型
type Status = "success" | "error";
// 元组类型
type Point = [number, number];
```

##### 6. 何时用？

- 如果是对象结构，优先用 `interface`（更适合面向对象、可扩展）。
- 需要联合类型、元组、映射等复杂类型时用 `type`。

##### 7. 总结

- `interface` 更适合面向对象和可扩展场景。
- `type` 更灵活，能表达更复杂的类型。

#### extends 关键字详解

TypeScript 中的 extends 主要有两大用法：

1. 类型继承（interface/class）
2. 条件类型中的类型约束

---

##### 1. 类型继承

- 用于 interface 或 class，实现继承父接口/父类的属性和方法。

```ts
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

class Person {
  age: number;
}

class Student extends Person {
  grade: number;
}
```

---

##### 2. 条件类型中的 extends

- 用于类型判断和类型推断。
- 语法：`T extends U ? X : Y`，如果 T 能赋值给 U，则类型为 X，否则为 Y。

```ts
// 判断类型是否为 string
type IsString<T> = T extends string ? true : false;
type A = IsString<"abc">; // true
type B = IsString<123>; // false

// infer 结合 extends 做类型提取
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type X = UnwrapPromise<Promise<number>>; // number
type Y = UnwrapPromise<string>; // string
```

---

##### 总结

- interface/class 的 extends 用于继承结构。
- 条件类型中的 extends 用于类型判断、类型提取、类型分发等高级类型编程。

#### infer 关键字详解

TypeScript 的 infer 关键字用于在条件类型中对类型进行“推断”，常与 extends 结合使用。

---

##### 1. 基本用法

- infer 只能在条件类型（T extends ... ? ... : ...）的 true 分支中使用。
- 用于从复杂类型中提取（推断）某部分类型。

```ts
// 提取数组元素类型
type ElementType<T> = T extends (infer U)[] ? U : T;
type A = ElementType<number[]>; // number
type B = ElementType<string>; // string

// 提取 Promise 的内部类型
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type X = UnwrapPromise<Promise<number>>; // number
type Y = UnwrapPromise<string>; // string

// 提取函数参数类型
type FirstArg<T> = T extends (arg: infer U, ...args: any[]) => any ? U : never;
type P = FirstArg<(x: number, y: string) => void>; // number

// 提取函数返回值类型
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
type R = ReturnType<() => boolean>; // boolean
```

---

##### 2. infer 的常见场景

- 提取数组、元组、Promise、函数等类型的内部类型。
- 实现类型工具，如 Parameters、ReturnType、InstanceType 等。

---

##### 3. 总结

- infer 让类型推断更灵活、强大，适合做类型“拆包”和类型工具开发。
- 只能在条件类型的 true 分支中使用。

#### InstanceType 工具类型详解

TypeScript 内置的工具类型 `InstanceType<T>` 用于获取构造函数类型 T 的实例类型。

##### 注意： 开发中实例话一个 ref 组件对象时用到（const A = ref<InstanceType<typeof 组件名>>()）

Foo 是一个组件或者类
typeof Foo 得到的是“类的类型”或“组件的类型”（构造函数类型），不是实例类型。
InstanceType<typeof Foo> 得到的是“实例类型”，也就是 new Foo() 或 <Foo /> 组件实例的类型。

---

##### 1. 基本用法

- 语法：`InstanceType<typeof 构造函数>`
- 传入一个类或构造函数的类型，返回其实例的类型。

```ts
class Foo {
  name: string = "foo";
}

// typeof Foo 得到的是构造函数类型
// InstanceType<typeof Foo> 得到的是 Foo 的实例类型
let a: InstanceType<typeof Foo>;
a = new Foo(); // 合法
// a = { name: 'bar' }; // 只要结构兼容也可以
```

---

##### 2. 实现原理

InstanceType 的实现：

```ts
type InstanceType<T extends new (...args: any) => any> = T extends new (
  ...args: any
) => infer R
  ? R
  : any;
```

- 通过条件类型和 infer，提取构造函数返回的实例类型。

---

##### 3. 常见场景

- 在 Vue、React 等框架中，结合 ref、组件类型推断组件实例类型。
- 用于泛型工厂函数、依赖注入等场景。

---

##### 4. 示例

```ts
function create<T extends new (...args: any) => any>(Ctor: T): InstanceType<T> {
  return new Ctor();
}

class Bar {
  value = 123;
}

const bar = create(Bar); // bar 的类型是 Bar
```

---

##### 5. 总结

- `InstanceType<T>` 是类型体操中常用的类型工具，能自动推断构造函数的实例类型，提升类型安全和开发效率。

#### 条件类型 + infer 推断

```js
// 提取数组的元素类型
type ElementType<T> = T extends (infer U)[] ? U : T;

type A = ElementType<number[]>; // number
type B = ElementType<string>;   // string
type C = ElementType<boolean[]>; // boolean
// T extends (infer U)[]：判断 T 是否为数组类型（如 string[]、number[]），如果是，则用 infer U 推断出数组元素类型 U。? U : T：如果 T 是数组，则结果类型为 U（即数组元素类型）；如果 T 不是数组，则结果类型为 T 本身。

// 提取元组第一个元素类型
type First<T> = T extends [infer U, ...any[]] ? U : never;

type A = First<[number, string, boolean]>; // number

// 提取函数参数类型
type FirstArg<T> = T extends (arg: infer U, ...args: any[]) => any ? U : never;

type A = FirstArg<(x: number, y: string) => void>; // number

// 提取函数返回值类型
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

type A = ReturnType<() => boolean>; // boolean

// 提取构造函数实例类型
type InstanceType<T> = T extends new (...args: any[]) => infer R ? R : any;

class Foo {}
type A = InstanceType<typeof Foo>; // Foo

// 提取对象属性类型
type PropertyType<T> = T extends { prop: infer P } ? P : never;

type A = PropertyType<{ prop: number }>; // number
```

#### 类型保护

以下都是类型保护的一种方式

```js
class Dog {
  bark() {
    console.log("Woof!");
  }
}

class Cat {
  meow() {
    console.log("Meow!");
  }
}

function speak(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark(); // ✅ animal 是 Dog 类型
  } else {
    animal.meow(); // ✅ animal 是 Cat 类型
  }
}

function printLength(value: string | number) {
  if (typeof value === "string") {
    // 此处 value 被缩小为 string 类型
    console.log(value.length); // ✅ 合法
  } else {
    // 此处 value 被缩小为 number 类型
    console.log(value.toString()); // ✅ 合法
  }
}
```

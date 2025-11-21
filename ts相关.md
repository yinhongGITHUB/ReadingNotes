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

#### 开发中实例话一个 ref 组件对象时用到（const A = ref<InstanceType<typeof 组件名>>()）

Foo 是一个组件或者类
typeof Foo 得到的是“类的类型”或“组件的类型”（构造函数类型），不是实例类型。
InstanceType<typeof Foo> 得到的是“实例类型”，也就是 new Foo() 或 <Foo /> 组件实例的类型。

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

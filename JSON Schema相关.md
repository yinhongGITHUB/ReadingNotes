### JSON Schema

JSON Schema 是用来描述和校验 JSON 数据结构的标准。

##### 文档：https://json-schema.apifox.cn/#%E4%BA%8C%E4%BB%80%E4%B9%88%E6%98%AF-schema-

##### 简单例子

```js
// 前端/Node.js 常用 ajv 库
import Ajv from "ajv";

const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "integer", minimum: 0 },
  },
  required: ["name"],
};

const ajv = new Ajv();
const validate = ajv.compile(schema);

console.log(validate({ name: "张三", age: 18 })); // true
console.log(validate({ age: 18 })); // false
```

##### 包含全部关键字的例子

JSON Schema 关键字：
type：类型（object、array、string、number、boolean、null）
properties：对象属性定义
required：必填字段
items：数组元素类型
enum：枚举
minimum/maximum：数值范围
pattern：字符串正则

```js
import Ajv from "ajv";
/**
 * type: "object"：根类型是对象
 * properties：定义了 name、age、gender、hobbies 四个属性
 * required：name、age、gender 必填
 * name：字符串，且必须匹配正则（只能字母、数字、下划线）
 * age：整数，范围 0~120
 * gender：字符串，且只能是 "male"、"female"、"other" 之一
 * hobbies：数组，元素类型为字符串
 */
const schema = {
  type: "object",
  properties: {
    name: { type: "string", pattern: "^[A-Za-z0-9_]+$" },
    age: { type: "integer", minimum: 0, maximum: 120 },
    gender: { type: "string", enum: ["male", "female", "other"] },
    hobbies: {
      type: "array",
      items: { type: "string" },
    },
  },
  required: ["name", "age", "gender"],
};
const ajv = new Ajv();
const validate = ajv.compile(schema);

console.log(
  validate({
    name: "Tom_123",
    age: 25,
    gender: "male",
    hobbies: ["reading", "coding"],
  })
); // true

console.log(
  validate({
    name: "张三", // 不符合 pattern
    age: -1, // 小于 minimum
    gender: "boy", // 不在 enum 中
    hobbies: [123], // 元素不是字符串
  })
); // false
```

#### Ajv 是什么

Ajv 是一个用于校验 JSON 数据结构是否符合 JSON Schema 标准的高性能 JavaScript 库。

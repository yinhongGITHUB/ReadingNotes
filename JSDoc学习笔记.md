### JSDoc

##### 文档：https://www.jsdoc.com.cn/about-block-inline-tags

##### 基本用法

```js
/**
 * 自定义函数处理逻辑
 * @constructor
 * @param {string} title - 标题
 * @param {string} author - 作者
 */
function Book(title, author) {}
```

##### 文档化标签集合

```js
@param                // 参数说明
@returns 或 @return        // 返回值说明
@property              // 属性说明
@class               // 标记为类
@static               // 静态成员
@private / @protected / @public // 访问权限
@deprecated            // 标记已废弃
@example             // 示例代码
@see                // 参考链接
@typedef             // 自定义类型
@module             // 标记为模块
@namespace           // 命名空间
@memberof           // 指定成员归属
```

```js
Person = function () {
  // 实例函数
  /** @constructor */
  this.say = function () {
    return "我是实例函数";
  };
  // 内部函数
  /** @constructor */
  function say() {
    return "我是内部函数";
  }
  // 内部函数只能用实例函数间接调用
  this.callInner = function () {
    return say();
  };
};
// 静态函数
/** @constructor */
Person.say = function () {
  return "我是静态函数";
};

var p = new Person();
p.say(); // 我是实例函数
Person.say(); // 我是静态函数
```

JSDoc 3 中名称路径的基本语法：使用一个*文档化标签*来描述你的代码

```js
Person#say  // 名为"say"的实例方法
Person.say  // 名为"say"的静态方法
Person~say  // 名为"say"的内部函数
```

例子：

```js
/** @constructor */
Person = function () {
  /** @constructor */
  this.Idea = function () {
    this.consider = function () {
      return "hmmm";
    };
  };
};

var p = new Person();
var i = new p.Idea();
i.consider();
```

#### vue3 的性能提升

1. diff 算法优化
2. 静态提升：对不参与更新的元素，会做静态提升，只会被创建一次，在渲染时直接复用
3. 事件监听缓存：对绑定的事件缓存
4. SSR 优化

#### Object.defineProperty

优点
兼容性好：由于 Object.defineProperty 是 ES5 引入的特性，因此它在较旧的浏览器中也得到了广泛支持。
直接修改现有属性：可以用来定义或修改对象已有属性的描述符（如 writable, enumerable, configurable 等），使得开发者能够精确控制属性的行为。
缺点
单一属性操作：每次只能定义或修改一个属性，如果需要对多个属性进行处理，则必须重复调用该方法，代码量大且效率较低。
有限的拦截能力：仅能拦截对属性的基本操作（如 get 和 set），无法全面覆盖所有可能的操作（例如 delete 操作或自有属性的枚举）。
不支持异步操作：在定义属性时不能执行异步逻辑，所有操作都是同步完成的。

#### Proxy

- 优点
  强大的拦截能力：Proxy 可以拦截几乎所有的对象操作，包括但不限于属性访问、赋值、删除属性、函数调用等，提供了比 defineProperty 更广泛的拦截点。
  更自然的语法：代理整个对象而不是单独的属性，简化了代码结构，减少了重复劳动。

支持异步操作：可以在拦截器内部执行异步逻辑，这为处理复杂的业务场景提供了更大的灵活性。

- 缺点
  兼容性较差：Proxy 是 ES6 引入的新特性，虽然现代浏览器和 Node.js 版本都支持它，但在一些老旧环境中可能无法使用。
  性能开销：相比于直接操作对象，使用 Proxy 可能会带来一定的性能损耗，特别是在高频率访问的情况下。
  调试复杂度增加：由于 Proxy 可以拦截大量操作，可能会使调试变得更加困难，尤其是在没有正确处理某些边缘情况时。

#### Composition Api 与 Options Api 进行两大方面的比较

1. 逻辑组织：
   vue2 处理逻辑关注点可能在 method 里面 也可能是 data 也可能是 computed，但是 vue3 不一样，定义变量后，将所有的处理逻辑全部写在一个函数里面。
2. 逻辑复用：
   vue2 复用用混合，混合多的时候，难以追踪数据来源和命名重复的问题，vue3 复用是直接写一个 ts 文件，在想要的地方引用，好处是，可以看到变量的来源

- **静态提升**：
  不参与更新的元素，会做静态提升，只会被创建一次，在渲染时直接复用
- **静态标记**：
  对需要变化的地方加一个 flag

- 静态提升和 v-once 的区别：

1. 目的不同：静态提升主要是为了减少运行时的计算负担，通过编译期优化来提升整体性能；而 v-once 则是为了避免对特定内容进行重复渲染，专注于节省因响应式系统触发的无用更新带来的开销。
2. 实现机制不同：静态提升是由 Vue 编译器自动完成的优化过程，开发者无需手动干预；v-once 需要开发者明确地在模板中指定哪些部分应该只渲染一次。
3. 适用范围不同：静态提升适用于整个组件内的所有静态内容，包括标签、属性等；v-once 只针对被其修饰的具体元素或组件。

set.forEach((value, key) => console.log(key + ' : ' + value，this))这里的 this 是 windows,因为 forEach 是一个箭头函数
// 1 : 1
// 4 : 4
// 9 : 9

##### 在 Proxy 中使用 Reflect 的原因：

1. 确保正确的上下文 (this 值)
2. 与 Proxy 处理器方法的兼容性
3. 错误处理的一致性

#### Reflect 是什么

Reflect 是 ES6 新增的内置对象，提供了一组用于操作对象的静态方法，和 Object 上的方法类似，但语义更清晰、返回值更统一。

主要作用：

- 作为 Proxy 的默认方法转发工具，保证 this 指向正确
- 统一对象操作的返回值（如失败时返回 false，不抛异常）
- 让对象操作更函数式、更易组合

常用方法举例：

- Reflect.get(obj, prop)：获取对象属性值
- Reflect.set(obj, prop, value)：设置对象属性值
- Reflect.has(obj, prop)：判断对象是否有某属性（等价于 prop in obj）
- Reflect.deleteProperty(obj, prop)：删除对象属性
- Reflect.ownKeys(obj)：返回对象所有自身属性（包括 Symbol）

示例：

```js
const obj = { a: 1 };
Reflect.set(obj, "b", 2); // obj.b = 2
console.log(Reflect.get(obj, "a")); // 1
console.log(Reflect.has(obj, "b")); // true
Reflect.deleteProperty(obj, "a"); // 删除 a 属性
console.log(Reflect.ownKeys(obj)); // ['b']
```

在 Proxy 里常见用法：

```js
const proxy = new Proxy(obj, {
  get(target, prop, receiver) {
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    return Reflect.set(target, prop, value, receiver);
  },
});
```

这样可以保证 Proxy 拦截时的 this 指向和原生一致，避免出错。

#### Vue3 如何基于 Proxy 实现双向绑定

Vue3 的响应式系统核心是通过 ES6 的 Proxy 实现的。Proxy 可以拦截对象的各种操作（如 get、set、deleteProperty 等），从而实现数据的自动追踪和更新。

**核心原理**：

1. **数据代理**：
   - Vue3 使用 `Proxy` 包裹响应式对象（如 reactive、ref），拦截对对象属性的读取和设置。
   - 当读取属性时（get），进行依赖收集；当设置属性时（set），触发依赖更新。

2. **依赖收集**：

- 在组件渲染、计算属性、watch 等副作用函数执行期间，只要读取了响应式数据，Proxy 的 get 拦截器就会把当前副作用函数登记到该属性的依赖集合中。
- 依赖集合通常用 `WeakMap -> Map -> Set` 结构存储：
  - WeakMap 的 key 是目标对象，value 是 Map
  - Map 的 key 是属性名，value 是 Set（存储依赖该属性的副作用函数）

3. **依赖触发**：

- 当响应式对象的属性被修改（set）时，Vue3 会找到对应属性的依赖集合，并依次执行这些副作用函数，实现视图或计算属性的自动更新。

4. **双向绑定**：

- 由于 Proxy 能拦截所有属性的 get/set，数据变化会自动通知视图更新，视图（如 v-model）对数据的修改也会自动同步到数据本身，实现了数据和视图的双向绑定。

**副作用函数（effect function）是指依赖响应式数据、在数据变化时会被自动重新执行的函数。常见的副作用函数包括组件的渲染函数（render 函数）、计算属性、watch 监听回调等。收集的不是 get 函数本身，而是这些副作用函数对数据的依赖。**

#### 副作用函数 到 页面上的变量count 的具体关联过程如下：

1. 页面渲染时，模板里的变量（如 {{ count }}) 会被渲染函数读取，这时 get 拦截器会把当前渲染函数登记到 count 的依赖集合中。
2. 当 count 变量发生变化时，set 拦截器会找到 count 的依赖集合，把里面登记的渲染副作用函数全部重新执行。
3. 渲染副作用函数重新执行后，页面就会自动更新。

**与 Vue2 的区别**：

1. Vue2 用 Object.defineProperty 只能劫持已存在的属性，新增/删除属性无法响应，数组变动需特殊处理。
2. Vue3 用 Proxy 可以劫持整个对象，支持所有属性的动态添加、删除和数组操作，响应式能力更强。

**简单示例**：

```js
const data = { count: 0 };
const proxy = new Proxy(data, {
  get(target, key, receiver) {
    // 依赖收集逻辑
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    // 依赖触发逻辑
    const result = Reflect.set(target, key, value, receiver);
    // 通知视图更新
    return result;
  },
});
```

**总结**：
Vue3 通过 Proxy 实现了对对象的深度、全面的拦截，结合依赖收集和触发机制，实现了高效、灵活的响应式系统和双向绑定。

---

#### vue3的生命周期

Vue3 生命周期执行顺序（含 setup）：

1. **setup**：最先执行（用于 Composition API，不能访问 this/data，适合定义响应式变量和逻辑）
2. **beforeCreate**：组件实例刚初始化，无法访问 this/data
3. **created**：实例创建完成，可以访问 this/data/props/methods/computed
4. **beforeMount**：挂载前，首次 render 函数调用
5. **mounted**：挂载后，DOM 已插入文档
   （这是最早可以安全获取 DOM 元素对象的生命周期钩子，如 this.$el 或模板 ref）
6. **beforeUpdate**：数据更新，虚拟 DOM 打补丁前
7. **updated**：数据更新，虚拟 DOM 打补丁后，DOM 已更新
8. **beforeUnmount**（beforeDestroy）：卸载前，实例仍正常
9. **unmounted**（destroyed）：卸载后，指令解绑、事件移除、子组件卸载

#### Vue3 中 data 变量和组件实例对象 this 的使用场景

#### data 变量和 this 的可用性总结

- **setup**：不能访问 this/data，直接用 ref/reactive 定义变量
- **beforeCreate**：不能访问 this/data
- **created 及之后（mounted、updated、beforeUnmount、unmounted）**：可以用 this 访问 data/props/methods/computed
- **methods、computed、watch**：this 指向组件实例，可访问所有 data/props/methods/computed
- **模板**：直接用变量名访问 data

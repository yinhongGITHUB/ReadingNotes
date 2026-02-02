#### vue3 的性能提升

1. diff 算法优化
2. 静态提升：对不参与更新的元素，会做静态提升，只会被创建一次，在渲染时直接复用
3. 事件监听缓存：对绑定的事件缓存
4. SSR 优化

#### Object.defineProperty

 - 优点
兼容性好：由于 Object.defineProperty 是 ES5 引入的特性，因此它在较旧的浏览器中也得到了广泛支持。
直接修改现有属性：可以用来定义或修改对象已有属性的描述符（如 writable, enumerable, configurable 等），使得开发者能够精确控制属性的行为。
 - 缺点
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

##### proxy 的具体代理过程

1. 初始代理
   当你用 reactive(obj) 创建响应式对象时，Vue 会用 Proxy 包裹 obj，但只代理第一层。

2. 访问子对象时懒代理
   当你访问 obj.a，如果 a 是一个对象，Vue 会在 Proxy 的 get 拦截器里判断这个值是不是对象。如果是，并且还没被代理过，就会用 reactive(a) 再包一层代理，然后返回这个新的代理对象。

3. 代码示例
   Vue 内部类似这样处理：

```js
get(target, key, receiver) {
  const res = Reflect.get(target, key, receiver);
  // 判断 res 是否是对象且未被代理
  if (isObject(res)) {
    return reactive(res); // 懒递归代理
  }
  return res;
}
```

**总结：只有在你访问 obj.a 时，Vue 才会判断 a 是否需要代理，并在需要时自动递归调用 reactive，实现“懒代理”。这样可以节省性能开销。**

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

#### 副作用函数 到 页面上的变量 count 的具体关联过程如下：

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

#### vue3 的生命周期

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

#### vue3-smooth-dnd vue3 中组件拖拽，也可以互相拖拽

```js
import { Container, Draggable } from "vue3-smooth-dnd";

    <Container
      behaviour="copy"
      :group-name="DROP_GROUP"
      drag-class="drag-class"
      :get-child-payload="(x: number) => getComponentPayload(x, index)"
      >
      <Draggable >
        每个元素内容
      </Draggable>
    </Container>


```

1. **group-name：** 是 vue3-smooth-dnd 的 Container 组件的分组标识属性，用来控制哪些容器之间可以互相拖拽。
   相同 group-name 的 Container，可以互相拖拽元素（比如从左边拖到右边）。
   不同 group-name 的 Container，不能互相拖拽，只能在自己容器内部拖动。
2. **drag-class：**：当你拖拽某个 Draggable 元素时，Container 会自动给被拖拽的元素加上 drag-class 指定的 class。
3. **behaviour：**

- "move"（默认）：拖拽时，元素会从原容器移除并插入到目标容器，实现“搬移”效果。
- "copy"：拖拽时，元素会被复制到目标容器，原容器保留原元素，实现“复制”效果。
  是 Container 组件的一个属性，用于控制拖拽的行为方式。

4. **drop 和 get-child-payload**：拖拽时，get-child-payload 会根据你拖的是第几个，把对应的数据（比如按钮的配置）返回出来。
   这个数据会被用在 drop（拖拽放下）事件里，添加到屏幕区域，页面就能显示你刚拖过来的那个按钮。
   drop 事件一般这么写：

```js
/**
 * addedIndex：表示拖拽放下后，元素被插入到目标容器的第几个位置（索引）。如果是新增，addedIndex 就是新位置的下标。
 * removedIndex：表示拖拽前，元素在原容器里的索引。如果是从别的容器拖过来，removedIndex 可能是 null；如果是本容器内部排序，removedIndex 就是原来的位置。
 * payload：就是在 get-child-payload 返回的数据对象
 */
export function handleDrop(evt: any, bindings: any[]) {
  const { addedIndex, removedIndex, payload } = evt;
  if (addedIndex === removedIndex || payload == null) {
    // 没有变动
    return null;
  }

  if (addedIndex != null) {
    if (removedIndex != null) {
      // 移位，交换位置
      const temp = bindings[removedIndex];
      bindings.splice(removedIndex, 1);
      bindings.splice(addedIndex, 0, temp);
    } else {
      // 新增
      bindings.splice(addedIndex, 0, payload);
    }
    return payload;
  } else if (removedIndex != null) {
    // 移除
    bindings.splice(removedIndex, 1);
  }

  return null;
}
```

#### vue-virtual-scroll-list

`vue-virtual-scroll-list` 是一个用于 Vue 的虚拟滚动列表组件，专门用于优化大数据量列表的渲染性能。它只渲染可视区域内的元素，而不是一次性渲染所有数据，从而大幅提升性能。

**核心原理**：

- 只渲染可视区域内的列表项
- 动态计算可视区域范围
- 复用 DOM 节点
- 支持动态高度和固定高度

**安装**：

```bash
npm install vue-virtual-scroll-list --save
# 或
pnpm install vue-virtual-scroll-list
```

**基本用法**：

```vue
<template>
  <div>
    <virtual-list
      :data-key="'id'"
      :data-sources="list"
      :data-component="itemComponent"
      :estimate-size="50"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import VirtualList from "vue-virtual-scroll-list";
import ItemComponent from "./ItemComponent.vue";

const list = ref([
  { id: 1, name: "项目1", value: "值1" },
  { id: 2, name: "项目2", value: "值2" },
  // ... 更多数据（可以有几万条）
]);

const itemComponent = ItemComponent;
</script>
```

**ItemComponent.vue（列表项组件）**：

```vue
<template>
  <div class="list-item">
    <h3>{{ source.name }}</h3>
    <p>{{ source.value }}</p>
  </div>
</template>

<script setup>
// source 是由 vue-virtual-scroll-list 自动注入的 props
defineProps({
  source: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
  },
});
</script>

<style scoped>
.list-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>
```

**核心配置属性**：

1. **data-key**（必需）：

   - 类型：String
   - 每个数据项的唯一标识字段名（如 'id'）
   - 用于追踪每个列表项

2. **data-sources**（必需）：

   - 类型：Array
   - 列表数据源

3. **data-component**（必需）：

   - 类型：Component
   - 渲染每个列表项的组件

4. **estimate-size**：

   - 类型：Number
   - 每个列表项的预估高度（单位：px）
   - 固定高度时设置准确值，动态高度时设置平均值

5. **keeps**：

   - 类型：Number
   - 默认值：30
   - 可视区域保持渲染的项数量（缓冲区大小）

6. **page-mode**：
   - 类型：Boolean
   - 默认值：false
   - 是否使用页面滚动（true）还是容器滚动（false）

**进阶用法**：

```vue
<template>
  <div>
    <virtual-list
      ref="virtualListRef"
      class="virtual-scroll-container"
      :data-key="'id'"
      :data-sources="bigList"
      :data-component="itemComponent"
      :estimate-size="80"
      :keeps="50"
      :page-mode="false"
      @scroll="handleScroll"
      @tobottom="handleReachBottom"
      @totop="handleReachTop"
    >
      <!-- 顶部插槽 -->
      <template #header>
        <div class="list-header">列表头部</div>
      </template>

      <!-- 底部插槽 -->
      <template #footer>
        <div class="list-footer">
          <div v-if="loading">加载中...</div>
          <div v-else-if="noMore">没有更多了</div>
        </div>
      </template>
    </virtual-list>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import VirtualList from "vue-virtual-scroll-list";
import ItemComponent from "./ItemComponent.vue";

const virtualListRef = ref(null);
const bigList = ref([]);
const loading = ref(false);
const noMore = ref(false);
const itemComponent = ItemComponent;

// 初始化数据
onMounted(() => {
  loadData();
});

// 加载数据
function loadData() {
  const newData = Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    name: `项目 ${i + 1}`,
    value: `值 ${i + 1}`,
  }));
  bigList.value = newData;
}

// 滚动事件
function handleScroll(event, range) {
  // range: { start: 起始索引, end: 结束索引, padFront: 前置padding, padBehind: 后置padding }
  console.log("当前渲染范围：", range);
}

// 触底事件（加载更多）
function handleReachBottom() {
  if (loading.value || noMore.value) return;

  loading.value = true;
  // 模拟加载更多数据
  setTimeout(() => {
    const currentLength = bigList.value.length;
    const moreData = Array.from({ length: 100 }, (_, i) => ({
      id: currentLength + i + 1,
      name: `项目 ${currentLength + i + 1}`,
      value: `值 ${currentLength + i + 1}`,
    }));
    bigList.value.push(...moreData);
    loading.value = false;

    // 超过 20000 条就不再加载
    if (bigList.value.length >= 20000) {
      noMore.value = true;
    }
  }, 1000);
}

// 触顶事件
function handleReachTop() {
  console.log("滚动到顶部");
}

// 滚动到指定位置的方法
function scrollToIndex(index) {
  virtualListRef.value.scrollToIndex(index);
}

// 滚动到指定偏移量
function scrollToOffset(offset) {
  virtualListRef.value.scrollToOffset(offset);
}

// 滚动到底部
function scrollToBottom() {
  virtualListRef.value.scrollToBottom();
}

// 获取当前滚动偏移量
function getOffset() {
  return virtualListRef.value.getOffset();
}

// 获取当前可视区域的数据
function getSizes() {
  return virtualListRef.value.getSizes();
}
</script>

<style scoped>
.virtual-scroll-container {
  height: 600px;
  overflow-y: auto;
  border: 1px solid #ddd;
}

.list-header,
.list-footer {
  padding: 20px;
  text-align: center;
  background: #f5f5f5;
}
</style>
```

**常用事件**：

- **@scroll**：滚动时触发，参数：(event, range)
- **@tobottom**：滚动到底部时触发（用于加载更多）
- **@totop**：滚动到顶部时触发
- **@resized**：列表项尺寸变化时触发

**实例方法**：

- **scrollToIndex(index)**：滚动到指定索引
- **scrollToOffset(offset)**：滚动到指定偏移量
- **scrollToBottom()**：滚动到底部
- **getOffset()**：获取当前滚动偏移量
- **getClientSize()**：获取容器可视区域大小
- **getScrollSize()**：获取滚动区域总大小
- **getSizes()**：获取所有列表项的尺寸信息

**使用场景**：

1. **大数据量列表**：数据超过 1000 条时建议使用
2. **聊天消息列表**：历史消息记录展示
3. **商品列表**：电商平台的商品展示
4. **数据表格**：虚拟表格渲染
5. **无限滚动加载**：配合触底事件实现无限加载

**性能优化建议**：

1. **固定高度优先**：如果列表项高度固定，性能最佳
2. **合理设置 keeps**：根据屏幕尺寸和列表项高度调整
3. **使用唯一 key**：确保 data-key 指向的字段值唯一且稳定
4. **避免频繁更新**：批量更新数据而非逐条更新
5. **预估高度准确**：estimate-size 越接近实际高度，性能越好

**注意事项**：

1. 列表项组件会自动接收 `source`（数据）和 `index`（索引）两个 props
2. 动态高度列表需要组件首次渲染后才能计算准确高度
3. page-mode 为 true 时，滚动容器是 window，否则是组件本身
4. 更新 data-sources 时，建议使用不可变数据（重新赋值而非 push/splice）

**与普通列表的对比**：

| 特性         | 普通列表           | 虚拟滚动列表      |
| ------------ | ------------------ | ----------------- |
| 渲染数量     | 全部数据           | 仅可视区域        |
| DOM 节点数   | 与数据量一致       | 固定数量（keeps） |
| 内存占用     | 高（数据量大时）   | 低                |
| 首次渲染速度 | 慢（数据量大时）   | 快                |
| 滚动性能     | 卡顿（数据量大时） | 流畅              |
| 实现复杂度   | 简单               | 稍复杂            |
| 适用场景     | 小数据量           | 大数据量          |

#### import a from 在 vue3 的某个页面里面导入这个组件，如何懒加载

1. defineAsyncComponent

```js
import { defineAsyncComponent } from "vue";

const AsyncA = defineAsyncComponent(() => import("./a.vue"));
```

2. 路由懒加载（如果是路由页面）

```js
const routes = [
  {
    path: "/a",
    component: () => import("./a.vue"),
  },
];
```

#### uni-popup

弹框默认层级 z-index 是 99
（注：以下 A，B，C）均指 uni-popup

##### 情况一：

A，B 同级, 先打开 A 再打开 B，A 会把 B 盖住
弹出顺序：先弹 A → 再弹 B
展示顺序：A 盖住 B
即：微信渲染时，z-index 相同的元素，后渲染的会被前面渲染的覆盖（即后面的在下层）。在 Vue/uni-app 组件体系下，先渲染的 uni-popup（先插入 DOM），后渲染的在 DOM 结构上排在后面。

##### 情况二：

B 在 A 的 slot 里
弹出顺序：先弹 A → 再弹 B
展示顺序：B 盖住 A
会触发一个核心概念 **slot 区域的内容渲染优先级**

_slot 区域的内容渲染优先级_，指的是：
在 Vue 组件中，父组件的 slot（插槽）内渲染的内容，会在父组件的 DOM 结构中“占据”slot 位置，并且这些内容在 DOM 层级上属于父组件 slot 区域的子节点，这些内容在 DOM 结构上比父组件 slot 之外的内容“更靠上”，即使 z-index 相同，也会覆盖父组件 slot 区域同层的其他内容。

##### 情况三

A、C 同级，B 在 A 的 slot 里
弹出顺序：先弹 A → 再弹 C → 再弹 B
展示顺序：B 盖住 A 盖住 C

##### 情况四

A、C 同级，B 在 A 的 slot 里
弹出顺序：先弹 C → 再弹 A → 再弹 B
展示顺序：C 盖住 B 盖住 A

总结：
两个弹框：层级相同时，如果 DOM 同级，那么，后渲染的会被前面渲染的覆盖，如果 DOM 不同级别，那么遵循**slot 区域的内容渲染优先级**
三个弹框时：情况三和情况四总结：一个弹框里面的弹框，他的渲染目标对象是当前父级弹框，不再是父级 body，哪怕这个子级弹框 B 的 z-index:999 也受限于自己的父级弹框 A 的 z-index:1，假设此时有另外一个和父级同级的 C 弹框，z-index：2，那么 C 弹框会把 B 和 A 都盖住

#### 分包组件：

注意：分包组件 必须 user-throw 小写字母 并用连字符链接，不然配置分包组件会失效

```js
A 分包在 page.json 里面配置
"usingComponents": {
"uvip-year-card-use": "./page_shop/pay/components/uvip-year-card-use/index.vue",
"charging-rules-dialog": "./page_single/room/components/ChargingRulesDialog"
},
"componentPlaceholder": {
"uvip-year-card-use": "view",
"charging-rules-dialog": "view"
}
那么 B 分包的页面想用 A 分包的 uvip-year-card-use 可以直接 import，但是 B 分包的页面下的组件想用 A 分包的 uvip-year-card-use 就需要在 page.json 里面配置占位符
"componentPlaceholder": {
"uvip-year-card-use": "view",
}
```

#### uniapp 小程序路由跳转常用方式有以下几种：

1. uni.navigateTo
   跳转到非 tabBar 页面，保留当前页面，可返回。
   示例：
   uni.navigateTo({ url: '/pages/scan/scan' })

2. uni.redirectTo
   关闭当前页面，跳转到非 tabBar 页面，不能返回。
   示例：
   uni.redirectTo({ url: '/pages/webview/webview' })

3. uni.switchTab
   跳转到 tabBar 页面，关闭所有非 tabBar 页面。
   示例：
   uni.switchTab({ url: '/pages/home/home' })

4. uni.reLaunch
   关闭所有页面，打开新页面（常用于登录、重启等场景）。
   示例：
   uni.reLaunch({ url: '/pages/mine/mine' })

5. uni.navigateBack
   返回上一级页面或多级页面。
   示例：
   uni.navigateBack({ delta: 1 })

**注意事项：**

- tabBar 页面只能用 switchTab 跳转，不能用 navigateTo/redirectTo。
- 分包页面跳转需写全路径（含分包 root）。
- url 参数需 encodeURIComponent 编码。

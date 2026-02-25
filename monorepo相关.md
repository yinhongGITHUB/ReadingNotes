# monorepo（单体仓库）

monorepo（单体仓库）是一种将多个相关项目（包）统一放在同一个代码仓库下进行集中管理的开发模式。

- 主要特点和优势：

1. 所有子项目（如主应用、组件库、工具库、文档等）都在一个仓库里，目录结构清晰。
2. 依赖统一管理，版本一致，升级维护方便。
3. 包之间可以直接本地引用，开发联动高效，无需发布即可互相调用。
4. 便于统一测试、构建、CI/CD 和代码规范检查。
5. 适合大型团队协作和多端/多业务线项目。

# Monorepo 从 0 到 1 搭建与联动机制说明

## 1. 从 0 到 1：快速搭建 Monorepo 项目

假设你有一个主项目 admin，现在希望用 pnpm monorepo 管理，并新建一个子项目 packages/components，步骤如下：

### 1.1 初始化主项目

```bash
mkdir my-monorepo && cd my-monorepo
pnpm init
mkdir admin && cd admin
pnpm init
# 回到上一级目录
cd ..
```

### 1.2 新建子项目 packages/components

```bash
mkdir -p packages/components
cd packages/components
pnpm init
# 回到上一级目录的上一级目录
cd ../..
```

### 1.3 配置 pnpm-workspace.yaml

在 my-monorepo 根目录新建 pnpm-workspace.yaml：

```yaml
packages:
  - "admin"
  - "packages/*"
```

### 1.4 设置组件库包名

编辑 packages/components/package.json，添加：

```json
{
  "name": "@table/yh-ui",
  "version": "1.0.0"
}
```

### 1.5 在 admin 里声明依赖

编辑 admin/package.json，添加依赖：

```json
{
  "dependencies": {
    "@table/yh-ui": "workspace:*"
  }
}
```

### 1.6 安装依赖并建立软链

在根目录执行：

```bash
pnpm install
```

此时 pnpm 会自动把 @table/yh-ui 映射到 packages/components 目录，实现本地联动。

### 1.7 使用组件库

在 admin 代码中直接：

```js
import { xxx } from "@table/yh-ui";
```

即可使用 packages/components 里的内容，无需发布、无需本地 npm link。

---

## 2. Monorepo 项目结构与联动机制

monorepo（单体仓库）模式，是指将所有相关子项目（主应用、组件库、文档、示例等）统一放在一个仓库下，并通过在根目录配置 pnpm-workspace.yaml 文件，实现依赖和包间的自动联动与统一管理。

- 正确流程：

1. 手动创建 pnpm-workspace.yaml
   只要你在项目根目录新建了这个文件，并配置好 packages 字段，pnpm 就会识别为 monorepo 项目。

2. 各子包有自己的 package.json 和 name 字段
   这样 pnpm install 时会自动软链本地包。

3. 没有“pnpm monorepo”命令
   pnpm 没有专门的 monorepo 初始化命令，都是靠你自己配置。

4. 只需用 pnpm install
   配置好 workspace 后，直接在根目录执行 pnpm install 即可，pnpm 会自动处理所有本地包的依赖和软链。

### 2.1 pnpm-workspace.yaml 作用与依赖版本管理注意点

- 用于声明哪些目录属于 workspace。
- 只要被包含的目录下有 package.json 并声明了 name 字段，就会被 pnpm 识别为本地包。
- 典型配置：

#### 依赖版本 catalog 与 catalogs 的区别与注意事项

- `catalog` 字段：声明主依赖版本集合，所有包默认用这里的版本（如 vue、sass、@dcloudio/uni-app 等）。
- `catalogs` 字段：声明多个依赖版本分组，适合部分包需要用特殊版本时切换（如 sass1.77）。
- 在 package.json 里：
  - 写 `"sass": "catalog:"`，用的是 catalog 里的 sass 版本（如 1.69.5）。
  - 写 `"sass": "catalog:sass1.77"`，用的是 catalogs.sass1.77 里的 sass 版本（如 1.77.0）。
- 注意：catalog 和 catalogs 只是集中声明依赖版本，只有包里主动声明依赖并用 `catalog:` 语法，才会生效。
- 这样做可以保证依赖统一、升级方便，也支持部分包灵活切换依赖版本。

```yaml
packages:
  - "admin" # 主应用
  - "packages/*" # 组件库等子包
  - "docs" # 文档
  - "play" # playground 示例

catalog:
  vue: 3.2.37
  sass: 1.69.5
  vite: 2.9.14
  "@dcloudio/types": 3.0.7
  "@dcloudio/uni-app": 3.0.0-alpha-3040820220424001

catalogs:
  sass1.77:
    sass: 1.77.0
  vite2.8:
    vite: 2.8.6
```

> 示例说明：
>
> - `catalog` 里声明了主依赖版本（如 sass: 1.69.5）。
> - `catalogs` 里声明了分组版本（如 sass1.77、vite2.8）。
> - 子包 package.json 里：
>   - `"sass": "catalog:"` 用 1.69.5。
>   - `"sass": "catalog:sass1.77"` 用 1.77.0。
>   - `"vite": "catalog:vite2.8"` 用 2.8.6。

### 2.2 包的注册与声明

#### 组件库（packages/components）

- 在 packages/components/package.json 里声明：
  ```json
  {
    "name": "@table/yh-ui"
  }
  ```
- 这样注册了一个名为 @table/yh-ui 的本地包。

#### 主应用（admin）

- 在 admin/package.json 里声明依赖：
  ```json
  {
    "dependencies": {
      "@table/yh-ui": "workspace:*"
    }
  }
  ```
- 表示依赖本地 workspace 里的 @table/yh-ui 包。

### 2.3 包间联动机制

- pnpm 安装依赖时，会自动把 @table/yh-ui 映射到 packages/components 目录。
- 主应用、play、docs 等都可以直接 import @table/yh-ui，无需手动管理路径。
- 组件库变更后，主应用和其他包能实时获得最新代码。

### 2.4 组件自动引入（easycom）

- 在 pages.json 里配置 easycom custom 规则：
  ```json
  {
    "easycom": {
      "custom": {
        "^yh-(.*)": "@table/yh-ui/yh-$1/yh-$1.vue"
      }
    }
  }
  ```
- 这样 <yh-button /> 会自动映射到 @table/yh-ui/yh-button/yh-button.vue。

### 2.5 总结

- pnpm-workspace.yaml 声明 workspace 范围。
- 每个包通过 package.json 的 name 字段注册。
- "workspace:\*" 依赖自动软链到本地包。
- easycom 规则实现组件自动引入。
- 所有包依赖、构建、测试可统一管理，开发高效。

---

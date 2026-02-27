# OpenSpec

## 安装方法

- 需 Node.js 环境
- 全局安装命令：
  ```bash
  npm install -g @fission-ai/openspec
  ```

OpenSpec 是一个自动化规范生成工具，由 Fission 团队开发。它可以用自然语言描述需求，自动拆解为接口、流程、规范草稿，支持多轮补充和导出，适合需求梳理、前后端协作、自动化文档生成。

---

# OpenSpec CLI 常用命令与新版用法

新版 openspec CLI 命令如下：

## 1. 项目初始化

- 初始化 OpenSpec 项目
  ```bash
  openspec init
  ```

## 2. 创建和管理规范

- 创建新规范/项

  ```bash
  openspec new
  ```

  # 按提示输入规范名称、描述等

- 查看规范

  ```bash
  openspec spec
  ```

- 列出所有规范

  ```bash
  openspec list --specs
  ```

- 管理变更提案

  ```bash
  openspec change
  ```

- 校验规范
  ```bash
  openspec validate
  ```

## 3. 进阶命令

- 管理工作流 schema（实验性）

  ```bash
  openspec schema
  ```

- 查看仪表盘

  ```bash
  openspec view
  ```

- 归档变更

  ```bash
  openspec archive [change-name]
  ```

- 导出规范/流程/文档
  ```bash
  openspec export --format markdown
  ```

## 4. 官方文档

- https://openspec.dev/docs/cli
- https://github.com/Fission-AI/OpenSpec

---

> 新版 openspec CLI 已不再支持 plan/openapi/workflow/refine 等命令，建议用 init/new/spec/change/schema 等命令管理和生成规范、流程、变更等。具体用法请参考官方文档或 CLI --help 输出。

> 核心用法：先初始化项目，再用 new/spec/change/schema 等命令创建和管理规范，支持自动化文档、流程梳理、前后端协作。

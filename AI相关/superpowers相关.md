---
# superpowers 使用说明
---

## 目录

1. superpowers、LLM、提示词、openspec 的关系
2. 安装
3. key 配置（API Key）
4. 基本用法
5. 常用能力示例
6. 进阶用法
7. 官方文档

---

## 1. superpowers、LLM、提示词、openspec 的关系

superpowers 本质是一个命令行 AI 工具箱，底层调用 LLM（大语言模型，如 OpenAI、Claude、Gemini 等），把 LLM 的能力封装成命令行命令，方便开发者在终端批量处理、自动化脚本、快速调用 AI。

关系梳理如下：

- superpowers：命令行工具箱，底层还是 LLM，只是把 LLM 能力（总结、生成、修复、问答等）命令行化，适合喜欢自动化、批量处理、脚本集成的开发者。
- 你的 LLM + 提示词：直接对话，灵活度更高，适合自定义复杂场景，生成 agent 或代码无需 superpowers。
- openspec：规范/文档生成工具，和 AI 没直接关系，但可以作为 LLM 的输入参考。

### 什么时候用 superpowers？

- 想批量处理、自动化脚本、集成到 CI/CD、命令行一键生成/修复/总结。
- 不想每次都打开网页或 IDE，直接在终端用命令调用 AI。

### 什么时候不用 superpowers？

- 已有自己的 LLM，能直接用提示词对话，生成 agent 或代码。
- 更喜欢自定义 prompt，或者需要更复杂的交互。

**总结：** superpowers 只是“命令行壳”，底层还是 LLM。你完全可以不用它，直接用 LLM + 提示词生成 agent。如果你喜欢命令行自动化、批量处理，可以用 superpowers，否则直接用 LLM 对话更灵活。

---

## 2. 安装

- 需 Node.js 环境（建议 16+）
- 推荐用 npm 全局安装：
  ```bash
  npm install -g superpowers
  ```
- 安装后可用 `superpowers` 命令（如未识别，需配置 PATH，见下文）

---

## 3. key 配置（API Key）

superpowers 需要配置 LLM 的 API key（如 OpenAI、Claude、Gemini 等），否则无法使用 AI 能力。

### OpenAI Key 配置步骤：

1. 注册并获取 OpenAI API key：https://platform.openai.com/account/api-keys
2. 设置环境变量（推荐）：
   - Windows：
     ```powershell
     $env:OPENAI_API_KEY="你的key"
     ```
     或在系统环境变量中添加 OPENAI_API_KEY
   - Mac/Linux：
     ```bash
     export OPENAI_API_KEY="你的key"
     ```
3. 也可在 superpowers 配置文件中填写 key（参考官方文档）
4. 重启命令行窗口，确保环境变量生效。

如需其他 LLM（Claude、Gemini），参考 superpowers 官方文档配置。

---

- summarize：自动总结文本
- generate：生成代码片段
- explain：解释代码或文本
- fix：自动修复代码
- ask：AI 问答

## 4. 基本用法

- 运行 superpowers 命令，进入交互式 AI 工具箱：
  ```bash
  superpowers
  ```
- 选择/输入你想要的“能力”（如总结、生成代码、自动化任务等）

---

## 5. 常用能力示例

- summarize：自动总结文本
  ```bash
  superpowers summarize "Paste your text here"
  ```
- generate：生成代码片段
  ```bash
  superpowers generate "写一个用户注册接口的代码"
  ```
- explain：解释代码或文本
  ```bash
  superpowers explain "function foo() { return 42; }"
  ```
- fix：自动修复代码
  ```bash
  superpowers fix "function foo() { return 42 }"
  ```
- ask：AI 问答
  ```bash
  superpowers ask "什么是闭包？"
  ```

---

## 6. 进阶用法

- 支持多轮对话、批量处理、自动化脚本
- 可结合 OpenAI API key，提升智能能力
- 支持导出结果为 markdown、txt 等

---

## 7. 官方文档

- https://github.com/obra/superpowers

---

> 核心用法：superpowers 是一个命令行 AI 工具箱，支持文本总结、代码生成、自动修复、问答等多种能力，适合开发者日常自动化和效率提升。

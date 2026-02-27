# 生成 openspec 工作流命令文档提示词

> 将以下内容完整复制给新项目的 AI/Agent，即可自动生成专属的 openspec 工作流命令文档目录。

---

## 提示词

请帮我在项目根目录下，基于 openspec 工作流，自动生成如下目录结构和命令说明文档：

```
.claude/
  commands/
    opsx/
      apply.md
      archive.md
      bulk-archive.md
      continue.md
      explore.md
      ff.md
      new.md
      onboard.md
      sync.md
      verify.md
```

### 每个命令文档要求

每个 md 文件的 frontmatter 信息格式如下：

```yaml
---
name: 'OPSX: [命令名称]'
description: [命令功能简短描述]
category: Workflow
tags: [workflow, openspec]
---
```

每个 md 文件正文必须包含以下标准结构：

1. **简介** — 说明该命令的用途和适用场景
2. **输入参数** — 说明命令支持的参数、格式和示例
3. **执行步骤** — 详细的分步骤执行流程（含代码块、CLI 示例等）
4. **注意事项** — 使用时需要特别注意的规则和约束
5. **输出** — 说明命令执行后的预期输出格式和示例

### 各命令说明

| 命令文件        | 用途                                         |
| --------------- | -------------------------------------------- |
| apply.md        | 实现变更任务，自动推进开发流程、勾选任务     |
| archive.md      | 归档已完成的变更，标记为历史记录             |
| bulk-archive.md | 批量归档多个变更                             |
| continue.md     | 继续推进中断的变更流程                       |
| explore.md      | 进入探索/调研模式，用于需求澄清和方案调研    |
| ff.md           | 快进（Fast Forward），一次性生成所有工件     |
| new.md          | 新建一个变更，发起新的需求/功能/修复流程     |
| onboard.md      | 新手引导，帮助新成员快速熟悉 openspec 工作流 |
| sync.md         | 同步变更中的规范内容到主规范库               |
| verify.md       | 验证变更，检查实现是否与规范一致             |

### 工作流要求

1. **需求整理**：先分析项目实际情况，整理各命令的初步方案。
2. **需求确认**：输出需求方案后，等待用户确认或补充修改，用户确认后再开始生成文件。
3. **如有修改意见**：流程回到需求整理环节重新确认，不要直接跳过。
4. **内容适配**：结合本项目的实际技术栈和开发习惯生成内容（如 Vue3、TypeScript、uniapp、Pinia、SCSS 等）。
5. **Agent 可识别**：文件内容要让 openspec/Claude Code Agent 能自动识别和驱动工作流。

### 参考规范

- 参考 openspec 官方最佳实践
- 命令流程要清晰、可追踪、可自动化
- 每个命令要有明确的"触发条件"、"执行步骤"和"完成标志"

---

> 生成完成后，将 .claude/commands/opsx/ 目录提交到项目仓库，即可供团队所有成员和 AI/Agent 使用。

# 🎒 TOON Converter

**TOON 格式转换器** - 基于 Electron 的跨平台桌面应用，支持 JSON 与 TOON 格式双向转换。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)

## ✨ 特性

- ✅ **双向转换**: JSON ↔ TOON 格式无缝转换
- ⚙️ **高级配置**: 支持自定义分隔符、长度标记、严格模式等
- 📊 **Token 统计**: 实时显示 token 节省比例（近似值）
- 🎨 **现代 UI**: 深色模式、流畅动画、响应式设计
- ⌨️ **快捷键支持**: 提升操作效率
- 📚 **内置示例**: 覆盖官方 Cheatsheet 所有场景
- 🔒 **安全隔离**: 遵循 Electron 最佳实践

## 🚀 快速开始

### 方式 1：使用预构建版本

1. 下载 `TOON-Converter-Portable.exe`
2. 双击运行即可

### 方式 2：从源码运行（开发者）

```bash
# 克隆仓库（如适用）
git clone <repository-url>
cd toon

# 安装依赖
pnpm install

# 启动开发模式
pnpm dev
```

## 📥 下载与安装

### Windows

1. 下载 `TOON-Converter-Portable.exe`
2. 双击运行，无需安装

### 从源码构建

```bash
# 安装依赖
pnpm install

# 开发模式（推荐用于开发和测试）
pnpm dev

# 构建 Windows 版本（无签名）
pnpm build:dir
```

#### 构建选项说明

- **`pnpm dev`** - 开发模式，支持热重载
- **`pnpm build:dir`** - 生成未打包应用到 `dist/win-unpacked/`（推荐）
- **`pnpm build:win`** - 生成 portable 单文件版（需管理员权限）

#### Windows 构建注意事项

如遇到符号链接权限错误（`Cannot create symbolic link`），请使用以下任一方法：

**方法 1（推荐）**：使用 `pnpm build:dir`

```bash
pnpm build:dir
```

生成的应用位于：`dist\win-unpacked\TOON Converter.exe`

**方法 2**：启用 Windows 开发者模式

1. 设置 → 更新和安全 → 开发者选项
2. 启用"开发人员模式"
3. 重新运行 `pnpm build:win`

**方法 3**：以管理员身份运行构建

```powershell
# 右键 PowerShell → 以管理员身份运行
pnpm build:win
```

## 🚀 使用指南

### 基本操作

1. **JSON → TOON**: 在左侧输入框粘贴 JSON 数据，右侧自动显示 TOON 格式
2. **TOON → JSON**: 点击"切换方向"按钮，反向转换
3. **配置选项**: 在中间面板调整编解码参数
4. **示例学习**: 右侧示例库一键插入典型数据

### 快捷键


| 快捷键       | 功能         |
| -------------- | -------------- |
| `Ctrl+Enter` | 立即转换     |
| `Ctrl+L`     | 清空输入     |
| `Ctrl+D`     | 切换方向     |
| `Ctrl+E`     | 切换示例面板 |
| `Ctrl+C`     | 复制结果     |

### 配置选项

**编码选项 (JSON → TOON)**:

- **缩进空格数 (indent)**: `0-8` - 每层缩进的空格数（默认 2）
- **分隔符 (delimiter)**: `,` / `\t` / `|` - 表格模式列分隔符（默认逗号）
- **长度标记 (lengthMarker)**: 复选框 - 启用后显示 `[#3]` 而非 `[3]`

**解码选项 (TOON → JSON)**:

- **严格模式 (strict)**: 复选框 - 启用完整校验（转义、语法、长度、分隔符）
- **期望缩进 (indent)**: `0-8` - 预期缩进空格数（默认 2）

## 🎯 TOON 格式模式

应用自动识别并标注 TOON 格式模式：

- **表格 (Tabular)**: 同构对象数组，如 `items[2]{id,name}:`
- **列表 (List)**: 混合/非同构数组，使用 `- item` 格式
- **内联 (Inline)**: 原始值数组，如 `tags[3]: a,b,c`
- **对象 (Object)**: 普通键值对

## 📖 示例

### 简单对象

```json
{
  "id": 1,
  "name": "Ada"
}
```

```toon
id: 1
name: Ada
```

### 表格数组

```json
{
  "items": [
    { "id": 1, "name": "Widget", "qty": 5 },
    { "id": 2, "name": "Gadget", "qty": 3 }
  ]
}
```

```toon
items[2]{id,name,qty}:
  1,Widget,5
  2,Gadget,3
```

更多示例请查看应用内置示例库。

## 🛠️ 技术栈

- **框架**: Electron v33 + Vite v6
- **UI**: React 18 + TypeScript 5
- **样式**: Tailwind CSS v3
- **核心库**: [@toon-format/toon](https://github.com/toon-format/toon) v0.7.3
- **构建**: electron-builder v25

## 👨‍💻 开发指南

### 项目结构

```
toon/
├── electron/          # Electron 主进程和预加载脚本
│   ├── main.ts       # 主进程入口
│   └── preload.ts    # 预加载脚本
├── src/              # React 应用源码
│   ├── components/   # UI 组件
│   ├── hooks/        # 自定义 Hooks
│   ├── types/        # TypeScript 类型定义
│   └── utils/        # 工具函数（转换、估算）
├── dist/             # Vite 构建产物
├── dist-electron/    # Electron 构建产物
└── dist/win-unpacked/ # Windows 应用包
```

### 可用脚本


| 命令              | 说明                             |
| ------------------- | ---------------------------------- |
| `pnpm dev`        | 启动开发服务器 + Electron        |
| `pnpm build:dir`  | 构建到目录（无签名，推荐）       |
| `pnpm build:win`  | 构建 portable 版（需管理员权限） |
| `pnpm type-check` | TypeScript 类型检查              |
| `pnpm lint`       | ESLint 代码检查                  |

### 添加新示例

编辑 `src/components/Examples.tsx` 的 `EXAMPLES` 数组：

```typescript
{
  id: 'unique-id',
  name: '示例名称',
  description: '简短描述',
  data: { /* JSON 数据 */ }
}
```

## 📋 设计原则

本项目严格遵循以下原则：

- **KISS**: 轻量编辑器，不暴露冗余配置
- **YAGNI**: 仅实现核心转换功能，Token 计数采用简化算法
- **DRY**: 统一错误处理与转换管道
- **SOLID**:
  - **SRP**: 转换引擎、UI 组件、状态栏、示例库各司其职
  - **OCP**: 配置项通过受控 props 扩展
  - **ISP**: 预加载仅暴露最小 IPC 接口
  - **DIP**: 渲染层依赖抽象转换服务

## ⚠️ 已知限制

- Token 计数为**近似值**，不同 tokenizer（GPT/Claude/Llama）结果会有差异
- 大文件（>10MB）可能影响编辑器性能
- 严格模式下部分边缘 case 可能报错（符合 TOON 规范）

## 🔧 问题排查

### 构建失败：找不到 `tsc` 命令

**症状**：`'tsc' 不是内部或外部命令`

**解决**：

```bash
# 先安装依赖
pnpm install

# 再构建
pnpm build:dir
```

### 构建失败：TypeScript 类型错误

**症状**：`lengthMarker` 类型不兼容

**解决**：确保已应用最新代码修复（`src/types/conversion.ts` 中 `lengthMarker` 类型应为 `false | '#'`）

### 构建失败：符号链接权限错误

**症状**：

```
ERROR: Cannot create symbolic link : 客户端没有所需的特权
```

**原因**：electron-builder 的签名工具包含 macOS 符号链接，Windows 需要特殊权限解压

**解决**：使用无签名构建

```bash
pnpm build:dir
```

或查看上方"Windows 构建注意事项"部分的其他解决方案。

### 应用无法启动

**检查**：

1. 确认 `dist/win-unpacked/resources/app.asar` 存在
2. 查看控制台错误信息
3. 尝试重新构建：`pnpm build:dir`

## 📝 更新日志

### v1.1.0 (2025-11-06)

- ✅ **修复官方规范合规性问题**
  - 添加 `EncodeOptions.indent` 参数支持（与官方 API 一致）
  - 在配置面板添加缩进空格数控件（编码选项）
  - 调整 `lengthMarker` 类型顺序为 `'#' | false`（符合官方文档）
- 🎨 **UI/UX 改进**
  - 将 `lengthMarker` 从文本输入改为复选框（提升用户体验）
  - 优化配置面板布局和说明文字
- 📚 **示例库扩充（新增 8 个示例）**
  - Tab 分隔符示例
  - 长度标记示例
  - 深层嵌套结构
  - 带嵌套数组的列表
  - 数值与字符串混合
  - 包含特殊字符
  - 大型表格数据（模拟真实场景）
- 🔧 **代码质量**
  - 确保 `encodeOptions` 默认值包含所有参数
  - 提升类型定义与官方规范一致性

### v1.0.0 (2025-11-05)

- ✨ 初始版本发布
- 🎨 现代 UI 与深色模式
- ⚙️ 完整配置选项
- 📚 内置示例库（覆盖所有官方示例）
- ⌨️ 快捷键支持
- 🔧 修复 TypeScript 类型兼容性问题
- 📦 优化构建流程，支持无签名打包

## 📄 许可证

MIT License © 2025

## 🔗 相关链接

- [TOON 官方仓库](https://github.com/toon-format/toon)
- [TOON 规范文档](https://github.com/toon-format/toon/blob/main/SPEC.md)

---

**注意**: Token 节省效果取决于数据结构。TOON 在"同构对象数组"场景下优势最明显，非同构或深层嵌套时 JSON 可能更紧凑。

# 🌟 iTalk - AI 语言学习平台

**通过 AI 对话自然地练习语言**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?logo=react)](https://reactjs.org/)
[![Powered by Gemini](https://img.shields.io/badge/Powered%20by-Gemini%20AI-4285F4)](https://ai.google.dev/)
[![Open Source](https://img.shields.io/badge/Open%20Source-%E2%9D%A4-red)](https://opensource.org/)
[![GitHub](https://img.shields.io/badge/GitHub-kenoleeee-181717?logo=github)](https://github.com/kenoleeee/italk)

> 一款开源、注重隐私的语言学习应用，使用 Google Gemini AI 提供个性化的对话练习。无需账户，无跟踪，只有学习。

---

## 📖 其他语言版本

🇬🇧 [English](README.md) | 🇷🇺 [Русский](README.ru.md) | 🇺🇦 [Українська](README.ua.md) | 🇨🇳 [中文](README.zh.md)

---

## ✨ 功能特性

### 🎯 核心功能
- 💬 **AI 聊天练习** - 根据您的水平调整的自然对话
- 🎤 **语音练习** - 实时语音识别和合成
- 🔥 **打卡追踪** - 通过每日练习保持动力
- 📅 **每周目标** - 设定和追踪每周练习目标
- 🎓 **自适应学习** - AI 根据您的 CEFR 等级调整（A1-C2）
- 🌍 **50+ 种语言** - 学习 Gemini 支持的任何语言

### 🎨 用户体验
- ✨ **精美界面** - 现代化、响应式设计
- 🌓 **深色/浅色模式** - 在任何光线下都舒适
- 📱 **移动优先** - 在手机、平板和桌面上都完美运行
- 🚀 **闪电般快速** - 使用 Vite 构建，即时加载
- 🔒 **隐私优先** - 无账户、无服务器、无跟踪

---

## 🚀 快速开始

### 前置要求

- **Node.js** 18+ ([下载](https://nodejs.org/))
- **Gemini API 密钥** ([免费获取](https://ai.google.dev/))

### 安装

```bash
# 克隆仓库
git clone https://github.com/kenoleeee/italk.git
cd italk

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### ⚠️ 重要：API 密钥设置

**这是一个开源项目。** 用户通过应用添加自己的 API 密钥：

1. 在 `http://localhost:5173` 打开应用
2. 进入**设置** ⚙️
3. 添加您的 **Gemini API 密钥**
4. 开始练习！

#### 获取免费 API 密钥

1. 访问 [Google AI Studio](https://ai.google.dev/)
2. 点击 "Get API Key"
3. 复制您的密钥
4. 在设置中粘贴

> **隐私说明：** 您的 API 密钥本地存储在浏览器中，除了发送到 Google 的 Gemini API 外，不会发送到任何地方。

---

## 📖 如何使用

### 1️⃣ 配置设置

进入**设置**页面：

- 🔑 **添加 API 密钥** - 首次使用时必需
- 🌍 **学习语言** - 您想学习什么语言
- 🎓 **熟练程度** - A1（初学者）到 C2（精通）
- 🌓 **主题** - 浅色、深色或系统
- 🗣️ **界面语言** - 中文、英语、俄语、西班牙语、法语、德语、乌克兰语

### 2️⃣ 选择练习模式

**聊天模式** 💬
- 输入消息练习写作
- 获得 AI 即时反馈
- 建立词汇和语法

**语音模式** 🎤
- 与 AI 自然对话
- 练习发音
- 提高听力技能
- 实时语音识别

### 3️⃣ 保持动力

**每日打卡** 🔥
- 每天练习以保持打卡
- 追踪您最长的打卡记录
- 可视化进度指示器

**每周目标** 📅
- 设定练习目标（默认：每周7天）
- 查看您的每周进度

---

## 🎓 CEFR 等级

应用根据欧洲共同语言参考标准（CEFR）等级进行调整：

| 等级 | 名称 | 描述 | AI 行为 |
|------|------|------|---------|
| **A1** | 初学者 | 基本单词和短语 | 最简单的词汇，短句 |
| **A2** | 基础 | 简单的日常话题 | 常用短语，简单语法 |
| **B1** | 中级 | 独立处理熟悉话题 | 标准词汇，各种时态 |
| **B2** | 中高级 | 复杂和抽象的想法 | 高级词汇，细微差别 |
| **C1** | 高级 | 流利和专业 | 复杂语言，习语 |
| **C2** | 精通 | 接近母语水平 | 母语级别的复杂度 |

---

## 🛠️ 技术栈

### 前端
- ⚛️ **React 19** - UI 库
- ⚡ **Vite 7** - 构建工具
- 🎨 **Tailwind CSS 4** - 实用样式
- 🧭 **React Router v7** - 路由

### AI 和功能
- 🤖 **Google Gemini 2.5 Flash** - AI 对话
- 🎤 **Web Speech API** - 语音识别和合成
- 🌐 **i18next** - 国际化
- 💾 **localStorage** - 客户端数据存储

---

## 📦 构建和部署

### 生产构建

```bash
npm run build
```

输出：包含优化静态文件的 `dist/` 目录。

### 部署选项

#### 🔷 Vercel（推荐）

```bash
npm i -g vercel
vercel
```

#### 🟢 Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod
```

#### ☁️ 任何静态托管

将 `dist/` 文件夹上传到：
- Cloudflare Pages
- Firebase Hosting
- GitHub Pages
- AWS S3 + CloudFront

---

## 🔐 隐私和数据

### 我们不收集什么
- ❌ 无用户账户
- ❌ 无个人信息
- ❌ 无分析或跟踪
- ❌ 无 cookies（除了 localStorage）
- ❌ 无后端服务器

### 本地存储内容

所有数据都保留在浏览器的 `localStorage` 中：

| 键 | 用途 |
|----|------|
| `italk_gemini_api_key` | 您的 Gemini API 密钥 |
| `learningLanguage` | 学习语言 |
| `italk_language_level` | 您的熟练程度 |
| `italk_streak` | 打卡数据 |
| `italk_weekly_goal` | 每周目标 |
| `italk_sessions` | 练习历史 |
| `theme` | 界面主题 |
| `i18nextLng` | 界面语言 |

---

## 🌍 支持的语言

### 界面语言（7种）
- 🇨🇳 中文
- 🇬🇧 English
- 🇷🇺 Русский
- 🇺🇦 Українська
- 🇪🇸 Español
- 🇫🇷 Français
- 🇩🇪 Deutsch

### 学习语言（50+种）

练习 Gemini AI 支持的任何语言！

---

## 🤝 贡献

欢迎贡献！方法如下：

1. **Fork** 仓库
2. **创建**分支：`git checkout -b feature/AmazingFeature`
3. **提交**更改：`git commit -m 'Add AmazingFeature'`
4. **推送**分支：`git push origin feature/AmazingFeature`
5. **打开** Pull Request

---

## 📝 许可证

**MIT License** - 查看 [LICENSE](LICENSE) 文件。

---

## 💬 支持

- 📖 **文档**：您正在阅读！
- 🐛 **错误报告**：[GitHub Issues](https://github.com/kenoleeee/italk/issues)
- 💡 **功能请求**：[GitHub Discussions](https://github.com/kenoleeee/italk/discussions)

---

## ❓ 常见问题

### iTalk 真的免费吗？

是的！iTalk 100% 免费且开源。您只需要一个来自 Google 的免费 Gemini API 密钥。

### 需要创建账户吗？

不需要！iTalk 无需任何账户即可使用。只需添加您的 API 密钥即可开始学习。

### 我的数据安全吗？

绝对安全。所有数据都保留在您的浏览器中。我们没有服务器，所以我们实际上无法访问您的数据。

### 可以离线使用吗？

目前 AI 功能需要互联网连接。离线模式计划在未来版本中推出。

### 支持哪些浏览器？

- ✅ Chrome/Edge（语音功能最佳）
- ✅ Firefox（语音支持有限）
- ✅ Safari（语音支持有限）
- ✅ 移动浏览器

---

**由语言学习者为语言学习者制作，倾注 ❤️**

创建者 [Timur (kenol)](https://github.com/kenoleeee)

[⭐ 给项目加星](https://github.com/kenoleeee/italk) • [🐛 报告错误](https://github.com/kenoleeee/italk/issues) • [💡 功能请求](https://github.com/kenoleeee/italk/discussions)


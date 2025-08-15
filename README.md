# 李聪个人学术主页网站 (licong.me) v2.0

这是复旦大学信息科学与工程学院副教授李聪老师的个人学术主页网站，基于现代Web技术栈构建，展示其学术成就、研究方向和教学信息。现已集成**智能学术动态监控系统**（Academic Dynamic Monitoring Agent），实现全自动内容更新。

## 🎯 项目概述 v2.0

本项目是一个智能化的学术个人主页网站，专为复旦大学李聪副教授设计，具备以下特色功能：

### 🆕 新增功能 v2.0
- **🤖 智能监控**: 自动监控复旦大学官网和Google Scholar动态
- **📊 学术动态**: 17篇代表性期刊论文（含Google Scholar链接）
- **⚡ 自动更新**: GitHub Actions每日自动内容更新
- **🔄 版本控制**: 每次更新都有完整的Git记录
- **🎯 智能筛选**: 基于关键词的内容过滤

### 📋 核心内容模块
- **个人简介**: 教育背景、研究方向、学术成就
- **学术任职**: 学会任职、会议任职、期刊审稿（2024年更新）
- **主导课程**: 本科基础课、专业选修课、研究生课程
- **学术专著**: 已出版书籍《复杂网络传播理论》
- **期刊论文**: 17篇代表性学术论文（2015-2024年）
- **学术动态**: 智能监控的最新获奖信息、学术活动
- **相关链接**: 实验室、学术主页、社交平台

## 🛠️ 技术栈 v2.0

### 前端技术栈
- **框架**: React 18 + TypeScript
- **构建**: Vite (极速开发体验)
- **样式**: Tailwind CSS (原子化CSS)
- **动画**: tsParticles粒子动画系统
- **图标**: Lucide React图标库
- **组件**: Headless UI无障碍组件

### 智能监控技术栈
- **运行环境**: Node.js 18+
- **数据采集**: axios + cheerio
- **自动部署**: GitHub Actions
- **数据存储**: JSON格式本地存储
- **版本控制**: Git + GitHub

## 📦 项目结构 v2.0

```
licong.me/
├── 📁 src/                     # 前端源代码
│   ├── App.tsx                # 主应用组件（含17篇论文）
│   ├── main.tsx               # 应用入口点
│   ├── index.css              # 全局样式
│   └── assets/                # 静态资源
├── 🤖 智能监控系统
│   ├── academic-agent.js      # 核心监控脚本
│   ├── academic-agent.config.js # 配置文件
│   ├── update-academic-dynamics.js # 更新脚本
│   └── data/
│       └── academic-updates.json # 数据存储
├── 🔄 GitHub Actions
│   └── .github/workflows/
│       └── academic-updates.yml # 自动更新工作流
├── 📋 配置文件
├── package.json               # 项目依赖（含智能监控）
├── README.md                  # 项目文档
└── ACADEMIC_AGENT_README.md   # 智能体使用指南
```

## 🚀 快速开始 v2.0

### 环境要求
- **Node.js**: 16+ (推荐18+)
- **npm**: 8+ 或 pnpm
- **Git**: 最新版本

### 安装与运行

```bash
# 克隆项目
git clone https://github.com/cloudwindcc/licong.me.git
cd licong.me

# 安装依赖（含智能监控）
npm install

# 开发模式启动
npm run dev

# 构建生产版本
npm run build

# 智能监控测试
node update-academic-dynamics.js
```

## 🤖 智能监控系统

### 🔍 监控功能
- **每日监控**: 自动检查复旦大学官网最新动态
- **每周监控**: 自动检查Google Scholar新论文
- **智能筛选**: 基于关键词的内容过滤
- **双语更新**: 中英文双语学术动态
- **GitHub集成**: 自动推送到main分支

### 📅 更新频率
- **每日**: 复旦大学官网动态
- **每周**: Google Scholar新论文
- **每月**: 全面数据同步
- **实时**: 手动触发更新

### 🎯 监控内容
- **新论文发表**: 最新期刊论文
- **学术会议**: 受邀报告和主持活动
- **获奖信息**: 学术荣誉和奖项
- **媒体报道**: 学术相关新闻

## 🎨 设计特色 v2.0

### 视觉设计
- **响应式设计**: 完美适配所有设备
- **现代化UI**: 卡片式布局 + 毛玻璃效果
- **粒子动画**: tsParticles动态背景
- **学术风格**: 专业、简洁、信息层次清晰

### 交互体验
- **双语展示**: 中英文无缝切换
- **折叠面板**: 交互式内容展示
- **实时搜索**: 快速定位内容
- **Google Scholar**: 一键访问论文引用

## 📊 内容特色 v2.0

### 📚 期刊论文库（17篇）
**时间跨度**: 2015-2024年
**顶级期刊**: Nature Communications, Physical Review, IEEE系列, Chaos等
**研究领域**: 
- 时态网络动力学 (5篇)
- 流行传播模型 (4篇)
- 网络分析与预测 (4篇)
- 网络结构与控制 (4篇)

### 🔗 外部链接
- **Google Scholar**: 每篇论文直接链接
- **复旦大学**: 官方主页链接
- **实验室**: 自适应网络与控制研究室
- **学术平台**: ResearchGate, 集智斑图等

## 🌐 部署方案 v2.0

### 自动化部署
- **GitHub Pages**: 零配置部署
- **GitHub Actions**: 每日自动更新
- **CDN加速**: 全球访问优化
- **版本回滚**: 支持历史版本恢复

### 部署平台
```bash
# GitHub Pages (推荐)
git push origin main  # 自动部署

# Netlify
netlify deploy --prod

# Vercel
vercel --prod
```

## 📈 版本历史

### v2.0 (2024年12月)
- **新增**: 智能学术动态监控系统
- **新增**: 17篇代表性期刊论文
- **新增**: Google Scholar一键访问
- **新增**: 自动GitHub推送
- **优化**: 响应式设计和性能

### v1.5 (2024年11月)
- **新增**: 双语展示功能
- **新增**: 粒子动画背景
- **优化**: 移动端适配

### v1.0 (2024年10月)
- **初始版本**: 基本学术主页
- **包含**: 个人简介、课程、专著、基础论文

## 🔧 智能监控配置

### 环境变量
```bash
# GitHub Secrets配置
SERP_API_KEY=your_google_scholar_api_key
GITHUB_TOKEN=your_github_token
```

### 监控关键词
```javascript
keywords: [
  '李聪', '李聪教授', '复旦大学', 
  '复杂网络', '网络科学', '信息学院',
  '自适应网络', '控制系统'
]
```

## 🎯 使用场景

### 日常维护
- **自动更新**: 无需人工干预
- **数据备份**: 自动版本控制
- **内容同步**: 多端实时同步

### 学术展示
- **论文收录**: 完整学术成果展示
- **动态更新**: 实时学术动态
- **专业形象**: 现代化学术主页

## 📞 技术支持

### 智能监控支持
- **GitHub Issues**: 问题反馈
- **文档**: ACADEMIC_AGENT_README.md
- **代码**: academic-agent.js
- **配置**: academic-agent.config.js

### 项目支持
- **邮箱**: cong_li@fudan.edu.cn
- **电话**: 021-31242510
- **GitHub**: cloudwindcc/licong.me

## 🎉 项目亮点

✅ **智能化**: 全自动学术动态更新
✅ **现代化**: 响应式设计和交互体验
✅ **专业化**: 学术级别的内容展示
✅ **国际化**: 双语支持 + 全球访问
✅ **可持续**: 自动化维护和更新

---

**🚀 立即体验**: [https://cloudwindcc.github.io/licong.me](https://cloudwindcc.github.io/licong.me)

**📊 智能监控**: 每日9点自动更新学术动态

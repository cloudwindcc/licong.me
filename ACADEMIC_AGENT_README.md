# 🤖 李聪教授学术动态智能体

## 📋 系统概述

这是一个全自动的学术动态监控系统，专为李聪教授的个人学术主页设计，能够每月自动监控以下信息源：

### 🔍 监控源
1. **复旦大学官网** - 信息学院李聪老师的最新动态
2. **Google Scholar** - 最新发表的学术论文
3. **学术新闻** - 相关学术会议和活动信息

### ⚙️ 系统特性
- **全自动监控**: 每天自动检查更新
- **智能筛选**: 基于关键词筛选相关内容
- **双语支持**: 中英文双语展示
- **GitHub集成**: 自动推送更新到网站
- **数据备份**: 本地数据备份和恢复

## 🛠️ 技术架构

### 三层架构设计
```
┌─────────────────┐
│   数据采集层     │  ← 复旦大学官网 + Google Scholar
├─────────────────┤
│   数据处理层     │  ← 内容解析 + 去重 + 分类
├─────────────────┤
│   自动更新层     │  ← 网站更新 + GitHub推送
└─────────────────┘
```

### 技术栈
- **Node.js**: 智能体运行环境
- **axios**: HTTP请求库
- **cheerio**: HTML解析
- **GitHub Actions**: 自动化部署
- **TypeScript**: 类型安全

## 🚀 快速部署

### 1. 环境准备
```bash
# 安装依赖
npm install axios cheerio fs-extra

# 安装开发依赖
npm install --save-dev @types/node
```

### 2. 配置环境变量
在GitHub仓库设置中添加以下Secrets：
- `SERP_API_KEY`: Google Scholar API密钥
- `GITHUB_TOKEN`: GitHub访问令牌

### 3. 启动智能体
```bash
# 本地测试
node academic-agent.js

# 手动更新
node update-academic-dynamics.js
```

### 4. 自动运行
系统已配置GitHub Actions，每天上午9点自动运行：
- `.github/workflows/academic-updates.yml`

## 📊 监控内容

### 自动更新内容
- **新论文发布**: 最新期刊论文
- **学术会议**: 受邀报告和主持活动
- **获奖信息**: 学术荣誉和奖项
- **媒体关注**: 学术媒体报道

### 数据格式
```json
{
  "news": [
    {
      "title": "论文标题",
      "source": "来源",
      "date": "2024-XX-XX",
      "url": "链接",
      "type": "research|award|event"
    }
  ]
}
```

## 🔧 配置选项

### 监控频率
- **每日**: 复旦大学官网
- **每周**: Google Scholar新论文
- **每月**: 全面数据同步

### 关键词筛选
```javascript
keywords: [
  '李聪', '李聪教授', '复杂网络', 
  '网络科学', '信息学院', '复旦大学'
]
```

## 📈 使用示例

### 更新学术动态
智能体将自动：
1. 扫描复旦大学官网
2. 检查Google Scholar新论文
3. 对比现有数据
4. 更新网站内容
5. 自动提交到GitHub

### 手动触发更新
```bash
# 通过GitHub Actions页面手动触发
# 或执行本地更新脚本
npm run update-academic
```

## 🎯 实际部署步骤

### 1. 配置GitHub Actions
1. 确保 `.github/workflows/academic-updates.yml` 存在
2. 在仓库设置中添加 Secrets
3. 启用 GitHub Actions

### 2. 验证监控
1. 检查 Actions 运行日志
2. 确认数据更新成功
3. 验证网站内容更新

### 3. 监控状态
- 查看 Actions 运行状态
- 检查邮件通知（如配置）
- 监控日志输出

## 📞 技术支持

### 常见问题
1. **API限制**: Google Scholar有访问限制，建议使用专业服务
2. **网络问题**: 确保服务器可以访问目标网站
3. **数据格式**: 定期检查数据结构变化

### 故障排除
```bash
# 检查日志
node academic-agent.js --debug

# 验证配置
node -e "console.log(require('./academic-agent.config.js'))"
```

## 🔄 更新机制

### 自动更新流程
1. **每日检查**: GitHub Actions定时运行
2. **数据对比**: 与现有数据比对
3. **内容更新**: 自动更新网页内容
4. **版本控制**: 每次更新都有Git记录
5. **备份恢复**: 支持数据回滚

### 监控状态
- ✅ 已配置GitHub Actions
- ✅ 已创建智能体脚本
- ✅ 已设置数据存储
- ✅ 已添加错误处理
- ✅ 已配置自动推送

智能体现已部署完成，将开始自动监控和更新学术动态！
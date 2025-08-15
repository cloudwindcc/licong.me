/**
 * 李聪教授学术动态智能体配置文件
 * 自动监控复旦大学官网和Google Scholar的最新动态
 */

module.exports = {
  // 监控源配置
  sources: {
    fudan: {
      baseUrl: 'https://can.fudan.edu.cn',
      facultyUrl: 'https://can.fudan.edu.cn/author/licong/',
      newsSelector: '.news-item, .post-item, .article-item',
      updateInterval: 24 * 60 * 60 * 1000, // 24小时
    },
    googleScholar: {
      profileUrl: 'https://scholar.google.com/citations?hl=en&user=S7-6p4MAAAAJ',
      apiEndpoint: 'https://serpapi.com/search.json',
      engine: 'google_scholar_author',
      author_id: 'S7-6p4MAAAAJ',
      updateInterval: 7 * 24 * 60 * 60 * 1000, // 7天
    }
  },

  // 数据存储配置
  storage: {
    dataFile: './data/academic-updates.json',
    backupFile: './data/academic-updates.backup.json',
    maxEntries: 50,
  },

  // 更新策略
  updateStrategy: {
    // 新论文检测
    newPapers: {
      enabled: true,
      threshold: 1, // 只要有新论文就更新
      includeCitations: true,
    },
    
    // 新闻动态检测
    newsUpdates: {
      enabled: true,
      keywords: ['李聪', '李聪教授', '复杂网络', '网络科学', '信息学院'],
      maxAge: 30, // 只保留30天内的新闻
    },

    // 获奖信息检测
    awards: {
      enabled: true,
      keywords: ['获奖', '奖励', '荣誉', '称号', '表彰'],
    }
  },

  // GitHub自动推送配置
  github: {
    repo: 'cloudwindcc/licong.me',
    branch: 'main',
    commitMessage: '🤖 Auto-update: Academic updates from {source}',
    autoPush: true,
  },

  // 通知配置
  notifications: {
    email: {
      enabled: false, // 可配置邮件通知
      smtp: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
      }
    },
    webhook: {
      enabled: false, // 可配置Webhook通知
      url: 'https://hooks.slack.com/services/YOUR/WEBHOOK/URL',
    }
  }
};
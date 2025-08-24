/**
 * 李聪教授学术动态智能体 - 优化版 v2
 * 自动监控和更新学术动态 - 增强网络爬取和错误处理
 */

import axios from 'axios';
import * as cheerio from 'cheerio';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

class AcademicAgentV2 {
  constructor(config) {
    this.config = config;
    this.dataFile = path.join(__dirname, this.config.storage.dataFile);
    this.lastUpdate = null;
    this.retryConfig = {
      retries: 3,
      delay: 2000
    };
  }

  async initialize() {
    try {
      await this.ensureDataDir();
      await this.loadExistingData();
      console.log('学术动态智能体v2初始化完成');
    } catch (error) {
      console.error('初始化失败:', error);
      throw error;
    }
  }

  async ensureDataDir() {
    const dir = path.dirname(this.dataFile);
    try {
      await fs.access(dir);
    } catch {
      await fs.mkdir(dir, { recursive: true });
    }
  }

  async loadExistingData() {
    try {
      const data = await fs.readFile(this.dataFile, 'utf8');
      this.existingData = JSON.parse(data);
    } catch {
      this.existingData = { 
        news: [], 
        papers: [], 
        awards: [], 
        lastUpdate: null,
        searchHistory: []
      };
    }
  }

  async saveData(data) {
    try {
      await fs.writeFile(this.dataFile, JSON.stringify(data, null, 2));
      console.log('数据保存成功');
    } catch (error) {
      console.error('数据保存失败:', error);
      throw error;
    }
  }

  // 增强的HTTP请求，带重试机制
  async robustHttpRequest(url, options = {}) {
    const defaultOptions = {
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      ...options
    };

    for (let attempt = 1; attempt <= this.retryConfig.retries; attempt++) {
      try {
        console.log(`尝试获取: ${url} (第${attempt}次)`);
        const response = await axios.get(url, defaultOptions);
        return response;
      } catch (error) {
        console.error(`第${attempt}次尝试失败:`, error.message);
        if (attempt === this.retryConfig.retries) {
          throw error;
        }
        await new Promise(resolve => setTimeout(resolve, this.retryConfig.delay * attempt));
      }
    }
  }

  // 监控复旦大学官网 - 增强版
  async monitorFudanNews() {
    try {
      console.log('开始监控复旦大学动态...');
      
      const fudanUrls = [
        'https://cs.fudan.edu.cn/news/notice.htm',
        'https://cs.fudan.edu.cn/news/research.htm',
        'https://can.fudan.edu.cn/news/index.html',
        'https://news.fudan.edu.cn/',
        'https://jwb.fudan.edu.cn/'
      ];
      
      const news = [];
      
      for (const url of fudanUrls) {
        try {
          const response = await this.robustHttpRequest(url);
          const $ = cheerio.load(response.data);
          
          // 多种选择器组合，提高匹配成功率
          const selectors = [
            '.list-item', '.news-item', '.article-item', '.notice-item',
            'li', '.item', '.content-item', '.post-item', '.entry'
          ];
          
          for (const selector of selectors) {
            $(selector).each((i, elem) => {
              const title = $(elem).find('a').text().trim() || 
                           $(elem).find('.title').text().trim() ||
                           $(elem).text().trim();
              
              let link = $(elem).find('a').attr('href') || 
                        $(elem).find('.title a').attr('href');
              
              const dateText = $(elem).find('.date, .time, .publish-date, .date-info').text().trim() ||
                              $(elem).next('.date, .time').text().trim();
              
              // 更智能的姓名匹配
              const namePatterns = [
                /李聪/i, /Li Cong/i, /C.*Li/i, /李.*聪/i,
                /计算机.*李/i, /李.*计算机/i, /自适应.*李/i
              ];
              
              const isRelevant = namePatterns.some(pattern => pattern.test(title));
              
              if (title && isRelevant && title.length > 5) {
                // 修复URL格式
                let fullUrl = url;
                if (link) {
                  if (link.startsWith('http')) {
                    fullUrl = link;
                  } else if (link.startsWith('/')) {
                    const baseUrl = new URL(url).origin;
                    fullUrl = baseUrl + link;
                  } else {
                    const baseUrl = url.substring(0, url.lastIndexOf('/') + 1);
                    fullUrl = baseUrl + link;
                  }
                }
                
                news.push({
                  title: title,
                  source: '复旦大学',
                  date: this.extractDate(dateText),
                  url: fullUrl,
                  type: 'research',
                  fetchedAt: new Date().toISOString()
                });
              }
            });
          }
        } catch (error) {
          console.error(`获取 ${url} 失败:`, error.message);
        }
      }
      
      // 去重
      const uniqueNews = news.filter((item, index, self) => 
        index === self.findIndex(t => t.title === item.title)
      );
      
      console.log(`复旦大学监控完成，发现${uniqueNews.length}条相关动态`);
      return uniqueNews.slice(0, 10);
    } catch (error) {
      console.error('监控复旦大学动态失败:', error);
      return [];
    }
  }

  // 监控Google Scholar - 增强版
  async monitorGoogleScholar() {
    try {
      console.log('开始监控学术论文...');
      
      // 使用多个搜索源作为备用
      let papers = [];
      
      // 1. 尝试SERP API
      if (process.env.SERP_API_KEY) {
        try {
          papers = await this.searchWithSerpAPI();
          if (papers.length > 0) {
            console.log(`SERP API找到${papers.length}篇论文`);
            return papers;
          }
        } catch (error) {
          console.error('SERP API失败:', error.message);
        }
      }
      
      // 2. 尝试Semantic Scholar API
      try {
        papers = await this.searchWithSemanticScholar();
        if (papers.length > 0) {
          console.log(`Semantic Scholar找到${papers.length}篇论文`);
          return papers;
        }
      } catch (error) {
        console.error('Semantic Scholar API失败:', error.message);
      }
      
      // 3. 尝试CrossRef API
      try {
        papers = await this.searchWithCrossRef();
        if (papers.length > 0) {
          console.log(`CrossRef找到${papers.length}篇论文`);
          return papers;
        }
      } catch (error) {
        console.error('CrossRef API失败:', error.message);
      }
      
      return papers;
    } catch (error) {
      console.error('学术论文监控失败:', error);
      return [];
    }
  }

  async searchWithSerpAPI() {
    const queries = [
      'author:"C Li" fudan university',
      'author:"Li Cong" fudan',
      'author:"Cong Li" complex networks',
      'Li C adaptive networks fudan university'
    ];
    
    const allPapers = [];
    
    for (const query of queries) {
      try {
        const url = `https://serpapi.com/search.json?engine=google_scholar&q=${encodeURIComponent(query)}&api_key=${process.env.SERP_API_KEY}&num=5`;
        const response = await this.robustHttpRequest(url);
        
        if (response.data.organic_results) {
          response.data.organic_results.forEach(item => {
            const year = this.extractYear(item.publication_info?.summary);
            if (year >= 2022) { // 只获取近年论文
              allPapers.push({
                title: item.title,
                journal: this.extractJournal(item.publication_info?.summary || 'Unknown Journal'),
                year: year,
                authors: this.extractAuthors(item.publication_info?.summary || ''),
                url: item.link || item.inline_links?.serpapi_cite_link || '#',
                date: `${year}-01-01`,
                citations: parseInt(item.inline_links?.cited_by?.total) || 0,
                source: 'Google Scholar',
                fetchedAt: new Date().toISOString()
              });
            }
          });
        }
      } catch (error) {
        console.error(`SERP查询失败: ${query}`, error.message);
      }
    }
    
    return this.deduplicatePapers(allPapers);
  }

  async searchWithSemanticScholar() {
    const queries = [
      'C Li Fudan University',
      'Li Cong Fudan',
      'Cong Li complex networks'
    ];
    
    const allPapers = [];
    
    for (const query of queries) {
      try {
        const response = await this.robustHttpRequest('https://api.semanticscholar.org/graph/v1/author/search', {
          params: {
            query: query,
            limit: 3
          }
        });
        
        if (response.data.data && response.data.data.length > 0) {
          for (const author of response.data.data.slice(0, 2)) {
            const papersResponse = await this.robustHttpRequest(
              `https://api.semanticscholar.org/graph/v1/author/${author.authorId}/papers`,
              {
                params: {
                  limit: 10,
                  sort: 'publicationDate:desc',
                  fields: 'title,venue,year,authors,url,publicationDate,citationCount'
                }
              }
            );
            
            papersResponse.data.data.forEach(paper => {
              if (paper.year >= 2022) {
                allPapers.push({
                  title: paper.title,
                  journal: paper.venue || 'Preprint',
                  year: paper.year || new Date().getFullYear(),
                  authors: paper.authors?.slice(0, 5).map(a => a.name) || ['C. Li'],
                  url: paper.url || '#',
                  date: paper.publicationDate || `${paper.year}-01-01`,
                  citations: paper.citationCount || 0,
                  source: 'Semantic Scholar',
                  fetchedAt: new Date().toISOString()
                });
              }
            });
          }
        }
      } catch (error) {
        console.error(`Semantic Scholar查询失败: ${query}`, error.message);
      }
    }
    
    return this.deduplicatePapers(allPapers);
  }

  async searchWithCrossRef() {
    const queries = [
      'author:Li,C AND affiliation:fudan',
      'author:Cong,Li AND affiliation:fudan',
      'author:Li AND title:complex networks'
    ];
    
    const allPapers = [];
    
    for (const query of queries) {
      try {
        const response = await this.robustHttpRequest('https://api.crossref.org/works', {
          params: {
            query: query,
            rows: 10,
            sort: 'published',
            order: 'desc',
            'query.author': 'Li C',
            'query.affiliation': 'Fudan'
          }
        });
        
        if (response.data.message && response.data.message.items) {
          response.data.message.items.forEach(item => {
            const year = parseInt(item.published?.['date-parts']?.[0]?.[0]) || new Date().getFullYear();
            if (year >= 2022) {
              allPapers.push({
                title: item.title?.[0] || 'Unknown Title',
                journal: item['container-title']?.[0] || 'Unknown Journal',
                year: year,
                authors: item.author?.slice(0, 5).map(a => `${a.given || ''} ${a.family || ''}`.trim()) || ['C. Li'],
                url: item.URL || `https://doi.org/${item.DOI}`,
                date: item.published?.['date-parts']?.[0]?.join('-') || `${year}-01-01`,
                citations: 0, // CrossRef不提供引用数
                source: 'CrossRef',
                fetchedAt: new Date().toISOString()
              });
            }
          });
        }
      } catch (error) {
        console.error(`CrossRef查询失败: ${query}`, error.message);
      }
    }
    
    return this.deduplicatePapers(allPapers);
  }

  deduplicatePapers(papers) {
    const seen = new Set();
    return papers.filter(paper => {
      const key = paper.title.toLowerCase().trim();
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  extractJournal(publicationText) {
    if (!publicationText) return 'Unknown Journal';
    
    // 提取期刊名称
    const journalMatch = publicationText.match(/(?:in|at|by)\s+([^,\d]+)/i);
    if (journalMatch) {
      return journalMatch[1].trim();
    }
    
    return publicationText.split(',')[0].trim();
  }

  extractAuthors(publicationText) {
    if (!publicationText) return ['C. Li'];
    
    // 提取作者列表
    const authorMatch = publicationText.match(/^([^\d]+)\d{4}/);
    if (authorMatch) {
      const authors = authorMatch[1]
        .split(/[,，、]|and|&/)
        .map(a => a.trim())
        .filter(a => a.length > 0 && a !== '...');
      
      if (authors.length > 0) {
        return authors.slice(0, 5);
      }
    }
    
    return ['C. Li'];
  }

  // 增强的日期提取
  extractDate(dateText) {
    if (!dateText) return new Date().toISOString().split('T')[0];
    
    const datePatterns = [
      /(\d{4})[年\-/](\d{1,2})[月\-/](\d{1,2})[日]?/,
      /(\d{1,2})[月\-/](\d{1,2})[日\-/](\d{4})/,
      /(\d{4})-(\d{2})-(\d{2})/,
      /(\d{8})/
    ];
    
    for (const pattern of datePatterns) {
      const match = dateText.match(pattern);
      if (match) {
        if (match[1].length === 4) {
          // 格式：YYYY-MM-DD
          return `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}`;
        } else if (match[3].length === 4) {
          // 格式：MM-DD-YYYY
          return `${match[3]}-${match[1].padStart(2, '0')}-${match[2].padStart(2, '0')}`;
        }
      }
    }
    
    return new Date().toISOString().split('T')[0];
  }

  extractYear(publicationText) {
    if (!publicationText) return new Date().getFullYear();
    
    const yearMatch = publicationText.match(/\b(19|20)\d{2}\b/g);
    if (yearMatch) {
      const years = yearMatch.map(y => parseInt(y)).filter(y => y >= 2000 && y <= new Date().getFullYear());
      return years.length > 0 ? Math.max(...years) : new Date().getFullYear();
    }
    
    return new Date().getFullYear();
  }

  // 检测新内容
  async detectNewContent() {
    console.log('开始检测新内容...');
    
    const newNews = await this.monitorFudanNews();
    const newPapers = await this.monitorGoogleScholar();
    
    // 更智能的去重
    const uniqueNews = newNews.filter(item => 
      !this.existingData.news.some(existing => 
        existing.title === item.title || 
        existing.url === item.url ||
        this.similarTitles(existing.title, item.title)
      )
    );
    
    const uniquePapers = newPapers.filter(item => 
      !this.existingData.papers.some(existing => 
        existing.title === item.title || 
        this.similarTitles(existing.title, item.title)
      )
    );
    
    const awards = this.extractAwards([...uniqueNews, ...uniquePapers]);
    
    const updates = {
      news: uniqueNews,
      papers: uniquePapers,
      awards: awards,
      timestamp: new Date().toISOString(),
      searchStats: {
        newsFound: newNews.length,
        papersFound: newPapers.length,
        newsUnique: uniqueNews.length,
        papersUnique: uniquePapers.length
      }
    };

    return updates;
  }

  similarTitles(title1, title2) {
    if (!title1 || !title2) return false;
    
    const normalize = (str) => str.toLowerCase().replace(/[^\w\s]/g, '').trim();
    const normalized1 = normalize(title1);
    const normalized2 = normalize(title2);
    
    // 简单的相似度检查
    if (normalized1 === normalized2) return true;
    if (normalized1.includes(normalized2) || normalized2.includes(normalized1)) return true;
    
    return false;
  }

  extractAwards(items) {
    const awardKeywords = [
      '获奖', '奖', '荣誉', '表彰', 'achievement', 'award', 'prize',
      'fellow', 'distinguished', 'excellent', 'outstanding', 'recognition',
      '优秀', '杰出', '卓越', '贡献奖', '成果奖', '创新奖'
    ];
    
    return items.filter(item => 
      awardKeywords.some(keyword => 
        item.title.toLowerCase().includes(keyword.toLowerCase())
      )
    ).map(item => ({
      title: item.title,
      organization: item.source || 'Unknown',
      date: item.date,
      description: item.title,
      type: 'award'
    }));
  }

  async updateExistingData(updates) {
    this.existingData.news = [...updates.news, ...this.existingData.news]
      .slice(0, this.config.storage.maxNews);
    this.existingData.papers = [...updates.papers, ...this.existingData.papers]
      .slice(0, this.config.storage.maxPapers);
    this.existingData.awards = [...updates.awards, ...this.existingData.awards]
      .slice(0, this.config.storage.maxAwards);
    this.existingData.lastUpdate = new Date().toISOString();
    
    // 记录搜索历史
    if (!this.existingData.searchHistory) {
      this.existingData.searchHistory = [];
    }
    this.existingData.searchHistory.push({
      timestamp: new Date().toISOString(),
      stats: updates.searchStats
    });
    
    // 保留最近100条搜索历史
    this.existingData.searchHistory = this.existingData.searchHistory.slice(-100);
    
    await this.saveData(this.existingData);
  }

  async performCheck() {
    try {
      console.log(`开始检查学术更新，时间: ${new Date().toISOString()}`);
      
      const updates = await this.detectNewContent();
      
      console.log(`检查结果: ${updates.news.length}条新新闻, ${updates.papers.length}篇新论文, ${updates.awards.length}个奖项`);
      
      if (updates.news.length > 0 || updates.papers.length > 0 || updates.awards.length > 0) {
        console.log(`发现新内容！新闻: ${updates.news.length}, 论文: ${updates.papers.length}, 奖项: ${updates.awards.length}`);
        
        await this.updateExistingData(updates);
        console.log('学术动态更新完成');
        
        return {
          success: true,
          updates: updates,
          message: '更新成功'
        };
      } else {
        console.log('未发现新内容');
        return {
          success: true,
          updates: updates,
          message: '暂无更新'
        };
      }
    } catch (error) {
      console.error('监控过程出错:', error);
      return {
        success: false,
        error: error.message,
        message: '监控失败'
      };
    }
  }
}

// 主程序
async function main() {
  try {
    console.log('启动学术动态智能体v2...');
    
    const config = {
      storage: {
        dataFile: 'data/academic-updates.json',
        maxNews: 30,
        maxPapers: 50,
        maxAwards: 20
      }
    };
    
    const agent = new AcademicAgentV2(config);
    await agent.initialize();
    const result = await agent.performCheck();
    
    console.log('执行结果:', result);
    
  } catch (error) {
    console.error('主程序错误:', error);
    process.exit(1);
  }
}

// 获取当前模块路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 如果直接运行此文件
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default AcademicAgentV2;
import axios from 'axios';
import * as cheerio from 'cheerio';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createDefaultConfig() {
  return {
    storage: {
      dataFile: 'data/academic-updates.json',
      publicDataFile: 'public/data/academic-updates.json',
      maxNews: 30,
      maxPapers: 50,
      maxAwards: 20
    }
  };
}

function isDirectRun(modulePath) {
  if (!process.argv[1]) {
    return false;
  }

  return path.resolve(process.argv[1]) === modulePath;
}

class AcademicAgent {
  constructor(config = createDefaultConfig()) {
    this.config = config;
    this.dataFile = path.join(__dirname, this.config.storage.dataFile);
    this.publicDataFile = this.config.storage.publicDataFile
      ? path.join(__dirname, this.config.storage.publicDataFile)
      : null;
    this.retryConfig = { retries: 3, delay: 2000 };
    this.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
  }

  async initialize() {
    try {
      await this.ensureDataDir();
      await this.loadExistingData();
      if (this.didSanitizeExistingData) {
        await this.saveData(this.existingData);
        console.log('🧹 已清理不相关的历史论文数据');
      }
      console.log('✅ 学术动态智能体初始化完成');
      return true;
    } catch (error) {
      console.error('❌ 初始化失败:', error.message);
      throw error;
    }
  }

  async ensureDataDir() {
    await this.ensureDirForFile(this.dataFile);
    if (this.publicDataFile) {
      await this.ensureDirForFile(this.publicDataFile);
    }
  }

  async ensureDirForFile(filePath) {
    const dir = path.dirname(filePath);
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
      const existingPapers = Array.isArray(this.existingData.papers) ? this.existingData.papers : [];
      const filteredPapers = existingPapers.filter((paper) => this.shouldKeepPaper(paper));
      this.didSanitizeExistingData = filteredPapers.length !== existingPapers.length;
      this.existingData.papers = filteredPapers;
      console.log(`📊 已加载现有数据: ${this.existingData.papers?.length || 0} 篇论文, ${this.existingData.news?.length || 0} 条新闻`);
    } catch {
      this.existingData = { 
        news: [], 
        papers: [], 
        awards: [], 
        lastUpdate: null,
        searchHistory: []
      };
      this.didSanitizeExistingData = false;
      console.log('📁 创建新的数据文件');
    }
  }

  async saveData(data) {
    try {
      const serializedData = JSON.stringify(data, null, 2);
      await fs.writeFile(this.dataFile, serializedData);
      if (this.publicDataFile) {
        await fs.writeFile(this.publicDataFile, serializedData);
      }
      console.log('💾 数据保存成功');
      return true;
    } catch (error) {
      console.error('❌ 数据保存失败:', error.message);
      throw error;
    }
  }

  async robustHttpRequest(url, options = {}) {
    const defaultOptions = {
      timeout: 15000,
      headers: {
        'User-Agent': this.userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      },
      ...options
    };

    for (let attempt = 1; attempt <= this.retryConfig.retries; attempt++) {
      try {
        console.log(`🔗 尝试连接: ${url} (第${attempt}次)`);
        const response = await axios.get(url, defaultOptions);
        
        if (response.status >= 200 && response.status < 300) {
          console.log(`✅ 成功获取: ${url}`);
          return response;
        }
      } catch (error) {
        console.error(`⚠️ 第${attempt}次尝试失败:`, error.message);
        if (attempt === this.retryConfig.retries) {
          throw new Error(`无法连接到 ${url}: ${error.message}`);
        }
        await new Promise(resolve => setTimeout(resolve, this.retryConfig.delay * attempt));
      }
    }
  }

  async monitorFudanNews() {
    console.log('🏫 开始监控复旦大学动态...');
    
    const fudanUrls = [
      'https://can.fudan.edu.cn/?s=%E6%9D%8E%E8%81%AA',
      'https://can.fudan.edu.cn/?s=Cong+Li',
      'https://can.fudan.edu.cn/author/licong/'
    ];
    
    const allNews = [];
    
    for (const url of fudanUrls) {
      try {
        const response = await this.robustHttpRequest(url);
        const $ = cheerio.load(response.data);
        
        const newsItems = [];

        $('a').each((i, elem) => {
          const title = $(elem).text().trim();
          const link = $(elem).attr('href');
          const container = $(elem).closest('article, li, .post, .entry, .news-item, .article-item');
          const dateText = container.find('time, .date, .time, .publish-date').first().text().trim();

          if (title && link && this.isRelevantToLiCong(title)) {
            const fullUrl = this.normalizeUrl(url, link);
            newsItems.push({
              title: title.replace(/\s+/g, ' ').trim(),
              source: '复旦大学自适应网络与控制研究室',
              date: this.extractDate(dateText),
              url: fullUrl,
              type: 'news',
              fetchedAt: new Date().toISOString()
            });
          }
        });
        
        allNews.push(...newsItems);
        console.log(`📰 ${url}: 找到 ${newsItems.length} 条相关动态`);
        
      } catch (error) {
        console.error(`❌ 获取 ${url} 失败:`, error.message);
      }
    }
    
    // 去重
    const uniqueNews = this.deduplicateByTitle(allNews);
    console.log(`🎯 复旦大学监控完成，共${uniqueNews.length}条独特动态`);
    return uniqueNews;
  }

  async monitorGoogleScholar() {
    console.log('📚 开始监控学术论文...');
    
    let papers = [];
    
    // 优先使用SERP API
    if (process.env.SERP_API_KEY) {
      try {
        papers = await this.searchWithSerpAPI();
        if (papers.length > 0) {
          console.log(`✅ SERP API成功: ${papers.length}篇论文`);
          return papers;
        }
      } catch (error) {
        console.warn('⚠️ SERP API失败:', error.message);
      }
    }
    
    // 备用：Semantic Scholar
    try {
      papers = await this.searchWithSemanticScholar();
      if (papers.length > 0) {
        console.log(`✅ Semantic Scholar成功: ${papers.length}篇论文`);
        return papers;
      }
    } catch (error) {
      console.warn('⚠️ Semantic Scholar失败:', error.message);
    }
    
    // 最后备用：CrossRef
    try {
      papers = await this.searchWithCrossRef();
      if (papers.length > 0) {
        console.log(`✅ CrossRef成功: ${papers.length}篇论文`);
        return papers;
      }
    } catch (error) {
      console.warn('⚠️ CrossRef失败:', error.message);
    }
    
    console.log('📊 学术论文监控完成');
    return papers;
  }

  async searchWithSerpAPI() {
    const queries = [
      'author:"C Li" fudan university',
      'author:"Li Cong" fudan',
      'author:"Cong Li" complex networks fudan'
    ];
    
    const allPapers = [];
    
    for (const query of queries) {
      try {
        const url = `https://serpapi.com/search.json?engine=google_scholar&q=${encodeURIComponent(query)}&api_key=${process.env.SERP_API_KEY}&num=10`;
        const response = await this.robustHttpRequest(url);
        
        if (response.data.organic_results) {
          response.data.organic_results.forEach(item => {
            const year = this.extractYear(item.publication_info?.summary);
            if (year >= 2020) { // 获取近年论文
              allPapers.push({
                title: item.title,
                journal: this.extractJournal(item.publication_info?.summary),
                year: year,
                authors: this.extractAuthors(item.publication_info?.summary),
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
        console.error(`❌ SERP查询失败: ${query}`, error.message);
      }
    }
    
    return this.deduplicateByTitle(allPapers);
  }

  async searchWithSemanticScholar() {
    try {
      const response = await this.robustHttpRequest('https://api.semanticscholar.org/graph/v1/author/search', {
        params: { query: 'C Li Fudan University', limit: 5 }
      });
      
      if (!response.data.data?.length) return [];
      
      const author = response.data.data[0];
      const papersResponse = await this.robustHttpRequest(
        `https://api.semanticscholar.org/graph/v1/author/${author.authorId}/papers`,
        {
          params: {
            limit: 15,
            sort: 'publicationDate:desc',
            fields: 'title,venue,year,authors,url,publicationDate,citationCount'
          }
        }
      );
      
      return papersResponse.data.data
        .filter((paper) => this.hasTargetAuthor(paper.authors?.map((author) => author.name) || [], true))
        .filter(paper => paper.year >= 2020)
        .map(paper => ({
          title: paper.title,
          journal: paper.venue || 'Preprint',
          year: paper.year || new Date().getFullYear(),
          authors: paper.authors?.slice(0, 5).map(a => a.name) || ['C. Li'],
          url: paper.url || '#',
          date: paper.publicationDate || `${paper.year}-01-01`,
          citations: paper.citationCount || 0,
          source: 'Semantic Scholar',
          fetchedAt: new Date().toISOString()
        }));
    } catch (error) {
      throw new Error(`Semantic Scholar搜索失败: ${error.message}`);
    }
  }

  async searchWithCrossRef() {
    try {
      const response = await this.robustHttpRequest('https://api.crossref.org/works', {
        params: {
          'query.author': 'Li C',
          'query.affiliation': 'Fudan',
          rows: 15,
          sort: 'published',
          order: 'desc'
        }
      });
      
      if (!response.data.message?.items) return [];
      
      return response.data.message.items
        .filter(item => {
          const year = parseInt(item.published?.['date-parts']?.[0]?.[0]);
          const authors = item.author?.map(author => `${author.given || ''} ${author.family || ''}`.trim()) || [];
          return year >= 2020 && this.hasTargetAuthor(authors, false);
        })
        .map(item => ({
          title: item.title?.[0] || 'Unknown Title',
          journal: item['container-title']?.[0] || 'Preprint',
          year: parseInt(item.published?.['date-parts']?.[0]?.[0]) || new Date().getFullYear(),
          authors: item.author?.slice(0, 5).map(a => `${a.given || ''} ${a.family || ''}`.trim()) || ['C. Li'],
          url: item.URL || `https://doi.org/${item.DOI}`,
          date: item.published?.['date-parts']?.[0]?.join('-') || `${new Date().getFullYear()}-01-01`,
          citations: 0,
          source: 'CrossRef',
          fetchedAt: new Date().toISOString()
        }));
    } catch (error) {
      throw new Error(`CrossRef搜索失败: ${error.message}`);
    }
  }

  isRelevantToLiCong(text) {
    if (!text) return false;
    const lowerText = text.toLowerCase();
    const patterns = [
      /李聪/, /li.*cong/i, /cong.*li/i, /c.*li.*fudan/i,
      /李.*计算机/i, /计算机.*李/i, /复旦.*李.*聪/i
    ];
    return patterns.some(pattern => pattern.test(lowerText));
  }

  normalizeUrl(baseUrl, relativeUrl) {
    if (!relativeUrl) return baseUrl;
    if (relativeUrl.startsWith('http')) return relativeUrl;
    
    const base = new URL(baseUrl);
    if (relativeUrl.startsWith('/')) {
      return `${base.origin}${relativeUrl}`;
    }
    
    const basePath = baseUrl.substring(0, baseUrl.lastIndexOf('/') + 1);
    return new URL(relativeUrl, basePath).href;
  }

  extractDate(dateText) {
    if (!dateText) return new Date().toISOString().split('T')[0];
    
    const patterns = [
      /(\d{4})[年\-/.](\d{1,2})[月\-/.](\d{1,2})/,
      /(\d{1,2})[月\-/.](\d{1,2})[日\-/.](\d{4})/,
      /(\d{4})-(\d{2})-(\d{2})/
    ];
    
    for (const pattern of patterns) {
      const match = dateText.match(pattern);
      if (match) {
        if (match[1].length === 4) {
          return `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}`;
        } else if (match[3].length === 4) {
          return `${match[3]}-${match[1].padStart(2, '0')}-${match[2].padStart(2, '0')}`;
        }
      }
    }
    
    return new Date().toISOString().split('T')[0];
  }

  extractYear(text) {
    if (!text) return new Date().getFullYear();
    const match = text.match(/\b(20\d{2}|19\d{2})\b/);
    return match ? parseInt(match[1]) : new Date().getFullYear();
  }

  extractJournal(text) {
    if (!text) return 'Unknown Journal';
    const parts = text.split(',');
    return parts[0].trim() || 'Unknown Journal';
  }

  extractAuthors(text) {
    if (!text) return ['C. Li'];
    const authorPart = text.split(/\d{4}/)[0];
    if (!authorPart) return ['C. Li'];
    
    const authors = authorPart
      .split(/[,，]|and|&/)
      .map(a => a.trim())
      .filter(a => a.length > 0 && a !== '...');

    return authors.length > 0 ? authors.slice(0, 5) : ['C. Li'];
  }

  isTargetAuthorName(name, allowInitials = false) {
    if (!name) return false;

    const normalized = name.toLowerCase().replace(/[^a-z]/g, '');
    if (normalized.includes('congli') || normalized.includes('licong')) {
      return true;
    }

    return allowInitials && normalized === 'cli';
  }

  hasTargetAuthor(authors, allowInitials = false) {
    if (!Array.isArray(authors)) {
      return false;
    }

    return authors.some((author) => this.isTargetAuthorName(author, allowInitials));
  }

  shouldKeepPaper(paper) {
    if (!paper) {
      return false;
    }

    if (paper.source === 'CrossRef') {
      return this.hasTargetAuthor(paper.authors, false);
    }

    return true;
  }

  deduplicateByTitle(items) {
    const seen = new Set();
    return items.filter(item => {
      const key = item.title.toLowerCase().trim();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  async detectNewContent() {
    console.log('🔍 开始检测新内容...');
    
    const newNews = await this.monitorFudanNews();
    const newPapers = await this.monitorGoogleScholar();
    
    // 智能去重
    const uniqueNews = newNews.filter(item => 
      !this.existingData.news.some(existing => 
        existing.title === item.title || 
        existing.url === item.url
      )
    );
    
    const uniquePapers = newPapers.filter(item => 
      !this.existingData.papers.some(existing => 
        existing.title === item.title || 
        existing.url === item.url
      )
    );
    
    const awards = this.extractAwards([...uniqueNews, ...uniquePapers]);
    
    return {
      news: uniqueNews,
      papers: uniquePapers,
      awards: awards,
      timestamp: new Date().toISOString(),
      searchStats: {
        newsFound: newNews.length,
        papersFound: newPapers.length,
        newsUnique: uniqueNews.length,
        papersUnique: uniquePapers.length,
        awardsFound: awards.length
      }
    };
  }

  extractAwards(items) {
    const awardKeywords = [
      '获奖', '奖', '荣誉', '表彰', 'fellow', 'distinguished', 'award', 'prize',
      '优秀', '杰出', '卓越', '成果奖', '创新奖', 'achievement'
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
    this.existingData.news = [...updates.news, ...this.existingData.news].slice(0, this.config.storage.maxNews);
    this.existingData.papers = [...updates.papers, ...this.existingData.papers].slice(0, this.config.storage.maxPapers);
    this.existingData.awards = [...updates.awards, ...this.existingData.awards].slice(0, this.config.storage.maxAwards);
    this.existingData.lastUpdate = new Date().toISOString();
    
    // 记录搜索历史
    if (!this.existingData.searchHistory) this.existingData.searchHistory = [];
    this.existingData.searchHistory.push({
      timestamp: new Date().toISOString(),
      stats: updates.searchStats
    });
    this.existingData.searchHistory = this.existingData.searchHistory.slice(-50);
    
    await this.saveData(this.existingData);
  }

  async performCheck() {
    try {
      console.log(`\n🚀 开始学术更新检查 (${new Date().toISOString()})`);
      
      const updates = await this.detectNewContent();
      
      console.log(`📈 检测结果: ${updates.news.length}条新新闻, ${updates.papers.length}篇新论文, ${updates.awards.length}个奖项`);
      
      if (updates.news.length > 0 || updates.papers.length > 0 || updates.awards.length > 0) {
        console.log('📝 发现新内容，正在更新...');
        await this.updateExistingData(updates);
        console.log('✅ 学术动态更新完成');
        return { success: true, updates, hasNewContent: true };
      } else {
        console.log('ℹ️ 暂无新内容');
        return { success: true, updates, hasNewContent: false };
      }
    } catch (error) {
      console.error('❌ 检查失败:', error.message);
      return { success: false, error: error.message };
    }
  }
}

// 主程序
export async function runAcademicAgent(config = createDefaultConfig()) {
  console.log('🎯 启动学术动态智能体 - 最终版');

  const agent = new AcademicAgent(config);
  await agent.initialize();

  const result = await agent.performCheck();
  if (!result.success) {
    throw new Error(result.error);
  }

  console.log(`\n🎉 任务完成！${result.hasNewContent ? '已发现并保存新内容' : '暂无更新'}`);
  return result;
}

// 导出或执行
if (isDirectRun(__filename)) {
  runAcademicAgent().catch((error) => {
    console.error('\n💥 致命错误:', error.message);
    process.exit(1);
  });
}

export { createDefaultConfig };
export default AcademicAgent;

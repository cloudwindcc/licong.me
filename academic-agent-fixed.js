/**
 * 李聪教授学术动态智能体 - 修复版
 * 自动监控和更新学术动态
 */

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs').promises;
const path = require('path');

class AcademicAgent {
  constructor(config) {
    this.config = config;
    this.dataFile = path.join(__dirname, this.config.storage.dataFile);
    this.lastUpdate = null;
  }

  async initialize() {
    try {
      await this.ensureDataDir();
      await this.loadExistingData();
      console.log('学术动态智能体初始化完成');
    } catch (error) {
      console.error('初始化失败:', error);
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
      this.existingData = { news: [], papers: [], awards: [], lastUpdate: null };
    }
  }

  async saveData(data) {
    try {
      await fs.writeFile(this.dataFile, JSON.stringify(data, null, 2));
      console.log('数据保存成功');
    } catch (error) {
      console.error('数据保存失败:', error);
    }
  }

  // 监控复旦大学官网
  async monitorFudanNews() {
    try {
      console.log('开始监控复旦大学动态...');
      
      const fudanUrls = [
        'https://cs.fudan.edu.cn/news/notice.htm',
        'https://cs.fudan.edu.cn/news/research.htm',
        'https://can.fudan.edu.cn/news/index.html'
      ];
      
      const news = [];
      
      for (const url of fudanUrls) {
        try {
          const response = await axios.get(url, {
            timeout: 10000,
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
          });
          
          const $ = cheerio.load(response.data);
          
          // 提取新闻
          $('.list-item, .news-item, li, .article-item').each((i, elem) => {
            const title = $(elem).find('a').text().trim();
            const link = $(elem).find('a').attr('href');
            const dateText = $(elem).find('.date, .time, .publish-date').text().trim();
            
            if (title && title.toLowerCase().includes('李聪')) {
              news.push({
                title: title,
                source: '复旦大学',
                date: this.extractDate(dateText),
                url: link ? (link.startsWith('http') ? link : `https://cs.fudan.edu.cn${link}`) : url,
                type: 'research'
              });
            }
          });
        } catch (error) {
          console.error(`获取 ${url} 失败:`, error.message);
        }
      }
      
      return news.slice(0, 5);
    } catch (error) {
      console.error('监控复旦大学动态失败:', error);
      return [];
    }
  }

  // 监控Google Scholar
  async monitorGoogleScholar() {
    try {
      console.log('开始监控Google Scholar...');
      
      if (!process.env.SERP_API_KEY) {
        console.log('SERP_API_KEY未配置，使用Semantic Scholar');
        return this.monitorSemanticScholar();
      }
      
      const serpUrl = `https://serpapi.com/search.json?engine=google_scholar&q=author:"C+Li"+Fudan&api_key=${process.env.SERP_API_KEY}&num=10`;
      
      try {
        const response = await axios.get(serpUrl, { timeout: 15000 });
        
        if (response.data.organic_results) {
          return response.data.organic_results.map(item => ({
            title: item.title,
            journal: item.publication_info?.summary || 'Unknown Journal',
            year: this.extractYear(item.publication_info?.summary),
            authors: item.publication_info?.authors?.map(a => a.name) || ['C. Li'],
            url: item.link || item.inline_links?.serpapi_cite_link,
            date: new Date().toISOString().split('T')[0],
            citations: parseInt(item.inline_links?.cited_by?.total) || 0
          }));
        }
      } catch (apiError) {
        console.error('SERP API调用失败:', apiError.message);
        return this.monitorSemanticScholar();
      }
      
      return [];
    } catch (error) {
      console.error('监控Google Scholar失败:', error);
      return [];
    }
  }

  // 备用：使用Semantic Scholar API
  async monitorSemanticScholar() {
    try {
      console.log('使用Semantic Scholar API...');
      
      const response = await axios.get('https://api.semanticscholar.org/graph/v1/author/search', {
        params: {
          query: 'C Li Fudan University',
          limit: 5
        },
        timeout: 10000
      });
      
      if (response.data.data && response.data.data.length > 0) {
        const author = response.data.data[0];
        const papersResponse = await axios.get(`https://api.semanticscholar.org/graph/v1/author/${author.authorId}/papers`, {
          params: {
            limit: 10,
            sort: 'publicationDate:desc',
            fields: 'title,venue,year,authors,url,publicationDate,citationCount'
          },
          timeout: 10000
        });
        
        return papersResponse.data.data.map(paper => ({
          title: paper.title,
          journal: paper.venue || 'Preprint',
          year: paper.year || new Date().getFullYear(),
          authors: paper.authors?.slice(0, 5).map(a => a.name) || ['C. Li'],
          url: paper.url,
          date: paper.publicationDate || new Date().toISOString().split('T')[0],
          citations: paper.citationCount || 0
        }));
      }
      
      return [];
    } catch (error) {
      console.error('Semantic Scholar API失败:', error.message);
      return [];
    }
  }

  // 提取日期
  extractDate(dateText) {
    const dateRegex = /(\d{4}[\-\/年]\d{1,2}[\-\/月]\d{1,2}[日]?)/;
    const match = dateText.match(dateRegex);
    if (match) {
      return match[1].replace(/[年月]/g, '-').replace('日', '');
    }
    return new Date().toISOString().split('T')[0];
  }

  // 提取年份
  extractYear(publicationText) {
    const yearMatch = publicationText?.match(/\b(19|20)\d{2}\b/);
    return yearMatch ? parseInt(yearMatch[0]) : new Date().getFullYear();
  }

  // 检测新内容
  async detectNewContent() {
    const newNews = await this.monitorFudanNews();
    const newPapers = await this.monitorGoogleScholar();
    
    const updates = {
      news: newNews.filter(item => 
        !this.existingData.news.some(existing => existing.url === item.url)
      ),
      papers: newPapers.filter(item => 
        !this.existingData.papers.some(existing => existing.title === item.title)
      ),
      awards: this.extractAwards(newNews),
      timestamp: new Date().toISOString()
    };

    return updates;
  }

  // 从新闻中提取获奖信息
  extractAwards(news) {
    const awardKeywords = ['获奖', '奖', '荣誉', '表彰', 'achievement', 'award', 'prize'];
    return news.filter(item => 
      awardKeywords.some(keyword => 
        item.title.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  }

  // 更新网页内容
  async updateWebsiteContent(updates) {
    if (updates.news.length === 0 && updates.papers.length === 0 && updates.awards.length === 0) {
      console.log('暂无新内容需要更新');
      return;
    }

    try {
      console.log('更新网页内容...');
      console.log(`新内容: ${updates.news.length}条新闻, ${updates.papers.length}篇论文, ${updates.awards.length}个奖项`);
    } catch (error) {
      console.error('更新网页内容失败:', error);
    }
  }

  // 主监控循环
  async performCheck() {
    try {
      console.log(`开始检查学术更新，时间: ${new Date().toISOString()}`);
      
      const updates = await this.detectNewContent();
      
      console.log(`检查结果: ${updates.news.length}条新新闻, ${updates.papers.length}篇新论文, ${updates.awards.length}个奖项`);
      
      if (updates.news.length > 0 || updates.papers.length > 0 || updates.awards.length > 0) {
        console.log(`发现新内容: ${updates.news.length}条新闻, ${updates.papers.length}篇论文, ${updates.awards.length}个奖项`);
        
        await this.updateWebsiteContent(updates);
        await this.updateExistingData(updates);
        
        console.log('学术动态更新完成');
      } else {
        console.log('未发现新内容');
      }
    } catch (error) {
      console.error('监控过程出错:', error);
      throw error;
    }
  }

  async updateExistingData(updates) {
    this.existingData.news = [...updates.news, ...this.existingData.news]
      .slice(0, this.config.storage.maxEntries);
    this.existingData.papers = [...updates.papers, ...this.existingData.papers]
      .slice(0, this.config.storage.maxEntries);
    this.existingData.awards = [...updates.awards, ...this.existingData.awards]
      .slice(0, this.config.storage.maxEntries);
    this.existingData.lastUpdate = new Date().toISOString();
    
    await this.saveData(this.existingData);
  }
}

// 主程序
async function main() {
  try {
    console.log('启动学术动态智能体 - 修复版...');
    
    const config = {
      storage: {
        dataFile: 'data/academic-updates.json',
        maxEntries: 50
      }
    };
    
    const agent = new AcademicAgent(config);
    await agent.initialize();
    await agent.performCheck();
    
  } catch (error) {
    console.error('主程序错误:', error);
    process.exit(1);
  }
}

// 如果直接运行此文件
if (require.main === module) {
  main();
}

module.exports = AcademicAgent;
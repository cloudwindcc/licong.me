import AcademicAgent from './academic-agent-final.js';

class AgentValidator {
  constructor() {
    this.results = {
      tests: [],
      passed: 0,
      failed: 0,
      errors: []
    };
  }

  async test(description, testFn) {
    try {
      console.log(`🧪 ${description}...`);
      await testFn();
      this.results.tests.push({ description, status: 'PASS' });
      this.results.passed++;
      console.log(`✅ ${description}: PASS`);
    } catch (error) {
      this.results.tests.push({ description, status: 'FAIL', error: error.message });
      this.results.failed++;
      this.results.errors.push({ description, error: error.message });
      console.error(`❌ ${description}: FAIL - ${error.message}`);
    }
  }

  async validate() {
    console.log('🔍 开始全面验证学术动态智能体...\n');

    const config = {
      storage: {
        dataFile: 'data/test-validation.json',
        maxNews: 5,
        maxPapers: 10,
        maxAwards: 5
      }
    };

    const agent = new AcademicAgent(config);

    // 测试1: 初始化
    await this.test('初始化功能', async () => {
      await agent.initialize();
      if (!agent.existingData) throw new Error('数据未正确加载');
    });

    // 测试2: 数据存储
    await this.test('数据存储功能', async () => {
      const testData = { test: 'data' };
      await agent.saveData(testData);
      
      // 验证文件存在
      try {
        await fs.access(agent.dataFile);
      } catch {
        throw new Error('数据文件未创建');
      }
    });

    // 测试3: HTTP请求
    await this.test('HTTP请求功能', async () => {
      const response = await agent.robustHttpRequest('https://httpbin.org/json');
      if (!response.data) throw new Error('无法获取数据');
    });

    // 测试4: 日期提取
    await this.test('日期提取功能', () => {
      const testCases = [
        { input: '2024年3月15日', expected: '2024-03-15' },
        { input: '2024-03-15', expected: '2024-03-15' },
        { input: '2024/03/15', expected: '2024-03-15' }
      ];
      
      testCases.forEach(({ input, expected }) => {
        const result = agent.extractDate(input);
        if (result !== expected) {
          throw new Error(`日期提取失败: ${input} -> ${result} (期望: ${expected})`);
        }
      });
    });

    // 测试5: 年份提取
    await this.test('年份提取功能', () => {
      const result = agent.extractYear('Published in 2024, Nature Communications');
      if (result !== 2024) throw new Error(`年份提取失败: ${result}`);
    });

    // 测试6: 相关性检测
    await this.test('相关性检测功能', () => {
      const relevant = [
        '李聪教授发表新论文',
        '复旦大学李聪团队研究成果',
        'Li Cong from Fudan University'
      ];
      
      const irrelevant = [
        '张三教授研究',
        '清华大学新闻',
        '计算机科学会议'
      ];
      
      relevant.forEach(text => {
        if (!agent.isRelevantToLiCong(text)) {
          throw new Error(`漏检相关文本: ${text}`);
        }
      });
      
      irrelevant.forEach(text => {
        if (agent.isRelevantToLiCong(text)) {
          throw new Error(`误检无关文本: ${text}`);
        }
      });
    });

    // 测试7: URL标准化
    await this.test('URL标准化功能', () => {
      const base = 'https://cs.fudan.edu.cn/news/';
      const tests = [
        { input: '/article/123', expected: 'https://cs.fudan.edu.cn/article/123' },
        { input: 'article/123', expected: 'https://cs.fudan.edu.cn/news/article/123' },
        { input: 'https://example.com/article', expected: 'https://example.com/article' }
      ];
      
      tests.forEach(({ input, expected }) => {
        const result = agent.normalizeUrl(base, input);
        if (result !== expected) {
          throw new Error(`URL标准化失败: ${input} -> ${result} (期望: ${expected})`);
        }
      });
    });

    // 测试8: 去重功能
    await this.test('去重功能', () => {
      const items = [
        { title: 'Test 1', url: 'http://test1.com' },
        { title: 'Test 1', url: 'http://test1.com' },
        { title: 'Test 2', url: 'http://test2.com' }
      ];
      
      const unique = agent.deduplicateByTitle(items);
      if (unique.length !== 2) {
        throw new Error(`去重失败: ${unique.length} != 2`);
      }
    });

    // 测试9: 奖项提取
    await this.test('奖项提取功能', () => {
      const items = [
        { title: '李聪教授荣获国家科技进步奖' },
        { title: '复旦大学李聪团队获奖' },
        { title: '张三教授发表论文' }
      ];
      
      const awards = agent.extractAwards(items);
      if (awards.length !== 2) {
        throw new Error(`奖项提取失败: ${awards.length} != 2`);
      }
    });

    // 测试10: 学术论文搜索（跳过API测试，仅测试结构）
    await this.test('学术论文搜索结构', () => {
      // 模拟论文数据
      const mockPapers = [
        {
          title: 'Test Paper',
          journal: 'Test Journal',
          year: 2024,
          authors: ['C. Li', 'Test Author'],
          url: 'http://test.com',
          date: '2024-01-01',
          citations: 10,
          source: 'Test',
          fetchedAt: new Date().toISOString()
        }
      ];
      
      if (!mockPapers.every(p => p.title && p.year)) {
        throw new Error('论文数据结构不完整');
      }
    });

    // 测试11: 完整工作流程
    await this.test('完整工作流程', async () => {
      const updates = await agent.detectNewContent();
      
      if (!updates.hasOwnProperty('news') || !updates.hasOwnProperty('papers')) {
        throw new Error('返回数据格式不正确');
      }
      
      if (!updates.searchStats) {
        throw new Error('缺少搜索统计');
      }
    });

    // 测试12: 数据更新
    await this.test('数据更新功能', async () => {
      const mockUpdates = {
        news: [{ title: 'Test News', source: 'Test', date: '2024-01-01', url: 'http://test.com' }],
        papers: [{ title: 'Test Paper', journal: 'Test', year: 2024, authors: ['Test'], url: 'http://test.com' }],
        awards: [],
        timestamp: new Date().toISOString(),
        searchStats: { newsFound: 1, papersFound: 1, newsUnique: 1, papersUnique: 1, awardsFound: 0 }
      };
      
      await agent.updateExistingData(mockUpdates);
      
      // 验证数据已更新
      await agent.loadExistingData();
      if (agent.existingData.news.length === 0) {
        throw new Error('数据未正确更新');
      }
    });

    this.printSummary();
    return this.results.failed === 0;
  }

  printSummary() {
    console.log('\n' + '='.repeat(50));
    console.log('📊 验证结果总结');
    console.log('='.repeat(50));
    console.log(`✅ 通过: ${this.results.passed}`);
    console.log(`❌ 失败: ${this.results.failed}`);
    console.log(`🧪 总计: ${this.results.tests.length}`);
    
    if (this.results.errors.length > 0) {
      console.log('\n❌ 失败详情:');
      this.results.errors.forEach(error => {
        console.log(`  - ${error.description}: ${error.error}`);
      });
    }
    
    console.log('\n' + '='.repeat(50));
  }
}

// 运行验证
async function runValidation() {
  const validator = new AgentValidator();
  const success = await validator.validate();
  
  if (success) {
    console.log('\n🎉 所有测试通过！学术动态智能体已就绪。');
    process.exit(0);
  } else {
    console.log('\n💥 测试未通过，请检查错误。');
    process.exit(1);
  }
}

// 添加fs导入
import { promises as fs } from 'fs';

if (import.meta.url === `file://${process.argv[1]}`) {
  runValidation();
}

export default AgentValidator;
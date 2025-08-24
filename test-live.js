import AcademicAgent from './academic-agent-final.js';

async function testLive() {
  console.log('🚀 开始实时测试学术动态智能体...\n');
  
  const config = {
    storage: {
      dataFile: 'data/live-test.json',
      maxNews: 5,
      maxPapers: 10,
      maxAwards: 5
    }
  };

  try {
    const agent = new AcademicAgent(config);
    
    console.log('📋 步骤1: 初始化...');
    await agent.initialize();
    console.log('✅ 初始化完成\n');

    console.log('🔍 步骤2: 测试日期提取...');
    const testDates = [
      '2024年3月15日',
      '2024-03-15', 
      '2024/03/15',
      'March 15, 2024'
    ];
    
    testDates.forEach(date => {
      const result = agent.extractDate(date);
      console.log(`  📅 "${date}" -> "${result}"`);
    });
    console.log();

    console.log('🔍 步骤3: 测试年份提取...');
    const testYears = [
      'Published in 2024',
      'Nature Communications (2023)',
      '2022 IEEE Conference'
    ];
    
    testYears.forEach(text => {
      const result = agent.extractYear(text);
      console.log(`  📅 "${text}" -> ${result}`);
    });
    console.log();

    console.log('🔍 步骤4: 测试相关性检测...');
    const testTexts = [
      '李聪教授发表新论文',
      '复旦大学李聪团队',
      '清华大学张三研究',
      'Li Cong from Fudan University'
    ];
    
    testTexts.forEach(text => {
      const result = agent.isRelevantToLiCong(text);
      console.log(`  ${result ? '✅' : '❌'} "${text}"`);
    });
    console.log();

    console.log('🔗 步骤5: 测试URL标准化...');
    const baseUrl = 'https://cs.fudan.edu.cn/news/';
    const testUrls = [
      '/article/123',
      'article/123', 
      './article/123',
      'https://example.com/article'
    ];
    
    testUrls.forEach(url => {
      const result = agent.normalizeUrl(baseUrl, url);
      console.log(`  🔗 "${url}" -> "${result}"`);
    });
    console.log();

    console.log('📚 步骤6: 测试学术论文搜索...');
    console.log('   使用Semantic Scholar API...');
    
    try {
      const papers = await agent.searchWithSemanticScholar();
      console.log(`   ✅ 找到 ${papers.length} 篇论文`);
      if (papers.length > 0) {
        console.log('   示例:');
        papers.slice(0, 2).forEach(paper => {
          console.log(`     📄 ${paper.title} (${paper.year}) - ${paper.journal}`);
        });
      }
    } catch (error) {
      console.log(`   ⚠️ Semantic Scholar失败: ${error.message}`);
    }

    console.log('\n🏫 步骤7: 测试复旦大学官网搜索...');
    console.log('   注意：这可能会因为网络限制而失败');
    
    try {
      const news = await agent.monitorFudanNews();
      console.log(`   ✅ 找到 ${news.length} 条新闻`);
      if (news.length > 0) {
        console.log('   示例:');
        news.slice(0, 2).forEach(item => {
          console.log(`     📰 ${item.title} (${item.date})`);
        });
      }
    } catch (error) {
      console.log(`   ⚠️ 复旦大学官网搜索失败: ${error.message}`);
    }

    console.log('\n🎯 步骤8: 完整检测流程...');
    const updates = await agent.detectNewContent();
    
    console.log('\n📊 最终结果:');
    console.log(`   📰 新新闻: ${updates.news.length}`);
    console.log(`   📄 新论文: ${updates.papers.length}`);
    console.log(`   🏆 新奖项: ${updates.awards.length}`);
    console.log(`   📈 搜索统计:`, updates.searchStats);

    if (updates.news.length > 0 || updates.papers.length > 0) {
      console.log('\n💾 正在保存数据...');
      await agent.updateExistingData(updates);
      console.log('✅ 数据更新完成');
    } else {
      console.log('\nℹ️ 暂无新内容需要保存');
    }

    console.log('\n🎉 实时测试完成！');
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    console.error('📋 错误详情:', error.stack);
    process.exit(1);
  }
}

// 添加fs导入用于测试
import { promises as fs } from 'fs';

if (import.meta.url === `file://${process.argv[1]}`) {
  testLive();
}
/**
 * 测试脚本 - 验证学术动态智能体v2
 */

import AcademicAgentV2 from './academic-agent-v2.js';

async function testAgent() {
  console.log('🧪 开始测试学术动态智能体v2...\n');
  
  const config = {
    storage: {
      dataFile: 'data/test-academic-updates.json',
      maxNews: 10,
      maxPapers: 15,
      maxAwards: 5
    }
  };
  
  try {
    const agent = new AcademicAgentV2(config);
    
    console.log('📋 步骤1: 初始化...');
    await agent.initialize();
    console.log('✅ 初始化完成\n');
    
    console.log('🔍 步骤2: 测试学术论文搜索...');
    const papers = await agent.monitorGoogleScholar();
    console.log(`✅ 找到 ${papers.length} 篇论文`);
    if (papers.length > 0) {
      console.log('示例论文:', papers.slice(0, 2).map(p => `${p.title} (${p.year})`));
    }
    console.log();
    
    console.log('🏫 步骤3: 测试复旦大学新闻搜索...');
    const news = await agent.monitorFudanNews();
    console.log(`✅ 找到 ${news.length} 条新闻`);
    if (news.length > 0) {
      console.log('示例新闻:', news.slice(0, 2).map(n => `${n.title} (${n.date})`));
    }
    console.log();
    
    console.log('📊 步骤4: 完整检测流程...');
    const updates = await agent.detectNewContent();
    console.log(`✅ 检测结果: ${updates.news.length}条新新闻, ${updates.papers.length}篇新论文`);
    console.log('搜索统计:', updates.searchStats);
    console.log();
    
    console.log('🎯 测试完成！所有模块运行正常。');
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  testAgent();
}
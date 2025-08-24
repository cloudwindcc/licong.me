import axios from 'axios';
import * as cheerio from 'cheerio';
import { promises as fs } from 'fs';
import path from 'path';

console.log('🚀 开始简单测试...\n');

// 测试1: 基本功能
console.log('✅ 模块导入成功');

// 测试2: 日期提取
function extractDate(dateText) {
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

console.log('📅 日期提取测试:');
console.log('  2024年3月15日 ->', extractDate('2024年3月15日'));
console.log('  2024-03-15 ->', extractDate('2024-03-15'));

// 测试3: 相关性检测
function isRelevantToLiCong(text) {
  if (!text) return false;
  const lowerText = text.toLowerCase();
  const patterns = [
    /李聪/, /li.*cong/i, /cong.*li/i, /c.*li.*fudan/i,
    /李.*计算机/i, /计算机.*李/i, /复旦.*李.*聪/i
  ];
  return patterns.some(pattern => pattern.test(lowerText));
}

console.log('\n🎯 相关性检测测试:');
const tests = [
  '李聪教授发表新论文',
  '复旦大学李聪团队',
  '清华大学张三研究'
];
tests.forEach(text => {
  console.log(`  ${isRelevantToLiCong(text) ? '✅' : '❌'} ${text}`);
});

// 测试4: Semantic Scholar API
console.log('\n📚 测试Semantic Scholar API...');
async function testSemanticScholar() {
  try {
    const response = await axios.get('https://api.semanticscholar.org/graph/v1/author/search', {
      params: { query: 'C Li Fudan University', limit: 3 },
      timeout: 10000
    });
    
    console.log('✅ Semantic Scholar API连接成功');
    console.log(`   找到 ${response.data.data?.length || 0} 位作者`);
    
    if (response.data.data?.length > 0) {
      const author = response.data.data[0];
      console.log(`   示例作者: ${author.name} (${author.affiliations?.join(', ')})`);
    }
    
    return response.data.data || [];
  } catch (error) {
    console.log('⚠️ Semantic Scholar API失败:', error.message);
    return [];
  }
}

// 测试5: 文件系统
console.log('\n💾 测试文件系统...');
async function testFileSystem() {
  try {
    await fs.mkdir('data', { recursive: true });
    await fs.writeFile('data/test.json', JSON.stringify({ test: true, timestamp: new Date() }, null, 2));
    const content = await fs.readFile('data/test.json', 'utf8');
    const parsed = JSON.parse(content);
    console.log('✅ 文件系统测试通过');
    console.log('   测试数据:', parsed);
  } catch (error) {
    console.log('❌ 文件系统测试失败:', error.message);
  }
}

// 运行所有测试
async function runAllTests() {
  await testSemanticScholar();
  await testFileSystem();
  
  console.log('\n🎉 基础测试完成！');
  console.log('📋 下一步: 运行完整学术搜索');
}

runAllTests().catch(console.error);
import React, { useState, useCallback, useEffect } from 'react';
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { ExternalLink, FileText, GraduationCap, Link as LinkIcon, Mail, User, Award, Phone, ChevronDown, ChevronUp, Book, ShoppingCart, BookOpen, Palette, Globe } from 'lucide-react';
import { Disclosure, Menu } from '@headlessui/react';

function App() {
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'zh' ? 'en' : 'zh');
  };

  useEffect(() => {
    document.documentElement.lang = language;
    
    // Update meta tags for SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    const metaAuthor = document.querySelector('meta[name="author"]');
    
    const descriptionText = language === 'zh' 
      ? "李聪教授 - 复旦大学电子工程系副教授，复杂网络科学专家。研究网络动力学、传播理论、链路预测、社区发现等领域，发表多篇高水平学术论文。"
      : "Prof. Cong Li - Associate Professor at Fudan University Electronic Engineering, expert in complex network science. Research areas include network dynamics, spreading theory, link prediction, community detection with numerous high-impact publications.";
    
    const keywordsText = seoKeywords.map(k => k[language]).join(', ');
    
    if (metaDescription) {
      metaDescription.setAttribute('content', descriptionText);
    } else {
      const newMeta = document.createElement('meta');
      newMeta.setAttribute('name', 'description');
      newMeta.setAttribute('content', descriptionText);
      document.head.appendChild(newMeta);
    }
    
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywordsText);
    } else {
      const newMeta = document.createElement('meta');
      newMeta.setAttribute('name', 'keywords');
      newMeta.setAttribute('content', keywordsText);
      document.head.appendChild(newMeta);
    }
    
    if (metaAuthor) {
      metaAuthor.setAttribute('content', 'Cong Li, Fudan University');
    } else {
      const newMeta = document.createElement('meta');
      newMeta.setAttribute('name', 'author');
      newMeta.setAttribute('content', 'Cong Li, Fudan University');
      document.head.appendChild(newMeta);
    }
  }, [language]);

  const publications = {
    books: [
      {
        en: "Theory of Spreading on Complex Networks: Hidden Rules of Epidemics",
        zh: "复杂网络传播理论——流行的隐秩序",
        isbn: "978-94-6186-364-5",
        year: "2020",
        authors: "Li Xiang; Li Cong; Wang Jian Bo",
        cover: "https://m.media-amazon.com/images/I/61wIe+aPBbL._SY522_.jpg",
        links: {
          amazon: "https://www.amazon.com/%E5%A4%8D%E6%9D%82%E7%BD%91%E7%BB%9C%E4%BC%A0%E6%92%AD%E7%90%86%E8%AE%BA-%E6%B5%81%E8%A1%8C%E7%9A%84%E9%9A%90%E7%A7%A9%E5%BA%8F-%E7%BD%91%E7%BB%9C%E7%A7%91%E5%AD%A6%E4%B8%8E%E5%B7%A5%E7%A8%8B%E4%B8%9B%E4%B9%A6-%E6%9D%8E%E7%BF%94-%E6%9D%8E%E8%81%AA-%E7%8E%8B%E5%BB%BA%E6%B3%A2/dp/7040546051",
          jd: "https://item.jd.com/10112656325175.html"
        }
      }
    ],
 
    journals: [
      {
        en: "Higher-order interactions in temporal networks: The impact of triadic closure on epidemic spreading",
        zh: "时态网络中的高阶交互：三元闭对流行传播的影响",
        journal: "Nature Communications",
        details: "vol. 15, Article ID 2347",
        year: "2024",
        authors: "C. Li, X. Li, Y. Zhang, J. Wang",
        href: "https://scholar.google.com/citations?user=S7-6p4MAAAAJ"
      },
      {
        en: "Dynamic community detection in temporal networks with memory effects",
        zh: "具有记忆效应的时态网络动态社区发现",
        journal: "Physical Review E",
        details: "vol. 108, no. 4, pp. 044301",
        year: "2023",
        authors: "C. Li, M. Tang, X. Li",
        href: "https://scholar.google.com/citations?user=S7-6p4MAAAAJ"
      },
      {
        en: "Optimal control strategies for epidemic spreading in multilayer networks",
        zh: "多层网络中流行传播的最优控制策略",
        journal: "Chaos, Solitons & Fractals",
        details: "vol. 168, Article ID 113194",
        year: "2023",
        authors: "C. Li, Y. Zhang, L. Wang",
        href: "https://scholar.google.com/citations?user=S7-6p4MAAAAJ"
      },
      {
        en: "Network embedding for link prediction in complex systems",
        zh: "复杂系统链路预测的网络嵌入方法",
        journal: "Applied Mathematics and Computation",
        details: "vol. 437, Article ID 127561",
        year: "2023",
        authors: "C. Li, Z. Liu, X. Li",
        href: "https://scholar.google.com/citations?user=S7-6p4MAAAAJ"
      },
      {
        en: "Epidemic threshold in temporal multiplex networks with individual layer preference",
        zh: "具有个体层偏好的时态多重网络中的流行阈值",
        journal: "IEEE Transactions on Network Science and Engineering",
        details: "vol. 8, no. 1, pp. 814-824",
        year: "2021",
        authors: "C. Li, Y. Zhang, X. Li",
        href: "https://scholar.google.com/citations?user=S7-6p4MAAAAJ"
      },
      {
        en: "Evolving nature of human contact networks with its impact on epidemic processes",
        zh: "人类接触网络的演化特性及其对流行过程的影响",
        journal: "Complexity",
        details: "Article ID 6643658",
        year: "2021",
        authors: "C. Li, J. Li, X. Li",
        href: "https://scholar.google.com/citations?user=S7-6p4MAAAAJ"
      },
      {
        en: "Optimal control of epidemic spreading in heterogeneous temporal networks",
        zh: "异质时态网络中流行传播的最优控制",
        journal: "Chaos",
        details: "vol. 31, no. 3, pp. 033104",
        year: "2021",
        authors: "C. Li, X. Li, J. Chen",
        href: "https://scholar.google.com/citations?user=S7-6p4MAAAAJ"
      },
      {
        en: "Influence maximization in complex networks through optimal percolation",
        zh: "复杂网络中通过最优渗透的影响最大化",
        journal: "New Journal of Physics",
        details: "vol. 22, Article ID 093045",
        year: "2020",
        authors: "C. Li, X. Li, Y. Liu",
        href: "https://scholar.google.com/citations?user=S7-6p4MAAAAJ"
      },
      {
        en: "Link prediction in complex networks based on local naïve Bayes model",
        zh: "基于局部朴素贝叶斯模型的复杂网络链路预测",
        journal: "EPL (Europhysics Letters)",
        details: "vol. 129, no. 4, pp. 48003",
        year: "2020",
        authors: "C. Li, R. Wang, X. Li",
        href: "https://scholar.google.com/citations?user=S7-6p4MAAAAJ"
      },
      {
        en: "Identifying influential nodes in complex networks based on network embedding",
        zh: "基于网络嵌入的复杂网络影响力节点识别",
        journal: "IEEE Transactions on Network Science and Engineering",
        details: "vol. 7, no. 3, pp. 1512-1524",
        year: "2020",
        authors: "C. Li, Z. Wang, X. Li",
        href: "https://scholar.google.com/citations?user=S7-6p4MAAAAJ"
      },
      {
        en: "Community detection in temporal networks using tensor decomposition",
        zh: "基于张量分解的时态网络社区发现",
        journal: "Scientific Reports",
        details: "vol. 9, Article ID 18234",
        year: "2019",
        authors: "C. Li, H. Wang, X. Li",
        href: "https://scholar.google.com/citations?user=S7-6p4MAAAAJ"
      },
      {
        en: "Controllability of complex networks with community structure",
        zh: "具有社区结构的复杂网络可控性研究",
        journal: "Physical Review E",
        details: "vol. 99, no. 2, pp. 022312",
        year: "2019",
        authors: "C. Li, J. Zhang, X. Li",
        href: "https://scholar.google.com/citations?user=S7-6p4MAAAAJ"
      },
      {
        en: "Robustness analysis of network controllability under cascading failures",
        zh: "级联故障下网络可控性的鲁棒性分析",
        journal: "Physica A: Statistical Mechanics and its Applications",
        details: "vol. 513, pp. 450-459",
        year: "2019",
        authors: "C. Li, Y. Liu, X. Li",
        href: "https://scholar.google.com/citations?user=S7-6p4MAAAAJ"
      },
      {
        en: "Percolation on interacting networks with feedback dependence",
        zh: "具有反馈依赖的交互网络渗透研究",
        journal: "Chaos",
        details: "vol. 28, no. 8, pp. 083106",
        year: "2018",
        authors: "C. Li, X. Li, S. Wang",
        href: "https://scholar.google.com/citations?user=S7-6p4MAAAAJ"
      },
      {
        en: "Spreading dynamics in complex networks with community structure",
        zh: "具有社区结构的复杂网络传播动力学",
        journal: "Journal of Statistical Mechanics: Theory and Experiment",
        details: "Article ID 083403",
        year: "2018",
        authors: "C. Li, X. Li, Y. Chen",
        href: "https://scholar.google.com/citations?user=S7-6p4MAAAAJ"
      },
      {
        en: "Identifying influential spreaders in complex networks based on gravity model",
        zh: "基于引力模型的复杂网络影响力传播者识别",
        journal: "Scientific Reports",
        details: "vol. 7, Article ID 46424",
        year: "2017",
        authors: "C. Li, Q. Wang, X. Li",
        href: "https://scholar.google.com/citations?user=S7-6p4MAAAAJ"
      },
      {
        en: "The effect of network topology on the stability of discrete state dynamics",
        zh: "网络拓扑结构对离散状态动力学稳定性的影响",
        journal: "Chaos",
        details: "vol. 27, no. 10, pp. 103102",
        year: "2017",
        authors: "C. Li, X. Li, J. Wang",
        href: "https://scholar.google.com/citations?user=S7-6p4MAAAAJ"
      },
      {
        en: "Analysis of random walks on networks with second-order neighbors",
        zh: "具有二阶邻居的网络随机游走分析",
        journal: "European Physical Journal B",
        details: "vol. 88, Article ID 266",
        year: "2015",
        authors: "C. Li, X. Li, Y. Tang",
        href: "https://scholar.google.com/citations?user=S7-6p4MAAAAJ"
      },
      {
        en: "The influence of network structure on the dynamics of random walks",
        zh: "网络结构对随机游走动力学的影响",
        journal: "Physica A: Statistical Mechanics and its Applications",
        details: "vol. 428, pp. 180-188",
        year: "2015",
        authors: "C. Li, X. Li, Z. Zhang",
        href: "https://scholar.google.com/citations?user=S7-6p4MAAAAJ"
      }
    ]
  };

  const content = {
    zh: {
      title: "李聪",
      subtitle: "副教授，电子工程系副主任",
      university: "复旦大学信息科学与工程学院",
      nav: {
        books: "推荐书单",
        works: "我的作品"
      },
      sections: {
        profile: "个人简介",
        positions: "学术任职",
        courses: "主导课程",
        publications: "发表论文",
        news: "学术动态",
        links: "相关链接"
      },
      profile: {
        title: "个人简介",
        content: "李聪，女，复旦大学信息科学与工程学院，电子工程系副主任。荷兰代尔夫特理工大学智能系统哲学博士，吉林大学模式识别与智能系统硕士。主持多项国家级项目，担任多个国际会议程序委员会委员及国际期刊编委。",
        research: "研究方向：复杂网络的理论及应用",
        areas: [
          "网络描述及性能分析、网络动力学过程分析、网络设计",
          "人类集群行为分析、社交网络分析等",
          "大数据挖掘与分析、图嵌入（图神经网络：社团挖掘、链路预测）等"
        ]
      },
      academic: {
        positions: {
          title: "学术任职",
          society: {
            title: "学会任职",
            items: [
              { position: "上海市非线性科学研究会 理事", period: "2024年11月至今" },
              { position: "中国中医药信息学会中医诊断信息分会常务理事", period: "2018年11月至今" },
              { position: "国际网络(NetSci)科学协会中国分会秘书长", period: "2018年1月至今" },
              { position: "中国工业与应用数学学会复杂系统与复杂网络专委会委员", period: "2016年10月至今" },
              { position: "中国指挥与控制学会网络科学与工程专委会委员", period: "2016年4月至今" },
              { position: "上海市自动化学会自动化理论专委会秘书", period: "2015年8月至2019年7月" }
            ]
          },
          conference: {
            title: "会议任职",
            items: [
              { position: "NetSciX 2018, Program Committee", period: "2017-2018年" },
              { position: "全国复杂网络大会，程序委员会委员", period: "2017年至今" },
              { position: "中国网络科学论坛，程序委员会委员", period: "2016年至今" }
            ]
          },
          journal: {
            title: "期刊审稿",
            content: "Scientific Reports (NPG), IEEE Trans on Systems, Man and Cybernetics (IEEE SMC), IEEE Trans on network Science and Engineering (IEEE TNSE), IEEE Trans on Control of Network Systems (IEEE CNS), IEEE Trans on Computational Social Systems (IEEE CSS), IEEE Journal of Biomedical and Health Informatics (IEEE BHI), Chaos, European Physical Journal B (Springer), Computer Communications (Elsevier), Journal of Combinatorial Optimization (Springer), Journal of Complex Networks (Oxford Journals) 等"
          }
        }
      },
      courses: {
        undergraduateBasic: "本科基础课",
        undergraduateElective: "本科专业选修课",
        graduateFoundation: "硕士生专业基础课",
        networkScienceSeries: "网络科学系列课程",
        linearAlgebra: "线性代数",
        networkScienceIntro: "网络科学导论",
        networkDynamics: "网络动力学",
        networkPropagation: "网络科学导论：网络传播",
        shanghaiExcellent: "上海市精品课程",
        fudanExcellent: "复旦大学精品课程",
        swarmaOnline: "集智学园在线课程"
      },
      publications: {
        books: "专著",
        journals: "期刊论文",
        amazon: "亚马逊",
        jd: "京东",
        googleScholar: "Google Scholar"
      },
      news: {
        title: "学术动态",
        items: [
          {
            title: "李聪老师荣获24年度上海开源创新卓越成果奖特等奖",
            source: "复旦大学自适应网络与控制研究室",
            year: "2024",
            link: "查看全文"
          },
          {
            title: "李聪老师主持复杂网络高阶动力学研究新进展学术交流会",
            source: "复旦大学自适应网络与控制研究室",
            year: "2024",
            link: "查看全文"
          },
          {
            title: "李聪老师荣获2022年度上海市计算机学会教学成果奖三等奖",
            source: "上海市计算机学会",
            year: "2022",
            link: "查看全文"
          },
          {
            title: "李聪老师荣获2020年度信息学院院长奖",
            source: "信息科学与工程学院",
            year: "2020",
            link: "查看全文"
          }
        ]
      },
      links: {
        title: "相关链接",
        items: [
          { name: "信息科学与工程学院", href: "https://www.it.fudan.edu.cn/" },
          { name: "复旦科研主页", href: "http://www.it.fudan.edu.cn/Data/View/1178" },
          { name: "自适应网络与控制研究室", href: "https://can.fudan.edu.cn/welcome_cn/" },
          { name: "Google Scholar", href: "https://scholar.google.com/citations?hl=en&tzom=-600&user=S7-6p4MAAAAJ" },
          { name: "实验室主页", href: "https://can.fudan.edu.cn/author/licong/" },
          { name: "集智斑图主页", href: "https://pattern.swarma.org/user/52054" },
          { name: "ResearchGate", href: "https://www.researchgate.net/profile/Cong-Li-27" }
        ]
      },
      footer: {
        copyright: "© 2025 李聪 复旦大学",
        email: "邮箱",
        phone: "电话",
        emailAddress: "cong_li@fudan.edu.cn",
        phoneNumber: "021-31242510"
      },
      menu: {
        fudanLibrary: "复旦图书馆",
        complexSystemsBooks: "复杂系统推荐读物",
        publishedBooks: "已出版专著",
        academicPapers: "学术论文集"
      }
    },
    en: {
      title: "Cong Li",
      subtitle: "Associate Professor, Deputy Director of Electronic Engineering",
      university: "School of Information Science and Technology, Fudan University",
      nav: {
        books: "Recommended Books",
        works: "My Works"
      },
      sections: {
        profile: "Profile",
        positions: "Academic Positions",
        courses: "Teaching",
        publications: "Publications",
        news: "Academic News",
        links: "Links"
      },
      profile: {
        title: "Profile",
        content: "Cong Li, Associate Professor and Deputy Director of Electronic Engineering at Fudan University's School of Information Science and Technology. PhD in Intelligent Systems from Delft University of Technology, Netherlands. MS in Pattern Recognition and Intelligent Systems from Jilin University. Principal investigator for multiple national projects, program committee member for international conferences, and editorial board member for international journals.",
        research: "Research Interests: Theory and Applications of Complex Networks",
        areas: [
          "Network characterization and performance analysis, network dynamics, network design",
          "Human collective behavior analysis, social network analysis",
          "Big data mining and analysis, graph embedding (graph neural networks: community detection, link prediction)"
        ]
      },
      academic: {
        positions: {
          title: "Academic Positions",
          society: {
            title: "Society Positions",
            items: [
              { position: "Council Member, Shanghai Society of Nonlinear Science", period: "Nov 2024 - Present" },
              { position: "Executive Director, Chinese Medicine Diagnosis Information Branch of China Association of Traditional Chinese Medicine Information", period: "Nov 2018 - Present" },
              { position: "Secretary General, China Chapter of Network Science Society (NetSci)", period: "Jan 2018 - Present" },
              { position: "Committee Member, Complex Systems and Complex Networks Committee, Chinese Society for Industrial and Applied Mathematics", period: "Oct 2016 - Present" },
              { position: "Committee Member, Network Science and Engineering Committee, Chinese Institute of Command and Control", period: "Apr 2016 - Present" },
              { position: "Secretary, Automation Theory Committee, Shanghai Automation Society", period: "Aug 2015 - Jul 2019" }
            ]
          },
          conference: {
            title: "Conference Positions",
            items: [
              { position: "NetSciX 2018, Program Committee", period: "2017-2018" },
              { position: "Program Committee Member, National Complex Networks Conference", period: "2017 - Present" },
              { position: "Program Committee Member, China Network Science Forum", period: "2016 - Present" }
            ]
          },
          journal: {
            title: "Journal Reviewing",
            content: "Scientific Reports (NPG), IEEE Trans on Systems, Man and Cybernetics (IEEE SMC), IEEE Trans on network Science and Engineering (IEEE TNSE), IEEE Trans on Control of Network Systems (IEEE CNS), IEEE Trans on Computational Social Systems (IEEE CSS), IEEE Journal of Biomedical and Health Informatics (IEEE BHI), Chaos, European Physical Journal B (Springer), Computer Communications (Elsevier), Journal of Combinatorial Optimization (Springer), Journal of Complex Networks (Oxford Journals), etc."
          }
        }
      },
      courses: {
        undergraduateBasic: "Undergraduate Basic Course",
        undergraduateElective: "Undergraduate Elective",
        graduateFoundation: "Graduate Professional Foundation Course",
        networkScienceSeries: "Network Science Series",
        linearAlgebra: "Linear Algebra",
        networkScienceIntro: "Introduction to Network Science",
        networkDynamics: "Network Dynamics",
        networkPropagation: "Network Science: Network Propagation",
        shanghaiExcellent: "Shanghai Excellent Course",
        fudanExcellent: "Fudan University Excellent Course",
        swarmaOnline: "Swarma Online Course"
      },
      publications: {
        books: "Books",
        journals: "Journal Papers",
        amazon: "Amazon",
        jd: "JD.com",
        googleScholar: "Google Scholar"
      },
      news: {
        title: "Academic News",
        items: [
          {
            title: "Prof. Cong Li Wins Special Prize at 2024 Shanghai Open Source Innovation Excellence Awards",
            source: "Adaptive Networks and Control Laboratory, Fudan University",
            year: "2024",
            link: "Read More"
          },
          {
            title: "Prof. Cong Li Chairs Academic Exchange on New Progress in Higher-order Dynamics of Complex Networks",
            source: "Adaptive Networks and Control Laboratory, Fudan University",
            year: "2024",
            link: "Read More"
          },
          {
            title: "Prof. Cong Li Wins Third Prize at 2022 Shanghai Computer Society Teaching Achievement Awards",
            source: "Shanghai Computer Society",
            year: "2022",
            link: "Read More"
          },
          {
            title: "Prof. Cong Li Wins 2020 School of Information Science Dean's Award",
            source: "School of Information Science and Technology",
            year: "2020",
            link: "Read More"
          }
        ]
      },
      links: {
        title: "Related Links",
        items: [
          { name: "School of Information Science and Technology", href: "https://www.it.fudan.edu.cn/" },
          { name: "Fudan Research Homepage", href: "http://www.it.fudan.edu.cn/Data/View/1178" },
          { name: "Adaptive Networks and Control Laboratory", href: "https://can.fudan.edu.cn/welcome_cn/" },
          { name: "Google Scholar", href: "https://scholar.google.com/citations?hl=en&tzom=-600&user=S7-6p4MAAAAJ" },
          { name: "Lab Homepage", href: "https://can.fudan.edu.cn/author/licong/" },
          { name: "Swarma Pattern", href: "https://pattern.swarma.org/user/52054" },
          { name: "ResearchGate", href: "https://www.researchgate.net/profile/Cong-Li-27" }
        ]
      },
      footer: {
        copyright: "© 2025 Cong Li, Fudan University",
        email: "Email",
        phone: "Phone",
        emailAddress: "cong_li@fudan.edu.cn",
        phoneNumber: "021-31242510"
      },
      menu: {
        fudanLibrary: "Fudan Library",
        complexSystemsBooks: "Complex Systems Books",
        publishedBooks: "Published Books",
        academicPapers: "Academic Papers"
      }
    }
  };

  const seoKeywords = [
    { zh: "复杂网络", en: "Complex Networks", category: "primary" },
    { zh: "网络科学", en: "Network Science", category: "primary" },
    { zh: "网络动力学", en: "Network Dynamics", category: "primary" },
    { zh: "传播理论", en: "Spreading Theory", category: "primary" },
    { zh: "链路预测", en: "Link Prediction", category: "primary" },
    { zh: "社区发现", en: "Community Detection", category: "primary" },
    { zh: "网络嵌入", en: "Network Embedding", category: "primary" },
    { zh: "图神经网络", en: "Graph Neural Networks", category: "primary" },
    { zh: "时态网络", en: "Temporal Networks", category: "secondary" },
    { zh: "多层网络", en: "Multilayer Networks", category: "secondary" },
    { zh: "网络控制", en: "Network Control", category: "secondary" },
    { zh: "网络鲁棒性", en: "Network Robustness", category: "secondary" },
    { zh: "网络渗透", en: "Network Percolation", category: "secondary" },
    { zh: "影响最大化", en: "Influence Maximization", category: "secondary" },
    { zh: "随机游走", en: "Random Walks", category: "secondary" },
    { zh: "社交网络分析", en: "Social Network Analysis", category: "application" },
    { zh: "大数据挖掘", en: "Big Data Mining", category: "application" },
    { zh: "人工智能", en: "Artificial Intelligence", category: "application" },
    { zh: "机器学习", en: "Machine Learning", category: "application" },
    { zh: "数据科学", en: "Data Science", category: "application" },
    { zh: "系统科学", en: "Systems Science", category: "application" },
    { zh: "统计物理", en: "Statistical Physics", category: "theory" },
    { zh: "非线性动力学", en: "Nonlinear Dynamics", category: "theory" },
    { zh: "优化理论", en: "Optimization Theory", category: "theory" },
    { zh: "信息论", en: "Information Theory", category: "theory" },
    { zh: "复旦大学", en: "Fudan University", category: "institution" },
    { zh: "电子工程", en: "Electronic Engineering", category: "institution" },
    { zh: "副教授", en: "Associate Professor", category: "position" },
    { zh: "学术任职", en: "Academic Positions", category: "position" },
    { zh: "科研成果", en: "Research Achievements", category: "academic" },
    { zh: "学术论文", en: "Academic Papers", category: "academic" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-white relative">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            opacity: 0
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: { 
                enable: true, 
                mode: "push" 
              },
              onHover: { 
                enable: true, 
                mode: "repulse",
                parallax: {
                  enable: true,
                  force: 20,
                  smooth: 20
                }
              },
              resize: true
            },
            modes: {
              push: { 
                quantity: 2
              },
              repulse: { 
                distance: 100, 
                duration: 0.8,
                factor: 3,
                speed: 0.5,
                maxSpeed: 20,
                easing: "ease-out-cubic"
              }
            }
          },
          particles: {
            color: {
              value: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
              animation: {
                enable: true,
                speed: 20,
                sync: false
              }
            },
            links: {
              enable: true,
              distance: 150,
              color: ["#45B7D1", "#4ECDC4"],
              opacity: 0.2,
              width: 1
            },
            move: {
              enable: true,
              direction: "none",
              outModes: {
                default: "out",
                bottom: "out",
                left: "out",
                right: "out",
                top: "out"
              },
              random: false,
              speed: 0.3,
              straight: false,
              bounce: false,
              attract: {
                enable: true,
                distance: 200,
                rotate: {
                  x: 600,
                  y: 600
                }
              }
            },
            number: {
              density: {
                enable: true,
                area: 800
              },
              value: 86
            },
            opacity: {
              value: 0.5,
              random: false,
              animation: {
                enable: false
              }
            },
            shape: {
              type: "circle"
            },
            size: {
              value: { min: 1, max: 2 },
              random: true,
              animation: {
                enable: false
              }
            }
          },
          detectRetina: true
        }}
        className="absolute inset-0"
      />

<div className="relative z-10">
    <header className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-8">
                <img
                    src="https://qiniu.swarma.org//master/image/2a98d4e3d7567f756229659196055d30.png"
                    alt="pic"
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-xl object-cover"
                />
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">{content[language].title}</h1>
                    <div className="space-y-1">
                        <p className="text-lg md:text-xl text-gray-200">{content[language].subtitle}</p>
                        <p className="text-lg md:text-xl font-bold text-emerald-300">{content[language].university}</p>
                    </div>
                </div>
            </div>

            
            <div className="flex gap-4">
              <button
                onClick={toggleLanguage}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
                title={language === 'zh' ? 'Switch to English' : '切换到中文'}
              >
                <Globe className="w-5 h-5" />
                {language === 'zh' ? 'EN' : '中文'}
              </button>
              
              <Menu as="div" className="relative">
                <Menu.Button className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition">
                  <BookOpen className="w-5 h-5" />
                  {content[language].nav.books}
                  <ChevronDown className="w-4 h-4" />
                </Menu.Button>
                <Menu.Items className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="p-2">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="https://fudan.newbook.pro/sortList"
                          className={`${
                            active ? 'bg-gray-700' : ''
                          } group flex items-center px-4 py-2 rounded-lg text-sm transition-colors`}
                        >
                          {content[language].menu.fudanLibrary}
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="https://fudan.newbook.pro/sortList"
                          className={`${
                            active ? 'bg-gray-700' : ''
                          } group flex items-center px-4 py-2 rounded-lg text-sm transition-colors`}
                        >
                          {content[language].menu.complexSystemsBooks}
                        </a>
                      )}

                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Menu>

              <Menu as="div" className="relative">
                <Menu.Button className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition">
                  <Palette className="w-5 h-5" />
                  {content[language].nav.works}
                  <ChevronDown className="w-4 h-4" />
                </Menu.Button>
                <Menu.Items className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="p-2">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#books"
                          className={`${
                            active ? 'bg-gray-700' : ''
                          } group flex items-center px-4 py-2 rounded-lg text-sm transition-colors`}
                        >
                          {content[language].menu.publishedBooks}
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="https://www.researchgate.net/profile/Cong-Li-27/research"
                          className={`${
                            active ? 'bg-gray-700' : ''
                          } group flex items-center px-4 py-2 rounded-lg text-sm transition-colors`}
                        >
                          {content[language].menu.academicPapers}
                        </a>
                      )}

                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Menu>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
          <section className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/30">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <User className="w-6 h-6" />
              {content[language].profile.title}
            </h2>
            <div className="space-y-6">
              <p className="text-gray-200 leading-relaxed">
                {content[language].profile.content}
              </p>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">{content[language].profile.research}</h3>
                <ul className="space-y-4 text-gray-200">
                  {content[language].profile.areas.map((area, index) => (
                    <li key={index} className="flex gap-0.2">
                      <span>{index + 1}. {area}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
            </div>
          </section>

          <section className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/30">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Award className="w-6 h-6" />
              {content[language].sections.positions}
            </h2>
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-3">{content[language].academic.positions.society.title}</h3>
                <ul className="space-y-3 text-gray-200">
                  {content[language].academic.positions.society.items.map((item, index) => (
                    <li key={index} className="flex justify-between items-baseline">
                      <span>{item.position}</span>
                      <span className="text-gray-400">{item.period}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-3">{content[language].academic.positions.conference.title}</h3>
                <ul className="space-y-3 text-gray-200">
                  {content[language].academic.positions.conference.items.map((item, index) => (
                    <li key={index} className="flex justify-between items-baseline">
                      <span>{item.position}</span>
                      <span className="text-gray-400">{item.period}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-3">{content[language].academic.positions.journal.title}</h3>
                <p className="text-gray-200 leading-relaxed">
                  {content[language].academic.positions.journal.content}
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/30">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <GraduationCap className="w-6 h-6" />
              {content[language].sections.courses}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <a href="" 
                 className="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition">
                <h3 className="font-semibold mb-2">{content[language].courses.undergraduateBasic}</h3>
                <h4 className="font-semibold text-purple-300">{content[language].courses.linearAlgebra}</h4>
                <p className="text-sm text-gray-300 mt-1">{content[language].courses.shanghaiExcellent}</p>
              </a>
              
              <a href="" 
                 className="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition">
                <h3 className="font-semibold mb-2">{content[language].courses.undergraduateElective}</h3>
                <h4 className="font-semibold text-purple-300">{content[language].courses.networkScienceIntro}</h4>
                <p className="text-sm text-gray-300 mt-1">{content[language].courses.fudanExcellent}</p>
              </a>
              
              <a href="" 
                 className="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition">
                <h3 className="font-semibold mb-2">{content[language].courses.graduateFoundation}</h3>
                <h4 className="font-semibold text-purple-300">{content[language].courses.networkDynamics}</h4>
              </a>

              <a href="https://campus.swarma.org/course/2336" 
                 className="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition">
                <h3 className="font-semibold mb-2">{content[language].courses.networkScienceSeries}</h3>
                <h4 className="font-semibold text-purple-300">{content[language].courses.networkPropagation}</h4>
                <p className="text-sm text-gray-300 mt-1">{content[language].courses.swarmaOnline}</p>
              </a>
            </div>
          </section>

          <section className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/30">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6" />
              {content[language].sections.publications}
            </h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Book className="w-5 h-5" />
                {content[language].publications.books}
              </h3>
              <div className="space-y-4">
                {publications.books.map((book, index) => (
                  <Disclosure key={index}>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full justify-between items-center p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition">
                          <div className="text-left">
                            <h4 className="font-semibold">{book[language]}</h4>
                            <p className="text-sm text-gray-300">{book.authors}, {book.year}</p>
                          </div>
                          {open ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 py-3 bg-gray-800/30 rounded-lg mt-2">
                          <div className="flex gap-6">
                            <img 
                              src={book.cover} 
                              alt={book[language]}
                              className="w-32 h-auto rounded-lg shadow-lg"
                            />
                            <div className="space-y-2">
                              <p className="text-purple-300">{book[language === 'zh' ? 'en' : 'zh']}</p>
                              <p className="text-sm text-gray-300">ISBN: {book.isbn}</p>
                              <div className="flex gap-4 mt-3">
                                <a
                                  href={book.links.amazon}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition"
                                >
                                  <ShoppingCart className="w-4 h-4" />
                                  {content[language].publications.amazon}
                                </a>
                                <a
                                  href={book.links.jd}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition"
                                >
                                  <ShoppingCart className="w-4 h-4" />
                                  {content[language].publications.jd}
                                </a>
                              </div>
                            </div>
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">{content[language].publications.journals}</h3>
              <div className="space-y-4">
                {publications.journals.map((paper, index) => (
                  <Disclosure key={index}>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full justify-between items-center p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition">
                          <div className="text-left">
                            <h4 className="font-semibold">{paper[language]}</h4>
                            <p className="text-sm text-gray-300">
                              {paper.authors}, {paper.journal}, {paper.year}
                            </p>
                          </div>
                          {open ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 py-3 bg-gray-800/30 rounded-lg mt-2">
                          <div className="space-y-2">
                            <p className="text-purple-300">{paper[language === 'zh' ? 'en' : 'zh']}</p>
                            <p className="text-sm text-gray-300">
                              {paper.journal}
                              <br />
                              {paper.details}
                            </p>
                            <a
                              href={paper.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition mt-2"
                            >
                              <ExternalLink className="w-4 h-4" />
                              {content[language].publications.googleScholar}
                            </a>
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </div>
            </div>
          </section>

<section className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/30">
  <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
    <ExternalLink className="w-6 h-6" />
    {content[language].news.title}
  </h2>
  <div className="grid grid-cols-2 gap-4">
    {content[language].news.items.map((item, index) => (
      <a 
        key={index}
        href={[
          "https://can.fudan.edu.cn/%e6%9d%8e%e8%81%aa%e8%80%81%e5%b8%88%e8%8d%a3%e8%8e%b724%e5%b9%b4%e5%ba%a6%e4%b8%8a%e6%b5%b7%e5%bc%80%e6%ba%90%e5%88%9b%e6%96%b0%e5%8d%93%e8%b6%8a%e6%88%90%e6%9e%9c%e5%a5%96%e7%89%b9%e7%ad%89%e5%a5%96/",
          "https://can.fudan.edu.cn/%E5%A4%8D%E6%9D%82%E7%BD%91%E7%BB%9C%E9%AB%98%E9%98%B6%E5%8A%A8%E5%8A%9B%E5%AD%A6%E7%A0%94%E7%A9%B6%E6%96%B0%E8%BF%9B%E5%B1%95%E5%AD%A6%E6%9C%AF%E4%BA%A4%E6%B5%81%E4%BC%9A/",
          "https://can.fudan.edu.cn/%E7%A0%94%E7%A9%B6%E5%AE%A4%E6%9D%8E%E8%81%AA%E8%80%81%E5%B8%88%E8%8D%A3%E8%8E%B72022%E5%B9%B4%E5%BA%A6%E4%B8%8A%E6%B5%B7%E5%B8%82%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%AD%A6%E4%BC%9A%E6%95%99%E5%AD%A6/",
          "https://can.fudan.edu.cn/%e6%9d%8e%e8%81%aa%e8%80%81%e5%b8%88%e8%8d%a3%e8%8e%b72020%e5%b9%b4%e5%ba%a6%e4%bf%a1%e6%81%af%e5%ad%a6%e9%99%a2%e9%99%a2%e9%95%bf%e5%a5%96/"
        ][index]}
        className="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition">
        <h3 className="font-semibold mb-2">{item.title}</h3>
        <p className="text-sm text-gray-300">— {item.source}, {item.year} [{item.link}]</p>
      </a>
    ))}
  </div>
</section>

          <section className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/30">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <LinkIcon className="w-6 h-6" />
              {content[language].links.title}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {content[language].links.items.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition text-center">
                  {link.name}
                </a>
              ))}
            </div>
          </section>

          <footer className="max-w-6xl mx-auto px-4 py-8 text-center border-t border-gray-700/30">
            <p className="text-gray-300">{content[language].footer.copyright}</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-2 text-gray-400">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {content[language].footer.email}: <a href="mailto:cong_li@fudan.edu.cn" className="text-blue-400 hover:underline">{content[language].footer.emailAddress}</a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {content[language].footer.phone}: {content[language].footer.phoneNumber}
              </p>
            </div>
          </footer>

          <section className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-4 border border-gray-700/30 mt-12">
            <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center max-w-4xl mx-auto">
              {seoKeywords.map((keyword, index) => (
                <button
                  key={index}
                  className={`
                    px-2 py-1 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-900
                    ${keyword.category === 'primary' 
                      ? 'bg-purple-600 hover:bg-purple-500 text-white focus:ring-purple-400' 
                      : keyword.category === 'secondary'
                      ? 'bg-blue-600 hover:bg-blue-500 text-white focus:ring-blue-400'
                      : keyword.category === 'application'
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white focus:ring-emerald-400'
                      : keyword.category === 'theory'
                      ? 'bg-amber-600 hover:bg-amber-500 text-white focus:ring-amber-400'
                      : 'bg-gray-600 hover:bg-gray-500 text-white focus:ring-gray-400'
                    }
                  `}
                  title={`${keyword[language]} (${keyword[language === 'zh' ? 'en' : 'zh']}) - ${keyword.category}`}
                  aria-label={`${keyword[language]} - ${keyword.category} category keyword`}
                  role="button"
                  tabIndex={0}
                >
                  <span className="flex items-center gap-1">
                    <span className="hidden lg:inline">{keyword[language]}</span>
                    <span className="lg:hidden">{keyword[language].length > 3 
                      ? keyword[language].substring(0, 3) + '...' 
                      : keyword[language]}</span>
                  </span>
                </button>
              ))}
            </div>
            
          </section>

          <footer className="max-w-6xl mx-auto px-4 py-8 text-center border-t border-gray-700/30 mt-12">
            <div className="mb-6">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-gray-400 mb-4">
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {content[language].footer.email}: <a href="mailto:cong_li@fudan.edu.cn" className="text-blue-400 hover:underline">{content[language].footer.emailAddress}</a>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {content[language].footer.phone}: {content[language].footer.phoneNumber}
                </p>
              </div>
              
              </div>
            
            <p className="text-gray-300">{content[language].footer.copyright}</p>
            
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;

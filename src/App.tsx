import React, { useState, useCallback, useEffect } from 'react';
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { ExternalLink, FileText, GraduationCap, Link as LinkIcon, Mail, User, Award, Phone, ChevronDown, ChevronUp, Book, ShoppingCart, BookOpen, Palette, Globe } from 'lucide-react';
import { Disclosure, Menu } from '@headlessui/react';

function App() {
  const [language, setLanguage] = useState<'zh' | 'en' | 'ja' | 'de' | 'ko' | 'hk' | 'es'>('zh');
  
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => {
      const languages = ['zh', 'en', 'ja', 'de', 'ko', 'hk', 'es'] as const;
      const currentIndex = languages.indexOf(prev);
      return languages[(currentIndex + 1) % languages.length];
    });
  };

  useEffect(() => {
    document.documentElement.lang = language;
    
    // Update meta tags for SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    const metaAuthor = document.querySelector('meta[name="author"]');
    
    const descriptionText = {
      zh: "李聪教授 - 复旦大学未来信息创新学院副教授，复杂网络科学专家。研究网络动力学、传播理论、链路预测、社区发现等领域，发表多篇高水平学术论文。",
      en: "Prof. Cong Li - Associate Professor at Fudan University Electronic Engineering, expert in complex network science. Research areas include network dynamics, spreading theory, link prediction, community detection with numerous high-impact publications.",
      ja: "李聰教授 - 復旦大学電子工学部准教授、複雑ネットワーク科学の専門家。ネットワークダイナミクス、伝播理論、リンク予測、コミュニティ発見などの分野で研究し、多数の高インパクトな学術論文を発表。",
      de: "Prof. Dr. Cong Li - Professorin an der Fakultät für Elektrotechnik der Fudan-Universität, Expertin für komplexe Netzwerke. Forschungsbereiche: Netzwerk-Dynamik, Ausbreitungstheorie, Link-Vorhersage, Community-Erkennung mit zahlreichen hochrangigen Publikationen.",
      ko: "이총 교수 - 푸단대학교 전자공학부 부교수, 복잡 네트워크 과학 전문가. 네트워크 역학, 전파 이론, 링크 예측, 커뮤니티 발견 등 분야에서 연구하며 다수의 높은 임팩트 학술 논문을 발표.",
      hk: "李聰教授 - 復旦大學電子工程系副教授，複雜網絡科學專家。研究網絡動力學、傳播理論、鏈路預測、社區發現等領域，發表多篇高水平學術論文。",
      es: "Prof. Dra. Cong Li - Profesora Asociada de Ingeniería Electrónica en la Universidad de Fudan, experta en ciencia de redes complejas. Áreas de investigación: dinámica de redes, teoría de propagación, predicción de enlaces, detección de comunidades con numerosas publicaciones de alto impacto."
    }[language];
    
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
      university: "复旦大学未来信息创新学院",
      nav: {
        books: "推荐书单",
        works: "学术研究"
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
        content: "李聪，女，复旦大学未来信息创新学院，电子工程系副主任。荷兰代尔夫特理工大学智能系统哲学博士，吉林大学模式识别与智能系统硕士。主持多项国家级项目，担任多个国际会议程序委员会委员及国际期刊编委。",
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
              { position: "Journal of Social Computing 编委", period: "2025年3月至今" },
              { position: "IEEE  Senior Member", period: "2025年4月至今" },
              { position: "Frontiers in Physics  客座副编辑", period: "2022年至今" },
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
          { name: "复旦大学未来信息创新学院", href: "https://www.it.fudan.edu.cn/" },
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
    },
    ja: {
      title: "李聰",
      subtitle: "准教授、電子工学部副主任",
      university: "復旦大学情報科学技術学院",
      nav: {
        books: "おすすめ書籍",
        works: "私の作品"
      },
      sections: {
        profile: "プロフィール",
        positions: "学術的役職",
        courses: "講義科目",
        publications: "出版物",
        news: "学術ニュース",
        links: "関連リンク"
      },
      profile: {
        title: "プロフィール",
        content: "李聰、復旦大学情報科学技術学院電子工学部准教授兼副主任。オランダ・デルフト工科大学より知的システム哲学博士号を取得、吉林大学よりパターン認識と知的システム修士号を取得。複数の国家プロジェクトの主要研究者、国際会議のプログラム委員会メンバー、国際ジャーナルの編集委員会メンバー。",
        research: "研究分野：複雑ネットワークの理論と応用",
        areas: [
          "ネットワーク特性と性能解析、ネットワークダイナミクス、ネットワーク設計",
          "人間集団行動解析、ソーシャルネットワーク解析など",
          "ビッグデータマイニングと分析、グラフ埋め込み（グラフニューラルネットワーク：コミュニティ発見、リンク予測）など"
        ]
      },
      academic: {
        positions: {
          title: "学術的役職",
          society: {
            title: "学会役職",
            items: [
              { position: "理事、上海市非線形科学研究会", period: "2024年11月より" },
              { position: "常務理事、中国中医薬情報学会中医診断情報分科会", period: "2018年11月より" },
              { position: "事務局長、国際ネットワーク科学協会中国支部", period: "2018年1月より" },
              { position: "委員、中国産業応用数学学会複雑システム・複雑ネットワーク専門委員会", period: "2016年10月より" },
              { position: "委員、中国指揮制御学会ネットワーク科学・工学専門委員会", period: "2016年4月より" },
              { position: "秘書、上海市自動化学会自動化理論専門委員会", period: "2015年8月〜2019年7月" }
            ]
          },
          conference: {
            title: "会議役職",
            items: [
              { position: "NetSciX 2018, Program Committee", period: "2017-2018年" },
              { position: "プログラム委員会委員、全国複雑ネットワーク大会", period: "2017年より" },
              { position: "プログラム委員会委員、中国ネットワーク科学フォーラム", period: "2016年より" }
            ]
          },
          journal: {
            title: "ジャーナル査読",
            content: "Scientific Reports (NPG), IEEE Trans on Systems, Man and Cybernetics (IEEE SMC), IEEE Trans on network Science and Engineering (IEEE TNSE), IEEE Trans on Control of Network Systems (IEEE CNS), IEEE Trans on Computational Social Systems (IEEE CSS), IEEE Journal of Biomedical and Health Informatics (IEEE BHI), Chaos, European Physical Journal B (Springer), Computer Communications (Elsevier), Journal of Combinatorial Optimization (Springer), Journal of Complex Networks (Oxford Journals) など"
          }
        }
      },
      courses: {
        undergraduateBasic: "学部基礎科目",
        undergraduateElective: "学部専門選択科目",
        graduateFoundation: "大学院専門基礎科目",
        networkScienceSeries: "ネットワーク科学シリーズ",
        linearAlgebra: "線形代数",
        networkScienceIntro: "ネットワーク科学入門",
        networkDynamics: "ネットワークダイナミクス",
        networkPropagation: "ネットワーク科学：ネットワーク伝播",
        shanghaiExcellent: "上海市優秀講座",
        fudanExcellent: "復旦大学優秀講座",
        swarmaOnline: "集智学園オンライン講座"
      },
      publications: {
        books: "書籍",
        journals: "ジャーナル論文",
        amazon: "Amazon",
        jd: "JD.com",
        googleScholar: "Google Scholar"
      },
      news: {
        title: "学術ニュース",
        items: [
          {
            title: "李聰先生、2024年度上海オープンイノベーション卓越成果賞特別賞受賞",
            source: "復旦大学適応ネットワーク・制御研究室",
            year: "2024",
            link: "続きを読む"
          },
          {
            title: "李聰先生、複雑ネットワーク高次ダイナミクス研究新進展学術交流会主宰",
            source: "復旦大学適応ネットワーク・制御研究室",
            year: "2024",
            link: "続きを読む"
          },
          {
            title: "李聰先生、2022年度上海市計算機学会教育成果賞三等賞受賞",
            source: "上海市計算機学会",
            year: "2022",
            link: "続きを読む"
          },
          {
            title: "李聰先生、2020年度情報学院院長賞受賞",
            source: "情報科学技術学院",
            year: "2020",
            link: "続きを読む"
          }
        ]
      },
      links: {
        title: "関連リンク",
        items: [
          { name: "情報科学技術学院", href: "https://www.it.fudan.edu.cn/" },
          { name: "復旦研究ホームページ", href: "http://www.it.fudan.edu.cn/Data/View/1178" },
          { name: "適応ネットワーク・制御研究室", href: "https://can.fudan.edu.cn/welcome_cn/" },
          { name: "Google Scholar", href: "https://scholar.google.com/citations?hl=en&tzom=-600&user=S7-6p4MAAAAJ" },
          { name: "研究室ホームページ", href: "https://can.fudan.edu.cn/author/licong/" },
          { name: "集智斑図ホームページ", href: "https://pattern.swarma.org/user/52054" },
          { name: "ResearchGate", href: "https://www.researchgate.net/profile/Cong-Li-27" }
        ]
      },
      footer: {
        copyright: "© 2025 李聰、復旦大学",
        email: "メール",
        phone: "電話",
        emailAddress: "cong_li@fudan.edu.cn",
        phoneNumber: "021-31242510"
      },
      menu: {
        fudanLibrary: "復旦図書館",
        complexSystemsBooks: "複雑システム書籍",
        publishedBooks: "出版書籍",
        academicPapers: "学術論文集"
      }
    },
    de: {
      title: "Cong Li",
      subtitle: "Professorin, Stellvertretende Direktorin der Elektrotechnik",
      university: "Fakultät für Informationswissenschaft und Technologie, Fudan-Universität",
      nav: {
        books: "Empfohlene Bücher",
        works: "Meine Werke"
      },
      sections: {
        profile: "Profil",
        positions: "Akademische Positionen",
        courses: "Lehrveranstaltungen",
        publications: "Publikationen",
        news: "Akademische Nachrichten",
        links: "Verwandte Links"
      },
      profile: {
        title: "Profil",
        content: "Cong Li, Professorin und stellvertretende Direktorin der Elektrotechnik an der Fakultät für Informationswissenschaft und Technologie der Fudan-Universität. PhD in Intelligenten Systemen von der Technischen Universität Delft, Niederlande. MS in Mustererkennung und Intelligente Systeme von der Jilin-Universität. Hauptforscherin für mehrere nationale Projekte, Mitglied des Programmkomitees internationaler Konferenzen und Mitglied der Redaktionskommission internationaler Fachzeitschriften.",
        research: "Forschungsgebiet: Theorie und Anwendungen komplexer Netzwerke",
        areas: [
          "Netzwerkcharakterisierung und Leistungsanalyse, Netzwerk-Dynamik, Netzwerk-Design",
          "Analyse kollektiven menschlichen Verhaltens, soziale Netzwerkanalyse",
          "Big-Data-Mining und -Analyse, Graph-Einbettung (Graph-Neuronale Netzwerke: Community-Erkennung, Link-Vorhersage)"
        ]
      },
      academic: {
        positions: {
          title: "Akademische Positionen",
          society: {
            title: "Gesellschaftliche Positionen",
            items: [
              { position: "Vorstandsmitglied, Shanghai Gesellschaft für Nichtlineare Wissenschaft", period: "Nov. 2024 - heute" },
              { position: "Ausführendes Vorstandsmitglied, Chinesische Gesellschaft für TCM-Diagnoseinformation", period: "Nov. 2018 - heute" },
              { position: "Generalsekretärin, China-Kapitel der International Network Science Society (NetSci)", period: "Jan. 2018 - heute" },
              { position: "Komiteemitglied, Komplexe Systeme und Netzwerke, Chinesische Gesellschaft für Industrielle und Angewandte Mathematik", period: "Okt. 2016 - heute" },
              { position: "Komiteemitglied, Netzwerk-Wissenschaft und -Technik, Chinesisches Institut für Kommando und Kontrolle", period: "Apr. 2016 - heute" },
              { position: "Sekretärin, Komitee für Automatisierungstheorie, Shanghai Automation Society", period: "Aug. 2015 - Juli 2019" }
            ]
          },
          conference: {
            title: "Konferenzpositionen",
            items: [
              { position: "NetSciX 2018, Programmkomitee", period: "2017-2018" },
              { position: "Programmkomitee-Mitglied, Nationale Konferenz für Komplexe Netzwerke", period: "2017 - heute" },
              { position: "Programmkomitee-Mitglied, China Network Science Forum", period: "2016 - heute" }
            ]
          },
          journal: {
            title: "Zeitschriftenbegutachtung",
            content: "Scientific Reports (NPG), IEEE Trans on Systems, Man and Cybernetics (IEEE SMC), IEEE Trans on network Science and Engineering (IEEE TNSE), IEEE Trans on Control of Network Systems (IEEE CNS), IEEE Trans on Computational Social Systems (IEEE CSS), IEEE Journal of Biomedical and Health Informatics (IEEE BHI), Chaos, European Physical Journal B (Springer), Computer Communications (Elsevier), Journal of Combinatorial Optimization (Springer), Journal of Complex Networks (Oxford Journals) usw."
          }
        }
      },
      courses: {
        undergraduateBasic: "Grundkurse für Bachelor",
        undergraduateElective: "Wahlkurse für Bachelor",
        graduateFoundation: "Grundkurse für Master",
        networkScienceSeries: "Netzwerk-Wissenschaft-Serie",
        linearAlgebra: "Lineare Algebra",
        networkScienceIntro: "Einführung in die Netzwerk-Wissenschaft",
        networkDynamics: "Netzwerk-Dynamik",
        networkPropagation: "Netzwerk-Wissenschaft: Netzwerk-Ausbreitung",
        shanghaiExcellent: "Shanghai Exzellente Kurse",
        fudanExcellent: "Fudan-Universität Exzellente Kurse",
        swarmaOnline: "Swarma Online-Kurse"
      },
      publications: {
        books: "Bücher",
        journals: "Fachzeitschriften",
        amazon: "Amazon",
        jd: "JD.com",
        googleScholar: "Google Scholar"
      },
      news: {
        title: "Akademische Nachrichten",
        items: [
          {
            title: "Prof. Cong Li gewinnt Sonderpreis bei den Shanghai Open Source Innovation Excellence Awards 2024",
            source: "Adaptive Netzwerke und Kontroll-Labor, Fudan-Universität",
            year: "2024",
            link: "Mehr lesen"
          },
          {
            title: "Prof. Cong Li leitet den akademischen Austausch über Fortschritte in der höheren Ordnungsdynamik komplexer Netzwerke",
            source: "Adaptive Netzwerke und Kontroll-Labor, Fudan-Universität",
            year: "2024",
            link: "Mehr lesen"
          },
          {
            title: "Prof. Cong Li gewinnt dritten Preis bei den Shanghai Computer Society Teaching Achievement Awards 2022",
            source: "Shanghai Computer Society",
            year: "2022",
            link: "Mehr lesen"
          },
          {
            title: "Prof. Cong Li gewinnt den Dekanpreis der Fakultät 2020",
            source: "Fakultät für Informationswissenschaft und Technologie",
            year: "2020",
            link: "Mehr lesen"
          }
        ]
      },
      links: {
        title: "Verwandte Links",
        items: [
          { name: "Fakultät für Informationswissenschaft und Technologie", href: "https://www.it.fudan.edu.cn/" },
          { name: "Fudan Forschungs-Homepage", href: "http://www.it.fudan.edu.cn/Data/View/1178" },
          { name: "Adaptive Netzwerke und Kontroll-Labor", href: "https://can.fudan.edu.cn/welcome_cn/" },
          { name: "Google Scholar", href: "https://scholar.google.com/citations?hl=en&tzom=-600&user=S7-6p4MAAAAJ" },
          { name: "Labor-Homepage", href: "https://can.fudan.edu.cn/author/licong/" },
          { name: "Swarma Pattern Homepage", href: "https://pattern.swarma.org/user/52054" },
          { name: "ResearchGate", href: "https://www.researchgate.net/profile/Cong-Li-27" }
        ]
      },
      footer: {
        copyright: "© 2025 Cong Li, Fudan-Universität",
        email: "E-Mail",
        phone: "Telefon",
        emailAddress: "cong_li@fudan.edu.cn",
        phoneNumber: "021-31242510"
      },
      menu: {
        fudanLibrary: "Fudan Bibliothek",
        complexSystemsBooks: "Komplexe Systeme Bücher",
        publishedBooks: "Veröffentlichte Bücher",
        academicPapers: "Akademische Arbeiten"
      }
    },
    ko: {
      title: "이총",
      subtitle: "부교수, 전자공학부 부주임",
      university: "푸단대학교 정보과학기술학원",
      nav: {
        books: "추천 도서",
        works: "나의 저작"
      },
      sections: {
        profile: "프로필",
        positions: "학술 직책",
        courses: "수업 과목",
        publications: "출판물",
        news: "학술 뉴스",
        links: "관련 링크"
      },
      profile: {
        title: "프로필",
        content: "이총, 푸단대학교 정보과학기술학원 전자공학부 부교수 겸 부주임. 네덜란드 델프트 공과대학교에서 지능 시스템 학사, 길림대학교에서 패턴 인식 및 지능 시스템 석사. 여러 국가 프로젝트의 주요 연구원, 국제 학회의 프로그램 위원회 위원, 국제 저널의 편집 위원회 위원.",
        research: "연구 분야: 복잡 네트워크의 이론 및 응용",
        areas: [
          "네트워크 특성 및 성능 분석, 네트워크 역학, 네트워크 설계",
          "인간 집단 행동 분석, 소셜 네트워크 분석 등",
          "빅데이터 마이닝 및 분석, 그래프 임베딩 (그래프 신경망: 커뮤니티 발견, 링크 예측) 등"
        ]
      },
      academic: {
        positions: {
          title: "학술 직책",
          society: {
            title: "학회 직책",
            items: [
              { position: "이사, 상하이 비선형 과학 연구회", period: "2024년 11월부터" },
              { position: "상임이사, 중국 중의약 정보학회 중의 진단 정보 분과", period: "2018년 11월부터" },
              { position: "사무총장, 국제 네트워크 과학 협회 중국 지부", period: "2018년 1월부터" },
              { position: "위원, 중국 산업 응용 수학회 복잡 시스템·복잡 네트워크 전문위원회", period: "2016년 10월부터" },
              { position: "위원, 중국 지휘 통제학회 네트워크 과학·공학 전문위원회", period: "2016년 4월부터" },
              { position: "비서, 상하이 자동화학회 자동화 이론 전문위원회", period: "2015년 8월~2019년 7월" }
            ]
          },
          conference: {
            title: "회의 직책",
            items: [
              { position: "NetSciX 2018, 프로그램 위원회", period: "2017-2018년" },
              { position: "프로그램 위원회 위원, 전국 복잡 네트워크 대회", period: "2017년부터" },
              { position: "프로그램 위원회 위원, 중국 네트워크 과학 포럼", period: "2016년부터" }
            ]
          },
          journal: {
            title: "저널 심사",
            content: "Scientific Reports (NPG), IEEE Trans on Systems, Man and Cybernetics (IEEE SMC), IEEE Trans on network Science and Engineering (IEEE TNSE), IEEE Trans on Control of Network Systems (IEEE CNS), IEEE Trans on Computational Social Systems (IEEE CSS), IEEE Journal of Biomedical and Health Informatics (IEEE BHI), Chaos, European Physical Journal B (Springer), Computer Communications (Elsevier), Journal of Combinatorial Optimization (Springer), Journal of Complex Networks (Oxford Journals) 등"
          }
        }
      },
      courses: {
        undergraduateBasic: "학부 기초 과목",
        undergraduateElective: "학부 전공 선택 과목",
        graduateFoundation: "대학원 전공 기초 과목",
        networkScienceSeries: "네트워크 과학 시리즈",
        linearAlgebra: "선형대수",
        networkScienceIntro: "네트워크 과학 입문",
        networkDynamics: "네트워크 역학",
        networkPropagation: "네트워크 과학: 네트워크 전파",
        shanghaiExcellent: "상하이 우수 과목",
        fudanExcellent: "푸단대학교 우수 과목",
        swarmaOnline: "집치학원 온라인 과목"
      },
      publications: {
        books: "도서",
        journals: "저널 논문",
        amazon: "Amazon",
        jd: "JD.com",
        googleScholar: "Google Scholar"
      },
      news: {
        title: "학술 뉴스",
        items: [
          {
            title: "이총 교수, 2024년도 상하이 오픈소스 혁신 우수성과상 특별상 수상",
            source: "푸단대학교 적응 네트워크 및 제어 연구실",
            year: "2024",
            link: "더 읽기"
          },
          {
            title: "이총 교수, 복잡 네트워크 고차 역학 연구 새로운 진전 학술 교류회 주재",
            source: "푸단대학교 적응 네트워크 및 제어 연구실",
            year: "2024",
            link: "더 읽기"
          },
          {
            title: "이총 교수, 2022년도 상하이 컴퓨터학회 교학 성과상 3등상 수상",
            source: "상하이 컴퓨터학회",
            year: "2022",
            link: "더 읽기"
          },
          {
            title: "이총 교수, 2020년도 정보과학기술학원 원장상 수상",
            source: "정보과학기술학원",
            year: "2020",
            link: "더 읽기"
          }
        ]
      },
      links: {
        title: "관련 링크",
        items: [
          { name: "정보과학기술학원", href: "https://www.it.fudan.edu.cn/" },
          { name: "푸단 연구 홈페이지", href: "http://www.it.fudan.edu.cn/Data/View/1178" },
          { name: "적응 네트워크 및 제어 연구실", href: "https://can.fudan.edu.cn/welcome_cn/" },
          { name: "Google Scholar", href: "https://scholar.google.com/citations?hl=en&tzom=-600&user=S7-6p4MAAAAJ" },
          { name: "연구실 홈페이지", href: "https://can.fudan.edu.cn/author/licong/" },
          { name: "집치 반도 홈페이지", href: "https://pattern.swarma.org/user/52054" },
          { name: "ResearchGate", href: "https://www.researchgate.net/profile/Cong-Li-27" }
        ]
      },
      footer: {
        copyright: "© 2025 이총, 푸단대학교",
        email: "이메일",
        phone: "전화",
        emailAddress: "cong_li@fudan.edu.cn",
        phoneNumber: "021-31242510"
      },
      menu: {
        fudanLibrary: "푸단 도서관",
        complexSystemsBooks: "복잡 시스템 도서",
        publishedBooks: "출간 도서",
        academicPapers: "학술 논문집"
      }
    },
    hk: {
      title: "李聰",
      subtitle: "副教授、電子工程系副主任",
      university: "復旦大學信息科學與技術學院",
      nav: {
        books: "推薦書籍",
        works: "我的作品"
      },
      sections: {
        profile: "個人簡介",
        positions: "學術任職",
        courses: "主導課程",
        publications: "發表論文",
        news: "學術動態",
        links: "相關連結"
      },
      profile: {
        title: "個人簡介",
        content: "李聰，女，復旦大學信息科學與技術學院，電子工程系副主任。荷蘭代爾夫特理工大學智能系統哲學博士，吉林大學模式識別與智能系統碩士。主持多項國家級項目，擔任多個國際會議程序委員會委員及國際期刊編委。",
        research: "研究方向：複雜網絡的理論及應用",
        areas: [
          "網絡描述及性能分析、網絡動力學過程分析、網絡設計",
          "人類集群行為分析、社交網絡分析等",
          "大數據挖掘與分析、圖嵌入（圖神經網絡：社團挖掘、鏈路預測）等"
        ]
      },
      academic: {
        positions: {
          title: "學術任職",
          society: {
            title: "學會任職",
            items: [
              { position: "理事、上海市非線性科學研究會", period: "2024年11月至今" },
              { position: "常務理事、中國中醫藥信息學會中醫診斷信息分會", period: "2018年11月至今" },
              { position: "國際網絡(NetSci)科學協會中國分會秘書長", period: "2018年1月至今" },
              { position: "中國工業與應用數學學會複雜系統與複雜網絡專委會委員", period: "2016年10月至今" },
              { position: "中國指揮與控制學會網絡科學與工程專委會委員", period: "2016年4月至今" },
              { position: "上海市自動化學會自動化理論專委會秘書", period: "2015年8月至2019年7月" }
            ]
          },
          conference: {
            title: "會議任職",
            items: [
              { position: "NetSciX 2018, Program Committee", period: "2017-2018年" },
              { position: "全國複雜網絡大會，程序委員會委員", period: "2017年至今" },
              { position: "中國網絡科學論壇，程序委員會委員", period: "2016年至今" }
            ]
          },
          journal: {
            title: "期刊審稿",
            content: "Scientific Reports (NPG), IEEE Trans on Systems, Man and Cybernetics (IEEE SMC), IEEE Trans on network Science and Engineering (IEEE TNSE), IEEE Trans on Control of Network Systems (IEEE CNS), IEEE Trans on Computational Social Systems (IEEE CSS), IEEE Journal of Biomedical and Health Informatics (IEEE BHI), Chaos, European Physical Journal B (Springer), Computer Communications (Elsevier), Journal of Combinatorial Optimization (Springer), Journal of Complex Networks (Oxford Journals) 等"
          }
        }
      },
      courses: {
        undergraduateBasic: "本科基礎課",
        undergraduateElective: "本科專業選修課",
        graduateFoundation: "碩士生專業基礎課",
        networkScienceSeries: "網絡科學系列課程",
        linearAlgebra: "線性代數",
        networkScienceIntro: "網絡科學導論",
        networkDynamics: "網絡動力學",
        networkPropagation: "網絡科學導論：網絡傳播",
        shanghaiExcellent: "上海市精品課程",
        fudanExcellent: "復旦大學精品課程",
        swarmaOnline: "集智學園在線課程"
      },
      publications: {
        books: "專著",
        journals: "期刊論文",
        amazon: "Amazon",
        jd: "京東",
        googleScholar: "Google Scholar"
      },
      news: {
        title: "學術動態",
        items: [
          {
            title: "李聰老師榮獲24年度上海開源創新卓越成果獎特等獎",
            source: "復旦大學自適應網絡與控制研究室",
            year: "2024",
            link: "查看全文"
          },
          {
            title: "李聰老師主持複雜網絡高階動力學研究新進展學術交流會",
            source: "復旦大學自適應網絡與控制研究室",
            year: "2024",
            link: "查看全文"
          },
          {
            title: "李聰老師榮獲2022年度上海市計算機學會教學成果獎三等獎",
            source: "上海市計算機學會",
            year: "2022",
            link: "查看全文"
          },
          {
            title: "李聰老師榮獲2020年度信息學院院長獎",
            source: "信息科學與技術學院",
            year: "2020",
            link: "查看全文"
          }
        ]
      },
      links: {
        title: "相關連結",
        items: [
          { name: "信息科學與技術學院", href: "https://www.it.fudan.edu.cn/" },
          { name: "復旦科研主頁", href: "http://www.it.fudan.edu.cn/Data/View/1178" },
          { name: "自適應網絡與控制研究室", href: "https://can.fudan.edu.cn/welcome_cn/" },
          { name: "Google Scholar", href: "https://scholar.google.com/citations?hl=en&tzom=-600&user=S7-6p4MAAAAJ" },
          { name: "實驗室主頁", href: "https://can.fudan.edu.cn/author/licong/" },
          { name: "集智斑圖主頁", href: "https://pattern.swarma.org/user/52054" },
          { name: "ResearchGate", href: "https://www.researchgate.net/profile/Cong-Li-27" }
        ]
      },
      footer: {
        copyright: "© 2025 李聰 復旦大學",
        email: "郵箱",
        phone: "電話",
        emailAddress: "cong_li@fudan.edu.cn",
        phoneNumber: "021-31242510"
      },
      menu: {
        fudanLibrary: "復旦圖書館",
        complexSystemsBooks: "複雜系統推薦讀物",
        publishedBooks: "已出版專著",
        academicPapers: "學術論文集"
      }
    },
    es: {
      title: "Cong Li",
      subtitle: "Profesora Asociada, Subdirectora de Ingeniería Electrónica",
      university: "Facultad de Ciencia y Tecnología de la Información, Universidad de Fudan",
      nav: {
        books: "Libros Recomendados",
        works: "Mis Obras"
      },
      sections: {
        profile: "Perfil",
        positions: "Cargos Académicos",
        courses: "Cursos",
        publications: "Publicaciones",
        news: "Noticias Académicas",
        links: "Enlaces Relacionados"
      },
      profile: {
        title: "Perfil",
        content: "Cong Li, Profesora Asociada y Subdirectora de Ingeniería Electrónica en la Facultad de Ciencia y Tecnología de la Información de la Universidad de Fudan. PhD en Sistemas Inteligentes de la Universidad Tecnológica de Delft, Países Bajos. MS en Reconocimiento de Patrones y Sistemas Inteligentes de la Universidad de Jilin. Investigadora principal de múltiples proyectos nacionales, miembro del comité de programa de conferencias internacionales y miembro del comité editorial de revistas internacionales.",
        research: "Áreas de investigación: Teoría y aplicaciones de redes complejas",
        areas: [
          "Caracterización y análisis de rendimiento de redes, dinámica de redes, diseño de redes",
          "Análisis del comportamiento colectivo humano, análisis de redes sociales",
          "Minería y análisis de big data, incrustación de grafos (redes neuronales de grafos: detección de comunidades, predicción de enlaces)"
        ]
      },
      academic: {
        positions: {
          title: "Cargos Académicos",
          society: {
            title: "Cargos en Sociedades",
            items: [
              { position: "Miembro del Consejo, Sociedad de Ciencia No Lineal de Shanghai", period: "Nov. 2024 - presente" },
              { position: "Director Ejecutivo, Sociedad de Información de Diagnóstico TCM de la Asociación de Información de Medicina Tradicional China", period: "Nov. 2018 - presente" },
              { position: "Secretaria General, Capítulo Chino de la Sociedad de Ciencia de Redes Internacional (NetSci)", period: "Ene. 2018 - presente" },
              { position: "Miembro del Comité, Comité de Sistemas Complejos y Redes Complejas, Sociedad China de Matemática Industrial y Aplicada", period: "Oct. 2016 - presente" },
              { position: "Miembro del Comité, Comité de Ciencia y Tecnología de Redes, Instituto Chino de Comando y Control", period: "Abr. 2016 - presente" },
              { position: "Secretaria, Comité de Teoría de Automatización, Sociedad de Automatización de Shanghai", period: "Ago. 2015 - Jul. 2019" }
            ]
          },
          conference: {
            title: "Cargos en Conferencias",
            items: [
              { position: "NetSciX 2018, Comité de Programa", period: "2017-2018" },
              { position: "Miembro del Comité de Programa, Conferencia Nacional de Redes Complejas", period: "2017 - presente" },
              { position: "Miembro del Comité de Programa, Foro de Ciencia de Redes de China", period: "2016 - presente" }
            ]
          },
          journal: {
            title: "Revisión de Revistas",
            content: "Scientific Reports (NPG), IEEE Trans on Systems, Man and Cybernetics (IEEE SMC), IEEE Trans on network Science and Engineering (IEEE TNSE), IEEE Trans on Control of Network Systems (IEEE CNS), IEEE Trans on Computational Social Systems (IEEE CSS), IEEE Journal of Biomedical and Health Informatics (IEEE BHI), Chaos, European Physical Journal B (Springer), Computer Communications (Elsevier), Journal of Combinatorial Optimization (Springer), Journal of Complex Networks (Oxford Journals) etc."
          }
        }
      },
      courses: {
        undergraduateBasic: "Cursos Básicos de Pregrado",
        undergraduateElective: "Cursos Electivos de Pregrado",
        graduateFoundation: "Cursos Fundamentales de Maestría",
        networkScienceSeries: "Serie de Ciencia de Redes",
        linearAlgebra: "Álgebra Lineal",
        networkScienceIntro: "Introducción a la Ciencia de Redes",
        networkDynamics: "Dinámica de Redes",
        networkPropagation: "Ciencia de Redes: Propagación en Redes",
        shanghaiExcellent: "Cursos Excelentes de Shanghai",
        fudanExcellent: "Cursos Excelentes Universidad de Fudan",
        swarmaOnline: "Cursos en Línea de Swarma"
      },
      publications: {
        books: "Libros",
        journals: "Artículos de Revistas",
        amazon: "Amazon",
        jd: "JD.com",
        googleScholar: "Google Scholar"
      },
      news: {
        title: "Noticias Académicas",
        items: [
          {
            title: "Prof. Cong Li gana Premio Especial en los Premios de Excelencia de Innovación de Código Abierto de Shanghai 2024",
            source: "Laboratorio de Redes Adaptativas y Control, Universidad de Fudan",
            year: "2024",
            link: "Leer más"
          },
          {
            title: "Prof. Cong Li preside el intercambio académico sobre nuevos avances en dinámica de orden superior de redes complejas",
            source: "Laboratorio de Redes Adaptativas y Control, Universidad de Fudan",
            year: "2024",
            link: "Leer más"
          },
          {
            title: "Prof. Cong Li gana tercer premio en los Premios de Logros Docentes 2022 de la Sociedad de Computación de Shanghai",
            source: "Sociedad de Computación de Shanghai",
            year: "2022",
            link: "Leer más"
          },
          {
            title: "Prof. Cong Li gana el Premio del Decano de la Facultad 2020",
            source: "Facultad de Ciencia y Tecnología de la Información",
            year: "2020",
            link: "Leer más"
          }
        ]
      },
      links: {
        title: "Enlaces Relacionados",
        items: [
          { name: "Facultad de Ciencia y Tecnología de la Información", href: "https://www.it.fudan.edu.cn/" },
          { name: "Página de Investigación de Fudan", href: "http://www.it.fudan.edu.cn/Data/View/1178" },
          { name: "Laboratorio de Redes Adaptativas y Control", href: "https://can.fudan.edu.cn/welcome_cn/" },
          { name: "Google Scholar", href: "https://scholar.google.com/citations?hl=en&tzom=-600&user=S7-6p4MAAAAJ" },
          { name: "Página del Laboratorio", href: "https://can.fudan.edu.cn/author/licong/" },
          { name: "Página de Swarma Pattern", href: "https://pattern.swarma.org/user/52054" },
          { name: "ResearchGate", href: "https://www.researchgate.net/profile/Cong-Li-27" }
        ]
      },
      footer: {
        copyright: "© 2025 Cong Li, Universidad de Fudan",
        email: "Correo",
        phone: "Teléfono",
        emailAddress: "cong_li@fudan.edu.cn",
        phoneNumber: "021-31242510"
      },
      menu: {
        fudanLibrary: "Biblioteca de Fudan",
        complexSystemsBooks: "Libros de Sistemas Complejos",
        publishedBooks: "Libros Publicados",
        academicPapers: "Artículos Académicos"
      }
    }
  };

  const seoKeywords = [
    { zh: "复杂网络", en: "Complex Networks", ja: "複雑ネットワーク", de: "Komplexe Netzwerke", ko: "복잡 네트워크", hk: "複雜網絡", es: "Redes Complejas", category: "primary" },
    { zh: "网络科学", en: "Network Science", ja: "ネットワーク科学", de: "Netzwerk-Wissenschaft", ko: "네트워크 과학", hk: "網絡科學", es: "Ciencia de Redes", category: "primary" },
    { zh: "网络动力学", en: "Network Dynamics", ja: "ネットワークダイナミクス", de: "Netzwerk-Dynamik", ko: "네트워크 역학", hk: "網絡動力學", es: "Dinámica de Redes", category: "primary" },
    { zh: "传播理论", en: "Spreading Theory", ja: "伝播理論", de: "Ausbreitungstheorie", ko: "전파 이론", hk: "傳播理論", es: "Teoría de Propagación", category: "primary" },
    { zh: "链路预测", en: "Link Prediction", ja: "リンク予測", de: "Link-Vorhersage", ko: "링크 예측", hk: "鏈路預測", es: "Predicción de Enlaces", category: "primary" },
    { zh: "社区发现", en: "Community Detection", ja: "コミュニティ発見", de: "Community-Erkennung", ko: "커뮤니티 발견", hk: "社區發現", es: "Detección de Comunidades", category: "primary" },
    { zh: "网络嵌入", en: "Network Embedding", ja: "ネットワーク埋め込み", de: "Netzwerk-Einbettung", ko: "네트워크 임베딩", hk: "網絡嵌入", es: "Incrustación de Redes", category: "primary" },
    { zh: "图神经网络", en: "Graph Neural Networks", ja: "グラフニューラルネットワーク", de: "Graph-Neuronale Netzwerke", ko: "그래프 신경망", hk: "圖神經網絡", es: "Redes Neuronales de Grafos", category: "primary" },
    { zh: "时态网络", en: "Temporal Networks", ja: "時系列ネットワーク", de: "Temporäre Netzwerke", ko: "시계열 네트워크", hk: "時態網絡", es: "Redes Temporales", category: "secondary" },
    { zh: "多层网络", en: "Multilayer Networks", ja: "多層ネットワーク", de: "Mehrschichtige Netzwerke", ko: "다층 네트워크", hk: "多層網絡", es: "Redes Multicapa", category: "secondary" },
    { zh: "网络控制", en: "Network Control", ja: "ネットワーク制御", de: "Netzwerk-Kontrolle", ko: "네트워크 제어", hk: "網絡控制", es: "Control de Redes", category: "secondary" },
    { zh: "网络鲁棒性", en: "Network Robustness", ja: "ネットワーク頑健性", de: "Netzwerk-Robustheit", ko: "네트워크 견고성", hk: "網絡魯棒性", es: "Robustez de Redes", category: "secondary" },
    { zh: "网络渗透", en: "Network Percolation", ja: "ネットワーク浸透", de: "Netzwerk-Perkolation", ko: "네트워크 침투", hk: "網絡滲透", es: "Percolación de Redes", category: "secondary" },
    { zh: "影响最大化", en: "Influence Maximization", ja: "影響最大化", de: "Einfluss-Maximierung", ko: "영향력 최대화", hk: "影響最大化", es: "Maximización de Influencia", category: "secondary" },
    { zh: "随机游走", en: "Random Walks", ja: "ランダムウォーク", de: "Zufällige Wege", ko: "랜덤 워크", hk: "隨機游走", es: "Caminatas Aleatorias", category: "secondary" },
    { zh: "社交网络分析", en: "Social Network Analysis", ja: "ソーシャルネットワーク解析", de: "Soziale Netzwerkanalyse", ko: "소셜 네트워크 분석", hk: "社交網絡分析", es: "Análisis de Redes Sociales", category: "application" },
    { zh: "大数据挖掘", en: "Big Data Mining", ja: "ビッグデータマイニング", de: "Big-Data-Mining", ko: "빅데이터 마이닝", hk: "大數據挖掘", es: "Minería de Datos Masivos", category: "application" },
    { zh: "人工智能", en: "Artificial Intelligence", ja: "人工知能", de: "Künstliche Intelligenz", ko: "인공지능", hk: "人工智能", es: "Inteligencia Artificial", category: "application" },
    { zh: "机器学习", en: "Machine Learning", ja: "機械学習", de: "Maschinelles Lernen", ko: "기계학습", hk: "機器學習", es: "Aprendizaje Automático", category: "application" },
    { zh: "数据科学", en: "Data Science", ja: "データサイエンス", de: "Datenwissenschaft", ko: "데이터 과학", hk: "數據科學", es: "Ciencia de Datos", category: "application" },
    { zh: "系统科学", en: "Systems Science", ja: "システム科学", de: "Systemwissenschaft", ko: "시스템 과학", hk: "系統科學", es: "Ciencia de Sistemas", category: "application" },
    { zh: "统计物理", en: "Statistical Physics", ja: "統計物理学", de: "Statistische Physik", ko: "통계 물리학", hk: "統計物理", es: "Física Estadística", category: "theory" },
    { zh: "非线性动力学", en: "Nonlinear Dynamics", ja: "非線形ダイナミクス", de: "Nichtlineare Dynamik", ko: "비선형 역학", hk: "非線性動力學", es: "Dinámica No Lineal", category: "theory" },
    { zh: "优化理论", en: "Optimization Theory", ja: "最適化理論", de: "Optimierungstheorie", ko: "최적화 이론", hk: "優化理論", es: "Teoría de Optimización", category: "theory" },
    { zh: "信息论", en: "Information Theory", ja: "情報理論", de: "Informationstheorie", ko: "정보 이론", hk: "信息論", es: "Teoría de la Información", category: "theory" },
    { zh: "复旦大学", en: "Fudan University", ja: "復旦大学", de: "Fudan-Universität", ko: "푸단대학교", hk: "復旦大學", es: "Universidad de Fudan", category: "institution" },
    { zh: "电子工程", en: "Electronic Engineering", ja: "電子工学", de: "Elektrotechnik", ko: "전자공학", hk: "電子工程", es: "Ingeniería Electrónica", category: "institution" },
    { zh: "副教授", en: "Associate Professor", ja: "准教授", de: "Professorin", ko: "부교수", hk: "副教授", es: "Profesora Asociada", category: "position" },
    { zh: "学术任职", en: "Academic Positions", ja: "学術役職", de: "Akademische Positionen", ko: "학술 직책", hk: "學術任職", es: "Cargos Académicos", category: "position" },
    { zh: "科研成果", en: "Research Achievements", ja: "研究成果", de: "Forschungsergebnisse", ko: "연구 성과", hk: "科研成果", es: "Logros de Investigación", category: "academic" },
    { zh: "学术论文", en: "Academic Papers", ja: "学術論文", de: "Akademische Arbeiten", ko: "학술 논문", hk: "學術論文", es: "Artículos Académicos", category: "academic" }
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
                className="fixed top-4 right-4 z-50 inline-flex items-center gap-2 px-3 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition text-sm font-medium shadow-lg"
                title={
                  language === 'zh' ? 'Switch to English' :
                  language === 'en' ? '日本語に切り替える' :
                  language === 'ja' ? 'Deutsch' :
                  language === 'de' ? '한국어' :
                  language === 'ko' ? '繁體中文' :
                  language === 'hk' ? 'Español' :
                  '切换到中文'
                }
              >
                <Globe className="w-4 h-4" />
                {language === 'zh' ? 'EN' :
                 language === 'en' ? '日本語' :
                 language === 'ja' ? 'DE' :
                 language === 'de' ? '한국어' :
                 language === 'ko' ? '繁體' :
                 language === 'hk' ? 'ES' :
                 '中文'}
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


        </main>
      </div>
    </div>
  );
}

export default App;

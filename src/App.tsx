import React, { useState, useCallback } from 'react';
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { ExternalLink, FileText, GraduationCap, Link as LinkIcon, Mail, User, Award, Phone, ChevronDown, ChevronUp, Book, ShoppingCart, BookOpen, Palette } from 'lucide-react';
import { Disclosure, Menu } from '@headlessui/react';

function App() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

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
        en: "Epidemic threshold in temporal multiplex networks with individual layer preference",
        zh: "具有个体层偏好的时态多重网络中的流行阈值",
        journal: "IEEE Transactions on Network Science and Engineering",
        details: "vol. 8, no. 1, pp. 814-824",
        year: "2021",
        authors: "C. Li, Y. Zhang, X. Li"
      },
      {
        en: "Evolving nature of human contact networks with its impact on epidemic processes",
        zh: "人类接触网络的演化特性及其对流行过程的影响",
        journal: "Complexity",
        details: "Article ID 6643658",
        year: "2021",
        authors: "C. Li, J. Li, X. Li"
      }
    ]
  };

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
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">李聪</h1>
                    <div className="space-y-1">
                        <p className="text-lg md:text-xl text-gray-200">电子工程系，副主任</p>
                        <p className="text-lg md:text-xl font-bold text-emerald-300">复旦大学信息科学与工程学院</p>
                    </div>
                </div>
            </div>

            
            <div className="flex gap-4">
              <Menu as="div" className="relative">
                <Menu.Button className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition">
                  <BookOpen className="w-5 h-5" />
                  推荐书单
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
                          复旦图书馆
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
                          复杂系统推荐读物
                        </a>
                      )}

                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Menu>

              <Menu as="div" className="relative">
                <Menu.Button className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition">
                  <Palette className="w-5 h-5" />
                  我的作品
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
                          已出版专著
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#papers"
                          className={`${
                            active ? 'bg-gray-700' : ''
                          } group flex items-center px-4 py-2 rounded-lg text-sm transition-colors`}
                        >
                          学术论文集
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
              个人简介
            </h2>
            <div className="space-y-6">
              <p className="text-gray-200 leading-relaxed">
                李聪，女，复旦大学信息科学与工程学院，电子工程系副主任。荷兰代尔夫特理工大学智能系统哲学博士，吉林大学模式识别与智能系统硕士。主持多项国家级项目，担任多个国际会议程序委员会委员及国际期刊编委。
              </p>
              
              <div>
<h3 className="text-xl font-semibold mb-3">研究方向：复杂网络的理论及应用</h3>
<ul className="space-y-4 text-gray-200">
  <li className="flex gap-1">
    <span>1.网络描述及性能分析、网络动力学过程分析、网络设计；</span>
    <span>2.人类集群行为分析、社交网络分析；</span>
    <span>3.大数据挖掘与分析、图嵌入（图神经网络：社团挖掘、链路预测）等</span>
  </li>
</ul>
              </div>
              
            </div>
          </section>

          <section className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/30">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Award className="w-6 h-6" />
              学术任职
            </h2>
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-3">学会任职</h3>
                <ul className="space-y-3 text-gray-200">
                  <li className="flex justify-between items-baseline">
                    <span>上海市非线性科学研究会 理事</span>
                    <span className="text-gray-400">2024年11月至今</span>
                  </li>
                  <li className="flex justify-between items-baseline">
                    <span>中国中医药信息学会中医诊断信息分会常务理事</span>
                    <span className="text-gray-400">2018年11月至今</span>
                  </li>
                  <li className="flex justify-between items-baseline">
                    <span>国际网络(NetSci)科学协会中国分会秘书长</span>
                    <span className="text-gray-400">2018年1月至今</span>
                  </li>
                  <li className="flex justify-between items-baseline">
                    <span>中国工业与应用数学学会复杂系统与复杂网络专委会委员</span>
                    <span className="text-gray-400">2016年10月至今</span>
                  </li>
                  <li className="flex justify-between items-baseline">
                    <span>中国指挥与控制学会网络科学与工程专委会委员</span>
                    <span className="text-gray-400">2016年4月至今</span>
                  </li>
                  <li className="flex justify-between items-baseline">
                    <span>上海市自动化学会自动化理论专委会秘书</span>
                    <span className="text-gray-400">2015年8月至2019年7月</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-3">会议任职</h3>
                <ul className="space-y-3 text-gray-200">
                  <li className="flex justify-between items-baseline">
                    <span>NetSciX 2018, Program Committee</span>
                    <span className="text-gray-400">2017-2018年</span>
                  </li>
                  <li className="flex justify-between items-baseline">
                    <span>全国复杂网络大会，程序委员会委员</span>
                    <span className="text-gray-400">2017年至今</span>
                  </li>
                  <li className="flex justify-between items-baseline">
                    <span>中国网络科学论坛，程序委员会委员</span>
                    <span className="text-gray-400">2016年至今</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-3">期刊审稿</h3>
                <p className="text-gray-200 leading-relaxed">
                  Scientific Reports (NPG), IEEE Trans on Systems, Man and Cybernetics (IEEE SMC), IEEE Trans on network Science and Engineering (IEEE TNSE), IEEE Trans on Control of Network Systems (IEEE CNS), IEEE Trans on Computational Social Systems (IEEE CSS), IEEE Journal of Biomedical and Health Informatics (IEEE BHI), Chaos, European Physical Journal B (Springer), Computer Communications (Elsevier), Journal of Combinatorial Optimization (Springer), Journal of Complex Networks (Oxford Journals) 等
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/30">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <GraduationCap className="w-6 h-6" />
              主导课程
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <a href="" 
                 className="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition">
                <h3 className="font-semibold mb-2">本科基础课</h3>
                <h4 className="font-semibold text-purple-300">线性代数</h4>
                <p className="text-sm text-gray-300 mt-1">上海市精品课程</p>
              </a>
              
              <a href="" 
                 className="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition">
                <h3 className="font-semibold mb-2">本科专业选修课</h3>
                <h4 className="font-semibold text-purple-300">网络科学导论</h4>
                <p className="text-sm text-gray-300 mt-1">复旦大学精品课程</p>
              </a>
              
              <a href="" 
                 className="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition">
                <h3 className="font-semibold mb-2">硕士生专业基础课</h3>
                <h4 className="font-semibold text-purple-300">网络动力学</h4>
              </a>

              <a href="https://campus.swarma.org/course/2336" 
                 className="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition">
                <h3 className="font-semibold mb-2">网络科学系列课程</h3>
                <h4 className="font-semibold text-purple-300">网络科学导论：网络传播</h4>
                <p className="text-sm text-gray-300 mt-1">集智学园在线课程</p>
              </a>
            </div>
          </section>

          <section className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/30">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6" />
              发表论文
            </h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Book className="w-5 h-5" />
                专著
              </h3>
              <div className="space-y-4">
                {publications.books.map((book, index) => (
                  <Disclosure key={index}>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full justify-between items-center p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition">
                          <div className="text-left">
                            <h4 className="font-semibold">{book.zh}</h4>
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
                              alt={book.zh}
                              className="w-32 h-auto rounded-lg shadow-lg"
                            />
                            <div className="space-y-2">
                              <p className="text-purple-300">{book.en}</p>
                              <p className="text-sm text-gray-300">ISBN: {book.isbn}</p>
                              <div className="flex gap-4 mt-3">
                                <a
                                  href={book.links.amazon}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition"
                                >
                                  <ShoppingCart className="w-4 h-4" />
                                  亚马逊
                                </a>
                                <a
                                  href={book.links.jd}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition"
                                >
                                  <ShoppingCart className="w-4 h-4" />
                                  京东
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
              <h3 className="text-xl font-semibold mb-4">期刊论文</h3>
              <div className="space-y-4">
                {publications.journals.map((paper, index) => (
                  <Disclosure key={index}>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full justify-between items-center p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition">
                          <div className="text-left">
                            <h4 className="font-semibold">{paper.zh}</h4>
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
                            <p className="text-purple-300">{paper.en}</p>
                            <p className="text-sm text-gray-300">
                              {paper.journal}
                              <br />
                              {paper.details}
                            </p>
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
    学术动态
  </h2>
  <div className="grid grid-cols-2 gap-4">
    <a href="https://can.fudan.edu.cn/%e6%9d%8e%e8%81%aa%e8%80%81%e5%b8%88%e8%8d%a3%e8%8e%b724%e5%b9%b4%e5%ba%a6%e4%b8%8a%e6%b5%b7%e5%bc%80%e6%ba%90%e5%88%9b%e6%96%b0%e5%8d%93%e8%b6%8a%e6%88%90%e6%9e%9c%e5%a5%96%e7%89%b9%e7%ad%89%e5%a5%96/" 
       className="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition">
      <h3 className="font-semibold mb-2">李聪老师荣获24年度上海开源创新卓越成果奖特等奖</h3>
      <p className="text-sm text-gray-300">— 复旦大学自适应网络与控制研究室, 2024 [查看全文]</p>
    </a>
    <a href="https://can.fudan.edu.cn/%E5%A4%8D%E6%9D%82%E7%BD%91%E7%BB%9C%E9%AB%98%E9%98%B6%E5%8A%A8%E5%8A%9B%E5%AD%A6%E7%A0%94%E7%A9%B6%E6%96%B0%E8%BF%9B%E5%B1%95%E5%AD%A6%E6%9C%AF%E4%BA%A4%E6%B5%81%E4%BC%9A/" 
       className="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition">
      <h3 className="font-semibold mb-2">"李聪老师主持复杂网络高阶动力学研究新进展学术交流会"</h3>
      <p className="text-sm text-gray-300">— 复旦大学自适应网络与控制研究室,, 2024 [查看全文]</p>
    </a>
    <a href="https://can.fudan.edu.cn/%E7%A0%94%E7%A9%B6%E5%AE%A4%E6%9D%8E%E8%81%AA%E8%80%81%E5%B8%88%E8%8D%A3%E8%8E%B72022%E5%B9%B4%E5%BA%A6%E4%B8%8A%E6%B5%B7%E5%B8%82%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%AD%A6%E4%BC%9A%E6%95%99%E5%AD%A6/"
       className="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition">
      <h3 className="font-semibold mb-2">"李聪老师荣获2022年度上海市计算机学会教学成果奖三等奖"</h3>
      <p className="text-sm text-gray-300">— 上海市计算机学会, 2022 [查看全文]</p>
    </a>
    <a href="https://can.fudan.edu.cn/%e6%9d%8e%e8%81%aa%e8%80%81%e5%b8%88%e8%8d%a3%e8%8e%b72020%e5%b9%b4%e5%ba%a6%e4%bf%a1%e6%81%af%e5%ad%a6%e9%99%a2%e9%99%a2%e9%95%bf%e5%a5%96/" 
       className="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition">
      <h3 className="font-semibold mb-2">"李聪老师荣获2020年度信息学院院长奖"</h3>
      <p className="text-sm text-gray-300">— 信息科学与工程学院,, 2020 [查看全文]</p>
    </a>
  </div>
</section>

          <section className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/30">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <LinkIcon className="w-6 h-6" />
              友情链接
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

              <a href="https://www.it.fudan.edu.cn/" 
                 className="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition text-center">
                信息科学与工程学院
              </a>
              <a href="http://www.it.fudan.edu.cn/Data/View/1178" 
                 className="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition text-center">
                科研学术主页
              </a>
              <a href="https://can.fudan.edu.cn/welcome_cn/" 
                 className="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition text-center">
                自适应网络与控制研究室
              </a>
              <a href="https://scholar.google.com/citations?user=S7-6p4MAAAAJ&hl=fi" 
                 className="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition text-center">
                Google Scholar主页
              </a>
              <a href="https://can.fudan.edu.cn/author/licong/" 
                 className="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition text-center">
                实验室个人主页
              </a>
              <a href="https://pattern.swarma.org/user/52054" 
                 className="block p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition text-center">
                集智斑图个人主页
              </a>

            </div>
          </section>

          <footer className="max-w-6xl mx-auto px-4 py-8 text-center border-t border-gray-700/30">
            <p className="text-gray-300">© 2025 李聪 Licong 复旦大学信息科学与工程学院</p>
            <div className="flex items-center justify-center gap-6 mt-2 text-gray-400">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                邮箱: <a href="mailto:cong_li@fudan.edu.cn" className="text-blue-400 hover:underline">cong_li@fudan.edu.cn</a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                电话: 021-31242510
              </p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;

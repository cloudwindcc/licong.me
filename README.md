# licong.me

李聪（Cong Li）的个人学术主页。当前资料以[复旦大学未来信息创新学院教师主页](https://fit.fudan.edu.cn/Data/View/1178)为主要事实来源，展示个人简介、研究方向、课程、论文与学术动态。

## 技术栈

- React 18、TypeScript、Vite、Tailwind CSS
- Cloudflare Pages，正式域名 `https://www.licong.me/`
- 构建时首页预渲染，浏览器端 hydration 保留交互
- 静态学术资料页、JSON-LD、sitemap、robots.txt 和 IndexNow

## 本地开发

要求 Node.js 22.12 或更高版本。
Cloudflare Pages 通过仓库根目录的 `.node-version` 选择 Node.js 22，避免旧构建镜像默认使用 Node.js 18。

```bash
npm ci
npm run dev
```

## 检查与构建

```bash
npm run build
npm test
npx tsc -p tsconfig.app.json --noEmit
npm run lint
```

`npm run build` 会重新生成论文页、构建客户端和 SSR bundle、预渲染首页，并执行全站 SEO 审计。维护原则、发布流程和站长平台操作见 [docs/search-optimization.md](docs/search-optimization.md)。

## 发布

构建产物是 `dist/`。Cloudflare Pages 项目名为 `licong-me`，生产分支为 `main`。发布完成后可执行：

```bash
npm run submit:indexnow -- --submit
```

该命令会先验证线上 IndexNow key，再提交 sitemap 中的规范网址。通知成功不代表搜索引擎一定收录或提升排名。

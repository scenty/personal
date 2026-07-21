# 个人学术网站

中山大学海洋科学学院卢文芳副教授的个人学术主页。基于 React + TypeScript + Vite 构建的静态单页应用（SPA），内容以数据文件驱动，支持中英文切换，部署于 GitHub Pages。

## 总体结构

网站采用**数据驱动 + 页面组件**的分层架构：

```
浏览器
  └── index.html
        └── main.tsx 入口
              └── App.tsx（路由、主题、语言）
                    └── Layout（导航栏 + 页脚）
                          └── pages/*（各页面）
                                ├── 读取 src/data/* 静态数据
                                ├── 调用 publications.ts / news.ts 中的统计与聚合函数
                                └── 组合 components/* 展示模块
```

**核心设计要点：**

| 层次 | 职责 |
|------|------|
| `src/data/` | 唯一内容源：个人信息、论文、学生、项目、数据产品、动态 |
| `src/pages/` | 路由页面，负责布局与数据展示逻辑 |
| `src/components/` | 可复用 UI 模块（轮播、导航、页脚等） |
| `src/contexts/` | 全局状态（中英文切换） |
| `src/components/ui/theme-provider.tsx` | 明暗主题（按时段默认 + 手动切换） |
| `public/` | 静态资源，构建时原样复制到 `dist/` |

**路由：** 使用 `HashRouter`（URL 形如 `/#/publications`），配合 `vite.config.ts` 中 `base: './'`，适配 GitHub Pages 子路径部署。

**统计数字：** 首页论文数量由 `getFirstOrCorrespondingAuthorPublications()`、`getQ2AbovePublications()` 等函数从 `publications.ts` 动态计算；简介中 `{paperCount}`/`{q2Count}` 占位符由页面替换。

## 文件树

```
personal/
├── .github/workflows/deploy.yml
├── public/
│   ├── Wenfang-CV-2025.pdf
│   └── images/
├── src/
│   ├── main.tsx / App.tsx / index.css
│   ├── components/
│   │   ├── Layout.tsx / Navbar.tsx / Footer.tsx
│   │   ├── HeroCarousel.tsx / PublicationsCarousel.tsx / StudentsCarousel.tsx
│   │   └── ui/
│   ├── contexts/LanguageContext.tsx
│   ├── data/
│   │   ├── profile.ts          # 个人简介、荣誉、教育、教学、社交（唯一源）
│   │   ├── publications.ts     # 论文与统计
│   │   ├── students.ts         # 学生团队
│   │   ├── projects.ts         # 项目（含周期、相关论文 ID）
│   │   ├── dataProducts.ts     # 数据产品与专著
│   │   ├── news.ts             # 手动动态 + 论文媒体报道聚合
│   │   └── index.ts
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Publications.tsx / PublicationDetail.tsx
│   │   ├── Students.tsx / StudentDetail.tsx
│   │   ├── Teaching.tsx        # 教学课程
│   │   ├── News.tsx            # 动态聚合
│   │   ├── Projects.tsx / DataProducts.tsx / Contact.tsx
│   ├── hooks/ / lib/
├── index.html                  # SEO：description、OG、Person JSON-LD
├── vite.config.ts
└── README.md
```

## 页面与路由

顶部导航：**首页 · 研究成果 · 学生团队 · 科研项目 · 联系方式**。教学 / 动态 / 数据产品仍可通过首页快捷入口或直接 URL 访问。

| 路由 | 页面文件 | 说明 |
|------|----------|------|
| `/#/` | `Home.tsx` | 简介（读 profile）、教育/任职、统计、轮播、动态预览、快捷入口 |
| `/#/publications` | `Publications.tsx` | 论文列表（中英） |
| `/#/publications/:id` | `PublicationDetail.tsx` | 详情；复制引用 / BibTeX |
| `/#/students` | `Students.tsx` | 学生团队 |
| `/#/students/:id` | `StudentDetail.tsx` | 学生详情 |
| `/#/teaching` | `Teaching.tsx` | 课程与教学荣誉（不在顶栏） |
| `/#/news` | `News.tsx` | 媒体报道与站内动态（不在顶栏） |
| `/#/projects` | `Projects.tsx` | 科研项目（周期 + 相关论文） |
| `/#/data-products` | `DataProducts.tsx` | 数据产品；`paperId` 站内链到论文（不在顶栏） |
| `/#/contact` | `Contact.tsx` | 联系方式与学术外链（含 Scholar、学院页） |

## 数据文件说明

### `profile.ts`
姓名、单位、联系方式、社交（知乎 / ResearchGate / ORCID / Scholar / 学院页）、荣誉、`awards`（首页 3+2）、`education`、`roles`、`teaching`、`bio`/`bioEn`（含 `{paperCount}`/`{q2Count}`）。**首页与 Contact 均以此为唯一内容源。**

### `publications.ts`
论文结构化列表；详情页支持 DOI/PDF/数据/代码、亮点、图表、媒体报道；侧边栏可复制引用与 BibTeX。

### `news.ts` / `syncedNews.json`
- `manualNews`：手动动态
- `syncedNews.json`：学院官网 + 公众号检索结果（**全文**匹配「卢文芳」，不要求标题含名）
- `getAllNews()`：手动 → 同步结果 → 论文 `newsCoverage`，去重后**按时间从新到旧**；首页取前 5 条

更新同步数据：

```bash
npm run sync-news   # 写入 src/data/syncedNews.json，再提交即可上线
```

> 微信公众号无开放 API，脚本经搜狗检索，可能触发验证码；学院官网 `/search/all?keys=` 更稳定。静态站无法在访客浏览器里实时爬公众号。

### `students.ts` / `projects.ts` / `dataProducts.ts`
学生（含课题）、项目（`duration`、`relatedPublicationIds`）、数据产品（`paperId` 内链）与专著下载。

## 技术栈

- React 19 + TypeScript + Vite 7
- React Router DOM 7（HashRouter）
- Tailwind CSS 3 + shadcn/ui
- Embla Carousel / Lucide React
- ThemeProvider（时段默认明暗 + 手动切换）
- GitHub Actions → GitHub Pages

## 主题（夜间模式）

- 默认：本地时间 **19:00–06:59** 夜间，其余日间；`index.html` 内联脚本防闪烁
- 手动：导航栏月亮/太阳按钮；偏好键 `vite-ui-theme`

## 快速开始

```bash
npm install
npm run dev      # http://127.0.0.1:5173
npm run build
npm run preview
npm run lint
```

## 内容维护指南

### 添加论文
编辑 `src/data/publications.ts` 数组头部。若有媒体报道，填 `newsCoverage`，会自动出现在动态页。

### 更新简介 / 奖励 / 教学
只改 `src/data/profile.ts`（勿在 `Home.tsx` 再写一份 bio）。

### 添加站内动态
编辑 `src/data/news.ts` 的 `manualNews`。

### 更新学生 / 项目 / 数据产品
分别编辑对应 `src/data/*` 文件。数据产品填 `paperId` 即可站内跳转论文详情。

### 更新个人简历
PDF 放入 `public/Wenfang-CV-2025.pdf`；链接须用相对路径。

### Google Scholar
`profile.social.scholar` 指向个人 Citations 主页：`https://scholar.google.com/citations?user=5HyaDhsAAAAJ&hl=zh-CN`。

## 部署

推送 `main` 后，`.github/workflows/deploy.yml` 自动构建并发布到 GitHub Pages。

## 联系方式

- 邮箱：luwf6@sysu.edu.cn
- 地址：珠海市香洲区唐家湾中山大学珠海校区

## 许可证

本项目为个人学术主页，仅供学习和研究使用。

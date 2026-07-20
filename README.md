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
                                ├── 调用 publications.ts 中的统计函数
                                └── 组合 components/* 展示模块
```

**核心设计要点：**

| 层次 | 职责 |
|------|------|
| `src/data/` | 唯一内容源：个人信息、论文、学生、项目、数据产品 |
| `src/pages/` | 路由页面，负责布局与数据展示逻辑 |
| `src/components/` | 可复用 UI 模块（轮播、导航、页脚等） |
| `src/contexts/` | 全局状态（中英文切换） |
| `public/` | 静态资源，构建时原样复制到 `dist/` |

**路由：** 使用 `HashRouter`（URL 形如 `/#/publications`），配合 `vite.config.ts` 中 `base: './'`，适配 GitHub Pages 子路径部署。

**统计数字：** 首页论文数量由 `getFirstOrCorrespondingAuthorPublications()`、`getQ2AbovePublications()` 等函数从 `publications.ts` 动态计算，无需手写计数。

## 文件树

```
personal/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages 自动部署
├── public/                     # 静态资源（不经过打包处理）
│   ├── Wenfang-CV-2025.pdf     # 个人简历 PDF
│   └── images/                 # 图片资源
│       ├── hero-*.png/jpg      # 首页轮播图
│       ├── he-2026-olar-figure2.png
│       ├── zelda_style_图.jpg  # 学生毕业照（风格化）
│       └── 原图.jpg            # 学生毕业照（原图）
├── src/
│   ├── main.tsx                # React 入口
│   ├── App.tsx                 # 根组件：路由、主题、语言 Provider
│   ├── App.css
│   ├── index.css               # Tailwind 全局样式
│   ├── components/
│   │   ├── Layout.tsx          # 页面骨架（Navbar + Outlet + Footer）
│   │   ├── Navbar.tsx          # 顶部导航
│   │   ├── Footer.tsx          # 页脚
│   │   ├── HeroCarousel.tsx    # 首页大图轮播
│   │   ├── PublicationsCarousel.tsx  # 首页论文轮播
│   │   ├── StudentsCarousel.tsx      # 首页学生轮播
│   │   └── ui/                 # shadcn/ui 基础组件（Button、Card 等）
│   ├── contexts/
│   │   └── LanguageContext.tsx # 中英文切换与翻译文案
│   ├── data/                   # ★ 网站内容数据（主要维护入口）
│   │   ├── index.ts            # 统一导出
│   │   ├── profile.ts          # 个人基本信息、简介、荣誉
│   │   ├── publications.ts     # 论文列表与统计函数
│   │   ├── students.ts         # 学生信息（中大/福大/本科生）
│   │   ├── projects.ts         # 科研项目
│   │   └── dataProducts.ts     # 数据产品与著作
│   ├── pages/
│   │   ├── Home.tsx            # 首页
│   │   ├── Publications.tsx    # 论文列表
│   │   ├── PublicationDetail.tsx # 论文详情
│   │   ├── Students.tsx        # 学生团队
│   │   ├── StudentDetail.tsx   # 学生详情
│   │   ├── Projects.tsx        # 科研项目
│   │   ├── DataProducts.tsx    # 数据产品
│   │   └── Contact.tsx         # 联系方式
│   ├── hooks/
│   │   └── use-mobile.ts
│   └── lib/
│       └── utils.ts            # 工具函数（cn 等）
├── index.html
├── vite.config.ts              # Vite 配置（base: './'）
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

> 构建产物输出至 `dist/`；`node_modules/` 为依赖目录，不纳入版本管理说明。

## 页面与路由

| 路由 | 页面文件 | 说明 |
|------|----------|------|
| `/#/` | `Home.tsx` | 个人简介、学术统计、轮播、快捷入口；代表性奖励为 3+2 卡片布局 |
| `/#/publications` | `Publications.tsx` | 按年份分组的论文列表 |
| `/#/publications/:id` | `PublicationDetail.tsx` | 单篇论文详情、相关链接、媒体报道 |
| `/#/students` | `Students.tsx` | 学生团队（按学校/学位分类） |
| `/#/students/:id` | `StudentDetail.tsx` | 学生详情、成果、获奖、毕业照 |
| `/#/projects` | `Projects.tsx` | 主持/参与的科研项目 |
| `/#/data-products` | `DataProducts.tsx` | 开源数据产品与著作 |
| `/#/contact` | `Contact.tsx` | 联系方式 |

## 数据文件说明

### `profile.ts`
个人姓名、单位、联系方式、社交链接、荣誉、研究兴趣、教育经历及简介文案。荣誉含 OLAR 优秀青年编委等；首页简介（`Home.tsx` 中 `bioText`）需与此处同步维护。

### `publications.ts`
- 每篇论文含作者、期刊、DOI、摘要、亮点、图表、新闻链接等
- `isFirstAuthor` / `isCorrespondingAuthor`：第一/通讯作者标记
- `isCasZone2Above`：中科院二区及以上标记（优先于 JCR `quartile` 用于统计）
- `firstAuthorId`：关联学生详情页（如 `he-jiangnan`）
- 统计函数：`getFirstOrCorrespondingAuthorPublications()`、`getQ2AbovePublications()` 等

### `students.ts`
- 三类学生：`sysuStudents`（中大研究生）、`fzuStudents`（福大研究生）、`sysuUndergraduates`（本科生）
- 支持 `photo` / `photoOriginal`（毕业照悬停/点击切换）
- `status`: `"current"` | `"graduated"`

### `projects.ts` / `dataProducts.ts`
科研项目与数据产品的结构化列表。

## 技术栈

- **框架**：React 19 + TypeScript
- **构建**：Vite 7
- **路由**：React Router DOM 7（HashRouter）
- **样式**：Tailwind CSS 3 + shadcn/ui（Radix UI）
- **轮播**：Embla Carousel
- **图标**：Lucide React
- **主题**：next-themes（明暗模式）
- **部署**：GitHub Actions → GitHub Pages

## 快速开始

```bash
npm install
npm run dev      # 开发：http://127.0.0.1:5173（vite.config 已固定绑定 IPv4）
npm run build    # 生产构建 → dist/
npm run preview  # 预览构建结果
npm run lint     # ESLint 检查
```

> 若出现 `ERR_CONNECTION_REFUSED`（访问 127.0.0.1:5173），先确认 `npm run dev` 仍在运行；本仓库已配置 `server.host: '127.0.0.1'`，避免仅监听 IPv6 `::1` 导致 IPv4 连接被拒绝。

## 内容维护指南

### 添加论文
编辑 `src/data/publications.ts`，在 `publications` 数组头部插入新条目。首页统计会自动更新；若中科院分区未达二区，设置 `isCasZone2Above: false`。

### 更新学生信息
编辑 `src/data/students.ts`。毕业照图片放入 `public/images/`，配置 `photo` 与 `photoOriginal` 字段。

### 更新个人简历
将 PDF 放入 `public/Wenfang-CV-2025.pdf`（或同步修改 `Home.tsx` 中的下载链接）。链接须用相对路径（如 `Wenfang-CV-2025.pdf`），勿用以 `/` 开头的绝对路径，否则在 GitHub Pages 子路径（`/personal/`）下会 404。

### 添加静态图片
放入 `public/images/`，页面中以 `images/文件名` 引用（相对路径，兼容 GitHub Pages）。

### 多语言
`LanguageContext.tsx` 管理全局语言；各页面通过 `useLanguage()` 的 `t()` 获取翻译，部分文案在组件内按 `language === 'zh'` 分支编写。

## 部署

推送至 `main` 分支后，`.github/workflows/deploy.yml` 自动执行 `npm ci && npm run build`，将 `dist/` 发布到 GitHub Pages。

## 联系方式

- 邮箱：luwf6@sysu.edu.cn
- 地址：珠海市香洲区唐家湾中山大学珠海校区

## 许可证

本项目为个人学术主页，仅供学习和研究使用。

# 个人学术网站

一个现代化的个人学术主页项目，展示学术研究成果、学生信息、科研项目等内容。

## 项目简介

本项目是中山大学海洋科学学院卢文芳副教授的个人学术网站，采用现代化的前端技术栈构建，提供美观、响应式的用户界面，支持中英文双语切换。

## 核心功能

- **首页展示**：个人简介、研究兴趣、学术统计数据、轮播图展示
- **出版物**：学术论文列表展示及详情页面
- **学生信息**：指导学生的信息展示
- **数据产品**：科研数据产品展示
- **科研项目**：科研项目信息展示
- **联系方式**：联系表单和信息展示

## 技术栈

- **框架**：React 19 + TypeScript
- **构建工具**：Vite 7
- **路由**：React Router DOM 7
- **样式**：Tailwind CSS 3
- **UI组件库**：shadcn/ui (基于 Radix UI)
- **轮播组件**：Embla Carousel
- **图标**：Lucide React
- **表单处理**：React Hook Form + Zod
- **主题切换**：next-themes
- **图表**：Recharts

## 项目特性

- ✅ 响应式设计，支持移动端和桌面端
- ✅ 中英文双语支持
- ✅ 主题切换（明暗模式）
- ✅ 现代化UI设计
- ✅ 轮播图展示
- ✅ 路由导航
- ✅ TypeScript 类型安全

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 `http://localhost:5173` 查看项目

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

## 项目结构

```
src/
├── components/          # 组件目录
│   ├── ui/             # UI基础组件
│   ├── HeroCarousel.tsx
│   ├── PublicationsCarousel.tsx
│   ├── StudentsCarousel.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── Layout.tsx
├── contexts/            # React Context
│   └── LanguageContext.tsx
├── data/                # 数据文件
│   ├── profile.ts       # 个人信息
│   ├── publications.ts  # 出版物数据
│   ├── students.ts     # 学生数据
│   ├── projects.ts     # 项目数据
│   └── dataProducts.ts # 数据产品
├── pages/               # 页面组件
│   ├── Home.tsx
│   ├── Publications.tsx
│   ├── Students.tsx
│   ├── Projects.tsx
│   ├── DataProducts.tsx
│   └── Contact.tsx
├── hooks/               # 自定义Hooks
├── lib/                 # 工具函数
└── main.tsx            # 入口文件
```

## 主要页面

- `/` - 首页
- `/publications` - 出版物列表
- `/publications/:id` - 出版物详情
- `/students` - 学生列表
- `/students/:id` - 学生详情
- `/projects` - 科研项目
- `/data-products` - 数据产品
- `/contact` - 联系方式

## 开发说明

### 添加新内容

- 修改 `src/data/` 目录下的数据文件来更新内容
- 个人信息：编辑 `src/data/profile.ts`
- 出版物：编辑 `src/data/publications.ts`
- 学生信息：编辑 `src/data/students.ts`
- 项目信息：编辑 `src/data/projects.ts`

### 多语言支持

项目使用 `LanguageContext` 管理语言状态，支持中英文切换。翻译文本在组件中通过 `useLanguage` hook 获取。

### 主题配置

主题配置通过 `ThemeProvider` 管理，支持明暗模式切换。

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 许可证

本项目为个人项目，仅供学习和研究使用。

## 联系方式

- 邮箱：luwf6@sysu.edu.cn
- 地址：珠海市香洲区唐家湾中山大学珠海校区

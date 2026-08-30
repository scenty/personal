# Agent 工作记录

## 2026-08-30：补充国自然面上项目（2027–2030）

### 说明
列表中已有国家自然科学青年基金、广东省自然基金面上项目；本次新增主持的**国家自然科学基金面上项目**。

### 处理
1. `projects.ts` 数组头部新增 `project-8`：南海三维温盐流智能预报-重建中的“硬编码”物理约束及可解释性研究；主持；2027–2030；进行中（未给批准号/经费，未填）
2. 简介与项目页导语同步为「面上项目/青年基金」：`profile.ts`、`LanguageContext.tsx`

### 相关文件
`src/data/projects.ts`、`src/data/profile.ts`、`src/contexts/LanguageContext.tsx`、`README.md`

---

## 2026-08-30：为 OE 论文补充关键图与公众号外链

### 说明
延续 2026-08-20 录入的 `yang-2026-oe`（杨光宇一作，通讯卢文芳*、董昌明*，陈大可参与）。sync-news 抓到的董昌明/陈大可合作稿即该文新闻通稿。

### 处理
1. 从公众号「海洋知圈」「观海临风」正文摘图1（NWM 混合框架），写入 `public/images/yang-2026-oe-figure1.png`（作者肖像未收录）
2. `publications.ts` 按 OLAR 论文写法补 `figures` 与 `newsCoverage`（海洋知圈 / 观海临风 / happy科研）

### 相关文件
`src/data/publications.ts`、`public/images/yang-2026-oe-figure1.png`、`README.md`

---

## 2026-08-30：排查并修复 sync-news 遗漏微信 MCC2026 喜报

### 问题
`https://mp.weixin.qq.com/s/rqgsJDsYVHudRCTd5uOLQw`（喜报丨我院学子在MCC2026海洋计算挑战赛中获得佳绩，发布 2026-08-29）未以原始链接出现在同步结果中。

### 根因
1. **学院官网未转载**：`marine.sysu.edu.cn/search/all?keys=卢文芳` 无此文。
2. **公众号无 API**：脚本只走搜狗第一页。同标题已被抓到，但链接是 `weixin.sogou.com/link?...`；`stripTags` 把 `<em>` 换成空格，标题变形；无 `date`，`MCC2026` 又不匹配 `\b(20\d{2})\b`，`newsSortKey=0`，首页只取前 5 条因此看不见。

### 处理
1. `sync-news.mjs`：搜狗翻 3 页；去注释/`<em>` 再剥标签；解析 `timeConvert` 时间戳；用页面现行 k/h 算法解开 `mp.weixin.qq.com`；按标题去重（种子优先）；学院摘要补日期。
2. `news.ts`：年份匹配改为可识别 `MCC2026` 这类粘连年份。
3. MCC 短链写入 `SEED_NEWS`（搜狗签名链会过期，同标题以种子为准）。已 `npm run sync-news`，该条现为列表时间序第一。

### 相关文件
`scripts/sync-news.mjs`、`src/data/syncedNews.json`、`src/data/news.ts`、`README.md`

---

## 2026-08-20：为 JMS / OE 两篇新文补充关键词与亮点

### 处理
依据桌面 PDF 全文：关键词取自 ARTICLE INFO；亮点据摘要与 Conclusion 提炼（中英各 4 条），写入 `yang-2026-oe`、`he-2026-jms`。

### 相关文件
`src/data/publications.ts`、`AgentRecord.md`

---

## 2026-08-20：补充何江南 JMS、杨光宇 Ocean Engineering 两篇最新论文

### 处理
1. `publications.ts` 数组头部新增：
   - `yang-2026-oe`：Ocean Engineering 366:127556，DOI `10.1016/j.oceaneng.2026.127556`；通讯卢文芳*、董昌明*；中科院一区；IF 5.5；Zenodo + NeuralWave-Mini
   - `he-2026-jms`：Journal of Marine Systems 257:104278，DOI `10.1016/j.jmarsys.2026.104278`；通讯卢文芳*、来志刚*；中科院三区（`isCasZone2Above: false`）；IF 2.5；Zenodo 代码/数据
2. `students.ts`：何江南、杨光宇 `publications` 分别追加对应引用串，并保留原有条目
3. 按确认：不写摘要；中文作者用张丽、郭东浩、蒋浩宇、陈大可

### 相关文件
`src/data/publications.ts`、`src/data/students.ts`、`README.md`

---

## 2026-07-21：青年教师站展示更新（全日合并）

### 内容与功能
- **Profile 唯一源**：简介/奖励读 `profile.ts`；首页展示教育经历、学术任职（后去掉「人才计划」列，3+2 奖励保留）
- **新页面**：`/#/teaching`、`/#/news`；论文详情支持复制引用/BibTeX；数据产品 `paperId` 站内链；项目补周期与相关论文；学生待补充字段清理
- **动态同步**：`npm run sync-news` 全文检索学院官网（`/search/all?keys=卢文芳`）+ 搜狗微信；写入 `syncedNews.json`；`getAllNews()` 按时间新→旧，首页取最新 5 条
- **外链/SEO**：Google Scholar → `citations?user=5HyaDhsAAAAJ`；Contact/Footer 外链补齐；`index.html` OG + Person JSON-LD；多页 i18n
- **TS**：移除已弃用 `baseUrl`

### 界面收束
- 顶栏去掉教学/动态/数据产品（页面仍可由首页快捷入口访问）
- 简介区按钮仅保留「联系我」「个人简历」

### 主要文件
`src/data/*`、`src/pages/*`、`Navbar`/`Footer`、`LanguageContext`、`App.tsx`、`index.html`、`scripts/sync-news.mjs`、`tsconfig*.json`、`README.md`

### 后续（可选）
项目精确经费；本科生更细课题/照片；定期 `npm run sync-news` 后提交 JSON

### 补充（同日）
录入公众号动态：[海科院新闻 | 我院助力国产期刊 OLAR 高质量发展](https://mp.weixin.qq.com/s/HYDal3DNTqrgERsFQE2bzw)（2026-07-21），写入 `syncedNews.json` 与 `sync-news` 种子。

---

## 2026-07-20：加入夜间模式（按时段默认 + 右上角切换）

### 说明
README 曾写明暗主题，但 `ThemeProvider` 默认锁死 `light`，导航栏也无切换入口，夜间模式实际未启用。

### 处理
1. `theme-provider.tsx`：无本地偏好时按本地时间 19:00–06:59 默认夜间，否则日间；提供 `toggleTheme`
2. `index.html` 内联脚本首屏前写入 class，避免主题闪烁
3. `Navbar` 右上角增加月亮/太阳一键切换（移动端菜单同步）
4. 首页与主要页面硬编码浅色区块补充 `dark:` 样式

### 相关文件
- `src/components/ui/theme-provider.tsx`
- `src/components/Navbar.tsx`
- `index.html` / `src/App.tsx` / `src/index.css`
- `src/pages/Home.tsx` 等页面与轮播组件
- `README.md`

---

## 2026-07-20：修复 GitHub Pages 简历 PDF 无法下载

### 问题
线上点击个人简历跳转 `https://scenty.github.io/Wenfang-CV-2025.pdf`，显示没有文件（404）。

### 根因
`Home.tsx` 使用绝对路径 `href="/Wenfang-CV-2025.pdf"`，在用户站点根解析，而项目部署在 `https://scenty.github.io/personal/`。PDF 实际存在于 `https://scenty.github.io/personal/Wenfang-CV-2025.pdf`（HTTP 200）。

### 处理
将链接改为相对路径 `Wenfang-CV-2025.pdf`，与图片等静态资源一致，兼容 `base: './'`。

### 相关文件
- `src/pages/Home.tsx`
- `README.md`

### 后续
需推送 `main` 并由 GitHub Actions 重新部署后生效。

---

## 2026-07-20：代表性奖励卡片改为 3+2，新增 OLAR 优秀青年编委

### 说明
延续「首页简介补充 OLAR优秀青年编委」：将代表性奖励由 2×2 改为 3+2 布局，并在卡片中展示该奖项。

### 处理
1. `Home.tsx` awards 增至 5 项，加入「OLAR优秀青年编委」
2. 奖励区改用 `sm:grid-cols-6` + `col-span-2` / 第 4 项 `col-start-2`，实现上行 3、下行 2 居中

### 相关文件
- `src/pages/Home.tsx`

---

## 2026-07-20：首页简介补充「OLAR优秀青年编委」

### 处理
1. 在 `Home.tsx` 个人简介获奖列表中补充「OLAR优秀青年编委」（中英文同步）
2. 同步更新 `profile.ts` 的 `bio` 与 `awards` 数据

### 相关文件
- `src/pages/Home.tsx`
- `src/data/profile.ts`

---

## 2026-07-20：修复本地开发 ERR_CONNECTION_REFUSED（5173）

### 问题
访问 `http://127.0.0.1:5173/` 出现 `ERR_CONNECTION_REFUSED`（Error Code: -102）。

### 根因
Vite 默认只监听 IPv6 回环地址 `[::1]:5173`，未绑定 IPv4 `127.0.0.1`，因此访问 `127.0.0.1` 会被拒绝。

### 处理
1. 在 `vite.config.ts` 增加 `server.host: '127.0.0.1'`、`port: 5173`、`strictPort: true`
2. 结束旧 node 进程并重新执行 `npm run dev`
3. 验证：`127.0.0.1:5173` 已 LISTENING，HTTP 返回 200

### 相关文件
- `vite.config.ts`

### 后续
后台 `npm run dev` 任务曾被中断，但进程仍在监听 `127.0.0.1:5173` 并返回 HTTP 200。

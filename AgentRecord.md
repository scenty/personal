# Agent 工作记录

## 2026-11-24：删减新闻并改两条获奖链接

### 处理
1. 从 `syncedNews.json` 删除：硕士奖助金公示（article/10891）、大创院级培育名单（article/10543）、开放年会第四轮通知（article/10575）、观海临风签名链、2024 年 3–4 月教职工生日会。观海临风同时从 `yang-2026-oe` 的报道列表去掉，避免新闻页再汇总出来。`sync-news.mjs` 用链接和标题排除，避免下次同步加回。
2. 「获聘 OLAR 优秀青年编委」改为打开 [我院助力国产期刊 OLAR 高质量发展](https://mp.weixin.qq.com/s/HYDal3DNTqrgERsFQE2bzw)（2026-07-21）。与原论坛稿同一链接，列表只保留青年编委这一条。
3. 「我心目中的良师」改为打开 [2025 年 6–9 月生日会暨良师表彰](https://mp.weixin.qq.com/s/IU0e7lYDrGlxrcVdy9SMDA)（2025-09-15）。
4. 「深蓝」拔尖班的失效签名链换成 [MWhhaC76-nMOPc42D_Qlpg](https://mp.weixin.qq.com/s/MWhhaC76-nMOPc42D_Qlpg)（2026-08-22），并写入种子。

### 相关文件
`src/data/news.ts`、`src/data/syncedNews.json`、`src/data/publications.ts`、`scripts/sync-news.mjs`、`README.md`

---

## 2026-11-24：顶栏文案改为新闻动态并前移

### 处理
顶栏中文由「动态」改为「新闻动态」，顺序放到「科研项目」之前：首页 · 研究成果 · 学生团队 · 新闻动态 · 科研项目。页面标题仍为「动态」。

### 相关文件
`src/components/Navbar.tsx`、`src/contexts/LanguageContext.tsx`、`README.md`

---

## 2026-11-24：顶栏用动态替换联系方式

### 处理
顶栏（桌面与移动菜单）去掉「联系方式」，同一位置改为「动态」（`/#/news`）。联系方式页面仍保留，首页、学生页和页脚可以进入。

### 相关文件
`src/components/Navbar.tsx`、`README.md`

---

## 2026-11-24：新动态、修正海洋知圈失效链、首页动态活页

### 说明
用户给出新稿，并指出两条搜狗签名链打开后是微信「参数错误」。其中海洋知圈海浪智能模式稿的稳定短链由用户直接提供，停止继续检索。

### 处理
1. 新稿 [珠海市人工智能海洋学重点实验室获批](https://mp.weixin.qq.com/s/0Qk67UgwgrJs6ROsOPu2RA)（海洋知圈，2026-11-23 22:03）：卢文芳任实验室副主任 → `wx-zhuhai-ai-ocean-lab-20261123`，`type: award`
2. 海洋知圈旧链（`timestamp=1788101814` / `w8yy…`）打开为「参数错误」。改为短链 [H6et6892yKizVcq7bR-TRw](https://mp.weixin.qq.com/s/H6et6892yKizVcq7bR-TRw)，标题与发布日核对为 2026-08-23 22:06。`syncedNews.json`、`publications.ts` 的 `yang-2026-oe` 报道、`SEED_NEWS` 同步
3. 首页学生团队轮播下方增加动态活页，整页链到 `/news`，纸页上列出最新 3 条
4. happy科研那条签名链（`lGnx…`）仍会打开「参数错误」，本次没有替换短链

### 相关文件
`src/data/syncedNews.json`、`src/data/publications.ts`、`scripts/sync-news.mjs`、`src/pages/Home.tsx`、`README.md`

---

## 2026-11-18：科研项目补相关论文（重点研发 / 广东省面上）

### 说明
`projects.ts` 中重点研发（project-1）原无 `relatedPublicationIds`；广东省面上（project-2）仅有 `he-2026-olar`。国自然面上（project-8，2027–2030）本次未挂文。

### 处理
1. project-1（科技部重点研发）：`liu-2024-om`、`yang-2026-oe`、`yang-2026-sciadv`
2. project-2（广东省自然基金面上）：在原有基础上追加 `huang-2026-grl`；周期由 `2023–2026` 更正为 `2024–2027`
3. project-4（珠江口中华白海豚）：周期改为 `2023`，状态改为 `completed`（已结题）

### 相关文件
`src/data/projects.ts`、`README.md`

---

## 2026-11-18：补充两则最新公众号动态（厦大系友报告 / 全重倡议上台）

### 说明
延续既有「公众号短链写入 `SEED_NEWS` + `syncedNews.json`」流程（参见 2026-10-06、2026-08-30、2026-07-21）。本次为两条新链接，非重复录入。

### 处理
1. [厦大物海系友返校](https://mp.weixin.qq.com/s/UdE7cuXNsmcYHuXzID23cg)（发布 2026-11-06，厦门大学海洋与地球学院）：2013 级系友卢文芳主题报告与现场照片 → `wx-xmu-alumni-20261106`，`type: talk`
2. [17 家全重 AI 赋能海洋观探测倡议](https://mp.weixin.qq.com/s/sugqKIyqSBOnRv_8rRCsYw)（发布 2026-11-18，智慧海洋；会议 11-15 杭州）：正文未点名，按本人说明「代表工业产品适应性全重上台」写入 snippet → `wx-ai-ocean-labs-20261118`，`type: talk`
3. 两条置顶写入 `syncedNews.json` 与 `scripts/sync-news.mjs` 的 `SEED_NEWS`（种子优先，避免搜狗签名链覆盖）

### 相关文件
`src/data/syncedNews.json`、`scripts/sync-news.mjs`、`README.md`

---

## 2026-11-02：Science Advances 论文补图1（NeuralSWM 示意图）

### 处理
1. 从 `NeuralSWM-Manu.pdf` 提取内嵌 Fig.1 位图（PDF 第3页 Image76，1311×628 JPEG，DCTDecode），原字节直存 `public/images/yang-2026-sciadv-figure1.jpg`（132 KB，未二次编码）。做法：正则解析 PDF 对象 + 按 `/Length` 切 stream，无需 PyMuPDF/poppler。
2. `publications.ts` 的 `yang-2026-sciadv` 仿 OLAR 补 `figures`（中英 caption，取自稿件 Fig.1 说明）。
3. 顺带修正 `he-2026-olar` 图路径：`/images/...` → `images/...`，绝对路径在 GitHub Pages 子路径下会 404。两篇图片现均正常加载。

### 验证
`npm run build` 通过；本地实测 SA 详情页图 1311×628 正常渲染、OLAR 图 1865×1415 正常；`dist/images` 已含新图。

### 备注
PDF 第1页另有 799×166 的 Science Advances 刊头图（obj 46），未采用。

---

## 2026-11-02：录入 Science Advances 接收论文（in press）

### 说明
杨光宇共同一作的 NeuralSWM 论文被 *Science Advances* 接收，尚未正式出版，无 DOI。据桌面 `NeuralSWM-Manu.pdf` 录入。首次改动被「同步最新页面」覆盖，已在最新代码（含 `huang-2026-grl`）上重做。

### 处理
1. `publications.ts` 数组头部新增 `yang-2026-sciadv`：Physics-embedded Neural Spectral Wave Model；作者「杨光宇†，姜浩宇†，卢文芳*，王栋」（前两位共同一作）；通讯卢文芳；中科院一区/Q1；`status: "in press"`；`firstAuthorId: "yang-guangyu"`
2. `Publication` 接口：`doi` 改为可选，新增 `status?`；引用/BibTeX 在无 DOI 时不再拼接 `doi.org/undefined`，有 status 时写入 `note`
3. 显示层统一为「期刊名 (in press)」：`Publications.tsx`（列表/年份视图）、`PublicationDetail.tsx`（正文与相关论文）、`PublicationsCarousel.tsx`（首页）
4. 补中英文摘要（英文取自稿件）、各 4 条亮点、中英文关键词；未填 IF（待正式出版）
5. `students.ts`：杨光宇 `publications` 置顶追加「Yang et al. (2026) Science Advances (in press)」，学生详情可回链论文页

### 相关文件
`src/data/publications.ts`、`src/data/students.ts`、`src/pages/Publications.tsx`、`src/pages/PublicationDetail.tsx`、`src/components/PublicationsCarousel.tsx`、`README.md`

### 验证
`npm run build` 通过；中英文下论文列表/详情/首页轮播、杨光宇学生页回链均正常。本地预览时 5173 端口被前次残留进程占用（新启的 vite 报 `Port 5173 is already in use`），已清理，端口现空闲。

> 经验：`npm run dev` 会派生 `npm` 与 `vite` 两个 node 进程，只结束 `npm`（PID 40000）会留下 `vite`（PID 3888）继续占端口。清理需按 `Win32_Process` 的 CommandLine 匹配 `vite` 一并结束。

### 后续
正式出版后补 DOI、卷期页码，去掉 `status`，并同步 IF；如需首页动态可加一条 `manualNews`。另：`buildBibtex` 把英文作者逗号当分隔符，会拆成 `Yang and G.† and …`，需结构化作者数组才能修。

---

## 2026-10-06：黄南翔入学、GRL 论文、国家奖学金与 MCC2026

### 说明
黄南翔原记为本科、拟保送。本次改为 2026 年入学硕士，并补 GRL 一作论文、国家奖学金，以及四人 MCC2026 海浪奖。学院检索与用户给出的四条公众号已写入动态。

### 处理
1. `students.ts`：黄南翔 `degree` 改为硕士、`year: 2026`；代表性成果指向 GRL；奖项增加国家奖学金与 MCC2026。杨光宇、方希泓、孙浩宸同步 MCC2026（海浪奖 / 全国三等奖），链到喜报与技术纪实。
2. `publications.ts` 头部新增 `huang-2026-grl`（DOI `10.1029/2026GL123584`，通讯卢文芳*，`firstAuthorId: huang-nanxiang`）。OE、OLAR 论文补学院/公众号报道。
3. 动态：公众号四条写入 `syncedNews.json` 与 `sync-news.mjs` 的 `SEED_NEWS`。学院新稿为科研动态（175）（2026-09-07，[article/10910](https://marine.sysu.edu.cn/article/10910)）和 2026 学年硕士奖助金材料公示（2026-08-14，[article/10891](https://marine.sysu.edu.cn/article/10891)，名单含杨光宇、郑钰娇，不含黄南翔，也未写国家奖学金）。

### 公众号
- [科研动态（180）](https://mp.weixin.qq.com/s/u3amdftGHHmze_lbkcjLFg) 2026-10-04
- [MCC2026 技术攻坚纪实](https://mp.weixin.qq.com/s/vu8XwwZ6rm_qVohFF0dcKA) 2026-09-20
- [科研动态（175）](https://mp.weixin.qq.com/s/oUT3uL43K4dvXj0h9WN5Kg) 2026-09-06
- [MCC2026 喜报](https://mp.weixin.qq.com/s/rqgsJDsYVHudRCTd5uOLQw) 2026-08-29（2026-08-30 已入库，本次补学生奖项）

### 相关文件
`src/data/students.ts`、`src/data/publications.ts`、`src/data/syncedNews.json`、`scripts/sync-news.mjs`、`README.md`

---

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

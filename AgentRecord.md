# Agent 工作记录

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

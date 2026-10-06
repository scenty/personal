/**
 * 同步含关键词「卢文芳」的公开报道到 src/data/syncedNews.json
 *
 * 策略（全文检索，不要求标题含关键词）：
 * 1. 学院官网 /search/all?keys=…（Drupal 全文检索，稳定）
 * 2. 搜狗微信检索（公众号无官方 API，可能风控）
 * 3. 解开搜狗跳转链为 mp.weixin.qq.com，并写入发布日期
 * 4. 对学院结果再拉正文，确认全文出现关键词后写入
 * 5. 种子链接保证离线也有可用条目
 *
 * 用法：node scripts/sync-news.mjs
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '../src/data/syncedNews.json');
const KEYWORD = '卢文芳';
const COLLEGE_BASE = 'https://marine.sysu.edu.cn';
const SOGOU_PAGES = 3;
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

function stripTags(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function decodeHtml(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&ldquo;/g, '“')
    .replace(/&rdquo;/g, '”')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&middot;/g, '·')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

/** 搜狗高亮是 <em><!--red_beg-->词<!--red_end--></em>，先去注释和 em 再剥标签，避免标题被插入空格 */
function cleanSogouText(html) {
  const withoutComments = String(html || '').replace(/<!--[\s\S]*?-->/g, '');
  const withoutEm = withoutComments.replace(/<\/?em[^>]*>/gi, '');
  return decodeHtml(stripTags(withoutEm));
}

async function fetchText(url, extraHeaders = {}) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': UA,
      Accept: 'text/html,application/xhtml+xml',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      ...extraHeaders,
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  return res.text();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function cookieHeader(res) {
  const parts = res.headers.getSetCookie?.() || [];
  return parts.map((c) => c.split(';')[0]).join('; ');
}

/** unix 秒（上海时区）或正文里的 2026年2月2日 / 2026-02-02 */
function extractNewsDate(text, unixSeconds) {
  if (unixSeconds) {
    const iso = new Date(Number(unixSeconds) * 1000).toLocaleString('en-CA', {
      timeZone: 'Asia/Shanghai',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return iso.slice(0, 10);
  }
  if (!text) return undefined;
  const fullZh = text.match(/(\d{4})\s*年\s*(\d{1,2})\s*月\s*(\d{1,2})\s*日/);
  if (fullZh) {
    return `${fullZh[1]}-${String(fullZh[2]).padStart(2, '0')}-${String(fullZh[3]).padStart(2, '0')}`;
  }
  const iso = text.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (iso) {
    return `${iso[1]}-${String(iso[2]).padStart(2, '0')}-${String(iso[3]).padStart(2, '0')}`;
  }
  return undefined;
}

/** 学院官网全文检索结果解析 */
async function fetchCollegeSearchHits() {
  const url = `${COLLEGE_BASE}/search/all?keys=${encodeURIComponent(KEYWORD)}`;
  const html = await fetchText(url);
  const items = [];

  const cardRe =
    /class="[^"]*search-list-content[^"]*"[\s\S]*?class="[^"]*search-list-title[^"]*"[\s\S]*?<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>[\s\S]*?class="[^"]*search-list-text[^"]*"[^>]*>([\s\S]*?)<\/div>/gi;
  let m;
  while ((m = cardRe.exec(html))) {
    const href = m[1];
    const title = decodeHtml(stripTags(m[2]));
    const snippet = decodeHtml(stripTags(m[3]));
    if (!href.includes('/article/')) continue;
    items.push({
      path: href.startsWith('http') ? href.replace(COLLEGE_BASE, '') : href,
      title,
      snippet,
    });
  }

  if (items.length === 0) {
    const linkRe = /href="(\/article\/\d+)"[^>]*>([\s\S]*?)<\/a>/gi;
    while ((m = linkRe.exec(html))) {
      const title = decodeHtml(stripTags(m[2]));
      if (title.length < 4) continue;
      items.push({ path: m[1], title, snippet: '' });
    }
  }

  return [...new Map(items.map((i) => [i.path, i])).values()];
}

/** 打开正文做全文确认（标题可不含关键词） */
async function confirmKeywordInArticle(path) {
  const url = path.startsWith('http') ? path : `${COLLEGE_BASE}${path}`;
  const html = await fetchText(url);
  const text = decodeHtml(stripTags(html));
  return text.includes(KEYWORD);
}

async function fetchCollegeNews() {
  const hits = await fetchCollegeSearchHits();
  console.log(`[sync-news] college search hits: ${hits.length}`);
  const confirmed = [];
  for (const hit of hits) {
    const ok = await confirmKeywordInArticle(hit.path);
    await sleep(200);
    if (!ok) {
      console.log(`[sync-news] skip (no keyword in body): ${hit.title}`);
      continue;
    }
    const idNum = (hit.path.match(/\/article\/(\d+)/) || [])[1] || hit.path;
    const date = extractNewsDate(hit.snippet);
    confirmed.push({
      id: `sysu-article${idNum}`,
      title: hit.title,
      date,
      link: `${COLLEGE_BASE}${hit.path.startsWith('/') ? hit.path : `/${hit.path}`}`,
      source: '中山大学海洋科学学院',
      sourceEn: 'School of Marine Sciences, SYSU',
      type: 'media',
      channel: 'college',
      snippet: hit.snippet || undefined,
    });
  }
  return confirmed;
}

function parseSogouSearchPage(html) {
  const items = [];
  const boxRe = /<li[^>]*id="sogou_vr_11002601_box_\d+"[^>]*>([\s\S]*?)<\/li>/gi;
  let box;
  while ((box = boxRe.exec(html))) {
    const block = box[1];
    const titleM = block.match(
      /<h3[^>]*>\s*<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>\s*<\/h3>/i,
    );
    if (!titleM) continue;
    const title = cleanSogouText(titleM[2]);
    if (title.length < 6) continue;
    const snippetM = block.match(/class="txt-info"[^>]*>([\s\S]*?)<\/p>/i);
    const accountM = block.match(/class="all-time-y2"[^>]*>([\s\S]*?)<\/span>/i);
    const timeM = block.match(/timeConvert\('(\d+)'\)/);
    let link = titleM[1].replace(/&amp;/g, '&');
    if (link.startsWith('/')) link = `https://weixin.sogou.com${link}`;
    items.push({
      title,
      snippet: snippetM ? cleanSogouText(snippetM[1]) : '',
      account: accountM ? cleanSogouText(accountM[1]) : '',
      unix: timeM ? timeM[1] : '',
      sogouLink: link,
    });
  }
  return items;
}

function sogouKhOffset(html) {
  const m = html.match(/substr\(a\+(\d+)\+parseInt\("(\d+)"\)\+b/);
  if (m) return Number(m[1]) + Number(m[2]);
  const alt = html.match(/substr\(a\+(\d+)\+b/);
  if (alt) return Number(alt[1]);
  return 25;
}

/** 搜狗 /link 页用 JS 拼接 mp.weixin.qq.com；点击时会带随机 k/h 参数 */
async function resolveSogouArticleUrl(sogouLink, cookie, referer, khOffset) {
  const b = Math.floor(100 * Math.random()) + 1;
  let url = sogouLink;
  const idx = url.indexOf('url=');
  if (idx !== -1 && !url.includes('&k=')) {
    const h = url.substr(idx + khOffset + b, 1);
    url = `${url}&k=${b}&h=${h}`;
  }
  const res = await fetch(url, {
    headers: {
      'User-Agent': UA,
      Accept: 'text/html,application/xhtml+xml',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      Cookie: cookie,
      Referer: referer,
    },
    redirect: 'manual',
  });
  if (res.status >= 300 && res.status < 400) {
    const loc = res.headers.get('location') || '';
    if (loc.includes('mp.weixin.qq.com')) return loc;
  }
  if (!res.ok) return '';
  const body = await res.text();
  if (/antispider|seccode/.test(body) && !/url\s*\+=/.test(body)) return '';
  const parts = [...body.matchAll(/url\s*\+=\s*'([^']*)'/g)].map((x) => x[1]);
  const joined = parts.join('').replace(/@/g, '');
  if (joined.includes('mp.weixin.qq.com')) return joined;
  return '';
}

/**
 * 搜狗微信全文检索。解开跳转链、去掉高亮空格、写入发布日期。
 * 不要求标题含关键词（查询本身已按全文检索）。
 */
async function fetchSogouWechatNews() {
  const query = `${KEYWORD} 中山大学海洋科学`;
  const searchUrl = `https://weixin.sogou.com/weixin?type=2&ie=utf8&query=${encodeURIComponent(query)}`;
  const first = await fetch(searchUrl, {
    headers: {
      'User-Agent': UA,
      Accept: 'text/html,application/xhtml+xml',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    },
  });
  if (!first.ok) {
    throw new Error(`HTTP ${first.status} for ${searchUrl}`);
  }
  const cookie = cookieHeader(first);
  const html1 = await first.text();
  if (/antispider|seccode/.test(html1) && !/txt-box/.test(html1)) {
    console.warn('[sync-news] Sogou WeChat 触发风控，跳过公众号自动抓取');
    return [];
  }

  const khOffset = sogouKhOffset(html1);
  const hits = parseSogouSearchPage(html1);

  for (let page = 2; page <= SOGOU_PAGES; page++) {
    await sleep(400);
    const pageUrl = `https://weixin.sogou.com/weixin?type=2&ie=utf8&page=${page}&query=${encodeURIComponent(query)}`;
    const res = await fetch(pageUrl, {
      headers: {
        'User-Agent': UA,
        Accept: 'text/html,application/xhtml+xml',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        Cookie: cookie,
        Referer: searchUrl,
      },
    });
    if (!res.ok) break;
    const pageHtml = await res.text();
    if (/antispider|seccode/.test(pageHtml) && !/txt-box/.test(pageHtml)) {
      console.warn(`[sync-news] Sogou page ${page} 触发风控，停止翻页`);
      break;
    }
    const more = parseSogouSearchPage(pageHtml);
    if (more.length === 0) break;
    hits.push(...more);
  }

  console.log(`[sync-news] sogou parsed hits: ${hits.length}`);
  const items = [];
  for (const hit of hits) {
    const resolved = await resolveSogouArticleUrl(hit.sogouLink, cookie, searchUrl, khOffset);
    await sleep(250);
    const link = resolved || hit.sogouLink;
    if (!resolved) {
      console.log(`[sync-news] keep sogou redirect: ${hit.title}`);
    }
    const date = extractNewsDate(hit.snippet, hit.unix);
    items.push({
      id: `wx-${Buffer.from(hit.title).toString('base64url').slice(0, 28)}`,
      title: hit.title,
      date,
      link,
      source: hit.account || '微信公众号（搜狗检索）',
      sourceEn: 'WeChat (Sogou search)',
      type: 'media',
      channel: 'wechat',
      snippet: hit.snippet || undefined,
    });
  }

  return [...new Map(items.map((i) => [i.title, i])).values()];
}

const SEED_NEWS = [
  {
    id: 'wx-mcc2026-award',
    title: '喜报丨我院学子在MCC2026海洋计算挑战赛中获得佳绩',
    titleEn: 'SMS News | Students awarded at MCC 2026 Ocean Computing Challenge',
    date: '2026-08-29',
    link: 'https://mp.weixin.qq.com/s/rqgsJDsYVHudRCTd5uOLQw',
    source: '中山大学海洋科学',
    sourceEn: 'SYSU Marine Sciences (WeChat)',
    type: 'media',
    channel: 'wechat',
    snippet:
      '第四届海洋智能计算大会暨海洋计算挑战赛（MCC 2026）全国总决赛在成都举行。卢文芳副教授指导“不吃压力”队获海浪奖（三等奖）。',
  },
  {
    id: 'wx-sst-sla-20261004',
    title: '海院科研动态（180）| 我院研究团队在海表变量智能预报领域取得连续进展',
    titleEn: 'Research highlight: consecutive progress in intelligent sea-surface forecasting',
    date: '2026-10-04',
    link: 'https://mp.weixin.qq.com/s/u3amdftGHHmze_lbkcjLFg',
    source: '中山大学海洋科学',
    sourceEn: 'SYSU Marine Sciences (WeChat)',
    type: 'media',
    channel: 'wechat',
    snippet:
      '卢文芳副教授团队联合釜山大学 Young-Heon Jo 教授，先后实现海面高度异常与海面温度的中短期智能预报。黄南翔等成果发表于 Geophysical Research Letters。',
  },
  {
    id: 'wx-mcc2026-tech',
    title: '海科院新闻丨我院 MCC2026 海洋计算挑战赛获奖团队技术攻坚纪实',
    titleEn: 'SMS News | Technical report of the MCC 2026 award-winning team',
    date: '2026-09-20',
    link: 'https://mp.weixin.qq.com/s/vu8XwwZ6rm_qVohFF0dcKA',
    source: '中山大学海洋科学',
    sourceEn: 'SYSU Marine Sciences (WeChat)',
    type: 'media',
    channel: 'wechat',
    snippet:
      '“不吃压力”队（杨光宇、黄南翔、方希泓、孙浩宸）在卢文芳副教授与吴长茂老师指导下获海浪奖（三等奖），三天模拟由 6606 秒压缩至 2000 秒以内。',
  },
  {
    id: 'wx-oe-nwm-20260906',
    title: '海院科研动态（175）| 我院研究团队在人工智能与数值模式混合的海浪智能模型领域取得创新性突破',
    titleEn: 'Research highlight: hybrid AI–numerical wave model',
    date: '2026-09-06',
    link: 'https://mp.weixin.qq.com/s/oUT3uL43K4dvXj0h9WN5Kg',
    source: '中山大学海洋科学',
    sourceEn: 'SYSU Marine Sciences (WeChat)',
    type: 'media',
    channel: 'wechat',
    snippet:
      '杨光宇为第一作者、卢文芳与董昌明为共同通讯作者的神经波浪模型论文发表于 Ocean Engineering。',
  },
  {
    id: 'wx-olar-forum-20260721',
    title: '海科院新闻 | 我院助力国产期刊 OLAR 高质量发展',
    titleEn: 'SMS News | Supporting high-quality development of OLAR journal',
    date: '2026-07-21',
    link: 'https://mp.weixin.qq.com/s/HYDal3DNTqrgERsFQE2bzw',
    source: '中山大学海洋科学',
    sourceEn: 'SYSU Marine Sciences (WeChat)',
    type: 'media',
    channel: 'wechat',
    snippet:
      'Ocean-Land-Atmosphere Research（OLAR）期刊2026年学术论坛暨编委会年度工作会议在浙江杭州圆满举行。',
  },
  {
    id: 'wx-seed-stoten-undergrad',
    title: '海洋科学学院本科生团队在中科院一区期刊上发表研究成果',
    titleEn: 'Undergraduate team publishes in a CAS Zone-1 journal',
    date: '2024',
    link: 'https://mp.weixin.qq.com/s/Yl4HNOchviWFTo4sOIf7Fw',
    source: '中山大学海洋科学 / 教务部',
    sourceEn: 'SYSU Marine Sciences / Academic Affairs',
    type: 'media',
    channel: 'wechat',
  },
  {
    id: 'sysu-seed-article-9192',
    title: '海院科研动态（63）| 来志刚教授研究团队首次构建海洋藻华事件系统性提取分析的技术框架',
    titleEn: 'Research highlight: framework for extracting extreme phytoplankton blooms',
    date: '2022',
    link: 'https://marine.sysu.edu.cn/article/9192',
    source: '中山大学海洋科学学院',
    sourceEn: 'School of Marine Sciences, SYSU',
    type: 'media',
    channel: 'college',
  },
  {
    id: 'wx-seed-lors-chla',
    title: '广东省海洋遥感重点实验室新闻（叶绿素季节内变化）',
    date: '2021',
    link: 'https://mp.weixin.qq.com/s/LKrqYa7zDSSB2mCOZIzvpA',
    source: '广东省海洋遥感重点实验室',
    sourceEn: 'Guangdong Key Lab of Ocean Remote Sensing',
    type: 'media',
    channel: 'wechat',
  },
  {
    id: 'wx-seed-olar-he',
    title: '公众号报道：海平面异常智能预报相关成果',
    date: '2026',
    link: 'https://mp.weixin.qq.com/s/WAtv69cG5ugXWJJDgyHv7w',
    source: '公众号报道',
    sourceEn: 'WeChat media coverage',
    type: 'media',
    channel: 'wechat',
  },
];

function mergeItems(...lists) {
  const map = new Map();
  const seenTitles = new Set();
  for (const list of lists) {
    for (const item of list) {
      const key = item.link || item.id;
      if (map.has(key)) continue;
      const titleKey = (item.title || '').replace(/\s+/g, '');
      if (titleKey && seenTitles.has(titleKey)) continue;
      map.set(key, item);
      if (titleKey) seenTitles.add(titleKey);
    }
  }
  return [...map.values()];
}

async function main() {
  let college = [];
  let wechat = [];

  try {
    college = await fetchCollegeNews();
    console.log(`[sync-news] college confirmed: ${college.length}`);
  } catch (err) {
    console.warn('[sync-news] college fetch failed:', err.message);
  }

  try {
    wechat = await fetchSogouWechatNews();
    console.log(`[sync-news] wechat/sogou hits: ${wechat.length}`);
  } catch (err) {
    console.warn('[sync-news] wechat fetch failed:', err.message);
  }

  // 每次以种子 + 本次抓取为准，不沿用上次噪声条目
  const items = mergeItems(SEED_NEWS, college, wechat);
  const payload = {
    updatedAt: new Date().toISOString(),
    keyword: KEYWORD,
    note:
      '学院官网使用 /search/all?keys= 全文检索并核对正文。微信经搜狗检索后解析 mp.weixin.qq.com 原文链接与发布日期（可能风控）。',
    items,
  };
  writeFileSync(OUT, JSON.stringify(payload, null, 2), 'utf8');
  console.log(`[sync-news] wrote ${items.length} items -> ${OUT}`);
}

main();

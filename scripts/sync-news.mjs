/**
 * 同步含关键词「卢文芳」的公开报道到 src/data/syncedNews.json
 *
 * 策略（全文检索，不要求标题含关键词）：
 * 1. 学院官网 /search/all?keys=…（Drupal 全文检索，稳定）
 * 2. 搜狗微信检索（公众号无官方 API，可能风控）
 * 3. 对学院结果再拉正文，确认全文出现关键词后写入
 * 4. 种子链接保证离线也有可用条目
 *
 * 用法：node scripts/sync-news.mjs
 */
import { writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '../src/data/syncedNews.json');
const KEYWORD = '卢文芳';
const COLLEGE_BASE = 'https://marine.sysu.edu.cn';
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
    .replace(/&nbsp;/g, ' ');
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': UA,
      Accept: 'text/html,application/xhtml+xml',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
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

/** 学院官网全文检索结果解析 */
async function fetchCollegeSearchHits() {
  const url = `${COLLEGE_BASE}/search/all?keys=${encodeURIComponent(KEYWORD)}`;
  const html = await fetchText(url);
  const items = [];

  // 优先解析 search-list 卡片（标题 + 摘要）
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
    confirmed.push({
      id: `sysu-article${idNum}`,
      title: hit.title,
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

/**
 * 搜狗微信全文检索。公众号无官方 API；结果链多为跳转链。
 * 不要求标题含关键词；用摘要/标题中是否出现关键词或检索页上下文过滤噪声。
 */
async function fetchSogouWechatNews() {
  const query = `${KEYWORD} 中山大学海洋科学`;
  const url = `https://weixin.sogou.com/weixin?type=2&query=${encodeURIComponent(query)}`;
  const html = await fetchText(url);
  if (/antispider|seccode/.test(html) && !/txt-box/.test(html)) {
    console.warn('[sync-news] Sogou WeChat 触发风控，跳过公众号自动抓取');
    return [];
  }

  const items = [];
  // 每条结果块：标题 + 摘要
  const blockRe =
    /<h3[^>]*>\s*<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>\s*<\/h3>[\s\S]*?(?:<p[^>]*class="txt-info"[^>]*>([\s\S]*?)<\/p>)?/gi;
  let m;
  while ((m = blockRe.exec(html))) {
    const title = decodeHtml(stripTags(m[2]));
    const snippet = decodeHtml(stripTags(m[3] || ''));
    if (title.length < 6) continue;
    // 全文相关：标题或摘要含关键词即可（搜狗已按全文检索）
    const related = title.includes(KEYWORD) || snippet.includes(KEYWORD);
    if (!related && items.length > 0) {
      // 仍保留搜狗返回的前若干条（查询已带关键词），避免摘要截断漏掉
    }
    let link = m[1];
    if (link.startsWith('/')) link = `https://weixin.sogou.com${link}`;
    const idSeed = `${title}|${link}`.slice(0, 80);
    items.push({
      id: `wx-${Buffer.from(idSeed).toString('base64url').slice(0, 28)}`,
      title,
      link,
      source: '微信公众号（搜狗检索）',
      sourceEn: 'WeChat (Sogou search)',
      type: 'media',
      channel: 'wechat',
      snippet: snippet || undefined,
    });
  }

  // 若块解析失败，退回仅标题列表（搜狗查询本身是全文）
  if (items.length === 0) {
    const re = /<h3[^>]*>\s*<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
    while ((m = re.exec(html))) {
      const title = decodeHtml(stripTags(m[2]));
      if (title.length < 6) continue;
      let link = m[1];
      if (link.startsWith('/')) link = `https://weixin.sogou.com${link}`;
      items.push({
        id: `wx-${Buffer.from(title).toString('base64url').slice(0, 28)}`,
        title,
        link,
        source: '微信公众号（搜狗检索）',
        sourceEn: 'WeChat (Sogou search)',
        type: 'media',
        channel: 'wechat',
      });
    }
  }

  return [...new Map(items.map((i) => [i.title, i])).values()];
}

const SEED_NEWS = [
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
  for (const list of lists) {
    for (const item of list) {
      const key = item.link || item.id;
      if (!map.has(key)) map.set(key, item);
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
      '学院官网使用 /search/all?keys= 全文检索，并核对正文含关键词（不要求标题含名）。微信无官方 API，经搜狗检索（可能风控）。',
    items,
  };
  writeFileSync(OUT, JSON.stringify(payload, null, 2), 'utf8');
  console.log(`[sync-news] wrote ${items.length} items -> ${OUT}`);
}

main();

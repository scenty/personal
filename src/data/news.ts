import { publications } from './publications';
import syncedNewsData from './syncedNews.json';

export interface NewsItem {
  id: string;
  title: string;
  titleEn?: string;
  date?: string;
  link: string;
  source?: string;
  sourceEn?: string;
  publicationId?: string;
  type: 'media' | 'award' | 'talk' | 'recruitment' | 'other';
  channel?: 'college' | 'wechat' | 'manual' | 'publication';
  snippet?: string;
}

// 站内手动动态（讲座、招生、获奖等）
export const manualNews: NewsItem[] = [
  {
    id: "news-olar-editor",
    title: "获聘 OLAR 优秀青年编委",
    titleEn: "Appointed Outstanding Young Editorial Board Member of OLAR",
    date: "2025",
    link: "/#/publications",
    source: "Ocean-Land-Atmosphere Research",
    type: "award",
    channel: "manual"
  },
  {
    id: "news-favorite-teacher",
    title: '获海科院2025年"我心目中的良师"称号',
    titleEn: 'Received 2025 "Teacher I Admire Most" Award',
    date: "2025",
    link: "/#/teaching",
    source: "中山大学海洋科学学院",
    sourceEn: "School of Marine Sciences, SYSU",
    type: "award",
    channel: "manual"
  },
  {
    id: "news-recruitment",
    title: "欢迎报考研究生：人工智能海洋学与海洋数值模式方向",
    titleEn: "Graduate recruitment: AI oceanography & numerical modeling",
    date: "2026",
    link: "/#/contact",
    source: "招生信息",
    sourceEn: "Recruitment",
    type: "recruitment",
    channel: "manual"
  }
];

/** 学院官网 / 公众号检索同步结果（由 npm run sync-news 更新） */
export function getSyncedNews(): NewsItem[] {
  const items = (syncedNewsData as { items?: NewsItem[] }).items || [];
  return items.map((item) => ({
    ...item,
    type: item.type || 'media',
  }));
}

export function getSyncedNewsUpdatedAt(): string | undefined {
  return (syncedNewsData as { updatedAt?: string }).updatedAt;
}

/** 从论文 newsCoverage 汇总媒体报道 */
export function getPublicationNews(): NewsItem[] {
  const items: NewsItem[] = [];
  for (const pub of publications) {
    if (!pub.newsCoverage) continue;
    for (let i = 0; i < pub.newsCoverage.length; i++) {
      const news = pub.newsCoverage[i];
      items.push({
        id: `pub-${pub.id}-${i}`,
        title: news.title,
        date: String(pub.year),
        link: news.link,
        source: pub.journal,
        publicationId: pub.id,
        type: "media",
        channel: "publication"
      });
    }
  }
  return items;
}

function newsSortKey(item: NewsItem): number {
  const fromDateField = parseDateKey(item.date);
  if (fromDateField > 0) return fromDateField;

  const fromSnippet = parseDateKey(item.snippet);
  if (fromSnippet > 0) return fromSnippet;

  return parseDateKey(item.title);
}

/** 解析为 YYYYMMDD 数值，便于从新到旧排序；无法解析则为 0 */
function parseDateKey(text?: string): number {
  if (!text) return 0;
  const s = String(text);

  const fullZh = s.match(/(\d{4})\s*年\s*(\d{1,2})\s*月\s*(\d{1,2})\s*日/);
  if (fullZh) {
    return Number(fullZh[1]) * 10000 + Number(fullZh[2]) * 100 + Number(fullZh[3]);
  }

  const ymZh = s.match(/(\d{4})\s*年\s*(\d{1,2})\s*月/);
  if (ymZh) {
    return Number(ymZh[1]) * 10000 + Number(ymZh[2]) * 100;
  }

  const iso = s.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (iso) {
    return Number(iso[1]) * 10000 + Number(iso[2]) * 100 + Number(iso[3]);
  }

  const yearOnly = s.match(/\b(20\d{2}|19\d{2})\b/);
  if (yearOnly) {
    return Number(yearOnly[1]) * 10000;
  }

  return 0;
}

/** 全部动态去重后按时间从新到旧 */
export function getAllNews(): NewsItem[] {
  const seen = new Set<string>();
  const out: NewsItem[] = [];
  const push = (item: NewsItem) => {
    const key = item.link || item.id;
    if (seen.has(key)) return;
    seen.add(key);
    out.push(item);
  };

  for (const item of manualNews) push(item);
  for (const item of getSyncedNews()) push(item);
  for (const item of getPublicationNews()) push(item);

  return out.sort((a, b) => newsSortKey(b) - newsSortKey(a));
}

export default manualNews;

import { Link } from 'react-router-dom';
import { ExternalLink, Newspaper, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAllNews, getSyncedNewsUpdatedAt, type NewsItem } from '@/data';
import { useLanguage } from '@/contexts/LanguageContext';

const News = () => {
  const { language, t } = useLanguage();
  const items = getAllNews();
  const syncedAt = getSyncedNewsUpdatedAt();

  const typeLabel = (type: NewsItem['type']) => t(`news.type.${type}`);

  const isInternalHash = (link: string) => link.startsWith('/#/');

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <Newspaper className="w-9 h-9 text-primary" />
            {t('news.pageTitle')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            {t('news.pageDesc')}
          </p>
          {syncedAt && (
            <p className="text-xs text-muted-foreground mt-3">
              {language === 'zh'
                ? `学院/公众号检索上次同步：${syncedAt.slice(0, 10)}（npm run sync-news）`
                : `College/WeChat search last synced: ${syncedAt.slice(0, 10)} (npm run sync-news)`}
            </p>
          )}
        </div>

        <div className="space-y-4 max-w-4xl">
          {items.map((item) => {
            const title = language === 'en' && item.titleEn ? item.titleEn : item.title;
            const source = language === 'en' && item.sourceEn ? item.sourceEn : item.source;
            const content = (
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge variant="outline">{typeLabel(item.type)}</Badge>
                      {item.channel === 'wechat' && (
                        <Badge variant="secondary">{language === 'zh' ? '公众号' : 'WeChat'}</Badge>
                      )}
                      {item.channel === 'college' && (
                        <Badge variant="secondary">{language === 'zh' ? '学院官网' : 'College'}</Badge>
                      )}
                      {item.date && <Badge variant="secondary">{item.date}</Badge>}
                      {source && (
                        <span className="text-xs text-muted-foreground">{source}</span>
                      )}
                    </div>
                    <h2 className="font-semibold text-base md:text-lg leading-snug">{title}</h2>
                    {item.snippet && (
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{item.snippet}</p>
                    )}
                    {item.publicationId && (
                      <p className="text-xs text-muted-foreground mt-2">
                        {t('news.relatedPaper')}: {item.publicationId}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {item.publicationId && (
                      <Link
                        to={`/publications/${item.publicationId}`}
                        className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t('publications.detail')}
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                    {!isInternalHash(item.link) && (
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </CardContent>
              </Card>
            );

            if (isInternalHash(item.link)) {
              const path = item.link.replace('/#', '') || '/';
              return (
                <Link key={item.id} to={path}>
                  {content}
                </Link>
              );
            }

            return (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default News;

import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, FileText, Database, Code, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getPublicationById, publications } from '@/data';
import { useLanguage } from '@/contexts/LanguageContext';

const PublicationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const publication = id ? getPublicationById(id) : undefined;
  const { language, t } = useLanguage();

  if (!publication) {
    return <Navigate to="/publications" replace />;
  }

  // 获取相关论文（同一年份或同期刊）
  const relatedPubs = publications
    .filter(pub => pub.id !== publication.id && (pub.year === publication.year || pub.journal === publication.journal))
    .slice(0, 3);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/publications">
            <ArrowLeft className="mr-2 w-4 h-4" /> {t('pubDetail.back')}
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                {/* Header */}
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="text-lg px-3 py-1">{publication.year}</Badge>
                  {publication.quartile && (
                    <Badge variant="outline" className="text-lg px-3 py-1">{publication.quartile}</Badge>
                  )}
                  {publication.impactFactor && (
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      IF: {publication.impactFactor}
                    </Badge>
                  )}
                </div>

                <h1 className="text-2xl md:text-3xl font-bold mb-6">{publication.title}</h1>

                <div className="mb-6">
                  {publication.firstAuthorId ? (
                    <p className="text-lg text-muted-foreground">
                      {(() => {
                        // 根据语言选择作者列表
                        const authorsText = language === 'en' && publication.authorsEn 
                          ? publication.authorsEn 
                          : publication.authors;
                        
                        // 处理中文格式的作者列表（使用"，"和"和"分隔）
                        if (authorsText.includes('何江南')) {
                          const parts = authorsText.split('何江南');
                          return (
                            <>
                              {parts[0]}
                              <Link 
                                to={`/students/${publication.firstAuthorId}`}
                                className="text-primary hover:underline inline-flex items-center gap-1"
                              >
                                何江南
                                <ExternalLink className="w-3 h-3" />
                              </Link>
                              {parts[1]}
                            </>
                          );
                        }
                        // 处理英文格式：He, J.
                        if (language === 'en' && authorsText.includes('He, J.')) {
                          const parts = authorsText.split('He, J.');
                          return (
                            <>
                              {parts[0]}
                              <Link 
                                to={`/students/${publication.firstAuthorId}`}
                                className="text-primary hover:underline inline-flex items-center gap-1"
                              >
                                He, J.
                                <ExternalLink className="w-3 h-3" />
                              </Link>
                              {parts[1]}
                            </>
                          );
                        }
                        // 如果找不到匹配的作者，按原样显示
                        return <>{authorsText}</>;
                      })()}
                    </p>
                  ) : (
                    <p className="text-lg text-muted-foreground">
                      {language === 'en' && publication.authorsEn 
                        ? publication.authorsEn 
                        : publication.authors}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-8">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="font-medium">{publication.journal}</span>
                  {publication.volume && (
                    <span className="text-muted-foreground">
                      {language === 'en' ? 'Vol.' : '卷'} {publication.volume}
                      {publication.issue && (language === 'en' ? `, Issue ${publication.issue}` : `, 第${publication.issue}期`)}
                      {publication.pages && (language === 'en' ? `, pp. ${publication.pages}` : `, 第${publication.pages}页`)}
                    </span>
                  )}
                </div>

                {/* Abstract */}
                {(publication.abstract || publication.abstractEn) && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-3">{t('pubDetail.abstract')}</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {language === 'en' && publication.abstractEn 
                        ? publication.abstractEn 
                        : publication.abstract}
                    </p>
                  </div>
                )}

                <Separator className="my-6" />

                {/* Keywords */}
                {(publication.keywords || publication.keywordsEn) && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">{t('pubDetail.keywords')}</h2>
                    <div className="flex flex-wrap gap-2">
                      {(language === 'en' && publication.keywordsEn 
                        ? publication.keywordsEn 
                        : publication.keywords || []).map((keyword, idx) => (
                        <Badge key={idx} variant="outline" className="text-sm">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Highlights */}
                {(publication.highlights || publication.highlightsEn) && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">{t('pubDetail.highlights')}</h2>
                    <ul className="space-y-2">
                      {(language === 'en' && publication.highlightsEn 
                        ? publication.highlightsEn 
                        : publication.highlights || []).map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-yellow-500 mt-1">★</span>
                          <span className="text-muted-foreground">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Figures */}
                {publication.figures && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">{t('pubDetail.figures')}</h2>
                    <div className="space-y-6">
                      {publication.figures.map((figure, idx) => (
                        <div key={idx} className="border rounded-lg overflow-hidden">
                          <img 
                            src={figure.image} 
                            alt={figure.caption}
                            className="w-full h-auto"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                          <div className="p-4 bg-muted">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {language === 'en' && figure.captionEn 
                                ? figure.captionEn 
                                : figure.caption}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* News Coverage */}
                {publication.newsCoverage && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Newspaper className="w-5 h-5" /> {t('pubDetail.newsCoverage')}
                    </h2>
                    <ul className="space-y-2">
                      {publication.newsCoverage.map((news, idx) => (
                        <li key={idx}>
                          <a 
                            href={news.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center gap-1"
                          >
                            {news.title} <ExternalLink className="w-3 h-3" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Links */}
            <Card>
              <CardHeader>
                <CardTitle>{t('pubDetail.relatedLinks')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {publication.doiLink && (
                  <Button asChild className="w-full" variant="outline">
                    <a href={publication.doiLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 w-4 h-4" /> {t('pubDetail.viewPaper')}
                    </a>
                  </Button>
                )}
                {publication.pdfLink && (
                  <Button asChild className="w-full" variant="outline">
                    <a href={publication.pdfLink} target="_blank" rel="noopener noreferrer">
                      <FileText className="mr-2 w-4 h-4" /> {t('pubDetail.downloadPDF')}
                    </a>
                  </Button>
                )}
                {publication.dataLink && (
                  <Button asChild className="w-full" variant="outline">
                    <a href={publication.dataLink} target="_blank" rel="noopener noreferrer">
                      <Database className="mr-2 w-4 h-4" /> {t('pubDetail.downloadData')}
                    </a>
                  </Button>
                )}
                {publication.codeLink && (
                  <Button asChild className="w-full" variant="outline">
                    <a href={publication.codeLink} target="_blank" rel="noopener noreferrer">
                      <Code className="mr-2 w-4 h-4" /> {t('pubDetail.codeRepo')}
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Citation Info */}
            <Card>
              <CardHeader>
                <CardTitle>{t('pubDetail.citation')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg text-sm font-mono break-all">
                  {(publication.authorsEn || publication.authors)} ({publication.year}). {publication.title}. <em>{publication.journal}</em>
                  {publication.volume && `, ${publication.volume}`}
                  {publication.issue && `(${publication.issue})`}
                  {publication.pages && `, ${publication.pages}`}
                  . https://doi.org/{publication.doi}
                </div>
              </CardContent>
            </Card>

            {/* Related Publications */}
            {relatedPubs.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>{t('pubDetail.relatedPubs')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedPubs.map((pub) => (
                    <div key={pub.id} className="border-b last:border-0 pb-3 last:pb-0">
                      <Link to={`/publications/${pub.id}`} className="hover:text-primary transition-colors">
                        <p className="font-medium text-sm line-clamp-2">{pub.title}</p>
                      </Link>
                      <p className="text-xs text-muted-foreground mt-1">{pub.journal}, {pub.year}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicationDetail;

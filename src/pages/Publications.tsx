import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { publications, publicationsByYear, getFirstAuthorPublications, getCorrespondingAuthorPublications, getFirstOrCorrespondingAuthorPublications, getQ2AbovePublications } from '@/data';
import { useLanguage } from '@/contexts/LanguageContext';

const Publications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'first' | 'corresponding'>('all');
  const { language, t } = useLanguage();

  const paperCount = getFirstOrCorrespondingAuthorPublications().length;
  const q2Count = getQ2AbovePublications().length;
  const pageDesc = String(t('publications.pageDesc'))
    .replace('{paperCount}', String(paperCount))
    .replace('{q2Count}', String(q2Count));

  const isCorrespondingAuthor = (pub: typeof publications[0]) => {
    const authors = pub.authors || '';
    const authorsEn = pub.authorsEn || '';
    return authors.includes('卢文芳*') || authors.includes('Lu, W.*') || authorsEn.includes('Lu, W.*');
  };

  const filteredPublications = publications.filter(pub => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pub.authorsEn || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.journal.toLowerCase().includes(searchTerm.toLowerCase());

    if (filter === 'first') return matchesSearch && pub.isFirstAuthor;
    if (filter === 'corresponding') return matchesSearch && isCorrespondingAuthor(pub);
    return matchesSearch;
  });

  const years = Object.keys(publicationsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('publications.pageTitle')}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">{pageDesc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary">
                {getFirstAuthorPublications().length + getCorrespondingAuthorPublications().length}
              </div>
              <div className="text-sm text-muted-foreground">{t('publications.statRep')}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary">{getFirstAuthorPublications().length}</div>
              <div className="text-sm text-muted-foreground">{t('publications.statFirst')}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary">{getCorrespondingAuthorPublications().length}</div>
              <div className="text-sm text-muted-foreground">{t('publications.statCorr')}</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder={String(t('publications.search'))}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              size="sm"
            >
              {t('publications.filterAll')}
            </Button>
            <Button
              variant={filter === 'first' ? 'default' : 'outline'}
              onClick={() => setFilter('first')}
              size="sm"
            >
              {t('publications.firstAuthor')}
            </Button>
            <Button
              variant={filter === 'corresponding' ? 'default' : 'outline'}
              onClick={() => setFilter('corresponding')}
              size="sm"
            >
              {t('publications.correspondingAuthor')}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="list" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="list">{t('publications.viewList')}</TabsTrigger>
            <TabsTrigger value="year">{t('publications.viewYear')}</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            {filteredPublications.map((pub) => (
              <Card key={pub.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge>{pub.year}</Badge>
                        {pub.quartile && (
                          <Badge variant="outline">{pub.quartile}</Badge>
                        )}
                        {pub.isFirstAuthor && (
                          <Badge variant="secondary" className="text-xs">{t('publications.firstAuthor')}</Badge>
                        )}
                        {isCorrespondingAuthor(pub) && pub.isFirstAuthor === false && (
                          <Badge variant="secondary" className="text-xs">{t('publications.correspondingAuthor')}</Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        <Link to={`/publications/${pub.id}`} className="hover:text-primary transition-colors">
                          {pub.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {language === 'en' && pub.authorsEn ? pub.authorsEn : pub.authors}
                      </p>
                      <p className="text-sm font-medium text-foreground">{pub.journal}</p>
                      {pub.highlights && language === 'zh' && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {pub.highlights.map((highlight, idx) => (
                            <span key={idx} className="text-xs bg-yellow-50 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-300 px-2 py-1 rounded">
                              {highlight}
                            </span>
                          ))}
                        </div>
                      )}
                      {pub.highlightsEn && language === 'en' && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {pub.highlightsEn.map((highlight, idx) => (
                            <span key={idx} className="text-xs bg-yellow-50 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-300 px-2 py-1 rounded">
                              {highlight}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link to={`/publications/${pub.id}`}>
                          {t('publications.detail')} <ArrowRight className="ml-1 w-4 h-4" />
                        </Link>
                      </Button>
                      {pub.doiLink && (
                        <Button asChild variant="ghost" size="sm">
                          <a href={pub.doiLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="year">
            <div className="space-y-8">
              {years.map((year) => (
                <div key={year}>
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <span className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3 text-primary">
                      {year}
                    </span>
                  </h3>
                  <div className="space-y-4">
                    {publicationsByYear[Number(year)].map((pub) => (
                      <Card key={pub.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h4 className="font-semibold mb-1">
                                <Link to={`/publications/${pub.id}`} className="hover:text-primary transition-colors">
                                  {pub.title}
                                </Link>
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {language === 'en' && pub.authorsEn ? pub.authorsEn : pub.authors}
                              </p>
                              <p className="text-sm">{pub.journal}</p>
                            </div>
                            <Button asChild variant="ghost" size="sm">
                              <Link to={`/publications/${pub.id}`}>
                                <ArrowRight className="w-4 h-4" />
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Publications;

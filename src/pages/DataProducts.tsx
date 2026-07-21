import { Link } from 'react-router-dom';
import { ExternalLink, Database, Code, FileText, Download, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { dataProducts, books } from '@/data';
import { useLanguage } from '@/contexts/LanguageContext';

const DataProducts = () => {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('dataProducts.pageTitle')}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            {t('dataProducts.pageDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {dataProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-2">{product.abbreviation}</Badge>
                    <CardTitle className="text-xl">
                      {language === 'zh' ? product.name : product.nameEn}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {language === 'zh' ? product.nameEn : product.name}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Database className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{product.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">{t('dataProducts.spatial')}</p>
                    <p className="font-medium">{product.spatialResolution}</p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">{t('dataProducts.temporal')}</p>
                    <p className="font-medium">{product.temporalResolution}</p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">{t('dataProducts.timeRange')}</p>
                    <p className="font-medium">{product.timeRange}</p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">{t('dataProducts.region')}</p>
                    <p className="font-medium">{product.region}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm font-medium mb-2">{t('dataProducts.variables')}</p>
                  <div className="flex flex-wrap gap-2">
                    {product.variables.map((variable, idx) => (
                      <Badge key={idx} variant="outline">{variable}</Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button asChild size="sm">
                    <a href={product.dataLink} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-1 w-4 h-4" /> {t('dataProducts.download')}
                    </a>
                  </Button>
                  {product.codeLink && (
                    <Button asChild variant="outline" size="sm">
                      <a href={product.codeLink} target="_blank" rel="noopener noreferrer">
                        <Code className="mr-1 w-4 h-4" /> {t('dataProducts.code')}
                      </a>
                    </Button>
                  )}
                  {product.paperId && (
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/publications/${product.paperId}`}>
                        <FileText className="mr-1 w-4 h-4" /> {t('dataProducts.paperInternal')}
                      </Link>
                    </Button>
                  )}
                  {product.paperLink && (
                    <Button asChild variant="outline" size="sm">
                      <a href={product.paperLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-1 w-4 h-4" /> {t('dataProducts.paper')}
                      </a>
                    </Button>
                  )}
                </div>

                {product.applications && product.applications.length > 0 && (
                  <div className="mt-6 pt-4 border-t">
                    <p className="text-sm font-medium mb-2">{t('dataProducts.applications')}</p>
                    <ul className="space-y-1">
                      {product.applications.map((app, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground">
                          {app.paperId ? (
                            <Link
                              to={`/publications/${app.paperId}`}
                              className="text-primary hover:underline"
                            >
                              • {app.title}
                            </Link>
                          ) : app.link ? (
                            <a
                              href={app.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              • {app.title}
                            </a>
                          ) : (
                            <>• {app.title}</>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator className="my-12" />

        <div>
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-primary" /> {t('dataProducts.books')}
          </h2>
          <div className="space-y-6">
            {books.map((book, idx) => (
              <Card key={idx}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-20 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-950/50 dark:to-orange-950/50 rounded flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{book.chapter}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{book.authors} ({book.year})</p>
                      <p className="text-sm mb-2">
                        In: <em>{book.bookTitle}</em> (pp. {book.pages})
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {book.publisher}, {book.location}
                      </p>
                      {book.downloadLink && (
                        <Button asChild variant="outline" size="sm" className="mt-3">
                          <a href={book.downloadLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-1 w-4 h-4" /> {t('dataProducts.download')}
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <Card className="bg-blue-50 border-blue-200 dark:bg-blue-950/40 dark:border-blue-800">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-100">
                {t('dataProducts.usage')}
              </h3>
              <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
                {t('dataProducts.usageText')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DataProducts;

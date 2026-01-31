import { ExternalLink, Database, Code, FileText, Download, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { dataProducts, books } from '@/data';

const DataProducts = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">数据产品</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            开放共享的科学数据集，包括全球海洋热含量、南海叶绿素重建、海岸带碳数据等。
            所有数据集均提供下载链接和相关论文引用信息。
          </p>
        </div>

        {/* Data Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {dataProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-2">{product.abbreviation}</Badge>
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{product.nameEn}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Database className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{product.description}</p>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">空间分辨率</p>
                    <p className="font-medium">{product.spatialResolution}</p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">时间分辨率</p>
                    <p className="font-medium">{product.temporalResolution}</p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">时间范围</p>
                    <p className="font-medium">{product.timeRange}</p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">区域</p>
                    <p className="font-medium">{product.region}</p>
                  </div>
                </div>

                {/* Variables */}
                <div className="mb-6">
                  <p className="text-sm font-medium mb-2">变量</p>
                  <div className="flex flex-wrap gap-2">
                    {product.variables.map((variable, idx) => (
                      <Badge key={idx} variant="outline">{variable}</Badge>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-2">
                  <Button asChild size="sm">
                    <a href={product.dataLink} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-1 w-4 h-4" /> 下载数据
                    </a>
                  </Button>
                  {product.codeLink && (
                    <Button asChild variant="outline" size="sm">
                      <a href={product.codeLink} target="_blank" rel="noopener noreferrer">
                        <Code className="mr-1 w-4 h-4" /> 代码
                      </a>
                    </Button>
                  )}
                  {product.paperLink && (
                    <Button asChild variant="outline" size="sm">
                      <a href={product.paperLink} target="_blank" rel="noopener noreferrer">
                        <FileText className="mr-1 w-4 h-4" /> 论文
                      </a>
                    </Button>
                  )}
                </div>

                {/* Applications */}
                {product.applications && product.applications.length > 0 && (
                  <div className="mt-6 pt-4 border-t">
                    <p className="text-sm font-medium mb-2">应用案例</p>
                    <ul className="space-y-1">
                      {product.applications.map((app, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground">
                          • {app.title}
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

        {/* Books Section */}
        <div>
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-primary" /> 学术专著
          </h2>
          <div className="space-y-6">
            {books.map((book, idx) => (
              <Card key={idx}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-8 h-8 text-amber-600" />
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
                            <ExternalLink className="mr-1 w-4 h-4" /> 下载
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

        {/* Citation Note */}
        <div className="mt-12">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-3 text-blue-900">使用说明</h3>
              <p className="text-blue-800 text-sm leading-relaxed">
                使用本网站提供的数据产品时，请在发表的研究成果中引用相应的论文。
                这不仅是对作者工作的认可，也有助于数据的持续更新和维护。
                如有任何问题或建议，欢迎通过联系方式与我交流。
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DataProducts;

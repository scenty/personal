import { ExternalLink, BookOpen, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { profile } from '@/data';
import { useLanguage } from '@/contexts/LanguageContext';

const Teaching = () => {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('teaching.pageTitle')}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            {t('teaching.pageDesc')}
          </p>
        </div>

        <div className="space-y-8 max-w-4xl">
          {profile.teaching.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-teal-500 to-cyan-500" />
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">
                      {language === 'zh' ? course.title : course.titleEn}
                    </CardTitle>
                    <p className="text-muted-foreground">
                      {language === 'zh' ? course.description : course.descriptionEn}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button asChild>
                  <a href={course.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 w-4 h-4" />
                    {t('teaching.openCourse')}
                  </a>
                </Button>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" />
                    {t('teaching.awards')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(language === 'zh' ? course.awards : course.awardsEn).map((award, idx) => (
                      <Badge key={idx} variant="secondary" className="text-sm py-1.5 px-3">
                        {award}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teaching;

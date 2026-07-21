import { Mail, Phone, MapPin, ExternalLink, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { profile } from '@/data';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact = () => {
  const { language, t } = useLanguage();

  const platforms = [
    {
      name: '知乎',
      nameEn: 'Zhihu',
      desc: '海洋、海洋科学领域优秀回答者',
      descEn: 'Top contributor in ocean science',
      url: profile.social.zhihu
    },
    {
      name: 'ResearchGate',
      nameEn: 'ResearchGate',
      desc: '学术研究成果展示',
      descEn: 'Academic research showcase',
      url: profile.social.researchGate
    },
    {
      name: 'ORCID',
      nameEn: 'ORCID',
      desc: '学术身份标识',
      descEn: 'Academic identity',
      url: profile.social.orcid
    },
    {
      name: 'Google Scholar',
      nameEn: 'Google Scholar',
      desc: '学术论文与引用',
      descEn: 'Publications and citations',
      url: profile.social.scholar
    },
    {
      name: '海科院个人页面',
      nameEn: 'SYSU Faculty Page',
      desc: '中山大学海洋科学学院',
      descEn: 'School of Marine Sciences',
      url: profile.social.sysu
    }
  ];

  const majors = language === 'zh'
    ? ['海洋科学', '环境科学', '大气科学', '地理信息']
    : ['Oceanography', 'Environmental Science', 'Atmospheric Science', 'GIS'];

  const interests = language === 'zh' ? profile.researchInterests : profile.researchInterestsEn;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">{t('contact.pageTitle')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('contact.pageDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" /> {t('contact.email')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="text-lg text-primary hover:underline flex items-center gap-2"
                >
                  {profile.contact.email}
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" /> {t('contact.phone')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">{profile.contact.phone}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" /> {t('contact.address')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">
                  {language === 'zh' ? profile.contact.address : profile.contact.addressEn}
                </p>
                <p className="text-muted-foreground">
                  {t('footer.postcode')}: {profile.contact.postcode}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('contact.platforms')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {platforms.map((p) => (
                  <a
                    key={p.url}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{language === 'zh' ? p.name : p.nameEn}</p>
                      <p className="text-sm text-muted-foreground">
                        {language === 'zh' ? p.desc : p.descEn}
                      </p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-muted-foreground" />
                  </a>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/40">
              <CardHeader>
                <CardTitle>{t('contact.institution')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Badge className="mb-2">{t('contact.mainUnit')}</Badge>
                  <h3 className="text-xl font-bold">
                    {language === 'zh' ? profile.institution : profile.institutionEn}
                  </h3>
                  <p className="text-muted-foreground">
                    {language === 'zh' ? profile.department : profile.departmentEn}
                  </p>
                  <p className="text-muted-foreground">
                    {language === 'zh' ? profile.team : profile.teamEn}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {language === 'zh' ? profile.position : profile.positionEn}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" /> {t('contact.recruitment')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">{t('contact.majors')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {majors.map((major) => (
                      <Badge key={major} variant="outline">{major}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{t('contact.interests')}</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {interests.map((interest, idx) => (
                      <li key={idx}>• {interest}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-900 to-cyan-800 text-white">
              <CardContent className="p-6 text-center">
                <GraduationCap className="w-12 h-12 mx-auto mb-4 text-blue-200" />
                <h3 className="text-xl font-bold mb-2">{t('contact.join')}</h3>
                <p className="text-blue-100 text-sm mb-4">{t('contact.joinDesc')}</p>
                <Button asChild className="bg-white text-blue-900 hover:bg-blue-50">
                  <a href={`mailto:${profile.contact.email}`}>
                    <Mail className="mr-2 w-4 h-4" /> {t('contact.sendMail')}
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

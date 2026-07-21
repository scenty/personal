import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, Database, FolderGit2, Mail, TrendingUp, Users, ExternalLink, MessageCircle, FileText, IdCard, Building2, Download, Presentation, Newspaper, Library } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import HeroCarousel from '@/components/HeroCarousel';
import PublicationsCarousel from '@/components/PublicationsCarousel';
import StudentsCarousel from '@/components/StudentsCarousel';
import { profile, projects, allStudents, getFirstOrCorrespondingAuthorPublications, getQ2AbovePublications, getAllNews } from '@/data';
import { useLanguage } from '@/contexts/LanguageContext';

const Home = () => {
  const { language, t } = useLanguage();

  const paperCount = getFirstOrCorrespondingAuthorPublications().length;
  const q2Count = getQ2AbovePublications().length;

  const stats = [
    {
      value: paperCount,
      label: t('stats.papers'),
      icon: BookOpen
    },
    {
      value: q2Count,
      label: t('stats.q2Papers'),
      icon: TrendingUp
    },
    {
      value: projects.length,
      label: t('stats.projects'),
      icon: FolderGit2
    },
    {
      value: allStudents.length,
      label: t('stats.students'),
      icon: Users
    },
  ];

  const quickLinks = [
    {
      path: '/publications',
      title: t('quickLinks.publications'),
      description: t('quickLinks.publicationsDesc'),
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      path: '/students',
      title: t('quickLinks.students'),
      description: t('quickLinks.studentsDesc'),
      icon: GraduationCap,
      color: 'from-green-500 to-emerald-500'
    },
    {
      path: '/teaching',
      title: t('quickLinks.teaching'),
      description: t('quickLinks.teachingDesc'),
      icon: Presentation,
      color: 'from-teal-500 to-emerald-500'
    },
    {
      path: '/data-products',
      title: t('quickLinks.dataProducts'),
      description: t('quickLinks.dataProductsDesc'),
      icon: Database,
      color: 'from-purple-500 to-pink-500'
    },
    {
      path: '/projects',
      title: t('quickLinks.projects'),
      description: t('quickLinks.projectsDesc'),
      icon: FolderGit2,
      color: 'from-orange-500 to-red-500'
    },
    {
      path: '/news',
      title: t('quickLinks.news'),
      description: t('quickLinks.newsDesc'),
      icon: Newspaper,
      color: 'from-sky-500 to-indigo-500'
    },
    {
      path: profile.social.sysu,
      title: language === 'zh' ? '海科院个人页面' : 'SYSU Profile',
      description: language === 'zh' ? '中山大学海洋科学学院' : 'School of Marine Sciences',
      icon: Building2,
      color: 'from-teal-500 to-blue-500',
      isExternal: true
    },
  ];

  const socialLinks = [
    {
      name: '知乎',
      nameEn: 'Zhihu',
      description: '海洋、海洋科学领域优秀回答者',
      descriptionEn: 'Top contributor in Ocean Science',
      icon: MessageCircle,
      url: profile.social.zhihu,
      color: 'from-blue-400 to-blue-600'
    },
    {
      name: 'ResearchGate',
      nameEn: 'ResearchGate',
      description: '学术研究成果展示',
      descriptionEn: 'Academic research showcase',
      icon: FileText,
      url: profile.social.researchGate,
      color: 'from-green-400 to-teal-600'
    },
    {
      name: 'ORCID',
      nameEn: 'ORCID',
      description: '学术身份标识',
      descriptionEn: 'Academic identity',
      icon: IdCard,
      url: profile.social.orcid,
      color: 'from-orange-400 to-red-600'
    },
    {
      name: 'Google Scholar',
      nameEn: 'Google Scholar',
      description: '学术论文与引用',
      descriptionEn: 'Publications and citations',
      icon: Library,
      url: profile.social.scholar,
      color: 'from-blue-500 to-indigo-600'
    }
  ];

  const awards = profile.awards;
  const researchInterests = language === 'zh'
    ? profile.researchInterests
    : profile.researchInterestsEn;

  const bioText = (language === 'zh' ? profile.bio : profile.bioEn)
    .replace(/\{paperCount\}/g, String(paperCount))
    .replace(/\{q2Count\}/g, String(q2Count));

  const latestNews = getAllNews().slice(0, 5);

  return (
    <div className="min-h-screen">
      <HeroCarousel />

      {/* Research Interests */}
      <section className="py-16 md:py-20 bg-white dark:bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">{t('research.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'zh'
                ? '聚焦人工智能与海洋科学的交叉领域'
                : 'Focusing on the intersection of AI and ocean science'}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {researchInterests.map((interest, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all hover:-translate-y-1 border-0 bg-gradient-to-br from-gray-50 to-white dark:from-muted dark:to-card">
                <CardContent className="p-5">
                  <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <p className="font-medium text-sm">{interest}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-gray-50 dark:bg-muted/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow border-0 bg-white dark:bg-card">
                  <CardContent className="pt-5 pb-5">
                    <div className="w-11 h-11 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Profile */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(images/ocean-circulation.png)' }}
        >
          <div className="absolute inset-0 bg-slate-900/80" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {language === 'zh' ? profile.name : profile.nameEn}
              </h2>
              <p className="text-lg text-white/70 mb-6">
                {language === 'zh' ? profile.title : profile.titleEn}
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 max-w-4xl">
                <p className="text-white/85 leading-relaxed whitespace-pre-line text-sm md:text-base">
                  {bioText}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 max-w-3xl">
              {awards.map((award, idx) => (
                <div
                  key={idx}
                  className={`bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 flex items-center justify-center text-center hover:bg-white/15 transition-colors sm:col-span-2${idx === 3 ? ' sm:col-start-2' : ''}`}
                >
                  <p className="text-white font-medium text-sm md:text-base leading-snug">
                    {language === 'zh' ? award.title : award.titleEn}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-white text-slate-900 hover:bg-white/90">
                <Link to="/contact">
                  <BookOpen className="mr-2 w-4 h-4" />
                  {language === 'zh' ? '联系我' : 'Contact Me'}
                </Link>
              </Button>
              <Button asChild className="bg-white text-slate-900 hover:bg-white/90">
                <a href="Wenfang-CV-2025.pdf" download="Wenfang-CV-2025.pdf">
                  <Download className="mr-2 w-4 h-4" />
                  {language === 'zh' ? '个人简历' : 'My CV'}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Education / Roles */}
      <section className="py-16 md:py-20 bg-white dark:bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div>
              <h3 className="text-xl font-bold mb-5">{t('about.education')}</h3>
              <div className="space-y-4">
                {profile.education.map((edu, idx) => (
                  <div key={idx} className="border-l-2 border-primary/40 pl-4">
                    <p className="text-xs text-muted-foreground mb-1">{edu.period}</p>
                    <p className="font-medium text-sm">
                      {language === 'zh' ? edu.institution : edu.institutionEn}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {language === 'zh' ? `${edu.degree} · ${edu.major}` : `${edu.degreeEn} · ${edu.majorEn}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-5">{t('about.roles')}</h3>
              <ul className="space-y-3">
                {(language === 'zh' ? profile.roles : profile.rolesEn).map((role, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{role}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground mt-6">
                {language === 'zh' ? profile.fieldStation : profile.fieldStationEn}
              </p>
            </div>
          </div>
        </div>
      </section>

      <PublicationsCarousel />
      <StudentsCarousel />

      {/* News preview */}
      <section className="py-16 md:py-20 bg-white dark:bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold">{t('news.homeTitle')}</h2>
            <Button asChild variant="ghost">
              <Link to="/news">
                {t('news.viewAll')} <ExternalLink className="ml-1 w-4 h-4" />
              </Link>
            </Button>
          </div>
          <div className="space-y-3 max-w-4xl mx-auto">
            {latestNews.map((item) => {
              const title = language === 'en' && item.titleEn ? item.titleEn : item.title;
              const isInternal = item.link.startsWith('/#/');
              const body = (
                <Card className="hover:shadow-md transition-shadow border-0 bg-gray-50 dark:bg-muted/40">
                  <CardContent className="p-4 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.date}
                        {item.source ? ` · ${language === 'en' && item.sourceEn ? item.sourceEn : item.source}` : ''}
                      </p>
                    </div>
                    <Newspaper className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  </CardContent>
                </Card>
              );
              if (isInternal) {
                return (
                  <Link key={item.id} to={item.link.replace('/#', '') || '/'}>
                    {body}
                  </Link>
                );
              }
              return (
                <a key={item.id} href={item.link} target="_blank" rel="noopener noreferrer">
                  {body}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-muted/40 dark:to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              {language === 'zh' ? '快速导航' : 'Quick Navigation'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              const isExternal = link.isExternal || link.path.startsWith('http');

              const cardContent = (
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group border-0 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${link.color}`} />
                  <CardContent className="p-5 text-center">
                    <div className={`w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-bold text-base mb-1 group-hover:text-primary transition-colors flex items-center justify-center gap-1">
                      {link.title}
                      {isExternal && <ExternalLink className="w-3 h-3" />}
                    </h3>
                    <p className="text-xs text-muted-foreground">{link.description}</p>
                  </CardContent>
                </Card>
              );

              return isExternal ? (
                <a href={link.path} target="_blank" rel="noopener noreferrer" key={index}>
                  {cardContent}
                </a>
              ) : (
                <Link to={link.path} key={index}>
                  {cardContent}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50 dark:from-background dark:to-muted/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">{t('socialLinks.title')}</h2>
            <p className="text-muted-foreground text-sm">{t('socialLinks.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <a href={link.url} target="_blank" rel="noopener noreferrer" key={index}>
                  <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group border-0 overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${link.color}`} />
                    <CardContent className="p-5 text-center">
                      <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-bold text-base mb-1 group-hover:text-primary transition-colors">
                        {language === 'zh' ? link.name : link.nameEn}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        {language === 'zh' ? link.description : link.descriptionEn}
                      </p>
                      <div className="flex items-center justify-center text-primary text-xs">
                        <span>{t('socialLinks.visit')}</span>
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recruitment */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-teal-500/80 via-cyan-500/80 to-blue-500/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <GraduationCap className="w-14 h-14 mx-auto mb-5 text-white/90" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{t('recruitment.title')}</h2>
          <p className="text-lg text-white/90 mb-8 max-w-3xl mx-auto">
            {t('recruitment.subtitle')}
          </p>
          <Button asChild size="lg" className="bg-white text-teal-600 hover:bg-white/90 shadow-lg">
            <Link to="/contact">
              <Mail className="mr-2 w-5 h-5" /> {t('recruitment.cta')}
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;

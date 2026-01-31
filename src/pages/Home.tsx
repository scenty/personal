import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, Database, FolderGit2, Mail, Award, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import HeroCarousel from '@/components/HeroCarousel';
import PublicationsCarousel from '@/components/PublicationsCarousel';
import StudentsCarousel from '@/components/StudentsCarousel';
import { profile, projects, allStudents } from '@/data';
import { useLanguage } from '@/contexts/LanguageContext';

const Home = () => {
  const { language, t } = useLanguage();

  const stats = [
    { 
      value: profile.stats.firstAuthorPapers, 
      label: t('stats.papers'),
      icon: BookOpen 
    },
    { 
      value: profile.stats.q2AbovePapers, 
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
  ];

  const researchInterests = language === 'zh' 
    ? profile.researchInterests 
    : [
        'AI Oceanography',
        'Ocean Dynamics & Ecosystem Modeling',
        'Remote Sensing Applications',
        'Global Climate Change',
        'Global Warming Hiatus'
      ];

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow border-0 bg-gray-50">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-4xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Publications Carousel */}
      <PublicationsCarousel />

      {/* Research Interests */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('research.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'zh' 
                ? '聚焦人工智能与海洋科学的交叉领域，探索前沿计算方法' 
                : 'Focusing on the intersection of AI and ocean science, exploring cutting-edge computational methods'}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {researchInterests.map((interest, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <p className="font-medium text-sm">{interest}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Students Carousel */}
      <StudentsCarousel />

      {/* Quick Links */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'zh' ? '快速导航' : 'Quick Navigation'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Link to={link.path} key={index}>
                  <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group border-0 overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${link.color}`} />
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${link.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{link.title}</h3>
                      <p className="text-sm text-muted-foreground">{link.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                {profile.institution}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {language === 'zh' ? profile.name : profile.nameEn}
              </h2>
              <p className="text-xl text-white/80 mb-4">{profile.title}</p>
              <p className="text-white/70 leading-relaxed mb-6">
                {language === 'zh' ? profile.bio : 
                  `Associate Professor at Sun Yat-sen University, specializing in computational ocean science and marine modeling. 
                  Ph.D. in Physical Oceanography from Xiamen University and University of Delaware. 
                  Published 18 SCI papers as first/corresponding author, with research focusing on AI oceanography, 
                  ocean dynamics modeling, and remote sensing applications.`}
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                {profile.honors.map((honor, idx) => (
                  <span key={idx} className="bg-white/10 px-3 py-1 rounded-full text-sm">
                    {honor}
                  </span>
                ))}
              </div>
              <Button asChild className="bg-white text-blue-900 hover:bg-white/90">
                <Link to="/contact">
                  <Mail className="mr-2 w-4 h-4" /> 
                  {language === 'zh' ? '联系我' : 'Contact Me'}
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {profile.awards.map((award, idx) => (
                <Card key={idx} className="bg-white/10 border-white/20 text-white">
                  <CardContent className="p-4">
                    <Award className="w-8 h-8 mb-2 text-yellow-400" />
                    <p className="text-sm font-medium">{award.title}</p>
                    {award.year && <p className="text-xs text-white/60">{award.year}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recruitment */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <GraduationCap className="w-16 h-16 mx-auto mb-6 text-white/80" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('recruitment.title')}</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            {t('recruitment.subtitle')}
          </p>
          <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-white/90">
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

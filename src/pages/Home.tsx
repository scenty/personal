import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, Database, FolderGit2, Mail, TrendingUp, Users, ExternalLink, MessageCircle, FileText, IdCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

  // 友情链接数据
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
    }
  ];

  // 四个代表性奖励
  const awards = [
    { title: '中山大学"百人计划"', titleEn: 'SYSU "Hundred Talents"' },
    { title: '福建省级高层次人才C类', titleEn: 'Fujian High-level Talent (C)' },
    { title: '知乎优秀回答者', titleEn: 'Zhihu Top Contributor' },
    { title: '海科院"我心目中的良师"', titleEn: '"My Favorite Teacher" Award' },
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

  // 更新后的个人简介（简短版）
  const bioText = language === 'zh' 
    ? `卢文芳，1989年出生，福建泉州人，中山大学“百人计划”、福建省高层次人才C类，现任海洋动力过程与气候教研室（系）副主任，珠江口海洋生态教育部野外观测站副站长。曾获海科院2025年“我心目中的良师”称号、亚洲大洋洲地球科学学会（AOGS）2016年年会海洋学分会最佳海报奖、国家公派奖学金、博士研究生国家奖学金等多项奖励。知乎海洋、海洋科学领域优秀回答者。目前已发表第一/通讯作者SCI论文18篇，包括中科院二区以上论文14篇。主持国家自然基金青年基金、重点研发子任务、中国博士后基金、广东省/福建省科技厅自然基金、南海所开放课题等科研项目。担任国际英文期刊Ocean-Land-Atmosphere Research（OLAR）青年编委、Remote Sensing期刊客座编辑、中国海洋学会人工智能海洋学专业委员会委员、GRL/JGR/TGRS/RS等数十种国际期刊审稿人。`
    : `Born in 1989, from Quanzhou, Fujian Province. Selected for Sun Yat-sen University’s “Hundred Talents Program” and recognized as a Fujian Provincial High-Level Talent (Category C). Currently serves as Deputy Director of the Teaching and Research Section (Department) of Ocean Dynamics and Climate, and Deputy Director of the Ministry of Education Pearl River Estuary Marine Ecology Field Observation Station.

Honors and awards include the 2025 “Teacher I Admire Most” title from the Institute of Oceanography, the Best Poster Award (Oceanography Section) at the 2016 Annual Meeting of the Asia Oceania Geosciences Society (AOGS), the National Government-Sponsored Scholarship, and the National Scholarship for Doctoral Students, among others. Recognized as an outstanding contributor in the fields of oceans and marine science on Zhihu.

To date, has published 18 SCI papers as first or corresponding author, including 14 papers in CAS Zone II journals or above. Has led or participated as PI in projects funded by the National Natural Science Foundation of China (Young Scientists Fund), sub-tasks of National Key R&D Programs, the China Postdoctoral Science Foundation, Natural Science Foundations of Guangdong and Fujian Provinces, and open research programs of the South China Sea Institute of Oceanology.

Currently serves as a Young Editorial Board Member of the international English-language journal Ocean–Land–Atmosphere Research (OLAR), Guest Editor of Remote Sensing, a member of the Professional Committee on Artificial Intelligence Oceanography of the Chinese Society of Oceanography, and a reviewer for dozens of international journals including GRL, JGR, TGRS, and RS.`;

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Research Interests */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">{t('research.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'zh' 
                ? '聚焦人工智能与海洋科学的交叉领域' 
                : 'Focusing on the intersection of AI and ocean science'}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {researchInterests.map((interest, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all hover:-translate-y-1 border-0 bg-gradient-to-br from-gray-50 to-white">
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

      {/* Stats Section */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow border-0 bg-white">
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

      {/* Profile Section with Ocean Circulation Background */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(/images/ocean-circulation.jpg)' }}
        >
          <div className="absolute inset-0 bg-slate-900/80" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Left: Name & Bio */}
            <div className="flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {language === 'zh' ? profile.name : profile.nameEn}
              </h2>
              <p className="text-lg text-white/70 mb-6">{profile.title}</p>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <p className="text-white/85 leading-relaxed whitespace-pre-line text-sm md:text-base">
                  {bioText}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                <Button asChild className="bg-white text-slate-900 hover:bg-white/90">
                  <Link to="/publications">
                    <Mail className="mr-2 w-4 h-4" /> 
                    {language === 'zh' ? '查看论文' : 'Publications'}
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link to="/contact">
                    <BookOpen className="mr-2 w-4 h-4" /> 
                    {language === 'zh' ? '联系我' : 'Contact Me'}
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right: 2x2 Awards Grid */}
            <div className="grid grid-cols-2 gap-4">
              {awards.map((award, idx) => (
                <div 
                  key={idx} 
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 flex items-center justify-center text-center hover:bg-white/15 transition-colors"
                >
                  <p className="text-white font-medium text-sm md:text-base leading-snug">
                    {language === 'zh' ? award.title : award.titleEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Publications Carousel */}
      <PublicationsCarousel />

      {/* Students Carousel */}
      <StudentsCarousel />

      {/* Quick Links */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              {language === 'zh' ? '快速导航' : 'Quick Navigation'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Link to={link.path} key={index}>
                  <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group border-0 overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${link.color}`} />
                    <CardContent className="p-5 text-center">
                      <div className={`w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="font-bold text-base mb-1 group-hover:text-primary transition-colors">{link.title}</h3>
                      <p className="text-xs text-muted-foreground">{link.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Links - 友情链接 */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              {language === 'zh' ? '友情链接' : 'Social Links'}
            </h2>
            <p className="text-muted-foreground text-sm">
              {language === 'zh' ? '关注我的更多平台' : 'Follow me on other platforms'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  key={index}
                >
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
                        <span>{language === 'zh' ? '访问' : 'Visit'}</span>
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

      {/* Recruitment - 欢迎报考 */}
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

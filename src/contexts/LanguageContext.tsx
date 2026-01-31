import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string | string[];
}

const translations = {
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.publications': '研究成果',
    'nav.students': '研究生团队',
    'nav.dataProducts': '数据产品',
    'nav.projects': '科研项目',
    'nav.contact': '联系方式',
    
    // Hero
    'hero.subtitle': '中山大学海洋科学学院 副教授',
    'hero.cta.publications': '查看研究成果',
    'hero.cta.contact': '联系我',
    
    // Stats
    'stats.papers': '第一/通讯作者SCI论文',
    'stats.q2Papers': '中科院二区以上论文',
    'stats.projects': '主持科研项目',
    'stats.students': '指导研究生',
    
    // Research Interests
    'research.title': '研究兴趣',
    
    // Publications Section
    'publications.sectionTitle': '最新研究成果',
    'publications.viewAll': '查看全部',
    'publications.firstAuthor': '第一作者',
    'publications.correspondingAuthor': '通讯作者',
    
    // Quick Links
    'quickLinks.publications': '研究成果',
    'quickLinks.publicationsDesc': '查看发表的学术论文和专著',
    'quickLinks.students': '研究生团队',
    'quickLinks.studentsDesc': '了解指导的研究生及其研究方向',
    'quickLinks.dataProducts': '数据产品',
    'quickLinks.dataProductsDesc': '下载开放共享的科学数据集',
    'quickLinks.projects': '科研项目',
    'quickLinks.projectsDesc': '查看主持和参与的科研项目',
    
    // Recruitment
    'recruitment.title': '欢迎报考',
    'recruitment.subtitle': '欢迎海洋、环境、大气、地理等专业学生报考！加入我们，一起探索人工智能等前沿计算方法及其海洋应用！',
    'recruitment.cta': '联系我',
    
    // Footer
    'footer.contact': '联系方式',
    'footer.quickLinks': '快速链接',
    'footer.institution': '所属机构',
    'footer.copyright': '版权所有',
    
    // Language Switch
    'lang.switch': 'EN',
    'lang.current': '中文',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.publications': 'Publications',
    'nav.students': 'Students',
    'nav.dataProducts': 'Data Products',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.subtitle': 'Associate Professor, School of Marine Sciences, Sun Yat-sen University',
    'hero.cta.publications': 'View Publications',
    'hero.cta.contact': 'Contact Me',
    
    // Stats
    'stats.papers': 'First/Corresponding Author Papers',
    'stats.q2Papers': 'Q2+ Journal Papers',
    'stats.projects': 'Research Projects',
    'stats.students': 'Supervised Students',
    
    // Research Interests
    'research.title': 'Research Interests',
    
    // Publications Section
    'publications.sectionTitle': 'Latest Publications',
    'publications.viewAll': 'View All',
    'publications.firstAuthor': 'First Author',
    'publications.correspondingAuthor': 'Corresponding Author',
    
    // Quick Links
    'quickLinks.publications': 'Publications',
    'quickLinks.publicationsDesc': 'View published academic papers and books',
    'quickLinks.students': 'Student Team',
    'quickLinks.studentsDesc': 'Learn about supervised students and their research',
    'quickLinks.dataProducts': 'Data Products',
    'quickLinks.dataProductsDesc': 'Download open scientific datasets',
    'quickLinks.projects': 'Research Projects',
    'quickLinks.projectsDesc': 'View led and participated projects',
    
    // Recruitment
    'recruitment.title': 'Join Us',
    'recruitment.subtitle': 'Welcome students from Oceanography, Environment, Atmospheric Science, and Geography! Join us to explore AI and cutting-edge computational methods in marine applications!',
    'recruitment.cta': 'Contact Me',
    
    // Footer
    'footer.contact': 'Contact',
    'footer.quickLinks': 'Quick Links',
    'footer.institution': 'Institution',
    'footer.copyright': 'All Rights Reserved',
    
    // Language Switch
    'lang.switch': '中',
    'lang.current': 'English',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language;
      return saved || 'zh';
    }
    return 'zh';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string | string[] => {
    const currentTranslations = translations[language];
    return currentTranslations[key as keyof typeof currentTranslations] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

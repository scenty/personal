import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string | string[];
}

const translations = {
  zh: {
    'nav.home': '首页',
    'nav.publications': '研究成果',
    'nav.students': '学生团队',
    'nav.teaching': '教学',
    'nav.news': '动态',
    'nav.dataProducts': '数据产品',
    'nav.projects': '科研项目',
    'nav.contact': '联系方式',

    'hero.subtitle': '中山大学海洋科学学院 副教授',
    'hero.cta.publications': '查看研究成果',
    'hero.cta.contact': '联系我',

    'stats.papers': '第一/通讯作者SCI论文',
    'stats.q2Papers': '中科院二区以上论文',
    'stats.projects': '主持科研项目',
    'stats.students': '指导研究生',

    'research.title': '研究兴趣',
    'about.education': '教育经历',
    'about.roles': '学术任职',
    'about.honors': '人才计划',

    'publications.sectionTitle': '最新研究成果',
    'publications.viewAll': '查看全部',
    'publications.firstAuthor': '第一作者',
    'publications.correspondingAuthor': '通讯作者',
    'publications.pageTitle': '研究成果',
    'publications.pageDesc': '已发表第一/通讯作者SCI论文{paperCount}篇，包括中科院二区以上论文{q2Count}篇。研究领域涵盖人工智能海洋学、海洋动力过程、遥感应用等。',
    'publications.statRep': '代表性论文',
    'publications.statFirst': '第一作者论文',
    'publications.statCorr': '通讯作者论文',
    'publications.search': '搜索论文标题、作者或期刊...',
    'publications.filterAll': '全部',
    'publications.viewList': '列表视图',
    'publications.viewYear': '按年份',
    'publications.detail': '详情',

    'quickLinks.publications': '研究成果',
    'quickLinks.publicationsDesc': '查看发表的学术论文和专著',
    'quickLinks.students': '学生团队',
    'quickLinks.studentsDesc': '了解指导的研究生及其研究方向',
    'quickLinks.dataProducts': '数据产品',
    'quickLinks.dataProductsDesc': '下载开放共享的科学数据集',
    'quickLinks.projects': '科研项目',
    'quickLinks.projectsDesc': '查看主持和参与的科研项目',
    'quickLinks.teaching': '教学课程',
    'quickLinks.teachingDesc': '人工智能海洋学等课程资源',
    'quickLinks.news': '最新动态',
    'quickLinks.newsDesc': '媒体报道、获奖与招生信息',

    'recruitment.title': '欢迎报考',
    'recruitment.subtitle': '欢迎海洋、环境、大气、地理等专业学生报考！加入我们，一起探索人工智能等前沿计算方法及其海洋应用！',
    'recruitment.cta': '联系我',

    'footer.contact': '联系方式',
    'footer.quickLinks': '快速链接',
    'footer.institution': '所属机构',
    'footer.copyright': '版权所有',
    'footer.postcode': '邮编',

    'socialLinks.title': '友情链接',
    'socialLinks.subtitle': '关注我的更多平台',
    'socialLinks.visit': '访问',

    'lang.switch': 'EN',
    'lang.current': '中文',
    'theme.toDark': '夜间模式',
    'theme.toLight': '日间模式',

    'pubDetail.back': '返回论文列表',
    'pubDetail.abstract': '摘要',
    'pubDetail.keywords': '关键词',
    'pubDetail.highlights': '亮点',
    'pubDetail.figures': '代表性图表',
    'pubDetail.newsCoverage': '媒体报道',
    'pubDetail.relatedLinks': '相关链接',
    'pubDetail.viewPaper': '查看论文 (DOI)',
    'pubDetail.downloadPDF': 'PDF下载',
    'pubDetail.downloadData': '数据下载',
    'pubDetail.codeRepo': '代码仓库',
    'pubDetail.citation': '引用信息',
    'pubDetail.copyCitation': '复制引用',
    'pubDetail.copyBibtex': '复制 BibTeX',
    'pubDetail.copied': '已复制',
    'pubDetail.relatedPubs': '相关论文',

    'teaching.pageTitle': '教学',
    'teaching.pageDesc': '课程资源与教学相关荣誉',
    'teaching.openCourse': '访问课程网站',
    'teaching.awards': '教学荣誉',

    'news.pageTitle': '动态',
    'news.pageDesc': '媒体报道、学术荣誉与招生信息',
    'news.type.media': '媒体',
    'news.type.award': '荣誉',
    'news.type.talk': '讲座',
    'news.type.recruitment': '招生',
    'news.type.other': '其他',
    'news.relatedPaper': '相关论文',
    'news.homeTitle': '最新动态',
    'news.viewAll': '查看全部',

    'contact.pageTitle': '联系方式',
    'contact.pageDesc': '欢迎海洋、环境、大气、地理等专业学生报考！加入我们，一起探索人工智能等前沿计算方法及其海洋应用！',
    'contact.email': '电子邮箱',
    'contact.phone': '办公电话',
    'contact.address': '办公地址',
    'contact.platforms': '其他平台',
    'contact.institution': '所属机构',
    'contact.mainUnit': '主要单位',
    'contact.recruitment': '招生信息',
    'contact.majors': '欢迎报考专业',
    'contact.interests': '研究方向',
    'contact.join': '加入我们',
    'contact.joinDesc': '一起探索人工智能等前沿计算方法及其海洋应用',
    'contact.sendMail': '发送邮件',

    'dataProducts.pageTitle': '数据产品',
    'dataProducts.pageDesc': '开放共享的科学数据集，包括全球海洋热含量、南海叶绿素重建、海岸带碳数据等。所有数据集均提供下载链接和相关论文引用信息。',
    'dataProducts.download': '下载数据',
    'dataProducts.code': '代码',
    'dataProducts.paper': '论文',
    'dataProducts.paperInternal': '站内详情',
    'dataProducts.applications': '应用案例',
    'dataProducts.books': '学术专著',
    'dataProducts.usage': '使用说明',
    'dataProducts.usageText': '使用本网站提供的数据产品时，请在发表的研究成果中引用相应的论文。这不仅是对作者工作的认可，也有助于数据的持续更新和维护。如有任何问题或建议，欢迎通过联系方式与我交流。',
    'dataProducts.spatial': '空间分辨率',
    'dataProducts.temporal': '时间分辨率',
    'dataProducts.timeRange': '时间范围',
    'dataProducts.region': '区域',
    'dataProducts.variables': '变量',

    'projects.pageTitle': '科研项目',
    'projects.pageDesc': '主持国家自然基金青年基金、重点研发子任务、中国博士后基金、广东省/福建省科技厅自然基金、南海所开放课题等科研项目。',
    'projects.total': '项目总数',
    'projects.ongoing': '进行中',
    'projects.completed': '已完成',
    'projects.leader': '主持项目',
    'projects.all': '全部项目',
    'projects.fundingOrgs': '资助机构',
    'projects.relatedPubs': '相关论文',
    'projects.statusOngoing': '进行中',
    'projects.statusCompleted': '已完成',
    'projects.rolePI': '主持',
    'projects.roleParticipant': '参与',
  },
  en: {
    'nav.home': 'Home',
    'nav.publications': 'Publications',
    'nav.students': 'Students',
    'nav.teaching': 'Teaching',
    'nav.news': 'News',
    'nav.dataProducts': 'Data Products',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',

    'hero.subtitle': 'Associate Professor, School of Marine Sciences, Sun Yat-sen University',
    'hero.cta.publications': 'View Publications',
    'hero.cta.contact': 'Contact Me',

    'stats.papers': 'First/Corresponding Author Papers',
    'stats.q2Papers': 'Q2+ Journal Papers',
    'stats.projects': 'Research Projects',
    'stats.students': 'Supervised Students',

    'research.title': 'Research Interests',
    'about.education': 'Education',
    'about.roles': 'Academic Roles',
    'about.honors': 'Talent Programs',

    'publications.sectionTitle': 'Latest Publications',
    'publications.viewAll': 'View All',
    'publications.firstAuthor': 'First Author',
    'publications.correspondingAuthor': 'Corresponding Author',
    'publications.pageTitle': 'Publications',
    'publications.pageDesc': 'Published {paperCount} SCI papers as first or corresponding author, including {q2Count} papers in CAS Zone II journals or above. Research spans AI oceanography, ocean dynamics, and remote sensing.',
    'publications.statRep': 'Representative Papers',
    'publications.statFirst': 'First Author',
    'publications.statCorr': 'Corresponding Author',
    'publications.search': 'Search title, author, or journal...',
    'publications.filterAll': 'All',
    'publications.viewList': 'List',
    'publications.viewYear': 'By Year',
    'publications.detail': 'Details',

    'quickLinks.publications': 'Publications',
    'quickLinks.publicationsDesc': 'View published academic papers and books',
    'quickLinks.students': 'Student Team',
    'quickLinks.studentsDesc': 'Learn about supervised students and their research',
    'quickLinks.dataProducts': 'Data Products',
    'quickLinks.dataProductsDesc': 'Download open scientific datasets',
    'quickLinks.projects': 'Research Projects',
    'quickLinks.projectsDesc': 'View led and participated projects',
    'quickLinks.teaching': 'Teaching',
    'quickLinks.teachingDesc': 'AI Oceanography and course resources',
    'quickLinks.news': 'News',
    'quickLinks.newsDesc': 'Media coverage, awards, and recruitment',

    'recruitment.title': 'Join Us',
    'recruitment.subtitle': 'Welcome students from Oceanography, Environment, Atmospheric Science, and Geography! Join us to explore AI and cutting-edge computational methods in marine applications!',
    'recruitment.cta': 'Contact Me',

    'footer.contact': 'Contact',
    'footer.quickLinks': 'Quick Links',
    'footer.institution': 'Institution',
    'footer.copyright': 'All Rights Reserved',
    'footer.postcode': 'Postcode',

    'socialLinks.title': 'Social Links',
    'socialLinks.subtitle': 'Follow me on other platforms',
    'socialLinks.visit': 'Visit',

    'lang.switch': '中',
    'lang.current': 'English',
    'theme.toDark': 'Dark mode',
    'theme.toLight': 'Light mode',

    'pubDetail.back': 'Back to Publications',
    'pubDetail.abstract': 'Abstract',
    'pubDetail.keywords': 'Keywords',
    'pubDetail.highlights': 'Highlights',
    'pubDetail.figures': 'Representative Figures',
    'pubDetail.newsCoverage': 'News Coverage',
    'pubDetail.relatedLinks': 'Related Links',
    'pubDetail.viewPaper': 'View Paper (DOI)',
    'pubDetail.downloadPDF': 'Download PDF',
    'pubDetail.downloadData': 'Download Data',
    'pubDetail.codeRepo': 'Code Repository',
    'pubDetail.citation': 'Citation',
    'pubDetail.copyCitation': 'Copy Citation',
    'pubDetail.copyBibtex': 'Copy BibTeX',
    'pubDetail.copied': 'Copied',
    'pubDetail.relatedPubs': 'Related Publications',

    'teaching.pageTitle': 'Teaching',
    'teaching.pageDesc': 'Course resources and teaching awards',
    'teaching.openCourse': 'Open Course Site',
    'teaching.awards': 'Teaching Awards',

    'news.pageTitle': 'News',
    'news.pageDesc': 'Media coverage, academic honors, and recruitment',
    'news.type.media': 'Media',
    'news.type.award': 'Award',
    'news.type.talk': 'Talk',
    'news.type.recruitment': 'Recruitment',
    'news.type.other': 'Other',
    'news.relatedPaper': 'Related paper',
    'news.homeTitle': 'Latest News',
    'news.viewAll': 'View All',

    'contact.pageTitle': 'Contact',
    'contact.pageDesc': 'Welcome students from Oceanography, Environment, Atmospheric Science, and Geography! Join us to explore AI and cutting-edge computational methods in marine applications!',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.address': 'Address',
    'contact.platforms': 'Other Platforms',
    'contact.institution': 'Institution',
    'contact.mainUnit': 'Primary Affiliation',
    'contact.recruitment': 'Recruitment',
    'contact.majors': 'Welcome Majors',
    'contact.interests': 'Research Interests',
    'contact.join': 'Join Us',
    'contact.joinDesc': 'Explore AI and cutting-edge computational methods in marine applications',
    'contact.sendMail': 'Send Email',

    'dataProducts.pageTitle': 'Data Products',
    'dataProducts.pageDesc': 'Open scientific datasets including global ocean heat content, SCS chlorophyll reconstruction, and coastal carbon data. Download links and paper citations are provided.',
    'dataProducts.download': 'Download Data',
    'dataProducts.code': 'Code',
    'dataProducts.paper': 'Paper',
    'dataProducts.paperInternal': 'On-site Detail',
    'dataProducts.applications': 'Applications',
    'dataProducts.books': 'Book Chapters',
    'dataProducts.usage': 'Usage',
    'dataProducts.usageText': 'Please cite the corresponding papers when using these data products. This acknowledges the authors and supports continued maintenance. Contact me with any questions or suggestions.',
    'dataProducts.spatial': 'Spatial Resolution',
    'dataProducts.temporal': 'Temporal Resolution',
    'dataProducts.timeRange': 'Time Range',
    'dataProducts.region': 'Region',
    'dataProducts.variables': 'Variables',

    'projects.pageTitle': 'Research Projects',
    'projects.pageDesc': 'Projects funded by NSFC Young Scientists Fund, National Key R&D Program sub-tasks, China Postdoctoral Science Foundation, Guangdong/Fujian NSF, and open programs of SCSIO.',
    'projects.total': 'Total Projects',
    'projects.ongoing': 'Ongoing',
    'projects.completed': 'Completed',
    'projects.leader': 'As PI',
    'projects.all': 'All',
    'projects.fundingOrgs': 'Funding Agencies',
    'projects.relatedPubs': 'Related Publications',
    'projects.statusOngoing': 'Ongoing',
    'projects.statusCompleted': 'Completed',
    'projects.rolePI': 'PI',
    'projects.roleParticipant': 'Participant',
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

// 研究生信息
export interface Student {
  id: string;
  name: string;
  nameEn?: string;
  institution:  "sysu" | "fzu" ; // 福州大学 or 中山大学
  institutionName: string;
  degree?: string; // 硕士/博士
  year?: number; // 入学年份
  researchTopic?: string;
  photo?: string;
  email?: string;
  publications?: string[];
  awards?: string[];
  status: "current" | "graduated"; // 在读/已毕业
  graduationYear?: number;
  currentPosition?: string;
  bio?: string;
}

// 中山大学研究生
export const sysuStudents: Student[] = [
  {
    id: "he-jiangnan",
    name: "何江南",
    nameEn: "Jiangnan He",
    institution: "sysu",
    institutionName: "中山大学",
    degree: "硕士",
    status: "current",
    researchTopic: "海洋智能预报和三维重建",
    publications: ["He et al. (2024) Ocean-Land-Atmosphere Research"],
    awards: ["第三届人工智能海洋学论坛最佳海报奖"],
    bio: "研究方向为人工智能方法在海洋科学中的应用。"
  },
  {
    id: "yang-guangyu",
    name: "杨光宇",
    nameEn: "Guangyu Yang",
    institution: "sysu",
    institutionName: "中山大学",
    degree: "本科/硕士",
    status: "current",
    researchTopic: "Neural Wave Model",
    publications: ["Yang et al. (2024) Science of The Total Environment"],
    awards: ["省级大创项目优秀结题"],
    bio: "本科大创团队成员，研究方向为利用人工智能方法重建海洋三维硝酸盐结构。"
  },
  {
    id: "zheng-yujiao",
    name: "郑钰娇",
    nameEn: "Yujiao Zheng",
    institution: "sysu",
    institutionName: "中山大学",
    degree: "硕士",
    status: "current",
    researchTopic: "海洋热浪三维重建",
    bio: "研究方向为海洋热浪三维结构的深海遥感重建。"
  },
  {
    id: "huang-nanxiang",
    name: "黄南翔",
    nameEn: "Nanxiang Huang",
    institution: "sysu",
    institutionName: "中山大学",
    degree: "本科",
    status: "current",
    researchTopic: "海洋智能预报",
    bio: "研究方向为海洋数值模式与智能预报技术。"
  },
  {
    id: "zhong-xinyi",
    name: "钟昕怡",
    nameEn: "Xinyi Zhong",
    institution: "sysu",
    institutionName: "中山大学",
    degree: "硕士",
    status: "current",
    researchTopic: "海浪智能降尺度",
    bio: "研究方向为海浪智能降尺度。"
  },
  {
    id: "ren-hengye",
    name: "任姮烨",
    nameEn: "Hengye Ren",
    institution: "sysu",
    institutionName: "中山大学",
    degree: "博士",
    status: "graduated",
    researchTopic: "MJO与海洋生态系统",
    publications: ["Ren et al. (2024) Progress in Oceanography"],
    bio: "研究方向为Madden-Julian振荡对南海海洋生态系统的影响。"
  },
  {
    id: "jiang-youjie",
    name: "姜佑捷",
    nameEn: "Youjie Jiang",
    institution: "sysu",
    institutionName: "中山大学",
    degree: "硕士",
    status: "graduated",
    researchTopic: "日尺度南海三维温度场的人工智能构建研究",
    currentPosition: "三亚市某局",
    bio: "研究方向为日尺度南海三维温度场的人工智能构建研究。"
  }
];


// 福州大学研究生
export const fzuStudents: Student[] = [
  {
    id: "zhang-haojie",
    name: "张浩杰",
    nameEn: "Haojie Zhang",
    institution: "fzu",
    institutionName: "福州大学",
    degree: "硕士",
    status: "graduated",
    researchTopic: "海洋数据同化与机器学习",
    bio: "研究方向为海洋数据同化技术与人工智能方法的结合应用。"
  },
  {
    id: "wang-tianhao",
    name: "王天浩",
    nameEn: "Tianhao Wang",
    institution: "fzu",
    institutionName: "福州大学",
    degree: "硕士",
    status: "graduated",
    researchTopic: "海洋遥感与生态建模",
    publications: ["Wang et al. (2022) Acta Oceanologica Sinica"],
    bio: "研究方向为海洋遥感数据重建与海洋生态系统建模。"
  },
  {
    id: "wang-jian",
    name: "王建",
    nameEn: "Jian Wang",
    institution: "fzu",
    institutionName: "福州大学",
    degree: "硕士",
    status: "graduated",
    researchTopic: "河流羽流数值模拟",
    publications: ["Lu et al. (2022) JGR: Oceans"],
    bio: "研究方向为亚热带河流羽流的数值模拟与数据驱动预测。"
  },
  {
    id: "gao-xinyu",
    name: "高心雨",
    nameEn: "Xinyu Gao",
    institution: "fzu",
    institutionName: "福州大学",
    degree: "硕士",
    status: "graduated",
    researchTopic: "海洋藻华事件提取",
    publications: ["Lu et al. (2022) Remote Sensing"],
    bio: "研究方向为基于遥感数据的海洋极端藻华事件提取与分析。"
  },
  {
    id: "lin-shaowen",
    name: "林少文",
    nameEn: "Shaowen Lin",
    institution: "fzu",
    institutionName: "福州大学",
    degree: "硕士",
    status: "graduated",
    researchTopic: "海洋生态遥感",
    publications: ["Lu et al. (2022) Remote Sensing"],
    bio: "研究方向为海洋生态参数的遥感反演与分析。"
  },
  {
    id: "huang-lei",
    name: "黄磊",
    nameEn: "Lei Huang",
    institution: "fzu",
    institutionName: "福州大学",
    degree: "硕士",
    status: "graduated",
    researchTopic: "海洋动力过程",
    bio: "研究方向为海洋动力过程与数值模拟。"
  }
];

// 所有学生
export const allStudents = [...sysuStudents, ...fzuStudents];

// 按学校分组
export const studentsByInstitution = {
  sysu: sysuStudents,
  fzu: fzuStudents
};

// 根据ID获取学生
export const getStudentById = (id: string): Student | undefined => {
  return allStudents.find(student => student.id === id);
};

export default allStudents;

// 科研项目数据
export interface Project {
  id: string;
  title: string;
  titleEn?: string;
  fundingSource: string;
  fundingSourceEn?: string;
  role: "主持" | "参与" | "骨干";
  roleEn?: string;
  duration?: string;
  amount?: string;
  description?: string;
  descriptionEn?: string;
  status: "ongoing" | "completed";
  relatedPublicationIds?: string[];
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "海浪—风暴潮数值模式及综合预警报技术",
    titleEn: "Wave–Storm Surge Numerical Modeling and Integrated Early Warning",
    fundingSource: "科技部重点研发",
    fundingSourceEn: "National Key R&D Program",
    role: "参与",
    roleEn: "Participant",
    duration: "2023–2026",
    status: "ongoing",
    description: "国家重点研发计划项目，旨在发展海浪-风暴潮耦合数值模式及综合预警报技术。",
    descriptionEn: "National Key R&D project on coupled wave–storm surge modeling and integrated early-warning technology."
  },
  {
    id: "project-2",
    title: "南海北部三维温度结构智能重建与应用",
    titleEn: "Intelligent Reconstruction of 3D Temperature Structure in the Northern SCS",
    fundingSource: "广东省自然基金面上项目",
    fundingSourceEn: "Guangdong NSF General Program",
    role: "主持",
    roleEn: "PI",
    duration: "2023–2026",
    status: "ongoing",
    description: "利用机器学习方法重建南海北部三维温度结构，为海洋环境预报提供数据支撑。",
    descriptionEn: "Machine-learning reconstruction of 3D temperature structure in the northern South China Sea for environmental forecasting.",
    relatedPublicationIds: ["he-2026-olar"]
  },
  {
    id: "project-3",
    title: "智能-动力耦合预报技术研究",
    titleEn: "Intelligent–Dynamical Coupled Forecasting",
    fundingSource: "厦门大学MEL高级访问学者基金",
    fundingSourceEn: "XMU MEL Senior Visiting Scholar Fund",
    role: "主持",
    roleEn: "PI",
    duration: "2022–2023",
    status: "completed",
    description: "与江毓武教授合作，开展智能-动力耦合预报技术研究。",
    descriptionEn: "Collaborative research with Prof. Yuwu Jiang on intelligent–dynamical coupled forecasting."
  },
  {
    id: "project-4",
    title: "珠江口海域中华白海豚对海洋动力响应机制研究",
    titleEn: "Response of Chinese White Dolphins to Ocean Dynamics in the Pearl River Estuary",
    fundingSource: "中央高校基本科研业务费",
    fundingSourceEn: "Fundamental Research Funds for Central Universities",
    role: "主持",
    roleEn: "PI",
    duration: "2022–2024",
    status: "ongoing",
    description: "研究珠江口海洋动力环境对中华白海豚栖息地的影响机制。",
    descriptionEn: "Mechanisms of Pearl River Estuary ocean dynamics affecting Chinese white dolphin habitats."
  },
  {
    id: "project-5",
    title: "亚中尺度过程对冬季吕宋藻华现象的生态效应研究",
    titleEn: "Ecological Effects of Submesoscale Processes on Winter Luzon Blooms",
    fundingSource: "国家自然科学青年基金",
    fundingSourceEn: "NSFC Young Scientists Fund",
    role: "主持",
    roleEn: "PI",
    duration: "2019–2021",
    status: "completed",
    description: "研究亚中尺度物理过程对冬季吕宋藻华发生发展的生态效应。",
    descriptionEn: "Ecological effects of submesoscale physical processes on winter phytoplankton blooms northwest of Luzon.",
    relatedPublicationIds: ["lu-2022-rs-bloom", "wang-2022-aos", "wang-2021-tgrs"]
  },
  {
    id: "project-6",
    title: "模拟亚中尺度过程对冬季吕宋藻华现象的生态效应",
    titleEn: "Simulating Ecological Effects of Submesoscale Processes on Luzon Blooms",
    fundingSource: "中国博士后基金项目二等",
    fundingSourceEn: "China Postdoctoral Science Foundation (Class II)",
    role: "主持",
    roleEn: "PI",
    duration: "2018–2020",
    status: "completed",
    description: "博士后基金项目，开展亚中尺度过程与藻华生态效应的数值模拟研究。",
    descriptionEn: "Postdoctoral project on numerical simulation of submesoscale processes and bloom ecology.",
    relatedPublicationIds: ["lu-2022-rs-bloom"]
  },
  {
    id: "project-7",
    title: "福建省近岸有害藻华机理和过程的模拟研究",
    titleEn: "Modeling Harmful Algal Blooms in Fujian Coastal Waters",
    fundingSource: "福建省自然基金面上项目",
    fundingSourceEn: "Fujian NSF General Program",
    role: "主持",
    roleEn: "PI",
    duration: "2019–2022",
    status: "completed",
    description: "研究福建省近岸海域有害藻华的发生机理和演变过程。",
    descriptionEn: "Mechanisms and evolution of harmful algal blooms in Fujian coastal waters.",
    relatedPublicationIds: ["lu-2022-rs-bloom"]
  }
];

// 按状态分组
export const projectsByStatus = {
  ongoing: projects.filter(p => p.status === "ongoing"),
  completed: projects.filter(p => p.status === "completed")
};

// 按角色分组
export const projectsByRole = {
  leader: projects.filter(p => p.role === "主持"),
  participant: projects.filter(p => p.role === "参与" || p.role === "骨干")
};

export default projects;

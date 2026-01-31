// 科研项目数据
export interface Project {
  id: string;
  title: string;
  fundingSource: string;
  role: "主持" | "参与" | "骨干";
  duration?: string;
  amount?: string;
  description?: string;
  status: "ongoing" | "completed";
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "海浪—风暴潮数值模式及综合预警报技术",
    fundingSource: "科技部重点研发",
    role: "参与",
    status: "ongoing",
    description: "国家重点研发计划项目，旨在发展海浪-风暴潮耦合数值模式及综合预警报技术。"
  },
  {
    id: "project-2",
    title: "南海北部三维温度结构智能重建与应用",
    fundingSource: "广东省自然基金面上项目",
    role: "主持",
    status: "ongoing",
    description: "利用机器学习方法重建南海北部三维温度结构，为海洋环境预报提供数据支撑。"
  },
  {
    id: "project-3",
    title: "智能-动力耦合预报技术研究",
    fundingSource: "厦门大学MEL高级访问学者基金",
    role: "主持",
    status: "completed",
    description: "与江毓武教授合作，开展智能-动力耦合预报技术研究。"
  },
  {
    id: "project-4",
    title: "珠江口海域中华白海豚对海洋动力响应机制研究",
    fundingSource: "中央高校基本科研业务费",
    role: "主持",
    status: "ongoing",
    description: "研究珠江口海洋动力环境对中华白海豚栖息地的影响机制。"
  },
  {
    id: "project-5",
    title: "亚中尺度过程对冬季吕宋藻华现象的生态效应研究",
    fundingSource: "国家自然科学青年基金",
    role: "主持",
    status: "completed",
    description: "研究亚中尺度物理过程对冬季吕宋藻华发生发展的生态效应。"
  },
  {
    id: "project-6",
    title: "模拟亚中尺度过程对冬季吕宋藻华现象的生态效应",
    fundingSource: "中国博士后基金项目二等",
    role: "主持",
    status: "completed",
    description: "博士后基金项目，开展亚中尺度过程与藻华生态效应的数值模拟研究。"
  },
  {
    id: "project-7",
    title: "福建省近岸有害藻华机理和过程的模拟研究",
    fundingSource: "福建省自然基金面上项目",
    role: "主持",
    status: "completed",
    description: "研究福建省近岸海域有害藻华的发生机理和演变过程。"
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

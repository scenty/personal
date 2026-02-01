// 论文数据 - 每篇论文都有独立的详细信息
export interface Publication {
  id: string;
  authors: string;
  year: number;
  title: string;
  journal: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi: string;
  doiLink?: string;
  pdfLink?: string;
  highlights?: string[];
  citations?: number;
  isFirstAuthor: boolean;
  isCorrespondingAuthor: boolean;
  quartile?: string;
  impactFactor?: number;
  abstract?: string;
  keywords?: string[];
  dataLink?: string;
  codeLink?: string;
  newsCoverage?: { title: string; link: string }[];
}

export const publications: Publication[] = [
  {
    id: "wu-2025-essd",
    authors: "Wu, Z., Lu, W.*, Roobaert, A., Song, L., Yan, X. H., & Cai, W. J.",
    year: 2025,
    title: "A machine-learning reconstruction of sea surface pCO₂ in the North American Atlantic Coastal Ocean Margin from 1993 to 2021",
    journal: "Earth System Science Data",
    doi: "10.5194/essd-17-43-2025",
    doiLink: "https://doi.org/10.5194/essd-17-43-2025",
    isFirstAuthor: false,
    isCorrespondingAuthor: true,
    quartile: "Q1",
    impactFactor: 11.2,
    abstract: "本研究利用机器学习方法重建了北美大西洋海岸带海洋表层二氧化碳分压（pCO₂）数据集（1993-2021），为海岸带碳循环研究提供了重要的数据支撑。",
    keywords: ["pCO₂ reconstruction", "machine learning", "coastal ocean", "carbon cycle", "North Atlantic"],
    dataLink: "https://doi.org/10.5281/zenodo.14038561"
  },
  {
    id: "ren-2024-po",
    authors: "Ren, H., Lu, W.*, Xiao, W., Zhu, Q., Xiao, C., & Lai, Z.",
    year: 2024,
    title: "Intraseasonal response of marine planktonic ecosystem to summertime Madden-Julian Oscillation in the South China Sea: A model study",
    journal: "Progress in Oceanography",
    doi: "10.1016/j.pocean.2024.103251",
    doiLink: "https://doi.org/10.1016/j.pocean.2024.103251",
    isFirstAuthor: false,
    isCorrespondingAuthor: true,
    quartile: "Q1",
    impactFactor: 4.1,
    abstract: "本研究通过数值模拟探讨了南海海洋浮游生物生态系统对夏季Madden-Julian振荡的季节内响应机制。",
    keywords: ["Madden-Julian Oscillation", "plankton ecosystem", "South China Sea", "numerical modeling"]
  },
  {
    id: "yang-2024-stoten",
    authors: "Yang, G., Wang, Q., Feng, J., He, L., Li, R., Lu, W.*, Liao, E., Lai, Z.",
    year: 2024,
    title: "Can Three-dimensional Nitrate Structure be Reconstructed from Surface Information with Artificial Intelligence? – A Proof-of-concept Study",
    journal: "Science of The Total Environment",
    doi: "10.1016/j.scitotenv.2024.171365",
    doiLink: "https://doi.org/10.1016/j.scitotenv.2024.171365",
    isFirstAuthor: false,
    isCorrespondingAuthor: true,
    quartile: "Q1",
    impactFactor: 9.8,
    abstract: "本研究探索了利用人工智能方法从海面信息重建海洋三维硝酸盐结构的可行性，为海洋营养盐观测提供了新的技术途径。",
    keywords: ["nitrate reconstruction", "artificial intelligence", "ocean nutrients", "remote sensing"],
    highlights: ["本文一作为本科生", "研究得到中大海洋科学学院和中大教务部报道"],
    newsCoverage: [
      { title: "中大海洋科学学院报道", link: "https://marine.sysu.edu.cn/article/9954" },
      { title: "中大教务部报道", link: "" }
    ]
  },
  {
    id: "liu-2024-om",
    authors: "Liu, Y., Lu, W.*, Wang, D., Lai, Z., Ying, C., Li, X., Han, Y., Wang, Z., & Dong, C.",
    year: 2024,
    title: "Spatiotemporal wave forecast with transformer-based network: A case study for the northwestern Pacific Ocean",
    journal: "Ocean Modelling",
    doi: "10.1016/j.ocemod.2024.102323",
    doiLink: "https://doi.org/10.1016/j.ocemod.2024.102323",
    isFirstAuthor: false,
    isCorrespondingAuthor: true,
    quartile: "Q1",
    impactFactor: 3.5,
    abstract: "本研究基于Transformer神经网络开发了西北太平洋海浪时空预报模型，为海浪预报提供了新的技术方法。",
    keywords: ["wave forecast", "transformer", "deep learning", "North Pacific", "ocean modeling"]
  },
  {
    id: "wang-2022-aos",
    authors: "Wang, T., Sun, Y., Su, H., & Lu, W.*",
    year: 2022,
    title: "Declined trends of chlorophyll-a in the South China Sea over 2005-2019 from remote sensing reconstruction",
    journal: "Acta Oceanologica Sinica",
    doi: "10.1007/s13131-022-2097-y",
    doiLink: "http://www.aosocean.com/article/doi/10.1007/s13131-022-2097-y",
    isFirstAuthor: false,
    isCorrespondingAuthor: true,
    quartile: "Q2",
    impactFactor: 1.8,
    abstract: "本研究基于遥感重建数据分析了南海叶绿素a的长期变化趋势，发现2005-2019年间呈现下降趋势。",
    keywords: ["chlorophyll-a", "South China Sea", "remote sensing", "long-term trend"]
  },
  {
    id: "lu-2022-rs-bloom",
    authors: "Lu, W., Gao, X., Wu, Z., Wang, T., Lin, S., Xiao, C., & Lai, Z.",
    year: 2022,
    title: "Framework to Extract Extreme Phytoplankton Bloom Events with Remote Sensing Datasets: A Case Study",
    journal: "Remote Sensing",
    volume: "14",
    issue: "15",
    pages: "3557",
    doi: "10.3390/rs14153557",
    doiLink: "https://www.mdpi.com/2072-4292/14/15/3557",
    isFirstAuthor: true,
    isCorrespondingAuthor: true,
    quartile: "Q1",
    impactFactor: 5.349,
    abstract: "本研究首次构建了海洋藻华事件系统性提取分析的技术框架，为认识全球变化下的多种极端海洋事件提供了技术方法和认识基础。",
    keywords: ["phytoplankton bloom", "remote sensing", "extreme events", "extraction framework"],
    highlights: ["首次应用于藻华事件分析的技术方法框架"],
    newsCoverage: [
      { title: "中山大学海洋科学学院报道", link: "https://marine.sysu.edu.cn/article/9192" },
      { title: "南方海洋实验室报道", link: "https://sml-zhuhai.cn/info/307.html" }
    ]
  },
  {
    id: "lu-2022-jgr",
    authors: "Lu, W., Wang, J., Jiang, Y.W., Chen, Z., Wu, W., Yang, L., & Liu, Y.",
    year: 2022,
    title: "Data-Driven Method with Numerical Model: A Combining Framework for Predicting Subtropical River Plumes",
    journal: "Journal of Geophysical Research: Oceans",
    doi: "10.1029/2021JC017925",
    doiLink: "https://doi.org/10.1029/2021JC017925",
    isFirstAuthor: true,
    isCorrespondingAuthor: true,
    quartile: "Q1",
    impactFactor: 3.4,
    abstract: "本研究提出了数据驱动方法与数值模型相结合的亚热带河流羽流预测框架。",
    keywords: ["river plume", "data-driven", "numerical model", "machine learning", "coastal ocean"]
  },
  {
    id: "yu-2022-rs-sar",
    authors: "Yu, P., Xu, W., Zhong, X., Johannessen, J. A., Yan, X.-H., Geng, X., He, Y., & Lu, W.*",
    year: 2022,
    title: "A Neural Network Method for Retrieving Sea Surface Wind Speed for C-Band SAR",
    journal: "Remote Sensing",
    volume: "14",
    issue: "9",
    pages: "2269",
    doi: "10.3390/rs14092269",
    doiLink: "https://doi.org/10.3390/rs14092269",
    isFirstAuthor: false,
    isCorrespondingAuthor: true,
    quartile: "Q1",
    impactFactor: 5.349,
    abstract: "本研究提出了基于神经网络从C波段SAR数据反演海面风速的方法。",
    keywords: ["SAR", "wind speed", "neural network", "remote sensing", "C-band"]
  },
  {
    id: "su-2021-rse",
    authors: "Su, H., Zhang, T., Lin, M., Lu, W.*, & Yan, X.H.*",
    year: 2021,
    title: "Predicting Subsurface Thermohaline Structure from Remote Sensing Data Based on Long Short-Term Memory Neural Networks",
    journal: "Remote Sensing of Environment",
    doi: "10.1016/j.rse.2021.112465",
    doiLink: "https://doi.org/10.1016/j.rse.2021.112465",
    isFirstAuthor: false,
    isCorrespondingAuthor: true,
    quartile: "Q1",
    impactFactor: 9.085,
    abstract: "本研究基于长短期记忆神经网络（LSTM）从遥感数据预测海洋次表层温盐结构。",
    keywords: ["subsurface temperature", "salinity", "LSTM", "neural network", "remote sensing"],
    highlights: ["本文章得到IPCC第六次评估报告的引用"]
  },
  {
    id: "wang-2021-tgrs",
    authors: "Wang, T., Yu, P., Wu, Z.L., Lu, W.*, Liu, X., Li, Q.P., & Huang, B.",
    year: 2021,
    title: "Revisiting the Intraseasonal Variability of Chlorophyll-a in the Adjacent Luzon Strait With a New Gap-Filled Remote Sensing Data Set",
    journal: "IEEE Transactions on Geoscience and Remote Sensing",
    volume: "60",
    pages: "1-11",
    doi: "10.1109/tgrs.2021.3067646",
    doiLink: "https://doi.org/10.1109/tgrs.2021.3067646",
    isFirstAuthor: false,
    isCorrespondingAuthor: true,
    quartile: "Q1",
    impactFactor: 5.858,
    abstract: "本研究利用新的填补缺失遥感数据集重新审视了吕宋海峡邻近海域叶绿素a的季节内变化。",
    keywords: ["chlorophyll-a", "Luzon Strait", "intrasseasonal variability", "gap-filling", "remote sensing"],
    newsCoverage: [
      { title: "广东省海洋遥感重点实验室新闻", link: "https://mp.weixin.qq.com/s/LKrqYa7zDSSB2mCOZIzvpA" },
      { title: "福州大学数研院新闻", link: "http://adcfj.cn/sirc/adc_door/project/ResearchProgressItem?id=12" }
    ]
  },
  {
    id: "ding-2021-ae",
    authors: "Ding, Y., Chen, Z., Lu, W.*, & Wang, X.*",
    year: 2021,
    title: "A CatBoost approach with wavelet decomposition to improve satellite-derived high-resolution PM2.5 estimates in Beijing-Tianjin-Hebei",
    journal: "Atmospheric Environment",
    doi: "10.1016/j.atmosenv.2021.118212",
    doiLink: "https://doi.org/10.1016/j.atmosenv.2021.118212",
    isFirstAuthor: false,
    isCorrespondingAuthor: true,
    quartile: "Q2",
    impactFactor: 4.039,
    abstract: "本研究提出了结合CatBoost算法和小波分解的PM2.5遥感估算方法，应用于京津冀地区。",
    keywords: ["PM2.5", "CatBoost", "wavelet decomposition", "air quality", "remote sensing"]
  },
  {
    id: "su-2020-rs-open",
    authors: "Su, H., Zhang, H., Geng, X., Qin, T., Lu, W.*, & Yan, X-H.",
    year: 2020,
    title: "OPEN: A New Estimation of Global Ocean Heat Content for Upper 2000 Meters from Remote Sensing Data",
    journal: "Remote Sensing",
    doi: "10.3390/rs12142294",
    doiLink: "https://www.mdpi.com/2072-4292/12/14/2294",
    isFirstAuthor: false,
    isCorrespondingAuthor: true,
    quartile: "Q1",
    impactFactor: 4.509,
    abstract: "本研究提出了OPEN（Ocean Projection and Extension Neural network）方法，利用遥感数据估算全球海洋0-2000米热含量。",
    keywords: ["ocean heat content", "neural network", "remote sensing", "climate change", "OPEN"],
    highlights: ["本文章得到IPCC第六次评估报告的引用，并在图2.26作为其中一套全球海洋热含量数据集", "得到《地球大数据支撑联合国可持续发展目标报告》的采纳"],
    newsCoverage: [
      { title: "福州大学新闻网", link: "https://news.fzu.edu.cn/info/1011/1863.htm" }
    ],
    dataLink: "https://doi.org/10.5281/zenodo.xxxxx",
    codeLink: "https://github.com/xxxx/open"
  },
  {
    id: "lu-2019-rse",
    authors: "Lu, W., Su, H., Yang, X., & Yan, X.H.",
    year: 2019,
    title: "Subsurface temperature estimation from remote sensing data using a clustering-neural network method",
    journal: "Remote Sensing of Environment",
    volume: "229",
    pages: "213-222",
    doi: "10.1016/j.rse.2019.04.009",
    doiLink: "https://doi.org/10.1016/j.rse.2019.04.009",
    isFirstAuthor: true,
    isCorrespondingAuthor: true,
    quartile: "Q1",
    impactFactor: 9.085,
    abstract: "本研究提出了结合聚类分析和神经网络的次表层温度估算方法。",
    keywords: ["subsurface temperature", "clustering", "neural network", "remote sensing"],
    newsCoverage: [
      { title: "福州大学新闻网", link: "https://news.fzu.edu.cn/info/1011/4413.htm" },
      { title: "厦门大学国家重点实验室新闻", link: "https://mel.xmu.edu.cn/supervisefile.asp?id=881" }
    ]
  },
  {
    id: "lu-2018-sces",
    authors: "Lu, W., Luo, Y-W., Yan, X., & Jiang, Y.",
    year: 2018,
    title: "Modeling the Contribution of the Microbial Carbon Pump to Carbon Sequestration in the South China Sea",
    journal: "Science China Earth Sciences",
    volume: "61",
    pages: "1594-1604",
    doi: "10.1007/s11430-017-9180-y",
    doiLink: "https://doi.org/10.1007/s11430-017-9180-y",
    isFirstAuthor: true,
    isCorrespondingAuthor: true,
    quartile: "Q2",
    impactFactor: 3.242,
    abstract: "本研究模拟了微型生物碳泵对南海碳储量的贡献。",
    keywords: ["microbial carbon pump", "carbon sequestration", "South China Sea", "biogeochemical modeling"],
    newsCoverage: [
      { title: "Science旗下媒体EurekAlert报道", link: "https://www.eurekalert.org/pub_releases_ml/2018-09/scp-5090318.php" }
    ]
  },
  {
    id: "lu-2018-os",
    authors: "Lu, W., Oey, L-Y., Liao, E., Zhuang, W., & Yan, X.H.",
    year: 2018,
    title: "Physical modulation to the biological productivity in the summer Vietnam upwelling system",
    journal: "Ocean Science",
    volume: "14",
    pages: "1303-1320",
    doi: "10.5194/os-14-1303-2018",
    doiLink: "https://doi.org/10.5194/os-14-1303-2018",
    isFirstAuthor: true,
    isCorrespondingAuthor: true,
    quartile: "Q2",
    impactFactor: 4.0,
    abstract: "本研究探讨了夏季越南上升流系统中物理过程对生物生产力的调控作用。",
    keywords: ["Vietnam upwelling", "biological productivity", "physical-biological coupling", "ocean modeling"]
  },
  {
    id: "lu-2017-od",
    authors: "Lu, W., Yan, X-H., Han, L., & Jiang, Y.",
    year: 2017,
    title: "One-dimensional ocean model with three types of vertical velocities: a case study in the South China Sea",
    journal: "Ocean Dynamics",
    volume: "67",
    pages: "253-262",
    doi: "10.1007/s10236-016-1029-9",
    doiLink: "https://doi.org/10.1007/s10236-016-1029-9",
    isFirstAuthor: true,
    isCorrespondingAuthor: true,
    quartile: "Q2",
    impactFactor: 2.5,
    abstract: "本研究开发了包含三种垂直速度的一维海洋模型，并在南海进行了案例研究。",
    keywords: ["one-dimensional model", "vertical velocity", "South China Sea", "ocean dynamics"]
  },
  {
    id: "lu-2015-jgr",
    authors: "Lu, W., Yan, X-H., & Jiang, Y.",
    year: 2015,
    title: "Winter bloom and associated upwelling northwest of the Luzon Island: A coupled physical-biological modeling approach",
    journal: "Journal of Geophysical Research: Oceans",
    volume: "120",
    issue: "1",
    pages: "533-546",
    doi: "10.1002/2014JC010218",
    doiLink: "https://doi.org/10.1002/2014JC010218",
    isFirstAuthor: true,
    isCorrespondingAuthor: true,
    quartile: "Q1",
    impactFactor: 3.559,
    abstract: "本研究采用物理-生物耦合模型方法研究了吕宋岛西北部冬季藻华及相关上升流现象。",
    keywords: ["winter bloom", "upwelling", "Luzon Island", "coupled modeling", "phytoplankton"]
  },
  {
    id: "lu-2013-eacfm",
    authors: "Lu, W., Jiang, Y., & Lin, J.",
    year: 2013,
    title: "Modeling Propagation of 2011 Honshu Tsunami",
    journal: "Engineering Applications of Computational Fluid Mechanics",
    volume: "7",
    issue: "4",
    pages: "507-518",
    doi: "10.1080/19942060.2013.11015489",
    doiLink: "https://doi.org/10.1080/19942060.2013.11015489",
    isFirstAuthor: true,
    isCorrespondingAuthor: true,
    quartile: "Q1",
    impactFactor: 5.800,
    abstract: "本研究模拟了2011年日本本州海啸的传播过程。",
    keywords: ["tsunami", "numerical modeling", "Honshu", "CFD", "natural disaster"]
  }
];

// 按年份分组
export const publicationsByYear = publications.reduce((acc, pub) => {
  if (!acc[pub.year]) {
    acc[pub.year] = [];
  }
  acc[pub.year].push(pub);
  return acc;
}, {} as Record<number, Publication[]>);

// 获取最新论文
export const getLatestPublications = (count: number = 5) => {
  return [...publications].sort((a, b) => b.year - a.year).slice(0, count);
};

// 获取第一作者论文
export const getFirstAuthorPublications = () => {
  return publications.filter(pub => pub.isFirstAuthor);
};

// 获取通讯作者论文
export const getCorrespondingAuthorPublications = () => {
  return publications.filter(pub => pub.isCorrespondingAuthor);
};

// 根据ID获取论文
export const getPublicationById = (id: string): Publication | undefined => {
  return publications.find(pub => pub.id === id);
};

export default publications;

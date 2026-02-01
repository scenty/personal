// 数据产品
export interface DataProduct {
  id: string;
  name: string;
  nameEn: string;
  abbreviation: string;
  description: string;
  spatialResolution: string;
  temporalResolution: string;
  timeRange: string;
  region: string;
  variables: string[];
  dataLink: string;
  codeLink?: string;
  paperLink?: string;
  paperId?: string;
  applications?: { title: string; link?: string; paperId?: string }[];
}

export const dataProducts: DataProduct[] = [
  {
    id: "open-ohc",
    name: "全球海洋热含量数据集",
    nameEn: "Ocean Projection and Extension Neural network",
    abbreviation: "OPEN",
    description: "基于神经网络的全球海洋0-2000米热含量遥感估算数据集",
    spatialResolution: "1°×1°",
    temporalResolution: "逐月",
    timeRange: "1993-2020",
    region: "全球海洋",
    variables: ["海洋热含量 (0-2000m)", "温度异常"],
    dataLink: "https://www.scidb.cn/en/detail?dataSetId=8f8a64729f2b44229052dfdf20fcbbe3",
    codeLink: "https://github.com/scenty/OPEN-OHC",
    paperLink: "https://doi.org/10.3390/rs12142294",
    paperId: "su-2020-rs-open"
  },
  {
    id: "open-lstm",
    name: "全球海洋热含量数据集（LSTM版本）",
    nameEn: "OPEN-LSTM",
    abbreviation: "OPEN-LSTM",
    description: "基于长短期记忆神经网络的全球海洋热含量数据集",
    spatialResolution: "1°×1°",
    temporalResolution: "逐月",
    timeRange: "1993-2020",
    region: "全球海洋",
    variables: ["海洋热含量", "次表层温盐结构"],
    dataLink: "https://www.scidb.cn/en/detail?dataSetId=636322132f92407b84dda14821c18329",
    paperLink: "https://doi.org/10.1016/j.rse.2021.112465",
    paperId: "su-2021-rse"
  },
  {
    id: "scsdct",
    name: "南海遥感叶绿素DCT重建数据集",
    nameEn: "South China Sea DCT Chlorophyll Dataset",
    abbreviation: "SCSDCT",
    description: "基于离散余弦变换（DCT）的南海遥感叶绿素数据重建数据集",
    spatialResolution: "4km",
    temporalResolution: "逐日",
    timeRange: "2005-2019",
    region: "南海",
    variables: ["叶绿素a浓度", "数据质量标识"],
    dataLink: "https://www.scidb.cn/en/detail?dataSetId=1387ffe83af54f0fb574d60e97b206b2",
    codeLink: "https://github.com/Yotill/SCS_CHL_2005-2019",
    paperLink: "https://doi.org/10.1109/tgrs.2021.3067646",
    paperId: "wang-2021-tgrs",
    applications: [
      { title: "冬季吕宋海区叶绿素的季节间尺度调控", paperId: "wang-2021-tgrs" },
      { title: "海洋藻华事件提取和分析应用框架", paperId: "lu-2022-rs-bloom" },
      { title: "南海叶绿素长期趋势（衰退、时空变化变弱）", paperId: "wang-2022-aos" }
    ]
  },
  {
    id: "recad-naacom",
    name: "美国东海岸表层二氧化碳分压数据集",
    nameEn: "Reconstructed Coastal Acidification Database - NAACOM",
    abbreviation: "ReCAD-NAACOM-pCO₂",
    description: "北美大西洋海岸带海洋表层二氧化碳分压机器学习重建数据集",
    spatialResolution: "0.25°",
    temporalResolution: "逐月",
    timeRange: "1993-2021",
    region: "北美大西洋海岸带",
    variables: ["表层pCO₂", "海气CO₂通量"],
    dataLink: "https://zenodo.org/doi/10.5281/zenodo.14038561",
    paperLink: "https://doi.org/10.5194/essd-17-43-2025",
    paperId: "wu-2025-essd"
  }
];

// 专著信息
export const books = [
  {
    chapter: "Ocean Heat Content Retrieval from Remote Sensing Data Based on Machine Learning",
    authors: "Lu, W., & Su, H.",
    year: 2023,
    bookTitle: "Artificial Intelligence Oceanography",
    pages: "125-145",
    publisher: "Springer Nature Singapore",
    location: "Singapore",
    downloadLink: ""
  },
  {
    chapter: "AI-Based Subsurface Thermohaline Structure Retrieval from Remote Sensing Observations",
    authors: "Su, H., Lu, W., Wang, A., & Zhang, T.",
    year: 2023,
    bookTitle: "Artificial Intelligence Oceanography",
    pages: "105-123",
    publisher: "Springer Nature Singapore",
    location: "Singapore",
    downloadLink: ""
  }
];

export default dataProducts;

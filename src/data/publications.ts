// 论文数据 - 每篇论文都有独立的详细信息
export interface Publication {
  id: string;
  authors: string;
  authorsEn?: string; // 英文作者，用于引用信息
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
  abstractEn?: string; // 英文摘要
  keywords?: string[];
  keywordsEn?: string[]; // 英文关键词
  highlightsEn?: string[]; // 英文亮点
  dataLink?: string;
  codeLink?: string;
  newsCoverage?: { title: string; link: string }[];
  figures?: { image: string; caption: string; captionEn?: string }[];
  firstAuthorId?: string; // 第一作者的学生ID，用于链接到学生详情页
}

export const publications: Publication[] = [
  {
    id: "he-2026-olar",
    authors: "何江南，卢文芳*，刘勇，杨光宇，Jo Young-Heon，来志刚",
    authorsEn: "He, J., Lu, W.*, Liu, Y., Yang, G., Jo, Y.-H., & Lai, Z.",
    year: 2026,
    title: "Accurate Sea Level Anomaly Forecast over North Pacific with Improved AI Training Strategies",
    journal: "Ocean-Land-Atmosphere Research",
    volume: "5",
    pages: "Article 0128",
    doi: "10.34133/olar.0128",
    doiLink: "https://doi.org/10.34133/olar.0128",
    isFirstAuthor: false,
    isCorrespondingAuthor: true,
    firstAuthorId: "he-jiangnan",
    quartile: "Q1",
    abstract: "及时准确的海平面异常（SLA）预报对于监测海洋环境和指导海岸管理至关重要。利用多卫星高度计产品可以有效满足这些预报需求。本研究报告了一个基于人工智能的SLA预报模型，专门针对北太平洋，使用高度计产品和先前应用的基于Transformer的网络（即Earthformer）来实现短期（<7天）和中长期（7至30天）预报。在基线性能的基础上，当考虑优化的训练策略时，中长期预测精度可以显著提高。两种创新的训练策略包括：将预测目标改为SLA时间趋势（以解决SLA的缓慢变化），以及通过滚动和多步训练来弥合训练-预报差距（仅训练下一天，而预报更长时间范围）。因此，正式训练的模型Multistep-Earthformer超越了持续性预报（在1至30个预测提前期的测试中，均方根误差降低21%至58%）和最先进的数值产品GLO12v4（在1至10个预测提前期的预报中，均方根误差降低10%至77%）。结果突出了Multistep-Earthformer在提供准确的短期至中长期SLA预报方面的强大能力。此外，采用的两种训练策略是模型无关的，具有增强各种地球科学预测任务的潜力。",
    abstractEn: "Timely and accurate sea level anomaly (SLA) forecasts are essential for monitoring the ocean environment and guiding coastal management. Utilizing multi-satellite altimetry products is effective for meeting these forecast demands. Here, we report an artificial intelligence-based SLA forecast model tailored for the North Pacific Ocean using altimetry products and a previously applied transformer-based network (i.e., Earthformer) to achieve short-range (<7d) and medium-range (7 to 30 d) forecasts. Building upon the high baseline performance, when optimized training strategies are considered, medium-range prediction accuracy can be markedly improved. The 2 innovative training strategies include changing the prediction target to the SLA temporal tendency (to address the slow variation of the SLA) and bridging the training-forecast gap (training only for the next day, while forecasting for longer horizons) through rolling and multi-step training. Consequently, the formally trained model Multistep-Earthformer surpassed the persistence forecast (21% to 58% root mean square error reduction in the test over 1 to 30 prediction lead days) and state-of-the-art numerical product GLO12v4 (10% to 77% root mean square error reduction in the forecast over 1 to 10 prediction lead days). The results highlight the strong capability of Multistep-Earthformer in delivering accurate short- to medium-range SLA forecasts. Moreover, the 2 training strategies employed are model-agnostic and hold potential for enhancing various geoscientific prediction tasks.",
    keywords: ["sea level anomaly", "forecast", "Earthformer", "North Pacific", "AI training strategies", "transformer", "deep learning"],
    highlights: [
      "提出了基于Earthformer架构的SLA预报模型，实现短期和中长期预报",
      "创新性地采用两种训练策略显著提升中长期预报精度",
      "Multistep-Earthformer在测试中超越持续性预报21%-58%，在预报中超越GLO12v4产品10%-77%",
      "训练策略具有模型无关性，可应用于其他地球科学预测任务"
    ],
    highlightsEn: [
      "Proposed an SLA forecast model based on Earthformer architecture for short- and medium-range forecasts",
      "Innovatively employed two training strategies to significantly improve medium-range forecast accuracy",
      "Multistep-Earthformer outperformed persistence forecast by 21%-58% in tests and GLO12v4 product by 10%-77% in forecasts",
      "Training strategies are model-agnostic and applicable to other geoscientific prediction tasks"
    ],
    figures: [
      {
        image: "/images/he-2026-olar-figure2.png",
        caption: "SLA预报框架示意图。(A) 数据时间线和产品类型：展示了训练数据（2006-2020）、测试数据（2021）和预报数据（2024-2025）的时间线。(B) Earthformer架构用于SLA预测：展示了从观测SLA输入到预测SLA输出的编码器-解码器结构，包括Cuboid attention机制。(C) 输入SLA和预测策略：展示了如何使用观测序列进行多步预测。(D) 训练策略：比较了常规训练、多步训练和滚动训练三种方法。",
        captionEn: "Framework for SLA forecasting. (A) Data timeline and product types: Timeline showing training data (2006-2020), test data (2021), and forecast data (2024-2025). (B) Earthformer architecture for SLA prediction: Encoder-decoder structure from observed SLA input to predicted SLA output, including Cuboid attention mechanism. (C) Input SLA and prediction strategy: How to use observed sequences for multi-step prediction. (D) Training strategies: Comparison of conventional training, multi-step training, and rolling training methods."
      }
    ],
    newsCoverage: [
      { title: "公众号报道", link: "https://mp.weixin.qq.com/s/WAtv69cG5ugXWJJDgyHv7w" }
    ]
  },
  {
    id: "wu-2025-essd",
    authors: "吴泽伦，卢文芳*，Alizée Roobaert，宋鲁平，严晓海，蔡卫君",
    authorsEn: "Wu, Z., Lu, W.*, Roobaert, A., Song, L., Yan, X. H., & Cai, W. J.",
    year: 2025,
    title: "A machine-learning reconstruction of sea surface pCO₂ in the North American Atlantic Coastal Ocean Margin from 1993 to 2021",
    journal: "Earth System Science Data",
    volume: "17",
    pages: "43-61",
    doi: "10.5194/essd-17-43-2025",
    doiLink: "https://doi.org/10.5194/essd-17-43-2025",
    isFirstAuthor: false,
    isCorrespondingAuthor: true,
    quartile: "Q1",
    impactFactor: 11.2,
    abstract: "海岸带海洋是重要的碳汇区域，准确估算其碳通量对于理解全球碳循环至关重要。然而，由于观测数据稀疏，海岸带海洋表层二氧化碳分压（pCO₂）的长期变化特征仍不清楚。本研究利用机器学习方法重建了北美大西洋海岸带海洋（1993-2021年）的pCO₂数据集。该数据集结合了多种环境变量（海表温度、盐度、叶绿素等）和机器学习模型，填补了观测空白，为海岸带碳循环研究提供了重要的数据支撑。重建结果显示，该区域pCO₂存在明显的季节变化和长期趋势，为理解海岸带碳循环的动态变化提供了新的认识。",
    abstractEn: "Coastal oceans are important carbon sink regions, and accurate estimation of their carbon fluxes is crucial for understanding the global carbon cycle. However, due to sparse observational data, the long-term variability of sea surface partial pressure of CO₂ (pCO₂) in coastal oceans remains unclear. This study uses machine learning methods to reconstruct a pCO₂ dataset for the North American Atlantic Coastal Ocean Margin from 1993 to 2021. The dataset combines various environmental variables (sea surface temperature, salinity, chlorophyll, etc.) with machine learning models to fill observational gaps, providing important data support for coastal carbon cycle research. The reconstruction results show significant seasonal variations and long-term trends in pCO₂ in this region, providing new insights into the dynamic changes of the coastal carbon cycle.",
    keywords: ["二氧化碳分压重建", "机器学习", "海岸带海洋", "碳循环", "北大西洋"],
    keywordsEn: ["pCO₂ reconstruction", "machine learning", "coastal ocean", "carbon cycle", "North Atlantic"],
    highlights: [
      "利用机器学习方法重建了北美大西洋海岸带海洋pCO₂数据集（1993-2021）",
      "填补了海岸带海洋pCO₂观测数据的空白，为碳循环研究提供重要数据支撑",
      "揭示了该区域pCO₂的季节变化和长期趋势特征",
      "数据集已公开发布，支持海岸带碳循环相关研究"
    ],
    highlightsEn: [
      "Reconstructed pCO₂ dataset for the North American Atlantic Coastal Ocean Margin (1993-2021) using machine learning methods",
      "Filled observational gaps in coastal ocean pCO₂ data, providing important data support for carbon cycle research",
      "Revealed seasonal variations and long-term trends in pCO₂ in this region",
      "Dataset is publicly available, supporting coastal carbon cycle research"
    ],
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

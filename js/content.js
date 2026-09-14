/**
 * Site content — edit this file to customize your portfolio.
 * Structure mirrors https://yuanning.cargo.site
 */

export const site = {
  name: "YuxuanWeng",
  nameCn: "翁雨萱",
  url: "https://yuxuanweng.com",
  tagline: "Designer, Researcher",
  taglineCn: "设计师, 研究员",
  email: "CQWengyuxuan@outlook.com",
  lastUpdate: "Sep, 2026",
  googleScholar:
    "https://scholar.google.com/citations?view_op=list_works&hl=zh-TW&user=yqzwOIAAAAJ",
};

export const nav = [
  { label: "Projects", labelCn: "项目", href: "index.html", id: "projects" },
  { label: "Publications", labelCn: "出版物", href: "publications.html", id: "publications" },
  { label: "About", labelCn: "关于", href: "about.html", id: "about" },
];

export const categories = [
  {
    id: "hardware",
    labelEn: "Hardware",
    labelCn: "硬件类",
    subtitleEn: "Physical Computing & Interactive Installations",
    subtitleCn: "实体计算与交互装置",
  },
  {
    id: "software",
    labelEn: "Software",
    labelCn: "软件类",
    subtitleEn: "VR, Games & Digital Systems",
    subtitleCn: "虚拟现实、游戏与数字系统",
  },
];

export const projects = [
  {
    slug: "comet",
    titleEn: "CoMeT",
    titleCn: "CoMeT：随学习者回应调整的 AI 编程导师",
    category: "software",
    cover: "assets/projects/comet/cover.webp",
    images: ["assets/projects/comet/cover.webp"],
    tagsEn: ["AI in Education", "Adaptive Scaffolding", "Metacognition", "Human–AI Interaction"],
    tagsCn: ["教育人工智能", "自适应支架", "元认知", "人机协作"],
    href: "project.html?slug=comet",
    detail: {
      meta: [
        { en: "Academic research", cn: "学术研究" },
        { en: "Interactive software prototype", cn: "交互软件原型" },
      ],
      overview: {
        en: "An AI programming tutor that adjusts its help while keeping key decisions with the learner.",
        cn: "让 AI 随学习者的表现调整帮助，同时把关键决定留给学习者。",
      },
      bodyEn:
        "When an AI can write a working program, what should the learner still work out? CoMeT explores this question through a browser-based environment that brings a conversational tutor, a sketchpad, and a code editor into the same workspace. Learners move through planning, monitoring, and evaluating a Python task, making their approach visible before asking the system to carry out more of the work.\n\nThe tutor adjusts support around specific decisions. It begins with a question, adds a targeted hint or a parallel example when the learner remains stuck, and reduces support when the learner addresses the decision. This separates the work the AI performs from the thinking the learner is asked to do. The interface and support logic make that relationship observable across a learning session.\n\nIn a study with 131 adult learners completing three Python tasks, CoMeT maintained a level of metacognitive demand comparable to a question-only tutor and caused less frustration than that tutor. It also delivered artifacts into the workspace twice as often as an unrestricted assistant. The study examines support and decision-making within one session; effects on long-term retention and transfer remain to be tested.",
      bodyCn:
        "当 AI 已经能够写出可运行的程序，学习者还需要亲自想清楚什么？CoMeT 把对话式导师、草图板和代码编辑器放在同一个浏览器工作空间中，让学习者经历规划、监控和评估三个阶段。在请求 AI 承担更多工作之前，学习者先表达自己的思路，让原本不易看见的判断过程进入交互。\n\n导师围绕具体的决策点调整支持：先提出问题，在学习者仍然受阻时补充针对性提示或平行示例，当学习者的回应触及当前决定时，再减少帮助。系统可以承担不同程度的执行工作，学习者仍需说明方案、检查过程并判断结果。界面与支持逻辑共同呈现这种责任分配如何在一次学习会话中变化。\n\n131 名成年学习者分别使用三种导师完成了三个 Python 任务。CoMeT 保持了与只提问导师相近的元认知要求，同时带来更低的挫败感；它向工作区交付成果的频率约为自由回答助手的两倍。这项评估聚焦单次会话中的支持方式与决策行为，长期知识保持和迁移效果仍待检验。",
      materials: {
        labelEn: "Medium",
        labelCn: "媒介 / 形式",
        en: "Browser-based learning environment, conversational AI, sketchpad, Python editor",
        cn: "浏览器学习环境、对话式 AI、草图板、Python 编辑器",
      },
      overallGallery: [
        "assets/projects/comet/gallery/comet-fig03-learning-interface.webp",
        "assets/projects/comet/gallery/comet-fig01-tutor-comparison.webp",
        "assets/projects/comet/gallery/comet-fig05-adaptive-support.webp",
        "assets/projects/comet/gallery/comet-fig06-study-procedure.webp",
        "assets/projects/comet/gallery/comet-fig07-fading-results.webp",
      ],
    },
  },
  {
    slug: "everyday-fairness",
    titleEn: "Everyday Fairness",
    titleCn: "日常公平：儿童冲突中的多方视角",
    category: "software",
    cover: "assets/projects/everyday-fairness/cover.webp",
    images: ["assets/projects/everyday-fairness/cover.webp"],
    tagsEn: ["Child–Computer Interaction", "Everyday Fairness", "Conflict Support", "Participatory Perspectives"],
    tagsCn: ["儿童与计算机交互", "日常公平", "冲突支持", "多方视角"],
    href: "project.html?slug=everyday-fairness",
    detail: {
      meta: [
        { en: "Academic research", cn: "学术研究" },
        { en: "Scoping review and interview study", cn: "范围综述与访谈研究" },
      ],
      overview: {
        en: "A research framework for tracing whose account is heard, who may decide, and how fairness changes during a child's conflict.",
        cn: "从谁的讲述被听见、谁有权决定，到冲突如何演变，理解儿童日常生活中的公平。",
      },
      bodyEn:
        "When children disagree, an intervention can end an argument while leaving its fairness unsettled. Whose account was heard? Which rule applied, and who had the authority to decide? Everyday Fairness examines these questions across children's, caregivers', and teachers' perspectives, following a conflict as it moves between people and institutions.\n\nThe project combines a scoping review of 211 peer-reviewed reports, representing 203 study or project families, with 74 interviews involving 75 participants in mainland China. The event analysis reconstructs 71 participant-described conflicts. Across this material, six recurring issues provide a vocabulary for examining fairness: allocation, procedure, jurisdiction, accountability, autonomy, and recognition. These issues can overlap, change focus, or emerge through adult intervention.\n\nThe resulting visual framework and design matrix propose ways for conflict-support technologies to retain the source and revision history of each account, connect support and action to legitimate authority, and follow an event with proportionate records. The work offers a basis for examining and designing these systems. Its effects on fairness, safety, workload, and decision quality still require evaluation in deployed settings.",
      bodyCn:
        "孩子之间的争执平息后，对公平的疑问可能仍然存在：谁的讲述被听见了，依据的是哪条规则，又由谁作出决定？“日常公平”从儿童、照护者和教师的不同视角出发，追踪一场冲突如何在人与机构之间传递，以及这个过程中什么仍有争议。\n\n项目结合了涵盖 211 篇同行评审报告、203 个研究或项目家族的范围综述，以及在中国大陆开展的 74 次访谈，共涉及 75 名参与者。事件分析重建了参与者描述的 71 个冲突。研究归纳出六类反复出现的公平议题：分配、程序、管辖权、问责、自主与承认。这些议题可能重叠、转移，也可能因成人介入而产生。\n\n由此形成的可视化框架与设计矩阵提出，冲突支持技术应保留不同讲述的来源和修订历史，将支持与行动连接到具有正当权限的角色，并以适度记录追踪事件变化。研究为分析和设计这类技术提供依据，其对公平、安全、工作负担与决策质量的实际影响，仍需在部署研究中检验。",
      materials: {
        labelEn: "Medium",
        labelCn: "媒介 / 形式",
        en: "Literature synthesis, interviews, conflict-event reconstruction, visual frameworks and design propositions",
        cn: "文献综合、访谈、冲突事件重建、可视化框架与设计主张",
      },
      overallGallery: [
        "assets/projects/everyday-fairness/gallery/everyday-fairness-fig01-research-overview.webp",
        "assets/projects/everyday-fairness/gallery/everyday-fairness-fig04-six-fairness-issues.webp",
        "assets/projects/everyday-fairness/gallery/everyday-fairness-fig06-stakeholders-and-trajectory.webp",
        "assets/projects/everyday-fairness/gallery/everyday-fairness-fig07-mechanism-cases.webp",
        "assets/projects/everyday-fairness/gallery/everyday-fairness-fig08-design-matrix.webp",
        "assets/projects/everyday-fairness/gallery/everyday-fairness-fig02-review-flow.webp",
        "assets/projects/everyday-fairness/gallery/everyday-fairness-fig03-event-construction.webp",
        "assets/projects/everyday-fairness/gallery/everyday-fairness-fig05-technology-coverage.webp",
      ],
    },
  },
  {
    slug: "forking-garden",
    titleEn: "Forking Garden",
    titleCn: "分岔花园 · Forking Garden",
    category: "software",
    cover: "assets/projects/forking-garden/cover.webp",
    images: ["assets/projects/forking-garden/cover.webp"],
    tagsEn: ["Generative Games", "Narrative Archetypes", "Game AI", "Procedural Content Generation"],
    tagsCn: ["生成式游戏", "叙事原型", "游戏人工智能", "程序化内容生成"],
    href: "project.html?slug=forking-garden",
    detail: {
      meta: [
        { en: "Academic research", cn: "学术研究" },
        { en: "Playable game generation system", cn: "可玩游戏生成系统" },
      ],
      overview: {
        en: "A game generation system that carries the rise and fall of a story into playable encounters.",
        cn: "让故事的起伏贯穿生成过程，并进入玩家实际经历的关卡。",
      },
      bodyEn:
        "A story can promise danger while its game feels uneventful. Forking Garden explores how a generated game's narrative and mechanics can develop from the same intent. Starting with a storyline and protagonist, the system creates candidate plot nodes, assembles them into branching paths, and turns those nodes into playable dungeon levels.\n\nA shared Rise/Fall representation carries the narrative arc through the pipeline. It guides graph construction and influences encounters, objectives, rewards, and runtime difficulty adjustment. A symbolic schema keeps characters, objects, and gameplay configurations connected as content is instantiated. The system first generates candidate nodes and then applies structural constraints, allowing varied ideas to be organized into coherent paths.\n\nAcross ten storylines, the generated paths showed distinguishable archetypal trajectories, while entity diversity was 2.6 times that of a hierarchical baseline. A study with 16 participants suggested that the narrative distinctions could remain meaningful during play and help creators interpret alternative story directions. The evaluation also exposed limits: different stories could produce similar combat, and generated spaces sometimes contained clutter or mismatches between descriptions and behavior.",
      bodyCn:
        "故事可以宣告危险，游戏过程却未必让人感到紧张。Forking Garden 探索生成式游戏中的叙事与机制如何围绕同一意图展开。系统从故事线和主角出发，生成候选情节节点，将它们组织成分支路径，再把节点转化为可以实际游玩的地牢关卡。\n\n贯穿这条流程的是一套共享的 Rise/Fall 叙事起伏表征。它参与图结构规划，并影响敌人遭遇、任务目标、奖励和运行时难度调整。符号化内容结构让角色、物品与玩法配置在实例化过程中保持联系。系统先生成候选节点，再施加结构约束，使多样的情节构想能够被组织为连贯路径。\n\n在十条故事线的技术评估中，生成路径呈现出可区分的叙事原型轨迹，实体多样性达到分层基线的 2.6 倍。16 人研究表明，这些叙事差异能够在游玩中保持一定意义，也帮助创作者理解不同的故事走向。研究同时发现，不同故事仍可能带来相似的战斗体验，部分生成空间存在拥挤或描述与行为不一致的问题。",
      materials: {
        labelEn: "Medium",
        labelCn: "媒介 / 形式",
        en: "Branching narrative graphs, symbolic content schemas, generated game assets, playable dungeon levels",
        cn: "分支叙事图、符号化内容结构、生成式游戏素材、可玩地牢关卡",
      },
      video: "https://vimeo.com/1226512448",
      overallGallery: [
        "assets/projects/forking-garden/gallery/forking-garden-fig01-generation-and-play.webp",
        "assets/projects/forking-garden/gallery/forking-garden-fig02-planning-pipeline.webp",
        "assets/projects/forking-garden/gallery/forking-garden-fig03-narrative-gameplay.webp",
        "assets/projects/forking-garden/gallery/forking-garden-fig04-archetype-distribution.webp",
        "assets/projects/forking-garden/gallery/forking-garden-fig05-threat-and-damage.webp",
        "assets/projects/forking-garden/gallery/forking-garden-fig06-narrative-trajectories.webp",
        "assets/projects/forking-garden/gallery/forking-garden-fig07-entity-diversity.webp",
      ],
    },
  },
  {
    slug: "nephocodex",
    titleEn: "NephoCodex",
    titleCn: "云象 · NephoCodex",
    category: "hardware",
    cover: "assets/projects/nephocodex/cover.webp",
    images: ["assets/projects/nephocodex/cover.webp"],
    tagsEn: ["Clouds", "Weather", "Data Physicalization", "Material Agency", "Interactive Installation"],
    tagsCn: ["云", "气象数据", "数据物理化", "材料能动性", "交互装置"],
    href: "project.html?slug=nephocodex",
    detail: {
      meta: [
        { en: "Academic research", cn: "学术研究" },
        { en: "Interactive installation", cn: "交互装置" },
      ],
      overview: {
        en: "A weather data installation in which computation guides the conditions for a cloud to form.",
        cn: "用计算设定云雾生成的条件，让气象数据在材料变化中显现。",
      },
      bodyEn:
        "A cloud changes as we look at it. NephoCodex brings this shifting quality into a physical encounter with weather data: visitors can approach transparent modules, move around them, and watch mist gather and disperse alongside digital information. The work explores how the uncertainty of weather predictions can enter the behavior of a material display.\n\nA calibrated model predicts probability distributions over five artistic weather states. These probabilities shape proposed controls for mist, airflow, and light. Local sensing and safety constraints regulate their execution, while air movement, moisture, and visitors continue to affect the cloud's appearance. The project describes this relationship as bounded material agency: computation sets limits within which the material can vary. Transparent displays provide stable annotations alongside the changing mist.\n\nThe design was informed by interviews with six experts and evaluated against conventional weather charts in a study with 13 participants. The installation increased spatial presence and physical demand, with visitors changing viewpoint and waiting for transitions. Perceived data comprehensibility remained inconclusive after correction for multiple comparisons. These findings support pairing an embodied encounter with readable digital information about the data and its mappings.",
      bodyCn:
        "云的形态总在观看中变化。NephoCodex 将这种变化带入气象数据的物理呈现：观众可以走近透明模块、绕行观察，在数字信息旁观看水雾聚集和消散。作品探索天气预测中的不确定性，如何参与一个材料显示系统的运行。\n\n经过概率校准的模型预测五种艺术化天气状态的分布，再将这些概率映射为雾化、气流和灯光的控制建议。本地传感与安全约束调节执行过程，空气流动、水汽和观众的移动则继续影响云雾外观。项目以“有界材料能动性”描述这种关系：计算划定材料变化的范围，具体形态仍会发生变化。透明屏上的数字标注为这段动态体验提供稳定的信息参照。\n\n设计由六位专家的访谈提供依据，并在一项 13 人研究中与常规天气图表进行比较。装置提高了空间临场感和身体活动需求，观众会改变视角并等待状态转换；感知数据可理解性的差异在多重比较校正后仍不明确。研究由此支持将具身体验与清晰的数值、来源及映射说明结合起来。",
      materials: {
        labelEn: "Medium",
        labelCn: "媒介 / 形式",
        en: "Mist, airflow, light, transparent displays, aluminum and acrylic structure, sensors and Arduino control",
        cn: "水雾、气流、灯光、透明显示屏、铝型材与亚克力结构、传感器及 Arduino 控制",
      },
      dimensions: {
        labelEn: "Dimensions",
        labelCn: "尺寸",
        en: "Single unit: 1500mm × 700 × 800 mm; overall dimensions variable",
        cn: "单个 1500mm × 700 × 800 mm；整体尺寸可变",
      },
      video: "https://www.youtube.com/watch?v=bb_NvH12CKs",
      detailLayout: "overlap",
      detailGallery: [
        "assets/projects/nephocodex/gallery/pic1.jpg",
        "assets/projects/nephocodex/gallery/pic3.jpg",
        "assets/projects/nephocodex/gallery/pic4.jpg",
        "assets/projects/nephocodex/gallery/pic5.jpg",
        "assets/projects/nephocodex/gallery/pic6.jpg",
        "assets/projects/nephocodex/gallery/pic7.jpg",
        "assets/projects/nephocodex/gallery/pic8.jpg",
      ],
      overallGallery: [
        "assets/projects/nephocodex/gallery/nephocodex-fig01-installation.webp",
        "assets/projects/nephocodex/gallery/nephocodex-fig08-hardware.webp",
        "assets/projects/nephocodex/gallery/nephocodex-fig07-water-to-mist.webp",
        "assets/projects/nephocodex/gallery/nephocodex-fig03-system-overview.webp",
        "assets/projects/nephocodex/gallery/nephocodex-fig11-study-setting.webp",
        "assets/projects/nephocodex/gallery/nephocodex-fig13-spatial-behaviour.webp",
        "assets/projects/nephocodex/gallery/nephocodex-fig15-exhibition.webp",
        "assets/projects/nephocodex/gallery/pic2.jpg",
        "assets/projects/nephocodex/gallery/pic9.jpg",
        "assets/projects/nephocodex/gallery/pic10.jpg",
        "assets/projects/nephocodex/gallery/pic11.jpg",
        "assets/projects/nephocodex/gallery/pic12.jpg",
        "assets/projects/nephocodex/gallery/pic13.jpg",
        "assets/projects/nephocodex/gallery/pic14.jpg",
      ],
    },
  },
  {
    slug: "insectsync",
    titleEn: "InsectSync2.0",
    titleCn: "昆虫同步",
    category: "hardware",
    cover: "assets/projects/insectsync/cover.jpg",
    images: ["assets/projects/insectsync/cover.jpg"],
    tagsEn: ["Diapause", "Wearable Device", "No Electric Drive"],
    tagsCn: ["滞育", "穿戴装置", "无电驱动"],
    href: "project.html?slug=insectsync",
    detail: {
      meta: [
        { en: "Collaborative Project", cn: "合作项目" },
        { en: "Academic Project", cn: "学术项目" },
        { en: "Spring 2025", cn: "2025春季" },
      ],
      overview: {
        en: "Interactive mechanical design based on lung acoustics and biomimetic design mechanics",
        cn: "基于肺声学与仿生机械原理的交互设计",
      },
      bodyEn:
        "InsectSync 2.0 is an experiential installation integrating insect compound vision and tracheal breathing rhythms. Inspired by diapause, it guides users to sense their disordered breathing under pressure and shifts them toward \"pause–adaptation\" via non-human regulation. The project aims to reframe human perceptions of stress response mechanisms.",
      bodyCn:
        "「InsectSync 2.0」是一件融合了昆虫复眼视觉与气管呼吸节律的体验式装置。其灵感源于生物的「滞育」现象，旨在引导用户感知自身在高压下的呼吸失序，并通过一种非人类的调节机制，将用户状态引导至「暂停—适应」模式。该项目试图重构人类对于压力应激机制的认知。",
      materials: {
        labelEn: "Materials",
        labelCn: "材料",
        en: "Aluminium Profile Brackets, 3D Resin Print, Bevel Gears, Fixed Hollow Tube, Metal Slices, Omnidirectional Microphone, Bearing",
        cn: "铝型材支架、3D 树脂打印件、锥齿轮、固定空心管、金属片、全指向麦克风、轴承",
      },
      links: [
        {
          labelEn: "Lumen Prize",
          labelCn: "Lumen Prize",
          href: "https://lumenprize.org/2025-experiential-award-finalists/yuxuanweng",
        },
      ],
      video: "https://www.youtube.com/watch?v=eWUNfk9an0E&t=38s",
      detailGrid: true,
      detailGridColumns: 3,
      detailGallery: [
        { src: "assets/projects/insectsync/gallery/detail/dp2.jpg", orientation: "portrait" },
        { src: "assets/projects/insectsync/gallery/detail/dp3.jpg", orientation: "portrait" },
        { src: "assets/projects/insectsync/gallery/detail/dp4.jpg", orientation: "portrait" },
        { src: "assets/projects/insectsync/gallery/detail/dp12.jpg", orientation: "portrait" },
        { src: "assets/projects/insectsync/gallery/detail/dp13.jpg", orientation: "portrait" },
        { src: "assets/projects/insectsync/gallery/overall/pic14.jpg", orientation: "portrait" },
        { src: "assets/projects/insectsync/gallery/overall/pic17.jpg", orientation: "portrait" },
        { src: "assets/projects/insectsync/gallery/overall/pic6.jpg", orientation: "portrait" },
        { src: "assets/projects/insectsync/gallery/detail/dp7.jpg", orientation: "landscape" },
        { src: "assets/projects/insectsync/gallery/detail/dp8.jpg", orientation: "square" },
        { src: "assets/projects/insectsync/gallery/detail/dp9.jpg", orientation: "landscape" },
        { src: "assets/projects/insectsync/gallery/detail/dp10.jpg", orientation: "landscape" },
        { src: "assets/projects/insectsync/gallery/detail/dp11.jpg", orientation: "square" },
      ],
      overallGallery: [
        "assets/projects/insectsync/gallery/overall/pic1.jpg",
        "assets/projects/insectsync/gallery/overall/pic2.jpg",
        "assets/projects/insectsync/gallery/overall/pic3.jpg",
        "assets/projects/insectsync/gallery/overall/pic4.jpg",
        "assets/projects/insectsync/gallery/overall/pic5.jpg",
        "assets/projects/insectsync/gallery/overall/pic7.jpg",
        "assets/projects/insectsync/gallery/overall/pic8.jpg",
        "assets/projects/insectsync/gallery/overall/pic9.jpg",
        "assets/projects/insectsync/gallery/overall/pic12.jpg",
        "assets/projects/insectsync/gallery/overall/pic15.jpg",
        "assets/projects/insectsync/gallery/overall/pic18.jpg",
        "assets/projects/insectsync/gallery/overall/pic23.jpg",
      ],
    },
  },
  {
    slug: "shadowgesture",
    titleEn: "ShadowGesture",
    titleCn: "皮影戏",
    category: "software",
    cover: "assets/projects/shadowgesture/cover.jpg",
    images: ["assets/projects/shadowgesture/cover.jpg"],
    tagsEn: [
      "Chinese Shadow Puppetry",
      "Intangible Cultural Heritage",
      "Virtual Reality Controller",
      "VR Interaction Design",
    ],
    tagsCn: ["VR游戏", "非遗文化", "皮影戏"],
    href: "project.html?slug=shadowgesture",
    detail: {
      meta: [
        { en: "Team Project", cn: "团队项目" },
        { en: "Academic Project", cn: "学术项目" },
        { en: "Fall 2026", cn: "2026秋季" },
      ],
      overview: {
        en: "Virtual Shadow Puppet Creation And Inheritance System Based On Gesture Mapping",
        cn: "基于手势映射的虚拟皮影创作与传承系统",
      },
      bodyEn:
        "The artistic allure of Chinese Shadow Puppetry, characterized by using physical form to express the inner essence relies heavily on complex physical manipulation techniques, which constitute both its narrative core and a critical bottleneck for inheritance. Specifically, \"Pole Bending\" requires subtle wrist finesse to modulate the angle between rods to build momentum, while \"Pole Toggling\" demands instantaneous finger actuation to press the puppet against the screen for a crisp 180-degree profile flip. These techniques are far more than simple physical displacements, they are pivotal actions driving narrative development. A successful 180-degree profile flip often signals a dramatic transition, such as the shift from dialogue to combat, or reveals a sudden emotional shift in the character. However, existing video or observational learning methods fail to transmit the tacit coordination of force, leaving beginners unable to perceive the kinesthetic feel of manipulation. Consequently, performances remain stiff and puppets retain a lifeless rigidity, lacking the gravitational weight and structural tension required to convey narrative vitality.\n\nTo restore this core interactive experience, this study developed ShadowGestures, a VR controller-based embodied learning system. The system utilizes VR controller-based transformation, employing an action decomposition mechanism to reconstruct the underlying logic of puppetry into VR controller interactions. It simulates \"Pole Bending\" via lateral pressure sensing and wrist rotation, and restores \"Pole Toggling\" using instantaneous joystick thrust combined with haptic feedback. Empirical results indicate that the system significantly enhances participants' mastery of core techniques and demonstrates excellent performance in assessments of learning motivation, immersion, and system usability. By achieving the digital restoration of complex ICH skills through low-barrier embodied interaction, this research provides a validated methodology for constructing engaging cultural learning pathways and promoting youth participation in heritage preservation.",
      bodyCn:
        "中国皮影戏「以形传神」的艺术魅力高度依赖复杂的实体操纵技术，这既是其叙事核心，也是技艺传承的关键瓶颈。具体而言，「压杆」需要微妙的腕力来调节杆间夹角以蓄势，而「翻杆」则要求手指瞬时发力使影偶紧贴幕布，从而实现干脆利落的180度侧面翻转。这些技术远非简单的物理位移，而是推动叙事发展的关键动作。一次成功的180度翻身往往预示着戏剧性的转变（如从对白转入打斗），或揭示角色情感的骤变。然而，现有的视频或观察式学习方法无法传递这种隐性的力量协同，导致初学者难以感知操纵的「手感」。因此，表演往往显得僵硬，影偶也因缺乏重力感与结构张力而失去了叙事生命力。\n\n为重构这一核心交互体验，本研究开发了 ShadowGestures，一种基于VR手柄的具身学习系统。该系统利用VR手柄映射技术，采用动作拆解机制将皮影操纵的底层逻辑重构为VR交互：通过侧向施压感应与手腕旋转模拟「压杆」，并结合瞬时摇杆推力与触觉反馈还原「翻杆」。实证结果表明，该系统显著提升了参与者对核心技术的掌握程度，并在学习动机、沉浸感及系统可用性评估中表现优异。通过低门槛的具身交互实现复杂非遗技能的数字化还原，本研究为构建引人入胜的文化学习路径及促进青年参与遗产保护提供了经过验证的方法论。",
      dimensions: {
        labelEn: "Dimensions",
        labelCn: "尺寸",
        en: "Variable",
        cn: "可变",
      },
      video: "https://www.youtube.com/watch?v=vl7J3vrWFzA&t=49s",
      overallGallery: [
        "assets/projects/shadowgesture/gallery/pic5.png",
        "assets/projects/shadowgesture/gallery/fig1.png",
        "assets/projects/shadowgesture/gallery/fig2.jpg",
        "assets/projects/shadowgesture/gallery/fig3.jpg",
        "assets/projects/shadowgesture/gallery/pic4.png",
      ],
    },
  },
  {
    slug: "kaia",
    titleEn: "KAIA",
    titleCn: "凯娅",
    category: "software",
    cover: "assets/projects/kaia/cover.png",
    images: ["assets/projects/kaia/cover.png"],
    tagsEn: ["Nostalgia", "2D platforming Game"],
    tagsCn: ["怀旧", "2D平台游戏"],
    href: "project.html?slug=kaia",
    detail: {
      meta: [
        { en: "Team Project", cn: "团队项目" },
        { en: "Academic Project", cn: "学术项目" },
        { en: "Spring 2025", cn: "2025春季" },
      ],
      overview: {
        en: "Exploring Nostalgia and the Emotion of Loss in 2D Platformer Games",
        cn: "KAIA：探索2D平台游戏中的怀旧与丧失感",
      },
      bodyEn:
        "In our research on nostalgia and loss, we found that people often idealize memories after losing loved ones, forming deep emotional attachments. Nostalgia can be comforting, but it may also become a tender cage that traps the heart, making it hard to face reality. This emotional duality is both captivating and heartbreaking. To explore this, we are creating a game centered on themes of nostalgia and loss, using a virtual world to portray the intertwined beauty and sorrow of memory, inviting players to experience and reflect on their own relationship with loss and remembrance.",
      bodyCn:
        "在我们关于怀旧与丧失感研究中发现，个体在经历至亲离世后，往往会下意识地美化记忆，并藉此构建出深层的情感羁绊。怀旧虽能提供暂时的慰藉，却也可能异化为一座温柔的囚笼，将心灵禁锢其中，阻碍我们直面现实的脚步。这种情感的二重性既引人入胜，又令人心碎。\n\n为此，我们创作了这款聚焦于怀旧与丧失主题的游戏。项目旨在构建一个虚拟世界，通过具象化呈现记忆中交织的美好与哀愁，引导玩家在沉浸体验中，重新审视并反思自身面对「失去」与「追忆」时的情感关系。",
      dimensions: {
        labelEn: "Dimensions",
        labelCn: "尺寸",
        en: "Computer & Mobile",
        cn: "电脑移动端",
      },
      video: "https://www.youtube.com/watch?v=nFHGH7kjH-8",
      demo: {
        labelEn: "Download Demo",
        labelCn: "下载运行 Demo",
        href: "assets/projects/kaia/demo/KAIA.exe",
        download: true,
        noteEn: "Windows executable — download and run locally.",
        noteCn: "Windows 可执行文件 — 下载后在本地运行。",
      },
      detailLayout: "overlap",
      detailOverlapSize: "compact",
      detailGallery: [
        "assets/projects/kaia/gallery/pic1.png",
        "assets/projects/kaia/gallery/pic2.png",
        "assets/projects/kaia/gallery/pic3.png",
        "assets/projects/kaia/gallery/pic4.png",
        "assets/projects/kaia/gallery/pic5.png",
        "assets/projects/kaia/gallery/pic6.png",
      ],
      overallGallery: [
        "assets/projects/kaia/gallery/pic7.jpg",
        "assets/projects/kaia/gallery/pic10.png",
        "assets/projects/kaia/gallery/pic11.png",
        "assets/projects/kaia/gallery/pic12.png",
        "assets/projects/kaia/gallery/pic13.jpg",
        "assets/projects/kaia/gallery/pic14.png",
        "assets/projects/kaia/gallery/pic15.png",
        "assets/projects/kaia/gallery/pic16.png",
        "assets/projects/kaia/gallery/pic17.png",
        "assets/projects/kaia/gallery/pic18.png",
        "assets/projects/kaia/gallery/pic19.png",
        "assets/projects/kaia/gallery/pic20.png",
      ],
    },
  },
  {
    slug: "aquasense",
    titleEn: "AquaSense",
    titleCn: "水感",
    category: "hardware",
    cover: "assets/projects/aquasense/cover.jpg",
    images: ["assets/projects/aquasense/cover.jpg"],
    tagsEn: ["Interactive Installations", "Marine Ecology", "Sustainable Education"],
    tagsCn: ["交互装置", "海洋生物", "可持续教育"],
    href: "project.html?slug=aquasense",
    detail: {
      meta: [
        { en: "Team Project", cn: "团队项目" },
        { en: "Academic Project", cn: "学术项目" },
        { en: "Fall 2024", cn: "2024秋季" },
      ],
      overview: {
        en: "A Wearable Interactive Installation for Rising Sustainable Marine Awareness through Emotional Design Method",
        cn: "AquaSense：基于情感化设计的海洋可持续意识提升可穿戴交互装置",
      },
      bodyEn:
        "This project develops a wearable interactive installation based on emotional design to enhance public awareness and responsibility for marine protection on the background of rising usage of face masks. By integrating advanced hardware and digital media, the installation converts different interactive behavior from the user into dynamic audio-visual effects, fostering emotional engagement especially empathy with the ocean species and making the consequences of mask usage tangible and emotionally resonant, so that users would reconsider their mask usage habits, and foster more environmentally conscious behavior that supports marine conservation.",
      bodyCn:
        "针对口罩废弃物激增这一背景，本项目基于情感化设计方法开发了一款可穿戴交互装置，旨在增强公众的海洋保护意识与责任感。通过融合先进硬件与数字媒体技术，该装置能将用户的不同交互行为实时转化为动态视听效果。这一过程旨在促进用户的情感介入，特别是激发其对海洋生物的同理心，将口罩使用的环境后果转化为具象化且富有感染力的感官体验。最终，项目期望引导用户反思个人口罩使用习惯，并培养更有利于海洋生态保护的环保行为。",
      links: [
        {
          labelEn: "Vega Digital Awards",
          labelCn: "Vega Digital Awards",
          href: "https://vegaawards.com/winner-info.php?id=47749",
        },
      ],
      video: "https://www.youtube.com/watch?v=0wYhm5cSBhs",
      detailGrid: true,
      detailGridColumns: 3,
      detailGallery: [
        "assets/projects/aquasense/gallery/design/pic1.jpg",
        "assets/projects/aquasense/gallery/design/pic2.jpg",
        "assets/projects/aquasense/gallery/design/pic3.png",
        "assets/projects/aquasense/gallery/design/pic4.png",
        "assets/projects/aquasense/gallery/design/pic5.jpg",
        "assets/projects/aquasense/gallery/design/pic6.jpg",
      ],
      overallGallery: [
        "assets/projects/aquasense/gallery/pic7.jpg",
        "assets/projects/aquasense/gallery/pic8.jpg",
        "assets/projects/aquasense/gallery/pic9.jpg",
        "assets/projects/aquasense/gallery/pic10.jpg",
        "assets/projects/aquasense/gallery/pic11.jpg",
        "assets/projects/aquasense/gallery/pic12.jpg",
        "assets/projects/aquasense/gallery/pic13.jpg",
      ],
    },
  },
  {
    slug: "rhymarc",
    titleEn: "Rhymarc 24/7",
    titleCn: "节律弧24/7",
    category: "hardware",
    cover: "assets/projects/rhymarc/cover.jpg",
    images: ["assets/projects/rhymarc/cover.jpg"],
    tagsEn: ["UI/UX", "Wearable Devices", "Urban Design"],
    tagsCn: ["UI/UX", "可穿戴装置", "城市设计"],
    href: "project.html?slug=rhymarc",
    detail: {
      meta: [
        { en: "Individual Project", cn: "个人项目" },
        { en: "Academic Project", cn: "学术项目" },
        { en: "Fall 2024", cn: "2024秋季" },
      ],
      overview: {
        en: "An interactive urban experience service based on labelled ‘GU’ points.",
        cn: "基于「GU」点标记的交互式城市体验服务",
      },
      bodyEn:
        "In Chongqing’s hilly terrain, squatting anywhere reflects locals’ relaxed lifestyle, shaping public space use and urban culture. We developed RhythmArc 24/7, a smart wearable with GSR and ultrasonic sensors to monitor real-time mood and environmental adaptation. Data is processed by Arduino Uno and sent to an APP for ML-driven analysis, offering personalized insights. It aids users in self-adjustment and helps governments optimize urban well-being.",
      bodyCn:
        "在重庆独特的山地地貌中，「随处蹲坐」体现了当地人松弛的生活哲学，这种行为模式深刻地重塑了公共空间的使用方式与城市文化图景。基于此，我们开发了 RhythmArc 24/7，一款搭载了皮肤电（GSR）与超声波传感器的智能可穿戴设备，旨在监测用户的实时情绪状态与环境适应度。采集的数据经由 Arduino Uno 处理后传输至移动端 APP，并通过机器学习算法进行深度分析，从而生成个性化的体验洞察。该系统不仅能辅助用户进行身心自我调节，也能为政府部门优化城市福祉与空间规划提供数据支持。",
      demo: {
        embed: true,
        href: "demos/rhymarc.html",
      },
      overallGallery: [
        "assets/projects/rhymarc/gallery/design/pic1.png",
        "assets/projects/rhymarc/gallery/design/pic2.png",
        "assets/projects/rhymarc/gallery/design/pic3.png",
        "assets/projects/rhymarc/gallery/design/pic4.png",
        "assets/projects/rhymarc/gallery/design/pic5.png",
        "assets/projects/rhymarc/gallery/design/pic6.png",
        "assets/projects/rhymarc/gallery/design/pic7.png",
        "assets/projects/rhymarc/gallery/design/pic8.png",
        "assets/projects/rhymarc/gallery/design/pic9.png",
        "assets/projects/rhymarc/gallery/design/pic10.png",
        "assets/projects/rhymarc/gallery/design/pic11.jpg",
      ],
    },
  },
  {
    slug: "heartstrings",
    titleEn: "HeartStrings",
    titleCn: "安宁疗护",
    category: "hardware",
    cover: "assets/projects/heartstrings/cover.jpg",
    images: ["assets/projects/heartstrings/cover.jpg"],
    tagsEn: ["hospice", "product design", "emotional design", "Kano model", "healthcare"],
    tagsCn: ["安宁疗护", "产品设计", "情感化设计", "卡诺模型", "医疗保健"],
    href: "project.html?slug=heartstrings",
    detail: {
      meta: [
        { en: "Team Project", cn: "团队项目" },
        { en: "Spring 2025", cn: "2025春季" },
        { en: "Academic Project", cn: "学术项目" },
      ],
      overview: {
        en: "Emotional design research for vital signs monitoring products in palliative care",
        cn: "安宁疗护生命体征监护产品的情感化设计研究",
      },
      bodyEn:
        "In recent years, with the acceleration of social aging and the improvement of the healthcare system, the demand for end-of-life care has been steadily increasing. How to provide more humanized and emotionally supportive services in palliative care has become an urgent issue that needs to be addressed. To this end, this paper combines the core principles of palliative care with emotional design methods, focusing on the emotional design of a vital signs monitoring product. The aim is to develop an innovative vital signs monitoring product that not only alleviates patients' psychological stress and preserves their dignity, but also promotes emotional communication, thereby providing new tools and support for the implementation of palliative care.",
      bodyCn:
        "近年来，随着社会老龄化进程加速以及医疗保障体系的不断完善，安宁疗护的需求持续增长。如何在安宁疗护中提供更具人性化与情感支持的服务，已成为亟待解决的议题。为此，本文将安宁疗护的核心理念与情感化设计方法相结合，聚焦于生命体征监测产品的情感化设计，旨在研发一款既能缓解患者心理压力、维护其尊严，又能促进情感交流的创新型生命体征监测产品，为安宁疗护的实践提供新的工具与支持。",
      links: [
        {
          labelEn: "Paper",
          labelCn: "论文",
          href: "https://ftjournal.org/article/view/FT-V1N32025-02",
        },
      ],
      overallGallery: [
        "assets/projects/heartstrings/cover.jpg",
        "assets/projects/heartstrings/gallery/pic1.jpg",
        "assets/projects/heartstrings/gallery/pic8-01.jpg",
      ],
    },
  },
  {
    slug: "comfort-box",
    titleEn: "Comfort@42Box:Flex&Fee",
    titleCn: "舒适盒",
    category: "hardware",
    cover: "assets/projects/comfort-box/cover.jpg",
    images: ["assets/projects/comfort-box/cover.jpg"],
    tagsEn: ["Urban Computing", "Interactive Installation"],
    tagsCn: ["城市计算", "交互装置"],
    href: "project.html?slug=comfort-box",
    detail: {
      meta: [
        { en: "Team Project", cn: "团队项目" },
        { en: "Commercial Project", cn: "商业项目" },
        { en: "Fall 2024", cn: "2024秋季" },
      ],
      overview: {
        en: "In an urban existence ensnared by data, where do we seek true comfort?",
        cn: "在数据困局的城市生活中，何处寻觅真正的舒适？",
      },
      bodyEn:
        "Situated at the \"Fashion Magic Academy\" portal within THE BOX, Comfort@42Box serves as an affective pop-up interface bridging the BIFTOR universe. If \"42\" is the \"Ultimate Answer to the Universe\" in The Hitchhiker's Guide to the Galaxy, then here, through code and sensors, we seek to decode the \"42\" of our own sense of comfort.\n\nThe installation invites visitors to perform a simple \"Lift\" gesture, activating the bio-sensing system. By integrating GSR (Galvanic Skin Response) sensors to detect changes in skin conductance and emotional fluctuations, alongside Bend sensors to monitor arm movement, the system analyzes the user's state across four dimensions: Calm, Happy, At Ease, and Passionate.\n\nBy displaying this affective data on a mobile screen, the project helps users understand their personal \"Comfort Index,\" injecting an innovative experience of affective computing into the portal space.\n\nExhibition venue: THE BOX Chaowai | Youth Power Centre, Chaowai Street, Chaoyang District, Beijing",
      bodyCn:
        "坐落于 THE BOX「时尚魔法学院」入口处的 Comfort@42Box，是一座连接 BIFTOR 宇宙的情感化快闪交互界面。若「42」是《银河系漫游指南》中「宇宙的终极答案」，那么在这里，我们通过代码与传感器，试图解码属于每个人自身的「舒适之 42」。\n\n装置邀请参观者完成一个简单的「Lift」抬手动作，由此激活生物传感系统。项目整合 GSR（皮肤电反应）传感器以捕捉皮肤电导率变化与情绪波动，并结合 Bend 弯曲传感器监测手臂运动，从平静、快乐、自在与热情四个维度分析用户状态。\n\n通过将情感数据呈现在移动端屏幕上，项目帮助用户理解个人的「舒适指数」，为入口空间注入情感计算的创新体验。\n\n展出地点：北京市朝阳区朝外大街 THE BOX 朝外｜青年力中心",
      video: "https://www.youtube.com/watch?v=PA-__vPWdJc",
      overallGallery: [
        "assets/projects/comfort-box/gallery/pic1.png",
        "assets/projects/comfort-box/gallery/pic2.png",
        "assets/projects/comfort-box/gallery/pic3.png",
      ],
    },
  },
  {
    slug: "my-naked-soul",
    titleEn: "My Naked Soul",
    titleCn: "小灵魂",
    category: "software",
    cover: "assets/projects/my-naked-soul/cover.png",
    images: ["assets/projects/my-naked-soul/cover.png"],
    tagsEn: ["Serious Games", "Multiple Playthroughs"],
    tagsCn: ["严肃游戏", "性教育", "多周目"],
    href: "project.html?slug=my-naked-soul",
    detail: {
      meta: [
        { en: "Individual Project", cn: "个人项目" },
        { en: "Academic Project", cn: "学术项目" },
        { en: "Fall 2023", cn: "2023秋季" },
      ],
      overview: {
        en: "A heartwarming tabletop-inspired RPG about a little soul seeking a world free of sex education",
        cn: "一款温暖治愈的桌游式 RPG：小灵魂追寻没有性教育的世界",
      },
      bodyEn:
        "My Naked Soul is a heartwarming tabletop-inspired RPG where you play as a little soul seeking to be born into a world free of sex education. To qualify, you must inhabit young animals, using dice rolls to solve puzzles and collect Personality Fragments across metaphorical levels like a classroom and forest.\n\nThe game uses animal allegories—like a rabbit growing red fur—to thoughtfully explore real-world growing pains. Designed as an educational tool for schools, it comes with guidebooks for facilitators and is available on multiple platforms.",
      bodyCn:
        "《My Naked Soul》是一款温暖治愈的桌游式角色扮演游戏。玩家扮演一颗渴望降生的小灵魂，目标是进入一个没有性教育的世界。为此，你需要寄宿于幼年动物体内，通过掷骰解谜，在教室、森林等隐喻关卡中收集人格碎片。\n\n游戏以动物寓言（例如兔子长出红毛）细腻探讨现实中的成长阵痛。作为面向学校的教育工具，项目配有引导者手册，并已在多个平台发布。",
      video: "https://www.youtube.com/watch?v=rpXnGlCH03E",
      overallGallery: [
        "assets/projects/my-naked-soul/gallery/pic1.png",
        "assets/projects/my-naked-soul/gallery/pic2.png",
        "assets/projects/my-naked-soul/gallery/pic3.png",
        "assets/projects/my-naked-soul/gallery/pic5.png",
        "assets/projects/my-naked-soul/gallery/pic6.png",
        "assets/projects/my-naked-soul/gallery/pic7.png",
        "assets/projects/my-naked-soul/gallery/pic8.png",
        "assets/projects/my-naked-soul/gallery/pic9.png",
        "assets/projects/my-naked-soul/gallery/pic10.png",
        "assets/projects/my-naked-soul/gallery/pic11.png",
        "assets/projects/my-naked-soul/gallery/pic15.png",
      ],
    },
  },
];

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectNeighbors(slug) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { prev: null, next: null };

  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return { prev, next };
}

export const publications = [
  {
    venues: [{ label: "CHI 2027" }],
    title:
      "Adaptive Scaffolding Needs Contingency: An AI Tutor That Escalates and Fades on What the Learner Does",
    authors: [{ name: "Yuxuan Weng", highlight: true }, { name: "et al." }],
    links: [{ label: "Project", href: "project.html?slug=comet" }],
    status: "Under review",
    image: "assets/projects/comet/cover.webp",
  },
  {
    venues: [{ label: "CHI 2027" }],
    title: "NephoCodex: Exploring Bounded Material Agency in Weather Data Physicalization",
    authors: [{ name: "Yuxuan Weng", highlight: true }, { name: "et al." }],
    links: [{ label: "Project", href: "project.html?slug=nephocodex" }],
    status: "Under review",
    image: "assets/projects/nephocodex/cover.webp",
  },
  {
    venues: [{ label: "CHI 2027" }],
    title:
      "The Garden of Forking Paths: Threading Narrative Archetype as a Semantic Signal Through Gameplay Planning",
    authors: [{ name: "Yuxuan Weng", highlight: true }, { name: "et al." }],
    links: [{ label: "Project", href: "project.html?slug=forking-garden" }],
    status: "Under review",
    image: "assets/projects/forking-garden/cover.webp",
  },
  {
    venues: [{ label: "CHI 2027" }],
    title:
      "Beyond Training the Child: A Scoping Review and Interview Study of Everyday Fairness in Children's Conflict Technologies",
    authors: [{ name: "Yuxuan Weng", highlight: true }, { name: "et al." }],
    links: [{ label: "Project", href: "project.html?slug=everyday-fairness" }],
    status: "Under review",
    image: "assets/projects/everyday-fairness/cover.webp",
  },
  {
    venues: [{ label: "UbiComp/ISWC 2026 Design Exhibition" }],
    title:
      "InsectSync 2.0: A Biomimetic Insect-Structured Installation for Experiencing Non-Human Respiratory Rhythms",
    authors: [
      { name: "Yuxuan Weng", highlight: true },
      { name: "Yunge Wen" },
    ],
    links: [
      {
        label: "Project",
        href: "project.html?slug=insectsync",
      },
      {
        label: "Lumen Prize",
        href: "https://lumenprize.org/2025-experiential-award-finalists/yuxuanweng",
      },
    ],
    status: "Accepted",
    image: "assets/projects/insectsync/cover.jpg",
  },
  {
    venues: [{ label: "HCI International 2026, pp. 240–251, Springer" }],
    title:
      "VR-Enabled Embodied Learning: An Operational Translation System for Acquiring Chinese Shadow Puppetry Techniques",
    authors: [
      { name: "Yuxuan Weng", highlight: true },
      { name: "Yushan Zhang" },
      { name: "Yule Chen" },
      { name: "Dabo Xu" },
      { name: "Wenqi Xu" },
      { name: "Biwan Cai" },
    ],
    links: [
      {
        label: "Google Scholar",
        href: "https://scholar.google.com/citations?view_op=list_works&hl=zh-TW&user=yqzwOIAAAAJ",
      },
    ],
    image: "assets/publications/shadow-puppetry-vr.jpg",
  },
  {
    venues: [{ label: "HCI International 2026, pp. 404–414, Springer" }],
    title:
      "KAIA: A Game Design Based on Nostalgic Emotion and Experiences of Loss",
    authors: [
      { name: "Yushan Zhang" },
      { name: "Yule Chen" },
      { name: "Dabo Xu" },
      { name: "Yinong Tang" },
      { name: "Yuxuan Weng", highlight: true, corresponding: true },
    ],
    links: [
      {
        label: "Google Scholar",
        href: "https://scholar.google.com/citations?view_op=list_works&hl=zh-TW&user=yqzwOIAAAAJ",
      },
    ],
    image: "assets/publications/kaia-game-design.jpg",
  },
  {
    venues: [{ label: "Fashion Technology, Vol. 1 No. 3 (2025)" }],
    title:
      "A Study on the Emotional Design of Vital Signs Monitoring Products for Palliative Care Based on the Kano Model",
    authors: [
      { name: "Yuxuan Weng", highlight: true },
      { name: "Wenqi Xu" },
      { name: "Chang Liu" },
      { name: "Biwan Cai" },
    ],
    links: [
      {
        label: "Paper",
        href: "https://ftjournal.org/article/view/FT-V1N32025-02",
      },
      {
        label: "Google Scholar",
        href: "https://scholar.google.com/citations?view_op=list_works&hl=zh-TW&user=yqzwOIAAAAJ",
      },
    ],
    image: "assets/publications/vital-signs-diagram.png",
  },
];

export const about = {
  photo: "assets/about/portrait.png",
  nameDisplay: "Yuxuan Weng",
  nameCn: "翁雨萱",
  pronunciation: "/yoo-shwen/",
  bioEn: [
    "Hi, I'm Yuxuan! 👋 Basically, I'm a digital media artist and researcher. My main interests lie in Human-Computer Interaction, what we call 'More-than-Human Design', and ecological systems. I'm really fascinated by how we can bring together biomimicry, physical computing, and interactive storytelling. So, what I usually do is use physical prototyping and VR to explore new ways of preserving culture—essentially trying to bridge the gap between the physical and digital worlds.",
    "As for my studies, I'm actually gearing up to start my Master's in Game Design, Art, and Technology at NTU in Singapore. It's quite an exciting joint program between their computing and art schools. Before this, I got my Bachelor's in Digital Media Art from the Beijing Institute of Fashion Technology. And right now, I'm also keeping busy as a student researcher for the HCI+ 2026 Summer Program.",
    "When I'm not stuck in the lab or doing design work, I'm a pretty laid-back person. You'll usually find me skiing, listening to music, or just messing around with my cat. I'm also perfectly happy finding a cozy spot to just flop down and zone out. Oh, and to be completely honest, I'm a total booze enthusiast, so I'm always up for a good drink!",
  ],
  bioCn: [
    "Hi 你好👋！我是一名数字媒体艺术家与研究者，研究兴趣主要集中在人机交互、超越人类设计以及生态系统。我对仿生学原理、物理计算与交互叙事的跨界融合充满好奇。我致力于通过基于实证的物理原型制作与虚拟现实技术，探索文化保护的全新可能性，并在物理与数字世界之间构建新的联结。",
    "我即将前往南洋理工大学（NTU）攻读游戏设计、艺术与技术理学硕士学位，该项目由计算与数据科学学院与艺术、设计与媒体学院联合开办。我本科毕业于北京服装学院数字媒体艺术专业。目前，我也是 HCI+ 2026 暑期科研项目的学生研究员。",
    "在科研与设计之余，你会发现我热衷于滑雪、听音乐、陪我的猫玩耍、随时随地找个角落「瘫着」放空，或者愉快地小酌一杯。",
  ],
  newsEn: [
    {
      date: "Aug 2026",
      text: "Commencing my Master of Science in Game Design and Art Technology (GDAT) at Nanyang Technological University (NTU), Singapore!",
    },
    {
      date: "Jul 2026",
      text: 'Accepted to present a poster on "VR Shadow Puppetry" at HCI International 2026.',
    },
    {
      date: "Jun 2026",
      text: 'Joined the HCI+ 2026 Summer Research Program as a Student Researcher, advised by Associate Professor <a href="https://scholar.google.com/citations?user=AktmI14AAAAJ" target="_blank" rel="noopener noreferrer">Jiangtao Gong</a>.',
    },
    {
      date: "May 2026",
      text: "Our poster paper was accepted for publication at HCII 2026.",
    },
    {
      date: "Jul 2025",
      text: 'Project "InsectSync 2.0" was shortlisted for the 2025 Lumen Prize (Experiential Category). As a result, we were invited to "The Liminal Review \'25" launch event at Onassis ONX on 5th Avenue (Olympic Tower) in NYC, as well as the 2025 Lumen Prize Awards Ceremony at Kunstsilo in Kristiansand, Norway.',
    },
    {
      date: "Dec 2024",
      text: 'Project "AquaSense" awarded Gold in the Experiential Category of the 2025 MUSE Creative Awards.',
    },
  ],
  newsCn: [
    { date: "2026年8月", text: "将在新加坡南洋理工大学（NTU）攻读游戏设计与艺术技术理学硕士（GDAT）！" },
    { date: "2026年7月", text: "获邀在 HCII 2026 国际会议上展示关于 VR 皮影戏的海报。" },
    { date: "2026年6月", text: '加入 HCI+ 2026 暑期科研项目，任学生研究员，由<a href="https://scholar.google.com/citations?user=AktmI14AAAAJ" target="_blank" rel="noopener noreferrer">龚江涛</a>副教授指导。' },
    { date: "2026年5月", text: "Poster 论文被 HCII 2026 国际会议接收。" },
    {
      date: "2025年7月",
      text: '"InsectSync 2.0" 装置入围 2025 Lumen 奖（体验奖类别），并受邀参与在纽约第五大道 Onassis ONX (Olympic Tower) 举办的 The Liminal Review \'25 发布会，以及受邀挪威克里斯蒂安桑的 Kunstsilo 美术馆典礼。',
    },
    { date: "2024年12月", text: '装置项目 "AquaSense" 荣获 2025 MUSE 创意大奖体验类金奖。' },
  ],
  readingList: [
    { title: "Ways of Being: Animals, Plants, Machines", author: "James Bridle" },
    {
      title: "Multiagent Systems: Algorithmic, Game-Theoretic, and Logical Foundations",
      author: "Yoav Shoham & Kevin Leyton-Brown",
    },
    { title: "The Society of Mind", author: "Marvin Minsky" },
  ],
};

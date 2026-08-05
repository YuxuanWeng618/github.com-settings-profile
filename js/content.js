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
  lastUpdate: "Aug, 2026",
  googleScholar:
    "https://scholar.google.com/citations?view_op=list_works&hl=zh-TW&user=yqzwOIAAAAJ",
};

export const nav = [
  { label: "Projects", labelCn: "项目", href: "index.html", id: "projects" },
  { label: "Publications", labelCn: "出版物", href: "publications.html", id: "publications" },
  { label: "About", labelCn: "关于", href: "about.html", id: "about" },
];

export const projects = [
  {
    slug: "nephocodex",
    titleEn: "Nephocodex",
    titleCn: "云象",
    cover: "assets/projects/nephocodex/cover.png",
    images: ["assets/projects/nephocodex/cover.png"],
    tagsEn: ["Clouds", "Weather", "Interactive Installation", "Materiality"],
    tagsCn: ["云", "气象", "交互装置", "物质性"],
    href: "project.html?slug=nephocodex",
    detail: {
      meta: [
        { en: "Collaborative Project", cn: "合作项目" },
        { en: "Academic Project", cn: "学术项目" },
        { en: "Spring 2026", cn: "2026春季" },
      ],
      overview: {
        en: "An experimental installation based on real-time meteorological data and ice-screen interaction",
        cn: "一个基于实时气象数据与冰屏交互的实验装置",
      },
      bodyEn:
        "The inspiration for Nephocodex stems from my lifelong habit of observing the sky. In my personal experience and memory, the ever-changing clouds that once filled the horizon seem to be gradually vanishing. This subjective sense of loss drove me to conduct research, where I discovered a compelling parallax: \"cloud cover\" as seen from the ground differs drastically from how it appears when looking down at the atmosphere from outer space.\n\nThis discovery prompted me to re-examine the environmental narratives of my education, where the appearance or disappearance of clouds is often simplified as a mere symptom of pollution or destruction. However, based on the Gaia Hypothesis, the Earth is a self-regulating, living system. Atmospheric phenomena are not merely signals of damage but are integral parts of the planet's homeostasis (self-balancing mechanism). This installation centers on \"clouds\" as the primary subject to reconstruct this perception.",
      bodyCn:
        "Nephocodex 的灵感源于我长期仰望天空的本能习惯。在我的个体经验与记忆中，曾经漫天变幻的云朵似乎正在日益消逝。这种主观的缺失感驱使我展开调研，并发现了一个有趣的视差：地面视角下的「云量」与从宇宙俯瞰大气层的「云量」截然不同。\n\n这一发现促使我重新审视既往教育中关于环境的叙事——云的生灭往往被单纯视为污染或破坏的表征。然而，基于「盖亚假说」，地球是一个具有自我调节能力的生命系统，大气现象并非单一的受损信号，而是地球自我平衡机制的一部分。本装置以「云」为主体，试图重构这一认知。",
      materials: {
        labelEn: "Materials",
        labelCn: "材料",
        en: "Aluminum Profiles, U-Groove, Acrylic Boards, 12V Lithium Battery, 220V Portable Power Bank, DHT11 Sensor, R3 Arduino Board, Microphone Sound Sensor, Rain Sensor Module",
        cn: "铝型材、U型槽、亚克力板、12V 锂电池、220V 便携移动电源、DHT11 温湿度传感器、Arduino Uno R3 开发板、麦克风声音传感器、雨水传感器模块",
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

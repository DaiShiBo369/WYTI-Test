// ============================================================================
//  WYTI 专业选择测试引擎  —  test.js
//  题目设计：MBTI式强迫选择法 + 大学生日常心理 + 轻松幽默风格
// ============================================================================

(function() {
  "use strict";

  const DIMENSION_LABELS = {
    M: { name: "实践操作力", icon: "🔧", color: "#0ea5e9" },
    D: { name: "数字编程力", icon: "💻", color: "#38bdf8" },
    P: { name: "微观理论力", icon: "⚛️", color: "#7dd3fc" },
    S: { name: "系统思维力", icon: "🌐", color: "#0369a1" },
    V: { name: "社会价值感", icon: "🏛️", color: "#0284c7" }
  };

    // ==================== 18道四选项混合维度题 ====================
  // 每题4个选项，每个选项含主维度(2分)+辅维度(1分)，共6题×3轮
  // 选项不出现维度关键词，简短抽象，贴近校园生活
  const questions = [
    {
      id: 1,
      text: "实验课上设备读数异常，你会先：",
      options: [
        { text: "反复调试接线，边试边排查（这个放这里~）", scores: { M: 2, D: 1 } },
        { text: "对照手册逐条核对参数配置", scores: { D: 2, P: 1 } },
        { text: "回想这和课上讲的哪个模型有关", scores: { P: 2, S: 1 } },
        { text: "看看其他同学有没有同样问题", scores: { V: 2, M: 1 } }
      ]
    },
    {
      id: 2,
      text: "下周要考高微/微A/高代/复变，你倾向于：",
      options: [
        { text: "找往年题大量练习，在刷题中找手感", scores: { M: 2, D: 1 } },
        { text: "画一张大图，把知识之间的关系理清楚", scores: { S: 2, P: 1 } },
        { text: "回到课本，把每条定理的推导吃透", scores: { P: 2, D: 1 } },
        { text: "和同学一起复习（预习），互相讲不懂的地方", scores: { V: 2, S: 1 } }
      ]
    },
    {
      id: 3,
      text: "写沟论文做到一半卡住了，你会：",
      options: [
        { text: "先搭一个粗糙版本出来，再慢慢改", scores: { M: 2, S: 1 } },
        { text: "把大论题切成几块，一块一块解决", scores: { D: 2, M: 1 } },
        { text: "重新翻翻文献，确认理解没偏差", scores: { P: 2, D: 1 } },
        { text: "找老师或助教聊聊，确认方向对不对", scores: { V: 2, P: 1 } }
      ]
    },
    {
      id: 4,
      text: "读一篇新领域的论文，你习惯先：",
      options: [
        { text: "跳到实验部分，看数据和图表", scores: { M: 2, P: 1 } },
        { text: "先理清作者的论证链条是否严密", scores: { D: 2, S: 1 } },
        { text: "先把握这个研究在领域里处于什么位置", scores: { S: 2, V: 1 } },
        { text: "关注这个研究在实际应用的可能成果", scores: { V: 2, M: 1 } }
      ]
    },
    {
      id: 5,
      text: "如果有一门工科课的作业可以在以下四个方案中选择，你会选：",
      options: [
        { text: "从零开始亲手设计制作一个具备特定功能的实物装置", scores: { M: 2, S: 1 } },
        { text: "建立一个数学物理模型，并进行电脑仿真", scores: { D: 2, P: 1 } },
        { text: "设计一个工程系统，并进行优化", scores: { S: 2, P: 1 } },
        { text: "查找一个大型工程设施案例，并分析其意义", scores: { V: 2, M: 1 } }
      ]
    },
    {
      id: 6,
      text: "在一次关键实验课上，设备读数突然出现异常，且距离提交报告只有10分钟，你的第一反应是：",
      options: [
        { text: "直接上手检查设备，通过更换线缆、拔插接口等方式快速寻找反馈", scores: { M: 2, D: 1 } },
        { text: "暂时脱离设备，在草稿纸上快速推算，判断读数范围", scores: { D: 2, S: 1 } },
        { text: "重新核对实验参数与操作手册的每一处细节", scores: { P: 2, D: 1 } },
        { text: "观察周围同学的实验现象，判断是否为实验室环境带来的系统误差", scores: { V: 2, S: 1 } }
      ]
    },
    {
      id: 7,
      text:  "给你一个月的时间，除了宅在宿舍打游戏，你更希望：",
      options: [
        { text: "实现一个之前一直没来得及做的疯狂想法", scores: { M: 2, P: 1 } },
        { text: "去一个地方静下来思考一下自己的学习生活", scores: { D: 2, P: 1 } },
        { text: "读一下之前一直想读的书", scores: { S: 2, P: 1 } },
        { text: "去看看世界的样子", scores: { V: 2, S: 1 } }
      ]
    },
    {
      id: 8,
      text: "你比较欣赏身边的同学是因为他们：",
      options: [
        { text: "能力很强，感觉无所不能", scores: { M: 2, D: 1 } },
        { text: "想问题很深入，能抓住本质", scores: { P: 2, D: 1 } },
        { text: "能把团队协调得很好", scores: { S: 2, V: 1 } },
        { text: "很随和，和他相处很舒服", scores: { V: 2, M: 1 } }
      ]
    },
    {
      id: 9,
      text: "小组作业有人进度落后，你会：",
      options: [
        { text: "直接上手和他进行分工", scores: { M: 2, V: 1 } },
        { text: "指出他该做什么，宽限一下DDL", scores: { D: 2, S: 1 } },
        { text: "私下问问他是不是遇到什么困难", scores: { V: 2, S: 1 } },
        { text: "重新分配分工，让大家各展所长", scores: { S: 2, D: 1 } }
      ]
    },
    {
      id: 10,
      text: "想了解一个从没接触过教材上的概念，你更倾向于：",
      options: [
        { text: "搜视频看别人怎么解释的", scores: { M: 2, D: 1 } },
        { text: "直接翻到教材看对应的定义和推导", scores: { P: 2, D: 1 } },
        { text: "问问学过的人是怎么理解的", scores: { V: 2, S: 1 } },
        { text: "多花一些时间搜更多的资料来对比", scores: { S: 2, P: 1 } }
      ]
    },
    {
      id: 11,
      text: "你更向往的工作状态是：",
      options: [
        { text: "深耕在一个领域，不断提升自己的咖位", scores: { M: 2, D: 1 } },
        { text: "不断探索，做没人做过的前沿", scores: { P: 2, S: 1 } },
        { text: "协调一个团队实现一个伟大的项目", scores: { S: 2, V: 1 } },
        { text: "不管做什么，能让更多的人能从我的工作中受益", scores: { V: 2, P: 1 } }
      ]
    },
    {
      id: 12,
      text: "面对两个方案各有利弊，你第一步会：",
      options: [
        { text: "先挑一个试，不行再换", scores: { M: 2, S: 1 } },
        { text: "列张表逐项比较", scores: { D: 2, S: 1 } },
        { text: "思考每个方案的出发点是否合适", scores: { P: 2, D: 1 } },
        { text: "问问受影响的人怎么想", scores: { V: 2, S: 1 } }
      ]
    },
   
    {
      id: 13,
      text: "考试前一周压力很大，你会：",
      options: [
        { text: "疯狂做题，用熟练度缓解焦虑", scores: { M: 2, D: 1 } },
        { text: "把重点推导重新过一遍", scores: { P: 2, D: 1 } },
        { text: "梳理各科优先级分配时间", scores: { S: 2, D: 1 } },
        { text: "找朋友聊聊互相打气", scores: { V: 2, S: 1 } }
      ]
    },
    {
      id: 15,
      text: "未来理想的工作状态是：",
      options: [
        { text: "在堆满了机械臂、3D 打印机的实验室中亲手调试设备", scores: { M: 2, S: 1 } },
        { text: "在极端清洁的超净实验室中进行数据处理和理论推导", scores: { P: 2, D: 1 } },
        { text: "在布满多屏显示器的系统调度中心进行数据监测", scores: { S: 2, P: 1 } },
        { text: "在国家级工程的一线奋斗", scores: { V: 2, P: 1 } }
      ]
    },
    {
      id: 14,
      text: "用一款新出的AI，你会：",
      options: [
        { text: "深度体验，尝试合适的prompt", scores: { M: 2, D: 1 } },
        { text: "看教程理解这个AI的优缺点，适时调用", scores: { P: 2, D: 1 } },
        { text: "体验这款AI宣传的最牛的功能", scores: { S: 2, P: 1 } },
        { text: "看看身边高手怎么用它", scores: { V: 2, S: 1 } }
      ]
    },
    {
      id: 16,
      text: "一门好课最重要的特质是：",
      options: [
        { text: "能带着学生做出实际的成果", scores: { M: 2, S: 1 } },
        { text: "从底层规律出发，严密推导出一整套理论体系", scores: { D: 2, P: 1 } },
        { text: "能发散思维，把之前的知识串起来", scores: { S: 2, P: 1 } },
        { text: "将课程内容与国家重大工程和卡脖子领域相关联", scores: { V: 2, M: 1 } }
      ]
    },
    {
      id: 17,
      text: "事情搞砸了/游戏输了，第一反应？",
      options: [
        { text: "再来一次！我就不信了", scores: { M: 2, P: 1 } },
        { text: "哪里出问题了？复盘！", scores: { D: 2, P: 1 } },
        { text: "整体有问题，不是我一个人的锅", scores: { S: 2, P: 1 } },
        { text: "或许方向本身就错了？（陷入思考）", scores: { V: 2, S: 1 } }
      ]
    },
    {
      id: 18,
      text: "你最希望的大学生活是：",
      options: [
        { text: "有更多机会去实验室中实操", scores: { M: 2, S: 1 } },
        { text: "沉浸式钻研硬核理论", scores: { D: 2, P: 1 } },
        { text: "参与创业类竞赛、进行团队合作并了解商业模式", scores: { P: 2, M: 1 } },
        { text: "在导师的带领下前往一线进行社会调研，了解社会真实需求", scores: { V: 2, D: 1 } }
      ]
    },
    {
      id: 19,
      text: "你未来的职业抱负是：",
      options: [
        { text: "深耕在一个领域，不断提升自己的咖位", scores: { M: 2, D: 1 } },
        { text: "协调一个团队实现一个伟大的项目", scores: { S: 2, D: 1 } },
        { text: "不断探索，做没人做过的前沿", scores: { P: 2, D: 1 } },
        { text: "设计或制造出能解决大众现实问题的东西", scores: { V: 2, S: 1 } }
      ]
    },
    {
      id: 20,
      text: "哪种成就感让你最爽？",
      options: [
        { text: "做出了一个好用的东西（比如WYTI）", scores: { M: 2, D: 1 } },
        { text: "终于弄懂了很难的概念", scores: { P: 2, D: 1 } },
        { text: "通过梳理许多信息得到了非常清晰的框架", scores: { S: 2, P: 1 } },
        { text: "帮人解决了一个问题", scores: { V: 2, M: 1 } }
      ]
    },
    {
      id: 21,
      text: "假如你要写一篇论文，你更关注：",
      options: [
        { text: "基于真实的实验结果推导", scores: { M: 2, S: 1 } },
        { text: "理论问题的研究深度", scores: { P: 2, D: 1 } },
        { text: "新论点能否构建一套自洽的系统", scores: { S: 2, D: 1 } },
        { text: "课题的社会影响和意义", scores: { V: 2, P: 1 } }
      ]
    },
    {
      id: 22,
      text: "在处理多任务并发的情况时，你的习惯是",
      options: [
        { text: "哪个最有手感、最快出成果，先做哪个", scores: { M: 2, P: 1 } },
        { text: "分析任务之间的先后关系，处理起来更有效率", scores: { D: 2, S: 1 } },
        { text: "彻底钻透一个，再开始下一个", scores: { P: 2, S: 1 } },
        { text: "先看大局，把最重要的那件事稳住", scores: { V: 2, M: 1 } }
      ]
    },
    {
      id: 23,
      text: "睡不着时会想什么？",
      options: [
        { text: "自己未来能干出些什么", scores: { M: 2, D: 1 } },
        { text: "某个问题的解法（不是哥们，这也在学吗）", scores: { P: 2, D: 1 } },
        { text: "反思一下自己现在的生活（e.g.为什么还没有男/女朋友）", scores: { S: 2, V: 1 } },
        { text: "对社会热点事件的看法", scores: { V: 2, P: 1 } }
      ]
    },
    {
      id: 24,
      text: "向别人解释一个复杂概念，你优先考虑的是：",
      options: [
        { text: "用更具象的实物或者画图来解释", scores: { M: 2, P: 1 } },
        { text: "一步步推导确保他跟上", scores: { D: 2, P: 1 } },
        { text: "先理清整体思维脉络", scores: { S: 2, P: 1 } },
        { text: "顺着他的思维方式来", scores: { V: 2, D: 1 } }
      ]
    }
  ];

  // ==================== 专业权重矩阵（等总和+等范数优化版）====================
  // 设计原则：
  // 1. 所有专业权重总和=26（消除"平均权重高则易匹配"的偏差）
  // 2. 所有专业范数²≈154（确保余弦相似度在随机均匀向量下对各专业均衡）
  // 3. 每个专业有明确特长维度(≥7)和短板维度(≤3)
  // 4. 5维度特长分布均衡：M:2, D:3, P:4, S:4, V:2
  const departmentProfiles = {
    "机械工程":           { M: 9, D: 4, P: 5, S: 4, V: 4 },
    "材料科学与工程":     { M: 9, D: 3, P: 5, S: 5, V: 4 },
    "电气工程及其自动化":  { M: 3, D: 6, P: 3, S: 6, V: 8 },
    "测控技术与仪器":     { M: 6, D: 7, P: 3, S: 7, V: 3 },
    "微电子科学与工程":   { M: 4, D: 8, P: 7, S: 4, V: 3 },
    "集成电路":           { M: 4, D: 7, P: 8, S: 4, V: 3 },
    "工程物理":           { M: 3, D: 5, P: 9, S: 5, V: 4 },
    "工业工程":           { M: 4, D: 5, P: 3, S: 9, V: 5 },
    "软件工程":           { M: 3, D: 6, P: 6, S: 8, V: 3 },
    "能源与动力工程":     { M: 3, D: 3, P: 7, S: 8, V: 5 },
    "环境工程":           { M: 3, D: 4, P: 5, S: 5, V: 9 }
  };

  const departmentDescriptions = {
    "能源与动力工程": "你关注国家能源安全与\"双碳\"目标，具备扎实的物理理论基础和系统宏观思维，愿意在清洁能源领域深耕，践行\"能动报国\"的使命。",
    "机械工程": "你拥有强大的空间想象能力和动手实践天赋，善于将设计方案转化为实物，愿意在具体工程问题上持续深耕。",
    "测控技术与仪器": "你对交叉学科领域充满兴趣，具备软硬件结合的系统视野，愿意在精密工程领域持续探索。",
    "工业工程": "你擅长从全局角度优化复杂系统，兼具定量分析能力与系统思维，适合从事系统优化与运筹决策方向。",
    "电气工程及其自动化": "你对电力系统和电子技术都有浓厚兴趣，具备扎实的数理基础和系统整合能力，愿意在能源互联网领域深耕。",
    "微电子科学与工程": "你对半导体物理和电路设计有深入理解，追求微观尺度的技术突破，愿意在芯片设计领域持续探索。",
    "工程物理": "你具备深厚的物理理论功底和工程实现能力，愿意在大科学装置和前沿物理领域持续深耕。",
    "材料科学与工程": "你兼具实验操作能力与微观机理分析能力，善于探索物质世界的规律，愿意为新材料研发付出长期努力。",
    "软件工程": "你具备严谨的逻辑思维和抽象分析能力，善于用系统化方法解决复杂问题，适合从事软件系统与算法设计方向。",
    "环境工程": "你关注可持续发展和生态文明建设，具备系统思维和多学科交叉视野，愿意在环境保护领域持续深耕。",
    "集成电路": "你对芯片设计和半导体技术充满热情，兼具物理深度与工程实现能力，愿意在集成电路领域持续探索。"
  };

  const departmentGrowth = {
    "能源与动力工程": "继续夯实工程热物理和流体力学基础，多参与能源系统相关的科研项目，关注氢能、燃料电池等前沿方向，培养团队协作和工程实践能力。",
    "机械工程": "重点培养空间想象能力和动手实践能力，多参加工程实践类课程和竞赛，学习先进制造技术，关注智能制造和机器人领域。",
    "测控技术与仪器": "打好光学、电子学、测控技术的基础课程，培养独立思考和动手调试能力，积极参与科研训练项目，关注精密仪器和智能感知应用。",
    "工业工程": "强化数学建模和系统性思维能力，学习运筹学和仿真工具，关注物流系统、供应链优化等实际应用场景，提升跨学科协作能力。",
    "电气工程及其自动化": "扎实掌握电磁场、电路理论和系统分析方法，关注新能源并网、储能技术等前沿方向，培养从局部到整体的系统整合能力。",
    "微电子科学与工程": "重视半导体物理和器件原理基础，学习工艺仿真和器件建模工具，尽早接触科研，了解从设计到制造的完整流程。",
    "工程物理": "打牢数理基础，培养科学计算和数据分析能力，关注核科学、粒子物理等前沿方向，保持严谨求实的学术初心。",
    "材料科学与工程": "重视物理化学基础和实验操作技能，多在实验室积累经验，培养耐心和长期投入的精神，关注新材料在能源、电子等领域的应用。",
    "软件工程": "扎实掌握数据结构、算法、操作系统等基础课程，培养抽象建模和系统设计能力，参与实际项目积累工程经验。",
    "环境工程": "建立化学、生物、物理的综合基础，培养环境监测和数据分析能力，关注环境治理技术前沿，参与环保相关的社会实践。",
    "集成电路": "重视半导体物理和电路设计基础，学习硬件描述语言和EDA工具，尽早参与科研或设计竞赛，关注先进工艺和国产替代方向。"
  };

  const crossDirections = {
    "机械工程-测控技术与仪器": {
      name: "精密机械与智能装备",
      description: "你兼具机械制造的实践功底和精密测控的系统思维。你适合精密仪器设计、高端装备制造、光刻机控制等方向——这是机械系和精仪系实际紧密交叉的前沿领域。",
      growth: "强化机械制图和光学/电子基础，培养精密机械设计能力，关注高端装备制造和航空航天领域的精密控制方向。"
    },
    "机械工程-工业工程": {
      name: "智能制造与生产系统",
      description: "你既爱动手做实物，又善于从系统角度优化流程。你适合智能制造系统、数字化工厂、生产自动化等方向——将工业工程的系统优化思维与机械制造的实践能力完美结合。",
      growth: "学习制造系统建模与仿真，培养数字化设计和工艺规划能力，关注工业4.0和智能制造前沿，参与生产系统优化项目。"
    },
    "能源与动力工程-电气工程及其自动化": {
      name: "新型电力系统与能源互联网",
      description: "你同时具备能源转换的物理理解和电力系统的宏观视野。你适合综合能源系统、分布式发电、微电网、能源互联网等方向——未来电力系统的核心交叉点。",
      growth: "深入理解能源转换和电力系统运行原理，学习能源系统建模与优化，关注新能源并网和储能系统集成技术。"
    },
    "电气工程及其自动化-软件工程": {
      name: "智能电网与电力信息",
      description: "你既有电气系统的专业基础，又具备强大的编程能力。你适合智能电网调度、电力系统AI、能源大数据分析、电力市场算法等前沿方向。",
      growth: "打好电气工程基础的同时强化编程能力，学习电力系统分析和AI算法，关注电力系统数字化转型和智能调度技术。"
    },
    "工程物理-软件工程": {
      name: "计算物理与核数据科学",
      description: "你拥有深厚的物理功底和出色的编程能力。你适合蒙特卡罗模拟、核数据处理、科学计算、AI for Science等方向——用大计算解决大科学问题。",
      growth: "精通C++/Python和科学计算库，学习GEANT4、ROOT等专业工具，培养物理建模和数值算法能力，关注高性能计算和AI辅助科研。"
    },
    "材料科学与工程-环境工程": {
      name: "环境材料与绿色技术",
      description: "你兼具材料研发能力和环境系统思维。你适合环境功能材料、污染治理材料、可降解材料、绿色催化等方向——用材料创新解决环境问题。",
      growth: "建立材料科学和环境科学的双重基础，培养材料设计和环境应用评价能力，关注环保材料和绿色制造技术前沿。"
    },
    "测控技术与仪器-软件工程": {
      name: "智能感知与物联网",
      description: "你兼具精密测控的硬件能力和软件编程能力。你适合传感器网络、物联网系统、智能感知、边缘计算等方向——万物互联时代的核心技术。",
      growth: "学习传感器原理和嵌入式系统开发，掌握物联网通信协议和云平台开发，参与智能感知系统设计项目。"
    },
    "工业工程-软件工程": {
      name: "工业智能与数字化运营",
      description: "你同时具备系统优化思维和软件开发能力。你适合工业互联网、供应链数字化、智能调度、流程挖掘等方向——制造业数字化转型的重要力量。",
      growth: "强化运筹学和数据分析能力，学习工业软件开发和企业系统架构，关注工业互联网平台和智能制造执行系统(MES)。"
    }
  };

  const departmentMotto = {
    "能源与动力工程": "能源报国，动力强国",
    "机械工程": "精工造物，匠心独运",
    "测控技术与仪器": "测微知著，控驭精微",
    "工业工程": "系统优化，效率致胜",
    "电气工程及其自动化": "电气纵横，智能未来",
    "微电子科学与工程": "微纳世界，芯火相传",
    "工程物理": "格物致知，强核报国",
    "材料科学与工程": "观微知材，铸器成材",
    "软件工程": "逻辑为刃，代码为马",
    "环境工程": "绿水青山，生态报国",
    "集成电路": "芯火相传，集成天下"
  };

  const badgeMap = {
    "能源与动力工程":     "images/badges/energy.png",
    "机械工程":           "images/badges/mechanical.png",
    "测控技术与仪器":     "images/badges/instrument.png",
    "工业工程":           "images/badges/industrial.png",
    "电气工程及其自动化": "images/badges/electrical.png",
    "微电子科学与工程":   "images/badges/microelectronics.png",
    "工程物理":           "images/badges/engineering-physics.png",
    "材料科学与工程":     "images/badges/materials.png",
    "软件工程":           "images/badges/software.png",
    "环境工程":           "images/badges/environment.png",
    "集成电路":           "images/badges/integrated-circuit.png"
  };

  const crossBadgeMap = {
    "精密机械与智能装备":          ["images/badges/mechanical.png", "images/badges/instrument.png"],
    "智能制造与生产系统":          ["images/badges/mechanical.png", "images/badges/industrial.png"],
    "新型电力系统与能源互联网":    ["images/badges/energy.png", "images/badges/electrical.png"],
    "智能电网与电力信息":          ["images/badges/electrical.png", "images/badges/software.png"],
    "计算物理与核数据科学":        ["images/badges/engineering-physics.png", "images/badges/software.png"],
    "环境材料与绿色技术":          ["images/badges/materials.png", "images/badges/environment.png"],
    "智能感知与物联网":            ["images/badges/instrument.png", "images/badges/software.png"],
    "工业智能与数字化运营":        ["images/badges/industrial.png", "images/badges/software.png"]
  };

  const IC_P_THRESHOLD = 70;   // 集成电路P维度阈值
  const IC_D_THRESHOLD = 55;   // 集成电路D维度阈值
  const IC_X_THRESHOLD = 0.40; // X维度触发阈值（放宽）
  const IC_SCORE_BOOST = 0.018; // 加成幅度（降低）
  const CROSS_PROB_BASE = 0.52; // 交叉基础概率（大幅提高）
  const CROSS_PROB_X_COEF = 0.35; // X维度交叉系数
  const CROSS_PROB_D_COEF = 0.15; // 差距因子交叉系数
  const CROSS_DIFF_THRESHOLD = 0.12; // 差距阈值（放宽）
  const CROSS_PROB_MIN = 0.32; // 最小交叉概率
  const CROSS_PROB_MAX = 0.85; // 最大交叉概率
  const MATCH_NOISE_STD = 0.025; // 匹配度扰动标准差（打破系统性偏差）
  const RADAR_MAX = 100;
  const RESULT_UPLOAD_CONFIG = {
    enabled: true,
    supabaseUrl: "https://ftvwvfbufgccufceewnz.supabase.co",
    supabaseAnonKey: "sb_publishable_8bT1wEYcrksiXmaK2gvO8A_11X8tyHn",
    provider: "supabase", // "supabase" | "custom"
    tableName: "wyti_results",
    // 推荐开启：通过 Supabase RPC 返回聚合计数，避免开放明细 select
    useCountRpc: true,
    countRpcName: "get_wyti_results_count",
    customEndpoint: ""
  };
  const SHARE_IMAGE_CONFIG = {
    qrEnabled: true,
    qrTargetUrl: "https://wyti.top",
    qrApiBases: [
      "https://api.qrserver.com/v1/create-qr-code",
      "https://quickchart.io/qr"
    ]
  };

  let currentQuestionIndex = 0;
  let userAnswers = new Array(questions.length).fill(null);
  let rawScores = { M: 0, D: 0, P: 0, S: 0, V: 0 };
  let shuffledQuestions = [];
  let lastResultData = null;
  let hasSavedCurrentResult = false;
  const VISITOR_COMPLETED_KEY = "wyti_has_completed_test";

  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  function getCrossKey(dept1, dept2) {
    const sorted = [dept1, dept2].sort();
    return sorted[0] + "-" + sorted[1];
  }

  function hashStringToUnitInterval(input) {
    let hash = 2166136261;
    for (let i = 0; i < input.length; i++) {
      hash ^= input.charCodeAt(i);
      hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    return (hash >>> 0) / 4294967295;
  }

  function getVisitorId() {
    const key = "wyti_visitor_id";
    try {
      let id = localStorage.getItem(key);
      if (!id) {
        id = "v_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 10);
        localStorage.setItem(key, id);
      }
      return id;
    } catch (_) {
      return "v_" + Date.now().toString(36);
    }
  }

  function buildResultPayload(result) {
    return {
      visitor_id: getVisitorId(),
      test_version: "v1",
      result_type: result.resultType,
      result_name: result.resultName,
      matched_departments: result.matchedDepts,
      quantitative_scores: result.scores,
      normalized_scores: result.scores,
      top_matches: result.topMatches,
      answers: userAnswers,
      question_order: shuffledQuestions.map(q => q.id),
      user_scores_raw: rawScores,
      page_url: window.location.href,
      user_agent: navigator.userAgent,
      created_at_client: new Date().toISOString()
    };
  }

  async function uploadResultToSupabase(payload) {
    const base = (RESULT_UPLOAD_CONFIG.supabaseUrl || "").replace(/\/+$/, "");
    const key = RESULT_UPLOAD_CONFIG.supabaseAnonKey || "";
    const table = RESULT_UPLOAD_CONFIG.tableName || "wyti_results";
    if (!base || !key) throw new Error("Supabase 配置不完整");
    const res = await fetch(`${base}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": key,
        "Authorization": `Bearer ${key}`,
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Supabase 上传失败: ${res.status} ${text}`);
    }
  }

  async function uploadResultToCustomEndpoint(payload) {
    const endpoint = RESULT_UPLOAD_CONFIG.customEndpoint || "";
    if (!endpoint) throw new Error("customEndpoint 未配置");
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`自定义接口上传失败: ${res.status} ${text}`);
    }
  }

  async function saveResultToDatabase(result) {
    if (!RESULT_UPLOAD_CONFIG.enabled || hasSavedCurrentResult) return;
    const payload = buildResultPayload(result);
    try {
      if (RESULT_UPLOAD_CONFIG.provider === "supabase") {
        await uploadResultToSupabase(payload);
      } else {
        await uploadResultToCustomEndpoint(payload);
      }
      hasSavedCurrentResult = true;
      try { localStorage.setItem(VISITOR_COMPLETED_KEY, "1"); } catch (_) {}
      refreshVisitorCounter(true);
      console.log("[WYTI DB] result saved");
    } catch (err) {
      console.error("[WYTI DB] save failed", err);
    }
  }

  function setVisitorCounterText(text) {
    const counterEl = document.getElementById("visitor-counter-text");
    if (counterEl) counterEl.textContent = text;
  }

  async function fetchUsageCountFromSupabase() {
    const base = (RESULT_UPLOAD_CONFIG.supabaseUrl || "").replace(/\/+$/, "");
    const key = RESULT_UPLOAD_CONFIG.supabaseAnonKey || "";
    const table = RESULT_UPLOAD_CONFIG.tableName || "wyti_results";
    if (!base || !key) return null;
    const tablePath = encodeURIComponent(table);
    const rpcName = RESULT_UPLOAD_CONFIG.countRpcName || "get_wyti_results_count";
    const useCountRpc = RESULT_UPLOAD_CONFIG.useCountRpc !== false;
    const url = useCountRpc
      ? `${base}/rest/v1/rpc/${encodeURIComponent(rpcName)}`
      : `${base}/rest/v1/${tablePath}?select=id&limit=1`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    let res;
    try {
      res = await fetch(url, {
        method: useCountRpc ? "POST" : "GET",
        headers: {
          "apikey": key,
          "Authorization": `Bearer ${key}`,
          "Prefer": "count=exact",
          "Content-Type": "application/json"
        },
        signal: controller.signal,
        body: useCountRpc ? "{}" : undefined
      });
    } finally {
      clearTimeout(timeoutId);
    }
    if (!res.ok) return null;

    // RPC 模式：期待返回 [{"count":123}] 或 {"count":123}
    if (useCountRpc) {
      const data = await res.json().catch(() => null);
      const rawCount = Array.isArray(data) ? data[0]?.count : data?.count;
      const total = Number(rawCount);
      return Number.isFinite(total) ? total : null;
    }

    // 旧模式：依赖 content-range 头
    const contentRange = res.headers.get("content-range") || "";
    const totalPart = contentRange.split("/")[1];
    const total = Number(totalPart);
    if (!Number.isFinite(total)) return null;
    return total;
  }

  async function refreshVisitorCounter(afterSaved) {
    setVisitorCounterText("您是正在探索此测试的未小羊");
    if (!RESULT_UPLOAD_CONFIG.enabled || RESULT_UPLOAD_CONFIG.provider !== "supabase") {
      return;
    }
    try {
      const usageCount = await fetchUsageCountFromSupabase();
      if (usageCount === null) {
        setVisitorCounterText("您是正在探索此测试的未小羊");
        return;
      }
      const hasCompleted = afterSaved || localStorage.getItem(VISITOR_COMPLETED_KEY) === "1";
      const rank = hasCompleted ? usageCount : usageCount + 1;
      setVisitorCounterText(`您是第 ${rank} 位使用此测试的未小羊`);
    } catch (_) {
      setVisitorCounterText("您是正在探索此测试的未小羊");
    }
  }

  function switchPage(fromId, toId) {
    document.getElementById(fromId).classList.remove("active");
    document.getElementById(toId).classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderQuestion(index) {
    currentQuestionIndex = index;
    const q = shuffledQuestions[index];
    document.getElementById("current-question").textContent = index + 1;
    document.getElementById("total-questions").textContent = questions.length;
    const progress = Math.round(((index + 1) / questions.length) * 100);
    document.getElementById("progress-bar").style.width = progress + "%";
    document.getElementById("question-category").textContent = "请选择最符合你的一项";
    document.getElementById("question-text").textContent = q.text;
    const imgWrapper = document.getElementById("question-image-wrapper");
    const imgEl = document.getElementById("question-image");
    if (imgWrapper && imgEl && q.img) {
      imgEl.src = q.img; imgEl.alt = "问题" + q.id + "配图";
      imgWrapper.classList.remove("hidden");
    } else if (imgWrapper) { imgWrapper.classList.add("hidden"); }

    const container = document.getElementById("options-container");
    container.innerHTML = "";
    q.options.forEach((opt, i) => {
      const card = document.createElement("div");
      card.className = "option-card glass rounded-xl p-4 cursor-pointer pop-in";
      card.dataset.index = i;
      card.style.animationDelay = `${i * 40}ms`;
      card.innerHTML = `
        <div class="flex items-start">
            <div class="w-8 h-8 rounded-full bg-gradient-to-r from-sky-500 to-sky-400 text-white flex items-center justify-center font-semibold mr-4 flex-shrink-0 text-sm">
            ${String.fromCharCode(65 + i)}
          </div>
          <p class="text-gray-700 font-medium leading-relaxed">${opt.text}</p>
        </div>`;
      card.addEventListener("click", () => selectOption(i, opt.scores));
      container.appendChild(card);
    });
    if (userAnswers[index] !== null) {
      const cards = container.querySelectorAll(".option-card");
      if (cards[userAnswers[index]]) cards[userAnswers[index]].classList.add("selected");
    }
    document.getElementById("prev-button").disabled = (index === 0);
    const nextBtn = document.getElementById("next-button");
    nextBtn.innerHTML = index === questions.length - 1
      ? "查看结果 <i class=\"fas fa-check ml-2\"></i>"
      : "下一题 <i class=\"fas fa-arrow-right ml-2\"></i>";
  }

  window.showQuestion = function(index) {
    const stage = document.getElementById("question-content");
    if (!stage) {
      renderQuestion(index);
      return;
    }
    if (stage.classList.contains("leaving")) {
      renderQuestion(index);
      return;
    }
    if (!stage.classList.contains("entered")) {
      stage.classList.add("entered");
    }
    stage.classList.remove("entered", "entering");
    stage.classList.add("leaving");
    setTimeout(() => {
      renderQuestion(index);
      stage.classList.remove("leaving");
      stage.classList.add("entering");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          stage.classList.remove("entering");
          stage.classList.add("entered");
        });
      });
    }, 170);
  };

  function selectOption(optionIndex, scores) {
    const container = document.getElementById("options-container");
    const cards = container.querySelectorAll(".option-card");
    cards.forEach(c => c.classList.remove("selected"));
    cards[optionIndex].classList.add("selected");
    cards[optionIndex].classList.remove("option-clicked");
    cards[optionIndex].offsetWidth;
    cards[optionIndex].classList.add("option-clicked");
    const prevIndex = userAnswers[currentQuestionIndex];
    if (prevIndex !== null && shuffledQuestions[currentQuestionIndex].options[prevIndex]) {
      const oldScores = shuffledQuestions[currentQuestionIndex].options[prevIndex].scores;
      for (let key in oldScores) rawScores[key] = (rawScores[key] || 0) - oldScores[key];
    }
    userAnswers[currentQuestionIndex] = optionIndex;
    for (let key in scores) rawScores[key] = (rawScores[key] || 0) + scores[key];
  }

  window.showPreviousQuestion = function() {
    if (currentQuestionIndex > 0) { currentQuestionIndex--; window.showQuestion(currentQuestionIndex); }
  };

  window.showNextQuestion = function() {
    if (currentQuestionIndex >= questions.length - 1) return true;
    currentQuestionIndex++; window.showQuestion(currentQuestionIndex); return false;
  };

  window.resetTest = function() {
    currentQuestionIndex = 0;
    userAnswers = new Array(questions.length).fill(null);
    rawScores = { M: 0, D: 0, P: 0, S: 0, V: 0 };
    lastResultData = null;
    hasSavedCurrentResult = false;
    shuffledQuestions = shuffleArray(questions).map(q => ({ ...q, options: shuffleArray(q.options) }));
    document.getElementById("progress-bar").style.width = "5%";
    if (window.radarChartInstance) { window.radarChartInstance.destroy(); window.radarChartInstance = null; }
  };

  function calculateResult() {
    const dims = ["M", "D", "P", "S", "V"];

    // 归一化：改用Sum归一化（替代maxRaw归一化），保持方向不扭曲
    const total = dims.reduce((sum, d) => sum + (rawScores[d] || 0), 0);
    const denom = total > 0 ? total : 1;
    const scores = {};
    dims.forEach(dim => {
      scores[dim] = ((rawScores[dim] || 0) / denom) * 100;
    });

    // X维度 = 用户在 M/P 和 D/S 两对维度上的不偏程度
    const mpDiff = Math.abs(scores.M - scores.P);
    const dsDiff = Math.abs(scores.D - scores.S);
    const X_norm = Math.max(0, Math.min(1, 1 - (mpDiff + dsDiff) / 200));

    // ==================== 专业匹配：余弦相似度 + 随机扰动 ====================
    const matches = [];
    for (let dept in departmentProfiles) {
      const prof = departmentProfiles[dept];
      const vecScore = [scores.M, scores.D, scores.P, scores.S, scores.V];
      const vecProf = [prof.M, prof.D, prof.P, prof.S, prof.V];

      let dot = 0, normS = 0, normP = 0;
      for (let i = 0; i < 5; i++) {
        dot += vecScore[i] * vecProf[i];
        normS += vecScore[i] * vecScore[i];
        normP += vecProf[i] * vecProf[i];
      }
      let cosine = normS > 0 && normP > 0 ? dot / (Math.sqrt(normS) * Math.sqrt(normP)) : 0;
      // 关键优化：加入高斯扰动打破系统性偏差（原V极端值调节已移除）
      cosine += (Math.random() * 2 - 1) * MATCH_NOISE_STD;
      matches.push({ name: dept, score: cosine });
    }

    // ==================== 集成电路特殊门槛（宽松条件）====================
    if (scores.P >= IC_P_THRESHOLD && scores.D >= IC_D_THRESHOLD && X_norm >= IC_X_THRESHOLD) {
      const icIdx = matches.findIndex(m => m.name === "集成电路");
      if (icIdx >= 0) matches[icIdx].score += IC_SCORE_BOOST;
    }

    matches.sort((a, b) => b.score - a.score);

    // ==================== 交叉方向判定（提高概率）====================
    const top1 = matches[0], top2 = matches[1];
    const diff = top1.score - top2.score;
    const relDiff = top1.score > 0 ? diff / top1.score : 1;
    const diffFactor = Math.max(0, 1 - relDiff / CROSS_DIFF_THRESHOLD);
    let crossProb = CROSS_PROB_BASE + X_norm * CROSS_PROB_X_COEF + diffFactor * CROSS_PROB_D_COEF;
    if (X_norm < 0.3) crossProb *= 0.7;
    if (X_norm > 0.6) crossProb = Math.min(CROSS_PROB_MAX + 0.05, crossProb * 1.2);
    crossProb = Math.max(CROSS_PROB_MIN, Math.min(CROSS_PROB_MAX, crossProb)); // cap=0.85

    let resultType, resultName, resultDesc, resultGrowth, matchedDepts = [];
    const crossKey = getCrossKey(top1.name, top2.name);
    const crossDir = crossDirections[crossKey];
    const shouldCross = (Math.random() < crossProb) && crossDir;

    if (shouldCross) {
      resultType = "cross";
      resultName = crossDir.name;
      resultDesc = crossDir.description;
      resultGrowth = crossDir.growth;
      matchedDepts = [top1.name, top2.name];
    } else {
      resultType = "single";
      resultName = top1.name;
      resultDesc = departmentDescriptions[top1.name];
      resultGrowth = departmentGrowth[top1.name];
      matchedDepts = [top1.name];
    }

    // 最低维度
    let minDim = dims[0], minScore = scores[dims[0]];
    dims.forEach(d => { if (scores[d] < minScore) { minScore = scores[d]; minDim = d; } });

    const dimAdvice = {
      M: "尝试参加工程实践、动手制作等活动，培养操作能力和空间想象能力。",
      D: "加强逻辑推理训练，学习用结构化方法拆解问题，培养抽象思维能力。",
      P: "夯实数理基础，重视理论推导和概念理解，培养从原理出发分析问题的习惯。",
      S: "关注系统层面的问题，学习用全局视角分析复杂工程，提升统筹协调能力。",
      V: "多关注工程技术背后的社会价值和公共意义，培养人文关怀意识。"
    };

    return {
      resultType, resultName, resultDesc, resultGrowth, matchedDepts,
      topMatches: matches.slice(0, 5),
      scores,
      minDim, minScore,
      supplementaryAdvice: dimAdvice[minDim],
      X_norm, crossProb, shouldCross
    };
  }

  function renderStoryEnding(result) {
    const storyTitleEl = document.getElementById("story-title");
    const storyDescEl = document.getElementById("story-description");
    const storyTimelineEl = document.getElementById("story-timeline");
    if (!storyTitleEl || !storyDescEl || !storyTimelineEl) return;

    const dimOrder = ["M", "D", "P", "S", "V"];
    const sortedDims = dimOrder
      .map(key => ({ key, value: result.scores[key] || 0 }))
      .sort((a, b) => b.value - a.value);
    const lead = sortedDims[0];
    const support = sortedDims[1];
    const leadName = DIMENSION_LABELS[lead.key].name;
    const supportName = DIMENSION_LABELS[support.key].name;
    const _maxVal = Math.max(...dimOrder.map(dim => result.scores[dim]), 1);
    const leadPct = Math.round((lead.value / _maxVal) * 100);
    const supportPct = Math.round((support.value / _maxVal) * 100);
    const stageTitle = result.resultType === "cross"
      ? `🎬 双线结局已解锁：${result.resultName}`
      : `🎬 主线结局已解锁：${result.resultName}`;
    const roleMap = {
      M: "动手开荒型选手",
      D: "逻辑分析型选手",
      P: "原理洞察型选手",
      S: "全局调度型选手",
      V: "价值驱动型选手"
    };

    const timeline = [
      `【序章】你以 ${leadName}（${leadPct}%）开局，自带 ${roleMap[lead.key]} 气质。`,
      `【转折】${supportName}（${supportPct}%）成为你的副技能，让你在复杂任务里更稳。`,
      `【终章】你最终点亮「${result.resultName}」方向，下一步建议是：${result.resultGrowth}`
    ];

    storyTitleEl.textContent = stageTitle;
    storyDescEl.textContent = `这不是唯一答案，但它很像你当前版本的“成长主线”。`;
    storyTimelineEl.innerHTML = timeline
      .map(item => `<div class="story-line-item">${item}</div>`)
      .join("");
  }

  // ==================== showResult() — 含院徽+院训+定量分数 ====================
  window.showResult = function() {
    const result = calculateResult();
    lastResultData = result;
    console.log("[WYTI Debug]", { X_norm: result.X_norm, crossProb: result.crossProb, shouldCross: result.shouldCross });
    saveResultToDatabase(result);

    const badgeEl = document.getElementById("result-badge");
    const crossDeptsEl = document.getElementById("result-cross-depts");
    const titleEl = document.getElementById("result-title");
    const descEl = document.getElementById("result-description");

    if (result.resultType === "cross") {
      badgeEl.innerHTML = "<span class=\"cross-tag\">🔄 交叉工程方向</span>";
      titleEl.textContent = result.resultName;
      crossDeptsEl.innerHTML = result.matchedDepts.map(d => `<span class="cross-tag">${d}</span>`).join("");
      crossDeptsEl.classList.remove("hidden");
    } else {
      badgeEl.innerHTML = "<span class=\"cross-tag\">🎯 推荐专业</span>";
      titleEl.textContent = result.resultName;
      crossDeptsEl.classList.add("hidden");
    }
    descEl.textContent = result.resultDesc;

    // 院徽展示（正方形 + 根据照片大小自动匹配）
    const badgeImgWrapper = document.getElementById("result-badge-img-wrapper");
    if (result.resultType === "cross") {
      const paths = crossBadgeMap[result.resultName];
      if (paths && paths.length >= 2) {
        badgeImgWrapper.innerHTML = `
          <img src="${paths[0]}" class="badge-img-cross-left"
               onerror="this.style.display='none';this.parentElement.querySelector('.fb-cross').style.display='flex'">
          <img src="${paths[1]}" class="badge-img-cross-right"
               onerror="this.style.display='none'">
          <div class="fb-cross" style="display:none">
            <div class="badge-fallback square"><span>${result.matchedDepts[0].charAt(0)}</span></div>
            <div class="badge-fallback square"><span>${result.matchedDepts[1].charAt(0)}</span></div>
          </div>`;
      }
    } else {
      const path = badgeMap[result.resultName];
      if (path) {
        badgeImgWrapper.innerHTML = `
          <img src="${path}" class="badge-img-single"
               onerror="this.style.display='none';this.parentElement.querySelector('.fb-single').style.display='flex'">
          <div class="fb-single" style="display:none">
            <div class="badge-fallback square large"><span>${result.resultName.charAt(0)}</span></div>
          </div>`;
      }
    }

    // 院训展示
    const mottoEl = document.getElementById("result-motto");
    const mottoForDisplay = result.resultType === "cross"
      ? (departmentMotto[result.matchedDepts[0]] || "自强不息，厚德载物")
      : (departmentMotto[result.resultName] || "自强不息，厚德载物");
    mottoEl.querySelector(".motto-text").textContent = mottoForDisplay;
    mottoEl.style.display = "block";

        // ==================== 五维相对强度条形图（相对最强维度 = 100%）====================
    const dimContainer = document.getElementById("dimensions-container");
    dimContainer.innerHTML = "";
    const dimOrder = ["M", "D", "P", "S", "V"];
    const maxScore = Math.max(...dimOrder.map(dim => result.scores[dim]), 1);
    dimOrder.forEach(dim => {
      const val = result.scores[dim]; // 原始定量分
      const relativePct = Math.round((val / maxScore) * 100); // 相对最强百分比（关键：用户要的就是这个）
      const isStrongest = (val === maxScore);
      const info = DIMENSION_LABELS[dim];
      const row = document.createElement("div");
      row.innerHTML = `
        <div class="flex items-center mb-1">
          <span class="text-lg mr-2">${info.icon}</span>
          <span class="font-medium text-gray-700 w-24">${info.name}</span>
          <span class="font-bold text-primary-600 ml-auto">${isStrongest ? '🏆最强 ' : ''}${relativePct}%</span>
        </div>
        <div class="match-bar-bg">
          <div class="match-bar-fill dimension-bar" style="width: 0%" data-width="${relativePct}%"></div>
        </div>`;
      dimContainer.appendChild(row);
    });
    setTimeout(() => {
      dimContainer.querySelectorAll(".dimension-bar").forEach(bar => {
        bar.style.width = bar.dataset.width;
      });
    }, 100);

    // 五维雷达图（使用相对百分比）
    const _maxScore = Math.max(...dimOrder.map(dim => result.scores[dim]), 1);
    createRadarChart(dimOrder.map(dim => ({
      name: DIMENSION_LABELS[dim].name,
      value: Math.round((result.scores[dim] / _maxScore) * 100)
    })));

    // Top 5 匹配度排行
    const topContainer = document.getElementById("top-matches-container");
    topContainer.innerHTML = "";
    result.topMatches.forEach((m, idx) => {
      const pct = Math.round(m.score * 1000) / 10;
      const isPrimary = idx === 0 || (result.resultType === "cross" && idx === 1);
      const row = document.createElement("div");
      row.className = "flex items-center";
      row.innerHTML = `
        <span class="w-32 md:w-40 text-sm font-medium text-gray-700 truncate">${m.name}</span>
        <div class="flex-1 match-bar-bg mx-3">
          <div class="match-bar-fill" style="width: 0%; opacity: ${isPrimary ? 1 : 0.6}" data-width="${pct}%"></div>
        </div>
        <span class="w-12 text-sm font-bold text-primary-600 text-right">${pct}%</span>`;
      topContainer.appendChild(row);
    });
    setTimeout(() => {
      topContainer.querySelectorAll(".match-bar-fill").forEach(bar => {
        bar.style.width = bar.dataset.width;
      });
    }, 200);

    // 优势维度 Top 3
    const strengthsList = document.getElementById("strengths-list");
    strengthsList.innerHTML = "";
    const sortedDims = dimOrder.map(d => ({ key: d, val: result.scores[d] }))
      .sort((a, b) => b.val - a.val).slice(0, 3);
    const _maxForStrengths = Math.max(...sortedDims.map(d => d.val), 1);
    sortedDims.forEach(d => {
      const relativePct = Math.round((d.val / _maxForStrengths) * 100);
      const li = document.createElement("li");
      li.className = "flex items-center";
      li.innerHTML = `<span class="text-green-500 mr-2"><i class="fas fa-check-circle"></i></span>
        <span>${DIMENSION_LABELS[d.key].name} — ${relativePct}%</span>`;
      strengthsList.appendChild(li);
    });

    // 发展建议
    const suggestionsList = document.getElementById("suggestions-list");
    suggestionsList.innerHTML = "";
    [result.resultGrowth, result.supplementaryAdvice].forEach(text => {
      const li = document.createElement("li");
      li.className = "flex items-start";
      li.innerHTML = `<span class="text-primary-500 mr-2 mt-1"><i class="fas fa-lightbulb"></i></span> <span>${text}</span>`;
      suggestionsList.appendChild(li);
    });

    // 补充建议
    const supBox = document.getElementById("supplementary-box");
    document.getElementById("supplementary-text").textContent =
      `维度【${DIMENSION_LABELS[result.minDim].name}】稍低于其他维度。${result.supplementaryAdvice}`;
    supBox.classList.remove("hidden");

    renderStoryEnding(result);

    // 推荐专业卡片 Top 3
    const recContainer = document.getElementById("recommended-majors");
    recContainer.innerHTML = "";
    result.topMatches.slice(0, 3).forEach(m => {
      const prof = departmentProfiles[m.name];
      const topDim = Object.keys(prof).reduce((a, b) => prof[a] > prof[b] ? a : b);
      const card = document.createElement("div");
      card.className = "glass rounded-xl p-5 text-center hover:shadow-lg transition";
      card.innerHTML = `
        <div class="text-3xl mb-3">${DIMENSION_LABELS[topDim].icon}</div>
        <h4 class="font-bold text-primary-700 mb-2">${m.name}</h4>
        <p class="text-xs text-gray-500">${departmentDescriptions[m.name].substring(0, 50)}...</p>`;
      recContainer.appendChild(card);
    });
  };

  function createRadarChart(dimensions) {
    const ctx = document.getElementById("radarChart").getContext("2d");
    if (window.radarChartInstance) { window.radarChartInstance.destroy(); }
    window.radarChartInstance = new Chart(ctx, {
      type: "radar",
      data: {
        labels: dimensions.map(d => d.name),
        datasets: [{
          label: "你的能力分布",
          data: dimensions.map(d => d.value),
          backgroundColor: "rgba(56, 189, 248, 0.2)",
          borderColor: "rgba(56, 189, 248, 1)",
          borderWidth: 2,
          pointBackgroundColor: "rgba(56, 189, 248, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(56, 189, 248, 1)"
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: true,
        scales: {
          r: {
            beginAtZero: true, max: RADAR_MAX,
            ticks: { stepSize: Math.round(RADAR_MAX / 4), font: { size: 11 } },
            pointLabels: { font: { size: 13, weight: "600" }, color: "#374151" }
          }
        },
        plugins: { legend: { position: "bottom", labels: { font: { size: 13 } } } }
      }
    });
  }

  function getShareCardSubtitle(result, topDims) {
    if (result.resultType === "cross") {
      return `双向适配：${result.matchedDepts.join(" × ")}`;
    }
    return `高能标签：${topDims.map(dim => DIMENSION_LABELS[dim.key].name).join(" + ")}`;
  }

  function drawMultilineText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
    let line = "";
    const lines = [];
    for (const char of text) {
      const test = line + char;
      if (ctx.measureText(test).width > maxWidth && line !== "") {
        lines.push(line);
        line = char;
      } else {
        line = test;
      }
      if (lines.length >= maxLines) break;
    }
    if (lines.length < maxLines && line) lines.push(line);
    const rendered = lines.slice(0, maxLines);
    rendered.forEach((item, idx) => {
      ctx.fillText(item, x, y + idx * lineHeight);
    });
  }

  function loadImageSafe(src) {
    return new Promise(resolve => {
      if (!src) {
        resolve(null);
        return;
      }
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }

  function normalizeShareTargetUrl(url) {
    const trimmed = (url || "").trim();
    if (!trimmed) return "";
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
  }

  async function loadShareQrImage(targetUrl, size) {
    if (!SHARE_IMAGE_CONFIG.qrEnabled || !targetUrl) return null;
    const apiBases = Array.isArray(SHARE_IMAGE_CONFIG.qrApiBases)
      ? SHARE_IMAGE_CONFIG.qrApiBases
      : [];
    for (const baseUrl of apiBases) {
      const apiBase = (baseUrl || "").replace(/\/+$/, "");
      if (!apiBase) continue;
      const qrUrl = apiBase.includes("quickchart.io")
        ? `${apiBase}?text=${encodeURIComponent(targetUrl)}&size=${size}&margin=2&format=png`
        : `${apiBase}/?size=${size}x${size}&format=png&margin=2&data=${encodeURIComponent(targetUrl)}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      try {
        const res = await fetch(qrUrl, { signal: controller.signal });
        if (!res.ok) continue;
        const blob = await res.blob();
        const img = await new Promise(resolve => {
          const objectUrl = URL.createObjectURL(blob);
          const image = new Image();
          image.onload = () => {
            URL.revokeObjectURL(objectUrl);
            resolve(image);
          };
          image.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            resolve(null);
          };
          image.src = objectUrl;
        });
        if (img) return img;
      } catch (_) {
        // try next provider
      } finally {
        clearTimeout(timeoutId);
      }
    }
    return null;
  }

  function drawRoundedImage(ctx, img, x, y, size, radius) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + size - radius, y);
    ctx.quadraticCurveTo(x + size, y, x + size, y + radius);
    ctx.lineTo(x + size, y + size - radius);
    ctx.quadraticCurveTo(x + size, y + size, x + size - radius, y + size);
    ctx.lineTo(x + radius, y + size);
    ctx.quadraticCurveTo(x, y + size, x, y + size - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, x, y, size, size);
    ctx.restore();
  }

  function drawBadgeFallback(ctx, label, x, y, size) {
    const grad = ctx.createLinearGradient(x, y, x + size, y + size);
    grad.addColorStop(0, "#0ea5e9");
    grad.addColorStop(1, "#38bdf8");
    ctx.fillStyle = grad;
    ctx.fillRect(x, y, size, size);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 58px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText((label || "W").charAt(0), x + size / 2, y + size / 2);
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
  }

  async function buildShareImageBlob(result) {
    const mascotImage = await loadImageSafe("images/mascot.png") || await loadImageSafe("images/mascot.svg");
    const primaryBadgePath = result.resultType === "cross"
      ? ((crossBadgeMap[result.resultName] && crossBadgeMap[result.resultName][0]) || "")
      : (badgeMap[result.resultName] || "");
    const secondaryBadgePath = result.resultType === "cross"
      ? ((crossBadgeMap[result.resultName] && crossBadgeMap[result.resultName][1]) || "")
      : "";
    const primaryBadgeImage = await loadImageSafe(primaryBadgePath) || await loadImageSafe("images/badges/default.svg");
    const secondaryBadgeImage = await loadImageSafe(secondaryBadgePath) || await loadImageSafe("images/badges/default.svg");
    const shareLandingUrl = normalizeShareTargetUrl(SHARE_IMAGE_CONFIG.qrTargetUrl);
    const qrImage = await loadShareQrImage(shareLandingUrl, 160);

    return new Promise((resolve, reject) => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = 1080;
        canvas.height = 1350;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("无法创建画布上下文");

        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        grad.addColorStop(0, "#e0f2fe");
        grad.addColorStop(0.55, "#f3e8ff");
        grad.addColorStop(1, "#fdf4ff");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "rgba(255,255,255,0.88)";
        ctx.fillRect(80, 90, canvas.width - 160, canvas.height - 180);

        const dimOrder = ["M", "D", "P", "S", "V"];
        const topDims = dimOrder
          .map(key => ({ key, value: result.scores[key] || 0 }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 2);

        ctx.fillStyle = "#0f172a";
        ctx.font = "bold 54px Inter, sans-serif";
        ctx.fillText("WYTI 未央专业选择测试", 140, 220);
        ctx.fillStyle = "#475569";
        ctx.font = "32px Inter, sans-serif";
        ctx.fillText("你的结局卡已生成", 140, 278);

        ctx.fillStyle = "#7dd3fc";
        ctx.font = "bold 64px Inter, sans-serif";
        drawMultilineText(ctx, result.resultName, 140, 410, 760, 78, 2);

        const badgeSize = 140;
        const badgeX = 820;
        const badgeY = 260;
        if (result.resultType === "cross") {
          ctx.save();
          ctx.translate(badgeX + 20, badgeY + 10);
          ctx.rotate(-0.08);
          if (primaryBadgeImage) {
            drawRoundedImage(ctx, primaryBadgeImage, -10, 0, badgeSize - 20, 18);
          } else {
            drawBadgeFallback(ctx, result.matchedDepts[0] || "交", -10, 0, badgeSize - 20);
          }
          ctx.restore();

          ctx.save();
          ctx.translate(badgeX + 90, badgeY + 40);
          ctx.rotate(0.08);
          if (secondaryBadgeImage) {
            drawRoundedImage(ctx, secondaryBadgeImage, 0, 0, badgeSize - 20, 18);
          } else {
            drawBadgeFallback(ctx, result.matchedDepts[1] || "叉", 0, 0, badgeSize - 20);
          }
          ctx.restore();
        } else if (primaryBadgeImage) {
          drawRoundedImage(ctx, primaryBadgeImage, badgeX, badgeY, badgeSize, 20);
        } else {
          drawBadgeFallback(ctx, result.resultName || "W", badgeX, badgeY, badgeSize);
        }

        ctx.fillStyle = "#334155";
        ctx.font = "30px Inter, sans-serif";
        drawMultilineText(ctx, getShareCardSubtitle(result, topDims), 140, 520, 760, 44, 2);

        ctx.fillStyle = "#0ea5e9";
        ctx.font = "bold 34px Inter, sans-serif";
        ctx.fillText("Top 能力标签", 140, 650);

        topDims.forEach((dim, idx) => {
          const y = 730 + idx * 100;
          const info = DIMENSION_LABELS[dim.key];
          ctx.fillStyle = "#1e293b";
          ctx.font = "600 32px Inter, sans-serif";
          ctx.fillText(`${info.icon} ${info.name}`, 140, y);
          ctx.fillStyle = "#6366f1";
          ctx.font = "bold 30px Inter, sans-serif";
          ctx.fillText(`${dim.value}/100`, 760, y);
        });

        ctx.fillStyle = "#334155";
        ctx.font = "28px Inter, sans-serif";
        drawMultilineText(ctx, `剧情一句话：${result.resultDesc}`, 140, 980, 800, 42, 4);

        if (mascotImage) {
          drawRoundedImage(ctx, mascotImage, 820, 1080, 140, 24);
        } else {
          const mx = 820;
          const my = 1080;
          const size = 140;
          const mGrad = ctx.createLinearGradient(mx, my, mx + size, my + size);
          mGrad.addColorStop(0, "#e0f2fe");
          mGrad.addColorStop(1, "#bae6fd");
          ctx.fillStyle = mGrad;
          ctx.fillRect(mx, my, size, size);
          ctx.fillStyle = "#0284c7";
          ctx.font = "bold 28px Inter, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("未小羊", mx + size / 2, my + size / 2);
          ctx.textAlign = "left";
          ctx.textBaseline = "alphabetic";
        }

        const qrX = 140;
        const qrY = 1080;
        const qrSize = 160;
        const qrTextX = 340;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(qrX - 8, qrY - 8, qrSize + 16, qrSize + 16);
        if (qrImage) {
          ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize);
        } else {
          ctx.fillStyle = "#e2e8f0";
          ctx.fillRect(qrX, qrY, qrSize, qrSize);
          ctx.fillStyle = "#475569";
          ctx.font = "600 20px Inter, sans-serif";
          ctx.fillText("二维码加载失败", qrX + 10, qrY + 78);
          ctx.font = "18px Inter, sans-serif";
          ctx.fillText("请直接访问域名", qrX + 16, qrY + 108);
        }
        ctx.fillStyle = "#0f172a";
        ctx.font = "600 28px Inter, sans-serif";
        ctx.fillText("扫码查看测试", qrTextX, 1135);
        ctx.fillStyle = "#64748b";
        ctx.font = "24px Inter, sans-serif";
        ctx.fillText(shareLandingUrl.replace(/^https?:\/\//i, ""), qrTextX, 1185);

        ctx.fillStyle = "#64748b";
        ctx.font = "24px Inter, sans-serif";
        ctx.fillText("生成于 WYTI 专业测试", 140, 1290);

        canvas.toBlob(blob => {
          if (!blob) {
            reject(new Error("生成图片失败"));
            return;
          }
          resolve(blob);
        }, "image/png");
      } catch (err) {
        reject(err);
      }
    });
  }

  window.generateShareImage = async function() {
    if (!lastResultData) return;
    const shareButton = document.getElementById("share-image-button");
    if (shareButton) {
      shareButton.disabled = true;
      shareButton.innerHTML = "<i class=\"fas fa-spinner fa-spin mr-2\"></i>生成中...";
    }
    try {
      const blob = await buildShareImageBlob(lastResultData);
      const filename = `WYTI-${Date.now()}.png`;
      const file = new File([blob], filename, { type: "image/png" });
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "WYTI 专业结局卡",
          text: `我的结局是：${lastResultData.resultName}`,
          files: [file]
        });
      } else {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        alert("分享图已生成并下载到本地！");
      }
    } catch (err) {
      console.error(err);
      alert("分享图生成失败，请稍后再试。");
    } finally {
      if (shareButton) {
        shareButton.disabled = false;
        shareButton.innerHTML = "<i class=\"fas fa-image mr-2\"></i>一键生成分享图";
      }
    }
  };

  window.shareResults = function() {
    if (!lastResultData) return;
    const text = `我在WYTI专业选择测试中获得了推荐：${lastResultData.resultName}！快来看看你适合什么专业吧~`;
    if (navigator.share) {
      navigator.share({ title: "WYTI专业选择测试", text: text, url: window.location.href });
    } else {
      navigator.clipboard.writeText(text + " " + window.location.href)
        .then(() => alert("结果链接已复制到剪贴板！"))
        .catch(() => alert(text));
    }
  };

  // ==================== DOM 初始化 ====================
  document.addEventListener("DOMContentLoaded", function() {
    try {
      resetTest();
      const startBtn = document.getElementById("start-button");
      const prevBtn = document.getElementById("prev-button");
      const nextBtn = document.getElementById("next-button");
      const restartBtn = document.getElementById("restart-button");
      const shareImageBtn = document.getElementById("share-image-button");
      const shareBtn = document.getElementById("share-button");

      if (startBtn) {
        startBtn.addEventListener("click", () => {
          switchPage("welcome-page", "question-page");
          window.showQuestion(0);
        });
      }
      if (prevBtn) prevBtn.addEventListener("click", window.showPreviousQuestion);
      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          if (userAnswers[currentQuestionIndex] === null) {
            const container = document.getElementById("options-container");
            if (container) {
              container.style.animation = "none";
              container.offsetHeight;
              container.style.animation = "shake 0.4s ease-in-out";
            }
            return;
          }
          if (window.showNextQuestion()) {
            switchPage("question-page", "result-page");
            window.showResult();
          }
        });
      }
      if (restartBtn) {
        restartBtn.addEventListener("click", () => {
          switchPage("result-page", "welcome-page");
          window.resetTest();
        });
      }
      if (shareImageBtn) shareImageBtn.addEventListener("click", window.generateShareImage);
      if (shareBtn) shareBtn.addEventListener("click", window.shareResults);

      Promise.resolve(refreshVisitorCounter(false)).catch(() => {
        setVisitorCounterText("您是正在探索此测试的未小羊");
      });
    } catch (err) {
      console.error("[WYTI Init] 初始化失败", err);
    }
  });

  const shakeStyle = document.createElement("style");
  shakeStyle.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-8px); }
      75% { transform: translateX(8px); }
    }`;
  document.head.appendChild(shakeStyle);

})();

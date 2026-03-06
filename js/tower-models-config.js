/**
 * 塔模型配置文件 - Tower Models Configuration
 * 包含：1个默认塔 + 70个国家塔 + 161个省份塔
 * 未来添加新塔只需在此文件中添加配置
 */

const TOWER_MODELS = {
  // ==========================================
  // 默认塔
  // ==========================================
  default: {
    id: 'default',
    name: '命运塔',
    nameEn: 'Tower of Fate',
    image: 'assets/towers/default-tower.png',
    color: '#FFD700',
    levels: 13,
    type: 'default',
    description: '神秘的命运之塔，传说能指引勇者的道路'
  },

  // ==========================================
  // 国家/城市塔 - 70个国家
  // ==========================================
  
  // 亚洲 (23个)
  china: {
    id: 'china',
    name: '东方明珠',
    nameEn: 'Oriental Pearl',
    image: 'assets/towers/china/oriental-pearl.png',
    color: '#FF6B6B',
    levels: 13,
    type: 'country',
    region: 'asia',
    description: '上海的标志性建筑，璀璨夺目'
  },
  japan: {
    id: 'japan',
    name: '东京塔',
    nameEn: 'Tokyo Tower',
    image: 'assets/towers/japan/tokyo-tower.png',
    color: '#FF6B9D',
    levels: 13,
    type: 'country',
    region: 'asia',
    description: '东京的象征，红白相间的钢铁巨塔'
  },
  'south-korea': {
    id: 'south-korea',
    name: 'N首尔塔',
    nameEn: 'N Seoul Tower',
    image: 'assets/towers/south-korea/n-seoul-tower.png',
    color: '#9B59B6',
    levels: 13,
    type: 'country',
    region: 'asia',
    description: '首尔南山上的守望者'
  },
  india: {
    id: 'india',
    name: '印度门',
    nameEn: 'India Gate',
    image: 'assets/towers/india/india-gate.png',
    color: '#FF8C42',
    levels: 13,
    type: 'country',
    region: 'asia',
    description: '新德里的战争纪念碑'
  },
  'united-arab-emirates': {
    id: 'united-arab-emirates',
    name: '哈利法塔',
    nameEn: 'Burj Khalifa',
    image: 'assets/towers/uae/burj-khalifa.png',
    color: '#1ABC9C',
    levels: 13,
    type: 'country',
    region: 'asia',
    description: '世界最高建筑，直插云霄'
  },
  thailand: {
    id: 'thailand',
    name: '黎明寺',
    nameEn: 'Wat Arun',
    image: 'assets/towers/thailand/wat-arun.png',
    color: '#3498DB',
    levels: 13,
    type: 'country',
    region: 'asia',
    description: '曼谷湄南河畔的璀璨明珠'
  },
  singapore: {
    id: 'singapore',
    name: '滨海湾金沙',
    nameEn: 'Marina Bay Sands',
    image: 'assets/towers/singapore/marina-bay.png',
    color: '#E74C3C',
    levels: 13,
    type: 'country',
    region: 'asia',
    description: '狮城天际线的标志'
  },
  malaysia: {
    id: 'malaysia',
    name: '双子塔',
    nameEn: 'Petronas Towers',
    image: 'assets/towers/malaysia/petronas-towers.png',
    color: '#F39C12',
    levels: 13,
    type: 'country',
    region: 'asia',
    description: '吉隆坡的双子巨人'
  },
  indonesia: {
    id: 'indonesia',
    name: '国家纪念塔',
    nameEn: 'Monas',
    image: 'assets/towers/indonesia/monas.png',
    color: '#E67E22',
    levels: 13,
    type: 'country',
    region: 'asia',
    description: '雅加达的独立象征'
  },
  vietnam: {
    id: 'vietnam',
    name: '还剑湖塔',
    nameEn: 'Turtle Tower',
    image: 'assets/towers/vietnam/turtle-tower.png',
    color: '#27AE60',
    levels: 13,
    type: 'country',
    region: 'asia',
    description: '河内还剑湖中的古老传说'
  },
  philippines: {
    id: 'philippines',
    name: '圣奥古斯丁教堂',
    nameEn: 'San Agustin Church',
    image: 'assets/towers/philippines/san-agustin.png',
    color: '#8E44AD',
    levels: 13,
    type: 'country',
    region: 'asia',
    description: '马尼拉的古老教堂'
  },
  myanmar: {
    id: 'myanmar',
    name: '仰光大金塔',
    nameEn: 'Shwedagon Pagoda',
    image: 'assets/towers/myanmar/shwedagon.png',
    color: '#D4AC0D',
    levels: 13,
    type: 'country',
    region: 'asia',
    description: '缅甸最神圣的佛塔'
  },
  cambodia: {
    id: 'cambodia',
    name: '吴哥窟',
    nameEn: 'Angkor Wat',
    image: 'assets/towers/cambodia/angkor-wat.png',
    color: '#C0392B',
    levels: 13,
    type: 'country',
    region: 'asia',
    description: '世界最大的宗教建筑群'
  },
  laos: {
    id: 'laos',
    name: '塔銮',
    nameEn: 'Pha That Luang',
    image: 'assets/towers/laos/pha-that-luang.png',
    color: '#F1C40F',
    levels: 13,
    type: 'country',
    region: 'asia',
    description: '万象的金色佛塔'
  },
  nepal: {
    id: 'nepal',
    name: '博达哈大佛塔',
    nameEn: 'Boudhanath',
    image: 'assets/towers/nepal/boudhanath.png',
    color: '#16A085',
    levels: 13,
    type: 'country',
    region: 'asia',
    description: '加德满都的佛眼守望'
  },
  bangladesh: {
    id: 'bangladesh',
    name: '国民议会大厦',
    nameEn: 'National Parliament',
    image: 'assets/towers/bangladesh/parliament.png',
    color: '#2980B9',
    levels: 13,
    type: 'country',
    region: 'asia',
    description: '达卡的地标建筑'
  },
  sriLanka: {
    id: 'sriLanka',
    name: '狮子岩',
    nameEn: 'Sigiriya',
    image: 'assets/towers/srilanka/sigiriya.png',
    color: '#E74C3C',
    levels: 13,
    type: 'country',
    region: 'asia',
    description: '空中宫殿的遗迹'
  },
  mongolia: {
    id: 'mongolia',
    name: '苏赫巴托尔广场',
    nameEn: 'Chinggis Square',
    image: 'assets/towers/mongolia/sukhbaatar.png',
    color: '#D35400',
    levels: 13,
    type: 'country',
    region: 'asia',
    description: '乌兰巴托的中心'
  },
  kazakhstan: {
    id: 'kazakhstan',
    name: '巴伊杰列克塔',
    nameEn: 'Bayterek',
    image: 'assets/towers/kazakhstan/bayterek.png',
    color: '#7F8C8D',
    levels: 13,
    type: 'country',
    region: 'asia',
    description: '阿斯塔纳的生命之树'
  },
  uzbekistan: {
    id: 'uzbekistan',
    name: '雷吉斯坦广场',
    nameEn: 'Registan',
    image: 'assets/towers/uzbekistan/registan.png',
    color: '#E67E22',
    levels: 13,
    type: 'country',
    region: 'asia',
    description: '撒马尔罕的伊斯兰建筑瑰宝'
  },
  turkmenistan: {
    id: 'turkmenistan',
    name: '中立门',
    nameEn: 'Arch of Neutrality',
    image: 'assets/towers/turkmenistan/neutrality-arch.png',
    color: '#F39C12',
    levels: 13,
    type: 'country',
    region: 'asia',
    description: '阿什哈巴德的独特地标'
  },
  afghanistan: {
    id: 'afghanistan',
    name: '喀布尔城堡',
    nameEn: 'Bala Hissar',
    image: 'assets/towers/afghanistan/bala-hissar.png',
    color: '#95A5A6',
    levels: 13,
    type: 'country',
    region: 'asia',
    description: '喀布尔的历史堡垒'
  },
  pakistan: {
    id: 'pakistan',
    name: '巴德夏希清真寺',
    nameEn: 'Badshahi Mosque',
    image: 'assets/towers/pakistan/badshahi.png',
    color: '#27AE60',
    levels: 13,
    type: 'country',
    region: 'asia',
    description: '拉合尔的莫卧儿杰作'
  },

  // 欧洲 (20个)
  france: {
    id: 'france',
    name: '埃菲尔铁塔',
    nameEn: 'Eiffel Tower',
    image: 'assets/towers/france/eiffel-tower.png',
    color: '#4ECDC4',
    levels: 13,
    type: 'country',
    region: 'europe',
    description: '巴黎的铁娘子'
  },
  'united-kingdom': {
    id: 'united-kingdom',
    name: '大本钟',
    nameEn: 'Big Ben',
    image: 'assets/towers/uk/big-ben.png',
    color: '#34495E',
    levels: 13,
    type: 'country',
    region: 'europe',
    description: '伦敦的时间守护者'
  },
  germany: {
    id: 'germany',
    name: '科隆大教堂',
    nameEn: 'Cologne Cathedral',
    image: 'assets/towers/germany/cologne-cathedral.png',
    color: '#7F8C8D',
    levels: 13,
    type: 'country',
    region: 'europe',
    description: '哥特式建筑的巅峰'
  },
  italy: {
    id: 'italy',
    name: '比萨斜塔',
    nameEn: 'Leaning Tower',
    image: 'assets/towers/italy/leaning-tower.png',
    color: '#E67E22',
    levels: 13,
    type: 'country',
    region: 'europe',
    description: '世界闻名的倾斜奇迹'
  },
  spain: {
    id: 'spain',
    name: '圣家堂',
    nameEn: 'Sagrada Familia',
    image: 'assets/towers/spain/sagrada-familia.png',
    color: '#E74C3C',
    levels: 13,
    type: 'country',
    region: 'europe',
    description: '高迪未完成的杰作'
  },
  russia: {
    id: 'russia',
    name: '红场塔楼',
    nameEn: 'Spasskaya Tower',
    image: 'assets/towers/russia/spasskaya-tower.png',
    color: '#C0392B',
    levels: 13,
    type: 'country',
    region: 'europe',
    description: '莫斯科红场的标志性塔楼'
  },
  netherlands: {
    id: 'netherlands',
    name: '阿姆斯特丹塔',
    nameEn: 'A\\'DAM Toren',
    image: 'assets/towers/netherlands/adam-toren.png',
    color: '#F39C12',
    levels: 13,
    type: 'country',
    region: 'europe',
    description: '阿姆斯特丹的现代地标'
  },
  switzerland: {
    id: 'switzerland',
    name: '马特洪峰',
    nameEn: 'Matterhorn',
    image: 'assets/towers/switzerland/matterhorn.png',
    color: '#95A5A6',
    levels: 13,
    type: 'country',
    region: 'europe',
    description: '阿尔卑斯山的骄傲'
  },
  sweden: {
    id: 'sweden',
    name: '斯德哥尔摩市政厅',
    nameEn: 'City Hall',
    image: 'assets/towers/sweden/city-hall.png',
    color: '#3498DB',
    levels: 13,
    type: 'country',
    region: 'europe',
    description: '诺贝尔奖颁奖地'
  },
  norway: {
    id: 'norway',
    name: '奥斯陆歌剧院',
    nameEn: 'Oslo Opera House',
    image: 'assets/towers/norway/opera-house.png',
    color: '#2C3E50',
    levels: 13,
    type: 'country',
    region: 'europe',
    description: '从峡湾升起的白色巨石'
  },
  denmark: {
    id: 'denmark',
    name: '小美人鱼',
    nameEn: 'Little Mermaid',
    image: 'assets/towers/denmark/little-mermaid.png',
    color: '#1ABC9C',
    levels: 13,
    type: 'country',
    region: 'europe',
    description: '哥本哈根的海滨象征'
  },
  finland: {
    id: 'finland',
    name: '赫尔辛基大教堂',
    nameEn: 'Helsinki Cathedral',
    image: 'assets/towers/finland/helsinki-cathedral.png',
    color: '#ECF0F1',
    levels: 13,
    type: 'country',
    region: 'europe',
    description: '白教堂的庄严'
  },
  poland: {
    id: 'poland',
    name: '科学文化宫',
    nameEn: 'Palace of Culture',
    image: 'assets/towers/poland/palace-culture.png',
    color: '#8E44AD',
    levels: 13,
    type: 'country',
    region: 'europe',
    description: '华沙的苏联式建筑'
  },
  austria: {
    id: 'austria',
    name: '圣史蒂芬大教堂',
    nameEn: 'St. Stephen\\'s',
    image: 'assets/towers/austria/st-stephen.png',
    color: '#E74C3C',
    levels: 13,
    type: 'country',
    region: 'europe',
    description: '维也纳的心脏'
  },
  belgium: {
    id: 'belgium',
    name: '原子球塔',
    nameEn: 'Atomium',
    image: 'assets/towers/belgium/atomium.png',
    color: '#3498DB',
    levels: 13,
    type: 'country',
    region: 'europe',
    description: '布鲁塞尔的铁晶体'
  },
  portugal: {
    id: 'portugal',
    name: '贝伦塔',
    nameEn: 'Belem Tower',
    image: 'assets/towers/portugal/belem-tower.png',
    color: '#D35400',
    levels: 13,
    type: 'country',
    region: 'europe',
    description: '里斯本的航海见证'
  },
  greece: {
    id: 'greece',
    name: '帕特农神庙',
    nameEn: 'Parthenon',
    image: 'assets/towers/greece/parthenon.png',
    color: '#F5CBA7',
    levels: 13,
    type: 'country',
    region: 'europe',
    description: '雅典卫城的古希腊荣耀'
  },
  czech: {
    id: 'czech',
    name: '布拉格天文钟',
    nameEn: 'Prague Astronomical Clock',
    image: 'assets/towers/czech/prague-clock.png',
    color: '#2ECC71',
    levels: 13,
    type: 'country',
    region: 'europe',
    description: '中世纪的天文奇迹'
  },
  hungary: {
    id: 'hungary',
    name: '国会大厦',
    nameEn: 'Parliament Building',
    image: 'assets/towers/hungary/parliament.png',
    color: '#E74C3C',
    levels: 13,
    type: 'country',
    region: 'europe',
    description: '布达佩斯多瑙河畔的辉煌'
  },
  ireland: {
    id: 'ireland',
    name: '都柏林城堡',
    nameEn: 'Dublin Castle',
    image: 'assets/towers/ireland/dublin-castle.png',
    color: '#27AE60',
    levels: 13,
    type: 'country',
    region: 'europe',
    description: '爱尔兰历史的见证者'
  },

  // 北美洲 (8个)
  'united-states': {
    id: 'united-states',
    name: '自由女神像',
    nameEn: 'Statue of Liberty',
    image: 'assets/towers/usa/statue-liberty.png',
    color: '#2980B9',
    levels: 13,
    type: 'country',
    region: 'north-america',
    description: '纽约的自由象征'
  },
  canada: {
    id: 'canada',
    name: '加拿大国家电视塔',
    nameEn: 'CN Tower',
    image: 'assets/towers/canada/cn-tower.png',
    color: '#E74C3C',
    levels: 13,
    type: 'country',
    region: 'north-america',
    description: '多伦多的天空之针'
  },
  mexico: {
    id: 'mexico',
    name: '太阳金字塔',
    nameEn: 'Pyramid of the Sun',
    image: 'assets/towers/mexico/sun-pyramid.png',
    color: '#E67E22',
    levels: 13,
    type: 'country',
    region: 'north-america',
    description: '特奥蒂瓦坎的古代奇迹'
  },
  cuba: {
    id: 'cuba',
    name: '哈瓦那大教堂',
    nameEn: 'Havana Cathedral',
    image: 'assets/towers/cuba/havana-cathedral.png',
    color: '#F39C12',
    levels: 13,
    type: 'country',
    region: 'north-america',
    description: '古巴的巴洛克瑰宝'
  },
  'costa-rica': {
    id: 'costa-rica',
    name: '阿雷纳尔火山',
    nameEn: 'Arenal Volcano',
    image: 'assets/towers/costa-rica/arenal-volcano.png',
    color: '#C0392B',
    levels: 13,
    type: 'country',
    region: 'north-america',
    description: '哥斯达黎加的活火山'
  },
  panama: {
    id: 'panama',
    name: '巴拿马运河',
    nameEn: 'Panama Canal',
    image: 'assets/towers/panama/panama-canal.png',
    color: '#3498DB',
    levels: 13,
    type: 'country',
    region: 'north-america',
    description: '世界工程奇迹'
  },
  guatemala: {
    id: 'guatemala',
    name: '蒂卡尔神庙',
    nameEn: 'Tikal Temple',
    image: 'assets/towers/guatemala/tikal-temple.png',
    color: '#27AE60',
    levels: 13,
    type: 'country',
    region: 'north-america',
    description: '玛雅文明的丛林王城'
  },
  honduras: {
    id: 'honduras',
    name: '科潘遗址',
    nameEn: 'Copan Ruins',
    image: 'assets/towers/honduras/copan.png',
    color: '#8E44AD',
    levels: 13,
    type: 'country',
    region: 'north-america',
    description: '玛雅象形文字之都'
  },

  // 南美洲 (8个)
  brazil: {
    id: 'brazil',
    name: '基督救世主',
    nameEn: 'Christ the Redeemer',
    image: 'assets/towers/brazil/christ-redeemer.png',
    color: '#27AE60',
    levels: 13,
    type: 'country',
    region: 'south-america',
    description: '里约热内卢的拥抱'
  },
  argentina: {
    id: 'argentina',
    name: '方尖碑',
    nameEn: 'Obelisk',
    image: 'assets/towers/argentina/obelisk.png',
    color: '#3498DB',
    levels: 13,
    type: 'country',
    region: 'south-america',
    description: '布宜诺斯艾利斯的中心'
  },
  peru: {
    id: 'peru',
    name: '马丘比丘',
    nameEn: 'Machu Picchu',
    image: 'assets/towers/peru/machu-picchu.png',
    color: '#16A085',
    levels: 13,
    type: 'country',
    region: 'south-america',
    description: '印加帝国的天空之城'
  },
  chile: {
    id: 'chile',
    name: '圣克里斯托瓦尔山',
    nameEn: 'San Cristobal',
    image: 'assets/towers/chile/san-cristobal.png',
    color: '#F39C12',
    levels: 13,
    type: 'country',
    region: 'south-america',
    description: '圣地亚哥的圣母像'
  },
  colombia: {
    id: 'colombia',
    name: '盐教堂',
    nameEn: 'Salt Cathedral',
    image: 'assets/towers/colombia/salt-cathedral.png',
    color: '#9B59B6',
    levels: 13,
    type: 'country',
    region: 'south-america',
    description: '地下盐矿中的教堂'
  },
  ecuador: {
    id: 'ecuador',
    name: '基多老城',
    nameEn: 'Quito Old Town',
    image: 'assets/towers/ecuador/quito-oldtown.png',
    color: '#E74C3C',
    levels: 13,
    type: 'country',
    region: 'south-america',
    description: '世界最高首都'
  },
  bolivia: {
    id: 'bolivia',
    name: '乌尤尼盐湖',
    nameEn: 'Salar de Uyuni',
    image: 'assets/towers/bolivia/salar-uyuni.png',
    color: '#AED6F1',
    levels: 13,
    type: 'country',
    region: 'south-america',
    description: '世界最大的盐沼'
  },
  venezuela: {
    id: 'venezuela',
    name: '安赫尔瀑布',
    nameEn: 'Angel Falls',
    image: 'assets/towers/venezuela/angel-falls.png',
    color: '#5DADE2',
    levels: 13,
    type: 'country',
    region: 'south-america',
    description: '世界最高瀑布'
  },

  // 非洲 (8个)
  egypt: {
    id: 'egypt',
    name: '吉萨金字塔',
    nameEn: 'Giza Pyramids',
    image: 'assets/towers/egypt/giza-pyramids.png',
    color: '#D4AC0D',
    levels: 13,
    type: 'country',
    region: 'africa',
    description: '法老的永恒陵墓'
  },
  'south-africa': {
    id: 'south-africa',
    name: '桌山',
    nameEn: 'Table Mountain',
    image: 'assets/towers/south-africa/table-mountain.png',
    color: '#7F8C8D',
    levels: 13,
    type: 'country',
    region: 'africa',
    description: '开普敦的平顶神山'
  },
  morocco: {
    id: 'morocco',
    name: '哈桑二世清真寺',
    nameEn: 'Hassan II Mosque',
    image: 'assets/towers/morocco/hassan-mosque.png',
    color: '#1ABC9C',
    levels: 13,
    type: 'country',
    region: 'africa',
    description: '卡萨布兰卡的海洋清真寺'
  },
  kenya: {
    id: 'kenya',
    name: '乞力马扎罗山',
    nameEn: 'Kilimanjaro',
    image: 'assets/towers/kenya/kilimanjaro.png',
    color: '#95A5A6',
    levels: 13,
    type: 'country',
    region: 'africa',
    description: '非洲之巅的雪冠'
  },
  nigeria: {
    id: 'nigeria',
    name: '祖玛岩',
    nameEn: 'Zuma Rock',
    image: 'assets/towers/nigeria/zuma-rock.png',
    color: '#8E44AD',
    levels: 13,
    type: 'country',
    region: 'africa',
    description: '阿布贾的岩石面孔'
  },
  ethiopia: {
    id: 'ethiopia',
    name: '拉利贝拉岩石教堂',
    nameEn: 'Lalibela Churches',
    image: 'assets/towers/ethiopia/lalibela.png',
    color: '#E67E22',
    levels: 13,
    type: 'country',
    region: 'africa',
    description: '地下凿出的奇迹'
  },
  tanzania: {
    id: 'tanzania',
    name: '塞伦盖蒂',
    nameEn: 'Serengeti',
    image: 'assets/towers/tanzania/serengeti.png',
    color: '#F39C12',
    levels: 13,
    type: 'country',
    region: 'africa',
    description: '野生动物的迁徙天堂'
  },
  ghana: {
    id: 'ghana',
    name: '独立拱门',
    nameEn: 'Independence Arch',
    image: 'assets/towers/ghana/independence-arch.png',
    color: '#E74C3C',
    levels: 13,
    type: 'country',
    region: 'africa',
    description: '阿克拉的自由象征'
  },

  // 大洋洲 (3个)
  australia: {
    id: 'australia',
    name: '悉尼歌剧院',
    nameEn: 'Sydney Opera House',
    image: 'assets/towers/australia/sydney-opera.png',
    color: '#3498DB',
    levels: 13,
    type: 'country',
    region: 'oceania',
    description: '悉尼港的白色风帆'
  },
  'new-zealand': {
    id: 'new-zealand',
    name: '天空塔',
    nameEn: 'Sky Tower',
    image: 'assets/towers/new-zealand/sky-tower.png',
    color: '#9B59B6',
    levels: 13,
    type: 'country',
    region: 'oceania',
    description: '奥克兰的天际线'
  },
  fiji: {
    id: 'fiji',
    name: '苏瓦大教堂',
    nameEn: 'Suva Cathedral',
    image: 'assets/towers/fiji/suva-cathedral.png',
    color: '#1ABC9C',
    levels: 13,
    type: 'country',
    region: 'oceania',
    description: '太平洋岛屿的明珠'
  },

  // ==========================================
  // 省份塔 - 161个省份（部分示例，可按需扩展）
  // ==========================================
  
  // 中国省份 (34个)
  'china-beijing': {
    id: 'china-beijing',
    name: '故宫',
    nameEn: 'Forbidden City',
    image: 'assets/towers/states/china/beijing-forbidden.png',
    color: '#C0392B',
    levels: 13,
    type: 'state',
    parent: 'china',
    region: 'asia',
    description: '紫禁城的皇家威严'
  },
  'china-shanghai': {
    id: 'china-shanghai',
    name: '上海中心大厦',
    nameEn: 'Shanghai Tower',
    image: 'assets/towers/states/china/shanghai-tower.png',
    color: '#3498DB',
    levels: 13,
    type: 'state',
    parent: 'china',
    region: 'asia',
    description: '中国最高建筑'
  },
  'china-guangdong': {
    id: 'china-guangdong',
    name: '广州塔',
    nameEn: 'Canton Tower',
    image: 'assets/towers/states/china/guangzhou-tower.png',
    color: '#E74C3C',
    levels: 13,
    type: 'state',
    parent: 'china',
    region: 'asia',
    description: '小蛮腰的婀娜身姿'
  },
  'china-sichuan': {
    id: 'china-sichuan',
    name: '乐山大佛',
    nameEn: 'Leshan Giant Buddha',
    image: 'assets/towers/states/china/leshan-buddha.png',
    color: '#27AE60',
    levels: 13,
    type: 'state',
    parent: 'china',
    region: 'asia',
    description: '世界最大的石刻佛像'
  },
  'china-shaanxi': {
    id: 'china-shaanxi',
    name: '兵马俑',
    nameEn: 'Terracotta Army',
    image: 'assets/towers/states/china/terracotta-army.png',
    color: '#7F8C8D',
    levels: 13,
    type: 'state',
    parent: 'china',
    region: 'asia',
    description: '秦始皇的地下军团'
  },
  'china-zhejiang': {
    id: 'china-zhejiang',
    name: '雷峰塔',
    nameEn: 'Leifeng Pagoda',
    image: 'assets/towers/states/china/leifeng-pagoda.png',
    color: '#F39C12',
    levels: 13,
    type: 'state',
    parent: 'china',
    region: 'asia',
    description: '西湖边的千年传说'
  },
  'china-jiangsu': {
    id: 'china-jiangsu',
    name: '中山陵',
    nameEn: 'Sun Yat-sen Mausoleum',
    image: 'assets/towers/states/china/zhongshan-ling.png',
    color: '#16A085',
    levels: 13,
    type: 'state',
    parent: 'china',
    region: 'asia',
    description: '紫金山的国父陵寝'
  },
  'china-shandong': {
    id: 'china-shandong',
    name: '泰山',
    nameEn: 'Mount Tai',
    image: 'assets/towers/states/china/mount-tai.png',
    color: '#E67E22',
    levels: 13,
    type: 'state',
    parent: 'china',
    region: 'asia',
    description: '五岳独尊'
  },
  'china-henan': {
    id: 'china-henan',
    name: '少林寺',
    nameEn: 'Shaolin Temple',
    image: 'assets/towers/states/china/shaolin-temple.png',
    color: '#D35400',
    levels: 13,
    type: 'state',
    parent: 'china',
    region: 'asia',
    description: '天下武功出少林'
  },
  'china-hunan': {
    id: 'china-hunan',
    name: '岳阳楼',
    nameEn: 'Yueyang Tower',
    image: 'assets/towers/states/china/yueyang-tower.png',
    color: '#2980B9',
    levels: 13,
    type: 'state',
    parent: 'china',
    region: 'asia',
    description: '洞庭湖畔的江南名楼'
  },
  'china-hubei': {
    id: 'china-hubei',
    name: '黄鹤楼',
    nameEn: 'Yellow Crane Tower',
    image: 'assets/towers/states/china/yellow-crane.png',
    color: '#F1C40F',
    levels: 13,
    type: 'state',
    parent: 'china',
    region: 'asia',
    description: '天下江山第一楼'
  },
  'china-fujian': {
    id: 'china-fujian',
    name: '武夷山',
    nameEn: 'Wuyi Mountains',
    image: 'assets/towers/states/china/wuyi-mountain.png',
    color: '#27AE60',
    levels: 13,
    type: 'state',
    parent: 'china',
    region: 'asia',
    description: '丹霞地貌的世界遗产'
  },
  'china-anhui': {
    id: 'china-anhui',
    name: '黄山',
    nameEn: 'Yellow Mountain',
    image: 'assets/towers/states/china/yellow-mountain.png',
    color: '#95A5A6',
    levels: 13,
    type: 'state',
    parent: 'china',
    region: 'asia',
    description: '天下第一奇山'
  },
  'china-jiangxi': {
    id: 'china-jiangxi',
    name: '滕王阁',
    nameEn: 'Tengwang Pavilion',
    image: 'assets/towers/states/china/tengwang-pavilion.png',
    color: '#8E44AD',
    levels: 13,
    type: 'state',
    parent: 'china',
    region: 'asia',
    description: '落霞与孤鹜齐飞'
  },
  'china-yunnan': {
    id: 'china-yunnan',
    name: '大理三塔',
    nameEn: 'Three Pagodas',
    image: 'assets/towers/states/china/three-pagodas.png',
    color: '#E74C3C',
    levels: 13,
    type: 'state',
    parent: 'china',
    region: 'asia',
    description: '苍山洱海间的千年古塔'
  },
  'china-guizhou': {
    id: 'china-guizhou',
    name: '黄果树瀑布',
    nameEn: 'Huangguoshu Falls',
    image: 'assets/towers/states/china/huangguoshu.png',
    color: '#3498DB',
    levels: 13,
    type: 'state',
    parent: 'china',
    region: 'asia',
    description: '亚洲第一大瀑布'
  },
  'china-sichuan': {
    id: 'china-sichuan',
    name: '都江堰',
    nameEn: 'Dujiangyan',
    image: 'assets/towers/states/china/dujiangyan.png',
    color: '#16A085',
    levels: 13,
    type: 'state',
    parent: 'china',
    region: 'asia',
    description: '世界最古老的水利工程'
  },
  'china-hebei': {
    id: 'china-hebei',
    name: '承德避暑山庄',
    nameEn: 'Chengde Mountain Resort',
    image: 'assets/towers/states/china/chengde-resort.png',
    color: '#27AE60',
    levels: 13,
    type: 'state',
    parent: 'china',
    region: 'asia',
    description: '皇家园林的典范'
  },
  'china-shanxi': {
    id: 'china-shanxi',
    name: '云冈石窟',
    nameEn: 'Yungang Grottoes',
    image: 'assets/towers/states/china/yungang-grottoes.png',
    color: '#7F8C8D',
    levels: 13,
    type: 'state',
    parent: 'china',
    region: 'asia',
    description: '北魏佛教艺术宝库'
  },
  'china-liaoning': {
    id: 'china-liaoning',
    name: '沈阳故宫',
    nameEn: 'Shenyang Palace',
    image: 'assets/towers/states/china/shenyang-palace.png',
    color: '#C0392B',
    levels: 13,
    type: 'state',
    parent: 'china',
    region: 'asia',
    description: '清朝入关前的皇宫'
  },
  'china-jilin': {
    id: 'china-jilin',
    name: '长白山天池',
    nameEn: 'Heaven Lake',
    image: 'assets/towers/states/china/heaven-lake.png',
    color: '#AED6F1',
    levels: 13,
    type: 'state',
    parent: 'china',
    region: 'asia',
    description: '东北第一神山圣水'
  },
  'china-heilongjiang': {
    id: 'china-heilongjiang',
    name: '冰雪大世界',
    nameEn: 'Ice & Snow World',
    image: 'assets/towers/states/china/ice-world.png',
    color: '#AED6F1',
    levels: 13,
    type: 'state',
    parent: 'china',
    region: 'asia',
    description: '哈尔滨的冰雪童话'
  },
  'china-gansu': {
    id: 'china-gansu',
    name: '莫高窟',
    nameEn: 'Mogao Caves',
    image: 'assets/towers/states/china/mogao-caves.png',
    color: '#D4AC0D',
    levels: 13,
    type: 'state',
    parent: 'china',
    region: 'asia',
    description: '沙漠中的艺术殿堂'
  },
  'china-qinghai': {
    id: 'china-qinghai',
    name: '青海湖',
    nameEn: 'Qinghai Lake',
    image: 'assets/towers/states/china/qinghai-lake.png',
    color: '#3498DB',
    levels: 13,
    type: 'state',
    parent: 'china',
    region: 'asia',
    description: '中国最大的内陆湖'
  },
  'china-taiwan': {
    id: 'china-taiwan',
    name: '台北101',
    nameEn: 'Taipei 101',
    image: 'assets/towers/states/china/taipei101.png',
    color: '#2ECC71',
    levels: 13,
    type: 'state',
    parent: 'china',
    region: 'asia',
    description: '曾经的世界最高楼'
  },
  'china-neimenggu': {
    id: 'china-neimenggu',
    name: '成吉思汗陵',
    nameEn: 'Genghis Khan Mausoleum',
    image: 'assets/towers/states/china/genghis-mausoleum.png',
    color: '#F39C12',
    levels: 13,
    type: 'state',
    parent: 'china',
    region: 'asia',
    description: '一代天骄的永恒安息'
  },
  'china-xinjiang': {
    id: 'china-xinjiang',
    name: '天山天池',
    nameEn: 'Tianshan Tianchi',
    image: 'assets/towers/states/china/tianshan-tianchi.png',
    color: '#1ABC9C',
    levels: 13,
    type: 'state',
    parent: 'china',
    region: 'asia',
    description: '天山明珠'
  },
  'china-xizang': {
    id: 'china-xizang',
    name: '布达拉宫',
    nameEn: 'Potala Palace',
    image: 'assets/towers/states/china/potala-palace.png',
    color: '#FFFFFF',
    levels: 13,
    type: 'state',
    parent: 'china',
    region: 'asia',
    description: '世界屋脊上的圣殿'
  },
  'china-ningxia': {
    id: 'china-ningxia',
    name: '西夏王陵',
    nameEn: 'Western Xia Tombs',
    image: 'assets/towers/states/china/western-xia-tombs.png',
    color: '#95A5A6',
    levels: 13,
    type: 'state',
    parent: 'china',
    region: 'asia',
    description: '东方金字塔'
  },
  'china-guangxi': {
    id: 'china-guangxi',
    name: '桂林山水',
    nameEn: 'Guilin Scenery',
    image: 'assets/towers/states/china/guilin.png',
    color: '#27AE60',
    levels: 13,
    type: 'state',
    parent: 'china',
    region: 'asia',
    description: '甲天下的山水'
  },
  'china-hainan': {
    id: 'china-hainan',
    name: '天涯海角',
    nameEn: 'Tianya Haijiao',
    image: 'assets/towers/states/china/tianya-haijiao.png',
    color: '#3498DB',
    levels: 13,
    type: 'state',
    parent: 'china',
    region: 'asia',
    description: '天之涯，海之角'
  },
  'china-tianjin': {
    id: 'china-tianjin',
    name: '天津之眼',
    nameEn: 'Tianjin Eye',
    image: 'assets/towers/states/china/tianjin-eye.png',
    color: '#E74C3C',
    levels: 13,
    type: 'state',
    parent: 'china',
    region: 'asia',
    description: '桥上摩天轮'
  },
  'china-chongqing': {
    id: 'china-chongqing',
    name: '洪崖洞',
    nameEn: 'Hongya Cave',
    image: 'assets/towers/states/china/hongya-cave.png',
    color: '#F39C12',
    levels: 13,
    type: 'state',
    parent: 'china',
    region: 'asia',
    description: '千与千寻的现实版'
  },
  'china-hongkong': {
    id: 'china-hongkong',
    name: '维多利亚港',
    nameEn: 'Victoria Harbour',
    image: 'assets/towers/states/china/victoria-harbour.png',
    color: '#9B59B6',
    levels: 13,
    type: 'state',
    parent: 'china',
    region: 'asia',
    description: '东方之珠'
  },
  'china-macau': {
    id: 'china-macau',
    name: '大三巴牌坊',
    nameEn: 'Ruins of St. Paul',
    image: 'assets/towers/states/china/ruins-st-paul.png',
    color: '#E67E22',
    levels: 13,
    type: 'state',
    parent: 'china',
    region: 'asia',
    description: '东西方交融的见证'
  },

  // 美国州份 (50个) - 示例几个
  'usa-california': {
    id: 'usa-california',
    name: '金门大桥',
    nameEn: 'Golden Gate Bridge',
    image: 'assets/towers/states/usa/california-golden-gate.png',
    color: '#C0392B',
    levels: 13,
    type: 'state',
    parent: 'united-states',
    region: 'north-america',
    description: '旧金山的橙色奇迹'
  },
  'usa-new-york': {
    id: 'usa-new-york',
    name: '帝国大厦',
    nameEn: 'Empire State Building',
    image: 'assets/towers/states/usa/ny-empire-state.png',
    color: '#7F8C8D',
    levels: 13,
    type: 'state',
    parent: 'united-states',
    region: 'north-america',
    description: '纽约的天空之王'
  },
  'usa-texas': {
    id: 'usa-texas',
    name: '阿拉莫',
    nameEn: 'The Alamo',
    image: 'assets/towers/states/usa/texas-alamo.png',
    color: '#8E44AD',
    levels: 13,
    type: 'state',
    parent: 'united-states',
    region: 'north-america',
    description: '孤星州的勇气象征'
  },
  'usa-florida': {
    id: 'usa-florida',
    name: '迪士尼城堡',
    nameEn: 'Disney Castle',
    image: 'assets/towers/states/usa/florida-disney.png',
    color: '#E74C3C',
    levels: 13,
    type: 'state',
    parent: 'united-states',
    region: 'north-america',
    description: '梦幻王国'
  },
  'usa-nevada': {
    id: 'usa-nevada',
    name: '欢迎来拉斯维加斯',
    nameEn: 'Welcome to Vegas',
    image: 'assets/towers/states/usa/vegas-sign.png',
    color: '#F39C12',
    levels: 13,
    type: 'state',
    parent: 'united-states',
    region: 'north-america',
    description: '不夜城的霓虹'
  },

  // 日本都道府县 (47个) - 示例几个
  'japan-tokyo': {
    id: 'japan-tokyo',
    name: '晴空塔',
    nameEn: 'Skytree',
    image: 'assets/towers/states/japan/tokyo-skytree.png',
    color: '#3498DB',
    levels: 13,
    type: 'state',
    parent: 'japan',
    region: 'asia',
    description: '世界最高的塔'
  },
  'japan-kyoto': {
    id: 'japan-kyoto',
    name: '金阁寺',
    nameEn: 'Kinkaku-ji',
    image: 'assets/towers/states/japan/kyoto-kinkakuji.png',
    color: '#F1C40F',
    levels: 13,
    type: 'state',
    parent: 'japan',
    region: 'asia',
    description: '镜湖池畔的金色殿堂'
  },
  'japan-osaka': {
    id: 'japan-osaka',
    name: '大阪城',
    nameEn: 'Osaka Castle',
    image: 'assets/towers/states/japan/osaka-castle.png',
    color: '#27AE60',
    levels: 13,
    type: 'state',
    parent: 'japan',
    region: 'asia',
    description: '天下一统的见证'
  },

  // 英国地区 (4个) - 示例
  'uk-england': {
    id: 'uk-england',
    name: '伦敦眼',
    nameEn: 'London Eye',
    image: 'assets/towers/states/uk/england-london-eye.png',
    color: '#3498DB',
    levels: 13,
    type: 'state',
    parent: 'united-kingdom',
    region: 'europe',
    description: '泰晤士河畔的巨轮'
  },
  'uk-scotland': {
    id: 'uk-scotland',
    name: '爱丁堡城堡',
    nameEn: 'Edinburgh Castle',
    image: 'assets/towers/states/uk/scotland-edinburgh.png',
    color: '#7F8C8D',
    levels: 13,
    type: 'state',
    parent: 'united-kingdom',
    region: 'europe',
    description: '苏格兰王权的象征'
  },

  // 德国联邦州 (16个) - 示例
  'germany-bavaria': {
    id: 'germany-bavaria',
    name: '新天鹅堡',
    nameEn: 'Neuschwanstein',
    image: 'assets/towers/states/germany/bavaria-neuschwanstein.png',
    color: '#95A5A6',
    levels: 13,
    type: 'state',
    parent: 'germany',
    region: 'europe',
    description: '童话国王的梦幻城堡'
  },
  'germany-berlin': {
    id: 'germany-berlin',
    name: '勃兰登堡门',
    nameEn: 'Brandenburg Gate',
    image: 'assets/towers/states/germany/berlin-gate.png',
    color: '#F39C12',
    levels: 13,
    type: 'state',
    parent: 'germany',
    region: 'europe',
    description: '德国统一的象征'
  },

  // 法国大区 (13个) - 示例
  'france-ile-de-france': {
    id: 'france-ile-de-france',
    name: '卢浮宫',
    nameEn: 'Louvre',
    image: 'assets/towers/states/france/ile-louvre.png',
    color: '#E74C3C',
    levels: 13,
    type: 'state',
    parent: 'france',
    region: 'europe',
    description: '世界最大的艺术博物馆'
  },
  'france-provence': {
    id: 'france-provence',
    name: '圣米歇尔山',
    nameEn: 'Mont Saint-Michel',
    image: 'assets/towers/states/france/provence-mont.png',
    color: '#7F8C8D',
    levels: 13,
    type: 'state',
    parent: 'france',
    region: 'europe',
    description: '潮汐中的修道院'
  },

  // 印度邦 (28个) - 示例
  'india-delhi': {
    id: 'india-delhi',
    name: '红堡',
    nameEn: 'Red Fort',
    image: 'assets/towers/states/india/delhi-red-fort.png',
    color: '#C0392B',
    levels: 13,
    type: 'state',
    parent: 'india',
    region: 'asia',
    description: '莫卧儿帝国的红色堡垒'
  },
  'india-maharashtra': {
    id: 'india-maharashtra',
    name: '泰姬陵',
    nameEn: 'Taj Mahal',
    image: 'assets/towers/states/india/maharashtra-taj.png',
    color: '#ECF0F1',
    levels: 13,
    type: 'state',
    parent: 'india',
    region: 'asia',
    description: '永恒的爱之象征'
  },

  // 俄罗斯联邦主体 (85个) - 示例
  'russia-moscow': {
    id: 'russia-moscow',
    name: '瓦西里升天教堂',
    nameEn: 'St. Basil\\'s',
    image: 'assets/towers/states/russia/moscow-basil.png',
    color: '#E74C3C',
    levels: 13,
    type: 'state',
    parent: 'russia',
    region: 'europe',
    description: '彩色洋葱顶的童话'
  },
  'russia-st-petersburg': {
    id: 'russia-st-petersburg',
    name: '冬宫',
    nameEn: 'Winter Palace',
    image: 'assets/towers/states/russia/st-petersburg-winter.png',
    color: '#3498DB',
    levels: 13,
    type: 'state',
    parent: 'russia',
    region: 'europe',
    description: '沙皇的奢华宫殿'
  },

  // 巴西州 (26个) - 示例
  'brazil-rio': {
    id: 'brazil-rio',
    name: '糖面包山',
    nameEn: 'Sugarloaf Mountain',
    image: 'assets/towers/states/brazil/rio-sugarloaf.png',
    color: '#27AE60',
    levels: 13,
    type: 'state',
    parent: 'brazil',
    region: 'south-america',
    description: '里约的面包山'
  },
  'brazil-sao-paulo': {
    id: 'brazil-sao-paulo',
    name: '圣保罗大教堂',
    nameEn: 'Sao Paulo Cathedral',
    image: 'assets/towers/states/brazil/saopaulo-cathedral.png',
    color: '#7F8C8D',
    levels: 13,
    type: 'state',
    parent: 'brazil',
    region: 'south-america',
    description: '新哥特式建筑杰作'
  },

  // 澳大利亚州 (6个) - 示例
  'australia-victoria': {
    id: 'australia-victoria',
    name: '弗林德斯车站',
    nameEn: 'Flinders Station',
    image: 'assets/towers/states/australia/victoria-flinders.png',
    color: '#F1C40F',
    levels: 13,
    type: 'state',
    parent: 'australia',
    region: 'oceania',
    description: '墨尔本的黄色地标'
  },
  'australia-queensland': {
    id: 'australia-queensland',
    name: '大堡礁',
    nameEn: 'Great Barrier Reef',
    image: 'assets/towers/states/australia/queensland-reef.png',
    color: '#1ABC9C',
    levels: 13,
    type: 'state',
    parent: 'australia',
    region: 'oceania',
    description: '海底的彩虹世界'
  },

  // 加拿大省 (10个) - 示例
  'canada-ontario': {
    id: 'canada-ontario',
    name: '尼亚加拉瀑布',
    nameEn: 'Niagara Falls',
    image: 'assets/towers/states/canada/ontario-niagara.png',
    color: '#3498DB',
    levels: 13,
    type: 'state',
    parent: 'canada',
    region: 'north-america',
    description: '世界最壮观的瀑布'
  },
  'canada-quebec': {
    id: 'canada-quebec',
    name: '芳堤娜城堡',
    nameEn: 'Chateau Frontenac',
    image: 'assets/towers/states/canada/quebec-frontenac.png',
    color: '#8E44AD',
    levels: 13,
    type: 'state',
    parent: 'canada',
    region: 'north-america',
    description: '魁北克城的童话城堡'
  },

  // 意大利大区 (20个) - 示例
  'italy-rome': {
    id: 'italy-rome',
    name: '斗兽场',
    nameEn: 'Colosseum',
    image: 'assets/towers/states/italy/rome-colosseum.png',
    color: '#D35400',
    levels: 13,
    type: 'state',
    parent: 'italy',
    region: 'europe',
    description: '古罗马的荣耀遗迹'
  },
  'italy-venice': {
    id: 'italy-venice',
    name: '圣马可钟楼',
    nameEn: 'St. Mark\\'s Campanile',
    image: 'assets/towers/states/italy/venice-campanile.png',
    color: '#F1C40F',
    levels: 13,
    type: 'state',
    parent: 'italy',
    region: 'europe',
    description: '水城的高塔守望'
  }

  // 备注：更多省份可按相同格式添加
  // 总结构支持 70国家 + 161省份 = 231个塔模型
};

// 导出配置（支持ES6模块和CommonJS）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TOWER_MODELS };
}

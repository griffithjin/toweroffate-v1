// world-tournaments-data.js - 全球196国家锦标赛数据（完整版）

// 全世界196个国家完整列表
const WORLD_COUNTRIES = [
    // 亚洲 (49国)
    { code: 'CN', key: 'china', name: '中国', nameEn: 'China', continent: 'Asia', population: 1411778724, gdp: 17734062645371, difficulty: 'hard' },
    { code: 'IN', key: 'india', name: '印度', nameEn: 'India', continent: 'Asia', population: 1380004385, gdp: 3173396758375, difficulty: 'hard' },
    { code: 'ID', key: 'indonesia', name: '印度尼西亚', nameEn: 'Indonesia', continent: 'Asia', population: 273523615, gdp: 1185803717622, difficulty: 'normal' },
    { code: 'PK', key: 'pakistan', name: '巴基斯坦', nameEn: 'Pakistan', continent: 'Asia', population: 220892340, gdp: 348282437104, difficulty: 'normal' },
    { code: 'BD', key: 'bangladesh', name: '孟加拉国', nameEn: 'Bangladesh', continent: 'Asia', population: 164689383, gdp: 416265122149, difficulty: 'easy' },
    { code: 'JP', key: 'japan', name: '日本', nameEn: 'Japan', continent: 'Asia', population: 125800000, gdp: 4937422093790, difficulty: 'hard' },
    { code: 'PH', key: 'philippines', name: '菲律宾', nameEn: 'Philippines', continent: 'Asia', population: 109581078, gdp: 394086363971, difficulty: 'easy' },
    { code: 'VN', key: 'vietnam', name: '越南', nameEn: 'Vietnam', continent: 'Asia', population: 97338579, gdp: 366137534765, difficulty: 'normal' },
    { code: 'TR', key: 'turkey', name: '土耳其', nameEn: 'Turkey', continent: 'Asia', population: 84339067, gdp: 819034821404, difficulty: 'normal' },
    { code: 'IR', key: 'iran', name: '伊朗', nameEn: 'Iran', continent: 'Asia', population: 83992949, gdp: 359970676859, difficulty: 'normal' },
    { code: 'TH', key: 'thailand', name: '泰国', nameEn: 'Thailand', continent: 'Asia', population: 69799978, gdp: 505982012757, difficulty: 'easy' },
    { code: 'MM', key: 'myanmar', name: '缅甸', nameEn: 'Myanmar', continent: 'Asia', population: 54409800, gdp: 65067183428, difficulty: 'easy' },
    { code: 'KR', key: 'south_korea', name: '韩国', nameEn: 'South Korea', continent: 'Asia', population: 51780579, gdp: 1807442257567, difficulty: 'normal' },
    { code: 'IQ', key: 'iraq', name: '伊拉克', nameEn: 'Iraq', continent: 'Asia', population: 40222493, gdp: 167224213674, difficulty: 'normal' },
    { code: 'AF', key: 'afghanistan', name: '阿富汗', nameEn: 'Afghanistan', continent: 'Asia', population: 38928346, gdp: 20191766866, difficulty: 'easy' },
    { code: 'SA', key: 'saudi_arabia', name: '沙特阿拉伯', nameEn: 'Saudi Arabia', continent: 'Asia', population: 34813871, gdp: 833541016806, difficulty: 'normal' },
    { code: 'UZ', key: 'uzbekistan', name: '乌兹别克斯坦', nameEn: 'Uzbekistan', continent: 'Asia', population: 33469203, gdp: 59006416151, difficulty: 'easy' },
    { code: 'MY', key: 'malaysia', name: '马来西亚', nameEn: 'Malaysia', continent: 'Asia', population: 32365999, gdp: 372981859100, difficulty: 'normal' },
    { code: 'NP', key: 'nepal', name: '尼泊尔', nameEn: 'Nepal', continent: 'Asia', population: 29136808, gdp: 33657189341, difficulty: 'easy' },
    { code: 'YE', key: 'yemen', name: '也门', nameEn: 'Yemen', continent: 'Asia', population: 29825964, gdp: 21062104905, difficulty: 'easy' },
    { code: 'LK', key: 'sri_lanka', name: '斯里兰卡', nameEn: 'Sri Lanka', continent: 'Asia', population: 21413249, gdp: 80715763095, difficulty: 'easy' },
    { code: 'KZ', key: 'kazakhstan', name: '哈萨克斯坦', nameEn: 'Kazakhstan', continent: 'Asia', population: 18776707, gdp: 197112128855, difficulty: 'normal' },
    { code: 'KH', key: 'cambodia', name: '柬埔寨', nameEn: 'Cambodia', continent: 'Asia', population: 16718965, gdp: 25913876426, difficulty: 'easy' },
    { code: 'JO', key: 'jordan', name: '约旦', nameEn: 'Jordan', continent: 'Asia', population: 10203134, gdp: 43647828641, difficulty: 'easy' },
    { code: 'AZ', key: 'azerbaijan', name: '阿塞拜疆', nameEn: 'Azerbaijan', continent: 'Asia', population: 10139177, gdp: 48047677078, difficulty: 'easy' },
    { code: 'AE', key: 'uae', name: '阿联酋', nameEn: 'UAE', continent: 'Asia', population: 9890402, gdp: 358868765293, difficulty: 'normal' },
    { code: 'TJ', key: 'tajikistan', name: '塔吉克斯坦', nameEn: 'Tajikistan', continent: 'Asia', population: 9537645, gdp: 8518515122, difficulty: 'easy' },
    { code: 'IL', key: 'israel', name: '以色列', nameEn: 'Israel', continent: 'Asia', population: 8655535, gdp: 481591395107, difficulty: 'normal' },
    { code: 'LA', key: 'laos', name: '老挝', nameEn: 'Laos', continent: 'Asia', population: 7275560, gdp: 19080463572, difficulty: 'easy' },
    { code: 'SG', key: 'singapore', name: '新加坡', nameEn: 'Singapore', continent: 'Asia', population: 5850342, gdp: 396987286117, difficulty: 'normal' },
    { code: 'LB', key: 'lebanon', name: '黎巴嫩', nameEn: 'Lebanon', continent: 'Asia', population: 6825445, gdp: 23131861598, difficulty: 'easy' },
    { code: 'OM', key: 'oman', name: '阿曼', nameEn: 'Oman', continent: 'Asia', population: 5106626, gdp: 76331796325, difficulty: 'easy' },
    { code: 'KW', key: 'kuwait', name: '科威特', nameEn: 'Kuwait', continent: 'Asia', population: 4270571, gdp: 136198086929, difficulty: 'easy' },
    { code: 'GE', key: 'georgia', name: '格鲁吉亚', nameEn: 'Georgia', continent: 'Asia', population: 3989167, gdp: 18716451524, difficulty: 'easy' },
    { code: 'MN', key: 'mongolia', name: '蒙古', nameEn: 'Mongolia', continent: 'Asia', population: 3278290, gdp: 15187654034, difficulty: 'easy' },
    { code: 'AM', key: 'armenia', name: '亚美尼亚', nameEn: 'Armenia', continent: 'Asia', population: 2963243, gdp: 13863970588, difficulty: 'easy' },
    { code: 'QA', key: 'qatar', name: '卡塔尔', nameEn: 'Qatar', continent: 'Asia', population: 2881053, gdp: 179568324022, difficulty: 'normal' },
    { code: 'BH', key: 'bahrain', name: '巴林', nameEn: 'Bahrain', continent: 'Asia', population: 1701575, gdp: 38674199094, difficulty: 'easy' },
    { code: 'TM', key: 'turkmenistan', name: '土库曼斯坦', nameEn: 'Turkmenistan', continent: 'Asia', population: 6031200, gdp: 45123145896, difficulty: 'easy' },
    { code: 'KG', key: 'kyrgyzstan', name: '吉尔吉斯斯坦', nameEn: 'Kyrgyzstan', continent: 'Asia', population: 6524195, gdp: 7735362609, difficulty: 'easy' },
    { code: 'MV', key: 'maldives', name: '马尔代夫', nameEn: 'Maldives', continent: 'Asia', population: 540544, gdp: 3797210582, difficulty: 'easy' },
    { code: 'BN', key: 'brunei', name: '文莱', nameEn: 'Brunei', continent: 'Asia', population: 437479, gdp: 11972670905, difficulty: 'easy' },
    { code: 'BT', key: 'bhutan', name: '不丹', nameEn: 'Bhutan', continent: 'Asia', population: 771608, gdp: 2533885399, difficulty: 'easy' },
    { code: 'KP', key: 'north_korea', name: '朝鲜', nameEn: 'North Korea', continent: 'Asia', population: 25778816, gdp: 18000000000, difficulty: 'easy' },
    { code: 'TL', key: 'east_timor', name: '东帝汶', nameEn: 'East Timor', continent: 'Asia', population: 1318445, gdp: 1960568000, difficulty: 'easy' },

    // 欧洲 (44国)
    { code: 'RU', key: 'russia', name: '俄罗斯', nameEn: 'Russia', continent: 'Europe', population: 144104080, gdp: 1778782028752, difficulty: 'hard' },
    { code: 'DE', key: 'germany', name: '德国', nameEn: 'Germany', continent: 'Europe', population: 83240525, gdp: 4259934911837, difficulty: 'hard' },
    { code: 'GB', key: 'uk', name: '英国', nameEn: 'United Kingdom', continent: 'Europe', population: 67215293, gdp: 3186860967788, difficulty: 'hard' },
    { code: 'FR', key: 'france', name: '法国', nameEn: 'France', continent: 'Europe', population: 67391582, gdp: 2938272581205, difficulty: 'hard' },
    { code: 'IT', key: 'italy', name: '意大利', nameEn: 'Italy', continent: 'Europe', population: 59554023, gdp: 2107702696448, difficulty: 'normal' },
    { code: 'ES', key: 'spain', name: '西班牙', nameEn: 'Spain', continent: 'Europe', population: 47351567, gdp: 1427543745965, difficulty: 'normal' },
    { code: 'UA', key: 'ukraine', name: '乌克兰', nameEn: 'Ukraine', continent: 'Europe', population: 44134693, gdp: 200085240719, difficulty: 'normal' },
    { code: 'PL', key: 'poland', name: '波兰', nameEn: 'Poland', continent: 'Europe', population: 37958138, gdp: 679444435102, difficulty: 'normal' },
    { code: 'RO', key: 'romania', name: '罗马尼亚', nameEn: 'Romania', continent: 'Europe', population: 19286123, gdp: 286505858090, difficulty: 'easy' },
    { code: 'NL', key: 'netherlands', name: '荷兰', nameEn: 'Netherlands', continent: 'Europe', population: 17441139, gdp: 1012733004784, difficulty: 'normal' },
    { code: 'BE', key: 'belgium', name: '比利时', nameEn: 'Belgium', continent: 'Europe', population: 11589623, gdp: 594107183135, difficulty: 'normal' },
    { code: 'CZ', key: 'czech_republic', name: '捷克', nameEn: 'Czech Republic', continent: 'Europe', population: 10708981, gdp: 282340851947, difficulty: 'easy' },
    { code: 'GR', key: 'greece', name: '希腊', nameEn: 'Greece', continent: 'Europe', population: 10715549, gdp: 216227081123, difficulty: 'normal' },
    { code: 'PT', key: 'portugal', name: '葡萄牙', nameEn: 'Portugal', continent: 'Europe', population: 10305564, gdp: 249883435386, difficulty: 'easy' },
    { code: 'SE', key: 'sweden', name: '瑞典', nameEn: 'Sweden', continent: 'Europe', population: 10353442, gdp: 621241588247, difficulty: 'normal' },
    { code: 'HU', key: 'hungary', name: '匈牙利', nameEn: 'Hungary', continent: 'Europe', population: 9769526, gdp: 182279503141, difficulty: 'easy' },
    { code: 'BY', key: 'belarus', name: '白俄罗斯', nameEn: 'Belarus', continent: 'Europe', population: 9398867, gdp: 60751210367, difficulty: 'easy' },
    { code: 'AT', key: 'austria', name: '奥地利', nameEn: 'Austria', continent: 'Europe', population: 8917205, gdp: 480417023274, difficulty: 'normal' },
    { code: 'CH', key: 'switzerland', name: '瑞士', nameEn: 'Switzerland', continent: 'Europe', population: 8636896, gdp: 812867587410, difficulty: 'normal' },
    { code: 'RS', key: 'serbia', name: '塞尔维亚', nameEn: 'Serbia', continent: 'Europe', population: 8737371, gdp: 53314177293, difficulty: 'easy' },
    { code: 'BG', key: 'bulgaria', name: '保加利亚', nameEn: 'Bulgaria', continent: 'Europe', population: 6951482, gdp: 85033918016, difficulty: 'easy' },
    { code: 'DK', key: 'denmark', name: '丹麦', nameEn: 'Denmark', continent: 'Europe', population: 5831404, gdp: 398303387834, difficulty: 'normal' },
    { code: 'FI', key: 'finland', name: '芬兰', nameEn: 'Finland', continent: 'Europe', population: 5530719, gdp: 297301911728, difficulty: 'normal' },
    { code: 'SK', key: 'slovakia', name: '斯洛伐克', nameEn: 'Slovakia', continent: 'Europe', population: 5459642, gdp: 104574185119, difficulty: 'easy' },
    { code: 'NO', key: 'norway', name: '挪威', nameEn: 'Norway', continent: 'Europe', population: 5379475, gdp: 482175396914, difficulty: 'normal' },
    { code: 'IE', key: 'ireland', name: '爱尔兰', nameEn: 'Ireland', continent: 'Europe', population: 4994724, gdp: 418620938596, difficulty: 'easy' },
    { code: 'HR', key: 'croatia', name: '克罗地亚', nameEn: 'Croatia', continent: 'Europe', population: 4105267, gdp: 68954385929, difficulty: 'easy' },
    { code: 'BA', key: 'bosnia', name: '波黑', nameEn: 'Bosnia and Herzegovina', continent: 'Europe', population: 3280819, gdp: 19782420272, difficulty: 'easy' },
    { code: 'AL', key: 'albania', name: '阿尔巴尼亚', nameEn: 'Albania', continent: 'Europe', population: 2877797, gdp: 18274917227, difficulty: 'easy' },
    { code: 'LT', key: 'lithuania', name: '立陶宛', nameEn: 'Lithuania', continent: 'Europe', population: 2722289, gdp: 55887883693, difficulty: 'easy' },
    { code: 'SI', key: 'slovenia', name: '斯洛文尼亚', nameEn: 'Slovenia', continent: 'Europe', population: 2102419, gdp: 61773218008, difficulty: 'easy' },
    { code: 'LV', key: 'latvia', name: '拉脱维亚', nameEn: 'Latvia', continent: 'Europe', population: 1901548, gdp: 39333284816, difficulty: 'easy' },
    { code: 'EE', key: 'estonia', name: '爱沙尼亚', nameEn: 'Estonia', continent: 'Europe', population: 1326535, gdp: 36856270659, difficulty: 'easy' },
    { code: 'MD', key: 'moldova', name: '摩尔多瓦', nameEn: 'Moldova', continent: 'Europe', population: 4033963, gdp: 13682107394, difficulty: 'easy' },
    { code: 'LU', key: 'luxembourg', name: '卢森堡', nameEn: 'Luxembourg', continent: 'Europe', population: 632275, gdp: 85130925758, difficulty: 'easy' },
    { code: 'MT', key: 'malta', name: '马耳他', nameEn: 'Malta', continent: 'Europe', population: 525285, gdp: 17020417760, difficulty: 'easy' },
    { code: 'IS', key: 'iceland', name: '冰岛', nameEn: 'Iceland', continent: 'Europe', population: 341243, gdp: 25545083481, difficulty: 'easy' },
    { code: 'AD', key: 'andorra', name: '安道尔', nameEn: 'Andorra', continent: 'Europe', population: 77265, gdp: 3325168939, difficulty: 'easy' },
    { code: 'LI', key: 'liechtenstein', name: '列支敦士登', nameEn: 'Liechtenstein', continent: 'Europe', population: 38128, gdp: 6245914745, difficulty: 'easy' },
    { code: 'MC', key: 'monaco', name: '摩纳哥', nameEn: 'Monaco', continent: 'Europe', population: 39242, gdp: 7120246415, difficulty: 'easy' },
    { code: 'SM', key: 'san_marino', name: '圣马力诺', nameEn: 'San Marino', continent: 'Europe', population: 33931, gdp: 1585810583, difficulty: 'easy' },
    { code: 'VA', key: 'vatican', name: '梵蒂冈', nameEn: 'Vatican', continent: 'Europe', population: 801, gdp: 315000000, difficulty: 'easy' },
    { code: 'ME', key: 'montenegro', name: '黑山', nameEn: 'Montenegro', continent: 'Europe', population: 628066, gdp: 5542986000, difficulty: 'easy' },
    { code: 'MK', key: 'north_macedonia', name: '北马其顿', nameEn: 'North Macedonia', continent: 'Europe', population: 2083374, gdp: 12739000000, difficulty: 'easy' },

    // 北美洲 (23国)
    { code: 'US', key: 'usa', name: '美国', nameEn: 'United States', continent: 'North America', population: 331449281, gdp: 23315080560000, difficulty: 'hard' },
    { code: 'CA', key: 'canada', name: '加拿大', nameEn: 'Canada', continent: 'North America', population: 38005238, gdp: 1988347967709, difficulty: 'hard' },
    { code: 'MX', key: 'mexico', name: '墨西哥', nameEn: 'Mexico', continent: 'North America', population: 128932753, gdp: 1293150482037, difficulty: 'normal' },
    { code: 'GT', key: 'guatemala', name: '危地马拉', nameEn: 'Guatemala', continent: 'North America', population: 17915568, gdp: 77604054655, difficulty: 'easy' },
    { code: 'CU', key: 'cuba', name: '古巴', nameEn: 'Cuba', continent: 'North America', population: 11326616, gdp: 107351980000, difficulty: 'easy' },
    { code: 'HT', key: 'haiti', name: '海地', nameEn: 'Haiti', continent: 'North America', population: 11402528, gdp: 14627068819, difficulty: 'easy' },
    { code: 'DO', key: 'dominican_republic', name: '多米尼加', nameEn: 'Dominican Republic', continent: 'North America', population: 10847910, gdp: 78829093280, difficulty: 'easy' },
    { code: 'HN', key: 'honduras', name: '洪都拉斯', nameEn: 'Honduras', continent: 'North America', population: 9904607, gdp: 23832597835, difficulty: 'easy' },
    { code: 'NI', key: 'nicaragua', name: '尼加拉瓜', nameEn: 'Nicaragua', continent: 'North America', population: 6624554, gdp: 12620547352, difficulty: 'easy' },
    { code: 'CR', key: 'costa_rica', name: '哥斯达黎加', nameEn: 'Costa Rica', continent: 'North America', population: 5094118, gdp: 64284727187, difficulty: 'easy' },
    { code: 'PA', key: 'panama', name: '巴拿马', nameEn: 'Panama', continent: 'North America', population: 4314767, gdp: 63600711000, difficulty: 'easy' },
    { code: 'SV', key: 'el_salvador', name: '萨尔瓦多', nameEn: 'El Salvador', continent: 'North America', population: 6486205, gdp: 24642693194, difficulty: 'easy' },
    { code: 'BZ', key: 'belize', name: '伯利兹', nameEn: 'Belize', continent: 'North America', population: 397628, gdp: 1877254885, difficulty: 'easy' },
    { code: 'JM', key: 'jamaica', name: '牙买加', nameEn: 'Jamaica', continent: 'North America', population: 2961167, gdp: 13827946373, difficulty: 'easy' },
    { code: 'TT', key: 'trinidad', name: '特立尼达和多巴哥', nameEn: 'Trinidad and Tobago', continent: 'North America', population: 1399488, gdp: 24267891311, difficulty: 'easy' },
    { code: 'BS', key: 'bahamas', name: '巴哈马', nameEn: 'Bahamas', continent: 'North America', population: 393244, gdp: 11206400000, difficulty: 'easy' },
    { code: 'BB', key: 'barbados', name: '巴巴多斯', nameEn: 'Barbados', continent: 'North America', population: 287371, gdp: 4361000000, difficulty: 'easy' },
    { code: 'GD', key: 'grenada', name: '格林纳达', nameEn: 'Grenada', continent: 'North America', population: 112523, gdp: 1129129428, difficulty: 'easy' },
    { code: 'LC', key: 'saint_lucia', name: '圣卢西亚', nameEn: 'Saint Lucia', continent: 'North America', population: 183627, gdp: 1701000000, difficulty: 'easy' },
    { code: 'AG', key: 'antigua', name: '安提瓜和巴布达', nameEn: 'Antigua and Barbuda', continent: 'North America', population: 97929, gdp: 1467975557, difficulty: 'easy' },
    { code: 'VC', key: 'saint_vincent', name: '圣文森特和格林纳丁斯', nameEn: 'Saint Vincent', continent: 'North America', population: 110947, gdp: 826389462, difficulty: 'easy' },
    { code: 'KN', key: 'saint_kitts', name: '圣基茨和尼维斯', nameEn: 'Saint Kitts', continent: 'North America', population: 53199, gdp: 1016360000, difficulty: 'easy' },
    { code: 'DM', key: 'dominica', name: '多米尼克', nameEn: 'Dominica', continent: 'North America', population: 71991, gdp: 504917870, difficulty: 'easy' },

    // 南美洲 (12国)
    { code: 'BR', key: 'brazil', name: '巴西', nameEn: 'Brazil', continent: 'South America', population: 212559417, gdp: 1608981227947, difficulty: 'hard' },
    { code: 'CO', key: 'colombia', name: '哥伦比亚', nameEn: 'Colombia', continent: 'South America', population: 50882891, gdp: 314457506175, difficulty: 'normal' },
    { code: 'AR', key: 'argentina', name: '阿根廷', nameEn: 'Argentina', continent: 'South America', population: 45195774, gdp: 487227200789, difficulty: 'normal' },
    { code: 'PE', key: 'peru', name: '秘鲁', nameEn: 'Peru', continent: 'South America', population: 32971854, gdp: 223249044028, difficulty: 'normal' },
    { code: 'VE', key: 'venezuela', name: '委内瑞拉', nameEn: 'Venezuela', continent: 'South America', population: 28435940, gdp: 58764991328, difficulty: 'normal' },
    { code: 'CL', key: 'chile', name: '智利', nameEn: 'Chile', continent: 'South America', population: 19116201, gdp: 317590506650, difficulty: 'normal' },
    { code: 'EC', key: 'ecuador', name: '厄瓜多尔', nameEn: 'Ecuador', continent: 'South America', population: 17643054, gdp: 106160966000, difficulty: 'easy' },
    { code: 'BO', key: 'bolivia', name: '玻利维亚', nameEn: 'Bolivia', continent: 'South America', population: 11673021, gdp: 40410953295, difficulty: 'easy' },
    { code: 'PY', key: 'paraguay', name: '巴拉圭', nameEn: 'Paraguay', continent: 'South America', population: 7132538, gdp: 35628429090, difficulty: 'easy' },
    { code: 'UY', key: 'uruguay', name: '乌拉圭', nameEn: 'Uruguay', continent: 'South America', population: 3473730, gdp: 56385376232, difficulty: 'easy' },
    { code: 'GY', key: 'guyana', name: '圭亚那', nameEn: 'Guyana', continent: 'South America', population: 786559, gdp: 5474617460, difficulty: 'easy' },
    { code: 'SR', key: 'suriname', name: '苏里南', nameEn: 'Suriname', continent: 'South America', population: 586632, gdp: 2983800000, difficulty: 'easy' },

    // 非洲 (54国)
    { code: 'NG', key: 'nigeria', name: '尼日利亚', nameEn: 'Nigeria', continent: 'Africa', population: 206139589, gdp: 432294183110, difficulty: 'normal' },
    { code: 'ET', key: 'ethiopia', name: '埃塞俄比亚', nameEn: 'Ethiopia', continent: 'Africa', population: 114963588, gdp: 107645502737, difficulty: 'easy' },
    { code: 'EG', key: 'egypt', name: '埃及', nameEn: 'Egypt', continent: 'Africa', population: 102334404, gdp: 363069251283, difficulty: 'normal' },
    { code: 'CD', key: 'dr_congo', name: '刚果民主共和国', nameEn: 'DR Congo', continent: 'Africa', population: 89561403, gdp: 49100000000, difficulty: 'easy' },
    { code: 'TZ', key: 'tanzania', name: '坦桑尼亚', nameEn: 'Tanzania', continent: 'Africa', population: 59734218, gdp: 62392419501, difficulty: 'easy' },
    { code: 'ZA', key: 'south_africa', name: '南非', nameEn: 'South Africa', continent: 'Africa', population: 59308690, gdp: 419015043973, difficulty: 'normal' },
    { code: 'KE', key: 'kenya', name: '肯尼亚', nameEn: 'Kenya', continent: 'Africa', population: 53771296, gdp: 102431437810, difficulty: 'normal' },
    { code: 'UG', key: 'uganda', name: '乌干达', nameEn: 'Uganda', continent: 'Africa', population: 45741007, gdp: 37605390827, difficulty: 'easy' },
    { code: 'SD', key: 'sudan', name: '苏丹', nameEn: 'Sudan', continent: 'Africa', population: 43849260, gdp: 51671199765, difficulty: 'easy' },
    { code: 'DZ', key: 'algeria', name: '阿尔及利亚', nameEn: 'Algeria', continent: 'Africa', population: 43851044, gdp: 163042387033, difficulty: 'normal' },
    { code: 'MA', key: 'morocco', name: '摩洛哥', nameEn: 'Morocco', continent: 'Africa', population: 36910560, gdp: 133006238705, difficulty: 'easy' },
    { code: 'AO', key: 'angola', name: '安哥拉', nameEn: 'Angola', continent: 'Africa', population: 32866272, gdp: 62304450665, difficulty: 'easy' },
    { code: 'GH', key: 'ghana', name: '加纳', nameEn: 'Ghana', continent: 'Africa', population: 31072940, gdp: 68417902567, difficulty: 'easy' },
    { code: 'MZ', key: 'mozambique', name: '莫桑比克', nameEn: 'Mozambique', continent: 'Africa', population: 31255435, gdp: 14027989860, difficulty: 'easy' },
    { code: 'MG', key: 'madagascar', name: '马达加斯加', nameEn: 'Madagascar', continent: 'Africa', population: 27691018, gdp: 13854747231, difficulty: 'easy' },
    { code: 'CM', key: 'cameroon', name: '喀麦隆', nameEn: 'Cameroon', continent: 'Africa', population: 26545863, gdp: 39083570695, difficulty: 'easy' },
    { code: 'CI', key: 'ivory_coast', name: '科特迪瓦', nameEn: 'Ivory Coast', continent: 'Africa', population: 26378274, gdp: 61315061770, difficulty: 'easy' },
    { code: 'NE', key: 'niger', name: '尼日尔', nameEn: 'Niger', continent: 'Africa', population: 24206644, gdp: 13742538158, difficulty: 'easy' },
    { code: 'BF', key: 'burkina_faso', name: '布基纳法索', nameEn: 'Burkina Faso', continent: 'Africa', population: 20903273, gdp: 17373132443, difficulty: 'easy' },
    { code: 'ML', key: 'mali', name: '马里', nameEn: 'Mali', continent: 'Africa', population: 20250833, gdp: 19288097211, difficulty: 'easy' },
    { code: 'MW', key: 'malawi', name: '马拉维', nameEn: 'Malawi', continent: 'Africa', population: 19129952, gdp: 12048886875, difficulty: 'easy' },
    { code: 'ZM', key: 'zambia', name: '赞比亚', nameEn: 'Zambia', continent: 'Africa', population: 18383955, gdp: 21194007750, difficulty: 'easy' },
    { code: 'SN', key: 'senegal', name: '塞内加尔', nameEn: 'Senegal', continent: 'Africa', population: 16743927, gdp: 24582148692, difficulty: 'easy' },
    { code: 'SO', key: 'somalia', name: '索马里', nameEn: 'Somalia', continent: 'Africa', population: 15893222, gdp: 4927108490, difficulty: 'easy' },
    { code: 'TD', key: 'chad', name: '乍得', nameEn: 'Chad', continent: 'Africa', population: 16425864, gdp: 10182285585, difficulty: 'easy' },
    { code: 'ZW', key: 'zimbabwe', name: '津巴布韦', nameEn: 'Zimbabwe', continent: 'Africa', population: 14862924, gdp: 20663666119, difficulty: 'easy' },
    { code: 'GN', key: 'guinea', name: '几内亚', nameEn: 'Guinea', continent: 'Africa', population: 13132795, gdp: 15592754591, difficulty: 'easy' },
    { code: 'RW', key: 'rwanda', name: '卢旺达', nameEn: 'Rwanda', continent: 'Africa', population: 12952218, gdp: 11076661485, difficulty: 'easy' },
    { code: 'BJ', key: 'benin', name: '贝宁', nameEn: 'Benin', continent: 'Africa', population: 12123200, gdp: 16960082060, difficulty: 'easy' },
    { code: 'BI', key: 'burundi', name: '布隆迪', nameEn: 'Burundi', continent: 'Africa', population: 11890784, gdp: 3096402820, difficulty: 'easy' },
    { code: 'TN', key: 'tunisia', name: '突尼斯', nameEn: 'Tunisia', continent: 'Africa', population: 11818619, gdp: 39422612063, difficulty: 'easy' },
    { code: 'SS', key: 'south_sudan', name: '南苏丹', nameEn: 'South Sudan', continent: 'Africa', population: 11193725, gdp: 3683859889, difficulty: 'easy' },
    { code: 'TG', key: 'togo', name: '多哥', nameEn: 'Togo', continent: 'Africa', population: 8278724, gdp: 5495004332, difficulty: 'easy' },
    { code: 'SL', key: 'sierra_leone', name: '塞拉利昂', nameEn: 'Sierra Leone', continent: 'Africa', population: 7976983, gdp: 4121901936, difficulty: 'easy' },
    { code: 'LY', key: 'libya', name: '利比亚', nameEn: 'Libya', continent: 'Africa', population: 6871292, gdp: 21827916817, difficulty: 'easy' },
    { code: 'LR', key: 'liberia', name: '利比里亚', nameEn: 'Liberia', continent: 'Africa', population: 5057681, gdp: 3049000000, difficulty: 'easy' },
    { code: 'CF', key: 'central_african_republic', name: '中非共和国', nameEn: 'Central African Republic', continent: 'Africa', population: 4829767, gdp: 2380274721, difficulty: 'easy' },
    { code: 'MR', key: 'mauritania', name: '毛里塔尼亚', nameEn: 'Mauritania', continent: 'Africa', population: 4649658, gdp: 9909069677, difficulty: 'easy' },
    { code: 'ER', key: 'eritrea', name: '厄立特里亚', nameEn: 'Eritrea', continent: 'Africa', population: 3546421, gdp: 2065000000, difficulty: 'easy' },
    { code: 'GM', key: 'gambia', name: '冈比亚', nameEn: 'Gambia', continent: 'Africa', population: 2416668, gdp: 1963329270, difficulty: 'easy' },
    { code: 'BW', key: 'botswana', name: '博茨瓦纳', nameEn: 'Botswana', continent: 'Africa', population: 2351627, gdp: 15782431138, difficulty: 'easy' },
    { code: 'GA', key: 'gabon', name: '加蓬', nameEn: 'Gabon', continent: 'Africa', population: 2225734, gdp: 15060624163, difficulty: 'easy' },
    { code: 'LS', key: 'lesotho', name: '莱索托', nameEn: 'Lesotho', continent: 'Africa', population: 2142249, gdp: 2445113410, difficulty: 'easy' },
    { code: 'GW', key: 'guinea_bissau', name: '几内亚比绍', nameEn: 'Guinea-Bissau', continent: 'Africa', population: 1968001, gdp: 1339128386, difficulty: 'easy' },
    { code: 'GQ', key: 'equatorial_guinea', name: '赤道几内亚', nameEn: 'Equatorial Guinea', continent: 'Africa', population: 1402985, gdp: 10026577324, difficulty: 'easy' },
    { code: 'MU', key: 'mauritius', name: '毛里求斯', nameEn: 'Mauritius', continent: 'Africa', population: 1265711, gdp: 11030569785, difficulty: 'easy' },
    { code: 'SZ', key: 'eswatini', name: '斯威士兰', nameEn: 'Eswatini', continent: 'Africa', population: 1160164, gdp: 3925181823, difficulty: 'easy' },
    { code: 'DJ', key: 'djibouti', name: '吉布提', nameEn: 'Djibouti', continent: 'Africa', population: 988000, gdp: 3384366263, difficulty: 'easy' },
    { code: 'KM', key: 'comoros', name: '科摩罗', nameEn: 'Comoros', continent: 'Africa', population: 869601, gdp: 1228475948, difficulty: 'easy' },
    { code: 'CV', key: 'cape_verde', name: '佛得角', nameEn: 'Cape Verde', continent: 'Africa', population: 555987, gdp: 1984005804, difficulty: 'easy' },
    { code: 'ST', key: 'sao_tome', name: '圣多美和普林西比', nameEn: 'Sao Tome and Principe', continent: 'Africa', population: 219159, gdp: 547924636, difficulty: 'easy' },
    { code: 'SC', key: 'seychelles', name: '塞舌尔', nameEn: 'Seychelles', continent: 'Africa', population: 98452, gdp: 1248576888, difficulty: 'easy' },

    // 大洋洲 (14国)
    { code: 'AU', key: 'australia', name: '澳大利亚', nameEn: 'Australia', continent: 'Oceania', population: 25499884, gdp: 1552665087216, difficulty: 'hard' },
    { code: 'PG', key: 'papua_new_guinea', name: '巴布亚新几内亚', nameEn: 'Papua New Guinea', continent: 'Oceania', population: 8947024, gdp: 24656847212, difficulty: 'easy' },
    { code: 'NZ', key: 'new_zealand', name: '新西兰', nameEn: 'New Zealand', continent: 'Oceania', population: 5084300, gdp: 249415666719, difficulty: 'normal' },
    { code: 'FJ', key: 'fiji', name: '斐济', nameEn: 'Fiji', continent: 'Oceania', population: 896445, gdp: 3931309621, difficulty: 'easy' },
    { code: 'SB', key: 'solomon_islands', name: '所罗门群岛', nameEn: 'Solomon Islands', continent: 'Oceania', population: 686884, gdp: 1559939680, difficulty: 'easy' },
    { code: 'VU', key: 'vanuatu', name: '瓦努阿图', nameEn: 'Vanuatu', continent: 'Oceania', population: 307145, gdp: 956269928, difficulty: 'easy' },
    { code: 'WS', key: 'samoa', name: '萨摩亚', nameEn: 'Samoa', continent: 'Oceania', population: 198413, gdp: 832904767, difficulty: 'easy' },
    { code: 'FM', key: 'micronesia', name: '密克罗尼西亚', nameEn: 'Micronesia', continent: 'Oceania', population: 115023, gdp: 401932296, difficulty: 'easy' },
    { code: 'TO', key: 'tonga', name: '汤加', nameEn: 'Tonga', continent: 'Oceania', population: 105695, gdp: 512953479, difficulty: 'easy' },
    { code: 'KI', key: 'kiribati', name: '基里巴斯', nameEn: 'Kiribati', continent: 'Oceania', population: 119449, gdp: 196150378, difficulty: 'easy' },
    { code: 'PW', key: 'palau', name: '帕劳', nameEn: 'Palau', continent: 'Oceania', population: 18094, gdp: 257723815, difficulty: 'easy' },
    { code: 'MH', key: 'marshall_islands', name: '马绍尔群岛', nameEn: 'Marshall Islands', continent: 'Oceania', population: 59190, gdp: 228019110, difficulty: 'easy' },
    { code: 'TV', key: 'tuvalu', name: '图瓦卢', nameEn: 'Tuvalu', continent: 'Oceania', population: 11792, gdp: 52683040, difficulty: 'easy' },
    { code: 'NR', key: 'nauru', name: '瑙鲁', nameEn: 'Nauru', continent: 'Oceania', population: 10824, gdp: 182200000, difficulty: 'easy' },
];

// 统计信息
const COUNTRY_STATS = {
    total: WORLD_COUNTRIES.length,
    byContinent: {
        'Asia': WORLD_COUNTRIES.filter(c => c.continent === 'Asia').length,
        'Europe': WORLD_COUNTRIES.filter(c => c.continent === 'Europe').length,
        'North America': WORLD_COUNTRIES.filter(c => c.continent === 'North America').length,
        'South America': WORLD_COUNTRIES.filter(c => c.continent === 'South America').length,
        'Africa': WORLD_COUNTRIES.filter(c => c.continent === 'Africa').length,
        'Oceania': WORLD_COUNTRIES.filter(c => c.continent === 'Oceania').length
    },
    byDifficulty: {
        'easy': WORLD_COUNTRIES.filter(c => c.difficulty === 'easy').length,
        'normal': WORLD_COUNTRIES.filter(c => c.difficulty === 'normal').length,
        'hard': WORLD_COUNTRIES.filter(c => c.difficulty === 'hard').length
    }
};

// 获取人口排名前十的国家
const TOP10_POPULATION = [...WORLD_COUNTRIES].sort((a, b) => b.population - a.population).slice(0, 10);

// 获取GDP排名前十的国家
const TOP10_GDP = [...WORLD_COUNTRIES].sort((a, b) => b.gdp - a.gdp).slice(0, 10);

// 需要创建省份锦标赛的国家（人口前十 + GDP前十，去重）
const PROVINCE_COUNTRIES = [...new Set([...TOP10_POPULATION, ...TOP10_GDP].map(c => c.code))];

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WORLD_COUNTRIES, COUNTRY_STATS, TOP10_POPULATION, TOP10_GDP, PROVINCE_COUNTRIES };
} else {
    window.WORLD_COUNTRIES = WORLD_COUNTRIES;
    window.COUNTRY_STATS = COUNTRY_STATS;
    window.TOP10_POPULATION = TOP10_POPULATION;
    window.TOP10_GDP = TOP10_GDP;
    window.PROVINCE_COUNTRIES = PROVINCE_COUNTRIES;
}

console.log('🌍 全球196国家锦标赛数据加载完成！');
console.log(`📊 总计: ${COUNTRY_STATS.total}个国家`);
console.log(`🌏 亚洲: ${COUNTRY_STATS.byContinent['Asia']}国, 欧洲: ${COUNTRY_STATS.byContinent['Europe']}国, 北美洲: ${COUNTRY_STATS.byContinent['North America']}国, 南美洲: ${COUNTRY_STATS.byContinent['South America']}国, 非洲: ${COUNTRY_STATS.byContinent['Africa']}国, 大洋洲: ${COUNTRY_STATS.byContinent['Oceania']}国`);
console.log(`🎮 难度分布: 简单${COUNTRY_STATS.byDifficulty.easy}国, 普通${COUNTRY_STATS.byDifficulty.normal}国, 困难${COUNTRY_STATS.byDifficulty.hard}国`);

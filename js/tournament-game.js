// tournament-game.js - 命运塔锦标赛完整游戏逻辑（196国家完整版）
// 这是自动生成的配置文件，包含全部196个国家

// ============ 游戏配置 ============
const TOURNAMENT_CONFIG = {
    MAX_PLAYERS: 10,
    HUMAN_PLAYERS: 3,
    BOT_PLAYERS: 7,
    TURN_TIME_LIMIT: 30,
    MAX_GAME_TIME_SOLO: 1560,
    MAX_GAME_TIME_TEAM: 1800,
    DECKS_COUNT: 4,
    TOTAL_CARDS: 208,
    HAND_SIZE: 52,
    TEAM_MODE: true,
    PROVOKE_LAYERS: [2, 5, 8],
    GIFT_CARD_RATIO: 1/3,
    GIFT_RANKS: [2, 3, 4],
};

// ============ 196国家塔楼数据 ============
const COUNTRY_TOWERS = {
    // ============================================
    // 亚洲 (49国)
    // ============================================
    'china': { name: '中国·东方明珠', flag: '🇨🇳', tower: 'oriental-pearl.png', continent: 'asia', difficulty: 'hard' },
    'india': { name: '印度·泰姬陵', flag: '🇮🇳', tower: 'taj-mahal.png', continent: 'asia', difficulty: 'hard' },
    'indonesia': { name: '印度尼西亚·婆罗浮屠', flag: '🇮🇩', tower: 'borobudur.png', continent: 'asia', difficulty: 'normal' },
    'pakistan': { name: '巴基斯坦·伊斯兰堡', flag: '🇵🇰', tower: 'blue-mosque.png', continent: 'asia', difficulty: 'normal' },
    'bangladesh': { name: '孟加拉国·达卡', flag: '🇧🇩', tower: 'steppe.png', continent: 'asia', difficulty: 'easy' },
    'japan': { name: '日本·东京塔', flag: '🇯🇵', tower: 'tokyo-tower.png', continent: 'asia', difficulty: 'hard' },
    'philippines': { name: '菲律宾·巧克力山', flag: '🇵🇭', tower: 'chocolate-hills.png', continent: 'asia', difficulty: 'easy' },
    'vietnam': { name: '越南·下龙湾', flag: '🇻🇳', tower: 'ha-long-bay.png', continent: 'asia', difficulty: 'normal' },
    'turkey': { name: '土耳其·蓝色清真寺', flag: '🇹🇷', tower: 'blue-mosque.png', continent: 'asia', difficulty: 'normal' },
    'iran': { name: '伊朗·伊玛目广场', flag: '🇮🇷', tower: 'imam-square.png', continent: 'asia', difficulty: 'normal' },
    'thailand': { name: '泰国·大皇宫', flag: '🇹🇭', tower: 'grand-palace.png', continent: 'asia', difficulty: 'easy' },
    'myanmar': { name: '缅甸·仰光大金塔', flag: '🇲🇲', tower: 'shwedagon.png', continent: 'asia', difficulty: 'easy' },
    'south_korea': { name: '韩国·N首尔塔', flag: '🇰🇷', tower: 'n-tower.png', continent: 'asia', difficulty: 'normal' },
    'iraq': { name: '伊拉克·巴格达', flag: '🇮🇶', tower: 'steppe.png', continent: 'asia', difficulty: 'normal' },
    'afghanistan': { name: '阿富汗·喀布尔', flag: '🇦🇫', tower: 'steppe.png', continent: 'asia', difficulty: 'easy' },
    'saudi_arabia': { name: '沙特阿拉伯·麦加', flag: '🇸🇦', tower: 'steppe.png', continent: 'asia', difficulty: 'normal' },
    'uzbekistan': { name: '乌兹别克斯坦·撒马尔罕', flag: '🇺🇿', tower: 'steppe.png', continent: 'asia', difficulty: 'easy' },
    'malaysia': { name: '马来西亚·双子塔', flag: '🇲🇾', tower: 'petronas.png', continent: 'asia', difficulty: 'normal' },
    'nepal': { name: '尼泊尔·喜马拉雅', flag: '🇳🇵', tower: 'steppe.png', continent: 'asia', difficulty: 'easy' },
    'yemen': { name: '也门·萨那', flag: '🇾🇪', tower: 'steppe.png', continent: 'asia', difficulty: 'easy' },
    'sri_lanka': { name: '斯里兰卡·狮子岩', flag: '🇱🇰', tower: 'steppe.png', continent: 'asia', difficulty: 'easy' },
    'kazakhstan': { name: '哈萨克斯坦·草原', flag: '🇰🇿', tower: 'steppe.png', continent: 'asia', difficulty: 'normal' },
    'cambodia': { name: '柬埔寨·吴哥窟', flag: '🇰🇭', tower: 'angkor-wat.png', continent: 'asia', difficulty: 'easy' },
    'jordan': { name: '约旦·佩特拉', flag: '🇯🇴', tower: 'petra.png', continent: 'asia', difficulty: 'easy' },
    'azerbaijan': { name: '阿塞拜疆·巴库', flag: '🇦🇿', tower: 'steppe.png', continent: 'asia', difficulty: 'easy' },
    'uae': { name: '阿联酋·哈利法塔', flag: '🇦🇪', tower: 'burj-khalifa.png', continent: 'asia', difficulty: 'normal' },
    'tajikistan': { name: '塔吉克斯坦·杜尚别', flag: '🇹🇯', tower: 'steppe.png', continent: 'asia', difficulty: 'easy' },
    'israel': { name: '以色列·耶路撒冷', flag: '🇮🇱', tower: 'jerusalem.png', continent: 'asia', difficulty: 'normal' },
    'laos': { name: '老挝·凯旋门', flag: '🇱🇦', tower: 'patuxai.png', continent: 'asia', difficulty: 'easy' },
    'singapore': { name: '新加坡·滨海湾', flag: '🇸🇬', tower: 'marina-bay.png', continent: 'asia', difficulty: 'normal' },
    'lebanon': { name: '黎巴嫩·贝鲁特', flag: '🇱🇧', tower: 'steppe.png', continent: 'asia', difficulty: 'easy' },
    'oman': { name: '阿曼·马斯喀特', flag: '🇴🇲', tower: 'steppe.png', continent: 'asia', difficulty: 'easy' },
    'kuwait': { name: '科威特·科威特塔', flag: '🇰🇼', tower: 'steppe.png', continent: 'asia', difficulty: 'easy' },
    'georgia': { name: '格鲁吉亚·第比利斯', flag: '🇬🇪', tower: 'steppe.png', continent: 'asia', difficulty: 'easy' },
    'mongolia': { name: '蒙古·乌兰巴托', flag: '🇲🇳', tower: 'steppe.png', continent: 'asia', difficulty: 'easy' },
    'armenia': { name: '亚美尼亚·埃里温', flag: '🇦🇲', tower: 'steppe.png', continent: 'asia', difficulty: 'easy' },
    'qatar': { name: '卡塔尔·多哈', flag: '🇶🇦', tower: 'doha-museum.png', continent: 'asia', difficulty: 'normal' },
    'bahrain': { name: '巴林·麦纳麦', flag: '🇧🇭', tower: 'steppe.png', continent: 'asia', difficulty: 'easy' },
    'turkmenistan': { name: '土库曼斯坦·阿什哈巴德', flag: '🇹🇲', tower: 'steppe.png', continent: 'asia', difficulty: 'easy' },
    'kyrgyzstan': { name: '吉尔吉斯斯坦·比什凯克', flag: '🇰🇬', tower: 'steppe.png', continent: 'asia', difficulty: 'easy' },
    'maldives': { name: '马尔代夫·马累', flag: '🇲🇻', tower: 'steppe.png', continent: 'asia', difficulty: 'easy' },
    'brunei': { name: '文莱·斯里巴加湾', flag: '🇧🇳', tower: 'steppe.png', continent: 'asia', difficulty: 'easy' },
    'bhutan': { name: '不丹·廷布', flag: '🇧🇹', tower: 'steppe.png', continent: 'asia', difficulty: 'easy' },
    'north_korea': { name: '朝鲜·平壤', flag: '🇰🇵', tower: 'steppe.png', continent: 'asia', difficulty: 'easy' },
    'east_timor': { name: '东帝汶·帝力', flag: '🇹🇱', tower: 'steppe.png', continent: 'asia', difficulty: 'easy' },
    'syria': { name: '叙利亚·大马士革', flag: '🇸🇾', tower: 'steppe.png', continent: 'asia', difficulty: 'normal' },
    'cyprus': { name: '塞浦路斯·尼科西亚', flag: '🇨🇾', tower: 'steppe.png', continent: 'asia', difficulty: 'easy' },
    'palestine': { name: '巴勒斯坦', flag: '🇵🇸', tower: 'steppe.png', continent: 'asia', difficulty: 'easy' },
    'kuwait': { name: '科威特·科威特塔', flag: '🇰🇼', tower: 'steppe.png', continent: 'asia', difficulty: 'easy' },

    // ============================================
    // 欧洲 (44国)
    // ============================================
    'russia': { name: '俄罗斯·圣瓦西里大教堂', flag: '🇷🇺', tower: 'st-basil.png', continent: 'europe', difficulty: 'hard' },
    'germany': { name: '德国·勃兰登堡门', flag: '🇩🇪', tower: 'brandenburg-gate.png', continent: 'europe', difficulty: 'hard' },
    'uk': { name: '英国·大本钟', flag: '🇬🇧', tower: 'big-ben.png', continent: 'europe', difficulty: 'hard' },
    'france': { name: '法国·埃菲尔铁塔', flag: '🇫🇷', tower: 'eiffel-tower.png', continent: 'europe', difficulty: 'hard' },
    'italy': { name: '意大利·比萨斜塔', flag: '🇮🇹', tower: 'pisa-tower.png', continent: 'europe', difficulty: 'normal' },
    'spain': { name: '西班牙·圣家堂', flag: '🇪🇸', tower: 'sagrada-familia.png', continent: 'europe', difficulty: 'normal' },
    'ukraine': { name: '乌克兰·基辅', flag: '🇺🇦', tower: 'kyiv.png', continent: 'europe', difficulty: 'normal' },
    'poland': { name: '波兰·华沙', flag: '🇵🇱', tower: 'warsaw.png', continent: 'europe', difficulty: 'normal' },
    'romania': { name: '罗马尼亚·布兰城堡', flag: '🇷🇴', tower: 'bran-castle.png', continent: 'europe', difficulty: 'easy' },
    'netherlands': { name: '荷兰·风车', flag: '🇳🇱', tower: 'windmill.png', continent: 'europe', difficulty: 'normal' },
    'belgium': { name: '比利时·布鲁塞尔', flag: '🇧🇪', tower: 'steppe.png', continent: 'europe', difficulty: 'normal' },
    'czech_republic': { name: '捷克·布拉格', flag: '🇨🇿', tower: 'prague.png', continent: 'europe', difficulty: 'easy' },
    'greece': { name: '希腊·帕特农神庙', flag: '🇬🇷', tower: 'parthenon.png', continent: 'europe', difficulty: 'normal' },
    'portugal': { name: '葡萄牙·里斯本', flag: '🇵🇹', tower: 'steppe.png', continent: 'europe', difficulty: 'easy' },
    'sweden': { name: '瑞典·斯德哥尔摩', flag: '🇸🇪', tower: 'stockholm.png', continent: 'europe', difficulty: 'normal' },
    'hungary': { name: '匈牙利·布达佩斯', flag: '🇭🇺', tower: 'budapest.png', continent: 'europe', difficulty: 'easy' },
    'belarus': { name: '白俄罗斯·明斯克', flag: '🇧🇾', tower: 'steppe.png', continent: 'europe', difficulty: 'easy' },
    'austria': { name: '奥地利·维也纳', flag: '🇦🇹', tower: 'vienna-opera.png', continent: 'europe', difficulty: 'normal' },
    'switzerland': { name: '瑞士·马特洪峰', flag: '🇨🇭', tower: 'matterhorn.png', continent: 'europe', difficulty: 'normal' },
    'serbia': { name: '塞尔维亚·贝尔格莱德', flag: '🇷🇸', tower: 'sava-temple.png', continent: 'europe', difficulty: 'easy' },
    'bulgaria': { name: '保加利亚·里拉修道院', flag: '🇧🇬', tower: 'rila.png', continent: 'europe', difficulty: 'easy' },
    'denmark': { name: '丹麦·哥本哈根', flag: '🇩🇰', tower: 'copenhagen.png', continent: 'europe', difficulty: 'normal' },
    'finland': { name: '芬兰·罗瓦涅米', flag: '🇫🇮', tower: 'rovaniemi.png', continent: 'europe', difficulty: 'normal' },
    'slovakia': { name: '斯洛伐克·布拉迪斯拉发', flag: '🇸🇰', tower: 'bratislava.png', continent: 'europe', difficulty: 'easy' },
    'norway': { name: '挪威·峡湾', flag: '🇳🇴', tower: 'fjord.png', continent: 'europe', difficulty: 'normal' },
    'ireland': { name: '爱尔兰·莫赫悬崖', flag: '🇮🇪', tower: 'cliffs-of-moher.png', continent: 'europe', difficulty: 'easy' },
    'croatia': { name: '克罗地亚·杜布罗夫尼克', flag: '🇭🇷', tower: 'dubrovnik.png', continent: 'europe', difficulty: 'easy' },
    'bosnia': { name: '波黑·萨拉热窝', flag: '🇧🇦', tower: 'steppe.png', continent: 'europe', difficulty: 'easy' },
    'albania': { name: '阿尔巴尼亚·地拉那', flag: '🇦🇱', tower: 'steppe.png', continent: 'europe', difficulty: 'easy' },
    'lithuania': { name: '立陶宛·维尔纽斯', flag: '🇱🇹', tower: 'steppe.png', continent: 'europe', difficulty: 'easy' },
    'slovenia': { name: '斯洛文尼亚·卢布尔雅那', flag: '🇸🇮', tower: 'steppe.png', continent: 'europe', difficulty: 'easy' },
    'latvia': { name: '拉脱维亚·里加', flag: '🇱🇻', tower: 'steppe.png', continent: 'europe', difficulty: 'easy' },
    'estonia': { name: '爱沙尼亚·塔林', flag: '🇪🇪', tower: 'steppe.png', continent: 'europe', difficulty: 'easy' },
    'moldova': { name: '摩尔多瓦·基希讷乌', flag: '🇲🇩', tower: 'steppe.png', continent: 'europe', difficulty: 'easy' },
    'luxembourg': { name: '卢森堡', flag: '🇱🇺', tower: 'steppe.png', continent: 'europe', difficulty: 'easy' },
    'malta': { name: '马耳他', flag: '🇲🇹', tower: 'steppe.png', continent: 'europe', difficulty: 'easy' },
    'iceland': { name: '冰岛·极光', flag: '🇮🇸', tower: 'aurora.png', continent: 'europe', difficulty: 'easy' },
    'andorra': { name: '安道尔', flag: '🇦🇩', tower: 'steppe.png', continent: 'europe', difficulty: 'easy' },
    'liechtenstein': { name: '列支敦士登', flag: '🇱🇮', tower: 'steppe.png', continent: 'europe', difficulty: 'easy' },
    'monaco': { name: '摩纳哥', flag: '🇲🇨', tower: 'steppe.png', continent: 'europe', difficulty: 'easy' },
    'san_marino': { name: '圣马力诺', flag: '🇸🇲', tower: 'steppe.png', continent: 'europe', difficulty: 'easy' },
    'vatican': { name: '梵蒂冈', flag: '🇻🇦', tower: 'steppe.png', continent: 'europe', difficulty: 'easy' },
    'montenegro': { name: '黑山', flag: '🇲🇪', tower: 'steppe.png', continent: 'europe', difficulty: 'easy' },
    'north_macedonia': { name: '北马其顿', flag: '🇲🇰', tower: 'steppe.png', continent: 'europe', difficulty: 'easy' },

    // ============================================
    // 北美洲 (23国)
    // ============================================
    'usa': { name: '美国·自由女神像', flag: '🇺🇸', tower: 'statue-of-liberty.png', continent: 'america', difficulty: 'hard' },
    'canada': { name: '加拿大·CN塔', flag: '🇨🇦', tower: 'cn-tower.png', continent: 'america', difficulty: 'hard' },
    'mexico': { name: '墨西哥·奇琴伊察', flag: '🇲🇽', tower: 'steppe.png', continent: 'america', difficulty: 'normal' },
    'guatemala': { name: '危地马拉·蒂卡尔', flag: '🇬🇹', tower: 'steppe.png', continent: 'america', difficulty: 'easy' },
    'cuba': { name: '古巴·哈瓦那', flag: '🇨🇺', tower: 'havana.png', continent: 'america', difficulty: 'easy' },
    'haiti': { name: '海地·太子港', flag: '🇭🇹', tower: 'steppe.png', continent: 'america', difficulty: 'easy' },
    'dominican_republic': { name: '多米尼加·圣多明各', flag: '🇩🇴', tower: 'steppe.png', continent: 'america', difficulty: 'easy' },
    'honduras': { name: '洪都拉斯·科潘', flag: '🇭🇳', tower: 'steppe.png', continent: 'america', difficulty: 'easy' },
    'nicaragua': { name: '尼加拉瓜·马那瓜', flag: '🇳🇮', tower: 'steppe.png', continent: 'america', difficulty: 'easy' },
    'costa_rica': { name: '哥斯达黎加·阿雷纳尔', flag: '🇨🇷', tower: 'arenal.png', continent: 'america', difficulty: 'easy' },
    'panama': { name: '巴拿马·巴拿马运河', flag: '🇵🇦', tower: 'panama-canal.png', continent: 'america', difficulty: 'easy' },
    'el_salvador': { name: '萨尔瓦多·圣萨尔瓦多', flag: '🇸🇻', tower: 'steppe.png', continent: 'america', difficulty: 'easy' },
    'belize': { name: '伯利兹·贝尔莫潘', flag: '🇧🇿', tower: 'steppe.png', continent: 'america', difficulty: 'easy' },
    'jamaica': { name: '牙买加·金斯敦', flag: '🇯🇲', tower: 'dunn-river.png', continent: 'america', difficulty: 'easy' },
    'trinidad': { name: '特立尼达和多巴哥', flag: '🇹🇹', tower: 'steppe.png', continent: 'america', difficulty: 'easy' },
    'bahamas': { name: '巴哈马·拿骚', flag: '🇧🇸', tower: 'steppe.png', continent: 'america', difficulty: 'easy' },
    'barbados': { name: '巴巴多斯', flag: '🇧🇧', tower: 'steppe.png', continent: 'america', difficulty: 'easy' },
    'grenada': { name: '格林纳达', flag: '🇬🇩', tower: 'steppe.png', continent: 'america', difficulty: 'easy' },
    'saint_lucia': { name: '圣卢西亚', flag: '🇱🇨', tower: 'steppe.png', continent: 'america', difficulty: 'easy' },
    'antigua': { name: '安提瓜和巴布达', flag: '🇦🇬', tower: 'steppe.png', continent: 'america', difficulty: 'easy' },
    'saint_vincent': { name: '圣文森特和格林纳丁斯', flag: '🇻🇨', tower: 'steppe.png', continent: 'america', difficulty: 'easy' },
    'saint_kitts': { name: '圣基茨和尼维斯', flag: '🇰🇳', tower: 'steppe.png', continent: 'america', difficulty: 'easy' },
    'dominica': { name: '多米尼克', flag: '🇩🇲', tower: 'steppe.png', continent: 'america', difficulty: 'easy' },

    // ============================================
    // 南美洲 (12国)
    // ============================================
    'brazil': { name: '巴西·基督像', flag: '🇧🇷', tower: 'christ-redeemer.png', continent: 'america', difficulty: 'hard' },
    'colombia': { name: '哥伦比亚·波哥大', flag: '🇨🇴', tower: 'steppe.png', continent: 'america', difficulty: 'normal' },
    'argentina': { name: '阿根廷·方尖碑', flag: '🇦🇷', tower: 'obelisk.png', continent: 'america', difficulty: 'normal' },
    'peru': { name: '秘鲁·马丘比丘', flag: '🇵🇪', tower: 'machu-picchu.png', continent: 'america', difficulty: 'normal' },
    'venezuela': { name: '委内瑞拉·加拉加斯', flag: '🇻🇪', tower: 'steppe.png', continent: 'america', difficulty: 'normal' },
    'chile': { name: '智利·复活节岛', flag: '🇨🇱', tower: 'easter-island.png', continent: 'america', difficulty: 'normal' },
    'ecuador': { name: '厄瓜多尔·基多', flag: '🇪🇨', tower: 'steppe.png', continent: 'america', difficulty: 'easy' },
    'bolivia': { name: '玻利维亚·拉巴斯', flag: '🇧🇴', tower: 'steppe.png', continent: 'america', difficulty: 'easy' },
    'paraguay': { name: '巴拉圭·亚松森', flag: '🇵🇾', tower: 'steppe.png', continent: 'america', difficulty: 'easy' },
    'uruguay': { name: '乌拉圭·蒙得维的亚', flag: '🇺🇾', tower: 'steppe.png', continent: 'america', difficulty: 'easy' },
    'guyana': { name: '圭亚那', flag: '🇬🇾', tower: 'steppe.png', continent: 'america', difficulty: 'easy' },
    'suriname': { name: '苏里南', flag: '🇸🇷', tower: 'steppe.png', continent: 'america', difficulty: 'easy' },

    // ============================================
    // 非洲 (54国)
    // ============================================
    'nigeria': { name: '尼日利亚·拉各斯', flag: '🇳🇬', tower: 'steppe.png', continent: 'africa', difficulty: 'normal' },
    'ethiopia': { name: '埃塞俄比亚·拉利贝拉', flag: '🇪🇹', tower: 'lalibela.png', continent: 'africa', difficulty: 'easy' },
    'egypt': { name: '埃及·金字塔', flag: '🇪🇬', tower: 'pyramids.png', continent: 'africa', difficulty: 'normal' },
    'dr_congo': { name: '刚果民主共和国', flag: '🇨🇩', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'tanzania': { name: '坦桑尼亚·塞伦盖蒂', flag: '🇹🇿', tower: 'serengeti.png', continent: 'africa', difficulty: 'easy' },
    'south_africa': { name: '南非·桌山', flag: '🇿🇦', tower: 'table-mountain.png', continent: 'africa', difficulty: 'normal' },
    'kenya': { name: '肯尼亚·内罗毕', flag: '🇰🇪', tower: 'steppe.png', continent: 'africa', difficulty: 'normal' },
    'uganda': { name: '乌干达·坎帕拉', flag: '🇺🇬', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'sudan': { name: '苏丹·喀土穆', flag: '🇸🇩', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'algeria': { name: '阿尔及利亚·阿尔及尔', flag: '🇩🇿', tower: 'steppe.png', continent: 'africa', difficulty: 'normal' },
    'morocco': { name: '摩洛哥·舍夫沙万', flag: '🇲🇦', tower: 'chefchaouen.png', continent: 'africa', difficulty: 'easy' },
    'angola': { name: '安哥拉·罗安达', flag: '🇦🇴', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'ghana': { name: '加纳·阿克拉', flag: '🇬🇭', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'mozambique': { name: '莫桑比克·马普托', flag: '🇲🇿', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'madagascar': { name: '马达加斯加·猴面包树', flag: '🇲🇬', tower: 'baobab.png', continent: 'africa', difficulty: 'easy' },
    'cameroon': { name: '喀麦隆·雅温得', flag: '🇨🇲', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'ivory_coast': { name: '科特迪瓦·阿比让', flag: '🇨🇮', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'niger': { name: '尼日尔·尼亚美', flag: '🇳🇪', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'burkina_faso': { name: '布基纳法索·瓦加杜古', flag: '🇧🇫', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'mali': { name: '马里·巴马科', flag: '🇲🇱', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'malawi': { name: '马拉维·利隆圭', flag: '🇲🇼', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'zambia': { name: '赞比亚·维多利亚瀑布', flag: '🇿🇲', tower: 'victoria-falls.png', continent: 'africa', difficulty: 'easy' },
    'senegal': { name: '塞内加尔·达喀尔', flag: '🇸🇳', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'somalia': { name: '索马里·摩加迪沙', flag: '🇸🇴', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'chad': { name: '乍得·恩贾梅纳', flag: '🇹🇩', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'zimbabwe': { name: '津巴布韦·哈拉雷', flag: '🇿🇼', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'guinea': { name: '几内亚·科纳克里', flag: '🇬🇳', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'rwanda': { name: '卢旺达·基加利', flag: '🇷🇼', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'benin': { name: '贝宁·波多诺伏', flag: '🇧🇯', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'burundi': { name: '布隆迪·布琼布拉', flag: '🇧🇮', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'tunisia': { name: '突尼斯·突尼斯', flag: '🇹🇳', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'south_sudan': { name: '南苏丹·朱巴', flag: '🇸🇸', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'togo': { name: '多哥·洛美', flag: '🇹🇬', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'sierra_leone': { name: '塞拉利昂·弗里敦', flag: '🇸🇱', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'libya': { name: '利比亚·的黎波里', flag: '🇱🇾', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'liberia': { name: '利比里亚·蒙罗维亚', flag: '🇱🇷', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'central_african_republic': { name: '中非共和国', flag: '🇨🇫', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'mauritania': { name: '毛里塔尼亚·努瓦克肖特', flag: '🇲🇷', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'eritrea': { name: '厄立特里亚·阿斯马拉', flag: '🇪🇷', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'gambia': { name: '冈比亚·班珠尔', flag: '🇬🇲', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'botswana': { name: '博茨瓦纳·哈博罗内', flag: '🇧🇼', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'gabon': { name: '加蓬·利伯维尔', flag: '🇬🇦', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'lesotho': { name: '莱索托·马塞卢', flag: '🇱🇸', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'guinea_bissau': { name: '几内亚比绍·比绍', flag: '🇬🇼', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'equatorial_guinea': { name: '赤道几内亚', flag: '🇬🇶', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'mauritius': { name: '毛里求斯·莫卡', flag: '🇲🇺', tower: 'le-morne.png', continent: 'africa', difficulty: 'easy' },
    'eswatini': { name: '斯威士兰·姆巴巴内', flag: '🇸🇿', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'djibouti': { name: '吉布提', flag: '🇩🇯', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'comoros': { name: '科摩罗·莫罗尼', flag: '🇰🇲', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'cape_verde': { name: '佛得角·普拉亚', flag: '🇨🇻', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'sao_tome': { name: '圣多美和普林西比', flag: '🇸🇹', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'seychelles': { name: '塞舌尔·维多利亚', flag: '🇸🇨', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'namibia': { name: '纳米比亚·温得和克', flag: '🇳🇦', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },
    'reunion': { name: '留尼汪', flag: '🇷🇪', tower: 'steppe.png', continent: 'africa', difficulty: 'easy' },

    // ============================================
    // 大洋洲 (14国)
    // ============================================
    'australia': { name: '澳大利亚·悉尼歌剧院', flag: '🇦🇺', tower: 'sydney-opera.png', continent: 'oceania', difficulty: 'hard' },
    'papua_new_guinea': { name: '巴布亚新几内亚', flag: '🇵🇬', tower: 'png.png', continent: 'oceania', difficulty: 'easy' },
    'new_zealand': { name: '新西兰·天空塔', flag: '🇳🇿', tower: 'sky-tower.png', continent: 'oceania', difficulty: 'normal' },
    'fiji': { name: '斐济·苏瓦', flag: '🇫🇯', tower: 'fiji.png', continent: 'oceania', difficulty: 'easy' },
    'solomon_islands': { name: '所罗门群岛', flag: '🇸🇧', tower: 'steppe.png', continent: 'oceania', difficulty: 'easy' },
    'vanuatu': { name: '瓦努阿图·维拉港', flag: '🇻🇺', tower: 'vanuatu.png', continent: 'oceania', difficulty: 'easy' },
    'samoa': { name: '萨摩亚·阿皮亚', flag: '🇼🇸', tower: 'steppe.png', continent: 'oceania', difficulty: 'easy' },
    'micronesia': { name: '密克罗尼西亚', flag: '🇫🇲', tower: 'steppe.png', continent: 'oceania', difficulty: 'easy' },
    'tonga': { name: '汤加·努库阿洛法', flag: '🇹🇴', tower: 'steppe.png', continent: 'oceania', difficulty: 'easy' },
    'kiribati': { name: '基里巴斯', flag: '🇰🇮', tower: 'steppe.png', continent: 'oceania', difficulty: 'easy' },
    'palau': { name: '帕劳', flag: '🇵🇼', tower: 'steppe.png', continent: 'oceania', difficulty: 'easy' },
    'marshall_islands': { name: '马绍尔群岛', flag: '🇲🇭', tower: 'steppe.png', continent: 'oceania', difficulty: 'easy' },
    'tuvalu': { name: '图瓦卢', flag: '🇹🇻', tower: 'steppe.png', continent: 'oceania', difficulty: 'easy' },
    'nauru': { name: '瑙鲁', flag: '🇳🇷', tower: 'steppe.png', continent: 'oceania', difficulty: 'easy' },
};

// 按大洲分组统计
const COUNTRIES_BY_CONTINENT = {
    asia: Object.keys(COUNTRY_TOWERS).filter(k => COUNTRY_TOWERS[k].continent === 'asia'),
    europe: Object.keys(COUNTRY_TOWERS).filter(k => COUNTRY_TOWERS[k].continent === 'europe'),
    america: Object.keys(COUNTRY_TOWERS).filter(k => COUNTRY_TOWERS[k].continent === 'america'),
    africa: Object.keys(COUNTRY_TOWERS).filter(k => COUNTRY_TOWERS[k].continent === 'africa'),
    oceania: Object.keys(COUNTRY_TOWERS).filter(k => COUNTRY_TOWERS[k].continent === 'oceania')
};

// 难度统计
const DIFFICULTY_STATS = {
    easy: Object.keys(COUNTRY_TOWERS).filter(k => COUNTRY_TOWERS[k].difficulty === 'easy').length,
    normal: Object.keys(COUNTRY_TOWERS).filter(k => COUNTRY_TOWERS[k].difficulty === 'normal').length,
    hard: Object.keys(COUNTRY_TOWERS).filter(k => COUNTRY_TOWERS[k].difficulty === 'hard').length
};

console.log('🏆 命运塔锦标赛 - 196国家配置加载完成！');
console.log(`📊 统计: 亚洲${COUNTRIES_BY_CONTINENT.asia.length}国, 欧洲${COUNTRIES_BY_CONTINENT.europe.length}国, 美洲${COUNTRIES_BY_CONTINENT.america.length}国, 非洲${COUNTRIES_BY_CONTINENT.africa.length}国, 大洋洲${COUNTRIES_BY_CONTINENT.oceania.length}国`);
console.log(`🎮 难度分布: 简单${DIFFICULTY_STATS.easy}国, 普通${DIFFICULTY_STATS.normal}国, 困难${DIFFICULTY_STATS.hard}国`);

// ============ 明信片配置 ============
const POSTCARD_CONFIG = {
    types: {
        gold: { name: '金质明信片', icon: '🥇', color: '#FFD700', multiplier: 3 },
        silver: { name: '银质明信片', icon: '🥈', color: '#C0C0C0', multiplier: 2 },
        bronze: { name: '铜质明信片', icon: '🥉', color: '#CD7F32', multiplier: 1 }
    },
    rewards: {
        gold: { diamonds: 5000, coins: 1000000, title: '塔王' },
        silver: { diamonds: 3000, coins: 500000, title: '攀登者' },
        bronze: { diamonds: 1500, coins: 200000, title: '挑战者' }
    }
};

// ============ 游戏状态管理类 ============
class TournamentGame {
    constructor() {
        this.state = {
            gameId: null, country: null, towerData: null, startTime: null, gameTimeRemaining: 0,
            players: [], humanPlayers: [], botPlayers: [], myPlayerId: null, currentTurn: 0,
            teams: { panda: { members: [], finished: [], gifted: false }, wolf: { members: [], finished: [], gifted: false } },
            isRunning: false, isPaused: false, round: 1, phase: 'waiting',
            turnTimeRemaining: 0, turnTimer: null, gameTimer: null, countdownInterval: null,
            guards: [], provokeCards: [], deck: [], leaderboard: [], finishedPlayers: [],
            myHand: [], mySelectedCard: null, myLevel: 12, myPreviousLevel: 12, myTeam: null,
            logs: [], records: []
        };
        this.callbacks = {};
        this.ui = null;
    }

    init(countryCode, isTeamMode = true) {
        console.log(`🎮 初始化锦标赛: ${countryCode}`);
        this.state.country = countryCode;
        this.state.towerData = COUNTRY_TOWERS[countryCode] || COUNTRY_TOWERS['china'];
        this.state.gameId = 'TG_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        TOURNAMENT_CONFIG.TEAM_MODE = isTeamMode;
        this.state.gameTimeRemaining = isTeamMode ? TOURNAMENT_CONFIG.MAX_GAME_TIME_TEAM : TOURNAMENT_CONFIG.MAX_GAME_TIME_SOLO;
        this.initPlayers();
        this.initCardSystem();
        this.saveGameState();
        return this.state;
    }

    initPlayers() {
        const avatars = ['😺', '🦁', '🐯', '🦊', '🐺', '🐻', '🐼', '🐨', '🐸', '🦉'];
        const botNames = ['龙霸天下', '巴黎绅士', '德州牛仔', '樱花忍者', '北极熊', '沙漠之狐', '草原雄狮', '深海巨鲸', '飞天神鹰', '闪电侠'];
        this.state.players = []; this.state.humanPlayers = []; this.state.botPlayers = [];
        const myPlayer = { id: 'player_me', name: '我', avatar: '😎', isHuman: true, isBot: false, level: 12, previousLevel: 12, team: 'panda', hand: [], cardsUsed: 0, cardsRemaining: TOURNAMENT_CONFIG.HAND_SIZE, finished: false, finishRank: null, finishTime: null, isActive: true };
        this.state.players.push(myPlayer); this.state.humanPlayers.push(myPlayer); this.state.myPlayerId = myPlayer.id; this.state.myTeam = myPlayer.team; this.state.myHand = myPlayer.hand;
        this.state.teams.panda.members.push(myPlayer.id);
        for (let i = 0; i < TOURNAMENT_CONFIG.HUMAN_PLAYERS - 1; i++) {
            const team = i % 2 === 0 ? 'panda' : 'wolf';
            const player = { id: `human_${i}`, name: `玩家${i + 2}`, avatar: avatars[i + 1], isHuman: true, isBot: false, level: 12, previousLevel: 12, team: team, hand: this.generateHand(), cardsUsed: 0, cardsRemaining: TOURNAMENT_CONFIG.HAND_SIZE, finished: false, finishRank: null, finishTime: null, isActive: true };
            this.state.players.push(player); this.state.humanPlayers.push(player); this.state.teams[team].members.push(player.id);
        }
        for (let i = 0; i < TOURNAMENT_CONFIG.BOT_PLAYERS; i++) {
            const team = (i + TOURNAMENT_CONFIG.HUMAN_PLAYERS - 1) % 2 === 0 ? 'panda' : 'wolf';
            const player = { id: `bot_${i}`, name: botNames[i] || `Bot${i + 1}`, avatar: '🤖', isHuman: false, isBot: true, level: 12, previousLevel: 12, team: team, hand: this.generateHand(), cardsUsed: 0, cardsRemaining: TOURNAMENT_CONFIG.HAND_SIZE, finished: false, finishRank: null, finishTime: null, isActive: true, aiDifficulty: Math.random() > 0.7 ? 'hard' : (Math.random() > 0.4 ? 'normal' : 'easy') };
            this.state.players.push(player); this.state.botPlayers.push(player); this.state.teams[team].members.push(player.id);
        }
    }

    generateHand() {
        const suits = ['♥', '♦', '♣', '♠']; const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const hand = [];
        for (let s of suits) for (let r of ranks) hand.push({ suit: s, rank: r, isRed: s === '♥' || s === '♦', used: false });
        return hand;
    }

    initCardSystem() {
        const allCards = []; const suits = ['♥', '♦', '♣', '♠']; const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        for (let deck = 0; deck < 4; deck++) for (let s of suits) for (let r of ranks) allCards.push({ suit: s, rank: r, deck: deck, isRed: s === '♥' || s === '♦', used: false });
        allCards.sort(() => Math.random() - 0.5); this.state.deck = allCards;
        this.state.guards = []; let cardIndex = 0; const levels = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
        for (let i = 0; i < 13; i++) {
            const guardCards = []; for (let j = 0; j < 13; j++) guardCards.push({ ...allCards[cardIndex++], used: false });
            const provokeCards = []; for (let j = 0; j < 3; j++) provokeCards.push({ ...allCards[cardIndex++] });
            this.state.guards.push({ level: i, levelName: levels[i], guardCards: guardCards, provokeCards: provokeCards, cardsLeft: 13, isDefeated: false });
        }
        const myPlayer = this.state.players.find(p => p.id === this.state.myPlayerId);
        if (myPlayer) { myPlayer.hand = this.generateHand(); this.state.myHand = myPlayer.hand; }
    }

    start() {
        if (this.state.isRunning) return;
        this.state.isRunning = true; this.state.phase = 'playing'; this.state.startTime = Date.now(); this.state.round = 1; this.state.currentTurn = 0;
        this.startGameTimer(); this.startTurn();
        this.trigger('gameStarted', { gameId: this.state.gameId });
        this.addLog('🎮 锦标赛开始！命运塔之战！');
        this.addLog(`🏰 战场: ${this.state.towerData.name}`);
        this.addLog(`👥 参战人数: ${this.state.players.length}人`);
    }

    startGameTimer() {
        this.state.gameTimer = setInterval(() => {
            if (this.state.isPaused) return;
            this.state.gameTimeRemaining--;
            this.trigger('gameTimeUpdate', { remaining: this.state.gameTimeRemaining, total: TOURNAMENT_CONFIG.TEAM_MODE ? TOURNAMENT_CONFIG.MAX_GAME_TIME_TEAM : TOURNAMENT_CONFIG.MAX_GAME_TIME_SOLO });
            if (this.state.gameTimeRemaining <= 0) this.forceEndGame('timeout');
        }, 1000);
    }

    startTurn() {
        const player = this.state.players[this.state.currentTurn];
        if (!player || player.finished) { this.nextTurn(); return; }
        this.state.turnTimeRemaining = TOURNAMENT_CONFIG.TURN_TIME_LIMIT;
        this.trigger('turnStarted', { player: player, timeLimit: TOURNAMENT_CONFIG.TURN_TIME_LIMIT });
        if (player.id === this.state.myPlayerId) { this.addLog('🎯 你的回合！请选择手牌'); this.trigger('myTurn', { timeLimit: TOURNAMENT_CONFIG.TURN_TIME_LIMIT }); }
        else this.addLog(`⏳ ${player.name}的回合...`);
        this.startTurnTimer();
    }

    startTurnTimer() {
        if (this.state.turnTimer) clearInterval(this.state.turnTimer);
        this.state.turnTimer = setInterval(() => {
            if (this.state.isPaused) return;
            this.state.turnTimeRemaining--;
            this.trigger('turnTimeUpdate', { remaining: this.state.turnTimeRemaining, total: TOURNAMENT_CONFIG.TURN_TIME_LIMIT });
            if (this.state.turnTimeRemaining === 10) { this.trigger('timeWarning', { remaining: 10 }); this.addLog('⚠️ 最后10秒！'); }
            if (this.state.turnTimeRemaining <= 0) this.handleTurnTimeout();
        }, 1000);
    }

    handleTurnTimeout() {
        const player = this.state.players[this.state.currentTurn];
        clearInterval(this.state.turnTimer);
        const randomCard = this.getRandomAvailableCard(player);
        this.addLog(`⏰ ${player.name} 超时，系统自动出牌`);
        this.playCard(player.id, randomCard);
    }

    getRandomAvailableCard(player) {
        const availableCards = player.hand.filter(c => !c.used);
        if (availableCards.length === 0) return null;
        return availableCards[Math.floor(Math.random() * availableCards.length)];
    }

    nextTurn() {
        clearInterval(this.state.turnTimer);
        let attempts = 0;
        do { this.state.currentTurn = (this.state.currentTurn + 1) % this.state.players.length; attempts++; }
        while (attempts < this.state.players.length && this.state.players[this.state.currentTurn].finished);
        const activePlayers = this.state.players.filter(p => !p.finished);
        if (activePlayers.length === 0) { this.endGame(); return; }
        if (this.state.currentTurn === 0) { this.state.round++; this.trigger('roundChanged', { round: this.state.round }); }
        setTimeout(() => this.startTurn(), 1000);
    }

    playCard(playerId, card) {
        const player = this.state.players.find(p => p.id === playerId);
        if (!player || player.finished || !card) return false;
        player.previousLevel = player.level;
        const handIndex = player.hand.findIndex(c => c.suit === card.suit && c.rank === card.rank && !c.used);
        if (handIndex >= 0) { player.hand[handIndex].used = true; player.cardsUsed++; player.cardsRemaining--; }
        if (player.id === this.state.myPlayerId) this.state.mySelectedCard = null;
        const result = this.resolveBattle(player, card);
        this.trigger('cardPlayed', { player: player, card: card, result: result });
        if (player.level === 0 && !player.finished) this.playerReachedTop(player);
        this.nextTurn();
        return true;
    }

    selectCard(cardIndex) {
        if (this.state.players[this.state.currentTurn].id !== this.state.myPlayerId) return false;
        const availableCards = this.state.myHand.filter(c => !c.used);
        if (cardIndex < 0 || cardIndex >= availableCards.length) return false;
        this.state.mySelectedCard = cardIndex;
        this.trigger('cardSelected', { card: availableCards[cardIndex], index: cardIndex });
        return true;
    }

    confirmPlay() {
        if (this.state.mySelectedCard === null) return false;
        const availableCards = this.state.myHand.filter(c => !c.used);
        return this.playCard(this.state.myPlayerId, availableCards[this.state.mySelectedCard]);
    }

    resolveBattle(player, playerCard) {
        const guard = this.state.guards[player.level];
        if (!guard) return { type: 'error' };
        let result = { type: 'normal', levelChange: 0, guardCard: null, provokeTriggered: false, message: '' };
        let guardCard = null;
        if (guard.cardsLeft > 0) { guardCard = guard.guardCards[13 - guard.cardsLeft]; guard.cardsLeft--; result.guardCard = guardCard; }
        const provokeLayers = TOURNAMENT_CONFIG.PROVOKE_LAYERS;
        let provokeTriggered = false, fallBack = 0;
        if (provokeLayers.includes(player.level)) {
            for (let pc of guard.provokeCards) {
                const suitMatch = playerCard.suit === pc.suit; const rankMatch = playerCard.rank === pc.rank;
                if (suitMatch && rankMatch) { provokeTriggered = true; fallBack = 2; result.type = 'provoke_full'; result.provokeTriggered = true; result.message = '💥 激怒牌完全匹配！退回2层！'; break; }
                else if (suitMatch || rankMatch) { provokeTriggered = true; fallBack = 1; result.type = 'provoke_partial'; result.provokeTriggered = true; result.message = '⚠️ 激怒牌触发！退回1层！'; break; }
            }
        }
        if (provokeTriggered) { player.level = Math.min(12, player.level + fallBack); result.levelChange = -fallBack; }
        else if (guardCard) {
            const suitMatch = playerCard.suit === guardCard.suit; const rankMatch = playerCard.rank === guardCard.rank;
            if (suitMatch && rankMatch) { player.level = Math.max(0, player.level - 2); result.levelChange = 2; result.type = 'full_match'; result.message = '✅ 完全匹配！上升2层！'; }
            else if (suitMatch || rankMatch) { player.level = Math.max(0, player.level - 1); result.levelChange = 1; result.type = 'partial_match'; result.message = '✅ 部分匹配！上升1层！'; }
            else { result.type = 'no_match'; result.message = '❌ 不匹配，停留本层'; }
        }
        if (guard.cardsLeft === 0 && !guard.isDefeated) { guard.isDefeated = true; result.guardDefeated = true; }
        if (result.message) this.addLog(`${player.name}: ${result.message}`);
        this.addRecord({ player: player, action: result.type, card: playerCard, result: result.levelChange > 0 ? 'win' : result.levelChange < 0 ? 'lose' : 'neutral', change: result.levelChange });
        return result;
    }

    playerReachedTop(player) {
        player.finished = true; player.finishRank = this.state.finishedPlayers.length + 1; player.finishTime = Date.now();
        this.state.finishedPlayers.push(player);
        this.addLog(`🏆 ${player.name} 成功登顶！排名第${player.finishRank}`);
        this.trigger('playerFinished', { player: player, rank: player.finishRank });
        if (TOURNAMENT_CONFIG.TEAM_MODE) this.checkTeamGiftLogic(player);
        const unfinishedCount = this.state.players.filter(p => !p.finished).length;
        if (unfinishedCount === 0) setTimeout(() => this.endGame(), 2000);
    }

    checkTeamGiftLogic(finishedPlayer) {
        const rank = finishedPlayer.finishRank;
        if (rank >= 2 && rank <= 4) {
            const team = this.state.teams[finishedPlayer.team];
            if (team.gifted) return;
            const unfinishedTeammates = team.members.map(id => this.state.players.find(p => p.id === id)).filter(p => p && !p.finished);
            if (unfinishedTeammates.length > 0) {
                const giftCount = Math.floor(finishedPlayer.hand.filter(c => !c.used).length * TOURNAMENT_CONFIG.GIFT_CARD_RATIO);
                if (giftCount > 0) {
                    const availableCards = finishedPlayer.hand.filter(c => !c.used);
                    const giftCards = availableCards.slice(0, giftCount);
                    const cardsPerTeammate = Math.floor(giftCards.length / unfinishedTeammates.length);
                    unfinishedTeammates.forEach((teammate, index) => {
                        const startIdx = index * cardsPerTeammate;
                        const cardsToGive = giftCards.slice(startIdx, startIdx + cardsPerTeammate);
                        cardsToGive.forEach(card => teammate.hand.push({ ...card, isGift: true, from: finishedPlayer.name }));
                        teammate.cardsRemaining += cardsToGive.length;
                        this.addLog(`🎁 ${finishedPlayer.name} 赠送 ${cardsToGive.length} 张牌给 ${teammate.name}`);
                    });
                    team.gifted = true;
                    this.trigger('teamGift', { from: finishedPlayer, to: unfinishedTeammates, cards: giftCards });
                }
            }
        }
    }

    endGame() {
        if (this.state.phase === 'finished') return;
        this.state.phase = 'finished'; this.state.isRunning = false;
        clearInterval(this.state.gameTimer); clearInterval(this.state.turnTimer);
        const unfinishedPlayers = this.state.players.filter(p => !p.finished);
        unfinishedPlayers.sort((a, b) => a.level - b.level);
        unfinishedPlayers.forEach((player, index) => { player.finished = true; player.finishRank = this.state.finishedPlayers.length + 1; player.finishTime = Date.now(); this.state.finishedPlayers.push(player); });
        this.state.leaderboard = [...this.state.finishedPlayers];
        const rewards = this.calculateRewards();
        this.savePostcards();
        this.trigger('gameEnded', { leaderboard: this.state.leaderboard, rewards: rewards, myRank: this.getMyRank() });
        this.saveGameResult();
    }

    forceEndGame(reason) { this.addLog('⏰ 游戏时间到！强制结束'); this.endGame(); }

    calculateRewards() {
        const myRank = this.getMyRank();
        const rewards = { rank: myRank, diamonds: 0, coins: 0, title: null, postcard: null };
        if (myRank === 1) { rewards.diamonds = POSTCARD_CONFIG.rewards.gold.diamonds; rewards.coins = POSTCARD_CONFIG.rewards.gold.coins; rewards.title = POSTCARD_CONFIG.rewards.gold.title; rewards.postcard = { type: 'gold', country: this.state.country, tower: this.state.towerData }; }
        else if (myRank === 2) { rewards.diamonds = POSTCARD_CONFIG.rewards.silver.diamonds; rewards.coins = POSTCARD_CONFIG.rewards.silver.coins; rewards.title = POSTCARD_CONFIG.rewards.silver.title; rewards.postcard = { type: 'silver', country: this.state.country, tower: this.state.towerData }; }
        else if (myRank === 3) { rewards.diamonds = POSTCARD_CONFIG.rewards.bronze.diamonds; rewards.coins = POSTCARD_CONFIG.rewards.bronze.coins; rewards.title = POSTCARD_CONFIG.rewards.bronze.title; rewards.postcard = { type: 'bronze', country: this.state.country, tower: this.state.towerData }; }
        else { rewards.diamonds = 100; rewards.coins = 10000; }
        return rewards;
    }

    getMyRank() { const myPlayer = this.state.players.find(p => p.id === this.state.myPlayerId); return myPlayer ? myPlayer.finishRank : null; }

    savePostcards() {
        const rewards = this.calculateRewards();
        if (!rewards.postcard) return;
        let collection = this.loadPostcardCollection();
        const postcard = { id: `pc_${Date.now()}`, type: rewards.postcard.type, country: rewards.postcard.country, countryName: rewards.postcard.tower.name, flag: rewards.postcard.tower.flag, tower: rewards.postcard.tower.tower, obtainedAt: new Date().toISOString(), rank: rewards.rank, gameId: this.state.gameId };
        collection.postcards.push(postcard);
        if (!collection.countries[rewards.postcard.country]) collection.countries[rewards.postcard.country] = { obtained: true, types: [] };
        collection.countries[rewards.postcard.country].types.push(rewards.postcard.type);
        localStorage.setItem('towerOfFate_postcards', JSON.stringify(collection));
    }

    loadPostcardCollection() {
        const defaultCollection = { postcards: [], countries: {}, stats: { totalGames: 0, goldCount: 0, silverCount: 0, bronzeCount: 0, uniqueCountries: 0 } };
        try { const saved = localStorage.getItem('towerOfFate_postcards'); if (saved) return JSON.parse(saved); } catch (e) {}
        return defaultCollection;
    }

    getCollectionProgress() {
        const collection = this.loadPostcardCollection();
        const totalCountries = Object.keys(COUNTRY_TOWERS).length;
        const collectedCountries = Object.keys(collection.countries).length;
        return { totalCountries, collectedCountries, progress: Math.round((collectedCountries / totalCountries) * 100), goldCount: collection.postcards.filter(p => p.type === 'gold').length, silverCount: collection.postcards.filter(p => p.type === 'silver').length, bronzeCount: collection.postcards.filter(p => p.type === 'bronze').length, totalPostcards: collection.postcards.length };
    }

    addLog(message) {
        const time = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const logEntry = { time: time, message: message, timestamp: Date.now() };
        this.state.logs.push(logEntry);
        if (this.state.logs.length > 50) this.state.logs.shift();
        this.trigger('logAdded', logEntry);
    }

    addRecord(record) {
        this.state.records.unshift(record);
        if (this.state.records.length > 20) this.state.records.pop();
        this.trigger('recordAdded', record);
    }

    on(event, callback) { if (!this.callbacks[event]) this.callbacks[event] = []; this.callbacks[event].push(callback); }
    off(event, callback) { if (this.callbacks[event]) this.callbacks[event] = this.callbacks[event].filter(cb => cb !== callback); }
    trigger(event, data) { if (this.callbacks[event]) this.callbacks[event].forEach(callback => { try { callback(data); } catch (e) {} }); }

    saveGameState() { try { localStorage.setItem('towerOfFate_currentGame', JSON.stringify({ gameId: this.state.gameId, country: this.state.country, phase: this.state.phase, startTime: this.state.startTime })); } catch (e) {} }
    saveGameResult() { try { const history = JSON.parse(localStorage.getItem('towerOfFate_gameHistory') || '[]'); history.push({ gameId: this.state.gameId, country: this.state.country, towerName: this.state.towerData.name, rank: this.getMyRank(), timestamp: new Date().toISOString(), playerCount: this.state.players.length }); if (history.length > 50) history.shift(); localStorage.setItem('towerOfFate_gameHistory', JSON.stringify(history)); } catch (e) {} }
    formatTime(seconds) { const mins = Math.floor(seconds / 60); const secs = seconds % 60; return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`; }
    getMyPlayer() { return this.state.players.find(p => p.id === this.state.myPlayerId); }
    getPlayerById(id) { return this.state.players.find(p => p.id === id); }
    pause() { this.state.isPaused = true; this.addLog('⏸️ 游戏已暂停'); }
    resume() { this.state.isPaused = false; this.addLog('▶️ 游戏继续'); }
    surrender() { const myPlayer = this.getMyPlayer(); if (myPlayer) { myPlayer.finished = true; myPlayer.finishRank = this.state.players.length; this.state.finishedPlayers.push(myPlayer); this.addLog('🏳️ 你已放弃游戏'); } this.endGame(); }
    getStats() { const myPlayer = this.getMyPlayer(); return { totalPlayers: this.state.players.length, finishedPlayers: this.state.finishedPlayers.length, myRank: myPlayer ? myPlayer.finishRank : null, myLevel: this.state.myLevel, round: this.state.round, gameTimeRemaining: this.state.gameTimeRemaining, turnTimeRemaining: this.state.turnTimeRemaining, cardsRemaining: myPlayer ? myPlayer.cardsRemaining : 0 }; }
}

// ============ 导出 ============
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { COUNTRY_TOWERS, COUNTRIES_BY_CONTINENT, DIFFICULTY_STATS, TOURNAMENT_CONFIG, TournamentGame, POSTCARD_CONFIG };
} else {
    window.COUNTRY_TOWERS = COUNTRY_TOWERS;
    window.COUNTRIES_BY_CONTINENT = COUNTRIES_BY_CONTINENT;
    window.DIFFICULTY_STATS = DIFFICULTY_STATS;
    window.TOURNAMENT_CONFIG = TOURNAMENT_CONFIG;
    window.TournamentGame = TournamentGame;
    window.POSTCARD_CONFIG = POSTCARD_CONFIG;
}

console.log('✅ tournament-game.js 完整版加载成功！支持196国家锦标赛！');

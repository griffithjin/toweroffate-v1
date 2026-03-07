/**
 * 命运塔锦标赛完整游戏逻辑
 * Tournament Game Logic for Tower of Fate
 * 
 * 功能包括：
 * 1. 10人锦标赛（真人+Bot）同时对战
 * 2. 30秒出牌倒计时，超时自动随机出牌
 * 3. 整局游戏时间限制（26-30分钟）
 * 4. 团队战赠牌逻辑
 * 5. 游戏结束逻辑与排名结算
 * 6. 明信片奖励系统
 * 7. 明信片收集册
 */

// ============ 游戏配置 ============
const TOURNAMENT_CONFIG = {
    // 玩家配置
    MAX_PLAYERS: 10,
    HUMAN_PLAYERS: 3,  // 初始真人玩家数
    BOT_PLAYERS: 7,    // Bot玩家数
    
    // 时间配置
    TURN_TIME_LIMIT: 30,        // 每回合30秒
    MAX_GAME_TIME_SOLO: 1560,   // 单人模式：52张×30秒=1560秒（26分钟）
    MAX_GAME_TIME_TEAM: 1800,   // 团队模式：60张×30秒=1800秒（30分钟）
    
    // 游戏配置
    DECKS_COUNT: 4,             // 4副牌
    TOTAL_CARDS: 208,           // 4×52=208张
    HAND_SIZE: 52,              // 每人手牌数
    TEAM_MODE: true,            // 默认团队模式
    
    // 激怒层配置
    PROVOKE_LAYERS: [2, 5, 8],  // Q层, 9层, 6层（从0开始索引）
    
    // 赠牌配置
    GIFT_CARD_RATIO: 1/3,       // 赠牌比例（1/3手牌）
    GIFT_RANKS: [2, 3, 4],      // 第2-4名登顶后触发赠牌
};

// ============ 国家塔楼数据 ============
const COUNTRY_TOWERS = {
    // 亚洲
    'china': {
        name: '中国·东方明珠',
        flag: '🇨🇳',
        tower: 'oriental-pearl.png',
        continent: 'asia',
        difficulty: 'normal'
    },
    'japan': {
        name: '日本·东京塔',
        flag: '🇯🇵',
        tower: 'tokyo-tower.png',
        continent: 'asia',
        difficulty: 'normal'
    },
    'south_korea': {
        name: '韩国·N首尔塔',
        flag: '🇰🇷',
        tower: 'n-seoul-tower.png',
        continent: 'asia',
        difficulty: 'normal'
    },
    'india': {
        name: '印度·印度门',
        flag: '🇮🇳',
        tower: 'india-gate.png',
        continent: 'asia',
        difficulty: 'hard'
    },
    'thailand': {
        name: '泰国·郑王庙',
        flag: '🇹🇭',
        tower: 'wat-arun.png',
        continent: 'asia',
        difficulty: 'easy'
    },
    
    // 欧洲
    'france': {
        name: '法国·埃菲尔铁塔',
        flag: '🇫🇷',
        tower: 'eiffel-tower.png',
        continent: 'europe',
        difficulty: 'normal'
    },
    'italy': {
        name: '意大利·比萨斜塔',
        flag: '🇮🇹',
        tower: 'pisa-tower.png',
        continent: 'europe',
        difficulty: 'easy'
    },
    'uk': {
        name: '英国·大本钟',
        flag: '🇬🇧',
        tower: 'big-ben.png',
        continent: 'europe',
        difficulty: 'normal'
    },
    'germany': {
        name: '德国·科隆大教堂',
        flag: '🇩🇪',
        tower: 'cologne-cathedral.png',
        continent: 'europe',
        difficulty: 'hard'
    },
    'russia': {
        name: '俄罗斯·克里姆林宫',
        flag: '🇷🇺',
        tower: 'kremlin.png',
        continent: 'europe',
        difficulty: 'hard'
    },
    
    // 美洲
    'usa': {
        name: '美国·自由女神像',
        flag: '🇺🇸',
        tower: 'statue-of-liberty.png',
        continent: 'america',
        difficulty: 'normal'
    },
    'brazil': {
        name: '巴西·基督像',
        flag: '🇧🇷',
        tower: 'christ-redeemer.png',
        continent: 'america',
        difficulty: 'normal'
    },
    'canada': {
        name: '加拿大·CN塔',
        flag: '🇨🇦',
        tower: 'cn-tower.png',
        continent: 'america',
        difficulty: 'easy'
    },
    'mexico': {
        name: '墨西哥·玛雅金字塔',
        flag: '🇲🇽',
        tower: 'chichen-itza.png',
        continent: 'america',
        difficulty: 'hard'
    },
    
    // 非洲
    'egypt': {
        name: '埃及·金字塔',
        flag: '🇪🇬',
        tower: 'pyramid.png',
        continent: 'africa',
        difficulty: 'hard'
    },
    'south_africa': {
        name: '南非·桌山',
        flag: '🇿🇦',
        tower: 'table-mountain.png',
        continent: 'africa',
        difficulty: 'normal'
    },
    'morocco': {
        name: '摩洛哥·哈桑塔',
        flag: '🇲🇦',
        tower: 'hassan-tower.png',
        continent: 'africa',
        difficulty: 'easy'
    },
    
    // 大洋洲
    'australia': {
        name: '澳大利亚·悉尼歌剧院',
        flag: '🇦🇺',
        tower: 'sydney-opera.png',
        continent: 'oceania',
        difficulty: 'normal'
    },
    'new_zealand': {
        name: '新西兰·天空塔',
        flag: '🇳🇿',
        tower: 'sky-tower.png',
        continent: 'oceania',
        difficulty: 'easy'
    }
};

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

// ============ 游戏状态管理 ============
class TournamentGame {
    constructor() {
        this.state = {
            // 游戏基本信息
            gameId: null,
            country: null,
            towerData: null,
            startTime: null,
            gameTimeRemaining: 0,
            
            // 玩家信息
            players: [],
            humanPlayers: [],
            botPlayers: [],
            myPlayerId: null,
            currentTurn: 0,
            
            // 团队信息
            teams: {
                panda: { members: [], finished: [], gifted: false },
                wolf: { members: [], finished: [], gifted: false }
            },
            
            // 游戏状态
            isRunning: false,
            isPaused: false,
            round: 1,
            phase: 'waiting', // waiting, playing, finished
            
            // 时间控制
            turnTimeRemaining: 0,
            turnTimer: null,
            gameTimer: null,
            countdownInterval: null,
            
            // 卡牌系统
            guards: [],
            provokeCards: [],
            deck: [],
            
            // 排行榜
            leaderboard: [],
            finishedPlayers: [],
            
            // 我的状态
            myHand: [],
            mySelectedCard: null,
            myLevel: 12, // 从第2层开始（索引12）
            myPreviousLevel: 12,
            myTeam: null,
            
            // 日志
            logs: [],
            records: []
        };
        
        this.callbacks = {};
        this.ui = null;
    }
    
    // ============ 初始化游戏 ============
    init(countryCode, isTeamMode = true) {
        console.log(`🎮 初始化锦标赛: ${countryCode}, 团队模式: ${isTeamMode}`);
        
        // 设置国家和塔楼
        this.state.country = countryCode;
        this.state.towerData = COUNTRY_TOWERS[countryCode] || COUNTRY_TOWERS['china'];
        this.state.gameId = this.generateGameId();
        
        // 设置游戏模式
        TOURNAMENT_CONFIG.TEAM_MODE = isTeamMode;
        this.state.gameTimeRemaining = isTeamMode ? 
            TOURNAMENT_CONFIG.MAX_GAME_TIME_TEAM : 
            TOURNAMENT_CONFIG.MAX_GAME_TIME_SOLO;
        
        // 初始化玩家
        this.initPlayers();
        
        // 初始化卡牌系统
        this.initCardSystem();
        
        // 初始化UI
        this.initUI();
        
        // 保存到本地存储
        this.saveGameState();
        
        console.log('✅ 游戏初始化完成');
        return this.state;
    }
    
    // 生成游戏ID
    generateGameId() {
        return 'TG_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    // ============ 初始化玩家 ============
    initPlayers() {
        const avatars = ['😺', '🦁', '🐯', '🦊', '🐺', '🐻', '🐼', '🐨', '🐸', '🦉'];
        const botNames = [
            '龙霸天下', '巴黎绅士', '德州牛仔', '樱花忍者', '北极熊',
            '沙漠之狐', '草原雄狮', '深海巨鲸', '飞天神鹰', '闪电侠'
        ];
        
        this.state.players = [];
        this.state.humanPlayers = [];
        this.state.botPlayers = [];
        
        // 创建玩家自己
        const myPlayer = {
            id: 'player_me',
            name: '我',
            avatar: '😎',
            isHuman: true,
            isBot: false,
            level: 12,
            previousLevel: 12,
            team: 'panda',
            hand: [],
            cardsUsed: 0,
            cardsRemaining: TOURNAMENT_CONFIG.HAND_SIZE,
            finished: false,
            finishRank: null,
            finishTime: null,
            isActive: true
        };
        
        this.state.players.push(myPlayer);
        this.state.humanPlayers.push(myPlayer);
        this.state.myPlayerId = myPlayer.id;
        this.state.myTeam = myPlayer.team;
        this.state.myHand = myPlayer.hand;
        this.state.myLevel = myPlayer.level;
        
        // 分配团队
        this.state.teams.panda.members.push(myPlayer.id);
        
        // 创建其他人类玩家（模拟）
        const humanCount = TOURNAMENT_CONFIG.HUMAN_PLAYERS - 1;
        for (let i = 0; i < humanCount; i++) {
            const team = i % 2 === 0 ? 'panda' : 'wolf';
            const player = {
                id: `human_${i}`,
                name: `玩家${i + 2}`,
                avatar: avatars[i + 1],
                isHuman: true,
                isBot: false,
                level: 12,
                previousLevel: 12,
                team: team,
                hand: this.generateHand(),
                cardsUsed: 0,
                cardsRemaining: TOURNAMENT_CONFIG.HAND_SIZE,
                finished: false,
                finishRank: null,
                finishTime: null,
                isActive: true
            };
            
            this.state.players.push(player);
            this.state.humanPlayers.push(player);
            this.state.teams[team].members.push(player.id);
        }
        
        // 创建Bot玩家
        const botCount = TOURNAMENT_CONFIG.BOT_PLAYERS;
        for (let i = 0; i < botCount; i++) {
            const team = (i + humanCount) % 2 === 0 ? 'panda' : 'wolf';
            const player = {
                id: `bot_${i}`,
                name: botNames[i] || `Bot${i + 1}`,
                avatar: '🤖',
                isHuman: false,
                isBot: true,
                level: 12,
                previousLevel: 12,
                team: team,
                hand: this.generateHand(),
                cardsUsed: 0,
                cardsRemaining: TOURNAMENT_CONFIG.HAND_SIZE,
                finished: false,
                finishRank: null,
                finishTime: null,
                isActive: true,
                aiDifficulty: Math.random() > 0.7 ? 'hard' : (Math.random() > 0.4 ? 'normal' : 'easy')
            };
            
            this.state.players.push(player);
            this.state.botPlayers.push(player);
            this.state.teams[team].members.push(player.id);
        }
        
        console.log(`👥 玩家初始化完成: ${this.state.players.length}人`);
        console.log(`  - 真人: ${this.state.humanPlayers.length}`);
        console.log(`  - Bot: ${this.state.botPlayers.length}`);
        console.log(`  - 熊猫队: ${this.state.teams.panda.members.length}人`);
        console.log(`  - 战狼队: ${this.state.teams.wolf.members.length}人`);
    }
    
    // 生成手牌
    generateHand() {
        const suits = ['♥', '♦', '♣', '♠'];
        const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const hand = [];
        
        for (let s of suits) {
            for (let r of ranks) {
                hand.push({
                    suit: s,
                    rank: r,
                    isRed: s === '♥' || s === '♦',
                    used: false
                });
            }
        }
        
        return hand;
    }
    
    // ============ 初始化卡牌系统 ============
    initCardSystem() {
        // 生成完整的208张牌（4副）
        const allCards = [];
        const suits = ['♥', '♦', '♣', '♠'];
        const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        
        for (let deck = 0; deck < 4; deck++) {
            for (let s of suits) {
                for (let r of ranks) {
                    allCards.push({
                        suit: s,
                        rank: r,
                        deck: deck,
                        isRed: s === '♥' || s === '♦',
                        used: false
                    });
                }
            }
        }
        
        // 洗牌
        allCards.sort(() => Math.random() - 0.5);
        this.state.deck = allCards;
        
        // 生成13层守卫
        this.state.guards = [];
        let cardIndex = 0;
        const levels = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
        
        for (let i = 0; i < 13; i++) {
            // 守卫抽13张牌（隐藏）
            const guardCards = [];
            for (let j = 0; j < 13; j++) {
                guardCards.push({ ...allCards[cardIndex++], used: false });
            }
            
            // 守卫的3张激怒牌（明牌）
            const provokeCards = [];
            for (let j = 0; j < 3; j++) {
                provokeCards.push({ ...allCards[cardIndex++] });
            }
            
            this.state.guards.push({
                level: i,
                levelName: levels[i],
                guardCards: guardCards,
                provokeCards: provokeCards,
                cardsLeft: 13,
                isDefeated: false
            });
        }
        
        // 给玩家自己发牌
        const myPlayer = this.state.players.find(p => p.id === this.state.myPlayerId);
        if (myPlayer) {
            myPlayer.hand = this.generateHand();
            this.state.myHand = myPlayer.hand;
        }
        
        console.log('🃏 卡牌系统初始化完成');
    }
    
    // ============ 初始化UI ============
    initUI() {
        // UI初始化将由外部调用
        console.log('🎨 UI初始化准备就绪');
    }
    
    // ============ 游戏开始 ============
    start() {
        if (this.state.isRunning) {
            console.warn('游戏已经在运行中');
            return;
        }
        
        console.log('🚀 游戏开始！');
        this.state.isRunning = true;
        this.state.phase = 'playing';
        this.state.startTime = Date.now();
        this.state.round = 1;
        this.state.currentTurn = 0;
        
        // 启动游戏计时器
        this.startGameTimer();
        
        // 开始第一回合
        this.startTurn();
        
        // 触发回调
        this.trigger('gameStarted', { gameId: this.state.gameId });
        
        // 添加日志
        this.addLog('🎮 锦标赛开始！命运塔之战！');
        this.addLog(`🏰 战场: ${this.state.towerData.name}`);
        this.addLog(`👥 参战人数: ${this.state.players.length}人`);
        this.addLog('💡 提示: 匹配守卫牌上升，避开激怒牌！');
    }
    
    // ============ 游戏计时器 ============
    startGameTimer() {
        // 整局游戏倒计时
        this.state.gameTimer = setInterval(() => {
            if (this.state.isPaused) return;
            
            this.state.gameTimeRemaining--;
            
            // 触发时间更新回调
            this.trigger('gameTimeUpdate', {
                remaining: this.state.gameTimeRemaining,
                total: TOURNAMENT_CONFIG.TEAM_MODE ? 
                    TOURNAMENT_CONFIG.MAX_GAME_TIME_TEAM : 
                    TOURNAMENT_CONFIG.MAX_GAME_TIME_SOLO
            });
            
            // 检查游戏超时
            if (this.state.gameTimeRemaining <= 0) {
                this.forceEndGame('timeout');
            }
        }, 1000);
    }
    
    // ============ 回合系统 ============
    startTurn() {
        const player = this.state.players[this.state.currentTurn];
        if (!player || player.finished) {
            this.nextTurn();
            return;
        }
        
        console.log(`🎯 回合开始: ${player.name}`);
        
        // 重置回合时间
        this.state.turnTimeRemaining = TOURNAMENT_CONFIG.TURN_TIME_LIMIT;
        
        // 更新UI
        this.trigger('turnStarted', {
            player: player,
            timeLimit: TOURNAMENT_CONFIG.TURN_TIME_LIMIT
        });
        
        // 如果是玩家自己
        if (player.id === this.state.myPlayerId) {
            this.addLog('🎯 你的回合！请选择手牌');
            this.trigger('myTurn', { timeLimit: TOURNAMENT_CONFIG.TURN_TIME_LIMIT });
        } else {
            this.addLog(`⏳ ${player.name}的回合...`);
        }
        
        // 启动回合倒计时
        this.startTurnTimer();
    }
    
    startTurnTimer() {
        // 清除之前的计时器
        if (this.state.turnTimer) {
            clearInterval(this.state.turnTimer);
        }
        
        this.state.turnTimer = setInterval(() => {
            if (this.state.isPaused) return;
            
            this.state.turnTimeRemaining--;
            
            // 触发倒计时回调
            this.trigger('turnTimeUpdate', {
                remaining: this.state.turnTimeRemaining,
                total: TOURNAMENT_CONFIG.TURN_TIME_LIMIT
            });
            
            // 时间警告
            if (this.state.turnTimeRemaining === 10) {
                this.trigger('timeWarning', { remaining: 10 });
                this.addLog('⚠️ 最后10秒！');
            }
            
            // 超时处理
            if (this.state.turnTimeRemaining <= 0) {
                this.handleTurnTimeout();
            }
        }, 1000);
    }
    
    // 回合超时处理
    handleTurnTimeout() {
        const player = this.state.players[this.state.currentTurn];
        console.log(`⏰ ${player.name} 回合超时`);
        
        // 停止回合计时器
        clearInterval(this.state.turnTimer);
        
        // 自动随机出牌
        const randomCard = this.getRandomAvailableCard(player);
        
        this.addLog(`⏰ ${player.name} 超时，系统自动出牌`);
        
        // 执行出牌
        this.playCard(player.id, randomCard);
    }
    
    // 获取随机可用卡牌
    getRandomAvailableCard(player) {
        const availableCards = player.hand.filter(c => !c.used);
        if (availableCards.length === 0) return null;
        
        const randomIndex = Math.floor(Math.random() * availableCards.length);
        return availableCards[randomIndex];
    }
    
    // 下一回合
    nextTurn() {
        clearInterval(this.state.turnTimer);
        
        // 找到下一个未完成的玩家
        let attempts = 0;
        do {
            this.state.currentTurn = (this.state.currentTurn + 1) % this.state.players.length;
            attempts++;
        } while (
            attempts < this.state.players.length && 
            this.state.players[this.state.currentTurn].finished
        );
        
        // 检查是否所有玩家都完成
        const activePlayers = this.state.players.filter(p => !p.finished);
        if (activePlayers.length === 0) {
            this.endGame();
            return;
        }
        
        // 增加回合数（每轮10个有效回合）
        if (this.state.currentTurn === 0) {
            this.state.round++;
            this.trigger('roundChanged', { round: this.state.round });
        }
        
        // 延迟后开始下一回合
        setTimeout(() => {
            this.startTurn();
        }, 1000);
    }
    
    // ============ 出牌逻辑 ============
    playCard(playerId, card) {
        const player = this.state.players.find(p => p.id === playerId);
        if (!player || player.finished || !card) return false;
        
        console.log(`🃏 ${player.name} 出牌: ${card.suit}${card.rank}`);
        
        // 保存之前的层数
        player.previousLevel = player.level;
        
        // 标记手牌已使用
        const handIndex = player.hand.findIndex(
            c => c.suit === card.suit && c.rank === card.rank && !c.used
        );
        if (handIndex >= 0) {
            player.hand[handIndex].used = true;
            player.cardsUsed++;
            player.cardsRemaining--;
        }
        
        // 如果是玩家自己，更新手牌显示
        if (player.id === this.state.myPlayerId) {
            this.state.mySelectedCard = null;
        }
        
        // 执行战斗结算
        const result = this.resolveBattle(player, card);
        
        // 触发回调
        this.trigger('cardPlayed', {
            player: player,
            card: card,
            result: result
        });
        
        // 检查是否登顶
        if (player.level === 0 && !player.finished) {
            this.playerReachedTop(player);
        }
        
        // 进入下一回合
        this.nextTurn();
        
        return true;
    }
    
    // 玩家选择卡牌
    selectCard(cardIndex) {
        if (this.state.players[this.state.currentTurn].id !== this.state.myPlayerId) {
            return false;
        }
        
        const availableCards = this.state.myHand.filter(c => !c.used);
        if (cardIndex < 0 || cardIndex >= availableCards.length) {
            return false;
        }
        
        this.state.mySelectedCard = cardIndex;
        this.trigger('cardSelected', { 
            card: availableCards[cardIndex],
            index: cardIndex 
        });
        
        return true;
    }
    
    // 确认出牌
    confirmPlay() {
        if (this.state.mySelectedCard === null) {
            return false;
        }
        
        const availableCards = this.state.myHand.filter(c => !c.used);
        const selectedCard = availableCards[this.state.mySelectedCard];
        
        return this.playCard(this.state.myPlayerId, selectedCard);
    }
    
    // ============ 战斗结算 ============
    resolveBattle(player, playerCard) {
        const guard = this.state.guards[player.level];
        if (!guard) return { type: 'error' };
        
        let result = {
            type: 'normal',
            levelChange: 0,
            guardCard: null,
            provokeTriggered: false,
            message: ''
        };
        
        // 守卫亮出一张牌
        let guardCard = null;
        if (guard.cardsLeft > 0) {
            guardCard = guard.guardCards[13 - guard.cardsLeft];
            guard.cardsLeft--;
            result.guardCard = guardCard;
        }
        
        // 检查激怒牌
        const provokeLayers = TOURNAMENT_CONFIG.PROVOKE_LAYERS;
        let provokeTriggered = false;
        let fallBack = 0;
        
        if (provokeLayers.includes(player.level)) {
            for (let pc of guard.provokeCards) {
                const suitMatch = playerCard.suit === pc.suit;
                const rankMatch = playerCard.rank === pc.rank;
                
                if (suitMatch && rankMatch) {
                    provokeTriggered = true;
                    fallBack = 2;
                    result.type = 'provoke_full';
                    result.provokeTriggered = true;
                    result.message = '💥 激怒牌完全匹配！退回2层！';
                    break;
                } else if (suitMatch || rankMatch) {
                    provokeTriggered = true;
                    fallBack = 1;
                    result.type = 'provoke_partial';
                    result.provokeTriggered = true;
                    result.message = '⚠️ 激怒牌触发！退回1层！';
                    break;
                }
            }
        }
        
        // 计算层数变化
        if (provokeTriggered) {
            player.level = Math.min(12, player.level + fallBack);
            result.levelChange = -fallBack;
        } else if (guardCard) {
            const suitMatch = playerCard.suit === guardCard.suit;
            const rankMatch = playerCard.rank === guardCard.rank;
            
            if (suitMatch && rankMatch) {
                player.level = Math.max(0, player.level - 2);
                result.levelChange = 2;
                result.type = 'full_match';
                result.message = '✅ 完全匹配！上升2层！';
            } else if (suitMatch || rankMatch) {
                player.level = Math.max(0, player.level - 1);
                result.levelChange = 1;
                result.type = 'partial_match';
                result.message = '✅ 部分匹配！上升1层！';
            } else {
                result.type = 'no_match';
                result.message = '❌ 不匹配，停留本层';
            }
        }
        
        // 检查守卫是否被击败
        if (guard.cardsLeft === 0 && !guard.isDefeated) {
            guard.isDefeated = true;
            result.guardDefeated = true;
        }
        
        // 添加日志
        if (result.message) {
            this.addLog(`${player.name}: ${result.message}`);
        }
        
        // 添加游戏记录
        this.addRecord({
            player: player,
            action: result.type,
            card: playerCard,
            result: result.levelChange > 0 ? 'win' : result.levelChange < 0 ? 'lose' : 'neutral',
            change: result.levelChange
        });
        
        return result;
    }
    
    // ============ 登顶处理 ============
    playerReachedTop(player) {
        player.finished = true;
        player.finishRank = this.state.finishedPlayers.length + 1;
        player.finishTime = Date.now();
        
        this.state.finishedPlayers.push(player);
        
        console.log(`🏆 ${player.name} 登顶！排名第${player.finishRank}`);
        
        this.addLog(`🏆 ${player.name} 成功登顶！排名第${player.finishRank}`);
        
        // 触发回调
        this.trigger('playerFinished', {
            player: player,
            rank: player.finishRank
        });
        
        // 检查团队战赠牌逻辑
        if (TOURNAMENT_CONFIG.TEAM_MODE) {
            this.checkTeamGiftLogic(player);
        }
        
        // 检查游戏是否结束（前3名都产生）
        if (this.state.finishedPlayers.length >= 3) {
            // 可以继续游戏，但主要奖励已确定
            this.addLog('🎉 前三名已产生！');
        }
        
        // 检查是否所有玩家都完成
        const unfinishedCount = this.state.players.filter(p => !p.finished).length;
        if (unfinishedCount === 0) {
            setTimeout(() => this.endGame(), 2000);
        }
    }
    
    // ============ 团队战赠牌逻辑 ============
    checkTeamGiftLogic(finishedPlayer) {
        const rank = finishedPlayer.finishRank;
        
        // 第2-4名登顶后触发赠牌
        if (rank >= 2 && rank <= 4) {
            const team = this.state.teams[finishedPlayer.team];
            
            // 检查是否已经赠牌过
            if (team.gifted) return;
            
            // 获取未登顶的队友
            const unfinishedTeammates = team.members
                .map(id => this.state.players.find(p => p.id === id))
                .filter(p => p && !p.finished);
            
            if (unfinishedTeammates.length > 0) {
                console.log(`🎁 ${finishedPlayer.team}队赠牌触发！`);
                
                // 计算赠牌数量（手牌的1/3）
                const giftCount = Math.floor(finishedPlayer.hand.filter(c => !c.used).length * TOURNAMENT_CONFIG.GIFT_CARD_RATIO);
                
                if (giftCount > 0) {
                    // 获取可用卡牌
                    const availableCards = finishedPlayer.hand.filter(c => !c.used);
                    const giftCards = availableCards.slice(0, giftCount);
                    
                    // 平均分配给队友
                    const cardsPerTeammate = Math.floor(giftCards.length / unfinishedTeammates.length);
                    
                    unfinishedTeammates.forEach((teammate, index) => {
                        const startIdx = index * cardsPerTeammate;
                        const endIdx = startIdx + cardsPerTeammate;
                        const cardsToGive = giftCards.slice(startIdx, endIdx);
                        
                        // 将卡牌添加到队友手牌（标记为额外获得）
                        cardsToGive.forEach(card => {
                            teammate.hand.push({
                                ...card,
                                isGift: true,
                                from: finishedPlayer.name
                            });
                        });
                        
                        teammate.cardsRemaining += cardsToGive.length;
                        
                        console.log(`  → ${teammate.name} 获得 ${cardsToGive.length} 张赠牌`);
                        this.addLog(`🎁 ${finishedPlayer.name} 赠送 ${cardsToGive.length} 张牌给 ${teammate.name}`);
                    });
                    
                    team.gifted = true;
                    
                    // 触发回调
                    this.trigger('teamGift', {
                        from: finishedPlayer,
                        to: unfinishedTeammates,
                        cards: giftCards
                    });
                }
            }
        }
    }
    
    // ============ 游戏结束 ============
    endGame() {
        if (this.state.phase === 'finished') return;
        
        console.log('🏁 游戏结束');
        this.state.phase = 'finished';
        this.state.isRunning = false;
        
        // 停止计时器
        clearInterval(this.state.gameTimer);
        clearInterval(this.state.turnTimer);
        
        // 完成所有未完成的玩家排名
        const unfinishedPlayers = this.state.players.filter(p => !p.finished);
        unfinishedPlayers.sort((a, b) => a.level - b.level); // 按层数排序（越低排名越高）
        
        unfinishedPlayers.forEach((player, index) => {
            player.finished = true;
            player.finishRank = this.state.finishedPlayers.length + 1;
            player.finishTime = Date.now();
            this.state.finishedPlayers.push(player);
        });
        
        // 生成最终排行榜
        this.state.leaderboard = [...this.state.finishedPlayers];
        
        // 计算奖励
        const rewards = this.calculateRewards();
        
        // 保存明信片到收集册
        this.savePostcards();
        
        // 触发回调
        this.trigger('gameEnded', {
            leaderboard: this.state.leaderboard,
            rewards: rewards,
            myRank: this.getMyRank()
        });
        
        // 显示结算界面
        this.showResultScreen();
        
        // 保存游戏结果
        this.saveGameResult();
    }
    
    // 强制结束游戏（超时）
    forceEndGame(reason) {
        console.log(`⏰ 游戏强制结束: ${reason}`);
        this.addLog('⏰ 游戏时间到！强制结束');
        this.endGame();
    }
    
    // 计算奖励
    calculateRewards() {
        const myRank = this.getMyRank();
        const rewards = {
            rank: myRank,
            diamonds: 0,
            coins: 0,
            title: null,
            postcard: null
        };
        
        if (myRank === 1) {
            rewards.diamonds = POSTCARD_CONFIG.rewards.gold.diamonds;
            rewards.coins = POSTCARD_CONFIG.rewards.gold.coins;
            rewards.title = POSTCARD_CONFIG.rewards.gold.title;
            rewards.postcard = {
                type: 'gold',
                country: this.state.country,
                tower: this.state.towerData
            };
        } else if (myRank === 2) {
            rewards.diamonds = POSTCARD_CONFIG.rewards.silver.diamonds;
            rewards.coins = POSTCARD_CONFIG.rewards.silver.coins;
            rewards.title = POSTCARD_CONFIG.rewards.silver.title;
            rewards.postcard = {
                type: 'silver',
                country: this.state.country,
                tower: this.state.towerData
            };
        } else if (myRank === 3) {
            rewards.diamonds = POSTCARD_CONFIG.rewards.bronze.diamonds;
            rewards.coins = POSTCARD_CONFIG.rewards.bronze.coins;
            rewards.title = POSTCARD_CONFIG.rewards.bronze.title;
            rewards.postcard = {
                type: 'bronze',
                country: this.state.country,
                tower: this.state.towerData
            };
        } else {
            // 参与奖
            rewards.diamonds = 100;
            rewards.coins = 10000;
        }
        
        return rewards;
    }
    
    // 获取我的排名
    getMyRank() {
        const myPlayer = this.state.players.find(p => p.id === this.state.myPlayerId);
        return myPlayer ? myPlayer.finishRank : null;
    }
    
    // ============ 明信片系统 ============
    savePostcards() {
        const rewards = this.calculateRewards();
        
        if (!rewards.postcard) return;
        
        // 获取现有的明信片收集
        let collection = this.loadPostcardCollection();
        
        // 创建新的明信片
        const postcard = {
            id: `pc_${Date.now()}`,
            type: rewards.postcard.type,
            country: rewards.postcard.country,
            countryName: rewards.postcard.tower.name,
            flag: rewards.postcard.tower.flag,
            tower: rewards.postcard.tower.tower,
            obtainedAt: new Date().toISOString(),
            rank: rewards.rank,
            gameId: this.state.gameId
        };
        
        // 添加到收集册
        collection.postcards.push(postcard);
        
        // 更新国家收集状态
        if (!collection.countries[rewards.postcard.country]) {
            collection.countries[rewards.postcard.country] = {
                obtained: true,
                types: []
            };
        }
        collection.countries[rewards.postcard.country].types.push(rewards.postcard.type);
        
        // 保存到本地存储
        localStorage.setItem('towerOfFate_postcards', JSON.stringify(collection));
        
        console.log('📮 明信片已保存:', postcard);
    }
    
    // 加载明信片收集
    loadPostcardCollection() {
        const defaultCollection = {
            postcards: [],
            countries: {},
            stats: {
                totalGames: 0,
                goldCount: 0,
                silverCount: 0,
                bronzeCount: 0,
                uniqueCountries: 0
            }
        };
        
        try {
            const saved = localStorage.getItem('towerOfFate_postcards');
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (e) {
            console.error('加载明信片收集失败:', e);
        }
        
        return defaultCollection;
    }
    
    // 获取收集进度
    getCollectionProgress() {
        const collection = this.loadPostcardCollection();
        const totalCountries = Object.keys(COUNTRY_TOWERS).length;
        const collectedCountries = Object.keys(collection.countries).length;
        
        return {
            totalCountries,
            collectedCountries,
            progress: Math.round((collectedCountries / totalCountries) * 100),
            goldCount: collection.postcards.filter(p => p.type === 'gold').length,
            silverCount: collection.postcards.filter(p => p.type === 'silver').length,
            bronzeCount: collection.postcards.filter(p => p.type === 'bronze').length,
            totalPostcards: collection.postcards.length
        };
    }
    
    // ============ 日志系统 ============
    addLog(message) {
        const time = new Date().toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        });
        
        const logEntry = {
            time: time,
            message: message,
            timestamp: Date.now()
        };
        
        this.state.logs.push(logEntry);
        
        // 限制日志数量
        if (this.state.logs.length > 50) {
            this.state.logs.shift();
        }
        
        // 触发回调
        this.trigger('logAdded', logEntry);
    }
    
    // 添加游戏记录
    addRecord(record) {
        this.state.records.unshift(record);
        
        // 限制记录数量
        if (this.state.records.length > 20) {
            this.state.records.pop();
        }
        
        this.trigger('recordAdded', record);
    }
    
    // ============ 事件系统 ============
    on(event, callback) {
        if (!this.callbacks[event]) {
            this.callbacks[event] = [];
        }
        this.callbacks[event].push(callback);
    }
    
    off(event, callback) {
        if (this.callbacks[event]) {
            this.callbacks[event] = this.callbacks[event].filter(cb => cb !== callback);
        }
    }
    
    trigger(event, data) {
        if (this.callbacks[event]) {
            this.callbacks[event].forEach(callback => {
                try {
                    callback(data);
                } catch (e) {
                    console.error(`事件回调错误 (${event}):`, e);
                }
            });
        }
    }
    
    // ============ 持久化 ============
    saveGameState() {
        try {
            localStorage.setItem('towerOfFate_currentGame', JSON.stringify({
                gameId: this.state.gameId,
                country: this.state.country,
                phase: this.state.phase,
                startTime: this.state.startTime
            }));
        } catch (e) {
            console.error('保存游戏状态失败:', e);
        }
    }
    
    saveGameResult() {
        try {
            const history = JSON.parse(localStorage.getItem('towerOfFate_gameHistory') || '[]');
            
            history.push({
                gameId: this.state.gameId,
                country: this.state.country,
                towerName: this.state.towerData.name,
                rank: this.getMyRank(),
                timestamp: new Date().toISOString(),
                playerCount: this.state.players.length
            });
            
            // 限制历史记录数量
            if (history.length > 50) {
                history.shift();
            }
            
            localStorage.setItem('towerOfFate_gameHistory', JSON.stringify(history));
        } catch (e) {
            console.error('保存游戏历史失败:', e);
        }
    }
    
    // ============ 工具方法 ============
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    getMyPlayer() {
        return this.state.players.find(p => p.id === this.state.myPlayerId);
    }
    
    getPlayerById(id) {
        return this.state.players.find(p => p.id === id);
    }
    
    // ============ UI相关 ============
    showResultScreen() {
        // 这将在外部实现
        this.trigger('showResultScreen', {
            leaderboard: this.state.leaderboard,
            rewards: this.calculateRewards()
        });
    }
    
    // 暂停/继续游戏
    pause() {
        this.state.isPaused = true;
        this.addLog('⏸️ 游戏已暂停');
    }
    
    resume() {
        this.state.isPaused = false;
        this.addLog('▶️ 游戏继续');
    }
    
    // 放弃游戏
    surrender() {
        const myPlayer = this.getMyPlayer();
        if (myPlayer) {
            myPlayer.finished = true;
            myPlayer.finishRank = this.state.players.length;
            this.state.finishedPlayers.push(myPlayer);
            this.addLog('🏳️ 你已放弃游戏');
        }
        
        this.endGame();
    }
    
    // 获取游戏统计
    getStats() {
        const myPlayer = this.getMyPlayer();
        
        return {
            totalPlayers: this.state.players.length,
            finishedPlayers: this.state.finishedPlayers.length,
            myRank: myPlayer ? myPlayer.finishRank : null,
            myLevel: this.state.myLevel,
            round: this.state.round,
            gameTimeRemaining: this.state.gameTimeRemaining,
            turnTimeRemaining: this.state.turnTimeRemaining,
            cardsRemaining: myPlayer ? myPlayer.cardsRemaining : 0
        };
    }
}

// ============ 游戏界面管理器 ============
class TournamentUI {
    constructor(game) {
        this.game = game;
        this.elements = {};
        this.init();
    }
    
    init() {
        // 绑定游戏事件
        this.game.on('gameStarted', (data) => this.onGameStarted(data));
        this.game.on('turnStarted', (data) => this.onTurnStarted(data));
        this.game.on('turnTimeUpdate', (data) => this.onTurnTimeUpdate(data));
        this.game.on('gameTimeUpdate', (data) => this.onGameTimeUpdate(data));
        this.game.on('myTurn', (data) => this.onMyTurn(data));
        this.game.on('cardPlayed', (data) => this.onCardPlayed(data));
        this.game.on('playerFinished', (data) => this.onPlayerFinished(data));
        this.game.on('gameEnded', (data) => this.onGameEnded(data));
        this.game.on('logAdded', (data) => this.onLogAdded(data));
        this.game.on('showResultScreen', (data) => this.showResultScreen(data));
        this.game.on('teamGift', (data) => this.onTeamGift(data));
        
        // 缓存DOM元素
        this.cacheElements();
    }
    
    cacheElements() {
        this.elements = {
            // 游戏主容器
            gameContainer: document.getElementById('tournamentGameContainer'),
            
            // 塔楼相关
            towerImage: document.getElementById('towerImage'),
            towerName: document.getElementById('towerName'),
            towerFlag: document.getElementById('towerFlag'),
            
            // 计时器
            turnTimer: document.getElementById('turnTimer'),
            turnTimerText: document.getElementById('turnTimerText'),
            gameTimer: document.getElementById('gameTimer'),
            gameTimerText: document.getElementById('gameTimerText'),
            
            // 玩家信息
            playerList: document.getElementById('playerList'),
            myAvatar: document.getElementById('myAvatar'),
            myName: document.getElementById('myName'),
            myLevel: document.getElementById('myLevel'),
            myCards: document.getElementById('myCards'),
            
            // 手牌区域
            handContainer: document.getElementById('handContainer'),
            playButton: document.getElementById('playButton'),
            
            // 层叠区
            layerList: document.getElementById('layerList'),
            
            // 守卫区
            guardDisplay: document.getElementById('guardDisplay'),
            provokeList: document.getElementById('provokeList'),
            
            // 日志
            logContainer: document.getElementById('logContainer'),
            
            // 结果界面
            resultScreen: document.getElementById('resultScreen'),
            resultLeaderboard: document.getElementById('resultLeaderboard'),
            resultRewards: document.getElementById('resultRewards')
        };
    }
    
    // 渲染塔楼背景
    renderTower() {
        const towerData = this.game.state.towerData;
        if (!towerData) return;
        
        if (this.elements.towerName) {
            this.elements.towerName.textContent = towerData.name;
        }
        
        if (this.elements.towerFlag) {
            this.elements.towerFlag.textContent = towerData.flag;
        }
        
        if (this.elements.towerImage) {
            this.elements.towerImage.src = `assets/towers/${towerData.tower}`;
            this.elements.towerImage.onerror = () => {
                // 使用emoji备用
                this.elements.towerImage.style.display = 'none';
                const emojiContainer = document.getElementById('towerEmoji');
                if (emojiContainer) {
                    emojiContainer.textContent = this.getTowerEmoji(towerData.continent);
                }
            };
        }
    }
    
    getTowerEmoji(continent) {
        const emojis = {
            asia: '🏯',
            europe: '🏰',
            america: '🗽',
            africa: '🦁',
            oceania: '🦘'
        };
        return emojis[continent] || '🗼';
    }
    
    // 渲染玩家列表
    renderPlayerList() {
        if (!this.elements.playerList) return;
        
        const players = this.game.state.players;
        let html = '';
        
        players.forEach((player, index) => {
            const isMe = player.id === this.game.state.myPlayerId;
            const isCurrentTurn = index === this.game.state.currentTurn;
            const teamClass = player.team === 'panda' ? 'team-panda' : 'team-wolf';
            const statusIcon = player.finished ? '🏆' : (isCurrentTurn ? '▶️' : '');
            
            html += `
                <div class="player-item ${teamClass} ${isMe ? 'is-me' : ''} ${isCurrentTurn ? 'current-turn' : ''} ${player.finished ? 'finished' : ''}">
                    <span class="player-avatar">${player.avatar}</span>
                    <span class="player-name">${player.name}${isMe ? ' (我)' : ''}</span>
                    <span class="player-level">第${this.getLevelName(player.level)}层</span>
                    <span class="player-status">${statusIcon}</span>
                </div>
            `;
        });
        
        this.elements.playerList.innerHTML = html;
    }
    
    getLevelName(levelIndex) {
        const levels = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
        return levels[levelIndex] || '?';
    }
    
    // 渲染手牌
    renderHand() {
        if (!this.elements.handContainer) return;
        
        const myHand = this.game.state.myHand.filter(c => !c.used);
        let html = '';
        
        myHand.forEach((card, index) => {
            const isSelected = this.game.state.mySelectedCard === index;
            const colorClass = card.isRed ? 'red' : 'black';
            
            html += `
                <div class="hand-card ${colorClass} ${isSelected ? 'selected' : ''}" 
                     onclick="window.tournamentGame.selectCard(${index})"
                     data-index="${index}">
                    <span class="suit">${card.suit}</span>
                    <span class="rank">${card.rank}</span>
                    ${card.isGift ? '<span class="gift-badge">🎁</span>' : ''}
                </div>
            `;
        });
        
        this.elements.handContainer.innerHTML = html;
        
        // 更新出牌按钮状态
        this.updatePlayButton();
    }
    
    updatePlayButton() {
        if (!this.elements.playButton) return;
        
        const isMyTurn = this.game.state.players[this.game.state.currentTurn]?.id === this.game.state.myPlayerId;
        const hasSelected = this.game.state.mySelectedCard !== null;
        
        this.elements.playButton.disabled = !isMyTurn || !hasSelected;
        this.elements.playButton.textContent = isMyTurn ? 
            (hasSelected ? '⚔️ 出牌攻击' : '请选择手牌') : 
            '等待其他玩家...';
    }
    
    // 渲染层叠区
    renderLayers() {
        if (!this.elements.layerList) return;
        
        const levels = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
        const myLevel = this.game.state.myLevel;
        
        let html = '';
        
        levels.forEach((level, index) => {
            const isCurrent = myLevel === index;
            const isStartLayer = index === 12;
            
            // 获取该层的所有玩家
            const playersHere = this.game.state.players.filter(p => p.level === index);
            
            let playersHtml = '';
            if (playersHere.length > 0) {
                playersHtml = '<div class="layer-players">' +
                    playersHere.map(p => {
                        const isSelf = p.id === this.game.state.myPlayerId;
                        const teamClass = p.team === 'panda' ? 'panda-team' : 'wolf-team';
                        return `<span class="layer-player ${teamClass} ${isSelf ? 'self' : ''}">${p.avatar}</span>`;
                    }).join('') +
                    '</div>';
            }
            
            html += `
                <div class="layer-item ${isCurrent ? 'current' : ''} ${isStartLayer ? 'start-layer' : ''}">
                    <span class="layer-rank">${level}</span>
                    ${playersHtml}
                </div>
            `;
        });
        
        this.elements.layerList.innerHTML = html;
    }
    
    // 渲染守卫和激怒牌
    renderGuardAndProvoke() {
        const myLevel = this.game.state.myLevel;
        const guard = this.game.state.guards[myLevel];
        
        if (!guard) return;
        
        // 渲染当前守卫显示
        if (this.elements.guardDisplay) {
            this.elements.guardDisplay.innerHTML = `
                <div class="guard-info">
                    <span class="guard-level">${guard.levelName}层守卫</span>
                    <span class="guard-cards">剩余: ${guard.cardsLeft}/13</span>
                </div>
            `;
        }
        
        // 渲染激怒牌
        if (this.elements.provokeList) {
            let html = '<div class="provoke-title">⚠️ 激怒牌</div>';
            
            guard.provokeCards.forEach(card => {
                const colorClass = card.isRed ? 'red' : 'black';
                html += `
                    <div class="provoke-card ${colorClass}">
                        <span class="suit">${card.suit}</span>
                        <span class="rank">${card.rank}</span>
                    </div>
                `;
            });
            
            this.elements.provokeList.innerHTML = html;
        }
    }
    
    // ============ 事件处理器 ============
    onGameStarted(data) {
        console.log('🎮 游戏开始事件:', data);
        this.renderTower();
        this.renderPlayerList();
        this.renderHand();
        this.renderLayers();
        this.renderGuardAndProvoke();
    }
    
    onTurnStarted(data) {
        console.log('🎯 回合开始事件:', data);
        this.renderPlayerList();
        
        // 高亮当前玩家
        const playerItems = document.querySelectorAll('.player-item');
        playerItems.forEach((item, index) => {
            item.classList.toggle('current-turn', index === this.game.state.currentTurn);
        });
    }
    
    onTurnTimeUpdate(data) {
        if (this.elements.turnTimerText) {
            this.elements.turnTimerText.textContent = `剩余 ${data.remaining}秒`;
        }
        
        if (this.elements.turnTimer) {
            const progress = (data.remaining / data.total) * 100;
            this.elements.turnTimer.style.width = `${progress}%`;
            
            // 警告颜色
            if (data.remaining <= 10) {
                this.elements.turnTimer.classList.add('warning');
            } else {
                this.elements.turnTimer.classList.remove('warning');
            }
        }
    }
    
    onGameTimeUpdate(data) {
        if (this.elements.gameTimerText) {
            this.elements.gameTimerText.textContent = this.game.formatTime(data.remaining);
        }
        
        if (this.elements.gameTimer) {
            const progress = (data.remaining / data.total) * 100;
            this.elements.gameTimer.style.width = `${progress}%`;
        }
    }
    
    onMyTurn(data) {
        console.log('🎯 我的回合事件:', data);
        this.renderHand();
        
        // 播放提示音（如果启用）
        this.playSound('turn');
        
        // 显示提示
        this.showToast('🎯 你的回合！请选择手牌');
    }
    
    onCardPlayed(data) {
        console.log('🃏 卡牌打出事件:', data);
        
        // 更新界面
        this.renderHand();
        this.renderLayers();
        this.renderGuardAndProvoke();
        
        // 显示结果动画
        if (data.player.id === this.game.state.myPlayerId) {
            this.showBattleResult(data.result);
        }
    }
    
    onPlayerFinished(data) {
        console.log('🏆 玩家登顶事件:', data);
        
        this.renderPlayerList();
        this.renderLayers();
        
        // 显示登顶提示
        this.showToast(`🏆 ${data.player.name} 成功登顶！排名第${data.rank}`);
    }
    
    onTeamGift(data) {
        console.log('🎁 团队赠牌事件:', data);
        
        // 如果我是受赠者，显示提示
        const isRecipient = data.to.some(p => p.id === this.game.state.myPlayerId);
        if (isRecipient) {
            this.showToast('🎁 队友赠送了卡牌给你！');
            this.renderHand();
        }
    }
    
    onGameEnded(data) {
        console.log('🏁 游戏结束事件:', data);
    }
    
    onLogAdded(data) {
        if (!this.elements.logContainer) return;
        
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.innerHTML = `<span class="log-time">${data.time}</span> ${data.message}`;
        
        this.elements.logContainer.insertBefore(logEntry, this.elements.logContainer.firstChild);
        
        // 限制日志数量
        while (this.elements.logContainer.children.length > 20) {
            this.elements.logContainer.removeChild(this.elements.logContainer.lastChild);
        }
    }
    
    // ============ 结果界面 ============
    showResultScreen(data) {
        if (!this.elements.resultScreen) {
            // 如果没有结果界面元素，创建一个
            this.createResultScreen();
        }
        
        const { leaderboard, rewards } = data;
        
        // 渲染排行榜
        if (this.elements.resultLeaderboard) {
            let html = '<h3>🏆 最终排名</h3>';
            
            leaderboard.forEach((player, index) => {
                const rankClass = index < 3 ? `rank-${index + 1}` : '';
                const rankIcon = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`;
                const isMe = player.id === this.game.state.myPlayerId;
                
                html += `
                    <div class="leaderboard-item ${rankClass} ${isMe ? 'is-me' : ''}">
                        <span class="rank">${rankIcon}</span>
                        <span class="avatar">${player.avatar}</span>
                        <span class="name">${player.name}${isMe ? ' (我)' : ''}</span>
                        <span class="team">${player.team === 'panda' ? '🐼' : '🐺'}</span>
                    </div>
                `;
            });
            
            this.elements.resultLeaderboard.innerHTML = html;
        }
        
        // 渲染奖励
        if (this.elements.resultRewards) {
            const myRank = rewards.rank;
            const rankText = myRank === 1 ? '冠军' : myRank === 2 ? '亚军' : myRank === 3 ? '季军' : `第${myRank}名`;
            
            let html = `
                <div class="my-rank">你的排名: <span class="rank-${myRank}">${rankText}</span></div>
                <div class="rewards-list">
            `;
            
            if (rewards.postcard) {
                const postcardType = POSTCARD_CONFIG.types[rewards.postcard.type];
                html += `
                    <div class="reward-item postcard ${rewards.postcard.type}">
                        <span class="icon">${postcardType.icon}</span>
                        <span class="name">${this.game.state.towerData.name} ${postcardType.name}</span>
                    </div>
                `;
            }
            
            html += `
                    <div class="reward-item diamonds">
                        <span class="icon">💎</span>
                        <span class="amount">${rewards.diamonds}</span>
                    </div>
                    <div class="reward-item coins">
                        <span class="icon">🪙</span>
                        <span class="amount">${rewards.coins.toLocaleString()}</span>
                    </div>
            `;
            
            if (rewards.title) {
                html += `
                    <div class="reward-item title">
                        <span class="icon">✨</span>
                        <span class="name">称号: ${rewards.title}</span>
                    </div>
                `;
            }
            
            html += '</div>';
            
            // 添加分享按钮
            html += `
                <div class="result-actions">
                    <button class="btn-share" onclick="window.tournamentUI.shareResult()">
                        📤 分享战绩
                    </button>
                    <button class="btn-collection" onclick="window.tournamentUI.viewCollection()">
                        📔 查看明信片
                    </button>
                    <button class="btn-again" onclick="location.reload()">
                        🎮 再来一局
                    </button>
                </div>
            `;
            
            this.elements.resultRewards.innerHTML = html;
        }
        
        // 显示结果界面
        this.elements.resultScreen.style.display = 'flex';
    }
    
    createResultScreen() {
        const resultScreen = document.createElement('div');
        resultScreen.id = 'resultScreen';
        resultScreen.className = 'result-screen';
        resultScreen.innerHTML = `
            <div class="result-container">
                <h2>🎉 游戏结束</h2>
                <div id="resultLeaderboard"></div>
                <div id="resultRewards"></div>
            </div>
        `;
        
        document.body.appendChild(resultScreen);
        this.elements.resultScreen = resultScreen;
        this.elements.resultLeaderboard = document.getElementById('resultLeaderboard');
        this.elements.resultRewards = document.getElementById('resultRewards');
    }
    
    // ============ 工具方法 ============
    showToast(message) {
        // 创建toast元素
        const toast = document.createElement('div');
        toast.className = 'game-toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        // 动画显示
        setTimeout(() => toast.classList.add('show'), 10);
        
        // 自动消失
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    showBattleResult(result) {
        let message = '';
        let type = '';
        
        switch (result.type) {
            case 'full_match':
                message = '🎉 完美匹配！上升2层！';
                type = 'success';
                break;
            case 'partial_match':
                message = '✨ 匹配成功！上升1层！';
                type = 'success';
                break;
            case 'provoke_full':
                message = '💥 激怒！退回2层！';
                type = 'danger';
                break;
            case 'provoke_partial':
                message = '⚠️ 激怒！退回1层！';
                type = 'warning';
                break;
            case 'no_match':
                message = '❌ 未匹配';
                type = 'neutral';
                break;
        }
        
        if (message) {
            this.showToast(message);
        }
    }
    
    playSound(type) {
        // 音频播放实现
        // 可以在这里集成音频系统
    }
    
    // 分享结果
    shareResult() {
        const rewards = this.game.calculateRewards();
        const myRank = rewards.rank;
        const rankText = myRank === 1 ? '🥇 冠军' : myRank === 2 ? '🥈 亚军' : myRank === 3 ? '🥉 季军' : `第${myRank}名`;
        
        const shareText = `🏆 命运塔锦标赛\n` +
            `🗼 ${this.game.state.towerData.name}\n` +
            `🎯 我的排名: ${rankText}\n` +
            `💎 获得钻石: ${rewards.diamonds}\n` +
            `🪙 获得金币: ${rewards.coins.toLocaleString()}\n` +
            `快来挑战我吧！`;
        
        if (navigator.share) {
            navigator.share({
                title: '命运塔锦标赛战绩',
                text: shareText
            });
        } else {
            // 复制到剪贴板
            navigator.clipboard.writeText(shareText).then(() => {
                this.showToast('✅ 战绩已复制到剪贴板');
            });
        }
    }
    
    // 查看明信片收集
    viewCollection() {
        window.location.href = 'collection.html';
    }
}

// ============ 全局实例 ============
let tournamentGame = null;
let tournamentUI = null;

// ============ 初始化函数 ============
function initTournamentGame(countryCode, isTeamMode = true) {
    console.log(`🎮 初始化锦标赛游戏: ${countryCode}`);
    
    // 创建游戏实例
    tournamentGame = new TournamentGame();
    tournamentGame.init(countryCode, isTeamMode);
    
    // 创建UI实例
    tournamentUI = new TournamentUI(tournamentGame);
    
    // 保存到全局
    window.tournamentGame = tournamentGame;
    window.tournamentUI = tournamentUI;
    
    // 启动游戏
    tournamentGame.start();
    
    return { game: tournamentGame, ui: tournamentUI };
}

// ============ 导出 ============
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TournamentGame, TournamentUI, initTournamentGame };
} else {
    window.TournamentGame = TournamentGame;
    window.TournamentUI = TournamentUI;
    window.initTournamentGame = initTournamentGame;
}

console.log('✅ tournament-game.js 加载完成');

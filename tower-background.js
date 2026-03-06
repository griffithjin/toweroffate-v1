/**
 * 命运塔 - 卡通背景切换系统
 * 根据层数或随机切换不同的世界名塔背景
 */

// 可用的塔背景列表
const TOWER_BACKGROUNDS = [
    { id: 'eiffel', name: '埃菲尔铁塔', country: '法国', file: 'eiffel-tower.png' },
    { id: 'pisa', name: '比萨斜塔', country: '意大利', file: 'pisa-tower.png' },
    { id: 'liberty', name: '自由女神像', country: '美国', file: 'statue-of-liberty.png' },
    { id: 'sydney', name: '悉尼歌剧院', country: '澳大利亚', file: 'sydney-opera.png' },
    { id: 'tokyo', name: '东京塔', country: '日本', file: 'tokyo-tower.png' },
    { id: 'empire', name: '帝国大厦', country: '美国', file: 'empire-state.png' }
];

// 当前背景索引
let currentBackgroundIndex = 0;

// 根据层数获取背景
function getBackgroundByLevel(level) {
    // 每2层切换一个背景
    const index = Math.floor(level / 2) % TOWER_BACKGROUNDS.length;
    return TOWER_BACKGROUNDS[index];
}

// 随机切换背景
function randomBackground() {
    const randomIndex = Math.floor(Math.random() * TOWER_BACKGROUNDS.length);
    return TOWER_BACKGROUNDS[randomIndex];
}

// 应用背景到战场
function applyTowerBackground(towerId) {
    const battlefield = document.querySelector('.battlefield');
    if (!battlefield) return;
    
    const tower = TOWER_BACKGROUNDS.find(t => t.id === towerId);
    if (tower) {
        battlefield.style.backgroundImage = `url('assets/towers/${tower.file}')`;
        battlefield.style.backgroundSize = 'cover';
        battlefield.style.backgroundPosition = 'center center';
        battlefield.style.backgroundRepeat = 'no-repeat';
        
        // 显示当前塔信息
        showTowerInfo(tower);
    }
}

// 显示塔信息提示
function showTowerInfo(tower) {
    // 检查是否已存在信息提示
    let infoDiv = document.querySelector('.tower-info-float');
    if (!infoDiv) {
        infoDiv = document.createElement('div');
        infoDiv.className = 'tower-info-float';
        document.querySelector('.battlefield').appendChild(infoDiv);
    }
    
    infoDiv.innerHTML = `
        <div class="tower-name">${tower.name}</div>
        <div class="tower-country">${tower.country}</div>
    `;
    
    // 3秒后淡出
    setTimeout(() => {
        infoDiv.style.opacity = '0';
    }, 3000);
}

// 初始化背景系统
function initTowerBackground() {
    // 初始显示埃菲尔铁塔
    applyTowerBackground('eiffel');
    
    // 每5层切换一次背景
    const originalPlayCard = window.playCard;
    window.playCard = function() {
        if (originalPlayCard) originalPlayCard();
        
        // 检查层数变化
        const myLevel = gameState.myPlayer.level;
        const newBg = getBackgroundByLevel(myLevel);
        applyTowerBackground(newBg.id);
    };
}

// 导出
window.TOWER_BACKGROUNDS = TOWER_BACKGROUNDS;
window.applyTowerBackground = applyTowerBackground;
window.initTowerBackground = initTowerBackground;
window.randomBackground = randomBackground;

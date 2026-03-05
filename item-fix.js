// item-fix.js - 修复道具应用系统

// 修复1：在initGame中调用applyCardback
const originalInitGame = initGame;
initGame = function() {
    originalInitGame();
    // 应用卡背样式
    setTimeout(applyCardback, 100);
    console.log('✅ 卡背样式已应用');
};

// 修复2：应用特效到手牌而非按钮
function applyEffectToCard(cardElement) {
    const equipped = loadEquippedItems();
    
    if(!equipped.effect || equipped.effect === 'default') return;
    
    // 移除旧特效类
    cardElement.classList.remove(
        'card-fire-effect', 
        'card-ice-effect', 
        'card-lightning-effect',
        'card-heart-effect',
        'card-star-effect',
        'card-money-effect'
    );
    
    // 强制重绘
    void cardElement.offsetWidth;
    
    // 应用新特效
    const effectMap = {
        'effect_fire': 'card-fire-effect',
        'effect_ice': 'card-ice-effect',
        'effect_lightning': 'card-lightning-effect',
        'effect_heart': 'card-heart-effect',
        'effect_star': 'card-star-effect',
        'effect_money': 'card-money-effect'
    };
    
    const effectClass = effectMap[equipped.effect];
    if(effectClass) {
        cardElement.classList.add(effectClass);
        console.log(`✅ 特效 ${effectClass} 已应用`);
        
        // 动画结束后移除类
        setTimeout(() => {
            cardElement.classList.remove(effectClass);
        }, 800);
    }
}

// 修复3：重写出牌按钮点击处理
document.getElementById('playBtn').addEventListener('click', function() {
    if(gameState.selectedCard === null) return;
    
    // 获取选中的卡牌元素
    const handCards = document.querySelectorAll('.hand-card');
    const selectedCardElement = handCards[gameState.selectedCard];
    
    if(selectedCardElement) {
        // 应用特效到卡牌
        applyEffectToCard(selectedCardElement);
    }
});

// 修复4：增强卡背应用功能
function applyCardback() {
    const equipped = loadEquippedItems();
    const guardIcons = document.querySelectorAll('.guard-icon');
    
    // 清除旧样式
    guardIcons.forEach(icon => {
        icon.className = 'guard-icon';
        // 清除内容
        while(icon.firstChild) {
            icon.removeChild(icon.firstChild);
        }
    });
    
    // 应用新卡背
    if(equipped.cardback && equipped.cardback !== 'default') {
        const cardbackClass = `back-${equipped.cardback.replace('back_', '')}`;
        guardIcons.forEach((icon, index) => {
            icon.classList.add(cardbackClass);
            // 添加守卫牌内容
            const levelIndex = 12 - index; // 从A到2
            icon.innerHTML = `
                <span style="font-size:10px;opacity:0.7"
003e${LEVELS[levelIndex]}</span>
            `;
        });
        console.log(`✅ 卡背样式 ${cardbackClass} 已应用到 ${guardIcons.length} 张守卫牌`);
    } else {
        // 默认样式
        guardIcons.forEach((icon, index) => {
            const levelIndex = 12 - index;
            icon.innerHTML = '🎴';
        });
    }
}

// 修复5：道具效果开关
let effectsEnabled = localStorage.getItem('effectsEnabled') !== 'false';

function createEffectToggle() {
    const toggle = document.createElement('button');
    toggle.className = 'effect-toggle' + (effectsEnabled ? '' : ' disabled');
    toggle.innerHTML = effectsEnabled ? '✨ 特效开' : '✨ 特效关';
    toggle.onclick = function() {
        effectsEnabled = !effectsEnabled;
        localStorage.setItem('effectsEnabled', effectsEnabled);
        this.className = 'effect-toggle' + (effectsEnabled ? '' : ' disabled');
        this.innerHTML = effectsEnabled ? '✨ 特效开' : '✨ 特效关';
    };
    document.body.appendChild(toggle);
}

// 页面加载完成后创建设置按钮
document.addEventListener('DOMContentLoaded', function() {
    createEffectToggle();
});

// 修复6：应用头像框到所有玩家头像
function applyFramesToAll() {
    const equipped = loadEquippedItems();
    if(equipped.frame && equipped.frame !== 'default') {
        const frameClass = `frame-${equipped.frame.replace('frame_', '')}`;
        
        // 应用到战场上的头像
        document.querySelectorAll('.player-avatar').forEach(avatar => {
            avatar.classList.add(frameClass);
        });
        
        console.log(`✅ 头像框 ${frameClass} 已应用`);
    }
}

// 在渲染战场后应用头像框
const originalRenderBattlefield = renderBattlefield;
renderBattlefield = function() {
    originalRenderBattlefield();
    setTimeout(applyFramesToAll, 50);
};

console.log('✅ 道具修复脚本已加载');

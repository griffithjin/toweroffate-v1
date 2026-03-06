/**
 * 命运塔游戏修复补丁 V3.0
 * 修复问题：
 * 1. 移除天命牌
 * 2. 调整层数顺序 2→A（A在顶层）
 * 3. 修复战场头像显示逻辑（只显示当前层）
 * 4. 改进手牌横向滚动
 * 5. 增加当前玩家高亮
 */

// 修复后的层数顺序：2(底层) → A(顶层)
const LEVELS_NEW = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];

// 修复：只显示玩家当前所在层的头像
function renderPlayersAtLevel(levelIndex) {
    const playersAtLevel = [];
    
    // 检查每个玩家是否在当前层
    gameState.players.forEach(player => {
        if (player.level === levelIndex) {
            playersAtLevel.push(player);
        }
    });
    
    // 检查"我"是否在当前层
    if (gameState.myPlayer.level === levelIndex) {
        playersAtLevel.push(gameState.myPlayer);
    }
    
    return playersAtLevel;
}

// 修复：当前玩家高亮
function highlightCurrentPlayer() {
    const myLevel = gameState.myPlayer.level;
    const levelCell = document.querySelector(`.level-cell[data-level="${myLevel}"]`);
    if (levelCell) {
        levelCell.classList.add('level-current');
    }
}

// 修复：渲染战场网格（新顺序）
function renderBattleGrid() {
    const grid = document.getElementById('battleGrid');
    grid.innerHTML = '';
    
    // 表头
    const headers = ['层', '玩家', '守卫', '激怒牌⚠️'];
    headers.forEach(text => {
        const div = document.createElement('div');
        div.className = 'grid-header';
        div.textContent = text;
        grid.appendChild(div);
    });
    
    // 渲染13层（2到A，A在顶层）
    LEVELS_NEW.forEach((level, index) => {
        // 层数
        const levelCell = document.createElement('div');
        levelCell.className = `level-cell level-${level}`;
        levelCell.textContent = level;
        levelCell.dataset.level = index;
        
        // 高亮当前玩家所在层
        if (index === gameState.myPlayer.level) {
            levelCell.classList.add('level-current');
        }
        
        grid.appendChild(levelCell);
        
        // 玩家（只显示在该层的玩家）
        const playersCell = document.createElement('div');
        playersCell.className = 'players-cell';
        
        const playersHere = renderPlayersAtLevel(index);
        playersHere.forEach(player => {
            const avatar = document.createElement('div');
            avatar.className = `player-avatar ${player.id === 'me' ? 'self' : ''} ${player.isAscender ? 'ascender' : ''}`;
            avatar.textContent = player.avatar;
            playersCell.appendChild(avatar);
        });
        
        grid.appendChild(playersCell);
        
        // 守卫牌（隐藏，显示背面）
        const guardCell = document.createElement('div');
        guardCell.className = 'guard-cell';
        
        const guard = gameState.guards[index];
        if (guard) {
            guardCell.innerHTML = `
                <div class="guard-info">
                    <div class="guard-card-back">🎴</div>
                    <div class="guard-count">${guard.cards.filter(c=>!c.used).length}/13</div>
                </div>
            `;
        }
        
        grid.appendChild(guardCell);
        
        // 激怒牌（明牌，显示完整牌面）
        const provokeCell = document.createElement('div');
        provokeCell.className = 'provoke-cell';
        
        if (guard && guard.provokeCards) {
            guard.provokeCards.forEach(card => {
                const cardDiv = document.createElement('div');
                cardDiv.className = `provoke-card ${card.isRed ? '' : 'black'}`;
                cardDiv.innerHTML = `
                    <div class="rank">${card.rank}</div>
                    <div class="suit">${card.suit}</div>
                `;
                provokeCell.appendChild(cardDiv);
            });
        }
        
        grid.appendChild(provokeCell);
    });
}

// 修复：手牌区域改为更好的横向滚动
function renderHand() {
    const container = document.getElementById('handCards');
    container.innerHTML = '';
    
    gameState.hand.forEach((card, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = `hand-card ${card.isRed ? 'red' : 'black'} ${gameState.selectedCard === index ? 'selected' : ''}`;
        cardDiv.innerHTML = `
            <div class="rank">${card.rank}</div>
            <div class="suit">${card.suit}</div>
        `;
        cardDiv.onclick = () => selectCard(index);
        container.appendChild(cardDiv);
    });
    
    // 更新手牌数量
    document.getElementById('handCount').textContent = gameState.hand.length + '张';
}

// 导出修复函数
window.renderBattleGrid = renderBattleGrid;
window.renderHand = renderHand;
window.highlightCurrentPlayer = highlightCurrentPlayer;

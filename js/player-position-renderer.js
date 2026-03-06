/**
 * 玩家位置渲染器 - Player Position Renderer
 * 负责在塔上渲染玩家头像并处理位置更新动画
 * 支持平滑移动和多人同时显示
 */

class PlayerPositionRenderer {
  constructor(towerManager, options = {}) {
    this.towerManager = towerManager;
    this.playerPositions = new Map(); // playerId -> { level, element, data }
    this.containerId = options.containerId || 'tower-container';
    this.playersLayerId = options.playersLayerId || 'players-on-tower';
    this.animationDuration = options.animationDuration || 500; // 毫秒
    this.avatarSize = options.avatarSize || 40; // 像素
    this.enableAnimations = options.enableAnimations !== false;
    this.onPositionChangeCallbacks = [];
    
    // 确保有玩家层容器
    this._ensurePlayersLayer();
  }

  /**
   * 初始化渲染器
   * @param {Object} options - 配置选项
   */
  init(options = {}) {
    if (options.containerId) this.containerId = options.containerId;
    if (options.playersLayerId) this.playersLayerId = options.playersLayerId;
    if (options.animationDuration) this.animationDuration = options.animationDuration;
    if (options.avatarSize) this.avatarSize = options.avatarSize;
    if (options.enableAnimations !== undefined) this.enableAnimations = options.enableAnimations;
    
    this._ensurePlayersLayer();
    console.log('[PlayerPositionRenderer] Initialized');
  }

  /**
   * 确保玩家层容器存在
   * @private
   */
  _ensurePlayersLayer() {
    let layer = document.getElementById(this.playersLayerId);
    
    if (!layer) {
      // 创建玩家层
      layer = document.createElement('div');
      layer.id = this.playersLayerId;
      layer.className = 'players-layer';
      
      // 尝试添加到塔容器内部或作为兄弟元素
      const towerContainer = document.getElementById(this.containerId);
      if (towerContainer) {
        towerContainer.style.position = 'relative';
        towerContainer.appendChild(layer);
      } else {
        // 如果塔容器不存在，添加到body
        document.body.appendChild(layer);
      }
    }
    
    // 设置样式
    layer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 100;
    `;
    
    return layer;
  }

  /**
   * 更新玩家位置
   * @param {string} playerId - 玩家ID
   * @param {number} level - 层数 (1-13)
   * @param {Object} playerData - 玩家额外数据
   */
  updatePlayerPosition(playerId, level, playerData = {}) {
    // 验证层数范围
    const maxLevel = this._getMaxLevel();
    const validLevel = Math.max(1, Math.min(level, maxLevel));
    
    // 获取或创建玩家位置数据
    let positionData = this.playerPositions.get(playerId);
    
    if (!positionData) {
      positionData = {
        playerId,
        level: validLevel,
        data: playerData,
        element: null
      };
      this.playerPositions.set(playerId, positionData);
    } else {
      positionData.level = validLevel;
      positionData.data = { ...positionData.data, ...playerData };
    }
    
    // 渲染玩家到塔上
    this._renderPlayerOnTower(playerId, validLevel, positionData);
    
    // 触发回调
    this._triggerPositionChangeCallbacks(playerId, validLevel, positionData.data);
    
    return positionData;
  }

  /**
   * 获取塔的最大层数
   * @private
   */
  _getMaxLevel() {
    const currentTower = this.towerManager?.getCurrentTower();
    return currentTower?.levels || 13;
  }

  /**
   * 在塔上渲染玩家头像
   * @private
   */
  _renderPlayerOnTower(playerId, level, positionData) {
    const layer = document.getElementById(this.playersLayerId);
    if (!layer) return;

    let playerElement = document.getElementById(`player-${playerId}`);
    
    // 如果是新玩家，创建元素
    if (!playerElement) {
      playerElement = this._createPlayerElement(playerId, positionData.data);
      layer.appendChild(playerElement);
      positionData.element = playerElement;
    }

    // 计算层数对应位置（1-13层，从底部向上）
    const maxLevel = this._getMaxLevel();
    const levelPercent = ((level - 1) / (maxLevel - 1)) * 100;
    
    // 获取玩家数据
    const data = positionData.data;
    const avatarUrl = data.avatar || `assets/avatars/${playerId}.png`;
    const playerName = data.name || playerId;
    const playerColor = data.color || this._generatePlayerColor(playerId);
    
    // 更新元素内容
    playerElement.innerHTML = `
      <div class="player-avatar__container">
        <img src="${avatarUrl}" 
             alt="${playerName}"
             class="player-avatar__image"
             onerror="this.src='assets/avatars/default-avatar.png'">
        ${data.showLevel !== false ? `<div class="player-avatar__level-badge">${level}</div>` : ''}
      </div>
      ${data.showName !== false ? `<div class="player-avatar__name">${playerName}</div>` : ''}
    `;
    
    // 应用样式
    playerElement.style.cssText = `
      position: absolute;
      bottom: ${levelPercent}%;
      left: 50%;
      transform: translateX(-50%);
      width: ${this.avatarSize}px;
      transition: ${this.enableAnimations ? `bottom ${this.animationDuration}ms ease-in-out` : 'none'};
      z-index: ${100 + level};
    `;
    
    // 添加颜色边框
    const avatarContainer = playerElement.querySelector('.player-avatar__container');
    if (avatarContainer) {
      avatarContainer.style.cssText = `
        width: ${this.avatarSize}px;
        height: ${this.avatarSize}px;
        border-radius: 50%;
        border: 3px solid ${playerColor};
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        background: #fff;
      `;
    }
    
    // 添加动画类
    if (this.enableAnimations) {
      playerElement.classList.add('player-avatar--moving');
      setTimeout(() => {
        playerElement.classList.remove('player-avatar--moving');
      }, this.animationDuration);
    }
    
    // 添加到达动画
    playerElement.classList.add('player-avatar--arrived');
    setTimeout(() => {
      playerElement.classList.remove('player-avatar--arrived');
    }, 600);
  }

  /**
   * 创建玩家元素
   * @private
   */
  _createPlayerElement(playerId, data) {
    const element = document.createElement('div');
    element.id = `player-${playerId}`;
    element.className = 'player-avatar-on-tower';
    element.dataset.playerId = playerId;
    
    // 添加基础样式类
    element.style.cssText = `
      position: absolute;
      text-align: center;
      pointer-events: auto;
      cursor: pointer;
    `;
    
    // 添加点击事件
    element.addEventListener('click', (e) => {
      e.stopPropagation();
      this._handlePlayerClick(playerId);
    });
    
    return element;
  }

  /**
   * 生成玩家颜色（基于playerId的哈希）
   * @private
   */
  _generatePlayerColor(playerId) {
    let hash = 0;
    for (let i = 0; i < playerId.length; i++) {
      hash = playerId.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
      '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2'
    ];
    
    return colors[Math.abs(hash) % colors.length];
  }

  /**
   * 处理玩家头像点击
   * @private
   */
  _handlePlayerClick(playerId) {
    const positionData = this.playerPositions.get(playerId);
    if (positionData) {
      // 触发点击回调
      this._triggerClickCallbacks(playerId, positionData);
    }
  }

  /**
   * 批量更新多个玩家位置
   * @param {Array} players - 玩家数组 [{ playerId, level, data }]
   */
  updateMultiplePositions(players) {
    players.forEach(player => {
      this.updatePlayerPosition(
        player.playerId, 
        player.level, 
        player.data || {}
      );
    });
  }

  /**
   * 移除玩家
   * @param {string} playerId - 玩家ID
   * @param {boolean} animate - 是否使用动画
   */
  removePlayer(playerId, animate = true) {
    const positionData = this.playerPositions.get(playerId);
    
    if (positionData && positionData.element) {
      const element = positionData.element;
      
      if (animate) {
        // 淡出动画
        element.style.transition = 'all 300ms ease-out';
        element.style.opacity = '0';
        element.style.transform = 'translateX(-50%) scale(0.5)';
        
        setTimeout(() => {
          element.remove();
        }, 300);
      } else {
        element.remove();
      }
    }
    
    this.playerPositions.delete(playerId);
  }

  /**
   * 清除所有玩家位置
   * @param {boolean} animate - 是否使用动画
   */
  clearAllPositions(animate = false) {
    const playerIds = Array.from(this.playerPositions.keys());
    
    playerIds.forEach((playerId, index) => {
      if (animate) {
        // 错开动画时间
        setTimeout(() => {
          this.removePlayer(playerId, true);
        }, index * 50);
      } else {
        this.removePlayer(playerId, false);
      }
    });
    
    this.playerPositions.clear();
  }

  /**
   * 获取玩家当前位置
   * @param {string} playerId - 玩家ID
   * @returns {Object|null} 位置信息
   */
  getPlayerPosition(playerId) {
    const positionData = this.playerPositions.get(playerId);
    if (!positionData) return null;
    
    return {
      playerId: positionData.playerId,
      level: positionData.level,
      data: { ...positionData.data }
    };
  }

  /**
   * 获取所有玩家位置
   * @returns {Array} 所有玩家位置数组
   */
  getAllPositions() {
    return Array.from(this.playerPositions.entries()).map(([playerId, data]) => ({
      playerId,
      level: data.level,
      data: { ...data.data }
    }));
  }

  /**
   * 高亮显示玩家
   * @param {string} playerId - 玩家ID
   * @param {Object} options - 高亮选项
   */
  highlightPlayer(playerId, options = {}) {
    const element = document.getElementById(`player-${playerId}`);
    if (!element) return;
    
    const duration = options.duration || 2000;
    const color = options.color || '#FFD700';
    
    // 添加高亮效果
    element.style.filter = `drop-shadow(0 0 10px ${color})`;
    element.style.transform = 'translateX(-50%) scale(1.2)';
    element.style.zIndex = '200';
    
    // 定时恢复
    setTimeout(() => {
      element.style.filter = '';
      element.style.transform = 'translateX(-50%) scale(1)';
      element.style.zIndex = '';
    }, duration);
  }

  /**
   * 播放升级动画
   * @param {string} playerId - 玩家ID
   * @param {number} fromLevel - 起始层
   * @param {number} toLevel - 目标层
   */
  playLevelUpAnimation(playerId, fromLevel, toLevel) {
    const element = document.getElementById(`player-${playerId}`);
    if (!element) return;
    
    // 添加升级动画类
    element.classList.add('player-avatar--level-up');
    
    // 创建升级特效
    this._createLevelUpEffect(element);
    
    // 更新位置
    this.updatePlayerPosition(playerId, toLevel);
    
    // 移除动画类
    setTimeout(() => {
      element.classList.remove('player-avatar--level-up');
    }, 1000);
  }

  /**
   * 创建升级特效
   * @private
   */
  _createLevelUpEffect(targetElement) {
    const rect = targetElement.getBoundingClientRect();
    const effect = document.createElement('div');
    effect.className = 'level-up-effect';
    effect.innerHTML = '🎉';
    effect.style.cssText = `
      position: fixed;
      left: ${rect.left + rect.width / 2}px;
      top: ${rect.top}px;
      font-size: 24px;
      pointer-events: none;
      animation: levelUpFloat 1s ease-out forwards;
      z-index: 1000;
    `;
    
    document.body.appendChild(effect);
    
    // 添加动画样式
    if (!document.getElementById('level-up-animation')) {
      const style = document.createElement('style');
      style.id = 'level-up-animation';
      style.textContent = `
        @keyframes levelUpFloat {
          0% { transform: translateY(0) scale(0.5); opacity: 1; }
          50% { transform: translateY(-30px) scale(1.2); opacity: 1; }
          100% { transform: translateY(-60px) scale(1); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
    
    // 清理
    setTimeout(() => {
      effect.remove();
    }, 1000);
  }

  /**
   * 注册位置变更回调
   * @param {Function} callback - 回调函数(playerId, level, data)
   * @returns {Function} 取消注册的函数
   */
  onPositionChange(callback) {
    this.onPositionChangeCallbacks.push(callback);
    
    return () => {
      const index = this.onPositionChangeCallbacks.indexOf(callback);
      if (index > -1) {
        this.onPositionChangeCallbacks.splice(index, 1);
      }
    };
  }

  /**
   * 触发位置变更回调
   * @private
   */
  _triggerPositionChangeCallbacks(playerId, level, data) {
    this.onPositionChangeCallbacks.forEach(callback => {
      try {
        callback(playerId, level, data);
      } catch (error) {
        console.error('[PlayerPositionRenderer] Callback error:', error);
      }
    });
  }

  /**
   * 触发点击回调
   * @private
   */
  _triggerClickCallbacks(playerId, positionData) {
    // 可以通过自定义事件触发
    const event = new CustomEvent('playerAvatarClick', {
      detail: {
        playerId,
        level: positionData.level,
        data: positionData.data
      }
    });
    document.dispatchEvent(event);
  }

  /**
   * 根据层数排序玩家显示
   * @param {string} order - 排序方式 'asc' | 'desc'
   */
  sortPlayersByLevel(order = 'asc') {
    const positions = this.getAllPositions();
    
    positions.sort((a, b) => {
      return order === 'asc' ? a.level - b.level : b.level - a.level;
    });
    
    // 重新排列DOM顺序
    const layer = document.getElementById(this.playersLayerId);
    if (!layer) return;
    
    positions.forEach(pos => {
      const element = document.getElementById(`player-${pos.playerId}`);
      if (element) {
        layer.appendChild(element); // 将元素移到最后，实现层级提升
      }
    });
  }

  /**
   * 设置动画开关
   * @param {boolean} enabled - 是否启用动画
   */
  setAnimationsEnabled(enabled) {
    this.enableAnimations = enabled;
  }

  /**
   * 销毁渲染器
   */
  destroy() {
    this.clearAllPositions(false);
    this.onPositionChangeCallbacks = [];
    
    const layer = document.getElementById(this.playersLayerId);
    if (layer) {
      layer.remove();
    }
    
    console.log('[PlayerPositionRenderer] Destroyed');
  }
}

// 创建全局实例（需要在TowerModelManager之后加载）
window.PlayerPositionRenderer = PlayerPositionRenderer;

// 导出（支持模块系统）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PlayerPositionRenderer };
}

/**
 * 塔模型管理器 - Tower Model Manager
 * 负责加载、切换、渲染塔模型
 * 支持70个国家 + 161个省份的动态切换
 */

class TowerModelManager {
  constructor() {
    this.currentTower = null;
    this.towerElement = null;
    this.containerId = 'tower-container';
    this.onTowerChangeCallbacks = [];
    this.animationDuration = 300; // 毫秒
    this.isAnimating = false;
  }

  /**
   * 初始化管理器
   * @param {string} containerId - 塔容器ID
   */
  init(containerId = 'tower-container') {
    this.containerId = containerId;
    this.towerElement = document.getElementById(containerId);
    
    if (!this.towerElement) {
      console.warn(`[TowerModelManager] Container #${containerId} not found`);
      return false;
    }
    
    console.log('[TowerModelManager] Initialized');
    return true;
  }

  /**
   * 加载指定塔模型
   * @param {string} towerId - 塔ID
   * @param {Object} options - 加载选项
   * @returns {Object} 塔配置对象
   */
  loadTower(towerId, options = {}) {
    const { silent = false, animate = false } = options;
    
    // 获取塔配置，不存在则使用默认
    const towerConfig = TOWER_MODELS[towerId] || TOWER_MODELS.default;
    
    // 如果已经在加载这个塔且不是强制刷新，则返回
    if (this.currentTower && this.currentTower.id === towerConfig.id && !options.force) {
      return this.currentTower;
    }

    this.currentTower = towerConfig;
    
    if (animate && !silent) {
      this.switchTower(towerId, true);
    } else {
      this.renderTower();
    }
    
    // 触发变更回调
    if (!silent) {
      this._triggerChangeCallbacks(towerConfig);
    }
    
    console.log(`[TowerModelManager] Tower loaded: ${towerConfig.name} (${towerConfig.id})`);
    return towerConfig;
  }

  /**
   * 根据锦标赛ID加载对应塔
   * @param {string} tournamentId - 锦标赛ID，如 'tournament-china'
   * @param {Object} options - 加载选项
   * @returns {Object} 塔配置对象
   */
  loadTournamentTower(tournamentId, options = {}) {
    // 锦标赛ID到塔ID的映射
    const tournamentToTowerMap = {
      // 亚洲
      'tournament-china': 'china',
      'tournament-japan': 'japan',
      'tournament-south-korea': 'south-korea',
      'tournament-india': 'india',
      'tournament-united-arab-emirates': 'united-arab-emirates',
      'tournament-thailand': 'thailand',
      'tournament-singapore': 'singapore',
      'tournament-malaysia': 'malaysia',
      'tournament-indonesia': 'indonesia',
      'tournament-vietnam': 'vietnam',
      'tournament-philippines': 'philippines',
      'tournament-myanmar': 'myanmar',
      'tournament-cambodia': 'cambodia',
      'tournament-laos': 'laos',
      'tournament-nepal': 'nepal',
      'tournament-bangladesh': 'bangladesh',
      'tournament-sri-lanka': 'sriLanka',
      'tournament-mongolia': 'mongolia',
      'tournament-kazakhstan': 'kazakhstan',
      'tournament-uzbekistan': 'uzbekistan',
      'tournament-turkmenistan': 'turkmenistan',
      'tournament-afghanistan': 'afghanistan',
      'tournament-pakistan': 'pakistan',
      
      // 欧洲
      'tournament-france': 'france',
      'tournament-united-kingdom': 'united-kingdom',
      'tournament-germany': 'germany',
      'tournament-italy': 'italy',
      'tournament-spain': 'spain',
      'tournament-russia': 'russia',
      'tournament-netherlands': 'netherlands',
      'tournament-switzerland': 'switzerland',
      'tournament-sweden': 'sweden',
      'tournament-norway': 'norway',
      'tournament-denmark': 'denmark',
      'tournament-finland': 'finland',
      'tournament-poland': 'poland',
      'tournament-austria': 'austria',
      'tournament-belgium': 'belgium',
      'tournament-portugal': 'portugal',
      'tournament-greece': 'greece',
      'tournament-czech': 'czech',
      'tournament-hungary': 'hungary',
      'tournament-ireland': 'ireland',
      
      // 北美洲
      'tournament-united-states': 'united-states',
      'tournament-canada': 'canada',
      'tournament-mexico': 'mexico',
      'tournament-cuba': 'cuba',
      'tournament-costa-rica': 'costa-rica',
      'tournament-panama': 'panama',
      'tournament-guatemala': 'guatemala',
      'tournament-honduras': 'honduras',
      
      // 南美洲
      'tournament-brazil': 'brazil',
      'tournament-argentina': 'argentina',
      'tournament-peru': 'peru',
      'tournament-chile': 'chile',
      'tournament-colombia': 'colombia',
      'tournament-ecuador': 'ecuador',
      'tournament-bolivia': 'bolivia',
      'tournament-venezuela': 'venezuela',
      
      // 非洲
      'tournament-egypt': 'egypt',
      'tournament-south-africa': 'south-africa',
      'tournament-morocco': 'morocco',
      'tournament-kenya': 'kenya',
      'tournament-nigeria': 'nigeria',
      'tournament-ethiopia': 'ethiopia',
      'tournament-tanzania': 'tanzania',
      'tournament-ghana': 'ghana',
      
      // 大洋洲
      'tournament-australia': 'australia',
      'tournament-new-zealand': 'new-zealand',
      'tournament-fiji': 'fiji',
      
      // 省份锦标赛
      'tournament-china-beijing': 'china-beijing',
      'tournament-china-shanghai': 'china-shanghai',
      'tournament-china-guangdong': 'china-guangdong',
      'tournament-usa-california': 'usa-california',
      'tournament-usa-new-york': 'usa-new-york',
      'tournament-usa-texas': 'usa-texas',
      'tournament-japan-tokyo': 'japan-tokyo',
      'tournament-japan-kyoto': 'japan-kyoto'
    };

    // 尝试从映射中获取，否则尝试直接使用tournamentId作为towerId
    let towerId = tournamentToTowerMap[tournamentId];
    
    // 如果没有映射，尝试解析 tournament-{country}-{state} 格式
    if (!towerId) {
      const match = tournamentId.match(/^tournament-(.+)$/);
      if (match) {
        towerId = match[1];
      }
    }
    
    return this.loadTower(towerId || 'default', options);
  }

  /**
   * 根据URL参数自动加载塔
   * @returns {Object} 塔配置对象
   */
  loadFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const tournamentId = urlParams.get('tournament');
    const towerId = urlParams.get('tower');
    
    if (tournamentId) {
      return this.loadTournamentTower(tournamentId, { animate: true });
    } else if (towerId) {
      return this.loadTower(towerId, { animate: true });
    } else {
      return this.loadTower('default');
    }
  }

  /**
   * 渲染塔到指定容器
   * @param {string} containerId - 容器ID
   * @param {Object} customData - 自定义渲染数据
   */
  renderTower(containerId, customData = null) {
    const targetId = containerId || this.containerId;
    const container = document.getElementById(targetId);
    
    if (!container) {
      console.warn(`[TowerModelManager] Container #${targetId} not found`);
      return;
    }

    if (!this.currentTower) {
      console.warn('[TowerModelManager] No tower loaded');
      return;
    }

    const tower = customData || this.currentTower;
    
    // 构建塔HTML结构
    container.innerHTML = `
      <div class="tower-model tower-model--${tower.type || 'default'}" 
           data-tower-id="${tower.id}"
           data-tower-region="${tower.region || 'unknown'}"
           style="--tower-color: ${tower.color}">
        <div class="tower-model__image-container">
          <img src="${tower.image}" 
               alt="${tower.name}" 
               class="tower-model__image"
               onerror="this.src='assets/towers/default-tower.png'">
          <div class="tower-model__overlay"></div>
        </div>
        <div class="tower-model__info">
          <div class="tower-model__name">${tower.name}</div>
          ${tower.nameEn ? `<div class="tower-model__name-en">${tower.nameEn}</div>` : ''}
          ${tower.description ? `<div class="tower-model__description">${tower.description}</div>` : ''}
        </div>
        <div class="tower-levels-indicator">
          ${this._renderLevelIndicators(tower.levels)}
        </div>
      </div>
    `;

    // 保存当前渲染的容器
    this.towerElement = container.querySelector('.tower-model');
    
    // 添加加载完成样式
    requestAnimationFrame(() => {
      if (this.towerElement) {
        this.towerElement.classList.add('tower-model--loaded');
      }
    });
  }

  /**
   * 渲染层数指示器
   * @private
   */
  _renderLevelIndicators(levels) {
    let indicators = '';
    for (let i = 1; i <= levels; i++) {
      indicators += `<div class="level-indicator" data-level="${i}"></div>`;
    }
    return indicators;
  }

  /**
   * 切换塔模型（带动画）
   * @param {string} towerId - 目标塔ID
   * @param {boolean} animate - 是否启用动画
   * @returns {Promise} 切换完成的Promise
   */
  switchTower(towerId, animate = true) {
    return new Promise((resolve) => {
      if (!animate) {
        this.loadTower(towerId, { silent: true });
        resolve();
        return;
      }

      if (this.isAnimating) {
        console.warn('[TowerModelManager] Animation in progress');
        resolve();
        return;
      }

      this.isAnimating = true;
      const container = document.getElementById(this.containerId);
      
      if (!container) {
        this.loadTower(towerId, { silent: true });
        this.isAnimating = false;
        resolve();
        return;
      }

      // 淡出动画
      container.style.transition = `opacity ${this.animationDuration}ms ease-out`;
      container.style.opacity = '0';

      setTimeout(() => {
        // 加载新塔
        this.loadTower(towerId, { silent: true });
        
        // 淡入动画
        container.style.opacity = '1';
        
        setTimeout(() => {
          this.isAnimating = false;
          resolve();
        }, this.animationDuration);
      }, this.animationDuration);
    });
  }

  /**
   * 转场动画
   * @param {Function} callback - 动画中执行的回调
   * @param {string} type - 动画类型 (fade|slide|zoom)
   */
  animateTransition(callback, type = 'fade') {
    const container = document.getElementById(this.containerId);
    if (!container) {
      callback();
      return;
    }

    const animations = {
      fade: {
        out: { opacity: '0' },
        in: { opacity: '1' },
        duration: this.animationDuration
      },
      slide: {
        out: { transform: 'translateX(-100%)', opacity: '0' },
        in: { transform: 'translateX(0)', opacity: '1' },
        duration: this.animationDuration
      },
      zoom: {
        out: { transform: 'scale(0.8)', opacity: '0' },
        in: { transform: 'scale(1)', opacity: '1' },
        duration: this.animationDuration
      }
    };

    const anim = animations[type] || animations.fade;
    
    // 应用退出动画
    Object.assign(container.style, anim.out);
    container.style.transition = `all ${anim.duration}ms ease-in-out`;

    setTimeout(() => {
      callback();
      
      // 应用进入动画
      requestAnimationFrame(() => {
        Object.assign(container.style, anim.in);
      });
    }, anim.duration);
  }

  /**
   * 获取当前塔配置
   * @returns {Object|null} 当前塔配置
   */
  getCurrentTower() {
    return this.currentTower;
  }

  /**
   * 获取所有可用塔列表
   * @param {Object} filters - 过滤条件 { type, region }
   * @returns {Array} 塔列表
   */
  getAvailableTowers(filters = {}) {
    let towers = Object.values(TOWER_MODELS);
    
    // 应用过滤器
    if (filters.type) {
      towers = towers.filter(t => t.type === filters.type);
    }
    if (filters.region) {
      towers = towers.filter(t => t.region === filters.region);
    }
    if (filters.parent) {
      towers = towers.filter(t => t.parent === filters.parent);
    }
    
    return towers.map(t => ({
      id: t.id,
      name: t.name,
      nameEn: t.nameEn,
      image: t.image,
      color: t.color,
      type: t.type,
      region: t.region,
      parent: t.parent,
      levels: t.levels,
      description: t.description
    }));
  }

  /**
   * 按地区获取塔列表
   * @returns {Object} 按地区分组的塔
   */
  getTowersByRegion() {
    const regions = {};
    
    Object.values(TOWER_MODELS).forEach(tower => {
      const region = tower.region || 'other';
      if (!regions[region]) {
        regions[region] = [];
      }
      regions[region].push(tower);
    });
    
    return regions;
  }

  /**
   * 获取指定国家的省份塔
   * @param {string} countryId - 国家ID
   * @returns {Array} 省份塔列表
   */
  getStatesByCountry(countryId) {
    return Object.values(TOWER_MODELS).filter(tower => 
      tower.type === 'state' && tower.parent === countryId
    );
  }

  /**
   * 注册塔变更回调
   * @param {Function} callback - 回调函数(towerConfig)
   * @returns {Function} 取消注册的函数
   */
  onTowerChange(callback) {
    this.onTowerChangeCallbacks.push(callback);
    
    // 返回取消注册函数
    return () => {
      const index = this.onTowerChangeCallbacks.indexOf(callback);
      if (index > -1) {
        this.onTowerChangeCallbacks.splice(index, 1);
      }
    };
  }

  /**
   * 触发变更回调
   * @private
   */
  _triggerChangeCallbacks(towerConfig) {
    this.onTowerChangeCallbacks.forEach(callback => {
      try {
        callback(towerConfig);
      } catch (error) {
        console.error('[TowerModelManager] Callback error:', error);
      }
    });
  }

  /**
   * 预加载塔图片
   * @param {string|Array} towerIds - 要预加载的塔ID或ID数组
   * @returns {Promise} 加载完成的Promise
   */
  preloadTowers(towerIds) {
    const ids = Array.isArray(towerIds) ? towerIds : [towerIds];
    const promises = [];

    ids.forEach(id => {
      const tower = TOWER_MODELS[id];
      if (tower && tower.image) {
        promises.push(this._preloadImage(tower.image));
      }
    });

    return Promise.all(promises);
  }

  /**
   * 预加载图片
   * @private
   */
  _preloadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = src;
    });
  }

  /**
   * 预加载所有塔图片
   * @returns {Promise} 加载完成的Promise
   */
  preloadAllTowers() {
    const allTowerIds = Object.keys(TOWER_MODELS);
    return this.preloadTowers(allTowerIds);
  }

  /**
   * 销毁管理器
   */
  destroy() {
    this.currentTower = null;
    this.towerElement = null;
    this.onTowerChangeCallbacks = [];
    
    const container = document.getElementById(this.containerId);
    if (container) {
      container.innerHTML = '';
    }
    
    console.log('[TowerModelManager] Destroyed');
  }
}

// 创建全局实例
window.TowerModelManager = TowerModelManager;
window.towerManager = new TowerModelManager();

// 导出（支持模块系统）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TowerModelManager };
}

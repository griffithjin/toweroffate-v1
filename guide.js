/**
 * 命运塔 - 新手引导系统
 * 5步引导流程
 */

class TutorialGuide {
    constructor() {
        this.currentStep = 0;
        this.steps = [
            {
                id: 'welcome',
                title: '欢迎来到命运塔',
                content: '你即将开始一场刺激的扑克冒险！目标是登顶第13层(A层)，成为首登者。',
                highlight: '.game-title',
                position: 'bottom'
            },
            {
                id: 'hand',
                title: '你的手牌',
                content: '你有52张完整的扑克牌。每轮选择一张牌出牌，与守卫对战。记住：出过的牌会消失！',
                highlight: '.hand-area',
                position: 'top'
            },
            {
                id: 'tower',
                title: '命运塔层',
                content: '塔共13层，从2到A。你需要逐层攀登。每层有守卫守护，击败守卫才能前进。',
                highlight: '.tower-layers',
                position: 'right'
            },
            {
                id: 'anger',
                title: '激怒牌机制',
                content: '⚠️ 警告：守卫有激怒牌！如果你出的牌与激怒牌点数或花色一致，会回退一层！完全一致回退两层！',
                highlight: '.anger-cards',
                position: 'left'
            },
            {
                id: 'first',
                title: '成为首登者',
                content: '首位登顶13层的玩家成为首登者，可以控制守卫的激怒牌干扰其他玩家！团队战中全员登顶即获胜。',
                highlight: '.first-conqueror-info',
                position: 'center'
            }
        ];
        
        this.init();
    }
    
    init() {
        // 检查是否是首次游戏
        if (localStorage.getItem('tutorial_completed')) {
            return;
        }
        
        this.createOverlay();
        this.showStep(0);
    }
    
    createOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'tutorial-overlay';
        overlay.innerHTML = `
            <div class="tutorial-backdrop"></div>
            <div class="tutorial-spotlight"></div>
            <div class="tutorial-card">
                <div class="tutorial-header">
                    <span class="tutorial-step">步骤 <span id="step-num">1</span>/5</span>
                    <button class="tutorial-skip" onclick="tutorial.skip()">跳过</button>
                </div>
                <h3 class="tutorial-title"></h3>
                <p class="tutorial-content"></p>
                <div class="tutorial-actions">
                    <button class="tutorial-prev" onclick="tutorial.prev()">上一步</button>
                    <button class="tutorial-next" onclick="tutorial.next()">下一步</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // 添加样式
        const style = document.createElement('style');
        style.textContent = this.getStyles();
        document.head.appendChild(style);
    }
    
    getStyles() {
        return `
            #tutorial-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .tutorial-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
            }
            
            .tutorial-spotlight {
                position: absolute;
                border: 3px solid #ffd700;
                border-radius: 8px;
                box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
                transition: all 0.3s ease;
                pointer-events: none;
            }
            
            .tutorial-card {
                position: relative;
                background: linear-gradient(145deg, #1a1a2e, #16213e);
                border-radius: 16px;
                padding: 24px;
                max-width: 320px;
                width: 90%;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
                border: 1px solid rgba(255, 215, 0, 0.3);
            }
            
            .tutorial-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 16px;
            }
            
            .tutorial-step {
                color: #ffd700;
                font-size: 14px;
                font-weight: bold;
            }
            
            .tutorial-skip {
                background: transparent;
                border: 1px solid rgba(255, 255, 255, 0.3);
                color: #999;
                padding: 4px 12px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 12px;
            }
            
            .tutorial-skip:hover {
                color: #fff;
                border-color: #fff;
            }
            
            .tutorial-title {
                color: #fff;
                font-size: 20px;
                margin-bottom: 12px;
            }
            
            .tutorial-content {
                color: #ccc;
                font-size: 14px;
                line-height: 1.6;
                margin-bottom: 24px;
            }
            
            .tutorial-actions {
                display: flex;
                gap: 12px;
            }
            
            .tutorial-prev,
            .tutorial-next {
                flex: 1;
                padding: 12px;
                border-radius: 8px;
                font-size: 14px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .tutorial-prev {
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: #fff;
            }
            
            .tutorial-prev:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            
            .tutorial-next {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border: none;
                color: #fff;
            }
            
            .tutorial-next:hover {
                transform: scale(1.02);
                box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
            }
            
            .tutorial-prev:disabled {
                opacity: 0.3;
                cursor: not-allowed;
            }
        `;
    }
    
    showStep(index) {
        this.currentStep = index;
        const step = this.steps[index];
        
        // 更新内容
        document.querySelector('#step-num').textContent = index + 1;
        document.querySelector('.tutorial-title').textContent = step.title;
        document.querySelector('.tutorial-content').textContent = step.content;
        
        // 更新按钮状态
        document.querySelector('.tutorial-prev').disabled = index === 0;
        document.querySelector('.tutorial-next').textContent = 
            index === this.steps.length - 1 ? '开始游戏' : '下一步';
        
        // 高亮对应元素
        this.highlightElement(step.highlight);
    }
    
    highlightElement(selector) {
        const element = document.querySelector(selector);
        const spotlight = document.querySelector('.tutorial-spotlight');
        
        if (element && spotlight) {
            const rect = element.getBoundingClientRect();
            spotlight.style.width = rect.width + 20 + 'px';
            spotlight.style.height = rect.height + 20 + 'px';
            spotlight.style.left = rect.left - 10 + 'px';
            spotlight.style.top = rect.top - 10 + 'px';
        }
    }
    
    next() {
        if (this.currentStep < this.steps.length - 1) {
            this.showStep(this.currentStep + 1);
        } else {
            this.complete();
        }
    }
    
    prev() {
        if (this.currentStep > 0) {
            this.showStep(this.currentStep - 1);
        }
    }
    
    skip() {
        this.complete();
    }
    
    complete() {
        localStorage.setItem('tutorial_completed', 'true');
        document.getElementById('tutorial-overlay').remove();
        
        // 发放新手奖励
        this.giveReward();
    }
    
    giveReward() {
        // 发放100钻石+新手卡背
        const reward = {
            diamonds: 100,
            cardBack: 'newbie',
            message: '完成新手引导！获得：100钻石 + 新手卡背'
        };
        
        // 显示奖励弹窗
        this.showRewardModal(reward);
    }
    
    showRewardModal(reward) {
        const modal = document.createElement('div');
        modal.className = 'reward-modal';
        modal.innerHTML = `
            <div class="reward-content">
                <h2>🎉 恭喜!</h2>
                <p>${reward.message}</p>
                <button onclick="this.closest('.reward-modal').remove()">领取</button>
            </div>
        `;
        document.body.appendChild(modal);
    }
}

// 全局实例
let tutorial;

// 页面加载后自动启动引导
document.addEventListener('DOMContentLoaded', () => {
    tutorial = new TutorialGuide();
});

// 导出供外部调用
window.TutorialGuide = TutorialGuide;
window.startTutorial = () => {
    localStorage.removeItem('tutorial_completed');
    tutorial = new TutorialGuide();
};

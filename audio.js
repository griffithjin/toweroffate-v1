/**
 * 命运塔 - 音效系统
 * 为游戏添加出牌、胜利等音效反馈
 */

class AudioManager {
    constructor() {
        this.sounds = {};
        this.enabled = true;
        this.volume = 0.7;
        
        this.init();
    }
    
    init() {
        // 预定义音效路径（使用在线CDN或本地资源）
        this.soundPaths = {
            playCard: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/sounds/card.mp3',
            win: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/sounds/success.mp3',
            lose: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/sounds/fail.mp3',
            anger: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/sounds/alert.mp3',
            levelUp: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/sounds/levelup.mp3',
            bgm: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/sounds/bgm.mp3'
        };
        
        // 实际项目中应该使用本地音频文件
        // 这里使用占位符，实际部署时替换为真实音频URL
        this.loadSounds();
    }
    
    loadSounds() {
        // 创建音频对象
        Object.keys(this.soundPaths).forEach(key => {
            try {
                const audio = new Audio(this.soundPaths[key]);
                audio.volume = this.volume;
                this.sounds[key] = audio;
            } catch (e) {
                console.warn(`无法加载音效: ${key}`);
            }
        });
    }
    
    play(soundName) {
        if (!this.enabled || !this.sounds[soundName]) return;
        
        const sound = this.sounds[soundName].cloneNode();
        sound.volume = this.volume;
        sound.play().catch(e => {
            // 用户未交互前无法播放音频，这是正常的
            console.log('音效播放被阻止，等待用户交互');
        });
    }
    
    playCard() {
        this.play('playCard');
    }
    
    playWin() {
        this.play('win');
    }
    
    playLose() {
        this.play('lose');
    }
    
    playAnger() {
        this.play('anger');
    }
    
    playLevelUp() {
        this.play('levelUp');
    }
    
    playBGM() {
        if (!this.enabled || !this.sounds['bgm']) return;
        
        this.sounds['bgm'].loop = true;
        this.sounds['bgm'].play().catch(e => {
            console.log('背景音乐播放被阻止');
        });
    }
    
    stopBGM() {
        if (this.sounds['bgm']) {
            this.sounds['bgm'].pause();
            this.sounds['bgm'].currentTime = 0;
        }
    }
    
    toggle() {
        this.enabled = !this.enabled;
        
        if (!this.enabled) {
            this.stopBGM();
        }
        
        return this.enabled;
    }
    
    setVolume(vol) {
        this.volume = Math.max(0, Math.min(1, vol));
        
        Object.values(this.sounds).forEach(sound => {
            sound.volume = this.volume;
        });
    }
}

// 全局音频管理器实例
const audioManager = new AudioManager();

// 导出
window.AudioManager = AudioManager;
window.audioManager = audioManager;

// 自动播放背景音乐（需要用户交互）
document.addEventListener('click', () => {
    audioManager.playBGM();
}, { once: true });

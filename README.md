# 命运塔·首登者 V1.0
# Tower of Fate: First Ascender V1.0

## 🎮 游戏简介

《命运塔·首登者》是一款基于扑克牌的记忆与概率策略游戏。

### 核心玩法
- **4副牌208张**：♥️♠️♦️♣️ A-2-3-4-5-6-7-8-9-10-J-Q-K
- **13守卫系统**：每名守卫13张守卫牌 + 3张激怒牌
- **首登者机制**：首位登顶者控制守卫，策略性发动激怒牌
- **三种模式**：个人赛、团队赛、连胜模式

## 🌍 全球发布版本

**版本**: V1.0.0  
**发布日期**: 2026-03-05  
**开发者**: 小金蛇 (Golden Snake)  
**版权所有**: 金先生

## 📱 重点适配机型

| 机型 | 屏幕宽度 | 缩放比例 |
|------|---------|---------|
| iPhone SE/8 | 375px | 0.85x |
| iPhone 14/15/16 | 390-402px | 0.90x |
| iPhone Pro Max | 430px | 1.00x |
| 华为 Mate X6 折叠屏 | 700-800px | 1.20x |
| Samsung Galaxy/Pixel | 360-390px | 0.88x |
| Android大屏 | 412px | 0.95x |

## 🛠️ 技术栈

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **后端**: Python, WebSocket
- **设备适配**: CSS变量 + rem单位 + 动态检测
- **特效系统**: CSS动画 + Canvas粒子

## 🚀 快速开始

### 本地启动

```bash
# 1. 克隆仓库
git clone https://github.com/yourusername/toweroffate-v1.git
cd toweroffate-v1

# 2. 启动客户端
cd web_client
python3 -m http.server 8080

# 3. 启动服务器 (新终端)
cd ../server
python3 websocket_server.py

# 4. 访问游戏
open http://localhost:8080
```

### Wi-Fi 测试

同一Wi-Fi下，手机访问：
```
http://[电脑IP]:8080
```

## 🎨 功能特性

### 游戏系统
- ✅ 4副牌208张完整牌组
- ✅ 13守卫 × (13张守卫牌 + 3张激怒牌)
- ✅ 首登者控制系统
- ✅ 1000分积分制
- ✅ 三种游戏模式

### 商城系统
- ✅ 24款商品
- ✅ 6款卡牌皮肤
- ✅ 6款出牌特效
- ✅ 6款卡背
- ✅ 6款头像框

### 锦标赛系统
- ✅ 每日争霸赛
- ✅ 周末大奖赛
- ✅ 月度王者赛
- ✅ 连胜挑战赛

### 技术特性
- ✅ 6类机型精确适配
- ✅ iOS安全区适配
- ✅ 120Hz/144Hz高刷优化
- ✅ 折叠屏特殊处理
- ✅ 18个AI系统玩家

## 📁 项目结构

```
toweroffate_v1.0/
├── web_client/          # 前端代码
│   ├── index.html
│   ├── style-v1.0.css
│   ├── device-adaptive-v1.0.css
│   ├── core-game-v1.0.js
│   ├── game-controller-v1.0.js
│   ├── device-effects-v1.0.js
│   ├── shop-data-v1.0.js
│   ├── shop.html
│   └── tournament.html
├── server/              # 后端代码
│   ├── main.py
│   └── websocket_server.py
├── admin/               # 后台管理
│   └── index.html
└── README.md
```

## 🌐 全球发布检查清单

- [x] 核心游戏逻辑完整
- [x] 移动端完全适配
- [x] 多语言支持框架
- [x] 道具效果系统
- [x] 商城/锦标赛系统
- [x] WebSocket服务器
- [x] AI系统玩家
- [x] 后台管理系统
- [x] GitHub 开源

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献者

- **金先生** - 产品设计与游戏策划
- **小金蛇** - 全栈开发

## 📞 联系我们

- GitHub: https://github.com/yourusername/toweroffate-v1
- Email: contact@toweroffate.com

---

_金蛇盘踞，守财守心 🐍_

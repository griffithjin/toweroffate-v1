#!/usr/bin/env python3
"""
命运塔·首登者 V1.0 - WebSocket多人对战服务器
First Ascender V1.0 - WebSocket Multiplayer Server

支持功能:
- 实时多人对战 (WebSocket)
- 房间系统
- 匹配系统
- AI系统玩家 (18个)
- 首登者逻辑同步
- 激怒牌同步
"""

import asyncio
import websockets
import json
import random
import time
from typing import Dict, List, Set
from dataclasses import dataclass, field
from enum import Enum

# ============================================
# 常量定义
# ============================================
class GameMode(Enum):
    SOLO = "solo"
    TEAM = "team"
    STREAK = "streak"

class GameState(Enum):
    WAITING = "waiting"
    PLAYING = "playing"
    ENDED = "ended"

# 卡牌定义
SUITS = ['♥', '♦', '♣', '♠']
RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

# ============================================
# 数据类
# ============================================
@dataclass
class Card:
    suit: str
    rank: str
    
    def to_dict(self):
        return {"suit": self.suit, "rank": self.rank}
    
    @classmethod
    def from_dict(cls, data):
        return cls(data["suit"], data["rank"])

@dataclass
class Guard:
    level: int
    guard_cards: List[Card] = field(default_factory=list)
    provocation_cards: List[Card] = field(default_factory=list)
    used_guard_cards: List[Card] = field(default_factory=list)
    used_provocation_cards: List[Card] = field(default_factory=list)
    is_defeated: bool = False

@dataclass
class Player:
    player_id: str
    name: str
    websocket = None
    is_ai: bool = False
    level: int = 1
    start_level: int = 1
    hand_cards: List[Card] = field(default_factory=list)
    played_cards: List[Card] = field(default_factory=list)
    is_first_ascender: bool = False
    has_reached_top: bool = False
    is_eliminated: bool = False
    team: int = 0  # 0=无队伍, 1=队伍1, 2=队伍2
    
    def to_dict(self):
        return {
            "player_id": self.player_id,
            "name": self.name,
            "is_ai": self.is_ai,
            "level": self.level,
            "start_level": self.start_level,
            "hand_count": len(self.hand_cards),
            "is_first_ascender": self.is_first_ascender,
            "has_reached_top": self.has_reached_top,
            "is_eliminated": self.is_eliminated,
            "team": self.team
        }

@dataclass
class Room:
    room_id: str
    mode: GameMode
    max_players: int
    players: Dict[str, Player] = field(default_factory=dict)
    spectators: List = field(default_factory=list)
    state: GameState = GameState.WAITING
    guards: List[Guard] = field(default_factory=list)
    current_round: int = 0
    current_player_index: int = 0
    first_ascender: str = None
    highest_defeated_level: int = 0
    created_at: float = field(default_factory=time.time)
    
    def to_dict(self):
        return {
            "room_id": self.room_id,
            "mode": self.mode.value,
            "max_players": self.max_players,
            "player_count": len(self.players),
            "state": self.state.value,
            "players": {pid: p.to_dict() for pid, p in self.players.items()}
        }

# ============================================
# 游戏逻辑
# ============================================
class GameLogic:
    @staticmethod
    def generate_deck():
        """生成一副牌"""
        return [Card(s, r) for s in SUITS for r in RANKS]
    
    @staticmethod
    def generate_game_deck():
        """生成4副牌 (208张)"""
        deck = []
        for _ in range(4):
            deck.extend(GameLogic.generate_deck())
        random.shuffle(deck)
        return deck
    
    @staticmethod
    def is_match(card1: Card, card2: Card) -> bool:
        """检查两张牌是否匹配 (花色或点数)"""
        return card1.suit == card2.suit or card1.rank == card2.rank
    
    @staticmethod
    def is_exact_match(card1: Card, card2: Card) -> bool:
        """检查是否完全匹配"""
        return card1.suit == card2.suit and card1.rank == card2.rank

# ============================================
# AI玩家系统
# ============================================
class AIPlayerSystem:
    """AI系统玩家管理器"""
    
    def __init__(self):
        self.ai_names = [
            "守护者", "攀登者", "挑战者", "征服者",
            "勇士", "智者", "谋略家", "战术家",
            "冒险家", "探索者", "先锋", "领袖",
            "大师", "宗师", "传奇", "神话",
            "魔王", "神王"
        ]
        self.ai_players: Dict[str, Player] = {}
        self._init_ai_players()
    
    def _init_ai_players(self):
        """初始化18个AI玩家"""
        for i, name in enumerate(self.ai_names):
            player_id = f"ai_{i+1}"
            self.ai_players[player_id] = Player(
                player_id=player_id,
                name=f"AI·{name}",
                is_ai=True
            )
    
    def get_available_ai(self, count: int = 1) -> List[Player]:
        """获取指定数量的可用AI玩家"""
        available = list(self.ai_players.values())
        return random.sample(available, min(count, len(available)))
    
    def make_decision(self, player: Player, game_state: dict) -> int:
        """AI决策出牌"""
        if not player.hand_cards:
            return -1
        
        # 简单AI策略：随机选择
        # 进阶AI可以在这里实现记牌、概率计算等
        return random.randint(0, len(player.hand_cards) - 1)
    
    def select_provocation(self, player: Player, guard: Guard) -> int:
        """AI选择激怒牌"""
        if not guard.provocation_cards:
            return -1
        return random.randint(0, len(guard.provocation_cards) - 1)
    
    def select_guard_card(self, player: Player, guard: Guard) -> int:
        """AI选择守卫牌 (作为首登者)"""
        if not guard.guard_cards:
            return -1
        return random.randint(0, len(guard.guard_cards) - 1)

# ============================================
# 房间管理器
# ============================================
class RoomManager:
    def __init__(self):
        self.rooms: Dict[str, Room] = {}
        self.player_rooms: Dict[str, str] = {}  # player_id -> room_id
        self.ai_system = AIPlayerSystem()
    
    def create_room(self, mode: GameMode, max_players: int = 4) -> Room:
        """创建房间"""
        room_id = f"room_{int(time.time())}_{random.randint(1000, 9999)}"
        room = Room(
            room_id=room_id,
            mode=mode,
            max_players=max_players
        )
        self.rooms[room_id] = room
        return room
    
    def join_room(self, room_id: str, player: Player) -> bool:
        """加入房间"""
        if room_id not in self.rooms:
            return False
        
        room = self.rooms[room_id]
        if len(room.players) >= room.max_players:
            return False
        
        room.players[player.player_id] = player
        self.player_rooms[player.player_id] = room_id
        
        # 检查是否可以开始游戏
        if len(room.players) == room.max_players:
            asyncio.create_task(self.start_game(room_id))
        
        return True
    
    def leave_room(self, player_id: str):
        """离开房间"""
        if player_id not in self.player_rooms:
            return
        
        room_id = self.player_rooms[player_id]
        if room_id in self.rooms:
            room = self.rooms[room_id]
            if player_id in room.players:
                del room.players[player_id]
            
            # 如果房间空了，删除房间
            if len(room.players) == 0:
                del self.rooms[room_id]
        
        del self.player_rooms[player_id]
    
    async def start_game(self, room_id: str):
        """开始游戏"""
        if room_id not in self.rooms:
            return
        
        room = self.rooms[room_id]
        room.state = GameState.PLAYING
        
        # 初始化游戏
        self._init_game(room)
        
        # 广播游戏开始
        await self.broadcast(room_id, {
            "type": "game_started",
            "room": room.to_dict()
        })
    
    def _init_game(self, room: Room):
        """初始化游戏状态"""
        # 生成牌库
        game_deck = GameLogic.generate_game_deck()
        
        # 创建守卫
        for i in range(13):
            guard = Guard(level=i+1)
            # 抽取13张守卫牌
            guard.guard_cards = game_deck[:13]
            game_deck = game_deck[13:]
            # 抽取3张激怒牌
            guard.provocation_cards = game_deck[:3]
            game_deck = game_deck[3:]
            room.guards.append(guard)
        
        # 给每个玩家发牌 (52张)
        for player in room.players.values():
            player.hand_cards = game_deck[:52]
            game_deck = game_deck[52:]
    
    async def broadcast(self, room_id: str, message: dict):
        """广播消息给房间所有玩家"""
        if room_id not in self.rooms:
            return
        
        room = self.rooms[room_id]
        for player in room.players.values():
            if player.websocket and not player.is_ai:
                try:
                    await player.websocket.send(json.dumps(message))
                except:
                    pass

# ============================================
# WebSocket服务器
# ============================================
class GameServer:
    def __init__(self):
        self.room_manager = RoomManager()
        self.connected_players: Dict[str, Player] = {}
    
    async def handle_connection(self, websocket, path):
        """处理WebSocket连接"""
        player_id = None
        
        try:
            async for message in websocket:
                data = json.loads(message)
                await self.handle_message(websocket, data)
                
        except websockets.exceptions.ConnectionClosed:
            pass
        finally:
            # 断开连接清理
            if player_id:
                self.room_manager.leave_room(player_id)
                if player_id in self.connected_players:
                    del self.connected_players[player_id]
    
    async def handle_message(self, websocket, data: dict):
        """处理客户端消息"""
        msg_type = data.get("type")
        
        if msg_type == "login":
            await self.handle_login(websocket, data)
        
        elif msg_type == "create_room":
            await self.handle_create_room(websocket, data)
        
        elif msg_type == "join_room":
            await self.handle_join_room(websocket, data)
        
        elif msg_type == "quick_match":
            await self.handle_quick_match(websocket, data)
        
        elif msg_type == "play_card":
            await self.handle_play_card(websocket, data)
        
        elif msg_type == "use_provocation":
            await self.handle_use_provocation(websocket, data)
        
        elif msg_type == "get_room_list":
            await self.handle_get_room_list(websocket)
    
    async def handle_login(self, websocket, data: dict):
        """处理登录"""
        player_id = data.get("player_id") or f"player_{int(time.time())}"
        player_name = data.get("player_name", "玩家")
        
        player = Player(
            player_id=player_id,
            name=player_name,
            websocket=websocket
        )
        
        self.connected_players[player_id] = player
        
        await websocket.send(json.dumps({
            "type": "login_success",
            "player_id": player_id,
            "player": player.to_dict()
        }))
    
    async def handle_create_room(self, websocket, data: dict):
        """处理创建房间"""
        player_id = data.get("player_id")
        mode = GameMode(data.get("mode", "solo"))
        max_players = data.get("max_players", 4)
        
        if player_id not in self.connected_players:
            await websocket.send(json.dumps({
                "type": "error",
                "message": "请先登录"
            }))
            return
        
        room = self.room_manager.create_room(mode, max_players)
        player = self.connected_players[player_id]
        self.room_manager.join_room(room.room_id, player)
        
        await websocket.send(json.dumps({
            "type": "room_created",
            "room": room.to_dict()
        }))
    
    async def handle_join_room(self, websocket, data: dict):
        """处理加入房间"""
        player_id = data.get("player_id")
        room_id = data.get("room_id")
        
        if player_id not in self.connected_players:
            await websocket.send(json.dumps({
                "type": "error",
                "message": "请先登录"
            }))
            return
        
        player = self.connected_players[player_id]
        success = self.room_manager.join_room(room_id, player)
        
        if success:
            await websocket.send(json.dumps({
                "type": "room_joined",
                "room_id": room_id
            }))
            
            # 通知其他玩家
            await self.room_manager.broadcast(room_id, {
                "type": "player_joined",
                "player": player.to_dict()
            })
        else:
            await websocket.send(json.dumps({
                "type": "error",
                "message": "加入房间失败"
            }))
    
    async def handle_quick_match(self, websocket, data: dict):
        """处理快速匹配"""
        player_id = data.get("player_id")
        mode = GameMode(data.get("mode", "solo"))
        
        if player_id not in self.connected_players:
            await websocket.send(json.dumps({
                "type": "error",
                "message": "请先登录"
            }))
            return
        
        player = self.connected_players[player_id]
        
        # 查找可用房间
        for room in self.room_manager.rooms.values():
            if room.mode == mode and len(room.players) < room.max_players:
                if self.room_manager.join_room(room.room_id, player):
                    await websocket.send(json.dumps({
                        "type": "match_found",
                        "room_id": room.room_id
                    }))
                    return
        
        # 没有可用房间，创建新房间并填充AI
        room = self.room_manager.create_room(mode, 4)
        self.room_manager.join_room(room.room_id, player)
        
        # 添加AI玩家
        ai_count = 3 if mode == GameMode.SOLO else 3
        for ai_player in self.room_manager.ai_system.get_available_ai(ai_count):
            ai_player_copy = Player(
                player_id=ai_player.player_id,
                name=ai_player.name,
                is_ai=True
            )
            self.room_manager.join_room(room.room_id, ai_player_copy)
        
        await websocket.send(json.dumps({
            "type": "match_found",
            "room_id": room.room_id,
            "ai_filled": True
        }))
    
    async def handle_play_card(self, websocket, data: dict):
        """处理出牌"""
        # 实现游戏逻辑...
        pass
    
    async def handle_use_provocation(self, websocket, data: dict):
        """处理使用激怒牌"""
        # 实现激怒牌逻辑...
        pass
    
    async def handle_get_room_list(self, websocket):
        """获取房间列表"""
        rooms = [
            room.to_dict()
            for room in self.room_manager.rooms.values()
            if room.state == GameState.WAITING
        ]
        
        await websocket.send(json.dumps({
            "type": "room_list",
            "rooms": rooms
        }))

# ============================================
# 启动服务器
# ============================================
async def main():
    server = GameServer()
    
    print("🎮 命运塔·首登者 V1.0 服务器启动中...")
    print("📡 WebSocket 端口: 7777")
    print("🤖 AI系统玩家: 18个已就绪")
    
    async with websockets.serve(
        server.handle_connection,
        "0.0.0.0",
        7777,
        ping_interval=20,
        ping_timeout=10
    ):
        print("✅ 服务器已启动!")
        await asyncio.Future()  # 永久运行

if __name__ == "__main__":
    asyncio.run(main())

#!/usr/bin/env python3
"""
命运塔·首登者 V1.0 - 系统玩家生成器
System Player Generator

每接入1个测试玩家，自动生成18个系统玩家
18个系统玩家随时准备介入测试玩家的游戏对局
"""

import asyncio
import websockets
import json
import random
import time
from typing import Dict, List, Set
from dataclasses import dataclass

# 系统玩家配置
SYSTEM_PLAYER_MULTIPLIER = 18  # 倍数
SYSTEM_PLAYER_NAMES = [
    "守护者·艾隆", "攀登者·莱昂", "挑战者·雷克斯", "征服者·凯撒",
    "勇士·阿瑞斯", "智者·梅林", "谋略家·诸葛", "战术家·孙武",
    "冒险家·哥伦布", "探索者·麦哲伦", "先锋·凯撒", "领袖·拿破仑",
    "大师·达芬奇", "宗师·米开朗基罗", "传奇·亚瑟", "神话·宙斯",
    "魔王·撒旦", "神王·奥丁", "勇者·罗宾汉", "骑士·兰斯洛特",
    "法师·甘道夫", "刺客·哈桑", "游侠·莱戈拉斯", "祭司·伊西斯",
    "巫师·邓布利多", "战士·赫拉克勒斯", "射手·阿波罗", "德鲁伊·塞纳留斯"
]

@dataclass
class SystemPlayer:
    """系统玩家"""
    player_id: str
    name: str
    websocket = None
    status: str = "online"  # online, playing, ready
    current_room: str = None
    skill_level: float = 0.5  # 0.0-1.0，AI难度
    
    def to_dict(self):
        return {
            "player_id": self.player_id,
            "name": self.name,
            "status": self.status,
            "is_ai": True
        }

class SystemPlayerManager:
    """系统玩家管理器"""
    
    def __init__(self):
        self.system_players: Dict[str, SystemPlayer] = {}
        self.test_players: Set[str] = set()
        self.ready_pool: List[SystemPlayer] = []  # 准备就绪的系统玩家
        self.active_games: Dict[str, List[str]] = {}  # 进行中的对局
        
    def generate_system_players(self, count: int = 18):
        """生成指定数量的系统玩家"""
        new_players = []
        
        for i in range(count):
            player_id = f"sys_{int(time.time())}_{i}_{random.randint(1000, 9999)}"
            name = random.choice(SYSTEM_PLAYER_NAMES)
            
            # 确保名字唯一
            used_names = [p.name for p in self.system_players.values()]
            if name in used_names:
                name = f"{name}·{len(used_names) + 1}"
            
            player = SystemPlayer(
                player_id=player_id,
                name=name,
                skill_level=random.uniform(0.3, 0.7)  # 中等难度
            )
            
            self.system_players[player_id] = player
            self.ready_pool.append(player)
            new_players.append(player)
        
        return new_players
    
    def on_test_player_join(self, test_player_id: str):
        """当测试玩家加入时触发"""
        if test_player_id in self.test_players:
            return
        
        self.test_players.add(test_player_id)
        
        # 生成18个系统玩家
        new_players = self.generate_system_players(SYSTEM_PLAYER_MULTIPLIER)
        
        print(f"\n🎮 新测试玩家加入: {test_player_id}")
        print(f"🤖 自动生成 {len(new_players)} 个系统玩家")
        print(f"📊 当前统计:")
        print(f"   测试玩家: {len(self.test_players)} 人")
        print(f"   系统玩家: {len(self.system_players)} 人")
        print(f"   准备就绪: {len(self.ready_pool)} 人")
        
        return new_players
    
    def get_ready_players(self, count: int = 3) -> List[SystemPlayer]:
        """获取指定数量的就绪系统玩家"""
        if len(self.ready_pool) < count:
            # 如果不够，再生成一些
            self.generate_system_players(count - len(self.ready_pool))
        
        players = self.ready_pool[:count]
        self.ready_pool = self.ready_pool[count:]
        
        # 标记为游戏中
        for p in players:
            p.status = "playing"
        
        return players
    
    def return_to_pool(self, player_ids: List[str]):
        """将玩家返回到就绪池"""
        for pid in player_ids:
            if pid in self.system_players:
                player = self.system_players[pid]
                player.status = "ready"
                player.current_room = None
                self.ready_pool.append(player)
    
    def simulate_ai_turn(self, player: SystemPlayer, game_state: dict) -> dict:
        """模拟AI出牌"""
        # 简单AI逻辑
        import random
        
        # 延迟2秒（比真人慢）
        time.sleep(2)
        
        # 随机选择手牌
        hand_cards = game_state.get("hand_cards", [])
        if not hand_cards:
            return {"action": "pass"}
        
        card_index = random.randint(0, len(hand_cards) - 1)
        
        return {
            "action": "play_card",
            "card_index": card_index,
            "player_id": player.player_id
        }
    
    def get_stats(self) -> dict:
        """获取统计信息"""
        return {
            "test_players": len(self.test_players),
            "system_players": len(self.system_players),
            "ready_pool": len(self.ready_pool),
            "active_games": len(self.active_games),
            "multiplier": SYSTEM_PLAYER_MULTIPLIER
        }

# 全局管理器实例
manager = SystemPlayerManager()

async def handle_websocket(websocket, path):
    """处理WebSocket连接"""
    test_player_id = None
    
    try:
        async for message in websocket:
            data = json.loads(message)
            msg_type = data.get("type")
            
            if msg_type == "test_player_join":
                test_player_id = data.get("player_id")
                new_players = manager.on_test_player_join(test_player_id)
                
                await websocket.send(json.dumps({
                    "type": "system_players_generated",
                    "count": len(new_players),
                    "players": [p.to_dict() for p in new_players],
                    "stats": manager.get_stats()
                }))
            
            elif msg_type == "request_ai_players":
                count = data.get("count", 3)
                players = manager.get_ready_players(count)
                
                await websocket.send(json.dumps({
                    "type": "ai_players_assigned",
                    "players": [p.to_dict() for p in players]
                }))
            
            elif msg_type == "get_stats":
                await websocket.send(json.dumps({
                    "type": "stats",
                    "data": manager.get_stats()
                }))
            
            elif msg_type == "simulate_turn":
                player_id = data.get("player_id")
                game_state = data.get("game_state", {})
                
                if player_id in manager.system_players:
                    player = manager.system_players[player_id]
                    result = manager.simulate_ai_turn(player, game_state)
                    
                    await websocket.send(json.dumps({
                        "type": "ai_turn_result",
                        "result": result
                    }))
    
    except websockets.exceptions.ConnectionClosed:
        pass
    finally:
        if test_player_id:
            print(f"测试玩家断开连接: {test_player_id}")

async def main():
    """启动系统玩家服务器"""
    print("=" * 60)
    print("🤖 命运塔·首登者 - 系统玩家生成器")
    print("=" * 60)
    print()
    print(f"配置: 每1个测试玩家 → 自动生成 {SYSTEM_PLAYER_MULTIPLIER} 个系统玩家")
    print("WebSocket 端口: 7778")
    print()
    print("等待测试玩家接入...")
    print()
    
    async with websockets.serve(handle_websocket, "0.0.0.0", 7778):
        await asyncio.Future()  # 永久运行

if __name__ == "__main__":
    asyncio.run(main())

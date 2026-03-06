#!/usr/bin/env python3
"""
巴西州卡通塔图片生成器
愤怒的小鸟风格卡通塔
"""

import os
from PIL import Image, ImageDraw, ImageFilter
import math

# 输出目录
OUTPUT_DIR = "/Users/moutai/Desktop/toweroffate_v1.0/assets/towers/states/brazil"

# 确保输出目录存在
os.makedirs(OUTPUT_DIR, exist_ok=True)

# 图片尺寸
WIDTH, HEIGHT = 800, 1200

def create_sky_gradient(width, height):
    """创建天蓝色渐变背景"""
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)
    
    # 从天蓝色到浅蓝色的渐变
    for y in range(height):
        # 顶部是较亮的天蓝色，底部是较浅的天蓝色
        ratio = y / height
        r = int(135 - ratio * 40)  # 135 -> 95
        g = int(206 - ratio * 30)  # 206 -> 176
        b = int(235 - ratio * 20)  # 235 -> 215
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    return img

def add_clouds(draw, width, height):
    """添加卡通云朵"""
    cloud_positions = [
        (100, 100, 0.8),
        (600, 150, 0.6),
        (400, 80, 0.5),
        (700, 250, 0.7),
        (50, 300, 0.4),
    ]
    
    for x, y, scale in cloud_positions:
        # 绘制简单的云朵形状
        r = int(40 * scale)
        # 主云体
        draw.ellipse([x-r, y-r, x+r, y+r], fill=(255, 255, 255, 200))
        draw.ellipse([x-r*0.5, y-r*1.2, x+r*0.8, y+r*0.3], fill=(255, 255, 255, 200))
        draw.ellipse([x+r*0.2, y-r*1.1, x+r*1.2, y+r*0.4], fill=(255, 255, 255, 200))

def draw_cute_eyes(draw, cx, cy, size=30, looking_direction="center"):
    """绘制可爱的卡通眼睛（愤怒的小鸟风格）"""
    eye_offset = size * 0.6
    eye_size = size * 0.35
    
    # 左眼白
    draw.ellipse([cx - eye_offset - eye_size, cy - eye_size, 
                  cx - eye_offset + eye_size, cy + eye_size], 
                 fill=(255, 255, 255), outline=(0, 0, 0), width=2)
    
    # 右眼白
    draw.ellipse([cx + eye_offset - eye_size, cy - eye_size, 
                  cx + eye_offset + eye_size, cy + eye_size], 
                 fill=(255, 255, 255), outline=(0, 0, 0), width=2)
    
    # 瞳孔偏移
    pupil_offset = size * 0.15
    if looking_direction == "left":
        px_offset = -pupil_offset
    elif looking_direction == "right":
        px_offset = pupil_offset
    else:
        px_offset = 0
    
    pupil_size = eye_size * 0.5
    
    # 左瞳孔
    draw.ellipse([cx - eye_offset + px_offset - pupil_size, cy - pupil_size, 
                  cx - eye_offset + px_offset + pupil_size, cy + pupil_size], 
                 fill=(0, 0, 0))
    
    # 右瞳孔
    draw.ellipse([cx + eye_offset + px_offset - pupil_size, cy - pupil_size, 
                  cx + eye_offset + px_offset + pupil_size, cy + pupil_size], 
                 fill=(0, 0, 0))
    
    # 高光
    highlight_size = pupil_size * 0.4
    draw.ellipse([cx - eye_offset + px_offset - highlight_size*0.5, cy - highlight_size, 
                  cx - eye_offset + px_offset + highlight_size*0.5, cy], 
                 fill=(255, 255, 255))
    draw.ellipse([cx + eye_offset + px_offset - highlight_size*0.5, cy - highlight_size, 
                  cx + eye_offset + px_offset + highlight_size*0.5, cy], 
                 fill=(255, 255, 255))

def draw_cute_mouth(draw, cx, cy, size=20, expression="happy"):
    """绘制可爱的嘴巴"""
    if expression == "happy":
        # 微笑
        draw.arc([cx - size, cy - size//2, cx + size, cy + size], 
                start=0, end=180, fill=(0, 0, 0), width=3)
    elif expression == "surprised":
        # 惊讶的小圆圈
        draw.ellipse([cx - size//2, cy - size//2, cx + size//2, cy + size//2], 
                    fill=(0, 0, 0))
    elif expression == "determined":
        # 坚定的小嘴
        draw.line([cx - size, cy, cx + size, cy], fill=(0, 0, 0), width=3)

def draw_eyebrows(draw, cx, cy, size=25, style="angry"):
    """绘制眉毛（愤怒的小鸟风格）"""
    if style == "angry":
        # 愤怒的小鸟经典倾斜眉毛
        brow_y = cy - size * 1.5
        draw.polygon([
            (cx - size * 1.5, brow_y + 10),
            (cx - size * 0.3, brow_y - 5),
            (cx + size * 0.3, brow_y - 5),
            (cx + size * 1.5, brow_y + 10),
            (cx + size * 1.5, brow_y + 18),
            (cx - size * 1.5, brow_y + 18),
        ], fill=(139, 69, 19), outline=(0, 0, 0), width=2)
    elif style == "neutral":
        # 平直眉毛
        brow_y = cy - size * 1.5
        draw.rectangle([cx - size * 1.2, brow_y, cx + size * 1.2, brow_y + 8], 
                      fill=(139, 69, 19), outline=(0, 0, 0), width=2)

def add_cartoon_shadow(draw, shape_points, color=(0, 0, 0, 80)):
    """添加卡通风格的阴影"""
    shadow_offset = 8
    shadow_points = [(p[0] + shadow_offset, p[1] + shadow_offset) for p in shape_points]
    draw.polygon(shadow_points, fill=color)

# ========== 1. 圣保罗大教堂塔 ==========
def create_sao_paulo_cathedral():
    """圣保罗大教堂 - 哥特式建筑风格"""
    img = create_sky_gradient(WIDTH, HEIGHT)
    draw = ImageDraw.Draw(img)
    
    # 添加云朵
    add_clouds(draw, WIDTH, HEIGHT)
    
    cx, cy = WIDTH // 2, HEIGHT // 2 + 50
    tower_width = 300
    tower_height = 600
    
    # 塔身颜色 - 教堂石灰色
    stone_color = (180, 175, 165)
    dark_stone = (140, 135, 125)
    roof_color = (60, 60, 80)
    
    # 阴影
    shadow_points = [
        (cx - tower_width//2 + 10, cy + tower_height//2),
        (cx + tower_width//2 + 20, cy + tower_height//2),
        (cx + tower_width//2 + 30, cy + tower_height//2 + 20),
        (cx - tower_width//2 + 20, cy + tower_height//2 + 20),
    ]
    draw.polygon(shadow_points, fill=(0, 0, 0, 100))
    
    # 塔身主体（圆角矩形）
    body_rect = [
        cx - tower_width//2, cy - tower_height//2,
        cx + tower_width//2, cy + tower_height//2
    ]
    draw.rounded_rectangle(body_rect, radius=30, fill=stone_color, outline=(0, 0, 0), width=3)
    
    # 塔身装饰条纹
    for i in range(-2, 3):
        x = cx + i * 60
        draw.line([(x, cy - tower_height//2 + 50), (x, cy + tower_height//2 - 50)], 
                 fill=dark_stone, width=8)
    
    # 双塔结构（圣保罗大教堂特色）
    spire_width = 80
    spire_height = 200
    
    # 左塔
    left_spire = [
        (cx - tower_width//3 - spire_width//2, cy - tower_height//2 - spire_height + 50),
        (cx - tower_width//3 + spire_width//2, cy - tower_height//2 - spire_height + 50),
        (cx - tower_width//3 + spire_width//3, cy - tower_height//2 + 50),
        (cx - tower_width//3 - spire_width//3, cy - tower_height//2 + 50),
    ]
    draw.polygon(left_spire, fill=stone_color, outline=(0, 0, 0), width=3)
    
    # 左塔尖顶
    left_peak = [
        (cx - tower_width//3, cy - tower_height//2 - spire_height + 50),
        (cx - tower_width//3 - 15, cy - tower_height//2 - spire_height - 50),
        (cx - tower_width//3 + 15, cy - tower_height//2 - spire_height - 50),
    ]
    draw.polygon(left_peak, fill=roof_color, outline=(0, 0, 0), width=2)
    
    # 右塔
    right_spire = [
        (cx + tower_width//3 - spire_width//2, cy - tower_height//2 - spire_height + 50),
        (cx + tower_width//3 + spire_width//2, cy - tower_height//2 - spire_height + 50),
        (cx + tower_width//3 + spire_width//3, cy - tower_height//2 + 50),
        (cx + tower_width//3 - spire_width//3, cy - tower_height//2 + 50),
    ]
    draw.polygon(right_spire, fill=stone_color, outline=(0, 0, 0), width=3)
    
    # 右塔尖顶
    right_peak = [
        (cx + tower_width//3, cy - tower_height//2 - spire_height + 50),
        (cx + tower_width//3 - 15, cy - tower_height//2 - spire_height - 50),
        (cx + tower_width//3 + 15, cy - tower_height//2 - spire_height - 50),
    ]
    draw.polygon(right_peak, fill=roof_color, outline=(0, 0, 0), width=2)
    
    # 中央十字架
    cross_x, cross_y = cx, cy - tower_height//2 - spire_height - 80
    draw.rectangle([cross_x - 8, cross_y - 40, cross_x + 8, cross_y + 40], fill=(200, 170, 50), outline=(0, 0, 0), width=2)
    draw.rectangle([cross_x - 30, cross_y - 10, cross_x + 30, cross_y + 10], fill=(200, 170, 50), outline=(0, 0, 0), width=2)
    
    # 圆形玫瑰窗（脸部位置）
    face_y = cy - 50
    face_radius = 80
    draw.ellipse([cx - face_radius, face_y - face_radius, 
                  cx + face_radius, face_y + face_radius], 
                 fill=(240, 230, 210), outline=(0, 0, 0), width=3)
    
    # 眼睛
    draw_cute_eyes(draw, cx, face_y - 10, size=35)
    
    # 嘴巴
    draw_cute_mouth(draw, cx, face_y + 30, size=25)
    
    # 眉毛 - 坚定风格
    draw_eyebrows(draw, cx, face_y - 10, size=30, style="neutral")
    
    # 底部基座
    base_rect = [
        cx - tower_width//2 - 20, cy + tower_height//2,
        cx + tower_width//2 + 20, cy + tower_height//2 + 40
    ]
    draw.rounded_rectangle(base_rect, radius=10, fill=dark_stone, outline=(0, 0, 0), width=3)
    
    return img

# ========== 2. 里约基督像塔 ==========
def create_rio_christ():
    """里约热内卢基督像 - 标志性的张开双臂造型"""
    img = create_sky_gradient(WIDTH, HEIGHT)
    draw = ImageDraw.Draw(img)
    
    add_clouds(draw, WIDTH, HEIGHT)
    
    cx, cy = WIDTH // 2, HEIGHT // 2 + 100
    
    # 基座（科尔科瓦多山简化版）
    mountain_color = (100, 140, 80)
    mountain_dark = (70, 100, 50)
    
    # 山形基座
    mountain_points = [
        (cx - 400, cy + 300),
        (cx - 200, cy + 100),
        (cx, cy),
        (cx + 200, cy + 100),
        (cx + 400, cy + 300),
        (cx + 400, cy + 450),
        (cx - 400, cy + 450),
    ]
    draw.polygon(mountain_points, fill=mountain_color, outline=(0, 0, 0), width=3)
    
    # 山体纹理
    for i in range(-3, 4):
        x = cx + i * 100
        draw.line([(x, cy + 150 + abs(i)*30), (x + 30, cy + 450)], 
                 fill=mountain_dark, width=5)
    
    # 雕像主体颜色
    statue_color = (200, 200, 190)
    statue_shadow = (160, 160, 150)
    
    # 身体（长袍）
    body_width = 180
    body_height = 250
    body_points = [
        (cx, cy - 150),  # 颈部
        (cx - body_width//2, cy + body_height//2),
        (cx - body_width//3, cy + body_height//2 + 50),
        (cx + body_width//3, cy + body_height//2 + 50),
        (cx + body_width//2, cy + body_height//2),
    ]
    draw.polygon(body_points, fill=statue_color, outline=(0, 0, 0), width=3)
    
    # 长袍纹理线条
    for i in range(-2, 3):
        x = cx + i * 30
        draw.line([(x, cy - 50), (x + i*10, cy + 150)], 
                 fill=statue_shadow, width=4)
    
    # 左臂张开
    left_arm = [
        (cx - body_width//2 + 20, cy - 80),
        (cx - 280, cy - 120),
        (cx - 300, cy - 100),
        (cx - 300, cy - 70),
        (cx - 250, cy - 50),
        (cx - body_width//2 + 40, cy - 30),
    ]
    draw.polygon(left_arm, fill=statue_color, outline=(0, 0, 0), width=3)
    
    # 右臂张开
    right_arm = [
        (cx + body_width//2 - 20, cy - 80),
        (cx + 280, cy - 120),
        (cx + 300, cy - 100),
        (cx + 300, cy - 70),
        (cx + 250, cy - 50),
        (cx + body_width//2 - 40, cy - 30),
    ]
    draw.polygon(right_arm, fill=statue_color, outline=(0, 0, 0), width=3)
    
    # 头部（圆形）
    head_y = cy - 180
    head_radius = 70
    draw.ellipse([cx - head_radius, head_y - head_radius, 
                  cx + head_radius, head_y + head_radius], 
                 fill=statue_color, outline=(0, 0, 0), width=3)
    
    # 脸部（作为雕像的脸）
    face_radius = 50
    draw.ellipse([cx - face_radius, head_y - face_radius, 
                  cx + face_radius, head_y + face_radius], 
                 fill=(240, 230, 210), outline=(0, 0, 0), width=2)
    
    # 眼睛 - 温和的表情
    draw_cute_eyes(draw, cx, head_y - 5, size=25)
    
    # 嘴巴 - 平静的微笑
    draw_cute_mouth(draw, cx, head_y + 25, size=18)
    
    # 光环/光芒效果
    for i in range(8):
        angle = i * 45
        rad = math.radians(angle)
        r1 = head_radius + 20
        r2 = head_radius + 50
        x1 = cx + r1 * math.cos(rad)
        y1 = head_y + r1 * math.sin(rad)
        x2 = cx + r2 * math.cos(rad)
        y2 = head_y + r2 * math.sin(rad)
        draw.line([(x1, y1), (x2, y2)], fill=(255, 215, 100), width=6)
    
    return img

# ========== 3. 米纳斯吉拉斯欧鲁普雷图塔 ==========
def create_minas_ouro_preto():
    """欧鲁普雷图 - 殖民地风格教堂和金山元素"""
    img = create_sky_gradient(WIDTH, HEIGHT)
    draw = ImageDraw.Draw(img)
    
    add_clouds(draw, WIDTH, HEIGHT)
    
    cx, cy = WIDTH // 2, HEIGHT // 2 + 50
    
    # 白色/奶油色的殖民地建筑风格
    wall_color = (255, 250, 240)
    trim_color = (220, 200, 180)
    roof_color = (180, 60, 60)
    gold_color = (255, 215, 0)
    
    tower_width = 280
    tower_height = 500
    
    # 塔身
    body_rect = [
        cx - tower_width//2, cy - tower_height//2,
        cx + tower_width//2, cy + tower_height//2
    ]
    draw.rounded_rectangle(body_rect, radius=20, fill=wall_color, outline=(0, 0, 0), width=3)
    
    # 装饰边框
    draw.rectangle([cx - tower_width//2 + 15, cy - tower_height//2 + 15,
                    cx + tower_width//2 - 15, cy + tower_height//2 - 15], 
                   outline=trim_color, width=8)
    
    # 钟楼（欧鲁普雷图特色）
    bell_tower_width = 100
    bell_tower_height = 180
    bell_y = cy - tower_height//2 - bell_tower_height//2 + 50
    
    # 左钟楼
    left_bell = [
        (cx - 80 - bell_tower_width//2, bell_y - bell_tower_height//2),
        (cx - 80 + bell_tower_width//2, bell_y - bell_tower_height//2),
        (cx - 80 + bell_tower_width//2 - 10, bell_y + bell_tower_height//2),
        (cx - 80 - bell_tower_width//2 + 10, bell_y + bell_tower_height//2),
    ]
    draw.polygon(left_bell, fill=wall_color, outline=(0, 0, 0), width=3)
    
    # 左钟楼顶
    left_dome = [
        (cx - 80 - bell_tower_width//2, bell_y - bell_tower_height//2),
        (cx - 80, bell_y - bell_tower_height//2 - 60),
        (cx - 80 + bell_tower_width//2, bell_y - bell_tower_height//2),
    ]
    draw.polygon(left_dome, fill=roof_color, outline=(0, 0, 0), width=3)
    
    # 右钟楼
    right_bell = [
        (cx + 80 - bell_tower_width//2, bell_y - bell_tower_height//2),
        (cx + 80 + bell_tower_width//2, bell_y - bell_tower_height//2),
        (cx + 80 + bell_tower_width//2 - 10, bell_y + bell_tower_height//2),
        (cx + 80 - bell_tower_width//2 + 10, bell_y + bell_tower_height//2),
    ]
    draw.polygon(right_bell, fill=wall_color, outline=(0, 0, 0), width=3)
    
    # 右钟楼顶
    right_dome = [
        (cx + 80 - bell_tower_width//2, bell_y - bell_tower_height//2),
        (cx + 80, bell_y - bell_tower_height//2 - 60),
        (cx + 80 + bell_tower_width//2, bell_y - bell_tower_height//2),
    ]
    draw.polygon(right_dome, fill=roof_color, outline=(0, 0, 0), width=3)
    
    # 中央圆顶
    dome_y = bell_y - 80
    draw.ellipse([cx - 70, dome_y - 50, cx + 70, dome_y + 50], 
                fill=roof_color, outline=(0, 0, 0), width=3)
    
    # 脸部位置（在中央墙面）
    face_y = cy - 30
    face_radius = 75
    draw.ellipse([cx - face_radius, face_y - face_radius, 
                  cx + face_radius, face_y + face_radius], 
                 fill=(255, 240, 220), outline=(0, 0, 0), width=3)
    
    # 眼睛
    draw_cute_eyes(draw, cx, face_y - 5, size=30)
    
    # 嘴巴
    draw_cute_mouth(draw, cx, face_y + 35, size=22)
    
    # 金色装饰元素（代表欧鲁普雷图的黄金）
    for i in range(-2, 3):
        x = cx + i * 50
        y = cy + tower_height//2 - 80
        draw.rectangle([x - 15, y - 20, x + 15, y + 20], fill=gold_color, outline=(0, 0, 0), width=2)
    
    # 底部金色条纹
    draw.rectangle([cx - tower_width//2 + 10, cy + tower_height//2 - 30,
                    cx + tower_width//2 - 10, cy + tower_height//2 - 10], fill=gold_color, outline=(0, 0, 0), width=2)
    
    return img

# ========== 4. 巴伊亚萨尔瓦多塔 ==========
def create_bahia_salvador():
    """萨尔瓦多 - 殖民地风格与海洋元素"""
    img = create_sky_gradient(WIDTH, HEIGHT)
    draw = ImageDraw.Draw(img)
    
    add_clouds(draw, WIDTH, HEIGHT)
    
    cx, cy = WIDTH // 2, HEIGHT // 2 + 50
    
    # 鲜艳的殖民地色彩（巴伊亚特色）
    wall_color = (255, 220, 180)  # 暖色调
    blue_trim = (50, 100, 180)
    yellow_trim = (255, 200, 50)
    roof_color = (180, 50, 50)
    
    tower_width = 300
    tower_height = 480
    
    # 塔身 - 稍窄的上部
    body_points = [
        (cx - tower_width//2, cy - tower_height//2),
        (cx + tower_width//2, cy - tower_height//2),
        (cx + tower_width//2 - 30, cy + tower_height//2),
        (cx - tower_width//2 + 30, cy + tower_height//2),
    ]
    draw.polygon(body_points, fill=wall_color, outline=(0, 0, 0), width=3)
    
    # 彩色装饰条纹
    for i, color in enumerate([blue_trim, yellow_trim, blue_trim, yellow_trim, blue_trim]):
        y = cy - tower_height//2 + 50 + i * 80
        draw.rectangle([cx - tower_width//2 + 10, y, cx + tower_width//2 - 10, y + 40], 
                      fill=color, outline=(0, 0, 0), width=2)
    
    # 塔顶（阶梯式金字塔）
    level1_points = [
        (cx - tower_width//2 - 20, cy - tower_height//2),
        (cx + tower_width//2 + 20, cy - tower_height//2),
        (cx + tower_width//2, cy - tower_height//2 - 50),
        (cx - tower_width//2, cy - tower_height//2 - 50),
    ]
    draw.polygon(level1_points, fill=roof_color, outline=(0, 0, 0), width=3)
    
    level2_points = [
        (cx - tower_width//3, cy - tower_height//2 - 50),
        (cx + tower_width//3, cy - tower_height//2 - 50),
        (cx + tower_width//4, cy - tower_height//2 - 100),
        (cx - tower_width//4, cy - tower_height//2 - 100),
    ]
    draw.polygon(level2_points, fill=roof_color, outline=(0, 0, 0), width=3)
    
    # 尖顶
    peak_points = [
        (cx - 30, cy - tower_height//2 - 100),
        (cx + 30, cy - tower_height//2 - 100),
        (cx, cy - tower_height//2 - 180),
    ]
    draw.polygon(peak_points, fill=roof_color, outline=(0, 0, 0), width=3)
    
    # 圆形窗户/脸部区域
    face_y = cy - 20
    face_radius = 70
    draw.ellipse([cx - face_radius, face_y - face_radius, 
                  cx + face_radius, face_y + face_radius], 
                 fill=(255, 235, 210), outline=(0, 0, 0), width=3)
    
    # 眼睛
    draw_cute_eyes(draw, cx, face_y - 5, size=28)
    
    # 开心的嘴巴
    draw_cute_mouth(draw, cx, face_y + 35, size=25, expression="happy")
    
    # 海洋波浪装饰（底部）
    wave_y = cy + tower_height//2 + 20
    for i in range(-4, 5):
        wave_x = cx + i * 70
        draw.arc([wave_x - 35, wave_y - 20, wave_x + 35, wave_y + 20], 
                start=0, end=180, fill=(50, 150, 200), width=6)
    
    return img

# ========== 5. 巴拉那伊泰普水电站塔 ==========
def create_parana_itaipu():
    """伊泰普水电站 - 大坝和水电元素"""
    img = create_sky_gradient(WIDTH, HEIGHT)
    draw = ImageDraw.Draw(img)
    
    add_clouds(draw, WIDTH, HEIGHT)
    
    cx, cy = WIDTH // 2, HEIGHT // 2 + 50
    
    # 混凝土大坝颜色
    concrete_color = (180, 185, 190)
    concrete_dark = (140, 145, 150)
    water_color = (80, 150, 200)
    water_light = (120, 180, 220)
    
    tower_width = 320
    tower_height = 500
    
    # 大坝主体（弧形）
    dam_rect = [
        cx - tower_width//2, cy - tower_height//2,
        cx + tower_width//2, cy + tower_height//2
    ]
    draw.rounded_rectangle(dam_rect, radius=40, fill=concrete_color, outline=(0, 0, 0), width=3)
    
    # 大坝纹理（水平线）
    for i in range(8):
        y = cy - tower_height//2 + 60 + i * 55
        draw.line([(cx - tower_width//2 + 20, y), (cx + tower_width//2 - 20, y)], 
                 fill=concrete_dark, width=5)
    
    # 中央控制塔（突出的部分）
    control_width = 120
    control_height = 200
    control_y = cy - tower_height//2 - control_height//2 + 50
    
    control_rect = [
        cx - control_width//2, control_y - control_height//2,
        cx + control_width//2, control_y + control_height//2
    ]
    draw.rounded_rectangle(control_rect, radius=15, fill=(200, 205, 210), outline=(0, 0, 0), width=3)
    
    # 控制塔窗户
    for i in range(3):
        y = control_y - 50 + i * 40
        draw.rectangle([cx - 40, y - 12, cx + 40, y + 12], 
                      fill=(100, 180, 220), outline=(0, 0, 0), width=2)
    
    # 控制塔顶
    tower_top = [
        (cx - control_width//2 - 10, control_y - control_height//2),
        (cx + control_width//2 + 10, control_y - control_height//2),
        (cx, control_y - control_height//2 - 40),
    ]
    draw.polygon(tower_top, fill=(70, 70, 80), outline=(0, 0, 0), width=3)
    
    # 脸部区域
    face_y = cy + 20
    face_radius = 80
    draw.ellipse([cx - face_radius, face_y - face_radius, 
                  cx + face_radius, face_y + face_radius], 
                 fill=(220, 225, 230), outline=(0, 0, 0), width=3)
    
    # 眼睛
    draw_cute_eyes(draw, cx, face_y - 5, size=32)
    
    # 嘴巴
    draw_cute_mouth(draw, cx, face_y + 40, size=25, expression="determined")
    
    # 水流效果（底部）
    for i in range(-3, 4):
        x = cx + i * 60
        # 瀑布效果
        for j in range(5):
            y = cy + tower_height//2 + 20 + j * 25
            w = 25 - j * 3
            draw.ellipse([x - w, y - 10, x + w, y + 10], fill=water_light if j % 2 == 0 else water_color)
    
    # 涡轮/电力符号装饰
    bolt_y = cy + tower_height//2 - 60
    # 闪电符号
    draw.polygon([
        (cx - 15, bolt_y - 30),
        (cx + 5, bolt_y - 5),
        (cx - 5, bolt_y - 5),
        (cx + 15, bolt_y + 30),
        (cx - 5, bolt_y + 5),
        (cx + 5, bolt_y + 5),
    ], fill=(255, 215, 0), outline=(0, 0, 0), width=2)
    
    return img

# ========== 6. 南里奥格兰德高乔文化塔 ==========
def create_rio_grande_gaucho():
    """南里奥格兰德州 - 高乔文化（牛仔/牧场）元素"""
    img = create_sky_gradient(WIDTH, HEIGHT)
    draw = ImageDraw.Draw(img)
    
    add_clouds(draw, WIDTH, HEIGHT)
    
    cx, cy = WIDTH // 2, HEIGHT // 2 + 50
    
    # 牧场/牛仔风格色彩
    wood_color = (139, 90, 43)
    wood_light = (180, 130, 80)
    leather_color = (160, 82, 45)
    red_scarf = (200, 50, 50)
    grass_color = (100, 160, 80)
    
    tower_width = 280
    tower_height = 480
    
    # 塔身（木屋风格）
    body_rect = [
        cx - tower_width//2, cy - tower_height//2,
        cx + tower_width//2, cy + tower_height//2
    ]
    draw.rounded_rectangle(body_rect, radius=15, fill=wood_color, outline=(0, 0, 0), width=3)
    
    # 木板纹理
    for i in range(10):
        y = cy - tower_height//2 + 40 + i * 45
        draw.line([(cx - tower_width//2 + 10, y), (cx + tower_width//2 - 10, y)], 
                 fill=(100, 60, 30), width=3)
    
    # 宽边帽风格屋顶
    hat_brim_width = 380
    hat_brim_y = cy - tower_height//2
    
    # 帽檐
    draw.ellipse([cx - hat_brim_width//2, hat_brim_y - 30, 
                  cx + hat_brim_width//2, hat_brim_y + 30], 
                 fill=(120, 70, 35), outline=(0, 0, 0), width=3)
    
    # 帽子主体
    hat_crown_points = [
        (cx - 100, hat_brim_y),
        (cx + 100, hat_brim_y),
        (cx + 80, hat_brim_y - 100),
        (cx - 80, hat_brim_y - 100),
    ]
    draw.polygon(hat_crown_points, fill=leather_color, outline=(0, 0, 0), width=3)
    
    # 帽子装饰带
    draw.rectangle([cx - 100, hat_brim_y - 25, cx + 100, hat_brim_y - 10], 
                  fill=red_scarf, outline=(0, 0, 0), width=2)
    
    # 红围巾飘带
    scarf_points = [
        (cx + 80, hat_brim_y - 18),
        (cx + 150, hat_brim_y + 20),
        (cx + 140, hat_brim_y + 40),
        (cx + 70, hat_brim_y),
    ]
    draw.polygon(scarf_points, fill=red_scarf, outline=(0, 0, 0), width=2)
    
    # 脸部区域
    face_y = cy - 30
    face_radius = 75
    draw.ellipse([cx - face_radius, face_y - face_radius, 
                  cx + face_radius, face_y + face_radius], 
                 fill=(255, 220, 180), outline=(0, 0, 0), width=3)
    
    # 眼睛（自信的眼神）
    draw_cute_eyes(draw, cx, face_y - 5, size=28, looking_direction="center")
    
    # 眉毛 - 高乔人的坚毅
    draw_eyebrows(draw, cx, face_y - 5, size=28, style="neutral")
    
    # 微笑
    draw_cute_mouth(draw, cx, face_y + 35, size=22, expression="happy")
    
    # 草原/草地装饰（底部）
    grass_y = cy + tower_height//2 + 30
    for i in range(-5, 6):
        x = cx + i * 60
        # 草丛
        draw.polygon([
            (x - 20, grass_y),
            (x - 10, grass_y - 40),
            (x, grass_y - 10),
            (x + 10, grass_y - 35),
            (x + 20, grass_y),
        ], fill=grass_color, outline=(0, 0, 0), width=2)
    
    return img

# ========== 7. 塞阿拉海滩塔 ==========
def create_ceara_beach():
    """塞阿拉州 - 海滩、阳光、度假元素"""
    img = create_sky_gradient(WIDTH, HEIGHT)
    draw = ImageDraw.Draw(img)
    
    add_clouds(draw, WIDTH, HEIGHT)
    
    cx, cy = WIDTH // 2, HEIGHT // 2 + 50
    
    # 海滩风格色彩
    sand_color = (238, 203, 140)
    sand_dark = (210, 175, 120)
    blue_sea = (70, 160, 210)
    yellow_sun = (255, 220, 80)
    green_palm = (80, 160, 80)
    
    tower_width = 300
    tower_height = 450
    
    # 塔身（沙堡风格）
    body_rect = [
        cx - tower_width//2, cy - tower_height//2,
        cx + tower_width//2, cy + tower_height//2
    ]
    draw.rounded_rectangle(body_rect, radius=30, fill=sand_color, outline=(0, 0, 0), width=3)
    
    # 沙堡纹理
    for i in range(6):
        y = cy - tower_height//2 + 60 + i * 60
        for j in range(-2, 3):
            x = cx + j * 50
            draw.ellipse([x - 8, y - 8, x + 8, y + 8], fill=sand_dark, outline=(0, 0, 0), width=1)
    
    # 塔顶（椰子形状）
    coconut_y = cy - tower_height//2 - 50
    # 椰子
    draw.ellipse([cx - 70, coconut_y - 60, cx + 70, coconut_y + 60], 
                fill=(139, 90, 43), outline=(0, 0, 0), width=3)
    
    # 椰子上的眼睛（让它成为脸部的一部分）
    draw_cute_eyes(draw, cx, coconut_y - 10, size=25)
    draw_cute_mouth(draw, cx, coconut_y + 25, size=18, expression="happy")
    
    # 棕榈叶
    leaf_colors = [green_palm, (100, 180, 100), (70, 140, 70)]
    for i in range(8):
        angle = i * 45
        rad = math.radians(angle)
        # 叶子起点
        start_r = 60
        end_r = 180
        
        # 简化的叶子形状
        leaf_x1 = cx + start_r * math.cos(rad)
        leaf_y1 = coconut_y + start_r * math.sin(rad) * 0.6
        leaf_x2 = cx + end_r * math.cos(rad)
        leaf_y2 = coconut_y + end_r * math.sin(rad) * 0.6
        
        # 叶子宽度
        perp_angle = rad + math.pi/2
        w = 20
        
        leaf_points = [
            (leaf_x1, leaf_y1),
            (leaf_x2 + w * math.cos(perp_angle), leaf_y2 + w * math.sin(perp_angle) * 0.6),
            (leaf_x2, leaf_y2),
            (leaf_x2 - w * math.cos(perp_angle), leaf_y2 - w * math.sin(perp_angle) * 0.6),
        ]
        draw.polygon(leaf_points, fill=leaf_colors[i % 3], outline=(0, 0, 0), width=2)
    
    # 主脸部区域（塔身中央）
    face_y = cy + 50
    face_radius = 90
    draw.ellipse([cx - face_radius, face_y - face_radius, 
                  cx + face_radius, face_y + face_radius], 
                 fill=(255, 230, 200), outline=(0, 0, 0), width=3)
    
    # 太阳镜（海滩风格）
    glass_y = face_y - 15
    # 左镜片
    draw.ellipse([cx - 55, glass_y - 20, cx - 15, glass_y + 20], 
                fill=(50, 50, 50), outline=(0, 0, 0), width=3)
    # 右镜片
    draw.ellipse([cx + 15, glass_y - 20, cx + 55, glass_y + 20], 
                fill=(50, 50, 50), outline=(0, 0, 0), width=3)
    # 镜架
    draw.line([(cx - 55, glass_y), (cx - 90, glass_y - 10)], fill=(0, 0, 0), width=4)
    draw.line([(cx + 55, glass_y), (cx + 90, glass_y - 10)], fill=(0, 0, 0), width=4)
    draw.line([(cx - 15, glass_y), (cx + 15, glass_y)], fill=(0, 0, 0), width=4)
    
    # 在太阳镜上的反光/眼睛
    draw.ellipse([cx - 45, glass_y - 8, cx - 25, glass_y + 8], fill=(255, 255, 255))
    draw.ellipse([cx + 25, glass_y - 8, cx + 45, glass_y + 8], fill=(255, 255, 255))
    
    # 开心的嘴
    draw_cute_mouth(draw, cx, face_y + 45, size=30, expression="happy")
    
    # 太阳装饰
    sun_x, sun_y = 650, 150
    draw.ellipse([sun_x - 50, sun_y - 50, sun_x + 50, sun_y + 50], fill=yellow_sun, outline=(0, 0, 0), width=2)
    for i in range(12):
        angle = i * 30
        rad = math.radians(angle)
        x1 = sun_x + 55 * math.cos(rad)
        y1 = sun_y + 55 * math.sin(rad)
        x2 = sun_x + 75 * math.cos(rad)
        y2 = sun_y + 75 * math.sin(rad)
        draw.line([(x1, y1), (x2, y2)], fill=yellow_sun, width=6)
    
    # 海浪装饰（底部）
    wave_y = cy + tower_height//2 + 40
    for i in range(-5, 6):
        x = cx + i * 65
        draw.arc([x - 35, wave_y - 25, x + 35, wave_y + 25], 
                start=0, end=180, fill=blue_sea, width=8)
    
    return img

# ========== 8. 伯南布哥奥林达塔 ==========
def create_pernambuco_olinda():
    """奥林达 - 殖民地风格与狂欢节元素"""
    img = create_sky_gradient(WIDTH, HEIGHT)
    draw = ImageDraw.Draw(img)
    
    add_clouds(draw, WIDTH, HEIGHT)
    
    cx, cy = WIDTH // 2, HEIGHT // 2 + 50
    
    # 奥林达特色：多彩殖民地建筑
    wall_color = (255, 200, 180)  # 温暖的桃色
    trim_colors = [(255, 100, 100), (100, 200, 100), (100, 150, 255), (255, 220, 80)]
    roof_color = (180, 60, 60)
    
    tower_width = 280
    tower_height = 480
    
    # 塔身
    body_rect = [
        cx - tower_width//2, cy - tower_height//2,
        cx + tower_width//2, cy + tower_height//2
    ]
    draw.rounded_rectangle(body_rect, radius=20, fill=wall_color, outline=(0, 0, 0), width=3)
    
    # 多彩装饰边框
    for i, color in enumerate(trim_colors):
        offset = i * 8
        draw.rectangle([cx - tower_width//2 + offset, cy - tower_height//2 + offset,
                        cx + tower_width//2 - offset, cy + tower_height//2 - offset], 
                       outline=color, width=4)
    
    # 窗户（奥林达风格）
    for row in range(3):
        for col in range(2):
            wx = cx - 60 + col * 120
            wy = cy - 100 + row * 80
            # 窗框
            draw.rectangle([wx - 30, wy - 35, wx + 30, wy + 35], 
                          fill=(200, 230, 255), outline=(0, 0, 0), width=3)
            # 窗格
            draw.line([(wx, wy - 35), (wx, wy + 35)], fill=(0, 0, 0), width=2)
            draw.line([(wx - 30, wy), (wx + 30, wy)], fill=(0, 0, 0), width=2)
    
    # 屋顶（阶梯式）
    roof1_points = [
        (cx - tower_width//2 - 15, cy - tower_height//2),
        (cx + tower_width//2 + 15, cy - tower_height//2),
        (cx + tower_width//2, cy - tower_height//2 - 40),
        (cx - tower_width//2, cy - tower_height//2 - 40),
    ]
    draw.polygon(roof1_points, fill=roof_color, outline=(0, 0, 0), width=3)
    
    roof2_points = [
        (cx - tower_width//3, cy - tower_height//2 - 40),
        (cx + tower_width//3, cy - tower_height//2 - 40),
        (cx + tower_width//4, cy - tower_height//2 - 80),
        (cx - tower_width//4, cy - tower_height//2 - 80),
    ]
    draw.polygon(roof2_points, fill=roof_color, outline=(0, 0, 0), width=3)
    
    # 尖顶装饰
    spire_points = [
        (cx - 20, cy - tower_height//2 - 80),
        (cx + 20, cy - tower_height//2 - 80),
        (cx, cy - tower_height//2 - 150),
    ]
    draw.polygon(spire_points, fill=(255, 220, 80), outline=(0, 0, 0), width=3)
    
    # 脸部区域（底层大窗户位置）
    face_y = cy + 100
    face_radius = 85
    draw.ellipse([cx - face_radius, face_y - face_radius, 
                  cx + face_radius, face_y + face_radius], 
                 fill=(255, 230, 210), outline=(0, 0, 0), width=3)
    
    # 眼睛
    draw_cute_eyes(draw, cx, face_y - 10, size=32)
    
    # 嘴巴 - 狂欢节的欢乐
    draw_cute_mouth(draw, cx, face_y + 40, size=30, expression="happy")
    
    # 狂欢节装饰彩旗
    for i in range(5):
        fx = cx - 200 + i * 100
        fy = cy - tower_height//2 - 180
        flag_colors = [(255, 100, 100), (100, 200, 100), (100, 150, 255), (255, 220, 80), (255, 150, 200)]
        # 三角旗
        draw.polygon([
            (fx, fy),
            (fx + 40, fy),
            (fx + 20, fy + 50),
        ], fill=flag_colors[i], outline=(0, 0, 0), width=2)
    
    return img

# ========== 9. 亚马逊雨林塔 ==========
def create_amazonas_rainforest():
    """亚马逊州 - 热带雨林元素"""
    img = create_sky_gradient(WIDTH, HEIGHT)
    draw = ImageDraw.Draw(img)
    
    add_clouds(draw, WIDTH, HEIGHT)
    
    cx, cy = WIDTH // 2, HEIGHT // 2 + 50
    
    # 雨林色彩
    trunk_color = (101, 67, 33)
    trunk_light = (139, 90, 43)
    leaf_dark = (34, 85, 51)
    leaf_mid = (50, 130, 70)
    leaf_light = (80, 180, 100)
    
    tower_width = 260
    tower_height = 450
    
    # 树干主体
    trunk_rect = [
        cx - tower_width//2, cy - tower_height//2,
        cx + tower_width//2, cy + tower_height//2
    ]
    draw.rounded_rectangle(trunk_rect, radius=30, fill=trunk_color, outline=(0, 0, 0), width=3)
    
    # 树皮纹理
    for i in range(8):
        y = cy - tower_height//2 + 50 + i * 50
        # 垂直纹理线
        for j in range(-2, 3):
            x = cx + j * 40 + (i % 2) * 20
            draw.line([(x, y), (x + 10, y + 40)], fill=trunk_light, width=4)
    
    # 树冠（多层圆形）
    crown_y = cy - tower_height//2 - 80
    
    # 底层树叶
    draw.ellipse([cx - 180, crown_y + 40, cx + 180, crown_y + 160], 
                fill=leaf_dark, outline=(0, 0, 0), width=3)
    
    # 中层树叶
    draw.ellipse([cx - 140, crown_y - 20, cx + 140, crown_y + 100], 
                fill=leaf_mid, outline=(0, 0, 0), width=3)
    
    # 顶层树叶
    draw.ellipse([cx - 100, crown_y - 80, cx + 100, crown_y + 40], 
                fill=leaf_light, outline=(0, 0, 0), width=3)
    
    # 脸部区域（在树干上）
    face_y = cy - 20
    face_radius = 80
    draw.ellipse([cx - face_radius, face_y - face_radius, 
                  cx + face_radius, face_y + face_radius], 
                 fill=(200, 180, 150), outline=(0, 0, 0), width=3)
    
    # 眼睛
    draw_cute_eyes(draw, cx, face_y - 10, size=30)
    
    # 嘴巴
    draw_cute_mouth(draw, cx, face_y + 35, size=25, expression="happy")
    
    # 树枝上添加树叶装饰
    branch_positions = [
        (cx - 140, crown_y + 100),
        (cx + 140, crown_y + 100),
        (cx - 120, crown_y + 40),
        (cx + 120, crown_y + 40),
    ]
    
    for bx, by in branch_positions:
        # 小树叶簇
        draw.ellipse([bx - 30, by - 20, bx + 30, by + 20], fill=leaf_mid, outline=(0, 0, 0), width=2)
        draw.ellipse([bx - 20, by - 30, bx + 20, by + 30], fill=leaf_light, outline=(0, 0, 0), width=2)
    
    # 底部树根/草地
    root_y = cy + tower_height//2 + 20
    for i in range(-4, 5):
        x = cx + i * 50
        # 草丛
        draw.polygon([
            (x - 25, root_y),
            (x - 10, root_y - 50),
            (x, root_y - 20),
            (x + 10, root_y - 45),
            (x + 25, root_y),
        ], fill=leaf_light, outline=(0, 0, 0), width=2)
    
    return img

# ========== 10. 巴西利亚三权广场塔 ==========
def create_brasilia_square():
    """巴西利亚 - 现代主义建筑、三权广场元素"""
    img = create_sky_gradient(WIDTH, HEIGHT)
    draw = ImageDraw.Draw(img)
    
    add_clouds(draw, WIDTH, HEIGHT)
    
    cx, cy = WIDTH // 2, HEIGHT // 2 + 50
    
    # 现代主义建筑色彩
    white_concrete = (240, 240, 245)
    glass_blue = (100, 160, 210)
    glass_dark = (70, 120, 170)
    accent_gold = (200, 170, 80)
    
    tower_width = 300
    tower_height = 500
    
    # 主体建筑（现代曲线造型）
    # 外轮廓（类似参议院或众议院的曲线）
    building_points = [
        (cx - tower_width//2, cy + tower_height//2),
        (cx - tower_width//2 + 30, cy - tower_height//2),
        (cx, cy - tower_height//2 - 50),  # 顶部弧线
        (cx + tower_width//2 - 30, cy - tower_height//2),
        (cx + tower_width//2, cy + tower_height//2),
    ]
    draw.polygon(building_points, fill=white_concrete, outline=(0, 0, 0), width=3)
    
    # 建筑垂直线条（现代主义特征）
    for i in range(-4, 5):
        x = cx + i * 30
        draw.line([(x, cy - tower_height//2 - 20), (x + i*5, cy + tower_height//2)], 
                 fill=(200, 200, 205), width=6)
    
    # 曲线屋顶（双曲线造型）
    # 左曲线
    left_curve_points = []
    for i in range(20):
        t = i / 19
        x = cx - tower_width//2 + 30 + t * (tower_width//2 - 60)
        y = cy - tower_height//2 - 50 * math.sin(t * math.pi)
        left_curve_points.append((x, y))
    
    # 右曲线
    right_curve_points = []
    for i in range(20):
        t = i / 19
        x = cx + t * (tower_width//2 - 60)
        y = cy - tower_height//2 - 50 * math.sin(t * math.pi)
        right_curve_points.append((x, y))
    
    # 绘制曲线屋顶
    for points, color in [(left_curve_points, glass_blue), (right_curve_points, glass_dark)]:
        if len(points) > 1:
            for i in range(len(points) - 1):
                draw.line([points[i], points[i+1]], fill=color, width=8)
    
    # 穹顶（圆形顶部）
    dome_y = cy - tower_height//2 - 80
    draw.ellipse([cx - 60, dome_y - 40, cx + 60, dome_y + 40], 
                fill=glass_blue, outline=(0, 0, 0), width=3)
    
    # 脸部区域（中央圆形）
    face_y = cy + 20
    face_radius = 90
    draw.ellipse([cx - face_radius, face_y - face_radius, 
                  cx + face_radius, face_y + face_radius], 
                 fill=(255, 250, 240), outline=(0, 0, 0), width=3)
    
    # 眼睛
    draw_cute_eyes(draw, cx, face_y - 5, size=35)
    
    # 嘴巴 - 自信微笑
    draw_cute_mouth(draw, cx, face_y + 45, size=28, expression="happy")
    
    # 现代主义装饰 - 几何图案
    for i in range(-2, 3):
        x = cx + i * 60
        y = cy + tower_height//2 - 50
        # 小方块装饰
        draw.rectangle([x - 15, y - 15, x + 15, y + 15], fill=accent_gold, outline=(0, 0, 0), width=2)
    
    # 建筑倒影效果（底部）
    reflection_y = cy + tower_height//2 + 10
    for i in range(5):
        y = reflection_y + i * 15
        alpha = 100 - i * 20
        gray = (240 - i * 20, 240 - i * 20, 245 - i * 20)
        draw.rectangle([cx - tower_width//2 + 20 + i*10, y, 
                        cx + tower_width//2 - 20 - i*10, y + 10], fill=gray, outline=(0, 0, 0), width=1)
    
    return img

# ========== 主程序 ==========
def main():
    """生成所有10个巴西州塔图片"""
    
    towers = [
        ("sao-paulo-cathedral.png", create_sao_paulo_cathedral, "圣保罗 - 大教堂"),
        ("rio-christ.png", create_rio_christ, "里约 - 基督像"),
        ("minas-ouro-preto.png", create_minas_ouro_preto, "米纳斯 - 欧鲁普雷图"),
        ("bahia-salvador.png", create_bahia_salvador, "巴伊亚 - 萨尔瓦多"),
        ("parana-itaipu.png", create_parana_itaipu, "巴拉那 - 伊泰普水电站"),
        ("rio-grande-gaucho.png", create_rio_grande_gaucho, "南里奥格兰德 - 高乔文化"),
        ("ceara-beach.png", create_ceara_beach, "塞阿拉 - 海滩"),
        ("pernambuco-olinda.png", create_pernambuco_olinda, "伯南布哥 - 奥林达"),
        ("amazonas-rainforest.png", create_amazonas_rainforest, "亚马逊 - 雨林"),
        ("brasilia-square.png", create_brasilia_square, "巴西利亚 - 三权广场"),
    ]
    
    print("开始生成10个巴西州卡通塔图片...")
    print("=" * 50)
    
    for filename, create_func, name in towers:
        print(f"生成: {name}...")
        try:
            img = create_func()
            filepath = os.path.join(OUTPUT_DIR, filename)
            img.save(filepath, "PNG", quality=95)
            print(f"  ✓ 已保存: {filepath}")
        except Exception as e:
            print(f"  ✗ 错误: {e}")
    
    print("=" * 50)
    print("全部完成！")

if __name__ == "__main__":
    main()

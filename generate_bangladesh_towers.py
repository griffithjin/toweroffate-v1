#!/usr/bin/env python3
"""
生成孟加拉国8个省的卡通塔图片
风格：愤怒的小鸟卡通风格，可爱表情
尺寸：800x1200像素
背景：天蓝色渐变
"""

from PIL import Image, ImageDraw, ImageFont
import math
import os

# 输出目录
OUTPUT_DIR = "/Users/moutai/Desktop/toweroffate_v1.0/assets/towers/states/bangladesh/"

# 图片尺寸
WIDTH, HEIGHT = 800, 1200

# 颜色定义
SKY_TOP = (135, 206, 235)      # 天蓝色
SKY_BOTTOM = (224, 247, 250)   # 浅天蓝色
SKY_DARK = (100, 181, 246)     # 深蓝色

# 塔的颜色
TOWER_COLORS = {
    'concrete': (200, 200, 210),
    'brick': (180, 100, 80),
    'gold': (255, 215, 0),
    'green': (100, 180, 100),
    'dark_green': (60, 120, 60),
    'wood': (160, 120, 80),
    'stone': (150, 150, 150),
    'water': (100, 150, 255),
    'sand': (240, 210, 150),
}

# 眼睛颜色
EYE_WHITE = (255, 255, 255)
EYE_BLACK = (30, 30, 30)
EYE_HIGHLIGHT = (255, 255, 255)

# 腮红颜色
CHEEK_COLOR = (255, 150, 150)

def create_gradient_background(width, height, top_color, bottom_color):
    """创建渐变背景"""
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)
    
    for y in range(height):
        ratio = y / height
        r = int(top_color[0] * (1 - ratio) + bottom_color[0] * ratio)
        g = int(top_color[1] * (1 - ratio) + bottom_color[1] * ratio)
        b = int(top_color[2] * (1 - ratio) + bottom_color[2] * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    return img

def draw_cloud(draw, x, y, size):
    """绘制卡通云朵"""
    color = (255, 255, 255)
    # 云朵由多个圆组成
    draw.ellipse([x - size, y - size//2, x + size, y + size//2], fill=color)
    draw.ellipse([x - size//2, y - size, x + size//2, y + size], fill=color)
    draw.ellipse([x, y - size//2, x + size*1.5, y + size//2], fill=color)

def draw_cute_eyes(draw, x, y, eye_size=25, spacing=50):
    """绘制愤怒的小鸟风格的可爱眼睛"""
    # 左眼白
    draw.ellipse([x - spacing - eye_size, y - eye_size, 
                  x - spacing + eye_size, y + eye_size], fill=EYE_WHITE, outline=EYE_BLACK, width=2)
    # 右眼白
    draw.ellipse([x + spacing - eye_size, y - eye_size, 
                  x + spacing + eye_size, y + eye_size], fill=EYE_WHITE, outline=EYE_BLACK, width=2)
    
    # 左瞳孔（愤怒的小鸟风格 - 大的黑色瞳孔）
    draw.ellipse([x - spacing - eye_size//2, y - eye_size//2, 
                  x - spacing + eye_size//2, y + eye_size//2], fill=EYE_BLACK)
    # 右瞳孔
    draw.ellipse([x + spacing - eye_size//2, y - eye_size//2, 
                  x + spacing + eye_size//2, y + eye_size//2], fill=EYE_BLACK)
    
    # 高光
    highlight_size = eye_size // 3
    draw.ellipse([x - spacing - eye_size//3, y - eye_size//2 - 2, 
                  x - spacing - eye_size//3 + highlight_size, y - eye_size//2 - 2 + highlight_size], fill=EYE_HIGHLIGHT)
    draw.ellipse([x + spacing - eye_size//3, y - eye_size//2 - 2, 
                  x + spacing - eye_size//3 + highlight_size, y - eye_size//2 - 2 + highlight_size], fill=EYE_HIGHLIGHT)

def draw_angry_eyebrows(draw, x, y, spacing=50, thickness=8):
    """绘制愤怒的眉毛（愤怒的小鸟风格）"""
    # 左眉毛 - 倾斜
    draw.line([(x - spacing - 30, y - 35), (x - spacing + 10, y - 45)], 
              fill=EYE_BLACK, width=thickness)
    # 右眉毛 - 倾斜
    draw.line([(x + spacing + 30, y - 35), (x + spacing - 10, y - 45)], 
              fill=EYE_BLACK, width=thickness)

def draw_cute_mouth(draw, x, y, size=15):
    """绘制可爱的嘴巴（小圆嘴）"""
    draw.ellipse([x - size, y, x + size, y + size*1.5], fill=EYE_BLACK)

def draw_cheeks(draw, x, y, spacing=70):
    """绘制腮红"""
    cheek_size = 20
    draw.ellipse([x - spacing - cheek_size, y, x - spacing + cheek_size, y + cheek_size*1.2], fill=CHEEK_COLOR)
    draw.ellipse([x + spacing - cheek_size, y, x + spacing + cheek_size, y + cheek_size*1.2], fill=CHEEK_COLOR)

def draw_base_platform(draw, x, y, width, height):
    """绘制塔的基座平台"""
    # 草地
    draw.ellipse([x - width//2 - 20, y - 10, x + width//2 + 20, y + 30], fill=(100, 180, 80))
    # 泥土
    draw.rectangle([x - width//2, y, x + width//2, y + height], fill=(140, 100, 60))

# ============ 各个省的塔绘制函数 ============

def draw_dhaka_parliament():
    """达卡 - 国民议会大厦 (现代建筑+圆顶)"""
    img = create_gradient_background(WIDTH, HEIGHT, SKY_TOP, SKY_BOTTOM)
    draw = ImageDraw.Draw(img)
    
    # 绘制云朵
    draw_cloud(draw, 150, 150, 60)
    draw_cloud(draw, 600, 200, 50)
    draw_cloud(draw, 450, 100, 40)
    
    cx, cy = WIDTH // 2, HEIGHT // 2 + 100
    
    # 基座
    draw_base_platform(draw, cx, HEIGHT - 100, 300, 60)
    
    # 主建筑 - 混凝土色
    building_color = TOWER_COLORS['concrete']
    # 主体
    draw.rectangle([cx - 120, cy - 150, cx + 120, cy + 200], fill=building_color, outline=(80, 80, 90), width=3)
    
    # 圆顶（愤怒的小鸟风格 - 圆形）
    dome_y = cy - 150
    draw.ellipse([cx - 80, dome_y - 80, cx + 80, dome_y + 80], fill=TOWER_COLORS['gold'], outline=(200, 170, 0), width=3)
    
    # 建筑上的窗户（作为表情的一部分）
    window_y = cy - 50
    draw_cute_eyes(draw, cx, window_y, eye_size=20, spacing=40)
    draw_angry_eyebrows(draw, cx, window_y - 20, spacing=40)
    draw_cute_mouth(draw, cx, window_y + 40, size=12)
    draw_cheeks(draw, cx, window_y + 20, spacing=60)
    
    # 建筑细节 - 柱子
    for i in range(-2, 3):
        x = cx + i * 50
        draw.rectangle([x - 8, cy - 100, x + 8, cy + 150], fill=(170, 170, 180), outline=(100, 100, 110), width=2)
    
    return img

def draw_chittagong_cox():
    """吉大港 - 科克斯巴扎尔 (海滩+太阳)"""
    img = create_gradient_background(WIDTH, HEIGHT, SKY_TOP, SKY_BOTTOM)
    draw = ImageDraw.Draw(img)
    
    # 太阳
    sun_x, sun_y = 650, 150
    draw.ellipse([sun_x - 60, sun_y - 60, sun_x + 60, sun_y + 60], fill=(255, 220, 100), outline=(255, 200, 50), width=3)
    # 太阳光芒
    for angle in range(0, 360, 30):
        rad = math.radians(angle)
        x1 = sun_x + math.cos(rad) * 70
        y1 = sun_y + math.sin(rad) * 70
        x2 = sun_x + math.cos(rad) * 90
        y2 = sun_y + math.sin(rad) * 90
        draw.line([(x1, y1), (x2, y2)], fill=(255, 200, 50), width=4)
    
    cx, cy = WIDTH // 2, HEIGHT // 2 + 100
    
    # 沙滩基座
    draw.ellipse([cx - 140, HEIGHT - 120, cx + 140, HEIGHT - 60], fill=TOWER_COLORS['sand'], outline=(220, 190, 130), width=3)
    
    # 塔身 - 贝壳形状
    shell_color = (255, 180, 150)
    # 贝壳主体
    points = []
    for i in range(180, 361, 10):
        rad = math.radians(i)
        r = 100 + 30 * math.sin(rad * 3)
        x = cx + math.cos(rad) * r
        y = cy + 50 + math.sin(rad) * r * 0.6
        points.append((x, y))
    draw.polygon(points, fill=shell_color, outline=(230, 150, 120), width=3)
    
    # 贝壳纹理
    for i in range(5):
        y = cy - 30 + i * 40
        draw.arc([cx - 80, y, cx + 80, y + 60], 0, 180, fill=(230, 150, 120), width=2)
    
    # 脸部
    draw_cute_eyes(draw, cx, cy - 20, eye_size=22, spacing=45)
    draw_angry_eyebrows(draw, cx, cy - 40, spacing=45)
    draw_cute_mouth(draw, cx, cy + 30, size=14)
    draw_cheeks(draw, cx, cy + 10, spacing=70)
    
    return img

def draw_khulna_sundarbans():
    """库尔纳 - 孙德尔本斯 (红树林+老虎)"""
    img = create_gradient_background(WIDTH, HEIGHT, (100, 180, 140), SKY_BOTTOM)
    draw = ImageDraw.Draw(img)
    
    # 绘制更多云朵
    draw_cloud(draw, 100, 120, 50)
    draw_cloud(draw, 500, 80, 45)
    
    cx, cy = WIDTH // 2, HEIGHT // 2 + 80
    
    # 水面基座
    draw.ellipse([cx - 150, HEIGHT - 100, cx + 150, HEIGHT - 40], fill=(100, 160, 200), outline=(80, 140, 180), width=3)
    
    # 树根/树干基座
    draw_base_platform(draw, cx, HEIGHT - 110, 280, 50)
    
    # 塔身 - 树干形状
    trunk_color = (139, 90, 43)
    # 主树干
    draw.rectangle([cx - 60, cy - 100, cx + 60, cy + 200], fill=trunk_color, outline=(100, 60, 30), width=3)
    
    # 树冠（圆形，愤怒的小鸟风格）
    crown_y = cy - 120
    draw.ellipse([cx - 100, crown_y - 80, cx + 100, crown_y + 80], fill=TOWER_COLORS['dark_green'], outline=TOWER_COLORS['green'], width=3)
    
    # 树叶装饰
    for angle in range(0, 360, 45):
        rad = math.radians(angle)
        lx = cx + math.cos(rad) * 90
        ly = crown_y + math.sin(rad) * 60
        draw.ellipse([lx - 25, ly - 20, lx + 25, ly + 20], fill=TOWER_COLORS['green'], outline=TOWER_COLORS['dark_green'], width=2)
    
    # 脸部 - 老虎风格（橙色装饰）
    draw_cute_eyes(draw, cx, cy + 20, eye_size=24, spacing=50)
    draw_angry_eyebrows(draw, cx, cy, spacing=50, thickness=10)
    draw_cute_mouth(draw, cx, cy + 70, size=16)
    draw_cheeks(draw, cx, cy + 45, spacing=75)
    
    # 老虎条纹
    stripe_color = (200, 120, 50)
    for i in range(-1, 2):
        x = cx + i * 30
        draw.polygon([(x, cy + 80), (x - 8, cy + 100), (x + 8, cy + 100)], fill=stripe_color)
    
    return img

def draw_rajshahi_temple():
    """拉杰沙希 - 寺庙 (印度教寺庙风格)"""
    img = create_gradient_background(WIDTH, HEIGHT, SKY_TOP, SKY_BOTTOM)
    draw = ImageDraw.Draw(img)
    
    cx, cy = WIDTH // 2, HEIGHT // 2 + 80
    
    # 基座
    draw_base_platform(draw, cx, HEIGHT - 100, 320, 60)
    
    # 塔身 - 寺庙尖塔
    temple_color = TOWER_COLORS['brick']
    
    # 底部
    draw.rectangle([cx - 100, cy + 100, cx + 100, cy + 200], fill=temple_color, outline=(150, 80, 60), width=3)
    
    # 中部 - 逐层收窄
    draw.rectangle([cx - 80, cy, cx + 80, cy + 100], fill=temple_color, outline=(150, 80, 60), width=3)
    
    # 上部
    draw.rectangle([cx - 60, cy - 80, cx + 60, cy], fill=temple_color, outline=(150, 80, 60), width=3)
    
    # 顶部尖塔（多层圆顶）
    for i, r in enumerate([50, 40, 30, 20]):
        y = cy - 80 - i * 35
        draw.ellipse([cx - r, y - r, cx + r, y + r], fill=TOWER_COLORS['gold'], outline=(200, 170, 0), width=2)
    
    # 装饰尖顶
    draw.polygon([(cx, cy - 220), (cx - 10, cy - 200), (cx + 10, cy - 200)], fill=TOWER_COLORS['gold'])
    
    # 脸部
    draw_cute_eyes(draw, cx, cy + 40, eye_size=22, spacing=45)
    draw_angry_eyebrows(draw, cx, cy + 20, spacing=45)
    draw_cute_mouth(draw, cx, cy + 90, size=14)
    draw_cheeks(draw, cx, cy + 65, spacing=70)
    
    return img

def draw_sylhet_tea():
    """锡尔赫特 - 茶园 (茶叶+山丘)"""
    img = create_gradient_background(WIDTH, HEIGHT, (150, 200, 150), SKY_BOTTOM)
    draw = ImageDraw.Draw(img)
    
    cx, cy = WIDTH // 2, HEIGHT // 2 + 100
    
    # 山丘基座
    draw.ellipse([cx - 160, HEIGHT - 120, cx + 160, HEIGHT - 60], fill=TOWER_COLORS['green'], outline=TOWER_COLORS['dark_green'], width=3)
    
    # 塔身 - 茶杯形状
    cup_color = (255, 255, 250)
    # 杯身
    draw.polygon([(cx - 80, cy - 50), (cx + 80, cy - 50), 
                  (cx + 100, cy + 150), (cx - 100, cy + 150)], 
                 fill=cup_color, outline=(200, 200, 190), width=3)
    
    # 杯口（茶色）
    draw.ellipse([cx - 80, cy - 70, cx + 80, cy - 30], fill=(139, 90, 43), outline=(100, 60, 30), width=3)
    
    # 茶叶蒸汽
    steam_points = [
        (cx - 30, cy - 100), (cx - 20, cy - 130), (cx - 35, cy - 160),
        (cx, cy - 110), (cx + 10, cy - 150), (cx - 5, cy - 180),
        (cx + 30, cy - 100), (cx + 40, cy - 140), (cx + 25, cy - 170)
    ]
    for i in range(0, len(steam_points), 3):
        draw.line([steam_points[i], steam_points[i+1], steam_points[i+2]], 
                  fill=(255, 255, 255, 150), width=4)
    
    # 杯柄
    draw.arc([cx + 70, cy, cx + 130, cy + 80], 270, 90, fill=cup_color, width=15)
    
    # 脸部
    draw_cute_eyes(draw, cx, cy + 30, eye_size=22, spacing=45)
    draw_angry_eyebrows(draw, cx, cy + 10, spacing=45)
    draw_cute_mouth(draw, cx, cy + 80, size=14)
    draw_cheeks(draw, cx, cy + 55, spacing=70)
    
    return img

def draw_barisal_rice():
    """巴里萨尔 - 稻田 (稻穗+水车)"""
    img = create_gradient_background(WIDTH, HEIGHT, (180, 220, 180), (230, 250, 230))
    draw = ImageDraw.Draw(img)
    
    cx, cy = WIDTH // 2, HEIGHT // 2 + 100
    
    # 稻田基座
    draw.ellipse([cx - 150, HEIGHT - 100, cx + 150, HEIGHT - 50], fill=(200, 230, 150), outline=(170, 200, 120), width=3)
    
    # 塔身 - 巨大的稻穗
    rice_color = (255, 215, 100)
    
    # 稻穗主体 - 椭圆形
    draw.ellipse([cx - 70, cy - 100, cx + 70, cy + 100], fill=rice_color, outline=(230, 190, 80), width=3)
    
    # 稻穗纹理（垂直线）
    for i in range(-4, 5):
        x = cx + i * 15
        draw.line([(x, cy - 80), (x, cy + 80)], fill=(230, 190, 80), width=2)
    
    # 稻叶
    leaf_color = TOWER_COLORS['green']
    # 左叶
    draw.polygon([(cx - 70, cy + 50), (cx - 120, cy + 180), (cx - 60, cy + 80)], fill=leaf_color, outline=TOWER_COLORS['dark_green'], width=2)
    # 右叶
    draw.polygon([(cx + 70, cy + 50), (cx + 120, cy + 180), (cx + 60, cy + 80)], fill=leaf_color, outline=TOWER_COLORS['dark_green'], width=2)
    
    # 茎
    draw.rectangle([cx - 10, cy + 100, cx + 10, HEIGHT - 80], fill=leaf_color, outline=TOWER_COLORS['dark_green'], width=2)
    
    # 脸部
    draw_cute_eyes(draw, cx, cy - 20, eye_size=22, spacing=45)
    draw_angry_eyebrows(draw, cx, cy - 40, spacing=45)
    draw_cute_mouth(draw, cx, cy + 30, size=14)
    draw_cheeks(draw, cx, cy + 5, spacing=70)
    
    return img

def draw_rangpur_river():
    """朗布尔 - 河流 (水波+小船)"""
    img = create_gradient_background(WIDTH, HEIGHT, SKY_DARK, SKY_BOTTOM)
    draw = ImageDraw.Draw(img)
    
    cx, cy = WIDTH // 2, HEIGHT // 2 + 100
    
    # 水波基座
    water_color = (80, 160, 220)
    draw.ellipse([cx - 160, HEIGHT - 100, cx + 160, HEIGHT - 40], fill=water_color, outline=(60, 140, 200), width=3)
    
    # 波浪装饰
    for i in range(-2, 3):
        wx = cx + i * 70
        draw.arc([wx - 30, HEIGHT - 110, wx + 30, HEIGHT - 70], 180, 0, fill=(100, 180, 240), width=3)
    
    # 塔身 - 水滴形状
    drop_color = (120, 200, 255)
    # 水滴主体
    draw.polygon([(cx, cy - 150), (cx - 80, cy + 50), (cx + 80, cy + 50)], fill=drop_color, outline=(80, 160, 220), width=3)
    draw.ellipse([cx - 80, cy + 20, cx + 80, cy + 100], fill=drop_color, outline=(80, 160, 220), width=3)
    
    # 水花装饰
    splash_color = (200, 230, 255)
    for i in range(6):
        angle = math.radians(60 + i * 60)
        sx = cx + math.cos(angle) * 90
        sy = cy + 60 + math.sin(angle) * 40
        draw.ellipse([sx - 15, sy - 10, sx + 15, sy + 10], fill=splash_color, outline=(150, 200, 255), width=2)
    
    # 脸部
    draw_cute_eyes(draw, cx, cy - 30, eye_size=24, spacing=50)
    draw_angry_eyebrows(draw, cx, cy - 50, spacing=50)
    draw_cute_mouth(draw, cx, cy + 20, size=16)
    draw_cheeks(draw, cx, cy - 5, spacing=75)
    
    return img

def draw_mymensingh_bamboo():
    """迈门辛格 - 竹林 (竹子+竹笋)"""
    img = create_gradient_background(WIDTH, HEIGHT, (140, 200, 140), SKY_BOTTOM)
    draw = ImageDraw.Draw(img)
    
    cx, cy = WIDTH // 2, HEIGHT // 2 + 100
    
    # 竹林基座
    draw.ellipse([cx - 140, HEIGHT - 100, cx + 140, HEIGHT - 50], fill=(160, 200, 120), outline=(130, 170, 90), width=3)
    
    # 塔身 - 竹笋/竹子形状
    bamboo_color = (150, 200, 100)
    
    # 主体竹笋
    draw.polygon([(cx, cy - 120), (cx - 60, cy + 150), (cx + 60, cy + 150)], fill=bamboo_color, outline=(120, 170, 70), width=3)
    
    # 竹节纹理
    for i in range(5):
        y = cy - 60 + i * 50
        draw.line([(cx - 55 + i*3, y), (cx + 55 - i*3, y)], fill=(120, 170, 70), width=4)
    
    # 小竹笋装饰
    small_bamboo = [(cx - 100, cy + 100), (cx + 100, cy + 100)]
    for bx in [cx - 90, cx + 90]:
        draw.polygon([(bx, cy - 50), (bx - 25, cy + 120), (bx + 25, cy + 120)], fill=(170, 210, 120), outline=(140, 180, 90), width=2)
    
    # 竹叶
    leaf_color = TOWER_COLORS['dark_green']
    for i in range(4):
        angle = math.radians(45 + i * 90)
        lx = cx + math.cos(angle) * 50
        ly = cy - 100 + math.sin(angle) * 30
        draw.ellipse([lx - 20, ly - 10, lx + 20, ly + 10], fill=leaf_color, outline=TOWER_COLORS['green'], width=2)
    
    # 脸部
    draw_cute_eyes(draw, cx, cy + 20, eye_size=22, spacing=45)
    draw_angry_eyebrows(draw, cx, cy, spacing=45)
    draw_cute_mouth(draw, cx, cy + 70, size=14)
    draw_cheeks(draw, cx, cy + 45, spacing=70)
    
    return img

# ============ 主程序 ============

def main():
    """生成所有8个孟加拉国省塔图片"""
    
    towers = [
        ("dhaka-parliament.png", draw_dhaka_parliament, "达卡 - 国民议会大厦"),
        ("chittagong-cox.png", draw_chittagong_cox, "吉大港 - 科克斯巴扎尔"),
        ("khulna-sundarbans.png", draw_khulna_sundarbans, "库尔纳 - 孙德尔本斯"),
        ("rajshahi-temple.png", draw_rajshahi_temple, "拉杰沙希 - 寺庙"),
        ("sylhet-tea.png", draw_sylhet_tea, "锡尔赫特 - 茶园"),
        ("barisal-rice.png", draw_barisal_rice, "巴里萨尔 - 稻田"),
        ("rangpur-river.png", draw_rangpur_river, "朗布尔 - 河流"),
        ("mymensingh-bamboo.png", draw_mymensingh_bamboo, "迈门辛格 - 竹林"),
    ]
    
    print("开始生成孟加拉国8省卡通塔图片...")
    print("=" * 50)
    
    for filename, draw_func, name in towers:
        print(f"正在生成: {name} -> {filename}")
        try:
            img = draw_func()
            filepath = os.path.join(OUTPUT_DIR, filename)
            img.save(filepath, "PNG", quality=95)
            print(f"  ✓ 已保存: {filepath}")
        except Exception as e:
            print(f"  ✗ 错误: {e}")
    
    print("=" * 50)
    print("完成！所有图片已生成。")

if __name__ == "__main__":
    main()

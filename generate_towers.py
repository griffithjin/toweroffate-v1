#!/usr/bin/env python3
"""
生成卡通风格东南亚+南亚名塔图片
风格：愤怒的小鸟风格 - 可爱、鲜艳、夸张表情
"""

from PIL import Image, ImageDraw, ImageFilter
import math
import os

OUTPUT_DIR = "/Users/moutai/Desktop/toweroffate_v1.0/assets/towers/"
WIDTH, HEIGHT = 800, 1200

def create_gradient_background(draw, width, height):
    """创建天蓝色渐变背景"""
    for y in range(height):
        # 从浅天蓝到深一点的蓝色渐变
        r = int(135 - (y / height) * 40)
        g = int(206 - (y / height) * 30)
        b = int(235 - (y / height) * 20)
        draw.line([(0, y), (width, y)], fill=(r, g, b))

def draw_circle_eyes(draw, cx, cy, size=20):
    """画愤怒的小鸟风格的大眼睛"""
    # 白色眼球
    draw.ellipse([cx-size, cy-size, cx+size, cy+size], fill=(255, 255, 255), outline=(0, 0, 0), width=3)
    # 黑色瞳孔
    draw.ellipse([cx-size//3, cy-size//3, cx+size//3, cy+size//3], fill=(0, 0, 0))
    # 高光
    draw.ellipse([cx-size//4-2, cy-size//4-2, cx-size//4+2, cy-size//4+2], fill=(255, 255, 255))

def draw_cute_mouth(draw, cx, cy, size=15):
    """画可爱的微笑嘴巴"""
    draw.arc([cx-size, cy-size//2, cx+size, cy+size], start=0, end=180, fill=(0, 0, 0), width=3)

def draw_blush(draw, cx, cy, size=12):
    """画腮红"""
    draw.ellipse([cx-size, cy-size//2, cx+size, cy+size//2], fill=(255, 182, 193))

def draw_cloud(draw, cx, cy, size=60):
    """画卡通云朵"""
    color = (255, 255, 255)
    draw.ellipse([cx-size, cy-size//2, cx+size, cy+size//2], fill=color)
    draw.ellipse([cx-size*1.5, cy, cx-size*0.5, cy+size], fill=color)
    draw.ellipse([cx+size*0.5, cy, cx+size*1.5, cy+size], fill=color)

def draw_ha_long_bay():
    """1. 越南 - 下龙湾 - 海上桂林"""
    img = Image.new('RGB', (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(img)
    
    create_gradient_background(draw, WIDTH, HEIGHT)
    
    # 画几朵云
    draw_cloud(draw, 150, 150, 50)
    draw_cloud(draw, 650, 200, 40)
    
    # 海水
    draw.rectangle([0, 800, WIDTH, HEIGHT], fill=(64, 164, 223))
    
    # 画石灰岩山峰（卡通风格）
    colors = [(100, 150, 100), (80, 130, 80), (120, 170, 120), (90, 140, 90)]
    positions = [(200, 500), (500, 450), (350, 550), (600, 520)]
    
    for i, (x, y) in enumerate(positions):
        color = colors[i]
        # 山峰主体 - 圆胖的卡通形状
        points = [
            (x, y - 250),  # 顶点
            (x - 100, y),  # 左下
            (x + 100, y),  # 右下
        ]
        draw.polygon(points, fill=color, outline=(50, 80, 50), width=4)
        
        # 添加植被点缀
        for j in range(5):
            tx = x - 60 + j * 30
            ty = y - 30 - j * 10
            draw.ellipse([tx-15, ty-15, tx+15, ty+15], fill=(50, 100, 50))
    
    # 主山峰（带脸的）
    main_x, main_y = 400, 600
    points = [
        (main_x, main_y - 300),
        (main_x - 120, main_y),
        (main_x + 120, main_y),
    ]
    draw.polygon(points, fill=(110, 160, 110), outline=(50, 80, 50), width=4)
    
    # 眼睛
    draw_circle_eyes(draw, main_x - 35, main_y - 180, 25)
    draw_circle_eyes(draw, main_x + 35, main_y - 180, 25)
    
    # 腮红
    draw_blush(draw, main_x - 60, main_y - 160, 15)
    draw_blush(draw, main_x + 60, main_y - 160, 15)
    
    # 嘴巴
    draw_cute_mouth(draw, main_x, main_y - 140, 20)
    
    # 山顶植被
    draw.ellipse([main_x-30, main_y-320, main_x+30, main_y-280], fill=(60, 120, 60))
    
    # 标题
    draw.text((WIDTH//2 - 150, 50), "Ha Long Bay", fill=(255, 255, 255), font=None)
    draw.text((WIDTH//2 - 100, 90), "Vietnam", fill=(255, 220, 100), font=None)
    
    return img

def draw_angkor_wat():
    """2. 柬埔寨 - 吴哥窟 - 寺庙群"""
    img = Image.new('RGB', (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(img)
    
    create_gradient_background(draw, WIDTH, HEIGHT)
    
    # 太阳
    draw.ellipse([600, 100, 700, 200], fill=(255, 220, 100))
    
    # 吴哥窟主体 - 三个塔
    base_color = (139, 125, 107)
    
    # 中央主塔
    cx, cy = 400, 500
    # 塔身
    draw.polygon([
        (cx, cy - 350),
        (cx - 80, cy - 150),
        (cx - 80, cy),
        (cx + 80, cy),
        (cx + 80, cy - 150),
    ], fill=base_color, outline=(80, 70, 60), width=4)
    
    # 塔顶
    draw.polygon([
        (cx, cy - 380),
        (cx - 30, cy - 350),
        (cx + 30, cy - 350),
    ], fill=(160, 145, 125), outline=(80, 70, 60), width=3)
    
    # 左右小塔
    for offset in [-200, 200]:
        tx = cx + offset
        draw.polygon([
            (tx, cy - 250),
            (tx - 50, cy - 100),
            (tx - 50, cy),
            (tx + 50, cy),
            (tx + 50, cy - 100),
        ], fill=base_color, outline=(80, 70, 60), width=4)
        draw.polygon([
            (tx, cy - 270),
            (tx - 20, cy - 250),
            (tx + 20, cy - 250),
        ], fill=(160, 145, 125), outline=(80, 70, 60), width=3)
    
    # 基座
    draw.rectangle([150, cy, 650, cy + 50], fill=(120, 110, 95), outline=(80, 70, 60), width=3)
    
    # 给主塔画脸
    draw_circle_eyes(draw, cx - 30, cy - 220, 22)
    draw_circle_eyes(draw, cx + 30, cy - 220, 22)
    draw_cute_mouth(draw, cx, cy - 180, 18)
    draw_blush(draw, cx - 55, cy - 200, 12)
    draw_blush(draw, cx + 55, cy - 200, 12)
    
    # 丛林背景
    for i in range(8):
        x = 80 + i * 90
        y = 700
        draw.polygon([
            (x, y - 100),
            (x - 30, y),
            (x + 30, y),
        ], fill=(60, 120, 60), outline=(40, 80, 40), width=2)
    
    # 标题
    draw.text((WIDTH//2 - 150, 50), "Angkor Wat", fill=(255, 255, 255), font=None)
    draw.text((WIDTH//2 - 120, 90), "Cambodia", fill=(255, 220, 100), font=None)
    
    return img

def draw_shwedagon():
    """3. 缅甸 - 仰光大金塔 - 金色佛塔"""
    img = Image.new('RGB', (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(img)
    
    create_gradient_background(draw, WIDTH, HEIGHT)
    
    cx, cy = 400, 650
    
    # 基座台阶
    for i in range(4):
        w = 300 - i * 40
        h = 30
        y = cy - i * 35
        draw.rectangle([cx - w//2, y, cx + w//2, y + h], 
                      fill=(218, 165, 32), outline=(184, 134, 11), width=3)
    
    # 钟形塔身
    bell_color = (255, 215, 0)  # 金色
    
    # 主体圆胖形状
    draw.ellipse([cx - 100, cy - 250, cx + 100, cy - 50], 
                fill=bell_color, outline=(218, 165, 32), width=4)
    
    # 上部锥形
    draw.polygon([
        (cx - 80, cy - 200),
        (cx - 40, cy - 350),
        (cx + 40, cy - 350),
        (cx + 80, cy - 200),
    ], fill=bell_color, outline=(218, 165, 32), width=4)
    
    # 塔顶
    draw.polygon([
        (cx, cy - 420),
        (cx - 30, cy - 350),
        (cx + 30, cy - 350),
    ], fill=(255, 236, 139), outline=(218, 165, 32), width=3)
    
    # 顶部的宝石
    draw.ellipse([cx - 15, cy - 440, cx + 15, cy - 410], fill=(255, 0, 100))
    
    # 给塔画脸
    draw_circle_eyes(draw, cx - 35, cy - 180, 25)
    draw_circle_eyes(draw, cx + 35, cy - 180, 25)
    draw_cute_mouth(draw, cx, cy - 130, 20)
    draw_blush(draw, cx - 60, cy - 150, 15)
    draw_blush(draw, cx + 60, cy - 150, 15)
    
    # 周围小塔
    for offset in [-180, 180]:
        sx = cx + offset
        draw.ellipse([sx - 40, cy - 100, sx + 40, cy - 20], 
                    fill=(255, 223, 100), outline=(218, 165, 32), width=3)
        draw.polygon([
            (sx, cy - 160),
            (sx - 15, cy - 100),
            (sx + 15, cy - 100),
        ], fill=(255, 223, 100), outline=(218, 165, 32), width=2)
    
    # 标题
    draw.text((WIDTH//2 - 160, 50), "Shwedagon", fill=(255, 255, 255), font=None)
    draw.text((WIDTH//2 - 100, 90), "Myanmar", fill=(255, 220, 100), font=None)
    
    return img

def draw_patuxai():
    """4. 老挝 - 凯旋门 (Patuxai) - 万象地标"""
    img = Image.new('RGB', (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(img)
    
    create_gradient_background(draw, WIDTH, HEIGHT)
    
    cx, cy = 400, 600
    
    # 基座
    draw.rectangle([cx - 200, cy, cx + 200, cy + 150], 
                  fill=(205, 175, 140), outline=(160, 130, 100), width=4)
    
    # 拱门
    draw.arc([cx - 100, cy - 50, cx + 100, cy + 100], 
            start=0, end=180, fill=(120, 100, 80), width=20)
    
    # 四个塔楼
    tower_positions = [cx - 160, cx + 160, cx - 120, cx + 120]
    for i, tx in enumerate(tower_positions[:2]):
        # 主塔
        draw.rectangle([tx - 40, cy - 250, tx + 40, cy], 
                      fill=(200, 170, 135), outline=(150, 120, 90), width=3)
        # 塔顶
        draw.polygon([
            (tx, cy - 300),
            (tx - 35, cy - 250),
            (tx + 35, cy - 250),
        ], fill=(180, 150, 115), outline=(150, 120, 90), width=3)
        # 小尖顶
        draw.line([(tx, cy - 330), (tx, cy - 300)], fill=(150, 120, 90), width=4)
    
    for i, tx in enumerate(tower_positions[2:]):
        # 小塔
        draw.rectangle([tx - 25, cy - 180, tx + 25, cy], 
                      fill=(210, 180, 145), outline=(150, 120, 90), width=3)
        draw.polygon([
            (tx, cy - 220),
            (tx - 20, cy - 180),
            (tx + 20, cy - 180),
        ], fill=(190, 160, 125), outline=(150, 120, 90), width=3)
    
    # 中央顶部结构
    draw.rectangle([cx - 60, cy - 280, cx + 60, cy - 150], 
                  fill=(195, 165, 130), outline=(150, 120, 90), width=3)
    draw.polygon([
        (cx, cy - 350),
        (cx - 50, cy - 280),
        (cx + 50, cy - 280),
    ], fill=(185, 155, 120), outline=(150, 120, 90), width=3)
    
    # 给中央结构画脸
    draw_circle_eyes(draw, cx - 30, cy - 240, 22)
    draw_circle_eyes(draw, cx + 30, cy - 240, 22)
    draw_cute_mouth(draw, cx, cy - 200, 18)
    draw_blush(draw, cx - 50, cy - 220, 12)
    draw_blush(draw, cx + 50, cy - 220, 12)
    
    # 装饰细节
    for i in range(5):
        x = cx - 160 + i * 80
        draw.rectangle([x - 10, cy + 20, x + 10, cy + 60], 
                      fill=(170, 140, 105), outline=(130, 100, 75), width=2)
    
    # 标题
    draw.text((WIDTH//2 - 120, 50), "Patuxai", fill=(255, 255, 255), font=None)
    draw.text((WIDTH//2 - 80, 90), "Laos", fill=(255, 220, 100), font=None)
    
    return img

def draw_chocolate_hills():
    """5. 菲律宾 - 巧克力山 - 薄荷岛"""
    img = Image.new('RGB', (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(img)
    
    create_gradient_background(draw, WIDTH, HEIGHT)
    
    # 草地背景
    draw.rectangle([0, 600, WIDTH, HEIGHT], fill=(144, 238, 144))
    
    # 巧克力色山丘
    hill_color = (139, 90, 43)
    hills = [
        (200, 650, 80),
        (350, 600, 100),
        (500, 630, 90),
        (650, 580, 110),
        (100, 680, 70),
        (280, 700, 85),
        (450, 680, 95),
        (600, 710, 75),
        (750, 650, 80),
    ]
    
    for x, y, r in hills:
        # 山丘主体
        draw.ellipse([x - r, y - r, x + r, y + r], 
                    fill=hill_color, outline=(100, 60, 25), width=3)
        
        # 顶部草皮
        draw.arc([x - r, y - r, x + r, y + r], 
                start=200, end=340, fill=(100, 200, 100), width=8)
    
    # 主山丘（带脸的）
    mx, my, mr = 400, 550, 120
    draw.ellipse([mx - mr, my - mr, mx + mr, my + mr], 
                fill=(150, 100, 50), outline=(100, 60, 25), width=4)
    
    # 眼睛
    draw_circle_eyes(draw, mx - 40, my - 30, 28)
    draw_circle_eyes(draw, mx + 40, my - 30, 28)
    
    # 腮红
    draw_blush(draw, mx - 70, my, 18)
    draw_blush(draw, mx + 70, my, 18)
    
    # 嘴巴
    draw_cute_mouth(draw, mx, my + 10, 25)
    
    # 顶部草皮
    draw.arc([mx - mr, my - mr, mx + mr, my + mr], 
            start=200, end=340, fill=(120, 220, 120), width=12)
    
    # 几朵云
    draw_cloud(draw, 150, 150, 45)
    draw_cloud(draw, 600, 120, 40)
    draw_cloud(draw, 700, 200, 35)
    
    # 标题
    draw.text((WIDTH//2 - 180, 50), "Chocolate Hills", fill=(255, 255, 255), font=None)
    draw.text((WIDTH//2 - 100, 90), "Philippines", fill=(255, 220, 100), font=None)
    
    return img

def draw_petronas():
    """6. 马来西亚 - 双子塔 - 吉隆坡"""
    img = Image.new('RGB', (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(img)
    
    create_gradient_background(draw, WIDTH, HEIGHT)
    
    # 双子塔
    tower_color = (180, 190, 210)
    highlight = (220, 230, 250)
    
    for offset in [-120, 120]:
        cx = 400 + offset
        base_y = 750
        
        # 塔身主体 - 分段设计
        sections = [
            (base_y - 100, 70, 100),   # 底部
            (base_y - 200, 60, 100),   # 中段
            (base_y - 300, 50, 80),    # 上段
            (base_y - 400, 40, 60),    # 顶部
        ]
        
        for y, w, h in sections:
            draw.rectangle([cx - w, y, cx + w, y + h], 
                          fill=tower_color, outline=(140, 150, 170), width=3)
            # 窗户线条
            for i in range(4):
                ly = y + 15 + i * 20
                draw.line([(cx - w + 5, ly), (cx + w - 5, ly)], 
                         fill=(100, 110, 130), width=2)
        
        # 塔顶尖
        draw.polygon([
            (cx, base_y - 480),
            (cx - 20, base_y - 400),
            (cx + 20, base_y - 400),
        ], fill=(200, 210, 230), outline=(140, 150, 170), width=3)
        draw.line([(cx, base_y - 510), (cx, base_y - 480)], 
                 fill=(160, 170, 190), width=4)
        
        # 给塔画脸（在中段）
        draw_circle_eyes(draw, cx - 25, base_y - 250, 20)
        draw_circle_eyes(draw, cx + 25, base_y - 250, 20)
        draw_cute_mouth(draw, cx, base_y - 210, 15)
        draw_blush(draw, cx - 45, base_y - 230, 12)
        draw_blush(draw, cx + 45, base_y - 230, 12)
    
    # 天桥
    bridge_y = 350
    draw.rectangle([280, bridge_y, 520, bridge_y + 25], 
                  fill=(160, 170, 190), outline=(120, 130, 150), width=3)
    
    # 基座
    draw.rectangle([220, 750, 580, 800], 
                  fill=(140, 150, 170), outline=(100, 110, 130), width=4)
    
    # 云朵
    draw_cloud(draw, 150, 180, 50)
    draw_cloud(draw, 650, 150, 45)
    
    # 标题
    draw.text((WIDTH//2 - 150, 50), "Petronas Towers", fill=(255, 255, 255), font=None)
    draw.text((WIDTH//2 - 140, 90), "Malaysia", fill=(255, 220, 100), font=None)
    
    return img

def draw_borobudur():
    """7. 印尼 - 婆罗浮屠 - 佛塔"""
    img = Image.new('RGB', (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(img)
    
    create_gradient_background(draw, WIDTH, HEIGHT)
    
    cx, cy = 400, 700
    
    # 基座平台
    draw.polygon([
        (cx - 250, cy),
        (cx + 250, cy),
        (cx + 300, cy + 80),
        (cx - 300, cy + 80),
    ], fill=(160, 140, 120), outline=(120, 100, 80), width=4)
    
    # 阶梯式平台
    levels = [
        (cy - 80, 200, 60),
        (cy - 160, 170, 50),
        (cy - 230, 140, 40),
    ]
    
    for y, w, h in levels:
        draw.polygon([
            (cx - w, y),
            (cx + w, y),
            (cx + w + 20, y + h),
            (cx - w - 20, y + h),
        ], fill=(180, 160, 140), outline=(130, 110, 90), width=3)
        
        # 小佛塔
        for offset in [-w*0.6, -w*0.2, w*0.2, w*0.6]:
            sx = cx + offset
            draw.ellipse([sx - 20, y - 40, sx + 20, y], 
                        fill=(200, 180, 160), outline=(150, 130, 110), width=2)
            draw.polygon([
                (sx, y - 55),
                (sx - 10, y - 40),
                (sx + 10, y - 40),
            ], fill=(190, 170, 150), outline=(140, 120, 100), width=2)
    
    # 中央主塔
    draw.polygon([
        (cx - 50, cy - 230),
        (cx + 50, cy - 230),
        (cx + 60, cy - 100),
        (cx - 60, cy - 100),
    ], fill=(190, 170, 150), outline=(140, 120, 100), width=4)
    
    # 主塔顶部圆顶
    draw.ellipse([cx - 60, cy - 320, cx + 60, cy - 200], 
                fill=(210, 190, 170), outline=(160, 140, 120), width=4)
    
    # 塔顶尖
    draw.polygon([
        (cx, cy - 420),
        (cx - 25, cy - 320),
        (cx + 25, cy - 320),
    ], fill=(220, 200, 180), outline=(170, 150, 130), width=3)
    
    # 给主塔画脸
    draw_circle_eyes(draw, cx - 30, cy - 260, 22)
    draw_circle_eyes(draw, cx + 30, cy - 260, 22)
    draw_cute_mouth(draw, cx, cy - 220, 18)
    draw_blush(draw, cx - 55, cy - 240, 12)
    draw_blush(draw, cx + 55, cy - 240, 12)
    
    # 周围的绿树
    for i in range(6):
        x = 80 + i * 130
        y = 800
        if 250 < x < 550:  # 跳过中间
            continue
        draw.polygon([
            (x, y - 120),
            (x - 40, y),
            (x + 40, y),
        ], fill=(60, 140, 60), outline=(40, 100, 40), width=2)
    
    # 标题
    draw.text((WIDTH//2 - 140, 50), "Borobudur", fill=(255, 255, 255), font=None)
    draw.text((WIDTH//2 - 80, 90), "Indonesia", fill=(255, 220, 100), font=None)
    
    return img

def main():
    """主函数：生成所有图片"""
    towers = [
        (draw_ha_long_bay, "ha-long-bay.png", "越南 - 下龙湾"),
        (draw_angkor_wat, "angkor-wat.png", "柬埔寨 - 吴哥窟"),
        (draw_shwedagon, "shwedagon.png", "缅甸 - 仰光大金塔"),
        (draw_patuxai, "patuxai.png", "老挝 - 凯旋门"),
        (draw_chocolate_hills, "chocolate-hills.png", "菲律宾 - 巧克力山"),
        (draw_petronas, "petronas.png", "马来西亚 - 双子塔"),
        (draw_borobudur, "borobudur.png", "印尼 - 婆罗浮屠"),
    ]
    
    for func, filename, name in towers:
        print(f"正在生成: {name} -> {filename}")
        img = func()
        output_path = os.path.join(OUTPUT_DIR, filename)
        img.save(output_path, "PNG")
        print(f"  ✓ 已保存: {output_path}")
    
    print("\n全部7张图片生成完成！")

if __name__ == "__main__":
    main()

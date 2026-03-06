#!/usr/bin/env python3
"""
生成卡通世界名塔图片
愤怒的小鸟风格 - 可爱大眼睛表情
"""

from PIL import Image, ImageDraw, ImageFont
import os
import math

def create_gradient_background(width, height, color1, color2):
    """创建渐变背景"""
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)
    
    r1, g1, b1 = int(color1[1:3], 16), int(color1[3:5], 16), int(color1[5:7], 16)
    r2, g2, b2 = int(color2[1:3], 16), int(color2[3:5], 16), int(color2[5:7], 16)
    
    for y in range(height):
        ratio = y / height
        r = int(r1 + (r2 - r1) * ratio)
        g = int(g1 + (g2 - g1) * ratio)
        b = int(b1 + (b2 - b1) * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    return img

def draw_eyes_and_face(draw, center_x, center_y, eye_size=35):
    """绘制愤怒的小鸟风格的大眼睛表情"""
    # 左眼白
    left_eye_x = center_x - eye_size
    draw.ellipse([left_eye_x - eye_size, center_y - eye_size, 
                  left_eye_x + eye_size, center_y + eye_size], 
                 fill='white', outline='black', width=3)
    # 右眼白
    right_eye_x = center_x + eye_size
    draw.ellipse([right_eye_x - eye_size, center_y - eye_size, 
                  right_eye_x + eye_size, center_y + eye_size], 
                 fill='white', outline='black', width=3)
    
    # 左眼珠（愤怒的小鸟风格 - 大眼珠）
    pupil_size = eye_size * 0.6
    draw.ellipse([left_eye_x - pupil_size, center_y - pupil_size + 5, 
                  left_eye_x + pupil_size, center_y + pupil_size + 5], 
                 fill='black')
    # 高光
    draw.ellipse([left_eye_x - 8, center_y - 8, left_eye_x + 2, center_y + 2], fill='white')
    
    # 右眼珠
    draw.ellipse([right_eye_x - pupil_size, center_y - pupil_size + 5, 
                  right_eye_x + pupil_size, center_y + pupil_size + 5], 
                 fill='black')
    # 高光
    draw.ellipse([right_eye_x - 8, center_y - 8, right_eye_x + 2, center_y + 2], fill='white')
    
    # 微笑
    smile_y = center_y + eye_size + 15
    draw.arc([center_x - 25, smile_y - 15, center_x + 25, smile_y + 15], 
             start=0, end=180, fill='black', width=4)
    
    # 腮红
    blush_color = (255, 182, 193)
    draw.ellipse([left_eye_x - 45, center_y + 10, left_eye_x - 15, center_y + 40], 
                 fill=blush_color)
    draw.ellipse([right_eye_x + 15, center_y + 10, right_eye_x + 45, center_y + 40], 
                 fill=blush_color)

def draw_text(draw, text, y_pos, width):
    """绘制底部文字"""
    # 尝试使用系统字体
    try:
        font = ImageFont.truetype("/System/Library/Fonts/PingFang.ttc", 60)
    except:
        try:
            font = ImageFont.truetype("/System/Library/Fonts/STHeiti Light.ttc", 60)
        except:
            font = ImageFont.load_default()
    
    # 获取文字尺寸
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    x_pos = (width - text_width) // 2
    
    # 绘制白色文字带阴影
    draw.text((x_pos+3, y_pos+3), text, fill=(0,0,0,128), font=font)
    draw.text((x_pos, y_pos), text, fill='white', font=font)

def draw_sagrada_familia():
    """绘制圣家堂 - 彩色尖顶教堂"""
    img = create_gradient_background(800, 1200, '#87CEEB', '#98D8E8')
    draw = ImageDraw.Draw(img)
    
    # 主体建筑
    base_y = 750
    # 主塔
    draw.polygon([(400, 200), (350, base_y), (450, base_y)], fill=(255, 220, 180), outline='black', width=3)
    # 两侧塔
    draw.polygon([(280, 300), (250, base_y), (320, base_y)], fill=(255, 200, 150), outline='black', width=3)
    draw.polygon([(520, 300), (480, base_y), (550, base_y)], fill=(255, 200, 150), outline='black', width=3)
    
    # 彩色尖顶
    colors = [(255,100,100), (100,255,100), (100,100,255), (255,255,100), (255,100,255)]
    for i, x in enumerate([270, 400, 530]):
        color = colors[i % len(colors)]
        draw.polygon([(x, 100), (x-30, 200), (x+30, 200)], fill=color, outline='black', width=2)
    
    # 装饰性的彩色马赛克细节
    for y in range(250, 700, 40):
        draw.rectangle([370, y, 430, y+20], fill=(100,200,255), outline='black', width=1)
    
    # 可爱的表情（在正面）
    draw_eyes_and_face(draw, 400, 500, eye_size=30)
    
    # 底部文字
    draw_text(draw, "圣家堂 Sagrada Família", 1050, 800)
    
    return img

def draw_windmill():
    """绘制荷兰风车"""
    img = create_gradient_background(800, 1200, '#87CEEB', '#98D8E8')
    draw = ImageDraw.Draw(img)
    
    # 风车主体（圆形塔身）
    draw.ellipse([250, 450, 550, 850], fill=(139, 90, 43), outline='black', width=4)
    # 风车顶部圆锥
    draw.polygon([(250, 480), (400, 200), (550, 480)], fill=(160, 82, 45), outline='black', width=3)
    
    # 风车叶片中心
    center_x, center_y = 400, 350
    draw.ellipse([center_x-30, center_y-30, center_x+30, center_y+30], fill=(80, 50, 30), outline='black', width=2)
    
    # 四片风车叶片
    blade_colors = [(255, 200, 150), (240, 180, 130), (255, 200, 150), (240, 180, 130)]
    for i in range(4):
        angle = i * 90
        rad = math.radians(angle)
        x1 = center_x + math.cos(rad) * 30
        y1 = center_y + math.sin(rad) * 30
        x2 = center_x + math.cos(rad) * 200
        y2 = center_y + math.sin(rad) * 200
        # 叶片
        perp = math.radians(angle + 90)
        wx = math.cos(perp) * 25
        wy = math.sin(perp) * 25
        draw.polygon([(x1-wx, y1-wy), (x1+wx, y1+wy), (x2+wx, y2+wy), (x2-wx, y2-wy)], 
                     fill=blade_colors[i], outline='black', width=2)
    
    # 可爱的表情（在风车主体上）
    draw_eyes_and_face(draw, 400, 620, eye_size=35)
    
    # 底部文字
    draw_text(draw, "风车 Windmill", 1050, 800)
    
    return img

def draw_matterhorn():
    """绘制马特洪峰 - 三角形雪山"""
    img = create_gradient_background(800, 1200, '#87CEEB', '#98D8E8')
    draw = ImageDraw.Draw(img)
    
    # 主山峰（三角形）
    peak_y = 150
    base_y = 800
    left_x, right_x = 200, 600
    
    # 山峰阴影面
    draw.polygon([(400, peak_y), (400, base_y), (right_x, base_y)], fill=(220, 220, 240), outline='black', width=3)
    # 山峰光照面
    draw.polygon([(400, peak_y), (left_x, base_y), (400, base_y)], fill=(255, 255, 255), outline='black', width=3)
    
    # 山顶积雪细节
    for i in range(5):
        y = peak_y + 80 + i * 40
        width = 60 + i * 30
        draw.polygon([(400, y-width//2), (380, y), (420, y)], fill='white', outline='black', width=1)
    
    # 山腰云朵效果
    for i in range(3):
        cx = 300 + i * 100
        cy = 400 + i * 80
        draw.ellipse([cx-40, cy-20, cx+40, cy+20], fill=(255,255,255,200), outline='black', width=1)
    
    # 可爱的表情（在山峰上）
    draw_eyes_and_face(draw, 400, 380, eye_size=32)
    
    # 底部文字
    draw_text(draw, "马特洪峰 Matterhorn", 1050, 800)
    
    return img

def draw_st_basil():
    """绘制圣瓦西里大教堂 - 彩色洋葱头圆顶"""
    img = create_gradient_background(800, 1200, '#87CEEB', '#98D8E8')
    draw = ImageDraw.Draw(img)
    
    base_y = 800
    
    # 中央主塔（最高）
    main_colors = [(255, 100, 100), (255, 150, 50), (255, 100, 100)]
    draw.polygon([(400, 650), (350, base_y), (450, base_y)], fill=(200, 50, 50), outline='black', width=3)
    # 主洋葱头
    draw.ellipse([320, 150, 480, 350], fill=main_colors[0], outline='black', width=3)
    draw.ellipse([340, 180, 460, 320], fill=main_colors[1], outline='black', width=2)
    
    # 四个小洋葱头
    small_colors = [(100, 150, 255), (100, 255, 100), (255, 255, 100), (255, 100, 255)]
    positions = [(280, 450), (520, 450), (320, 600), (480, 600)]
    for i, (px, py) in enumerate(positions):
        # 塔身
        draw.polygon([(px, py-50), (px-30, base_y), (px+30, base_y)], 
                     fill=(180, 40, 40), outline='black', width=2)
        # 洋葱头
        draw.ellipse([px-45, py-120, px+45, py], fill=small_colors[i], outline='black', width=3)
    
    # 可爱的表情（在主塔上）
    draw_eyes_and_face(draw, 400, 480, eye_size=30)
    
    # 底部文字
    draw_text(draw, "圣瓦西里大教堂 St. Basil's", 1050, 800)
    
    return img

def draw_n_tower():
    """绘制N塔 - 首尔塔+爱心锁"""
    img = create_gradient_background(800, 1200, '#87CEEB', '#98D8E8')
    draw = ImageDraw.Draw(img)
    
    base_y = 850
    
    # 塔身（红色锥形）
    draw.polygon([(400, 200), (320, base_y), (480, base_y)], fill=(200, 50, 50), outline='black', width=4)
    
    # 塔顶平台
    draw.rectangle([350, 180, 450, 220], fill=(100, 100, 100), outline='black', width=2)
    # 天线
    draw.line([(400, 100), (400, 180)], fill=(80, 80, 80), width=8)
    draw.ellipse([385, 85, 415, 115], fill=(255, 100, 100), outline='black', width=2)
    
    # 塔身上的横线装饰
    for y in range(280, 800, 80):
        draw.line([(340 + (y-200)//8, y), (460 - (y-200)//8, y)], fill=(150, 40, 40), width=3)
    
    # 爱心锁装饰
    heart_positions = [(280, 700), (520, 650), (300, 550), (500, 500)]
    for hx, hy in heart_positions:
        # 绘制爱心
        heart_color = (255, 100, 150)
        draw.ellipse([hx-15, hy-10, hx, hy+10], fill=heart_color, outline='black', width=1)
        draw.ellipse([hx, hy-10, hx+15, hy+10], fill=heart_color, outline='black', width=1)
        draw.polygon([(hx-15, hy), (hx+15, hy), (hx, hy+20)], fill=heart_color, outline='black', width=1)
    
    # 可爱的表情（在塔身上）
    draw_eyes_and_face(draw, 400, 450, eye_size=35)
    
    # 底部文字
    draw_text(draw, "N塔 N Tower", 1050, 800)
    
    return img

def draw_marina_bay():
    """绘制滨海湾金沙 - 三塔顶船型建筑"""
    img = create_gradient_background(800, 1200, '#87CEEB', '#98D8E8')
    draw = ImageDraw.Draw(img)
    
    base_y = 850
    
    # 三座塔
    tower_x = [250, 400, 550]
    for tx in tower_x:
        # 塔身（带有弧度）
        draw.polygon([(tx-40, 350), (tx+40, 350), (tx+50, base_y), (tx-50, base_y)], 
                     fill=(200, 220, 240), outline='black', width=3)
        # 窗户线条
        for y in range(400, 800, 50):
            draw.line([(tx-35, y), (tx+35, y)], fill=(100, 150, 200), width=2)
    
    # 顶部船型结构
    deck_y = 300
    draw.polygon([(180, deck_y+80), (220, deck_y), (580, deck_y), (620, deck_y+80)], 
                 fill=(150, 200, 255), outline='black', width=4)
    draw.rectangle([220, deck_y-30, 580, deck_y], fill=(120, 180, 240), outline='black', width=3)
    
    # 顶部花园细节
    for i in range(5):
        x = 250 + i * 70
        draw.ellipse([x-15, deck_y-50, x+15, deck_y-20], fill=(100, 200, 100), outline='black', width=1)
    
    # 可爱的表情（在中间塔上）
    draw_eyes_and_face(draw, 400, 520, eye_size=32)
    
    # 底部文字
    draw_text(draw, "滨海湾金沙 Marina Bay Sands", 1050, 800)
    
    return img

def draw_blue_mosque():
    """绘制蓝色清真寺 - 蓝色圆顶+尖塔"""
    img = create_gradient_background(800, 1200, '#87CEEB', '#98D8E8')
    draw = ImageDraw.Draw(img)
    
    base_y = 850
    
    # 主体建筑（中央大圆顶）
    draw.polygon([(400, 550), (280, base_y), (520, base_y)], fill=(100, 150, 200), outline='black', width=3)
    # 大圆顶
    draw.ellipse([250, 250, 550, 550], fill=(80, 130, 200), outline='black', width=4)
    
    # 四个小圆顶
    small_dome_x = [220, 580, 300, 500]
    for i, dx in enumerate(small_dome_x):
        height = 350 if i < 2 else 420
        draw.ellipse([dx-50, height, dx+50, height+100], fill=(100, 160, 220), outline='black', width=2)
    
    # 尖塔（六座）
    minaret_x = [150, 250, 650, 550, 320, 480]
    for i, mx in enumerate(minaret_x):
        height = 200 if i < 4 else 280
        # 尖塔主体
        draw.polygon([(mx-15, height), (mx+15, height), (mx+10, base_y), (mx-10, base_y)], 
                     fill=(120, 140, 180), outline='black', width=2)
        # 尖塔顶部
        draw.polygon([(mx, height-60), (mx-15, height), (mx+15, height)], 
                     fill=(150, 170, 200), outline='black', width=2)
        # 月牙装饰
        draw.arc([mx-10, height-80, mx+10, height-60], start=0, end=180, fill=(255, 215, 0), width=3)
    
    # 可爱的表情（在大圆顶上）
    draw_eyes_and_face(draw, 400, 420, eye_size=35)
    
    # 底部文字
    draw_text(draw, "蓝色清真寺 Blue Mosque", 1050, 800)
    
    return img

def main():
    output_dir = "/Users/moutai/Desktop/toweroffate_v1.0/assets/towers"
    
    towers = [
        ("sagrada-familia.png", draw_sagrada_familia),
        ("windmill.png", draw_windmill),
        ("matterhorn.png", draw_matterhorn),
        ("st-basil.png", draw_st_basil),
        ("n-tower.png", draw_n_tower),
        ("marina-bay.png", draw_marina_bay),
        ("blue-mosque.png", draw_blue_mosque),
    ]
    
    print("开始生成卡通世界名塔图片...")
    for filename, draw_func in towers:
        filepath = os.path.join(output_dir, filename)
        img = draw_func()
        img.save(filepath, "PNG")
        print(f"✓ 已生成: {filename}")
    
    print(f"\n🎉 全部完成！图片保存在: {output_dir}")

if __name__ == "__main__":
    main()

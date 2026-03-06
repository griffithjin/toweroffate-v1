#!/usr/bin/env python3
"""
生成尼日利亚州卡通塔图片 - 愤怒的小鸟风格
使用Pillow库创建卡通塔
"""

from PIL import Image, ImageDraw, ImageFilter, ImageFont
import math
import os

# 输出目录
OUTPUT_DIR = "/Users/moutai/Desktop/toweroffate_v1.0/assets/towers/states/nigeria"

# 图片规格
WIDTH = 800
HEIGHT = 1200

# 愤怒的小鸟风格配色
COLORS = {
    'sky_top': (135, 206, 235),      # 天蓝色 - 顶部
    'sky_bottom': (176, 224, 230),   # 浅天蓝色 - 底部
    'outline': (50, 50, 50),         # 深灰色描边
    'shadow': (0, 0, 0, 80),         # 阴影
    'eye_white': (255, 255, 255),    # 眼白
    'eye_black': (0, 0, 0),          # 黑眼珠
    'cheek': (255, 182, 193, 150),   # 腮红
}

def create_gradient_background(width, height):
    """创建天蓝色渐变背景"""
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)
    
    for y in range(height):
        ratio = y / height
        r = int(COLORS['sky_top'][0] + (COLORS['sky_bottom'][0] - COLORS['sky_top'][0]) * ratio)
        g = int(COLORS['sky_top'][1] + (COLORS['sky_bottom'][1] - COLORS['sky_top'][1]) * ratio)
        b = int(COLORS['sky_top'][2] + (COLORS['sky_bottom'][2] - COLORS['sky_top'][2]) * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    return img

def draw_circle_face(draw, cx, cy, radius, body_color):
    """绘制愤怒的小鸟风格的圆形脸"""
    # 身体/脸部主体
    draw.ellipse([cx - radius, cy - radius, cx + radius, cy + radius], 
                 fill=body_color, outline=COLORS['outline'], width=4)
    
    # 眼睛位置（愤怒的小鸟风格的大眼睛）
    eye_radius = radius * 0.25
    eye_offset_x = radius * 0.35
    eye_offset_y = -radius * 0.15
    
    # 左眼白
    left_eye_x = cx - eye_offset_x
    left_eye_y = cy + eye_offset_y
    draw.ellipse([left_eye_x - eye_radius, left_eye_y - eye_radius,
                  left_eye_x + eye_radius, left_eye_y + eye_radius],
                 fill=COLORS['eye_white'], outline=COLORS['outline'], width=2)
    
    # 右眼白
    right_eye_x = cx + eye_offset_x
    right_eye_y = cy + eye_offset_y
    draw.ellipse([right_eye_x - eye_radius, right_eye_y - eye_radius,
                  right_eye_x + eye_radius, right_eye_y + eye_radius],
                 fill=COLORS['eye_white'], outline=COLORS['outline'], width=2)
    
    # 黑眼珠（稍微看向一侧，显得有活力）
    pupil_radius = eye_radius * 0.5
    pupil_offset = eye_radius * 0.2
    
    # 左瞳孔
    draw.ellipse([left_eye_x - pupil_radius + pupil_offset, left_eye_y - pupil_radius,
                  left_eye_x + pupil_radius + pupil_offset, left_eye_y + pupil_radius],
                 fill=COLORS['eye_black'])
    
    # 右瞳孔
    draw.ellipse([right_eye_x - pupil_radius + pupil_offset, right_eye_y - pupil_radius,
                  right_eye_x + pupil_radius + pupil_offset, right_eye_y + pupil_radius],
                 fill=COLORS['eye_black'])
    
    # 眉毛（愤怒的小鸟标志性粗眉毛）
    brow_width = eye_radius * 1.8
    brow_height = eye_radius * 0.6
    brow_y_offset = eye_offset_y - eye_radius - brow_height * 0.5
    
    # 左眉毛（倾斜）
    brow_points_left = [
        (left_eye_x - brow_width, cy + brow_y_offset + brow_height * 0.3),
        (left_eye_x + brow_width * 0.5, cy + brow_y_offset - brow_height * 0.5),
        (left_eye_x + brow_width * 0.7, cy + brow_y_offset + brow_height * 0.2),
        (left_eye_x + brow_width * 0.3, cy + brow_y_offset + brow_height * 1.2),
    ]
    draw.polygon(brow_points_left, fill=COLORS['outline'])
    
    # 右眉毛（倾斜）
    brow_points_right = [
        (right_eye_x - brow_width * 0.5, cy + brow_y_offset - brow_height * 0.5),
        (right_eye_x + brow_width, cy + brow_y_offset + brow_height * 0.3),
        (right_eye_x - brow_width * 0.3, cy + brow_y_offset + brow_height * 1.2),
        (right_eye_x - brow_width * 0.7, cy + brow_y_offset + brow_height * 0.2),
    ]
    draw.polygon(brow_points_right, fill=COLORS['outline'])
    
    # 腮红
    cheek_radius = radius * 0.15
    cheek_y = cy + radius * 0.2
    
    # 左腮红
    img_rgba = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw_rgba = ImageDraw.Draw(img_rgba)
    draw_rgba.ellipse([cx - radius * 0.6 - cheek_radius, cheek_y - cheek_radius,
                       cx - radius * 0.6 + cheek_radius, cheek_y + cheek_radius],
                      fill=COLORS['cheek'])
    draw_rgba.ellipse([cx + radius * 0.6 - cheek_radius, cheek_y - cheek_radius,
                       cx + radius * 0.6 + cheek_radius, cheek_y + cheek_radius],
                      fill=COLORS['cheek'])
    
    return img_rgba

def draw_beak(draw, cx, cy, radius):
    """绘制黄色小尖嘴"""
    beak_size = radius * 0.35
    beak_y = cy + radius * 0.15
    
    # 上喙
    upper_beak = [
        (cx, beak_y - beak_size * 0.3),
        (cx - beak_size, beak_y + beak_size * 0.3),
        (cx + beak_size, beak_y + beak_size * 0.3),
    ]
    draw.polygon(upper_beak, fill=(255, 200, 50), outline=COLORS['outline'], width=2)
    
    # 下喙
    lower_beak = [
        (cx, beak_y + beak_size * 0.7),
        (cx - beak_size * 0.7, beak_y + beak_size * 0.3),
        (cx + beak_size * 0.7, beak_y + beak_size * 0.3),
    ]
    draw.polygon(lower_beak, fill=(255, 180, 40), outline=COLORS['outline'], width=2)

def draw_base_platform(draw, cx, cy, width, height):
    """绘制塔的基础平台"""
    # 草绿色圆形底座
    draw.ellipse([cx - width//2, cy - height//3, cx + width//2, cy + height//3],
                 fill=(100, 180, 100), outline=COLORS['outline'], width=3)
    
    # 草地纹理
    for i in range(8):
        angle = (i / 8) * 2 * math.pi
        grass_x = cx + math.cos(angle) * (width//3)
        grass_y = cy + math.sin(angle) * (height//5)
        grass_size = 15
        draw.polygon([
            (grass_x, grass_y),
            (grass_x - grass_size//2, grass_y - grass_size),
            (grass_x + grass_size//2, grass_y - grass_size),
        ], fill=(80, 160, 80), outline=COLORS['outline'], width=1)

def add_text_label(img, text, y_pos):
    """添加文字标签"""
    draw = ImageDraw.Draw(img)
    
    # 尝试使用系统字体
    try:
        font = ImageFont.truetype("/System/Library/Fonts/PingFang.ttc", 48)
    except:
        try:
            font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 48)
        except:
            font = ImageFont.load_default()
    
    # 计算文字位置居中
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_x = (WIDTH - text_width) // 2
    
    # 绘制文字阴影
    draw.text((text_x + 3, y_pos + 3), text, font=font, fill=(0, 0, 0, 100))
    # 绘制文字
    draw.text((text_x, y_pos), text, font=font, fill=(255, 255, 255))

def composite_images(bg_img, rgba_img):
    """合并RGBA图像到背景"""
    bg_img = bg_img.convert('RGBA')
    result = Image.alpha_composite(bg_img, rgba_img)
    return result.convert('RGB')

# ============ 各州塔的具体绘制函数 ============

def draw_lagos_island():
    """1. 拉各斯 - 拉各斯岛塔"""
    img = create_gradient_background(WIDTH, HEIGHT)
    draw = ImageDraw.Draw(img)
    
    cx, cy = WIDTH // 2, HEIGHT // 2 + 100
    radius = 180
    
    # 塔身 - 棕褐色（代表岛屿/土地）
    body_color = (210, 180, 140)
    rgba_layer = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw_rgba = ImageDraw.Draw(rgba_layer)
    
    # 主塔身
    draw_rgba.ellipse([cx - radius, cy - radius, cx + radius, cy + radius],
                      fill=body_color, outline=COLORS['outline'], width=4)
    
    # 岛屿纹理（小圆点代表建筑物）
    for i in range(12):
        angle = (i / 12) * 2 * math.pi
        dist = radius * 0.5
        bx = cx + math.cos(angle) * dist
        by = cy + math.sin(angle) * dist
        building_size = 20
        draw_rgba.rectangle([bx - building_size, by - building_size*1.5,
                             bx + building_size, by + building_size*0.5],
                           fill=(180, 150, 120), outline=COLORS['outline'], width=1)
    
    # 顶部椰子树
    tree_x, tree_y = cx, cy - radius + 20
    # 树干
    draw_rgba.rectangle([tree_x - 8, tree_y - 80, tree_x + 8, tree_y],
                       fill=(139, 90, 43), outline=COLORS['outline'], width=2)
    # 椰子叶
    for angle in [30, 90, 150, 210, 270, 330]:
        rad = math.radians(angle)
        leaf_end_x = tree_x + math.cos(rad) * 50
        leaf_end_y = tree_y - 80 + math.sin(rad) * 20
        draw_rgba.polygon([
            (tree_x, tree_y - 80),
            (tree_x + math.cos(rad - 0.3) * 25, tree_y - 70 + math.sin(rad - 0.3) * 10),
            (leaf_end_x, leaf_end_y),
            (tree_x + math.cos(rad + 0.3) * 25, tree_y - 70 + math.sin(rad + 0.3) * 10),
        ], fill=(34, 139, 34), outline=COLORS['outline'], width=1)
    
    img = composite_images(img, rgba_layer)
    draw = ImageDraw.Draw(img)
    
    # 脸部
    face_rgba = draw_circle_face(draw, cx, cy + 30, radius * 0.7, body_color)
    img = composite_images(img, face_rgba)
    draw = ImageDraw.Draw(img)
    draw_beak(draw, cx, cy + 40, radius * 0.7)
    
    draw_base_platform(draw, cx, HEIGHT - 100, 250, 80)
    add_text_label(img, "拉各斯岛", HEIGHT - 180)
    
    return img

def draw_kano_walls():
    """2. 卡诺 - 古城墙塔"""
    img = create_gradient_background(WIDTH, HEIGHT)
    draw = ImageDraw.Draw(img)
    
    cx, cy = WIDTH // 2, HEIGHT // 2 + 100
    radius = 180
    
    # 泥土色城墙
    body_color = (194, 178, 128)
    
    rgba_layer = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw_rgba = ImageDraw.Draw(rgba_layer)
    
    # 主塔身
    draw_rgba.ellipse([cx - radius, cy - radius, cx + radius, cy + radius],
                      fill=body_color, outline=COLORS['outline'], width=4)
    
    # 城墙垛口纹理
    for i in range(16):
        angle = (i / 16) * 2 * math.pi
        dist = radius * 0.75
        wx = cx + math.cos(angle) * dist
        wy = cy + math.sin(angle) * dist
        # 垛口
        draw_rgba.rectangle([wx - 15, wy - 20, wx + 15, wy + 20],
                           fill=(160, 140, 100), outline=COLORS['outline'], width=1)
    
    # 顶部小塔楼
    tower_size = 50
    draw_rgba.rectangle([cx - tower_size, cy - radius - tower_size,
                         cx + tower_size, cy - radius + tower_size],
                       fill=(170, 150, 110), outline=COLORS['outline'], width=3)
    # 塔楼尖顶
    draw_rgba.polygon([
        (cx - tower_size - 10, cy - radius - tower_size),
        (cx + tower_size + 10, cy - radius - tower_size),
        (cx, cy - radius - tower_size - 50),
    ], fill=(150, 130, 90), outline=COLORS['outline'], width=2)
    
    img = composite_images(img, rgba_layer)
    draw = ImageDraw.Draw(img)
    
    face_rgba = draw_circle_face(draw, cx, cy + 30, radius * 0.7, body_color)
    img = composite_images(img, face_rgba)
    draw = ImageDraw.Draw(img)
    draw_beak(draw, cx, cy + 40, radius * 0.7)
    
    draw_base_platform(draw, cx, HEIGHT - 100, 250, 80)
    add_text_label(img, "卡诺古城墙", HEIGHT - 180)
    
    return img

def draw_ibadan_cocoa():
    """3. 伊巴丹 - 可可屋塔"""
    img = create_gradient_background(WIDTH, HEIGHT)
    draw = ImageDraw.Draw(img)
    
    cx, cy = WIDTH // 2, HEIGHT // 2 + 100
    radius = 180
    
    # 巧克力棕色 - 可可主题
    body_color = (139, 90, 43)
    
    rgba_layer = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw_rgba = ImageDraw.Draw(rgba_layer)
    
    # 主塔身
    draw_rgba.ellipse([cx - radius, cy - radius, cx + radius, cy + radius],
                      fill=body_color, outline=COLORS['outline'], width=4)
    
    # 可可豆图案
    for i in range(8):
        angle = (i / 8) * 2 * math.pi
        dist = radius * 0.4
        bean_x = cx + math.cos(angle) * dist
        bean_y = cy + math.sin(angle) * dist
        # 可可豆形状
        draw_rgba.ellipse([bean_x - 20, bean_y - 30, bean_x + 20, bean_y + 30],
                         fill=(101, 67, 33), outline=COLORS['outline'], width=1)
        # 豆子中间的线
        draw_rgba.line([(bean_x, bean_y - 25), (bean_x, bean_y + 25)],
                      fill=(60, 40, 20), width=2)
    
    # 顶部可可叶
    for angle in [45, 135, 225, 315]:
        rad = math.radians(angle)
        leaf_x = cx + math.cos(rad) * (radius - 30)
        leaf_y = cy + math.sin(rad) * (radius - 30)
        draw_rgba.ellipse([leaf_x - 30, leaf_y - 40, leaf_x + 30, leaf_y + 40],
                         fill=(34, 139, 34), outline=COLORS['outline'], width=2)
    
    img = composite_images(img, rgba_layer)
    draw = ImageDraw.Draw(img)
    
    face_rgba = draw_circle_face(draw, cx, cy + 30, radius * 0.7, body_color)
    img = composite_images(img, face_rgba)
    draw = ImageDraw.Draw(img)
    draw_beak(draw, cx, cy + 40, radius * 0.7)
    
    draw_base_platform(draw, cx, HEIGHT - 100, 250, 80)
    add_text_label(img, "伊巴丹可可屋", HEIGHT - 180)
    
    return img

def draw_abuja_zuma():
    """4. 阿布贾 - 祖玛岩塔"""
    img = create_gradient_background(WIDTH, HEIGHT)
    draw = ImageDraw.Draw(img)
    
    cx, cy = WIDTH // 2, HEIGHT // 2 + 100
    radius = 180
    
    # 岩石灰色
    body_color = (128, 128, 128)
    
    rgba_layer = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw_rgba = ImageDraw.Draw(rgba_layer)
    
    # 祖玛岩的梯形形状（上窄下宽）
    # 使用多边形绘制岩石形状
    rock_points = [
        (cx - radius * 0.3, cy - radius * 1.2),  # 左上
        (cx + radius * 0.3, cy - radius * 1.2),  # 右上
        (cx + radius * 0.9, cy + radius * 0.6),  # 右下
        (cx - radius * 0.9, cy + radius * 0.6),  # 左下
    ]
    draw_rgba.polygon(rock_points, fill=body_color, outline=COLORS['outline'], width=4)
    
    # 岩石纹理线条
    for i in range(5):
        y_offset = cy - radius * 0.8 + i * radius * 0.4
        width_factor = 0.3 + i * 0.15
        draw_rgba.line([(cx - radius * width_factor, y_offset),
                       (cx + radius * width_factor, y_offset)],
                      fill=(100, 100, 100), width=2)
    
    # 脸部在岩石中间
    face_cx, face_cy = cx, cy
    face_radius = radius * 0.5
    draw_rgba.ellipse([face_cx - face_radius, face_cy - face_radius,
                       face_cx + face_radius, face_cy + face_radius],
                      fill=(150, 150, 150), outline=COLORS['outline'], width=3)
    
    img = composite_images(img, rgba_layer)
    draw = ImageDraw.Draw(img)
    
    # 眼睛和眉毛直接画在脸上
    eye_radius = face_radius * 0.25
    eye_offset_x = face_radius * 0.35
    eye_offset_y = -face_radius * 0.15
    
    # 眼睛
    for dx in [-eye_offset_x, eye_offset_x]:
        draw.ellipse([face_cx + dx - eye_radius, face_cy + eye_offset_y - eye_radius,
                      face_cx + dx + eye_radius, face_cy + eye_offset_y + eye_radius],
                     fill=COLORS['eye_white'], outline=COLORS['outline'], width=2)
        draw.ellipse([face_cx + dx - eye_radius*0.5 + 3, face_cy + eye_offset_y - eye_radius*0.5,
                      face_cx + dx + eye_radius*0.5 + 3, face_cy + eye_offset_y + eye_radius*0.5],
                     fill=COLORS['eye_black'])
    
    # 眉毛
    brow_width = eye_radius * 1.8
    draw.polygon([
        (face_cx - eye_offset_x - brow_width, face_cy + eye_offset_y - eye_radius - 5),
        (face_cx - eye_offset_x + brow_width*0.5, face_cy + eye_offset_y - eye_radius - 20),
        (face_cx - eye_offset_x + brow_width*0.7, face_cy + eye_offset_y - eye_radius),
    ], fill=COLORS['outline'])
    draw.polygon([
        (face_cx + eye_offset_x - brow_width*0.5, face_cy + eye_offset_y - eye_radius - 20),
        (face_cx + eye_offset_x + brow_width, face_cy + eye_offset_y - eye_radius - 5),
        (face_cx + eye_offset_x - brow_width*0.7, face_cy + eye_offset_y - eye_radius),
    ], fill=COLORS['outline'])
    
    # 腮红
    cheek_rgba = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    cheek_draw = ImageDraw.Draw(cheek_rgba)
    cheek_radius = face_radius * 0.15
    cheek_y = face_cy + face_radius * 0.2
    for dx in [-face_radius * 0.6, face_radius * 0.6]:
        cheek_draw.ellipse([face_cx + dx - cheek_radius, cheek_y - cheek_radius,
                           face_cx + dx + cheek_radius, cheek_y + cheek_radius],
                          fill=COLORS['cheek'])
    img = composite_images(img, cheek_rgba)
    draw = ImageDraw.Draw(img)
    
    draw_beak(draw, face_cx, face_cy + 10, face_radius)
    
    draw_base_platform(draw, cx, HEIGHT - 100, 250, 80)
    add_text_label(img, "阿布贾祖玛岩", HEIGHT - 180)
    
    return img

def draw_port_harcourt():
    """5. 哈科特港 - 港口塔"""
    img = create_gradient_background(WIDTH, HEIGHT)
    draw = ImageDraw.Draw(img)
    
    cx, cy = WIDTH // 2, HEIGHT // 2 + 100
    radius = 180
    
    # 海蓝色
    body_color = (70, 130, 180)
    
    rgba_layer = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw_rgba = ImageDraw.Draw(rgba_layer)
    
    # 主塔身
    draw_rgba.ellipse([cx - radius, cy - radius, cx + radius, cy + radius],
                      fill=body_color, outline=COLORS['outline'], width=4)
    
    # 波浪纹理
    for i in range(3):
        wave_y = cy - radius * 0.3 + i * radius * 0.4
        for j in range(5):
            wx = cx - radius * 0.6 + j * radius * 0.3
            draw_rgba.arc([wx - 20, wave_y - 10, wx + 20, wave_y + 10],
                         0, 180, fill=(100, 160, 210), width=3)
    
    # 顶部起重机
    crane_x, crane_y = cx + 60, cy - radius + 40
    # 起重机臂
    draw_rgba.rectangle([crane_x - 8, crane_y - 100, crane_x + 8, crane_y],
                       fill=(255, 165, 0), outline=COLORS['outline'], width=2)
    draw_rgba.rectangle([crane_x - 60, crane_y - 100, crane_x + 8, crane_y - 85],
                       fill=(255, 165, 0), outline=COLORS['outline'], width=2)
    # 吊钩线
    draw_rgba.line([(crane_x - 50, crane_y - 85), (crane_x - 50, crane_y - 40)],
                  fill=(80, 80, 80), width=2)
    # 集装箱
    draw_rgba.rectangle([crane_x - 70, crane_y - 40, crane_x - 30, crane_y - 10],
                       fill=(200, 50, 50), outline=COLORS['outline'], width=1)
    
    # 另一侧的船只
    boat_x, boat_y = cx - 80, cy - radius + 60
    draw_rgba.polygon([
        (boat_x - 40, boat_y),
        (boat_x + 40, boat_y),
        (boat_x + 30, boat_y - 30),
        (boat_x - 30, boat_y - 30),
    ], fill=(139, 90, 43), outline=COLORS['outline'], width=2)
    draw_rgba.polygon([
        (boat_x - 5, boat_y - 30),
        (boat_x + 5, boat_y - 30),
        (boat_x, boat_y - 60),
    ], fill=(255, 255, 255), outline=COLORS['outline'], width=1)
    
    img = composite_images(img, rgba_layer)
    draw = ImageDraw.Draw(img)
    
    face_rgba = draw_circle_face(draw, cx, cy + 40, radius * 0.65, body_color)
    img = composite_images(img, face_rgba)
    draw = ImageDraw.Draw(img)
    draw_beak(draw, cx, cy + 50, radius * 0.65)
    
    draw_base_platform(draw, cx, HEIGHT - 100, 250, 80)
    add_text_label(img, "哈科特港", HEIGHT - 180)
    
    return img

def draw_kaduna_coconut():
    """6. 卡杜纳 - 椰子树塔"""
    img = create_gradient_background(WIDTH, HEIGHT)
    draw = ImageDraw.Draw(img)
    
    cx, cy = WIDTH // 2, HEIGHT // 2 + 100
    radius = 180
    
    # 热带绿色
    body_color = (50, 150, 100)
    
    rgba_layer = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw_rgba = ImageDraw.Draw(rgba_layer)
    
    # 主塔身
    draw_rgba.ellipse([cx - radius, cy - radius, cx + radius, cy + radius],
                      fill=body_color, outline=COLORS['outline'], width=4)
    
    # 小椰子图案
    for i in range(6):
        angle = (i / 6) * 2 * math.pi
        dist = radius * 0.5
        nut_x = cx + math.cos(angle) * dist
        nut_y = cy + math.sin(angle) * dist
        draw_rgba.ellipse([nut_x - 15, nut_y - 20, nut_x + 15, nut_y + 20],
                         fill=(139, 90, 43), outline=COLORS['outline'], width=1)
    
    # 顶部大椰子树
    tree_base_x, tree_base_y = cx, cy - radius + 30
    # 弯曲的树干
    for i in range(10):
        t = i / 9
        tx = tree_base_x + math.sin(t * math.pi * 0.3) * 20
        ty = tree_base_y - t * 120
        size = 12 - i
        draw_rgba.ellipse([tx - size, ty - size*0.5, tx + size, ty + size*0.5],
                         fill=(139, 90, 43), outline=COLORS['outline'], width=1)
    
    # 树叶
    leaf_center_x = tree_base_x + math.sin(0.3 * math.pi) * 20
    leaf_center_y = tree_base_y - 120
    for angle in range(0, 360, 45):
        rad = math.radians(angle)
        leaf_end_x = leaf_center_x + math.cos(rad) * 60
        leaf_end_y = leaf_center_y + math.sin(rad) * 25
        draw_rgba.polygon([
            (leaf_center_x, leaf_center_y),
            (leaf_center_x + math.cos(rad - 0.4) * 30, leaf_center_y + math.sin(rad - 0.4) * 12),
            (leaf_end_x, leaf_end_y),
            (leaf_center_x + math.cos(rad + 0.4) * 30, leaf_center_y + math.sin(rad + 0.4) * 12),
        ], fill=(34, 200, 34), outline=COLORS['outline'], width=1)
    
    # 椰子
    for angle in [0, 120, 240]:
        rad = math.radians(angle)
        coconut_x = leaf_center_x + math.cos(rad) * 20
        coconut_y = leaf_center_y + math.sin(rad) * 15
        draw_rgba.ellipse([coconut_x - 12, coconut_y - 15, coconut_x + 12, coconut_y + 15],
                         fill=(139, 90, 43), outline=COLORS['outline'], width=1)
    
    img = composite_images(img, rgba_layer)
    draw = ImageDraw.Draw(img)
    
    face_rgba = draw_circle_face(draw, cx, cy + 30, radius * 0.7, body_color)
    img = composite_images(img, face_rgba)
    draw = ImageDraw.Draw(img)
    draw_beak(draw, cx, cy + 40, radius * 0.7)
    
    draw_base_platform(draw, cx, HEIGHT - 100, 250, 80)
    add_text_label(img, "卡杜纳椰子树", HEIGHT - 180)
    
    return img

def draw_oyo_university():
    """7. 奥约 - 伊巴丹大学塔"""
    img = create_gradient_background(WIDTH, HEIGHT)
    draw = ImageDraw.Draw(img)
    
    cx, cy = WIDTH // 2, HEIGHT // 2 + 100
    radius = 180
    
    # 学院红/砖红色
    body_color = (180, 80, 80)
    
    rgba_layer = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw_rgba = ImageDraw.Draw(rgba_layer)
    
    # 主塔身
    draw_rgba.ellipse([cx - radius, cy - radius, cx + radius, cy + radius],
                      fill=body_color, outline=COLORS['outline'], width=4)
    
    # 砖块纹理
    for row in range(6):
        for col in range(8):
            brick_x = cx - radius * 0.7 + col * radius * 0.18
            brick_y = cy - radius * 0.5 + row * radius * 0.18
            if (brick_x - cx)**2 + (brick_y - cy)**2 < (radius * 0.75)**2:
                draw_rgba.rectangle([brick_x - 8, brick_y - 6, brick_x + 8, brick_y + 6],
                                   fill=(160, 60, 60), outline=(120, 40, 40), width=1)
    
    # 顶部钟楼
    tower_width = 50
    tower_height = 100
    tower_x = cx
    tower_y = cy - radius + tower_height//2
    
    draw_rgba.rectangle([tower_x - tower_width, tower_y - tower_height//2,
                         tower_x + tower_width, tower_y + tower_height//2],
                       fill=(200, 100, 100), outline=COLORS['outline'], width=3)
    
    # 钟
    draw_rgba.ellipse([tower_x - 25, tower_y - 15, tower_x + 25, tower_y + 35],
                     fill=(218, 165, 32), outline=COLORS['outline'], width=2)
    
    # 尖顶
    draw_rgba.polygon([
        (tower_x - tower_width - 10, tower_y - tower_height//2),
        (tower_x + tower_width + 10, tower_y - tower_height//2),
        (tower_x, tower_y - tower_height//2 - 50),
    ], fill=(160, 60, 60), outline=COLORS['outline'], width=2)
    
    # 毕业帽装饰
    cap_x, cap_y = cx + 80, cy - radius + 60
    draw_rgba.rectangle([cap_x - 30, cap_y - 5, cap_x + 30, cap_y + 10],
                       fill=(50, 50, 50), outline=COLORS['outline'], width=2)
    draw_rgba.polygon([
        (cap_x - 30, cap_y - 5),
        (cap_x + 30, cap_y - 5),
        (cap_x, cap_y - 35),
    ], fill=(50, 50, 50), outline=COLORS['outline'], width=2)
    draw_rgba.line([(cap_x, cap_y - 35), (cap_x + 35, cap_y - 45)],
                  fill=(50, 50, 50), width=3)
    
    img = composite_images(img, rgba_layer)
    draw = ImageDraw.Draw(img)
    
    face_rgba = draw_circle_face(draw, cx, cy + 40, radius * 0.65, body_color)
    img = composite_images(img, face_rgba)
    draw = ImageDraw.Draw(img)
    draw_beak(draw, cx, cy + 50, radius * 0.65)
    
    draw_base_platform(draw, cx, HEIGHT - 100, 250, 80)
    add_text_label(img, "奥约大学", HEIGHT - 180)
    
    return img

def draw_rivers_oil():
    """8. 河流 - 石油平台塔"""
    img = create_gradient_background(WIDTH, HEIGHT)
    draw = ImageDraw.Draw(img)
    
    cx, cy = WIDTH // 2, HEIGHT // 2 + 100
    radius = 180
    
    # 工业黑/深灰色
    body_color = (70, 70, 80)
    
    rgba_layer = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw_rgba = ImageDraw.Draw(rgba_layer)
    
    # 主塔身
    draw_rgba.ellipse([cx - radius, cy - radius, cx + radius, cy + radius],
                      fill=body_color, outline=COLORS['outline'], width=4)
    
    # 油滴图案
    for i in range(5):
        angle = (i / 5) * 2 * math.pi
        dist = radius * 0.4
        drop_x = cx + math.cos(angle) * dist
        drop_y = cy + math.sin(angle) * dist
        # 油滴形状
        draw_rgba.ellipse([drop_x - 12, drop_y - 15, drop_x + 12, drop_y + 15],
                         fill=(20, 20, 20), outline=COLORS['outline'], width=1)
        draw_rgba.polygon([
            (drop_x, drop_y - 25),
            (drop_x - 12, drop_y - 15),
            (drop_x + 12, drop_y - 15),
        ], fill=(20, 20, 20), outline=COLORS['outline'], width=1)
    
    # 顶部石油平台
    platform_x, platform_y = cx, cy - radius + 40
    # 平台主体
    draw_rgba.rectangle([platform_x - 70, platform_y - 20, platform_x + 70, platform_y + 20],
                       fill=(100, 100, 110), outline=COLORS['outline'], width=3)
    
    # 塔架
    for dx in [-50, 50]:
        draw_rgba.line([(platform_x + dx, platform_y + 20), (platform_x + dx, platform_y + 80)],
                      fill=(80, 80, 90), width=6)
    
    # 钻塔
    derrick_x = platform_x
    derrick_y = platform_y - 20
    draw_rgba.polygon([
        (derrick_x - 20, derrick_y),
        (derrick_x + 20, derrick_y),
        (derrick_x, derrick_y - 80),
    ], fill=(120, 120, 130), outline=COLORS['outline'], width=2)
    
    # 火焰
    for i, angle in enumerate([0, 45, 90, 135, 180]):
        rad = math.radians(angle + 180)
        flame_x = derrick_x + math.cos(rad) * (5 + i * 3)
        flame_y = derrick_y - 80 - 20 - i * 5
        flame_colors = [(255, 100, 0), (255, 150, 0), (255, 200, 0), (255, 255, 100), (255, 255, 200)]
        draw_rgba.ellipse([flame_x - 15, flame_y - 20, flame_x + 15, flame_y + 20],
                         fill=flame_colors[i], outline=(255, 50, 0), width=1)
    
    img = composite_images(img, rgba_layer)
    draw = ImageDraw.Draw(img)
    
    face_rgba = draw_circle_face(draw, cx, cy + 40, radius * 0.65, body_color)
    img = composite_images(img, face_rgba)
    draw = ImageDraw.Draw(img)
    draw_beak(draw, cx, cy + 50, radius * 0.65)
    
    draw_base_platform(draw, cx, HEIGHT - 100, 250, 80)
    add_text_label(img, "河流石油平台", HEIGHT - 180)
    
    return img

def draw_akwa_ibom_waterfall():
    """9. 阿夸伊博姆 - 瀑布塔"""
    img = create_gradient_background(WIDTH, HEIGHT)
    draw = ImageDraw.Draw(img)
    
    cx, cy = WIDTH // 2, HEIGHT // 2 + 100
    radius = 180
    
    # 清新的水蓝色
    body_color = (100, 180, 200)
    
    rgba_layer = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw_rgba = ImageDraw.Draw(rgba_layer)
    
    # 主塔身
    draw_rgba.ellipse([cx - radius, cy - radius, cx + radius, cy + radius],
                      fill=body_color, outline=COLORS['outline'], width=4)
    
    # 水花气泡图案
    for i in range(10):
        angle = (i / 10) * 2 * math.pi
        dist = radius * (0.3 + (i % 3) * 0.15)
        bubble_x = cx + math.cos(angle) * dist
        bubble_y = cy + math.sin(angle) * dist
        bubble_size = 8 + (i % 4) * 3
        draw_rgba.ellipse([bubble_x - bubble_size, bubble_y - bubble_size,
                          bubble_x + bubble_size, bubble_y + bubble_size],
                         fill=(200, 240, 255), outline=(150, 200, 220), width=1)
    
    # 顶部瀑布
    cliff_x = cx
    cliff_y = cy - radius + 60
    
    # 岩石悬崖
    cliff_points = [
        (cliff_x - 80, cliff_y - 40),
        (cliff_x + 80, cliff_y - 40),
        (cliff_x + 60, cliff_y + 20),
        (cliff_x - 60, cliff_y + 20),
    ]
    draw_rgba.polygon(cliff_points, fill=(120, 120, 120), outline=COLORS['outline'], width=2)
    
    # 水流
    for i in range(5):
        water_x = cliff_x - 30 + i * 15
        water_top = cliff_y + 20
        water_bottom = cliff_y + 100 + i * 10
        
        # 水流曲线
        points = []
        for t in range(10):
            tx = water_x + math.sin(t * 0.5) * 5
            ty = water_top + (water_bottom - water_top) * (t / 9)
            points.append((tx, ty))
        
        for j in range(len(points) - 1):
            draw_rgba.line([points[j], points[j+1]], fill=(200, 230, 255), width=8)
            draw_rgba.line([points[j], points[j+1]], fill=(150, 210, 240), width=4)
    
    # 底部水潭
    draw_rgba.ellipse([cx - 50, cliff_y + 90, cx + 50, cliff_y + 130],
                     fill=(150, 210, 240), outline=(100, 180, 210), width=2)
    
    img = composite_images(img, rgba_layer)
    draw = ImageDraw.Draw(img)
    
    face_rgba = draw_circle_face(draw, cx, cy + 40, radius * 0.65, body_color)
    img = composite_images(img, face_rgba)
    draw = ImageDraw.Draw(img)
    draw_beak(draw, cx, cy + 50, radius * 0.65)
    
    draw_base_platform(draw, cx, HEIGHT - 100, 250, 80)
    add_text_label(img, "阿夸伊博姆瀑布", HEIGHT - 180)
    
    return img

def draw_delta_mangrove():
    """10. 三角洲 - 红树林塔"""
    img = create_gradient_background(WIDTH, HEIGHT)
    draw = ImageDraw.Draw(img)
    
    cx, cy = WIDTH // 2, HEIGHT // 2 + 100
    radius = 180
    
    # 红树林的深绿色
    body_color = (60, 130, 100)
    
    rgba_layer = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw_rgba = ImageDraw.Draw(rgba_layer)
    
    # 主塔身
    draw_rgba.ellipse([cx - radius, cy - radius, cx + radius, cy + radius],
                      fill=body_color, outline=COLORS['outline'], width=4)
    
    # 树根纹理
    for i in range(8):
        angle = (i / 8) * 2 * math.pi
        dist = radius * 0.5
        root_x = cx + math.cos(angle) * dist
        root_y = cy + math.sin(angle) * dist
        root_end_x = cx + math.cos(angle) * (radius - 10)
        root_end_y = cy + math.sin(angle) * (radius - 10)
        draw_rgba.line([(root_x, root_y), (root_end_x, root_end_y)],
                      fill=(100, 80, 60), width=8)
        draw_rgba.line([(root_x, root_y), (root_end_x, root_end_y)],
                      fill=(139, 90, 43), width=4)
    
    # 顶部红树林树冠
    crown_x, crown_y = cx, cy - radius + 40
    
    # 多团树叶
    for i in range(5):
        angle = (i / 5) * 2 * math.pi
        leaf_cluster_x = crown_x + math.cos(angle) * 50
        leaf_cluster_y = crown_y + math.sin(angle) * 30
        
        draw_rgba.ellipse([leaf_cluster_x - 40, leaf_cluster_y - 35,
                          leaf_cluster_x + 40, leaf_cluster_y + 35],
                         fill=(34, 120, 70), outline=COLORS['outline'], width=2)
    
    # 中心更高的一团
    draw_rgba.ellipse([crown_x - 50, crown_y - 80, crown_x + 50, crown_y - 10],
                     fill=(40, 140, 80), outline=COLORS['outline'], width=2)
    
    # 气生根（红树林特色）
    for i in range(6):
        root_x = cx - 60 + i * 24
        root_top = cy - radius + 80
        root_bottom = cy + radius - 20
        
        # 弯曲的根
        points = []
        for t in range(10):
            tx = root_x + math.sin(t * 0.3) * 10
            ty = root_top + (root_bottom - root_top) * (t / 9)
            points.append((tx, ty))
        
        for j in range(len(points) - 1):
            draw_rgba.line([points[j], points[j+1]], fill=(100, 80, 60), width=6)
    
    img = composite_images(img, rgba_layer)
    draw = ImageDraw.Draw(img)
    
    face_rgba = draw_circle_face(draw, cx, cy + 30, radius * 0.7, body_color)
    img = composite_images(img, face_rgba)
    draw = ImageDraw.Draw(img)
    draw_beak(draw, cx, cy + 40, radius * 0.7)
    
    draw_base_platform(draw, cx, HEIGHT - 100, 250, 80)
    add_text_label(img, "三角洲红树林", HEIGHT - 180)
    
    return img

# 主程序
def main():
    towers = [
        ("lagos-island.png", draw_lagos_island, "拉各斯岛"),
        ("kano-walls.png", draw_kano_walls, "卡诺古城墙"),
        ("ibadan-cocoa.png", draw_ibadan_cocoa, "伊巴丹可可屋"),
        ("abuja-zuma.png", draw_abuja_zuma, "阿布贾祖玛岩"),
        ("port-harcourt.png", draw_port_harcourt, "哈科特港"),
        ("kaduna-coconut.png", draw_kaduna_coconut, "卡杜纳椰子树"),
        ("oyo-university.png", draw_oyo_university, "奥约大学"),
        ("rivers-oil.png", draw_rivers_oil, "河流石油平台"),
        ("akwa-ibom-waterfall.png", draw_akwa_ibom_waterfall, "阿夸伊博姆瀑布"),
        ("delta-mangrove.png", draw_delta_mangrove, "三角洲红树林"),
    ]
    
    print("开始生成尼日利亚州卡通塔图片...")
    print("=" * 50)
    
    for filename, draw_func, name in towers:
        filepath = os.path.join(OUTPUT_DIR, filename)
        print(f"正在生成: {name}...")
        try:
            img = draw_func()
            img.save(filepath, "PNG", quality=95)
            print(f"  ✓ 已保存: {filepath}")
        except Exception as e:
            print(f"  ✗ 错误: {e}")
    
    print("=" * 50)
    print("生成完成！")
    print(f"所有图片已保存到: {OUTPUT_DIR}")

if __name__ == "__main__":
    main()

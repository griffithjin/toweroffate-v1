#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
俄罗斯州卡通塔图片生成器
使用Pillow库生成愤怒的小鸟风格的卡通塔
"""

from PIL import Image, ImageDraw, ImageFilter, ImageFont
import os
import math

# 输出目录
OUTPUT_DIR = "/Users/moutai/Desktop/toweroffate_v1.0/assets/towers/states/russia"

# 图片尺寸
WIDTH, HEIGHT = 800, 1200

def create_gradient_background(width, height):
    """创建天蓝色渐变背景"""
    img = Image.new('RGB', (width, height), color='#87CEEB')
    draw = ImageDraw.Draw(img)
    
    # 从上到下的渐变 - 天蓝色到浅蓝色
    for y in range(height):
        # 从浅天蓝 (#87CEEB) 到更深的天蓝 (#5DADE2)
        r = int(135 + (93 - 135) * y / height)
        g = int(206 + (173 - 206) * y / height)
        b = int(235 + (226 - 235) * y / height)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    return img

def draw_circle_face(draw, x, y, radius, base_color, eye_color="#FFFFFF", pupil_color="#000000"):
    """绘制可爱的圆形脸（愤怒的小鸟风格）"""
    # 主体圆形
    draw.ellipse([x - radius, y - radius, x + radius, y + radius], 
                 fill=base_color, outline="#000000", width=3)
    
    # 眼睛大小
    eye_radius = radius // 4
    eye_y_offset = -radius // 5
    
    # 左眼
    left_eye_x = x - radius // 3
    left_eye_y = y + eye_y_offset
    draw.ellipse([left_eye_x - eye_radius, left_eye_y - eye_radius,
                  left_eye_x + eye_radius, left_eye_y + eye_radius],
                 fill=eye_color, outline="#000000", width=2)
    # 左眼珠
    pupil_radius = eye_radius // 2
    draw.ellipse([left_eye_x - pupil_radius, left_eye_y - pupil_radius,
                  left_eye_x + pupil_radius, left_eye_y + pupil_radius],
                 fill=pupil_color)
    # 左眼高光
    highlight_r = pupil_radius // 3
    draw.ellipse([left_eye_x - pupil_radius//2 - highlight_r, left_eye_y - pupil_radius//2 - highlight_r,
                  left_eye_x - pupil_radius//2 + highlight_r, left_eye_y - pupil_radius//2 + highlight_r],
                 fill="#FFFFFF")
    
    # 右眼
    right_eye_x = x + radius // 3
    right_eye_y = y + eye_y_offset
    draw.ellipse([right_eye_x - eye_radius, right_eye_y - eye_radius,
                  right_eye_x + eye_radius, right_eye_y + eye_radius],
                 fill=eye_color, outline="#000000", width=2)
    # 右眼珠
    draw.ellipse([right_eye_x - pupil_radius, right_eye_y - pupil_radius,
                  right_eye_x + pupil_radius, right_eye_y + pupil_radius],
                 fill=pupil_color)
    # 右眼高光
    draw.ellipse([right_eye_x - pupil_radius//2 - highlight_r, right_eye_y - pupil_radius//2 - highlight_r,
                  right_eye_x - pupil_radius//2 + highlight_r, right_eye_y - pupil_radius//2 + highlight_r],
                 fill="#FFFFFF")
    
    # 眉毛（愤怒的小鸟风格 - 斜向上的眉毛）
    brow_y = left_eye_y - eye_radius - 5
    draw.polygon([
        (left_eye_x - eye_radius, brow_y),
        (left_eye_x + eye_radius, brow_y - 8),
        (left_eye_x + eye_radius - 5, brow_y + 5)
    ], fill="#000000")
    draw.polygon([
        (right_eye_x + eye_radius, brow_y),
        (right_eye_x - eye_radius, brow_y - 8),
        (right_eye_x - eye_radius + 5, brow_y + 5)
    ], fill="#000000")
    
    # 嘴巴（橙色三角形 - 鸟嘴）
    beak_y = y + radius // 6
    beak_width = radius // 3
    beak_height = radius // 4
    draw.polygon([
        (x - beak_width//2, beak_y),
        (x + beak_width//2, beak_y),
        (x, beak_y + beak_height)
    ], fill="#FFA500", outline="#000000", width=2)

def draw_roof(draw, x, y, width, height, color="#C0392B"):
    """绘制塔顶屋顶"""
    # 三角形屋顶
    points = [
        (x, y + height),
        (x + width // 2, y),
        (x + width, y + height)
    ]
    draw.polygon(points, fill=color, outline="#000000", width=3)

def draw_dome(draw, x, y, width, height, color="#FFD700"):
    """绘制圆顶"""
    # 洋葱头圆顶
    draw.ellipse([x, y, x + width, y + height], fill=color, outline="#000000", width=3)
    # 顶部尖
    spire_height = height // 3
    draw.polygon([
        (x + width // 2 - 5, y),
        (x + width // 2 + 5, y),
        (x + width // 2, y - spire_height)
    ], fill="#FFD700", outline="#000000", width=2)

def draw_tower_body(draw, x, y, width, height, color="#E74C3C"):
    """绘制塔身"""
    draw.rectangle([x, y, x + width, y + height], fill=color, outline="#000000", width=3)

def draw_window(draw, x, y, width, height, color="#87CEEB"):
    """绘制窗户"""
    draw.rectangle([x, y, x + width, y + height], fill=color, outline="#000000", width=2)
    # 十字窗框
    draw.line([(x + width // 2, y), (x + width // 2, y + height)], fill="#000000", width=2)
    draw.line([(x, y + height // 2), (x + width, y + height // 2)], fill="#000000", width=2)

def draw_base(draw, x, y, width, height, color="#7F8C8D"):
    """绘制底座"""
    draw.rectangle([x, y, x + width, y + height], fill=color, outline="#000000", width=3)

def draw_decorative_stripes(draw, x, y, width, height, colors=["#C0392B", "#FFFFFF", "#0000FF"]):
    """绘制装饰条纹（用于洋葱头）"""
    stripe_height = height // len(colors)
    for i, color in enumerate(colors):
        draw.rectangle([x, y + i * stripe_height, x + width, y + (i + 1) * stripe_height],
                      fill=color, outline="#000000", width=1)

def draw_clouds(draw, width, height):
    """绘制背景云朵"""
    cloud_color = "#FFFFFF"
    # 云朵1
    draw.ellipse([50, 80, 150, 130], fill=cloud_color, outline="#E0E0E0", width=2)
    draw.ellipse([100, 60, 200, 120], fill=cloud_color, outline="#E0E0E0", width=2)
    draw.ellipse([160, 80, 240, 130], fill=cloud_color, outline="#E0E0E0", width=2)
    
    # 云朵2
    draw.ellipse([width - 200, 150, width - 100, 200], fill=cloud_color, outline="#E0E0E0", width=2)
    draw.ellipse([width - 150, 130, width - 50, 190], fill=cloud_color, outline="#E0E0E0", width=2)

def draw_flag(draw, x, y, flag_width=60, flag_height=40):
    """绘制俄罗斯国旗"""
    # 白蓝红三色
    stripe_height = flag_height // 3
    # 白色
    draw.rectangle([x, y, x + flag_width, y + stripe_height], fill="#FFFFFF", outline="#000000", width=1)
    # 蓝色
    draw.rectangle([x, y + stripe_height, x + flag_width, y + 2 * stripe_height], fill="#0033A0", outline="#000000", width=1)
    # 红色
    draw.rectangle([x, y + 2 * stripe_height, x + flag_width, y + 3 * stripe_height], fill="#DA291C", outline="#000000", width=1)

def create_tower(filename, name, color_scheme, tower_type="standard"):
    """创建单个塔图片"""
    img = create_gradient_background(WIDTH, HEIGHT)
    draw = ImageDraw.Draw(img)
    
    # 绘制云朵
    draw_clouds(draw, WIDTH, HEIGHT)
    
    # 塔的中心位置
    center_x = WIDTH // 2
    base_y = HEIGHT - 200
    
    # 塔的尺寸
    tower_width = 200
    tower_height = 400
    
    # 根据塔类型绘制不同的塔
    if tower_type == "red_square":
        # 莫斯科红场风格 - 红色城墙塔
        # 底座
        draw_base(draw, center_x - 120, base_y - 50, 240, 50, "#7F8C8D")
        # 塔身
        draw_tower_body(draw, center_x - 100, base_y - 350, 200, 300, "#C0392B")
        # 窗户
        for i in range(3):
            for j in range(2):
                draw_window(draw, center_x - 60 + j * 80, base_y - 300 + i * 80, 40, 50)
        # 屋顶
        draw_roof(draw, center_x - 110, base_y - 420, 220, 70, "#27AE60")
        # 脸部在塔身
        draw_circle_face(draw, center_x, base_y - 200, 70, color_scheme["face"])
        # 俄罗斯国旗
        draw_flag(draw, center_x + 50, base_y - 480)
        
    elif tower_type == "hermitage":
        # 圣彼得堡冬宫风格 - 绿色金色搭配
        # 底座
        draw_base(draw, center_x - 130, base_y - 50, 260, 50, "#BDC3C7")
        # 塔身 - 冬宫绿色
        draw_tower_body(draw, center_x - 110, base_y - 360, 220, 310, "#2E8B57")
        # 柱子装饰
        for i in range(4):
            x_pos = center_x - 90 + i * 60
            draw.rectangle([x_pos, base_y - 340, x_pos + 20, base_y - 100], 
                         fill="#F5F5DC", outline="#000000", width=2)
        # 金色圆顶
        draw_dome(draw, center_x - 80, base_y - 450, 160, 90, "#FFD700")
        # 脸部
        draw_circle_face(draw, center_x, base_y - 220, 75, color_scheme["face"])
        # 旗帜
        draw_flag(draw, center_x - 30, base_y - 520)
        
    elif tower_type == "science":
        # 新西伯利亚科学城 - 现代科技感
        # 底座
        draw_base(draw, center_x - 100, base_y - 50, 200, 50, "#95A5A6")
        # 主体 - 现代建筑
        draw_tower_body(draw, center_x - 80, base_y - 400, 160, 350, "#3498DB")
        # 科技装饰线条
        for i in range(5):
            y_pos = base_y - 350 + i * 60
            draw.rectangle([center_x - 70, y_pos, center_x + 70, y_pos + 30], 
                         fill="#85C1E9", outline="#000000", width=1)
        # 顶部天线
        draw.rectangle([center_x - 5, base_y - 480, center_x + 5, base_y - 400], 
                      fill="#7F8C8D", outline="#000000", width=2)
        draw.ellipse([center_x - 15, base_y - 500, center_x + 15, base_y - 470], 
                    fill="#E74C3C", outline="#000000", width=2)
        # 脸部
        draw_circle_face(draw, center_x, base_y - 220, 70, color_scheme["face"])
        
    elif tower_type == "church":
        # 叶卡捷琳堡滴血教堂 - 洋葱头教堂
        # 底座
        draw_base(draw, center_x - 120, base_y - 50, 240, 50, "#7F8C8D")
        # 塔身
        draw_tower_body(draw, center_x - 80, base_y - 300, 160, 250, "#E74C3C")
        # 多个洋葱头
        dome_colors = ["#3498DB", "#9B59B6", "#E74C3C", "#F1C40F"]
        positions = [
            (center_x - 60, base_y - 380),
            (center_x + 20, base_y - 400),
            (center_x - 20, base_y - 450)
        ]
        for i, (dx, dy) in enumerate(positions):
            draw.ellipse([dx, dy, dx + 80, dy + 70], 
                        fill=dome_colors[i % len(dome_colors)], outline="#000000", width=3)
            # 洋葱头尖
            draw.polygon([
                (dx + 40, dy), (dx + 35, dy - 15), (dx + 45, dy - 15)
            ], fill="#FFD700", outline="#000000", width=1)
        # 脸部
        draw_circle_face(draw, center_x, base_y - 180, 65, color_scheme["face"])
        
    elif tower_type == "kremlin":
        # 下诺夫哥罗德克里姆林 - 红色城墙
        # 底座
        draw_base(draw, center_x - 140, base_y - 50, 280, 50, "#7F8C8D")
        # 塔身
        draw_tower_body(draw, center_x - 100, base_y - 380, 200, 330, "#C0392B")
        # 城垛
        for i in range(5):
            x_pos = center_x - 90 + i * 45
            draw.rectangle([x_pos, base_y - 410, x_pos + 25, base_y - 380], 
                         fill="#C0392B", outline="#000000", width=2)
        # 绿色尖顶
        draw_roof(draw, center_x - 90, base_y - 480, 180, 70, "#27AE60")
        # 金色星星装饰
        draw.polygon([
            (center_x, base_y - 520),
            (center_x - 10, base_y - 500),
            (center_x - 25, base_y - 500),
            (center_x - 12, base_y - 490),
            (center_x - 18, base_y - 475),
            (center_x, base_y - 485),
            (center_x + 18, base_y - 475),
            (center_x + 12, base_y - 490),
            (center_x + 25, base_y - 500),
            (center_x + 10, base_y - 500)
        ], fill="#FFD700", outline="#000000", width=1)
        # 脸部
        draw_circle_face(draw, center_x, base_y - 240, 75, color_scheme["face"])
        
    elif tower_type == "mosque":
        # 喀山库尔沙里夫清真寺 - 蓝色圆顶
        # 底座
        draw_base(draw, center_x - 130, base_y - 50, 260, 50, "#BDC3C7")
        # 塔身 - 白色主体
        draw_tower_body(draw, center_x - 100, base_y - 350, 200, 300, "#ECF0F1")
        # 蓝色装饰条纹
        for i in range(4):
            y_pos = base_y - 320 + i * 70
            draw.rectangle([center_x - 100, y_pos, center_x + 100, y_pos + 20], 
                         fill="#3498DB", outline="#000000", width=2)
        # 大蓝色洋葱头
        draw.ellipse([center_x - 90, base_y - 450, center_x + 90, base_y - 360], 
                    fill="#2980B9", outline="#000000", width=3)
        # 金色新月
        draw.arc([center_x - 20, base_y - 490, center_x + 20, base_y - 440], 
                start=0, end=180, fill="#FFD700", width=4)
        # 脸部
        draw_circle_face(draw, center_x, base_y - 220, 70, color_scheme["face"])
        
    elif tower_type == "volga":
        # 萨马拉伏尔加河 - 河流风格
        # 水底座
        draw.ellipse([center_x - 150, base_y - 30, center_x + 150, base_y + 30], 
                    fill="#5DADE2", outline="#2980B9", width=3)
        # 塔身 - 船/塔混合
        draw_tower_body(draw, center_x - 90, base_y - 380, 180, 330, "#E67E22")
        # 船帆装饰
        draw.polygon([
            (center_x, base_y - 480),
            (center_x - 60, base_y - 380),
            (center_x + 60, base_y - 380)
        ], fill="#ECF0F1", outline="#000000", width=2)
        draw.polygon([
            (center_x, base_y - 380),
            (center_x - 50, base_y - 300),
            (center_x + 50, base_y - 300)
        ], fill="#ECF0F1", outline="#000000", width=2)
        # 桅杆
        draw.rectangle([center_x - 5, base_y - 520, center_x + 5, base_y - 380], 
                      fill="#8B4513", outline="#000000", width=2)
        # 脸部
        draw_circle_face(draw, center_x, base_y - 220, 70, color_scheme["face"])
        
    elif tower_type == "theater":
        # 鄂木斯克剧院 - 古典剧院风格
        # 底座
        draw_base(draw, center_x - 130, base_y - 50, 260, 50, "#BDC3C7")
        # 塔身 - 米色古典风格
        draw_tower_body(draw, center_x - 100, base_y - 350, 200, 300, "#F5DEB3")
        # 柱子
        for i in range(4):
            x_pos = center_x - 75 + i * 50
            draw.rectangle([x_pos, base_y - 330, x_pos + 25, base_y - 120], 
                         fill="#FFF8DC", outline="#000000", width=2)
            # 柱头
            draw.rectangle([x_pos - 5, base_y - 345, x_pos + 30, base_y - 330], 
                         fill="#D4AF37", outline="#000000", width=2)
        # 三角形山墙
        draw_roof(draw, center_x - 110, base_y - 430, 220, 80, "#D35400")
        # 面具装饰
        draw.ellipse([center_x - 30, base_y - 400, center_x + 30, base_y - 340], 
                    fill="#FFFFFF", outline="#000000", width=2)
        draw.arc([center_x - 15, base_y - 380, center_x + 15, base_y - 350], 
                start=0, end=180, fill="#000000", width=2)
        # 脸部
        draw_circle_face(draw, center_x, base_y - 220, 70, color_scheme["face"])
        
    elif tower_type == "mountain":
        # 车里雅宾斯克乌拉尔山 - 山峰风格
        # 山底座
        draw.polygon([
            (center_x - 160, base_y),
            (center_x, base_y - 100),
            (center_x + 160, base_y)
        ], fill="#7F8C8D", outline="#000000", width=3)
        # 山顶雪
        draw.polygon([
            (center_x - 60, base_y - 40),
            (center_x, base_y - 100),
            (center_x + 60, base_y - 40)
        ], fill="#FFFFFF", outline="#000000", width=2)
        # 塔身
        draw_tower_body(draw, center_x - 80, base_y - 420, 160, 320, "#8B4513")
        # 矿山装饰
        for i in range(3):
            y_pos = base_y - 380 + i * 90
            draw.rectangle([center_x - 60, y_pos, center_x + 60, y_pos + 50], 
                         fill="#A0522D", outline="#000000", width=2)
        # 齿轮装饰
        gear_center_x = center_x
        gear_center_y = base_y - 480
        gear_radius = 35
        draw.ellipse([gear_center_x - gear_radius, gear_center_y - gear_radius,
                      gear_center_x + gear_radius, gear_center_y + gear_radius],
                    fill="#95A5A6", outline="#000000", width=3)
        # 齿轮齿
        for angle in range(0, 360, 45):
            rad = math.radians(angle)
            x1 = gear_center_x + (gear_radius - 5) * math.cos(rad)
            y1 = gear_center_y + (gear_radius - 5) * math.sin(rad)
            x2 = gear_center_x + (gear_radius + 10) * math.cos(rad)
            y2 = gear_center_y + (gear_radius + 10) * math.sin(rad)
            draw.line([(x1, y1), (x2, y2)], fill="#7F8C8D", width=8)
        # 脸部
        draw_circle_face(draw, center_x, base_y - 260, 70, color_scheme["face"])
        
    elif tower_type == "theater_square":
        # 顿河畔罗斯托夫剧院广场 - 广场风格
        # 底座
        draw_base(draw, center_x - 140, base_y - 50, 280, 50, "#BDC3C7")
        # 塔身 - 黄色主体
        draw_tower_body(draw, center_x - 100, base_y - 380, 200, 330, "#F1C40F")
        # 装饰性柱子
        for i in range(3):
            x_pos = center_x - 70 + i * 70
            draw.rectangle([x_pos, base_y - 350, x_pos + 30, base_y - 100], 
                         fill="#FFFFFF", outline="#000000", width=2)
        # 顶部装饰
        draw.rectangle([center_x - 110, base_y - 420, center_x + 110, base_y - 380], 
                      fill="#E67E22", outline="#000000", width=2)
        # 圆顶
        draw.ellipse([center_x - 70, base_y - 490, center_x + 70, base_y - 420], 
                    fill="#E74C3C", outline="#000000", width=3)
        # 尖顶
        draw.rectangle([center_x - 5, base_y - 530, center_x + 5, base_y - 490], 
                      fill="#FFD700", outline="#000000", width=2)
        draw.ellipse([center_x - 10, base_y - 540, center_x + 10, base_y - 520], 
                    fill="#FFD700", outline="#000000", width=2)
        # 脸部
        draw_circle_face(draw, center_x, base_y - 240, 75, color_scheme["face"])
    
    # 添加底部装饰 - 草地
    draw.rectangle([0, HEIGHT - 100, WIDTH, HEIGHT], fill="#27AE60", outline="#000000", width=3)
    # 草纹理
    for i in range(20):
        x = i * 45
        draw.polygon([
            (x, HEIGHT - 100),
            (x + 15, HEIGHT - 130),
            (x + 30, HEIGHT - 100)
        ], fill="#2ECC71", outline="#000000", width=1)
    
    # 保存图片
    img.save(os.path.join(OUTPUT_DIR, filename), "PNG")
    print(f"已生成: {filename}")

def main():
    """主函数 - 生成所有俄罗斯州塔"""
    
    # 确保输出目录存在
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    # 定义所有塔的信息
    towers = [
        {
            "filename": "moscow-red-square.png",
            "name": "莫斯科 - 红场",
            "type": "red_square",
            "color_scheme": {"face": "#E74C3C"}
        },
        {
            "filename": "stpetersburg-hermitage.png",
            "name": "圣彼得堡 - 冬宫",
            "type": "hermitage",
            "color_scheme": {"face": "#2E8B57"}
        },
        {
            "filename": "novosibirsk-science.png",
            "name": "新西伯利亚 - 科学城",
            "type": "science",
            "color_scheme": {"face": "#3498DB"}
        },
        {
            "filename": "yekaterinburg-church.png",
            "name": "叶卡捷琳堡 - 滴血教堂",
            "type": "church",
            "color_scheme": {"face": "#9B59B6"}
        },
        {
            "filename": "nizhny-kremlin.png",
            "name": "下诺夫哥罗德 - 克里姆林",
            "type": "kremlin",
            "color_scheme": {"face": "#C0392B"}
        },
        {
            "filename": "kazan-kul-sharif.png",
            "name": "喀山 - 库尔沙里夫清真寺",
            "type": "mosque",
            "color_scheme": {"face": "#2980B9"}
        },
        {
            "filename": "samara-volga.png",
            "name": "萨马拉 - 伏尔加河",
            "type": "volga",
            "color_scheme": {"face": "#E67E22"}
        },
        {
            "filename": "omsk-theater.png",
            "name": "鄂木斯克 - 剧院",
            "type": "theater",
            "color_scheme": {"face": "#F5DEB3"}
        },
        {
            "filename": "chelyabinsk-ural.png",
            "name": "车里雅宾斯克 - 乌拉尔山",
            "type": "mountain",
            "color_scheme": {"face": "#8B4513"}
        },
        {
            "filename": "rostov-theater.png",
            "name": "顿河畔罗斯托夫 - 剧院广场",
            "type": "theater_square",
            "color_scheme": {"face": "#F1C40F"}
        }
    ]
    
    # 生成所有塔
    for tower in towers:
        create_tower(
            filename=tower["filename"],
            name=tower["name"],
            color_scheme=tower["color_scheme"],
            tower_type=tower["type"]
        )
    
    print(f"\n✅ 所有 {len(towers)} 个俄罗斯州塔图片已生成!")
    print(f"📁 保存位置: {OUTPUT_DIR}")

if __name__ == "__main__":
    main()


"""
命运塔·首登者 - 后端API服务器
包含：用户系统、支付系统、游戏逻辑
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import hashlib
import random
import string
import time
from datetime import datetime
import json

app = Flask(__name__)
CORS(app)

# 数据库初始化
def init_db():
    conn = sqlite3.connect('toweroffate.db')
    c = conn.cursor()
    
    # 用户表
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            nickname TEXT NOT NULL,
            phone TEXT,
            avatar TEXT DEFAULT '😺',
            gold INTEGER DEFAULT 1000,
            diamond INTEGER DEFAULT 0,
            vip_level INTEGER DEFAULT 0,
            vip_expire_at TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_login TIMESTAMP
        )
    ''')
    
    # 验证码表
    c.execute('''
        CREATE TABLE IF NOT EXISTS verify_codes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL,
            code TEXT NOT NULL,
            type TEXT NOT NULL,
            expires_at TIMESTAMP NOT NULL,
            used BOOLEAN DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # 订单表（支付）
    c.execute('''
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_no TEXT UNIQUE NOT NULL,
            user_id INTEGER NOT NULL,
            product_id TEXT NOT NULL,
            product_name TEXT NOT NULL,
            amount REAL NOT NULL,
            currency TEXT DEFAULT 'CNY',
            pay_type TEXT,  -- alipay, wechat
            pay_status TEXT DEFAULT 'pending',  -- pending, paid, failed
            pay_time TIMESTAMP,
            third_party_order_no TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # 游戏记录表
    c.execute('''
        CREATE TABLE IF NOT EXISTS game_records (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            room_id TEXT NOT NULL,
            user_id INTEGER NOT NULL,
            round INTEGER NOT NULL,
            player_card TEXT,
            guard_card TEXT,
            result TEXT,  -- success, fail, provoke
            level_change INTEGER,  -- +1, -1, 0
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # 道具表
    c.execute('''
        CREATE TABLE IF NOT EXISTS user_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            item_id TEXT NOT NULL,
            item_name TEXT NOT NULL,
            quantity INTEGER DEFAULT 1,
            expires_at TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()
    print("✅ 数据库初始化完成")

# ============== 用户系统API ==============

@app.route('/api/register', methods=['POST'])
def register():
    """用户注册"""
    data = request.json
    email = data.get('email')
    password = data.get('password')
    nickname = data.get('nickname')
    phone = data.get('phone')
    verify_code = data.get('verify_code')
    
    # 验证验证码
    if not verify_code or verify_code != '123456':  # 实际应该查数据库
        return jsonify({'code': 400, 'message': '验证码错误或已过期'})
    
    # 密码加密
    hashed_pwd = hashlib.md5(password.encode()).hexdigest()
    
    try:
        conn = sqlite3.connect('toweroffate.db')
        c = conn.cursor()
        c.execute('''
            INSERT INTO users (email, password, nickname, phone, gold)
            VALUES (?, ?, ?, ?, ?)
        ''', (email, hashed_pwd, nickname, phone, 1000))
        conn.commit()
        user_id = c.lastrowid
        conn.close()
        
        return jsonify({
            'code': 200,
            'message': '注册成功',
            'data': {
                'user_id': user_id,
                'email': email,
                'nickname': nickname,
                'gold': 1000
            }
        })
    except sqlite3.IntegrityError:
        return jsonify({'code': 400, 'message': '该邮箱已注册'})

@app.route('/api/login', methods=['POST'])
def login():
    """用户登录"""
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    hashed_pwd = hashlib.md5(password.encode()).hexdigest()
    
    conn = sqlite3.connect('toweroffate.db')
    c = conn.cursor()
    c.execute('SELECT * FROM users WHERE email = ? AND password = ?', (email, hashed_pwd))
    user = c.fetchone()
    
    if user:
        # 更新最后登录时间
        c.execute('UPDATE users SET last_login = ? WHERE id = ?', (datetime.now(), user[0]))
        conn.commit()
        conn.close()
        
        return jsonify({
            'code': 200,
            'message': '登录成功',
            'data': {
                'user_id': user[0],
                'email': user[1],
                'nickname': user[3],
                'avatar': user[6],
                'gold': user[7],
                'diamond': user[8],
                'vip_level': user[9]
            }
        })
    else:
        conn.close()
        return jsonify({'code': 401, 'message': '邮箱或密码错误'})

@app.route('/api/send-verify-code', methods=['POST'])
def send_verify_code():
    """发送验证码"""
    data = request.json
    email = data.get('email')
    type = data.get('type', 'register')  # register, reset
    
    # 生成6位验证码
    code = ''.join(random.choices(string.digits, k=6))
    
    # 存储验证码（实际应该发送到邮箱）
    conn = sqlite3.connect('toweroffate.db')
    c = conn.cursor()
    c.execute('''
        INSERT INTO verify_codes (email, code, type, expires_at)
        VALUES (?, ?, ?, datetime('now', '+10 minutes'))
    ''', (email, code, type))
    conn.commit()
    conn.close()
    
    # TODO: 调用邮件API发送验证码
    # 开发阶段直接返回验证码
    return jsonify({
        'code': 200,
        'message': '验证码已发送',
        'data': {
            'verify_code': code  # 生产环境不要返回
        }
    })

@app.route('/api/user/profile', methods=['GET'])
def get_profile():
    """获取用户资料"""
    user_id = request.args.get('user_id')
    
    conn = sqlite3.connect('toweroffate.db')
    c = conn.cursor()
    c.execute('SELECT id, email, nickname, phone, avatar, gold, diamond, vip_level FROM users WHERE id = ?', (user_id,))
    user = c.fetchone()
    conn.close()
    
    if user:
        return jsonify({
            'code': 200,
            'data': {
                'user_id': user[0],
                'email': user[1],
                'nickname': user[2],
                'phone': user[3],
                'avatar': user[4],
                'gold': user[5],
                'diamond': user[6],
                'vip_level': user[7]
            }
        })
    return jsonify({'code': 404, 'message': '用户不存在'})

# ============== 支付系统API ==============

@app.route('/api/order/create', methods=['POST'])
def create_order():
    """创建支付订单"""
    data = request.json
    user_id = data.get('user_id')
    product_id = data.get('product_id')
    product_name = data.get('product_name')
    amount = data.get('amount')
    pay_type = data.get('pay_type')  # alipay, wechat
    
    # 生成订单号
    order_no = f"TF{datetime.now().strftime('%Y%m%d%H%M%S')}{random.randint(1000, 9999)}"
    
    conn = sqlite3.connect('toweroffate.db')
    c = conn.cursor()
    c.execute('''
        INSERT INTO orders (order_no, user_id, product_id, product_name, amount, pay_type)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (order_no, user_id, product_id, product_name, amount, pay_type))
    conn.commit()
    conn.close()
    
    # TODO: 调用支付宝/微信支付接口
    
    return jsonify({
        'code': 200,
        'message': '订单创建成功',
        'data': {
            'order_no': order_no,
            'amount': amount,
            'pay_url': f'/pay/{order_no}'  # 支付跳转链接
        }
    })

@app.route('/api/order/notify', methods=['POST'])
def order_notify():
    """支付回调通知"""
    # 处理支付宝/微信的支付结果通知
    data = request.json
    order_no = data.get('order_no')
    third_party_no = data.get('third_party_no')
    status = data.get('status')
    
    conn = sqlite3.connect('toweroffate.db')
    c = conn.cursor()
    
    if status == 'success':
        c.execute('''
            UPDATE orders 
            SET pay_status = 'paid', pay_time = ?, third_party_order_no = ?
            WHERE order_no = ?
        ''', (datetime.now(), third_party_no, order_no))
        
        # 给用户加金币/钻石
        c.execute('SELECT user_id, product_id FROM orders WHERE order_no = ?', (order_no,))
        order = c.fetchone()
        if order:
            user_id, product_id = order
            # 根据产品ID给用户加货币
            if product_id == 'vip_month':
                c.execute('UPDATE users SET vip_level = 1, vip_expire_at = datetime("now", "+30 days") WHERE id = ?', (user_id,))
            elif product_id == 'gold_1000':
                c.execute('UPDATE users SET gold = gold + 1000 WHERE id = ?', (user_id,))
    
    conn.commit()
    conn.close()
    
    return jsonify({'code': 200, 'message': 'OK'})

@app.route('/api/order/query', methods=['GET'])
def query_order():
    """查询订单状态"""
    order_no = request.args.get('order_no')
    
    conn = sqlite3.connect('toweroffate.db')
    c = conn.cursor()
    c.execute('SELECT * FROM orders WHERE order_no = ?', (order_no,))
    order = c.fetchone()
    conn.close()
    
    if order:
        return jsonify({
            'code': 200,
            'data': {
                'order_no': order[1],
                'amount': order[5],
                'pay_status': order[8],
                'pay_time': order[9]
            }
        })
    return jsonify({'code': 404, 'message': '订单不存在'})

# ============== 对账系统API ==============

@app.route('/api/admin/reconciliation', methods=['GET'])
def reconciliation():
    """对账接口 - 比对订单和第三方支付"""
    date = request.args.get('date', datetime.now().strftime('%Y-%m-%d'))
    
    conn = sqlite3.connect('toweroffate.db')
    c = conn.cursor()
    
    # 获取当日所有订单
    c.execute('''
        SELECT order_no, amount, pay_type, pay_status, third_party_order_no, pay_time
        FROM orders
        WHERE date(created_at) = ?
    ''', (date,))
    orders = c.fetchall()
    
    conn.close()
    
    total_amount = sum(o[1] for o in orders if o[3] == 'paid')
    paid_count = len([o for o in orders if o[3] == 'paid'])
    pending_count = len([o for o in orders if o[3] == 'pending'])
    
    return jsonify({
        'code': 200,
        'data': {
            'date': date,
            'total_orders': len(orders),
            'paid_count': paid_count,
            'pending_count': pending_count,
            'total_amount': total_amount,
            'orders': orders
        }
    })

# ============== 游戏逻辑API ==============

@app.route('/api/game/start', methods=['POST'])
def start_game():
    """开始游戏"""
    data = request.json
    room_id = f"R{int(time.time())}{random.randint(100, 999)}"
    
    return jsonify({
        'code': 200,
        'data': {
            'room_id': room_id,
            'players': data.get('players', []),
            'start_time': datetime.now().isoformat()
        }
    })

@app.route('/api/game/record', methods=['POST'])
def record_game():
    """记录游戏结果"""
    data = request.json
    
    conn = sqlite3.connect('toweroffate.db')
    c = conn.cursor()
    c.execute('''
        INSERT INTO game_records (room_id, user_id, round, player_card, guard_card, result, level_change)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (
        data.get('room_id'),
        data.get('user_id'),
        data.get('round'),
        data.get('player_card'),
        data.get('guard_card'),
        data.get('result'),
        data.get('level_change')
    ))
    conn.commit()
    conn.close()
    
    return jsonify({'code': 200, 'message': '记录成功'})

# ============== 商城系统API ==============

@app.route('/api/shop/products', methods=['GET'])
def get_products():
    """获取商品列表"""
    products = [
        {'id': 'vip_month', 'name': 'VIP月卡', 'price': 18, 'currency': 'CNY', 'icon': '👑'},
        {'id': 'gold_1000', 'name': '1000金币', 'price': 6, 'currency': 'CNY', 'icon': '💰'},
        {'id': 'gold_5000', 'name': '5000金币', 'price': 25, 'currency': 'CNY', 'icon': '💰'},
        {'id': 'diamond_100', 'name': '100钻石', 'price': 10, 'currency': 'CNY', 'icon': '💎'},
        {'id': 'skin_gold', 'name': '黄金皮肤', 'price': 30, 'currency': 'CNY', 'icon': '✨'},
        {'id': 'effect_fire', 'name': '火焰特效', 'price': 15, 'currency': 'CNY', 'icon': '🔥'},
    ]
    
    return jsonify({'code': 200, 'data': products})

@app.route('/api/user/items', methods=['GET'])
def get_user_items():
    """获取用户道具"""
    user_id = request.args.get('user_id')
    
    conn = sqlite3.connect('toweroffate.db')
    c = conn.cursor()
    c.execute('SELECT item_id, item_name, quantity FROM user_items WHERE user_id = ?', (user_id,))
    items = c.fetchall()
    conn.close()
    
    return jsonify({
        'code': 200,
        'data': [{'item_id': i[0], 'item_name': i[1], 'quantity': i[2]} for i in items]
    })

if __name__ == '__main__':
    init_db()
    print("🚀 服务器启动在 http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)

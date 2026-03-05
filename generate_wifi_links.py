#!/usr/bin/env python3
"""
命运塔·首登者 V1.0 - Wi-Fi 测试链接生成器
Wi-Fi Test Link Generator

生成同一Wi-Fi下的测试链接，每接入一个测试玩家自动生成18倍系统玩家
"""

import socket
import os
import sys
from datetime import datetime

def get_ip_addresses():
    """获取所有IP地址"""
    ips = []
    try:
        # 获取主机名对应的IP
        hostname = socket.gethostname()
        
        # 尝试多种方式获取IP
        import subprocess
        result = subprocess.run(['ifconfig'], capture_output=True, text=True)
        output = result.stdout
        
        # 解析IPv4地址
        for line in output.split('\n'):
            if 'inet ' in line and '127.0.0.1' not in line:
                parts = line.split()
                for i, part in enumerate(parts):
                    if part == 'inet':
                        ip = parts[i+1].split('/')[0]  # 处理 192.168.1.33/24 格式
                        if ':' not in ip:  # 排除IPv6
                            ips.append(ip)
        
        # 去重
        ips = list(dict.fromkeys(ips))
        
    except Exception as e:
        print(f"获取IP失败: {e}")
    
    return ips

def generate_test_links():
    """生成测试链接"""
    ips = get_ip_addresses()
    
    if not ips:
        print("❌ 无法获取IP地址，请检查网络连接")
        return
    
    print("=" * 60)
    print("🎮 命运塔·首登者 V1.0 - Wi-Fi 测试链接")
    print("=" * 60)
    print()
    
    print("📱 确保测试设备和电脑连接同一Wi-Fi网络")
    print()
    
    for ip in ips:
        print(f"🌐 本机IP: {ip}")
        print()
        
        links = [
            ("🏠 游戏首页", f"http://{ip}:8080"),
            ("🛒 商城", f"http://{ip}:8080/shop.html"),
            ("🏆 锦标赛", f"http://{ip}:8080/tournament.html"),
            ("⚙️ 后台管理", f"http://{ip}:8081"),
        ]
        
        for name, url in links:
            print(f"  {name}")
            print(f"  {url}")
            print()
    
    print("=" * 60)
    print("🧪 测试系统说明")
    print("=" * 60)
    print()
    print("系统玩家生成规则：")
    print("  每接入 1 个测试玩家 → 自动生成 18 个系统玩家")
    print()
    print("系统玩家状态：")
    print("  • 在线状态：实时显示")
    print("  • 匹配状态：准备就绪")
    print("  • AI难度：中等（比真人慢2秒）")
    print()
    print("=" * 60)
    print(f"⏰ 生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)

def main():
    """主函数"""
    print("正在生成Wi-Fi测试链接...")
    print()
    
    # 检查端口占用
    import subprocess
    result = subprocess.run(['lsof', '-i', ':8080'], capture_output=True, text=True)
    if 'python' in result.stdout:
        print("✅ 游戏服务器 (端口8080) 正在运行")
    else:
        print("⚠️  游戏服务器未启动，请先运行:")
        print("   cd web_client && python3 -m http.server 8080")
    
    print()
    
    # 生成链接
    generate_test_links()
    
    # 保存到文件
    with open('wifi_test_links.txt', 'w') as f:
        f.write("命运塔·首登者 V1.0 - Wi-Fi 测试链接\n")
        f.write("=" * 60 + "\n\n")
        ips = get_ip_addresses()
        for ip in ips:
            f.write(f"IP: {ip}\n")
            f.write(f"游戏首页: http://{ip}:8080\n")
            f.write(f"商城: http://{ip}:8080/shop.html\n")
            f.write(f"锦标赛: http://{ip}:8080/tournament.html\n")
            f.write(f"后台管理: http://{ip}:8081\n\n")
        f.write("=" * 60 + "\n")
        f.write(f"生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
    
    print("\n✅ 测试链接已保存到: wifi_test_links.txt")

if __name__ == "__main__":
    main()

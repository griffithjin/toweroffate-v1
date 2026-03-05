#!/usr/bin/env python3
"""
命运塔·首登者 - 稳定性测试脚本
每20分钟自动运行一次测试
"""

import requests
import time
import json
from datetime import datetime

# 测试配置
BASE_URL = "https://griffithjin.github.io/toweroffate-v1"
PAGES = [
    "index.html",
    "playable.html",
    "register-v2.html",
    "login-v2.html",
    "shop.html",
    "recharge.html",
    "tournament.html",
    "streak.html",
    "ranked.html",
    "honor.html",
    "profile.html",
    "admin/index.html"
]

def test_page_accessibility():
    """测试页面可访问性"""
    results = []
    failed_pages = []
    
    print(f"\n[{datetime.now()}] 开始测试页面可访问性...")
    
    for page in PAGES:
        url = f"{BASE_URL}/{page}"
        try:
            response = requests.get(url, timeout=10)
            status = "✅ 正常" if response.status_code == 200 else f"❌ HTTP {response.status_code}"
            
            if response.status_code != 200:
                failed_pages.append(page)
            
            results.append({
                "page": page,
                "status_code": response.status_code,
                "status": status,
                "size": len(response.content)
            })
            
            print(f"  {page}: {status}")
            
        except Exception as e:
            failed_pages.append(page)
            results.append({
                "page": page,
                "status_code": -1,
                "status": f"❌ 错误: {str(e)}",
                "size": 0
            })
            print(f"  {page}: ❌ 错误: {str(e)}")
    
    return results, failed_pages

def test_performance():
    """测试页面加载性能"""
    print(f"\n[{datetime.now()}] 开始测试页面性能...")
    
    performance_results = []
    
    for page in ["index.html", "playable.html", "shop.html"]:
        url = f"{BASE_URL}/{page}"
        try:
            start_time = time.time()
            response = requests.get(url, timeout=10)
            load_time = time.time() - start_time
            
            performance_results.append({
                "page": page,
                "load_time": round(load_time, 2),
                "size_kb": round(len(response.content) / 1024, 2)
            })
            
            status = "✅ 正常" if load_time < 3 else "⚠️ 较慢"
            print(f"  {page}: 加载时间 {load_time:.2f}s {status}")
            
        except Exception as e:
            print(f"  {page}: ❌ 错误: {str(e)}")
    
    return performance_results

def generate_report(access_results, perf_results, failed_pages):
    """生成测试报告"""
    
    report = {
        "test_time": datetime.now().isoformat(),
        "summary": {
            "total_pages": len(PAGES),
            "passed": len(PAGES) - len(failed_pages),
            "failed": len(failed_pages),
            "success_rate": f"{((len(PAGES) - len(failed_pages)) / len(PAGES) * 100):.1f}%"
        },
        "accessibility": access_results,
        "performance": perf_results,
        "failed_pages": failed_pages
    }
    
    # 保存报告
    with open("test_results.json", "w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=2)
    
    # 输出摘要
    print(f"\n{'='*60}")
    print(f"测试摘要")
    print(f"{'='*60}")
    print(f"测试时间: {report['test_time']}")
    print(f"总页面数: {report['summary']['total_pages']}")
    print(f"通过: {report['summary']['passed']}")
    print(f"失败: {report['summary']['failed']}")
    print(f"成功率: {report['summary']['success_rate']}")
    
    if failed_pages:
        print(f"\n⚠️ 失败页面:")
        for page in failed_pages:
            print(f"  - {page}")
    else:
        print(f"\n✅ 所有页面测试通过！")
    
    print(f"{'='*60}\n")
    
    return report

def run_continuous_test():
    """持续运行测试"""
    test_count = 0
    
    print("="*60)
    print("命运塔·首登者 - 稳定性测试工具")
    print("="*60)
    print(f"测试间隔: 20分钟")
    print(f"测试URL: {BASE_URL}")
    print("="*60)
    
    while True:
        test_count += 1
        print(f"\n{'='*60}")
        print(f"第 {test_count} 次测试 - {datetime.now()}")
        print(f"{'='*60}")
        
        # 运行测试
        access_results, failed_pages = test_page_accessibility()
        perf_results = test_performance()
        
        # 生成报告
        report = generate_report(access_results, perf_results, failed_pages)
        
        # 如果有失败，发送警报
        if failed_pages:
            print(f"\n🔔 警报: 发现 {len(failed_pages)} 个页面异常！")
            print("建议立即检查:")
            for page in failed_pages:
                print(f"  - {BASE_URL}/{page}")
        
        # 等待20分钟
        print(f"\n⏳ 等待20分钟后进行下次测试...")
        print(f"下次测试时间: {(datetime.now().timestamp() + 1200)}")
        time.sleep(1200)  # 20分钟 = 1200秒

if __name__ == "__main__":
    try:
        run_continuous_test()
    except KeyboardInterrupt:
        print("\n\n测试已停止")
    except Exception as e:
        print(f"\n❌ 测试出错: {str(e)}")

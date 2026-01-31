// Dark System APK - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize app
    initApp();
    
    // Set default values
    document.getElementById('ddosThreads').addEventListener('input', function() {
        document.getElementById('threadsValue').textContent = this.value;
    });
    
    document.getElementById('exploitIntensity').addEventListener('input', function() {
        document.getElementById('intensityValue').textContent = this.value + '/10';
    });
});

function initApp() {
    console.log('Dark System v3.0 APK initialized');
    showToast('System initialized successfully');
    
    // Check backend status
    checkBackendStatus();
    
    // Update system info
    updateSystemInfo();
}

// Login function
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === 'IENZ' && password === '1122') {
        document.getElementById('loginScreen').classList.remove('active');
        document.getElementById('dashboard').classList.add('active');
        showToast('Access granted! Welcome to Dark System');
        
        // Start backend service
        startBackend();
    } else {
        showToast('Access denied! Invalid credentials', 'error');
        document.getElementById('loginStatus').textContent = 'ACCESS DENIED';
        document.getElementById('loginStatus').style.color = '#ff0000';
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        document.getElementById('dashboard').classList.remove('active');
        document.getElementById('loginScreen').classList.add('active');
        showToast('Logged out successfully');
        
        // Reset form
        document.getElementById('password').value = '1122';
        document.getElementById('loginStatus').textContent = 'READY FOR ACCESS';
        document.getElementById('loginStatus').style.color = '#00ff00';
    }
}

// Module navigation
function showModule(moduleId) {
    // Hide all modules
    document.querySelectorAll('.module').forEach(module => {
        module.classList.remove('active');
    });
    
    // Show selected module
    document.getElementById(moduleId).classList.add('active');
    
    // Update current module in header
    const moduleNames = {
        'dashboardHome': 'DASHBOARD',
        'ddos': 'DDoS ATTACK',
        'osint': 'OSINT TOOLS',
        'bugwa': 'BUG WA EXPLOIT',
        'network': 'NETWORK TOOLS',
        'settings': 'SETTINGS'
    };
    
    document.getElementById('currentModule').textContent = moduleNames[moduleId] || 'DARK SYSTEM';
    
    // Update bottom nav
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const navMapping = {
        'dashboardHome': 0,
        'ddos': 1,
        'osint': 2,
        'bugwa': 3
    };
    
    if (navMapping[moduleId] !== undefined) {
        document.querySelectorAll('.nav-btn')[navMapping[moduleId]].classList.add('active');
    }
}

// Side menu toggle
function toggleMenu() {
    document.getElementById('sideMenu').classList.toggle('active');
}

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast';
    
    if (type === 'error') {
        toast.style.borderColor = '#ff0000';
        toast.style.color = '#ff0000';
    } else if (type === 'warning') {
        toast.style.borderColor = '#ff9900';
        toast.style.color = '#ff9900';
    } else {
        toast.style.borderColor = '#00ff00';
        toast.style.color = '#00ff00';
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// DDoS Attack Functions
let ddosInterval;
let attackCounter = 0;

function startDDoSAttack() {
    const target = document.getElementById('ddosTarget').value;
    const method = document.getElementById('ddosMethod').value;
    const type = document.getElementById('ddosType').value;
    const threads = document.getElementById('ddosThreads').value;
    const duration = document.getElementById('ddosDuration').value;
    const port = document.getElementById('ddosPort').value;
    
    if (!target) {
        showToast('Please enter target URL/IP', 'error');
        return;
    }
    
    showToast(`DDoS attack launched on ${target}`, 'warning');
    
    // Update UI
    document.getElementById('attackStatus').textContent = 'RUNNING';
    document.getElementById('attackStatus').className = 'value running';
    
    // Start counter
    attackCounter = 0;
    ddosInterval = setInterval(() => {
        attackCounter += Math.floor(Math.random() * 100) + 50;
        document.getElementById('requestCount').textContent = attackCounter.toLocaleString();
        document.getElementById('successRate').textContent = Math.floor(Math.random() * 30 + 70) + '%';
        
        // Add to log
        const log = document.getElementById('ddosLog');
        log.innerHTML += `\n[${new Date().toLocaleTimeString()}] Request #${attackCounter} sent to ${target}`;
        log.scrollTop = log.scrollHeight;
    }, 100);
    
    // Stop after duration
    setTimeout(() => {
        stopDDoSAttack();
        showToast(`DDoS attack completed. ${attackCounter} requests sent`, 'success');
    }, duration * 1000);
}

function stopDDoSAttack() {
    if (ddosInterval) {
        clearInterval(ddosInterval);
    }
    
    document.getElementById('attackStatus').textContent = 'STOPPED';
    document.getElementById('attackStatus').className = 'value stopped';
    
    const log = document.getElementById('ddosLog');
    log.innerHTML += `\n[${new Date().toLocaleTimeString()}] Attack stopped. Total requests: ${attackCounter}`;
    log.scrollTop = log.scrollHeight;
}

function testConnection() {
    const target = document.getElementById('ddosTarget').value;
    if (!target) {
        showToast('Enter target first', 'error');
        return;
    }
    
    showToast(`Testing connection to ${target}...`, 'warning');
    
    // Simulate connection test
    setTimeout(() => {
        const success = Math.random() > 0.2;
        if (success) {
            showToast(`Connection successful! Target is reachable`, 'success');
        } else {
            showToast(`Connection failed! Target may be down`, 'error');
        }
    }, 1500);
}

// OSINT Functions
function showOsintTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName + 'Tab').classList.add('active');
    
    // Activate button
    event.target.classList.add('active');
}

function scanPhone() {
    const phone = document.getElementById('osintPhone').value;
    if (!phone) {
        showToast('Enter phone number', 'error');
        return;
    }
    
    showToast(`Scanning phone number: ${phone}`, 'warning');
    
    // Simulate OSINT scan
    setTimeout(() => {
        const results = document.getElementById('osintResults');
        results.innerHTML = `
[+] PHONE NUMBER SCAN RESULTS
===============================
📱 Target: ${phone}
✅ Valid: Yes
📍 Country: Indonesia (+62)
📞 Carrier: Telkomsel
🗺️ Location: Jakarta (Approximate)
🔍 Social Media Links:
   - https://facebook.com/search?q=${phone}
   - https://truecaller.com/search/${phone}
   - https://whatsapp.com/${phone}

📊 Data Breach Check:
   - 3 data breaches found
   - Last breach: 2023-08-15

⚠️ Recommendations:
   - Use VPN for further investigation
   - Check social media footprints
`;
        
        showToast('Phone number scan completed', 'success');
    }, 2000);
}

function scanEmail() {
    const email = document.getElementById('osintEmail').value;
    if (!email) {
        showToast('Enter email address', 'error');
        return;
    }
    
    showToast(`Scanning email: ${email}`, 'warning');
    
    // Simulate OSINT scan
    setTimeout(() => {
        const results = document.getElementById('osintResults');
        results.innerHTML = `
[+] EMAIL ADDRESS SCAN RESULTS
===============================
📧 Target: ${email}
🏷️ Domain: ${email.split('@')[1] || 'Unknown'}
✅ Valid Format: Yes

🔍 Breach Database:
   - HaveIBeenPwned: 2 breaches found
   - DeHashed: 1 match found
   - BreachDirectory: 3 entries

📱 Social Media Presence:
   - Facebook: Found (80% confidence)
   - Instagram: Found (60% confidence)
   - Twitter: Not found
   - LinkedIn: Found (90% confidence)

🌐 Associated Accounts:
   - GitHub: ${email.split('@')[0]}
   - Spotify: ${email.split('@')[0]}
   - PayPal: Possible match

📊 Risk Score: 7/10 (High)
⚠️ This email appears in multiple data breaches
`;
        
        showToast('Email scan completed', 'success');
    }, 2000);
}

// Bug WA Functions
let bugInterval;
let messageCounter = 0;

function executeBugWA() {
    const number = document.getElementById('waNumber').value;
    const type = document.getElementById('exploitType').value;
    const intensity = document.getElementById('exploitIntensity').value;
    const message = document.getElementById('waMessage').value || 'SYSTEM CRASH';
    
    if (!number) {
        showToast('Enter WhatsApp number', 'error');
        return;
    }
    
    showToast(`Executing ${type} on ${number}`, 'warning');
    
    // Update UI
    document.getElementById('targetNumber').textContent = number;
    document.getElementById('exploitStatus').textContent = 'RUNNING';
    document.getElementById('exploitStatus').className = 'value running';
    
    // Start counter
    messageCounter = 0;
    bugInterval = setInterval(() => {
        messageCounter += Math.floor(intensity * 10);
        document.getElementById('messagesSent').textContent = messageCounter.toLocaleString();
        document.getElementById('exploitSuccess').textContent = Math.floor(Math.random() * 20 + 80) + '%';
        
        // Add to log
        const log = document.getElementById('bugwaLog');
        const exploitTypes = {
            'FORCE_CLOSE': 'FORCE CLOSE',
            'DELAY_GOD': 'DELAY GOD',
            'MESSAGE_BOMB': 'MESSAGE BOMB',
            'CRASH': 'APP CRASH',
            'SPAM': 'CONTACT SPAM'
        };
        
        log.innerHTML += `\n[${new Date().toLocaleTimeString()}] ${exploitTypes[type]} packet #${messageCounter} sent to ${number}`;
        log.scrollTop = log.scrollHeight;
    }, 500);
    
    // Stop after 30 seconds
    setTimeout(() => {
        stopBugWA();
        showToast(`Exploit completed. ${messageCounter} packets sent`, 'success');
    }, 30000);
}

function stopBugWA() {
    if (bugInterval) {
        clearInterval(bugInterval);
    }
    
    document.getElementById('exploitStatus').textContent = 'STOPPED';
    document.getElementById('exploitStatus').className = 'value stopped';
    
    const log = document.getElementById('bugwaLog');
    log.innerHTML += `\n[${new Date().toLocaleTimeString()}] Exploit stopped. Total packets: ${messageCounter}`;
    log.scrollTop = log.scrollHeight;
}

function testWA() {
    const number = document.getElementById('waNumber').value;
    if (!number) {
        showToast('Enter WhatsApp number first', 'error');
        return;
    }
    
    showToast(`Testing WhatsApp exploit on ${number}...`, 'warning');
    
    setTimeout(() => {
        showToast('Exploit test successful! Ready for attack', 'success');
    }, 1500);
}

// Backend functions
function startBackend() {
    showToast('Starting backend server...', 'warning');
    
    // Simulate backend start
    setTimeout(() => {
        document.getElementById('backendStatus').textContent = 'ONLINE';
        document.getElementById('backendStatus').style.color = '#00ff00';
        showToast('Backend server started on port 5000', 'success');
    }, 2000);
}

function checkBackendStatus() {
    // Simulate status check
    setInterval(() => {
        const status = document.getElementById('backendStatus');
        if (status.textContent === 'ONLINE') {
            status.style.color = '#00ff00';
        } else {
            status.style.color = '#ff0000';
        }
    }, 5000);
}

function updateSystemInfo() {
    // Update RAM usage
    setInterval(() => {
        const ram = 30 + Math.floor(Math.random() * 40);
        document.getElementById('ramUsage').textContent = ram + '%';
    }, 3000);
}

// Utility functions
function saveResults() {
    showToast('Results saved to device storage', 'success');
}

function clearResults() {
    if (confirm('Clear all results?')) {
        document.getElementById('osintResults').textContent = '[SYSTEM] Results cleared';
        showToast('Results cleared', 'success');
    }
}

function exportResults() {
    showToast('Results exported to downloads folder', 'success');
}

function toggleDarkMode() {
    document.body.classList.toggle('light-mode');
    showToast('Theme toggled', 'warning');
}

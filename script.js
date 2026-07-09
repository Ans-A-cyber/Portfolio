// ANS.A Cybersecurity Portfolio - Javascript Functionality

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Navigation Toggle (Mobile)
    initNavigation();

    // 2. Initialize Typewriter Effect
    initTypewriter();

    // 3. Initialize Interactive CLI Terminal
    initTerminal();

    // 4. Initialize Stats Counter Scroll Animation
    initStatsCounter();

    // 5. Initialize Skill Progress Bars Animation
    initSkillBars();
});

/* ========================================================================= 
   1. NAVIGATION MENU
   ========================================================================= */
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu visibility
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        header.classList.toggle('nav-active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            header.classList.remove('nav-active');
        });
    });

    // Add border shadow to header when scrolling
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
            header.style.padding = '0.9rem 0';
        } else {
            header.style.boxShadow = 'none';
            header.style.padding = '1.25rem 0';
        }
    });
}

/* ========================================================================= 
   2. TYPEWRITER EFFECT
   ========================================================================= */
function initTypewriter() {
    const typewriter = document.getElementById('typewriter');
    if (!typewriter) return;

    const words = [
        "VAPT Execution",
        "SIEM & Monitoring (Splunk)",
        "Active Directory Security",
        "Linux/Cloud Hardening",
        "Offensive Security Research"
    ];

    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIdx];
        
        if (isDeleting) {
            typewriter.textContent = currentWord.substring(0, charIdx - 1);
            charIdx--;
            typingSpeed = 50; // Faster deleting
        } else {
            typewriter.textContent = currentWord.substring(0, charIdx + 1);
            charIdx++;
            typingSpeed = 120; // Natural typing speed
        }

        if (!isDeleting && charIdx === currentWord.length) {
            // Wait at the end of the word
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            wordIdx = (wordIdx + 1) % words.length;
            typingSpeed = 500; // Pause before next word
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* ========================================================================= 
   3. INTERACTIVE CLI TERMINAL
   ========================================================================= */
function initTerminal() {
    const terminalBody = document.getElementById('terminalBody');
    const terminalInput = document.getElementById('terminalInput');
    if (!terminalBody || !terminalInput) return;

    // Booting log sequence
    const bootLines = [
        "[-] INITIALIZING SECURE SHELL INTERFACE...",
        "[+] LOCAL TIME: " + new Date().toLocaleString(),
        "[+] CORE AGENT: ANS.A",
        "[+] CREDENTIALS LOADED: NASA VDP // DNFSB VDP // BIE VDP",
        "[+] STACK VERIFIED: HTML5 / CSS3 / VANILLA JS",
        "[+] ESTABLISHING ENCRYPTED CONNECTION... DONE.",
        "===========================================================",
        "WELCOME TO SECURITY CORE OS v2.0-STABLE",
        "Type 'help' to display list of available diagnostic commands.",
        "==========================================================="
    ];

    let bootLineIdx = 0;

    function printBootSequence() {
        if (bootLineIdx < bootLines.length) {
            const lineText = bootLines[bootLineIdx];
            appendTerminalLine(lineText, getLineClass(lineText));
            bootLineIdx++;
            terminalBody.scrollTop = terminalBody.scrollHeight;
            setTimeout(printBootSequence, 120);
        }
    }

    function getLineClass(text) {
        if (text.startsWith('[+]')) return 'text-green';
        if (text.startsWith('[-]')) return 'text-cyan';
        if (text.includes('WELCOME') || text.includes('=================')) return 'text-purple';
        return '';
    }

    // Start boot sequence
    printBootSequence();

    // Listen to command entries
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const inputVal = terminalInput.value.trim();
            if (inputVal !== "") {
                handleCommand(inputVal);
            }
            terminalInput.value = "";
        }
    });

    // Make clicking the terminal body autofocus the input
    document.querySelector('.terminal-widget').addEventListener('click', () => {
        terminalInput.focus();
    });

    function appendTerminalLine(text, className = '') {
        const line = document.createElement('div');
        line.className = `terminal-line ${className}`;
        line.innerHTML = text;
        terminalBody.appendChild(line);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function handleCommand(cmd) {
        const cleanedCmd = cmd.toLowerCase().trim();
        
        // Print user input prompt line first
        appendTerminalLine(`ans@security-core:~$ ${cmd}`, 'text-primary');

        switch (cleanedCmd) {
            case 'help':
                appendTerminalLine('Available Commands:', 'text-purple');
                appendTerminalLine('  about     - Brief profile summary & bio');
                appendTerminalLine('  skills    - List core technical capabilities');
                appendTerminalLine('  projects  - Show summary of audited security projects');
                appendTerminalLine('  contact   - Display secure communication endpoints');
                appendTerminalLine('  matrix    - Load custom matrix digital rain');
                appendTerminalLine('  clear     - Wipe console history');
                break;
            case 'about':
                appendTerminalLine('ANS.A PROFILE DATA SUMMARY:', 'text-cyan');
                appendTerminalLine('Cybersecurity researcher specializing in VAPT and defensive SIEM analysis.');
                appendTerminalLine('Experienced with Splunk, GCP infrastructure, Active Directory audits, and Linux hardening.');
                appendTerminalLine('Known for responsible disclosures resulting in NASA, DNFSB, and Bureau of Indian Education Bugcrowd Hall of Fames.');
                break;
            case 'skills':
                appendTerminalLine('CORE ARMORY METRICS:', 'text-cyan');
                appendTerminalLine('----------------------------------------------------', 'text-muted');
                appendTerminalLine('| OFFENSIVE SEC       | DEFENSIVE SEC  | TOOLS     |', 'text-purple');
                appendTerminalLine('----------------------------------------------------', 'text-muted');
                appendTerminalLine('| Web/Mobile VAPT: 90%| Splunk SIEM: 85%| Docker    |');
                appendTerminalLine('| AD Pentesting: 85%  | GCP Security:80%| Wireshark |');
                appendTerminalLine('| Network VAPT: 88%   | Log Analysis:88%| Burp/Caido|');
                appendTerminalLine('----------------------------------------------------', 'text-muted');
                break;
            case 'projects':
                appendTerminalLine('PORTFOLIO AUDIT LOGS:', 'text-cyan');
                appendTerminalLine('1. KALI-MCP: Safe Docker-based AI Pentesting Bridge.');
                appendTerminalLine('2. GCP SIEM: Central Splunk logging infrastructure + forwarders.');
                appendTerminalLine('3. DUCKY TOOLKIT: Custom USB & Bluetooth HID hardware payloads.');
                break;
            case 'contact':
                appendTerminalLine('SECURE CHANNELS ESTABLISHED:', 'text-cyan');
                appendTerminalLine('Email: <a href="mailto:ansanilkumar.s@gmail.com" style="color:var(--primary);text-decoration:underline">ansanilkumar.s@gmail.com</a>');
                appendTerminalLine('Phone: +91 8590941117');
                appendTerminalLine('Github: <a href="https://github.com/Ans-A-cyber" target="_blank" style="color:var(--primary);text-decoration:underline">github.com/Ans-A-cyber</a>');
                break;
            case 'clear':
                terminalBody.innerHTML = "";
                appendTerminalLine('Console logs flushed. System active.', 'text-muted');
                break;
            case 'matrix':
                triggerMatrixRain();
                break;
            default:
                appendTerminalLine(`sys-err: command '${cmd}' not recognized. Type 'help' for list of operations.`, 'text-red');
        }
    }

    function triggerMatrixRain() {
        appendTerminalLine('Initializing Matrix core stream...', 'text-green animate-pulse');
        
        let frames = 0;
        const intervalId = setInterval(() => {
            let row = '';
            for (let i = 0; i < 40; i++) {
                row += Math.random() > 0.5 ? Math.floor(Math.random() * 2) : String.fromCharCode(33 + Math.floor(Math.random() * 93));
            }
            appendTerminalLine(row, 'text-green');
            frames++;
            if (frames > 15) {
                clearInterval(intervalId);
                setTimeout(() => {
                    appendTerminalLine('---------------------------------------', 'text-muted');
                    appendTerminalLine('Matrix stream terminated successfully.', 'text-green');
                    appendTerminalLine('---------------------------------------', 'text-muted');
                }, 100);
            }
        }, 100);
    }
}

/* ========================================================================= 
   4. STATS COUNTER SCROLL ANIMATION
   ========================================================================= */
function initStatsCounter() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;

    const statValues = document.querySelectorAll('.stat-value');
    let animated = false;

    function startCounting() {
        statValues.forEach(stat => {
            const rawTarget = stat.getAttribute('data-count');
            
            // Check if string contains custom character formatting (like "Top 3%")
            if (rawTarget.includes('%') || rawTarget.includes('Top')) {
                // If it's a special formatted text, set it immediately with glow
                stat.textContent = rawTarget;
                return;
            }

            const target = parseInt(rawTarget, 10);
            let count = 0;
            const duration = 1200; // ms
            const increment = target / (duration / 16); // ~60fps
            
            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(count);
                }
            }, 16);
        });
    }

    // Scroll checker observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                startCounting();
                animated = true;
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
}

/* ========================================================================= 
   5. SKILLS PROGRESS BARS
   ========================================================================= */
function initSkillBars() {
    // We want the progress bars in the active tab to animate when it becomes active.
    // So we first capture the target percentage widths and set actual style widths to 0.
    const progressBars = document.querySelectorAll('.skill-progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.setAttribute('data-target-width', width);
        bar.style.width = '0%';
    });

    // Run animation for initial active tab
    setTimeout(() => {
        animateActivePanelSkills('offensive');
    }, 500);
}

function animateActivePanelSkills(panelId) {
    const activePanel = document.getElementById(panelId);
    if (!activePanel) return;

    const progressBars = activePanel.querySelectorAll('.skill-progress');
    progressBars.forEach(bar => {
        const target = bar.getAttribute('data-target-width');
        if (target) {
            // Apply width in a timeout to trigger CSS transition
            setTimeout(() => {
                bar.style.width = target;
            }, 50);
        }
    });
}

// Global function triggered by onclick in tabs
window.switchSkillTab = function(event, tabId) {
    // 1. Deactivate all buttons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // 2. Hide all panels
    const panels = document.querySelectorAll('.skills-panel');
    panels.forEach(panel => {
        panel.classList.remove('active');
        // Reset widths back to 0 so they animate again on revisit
        panel.querySelectorAll('.skill-progress').forEach(bar => {
            bar.style.width = '0%';
        });
    });

    // 3. Activate selected button & panel
    event.currentTarget.classList.add('active');
    const selectedPanel = document.getElementById(tabId);
    selectedPanel.classList.add('active');

    // 4. Animate the progress bars inside this panel
    animateActivePanelSkills(tabId);
};

/* ========================================================================= 
   6. CONTACT FORM SUBMISSION WITH FORMSPREE
   ========================================================================= */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formStatus = document.getElementById('formStatus');
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalBtnContent = submitBtn.innerHTML;

        // Visual loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-sync fa-spin"></i> TRANSMITTING PACKET...';
        formStatus.className = 'form-status text-cyan animate-pulse';
        formStatus.textContent = 'SYSTEM: Compressing and encrypting message transmission...';

        const data = new FormData(contactForm);

        fetch(contactForm.action, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Success state
                formStatus.className = 'form-status text-green';
                formStatus.textContent = '[+] SUCCESS: Signal transmission completed. Safe channel established.';
                contactForm.reset();
                
                // Reset progress bar animations
                setTimeout(() => {
                    formStatus.textContent = '';
                }, 8000);
            } else {
                response.json().then(data => {
                    if (Object.prototype.hasOwnProperty.call(data, 'errors')) {
                        formStatus.textContent = '[-] ERROR: ' + data.errors.map(error => error.message).join(", ");
                    } else {
                        formStatus.textContent = '[-] ERROR: Communication channel error. Packet dropped.';
                    }
                    formStatus.className = 'form-status text-red';
                });
            }
        })
        .catch(error => {
            // General connection error state
            formStatus.className = 'form-status text-red';
            formStatus.textContent = '[-] FATAL: Transmission failed. Check network link routing.';
        })
        .finally(() => {
            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnContent;
        });
    });
}

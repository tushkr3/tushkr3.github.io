// ===== Custom Cursor =====
const cursor = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .btn, .project-card, .skill-category').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.borderColor = '#22d3ee';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.borderColor = '#06b6d4';
    });
});

// ===== Ocean Particles System =====
const particlesContainer = document.getElementById('particles');
const marineSnowContainer = document.getElementById('marineSnow');
const fishContainer = document.getElementById('fishContainer');
const jellyfishContainer = document.getElementById('jellyfishContainer');
const seaweedContainer = document.getElementById('seaweedContainer');
const rocksContainer = document.getElementById('rocksContainer');

// SVG Fish templates with different colors for depth zones
const fishSVGs = {
    shallow: [
        // Tropical fish - orange/yellow
        `<svg viewBox="0 0 50 30" class="fish-body">
            <ellipse cx="20" cy="15" rx="18" ry="10" fill="url(#fish-gradient-1)"/>
            <polygon points="38,15 50,5 50,25" fill="url(#fish-gradient-1)"/>
            <circle cx="10" cy="13" r="2" fill="#1e293b"/>
            <path d="M15,10 Q20,5 25,10" stroke="#fff" stroke-width="0.5" fill="none" opacity="0.3"/>
            <defs>
                <linearGradient id="fish-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#f97316"/>
                    <stop offset="100%" style="stop-color:#eab308"/>
                </linearGradient>
            </defs>
        </svg>`,
        // Blue fish
        `<svg viewBox="0 0 50 30" class="fish-body">
            <ellipse cx="20" cy="15" rx="16" ry="9" fill="url(#fish-gradient-2)"/>
            <polygon points="36,15 48,7 48,23" fill="url(#fish-gradient-2)"/>
            <circle cx="9" cy="13" r="2" fill="#0f172a"/>
            <ellipse cx="20" cy="15" rx="10" ry="5" fill="rgba(255,255,255,0.15)"/>
            <defs>
                <linearGradient id="fish-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#06b6d4"/>
                    <stop offset="100%" style="stop-color:#0284c7"/>
                </linearGradient>
            </defs>
        </svg>`,
        // Green fish
        `<svg viewBox="0 0 50 30" class="fish-body">
            <ellipse cx="18" cy="15" rx="15" ry="8" fill="url(#fish-gradient-3)"/>
            <polygon points="33,15 45,6 45,24" fill="url(#fish-gradient-3)"/>
            <circle cx="8" cy="13" r="1.5" fill="#1e293b"/>
            <defs>
                <linearGradient id="fish-gradient-3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#10b981"/>
                    <stop offset="100%" style="stop-color:#059669"/>
                </linearGradient>
            </defs>
        </svg>`
    ],
    mid: [
        // Silver fish
        `<svg viewBox="0 0 50 30" class="fish-body">
            <ellipse cx="20" cy="15" rx="17" ry="9" fill="url(#fish-gradient-4)"/>
            <polygon points="37,15 50,6 50,24" fill="url(#fish-gradient-4)"/>
            <circle cx="9" cy="13" r="2" fill="#1e293b"/>
            <ellipse cx="18" cy="12" rx="8" ry="3" fill="rgba(255,255,255,0.2)"/>
            <defs>
                <linearGradient id="fish-gradient-4" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#94a3b8"/>
                    <stop offset="100%" style="stop-color:#64748b"/>
                </linearGradient>
            </defs>
        </svg>`,
        // Purple fish
        `<svg viewBox="0 0 50 30" class="fish-body">
            <ellipse cx="18" cy="15" rx="15" ry="10" fill="url(#fish-gradient-5)"/>
            <polygon points="33,15 46,5 46,25" fill="url(#fish-gradient-5)"/>
            <circle cx="8" cy="12" r="2" fill="#1e1b4b"/>
            <defs>
                <linearGradient id="fish-gradient-5" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#8b5cf6"/>
                    <stop offset="100%" style="stop-color:#6366f1"/>
                </linearGradient>
            </defs>
        </svg>`
    ],
    deep: [
        // Bioluminescent fish
        `<svg viewBox="0 0 50 30" class="fish-body">
            <ellipse cx="20" cy="15" rx="16" ry="8" fill="url(#fish-gradient-6)" filter="url(#glow)"/>
            <polygon points="36,15 48,8 48,22" fill="url(#fish-gradient-6)"/>
            <circle cx="9" cy="13" r="2.5" fill="#22d3ee"/>
            <circle cx="9" cy="13" r="1" fill="#fff"/>
            <defs>
                <linearGradient id="fish-gradient-6" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#0f172a"/>
                    <stop offset="100%" style="stop-color:#1e293b"/>
                </linearGradient>
                <filter id="glow"><feGaussianBlur stdDeviation="1" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            <ellipse cx="15" cy="15" rx="3" ry="2" fill="#22d3ee" opacity="0.6"/>
            <ellipse cx="25" cy="15" rx="2" ry="1.5" fill="#06b6d4" opacity="0.4"/>
        </svg>`,
        // Dark anglerfish style
        `<svg viewBox="0 0 50 30" class="fish-body">
            <ellipse cx="22" cy="16" rx="18" ry="11" fill="#0f172a"/>
            <polygon points="40,16 50,10 50,22" fill="#1e293b"/>
            <circle cx="10" cy="14" r="3" fill="#22d3ee" filter="url(#glow2)"/>
            <circle cx="10" cy="14" r="1.5" fill="#fff"/>
            <path d="M5,8 Q8,2 12,8" stroke="#22d3ee" stroke-width="1" fill="none"/>
            <circle cx="12" cy="5" r="2" fill="#22d3ee" filter="url(#glow2)"/>
            <defs>
                <filter id="glow2"><feGaussianBlur stdDeviation="2"/></filter>
            </defs>
        </svg>`
    ]
};

// Jellyfish SVG
const jellyfishSVG = `<svg viewBox="0 0 40 60" class="jelly-body">
    <ellipse cx="20" cy="15" rx="18" ry="14" fill="url(#jelly-gradient)" opacity="0.7"/>
    <ellipse cx="20" cy="15" rx="12" ry="8" fill="rgba(255,255,255,0.2)"/>
    <path d="M5,20 Q8,45 5,55" stroke="url(#tentacle-gradient)" stroke-width="2" fill="none" opacity="0.6">
        <animate attributeName="d" values="M5,20 Q8,45 5,55;M5,20 Q2,45 5,55;M5,20 Q8,45 5,55" dur="2s" repeatCount="indefinite"/>
    </path>
    <path d="M12,22 Q15,48 12,58" stroke="url(#tentacle-gradient)" stroke-width="1.5" fill="none" opacity="0.5">
        <animate attributeName="d" values="M12,22 Q15,48 12,58;M12,22 Q9,48 12,58;M12,22 Q15,48 12,58" dur="2.3s" repeatCount="indefinite"/>
    </path>
    <path d="M20,24 Q23,50 20,60" stroke="url(#tentacle-gradient)" stroke-width="2" fill="none" opacity="0.6">
        <animate attributeName="d" values="M20,24 Q23,50 20,60;M20,24 Q17,50 20,60;M20,24 Q23,50 20,60" dur="1.8s" repeatCount="indefinite"/>
    </path>
    <path d="M28,22 Q31,48 28,58" stroke="url(#tentacle-gradient)" stroke-width="1.5" fill="none" opacity="0.5">
        <animate attributeName="d" values="M28,22 Q31,48 28,58;M28,22 Q25,48 28,58;M28,22 Q31,48 28,58" dur="2.1s" repeatCount="indefinite"/>
    </path>
    <path d="M35,20 Q38,45 35,55" stroke="url(#tentacle-gradient)" stroke-width="2" fill="none" opacity="0.6">
        <animate attributeName="d" values="M35,20 Q38,45 35,55;M35,20 Q32,45 35,55;M35,20 Q38,45 35,55" dur="2.5s" repeatCount="indefinite"/>
    </path>
    <defs>
        <linearGradient id="jelly-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#c4b5fd"/>
            <stop offset="50%" style="stop-color:#a78bfa"/>
            <stop offset="100%" style="stop-color:#8b5cf6"/>
        </linearGradient>
        <linearGradient id="tentacle-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#a78bfa"/>
            <stop offset="100%" style="stop-color:transparent"/>
        </linearGradient>
    </defs>
</svg>`;

// Create bubbles and particles
function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const size = Math.random() * 8 + 3;
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 12;
    const delay = Math.random() * 10;
    const drift = (Math.random() - 0.5) * 100;
    
    const rand = Math.random();
    if (rand > 0.7) {
        particle.classList.add('bubble');
    } else if (rand > 0.5) {
        particle.classList.add('bioluminescent');
    }
    
    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        --drift: ${drift}px;
    `;
    
    particlesContainer.appendChild(particle);
}

// Create marine snow
function createMarineSnow() {
    const snow = document.createElement('div');
    snow.classList.add('snow-particle');
    
    const left = Math.random() * 100;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * 15;
    const drift = (Math.random() - 0.5) * 60;
    const size = Math.random() * 2 + 1;
    
    snow.style.cssText = `
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        --snow-drift: ${drift}px;
    `;
    
    marineSnowContainer.appendChild(snow);
}

// Create realistic SVG fish
function createFish(depthZone = 'shallow') {
    const fish = document.createElement('div');
    fish.classList.add('fish');
    
    // Get SVG for current depth
    const svgOptions = fishSVGs[depthZone] || fishSVGs.shallow;
    const svgTemplate = svgOptions[Math.floor(Math.random() * svgOptions.length)];
    fish.innerHTML = svgTemplate;
    
    // Random size
    const sizes = ['small', 'medium', 'large'];
    const sizeClass = sizes[Math.floor(Math.random() * sizes.length)];
    fish.classList.add(sizeClass);
    
    // Swimming parameters
    // direction: 1 = left to right, -1 = right to left
    const direction = Math.random() > 0.5 ? 1 : -1;
    const startY = Math.random() * 70 + 15; // 15-85% of viewport
    const duration = Math.random() * 15 + 18; // 18-33 seconds
    const travel = direction === 1 ? window.innerWidth + 150 : -(window.innerWidth + 150);
    
    // Fish SVG faces LEFT, so:
    // - Swimming left to right (direction=1): flip with scaleX(-1) to face right
    // - Swimming right to left (direction=-1): no flip, scaleX(1) to face left
    const scaleDirection = direction === 1 ? -1 : 1;
    
    // Natural wave motion
    const wave1 = (Math.random() - 0.5) * 40;
    const wave2 = (Math.random() - 0.5) * 50;
    const wave3 = (Math.random() - 0.5) * 35;
    const wave4 = (Math.random() - 0.5) * 45;
    
    // Depth-based opacity (deeper = slightly less visible)
    const baseOpacity = depthZone === 'deep' ? 0.7 : depthZone === 'mid' ? 0.8 : 0.9;
    
    fish.style.cssText = `
        top: ${startY}%;
        --start-x: ${direction === 1 ? '-80px' : (window.innerWidth + 80) + 'px'};
        --start-y: 0px;
        --travel: ${travel}px;
        --direction: ${scaleDirection};
        --swim-duration: ${duration}s;
        --wave-1: ${wave1}px;
        --wave-2: ${wave2}px;
        --wave-3: ${wave3}px;
        --wave-4: ${wave4}px;
        --fish-opacity: ${baseOpacity};
    `;
    
    // School behavior - create 2-4 fish together
    const isSchool = Math.random() > 0.6;
    
    fish.classList.add('swimming');
    fishContainer.appendChild(fish);
    
    if (isSchool) {
        // Create school members with slight offsets
        const schoolSize = Math.floor(Math.random() * 3) + 2;
        for (let i = 0; i < schoolSize; i++) {
            setTimeout(() => {
                const schoolFish = document.createElement('div');
                schoolFish.classList.add('fish', 'school-member');
                schoolFish.innerHTML = svgTemplate;
                schoolFish.classList.add(sizes[Math.floor(Math.random() * 2)]); // Smaller sizes for school
                
                const offsetY = (Math.random() - 0.5) * 80;
                const offsetDelay = Math.random() * 2;
                
                schoolFish.style.cssText = `
                    top: ${startY}%;
                    --start-x: ${direction === 1 ? '-80px' : (window.innerWidth + 80) + 'px'};
                    --start-y: 0px;
                    --travel: ${travel}px;
                    --direction: ${scaleDirection};
                    --swim-duration: ${duration + offsetDelay}s;
                    --school-offset-y: ${offsetY}px;
                    --fish-opacity: ${baseOpacity - 0.1};
                `;
                
                fishContainer.appendChild(schoolFish);
                
                setTimeout(() => schoolFish.remove(), (duration + offsetDelay + 2) * 1000);
            }, i * 500);
        }
    }
    
    // Remove and recreate
    setTimeout(() => {
        fish.remove();
        createFish(getCurrentDepthZone());
    }, (duration + 2) * 1000);
}

// Create jellyfish with SVG
function createJellyfish() {
    const jelly = document.createElement('div');
    jelly.classList.add('jellyfish', 'swimming');
    jelly.innerHTML = jellyfishSVG;
    
    const startX = Math.random() * (window.innerWidth - 100) + 50;
    const duration = Math.random() * 20 + 30;
    
    jelly.style.cssText = `
        --jelly-start-x: ${startX}px;
        --jelly-duration: ${duration}s;
    `;
    
    jellyfishContainer.appendChild(jelly);
    
    setTimeout(() => {
        jelly.remove();
        if (getCurrentDepthZone() !== 'shallow') {
            createJellyfish();
        }
    }, duration * 1000);
}

// Create seaweed
function createSeaweed() {
    for (let i = 0; i < 15; i++) {
        const seaweed = document.createElement('div');
        seaweed.classList.add('seaweed');
        
        const left = Math.random() * 100;
        const height = Math.random() * 100 + 50;
        const delay = Math.random() * 2;
        const width = Math.random() * 6 + 4;
        
        seaweed.style.cssText = `
            left: ${left}%;
            height: ${height}px;
            width: ${width}px;
            animation-delay: ${delay}s;
        `;
        
        seaweedContainer.appendChild(seaweed);
    }
}

// Create rocks
function createRocks() {
    const rockConfigs = [
        { left: '5%', width: 120, height: 80 },
        { left: '15%', width: 80, height: 50 },
        { left: '30%', width: 150, height: 100 },
        { left: '50%', width: 100, height: 70 },
        { left: '65%', width: 180, height: 120 },
        { left: '80%', width: 90, height: 60 },
        { left: '92%', width: 130, height: 90 },
    ];
    
    rockConfigs.forEach(config => {
        const rock = document.createElement('div');
        rock.classList.add('rock');
        rock.style.cssText = `
            left: ${config.left};
            width: ${config.width}px;
            height: ${config.height}px;
        `;
        rocksContainer.appendChild(rock);
    });
}

// Initialize particles (reduce on mobile for performance)
const isMobile = window.innerWidth <= 768;
const particleCount = isMobile ? 25 : 60;
const snowCount = isMobile ? 40 : 100;
const fishCount = isMobile ? 2 : 4;

for (let i = 0; i < particleCount; i++) createParticle();
for (let i = 0; i < snowCount; i++) createMarineSnow();
createSeaweed();
createRocks();

// Initial fish - staggered spawn
for (let i = 0; i < fishCount; i++) {
    setTimeout(() => createFish('shallow'), i * 4000);
}

// Initial jellyfish
setTimeout(() => createJellyfish(), 8000);
setTimeout(() => createJellyfish(), 20000);

// ===== Depth System with Smooth Scroll =====
const depthValue = document.querySelector('.depth-value');
const oceanGradient = document.querySelector('.ocean-gradient');
const lightRays = document.querySelector('.light-rays');
const vignette = document.querySelector('.vignette');
const zones = document.querySelectorAll('.zone');
const maxDepth = 3000;

let ticking = false;
let lastScrollY = 0;

function getCurrentDepthZone() {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    if (scrollPercent < 0.33) return 'shallow';
    if (scrollPercent < 0.66) return 'mid';
    return 'deep';
}

function updateDepth() {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const depth = Math.floor(scrollPercent * maxDepth);
    
    if (depthValue) {
        depthValue.textContent = depth;
    }
    
    // Update active zone
    zones.forEach((zone, index) => {
        zone.classList.remove('active');
        if (index === 0 && scrollPercent < 0.33) zone.classList.add('active');
        else if (index === 1 && scrollPercent >= 0.33 && scrollPercent < 0.66) zone.classList.add('active');
        else if (index === 2 && scrollPercent >= 0.66) zone.classList.add('active');
    });
    
    // Fade light rays as we go deeper
    if (lightRays) {
        const rayOpacity = Math.max(0, 0.9 - scrollPercent * 1.8);
        lightRays.style.opacity = rayOpacity;
    }
    
    // Increase vignette (pressure effect) as we go deeper
    if (vignette) {
        const vignetteOpacity = Math.min(scrollPercent * 0.8, 0.6);
        vignette.style.opacity = vignetteOpacity;
    }
    
    // Darken and shift color temperature
    if (oceanGradient) {
        const darkness = Math.min(scrollPercent * 0.4, 0.35);
        const hueShift = scrollPercent * 20;
        oceanGradient.style.filter = `brightness(${1 - darkness}) hue-rotate(-${hueShift}deg)`;
    }
    
    // Show seaweed and rocks at bottom
    if (seaweedContainer && rocksContainer) {
        if (scrollPercent > 0.7) {
            seaweedContainer.style.opacity = Math.min((scrollPercent - 0.7) * 3, 0.6);
            rocksContainer.style.opacity = Math.min((scrollPercent - 0.7) * 3, 0.8);
        } else {
            seaweedContainer.style.opacity = 0;
            rocksContainer.style.opacity = 0;
        }
    }
    
    ticking = false;
}

// Optimized scroll handler using requestAnimationFrame
function onScroll() {
    lastScrollY = window.scrollY;
    if (!ticking) {
        requestAnimationFrame(updateDepth);
        ticking = true;
    }
}

window.addEventListener('scroll', onScroll, { passive: true });
updateDepth();

// ===== Bioluminescent Mouse Effect =====
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.92) {
        const glow = document.createElement('div');
        glow.classList.add('particle', 'bioluminescent');
        glow.style.cssText = `
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: 6px;
            height: 6px;
            position: fixed;
            animation: mouse-glow 1.5s ease-out forwards;
        `;
        document.body.appendChild(glow);
        setTimeout(() => glow.remove(), 1500);
    }
});

// Add mouse glow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes mouse-glow {
        0% { transform: scale(1); opacity: 0.8; }
        100% { transform: scale(0) translateY(-30px); opacity: 0; }
    }
    @keyframes swim-reverse {
        0% {
            transform: translateX(100vw) translateY(var(--swim-y, 0)) scaleX(-1);
            opacity: 0;
        }
        5% { opacity: 0.8; }
        95% { opacity: 0.8; }
        100% {
            transform: translateX(-100px) translateY(calc(var(--swim-y, 0) + var(--swim-wave, 20px))) scaleX(-1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Mobile Navigation =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');
let navbarTicking = false;

function updateNavbar() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.padding = '0.5rem 0';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.padding = '1rem 0';
        navbar.style.boxShadow = 'none';
    }
    navbarTicking = false;
}

window.addEventListener('scroll', () => {
    if (!navbarTicking) {
        requestAnimationFrame(updateNavbar);
        navbarTicking = true;
    }
}, { passive: true });

// ===== Typing Animation =====
const dynamicText = document.querySelector('.hero-title-dynamic');
const phrases = [
    'AI Systems',
    'ML Pipelines',
    'Agentic AI',
    'NLP Solutions',
    'RAG Systems',
    'Data Products'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        dynamicText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        dynamicText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before next word
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Start typing animation
setTimeout(typeEffect, 1500);

// ===== Counter Animation =====
const counters = document.querySelectorAll('.stat-number');
const counterSpeed = 200;

const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const increment = target / counterSpeed;
    
    const updateCounter = () => {
        const current = +counter.innerText;
        if (current < target) {
            counter.innerText = Math.ceil(current + increment);
            setTimeout(updateCounter, 10);
        } else {
            counter.innerText = target;
        }
    };
    
    updateCounter();
};

// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll('.section-title, .about-text, .about-image, .skill-category, .project-card, .timeline-item, .education-card, .cert-badge, .contact-content');
let revealTicking = false;

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('reveal', 'active');
        }
    });
    
    // Animate counters when hero section is visible
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        if (heroBottom > 0 && heroBottom < windowHeight + 200) {
            counters.forEach(counter => {
                if (!counter.classList.contains('counted')) {
                    counter.classList.add('counted');
                    animateCounter(counter);
                }
            });
        }
    }
    revealTicking = false;
};

// Optimized scroll listener
window.addEventListener('scroll', () => {
    if (!revealTicking) {
        requestAnimationFrame(revealOnScroll);
        revealTicking = true;
    }
}, { passive: true });
window.addEventListener('load', revealOnScroll);

// ===== Smooth Scroll for Navigation =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');
let navLinkTicking = false;

const highlightNavLink = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.style.color = '#06b6d4';
            } else {
                navLink.style.color = '';
            }
        }
    });
    navLinkTicking = false;
};

window.addEventListener('scroll', () => {
    if (!navLinkTicking) {
        requestAnimationFrame(highlightNavLink);
        navLinkTicking = true;
    }
}, { passive: true });

// ===== Parallax Effect for Hero Shapes =====
const shapes = document.querySelectorAll('.shape');

window.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 20;
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;
        shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});

// ===== Project Cards Tilt Effect =====
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== Skill Tags Stagger Animation =====
const skillCategories = document.querySelectorAll('.skill-category');

const animateSkillTags = (category) => {
    const tags = category.querySelectorAll('.skill-tag');
    tags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            tag.style.transition = 'all 0.3s ease';
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
        }, index * 50);
    });
};

// Intersection Observer for skill tags
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillTags(entry.target);
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillCategories.forEach(category => {
    skillObserver.observe(category);
});

// ===== Console Easter Egg =====
console.log('%c🌊 Diving deep into the code ocean...', 'font-size: 20px; font-weight: bold; color: #06b6d4;');
console.log('%cLooking for the code? Check out my GitHub: github.com/tushkr3', 'font-size: 14px; color: #94a3b8;');

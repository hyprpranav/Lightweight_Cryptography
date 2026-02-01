// Matrix Rain Animation
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
const fontSize = 14;
const columns = canvas.width / fontSize;

const drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Close mobile menu on link click
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link Highlighting
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// Add fade-in animation for content boxes
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe content boxes
document.querySelectorAll('.content-box, .challenge-card, .pillar-card, .algo-card, .app-card, .trend-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Glitch effect on hover for section headers
document.querySelectorAll('.section-header h1, .section-header h2').forEach(header => {
    header.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'glitch 0.3s infinite';
        }, 10);
    });
    
    header.addEventListener('mouseleave', function() {
        this.style.animation = 'glitch 3s infinite';
    });
});

// Add typing effect to the main title on page load
window.addEventListener('load', () => {
    const mainTitle = document.querySelector('.glitch');
    if (mainTitle) {
        const text = mainTitle.textContent;
        mainTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                mainTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 500);
    }
});

// Add glow effect on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 0 30px rgba(0, 255, 65, 0.5)';
    } else {
        navbar.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.3)';
    }
    
    lastScroll = currentScroll;
});

// Parallax effect for sections
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax for content boxes
    const contentBoxes = document.querySelectorAll('.content-box');
    contentBoxes.forEach(box => {
        const speed = 0.3;
        const yPos = -(scrolled * speed);
        box.style.transform = `translateY(${yPos * 0.03}px)`;
    });
    
    // Parallax for section headers
    const headers = document.querySelectorAll('.section-header');
    headers.forEach((header, index) => {
        const rect = header.getBoundingClientRect();
        const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
        if (scrollPercent > 0 && scrollPercent < 1) {
            header.style.transform = `translateY(${scrollPercent * 20}px)`;
            header.style.opacity = Math.min(1, scrollPercent * 1.5);
        }
    });
    
    // Parallax for cards
    const cards = document.querySelectorAll('.challenge-card, .app-card, .benefit-item, .research-item');
    cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
        if (scrollPercent > 0 && scrollPercent < 1) {
            const movement = Math.sin(scrollPercent * Math.PI) * 10;
            card.style.transform = `translateY(${movement}px)`;
        }
    });
});

// Console Easter Egg
console.log('%c██████╗ ██████╗ ██╗██╗   ██╗ █████╗  ██████╗██╗   ██╗', 'color: #00ff41');
console.log('%c██╔══██╗██╔══██╗██║██║   ██║██╔══██╗██╔════╝╚██╗ ██╔╝', 'color: #00ff41');
console.log('%c██████╔╝██████╔╝██║██║   ██║███████║██║      ╚████╔╝ ', 'color: #00ff41');
console.log('%c██╔═══╝ ██╔══██╗██║╚██╗ ██╔╝██╔══██║██║       ╚██╔╝  ', 'color: #00ff41');
console.log('%c██║     ██║  ██║██║ ╚████╔╝ ██║  ██║╚██████╗   ██║   ', 'color: #00ff41');
console.log('%c╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝  ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ', 'color: #00ff41');
console.log('%cECC 1296 - Privacy and Security in IoT', 'color: #00ff41; font-size: 16px; font-weight: bold;');
console.log('%cWelcome to the Matrix... 🔒', 'color: #00ff41; font-size: 14px;');

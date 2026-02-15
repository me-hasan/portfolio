// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to light
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Typewriter Effect
const typewriterTexts = [
    'Software Engineer (Lead Consultant)',
    'Executive VP & Senior Backend Engineer',
    'Senior Full Stack Specialist',
    'Tech Lead - Government Technology',
    'Solution Architect',
    'Cloud & DevOps Expert',
    'Performance Optimization Specialist'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById('typewriter');

function typeWriter() {
    const currentText = typewriterTexts[textIndex];

    if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typewriterTexts.length;
        typeSpeed = 500;
    }

    setTimeout(typeWriter, typeSpeed);
}

typeWriter();

// Counter Animation
const counters = document.querySelectorAll('.stat-number');
const speed = 200;

function animateCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 10);
        } else {
            counter.innerText = target + '+';
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');

            // Trigger counter animation when hero stats are visible
            if (entry.target.classList.contains('hero-stats')) {
                animateCounters();
            }

            // Animate skill bars
            if (entry.target.classList.contains('skill-progress')) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.skill-category, .project-card, .timeline-item, .hero-stats').forEach(el => {
    observer.observe(el);
});

// Observe skill bars individually
document.querySelectorAll('.skill-progress').forEach(bar => {
    observer.observe(bar);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Form submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Here you would typically send the data to a server
    console.log('Form submitted:', data);

    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Add animation classes
const style = document.createElement('style');
style.textContent = `
    .skill-category,
    .project-card,
    .timeline-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }

    .skill-category.animate,
    .project-card.animate,
    .timeline-item.animate {
        opacity: 1;
        transform: translateY(0);
    }

    .project-card:nth-child(2) {
        transition-delay: 0.1s;
    }

    .project-card:nth-child(3) {
        transition-delay: 0.2s;
    }

    .timeline-item:nth-child(2) {
        transition-delay: 0.1s;
    }

    .timeline-item:nth-child(3) {
        transition-delay: 0.2s;
    }

    .timeline-item:nth-child(4) {
        transition-delay: 0.3s;
    }
`;
document.head.appendChild(style);

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNav);

// Add active nav link styling
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(activeStyle);

// Parallax effect for hero orbs
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.1;
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Hamburger animation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
});

const hamburgerStyle = document.createElement('style');
hamburgerStyle.textContent = `
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(hamburgerStyle);

console.log('Portfolio website loaded successfully!');

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
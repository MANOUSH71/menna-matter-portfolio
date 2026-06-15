// ==================== NAVIGATION & SCROLL EFFECTS ====================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Active link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section, header');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==================== SKILLS PROGRESS ANIMATION ====================

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        }, index * 150);
    });
}

function animateSoftSkills() {
    const softSkillFills = document.querySelectorAll('.soft-skill-fill');
    
    softSkillFills.forEach((fill, index) => {
        setTimeout(() => {
            const width = fill.getAttribute('data-width');
            fill.style.width = width + '%';
        }, index * 200);
    });
}

// Trigger skills animation when skills section is visible
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate technical skills
            setTimeout(() => {
                animateSkillBars();
            }, 300);
            
            // Animate soft skills
            setTimeout(() => {
                animateSoftSkills();
            }, 1500);
            
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// ==================== PROFESSIONAL STATISTICS ANIMATION ====================

function animateCircularProgress(element, percentage) {
    const degrees = (percentage / 100) * 360;
    
    // Animate the circular progress
    let currentDegree = 0;
    const increment = degrees / 100;
    
    const animation = setInterval(() => {
        currentDegree += increment;
        if (currentDegree >= degrees) {
            currentDegree = degrees;
            clearInterval(animation);
        }
        
        element.style.background = `conic-gradient(
            var(--primary-blue) 0deg,
            var(--primary-blue) ${currentDegree}deg,
            rgba(59, 130, 246, 0.1) ${currentDegree}deg,
            rgba(59, 130, 246, 0.1) 360deg
        )`;
    }, 20);
}

function animateAchievementBars() {
    const achievementFills = document.querySelectorAll('.achievement-fill');
    
    achievementFills.forEach((fill, index) => {
        setTimeout(() => {
            const width = fill.getAttribute('data-width');
            fill.style.width = width + '%';
        }, index * 200);
    });
}

// Trigger animations when statistics section is visible
const statisticsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate circular progress
            const circles = entry.target.querySelectorAll('.stat-circle');
            circles.forEach((circle, index) => {
                setTimeout(() => {
                    const percentage = parseInt(circle.getAttribute('data-percent'));
                    animateCircularProgress(circle, percentage);
                }, index * 300);
            });
            
            // Animate achievement bars
            setTimeout(() => {
                animateAchievementBars();
            }, 1000);
            
            statisticsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const statisticsSection = document.getElementById('statistics');
if (statisticsSection) {
    statisticsObserver.observe(statisticsSection);
}

// ==================== CONTACT FORM FUNCTIONALITY ====================

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

// Form validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function hideError(fieldId) {
    const errorElement = document.getElementById(fieldId + 'Error');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

function showStatus(message, type) {
    if (formStatus) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        formStatus.style.display = 'block';
        
        if (type === 'success') {
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    }
}

// Real-time validation
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const subjectField = document.getElementById('subject');
const messageField = document.getElementById('message');

if (nameField) {
    nameField.addEventListener('input', function() {
        if (this.value.trim().length < 2) {
            showError('name', 'Name must be at least 2 characters');
            this.style.borderColor = 'var(--danger)';
        } else {
            hideError('name');
            this.style.borderColor = 'var(--success)';
        }
    });
}

if (emailField) {
    emailField.addEventListener('input', function() {
        if (!validateEmail(this.value)) {
            showError('email', 'Please enter a valid email address');
            this.style.borderColor = 'var(--danger)';
        } else {
            hideError('email');
            this.style.borderColor = 'var(--success)';
        }
    });
}

if (subjectField) {
    subjectField.addEventListener('change', function() {
        if (this.value === '') {
            showError('subject', 'Please select a subject');
            this.style.borderColor = 'var(--danger)';
        } else {
            hideError('subject');
            this.style.borderColor = 'var(--success)';
        }
    });
}

if (messageField) {
    messageField.addEventListener('input', function() {
        if (this.value.trim().length < 10) {
            showError('message', 'Message must be at least 10 characters');
            this.style.borderColor = 'var(--danger)';
        } else {
            hideError('message');
            this.style.borderColor = 'var(--success)';
        }
    });
}

// Form submission with WhatsApp
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const subject = formData.get('subject');
        const message = formData.get('message').trim();
        
        // Validate all fields
        let isValid = true;
        
        if (name.length < 2) {
            showError('name', 'Name must be at least 2 characters');
            isValid = false;
        }
        
        if (!validateEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        if (subject === '') {
            showError('subject', 'Please select a subject');
            isValid = false;
        }
        
        if (message.length < 10) {
            showError('message', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        if (!isValid) {
            showStatus('Please fix the errors above', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        const btnText = document.querySelector('.btn-text');
        const btnLoading = document.querySelector('.btn-loading');
        
        if (btnText) btnText.style.display = 'none';
        if (btnLoading) btnLoading.style.display = 'inline';
        
        // Create WhatsApp message
        const whatsappMessage = `*New Contact Form Message*%0A%0A` +
            `*Name:* ${name}%0A` +
            `*Email:* ${email}%0A` +
            `*Subject:* ${subject}%0A%0A` +
            `*Message:*%0A${message}%0A%0A` +
            `----%0A` +
            `*Sent from Portfolio Contact Form*`;
        
        // WhatsApp phone number (with country code)
        const phoneNumber = '201068570593'; // Egypt +20
        
        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
        
        // Simulate sending delay for better UX
        setTimeout(() => {
            // Open WhatsApp
            window.open(whatsappURL, '_blank');
            
            // Reset form
            contactForm.reset();
            
            // Reset field borders
            const inputs = contactForm.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.style.borderColor = 'rgba(59, 130, 246, 0.2)';
            });
            
            // Hide all errors
            const errorElements = contactForm.querySelectorAll('.error-message');
            errorElements.forEach(error => {
                error.style.display = 'none';
            });
            
            // Show success message
            showStatus('WhatsApp opened! Your message is ready to send. Complete the sending process in WhatsApp.', 'success');
            
            // Reset button
            submitBtn.disabled = false;
            if (btnText) btnText.style.display = 'inline';
            if (btnLoading) btnLoading.style.display = 'none';
            
        }, 1000);
    });
}

// ==================== EXISTING CODE CONTINUES ====================

const backToTopBtn = document.getElementById('backToTop');

let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'flex';
            backToTopBtn.style.alignItems = 'center';
            backToTopBtn.style.justifyContent = 'center';
        } else {
            backToTopBtn.style.display = 'none';
        }
    }, 50);
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
        event.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// Project cards animation and interaction
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
    
    // Observe each project card for intersection
    observer.observe(card);
    
    // Add hover effects
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
        this.style.boxShadow = '0 12px 35px rgba(59, 130, 246, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '';
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backToTopBtn.style.display !== 'none') {
        backToTopBtn.click();
    }
});

let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        header.style.boxShadow = '0 10px 40px rgba(59, 130, 246, 0.15)';
    } else {
        header.style.boxShadow = '0 10px 40px rgba(59, 130, 246, 0.1)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

document.querySelectorAll('.skills-list li').forEach(skill => {
    skill.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    skill.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});



function logPerformanceMetrics() {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const connectTime = perfData.responseEnd - perfData.requestStart;
        const renderTime = perfData.domComplete - perfData.domLoading;
        
        console.log('📊 Performance Metrics:');
        console.log(`  Total Load Time: ${pageLoadTime}ms`);
        console.log(`  Connect Time: ${connectTime}ms`);
        console.log(`  Render Time: ${renderTime}ms`);
    }
}

window.addEventListener('load', () => {
    console.log('%c🎯 Portfolio loaded successfully!', 'color: #3B82F6; font-size: 16px; font-weight: bold;');
    console.log('%cWelcome to Menna Matter\'s Cybersecurity Portfolio', 'color: #60A5FA; font-size: 14px;');
    logPerformanceMetrics();
});

document.addEventListener('focusin', (e) => {
    const element = e.target;
    if (element.tagName === 'A' || element.tagName === 'BUTTON') {
        element.style.outline = '2px solid var(--primary-blue)';
        element.style.outlineOffset = '2px';
    }
});

document.addEventListener('focusout', (e) => {
    const element = e.target;
    element.style.outline = 'none';
});

function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'var(--danger)';
            isValid = false;
        } else {
            input.style.borderColor = 'var(--success)';
        }
    });
    
    return isValid;
}

document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('footer p:first-child');
    if (footerText) {
        footerText.textContent = `© ${currentYear} Menna Matter | Cybersecurity Portfolio`;
    }
});

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.clear();
console.log('%c╔════════════════════════════════════════════╗', 'color: #3B82F6; font-weight: bold;');
console.log('%c║  🔐 CYBERSECURITY PORTFOLIO              ║', 'color: #3B82F6; font-weight: bold;');
console.log('%c║  Author: Menna Ebrahim Saied Matter      ║', 'color: #3B82F6; font-weight: bold;');
console.log('%c║  Role: Junior Cybersecurity Engineer     ║', 'color: #3B82F6; font-weight: bold;');
console.log('%c║  Projects: 6                             ║', 'color: #3B82F6; font-weight: bold;');
console.log('%c╚════════════════════════════════════════════╝', 'color: #3B82F6; font-weight: bold;');

// Smooth scrolling
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

// Work cards parallax effect
const workCards = document.querySelectorAll('.work-card');

function handleScroll() {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;

    workCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top + scrolled;
        const cardPosition = (scrolled + windowHeight - cardTop) / windowHeight;
        
        if (cardPosition > 0 && cardPosition < 1) {
            const rotation = (index % 2 === 0 ? 1 : -1) * cardPosition * 2;
            const scale = 1 - (index * 0.02 * (1 - cardPosition));
            
            card.style.transform = `rotate(${rotation}deg) scale(${scale})`;
            card.style.zIndex = 10 - index;
        }
    });
}

// Throttle scroll events for performance
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
        });
        ticking = true;
    }
});

// Add intersection observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in
document.querySelectorAll('.process__step, .work-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Header background on scroll
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.backgroundColor = 'rgba(4, 5, 4, 0.98)';
    } else {
        header.style.backgroundColor = 'rgba(4, 5, 4, 0.95)';
    }
    
    lastScroll = currentScroll;
});

// Add hover effect for work cards
workCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        handleScroll();
    });
});

// Initialize
handleScroll();
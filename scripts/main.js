// Theme toggle functionality
const toggleTheme = () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    const themeIcon = document.getElementById('theme-icon');
    themeIcon.className = newTheme === 'dark' ? 'ph ph-sun' : 'ph ph-moon';
}

// Initialize theme from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const themeIcon = document.getElementById('theme-icon');
    themeIcon.className = savedTheme === 'dark' ? 'ph ph-sun' : 'ph ph-moon';
});

// Copy code functionality
const copyCode = (button) => {
    const codeBlock = button.closest('.code-card').querySelector('.code-block code');
    const code = codeBlock.textContent;

    navigator.clipboard.writeText(code).then(() => {
        const icon = button.querySelector('i');
        const originalClass = icon.className;
        icon.className = 'ph ph-check';
        button.style.background = 'var(--color-success)';

        setTimeout(() => {
            icon.className = originalClass;
            button.style.background = '';
        }, 2000);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards for animation
document.querySelectorAll('.glass-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animationObserver.observe(card);
});

// Add loading states to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        if (this.href && !this.href.startsWith('#')) {
            this.style.opacity = '0.7';
            this.style.pointerEvents = 'none';
        }
    });
});

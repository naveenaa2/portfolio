// Smooth navigation link highlighting
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
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

// Portfolio Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        // Filter portfolio items
        portfolioItems.forEach(item => {
            if (filterValue === 'all') {
                item.classList.remove('hidden');
                item.style.animation = 'fadeInUp 0.5s ease';
            } else {
                if (item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    item.classList.add('hidden');
                }
            }
        });
    });
});

// Portfolio item click effect
portfolioItems.forEach(item => {
    item.addEventListener('click', function() {
        const title = this.querySelector('h3').textContent;
        const description = this.querySelector('p').textContent;
        showPortfolioModal(title, description);
    });
});

// Fullscreen image/video handling
const portfolioImages = document.querySelectorAll('.portfolio-image img');
const portfolioVideos = document.querySelectorAll('.portfolio-image video');

portfolioImages.forEach(img => {
    img.addEventListener('click', function(event) {
        event.stopPropagation();
        openFullscreenElement(this);
    });
});

portfolioVideos.forEach(video => {
    video.addEventListener('click', function(event) {
        event.stopPropagation();
        this.play();
        openFullscreenElement(this);
    });
});

function openFullscreenElement(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

// Portfolio Modal
function showPortfolioModal(title, description) {
    alert(`Project: ${title}\n\nDescription: ${description}\n\nClick to view full project details or embed videos here.`);
}

// Contact Form Submission
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formInputs = this.querySelectorAll('input, textarea');
        const name = formInputs[0].value;
        const email = formInputs[1].value;
        const message = formInputs[2].value;

        // Simple validation
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            alert('Please fill in all fields!');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address!');
            return;
        }

        // Success message
        alert(`Thank you ${name}! Your message has been received. We'll get back to you soon!`);
        
        // Reset form
        this.reset();
    });
}

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe portfolio items for animation
portfolioItems.forEach(item => {
    observer.observe(item);
});

// Observe section headings
document.querySelectorAll('section h2').forEach(heading => {
    observer.observe(heading);
});

// Mobile Menu Responsiveness (if needed in future)
console.log('Portfolio website loaded successfully!');

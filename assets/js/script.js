// Initialize AOS 
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({ duration: 800, once: true });
            
    // Create particles
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.querySelector('.hero').appendChild(particlesContainer);
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particle.style.animation = `float-up ${20 + Math.random() * 10}s linear infinite`;
        particlesContainer.appendChild(particle);
    }
            
    // Typing effect
    const typingElement = document.getElementById('typing-text');
    const texts = ['Full Stack developer','Web Developer', 'Web Designer', 'Coder'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
            
    function typeText() {
        const currentText = texts[textIndex];   
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } 
        else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeText, 2000);
        } 
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeText, 500);
        } 
        else {
            setTimeout(typeText, isDeleting ? 50 : 100);
        }
    }   
    typeText();
            
    // Animate progress bars when in viewport
    const progressBars = document.querySelectorAll('.progress-bar');
    const animateProgressBars = () => {
        progressBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                bar.style.width = bar.getAttribute('data-width');
            }
        });
    }; 
    window.addEventListener('scroll', animateProgressBars);
    animateProgressBars(); // Initial check
            
    // Counter animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
            
    const animateCounters = () => {
        counters.forEach(counter => {
            const rect = counter.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0 && !counter.classList.contains('animated')) {
                counter.classList.add('animated');
                const target = +counter.getAttribute('data-target');
                const increment = target / speed;
                        
                const updateCount = () => {
                    const count = +counter.innerText;
                            
                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCount, 1);
                    } 
                    else {
                        counter.innerText = target;
                    }
                };    
                updateCount();
            }
        });
    };
            
    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Initial check
            
    // Parallax effect
    const parallaxElements = document.querySelectorAll('.parallax');
            
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
                
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
            
    // Active navigation highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
            
    window.addEventListener('scroll', () => {
        let current = '';
                
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
                    
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
                
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
            
    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
            
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
                    
            const filter = btn.getAttribute('data-filter');
                    
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } 
                else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
            
    // Form validation
    const contactForm = document.getElementById('contact-form');
            
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
                
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
                
        let isValid = true;
        let errorMessage = '';
                
        if (name === '') {
            isValid = false;
            errorMessage += 'Name is required.\n';
        }
                
        if (email === '') {
            isValid = false;
            errorMessage += 'Email is required.\n';
        } 
        else if (!isValidEmail(email)) {
            isValid = false;
            errorMessage += 'Please enter a valid email.\n';
        }
                
        if (subject === '') {
            isValid = false;
            errorMessage += 'Subject is required.\n';
        }
                
        if (message === '') {
            isValid = false;
            errorMessage += 'Message is required.\n';
        }
                
        if (isValid) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
            successMessage.textContent = 'Message sent successfully!';
            document.body.appendChild(successMessage);
                    
            // Reset form
            contactForm.reset();
                    
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        } 
        else {
            // Show error message
            const errorContainer = document.getElementById('error-message');
            errorContainer.textContent = errorMessage;
            errorContainer.style.display = 'block';
                    
            // Hide error message after 5 seconds
            setTimeout(() => {
                errorContainer.style.display = 'none';
            }, 5000);
        }
    });
            
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
            
    // Dark/Light mode toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
            
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
                
        // Update icon
        const icon = themeToggle.querySelector('i');
        if (body.classList.contains('light-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } 
        else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
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
            
    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
            
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
            
    lazyImages.forEach(img => imageObserver.observe(img));
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
        
mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});
        
// Close mobile menu when clicking on a link
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});
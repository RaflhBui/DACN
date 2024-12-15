// Add at the beginning of your index.js file
document.addEventListener('DOMContentLoaded', function() {
    // Wrap existing content
    const mainContent = document.querySelector('body > *:not(.loading-screen)');
    const wrapper = document.createElement('div');
    wrapper.classList.add('main-content');
    mainContent.parentNode.insertBefore(wrapper, mainContent);
    wrapper.appendChild(mainContent);

    // Create corner elements
    const corners = ['corner-1', 'corner-2', 'corner-3', 'corner-4'];
    corners.forEach(cornerClass => {
        const corner = document.createElement('div');
        corner.classList.add('corner', cornerClass);
        document.body.appendChild(corner);
    });

    // Loading animation sequence
    setTimeout(() => {
        const loadingBar = document.querySelector('.loading-bar');
        loadingBar.style.animation = 'loadingBar 1.5s ease forwards';

        setTimeout(() => {
            // Animate corners
            document.querySelectorAll('.corner').forEach((corner, index) => {
                corner.style.animation = `cornerExpand 0.5s ease forwards ${index * 0.1}s`;
            });

            // Fade out loading screen
            setTimeout(() => {
                document.querySelector('.loading-screen').style.animation = 'fadeOutLoading 0.5s ease forwards';
                
                // Show main content
                setTimeout(() => {
                    wrapper.classList.add('loaded');
                    // Remove loading screen after animation
                    document.querySelector('.loading-screen').remove();
                    document.querySelectorAll('.corner').forEach(corner => corner.remove());
                }, 500);
            }, 800);
        }, 1500);
    }, 100);


    // dark mode feat
    const modeSwitch = document.getElementById('mode-switch');
    const body = document.body;
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Function to set the theme
    function setTheme(theme) {
        if (theme === 'dark') {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            modeSwitch.checked = true;
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            modeSwitch.checked = false;
        }
        localStorage.setItem('theme', theme);
    }

    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme(prefersDarkScheme.matches ? 'dark' : 'light');
    }

    // Listen for toggle changes
    modeSwitch.addEventListener('change', function() {
        setTheme(this.checked ? 'dark' : 'light');
    });

    // Listen for system theme changes
    prefersDarkScheme.addListener((e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
});

// Scroll Animation
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('.main-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scroll Down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scroll Up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Smooth scroll for anchor links
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

    // Animation on scroll for feature cards
    const observerOptions = {
        threshold: 0.1
    };

    const featureCards = document.querySelectorAll('.feature-card');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Ngừng theo dõi sau khi đã hiển thị
            }
        });
    }, options);

    featureCards.forEach(card => {
        observer.observe(card);
    });

    const serviceCards = document.querySelectorAll('.service-card');
    const options1 = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer1 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Ngừng theo dõi sau khi đã hiển thị
            }
        });
    }, options);

    serviceCards.forEach(card => {
        observer.observe(card);
    });
    
});

const createMobileMenu = () => {
    const header = document.querySelector('.main-header');
    const nav = document.querySelector('.main-nav');
    
    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.classList.add('mobile-menu-toggle');
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    
    header.insertBefore(hamburger, nav);
    
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
};

document.querySelectorAll('.intro-card').forEach(card => {
    card.addEventListener('click', function() {
        const details = document.querySelector('.intro-details');
        const image = document.getElementById('intro-image');
        const description = document.getElementById('intro-description');

        // Get the data from the clicked card
        const dataContent = this.getAttribute('data-content');
        const dataImage = this.getAttribute('data-image');

        // Update the details section with the new content
        image.src = dataImage;
        description.textContent = dataContent;

        // Show the details section by changing display to flex
        details.style.display = 'flex';  // Set display to flex to show the content side by side
    });
});

window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    console.log('Token on load:', token); // Kiểm tra token khi tải trang
    const loginLink = document.getElementById('login-link');
    const logoutBtn = document.getElementById('logout-btn');

    if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Giải mã token JWT
        const username = decodedToken.sub || 'User'; // Giả sử username lưu trong trường 'sub' của token

        const loginBtn = document.querySelector('.cta-button a');
        if (loginBtn) {
            loginLink.innerHTML = username; // Thay thế "Đăng nhập" bằng tên người dùng
            loginLink.href = "/pages/Login.html"; // Không dẫn đến trang đăng nhập
            logoutBtn.style.display = 'block'; // Hiển thị nút đăng xuất
            console.log('Login link updated to:', username); // Kiểm tra cập nhật link đăng nhập
        }
    } else {
        loginLink.innerHTML = 'Đăng nhập';
        loginLink.href = '/pages/Login.html'; // Dẫn đến trang đăng nhập
        logoutBtn.style.display = 'none'; // Ẩn nút đăng xuất nếu không có token
        console.log('User not logged in, showing login link'); // Kiểm tra khi không có token
    }
});
document.getElementById('logout-link').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('token'); // Xóa token khỏi localStorage
    window.location.href = 'index.html'; // Chuyển hướng về trang chính
});
// Initialize mobile menu
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active state to navigation links based on scroll position
    const sections = document.querySelectorAll('.guideline-section');
    const navItems = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.offsetHeight;
            
            if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
    }
    
    // Update active navigation on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Add scroll-to-top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add search functionality
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search guidelines...';
    searchInput.className = 'search-input';
    
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.appendChild(searchInput);
    
    // Insert search after navigation
    const navigation = document.querySelector('.navigation .container');
    navigation.appendChild(searchContainer);
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const sections = document.querySelectorAll('.guideline-section');
        
        sections.forEach(section => {
            const content = section.textContent.toLowerCase();
            const policyItems = section.querySelectorAll('.policy-item');
            
            if (searchTerm === '') {
                section.style.display = 'block';
                policyItems.forEach(item => {
                    item.style.display = 'block';
                });
            } else if (content.includes(searchTerm)) {
                section.style.display = 'block';
                
                // Highlight matching policy items
                policyItems.forEach(item => {
                    const itemContent = item.textContent.toLowerCase();
                    if (itemContent.includes(searchTerm)) {
                        item.style.display = 'block';
                        item.style.backgroundColor = '#fef3c7';
                        item.style.borderLeftColor = '#f59e0b';
                    } else {
                        item.style.display = 'none';
                    }
                });
            } else {
                section.style.display = 'none';
            }
        });
    });
    
    // Add print functionality
    const printBtn = document.createElement('button');
    printBtn.innerHTML = '<i class="fas fa-print"></i> Print Guidelines';
    printBtn.className = 'print-btn';
    printBtn.addEventListener('click', function() {
        window.print();
    });
    
    const header = document.querySelector('.header .container');
    header.appendChild(printBtn);
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
});

// Add CSS for additional elements
const additionalStyles = `
    .scroll-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        width: 48px;
        height: 48px;
        font-size: 1rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-md);
    }
    
    .scroll-to-top.show {
        opacity: 1;
        visibility: visible;
    }
    
    .scroll-to-top:hover {
        background: var(--primary-dark);
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
    }
    
    .search-container {
        margin-top: var(--spacing-md);
        text-align: center;
    }
    
    .search-input {
        width: 100%;
        max-width: 400px;
        padding: var(--spacing-sm) var(--spacing-md);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-md);
        font-size: var(--font-size-base);
        outline: none;
        transition: border-color 0.2s ease;
        background: var(--bg-primary);
    }
    
    .search-input:focus {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }
    
    .print-btn {
        background: var(--bg-tertiary);
        color: var(--text-primary);
        border: 1px solid var(--border-color);
        padding: var(--spacing-sm) var(--spacing-md);
        border-radius: var(--radius-md);
        font-size: var(--font-size-sm);
        cursor: pointer;
        transition: all 0.2s ease;
        margin-top: var(--spacing-md);
        font-weight: 500;
    }
    
    .print-btn:hover {
        background: var(--primary-color);
        color: white;
        border-color: var(--primary-color);
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-color) !important;
        outline-offset: 2px !important;
    }
    
    @media (max-width: 768px) {
        .scroll-to-top {
            bottom: 15px;
            right: 15px;
            width: 44px;
            height: 44px;
            font-size: 0.9rem;
        }
        
        .search-input {
            font-size: var(--font-size-sm);
            padding: var(--spacing-xs) var(--spacing-sm);
        }
        
        .print-btn {
            font-size: var(--font-size-xs);
            padding: var(--spacing-xs) var(--spacing-sm);
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
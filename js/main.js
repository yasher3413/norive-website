document.addEventListener('DOMContentLoaded', function() {
    // Hero slider functionality (for future use)
    const dots = document.querySelectorAll('.dot');
    const activateDot = (index) => {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    };

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            activateDot(index);
            // Additional logic for changing slides would go here
        });
    });

    // Sticky header
    const header = document.querySelector('header');
    const scrollWatcher = () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', scrollWatcher);

    // Navigation highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const highlightNavOnScroll = () => {
        const scrollPosition = window.scrollY + 150; // Offset to trigger slightly before reaching section
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', highlightNavOnScroll);
    highlightNavOnScroll(); // Run once on page load

    // Dropdown toggle - Improved with better chevron
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        
        // Create a separate click area for the chevron
        const chevronClickArea = document.createElement('span');
        chevronClickArea.className = 'dropdown-toggle';
        
        // Remove the existing chevron from the link if any
        link.innerHTML = link.textContent.trim();
        
        // Add the chevron click area after the link
        link.parentNode.insertBefore(chevronClickArea, link.nextSibling);
        
        // Add click event to the chevron
        chevronClickArea.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle this dropdown
            dropdown.classList.toggle('active');
            
            // Close other dropdowns
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });
        });
        
        // Also allow clicking the link to navigate
        link.addEventListener('click', function(e) {
            // Don't prevent default here to allow navigation
            
            // Close other dropdowns
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            // Update active nav link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Flip card functionality
    const flipCards = document.querySelectorAll('.flip-card');
    
    flipCards.forEach(card => {
        card.addEventListener('click', function() {
            const inner = this.querySelector('.flip-card-inner');
            inner.style.transform = inner.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
        });
    });

    // Make flip card back titles smaller on all devices
    const flipCardBackTitles = document.querySelectorAll('.flip-card-back h3');
    
    flipCardBackTitles.forEach(title => {
        title.style.fontSize = '1.1rem';
        title.style.marginBottom = '0.8rem';
    });

    // Add page transition functionality with improved smoothness
    const pageLinks = document.querySelectorAll('a[href$=".html"]');
    
    // Create overlay for transition if it doesn't exist yet
    let transitionOverlay = document.querySelector('.page-transition-overlay');
    if (!transitionOverlay) {
        transitionOverlay = document.createElement('div');
        transitionOverlay.className = 'page-transition-overlay';
        document.body.appendChild(transitionOverlay);
        
        // Style for the overlay
        transitionOverlay.style.position = 'fixed';
        transitionOverlay.style.top = '0';
        transitionOverlay.style.left = '0';
        transitionOverlay.style.width = '100%';
        transitionOverlay.style.height = '100%';
        transitionOverlay.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        transitionOverlay.style.zIndex = '9999';
        transitionOverlay.style.opacity = '0';
        transitionOverlay.style.visibility = 'hidden';
        transitionOverlay.style.transition = 'opacity 0.3s ease-in-out';
        transitionOverlay.style.display = 'flex';
        transitionOverlay.style.justifyContent = 'center';
        transitionOverlay.style.alignItems = 'center';
        
        // Add logo to overlay
        const logoImg = document.createElement('img');
        logoImg.src = 'images/logo.png';
        logoImg.alt = 'Norivé';
        logoImg.style.maxWidth = '150px';
        logoImg.style.opacity = '0';
        logoImg.style.transform = 'scale(0.9)';
        logoImg.style.transition = 'opacity 0.3s ease-in-out, transform 0.4s ease-in-out';
        logoImg.className = 'transition-logo';
        transitionOverlay.appendChild(logoImg);
    }
    
    // Get logo reference
    const logoImg = document.querySelector('.transition-logo');
    
    // Preload the logo image to prevent flicker
    const preloadLogo = new Image();
    preloadLogo.src = 'images/logo.png';
    
    // Check if we're coming from another page using sessionStorage
    // This prevents the double animation
    const isNewPageLoad = !sessionStorage.getItem('pageTransition');
    
    if (isNewPageLoad && document.referrer.includes(window.location.hostname)) {
        // Show overlay immediately
        transitionOverlay.style.visibility = 'visible';
        transitionOverlay.style.opacity = '1';
        logoImg.style.opacity = '1';
        logoImg.style.transform = 'scale(1)';
        
        // Fade out smoothly
        setTimeout(() => {
            logoImg.style.opacity = '0';
            logoImg.style.transform = 'scale(1.1)';
            
            setTimeout(() => {
                transitionOverlay.style.opacity = '0';
                
                setTimeout(() => {
                    transitionOverlay.style.visibility = 'hidden';
                }, 300);
            }, 200);
        }, 400);
        
        // Clear the flag
        sessionStorage.removeItem('pageTransition');
    }
    
    // Add event listeners to links with improved timing
    pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Apply transition to all HTML links
            if (this.getAttribute('href').endsWith('.html')) {
                e.preventDefault();
                const targetHref = this.getAttribute('href');
                
                // Set flag to prevent double animation
                sessionStorage.setItem('pageTransition', 'true');
                
                // Ensure the overlay is ready
                requestAnimationFrame(() => {
                    // Show overlay
                    transitionOverlay.style.visibility = 'visible';
                    
                    // Use requestAnimationFrame for smoother animation
                    requestAnimationFrame(() => {
                        transitionOverlay.style.opacity = '1';
                        
                        // Animate logo after overlay is visible
                        setTimeout(() => {
                            logoImg.style.opacity = '1';
                            logoImg.style.transform = 'scale(1)';
                        }, 50);
                        
                        // Navigate after transition
                        setTimeout(() => {
                            window.location.href = targetHref;
                        }, 600);
                    });
                });
            }
        });
    });
});
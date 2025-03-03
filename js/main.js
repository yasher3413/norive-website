document.addEventListener('DOMContentLoaded', function() {
    // Get the hero section
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Store original hero state
    const originalContent = hero.innerHTML;
    const originalBackground = window.getComputedStyle(hero).backgroundImage;
    
    // Product slides data
    const productSlides = [
        {
            title: "Norivé for the Mind",
            heading: "Stimulates the Mind.<br>with Sage + Peppermint.",
            description: "Norivé is appreciated worldwide by students, busy professionals and travellers on long journeys.",
            image: "images/bubble-mind.png",
            ctaLink: "#mind",
            ctaText: "Learn more"
        },
        {
            title: "Norivé for the Body",
            heading: "Energizes the Body.<br>with Ginseng + Ginger.",
            description: "Ideal for athletes, fitness enthusiasts and active individuals seeking natural energy.",
            image: "images/bubble-body.png",
            ctaLink: "#body",
            ctaText: "Learn more"
        },
        {
            title: "Norivé for the Soul",
            heading: "Calms the Soul.<br>with Lavender + Chamomile.",
            description: "Perfect for stress relief, relaxation and peaceful sleep at the end of a long day.",
            image: "images/bubble-soul.png",
            ctaLink: "#soul",
            ctaText: "Learn more"
        }
    ];
    
    // Create a single navigation container
    const navContainer = document.createElement('div');
    navContainer.className = 'slider-nav';
    navContainer.innerHTML = `
        <div class="slider-dots">
            <span class="dot active" data-index="0"></span>
            <span class="dot" data-index="1"></span>
            <span class="dot" data-index="2"></span>
            <span class="dot" data-index="3"></span>
        </div>
    `;
    
    // Remove any existing navigation
    const existingNav = document.querySelector('.slider-nav');
    if (existingNav) {
        existingNav.remove();
    }
    
    // Add the navigation to the hero section
    hero.appendChild(navContainer);
    
    // Style the navigation and dots
    const dotStyle = document.createElement('style');
    dotStyle.textContent = `
        .slider-nav {
            position: absolute;
            bottom: 20px;
            left: 0;
            right: 0;
            display: flex;
            justify-content: center;
            z-index: 100;
            width: 100%;
        }
        
        .slider-dots {
            display: flex;
            gap: 12px;
            justify-content: center;
        }
        
        .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: rgba(200, 200, 200, 0.5);
            border: 1px solid rgba(0, 0, 0, 0.1);
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .dot.active {
            background-color: #4ECB71;
            transform: scale(1.2);
        }
        
        .hero {
            position: relative;
        }
        
        .product-slide {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            text-align: center;
            height: 100%;
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
        }
        
        .slide-image {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 10px;
            width: 100%;
            max-height: 40vh;
        }
        
        .slide-image img {
            max-width: 80%;
            max-height: 200px;
            object-fit: contain;
        }
        
        .slide-content {
            padding: 0 1rem;
            width: 100%;
            text-align: center;
            box-sizing: border-box;
        }
        
        .slide-content h2 {
            color: #4ECB71;
            font-size: 1rem;
            margin-bottom: 0.3rem;
            position: relative;
            display: inline-block;
        }
        
        .slide-content h2:after {
            content: '';
            position: absolute;
            bottom: -3px;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: #4ECB71;
        }
        
        .slide-content h1 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
            line-height: 1.2;
        }
        
        .slide-content p {
            font-size: 0.9rem;
            margin-bottom: 1rem;
            max-width: 90%;
            margin-left: auto;
            margin-right: auto;
        }
        
        .cta-button {
            display: inline-block;
            background-color: #4ECB71;
            color: white;
            padding: 0.6rem 1.5rem;
            border-radius: 50px;
            font-weight: 500;
            font-size: 0.9rem;
            transition: background-color 0.3s;
            text-decoration: none;
        }
        
        .cta-button:hover {
            background-color: #3da65b;
        }
        
        @media (min-width: 768px) {
            .product-slide {
                flex-direction: row;
                text-align: left;
                padding: 0 5%;
                justify-content: space-between;
            }
            
            .slide-image {
                flex: 1;
                max-width: 45%;
                margin-bottom: 0;
                max-height: none;
            }
            
            .slide-image img {
                max-width: 100%;
                max-height: 400px;
            }
            
            .slide-content {
                flex: 1;
                padding: 2rem;
                max-width: 50%;
                text-align: left;
            }
            
            .slide-content h1 {
                font-size: 2.5rem;
                margin-bottom: 1rem;
            }
            
            .slide-content h2 {
                font-size: 1.2rem;
                margin-bottom: 0.5rem;
            }
            
            .slide-content p {
                font-size: 1.1rem;
                margin-bottom: 2rem;
                max-width: 100%;
            }
            
            .slide-content h2:after {
                left: 0;
                transform: none;
                bottom: -5px;
            }
            
            .cta-button {
                padding: 0.8rem 2rem;
                font-size: 1rem;
            }
        }
    `;
    document.head.appendChild(dotStyle);
    
    // Get the dots
    const dots = navContainer.querySelectorAll('.dot');
    
    // Function to show a slide
    function showSlide(index) {
        // Update active dot
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        if (index === 0) {
            // Restore original hero
            hero.innerHTML = originalContent;
            hero.style.backgroundImage = originalBackground;
            hero.style.backgroundColor = '';
            
            // Remove any existing slider-dots inside the hero content
            const innerDots = hero.querySelector('.hero-content .slider-dots');
            if (innerDots) {
                innerDots.remove();
            }
            
            // Re-add our navigation
            hero.appendChild(navContainer);
        } else {
            // Show product slide
            const product = productSlides[index - 1]; // Adjust index for product array
            
            // Set white background
            hero.style.backgroundImage = 'none';
            hero.style.backgroundColor = 'white';
            
            // Create product slide HTML
            hero.innerHTML = `
                <div class="product-slide">
                    <div class="slide-image">
                        <img src="${product.image}" alt="${product.title}">
                    </div>
                    <div class="slide-content">
                        <h2>${product.title}</h2>
                        <h1>${product.heading}</h1>
                        <p>${product.description}</p>
                        <a href="${product.ctaLink}" class="cta-button">${product.ctaText}</a>
                    </div>
                </div>
            `;
            
            // Re-add our navigation
            hero.appendChild(navContainer);
        }
    }
    
    // Add click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // Remove any existing dots inside the hero content to avoid duplication
    const initialDots = hero.querySelector('.hero-content .slider-dots');
    if (initialDots) {
        initialDots.remove();
    }

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
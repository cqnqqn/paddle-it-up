/**
 * San Marcos Pickleball - Main JavaScript
 * ========================================
 *
 * Features:
 * - Smooth scroll for anchor links
 * - Mobile menu toggle
 * - Sticky navigation on scroll
 * - Fade-in animations on scroll
 */

(function () {
    'use strict';

    // ============================================
    // DOM Elements
    // ============================================

    const header = document.getElementById('header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
    const fadeElements = document.querySelectorAll('.fade-in');

    // ============================================
    // Sticky Navigation
    // ============================================

    /**
     * Adds/removes sticky class based on scroll position
     */
    function handleStickyNav() {
        const scrollY = window.scrollY || window.pageYOffset;
        const stickyThreshold = 100;

        if (scrollY > stickyThreshold) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }

    // ============================================
    // Mobile Menu
    // ============================================

    /**
     * Opens the mobile menu
     */
    function openMobileMenu() {
        mobileMenuToggle.classList.add('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'true');
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    /**
     * Closes the mobile menu
     */
    function closeMobileMenu() {
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    /**
     * Toggles the mobile menu open/closed
     */
    function toggleMobileMenu() {
        const isOpen = mobileMenu.classList.contains('active');

        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    // ============================================
    // Smooth Scroll
    // ============================================

    /**
     * Smoothly scrolls to an element with offset for fixed header
     * @param {string} targetId - The ID of the target element (without #)
     */
    function smoothScrollTo(targetId) {
        const targetElement = document.getElementById(targetId);

        if (!targetElement) return;

        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = targetPosition - headerHeight;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    /**
     * Handles click on anchor links
     * @param {Event} event - The click event
     */
    function handleAnchorClick(event) {
        const href = this.getAttribute('href');

        // Only handle internal anchor links
        if (!href || href === '#') return;

        const targetId = href.substring(1); // Remove the #
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            event.preventDefault();
            smoothScrollTo(targetId);

            // Close mobile menu if open
            if (mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        }
    }

    // ============================================
    // Scroll Animations
    // ============================================

    /**
     * Checks if an element is in the viewport
     * @param {HTMLElement} element - The element to check
     * @param {number} offset - Offset from bottom of viewport (default: 100)
     * @returns {boolean}
     */
    function isInViewport(element, offset = 100) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        return rect.top <= windowHeight - offset;
    }

    /**
     * Handles fade-in animations on scroll
     */
    function handleScrollAnimations() {
        fadeElements.forEach(function (element) {
            if (isInViewport(element) && !element.classList.contains('visible')) {
                element.classList.add('visible');
            }
        });
    }

    // ============================================
    // Keyboard Navigation
    // ============================================

    /**
     * Handles keyboard events for accessibility
     * @param {KeyboardEvent} event
     */
    function handleKeyboard(event) {
        // Close mobile menu on Escape key
        if (event.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
            mobileMenuToggle.focus();
        }
    }

    // ============================================
    // Throttle Function (Performance)
    // ============================================

    /**
     * Throttles a function to limit how often it can be called
     * @param {Function} func - The function to throttle
     * @param {number} limit - Time limit in milliseconds
     * @returns {Function}
     */
    function throttle(func, limit) {
        let inThrottle;

        return function () {
            const args = arguments;
            const context = this;

            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;

                setTimeout(function () {
                    inThrottle = false;
                }, limit);
            }
        };
    }

    // ============================================
    // Event Listeners
    // ============================================

    /**
     * Initialize all event listeners
     */
    function initEventListeners() {
        // Scroll events (throttled for performance)
        const throttledScrollHandler = throttle(function () {
            handleStickyNav();
            handleScrollAnimations();
        }, 16); // ~60fps

        window.addEventListener('scroll', throttledScrollHandler, { passive: true });

        // Mobile menu toggle
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        }

        // Mobile menu overlay click to close
        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', closeMobileMenu);
        }

        // Mobile nav links - close menu on click
        mobileNavLinks.forEach(function (link) {
            link.addEventListener('click', handleAnchorClick);
        });

        // All anchor links - smooth scroll
        allAnchorLinks.forEach(function (link) {
            link.addEventListener('click', handleAnchorClick);
        });

        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboard);

        // Handle resize - close mobile menu if viewport becomes desktop size
        window.addEventListener('resize', throttle(function () {
            if (window.innerWidth >= 768 && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        }, 250));
    }

    // ============================================
    // Initialize
    // ============================================

    /**
     * Initialize the application
     */
    function init() {
        // Set up event listeners
        initEventListeners();

        // Run initial checks
        handleStickyNav();
        handleScrollAnimations();

        // Log successful initialization (remove in production)
        console.log('San Marcos Pickleball website initialized successfully.');
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

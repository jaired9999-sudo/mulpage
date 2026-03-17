/**
 * MAISON NOIR — Core Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initScrollReveal();
    initNavbar();
    initWishlist();
});

// 1. CUSTOM CURSOR LOGIC
function initCursor() {
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    
    if(!cursor || !ring) return;

    let mx = -100, my = -100, rx = -100, ry = -100;

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
    });

    function animateCursor() {
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
        cursor.style.left = mx + 'px';
        cursor.style.top = my + 'px';
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on interactive elements
    const hoverables = 'a, button, .product-card, .category-card, input, textarea';
    document.querySelectorAll(hoverables).forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            ring.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            ring.classList.remove('hover');
        });
    });
}

// 2. NAVBAR SCROLL EFFECT
function initNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// 3. SCROLL REVEAL (INTERSECTION OBSERVER)
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    reveals.forEach(r => observer.observe(r));
}

// 4. TOAST NOTIFICATIONS
function showToast(msg = 'Added to bag ✓') {
    const t = document.getElementById('toast');
    if(!t) return;
    
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2800);
}

// 5. WISHLIST TOGGLE
function initWishlist() {
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const isLiked = btn.textContent.trim() === '♥';
            btn.textContent = isLiked ? '♡' : '♥';
            btn.style.background = isLiked ? '' : 'var(--gold)';
            btn.style.color = isLiked ? '' : 'var(--black)';
            if (!isLiked) showToast('Saved to wishlist ♥');
        });
    });
}

// 6. MOBILE MENU PLACEHOLDER
function toggleMenu() {
    // This can be expanded to show a full-screen mobile overlay
    console.log("Mobile menu triggered");
}

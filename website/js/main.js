/**
 * TOMATONOODLE - Main JavaScript
 * Interactive features for the Chinese tomato noodle soup archive
 */

document.addEventListener('DOMContentLoaded', () => {
    // ---- Navigation ----
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // Scroll effect for nav
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ---- Recipe Tabs ----
    const tabBtns = document.querySelectorAll('.tab-btn');
    const recipeCards = document.querySelectorAll('.recipe-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active tab
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter cards
            const category = btn.dataset.tab;

            recipeCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    // Trigger animation
                    card.style.animation = 'none';
                    card.offsetHeight; // Trigger reflow
                    card.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ---- Region Explorer ----
    const regionCards = document.querySelectorAll('.region-card');
    const regionDetail = document.getElementById('regionDetail');

    // Region data
    const regionData = {
        chengdu: {
            title: '成都 Chengdu Style',
            info: [
                { label: 'Signature', value: 'Whole fried egg with runny yolk' },
                { label: 'Noodle', value: 'Fresh alkaline (碱水面)' },
                { label: 'Tomato', value: 'Cooked to thick paste (出沙)' },
                { label: 'Origin', value: 'Huaxing Street, Qing Dynasty' },
                { label: 'Best Time', value: '11 PM - 2 AM (late-night culture)' }
            ],
            story: 'Huaxing Street\'s fried egg noodles date back to the Qing Dynasty, when vendors first served this dish with copper pots and tripods. The late-night culture revived in the 1980s made it famous again among students, taxi drivers, and lovers ending their dates.'
        },
        beijing: {
            title: '北京 Beijing Style',
            info: [
                { label: 'Signature', value: 'Thick gravy (打卤) poured over' },
                { label: 'Noodle', value: 'Hand-cut (刀切面)' },
                { label: 'Tomato', value: 'Cooked to thick gravy' },
                { label: 'Egg', value: 'Egg drop ribbons (蛋花)' },
                { label: 'Character', value: 'Hearty, substantial' }
            ],
            story: 'Beijing\'s version draws from the northern 打卤面 tradition - thick, savory gravy ladled over chewy noodles. The tomato adds brightness to the traditionally rich northern flavor profile.'
        },
        shanghai: {
            title: '上海 Shanghai Style',
            info: [
                { label: 'Signature', value: 'Light, delicate, slightly sweet' },
                { label: 'Noodle', value: 'Fine noodles (龙须面, 挂面)' },
                { label: 'Tomato', value: 'Lighter cooking, chunks visible' },
                { label: 'Broth', value: 'Clear, refined' },
                { label: 'Character', value: 'Elegant, balanced' }
            ],
            story: 'Shanghai\'s cosmopolitan history shows in this refined version. Among the first to adopt tomatoes in the 1920s-30s, Shanghai cooks created a lighter interpretation that balances Western ingredient with Jiangnan delicacy.'
        },
        hongkong: {
            title: '香港 Hong Kong Style',
            info: [
                { label: 'Signature', value: 'Macaroni (通粉) option' },
                { label: 'Noodle', value: 'Egg noodles or macaroni' },
                { label: 'Additions', value: 'May include spam, ham' },
                { label: 'Setting', value: 'Cha chaan teng (茶餐廳)' },
                { label: 'Character', value: 'Fusion comfort food' }
            ],
            story: 'Hong Kong\'s cha chaan teng culture created a unique fusion: sometimes using Italian macaroni instead of Chinese noodles, often adding spam or ham. It\'s comfort food for a city that bridges East and West.'
        },
        xian: {
            title: '西安 Xi\'an Style',
            info: [
                { label: 'Signature', value: 'Wide, hand-pulled noodles' },
                { label: 'Noodle', value: 'Biangbiang面, 扯面' },
                { label: 'Technique', value: 'Oil-splashed (油泼) option' },
                { label: 'Width', value: 'Belt-wide noodles' },
                { label: 'Character', value: 'Bold, substantial' }
            ],
            story: 'Xi\'an applies its famous wide noodle tradition to tomato egg. The biangbiang noodles - named for the sound of dough slapping - create a hearty, chewy base for the tomato sauce.'
        },
        shandong: {
            title: '山东 Shandong Style',
            info: [
                { label: 'Signature', value: 'Hand-pulled noodles (拉面)' },
                { label: 'Tomato', value: 'Chunky, less cooked' },
                { label: 'Egg', value: 'Large scrambled curds' },
                { label: 'Aromatics', value: 'Garlic, scallion prominent' },
                { label: 'Character', value: 'Robust, aromatic' }
            ],
            story: 'Shandong\'s hand-pulled noodle tradition meets tomato-egg in a robust, satisfying combination. The emphasis on garlic and scallion adds aromatic depth to the dish.'
        },
        xinjiang: {
            title: '新疆 Xinjiang Style',
            info: [
                { label: 'Signature', value: 'Laghman (拉条子) noodles' },
                { label: 'Protein', value: 'Often lamb (羊肉)' },
                { label: 'Spices', value: 'Cumin, peppers' },
                { label: 'Tomato', value: 'Heavy use, stewed' },
                { label: 'Character', value: 'Central Asian influence' }
            ],
            story: 'Xinjiang\'s version reflects its Central Asian heritage. The pulled laghman noodles, lamb, and cumin create a distinctly different flavor profile. Fun fact: Xinjiang produces over 70% of China\'s tomatoes.'
        },
        taiwan: {
            title: '台湾 Taiwan Style',
            info: [
                { label: 'Signature', value: 'Beef noodle soup (牛肉面)' },
                { label: 'Technique', value: 'Red-braised (红烧)' },
                { label: 'Tomato', value: 'In braising base' },
                { label: 'Origin', value: 'KMT veterans, 1950s' },
                { label: 'Character', value: 'Rich, meaty' }
            ],
            story: 'Taiwan\'s famous beef noodle soup uses tomato in the red-braised base. Created by mainland veterans in the 1950s, it\'s become Taiwan\'s signature noodle dish - a different but related branch of the tomato-noodle family.'
        },
        northeast: {
            title: '东北 Northeast Style',
            info: [
                { label: 'Signature', value: 'Generous portions' },
                { label: 'Noodle', value: 'Thick, chewy (东北大面)' },
                { label: 'Tomato', value: 'Long-cooked, sweet' },
                { label: 'Broth', value: 'Rich, often with pork stock' },
                { label: 'Character', value: 'Hearty, warming' }
            ],
            story: 'The Northeast brings its tradition of generous, warming food to tomato noodles. Larger portions, heartier broths, and thick noodles are designed to fuel through harsh winters.'
        },
        diaspora: {
            title: '海外 Diaspora Style',
            info: [
                { label: 'Signature', value: 'Adapted to local ingredients' },
                { label: 'Noodle', value: 'Whatever available' },
                { label: 'Tomato', value: 'Local varieties' },
                { label: 'Adjustments', value: 'Substitute as needed' },
                { label: 'Character', value: 'Nostalgic, resourceful' }
            ],
            story: 'For Chinese abroad, this is often the first dish learned - simple ingredients available anywhere. Each family adapts to local tomatoes, available noodles, and personal memory of home.'
        }
    };

    regionCards.forEach(card => {
        card.addEventListener('click', () => {
            // Update active card
            regionCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            // Update detail panel
            const region = card.dataset.region;
            const data = regionData[region];

            if (data) {
                regionDetail.innerHTML = `
                    <div class="region-detail-content">
                        <h3>${data.title}</h3>
                        <div class="region-info">
                            ${data.info.map(item => `
                                <div class="info-item">
                                    <span class="info-label">${item.label}</span>
                                    <span class="info-value">${item.value}</span>
                                </div>
                            `).join('')}
                        </div>
                        <p class="region-story">${data.story}</p>
                    </div>
                `;
            }
        });
    });

    // ---- Smooth Scroll ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = nav.offsetHeight;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---- Intersection Observer for Animations ----
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.section-header, .recipe-card, .timeline-item, .technique-card, .archive-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ---- Recipe Card Click Handler ----
    recipeCards.forEach(card => {
        card.addEventListener('click', () => {
            // In a full implementation, this would open a modal or navigate to recipe
            const recipeName = card.querySelector('h3').textContent;
            console.log(`Opening recipe: ${recipeName}`);
            // Could show a modal with full recipe details
        });
    });

    // ---- Timeline Hover Effects ----
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.querySelector('.timeline-marker').style.transform = 'scale(1.3)';
        });
        item.addEventListener('mouseleave', () => {
            if (!item.classList.contains('highlight')) {
                item.querySelector('.timeline-marker').style.transform = 'scale(1)';
            }
        });
    });

    // ---- Technique Video Placeholder ----
    const videoPlaceholder = document.querySelector('.technique-video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', () => {
            // In a full implementation, this would open a video modal
            console.log('Opening technique video');
            alert('Video coming soon! Check the Video Library for tutorials.');
        });
    }

    // ---- Initialize first region as active ----
    if (regionCards.length > 0) {
        regionCards[0].classList.add('active');
    }

    // ---- Console Easter Egg ----
    console.log('%c🍜 Welcome to Tomatonoodle! 🍅', 'font-size: 24px; font-weight: bold;');
    console.log('%c番茄鸡蛋面 - 一碗面，一段历史，一份乡愁', 'font-size: 14px; color: #E53935;');
    console.log('%cContribute at: https://github.com/MattHJensen/Tomatonoodle', 'font-size: 12px;');
});

// ---- Lazy loading for images (if added later) ----
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// ---- Keyboard Navigation ----
document.addEventListener('keydown', (e) => {
    // ESC closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// ---- Performance: Debounce scroll events ----
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ---- Share functionality (for future use) ----
function shareRecipe(recipeName) {
    if (navigator.share) {
        navigator.share({
            title: `${recipeName} - Tomatonoodle`,
            text: `Check out this ${recipeName} recipe from the Tomatonoodle archive!`,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
    }
}

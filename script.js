document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // AOS (Animate On Scroll) 初期化
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100,
        disable: window.innerWidth < 768
    });

    // ヘッダースクロール効果
    const header = document.querySelector('.header');
    const backToTopButton = document.querySelector('.back-to-top');
    
    let lastScrollTop = 0;
    const scrollThreshold = 50;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > scrollThreshold) {
            header.classList.add('scrolled');
            backToTopButton.classList.add('active');
            
            // ヘッダーの表示/非表示アニメーション
            if (scrollTop > lastScrollTop) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.classList.remove('scrolled');
            backToTopButton.classList.remove('active');
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // モバイルナビゲーション
    const navToggle = document.querySelector('.nav-toggle');
    const navMobile = document.querySelector('.nav-mobile');
    const body = document.body;
    
    function toggleNav() {
        navToggle.classList.toggle('active');
        navMobile.classList.toggle('active');
        body.classList.toggle('nav-open');
    }
    
    navToggle.addEventListener('click', toggleNav);
    
    // ナビゲーションリンクをクリックしたらモバイルメニューを閉じる
    const navLinks = document.querySelectorAll('.nav-mobile a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (body.classList.contains('nav-open')) {
                toggleNav();
            }
        });
    });

    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    // ニュース・スライダー
    const newsSlider = document.querySelector('.publications-slider');
    if (newsSlider && typeof Swiper !== 'undefined') {
        new Swiper(newsSlider, {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            breakpoints: {
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }

    // 画像ギャラリーのライトボックス
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            
            const lightboxImage = document.createElement('img');
            lightboxImage.src = this.src;
            lightboxImage.alt = this.alt;
            
            lightbox.appendChild(lightboxImage);
            document.body.appendChild(lightbox);
            
            lightbox.addEventListener('click', function() {
                this.remove();
            });
            
            // ESCキーで閉じる
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    lightbox.remove();
                }
            });
        });
    });

    // トップに戻るボタン
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // スクロールアニメーション
    const animateElements = document.querySelectorAll('.animate');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // 言語切り替え
    const enTexts = document.querySelectorAll('.en-text');
    const langButton = document.querySelector('.lang-toggle');
    
    if (langButton) {
        langButton.addEventListener('click', function() {
            enTexts.forEach(text => {
                text.classList.toggle('show');
            });
            this.textContent = this.textContent === '英語を表示' ? '日本語のみ表示' : '英語を表示';
        });
    }

    // タイムラインアニメーション
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });

    // 研究カードのホバーエフェクト
    const researchCards = document.querySelectorAll('.research-card');
    researchCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            researchCards.forEach(c => {
                if (c !== this) {
                    c.style.opacity = '0.7';
                    c.style.transform = 'scale(0.95)';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            researchCards.forEach(c => {
                c.style.opacity = '1';
                c.style.transform = '';
            });
        });
    });

    // 画面サイズ変更時の対応
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768) {
                navToggle.classList.remove('active');
                navMobile.classList.remove('active');
                body.classList.remove('nav-open');
            }
            AOS.refresh();
        }, 250);
    });

    // ページロード時のフェードイン
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        const heroElements = document.querySelectorAll('.hero h1, .hero-subtitle, .hero-description, .hero-buttons');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('fade-in');
            }, index * 300);
        });
    });

    // プログレスバー
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        progressBar.style.width = scrolled + '%';
    });

    // ページを閉じる前の確認（フォーム送信中の場合など、オプション）
    /*
    window.addEventListener('beforeunload', function(e) {
        if (document.querySelector('form.submitting')) {
            e.preventDefault();
            e.returnValue = '送信中です。本当にページを離れますか？';
        }
    });
    */

    // 初回訪問時のウェルカムメッセージ（オプション）
    if (!sessionStorage.getItem('visited')) {
        sessionStorage.setItem('visited', 'true');
        
        setTimeout(() => {
            const welcomePopup = document.createElement('div');
            welcomePopup.className = 'welcome-popup';
            welcomePopup.innerHTML = `
                <div class="welcome-popup-content">
                    <h3>加地研究室へようこそ！</h3>
                    <p>このサイトでは、私たちの研究活動や成果について紹介しています。</p>
                    <button class="btn btn-primary">閉じる</button>
                </div>
            `;
            
            document.body.appendChild(welcomePopup);
            
            setTimeout(() => {
                welcomePopup.classList.add('show');
            }, 100);
            
            welcomePopup.querySelector('button').addEventListener('click', function() {
                welcomePopup.classList.remove('show');
                setTimeout(() => {
                    welcomePopup.remove();
                }, 500);
            });
        }, 2000);
    }

    // ニュースの「すべてのニュースを見る」ボタン
    const loadMoreNewsBtn = document.getElementById('loadMoreNews');
    const olderNews = document.getElementById('olderNews');
    
    if (loadMoreNewsBtn && olderNews) {
        loadMoreNewsBtn.addEventListener('click', function() {
            olderNews.classList.toggle('hidden');
            this.textContent = olderNews.classList.contains('hidden') ? 'すべてのニュースを見る →' : 'ニュースを閉じる ←';
        });
    }
});
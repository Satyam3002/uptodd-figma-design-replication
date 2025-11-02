document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');

    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        const navLinkElements = navLinks.querySelectorAll('.nav-link');
        navLinkElements.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !hamburgerMenu.contains(e.target)) {
                hamburgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const videoCardsContainer = document.getElementById('video-cards-carousel');
    const videoCards = videoCardsContainer ? Array.from(videoCardsContainer.children) : [];
    const videoPrevBtn = document.querySelector('.video-carousel-wrapper .prev-btn');
    const videoNextBtn = document.querySelector('.video-carousel-wrapper .next-btn');

    let currentVideoIndex = 0;
    
    function getCardsToShow() {
        if (window.innerWidth <= 768) {
            return 1;
        } else if (window.innerWidth <= 1024) {
            return 2;
        } else {
            return 3;
        }
    }
    
    let cardsToShow = getCardsToShow();

    function updateVideoCarousel() {
        if (!videoCardsContainer || videoCards.length === 0) return;
        
        const cardWidth = videoCards[0].offsetWidth;
        const gapStyle = window.getComputedStyle(videoCardsContainer).gap;
        const gap = gapStyle ? parseFloat(gapStyle) : (window.innerWidth <= 768 ? 24 : 48);
        const moveDistance = cardWidth + gap;
        const translateX = -currentVideoIndex * moveDistance;
        
        videoCardsContainer.style.transform = `translateX(${translateX}px)`;
    }

    function nextVideoCard() {
        if (videoCards.length === 0) return;
        cardsToShow = getCardsToShow();
        const maxIndex = Math.max(0, videoCards.length - cardsToShow);
        if (maxIndex === 0) return;
        
        currentVideoIndex++;
        if (currentVideoIndex > maxIndex) {
            currentVideoIndex = 0;
        }
        updateVideoCarousel();
    }

    function prevVideoCard() {
        if (videoCards.length === 0) return;
        cardsToShow = getCardsToShow();
        const maxIndex = Math.max(0, videoCards.length - cardsToShow);
        if (maxIndex === 0) return;
        
        currentVideoIndex--;
        if (currentVideoIndex < 0) {
            currentVideoIndex = maxIndex;
        }
        updateVideoCarousel();
    }

    if (videoNextBtn) {
        videoNextBtn.addEventListener('click', nextVideoCard);
    }

    if (videoPrevBtn) {
        videoPrevBtn.addEventListener('click', prevVideoCard);
    }

    if (videoCardsContainer) {
        updateVideoCarousel();
        window.addEventListener('resize', () => {
            cardsToShow = getCardsToShow();
            const maxIndex = Math.max(0, videoCards.length - cardsToShow);
            if (currentVideoIndex > maxIndex) {
                currentVideoIndex = 0;
            }
            updateVideoCarousel();
        });
    }
});

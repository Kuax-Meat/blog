document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    const fontIncrease = document.getElementById('font-increase');
    const fontDecrease = document.getElementById('font-decrease');
    const copyUrlBtn = document.getElementById('copy-url');
    const themeToggle = document.getElementById('theme-toggle'); // 테마 버튼 요소 가져오기
    const toolbar = document.getElementById('toolbar');

    // --- 툴바 스크롤 이벤트 ---
    if (toolbar) {
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop && scrollTop > 150) {
                toolbar.classList.add('hidden');
            } else {
                toolbar.classList.remove('hidden');
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, false);
    }

    // --- 폰트 크기 조절 ---
    const FONT_STEP = 0.5;
    const MIN_FONT_SIZE = 14;
    const MAX_FONT_SIZE = 20;
    const getCurrentFontSize = () => parseFloat(getComputedStyle(html).fontSize);

    if (fontIncrease) {
        fontIncrease.addEventListener('click', () => {
            const currentSize = getCurrentFontSize();
            if (currentSize < MAX_FONT_SIZE) {
                html.style.fontSize = `${currentSize + FONT_STEP}px`;
            }
        });
    }

    if (fontDecrease) {
        fontDecrease.addEventListener('click', () => {
            const currentSize = getCurrentFontSize();
            if (currentSize > MIN_FONT_SIZE) {
                html.style.fontSize = `${currentSize - FONT_STEP}px`;
            }
        });
    }

    // --- URL 복사 기능 ---
    if (copyUrlBtn) {
        copyUrlBtn.addEventListener('click', () => {
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                const originalIcon = copyUrlBtn.innerHTML;
                copyUrlBtn.innerHTML = '✓';
                setTimeout(() => { copyUrlBtn.innerHTML = originalIcon; }, 1500);
            }).catch(err => { console.error('URL 복사에 실패했습니다.', err); });
        });
    }

    // --- [수정] 테마 전환 기능 ---
    if (themeToggle) {
        const themeIconContainer = document.getElementById('theme-toggle');
        // SVG 아이콘 정의
        const sunIcon = `<svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m4.93 19.07 1.41-1.41"></path><path d="m17.66 6.34 1.41-1.41"></path></svg>`;
        const moonIcon = `<svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>`;

        // 테마 적용 함수
        const applyTheme = (theme) => {
            if (theme === 'dark') {
                html.classList.add('dark-mode');
                changeGiscusTheme('noborder_gray');
                if (themeIconContainer) themeIconContainer.innerHTML = sunIcon;
            } else {
                html.classList.remove('dark-mode');
                changeGiscusTheme('light');
                if (themeIconContainer) themeIconContainer.innerHTML = moonIcon;
            }
        };

        // 테마 전환 버튼 클릭 이벤트
        themeToggle.addEventListener('click', () => {
            const newTheme = html.classList.contains('dark-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });

        // 페이지 로드 시 테마 결정
        const initialTheme = getCurrentTheme();
        applyTheme(initialTheme);
    }

    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeButton = lightbox.querySelector('.lightbox-close');
    const prevButton = lightbox.querySelector('.lightbox-prev');
    const nextButton = lightbox.querySelector('.lightbox-next');

    let galleryImages = [];
    let currentIndex = 0;

    // 포스트 내의 모든 이미지 요소를 찾아서 갤러리에 추가
    document.querySelectorAll('.post-image-wrapper').forEach((wrapper, index) => {
        galleryImages.push({
            src: wrapper.dataset.src,
            caption: wrapper.dataset.caption
        });

        wrapper.addEventListener('click', () => {
            currentIndex = index;
            showImage(currentIndex);
            lightbox.classList.add('visible');
        });
    });

    function showImage(index) {
        const imgData = galleryImages[index];
        lightboxImage.src = imgData.src;
        lightboxCaption.textContent = imgData.caption || '';

        // 이전/다음 버튼 표시 여부 제어
        prevButton.style.display = (index === 0) ? 'none' : 'block';
        nextButton.style.display = (index === galleryImages.length - 1) ? 'none' : 'block';
    }

    function showNextImage() {
        if (currentIndex < galleryImages.length - 1) {
            currentIndex++;
            showImage(currentIndex);
        }
    }

    function showPrevImage() {
        if (currentIndex > 0) {
            currentIndex--;
            showImage(currentIndex);
        }
    }

    function closeLightbox() {
        lightbox.classList.remove('visible');
    }

    // 이벤트 리스너 등록
    closeButton.addEventListener('click', closeLightbox);
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);

    // 키보드 네비게이션
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('visible')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'ArrowLeft') showPrevImage();
    });

    // 오버레이 클릭 시 닫기 (이미지나 버튼 제외)
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Giscus에 메시지를 보내는 함수
    function sendMessageToGiscus(message) {
        const iframe = document.querySelector('iframe.giscus-frame');
        if (iframe) {
            iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
        } else {
            console.log('Giscus iframe not found. Waiting for it to load...');
        }
    }

    // 테마를 변경하고 LocalStorage에 저장하는 함수
    function changeGiscusTheme(theme) {
        sendMessageToGiscus({ setConfig: { theme: theme } });
    }

    // Giscus로부터 오는 메시지를 감지
    window.addEventListener('message', event => {
        // Giscus에서 보낸 메시지가 아니면 무시
        if (event.origin !== 'https://giscus.app') {
            return;
        }

        console.log(event);
        // Giscus가 로드되었다는 신호(discussion 데이터)가 포함된 메시지인지 확인
        if (event.data?.giscus) {
            // 저장된 테마로 즉시 변경
            console.log('hello');
            sendMessageToGiscus({ setConfig: { theme: (getCurrentTheme === 'light') ? 'light':'noborder_gray' } });
        }
    });

    function getCurrentTheme() {
        let theme = localStorage.getItem('theme');
        if (!theme) {
            theme = (window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
        }

        return theme;
    }
});

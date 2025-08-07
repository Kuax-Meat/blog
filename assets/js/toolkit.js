document.addEventListener('DOMContentLoaded', function () {
    const toolkit = document.getElementById('toolkit');
    const body = document.body;
    const increaseFontBtn = document.getElementById('increase-font');
    const decreaseFontBtn = document.getElementById('decrease-font');
    const copyUrlBtn = document.getElementById('copy-url');
    const copyFeedback = document.getElementById('copy-feedback');

    const fontSizes = ['text-sm', 'text-base', 'text-lg', 'text-xl'];
    let currentSizeIndex = 1;

    function updateFontSize() {
        body.classList.remove(...fontSizes);
        body.classList.add(fontSizes[currentSizeIndex]);
    }

    increaseFontBtn.addEventListener('click', () => {
        if (currentSizeIndex < fontSizes.length - 1) {
            currentSizeIndex++;
            updateFontSize();
        }
    });

    decreaseFontBtn.addEventListener('click', () => {
        if (currentSizeIndex > 0) {
            currentSizeIndex--;
            updateFontSize();
        }
    });

    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            toolkit.style.opacity = '0';
            toolkit.style.pointerEvents = 'none';
        } else {
            toolkit.style.opacity = '1';
            toolkit.style.pointerEvents = 'auto';
        }
        lastScrollY = window.scrollY;
    });

    copyUrlBtn.addEventListener('click', () => {
        const url = window.location.href;
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showCopyFeedback();
        } catch (err) {
            console.error('URL 복사에 실패했습니다: ', err);
        }
        document.body.removeChild(textArea);
    });

    function showCopyFeedback() {
        copyFeedback.style.opacity = '1';
        setTimeout(() => {
            copyFeedback.style.opacity = '0';
        }, 2000);
    };
});
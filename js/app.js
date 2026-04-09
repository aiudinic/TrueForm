document.addEventListener("DOMContentLoaded", () => {
    const bottomNav = document.querySelector('.bottom-nav');
    const navItems = document.querySelectorAll('.nav-item');
    const screens = document.querySelectorAll('.screen');

    function switchScreen(targetId) {
        screens.forEach(screen => {
            if (screen.id === targetId) {
                screen.classList.add('active');
            } else {
                screen.classList.remove('active');
            }
        });

        if (targetId === 'screen-loading') {
            bottomNav.style.display = 'none';
        } else {
            bottomNav.style.display = 'flex';
        }

        navItems.forEach(item => {
            if (item.dataset.target === targetId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    switchScreen('screen-loading');

    // Unified handler for ANY element that has a data-target attribute
    const triggerElements = document.querySelectorAll('[data-target]');
    triggerElements.forEach(item => {
        item.addEventListener('click', (e) => {
            if (item.tagName === 'A') e.preventDefault();
            const targetId = item.dataset.target;
            if (document.getElementById(targetId)) {
                switchScreen(targetId);
            }
        });
    });

    // Survey Option Toggle Interactive
    const surveyOptions = document.querySelectorAll('.survey-option');
    surveyOptions.forEach(option => {
        option.addEventListener('click', () => {
            option.classList.toggle('selected');
        });
    });
});

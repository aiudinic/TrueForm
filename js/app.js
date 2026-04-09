document.addEventListener("DOMContentLoaded", () => {
    const bottomNav = document.querySelector('.bottom-nav');
    const navItems = document.querySelectorAll('.nav-item');
    const screens = document.querySelectorAll('.screen');

    function switchScreen(targetId) {
        screens.forEach(screen => {
            if(screen.id === targetId) {
                screen.classList.add('active');
            } else {
                screen.classList.remove('active');
            }
        });

        if(targetId === 'screen-loading') {
            bottomNav.style.display = 'none';
        } else {
            bottomNav.style.display = 'flex';
        }

        navItems.forEach(item => {
            if(item.dataset.target === targetId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    switchScreen('screen-loading');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.dataset.target;
            if(document.getElementById(targetId)) {
                switchScreen(targetId);
            }
        });
    });

    const btnLightMode = document.getElementById('toggle-theme-btn');
    if (btnLightMode) {
        btnLightMode.addEventListener('click', () => {
            switchScreen('screen-home');
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const bottomNav = document.querySelector('.bottom-nav');
    const navItems = document.querySelectorAll('.nav-item');
    const screens = document.querySelectorAll('.screen');

    function switchScreen(targetId) {
        screens.forEach(screen => {
            if (screen.id === targetId) {
                screen.classList.add('active');
                
                // Welcome Name Injection
                if (targetId === 'screen-home') {
                    const savedName = localStorage.getItem('trueform_name');
                    const welcomeTxt = document.getElementById('welcome-name');
                    if (welcomeTxt && savedName) {
                        // Extract first name smoothly
                        const firstName = savedName.split(' ')[0];
                        welcomeTxt.textContent = 'Welcome, ' + firstName;
                    }
                }
            } else {
                screen.classList.remove('active');
            }
        });

        const navVisibleScreens = ['screen-home', 'screen-account', 'screen-meals', 'screen-detail', 'screen-detail-lunch', 'screen-detail-dinner'];
        if (navVisibleScreens.includes(targetId)) {
            bottomNav.style.display = 'flex';
        } else {
            bottomNav.style.display = 'none';
        }

        navItems.forEach(item => {
            if (item.dataset.target === targetId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    function validateForm(validationType) {
        let isValid = true;
        let fields = [];

        if (validationType === 'signup1') {
            fields = ['signup-name', 'signup-address'];
        } else if (validationType === 'signup2') {
            fields = ['signup-email', 'signup-password', 'signup-repassword'];
        }

        fields.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                if (el.value.trim() === '') {
                    el.classList.add('input-error');
                    isValid = false;
                } else {
                    el.classList.remove('input-error');
                }
                
                // Remove error gently on typing
                el.addEventListener('input', () => el.classList.remove('input-error'), { once: true });
            }
        });

        if (isValid && validationType === 'signup1') {
            const nameEl = document.getElementById('signup-name');
            if (nameEl) {
                localStorage.setItem('trueform_name', nameEl.value.trim());
            }
        }

        return isValid;
    }

    switchScreen('screen-loading');

    // Unified handler for ANY element that has a data-target attribute
    const triggerElements = document.querySelectorAll('[data-target]');
    triggerElements.forEach(item => {
        item.addEventListener('click', (e) => {
            if (item.tagName === 'A') e.preventDefault();
            
            // Perform validation if attribute exists
            if (item.dataset.validate) {
                if (!validateForm(item.dataset.validate)) {
                    return; // Abort transition if validation fails
                }
            }

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

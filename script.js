//your JS code here. If required.
const fontForm = document.getElementById('font-form');
const fontSizeInput = document.getElementById('fontsize');
const fontColorInput = document.getElementById('fontcolor');

// 1. Helper function to get a specific cookie value by name
function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const [key, value] = cookies[i].split('=');
        if (key === name) return value;
    }
    return null;
}

// 2. Apply preferences from cookies on page load
function applyPreferences() {
    const savedSize = getCookie('fontsize');
    const savedColor = getCookie('fontcolor');

    if (savedSize) {
        document.documentElement.style.setProperty('--fontsize', `${savedSize}px`);
        fontSizeInput.value = savedSize;
    }
    if (savedColor) {
        document.documentElement.style.setProperty('--fontcolor', savedColor);
        fontColorInput.value = savedColor;
    }
}

// 3. Save preferences when the form is submitted
fontForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page refresh

    const size = fontSizeInput.value;
    const color = fontColorInput.value;

    // Set cookies (expiring in 30 days for persistence)
    document.cookie = `fontsize=${size}; max-age=${30 * 24 * 60 * 60}; path=/`;
    document.cookie = `fontcolor=${color}; max-age=${30 * 24 * 60 * 60}; path=/`;

    // Apply the styles immediately
    document.documentElement.style.setProperty('--fontsize', `${size}px`);
    document.documentElement.style.setProperty('--fontcolor', color);
});

// Run on load
applyPreferences();
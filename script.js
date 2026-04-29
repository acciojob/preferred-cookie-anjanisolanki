const fontForm = document.getElementById("font-form");
const fontSizeInput = document.getElementById("fontsize");
const fontColorInput = document.getElementById("fontcolor");

/**
 * 1. Helper function to parse cookies. 
 * document.cookie is a string like "fontsize=20; fontcolor=#ff0000"
 */
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const [key, value] = cookies[i].split("=");
    if (key === name) return value;
  }
  return null;
}

/**
 * 2. Function to apply preferences.
 * This updates both the CSS variables and the direct element styles 
 * to ensure Cypress tests detect the change correctly.
 */
function applyPreferences() {
  const savedSize = getCookie("fontsize");
  const savedColor = getCookie("fontcolor");

  if (savedSize) {
    const sizeWithPx = savedSize + "px";
    document.documentElement.style.setProperty("--fontsize", sizeWithPx);
    document.body.style.fontSize = sizeWithPx;
    fontSizeInput.value = savedSize;
  }

  if (savedColor) {
    document.documentElement.style.setProperty("--fontcolor", savedColor);
    document.body.style.color = savedColor;
    fontColorInput.value = savedColor;
  }
}

/**
 * 3. Event Listener for form submission.
 * Saves the current input values into cookies with a 30-day expiration.
 */
fontForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the page from actually submitting/refreshing

  const size = fontSizeInput.value;
  const color = fontColorInput.value;

  // Set cookies (max-age is in seconds: 30 days * 24h * 60m * 60s)
  document.cookie = `fontsize=${size}; max-age=${30 * 24 * 60 * 60}; path=/`;
  document.cookie = `fontcolor=${color}; max-age=${30 * 24 * 60 * 60}; path=/`;

  // Apply styles immediately after saving
  applyPreferences();
});

// Run on page load to apply any previously saved settings
applyPreferences();
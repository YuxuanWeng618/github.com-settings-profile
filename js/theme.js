const THEME_KEY = "portfolio-theme";

function isSiteCn() {
  return document.documentElement.getAttribute("data-lang") === "cn";
}

export function getThemeToggleLabel() {
  return isSiteCn() ? "深/浅" : "Dark/Light";
}

export function getTheme() {  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

export function setTheme(theme) {
  const next = theme === "light" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem(THEME_KEY, next);
  updateThemeToggleLabel();
}

export function toggleTheme() {
  setTheme(getTheme() === "dark" ? "light" : "dark");
}

export function renderThemeToggle() {
  return `
    <button class="theme-toggle" type="button" aria-label="Switch color theme">
      <span class="theme-toggle-label">${getThemeToggleLabel()}</span>
    </button>
  `;
}

export function updateThemeToggleLabel() {
  document.querySelectorAll(".theme-toggle-label").forEach((el) => {
    el.textContent = getThemeToggleLabel();
  });
}
export function bindThemeToggle() {
  document.querySelectorAll(".theme-toggle").forEach((btn) => {
    btn.addEventListener("click", toggleTheme);
  });
}

export function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light" || saved === "dark") {
    document.documentElement.setAttribute("data-theme", saved);
  }
}

// Import URLs carry ?v= so a stale module can never pair with a fresh one:
// Cloudflare edge-caches js for 4h and only the URL distinguishes versions.
// The token must match across every file or the browser loads two copies.
import { site, nav } from "./content.js?v=20260924c";
import { updateThemeToggleLabel } from "./theme.js?v=20260924c";

const LANG_KEY = "portfolio-lang";

export function getLang() {
  return document.documentElement.getAttribute("data-lang") === "cn" ? "cn" : "en";
}

export function getLangToggleLabel() {
  return getLang() === "cn" ? "英文/中文" : "EN/CN";
}
export function setLang(lang) {
  const next = lang === "cn" ? "cn" : "en";
  document.documentElement.setAttribute("data-lang", next);
  document.documentElement.lang = next === "cn" ? "zh-Hans" : "en";
  localStorage.setItem(LANG_KEY, next);
  updateLangToggleLabel();
  updateThemeToggleLabel();
  updateHeaderContent();
}
export function toggleLang() {
  setLang(getLang() === "en" ? "cn" : "en");
}

export function renderLangToggle() {
  return `
    <button class="lang-toggle theme-toggle" type="button" aria-label="Switch language">
      <span class="lang-toggle-label">${getLangToggleLabel()}</span>
    </button>
  `;
}

export function updateLangToggleLabel() {
  document.querySelectorAll(".lang-toggle-label").forEach((el) => {
    el.textContent = getLangToggleLabel();
  });
}
export function updateHeaderContent() {
  const lang = getLang();

  document.querySelectorAll(".site-nav a").forEach((link, index) => {
    const item = nav[index];
    if (!item) return;
    link.textContent = lang === "cn" && item.labelCn ? item.labelCn : item.label;
  });

  const nameLink = document.querySelector(".site-name a");
  if (nameLink) {
    nameLink.textContent = lang === "cn" ? site.nameCn || site.name : site.name;
  }

  const tagline = document.querySelector(".site-tagline");
  if (tagline) {
    tagline.textContent = lang === "cn" && site.taglineCn ? site.taglineCn : site.tagline;
  }
}

export function bindLangToggle() {
  document.querySelectorAll(".lang-toggle").forEach((btn) => {
    btn.addEventListener("click", toggleLang);
  });
}

export function initLang() {
  const saved = localStorage.getItem(LANG_KEY);
  const lang = saved === "cn" ? "cn" : "en";
  document.documentElement.setAttribute("data-lang", lang);
  document.documentElement.lang = lang === "cn" ? "zh-Hans" : "en";
}

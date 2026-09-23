/**
 * Responsive behaviour that CSS alone cannot express.
 *
 * Breakpoints match css/main.css: 900px separates desktop from tablet, 540px
 * separates tablet from phone. Everything here degrades to the plain document
 * when JavaScript is unavailable, and every measurement is redone when the
 * language flips because the two languages have different text lengths.
 */

import { getLang } from "./lang.js?v=20260924a";
import { openLightbox } from "./preview.js?v=20260924a";

const PHONE = "(max-width: 540px)";
const DESKTOP = "(min-width: 901px)";

const langListeners = new Set();

function onLangChange(callback) {
  if (!langListeners.size) {
    new MutationObserver(() => langListeners.forEach((fn) => fn())).observe(
      document.documentElement,
      { attributes: true, attributeFilter: ["data-lang"] }
    );
  }
  langListeners.add(callback);
}

/** Trailing-edge debounce; timers keep working when rAF is throttled. */
function debounce(callback, wait) {
  let timer = 0;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(callback, wait);
  };
}

function onViewportChange(callback) {
  window.addEventListener("resize", debounce(callback, 120), { passive: true });
}

/* ── Sticky sidebar on project detail pages ──
   Sticky only helps when the info column is shorter than the viewport and the
   body text is the taller of the two; otherwise it just adds a jump. */

const STICKY_TOP_GAP = 32;
const STICKY_MIN_VIEWPORT = 640;

export function initStickySidebar() {
  const grid = document.querySelector(".project-detail-intro-grid");
  const sidebar = grid?.querySelector(".project-detail-sidebar");
  const intro = grid?.querySelector(".project-detail-intro");
  if (!grid || !sidebar || !intro) return;

  const desktop = window.matchMedia(DESKTOP);

  const update = () => {
    sidebar.classList.remove("is-sticky");
    if (!desktop.matches || window.innerHeight < STICKY_MIN_VIEWPORT) return;

    const sidebarHeight = sidebar.offsetHeight;
    const fitsViewport = sidebarHeight + STICKY_TOP_GAP * 2 <= window.innerHeight;
    const introIsTaller = intro.offsetHeight > sidebarHeight + 120;
    if (fitsViewport && introIsTaller) sidebar.classList.add("is-sticky");
  };

  update();
  onViewportChange(update);
  onLangChange(update);
  desktop.addEventListener("change", update);
  window.addEventListener("load", update, { once: true });
}

/* ── Phone galleries: horizontal scroll-snap with a position readout ──
   The track is a native scroll container, so vertical page scrolling keeps
   working and keyboard arrows scroll it once focused. */

const GALLERY_TRACKS = [
  ".project-detail-gallery-top",
  ".project-detail-gallery-grid",
  ".project-detail-gallery-overall",
  ".project-detail-gallery-detail:not(.is-compact)",
].join(",");

function galleryLabel(count) {
  return getLang() === "cn"
    ? `图片画廊，共 ${count} 张，可左右滑动`
    : `Image gallery, ${count} images, scroll sideways`;
}

function currentSlide(track) {
  const slides = [...track.children].filter((el) => el.classList.contains("project-detail-figure"));
  const center = track.scrollLeft + track.clientWidth / 2;
  let closest = 0;
  let smallest = Infinity;

  slides.forEach((slide, index) => {
    const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
    const distance = Math.abs(slideCenter - center);
    if (distance < smallest) {
      smallest = distance;
      closest = index;
    }
  });

  return closest + 1;
}

function setupTrack(track) {
  const slides = track.querySelectorAll(".project-detail-figure");
  const counter = document.createElement("p");
  counter.className = "gallery-counter";
  counter.setAttribute("aria-live", "polite");
  counter.innerHTML = `<span class="gallery-counter-current">1</span> / ${slides.length}`;
  counter.hidden = true;
  track.insertAdjacentElement("afterend", counter);

  const current = counter.querySelector(".gallery-counter-current");
  const sync = debounce(() => {
    if (counter.hidden) return;
    current.textContent = String(currentSlide(track));
  }, 60);
  track.addEventListener("scroll", sync, { passive: true });

  return { track, counter, current, count: slides.length };
}

export function initPhoneGalleries() {
  const tracks = [...document.querySelectorAll(GALLERY_TRACKS)].filter(
    (track) => track.querySelectorAll(".project-detail-figure").length > 1
  );
  if (!tracks.length) return;

  const entries = tracks.map(setupTrack);
  const phone = window.matchMedia(PHONE);

  const apply = () => {
    entries.forEach(({ track, counter, current, count }) => {
      if (phone.matches) {
        track.classList.add("is-swipe");
        track.tabIndex = 0;
        track.setAttribute("role", "group");
        track.setAttribute("aria-label", galleryLabel(count));
        counter.hidden = false;
        current.textContent = String(currentSlide(track));
        return;
      }

      track.classList.remove("is-swipe");
      track.removeAttribute("tabindex");
      track.removeAttribute("role");
      track.removeAttribute("aria-label");
      counter.hidden = true;
    });
  };

  apply();
  phone.addEventListener("change", apply);
  onViewportChange(apply);
  onLangChange(() => {
    if (!phone.matches) return;
    entries.forEach(({ track, count }) => track.setAttribute("aria-label", galleryLabel(count)));
  });
}

/* ── Phone-only truncation for News and Reading List ── */

function toggleLabel(expanded, total) {
  const cn = getLang() === "cn";
  if (expanded) return cn ? "收起" : "Show less";
  return cn ? `查看全部（${total}）` : `Show all (${total})`;
}

function setupCollapsible(list) {
  const limit = Number(list.dataset.collapseLimit);
  const items = [...list.children];
  const button = document.createElement("button");
  button.type = "button";
  button.className = "list-toggle";
  button.setAttribute("aria-expanded", "false");
  if (list.id) button.setAttribute("aria-controls", list.id);
  button.hidden = true;
  list.insertAdjacentElement("afterend", button);

  const entry = { list, items, limit, button, expanded: false, active: false };

  const render = () => {
    entry.items.forEach((item, index) => {
      const shouldHide = entry.active && !entry.expanded && index >= limit;
      if (shouldHide === item.hidden) return;
      item.hidden = shouldHide;
      if (!shouldHide && entry.active && entry.expanded) {
        item.classList.add("is-revealing");
        item.addEventListener("animationend", () => item.classList.remove("is-revealing"), {
          once: true,
        });
      }
    });
    button.textContent = toggleLabel(entry.expanded, entry.items.length);
    button.setAttribute("aria-expanded", entry.expanded ? "true" : "false");
  };

  button.addEventListener("click", () => {
    entry.expanded = !entry.expanded;
    render();
    if (!entry.expanded) list.scrollIntoView({ block: "nearest" });
  });

  entry.render = render;
  return entry;
}

export function initCollapsibleLists() {
  const lists = [...document.querySelectorAll("[data-collapse-limit]")].filter(
    (list) => list.children.length > Number(list.dataset.collapseLimit)
  );
  if (!lists.length) return;

  const entries = lists.map(setupCollapsible);
  const phone = window.matchMedia(PHONE);

  const apply = () => {
    entries.forEach((entry) => {
      entry.active = phone.matches;
      if (!entry.active) entry.expanded = false;
      entry.button.hidden = !entry.active;
      entry.render();
    });
  };

  apply();
  phone.addEventListener("change", apply);
  onViewportChange(apply);
  onLangChange(() => entries.forEach((entry) => entry.render()));
}

/* ── Tap or Enter on a detail image opens the lightbox ── */

export function initDetailImageZoom() {
  const images = [...document.querySelectorAll(".project-detail-gallery .project-detail-image")];
  if (!images.length) return;

  const items = images.map((img) => ({ src: img.currentSrc || img.src, alt: img.alt || "" }));

  const setLabels = () => {
    const label = getLang() === "cn" ? "查看大图" : "View larger image";
    images.forEach((img) => img.setAttribute("aria-label", label));
  };

  images.forEach((img, index) => {
    img.tabIndex = 0;
    img.setAttribute("role", "button");
    img.classList.add("is-zoomable");
    img.addEventListener("click", () => openLightbox(items, index));
    img.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openLightbox(items, index);
    });
  });

  setLabels();
  onLangChange(setLabels);
}

/**
 * Image preview lightbox — click project thumbnails to open fullscreen gallery.
 */

let gallery = [];
let currentIndex = 0;
let lightboxEl = null;
let lastFocused = null;

function createLightbox() {
  if (lightboxEl) return lightboxEl;

  lightboxEl = document.createElement("div");
  lightboxEl.className = "lightbox";
  lightboxEl.setAttribute("role", "dialog");
  lightboxEl.setAttribute("aria-modal", "true");
  lightboxEl.setAttribute("aria-label", "Image preview");
  lightboxEl.innerHTML = `
    <div class="lightbox-backdrop" data-close></div>
    <div class="lightbox-panel">
      <button class="lightbox-close" type="button" aria-label="Close preview" data-close>&times;</button>
      <button class="lightbox-nav lightbox-prev" type="button" aria-label="Previous image">&lsaquo;</button>
      <figure class="lightbox-figure">
        <img class="lightbox-image" src="" alt="" />
        <figcaption class="lightbox-caption"></figcaption>
      </figure>
      <button class="lightbox-nav lightbox-next" type="button" aria-label="Next image">&rsaquo;</button>
      <div class="lightbox-counter"></div>
    </div>
  `;

  document.body.appendChild(lightboxEl);

  lightboxEl.querySelector(".lightbox-prev").addEventListener("click", () => step(-1));
  lightboxEl.querySelector(".lightbox-next").addEventListener("click", () => step(1));
  lightboxEl.querySelectorAll("[data-close]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", onKeydown);
  bindSwipe(lightboxEl.querySelector(".lightbox-panel"));

  return lightboxEl;
}

/** Horizontal swipes change image; vertical ones are left to the browser. */
function bindSwipe(panel) {
  const SWIPE_THRESHOLD = 45;
  let startX = 0;
  let startY = 0;

  panel.addEventListener(
    "touchstart",
    (event) => {
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    },
    { passive: true }
  );

  panel.addEventListener(
    "touchend",
    (event) => {
      if (gallery.length < 2) return;
      const dx = event.changedTouches[0].clientX - startX;
      const dy = event.changedTouches[0].clientY - startY;
      if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;
      step(dx < 0 ? 1 : -1);
    },
    { passive: true }
  );
}

/** Keeps Tab inside the dialog while it is open. */
function trapFocus(event) {
  const focusable = [...lightboxEl.querySelectorAll("button")].filter((el) => !el.hidden);
  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;

  if (event.shiftKey && (active === first || !lightboxEl.contains(active))) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
}

function renderSlide() {
  const item = gallery[currentIndex];
  if (!item) return;

  const img = lightboxEl.querySelector(".lightbox-image");
  const caption = lightboxEl.querySelector(".lightbox-caption");
  const counter = lightboxEl.querySelector(".lightbox-counter");
  const prevBtn = lightboxEl.querySelector(".lightbox-prev");
  const nextBtn = lightboxEl.querySelector(".lightbox-next");

  img.src = item.src;
  img.alt = item.alt;
  caption.textContent = item.caption || "";
  counter.textContent = gallery.length > 1 ? `${currentIndex + 1} / ${gallery.length}` : "";

  const showNav = gallery.length > 1;
  prevBtn.hidden = !showNav;
  nextBtn.hidden = !showNav;
  counter.hidden = !showNav;
}

function step(delta) {
  currentIndex = (currentIndex + delta + gallery.length) % gallery.length;
  renderSlide();
}

function openLightbox(items, startIndex = 0) {
  gallery = items;
  currentIndex = startIndex;
  lastFocused = document.activeElement;
  createLightbox();
  renderSlide();
  lightboxEl.classList.add("is-open");
  document.body.classList.add("lightbox-open");
  lightboxEl.querySelector(".lightbox-close").focus();
}

function closeLightbox() {
  if (!lightboxEl) return;
  lightboxEl.classList.remove("is-open");
  document.body.classList.remove("lightbox-open");
  lightboxEl.querySelector(".lightbox-image").src = "";
  if (lastFocused?.isConnected) lastFocused.focus();
  lastFocused = null;
}

function onKeydown(event) {
  if (!lightboxEl?.classList.contains("is-open")) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") step(-1);
  if (event.key === "ArrowRight") step(1);
  if (event.key === "Tab") trapFocus(event);
}

export function initPreview() {
  document.querySelectorAll("[data-preview]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();

      const images = JSON.parse(trigger.dataset.images || "[]");
      const startIndex = Number(trigger.dataset.index || 0);
      const titleEn = trigger.dataset.titleEn || "";
      const titleCn = trigger.dataset.titleCn || "";
      const caption = titleCn ? `${titleEn} ${titleCn}` : titleEn;

      const items = images.map((src, index) => ({
        src,
        alt: caption,
        caption: images.length > 1 ? `${caption} (${index + 1}/${images.length})` : caption,
      }));

      if (items.length === 0) return;
      openLightbox(items, startIndex);
    });
  });
}

export { openLightbox, closeLightbox };

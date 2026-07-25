/**
 * Image preview lightbox — click project thumbnails to open fullscreen gallery.
 */

let gallery = [];
let currentIndex = 0;
let lightboxEl = null;

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

  return lightboxEl;
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
  createLightbox();
  renderSlide();
  lightboxEl.classList.add("is-open");
  document.body.classList.add("lightbox-open");
}

function closeLightbox() {
  if (!lightboxEl) return;
  lightboxEl.classList.remove("is-open");
  document.body.classList.remove("lightbox-open");
  lightboxEl.querySelector(".lightbox-image").src = "";
}

function onKeydown(event) {
  if (!lightboxEl?.classList.contains("is-open")) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") step(-1);
  if (event.key === "ArrowRight") step(1);
}

export function initPreview() {
  document.addEventListener("keydown", onKeydown);

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

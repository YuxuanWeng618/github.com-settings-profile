// See js/lang.js for why every import specifier carries the same ?v= token.
import {
  site,
  nav,
  projects,
  publications,
  about,
  categories,
} from "./content.js?v=20261116perf";
import { renderThemeToggle, bindThemeToggle, initTheme } from "./theme.js?v=20260924d";
import {
  getLang,
  renderLangToggle,
  bindLangToggle,
  initLang,
  updateHeaderContent,
} from "./lang.js?v=20261116perf";
import { initHoverZoom } from "./zoom.js?v=20261116perf";
import { renderDocs, bindDocs } from "./docs.js?v=20261116perf";
import { initCollapsibleLists } from "./responsive.js?v=20261116perf";

function renderHeader(activePage) {
  const lang = getLang();
  const navLinks = nav
    .map((item) => {
      const label = lang === "cn" && item.labelCn ? item.labelCn : item.label;
      return `<a href="${item.href}" class="${item.id === activePage ? "is-active" : ""}">${label}</a>`;
    })
    .join("");

  const tagline =
    lang === "cn" && site.taglineCn ? site.taglineCn : site.tagline;
  const displayName = lang === "cn" ? site.nameCn || site.name : site.name;

  return `
    <header class="site-header">
      <div class="site-identity">
        <h1 class="site-name"><a href="index.html">${displayName}</a></h1>
        <p class="site-tagline">${tagline}</p>
      </div>
      <div class="site-header-actions">
        <nav class="site-nav" aria-label="Main">${navLinks}</nav>
        <div class="site-header-toggles">
          ${renderLangToggle()}
          ${renderThemeToggle()}
        </div>
      </div>
    </header>
    <hr class="header-divider" />
  `;
}

function formatTags(tags) {
  if (!tags || tags.length === 0) return "";
  return tags.map((tag) => `#${tag}`).join(" ");
}

function renderAuthor(author) {
  const name = author.highlight
    ? `<span class="author-highlight">${author.name}</span>`
    : author.name;
  const equal = author.equal ? '<span class="equal-contrib">*</span>' : "";
  const corresponding = author.corresponding
    ? '<span class="corresponding-author">*</span>'
    : "";
  const note = author.venueNote ? ` <span class="publication-status">${author.venueNote}</span>` : "";
  return `${name}${equal}${corresponding}${note}`;
}

const projectCoverSizes = "(max-width: 540px) calc(100vw - 2rem), (max-width: 900px) calc((100vw - 5.5rem) / 2), (max-width: 1144px) calc((100vw - 7rem) / 3), 344px";

function renderProjectCover(project, label, alt, priority) {
  if (!project.cover) return "";
  const thumbnail = project.coverThumbnail;
  const image = thumbnail ? `${thumbnail}-480.webp` : project.cover;
  const responsive = thumbnail
    ? `srcset="${image} 480w, ${thumbnail}-960.webp 960w" sizes="${projectCoverSizes}"`
    : "";
  const video = project.coverVideo
    ? `<video class="project-cover-video" data-src="${project.coverVideo}" preload="none" muted loop playsinline aria-hidden="true"></video>`
    : "";
  return `
    <a class="project-thumb" href="${project.href}" aria-label="${label}">
      <span class="project-cover-media">
        <img class="project-image" src="${image}" ${responsive} alt="${alt}"
          ${priority ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'} />
        ${video}
      </span>
    </a>
  `;
}

function renderProjectCard(project, priority) {
  const lang = getLang();
  const tagsEn = formatTags(project.tagsEn);
  const tagsCn = formatTags(project.tagsCn);
  const tagsEnHtml = tagsEn ? `<p class="project-tags project-tags-en">${tagsEn}</p>` : "";
  const tagsCnHtml = tagsCn ? `<p class="project-tags project-tags-cn">${tagsCn}</p>` : "";
  const detailLabel =
    lang === "cn"
      ? `查看 ${project.titleCn}`
      : `View ${project.titleEn}`;
  const demo = project.detail?.demo;
  const playHref =
    demo?.href &&
    demo.download === false &&
    /^https?:\/\//i.test(demo.href)
      ? demo.href
      : "";
  const playLabelEn = (demo?.useLabelsOnHome && demo.labelEn) || "Play Demo";
  const playLabelCn = (demo?.useLabelsOnHome && demo.labelCn) || "在线试玩";
  const playLink = playHref
    ? `<p class="project-play-link">
        <a href="${playHref}" target="_blank" rel="noopener noreferrer">
          <span class="lang-en-only">${playLabelEn}</span>
          <span class="lang-cn-only">${playLabelCn}</span>
        </a>
      </p>`
    : "";

  return `
    <li class="project-card">
      ${renderProjectCover(project, detailLabel, lang === "cn" ? project.titleCn : project.titleEn, priority)}
      <div class="project-meta">
        <a class="project-title-en" href="${project.href}">${project.titleEn}</a>
        <a class="project-title-cn" href="${project.href}">${project.titleCn}</a>
        ${
          tagsEnHtml || tagsCnHtml
            ? `<a class="project-tags-link" href="${project.href}">${tagsEnHtml}${tagsCnHtml}</a>`
            : ""
        }
        ${playLink}
      </div>
    </li>
  `;
}

function renderProjects() {
  const projectGroups = categories.map((category) => ({
    ...category,
    projects: projects.filter((project) => project.category === category.id),
  }));

  const categoryButtons = projectGroups.map((category) => `
    <button class="category-filter-btn" data-filter="${category.id}" type="button" aria-pressed="false">
      <span class="lang-en-only">${category.labelEn}</span>
      <span class="lang-cn-only">${category.labelCn}</span>
      <span class="category-count">${category.projects.length}</span>
    </button>
  `).join("");

  const priorityProject = projectGroups[0]?.projects.find((project) => project.cover);
  const projectSections = projectGroups.map((category) => `
    <section class="project-category-section" data-category="${category.id}">
      <div class="category-header">
        <h2 class="category-title">
          <span class="category-title-en">${category.labelEn}</span>
          <span class="category-title-cn">${category.labelCn}</span>
        </h2>
        <span class="category-subtitle lang-en-only">${category.subtitleEn}</span>
        <span class="category-subtitle lang-cn-only">${category.subtitleCn}</span>
      </div>
      <ul class="project-grid">${category.projects.map((project) => renderProjectCard(project, project === priorityProject)).join("")}</ul>
    </section>
  `).join("");

  return `
    <div class="projects-container">
      <nav class="category-filters" aria-label="Project categories">
        <button class="category-filter-btn is-active" data-filter="all" type="button" aria-pressed="true">
          <span class="lang-en-only">All</span>
          <span class="lang-cn-only">全部</span>
          <span class="category-count">${projects.length}</span>
        </button>
        ${categoryButtons}
      </nav>
      ${projectSections}
    </div>
  `;
}

function initProjectCoverVideos() {
  const videos = document.querySelectorAll(".project-cover-video");
  if (!videos.length || !window.IntersectionObserver) return;
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

  for (const video of videos) {
    const frame = video.parentElement;
    const poster = frame.querySelector("img");
    let visible = false;
    let ready = false;

    const syncPlayback = () => {
      if (!ready || !visible || document.hidden || motion.matches) {
        video.pause();
        return;
      }
      if (!video.hasAttribute("src")) video.src = video.dataset.src;
      if (video.paused) video.play().catch(() => {});
    };

    video.addEventListener("playing", () => video.classList.toggle("is-playing", !video.paused));
    video.addEventListener("pause", () => video.classList.remove("is-playing"));
    video.addEventListener("error", () => video.classList.remove("is-playing"));
    document.addEventListener("visibilitychange", syncPlayback);
    motion.addEventListener("change", syncPlayback);

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.intersectionRatio >= 0.2;
      syncPlayback();
    }, { threshold: 0.2 });
    observer.observe(frame);

    const startAfterLoad = () => {
      const start = () => {
        ready = true;
        syncPlayback();
      };
      if (window.requestIdleCallback) window.requestIdleCallback(start, { timeout: 1200 });
      else window.setTimeout(start, 150);
    };
    poster.decode().catch(() => {}).then(() => {
      if (document.readyState === "complete") startAfterLoad();
      else window.addEventListener("load", startAfterLoad, { once: true });
    });
  }
}

function bindCategoryFilters() {
  const buttons = document.querySelectorAll(".category-filter-btn");
  const sections = document.querySelectorAll(".project-category-section");
  if (!buttons.length || !sections.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      // Selected state first, so the tap reads as instant even on slow devices.
      buttons.forEach((other) => {
        const isActive = other === btn;
        other.classList.toggle("is-active", isActive);
        other.setAttribute("aria-pressed", isActive ? "true" : "false");
      });

      sections.forEach((sec) => {
        const shouldShow = filter === "all" || sec.dataset.category === filter;
        const wasHidden = sec.hidden;
        sec.hidden = !shouldShow;
        if (shouldShow && wasHidden) reveal(sec);
      });
    });
  });
}

function reveal(el) {
  // A hidden tab freezes the animation clock, which would hold the section at
  // the first keyframe until the tab is looked at again.
  if (document.hidden) return;

  el.classList.remove("is-revealing");
  // Reading offsetWidth restarts the animation when the same element reappears.
  void el.offsetWidth;
  el.classList.add("is-revealing");
  el.addEventListener("animationend", () => el.classList.remove("is-revealing"), { once: true });
}

function renderVenues(venues) {
  return venues.map((v) => `@ ${v.label}`).join(", ");
}

function renderPublications() {
  const items = publications
    .map((pub) => {
      const authors = pub.authors.map(renderAuthor).join(", ");
      const links =
        pub.links.length > 0
          ? `<p class="publication-links">${pub.links
              .map(
                (l) =>
                  `<a href="${l.href}" target="_blank" rel="noopener noreferrer">${l.label}</a>`
              )
              .join("")}</p>`
          : "";
      const status = pub.status
        ? `<p class="publication-status">${pub.status}</p>`
        : "";
      const subtitle = pub.subtitle
        ? `<p class="publication-title">${pub.subtitle}</p>`
        : "";
      const figure = pub.image
        ? `<figure class="publication-figure"><img src="${pub.image}" alt="" loading="lazy" /></figure>`
        : "";

      return `
        <li class="publication-item${pub.image ? " has-figure" : ""}">
          ${figure}
          <div class="publication-body">
            <p class="publication-venue"><span class="venue-tag">${renderVenues(pub.venues)}</span></p>
            <h2 class="publication-title">${pub.title}</h2>
            ${subtitle}
            <p class="publication-authors">${authors}</p>
            ${links}
            ${status}
          </div>
        </li>
      `;
    })
    .join("");

  return `
    <p class="publication-note lang-en-only">*Corresponding author</p>
    <p class="publication-note lang-cn-only">*通讯作者</p>
    <ul class="publication-list">${items}</ul>
  `;
}

function renderNewsItems(items, textClass = "") {
  return items
    .map(
      (item) =>
        `<li class="news-item${textClass ? ` ${textClass}` : ""}"><span class="news-date">[${item.date}]</span> ${item.text}</li>`
    )
    .join("");
}

function renderAbout() {
  const bioEn = about.bioEn.map((p) => `<p class="text-en">${p}</p>`).join("");
  const bioCn = about.bioCn.map((p) => `<p class="text-cn">${p}</p>`).join("");
  const newsEn = renderNewsItems(about.newsEn, "text-en");
  const newsCn = renderNewsItems(about.newsCn, "text-cn");
  const reading = about.readingList
    .map(({ title, author, date, href }) => {
      const titleLink = `<a href="${href}" target="_blank" rel="noopener noreferrer">${title}</a>`;
      const dateLabel = date ? ` (${date})` : "";
      return `<li class="reading-item"><em>${titleLink}</em>, ${author}${dateLabel}</li>`;
    })
    .join("");
  const photo = about.photo
    ? `<figure class="about-photo"><img src="${about.photo}" alt="${about.nameDisplay}" loading="lazy" /></figure>`
    : "";

  return `
    <div class="about-page">
      <div class="about-hero">
        ${photo}
        <div class="about-intro">
          <div class="project-detail-lang-block project-detail-lang-en">
            <p class="about-name text-en">${about.nameDisplay}</p>
            <p class="about-pronunciation text-en">(Pronunciation: ${about.pronunciation})</p>
            ${bioEn}
            <p class="about-contact text-en">
              <a href="${site.googleScholar}" target="_blank" rel="noopener noreferrer">Google Scholar</a>
              &nbsp;｜&nbsp;
              Contact: <a href="mailto:${site.email}">${site.email}</a>
            </p>
          </div>
          <div class="project-detail-lang-block project-detail-lang-cn">
            <p class="about-name-cn text-cn">${about.nameCn} (${about.nameDisplay})</p>
            ${bioCn}
            <p class="about-contact text-cn">
              <a href="${site.googleScholar}" target="_blank" rel="noopener noreferrer">Google Scholar</a>
              &nbsp;｜&nbsp;
              联系方式: <a href="mailto:${site.email}">${site.email}</a>
            </p>
          </div>
        </div>
      </div>
    </div>

    <hr class="section-divider" />

    <section class="about-news">
      <div class="project-detail-lang-block project-detail-lang-en">
        <h2 class="about-section-title text-en">📰 News</h2>
        <ul class="news-list" id="news-list-en" data-collapse-limit="5">${newsEn}</ul>
      </div>
      <div class="project-detail-lang-block project-detail-lang-cn">
        <h2 class="about-section-title text-cn">📰 最新动态</h2>
        <ul class="news-list" id="news-list-cn" data-collapse-limit="5">${newsCn}</ul>
      </div>
    </section>

    <hr class="section-divider" />

    <section>
      <h2 class="about-section-title lang-en-only">📖 My Recent Reading List</h2>
      <h2 class="about-section-title lang-cn-only">📖 近期阅读</h2>
      <ul class="reading-list" id="reading-list" data-collapse-limit="3">${reading}</ul>
    </section>

    ${
      about.extraSection?.title
        ? `
    <hr class="section-divider" />
    <section>
      <h2 class="about-section-title">${about.extraSection.title}</h2>
      ${about.extraSection.content ? `<p>${about.extraSection.content}</p>` : ""}
    </section>
    `
        : ""
    }

    <p class="about-footer-note lang-en-only">(Last update: ${site.lastUpdate})</p>
    <p class="about-footer-note lang-cn-only">（最后更新：${site.lastUpdate}）</p>
  `;
}

function init() {
  initTheme();
  initLang();
  initHoverZoom();
  const page = document.body.dataset.page;
  const headerEl = document.getElementById("site-header");
  const contentEl = document.getElementById("page-content");

  if (headerEl) {
    headerEl.innerHTML = renderHeader(page);
    bindThemeToggle();
    bindLangToggle();
    updateHeaderContent();
  }

  if (!contentEl) return;

  switch (page) {
    case "projects":
      contentEl.innerHTML = renderProjects();
      bindCategoryFilters();
      initProjectCoverVideos();
      break;
    case "publications":
      contentEl.innerHTML = renderPublications();
      break;
    case "about":
      contentEl.innerHTML = renderAbout();
      initCollapsibleLists();
      break;
    case "docs":
      contentEl.innerHTML = renderDocs();
      bindDocs();
      break;
    default:
      contentEl.innerHTML = "<p>Page not found.</p>";
  }
}

document.addEventListener("DOMContentLoaded", init);

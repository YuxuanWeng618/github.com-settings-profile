// See js/lang.js for why every import specifier carries the same ?v= token.
import {
  site,
  nav,
  projects,
  publications,
  about,
  categories,
} from "./content.js?v=20260916i";
import { renderThemeToggle, bindThemeToggle, initTheme } from "./theme.js?v=20260916i";
import {
  getLang,
  renderLangToggle,
  bindLangToggle,
  initLang,
  updateHeaderContent,
} from "./lang.js?v=20260916i";
import { initHoverZoom } from "./zoom.js?v=20260916i";
import { renderDocs, bindDocs } from "./docs.js?v=20260916i";
import { initCollapsibleLists } from "./responsive.js?v=20260916i";

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

function renderProjectCard(project) {
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
  const playLink = playHref
    ? `<p class="project-play-link">
        <a href="${playHref}" target="_blank" rel="noopener noreferrer">
          <span class="lang-en-only">Play Demo</span>
          <span class="lang-cn-only">在线试玩</span>
        </a>
      </p>`
    : "";

  return `
    <li class="project-card">
      <a
        class="project-thumb"
        href="${project.href}"
        aria-label="${detailLabel}"
      >
        <img
          class="project-image"
          src="${project.cover}"
          alt="${lang === "cn" ? project.titleCn : project.titleEn}"
          loading="lazy"
        />
      </a>
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
  const hardwareProjects = projects.filter((p) => p.category === "hardware");
  const softwareProjects = projects.filter((p) => p.category === "software");

  return `
    <div class="projects-container">
      <nav class="category-filters" aria-label="Project categories">
        <button class="category-filter-btn is-active" data-filter="all" type="button" aria-pressed="true">
          <span class="lang-en-only">All</span>
          <span class="lang-cn-only">全部</span>
          <span class="category-count">${projects.length}</span>
        </button>
        <button class="category-filter-btn" data-filter="software" type="button" aria-pressed="false">
          <span class="lang-en-only">Software</span>
          <span class="lang-cn-only">软件类</span>
          <span class="category-count">${softwareProjects.length}</span>
        </button>
        <button class="category-filter-btn" data-filter="hardware" type="button" aria-pressed="false">
          <span class="lang-en-only">Hardware</span>
          <span class="lang-cn-only">硬件类</span>
          <span class="category-count">${hardwareProjects.length}</span>
        </button>
      </nav>

      <section class="project-category-section" data-category="software">
        <div class="category-header">
          <h2 class="category-title">
            <span class="category-title-en">Software</span>
            <span class="category-title-cn">软件类</span>
          </h2>
          <span class="category-subtitle lang-en-only">VR, Games &amp; Digital Systems</span>
          <span class="category-subtitle lang-cn-only">虚拟现实、游戏与数字系统</span>
        </div>
        <ul class="project-grid">${softwareProjects.map(renderProjectCard).join("")}</ul>
      </section>

      <section class="project-category-section" data-category="hardware">
        <div class="category-header">
          <h2 class="category-title">
            <span class="category-title-en">Hardware</span>
            <span class="category-title-cn">硬件类</span>
          </h2>
          <span class="category-subtitle lang-en-only">Physical Computing &amp; Interactive Installations</span>
          <span class="category-subtitle lang-cn-only">实体计算与交互装置</span>
        </div>
        <ul class="project-grid">${hardwareProjects.map(renderProjectCard).join("")}</ul>
      </section>
    </div>
  `;
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
    .map((book) => `<li class="reading-item"><em>${book.title}</em>, ${book.author}</li>`)
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

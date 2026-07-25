import { site, nav, projects, publications, about } from "./content.js";
import { renderThemeToggle, bindThemeToggle, initTheme } from "./theme.js";
import {
  getLang,
  renderLangToggle,
  bindLangToggle,
  initLang,
  updateHeaderContent,
} from "./lang.js";

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
      </div>
    </li>
  `;
}

function renderProjects() {
  const items = projects.map(renderProjectCard).join("");
  return `<ul class="project-grid">${items}</ul>`;
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
        <ul class="news-list">${newsEn}</ul>
      </div>
      <div class="project-detail-lang-block project-detail-lang-cn">
        <h2 class="about-section-title text-cn">📰 最新动态</h2>
        <ul class="news-list">${newsCn}</ul>
      </div>
    </section>

    <hr class="section-divider" />

    <section>
      <h2 class="about-section-title lang-en-only">📖 My Recent Reading List</h2>
      <h2 class="about-section-title lang-cn-only">📖 近期阅读</h2>
      <ul class="reading-list">${reading}</ul>
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
      break;
    case "publications":
      contentEl.innerHTML = renderPublications();
      break;
    case "about":
      contentEl.innerHTML = renderAbout();
      break;
    default:
      contentEl.innerHTML = "<p>Page not found.</p>";
  }
}

document.addEventListener("DOMContentLoaded", init);

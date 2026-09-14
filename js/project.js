// See js/lang.js for why every import specifier carries the same ?v= token.
import {
  site,
  nav,
  getProjectBySlug,
  getProjectNeighbors,
} from "./content.js?v=20260914d";
import { renderThemeToggle, bindThemeToggle, initTheme } from "./theme.js?v=20260914d";
import {
  getLang,
  renderLangToggle,
  bindLangToggle,
  initLang,
  updateHeaderContent,
} from "./lang.js?v=20260914d";
import { initHoverZoom } from "./zoom.js?v=20260914d";

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

function renderTextBlock(text, className = "text-en") {
  if (!text) return "";
  const paragraphs = text.split("\n\n").filter(Boolean);
  return paragraphs.map((p) => `<p class="${className}">${p}</p>`).join("");
}

function renderMetaColumn(metaItems, lang) {
  if (!metaItems || metaItems.length === 0) return "";

  return metaItems
    .map((item) => {
      const text = lang === "cn" ? item.cn : item.en;
      if (!text) return "";
      return `
        <div class="project-detail-meta-item">
          <p class="${lang === "cn" ? "text-cn" : "text-en"}">${text}</p>
        </div>
      `;
    })
    .filter(Boolean)
    .join("");
}

function renderInfoBlock(section, lang) {
  if (!section) return "";

  if (lang === "en") {
    return `
      <div class="project-detail-info-block">
        <p class="text-en project-detail-info-label">${section.labelEn}</p>
        ${renderTextBlock(section.en, "text-en")}
      </div>
    `;
  }

  return `
    <div class="project-detail-info-block">
      <p class="text-cn project-detail-info-label">${section.labelCn || ""}</p>
      ${renderTextBlock(section.cn, "text-cn")}
    </div>
  `;
}

function renderIntroGrid(detail) {
  const overviewEn = detail.overview?.en
    ? `<p class="text-en project-detail-overview">${detail.overview.en}</p>`
    : "";
  const overviewCn = detail.overview?.cn
    ? `<p class="text-cn project-detail-overview">${detail.overview.cn}</p>`
    : "";

  const bodyEn = renderTextBlock(detail.bodyEn, "text-en");
  const bodyCn = renderTextBlock(detail.bodyCn, "text-cn");

  return `
    <div class="project-detail-intro-grid">
      <aside class="project-detail-sidebar">
        <div class="project-detail-lang-block project-detail-lang-en">
          <div class="project-detail-meta-column">
            ${renderMetaColumn(detail.meta, "en")}
          </div>
          ${renderInfoBlock(detail.materials, "en")}
          ${renderInfoBlock(detail.dimensions, "en")}
        </div>
        <div class="project-detail-lang-block project-detail-lang-cn">
          <div class="project-detail-meta-column">
            ${renderMetaColumn(detail.meta, "cn")}
          </div>
          ${renderInfoBlock(detail.materials, "cn")}
          ${renderInfoBlock(detail.dimensions, "cn")}
        </div>
      </aside>
      <div class="project-detail-intro">
        <div class="project-detail-lang-block project-detail-lang-en">
          ${overviewEn}
          ${bodyEn}
        </div>
        <div class="project-detail-lang-block project-detail-lang-cn">
          ${overviewCn}
          ${bodyCn}
        </div>
      </div>
    </div>
  `;
}

function normalizeImageItem(item) {
  if (typeof item === "string") {
    return { src: item, orientation: "landscape" };
  }
  return { src: item.src, orientation: item.orientation || "landscape" };
}

function renderImageFigure(item, extraClass = "") {
  const { src, orientation } = normalizeImageItem(item);
  const orientClass =
    orientation === "portrait"
      ? " is-portrait"
      : orientation === "square"
        ? " is-square"
        : " is-landscape";
  const classes = `project-detail-figure${orientClass}${extraClass ? ` ${extraClass}` : ""}`;

  return `
    <figure class="${classes}">
      <img class="project-detail-image" src="${src}" alt="" loading="lazy" />
    </figure>
  `;
}

function renderTopGallery(topGallery) {
  if (!topGallery?.length) return "";

  const items = topGallery
    .map((item, index) => renderImageFigure(item, `project-detail-figure-top top-item-${index + 1}`))
    .join("");

  return `<div class="project-detail-gallery-top">${items}</div>`;
}

function renderDetailGrid(detailGallery, columns = 3) {
  if (!detailGallery?.length) return "";

  const colClass = columns === 2 ? " cols-2" : columns === 3 ? " cols-3" : "";
  const items = detailGallery
    .map((item) => renderImageFigure(item, "project-detail-figure-detail"))
    .join("");

  return `<div class="project-detail-gallery-grid${colClass}">${items}</div>`;
}

function renderLinks(links) {
  if (!links || links.length === 0) return "";

  const linksEn = links
    .map(
      (link) => `
        <a class="project-detail-link" href="${link.href}" target="_blank" rel="noopener noreferrer">
          <span class="text-en">${link.labelEn || link.label}</span>
        </a>
      `
    )
    .join("");

  const linksCn = links
    .filter((link) => link.labelCn && link.labelCn !== (link.labelEn || link.label))
    .map(
      (link) => `
        <a class="project-detail-link project-detail-link-cn" href="${link.href}" target="_blank" rel="noopener noreferrer">
          <span class="text-cn">${link.labelCn}</span>
        </a>
      `
    )
    .join("");

  return `
    <div class="project-detail-lang-block project-detail-lang-en">
      <div class="project-detail-links">${linksEn}</div>
    </div>
    ${linksCn ? `<div class="project-detail-lang-block project-detail-lang-cn"><div class="project-detail-links">${linksCn}</div></div>` : ""}
  `;
}

function renderDemo(demo) {
  if (!demo?.href) return "";

  if (demo.embed) {
    const embedUrl = demo.href.includes("figma.com/embed") || demo.href.includes("youtube.com/embed")
      ? demo.href
      : demo.href.includes("figma.com/proto")
        ? `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(demo.href)}`
        : demo.href;
    const title = demo.labelEn || "Interactive Demo";

    return `
      <figure class="project-detail-figure project-detail-video project-detail-demo-player">
        <div class="video-embed">
          <iframe
            src="${embedUrl}"
            title="${title}"
            allow="fullscreen"
            allowfullscreen
            loading="lazy"
          ></iframe>
        </div>
      </figure>
    `;
  }

  const downloadAttr = demo.download !== false ? " download" : "";
  const enLabel = demo.labelEn || "Play Demo";
  const cnLabel = demo.labelCn || "运行 Demo";

  return `
    <div class="project-detail-demo">
      <div class="project-detail-lang-block project-detail-lang-en">
        <a class="project-detail-demo-link" href="${demo.href}"${downloadAttr}>
          <span class="text-en">${enLabel}</span>
        </a>
        ${demo.noteEn ? `<p class="text-en project-detail-demo-note">${demo.noteEn}</p>` : ""}
      </div>
      <div class="project-detail-lang-block project-detail-lang-cn">
        <a class="project-detail-demo-link project-detail-demo-link-cn" href="${demo.href}"${downloadAttr}>
          <span class="text-cn">${cnLabel}</span>
        </a>
        ${demo.noteCn ? `<p class="text-cn project-detail-demo-note">${demo.noteCn}</p>` : ""}
      </div>
    </div>
  `;
}

function toVideoEmbedUrl(url) {
  if (!url) return "";
  if (url.includes("player.vimeo.com/video/") || url.includes("youtube.com/embed/")) {
    return url.split("?")[0];
  }

  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  if (url.includes("watch?v=")) {
    return url.replace("watch?v=", "embed/").split("&")[0];
  }

  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1]?.split(/[?&]/)[0];
    return id ? `https://www.youtube.com/embed/${id}` : url;
  }

  return url;
}

function renderGallery(detail) {
  const parts = [];

  if (detail.video) {
    const embedUrl = toVideoEmbedUrl(detail.video);
    parts.push(`
      <figure class="project-detail-figure project-detail-video">
        <div class="video-embed">
          <iframe
            src="${embedUrl}"
            title="Project video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowfullscreen
            loading="lazy"
          ></iframe>
        </div>
      </figure>
    `);
  }

  if (detail.demo) {
    parts.push(renderDemo(detail.demo));
  }

  if (detail.topGallery?.length) {
    parts.push(renderTopGallery(detail.topGallery));
  }

  if (detail.detailGallery?.length) {
    if (detail.detailLayout === "overlap") {
      const overlapCompact = detail.detailOverlapSize === "compact" ? " is-compact" : "";
      const detailItems = detail.detailGallery
        .map(
          (item, index) =>
            renderImageFigure(
              item,
              `project-detail-figure-detail${index < 7 ? ` detail-item-${index + 1}` : ""}`
            )
        )
        .join("");
      parts.push(`<div class="project-detail-gallery-detail is-overlap${overlapCompact}">${detailItems}</div>`);
    } else if (detail.detailGrid) {
      parts.push(renderDetailGrid(detail.detailGallery, detail.detailGridColumns || 3));
    } else {
      parts.push(renderDetailGrid(detail.detailGallery, detail.detailGridColumns || 2));
    }
  }

  if (detail.overallGallery?.length) {
    const overallItems = detail.overallGallery
      .map((item) => renderImageFigure(item, "project-detail-figure-overall"))
      .join("");
    parts.push(`<div class="project-detail-gallery-overall">${overallItems}</div>`);
  }

  if (!detail.detailGallery?.length && !detail.overallGallery?.length && detail.gallery?.length) {
    const fallback = detail.gallery
      .map(
        (src) => `
          <figure class="project-detail-figure">
            <img class="project-detail-image" src="${src}" alt="" loading="lazy" />
          </figure>
        `
      )
      .join("");
    parts.push(`<div class="project-detail-gallery-overall">${fallback}</div>`);
  }

  if (parts.length === 0) return "";

  return `<div class="project-detail-gallery">${parts.join("")}</div>`;
}

function renderTags(project, lang) {
  const tags = lang === "cn" ? formatTags(project.tagsCn) : formatTags(project.tagsEn);
  if (!tags) return "";

  const className =
    lang === "cn" ? "project-tags project-tags-cn" : "project-tags project-tags-en";

  return `<p class="${className}">${tags}</p>`;
}

function renderProjectDetail(project) {
  const detail = project.detail || {};
  const { prev, next } = getProjectNeighbors(project.slug);

  document.title = `${project.titleEn} �?${site.name}`;

  return `
    <article class="project-detail">
      <header class="project-detail-header">
        <div class="project-detail-lang-block project-detail-lang-en">
          <h1 class="project-detail-title">${project.titleEn}</h1>
          <div class="project-detail-tags">${renderTags(project, "en")}</div>
        </div>
        <div class="project-detail-lang-block project-detail-lang-cn">
          <p class="project-detail-title-cn">${project.titleCn}</p>
          <div class="project-detail-tags">${renderTags(project, "cn")}</div>
        </div>
        ${renderIntroGrid(detail)}
        ${renderLinks(detail.links)}
        <div class="project-detail-lang-block project-detail-lang-en">
          <p class="project-detail-back">
            <a href="index.html">Back to Projects</a>
          </p>
        </div>
        <div class="project-detail-lang-block project-detail-lang-cn">
          <p class="project-detail-back-cn">
            <a href="index.html">返回项目</a>
          </p>
        </div>
      </header>

      ${renderGallery(detail)}

      <nav class="project-detail-nav" aria-label="Project navigation">
        <span class="lang-en-only">
          <a href="${prev.href}">Prev</a>
          <span class="project-detail-nav-sep">/</span>
          <a href="${next.href}">Next</a>
        </span>
        <span class="lang-cn-only">
          <a href="${prev.href}">上一�?/a>
          <span class="project-detail-nav-sep">/</span>
          <a href="${next.href}">下一�?/a>
        </span>
      </nav>
    </article>
  `;
}

function renderNotFound() {
  return `
    <article class="project-detail">
      <header class="project-detail-header">
        <h1 class="project-detail-title">Project not found</h1>
        <p class="project-detail-back"><a href="index.html">Back to Projects</a></p>
      </header>
    </article>
  `;
}

function init() {
  initTheme();
  initLang();
  initHoverZoom();
  const headerEl = document.getElementById("site-header");
  const contentEl = document.getElementById("page-content");
  const slug = new URLSearchParams(window.location.search).get("slug");
  const project = getProjectBySlug(slug);

  if (headerEl) {
    headerEl.innerHTML = renderHeader("projects");
    bindThemeToggle();
    bindLangToggle();
    updateHeaderContent();
  }

  if (contentEl) {
    contentEl.innerHTML = project ? renderProjectDetail(project) : renderNotFound();
  }
}

document.addEventListener("DOMContentLoaded", init);

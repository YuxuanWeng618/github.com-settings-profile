/* ============================================================
   play.js — 结构与动效移植自 vibegame.tettet.org 的拆解
   数据全部来自 ../js/content.js，本文件不硬编码任何作品信息。

   移植的五个机制：
     1. 三层氛围背景中的星空 canvas（rAF + 越界回卷）
     2. 预加载门：steps[] 判定 + enter() 里强制回流重放整条编排
     3. IntersectionObserver 入场（只加 class，节奏交给 CSS transition）
     4. --para 滚动视差（rAF 节流 + 视口裁剪）
     5. stages[] 自动演播（最后一幕 duration:Infinity = 交还控制权）
   ============================================================ */

import { site, about, publications, getOrderedProjects } from "../js/content.js";

/* ── 配置 ──────────────────────────────────────────────────
   HERO_VIDEO：留空则首屏用主视觉静图（heroDrift 缓慢推近）。
   想换成 VibeGame 那样的视频首屏，把一个 mp4 放进 play/ 目录，
   例如 play/hero.mp4，然后把下面改成 "hero.mp4?v=1" 即可 ——
   预加载门会自动改为等视频缓冲完成，并接上 ended → 循环、
   waiting/stalled/切后台 → .is-paused 的同步逻辑。
   ────────────────────────────────────────────────────────── */
const HERO_VIDEO = "";

/* 首屏编排节拍。视频版要留出片头时间，所以整体后移。
   换了不同长度的片子，改这里的数字即可 —— CSS 那边全靠这几个变量驱动。 */
const TIMELINE = {
  image: { intro: "3s", enter: "1.5s", exit: "2.8s", lift: "2.9s", actions: "3.2s" },
  video: { intro: "7s", enter: "5.4s", exit: "7.6s", lift: "7.7s", actions: "8.1s" },
};

const STAGE_MS = 6000; // 每一幕自动停留时长；最后一幕除外

const A = (path) => (path ? "../" + path : "");

/* 封面优先用同目录下的 .webp（体积约为原图的 1/10 —— 原图仍留在仓库里，
   content.js 与主站完全不受影响）。浏览器不支持 WebP 或文件缺失时，
   下面的捕获阶段监听器会把 src 换回 data-fallback 里的原始路径。 */
const webpOf = (path) => (path ? A(path).replace(/\.(png|jpe?g)$/i, ".webp") : "");

function img(path, alt = "", attrs = "") {
  const original = A(path);
  const webp = webpOf(path);
  if (!webp || webp === original) return `<img src="${esc(original)}" alt="${esc(alt)}"${attrs ? " " + attrs : ""}>`;
  return `<img src="${esc(webp)}" data-fallback="${esc(original)}" alt="${esc(alt)}"${attrs ? " " + attrs : ""}>`;
}

// error 事件不冒泡，所以挂在捕获阶段
document.addEventListener(
  "error",
  (event) => {
    const el = event.target;
    if (el instanceof HTMLImageElement && el.dataset.fallback) {
      el.src = el.dataset.fallback;
      delete el.dataset.fallback;
    }
  },
  true
);
const DISPLAY_NAME = "Yuxuan Weng"; // site.name 在 content.js 里是不带空格的 "YuxuanWeng"
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ── 语言 ─────────────────────────────────────────────── */
const LANG_KEY = "portfolio-lang";
const getLang = () => (document.documentElement.getAttribute("data-lang") === "cn" ? "cn" : "en");
function setLang(lang) {
  document.documentElement.setAttribute("data-lang", lang);
  document.documentElement.lang = lang === "cn" ? "zh-Hans" : "en";
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch (e) {}
}

const esc = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const pick = (en, cn) => (getLang() === "cn" && cn ? cn : en);

/* ── 渲染 ─────────────────────────────────────────────── */
const ordered = getOrderedProjects();
const games = ordered.filter((p) => p.category === "games");
const research = ordered.filter((p) => p.category === "research");
const hardware = ordered.filter((p) => p.category === "hardware");
const featured = games[0] || ordered[0];

function metaLine(project) {
  return (project.detail?.meta || []).map((m) => pick(m.en, m.cn)).join(" · ");
}

function renderNav() {
  const other = getLang() === "cn" ? "EN" : "中文";
  return `
    <nav class="nav">
      <a class="brand" href="#top"><span class="brand-mark"></span><span>${esc(DISPLAY_NAME)}</span></a>
      <div class="nav-links">
        <a href="#games">${pick("Games", "游戏")}</a>
        <a href="#research">${pick("Research", "研究")}</a>
        <a href="#hardware">${pick("Hardware", "硬件")}</a>
        <a href="#papers">${pick("Papers", "论文")}</a>
        <a href="#about">${pick("About", "关于")}</a>
        <a href="../index.html">${pick("Full site", "完整站点")}</a>
        <button class="nav-toggle" type="button" id="lang-toggle">${other}</button>
      </div>
    </nav>`;
}

function renderHero() {
  const media = HERO_VIDEO
    ? `<video class="hero-video" src="${esc(HERO_VIDEO)}" muted playsinline preload="auto"></video>`
    : `<div class="hero-bg">${img(featured.cover, featured.titleEn)}</div>`;

  return `
    <section id="top" class="hero">
      ${media}
      <div class="hero-shade"></div>
      <p class="intro-copy">${pick(
        "Games, installations, and the things that are hard to say out loud.",
        "用身体、装置与游戏，去说那些说不出口的事。"
      )}</p>
      <div class="hero-content">
        <h1 class="hero-title">${esc(DISPLAY_NAME)}</h1>
        <p class="hero-cn">${esc(site.nameCn)}</p>
        <p class="hero-subtitle">${pick(site.tagline, site.taglineCn)} · MSc GDAT, NTU Singapore</p>
        <div class="hero-actions">
          <a class="paper-btn is-primary" href="#games">${pick("Play the games", "先玩游戏")}</a>
          <a class="paper-btn" href="#research">${pick("Research", "研究作品")}</a>
          <a class="paper-btn" href="#hardware">${pick("Installations", "装置作品")}</a>
          <a class="paper-btn" href="#papers">${pick("Papers", "论文")}</a>
          <a class="paper-btn" href="#about">${pick("About", "关于")}</a>
        </div>
      </div>
    </section>`;
}

function renderCinema() {
  const shots = games
    .map((p) => img(p.cover, p.titleEn, `data-slug="${esc(p.slug)}"`))
    .join("");

  return `
    <figure id="games" class="dash-panel">
      <figcaption>
        <span class="panel-num">01</span>
        <span class="panel-name">${pick("Games", "游戏")}</span>
        <span class="panel-note">${pick("Auto-playing · click any frame to take over", "自动演播 · 点任意一格接管")}</span>
      </figcaption>
      <div class="cinema">
        <div class="cinema-stage" id="cinema-stage">
          ${shots}
          <div class="cinema-veil"></div>
          <div class="cinema-copy">
            <p class="cinema-kicker" id="cinema-kicker"></p>
            <h3 class="cinema-title" id="cinema-title"></h3>
            <p class="cinema-desc" id="cinema-desc"></p>
            <div class="cinema-tags" id="cinema-tags"></div>
            <div class="cinema-acts" id="cinema-acts"></div>
          </div>
        </div>
        <div class="cinema-rail" id="cinema-rail"></div>
      </div>
    </figure>`;
}

function renderHardware() {
  const cards = hardware
    .map(
      (p) => `
      <a class="card" href="${esc(A(p.href))}">
        <div class="panel-media">${img(p.cover, p.titleEn)}</div>
        <div class="card-body">
          <h3>${esc(p.titleEn)}<small>${esc(p.titleCn)}</small></h3>
          <p>${esc(pick(p.detail?.overview?.en, p.detail?.overview?.cn))}</p>
          <div class="card-meta">${esc(metaLine(p))}</div>
        </div>
      </a>`
    )
    .join("");

  return `
    <figure id="hardware" class="dash-panel">
      <figcaption>
        <span class="panel-num">03</span>
        <span class="panel-name">${pick("Hardware", "硬件")}</span>
        <span class="panel-note">${pick(`Scroll parallax · ${hardware.length} works`, `滚动视差 · ${hardware.length} 件装置`)}</span>
      </figcaption>
      <div class="grid">${cards}</div>
    </figure>`;
}

function renderResearch() {
  const cards = research
    .map(
      (p) => `
      <a class="card" href="${esc(A(p.href))}">
        <div class="panel-media">${img(p.cover, p.titleEn)}</div>
        <div class="card-body">
          <h3>${esc(p.titleEn)}<small>${esc(p.titleCn)}</small></h3>
          <p>${esc(pick(p.detail?.overview?.en, p.detail?.overview?.cn))}</p>
          <div class="card-meta">${esc(metaLine(p))}</div>
        </div>
      </a>`
    )
    .join("");

  if (!research.length) return "";

  return `
    <figure id="research" class="dash-panel">
      <figcaption>
        <span class="panel-num">02</span>
        <span class="panel-name">${pick("Research", "研究")}</span>
        <span class="panel-note">${pick(`${research.length} studies and prototypes`, `${research.length} 项研究与原型`)}</span>
      </figcaption>
      <div class="grid">${cards}</div>
    </figure>`;
}

function renderAuthors(authors) {
  return (authors || [])
    .map((a) => {
      const name = esc(a.name);
      const marked = a.highlight ? `<b>${name}</b>` : name;
      return a.corresponding ? `${marked}<span style="color:var(--dim)">${pick(" (corresponding)", "（通讯作者）")}</span>` : marked;
    })
    .join(", ");
}

function renderPapers() {
  const rows = publications
    .map(
      (p, i) => `
      <div class="pub">
        <div class="pub-i">${String(i + 1).padStart(2, "0")}</div>
        <div>
          <p class="pub-venue">${esc((p.venues || []).map((v) => v.label).join(" · "))}</p>
          <h3 class="pub-title">${esc(p.title)}</h3>
          <p class="pub-au">${renderAuthors(p.authors)}</p>
          ${p.status ? `<span class="pub-badge">${esc(p.status)}</span>` : ""}
          ${
            (p.links || []).length
              ? `<div class="pub-links">${p.links
                  .map((l) => {
                    const external = /^https?:/.test(l.href);
                    const href = external ? l.href : A(l.href);
                    return `<a class="pub-link" href="${esc(href)}"${
                      external ? ' target="_blank" rel="noopener noreferrer"' : ""
                    }>${esc(l.label)}${external ? " ↗" : ""}</a>`;
                  })
                  .join("")}</div>`
              : ""
          }
        </div>
      </div>`
    )
    .join("");

  const firstAuthor = publications.filter((p) => p.authors?.[0]?.highlight).length;
  return `
    <figure id="papers" class="dash-panel">
      <figcaption>
        <span class="panel-num">04</span>
        <span class="panel-name">${pick("Publications", "论文")}</span>
        <span class="panel-note">${pick(`${firstAuthor} as first author`, `${firstAuthor} 篇一作`)}</span>
      </figcaption>
      <div class="pubs">${rows}</div>
    </figure>`;
}

function renderAbout() {
  const bio = (getLang() === "cn" ? about.bioCn : about.bioEn) || [];
  const news = (getLang() === "cn" ? about.newsCn : about.newsEn) || [];
  return `
    <figure id="about" class="dash-panel">
      <figcaption>
        <span class="panel-num">05</span>
        <span class="panel-name">${pick("About", "关于")}</span>
        <span class="panel-note">Last update · ${esc(site.lastUpdate)}</span>
      </figcaption>
      <div class="about">
        <div>
          ${img(about.photo, about.nameDisplay, 'class="portrait"')}
          <p class="about-pron">${esc(about.nameDisplay)}<br>${esc(about.pronunciation)}</p>
        </div>
        <div class="about-body">
          ${bio.map((paragraph) => `<p class="bio">${esc(paragraph)}</p>`).join("")}
          <div class="news">
            ${news
              .map(
                (item) => `<div class="news-row">
                  <div class="news-date">${esc(item.date)}</div>
                  <p class="news-text">${item.text}</p>
                </div>`
              )
              .join("")}
          </div>
          <div class="reading">
            ${(about.readingList || [])
              .map((b) => `<div class="book"><b>${esc(b.title)}</b>${esc(b.author)}</div>`)
              .join("")}
          </div>
          <div class="seeking">
            ${pick(
              "Open to game design internships and junior roles.",
              "正在求职：游戏设计实习 / 初级岗位。"
            )}
            &nbsp;—&nbsp;<a href="mailto:${esc(site.email)}">${esc(site.email)}</a>
          </div>
        </div>
      </div>
    </figure>`;
}

function renderPage() {
  return `
    ${renderNav()}
    ${renderHero()}
    <section class="section">
      <div class="section-inner">
        <div class="reveal">
          <h2 class="paper-heading">Dashboard</h2>
          <div class="heading-rule"></div>
          <p class="section-lede">${pick(
            `${ordered.length} projects, ${publications.length} papers, and a CV still in motion. Games come first — they are what I want you to play.`,
            `${ordered.length} 个项目、${publications.length} 篇论文，以及一段还在往前走的履历。游戏在最前面，因为那是我最想让你先玩到的部分。`
          )}</p>
        </div>
        <div class="dash-flow">
          ${renderCinema()}
          ${renderResearch()}
          ${renderHardware()}
          ${renderPapers()}
          ${renderAbout()}
        </div>
      </div>
    </section>
    <footer class="footer">
      ${esc(about.nameDisplay)} · ${esc(pick(site.tagline, site.taglineCn))} · Last update ${esc(site.lastUpdate)}<br>
      ${pick("Structure and motion ported from the vibegame.tettet.org teardown.", "结构与动效移植自 vibegame.tettet.org 的拆解")}
      · <a href="../index.html">${pick("Back to the full site", "回到完整站点")}</a>
    </footer>`;
}

/* ── 1. 星空 canvas ───────────────────────────────────── */
function initStars() {
  const canvas = document.getElementById("stars");
  if (!canvas || reduceMotion) return;
  const ctx = canvas.getContext("2d");
  let stars = [];

  function resizeStars() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // 封顶 2，别在 3x 屏上白烧
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // 之后全用 CSS 像素写坐标
    stars = Array.from({ length: Math.min(120, Math.floor(window.innerWidth / 12)) }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.4,
      v: Math.random() * 0.18 + 0.04,
      a: Math.random() * 0.55 + 0.25,
    }));
  }

  function drawStars() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (const s of stars) {
      s.y += s.v;
      if (s.y > window.innerHeight + 6) s.y = -6; // 回卷，不重建数组
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 248, 220, ${s.a})`;
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(drawStars);
  }

  window.addEventListener("resize", resizeStars);
  resizeStars();
  drawStars();
}

/* ── 3. 滚动入场 ──────────────────────────────────────── */
function initReveal() {
  const targets = document.querySelectorAll(".reveal, .dash-panel");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.15 }
  );
  targets.forEach((el) => observer.observe(el));
  // 兜底：observer 若因任何原因没触发，1.4s 后全部显形
  window.setTimeout(() => targets.forEach((el) => el.classList.add("visible")), 1400);
}

/* ── 4. 滚动视差 ──────────────────────────────────────── */
function initParallax() {
  const media = Array.from(document.querySelectorAll(".panel-media img"));
  if (!media.length || reduceMotion) return;
  let ticking = false;

  function update() {
    ticking = false;
    const vh = window.innerHeight;
    for (const img of media) {
      const r = img.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) continue; // 视口外直接跳过
      const delta = (r.top + r.height / 2 - vh / 2) / vh; // -0.5 ~ 0.5
      img.style.setProperty("--para", (delta * 4).toFixed(2) + "%");
    }
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
}

/* ── 5. Games 自动演播 ────────────────────────────────── */
function initCinema() {
  const stage = document.getElementById("cinema-stage");
  const rail = document.getElementById("cinema-rail");
  if (!stage || !rail || !games.length) return;

  // 分幕数组：最后一幕 duration = Infinity，演完不结束 = 把控制权交还用户
  const stages = games.map((project, index) => ({
    project,
    duration: index === games.length - 1 ? Infinity : STAGE_MS,
    kicker: [
      `${String(index + 1).padStart(2, "0")} / ${String(games.length).padStart(2, "0")}`,
      project.titleEn.toUpperCase(),
      (getLang() === "cn" ? project.tagsCn : project.tagsEn)?.[0],
      project.detail?.meta?.slice(-1)[0] ? pick(project.detail.meta.slice(-1)[0].en, project.detail.meta.slice(-1)[0].cn) : "",
    ]
      .filter(Boolean)
      .join(" · "),
  }));

  const shots = Object.fromEntries(
    Array.from(stage.querySelectorAll("img")).map((img) => [img.dataset.slug, img])
  );
  const kicker = document.getElementById("cinema-kicker");
  const title = document.getElementById("cinema-title");
  const desc = document.getElementById("cinema-desc");
  const tagBox = document.getElementById("cinema-tags");
  const actBox = document.getElementById("cinema-acts");

  rail.innerHTML = stages
    .map(
      (s, i) => `
      <button class="rail-frame" type="button" data-i="${i}">
        ${img(s.project.cover)}
        <span class="rail-name">${String(i + 1).padStart(2, "0")} · ${esc(s.project.titleEn)}</span>
        <span class="rail-bar"></span>
      </button>`
    )
    .join("");
  const frames = Array.from(rail.querySelectorAll(".rail-frame"));
  const bars = Array.from(rail.querySelectorAll(".rail-bar"));

  let current = 0;
  let startedAt = 0;
  let raf = 0;
  let hasStarted = false;
  let isInViewport = false;
  let walkthroughObserver = null;

  function actionsFor(project) {
    const out = [];
    const demo = project.detail?.demo;
    if (demo?.href) {
      const label = pick(demo.labelEn || "Play demo", demo.labelCn || "运行 Demo");
      out.push(
        demo.embed
          ? `<a class="paper-btn is-primary" href="${esc(A(demo.href))}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>`
          : `<a class="paper-btn is-primary" href="${esc(A(demo.href))}" download>${esc(label)}</a>`
      );
    }
    if (project.detail?.video) {
      out.push(
        `<a class="paper-btn" href="${esc(project.detail.video)}" target="_blank" rel="noopener noreferrer">${pick("Watch trailer", "观看预告")} ↗</a>`
      );
    }
    out.push(`<a class="paper-btn" href="${esc(A(project.href))}">${pick("View case", "查看案例")}</a>`);
    return out.join("");
  }

  function showStage(index) {
    current = index;
    const { project, kicker: kickerText } = stages[index];
    Object.values(shots).forEach((img) => img.classList.remove("is-live"));
    shots[project.slug]?.classList.add("is-live");
    kicker.textContent = kickerText;
    title.innerHTML = `${esc(project.titleEn)}<small>${esc(project.titleCn)}</small>`;
    desc.textContent = pick(project.detail?.overview?.en, project.detail?.overview?.cn) || "";
    tagBox.innerHTML = ((getLang() === "cn" ? project.tagsCn : project.tagsEn) || [])
      .map((t) => `<span class="tag">${esc(t)}</span>`)
      .join("");
    actBox.innerHTML = actionsFor(project);
    frames.forEach((f, i) => f.classList.toggle("is-active", i === index));
    bars.forEach((b) => (b.style.width = "0"));
    startedAt = performance.now();
  }

  function tick(now) {
    const { duration } = stages[current];
    if (!isFinite(duration)) {
      bars[current].style.width = "100%";
      raf = 0;
      return; // 最后一幕：停在这里，等用户操作
    }
    const progress = Math.min(1, (now - startedAt) / duration);
    bars[current].style.width = (progress * 100).toFixed(2) + "%";
    if (progress >= 1) showStage((current + 1) % stages.length);
    raf = requestAnimationFrame(tick);
  }

  function maybeStartWalkthrough() {
    if (reduceMotion || hasStarted || !isInViewport) return;
    hasStarted = true;
    showStage(0);
    raf = requestAnimationFrame(tick);
    walkthroughObserver?.disconnect(); // 只演一次
  }

  function takeWalkthroughControl() {
    hasStarted = true;
    if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
    bars.forEach((b) => (b.style.width = "0"));
    walkthroughObserver?.disconnect();
  }

  frames.forEach((frame) =>
    frame.addEventListener("click", () => {
      takeWalkthroughControl(); // 用户一点就中断自动演播
      const index = Number(frame.dataset.i);
      showStage(index);
      bars[index].style.width = "100%";
    })
  );

  showStage(0);
  bars[0].style.width = "0";

  walkthroughObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isInViewport = entry.isIntersecting;
        maybeStartWalkthrough();
      });
    },
    { threshold: 0.35 }
  );
  walkthroughObserver.observe(stage);
}

/* ── 2. 预加载门 + 零计时器首屏编排 ───────────────────── */
function initPreloader() {
  const hero = document.querySelector(".hero");
  const preloader = document.getElementById("preloader");
  const label = preloader?.querySelector(".pre-label");
  const logo = preloader?.querySelector(".pre-logo");
  const video = document.querySelector(".hero-video");
  let entered = false;

  // 节拍写进 CSS 变量，CSS 那边用 var(--t-enter) 之类读取
  const beats = TIMELINE[video ? "video" : "image"];
  if (hero) {
    hero.style.setProperty("--t-intro", beats.intro);
    hero.style.setProperty("--t-enter", beats.enter);
    hero.style.setProperty("--t-exit", beats.exit);
    hero.style.setProperty("--t-lift", beats.lift);
    hero.style.setProperty("--t-actions", beats.actions);
  }
  const introCopy = document.querySelector(".intro-copy");
  if (introCopy) introCopy.style.setProperty("--t-intro", beats.intro);

  // 加载期间：logo 朝光标缓动位移。用 CSS transition（走合成层），
  // 不用每帧 rAF —— 图片和视频正在抢主线程，这样才不会卡。
  if (logo && !reduceMotion) {
    window.addEventListener("mousemove", (event) => {
      if (entered) return;
      const tX = (event.clientX - window.innerWidth / 2) * 0.15;
      const tY = (event.clientY - window.innerHeight / 2) * 0.15;
      logo.style.transform = `translate3d(${tX.toFixed(1)}px, ${tY.toFixed(1)}px, 0)`;
    });
  }

  const pauseTimeline = () => hero?.classList.add("is-paused");
  const resumeTimeline = () => hero?.classList.remove("is-paused");

  if (video) {
    video.muted = true;
    video.setAttribute("muted", "");
    video.playsInline = true;
    video.addEventListener("playing", () => entered && resumeTimeline());
    video.addEventListener("waiting", () => entered && pauseTimeline());
    video.addEventListener("stalled", () => entered && pauseTimeline());
    video.addEventListener("pause", () => entered && pauseTimeline());
    video.addEventListener("ended", () => {
      if (!entered) return;
      video.currentTime = 0;
      video.play().catch(() => {});
    });
    document.addEventListener("visibilitychange", () => {
      if (!entered) return;
      if (document.hidden) {
        pauseTimeline();
        video.pause();
      } else video.play().catch(() => {});
    });
  }

  function enter() {
    if (entered) return;
    entered = true;
    document.documentElement.style.overflow = "";
    if (preloader) {
      preloader.classList.add("hidden");
      window.setTimeout(() => preloader.remove(), reduceMotion ? 0 : 800);
    }
    if (video) {
      try {
        video.currentTime = 0;
      } catch (e) {}
      video.play().catch(() => {});
    }
    if (hero) {
      hero.classList.remove("is-ready", "is-paused");
      void hero.offsetWidth; // ← 关键：强制回流，让整条编排从 0 重放
      hero.classList.add("is-ready");
    }
  }

  if (!preloader) {
    enter();
    return;
  }
  document.documentElement.style.overflow = "hidden";

  // 开闸条件写成步骤数组：每项只判断「够用了没」，不等全部资源。
  const decoded = new Set();
  function watch(src, key) {
    if (!src) return decoded.add(key);
    const image = new Image();
    const settle = () => decoded.add(key);
    image.onload = () => (image.decode ? image.decode().then(settle, settle) : settle());
    image.onerror = settle;
    image.src = src;
  }
  if (!video) watch(webpOf(featured.cover) || A(featured.cover), "hero");
  games.slice(0, 3).forEach((p, i) => watch(webpOf(p.cover) || A(p.cover), "shot" + i));

  const openedAt = performance.now();
  const steps = [];
  if (video) {
    steps.push({
      name: "teaser",
      done: () => {
        const b = video.buffered;
        return isFinite(video.duration) && video.duration > 0 && b.length > 0 && b.end(b.length - 1) >= video.duration - 0.5;
      },
    });
    video.addEventListener("error", () => enter(), { once: true });
  } else {
    steps.push({ name: "hero", done: () => decoded.has("hero") });
  }
  steps.push({ name: "art", done: () => games.slice(0, 3).every((_, i) => decoded.has("shot" + i)) });
  steps.push({ name: "beat", done: () => performance.now() - openedAt > 620 });

  const poll = window.setInterval(() => {
    let done = 0;
    for (const step of steps) {
      try {
        if (step.done()) done += 1;
      } catch (e) {}
    }
    if (label) label.textContent = `Loading ${done} / ${steps.length}`;
    if (done >= steps.length) {
      window.clearInterval(poll);
      enter();
    }
  }, 120);
  window.setTimeout(() => {
    window.clearInterval(poll);
    enter();
  }, 20000); // 安全网：无论如何都要放人进来
}

/* ── 启动 ─────────────────────────────────────────────── */
function mount({ replay = false } = {}) {
  const root = document.getElementById("play-root");
  if (!root) return;
  root.innerHTML = renderPage();

  document.getElementById("lang-toggle")?.addEventListener("click", () => {
    setLang(getLang() === "cn" ? "en" : "cn");
    mount({ replay: true });
  });

  initReveal();
  initParallax();
  initCinema();

  if (replay) {
    // 切语言后重建了 DOM：跳过预加载门，直接进入已就绪状态
    document.querySelector(".hero")?.classList.add("is-ready");
    document.querySelectorAll(".reveal, .dash-panel").forEach((el) => el.classList.add("visible"));
  } else {
    initStars();
    initPreloader();
  }
}

try {
  const stored = localStorage.getItem(LANG_KEY);
  if (stored === "cn" || stored === "en") setLang(stored);
} catch (e) {}

document.addEventListener("DOMContentLoaded", () => mount());

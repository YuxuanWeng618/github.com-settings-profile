// See js/lang.js for why every import specifier carries the same ?v= token.
import { protectedDocs } from "./content.js?v=20260916i";

const PBKDF2_ITERATIONS = 250000;
const MAGIC = "CDOC1\0";

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderInline(text) {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>")
    .replace(
      /\[([^\]]+)\]\((https?:[^)\s]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );
}

function isTableSeparator(line) {
  return /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(line);
}

function splitTableRow(line) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function markdownToHtml(source) {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (line.trim().startsWith("```")) {
      const code = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      index += 1;
      html.push(`<pre class="docs-code"><code>${escapeHtml(code.join("\n"))}</code></pre>`);
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      const level = Math.min(heading[1].length + 1, 6);
      html.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      index += 1;
      continue;
    }

    if (/^\s*(---|\*\*\*|___)\s*$/.test(line)) {
      html.push('<hr class="section-divider" />');
      index += 1;
      continue;
    }

    if (
      line.trim().startsWith("|") &&
      index + 1 < lines.length &&
      isTableSeparator(lines[index + 1])
    ) {
      const head = splitTableRow(line);
      index += 2;
      const body = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        body.push(splitTableRow(lines[index]));
        index += 1;
      }
      const headHtml = head.map((cell) => `<th>${renderInline(cell)}</th>`).join("");
      const bodyHtml = body
        .map((row) => `<tr>${row.map((cell) => `<td>${renderInline(cell)}</td>`).join("")}</tr>`)
        .join("");
      html.push(
        `<div class="docs-table-wrap"><table class="docs-table"><thead><tr>${headHtml}</tr></thead><tbody>${bodyHtml}</tbody></table></div>`
      );
      continue;
    }

    const bulletMatch = line.match(/^\s*[-*]\s+(.*)$/);
    if (bulletMatch) {
      const items = [];
      while (index < lines.length) {
        const item = lines[index].match(/^\s*[-*]\s+(.*)$/);
        if (!item) break;
        items.push(`<li>${renderInline(item[1])}</li>`);
        index += 1;
      }
      html.push(`<ul class="docs-list">${items.join("")}</ul>`);
      continue;
    }

    const orderedMatch = line.match(/^\s*\d+[.)]\s+(.*)$/);
    if (orderedMatch) {
      const items = [];
      while (index < lines.length) {
        const item = lines[index].match(/^\s*\d+[.)]\s+(.*)$/);
        if (!item) break;
        items.push(`<li>${renderInline(item[1])}</li>`);
        index += 1;
      }
      html.push(`<ol class="docs-list">${items.join("")}</ol>`);
      continue;
    }

    if (line.trim().startsWith(">")) {
      const quote = [];
      while (index < lines.length && lines[index].trim().startsWith(">")) {
        quote.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }
      html.push(`<blockquote>${renderInline(quote.join(" "))}</blockquote>`);
      continue;
    }

    if (line.trim() === "") {
      index += 1;
      continue;
    }

    const paragraph = [];
    while (
      index < lines.length &&
      lines[index].trim() !== "" &&
      !lines[index].trim().startsWith("```") &&
      !lines[index].trim().startsWith("|") &&
      !/^#{1,6}\s/.test(lines[index]) &&
      !/^\s*[-*]\s+/.test(lines[index]) &&
      !/^\s*\d+[.)]\s+/.test(lines[index])
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    html.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
  }

  return html.join("\n");
}

async function deriveKey(password, salt) {
  const material = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );
}

async function decryptFile(password, src) {
  const response = await fetch(src, { cache: "no-store" });
  if (!response.ok) throw new Error(`Cannot load ${src}`);

  const container = new Uint8Array(await response.arrayBuffer());
  const magic = new TextDecoder().decode(container.slice(0, MAGIC.length));
  if (magic !== MAGIC) throw new Error(`Unexpected container format in ${src}`);

  const salt = container.slice(MAGIC.length, MAGIC.length + 16);
  const iv = container.slice(MAGIC.length + 16, MAGIC.length + 28);
  const payload = container.slice(MAGIC.length + 28);
  const key = await deriveKey(password, salt);

  return crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, payload);
}

function renderFileActions(file, objectUrl) {
  return `
    <p class="docs-file-actions">
      <a href="${objectUrl}" target="_blank" rel="noopener noreferrer">
        <span class="lang-en-only">Open ${file.labelEn}</span>
        <span class="lang-cn-only">打开${file.labelCn}</span>
      </a>
      <a href="${objectUrl}" download="${file.filename}">
        <span class="lang-en-only">Download</span>
        <span class="lang-cn-only">下载</span>
      </a>
    </p>
  `;
}

function currentDoc() {
  const requested = new URLSearchParams(window.location.search).get("doc");
  return protectedDocs[requested] || protectedDocs.comet;
}

export function renderDocs() {
  const doc = currentDoc();
  const files = doc.files
    .map(
      (file) => `
        <li>
          <span class="lang-en-only">${file.labelEn}</span>
          <span class="lang-cn-only">${file.labelCn}</span>
        </li>
      `
    )
    .join("");

  return `
    <section class="docs-page">
      <h1 class="docs-title">
        <span class="lang-en-only">${doc.titleEn}</span>
        <span class="lang-cn-only">${doc.titleCn}</span>
      </h1>

      <p class="docs-intro lang-en-only">${doc.introEn}</p>
      <p class="docs-intro lang-cn-only">${doc.introCn}</p>

      <ul class="docs-file-list">${files}</ul>

      <form class="docs-gate" id="docs-gate" autocomplete="off">
        <label class="docs-gate-label" for="docs-password">
          <span class="lang-en-only">Access password</span>
          <span class="lang-cn-only">访问密码</span>
        </label>
        <div class="docs-gate-row">
          <input
            class="docs-gate-input"
            id="docs-password"
            name="docs-password"
            type="password"
            autocomplete="off"
            spellcheck="false"
          />
          <button class="docs-gate-button" type="submit">
            <span class="lang-en-only">Unlock</span>
            <span class="lang-cn-only">解锁</span>
          </button>
        </div>
        <p class="docs-gate-status" id="docs-status" role="status" aria-live="polite"></p>
      </form>

      <div class="docs-viewer" id="docs-viewer" hidden></div>
    </section>
  `;
}

export function bindDocs() {
  const doc = currentDoc();
  const form = document.getElementById("docs-gate");
  const input = document.getElementById("docs-password");
  const status = document.getElementById("docs-status");
  const viewer = document.getElementById("docs-viewer");
  if (!form || !input || !status || !viewer) return;

  const setStatus = (en, cn) => {
    status.innerHTML = `<span class="lang-en-only">${en}</span><span class="lang-cn-only">${cn}</span>`;
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const password = input.value;
    if (!password) {
      setStatus("Enter the password to continue.", "请输入密码后继续。");
      return;
    }

    setStatus("Unlocking…", "正在解锁…");

    try {
      const decrypted = await Promise.all(
        doc.files.map((file) => decryptFile(password, file.src))
      );

      const parts = doc.files.map((file, i) => {
        const buffer = decrypted[i];

        if (file.kind === "markdown") {
          const text = new TextDecoder().decode(buffer);
          const url = URL.createObjectURL(
            new Blob([buffer], { type: "text/markdown;charset=utf-8" })
          );
          return `
            <article class="docs-document">
              ${renderFileActions(file, url)}
              <div class="docs-markdown">${markdownToHtml(text)}</div>
            </article>
          `;
        }

        const url = URL.createObjectURL(new Blob([buffer], { type: "application/pdf" }));
        return `
          <article class="docs-document">
            ${renderFileActions(file, url)}
            <div class="docs-pdf-frame">
              <iframe src="${url}" title="${file.labelEn}" loading="lazy"></iframe>
            </div>
          </article>
        `;
      });

      viewer.innerHTML = parts.join("");
      viewer.hidden = false;
      form.hidden = true;
      input.value = "";
    } catch (error) {
      setStatus("That password did not work.", "密码不正确。");
    }
  });
}

/**
 * Hover magnify — points the CSS scale at whatever the cursor is over, so a
 * clipped frame reveals the part of the image under the pixel magnifier rather
 * than always pushing out from the centre.
 *
 * The scale itself lives in css/main.css; this only moves transform-origin.
 * Listeners are delegated from the document because pages render their markup
 * after load.
 */

const FRAME_SELECTOR = ".project-thumb, .project-detail-figure-detail";

let queued = null;
let frameId = 0;

function clamp(value) {
  return Math.min(100, Math.max(0, Math.round(value * 10) / 10));
}

function applyOrigin() {
  frameId = 0;
  if (!queued) return;

  const { frame, clientX, clientY } = queued;
  queued = null;

  const image = frame.querySelector("img");
  if (!image) return;

  const box = frame.getBoundingClientRect();
  if (!box.width || !box.height) return;

  const x = clamp(((clientX - box.left) / box.width) * 100);
  const y = clamp(((clientY - box.top) / box.height) * 100);
  image.style.transformOrigin = `${x}% ${y}%`;
}

function onPointerMove(event) {
  const frame = event.target.closest?.(FRAME_SELECTOR);
  if (!frame) return;

  queued = { frame, clientX: event.clientX, clientY: event.clientY };
  if (!frameId) frameId = requestAnimationFrame(applyOrigin);
}

function onPointerOut(event) {
  const frame = event.target.closest?.(FRAME_SELECTOR);
  if (!frame) return;

  // pointerout also fires when moving between children of the same frame.
  const to = event.relatedTarget;
  if (to && frame.contains(to)) return;

  if (queued?.frame === frame) queued = null;
  const image = frame.querySelector("img");
  if (image) image.style.transformOrigin = "";
}

export function initHoverZoom() {
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!canHover || reduceMotion) return;

  document.addEventListener("pointermove", onPointerMove, { passive: true });
  document.addEventListener("pointerout", onPointerOut, { passive: true });
}

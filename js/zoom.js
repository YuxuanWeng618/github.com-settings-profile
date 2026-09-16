/**
 * Hover magnify with a spring curve matching CardSpring.cs:
 *   scaleSpring { stiffness: 900, damping: 30 }
 *   hoverScale  1.15
 *
 * Transform-origin follows the cursor so clipped frames magnify under the pointer.
 */

const FRAME_CLIPPED = ".project-thumb, .project-detail-figure-detail";
const FRAME_WHOLE =
  ".publication-figure, .project-detail-figure-top, .project-detail-figure-overall";
/** Grid covers stay subtle so neighbouring cards and captions do not shift. */
const FRAME_COVER = ".project-thumb";

/** Matches CardSpring scaleSpring */
const STIFFNESS = 900;
const DAMPING = 30;
/** Matches CardSpring hoverScale */
const HOVER_SCALE = 1.15;
const HOVER_SCALE_WHOLE = 1.15;
const HOVER_SCALE_COVER = 1.04;

const states = new WeakMap();
let active = new Set();
let raf = 0;
let queuedOrigin = null;
let originRaf = 0;

function clampOrigin(value) {
  return Math.min(100, Math.max(0, Math.round(value * 10) / 10));
}

function springStep(state, target, dt) {
  // Classic spring-damper used by Unity-style CardSpring.Step:
  // force = (target - value) * stiffness - velocity * damping
  const force = (target - state.value) * STIFFNESS - state.velocity * DAMPING;
  state.velocity += force * dt;
  state.value += state.velocity * dt;

  // Settle when close enough to avoid infinite micro-motion.
  if (
    Math.abs(target - state.value) < 0.0004 &&
    Math.abs(state.velocity) < 0.0004
  ) {
    state.value = target;
    state.velocity = 0;
  }

  return state.value;
}

function getTarget(el) {
  if (el.matches?.(FRAME_COVER)) return HOVER_SCALE_COVER;
  const clipped = el.matches?.(FRAME_CLIPPED) || el.closest?.(FRAME_CLIPPED);
  if (clipped && clipped === el) return HOVER_SCALE;
  if (el.matches?.(FRAME_WHOLE)) return HOVER_SCALE_WHOLE;
  return HOVER_SCALE;
}

function resolveImage(frame) {
  if (frame.matches(FRAME_CLIPPED)) {
    return frame.querySelector("img");
  }
  return frame;
}

function ensureState(frame) {
  let state = states.get(frame);
  if (state) return state;

  state = {
    frame,
    image: null,
    value: 1,
    velocity: 0,
    target: 1,
    hovering: false,
  };
  states.set(frame, state);
  return state;
}

function applyTransform(state) {
  const image = state.image || resolveImage(state.frame);
  if (!image) return;
  state.image = image;
  const s = state.value;
  image.style.transform = s === 1 ? "" : `scale(${s})`;
}

function tick(now) {
  raf = 0;
  if (!tick.last) tick.last = now;
  let dt = (now - tick.last) / 1000;
  tick.last = now;
  // Clamp dt so tab-switches don't explode the spring.
  dt = Math.min(0.032, Math.max(0.001, dt));

  const finished = [];
  for (const frame of active) {
    const state = states.get(frame);
    if (!state) {
      finished.push(frame);
      continue;
    }
    springStep(state, state.target, dt);
    applyTransform(state);
    if (state.value === state.target && state.velocity === 0 && !state.hovering) {
      finished.push(frame);
    }
  }

  for (const frame of finished) {
    active.delete(frame);
    const state = states.get(frame);
    if (state?.image) state.image.style.transform = "";
  }

  if (active.size) {
    raf = requestAnimationFrame(tick);
  } else {
    tick.last = 0;
  }
}

function startLoop() {
  if (!raf) {
    tick.last = 0;
    raf = requestAnimationFrame(tick);
  }
}

function setHover(frame, hovering) {
  const state = ensureState(frame);
  state.image = resolveImage(frame);
  state.hovering = hovering;
  state.target = hovering ? getTarget(frame) : 1;
  active.add(frame);
  if (state.image) state.image.style.willChange = "transform";
  startLoop();
}

function applyOrigin() {
  originRaf = 0;
  if (!queuedOrigin) return;
  const { frame, clientX, clientY } = queuedOrigin;
  queuedOrigin = null;

  const image = resolveImage(frame);
  if (!image || image === frame) return;

  const box = frame.getBoundingClientRect();
  if (!box.width || !box.height) return;

  const x = clampOrigin(((clientX - box.left) / box.width) * 100);
  const y = clampOrigin(((clientY - box.top) / box.height) * 100);
  image.style.transformOrigin = `${x}% ${y}%`;
}

function onPointerMove(event) {
  const clipped = event.target.closest?.(FRAME_CLIPPED);
  if (clipped) {
    queuedOrigin = { frame: clipped, clientX: event.clientX, clientY: event.clientY };
    if (!originRaf) originRaf = requestAnimationFrame(applyOrigin);
  }
}

function onPointerOver(event) {
  const clipped = event.target.closest?.(FRAME_CLIPPED);
  const whole = event.target.closest?.(FRAME_WHOLE);
  const frame = clipped || whole;
  if (!frame) return;

  // Ignore bubbling from child → parent of same frame.
  const from = event.relatedTarget;
  if (from && frame.contains(from)) return;

  setHover(frame, true);
}

function onPointerOut(event) {
  const clipped = event.target.closest?.(FRAME_CLIPPED);
  const whole = event.target.closest?.(FRAME_WHOLE);
  const frame = clipped || whole;
  if (!frame) return;

  const to = event.relatedTarget;
  if (to && frame.contains(to)) return;

  if (queuedOrigin?.frame === frame) queuedOrigin = null;
  const image = resolveImage(frame);
  if (image && image !== frame) image.style.transformOrigin = "";
  setHover(frame, false);
}

export function initHoverZoom() {
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!canHover || reduceMotion) return;

  document.documentElement.classList.add("js-spring-zoom");
  document.addEventListener("pointermove", onPointerMove, { passive: true });
  document.addEventListener("pointerover", onPointerOver, { passive: true });
  document.addEventListener("pointerout", onPointerOut, { passive: true });
}

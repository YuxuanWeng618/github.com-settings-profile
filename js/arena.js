const TYPES = [
  { id: "ember", fill: ["#ffb068", "#ff5d2a"], juice: "#ff8a3d" },
  { id: "ice", fill: ["#d7f6ff", "#3aa7d8"], juice: "#7ad7ff" },
  { id: "rune", fill: ["#fff4d8", "#c45a12"], juice: "#f8f6ef" },
];

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function pick(list) {
  return list[(Math.random() * list.length) | 0];
}

function dist2(ax, ay, bx, by) {
  const dx = ax - bx;
  const dy = ay - by;
  return dx * dx + dy * dy;
}

function segmentHitsCircle(x1, y1, x2, y2, cx, cy, r) {
  const vx = x2 - x1;
  const vy = y2 - y1;
  const wx = cx - x1;
  const wy = cy - y1;
  const len2 = vx * vx + vy * vy || 1;
  let t = (wx * vx + wy * vy) / len2;
  t = Math.max(0, Math.min(1, t));
  const px = x1 + vx * t;
  const py = y1 + vy * t;
  return dist2(px, py, cx, cy) <= r * r;
}

function drawToken(ctx, body) {
  const [c0, c1] = body.palette.fill;
  const g = ctx.createRadialGradient(-body.r * 0.35, -body.r * 0.4, body.r * 0.1, 0, 0, body.r);
  g.addColorStop(0, c0);
  g.addColorStop(1, c1);
  ctx.fillStyle = g;
  ctx.beginPath();
  if (body.palette.id === "rune") {
    const s = body.r * 0.78;
    ctx.roundRect(-s, -s, s * 2, s * 2, s * 0.35);
  } else if (body.palette.id === "ice") {
    ctx.moveTo(0, -body.r);
    for (let i = 1; i < 6; i += 1) {
      const a = (Math.PI / 3) * i - Math.PI / 2;
      ctx.lineTo(Math.cos(a) * body.r, Math.sin(a) * body.r);
    }
    ctx.closePath();
  } else {
    ctx.arc(0, 0, body.r, 0, Math.PI * 2);
  }
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.35)";
  ctx.beginPath();
  ctx.ellipse(-body.r * 0.28, -body.r * 0.32, body.r * 0.28, body.r * 0.18, -0.5, 0, Math.PI * 2);
  ctx.fill();
}

export function bindArena() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const host = document.querySelector(".play-hero");
  const stage = document.querySelector(".play-hero-stage");
  if (!host || !stage || document.querySelector(".play-arena")) return;

  const canvas = document.createElement("canvas");
  canvas.className = "play-arena";
  canvas.setAttribute("aria-hidden", "true");
  host.prepend(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let w = 0;
  let h = 0;
  let last = performance.now();
  let spawnIn = 0.25;
  const bodies = [];
  const sparks = [];
  const trail = [];
  const pointer = { x: 0, y: 0, active: false };

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const box = stage.getBoundingClientRect();
    w = Math.max(1, Math.floor(box.width));
    h = Math.max(1, Math.floor(box.height));
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function spawn() {
    if (bodies.filter((b) => !b.half).length > 7) return;
    const palette = pick(TYPES);
    bodies.push({
      x: rand(w * 0.12, w * 0.88),
      y: h + 48,
      vx: rand(-220, 220),
      vy: rand(-1180, -820),
      r: rand(22, 38),
      rot: rand(0, Math.PI * 2),
      vr: rand(-2.4, 2.4),
      palette,
      half: false,
      side: 0,
      angle: 0,
    });
  }

  function burst(x, y, color) {
    for (let i = 0; i < 14; i += 1) {
      const a = rand(0, Math.PI * 2);
      const s = rand(80, 280);
      sparks.push({
        x,
        y,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s - 40,
        life: 1,
        color,
        r: rand(1.4, 3.4),
      });
    }
  }

  function slice(body, x1, y1, x2, y2) {
    const nx = x2 - x1;
    const ny = y2 - y1;
    const angle = Math.atan2(ny, nx);
    const kick = 260;
    body.gone = true;
    burst(body.x, body.y, body.palette.juice);
    [-1, 1].forEach((side) => {
      bodies.push({
        x: body.x,
        y: body.y,
        vx: body.vx + Math.cos(angle + Math.PI / 2) * kick * side,
        vy: body.vy + Math.sin(angle + Math.PI / 2) * kick * side - 40,
        r: body.r,
        rot: body.rot,
        vr: body.vr + side * 3,
        palette: body.palette,
        half: true,
        side,
        angle,
      });
    });
  }

  function step(dt) {
    spawnIn -= dt;
    if (spawnIn <= 0) {
      spawn();
      spawnIn = rand(0.55, 1.15);
    }

    const g = 1680;
    for (const body of bodies) {
      body.vy += g * dt;
      body.x += body.vx * dt;
      body.y += body.vy * dt;
      body.rot += body.vr * dt;
    }

    for (const spark of sparks) {
      spark.vy += 900 * dt;
      spark.x += spark.vx * dt;
      spark.y += spark.vy * dt;
      spark.life -= dt * 1.8;
    }

    for (let i = trail.length - 1; i >= 0; i -= 1) {
      trail[i].life -= dt * 4.2;
      if (trail[i].life <= 0) trail.splice(i, 1);
    }

    if (trail.length > 1) {
      for (const body of bodies) {
        if (body.half || body.gone) continue;
        for (let i = 1; i < trail.length; i += 1) {
          const a = trail[i - 1];
          const b = trail[i];
          if (dist2(a.x, a.y, b.x, b.y) < 36) continue;
          if (segmentHitsCircle(a.x, a.y, b.x, b.y, body.x, body.y, body.r * 0.92)) {
            slice(body, a.x, a.y, b.x, b.y);
            break;
          }
        }
      }
    }

    for (let i = bodies.length - 1; i >= 0; i -= 1) {
      const body = bodies[i];
      if (body.gone || body.y > h + 90 || body.x < -90 || body.x > w + 90) {
        bodies.splice(i, 1);
      }
    }
    for (let i = sparks.length - 1; i >= 0; i -= 1) {
      if (sparks[i].life <= 0) sparks.splice(i, 1);
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    for (const body of bodies) {
      ctx.save();
      ctx.translate(body.x, body.y);
      ctx.rotate(body.rot);
      if (body.half) {
        ctx.rotate(body.angle);
        ctx.beginPath();
        ctx.rect(body.side < 0 ? -body.r : 0, -body.r, body.r, body.r * 2);
        ctx.clip();
        ctx.rotate(-body.angle);
      }
      ctx.shadowColor = body.palette.juice;
      ctx.shadowBlur = 18;
      drawToken(ctx, body);
      ctx.restore();
    }

    for (const spark of sparks) {
      ctx.globalAlpha = Math.max(0, spark.life);
      ctx.fillStyle = spark.color;
      ctx.beginPath();
      ctx.arc(spark.x, spark.y, spark.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    if (trail.length > 1) {
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (let i = 1; i < trail.length; i += 1) {
        const p = trail[i];
        const q = trail[i - 1];
        ctx.strokeStyle = `rgba(248,246,239,${0.18 + p.life * 0.7})`;
        ctx.lineWidth = 1.5 + p.life * 7;
        ctx.beginPath();
        ctx.moveTo(q.x, q.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }
    }
  }

  function frame(now) {
    const dt = Math.min(0.033, (now - last) / 1000);
    last = now;
    step(dt);
    draw();
    requestAnimationFrame(frame);
  }

  window.addEventListener("pointermove", (event) => {
    const box = canvas.getBoundingClientRect();
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;
    if (x < -40 || y < -40 || x > box.width + 40 || y > box.height + 40) return;
    pointer.x = x;
    pointer.y = y;
    pointer.active = true;
    const prev = trail[trail.length - 1];
    if (!prev || dist2(prev.x, prev.y, pointer.x, pointer.y) > 12) {
      trail.push({ x: pointer.x, y: pointer.y, life: 1 });
      if (trail.length > 16) trail.shift();
    }
  });

  window.addEventListener("resize", resize);
  resize();
  requestAnimationFrame(frame);
}

type Dot = { x: number; y: number; ox: number; oy: number };

/**
 * Dot-grid canvas with pointer ripple. Multi-instance safe when each root owns
 * its own canvas via `data-relax-flow-root` / `data-relax-flow-canvas`.
 */
export function initRelaxFlow(root: HTMLElement, canvas: HTMLCanvasElement): void {
  const ctxEl = canvas.getContext("2d");
  if (!ctxEl) return;
  const ctx: CanvasRenderingContext2D = ctxEl;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let width = 0;
  let height = 0;
  let dots: Dot[] = [];
  let pointerX = -9999;
  let pointerY = -9999;
  let targetX = -9999;
  let targetY = -9999;
  let rafId = 0;
  let lastTs = 0;

  const spacing = 22;
  const influence = 140;
  const maxDisplace = 14;

  function isDark(): boolean {
    return document.documentElement.classList.contains("dark");
  }

  /** Canvas cannot resolve CSS vars; match brand lavender / sage-bright opacities. */
  function dotColor(): string {
    return isDark() ? "rgba(140, 170, 142, 0.28)" : "rgba(75, 57, 181, 0.35)";
  }

  function rebuildGrid() {
    const rect = root.getBoundingClientRect();
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    dots = [];
    const cols = Math.ceil(width / spacing) + 1;
    const rows = Math.ceil(height / spacing) + 1;
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const x = col * spacing;
        const y = row * spacing;
        dots.push({ x, y, ox: x, oy: y });
      }
    }
  }

  function paintStatic() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = dotColor();
    for (const dot of dots) {
      ctx.beginPath();
      ctx.arc(dot.ox, dot.oy, 1.1, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function paintFrame(ts: number) {
    const dt = Math.min(32, ts - lastTs || 16);
    lastTs = ts;

    const ease = 1 - Math.exp(-dt / 120);
    pointerX += (targetX - pointerX) * ease;
    pointerY += (targetY - pointerY) * ease;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = dotColor();

    for (const dot of dots) {
      const dx = pointerX - dot.ox;
      const dy = pointerY - dot.oy;
      const dist = Math.hypot(dx, dy);
      let tx = dot.ox;
      let ty = dot.oy;

      if (dist < influence && dist > 0.001) {
        const t = 1 - dist / influence;
        const wave = Math.sin(t * Math.PI);
        const force = wave * maxDisplace;
        const nx = dx / dist;
        const ny = dy / dist;
        // Soft outward ripple — calm sea, not a sharp push
        tx = dot.ox - nx * force * 0.55;
        ty = dot.oy - ny * force * 0.55 + wave * 2.2;
      }

      const settle = 1 - Math.exp(-dt / 90);
      dot.x += (tx - dot.x) * settle;
      dot.y += (ty - dot.y) * settle;

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 1.15, 0, Math.PI * 2);
      ctx.fill();
    }

    rafId = window.requestAnimationFrame(paintFrame);
  }

  function onPointer(event: PointerEvent) {
    const rect = root.getBoundingClientRect();
    targetX = event.clientX - rect.left;
    targetY = event.clientY - rect.top;
  }

  function onLeave() {
    targetX = -9999;
    targetY = -9999;
  }

  rebuildGrid();
  paintStatic();

  if (!reduceMotion) {
    rafId = window.requestAnimationFrame(paintFrame);
    root.addEventListener("pointermove", onPointer, { passive: true });
    root.addEventListener("pointerleave", onLeave);
  }

  const resizeObserver = new ResizeObserver(() => {
    rebuildGrid();
    if (reduceMotion) paintStatic();
  });
  resizeObserver.observe(root);

  const themeObserver = new MutationObserver(() => {
    if (reduceMotion) paintStatic();
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  document.addEventListener(
    "astro:before-swap",
    () => {
      window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      root.removeEventListener("pointermove", onPointer);
      root.removeEventListener("pointerleave", onLeave);
    },
    { once: true },
  );
}

/** Boot every `[data-relax-flow-root]` + nested `[data-relax-flow-canvas]` pair. */
export function bootRelaxFlows(scope: ParentNode = document): void {
  const roots = scope.querySelectorAll<HTMLElement>("[data-relax-flow-root]");
  roots.forEach((root) => {
    const canvas = root.querySelector<HTMLCanvasElement>("[data-relax-flow-canvas]");
    if (canvas) initRelaxFlow(root, canvas);
  });
}

export type HorizontalCarouselOptions = {
  track: HTMLElement;
  prevBtn: HTMLButtonElement | null;
  nextBtn: HTMLButtonElement | null;
  slideSelector: string;
  infinite: boolean;
};

export type HorizontalCarouselController = {
  updateNavButtons: () => void;
  scrollTrackBy: (dir: -1 | 1) => void;
  consumeDragMoved: () => boolean;
};

const DRAG_THRESHOLD = 8;
const EDGE_EPSILON = 4;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getGap(track: HTMLElement) {
  return (
    parseFloat(
      getComputedStyle(track).columnGap || getComputedStyle(track).gap || "16",
    ) || 16
  );
}

function getSlides(track: HTMLElement, slideSelector: string) {
  return Array.from(track.querySelectorAll<HTMLElement>(slideSelector));
}

function measureSetWidth(
  track: HTMLElement,
  slideSelector: string,
  originalCount: number,
) {
  const slides = getSlides(track, slideSelector);
  if (originalCount <= 0 || slides.length < originalCount) return 0;
  const first = slides[0];
  const firstClone = slides[originalCount];
  if (!firstClone) {
    return (
      slides
        .slice(0, originalCount)
        .reduce((sum, el) => sum + el.offsetWidth, 0) +
      getGap(track) * Math.max(0, originalCount - 1)
    );
  }
  return firstClone.offsetLeft - first.offsetLeft;
}

function withSnapDisabled(track: HTMLElement, fn: () => void) {
  const previousSnap = track.style.scrollSnapType;
  const previousBehavior = track.style.scrollBehavior;
  track.style.scrollSnapType = "none";
  track.style.scrollBehavior = "auto";
  fn();
  // Force layout before restoring snap so the jump sticks.
  void track.offsetWidth;
  track.style.scrollSnapType = previousSnap;
  track.style.scrollBehavior = previousBehavior;
}

/**
 * Shared horizontal track: drag, step scroll, nav disable/hide, optional infinite loop.
 * No autoplay.
 */
export function initHorizontalCarousel(
  options: HorizontalCarouselOptions,
): HorizontalCarouselController {
  const { track, prevBtn, nextBtn, slideSelector, infinite } = options;
  const reduced = prefersReducedMotion();

  let originalCount = getSlides(track, slideSelector).length;
  let setWidth = 0;
  let normalizing = false;
  let lastScrollLeft = track.scrollLeft;
  let dragMoved = false;

  let dragging = false;
  let dragPending = false;
  let dragStartX = 0;
  let dragScrollLeft = 0;
  let dragPointerId: number | null = null;

  function refreshMetrics() {
    const slides = getSlides(track, slideSelector);
    if (infinite) {
      // Drop prior clones (marked) then re-clone a fresh suffix set.
      slides
        .filter((slide) => slide.dataset.carouselClone === "true")
        .forEach((slide) => slide.remove());
      const originals = getSlides(track, slideSelector);
      originalCount = originals.length;
      originals.forEach((slide) => {
        const clone = slide.cloneNode(true) as HTMLElement;
        clone.dataset.carouselClone = "true";
        clone.setAttribute("aria-hidden", "true");
        clone.querySelectorAll<HTMLElement>("[id]").forEach((el) => {
          el.removeAttribute("id");
        });
        clone
          .querySelectorAll<HTMLElement>("[aria-selected]")
          .forEach((el) => {
            el.removeAttribute("aria-selected");
          });
        track.appendChild(clone);
      });
    } else {
      originalCount = slides.length;
    }
    setWidth = measureSetWidth(track, slideSelector, originalCount);
    lastScrollLeft = track.scrollLeft;
  }

  function normalizeLoop() {
    if (!infinite || normalizing || setWidth <= 0) return;

    const sl = track.scrollLeft;
    if (sl >= setWidth - EDGE_EPSILON) {
      normalizing = true;
      withSnapDisabled(track, () => {
        track.scrollLeft = sl - setWidth;
      });
      lastScrollLeft = track.scrollLeft;
      normalizing = false;
    } else if (sl <= EDGE_EPSILON && lastScrollLeft > EDGE_EPSILON) {
      normalizing = true;
      withSnapDisabled(track, () => {
        track.scrollLeft = sl + setWidth;
      });
      lastScrollLeft = track.scrollLeft;
      normalizing = false;
    } else {
      lastScrollLeft = sl;
    }
  }

  function updateNavButtons() {
    if (!prevBtn || !nextBtn) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const needsNav = maxScroll > 8;

    prevBtn.hidden = !needsNav;
    nextBtn.hidden = !needsNav;
    if (!needsNav) {
      prevBtn.disabled = false;
      nextBtn.disabled = false;
      return;
    }

    if (infinite) {
      prevBtn.disabled = false;
      nextBtn.disabled = false;
      return;
    }

    prevBtn.disabled = track.scrollLeft <= EDGE_EPSILON;
    nextBtn.disabled = track.scrollLeft >= maxScroll - EDGE_EPSILON;
  }

  function scrollTrackBy(dir: -1 | 1) {
    const slides = getSlides(track, slideSelector);
    if (slides.length === 0) return;

    if (infinite && setWidth > 0 && dir === -1 && track.scrollLeft <= EDGE_EPSILON) {
      normalizing = true;
      withSnapDisabled(track, () => {
        track.scrollLeft += setWidth;
      });
      lastScrollLeft = track.scrollLeft;
      normalizing = false;
    }

    const slide = slides[0];
    const step = slide.offsetWidth + getGap(track);
    track.scrollBy({
      left: dir * step,
      behavior: reduced ? "auto" : "smooth",
    });
  }

  function onScroll() {
    if (infinite) normalizeLoop();
    else lastScrollLeft = track.scrollLeft;
    updateNavButtons();
  }

  track.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    dragPending = true;
    dragging = false;
    dragMoved = false;
    dragPointerId = e.pointerId;
    dragStartX = e.clientX;
    dragScrollLeft = track.scrollLeft;
  });

  track.addEventListener("pointermove", (e) => {
    if (dragPointerId !== e.pointerId) return;
    if (!dragPending && !dragging) return;

    const dx = e.clientX - dragStartX;

    if (!dragging) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      dragging = true;
      dragMoved = true;
      dragPending = false;
      track.setPointerCapture(e.pointerId);
      track.classList.add("is-dragging");
    }

    track.scrollLeft = dragScrollLeft - dx;
  });

  function endDrag(e: PointerEvent) {
    if (dragPointerId !== e.pointerId) return;
    if (!dragPending && !dragging) return;

    dragPending = false;
    dragging = false;
    dragPointerId = null;
    track.classList.remove("is-dragging");
    try {
      track.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  }

  track.addEventListener("pointerup", endDrag);
  track.addEventListener("pointercancel", endDrag);

  prevBtn?.addEventListener("click", () => scrollTrackBy(-1));
  nextBtn?.addEventListener("click", () => scrollTrackBy(1));
  track.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => {
    refreshMetrics();
    updateNavButtons();
  }, { passive: true });

  refreshMetrics();
  updateNavButtons();

  return {
    updateNavButtons,
    scrollTrackBy,
    consumeDragMoved() {
      const moved = dragMoved;
      dragMoved = false;
      return moved;
    },
  };
}

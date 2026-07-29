(() => {
  const root = document.querySelector("[data-featured-projects]");

  if (!root) {
    return;
  }

  const viewport = root.querySelector("[data-featured-viewport]");
  const track = root.querySelector("[data-featured-track]");
  const firstSet = root.querySelector("[data-featured-set]");
  const previousButton = root.querySelector("[data-featured-previous]");
  const nextButton = root.querySelector("[data-featured-next]");

  if (!viewport || !track || !firstSet || !previousButton || !nextButton) {
    return;
  }

  const cards = Array.from(firstSet.querySelectorAll(".featured-project-card"));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const autoplaySpeed = 24;
  const interactionPause = 5000;

  let autoplayAnimation = null;
  let manualAnimation = null;
  let resumeTimer = null;
  let maxTravel = 0;
  let animationDuration = 1000;
  let hoverPaused = false;
  let dragState = null;
  let draggedRecently = false;

  const clampPosition = (position) => Math.min(maxTravel, Math.max(0, position));

  const getAnimationCycle = () => {
    if (!autoplayAnimation || !animationDuration) {
      return 0;
    }

    const currentTime = Number(autoplayAnimation.currentTime) || 0;
    return currentTime % (animationDuration * 2);
  };

  const getAutoplayDirection = () =>
    getAnimationCycle() <= animationDuration ? 1 : -1;

  const getAutoplayPosition = () => {
    if (!autoplayAnimation || maxTravel <= 0) {
      return 0;
    }

    const cycle = getAnimationCycle();
    const progress =
      cycle <= animationDuration
        ? cycle / animationDuration
        : 2 - cycle / animationDuration;

    return clampPosition(progress * maxTravel);
  };

  const getVisualPosition = () => {
    const transform = window.getComputedStyle(track).transform;

    if (!transform || transform === "none") {
      return 0;
    }

    const values = transform
      .slice(transform.indexOf("(") + 1, -1)
      .split(",")
      .map(Number);
    const translateX = transform.startsWith("matrix3d(")
      ? values[12]
      : values[4];

    return Number.isFinite(translateX)
      ? clampPosition(Math.abs(translateX))
      : 0;
  };

  const setAutoplayPosition = (position, direction = 1) => {
    if (!autoplayAnimation || maxTravel <= 0) {
      return;
    }

    const progress = clampPosition(position) / maxTravel;
    autoplayAnimation.currentTime =
      direction >= 0
        ? progress * animationDuration
        : animationDuration + (1 - progress) * animationDuration;
  };

  const shouldPause = () =>
    hoverPaused ||
    dragState !== null ||
    root.classList.contains("is-paused") ||
    reducedMotion.matches;

  const syncPlayback = () => {
    if (!autoplayAnimation) {
      return;
    }

    if (shouldPause()) {
      autoplayAnimation.pause();
    } else {
      autoplayAnimation.play();
    }
  };

  const cancelManualAnimation = () => {
    if (!manualAnimation) {
      return;
    }

    const position = getVisualPosition();
    manualAnimation.cancel();
    manualAnimation = null;
    setAutoplayPosition(position, getAutoplayDirection());
  };

  const pauseTemporarily = () => {
    root.classList.add("is-paused");
    window.clearTimeout(resumeTimer);
    syncPlayback();

    resumeTimer = window.setTimeout(() => {
      root.classList.remove("is-paused");
      syncPlayback();
    }, interactionPause);
  };

  const setupAutoplay = () => {
    const previousMax = maxTravel;
    const previousPosition = autoplayAnimation ? getAutoplayPosition() : 0;
    const previousDirection = autoplayAnimation ? getAutoplayDirection() : 1;
    const previousProgress = previousMax > 0 ? previousPosition / previousMax : 0;

    cancelManualAnimation();
    autoplayAnimation?.cancel();

    maxTravel = Math.max(0, firstSet.scrollWidth - viewport.clientWidth);
    animationDuration = Math.max(1000, (maxTravel / autoplaySpeed) * 1000);

    autoplayAnimation = track.animate(
      [
        { transform: "translate3d(0, 0, 0)" },
        { transform: `translate3d(-${maxTravel}px, 0, 0)` },
      ],
      {
        duration: animationDuration,
        direction: "alternate",
        easing: "linear",
        fill: "both",
        iterations: Infinity,
      },
    );

    setAutoplayPosition(previousProgress * maxTravel, previousDirection);
    syncPlayback();
  };

  const getCardStep = () => {
    const card = cards[0];
    const styles = window.getComputedStyle(firstSet);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;

    return card ? card.getBoundingClientRect().width + gap : viewport.clientWidth;
  };

  const moveByCard = (direction) => {
    pauseTemporarily();
    cancelManualAnimation();

    const from = getAutoplayPosition();
    const target = clampPosition(from + direction * getCardStep());

    if (Math.abs(target - from) < 1) {
      setAutoplayPosition(target, direction);
      syncPlayback();
      return;
    }

    autoplayAnimation?.pause();
    manualAnimation = track.animate(
      [
        { transform: `translate3d(-${from}px, 0, 0)` },
        { transform: `translate3d(-${target}px, 0, 0)` },
      ],
      {
        duration: 420,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "forwards",
      },
    );

    const activeManualAnimation = manualAnimation;
    manualAnimation.finished
      .then(() => {
        if (manualAnimation !== activeManualAnimation) {
          return;
        }

        manualAnimation.cancel();
        manualAnimation = null;
        setAutoplayPosition(target, direction);
        syncPlayback();
      })
      .catch(() => {});
  };

  previousButton.addEventListener("click", () => moveByCard(1));
  nextButton.addEventListener("click", () => moveByCard(-1));

  viewport.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveByCard(1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      moveByCard(-1);
    }
  });

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      hoverPaused = true;
      syncPlayback();
    });

    card.addEventListener("mouseleave", () => {
      hoverPaused = false;
      syncPlayback();
    });
  });

  viewport.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) {
      return;
    }

    pauseTemporarily();
    cancelManualAnimation();
    autoplayAnimation?.pause();
    dragState = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startPosition: getAutoplayPosition(),
      direction: getAutoplayDirection(),
      moved: false,
    };
    viewport.setPointerCapture?.(event.pointerId);
  });

  viewport.addEventListener("pointermove", (event) => {
    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    const delta = event.clientX - dragState.startX;
    const position = clampPosition(dragState.startPosition - delta);

    if (Math.abs(delta) > 6) {
      dragState.moved = true;
    }

    dragState.direction = delta < 0 ? 1 : -1;
    setAutoplayPosition(position, dragState.direction);
  });

  const endDrag = (event) => {
    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    draggedRecently = dragState.moved;
    dragState = null;
    viewport.releasePointerCapture?.(event.pointerId);
    syncPlayback();

    window.setTimeout(() => {
      draggedRecently = false;
    }, 0);
  };

  viewport.addEventListener("pointerup", endDrag);
  viewport.addEventListener("pointercancel", endDrag);

  viewport.addEventListener(
    "click",
    (event) => {
      if (!draggedRecently) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
    },
    true,
  );

  viewport.addEventListener(
    "wheel",
    (event) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) {
        return;
      }

      event.preventDefault();
      pauseTemporarily();
      cancelManualAnimation();

      const direction = event.deltaX >= 0 ? 1 : -1;
      const position = clampPosition(getAutoplayPosition() + event.deltaX);
      setAutoplayPosition(position, direction);
    },
    { passive: false },
  );

  reducedMotion.addEventListener("change", syncPlayback);

  const resizeObserver = new ResizeObserver(setupAutoplay);
  resizeObserver.observe(viewport);
  setupAutoplay();
})();

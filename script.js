const header = document.querySelector(".site-header");
const frames = document.querySelectorAll(".roll-frame");
const listItems = document.querySelectorAll(".shoot-list li");
const progressItems = document.querySelectorAll(".progress span");
const chapterPhotos = document.querySelectorAll(".chapter-photo");

const setHeaderState = () => {
  if (!header) return;

  const scrolled = window.scrollY > 24;
  header.classList.toggle("scrolled", scrolled);
};

const scrollToHashTarget = () => {
  if (!window.location.hash) return;

  const target = document.querySelector(window.location.hash);
  if (!target) return;

  const headerHeight = header?.offsetHeight ?? 0;
  const targetTop = target.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({
    top: Math.max(0, targetTop - headerHeight - 24),
    behavior: "auto",
  });
};

window.addEventListener("scroll", setHeaderState, { passive: true });
window.addEventListener("load", () => {
  requestAnimationFrame(scrollToHashTarget);
  window.setTimeout(scrollToHashTarget, 350);
});
window.addEventListener("hashchange", () => {
  requestAnimationFrame(scrollToHashTarget);
  window.setTimeout(scrollToHashTarget, 120);
});
setHeaderState();

frames.forEach((frame, index) => {
  frame.addEventListener("mouseenter", () => {
    frames.forEach((item) => item.classList.remove("selected"));
    listItems.forEach((item) => item.classList.remove("selected"));
    progressItems.forEach((item) => item.classList.remove("active"));

    frame.classList.add("selected");
    listItems[index]?.classList.add("selected");
    progressItems[index]?.classList.add("active");
  });

  frame.addEventListener("click", () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(scrollToHashTarget);
    });
  });
});

const getLargeImageSrc = (src) => {
  if (!src.includes("images.unsplash.com")) return src;

  return src.replace(/w=\d+/g, "w=1500").replace(/q=\d+/g, "q=84");
};

chapterPhotos.forEach((chapter) => {
  const mainMedia = chapter.querySelector(":scope > img, :scope > video");
  const thumbs = [...chapter.querySelectorAll(".thumb-rail img")];
  if (!mainMedia || thumbs.length < 2) return;

  const slider = document.createElement("div");
  slider.className = "chapter-slider";
  const firstSlide = mainMedia.cloneNode(true);
  firstSlide.classList.add("active");
  if (firstSlide.tagName === "VIDEO") {
    firstSlide.muted = true;
    firstSlide.loop = true;
    firstSlide.autoplay = true;
    firstSlide.playsInline = true;
    firstSlide.play?.().catch(() => {});
  }
  slider.append(firstSlide);
  mainMedia.replaceWith(slider);

  const firstSlideIsVideo = firstSlide.tagName === "VIDEO";
  let currentIndex = firstSlideIsVideo
    ? -1
    : Math.max(
        0,
        thumbs.findIndex((thumb) => getLargeImageSrc(thumb.src) === firstSlide.src),
      );
  let timerId;

  const setActiveImage = (index) => {
    if (index === currentIndex && slider.querySelector(".active")) return;

    currentIndex = (index + thumbs.length) % thumbs.length;
    const previousSlide = slider.querySelector(".active");
    const nextSlide = document.createElement("img");
    nextSlide.src = getLargeImageSrc(thumbs[currentIndex].src);
    nextSlide.alt = thumbs[currentIndex].alt.replace("缩略图", "摄影作品主图");
    nextSlide.className = "entering";
    slider.append(nextSlide);

    requestAnimationFrame(() => {
      previousSlide?.classList.remove("active");
      previousSlide?.classList.add("leaving");
      nextSlide.classList.remove("entering");
      nextSlide.classList.add("active");
    });

    window.setTimeout(() => {
      [...slider.querySelectorAll("img:not(.active), video:not(.active)")].forEach((slide) => slide.remove());
    }, 760);

    thumbs.forEach((thumb, thumbIndex) => {
      thumb.classList.toggle("active", thumbIndex === currentIndex);
    });
  };

  const startCarousel = () => {
    window.clearInterval(timerId);
    timerId = window.setInterval(() => {
      setActiveImage(currentIndex + 1);
    }, 2600);
  };

  const stopCarousel = () => {
    window.clearInterval(timerId);
  };

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", (event) => {
      event.preventDefault();
      setActiveImage(index);
    });
  });

  chapter.addEventListener("pointerenter", stopCarousel);
  chapter.addEventListener("pointerleave", startCarousel);

  if (!firstSlideIsVideo) {
    setActiveImage(currentIndex);
  }
  startCarousel();
});

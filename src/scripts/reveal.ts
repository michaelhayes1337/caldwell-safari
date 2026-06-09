// Scroll-reveal via IntersectionObserver. Re-inits on Astro view transitions.
function initReveal() {
  const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)");
  if (!els.length) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
  );

  els.forEach((el) => io.observe(el));
}

document.addEventListener("astro:page-load", initReveal);

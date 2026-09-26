// Subtle reveal-on-scroll for section panels.
// Content is visible by default in CSS; this script only opts into the
// fade/slide-in effect once it confirms it can run, and always guarantees
// every section becomes visible (via IntersectionObserver, or immediately
// as a fallback if that API is unavailable).
(function () {
  document.documentElement.classList.add("js");

  var targets = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window) || targets.length === 0) {
    targets.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach(function (el) {
    observer.observe(el);
  });

  // Fail-safe: guarantee every section is visible shortly after load,
  // even if a section never crosses the intersection threshold.
  window.setTimeout(function () {
    targets.forEach(function (el) {
      el.classList.add("is-visible");
    });
    observer.disconnect();
  }, 2500);
})();

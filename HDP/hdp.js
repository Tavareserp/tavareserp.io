const yearEl = document.getElementById("year");
const topButton = document.getElementById("backToTop");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

function updateActiveNav(id) {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
  });
}

if ("IntersectionObserver" in window && sections.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]?.target?.id) {
        updateActiveNav(visible[0].target.id);
      }
    },
    { threshold: [0.25, 0.5, 0.75] }
  );

  sections.forEach((section) => observer.observe(section));
}

if (topButton) {
  const toggleButton = () => {
    topButton.classList.toggle("visible", window.scrollY > 420);
  };

  window.addEventListener("scroll", toggleButton, { passive: true });
  toggleButton();

  topButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

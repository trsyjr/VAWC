/* main.js - controls mobile menu, case accordion, and Swipers */

/* ---------------- Mobile Menu ---------------- */
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn?.addEventListener("click", () => {
  menuBtn.classList.toggle("active");

  if (mobileMenu.classList.contains("hidden")) {
    mobileMenu.classList.remove("hidden");
    mobileMenu.classList.add("flex");
  } else {
    mobileMenu.classList.add("hidden");
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    mobileMenu.classList.add("hidden");
    menuBtn.classList.remove("active");
  }
});

/* ---------------- Accordion (Cases) ---------------- */
const caseHeaders = document.querySelectorAll(".case-header");
const caseContents = document.querySelectorAll(".case-content");

// Start all closed
caseContents.forEach(c => {
  c.style.height = "0px";
  c.style.overflow = "hidden";
  c.style.opacity = "0";
  c.setAttribute("aria-hidden", "true");
});

caseHeaders.forEach(header => {
  header.addEventListener("click", () => {

    const target = header.getAttribute("data-target");
    const content = document.getElementById(`content-${target}`);
    const arrow = document.getElementById(`arrow-${target}`);
    const desc = header.querySelector(".case-desc"); // <-- description span

    if (!content) return;

    // Close all other cases
    caseContents.forEach(other => {
      if (other !== content) {
        other.style.height = "0px";
        other.classList.remove("open");
        other.style.opacity = "0";
        other.setAttribute("aria-hidden", "true");
      }
    });

    document.querySelectorAll(".case-header i").forEach(otherArrow => {
      if (otherArrow !== arrow) {
        otherArrow.classList.remove("rotate-180");
      }
    });

    document.querySelectorAll(".case-header").forEach(h => 
      h.setAttribute("aria-expanded", "false")
    );

    // Toggle the clicked case
    if (content.classList.contains("open")) {
      /* ---------- CLOSING ---------- */
      desc?.classList.remove("hidden"); // <-- SHOW description

      content.style.height = content.scrollHeight + "px";
      requestAnimationFrame(() => {
        content.style.height = "0px";
        content.style.opacity = "0";
        content.classList.remove("open");
        content.setAttribute("aria-hidden", "true");
        arrow.classList.remove("rotate-180");
        header.setAttribute("aria-expanded", "false");
      });

    } else {
      /* ---------- OPENING ---------- */
      desc?.classList.add("hidden"); // <-- HIDE description

      content.style.height = content.scrollHeight + "px";
      content.style.opacity = "1";
      content.classList.add("open");
      content.setAttribute("aria-hidden", "false");
      arrow.classList.add("rotate-180");
      header.setAttribute("aria-expanded", "true");

      // change to auto height after expanding
      const setAutoHeight = function (e) {
        if (e.propertyName === "height" && content.classList.contains("open")) {
          content.style.height = "auto";
        }
        content.removeEventListener("transitionend", setAutoHeight);
      };
      content.addEventListener("transitionend", setAutoHeight);
    }
  });
});

/* ---------------- Swipers ---------------- */
for (let i = 1; i <= 5; i++) {
  const selector = `.mySwiper${i}`;
  const paginationSelector = `.mySwiper${i} .swiper-pagination`;

  if (document.querySelector(selector)) {
    new Swiper(selector, {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: paginationSelector,
        clickable: true,
      },
    });
  }
}

/* ---------------- Extra Dropdown Helper (Optional) ---------------- */
function toggleDropdown(id) {
  const content = document.getElementById(`dropdown-${id}`);
  const icon = document.getElementById(`icon-${id}`);

  if (!content) return;

  if (content.style.height === "0px" || content.style.height === "") {
    content.style.height = content.scrollHeight + "px";
    content.style.opacity = 1;
    content.style.paddingTop = "1rem";
    if (icon) icon.textContent = "⌃";
  } else {
    content.style.height = "0px";
    content.style.opacity = 0;
    content.style.paddingTop = "0px";
    if (icon) icon.textContent = "⌄";
  }
}

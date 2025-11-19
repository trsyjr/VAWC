/* main.js - controls mobile menu, case accordion, and Swipers */

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

/* Accordion (cases) */
const caseHeaders = document.querySelectorAll(".case-header");
const caseContents = document.querySelectorAll(".case-content");

// Ensure all case contents start closed with height 0
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

    if (!content) return;

    // Close all others
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
    // Update aria-expanded on all headers
    document.querySelectorAll(".case-header").forEach(h => h.setAttribute("aria-expanded", "false"));

    // Toggle clicked folder
    if (content.classList.contains("open")) {
      // CLOSE
      // set current height to allow transition
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
      // OPEN
      content.style.height = content.scrollHeight + "px";
      content.style.opacity = "1";
      content.classList.add("open");
      content.setAttribute("aria-hidden", "false");
      arrow.classList.add("rotate-180");
      header.setAttribute("aria-expanded", "true");

      // After transition, set height to auto so new content size doesn't break layout
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

/* Initialize Swipers for cases 1..5, make pagination target the container's pagination element */
for (let i = 1; i <= 5; i++) {
  const selector = `.mySwiper${i}`;
  const paginationSelector = `.mySwiper${i} .swiper-pagination`;
  // only init when element exists
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
      // navigation not required here, uncomment if you add next/prev buttons
      // navigation: {
      //   nextEl: `${selector} .swiper-button-next`,
      //   prevEl: `${selector} .swiper-button-prev`,
      // },
    });
  }
}

/* Small dropdown helper left in case you need it (not used by the case accordion) */
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

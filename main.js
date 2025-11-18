const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");

  if (mobileMenu.classList.contains("hidden")) {
    mobileMenu.classList.remove("hidden");
    mobileMenu.classList.add("flex");
  } else {
    mobileMenu.classList.add("hidden");
  }
});

// CLOSE MENU ON DESKTOP RESIZE
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    mobileMenu.classList.add("hidden");
    menuBtn.classList.remove("active");
  }
});


const swiper = new Swiper(".mySwiper", {
  loop: true, // Infinite loop
  autoplay: {
    delay: 3000, // 3 seconds per slide
    disableOnInteraction: false, // Continue autoplay even after user interaction
  },
  pagination: {
    el: ".swiper-pagination", // Target the pagination div
    clickable: true, // Make dots clickable
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const caseHeaders = document.querySelectorAll(".case-header");

caseHeaders.forEach(header => {
  header.addEventListener("click", () => {
    const target = header.getAttribute("data-target");
    const content = document.getElementById(`content-${target}`);
    const arrow = document.getElementById(`arrow-${target}`);

    content.classList.toggle("hidden");
    arrow.classList.toggle("rotate-180");
  });
});

// Swiper Initialization For All Cases
for (let i = 1; i <= 5; i++) {
  new Swiper(".mySwiper" + i, {
    pagination: { el: ".swiper-pagination", clickable: true },
  });
}


 // Dropdown animation
    function toggleDropdown(id) {
      const content = document.getElementById(`dropdown-${id}`);
      const icon = document.getElementById(`icon-${id}`);

      if (content.style.height === "0px" || content.style.height === "") {
        content.style.height = content.scrollHeight + "px";
        content.style.opacity = 1;
        content.style.paddingTop = "1rem";
        icon.textContent = "⌃";
      } else {
        content.style.height = "0px";
        content.style.opacity = 0;
        content.style.paddingTop = "0px";
        icon.textContent = "⌄";
      }
    }

    // Initialize all swipers
    for (let i = 1; i <= 10; i++) {
      new Swiper(`.mySwiper${i}`, {
        pagination: { el: ".swiper-pagination", clickable: true },
      });
    }


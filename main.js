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
for (let i = 1; i <= 10; i++) {
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

// Data structure containing the content for each modal category
        const hotlineData = {
            'emergency': {
                title: 'Emergency & Law Enforcement',
                icon: 'bx bxs-bell-ring',
                content: `
                    <div class="space-y-3">
                        <p><strong>Nationwide Hotline:</strong> <a href="tel:911" class="text-orange-300 hover:text-orange-500 hover:underline transition">911</a> (toll-free)</p>
                        <p><strong>PNP WCPC:</strong> <a href="tel:09197777377" class="text-orange-300 hover:text-orange-500 hover:underline transition">0919-777-7377</a> or <a href="tel:0285326690" class="text-orange-300 hover:text-orange-500 hover:underline transition">(02) 8532-6690</a></p>
                        <p><strong>NBI VAWCD Desk:</strong> <a href="tel:0285238231" class="text-orange-300 hover:text-orange-500 hover:underline transition">(02) 8523-8231 to 38</a> (local 6028)</p>
                        <p class="text-white/70 italic">
                            Local Police: Women & Children Protection Desk at your nearest precinct/barangay hall
                        </p>
                    </div>
                `
            },
            'legal': {
                title: 'Support & Legal Aid',
                icon: 'bx bxs-briefcase',
                content: `
                    <div class="space-y-3">
                        <p><strong>PCW - IAC on VAWC:</strong> <a href="tel:0287351654" class="text-orange-300 hover:text-orange-500 hover:underline transition">(02) 8735-1654</a> loc. 122 or <a href="tel:09178671907" class="text-orange-300 hover:text-orange-500 hover:underline transition">0917-867-1907</a></p>
                        <p><strong>PAO (Free Legal Aid):</strong> <a href="tel:0289299436" class="text-orange-300 hover:text-orange-500 hover:underline transition">(02) 8929-9436</a> local 106, 107, 159</p>
                        <p><strong>DSWD (Community Services):</strong> <a href="tel:0287330014" class="text-orange-300 hover:text-orange-500 hover:underline transition">(02) 8733-0014 to 18</a> local 116</p>
                        <p><strong>Women's Crisis Center:</strong> <a href="tel:09284200859" class="text-orange-300 hover:text-orange-500 hover:underline transition">0928-420-0859</a> or <a href="tel:09995779631" class="text-orange-300 hover:text-orange-500 hover:underline transition">0999-577-9631</a></p>
                    </div>
                `
            },
            'medical': {
                title: 'Medical & Mental Health',
                icon: 'bx bxs-heart',
                content: `
                    <div class="space-y-3">
                        <p><strong>DOH Hospitals WCPU:</strong> <a href="tel:0286517800" class="text-orange-300 hover:text-orange-500 hover:underline transition">(02) 8651-7800</a> local 1726-1730</p>
                        <p class="font-bold text-lg mt-4">National Center for Mental Health (NCMH) Crisis Hotline:</p>
                        <ul class="list-disc list-inside ml-4 space-y-2">
                            <li>Luzon (toll-free): <a href="tel:1553" class="text-orange-300 hover:text-orange-500 hover:underline transition">1553</a></li>
                            <li>Globe/TM: <a href="tel:09178998727" class="text-orange-300 hover:text-orange-500 hover:underline transition">0917-899-8727</a></li>
                            <li>Smart/Sun/TNT: <a href="tel:09086392672" class="text-orange-300 hover:text-orange-500 hover:underline transition">0908-639-2672</a></li>
                        </ul>
                    </div>
                `
            }
        };

        // --- DOM Elements ---
        const modal = document.getElementById('contact-modal');
        const modalOverlay = document.getElementById('modal-overlay');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        const modalContentBox = document.getElementById('modal-content');
        const closeModalBtn = document.getElementById('close-modal-btn');
        const contactCards = document.querySelectorAll('.contact-card');

        // --- Functions ---
        
        /**
         * Opens the modal with content corresponding to the given category.
         * @param {string} category The key from hotlineData.
         */
        function openModal(category) {
            const data = hotlineData[category];
            if (!data) return;

            // 1. Populate Content
            modalTitle.innerHTML = `<i class='${data.icon} text-orange-500'></i> ${data.title}`;
            modalBody.innerHTML = data.content;

            // 2. Display Modal and animate content
            modal.classList.remove('modal-hidden');
            modal.classList.add('modal-visible');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling

            // Trigger content animation after modal is visible (slight delay for transition)
            setTimeout(() => {
                modalContentBox.classList.remove('scale-95', 'opacity-0');
                modalContentBox.classList.add('scale-100', 'opacity-100');
            }, 10);
        }

        /**
         * Closes the modal and resets the body scroll.
         */
        function closeModal() {
            // Animate content out
            modalContentBox.classList.remove('scale-100', 'opacity-100');
            modalContentBox.classList.add('scale-95', 'opacity-0');

            // Hide modal after animation completes
            setTimeout(() => {
                modal.classList.remove('modal-visible');
                modal.classList.add('modal-hidden');
                document.body.style.overflow = ''; // Restore background scrolling
            }, 300);
        }

        // --- Event Listeners ---

        // 1. Card Click Handlers (Open Modal)
        contactCards.forEach(card => {
            card.addEventListener('click', () => {
                const category = card.getAttribute('data-category');
                openModal(category);
            });
        });

        // 2. Close Button Handler
        closeModalBtn.addEventListener('click', closeModal);

        // 3. Overlay Click Handler (Close Modal if clicking outside content)
        modalOverlay.addEventListener('click', closeModal);

        // 4. Escape Key Handler (Close Modal)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('modal-visible')) {
                closeModal();
            }
        });
        
document.getElementById("feedbackForm").addEventListener("submit", function(event) {
  event.preventDefault();

  emailjs.send("service_mqqndw9", "template_et2og3p", {
    feedback_message: document.getElementById("feedback_message").value,
  })
  .then(function() {
    alert("Thank you! Your feedback has been sent successfully.");
    document.getElementById("feedbackForm").reset();
  }, function(error) {
    alert("Oops! Something went wrong: " + JSON.stringify(error));
  });
});


        
// ============================================================
// Bumi Diesel Lampung - Main Interactive Script
// ============================================================

const COMPANY_CONFIG = {
  name: "Bumi Diesel Lampung",
  whatsapp: "6281179760063",
  whatsappDisplay: "+62 811-7976-0063",
  email: "bumidiesellampung@gmail.com",
  address: "Bandar Lampung, Lampung, Indonesia"
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = mobileMenu.classList.toggle("open");
      hamburgerBtn.innerHTML = isOpen 
        ? '<i class="fa-solid fa-xmark"></i>' 
        : '<i class="fa-solid fa-bars"></i>';
      hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Auto-close menu when a navigation link is clicked
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        hamburgerBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        hamburgerBtn.setAttribute("aria-expanded", "false");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!mobileMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        if (mobileMenu.classList.contains("open")) {
          mobileMenu.classList.remove("open");
          hamburgerBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
          hamburgerBtn.setAttribute("aria-expanded", "false");
        }
      }
    });
  }

  // 2. Pre-fill Form Parameters from URL (?kategori=... &part=...)
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get("kategori");
  const partParam = urlParams.get("part");
  const categorySelect = document.getElementById("quoteCategory");
  const productInput = document.getElementById("quoteProduct");

  if (categoryParam && categorySelect) {
    const slugMap = {
      "excavator": "Sparepart Excavator",
      "diesel-engine": "Komponen Mesin Diesel",
      "genset": "Sparepart Genset Industri",
      "hydraulic-hose": "Hydraulic Hose & Fitting",
      "alat-berat": "Sparepart Bulldozer, Loader & Forklift",
      "oli-filter": "Pelumas & Filter Heavy Duty"
    };

    const targetVal = slugMap[categoryParam.toLowerCase()] || categoryParam;
    for (let i = 0; i < categorySelect.options.length; i++) {
      if (
        categorySelect.options[i].value.toLowerCase().includes(targetVal.toLowerCase()) ||
        categorySelect.options[i].text.toLowerCase().includes(targetVal.toLowerCase())
      ) {
        categorySelect.selectedIndex = i;
        break;
      }
    }
  }

  if (partParam && productInput) {
    productInput.value = decodeURIComponent(partParam);
  }

  // 3. Quote Form Submission Handler -> WhatsApp Click-to-Chat
  const quoteForm = document.getElementById("quoteForm");
  if (quoteForm) {
    quoteForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("quoteName")?.value.trim();
      const company = document.getElementById("quoteCompany")?.value.trim();
      const userPhone = document.getElementById("quotePhone")?.value.trim();
      const email = document.getElementById("quoteEmail")?.value.trim();
      const category = document.getElementById("quoteCategory")?.value;
      const brandUnit = document.getElementById("quoteBrand")?.value.trim();
      const productName = document.getElementById("quoteProduct")?.value.trim();
      const engineType = document.getElementById("quoteEngine")?.value.trim();
      const qty = document.getElementById("quoteQty")?.value.trim();
      const unit = document.getElementById("quoteUnit")?.value || "Pcs";
      const city = document.getElementById("quoteCity")?.value.trim();
      const notes = document.getElementById("quoteNotes")?.value.trim();

      // Basic Validation
      if (!name) {
        alert("Mohon masukkan nama lengkap Anda.");
        document.getElementById("quoteName")?.focus();
        return;
      }
      if (!userPhone) {
        alert("Mohon masukkan nomor WhatsApp aktif Anda.");
        document.getElementById("quotePhone")?.focus();
        return;
      }
      if (!category) {
        alert("Silakan pilih kategori suku cadang.");
        document.getElementById("quoteCategory")?.focus();
        return;
      }
      if (!productName) {
        alert("Mohon masukkan nama sparepart atau part number.");
        document.getElementById("quoteProduct")?.focus();
        return;
      }
      if (!qty) {
        alert("Mohon masukkan jumlah unit/pcs kebutuhan.");
        document.getElementById("quoteQty")?.focus();
        return;
      }
      if (!city) {
        alert("Mohon masukkan kota tujuan pengiriman.");
        document.getElementById("quoteCity")?.focus();
        return;
      }

      // Format WhatsApp Message
      const lines = [
        `*PERMINTAAN PENAWARAN SUKU CADANG*`,
        `*Bumi Diesel Lampung - Heavy Equipment & Diesel Engine Parts*`,
        ``,
        `Halo Tim Bumi Diesel Lampung, saya ingin menanyakan ketersediaan dan penawaran harga suku cadang berikut:`,
        ``,
        `*📋 DATA PEMESAN:*`,
        `• *Nama:* ${name}`,
        company ? `• *Perusahaan / Site Proyek:* ${company}` : null,
        `• *WhatsApp:* ${userPhone}`,
        email ? `• *Email:* ${email}` : null,
        ``,
        `*⚙️ DETAIL KEBUTUHAN SPAREPART:*`,
        `• *Kategori:* ${category}`,
        `• *Nama Sparepart / Part Number:* ${productName}`,
        brandUnit ? `• *Merk & Model Unit Alat:* ${brandUnit}` : null,
        engineType ? `• *Tipe Mesin / Serial Number:* ${engineType}` : null,
        `• *Jumlah Kebutuhan:* ${qty} ${unit}`,
        `• *Kota Tujuan Pengiriman:* ${city}`,
        notes ? `• *Catatan Tambahan:* ${notes}` : null,
        ``,
        `Mohon info stok ketersediaan, kecocokan spesifikasi (part number), dan penawaran harga terbaik. Terima kasih!`
      ].filter(Boolean);

      const message = lines.join("\n");
      const whatsappUrl = `https://wa.me/${COMPANY_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;

      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
  }

  // 4. Product Filter & Search (produk.html)
  const filterPillBtns = document.querySelectorAll(".filter-pill-btn");
  const productCards = document.querySelectorAll(".product-card[data-category]");
  const searchInput = document.getElementById("productSearchInput");

  function applyProductFilters() {
    const activeBtn = document.querySelector(".filter-pill-btn.active");
    const activeCat = activeBtn ? activeBtn.getAttribute("data-filter") : "all";
    const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : "";

    let matchCount = 0;

    productCards.forEach((card) => {
      const cardCat = card.getAttribute("data-category") || "";
      const cardText = card.textContent.toLowerCase();

      const catMatches = (activeCat === "all" || cardCat === activeCat);
      const searchMatches = (!searchQuery || cardText.includes(searchQuery));

      if (catMatches && searchMatches) {
        card.style.display = "flex";
        matchCount++;
      } else {
        card.style.display = "none";
      }
    });

    const emptyNotice = document.getElementById("noProductNotice");
    if (emptyNotice) {
      emptyNotice.style.display = matchCount === 0 ? "block" : "none";
    }
  }

  if (filterPillBtns.length > 0) {
    filterPillBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterPillBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        applyProductFilters();
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", applyProductFilters);
  }

  // 5. Scroll Reveal Animations (Smooth Fade-up with Stagger)
  function initScrollReveal() {
    const revealTargets = document.querySelectorAll(
      ".section-header, .category-card, .product-card, .workflow-card, .feature-item-card, .brand-badge, .testimonial-card, .cta-banner, .form-card, .contact-info-card"
    );

    if (!("IntersectionObserver" in window)) {
      revealTargets.forEach((el) => el.classList.add("revealed"));
      return;
    }

    // Apply stagger delays to cards in grids
    const gridContainers = document.querySelectorAll(
      ".categories-grid, .product-grid, .workflow-grid, .features-grid, .brand-grid, .testimonials-grid"
    );
    gridContainers.forEach((grid) => {
      const items = grid.children;
      Array.from(items).forEach((item, idx) => {
        item.style.transitionDelay = `${(idx % 4) * 0.1}s`;
      });
    });

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      { root: null, threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );

    revealTargets.forEach((el) => {
      el.classList.add("reveal-init");
      observer.observe(el);
    });
  }

  // 6. Interactive Animated Stats Counter
  function initStatCounter() {
    const statValues = document.querySelectorAll(".stat-item .stat-value");
    if (statValues.length === 0 || !("IntersectionObserver" in window)) return;

    const counterObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const fullText = el.textContent.trim();

            let targetNum = 0;
            let suffix = "";
            let useDot = false;

            if (fullText.includes("1.000")) {
              targetNum = 1000;
              suffix = "+";
              useDot = true;
            } else if (fullText.includes("500")) {
              targetNum = 500;
              suffix = "+";
            } else if (fullText.includes("10")) {
              targetNum = 10;
              suffix = "+";
            } else if (fullText.includes("24")) {
              targetNum = 24;
              suffix = " Jam";
            } else {
              obs.unobserve(el);
              return;
            }

            const duration = 1600;
            const startTime = performance.now();

            function updateCounter(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const currentVal = Math.floor(easeOut * targetNum);

              const formattedVal = useDot && currentVal >= 1000 
                ? "1.000" 
                : currentVal;

              el.innerHTML = `${formattedVal}<span>${suffix}</span>`;

              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                const finalFormatted = useDot ? "1.000" : targetNum;
                el.innerHTML = `${finalFormatted}<span>${suffix}</span>`;
              }
            }

            requestAnimationFrame(updateCounter);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    statValues.forEach((el) => counterObserver.observe(el));
  }

  // 7. Navbar Shadow on Scroll
  const headerEl = document.querySelector(".header");
  if (headerEl) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 30) {
        headerEl.style.boxShadow = "0 8px 24px rgba(16, 45, 80, 0.12)";
      } else {
        headerEl.style.boxShadow = "var(--shadow-sm)";
      }
    });
  }

  // 8. Update Copyright Year
  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  initScrollReveal();
  initStatCounter();
});

document.addEventListener("DOMContentLoaded", () => {
    initActiveNav();
    initPageLoad();
    initRevealAnimations();
    initHoverLift();
    initImageParallax();
    initPlayPageMotion();
    initJournalThumbLinks();
    initExternalLinks();
  });
  
  /* =========================
     1. ACTIVE NAV LINK
  ========================= */
  function initActiveNav() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".site-nav a");
  
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === currentPage) {
        link.style.borderBottom = "1px solid #F4F1EA";
        link.style.color = "#B7B09C";
        link.style.fontWeight = "600";
      }
    });
  }
  
  /* =========================
     2. PAGE LOAD FADE-IN
  ========================= */
  function initPageLoad() {
    document.body.style.opacity = "0";
    document.body.style.transform = "translateY(10px)";
    document.body.style.transition = "opacity 0.7s ease, transform 0.7s ease";
  
    requestAnimationFrame(() => {
      document.body.style.opacity = "1";
      document.body.style.transform = "translateY(0)";
    });
  }
  
  /* =========================
     3. SCROLL REVEAL
  ========================= */
  function initRevealAnimations() {
    const revealTargets = document.querySelectorAll(`
      .page-heading,
      .home-grid figure,
      .stacked-image,
      .experiment-card,
      .collage-item,
      .journal-hero figure,
      .journal-thumbs figure,
      .journal-entry,
      .note-card,
      .research-block,
      .home-links li,
      .p5-notes,
      .play-text
    `);
  
    if (!revealTargets.length) return;
  
    revealTargets.forEach((el, index) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(22px)";
      el.style.transition = `opacity 0.75s ease ${index * 0.04}s, transform 0.75s ease ${index * 0.04}s`;
    });
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );
  
    revealTargets.forEach((el) => observer.observe(el));
  }
  
  /* =========================
     4. HOVER LIFT FOR CARDS
  ========================= */
  function initHoverLift() {
    const hoverTargets = document.querySelectorAll(`
      .experiment-card,
      .note-card,
      .journal-entry,
      .stacked-image,
      .journal-thumbs figure,
      .home-grid figure,
      .collage-item
    `);
  
    hoverTargets.forEach((card) => {
      card.style.transition = "transform 0.25s ease, box-shadow 0.25s ease";
  
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-6px)";
        card.style.boxShadow = "0 10px 24px rgba(0,0,0,0.08)";
      });
  
      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
        card.style.boxShadow = "none";
      });
    });
  }
  
  /* =========================
     5. IMAGE PARALLAX / FOLLOW
  ========================= */
  function initImageParallax() {
    const imageCards = document.querySelectorAll(`
      .home-grid figure,
      .stacked-image,
      .journal-thumbs figure,
      .collage-item,
      .journal-hero figure
    `);
  
    imageCards.forEach((card) => {
      const img = card.querySelector("img");
      if (!img) return;
  
      card.style.overflow = "hidden";
      img.style.transition = "transform 0.25s ease";
  
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
  
        const moveX = ((x / rect.width) - 0.5) * 10;
        const moveY = ((y / rect.height) - 0.5) * 10;
  
        img.style.transform = `scale(1.03) translate(${moveX}px, ${moveY}px)`;
      });
  
      card.addEventListener("mouseleave", () => {
        img.style.transform = "scale(1) translate(0, 0)";
      });
    });
  }
  
  /* =========================
     6. PLAY PAGE STAR FLOAT
  ========================= */
  function initPlayPageMotion() {
    const stars = document.querySelectorAll(".star");
    if (!stars.length) return;
  
    stars.forEach((star, index) => {
      star.style.transition = "transform 0.2s ease";
      star.dataset.baseRotate = `${index % 2 === 0 ? -4 : 4}`;
    });
  
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
  
    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
  
      stars.forEach((star, index) => {
        const rect = star.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
  
        const dx = (mouseX - centerX) * 0.01;
        const dy = (mouseY - centerY) * 0.01;
        const rotate = parseFloat(star.dataset.baseRotate) + dx * 0.15;
  
        star.style.transform = `translate(${dx}px, ${dy}px) rotate(${rotate}deg)`;
      });
    });
  }
  
  /* =========================
     7. JOURNAL THUMBS SCROLL TO ENTRY
  ========================= */
  function initJournalThumbLinks() {
    const thumbs = document.querySelectorAll(".journal-thumbs figure");
    const entries = document.querySelectorAll(".journal-entry");
  
    if (!thumbs.length || !entries.length) return;
  
    thumbs.forEach((thumb, index) => {
      thumb.style.cursor = "pointer";
  
      thumb.addEventListener("click", () => {
        const target = entries[index];
        if (!target) return;
  
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
  
        target.style.transition = "background-color 0.4s ease";
        target.style.backgroundColor = "rgba(255,255,255,0.8)";
  
        setTimeout(() => {
          target.style.backgroundColor = "rgba(255,255,255,0.35)";
        }, 900);
      });
    });
  }
  
  /* =========================
     8. EXTERNAL LINKS OPEN NEW TAB
  ========================= */
  function initExternalLinks() {
    const links = document.querySelectorAll("a[href]");
  
    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;
  
      const isExternal =
        href.startsWith("http://") ||
        href.startsWith("https://");
  
      if (isExternal) {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
      }
    });
  }
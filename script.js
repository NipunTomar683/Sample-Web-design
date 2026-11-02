const restaurantConfig = {
  phone: "+919876543210",
  whatsapp: "919876543210"
};

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
const siteHeader = document.querySelector("#site-header");
const themeToggle = document.querySelector(".theme-toggle");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.documentElement.classList.add("js");

let lastScrollY = window.scrollY;
window.addEventListener("scroll", () => {
  const currentScrollY = Math.max(0, window.scrollY);
  const difference = currentScrollY - lastScrollY;

  if (currentScrollY < siteHeader.offsetHeight || menuToggle.getAttribute("aria-expanded") === "true") {
    siteHeader.classList.remove("is-hidden");
  } else if (difference > 8) {
    siteHeader.classList.add("is-hidden");
  } else if (difference < -8) {
    siteHeader.classList.remove("is-hidden");
  }

  lastScrollY = currentScrollY;
}, { passive: true });

menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
  siteNav.classList.toggle("is-open", open);
  siteHeader.classList.remove("is-hidden");
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    siteNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  }
});

document.querySelectorAll("[data-phone-link]").forEach((link) => {
  link.href = `tel:${restaurantConfig.phone}`;
});

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  const message = link.dataset.message || "Hello! I'd like to get in touch.";
  link.href = `https://wa.me/${restaurantConfig.whatsapp}?text=${encodeURIComponent(message)}`;
});

themeToggle.addEventListener("click", () => {
  const dark = document.documentElement.dataset.theme !== "dark";
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  themeToggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  document.querySelector('meta[name="theme-color"]').content = dark ? "#101914" : "#f5f2e9";
});

document.querySelectorAll(".menu-tab").forEach((tab) => {
  tab.setAttribute("aria-pressed", String(tab.classList.contains("is-active")));
  tab.addEventListener("click", () => {
    const category = tab.dataset.category;
    document.querySelectorAll(".menu-tab").forEach((item) => {
      const active = item === tab;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    document.querySelectorAll(".menu-card").forEach((card) => {
      card.hidden = category !== "all" && card.dataset.category !== category;
    });
  });
});

document.querySelectorAll("[data-slider]").forEach((button) => {
  button.addEventListener("click", () => {
    const slider = document.querySelector(`#${button.dataset.slider}-slider`);
    slider.scrollBy({
      left: slider.clientWidth * Number(button.dataset.direction),
      behavior: reducedMotion ? "auto" : "smooth"
    });
  });
});

const reviewSlider = document.querySelector("#reviews-slider");
const reviewDots = [...document.querySelectorAll(".review-dots button")];
reviewDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    reviewSlider.scrollTo({
      left: index * reviewSlider.clientWidth,
      behavior: reducedMotion ? "auto" : "smooth"
    });
  });
});
reviewSlider.addEventListener("scroll", () => {
  const activeIndex = Math.round(reviewSlider.scrollLeft / reviewSlider.clientWidth);
  reviewDots.forEach((dot, index) => {
    dot.setAttribute("aria-current", String(index === activeIndex));
  });
}, { passive: true });

const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector("img");
document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    lightboxImage.src = item.dataset.full;
    lightboxImage.alt = item.querySelector("img").alt;
    lightbox.showModal();
  });
});
lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});
lightbox.addEventListener("close", () => {
  lightboxImage.removeAttribute("src");
});

const dateInput = document.querySelector("#visit-date");
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
dateInput.min = localToday;
document.querySelector("#current-year").textContent = today.getFullYear();

document.querySelector("#booking-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const formData = new FormData(form);
  const name = String(formData.get("name")).trim();
  const phone = String(formData.get("phone")).trim();
  if (!name || !phone || formData.get("date") < localToday) {
    form.querySelector("#form-message").textContent = "Please enter your details and choose today or a future date.";
    return;
  }

  const message = [
    "Hello! I'd like to request a table at SN Restaurant.",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Date: ${formData.get("date")}`,
    `Time: ${formData.get("time")}`,
    `Guests: ${formData.get("guests")}`
  ].join("\n");
  const whatsappUrl = `https://wa.me/${restaurantConfig.whatsapp}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  form.querySelector("#form-message").textContent = "Your WhatsApp message is ready. Send it to request your table.";
});

const revealElements = document.querySelectorAll(
  ".trust-strip > div, .story-copy, .story-photo, .section-heading, .menu-card, .signature-card, .gallery-item, .review-card, .offer-card, .reservation-form, .reservation-copy, .contact-copy, .map-frame"
);
revealElements.forEach((element) => element.classList.add("js-reveal"));

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));
}

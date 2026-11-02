    const menuToggle = document.querySelector(".menu-toggle");
    const siteNav = document.querySelector("#site-nav");

    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
      siteNav.classList.toggle("is-open", !isOpen);
    });

    siteNav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        siteNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      }
    });

    const dateInput = document.querySelector("#visit-date");
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    dateInput.min = localToday;
    document.querySelector("#current-year").textContent = today.getFullYear();

    const scrollContainer = document.querySelector("[data-scroll-container]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (window.gsap && window.ScrollTrigger && window.LocomotiveScroll) {
      gsap.registerPlugin(ScrollTrigger);

      const locomotiveScroll = new LocomotiveScroll({
        el: scrollContainer,
        smooth: !reducedMotion,
        lerp: 0.08,
        smartphone: { smooth: false },
        tablet: { smooth: false }
      });

      locomotiveScroll.on("scroll", ScrollTrigger.update);
      ScrollTrigger.scrollerProxy(scrollContainer, {
        scrollTop(value) {
          if (arguments.length) {
            locomotiveScroll.scrollTo(value, { duration: 0, disableLerp: true });
          }
          return locomotiveScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
          };
        },
        pinType: scrollContainer.style.transform ? "transform" : "fixed"
      });
      ScrollTrigger.defaults({ scroller: scrollContainer });
      ScrollTrigger.addEventListener("refresh", () => locomotiveScroll.update());

      if (!reducedMotion) {
        gsap.from(".hero-content > *", {
          y: 28,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power2.out",
          delay: 0.2
        });

        gsap.utils.toArray([
          ".intro-image",
          ".intro-copy > *",
          ".section-heading > *",
          ".dish-group:first-child .dish-card",
          ".quote-content",
          ".experience-copy > *",
          ".experience-image",
          ".booking-copy > *",
          ".booking-form > *"
        ].join(",")).forEach((element) => {
          gsap.fromTo(element,
            { y: 28, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              ease: "power2.out",
              clearProps: "transform,opacity",
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                once: true
              }
            }
          );
        });
      }

      ScrollTrigger.refresh();
    } else {
      console.error("GSAP, ScrollTrigger, or Locomotive Scroll failed to load; using native scrolling.");
    }

    document.querySelector("#booking-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (!form.reportValidity()) return;

      const name = new FormData(form).get("name").trim();
      document.querySelector("#form-message").textContent =
        `Thanks, ${name} — your table request is ready. Please call us to confirm your reservation.`;
      form.reset();
      dateInput.min = localToday;
    });

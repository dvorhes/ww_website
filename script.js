const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");

navToggle?.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll("form[data-form]").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    const status = form.querySelector(".form-status");
    event.preventDefault();

    const formData = new FormData(form);
    const successMessage = "Message sent. White Wizzard will get back to you soon.";

    if (status) {
      status.textContent = "Sending your message...";
    }

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });

      if (!response.ok) {
        throw new Error(`Form submission failed with status ${response.status}`);
      }

      form.reset();

      if (status) {
        status.textContent = successMessage;
      }
    } catch (error) {
      if (status) {
        status.textContent = "Could not send the message right now. Please try again.";
      }
    }
  });
});

document.addEventListener("click", (event) => {
  const poster = event.target.closest(".video-poster");
  const control = event.target.closest("[data-carousel-control]");

  if (control) {
    const carousel = control.closest(".video-carousel");
    const track = carousel?.querySelector("[data-carousel-track]");

    if (track) {
      const direction = control.getAttribute("data-carousel-control") === "next" ? 1 : -1;
      const amount = Math.max(track.clientWidth * 0.85, 320) * direction;

      track.scrollBy({ left: amount, behavior: "smooth" });
    }

    return;
  }

  if (!poster) {
    return;
  }

  const frame = poster.closest(".video-poster-frame");

  frame?.classList.add("is-playing");
  poster.hidden = true;
});

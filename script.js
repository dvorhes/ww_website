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
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = form.querySelector(".form-status");
    const formType = form.getAttribute("data-form");

    if (status) {
      status.textContent =
        formType === "newsletter"
          ? "You're on the list for Night Lights."
          : "Message queued for the band. Replace this demo handler with your mail service.";
    }

    form.reset();
  });
});

document.addEventListener("click", (event) => {
  const poster = event.target.closest(".video-poster");

  if (!poster) {
    return;
  }

  const frame = poster.closest(".video-poster-frame");

  frame?.classList.add("is-playing");
  poster.hidden = true;
});

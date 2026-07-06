// ============================================================
// CONFIG — edit this to wire up real email notifications
// ============================================================
// 1. Go to https://formspree.io and create a free account.
// 2. Create a new form, it gives you an endpoint like:
//    https://formspree.io/f/abcd1234
// 3. Paste that endpoint below. That's it — submissions land
//    straight in your inbox, no backend needed.
const FORMSPREE_ENDPOINT = ""; // e.g. "https://formspree.io/f/abcd1234"

// ============================================================
// Footer year
// ============================================================
document.getElementById("year").textContent = new Date().getFullYear();

// ============================================================
// Scroll reveal
// ============================================================
const revealEls = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  // Fallback: no IntersectionObserver support — just show everything
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

// ============================================================
// Mobile nav toggle
// ============================================================
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

function closeNav() {
  navToggle.classList.remove("is-open");
  navLinks.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
}

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close the mobile menu after tapping any link inside it
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeNav);
});

// ============================================================
// Nav background on scroll (subtle, optional polish)
// ============================================================
const nav = document.getElementById("nav");
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  nav.style.transform = y > 10 ? "translateY(0)" : "translateY(0)";
  lastScroll = y;
});

// ============================================================
// Contact form
// ============================================================
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");
const submitBtn = document.getElementById("formSubmit");
const submitText = submitBtn.querySelector(".form-submit-text");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("fName").value.trim();
  const email = document.getElementById("fEmail").value.trim();
  const message = document.getElementById("fMessage").value.trim();

  if (!name || !email || !message) {
    setStatus("Please fill in every field.", "error");
    return;
  }

  // If no Formspree endpoint is configured yet, fall back to opening
  // the user's email client with a pre-filled message so the form is
  // still functional out of the box.
  if (!FORMSPREE_ENDPOINT) {
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:kartikmashal8@gmail.com?subject=${subject}&body=${body}`;
    setStatus(
      "Opening your email client — add a Formspree endpoint in js/script.js to send silently instead.",
      "success"
    );
    return;
  }

  setLoading(true);
  setStatus("Sending…", "");

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form),
    });

    if (response.ok) {
      setStatus("Message sent — thanks! I'll get back to you soon.", "success");
      form.reset();
    } else {
      setStatus("Something went wrong. Please try emailing me directly instead.", "error");
    }
  } catch (err) {
    setStatus("Network error. Please try emailing me directly instead.", "error");
  } finally {
    setLoading(false);
  }
});

function setStatus(msg, type) {
  statusEl.textContent = msg;
  statusEl.className = "form-status" + (type ? ` ${type}` : "");
}

function setLoading(isLoading) {
  submitBtn.disabled = isLoading;
  submitText.textContent = isLoading ? "Sending…" : "Send message";
}

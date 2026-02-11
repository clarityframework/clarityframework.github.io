const params = new URLSearchParams(window.location.search);
const name = params.get("name") || "there";
const el = document.getElementById("username");
if (el) el.textContent = name;

/* --- Clarity Framework Bookmark Safety Layer --- */
(function () {
  // Only apply on reading pages
  if (!location.pathname.startsWith("/reading/")) return;

  // Avoid duplicate injection
  if (document.querySelector(".bookmark-note")) return;

  const message = "Bookmark this page to access your reading anytime.";

  const note = document.createElement("p");
  note.className = "bookmark-note";
  note.textContent = message;

  const card = document.querySelector(".card");
  if (!card) return;

  const h1 = card.querySelector("h1");
  if (h1) {
    h1.insertAdjacentElement("afterend", note);
  } else {
    card.prepend(note);
  }

  // Save last reading locally (recovery layer)
  try {
    localStorage.setItem("cf_last_reading_url", location.href);
  } catch (e) {}
})();

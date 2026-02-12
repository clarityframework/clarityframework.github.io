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

/* --- Clarity Framework Closing Layer --- */
(function () {
  // Only apply on reading pages
  if (!location.pathname.startsWith("/reading/")) return;

  // Avoid duplicate injection
  if (document.querySelector(".closing")) return;

  const closingHTML = `
    <div class="closing">
      <p>
        You are not behind. You are not early.
        You are in a specific moment — and clarity comes from meeting it fully.
      </p>
    </div>
  `;

  const note = document.querySelector(".note");
  if (note) {
    note.insertAdjacentHTML("beforebegin", closingHTML);
  }
})();
/* --- Clarity Framework Signature Layer --- */
(function () {
  // Only apply on reading pages
  if (!location.pathname.startsWith("/reading/")) return;

  // Avoid duplicate injection
  if (document.querySelector(".signature")) return;

  const signatureHTML = `
    <p class="signature">— Clarity Framework</p>
  `;

  const closing = document.querySelector(".closing");
  if (closing) {
    closing.insertAdjacentHTML("afterend", signatureHTML);
  }
})();


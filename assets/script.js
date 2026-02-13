const params = new URLSearchParams(window.location.search);
const name = params.get("name") || "there";
const el = document.getElementById("username");
if (el) el.textContent = name;

/* --- Clarity Framework Bookmark Safety Layer --- */
(function () {
  if (!location.pathname.startsWith("/reading/")) return;
  if (document.querySelector(".bookmark-note")) return;

  const message = "Bookmark this page to access your reading anytime.";
  const note = document.createElement("p");
  note.className = "bookmark-note";
  note.textContent = message;

  const card = document.querySelector(".card");
  if (!card) return;

  const h1 = card.querySelector("h1");
  if (h1) h1.insertAdjacentElement("afterend", note);
  else card.prepend(note);

  try {
    localStorage.setItem("cf_last_reading_url", location.href);
  } catch (e) {}
})();

/* --- Clarity Framework Closing Layer --- */
(function () {
  if (!location.pathname.startsWith("/reading/")) return;
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
  if (note) note.insertAdjacentHTML("beforebegin", closingHTML);
})();

/* --- Clarity Framework Copy Link Layer --- */
(function () {
  if (!location.pathname.startsWith("/reading/")) return;
  if (document.querySelector(".copy-link-wrap")) return;

  const wrap = document.createElement("div");
  wrap.className = "copy-link-wrap";
  wrap.style.marginTop = "10px";

  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = "Copy this page link";
  btn.style.cssText =
    "padding:8px 12px;border-radius:8px;border:1px solid #111;background:#fff;color:#111;cursor:pointer;";

  const msg = document.createElement("div");
  msg.style.fontSize = "14px";
  msg.style.marginTop = "6px";
  msg.style.color = "#555";

  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      msg.textContent = "Link copied.";
    } catch (e) {
      msg.textContent = window.location.href;
    }
  });

  wrap.appendChild(btn);
  wrap.appendChild(msg);

  const card = document.querySelector(".card");
  if (!card) return;

  const note = document.querySelector(".bookmark-note");
  if (note) note.insertAdjacentElement("afterend", wrap);
  else card.prepend(wrap);
})();

/* --- Clarity Framework Signature Layer --- */
(function () {
  if (!location.pathname.startsWith("/reading/")) return;
  if (document.querySelector(".signature")) return;

  const signatureHTML = `
    <p class="signature">— Clarity Framework</p>
  `;

  const closing = document.querySelector(".closing");
  if (closing) closing.insertAdjacentHTML("afterend", signatureHTML);
})();

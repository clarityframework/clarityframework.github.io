const params = new URLSearchParams(window.location.search);
const name = params.get("name") || "there";
const el = document.getElementById("username");
if (el) el.textContent = name;

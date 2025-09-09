// Elemen
const popup = document.getElementById("welcome-popup");
const overlayBlur = document.getElementById("overlay-blur");
const enterBtn = document.getElementById("enter-btn");
const themeToggle = document.getElementById("theme-toggle");
const music = document.getElementById("bg-music");
const lightning = document.getElementById("lightning-overlay");

// -----------------------------
// Popup -> play musik + hilangkan blur
// -----------------------------
enterBtn.addEventListener("click", () => {
  popup.classList.remove("active");
  overlayBlur.classList.remove("active");

  // play musik (sesuai request: langsung jalan begitu popup diklik)
  if (music) {
    music.volume = 0.22;
    music.play().catch(() => {
      // fallback: sekali klik layar jika masih keblokir
      const resume = () => {
        music.play().finally(() => document.removeEventListener("click", resume));
      };
      document.addEventListener("click", resume, { once: true });
    });
  }
});

// -----------------------------
// Theme toggle (kotak kecil)
// -----------------------------
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
});

// -----------------------------
// Progress bar animasi halus
// -----------------------------
window.addEventListener("load", () => {
  document.querySelectorAll(".fill").forEach((el, i) => {
    const val = el.getAttribute("data-percent") || "90";
    setTimeout(() => {
      el.style.width = `${val}%`;
      el.textContent = `${val}%`;
    }, 200 + i * 80); // stagger biar smooth
  });
});

// -----------------------------
// Neon effect + kilat saat klik
// -----------------------------
function wireClickNeon(selector){
  document.querySelectorAll(selector).forEach(card=>{
    card.addEventListener("click", ()=>{
      card.classList.add("neon");
      // petir flash
      lightning.classList.add("flash");
      setTimeout(()=> lightning.classList.remove("flash"), 300);
      setTimeout(()=> card.classList.remove("neon"), 800);
    });
  });
}
wireClickNeon(".info-card.clickable");
wireClickNeon(".skill-card.clickable");

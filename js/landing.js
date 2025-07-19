// Optional: Add delayed button animation or future functionality
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector('.enter-btn');
  btn.style.opacity = "0";
  setTimeout(() => {
    btn.style.opacity = "1";
  }, 1000);
});

// Preloader logic
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.style.opacity = "0";
  setTimeout(() => {
    preloader.style.display = "none";
  }, 600);
});
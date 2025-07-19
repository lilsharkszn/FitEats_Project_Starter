document.addEventListener("DOMContentLoaded", () => {
  const cartKey = "cart";
  const userKey = "user";

  // --- Navigation Animation ---
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
      link.classList.add("clicked");
      setTimeout(() => link.classList.remove("clicked"), 300);
    });
  });

  // --- Welcome User If Logged In ---
  const user = JSON.parse(localStorage.getItem(userKey));
  const greetingEl = document.querySelector("#userGreeting") || document.querySelector("#username");
  if (user && greetingEl) {
    greetingEl.textContent = `Welcome, ${user.name}`;
  }

  // --- LOGIN FORM HANDLER ---
  const loginForm = document.querySelector("#loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      const email = loginForm.email.value.trim();
      const password = loginForm.password.value;
      if (email && password) {
        localStorage.setItem(userKey, JSON.stringify({ email, name: "User" }));
        showToast("Login successful!", "success");
        setTimeout(() => window.location.href = "dashboard.html", 1200);
      } else {
        showToast("Please fill in all fields", "error");
      }
    });
  }

  // --- SIGNUP FORM HANDLER ---
  const signupForm = document.querySelector("#signupForm") || document.querySelector("#signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", e => {
      e.preventDefault();
      const name = signupForm.querySelector("#name").value.trim();
      const email = signupForm.querySelector("#email").value.trim();
      const password = signupForm.querySelector("#password").value;
      const confirm = signupForm.querySelector("#confirm-password")?.value;
      if (!name || !email || !password || (confirm && password !== confirm)) {
        showToast("Please check your inputs", "error");
        return;
      }
      localStorage.setItem(userKey, JSON.stringify({ name, email }));
      showToast("Signup successful!", "success");
      setTimeout(() => window.location.href = "dashboard.html", 1200);
    });
  }

  // --- ADD TO CART BUTTONS ---
  const addToCartBtns = document.querySelectorAll(".add-to-cart");
  function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const container = document.querySelector(".cart-summary");
    if (container) {
      if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
        return;
      }
      const itemsHTML = cart.map(item =>
        `<div class="cart-item">${item.name} – ₦${item.price}</div>`
      ).join("");
      const total = cart.reduce((sum, i) => sum + i.price, 0);
      container.innerHTML = itemsHTML + `<strong>Total: ₦${total}</strong>`;
    }
  }

  if (addToCartBtns.length) {
    addToCartBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const name = btn.dataset.name || btn.dataset.meal;
        const price = parseFloat(btn.dataset.price) || 1200; // Default price if missing
        if (!name) return showToast("Missing meal name", "error");

        let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
        if (!cart.find(item => item.name === name)) {
          cart.push({ name, price });
          localStorage.setItem(cartKey, JSON.stringify(cart));
          showToast(`${name} added to cart`, "success");
        } else {
          showToast(`${name} is already in your cart`, "info");
        }
        updateCartDisplay();
      });
    });
  }

  updateCartDisplay();

  // --- TOAST HELPER ---
  function showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  // --- 404 Redirect ---
  if (document.title.includes("404")) {
    setTimeout(() => window.location.href = "index.html", 3000);
  }

  // --- Animate Buttons ---
  document.querySelectorAll("button, .btn").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.add("clicked");
      setTimeout(() => btn.classList.remove("clicked"), 300);
    });
  });

  // --- Dashboard Data Load ---
  if (document.title.includes("Dashboard")) {
    const userData = JSON.parse(localStorage.getItem(userKey)) || { name: "User" };
    document.getElementById("username").textContent = userData.name;
    document.getElementById("goal").textContent = localStorage.getItem("fitness_goal") || "Not Set";
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    document.getElementById("meal-count").textContent = cart.length;
    const delivery = JSON.parse(localStorage.getItem("delivery_info")) || {};
    document.getElementById("delivery-address").textContent = delivery.address || "Not Provided";
    document.getElementById("delivery-date").textContent = delivery.date || "Not Scheduled";
  }
});

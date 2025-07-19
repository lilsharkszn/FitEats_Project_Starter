document.addEventListener("DOMContentLoaded", function () {
  const mealData = JSON.parse(localStorage.getItem("meals")) || [];
  const mealSection = document.getElementById("meal-section");

  if (!mealSection || mealData.length === 0) return;

  mealData.forEach((meal) => {
    const card = document.createElement("div");
    card.classList.add("meal-card");

    card.innerHTML = `
      <img src="${meal.image}" alt="${meal.title}" />
      <div class="content">
        <h4>${meal.title}</h4>
        <p>${meal.calories} kcal | ${meal.protein}g protein</p>
        <button class="add-to-cart" data-title="${meal.title}">Add to Cart</button>
      </div>
    `;

    mealSection.appendChild(card);
  });

  // Optional: Enable add-to-cart functionality for new meals
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const title = btn.dataset.title;
      alert(`Meal "${title}" added to cart (mock)`);
    });
  });
});

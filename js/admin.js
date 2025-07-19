document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("add-meal-form");
  const previewContainer = document.getElementById("meal-preview");

  // Load existing meals
  let meals = JSON.parse(localStorage.getItem("meals")) || [];

  function renderMeals() {
    previewContainer.innerHTML = "";

    if (meals.length === 0) {
      previewContainer.innerHTML = "<p>No meals added yet.</p>";
      return;
    }

    meals.forEach((meal, index) => {
      const card = document.createElement("div");
      card.className = "meal-card";
      card.innerHTML = `
        <img src="${meal.image}" alt="${meal.title}" />
        <div class="content">
          <h4>${meal.title}</h4>
          <p>Calories: ${meal.calories}</p>
          <p>Protein: ${meal.protein}g</p>
          <button data-index="${index}" class="delete-btn">Delete</button>
        </div>
      `;
      previewContainer.appendChild(card);
    });

    // Add delete functionality
    document.querySelectorAll(".delete-btn").forEach(button => {
      button.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        meals.splice(index, 1);
        localStorage.setItem("meals", JSON.stringify(meals));
        renderMeals();
      });
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const titleEl = document.getElementById("meal-title");
    const imageEl = document.getElementById("meal-image");
    const caloriesEl = document.getElementById("meal-calories");
    const proteinEl = document.getElementById("meal-protein");

    if (!titleEl || !imageEl || !caloriesEl || !proteinEl) {
      alert("Form elements missing. Please reload the page.");
      return;
    }

    const title = titleEl.value.trim();
    const image = imageEl.value.trim();
    const calories = caloriesEl.value.trim();
    const protein = proteinEl.value.trim();

    if (!title || !image || !calories || !protein) {
      alert("Please fill in all fields.");
      return;
    }

    const newMeal = { title, image, calories, protein };
    meals.push(newMeal);
    localStorage.setItem("meals", JSON.stringify(meals));
    renderMeals();
    form.reset();
  });

  renderMeals();
});


const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");

const optionsList = document.querySelectorAll(".option");

selected.addEventListener("click", () => {
  optionsContainer.classList.toggle("active");
  selected.classList.toggle("hidden")
});

optionsList.forEach(o => {
  o.addEventListener("click", () => {
    selected.innerHTML = `<p>${o.querySelector("label").innerHTML}<p>` + `<div class="arrow-down"></div>`;
    optionsContainer.classList.remove("active");
    selected.classList.remove("hidden")
  });
});
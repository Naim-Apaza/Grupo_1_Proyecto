window.addEventListener("load", () => {
  const menu = document.querySelector(".menu-container");

  menu.addEventListener("click", (event) => {
    menu.classList.toggle("active");
    event.stopPropagation();
  });

  document.addEventListener("click", (event) => {
    if (!menu.contains(event.target) && menu.classList.contains("active")) {
      menu.classList.remove("active");
    }
  });
});

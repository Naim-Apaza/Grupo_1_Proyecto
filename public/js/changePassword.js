window.addEventListener("load", () => {
  let passwordForm = document.querySelector(".password-container");
  let editBtn = document.querySelector(".buttons .edit-btn");
  editBtn.addEventListener("click", () => {
    if (passwordForm.style.display === "none") {
      passwordForm.style.display = "block";
      editBtn.innerText = "Cancelar";
    } else {
      passwordForm.style.display = "none";
      editBtn.innerText = "Cambiar contraseña";
    }
  });
});

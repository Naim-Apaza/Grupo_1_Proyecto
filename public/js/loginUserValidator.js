window.addEventListener("load", () => {
  let erroresList = document.querySelector(".errores");
  let formulario = document.querySelector("form");
  let errores = [];
  let correo = document.querySelector("#correo");
  let clave = document.querySelector("#password");
  let expresionRegular = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

  formulario.addEventListener("submit", (event) => {
    errores = [];

    if (
      correo.value == "" ||
      correo.value == null ||
      correo.value == undefined
    ) {
      errores.push("Campo correo obligatorio");
    } else if (!expresionRegular.test(correo.value)) {
      errores.push("Correo inválido");
    }

    if (
        clave.value == "" || 
        clave.value == null || 
        clave.value == undefined
    ) {
      errores.push("Campo contraseña obligatorio");
    }

    if (errores.length > 0) {
      erroresList.innerHTML = "";
      for (let i = 0; i < errores.length; i++) {
        erroresList.innerHTML += `<p class="error">${errores[i]}</p>`;
      }
      event.preventDefault();
    }
    
  });
});

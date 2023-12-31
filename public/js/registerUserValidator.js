window.addEventListener("load", function () {
  let erroresList = document.querySelector(".errores");
  let formulario = document.querySelector("form");
  let errores = [];
  let nombre = document.querySelector("#name");
  let apellido = document.querySelector("#lastName");
  let correo = document.querySelector("#correo");
  let imagen = document.querySelector("#imagen");
  let clave = document.querySelector("#password");
  let repass = document.querySelector("#repass");
  let expresionRegular = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  let extensionesPermitidas = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
  ];
  let extension;

  imagen.addEventListener("change", function (e) {
    extension = e.target.files[0].type;
  });

  formulario.addEventListener("submit", function (event) {
    errores = [];

    if (
      nombre.value == "" ||
      nombre.value == null ||
      nombre.value == undefined
    ) {
      errores.push("Campo nombre obligatorio");
    } else if (nombre.value.length < 2) {
      errores.push("El nombre debe tener al menos 2 caracteres");
    }

    if (
      apellido.value == "" ||
      apellido.value == null ||
      apellido.value == undefined
    ) {
      errores.push("Campo apellido obligatorio");
    } else if (apellido.value.length < 2) {
      errores.push("El apellido debe tener al menos 2 caracteres");
    }

    if (
      correo.value == "" ||
      correo.value == null ||
      correo.value == undefined
    ) {
      errores.push("Campo correo obligatorio");
    } else if (!expresionRegular.test(correo.value)) {
      errores.push("Correo no válido");
    }

    if (clave.value == "" || clave.value == null || clave.value == undefined) {
      errores.push("Campo contraseña obligatorio");
    } else if (clave.value.length > 32 && clave.value.length < 8) {
      errores.push("La contraseña debe tener entre 8 y 32 caracteres");
    }

    if (
      repass.value == "" ||
      repass.value == null ||
      repass.value == undefined
    ) {
      errores.push("Repetir la contraseña es obligatorio");
    } else if (repass.value != clave.value) {
      errores.push("Ambas contraseñas deben ser iguales");
    }

    if (extension == undefined || extension == null) {
      errores.push("Campo de imagen obligatorio");
    } else if (!extensionesPermitidas.includes(extension)) {
      errores.push("Debe ser un archivo valido (JPG, JPEG, PNG, WEBP, GIF)");
    }

    if (errores.length > 0) {
      erroresList.innerHTML = "";
      for (let i = 0; i < errores.length; i++) {
        erroresList.innerHTML += `<li class="error">${errores[i]}</li>`;
      }
    }
    event.preventDefault();
  });
});

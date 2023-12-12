window.addEventListener("load", function () {
  let erroresList = document.querySelector(".errores");
  let formulario = document.querySelector("form");
  let errores = [];
  let nombre = document.querySelector("#nombre");
  let precio = document.querySelector("#precio");
  let descripcion = document.querySelector("#detalle");
  let plataforma = document.querySelector("#plataforma");
  let categorias = document.querySelector("#tag")
  let descuento = document.querySelector("#descuento");
  let img = document.querySelector("#imagen");
  let extensionesPermitidas = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/gif",
  ];
  let extension;

  img.addEventListener("change", function (e) {
    extension = e.target.files[0].type;
  });

  formulario.addEventListener("submit", function (event) {
    errores = [];

    if (nombre.value == "" || nombre.value == null || nombre.value == undefined) {
      errores.push("Campo nombre obligatorio");
    } else if (nombre.value.length < 5) {
      errores.push("Debe tener por lo menos 5 caracteres");
    }

    if (plataforma.value = "" || plataforma.value == null || plataforma.value == undefined) {
      errores.push("Campo plataforma obligatorio");
    }

    if (categorias.value == "" || categorias.value == null || categorias.value == [] || categorias.value == undefined) {
      errores.push("Campo categorias obligatorio");
    }

    if (descuento.value == "" || descuento.value == null || descuento.value == undefined) {
      errores.push("Campo descuento obligatorio");
    } else if (descuento.value > 100 || descuento.value < 0) {
      errores.push("Debe tener un descuento entre 0 y 100");
    }

    if (precio.value == "" || precio.value == null || precio.value == undefined) {
      errores.push("Campo de precio obligatorio");
    } else if (precio.value < 0 && precio.value > 9999.99) {
      errores.push("Debe tener un precio valido");
    }

    if (descripcion.value == "" || descripcion.value == null || descripcion.value == undefined) {
      errores.push("Campo de descripcion obligatorio");
    } else if (descripcion.value.length < 20) {
      errores.push("Debe tener por lo menos 20 caracteres");
    }

    if (extension == undefined || extension == null) {
      errores.push("Campo de imagen obligatorio");
    } else if (!extensionesPermitidas.includes(extension)) {
      errores.push("Debe ser un archivo valido (JPG, JPEG, PNG, GIF)");
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

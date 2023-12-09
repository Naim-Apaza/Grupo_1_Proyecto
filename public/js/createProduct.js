window.addEventListener("load", function () {

    let UlErrores = document.querySelector(".errores")
    let formulario = document.querySelector("form.create-form")
    let errores = []
    let nombre = document.querySelector("#nombre")
    let precio = document.querySelector("#precio")
    let descripcion = document.querySelector("#descripcion")
    let descuento = document.querySelector("#descuento")
    let img = document.querySelector("#imagen")
    let permitidos_extention = ["image/jpg", "image/jpeg", "image/png", "image/gif"]
    let extension;

    img.addEventListener("change", function (e) {
        extension = e.target.files[0].type
    })


    formulario.addEventListener("submit", function (event) {
       errores = [];
        if (nombre.value == "" || nombre.value == null) {
            errores.push("Campo nombre obligatorio")
        } else if (nombre.value.length < 5) {
            errores.push("Debe tener por lo menos 5 caracteres")
        }

        if (descuento.value == "" || descripcion.value == null) {
            errores.push("Campo descuento obligatorio")
        } else if (descuento.value > 100 || descuento.value < 0) {
            errores.push("Debe tener un descuento entre 0 y 100")
        }
    
        if(precio.value == "" || precio.value == null){
            errores.push("Campo de precio Obligatorio")
        }else if(precio.value < 0 && precio.value > 9999.99){
            errores.push("Debe tener un precio valido")
        }

        if (descripcion.value == "" || descripcion.value == null) {
            errores.push("Campo de descripcion obligatorio")
        } else if (descripcion.value.length < 20) {
            errores.push("Debe tener por lo menos 20 caracteres")
        }

         /* console.log(extension) */
         if (extension == undefined) {
            /*                 console.log("sadisad")*/
            errores.push("Campo de imagen obligatorio")
        } else if (!permitidos_extention.includes(extension)) {
                /* console.log("ninguna es una imagen")*/  
              errores.push("Debe ser un archivo valido (JPG,JPEG,PNG,GIF)")
        }
        if (errores.length > 0) {

            UlErrores.innerHTML = "";
            for (let i = 0; i < errores.length; i++) {
                /*             console.log(errores[i])*/
                console.log(UlErrores.innerHTML)
               
                    UlErrores.innerHTML += "<li>" + errores[i] + "</li>"
                
            }
            event.preventDefault()
        }
    })

})
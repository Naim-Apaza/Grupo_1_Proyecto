
window.addEventListener("load", function () {

    let UlErrores = document.querySelector(".ul_errores_div")
    let formulario = document.querySelector("form.create-form")
    let errores = []
    let nombre = document.querySelector(".name_input")
    let precio = document.querySelector(".precio_input")
    let descripcion = document.querySelector(".descripcion_input")
    let img = document.querySelector(".file_input")
    let permitidos_extention = ["image/jpg", "image/jpeg", "image/png", "image/gif"]
    let extension;

    img.addEventListener("change", function (e) {
        extension = e.target.files[0].type
    })


    formulario.addEventListener("submit", function (event) {
       errores = [];
        if (nombre.value == "") {
            errores.push("Campo nombre obligatorio")
        } else if (nombre.value.length < 5) {
            errores.push("Debe tener por lo menos 5 caracteres")
        }
    
        /* console.log(precio.value) */

        if(precio.value == ""){
            errores.push("Campo de precio Obligatorio")
        }else if(precio.value < 500){
            errores.push("debe el precio ser por lo menos 500 pesos")
        }

        if (descripcion.value == "") {
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
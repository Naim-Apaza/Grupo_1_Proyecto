const porDefecto = "../images/users/default.jpg";

let archivo = document.querySelector("#imagen");
let imagen = document.querySelector(".img");

window.addEventListener("load", () => {
  archivo.addEventListener("change", (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        imagen.src = e.target.result;
      };
  
      reader.readAsDataURL(e.target.files[0]);
    } else {
      imagen.src = porDefecto;
    }
  });
})
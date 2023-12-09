const porDefecto = "../images/products/204.jpg";

const archivo = document.querySelector("#imagen");
const imagen = document.querySelector(".img");

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

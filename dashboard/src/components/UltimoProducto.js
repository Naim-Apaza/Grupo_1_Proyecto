import React, { useEffect, useState } from "react";

function UltimoProducto() {
  const [producto, setProducto] = useState({});

  async function getProducto() {
    const data = await fetch("http://localhost:3001/api/products");
    const result = await data.json();

    if (result.meta.status === 200) {
      setProducto(result.data.lastProduct);
    }
  }

  useEffect(() => {
    getProducto()
  }, [])

  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Último producto agregado
          </h5>
        </div>
        <div className="card-body">
            <h5 className="card-title">{producto.nombre} - {producto.plataforma}</h5>
          <div className="text-center">
            <img
              className="img-fluid px-3 px-sm-4 mt-3 mb-4"
              style={{ width: 40 + "rem" }}
              src={producto.imagen}
              alt={producto.nombre}
            />
          </div>
          <ul className="list-group mb-2">{ producto.categorias ? producto.categorias.map((categoria, i) => (
          <li className="list-group-item" key={i}>{categoria}</li>
          )) : (<li className="list-group-item">Sin generos</li>)}</ul>
          <p>
            { producto.descripcion ? producto.descripcion.slice(0, 149) + "..." : "Sin descripción"}
          </p>
          <a className="btn btn-danger" target="_blank" rel="noreferrer" href={producto.detalle}>
            Ver más detalles
          </a>
        </div>
      </div>
    </div>
  );
}

export default UltimoProducto;

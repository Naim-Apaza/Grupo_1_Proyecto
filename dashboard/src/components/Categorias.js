import React, { useState, useEffect } from "react";

function Categorias() {
  const [categorias, setCategorias] = useState([]);

  async function getCategorias() {
    const data = await fetch("http://localhost:3001/api/products");
    const result = await data.json();

    if (result.meta.status === 200) {
      setCategorias(result.data.countByCategory);
    }
  }

  useEffect(() => {
    getCategorias()
  }, [])

  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">Categorias</h5>
        </div>
        <div className="card-body">
          <div className="row">
            {categorias !== undefined ? (
              categorias.map((categoria, i) => {
                return (
                  <div className="col-lg-6 mb-4">
                    <div className="card text-white shadow" style={{ background: "black"}}>
                      <div className="card-body" key={i}>
                        {categoria.nombre} - {categoria.cantidad_productos}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="alert alert-danger text-center my-4 fs-2">
                No hay categorias
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categorias;

import React, { useEffect, useState } from "react";
import SmallCard from "./SmallCard";

function Paneles() {
  const [cantidadProductos, setCantidadProductos] = useState();
  const [cantidadUsuarios, setCantidadUsuarios] = useState();
  const [cantidadCategorias, setCantidadCategorias] = useState();
  const [cardProps, setCardProps] = useState([]);

  async function getCantidadProductosCategorias() {
    const data = await fetch("http://localhost:3001/api/products/");
    const result = await data.json();

    if (result.meta.status === 200) {
      setCantidadProductos(result.meta.count);
      setCantidadCategorias(result.data.categorias);
    }
  }

  async function getCantidadUsuarios() {
    const data = await fetch("http://localhost:3001/api/users/");
    const result = await data.json();

    if (result.meta.status === 200) {
      setCantidadUsuarios(result.meta.count);
    }
  }

  useEffect(() => {
    const productos = {
      title: "Total de productos",
      color: "danger",
      cuantity: cantidadProductos,
      icon: "fa-clipboard-list",
    };

    const usuarios = {
      title: "Total de usuarios",
      color: "dark",
      cuantity: cantidadUsuarios,
      icon: "fa-user-check",
    };

    const categorias = {
      title: "Total de categorias",
      color: "danger",
      cuantity: cantidadCategorias,
      icon: "fa-award",
    };

    setCardProps([productos, usuarios, categorias]);
  }, [cantidadProductos, cantidadCategorias, cantidadUsuarios]);

  return (
    <div className="row m-4" onMouseOver={() => getCantidadProductosCategorias() && getCantidadUsuarios()}>
      {cardProps.map((movie, i) => {
        return <SmallCard {...movie} key={i} />;
      })}
    </div>
  );
}

export default Paneles;

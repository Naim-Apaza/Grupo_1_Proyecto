import React, { useEffect, useState } from "react";
import SmallCard from "./SmallCard";

function Paneles() {
    // const [ cantidadProductos, setCantidadProductos ] = useState({})
    // const [ cantidadUsuarios, setCantidadUsuarios ] = useState({})
    // const [ cantidadCategorias, setCantidadCategorias ] = useState({})
    // const [ cardProps, setCardProps ] = useState([])

    async function getCantidadProductos() {
        const result = await fetch("/api/products/")
        
        if(result.status === 200) {
            console.log(result)
        }
    }

  /*  Cada set de datos es un objeto literal */

  /* <!-- Movies in DB --> */

  let productos = {
    title: "Total de productos",
    color: "danger",
    cuantity: 21,
    icon: "fa-clipboard-list",
  };

  /* <!-- Total awards --> */

  let usuarios = {
    title: "Total de usuarios",
    color: "dark",
    cuantity: "79",
    icon: "fa-user-check",
  };

  /* <!-- Actors quantity --> */

  let categorias = {
    title: "Total de categorias",
    color: "danger",
    cuantity: "49",
    icon: "fa-award",
  };

  let cardProps = [productos, usuarios, categorias];

  return (
    <div className="row m-4">
        {getCantidadProductos()}
      {cardProps.map((movie, i) => {
        return <SmallCard {...movie} key={i} />;
      })}
    </div>
  );
}

export default Paneles;

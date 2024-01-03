import React from 'react';
import SmallCard from './SmallCard';

/*  Cada set de datos es un objeto literal */

/* <!-- Movies in DB --> */

let moviesInDB = {
    title: 'Total de productos',
    color: 'danger', 
    cuantity: 21,
    icon: 'fa-clipboard-list'
}

/* <!-- Total awards --> */

let totalAwards = {
    title:'Total de usuarios', 
    color:'dark', 
    cuantity: '79',
    icon:'fa-user-check'
}

/* <!-- Actors quantity --> */

let actorsQuantity = {
    title:'Total de categorias',
    color:'danger',
    cuantity:'49',
    icon:'fa-award'
}

let cartProps = [moviesInDB, totalAwards, actorsQuantity];

function Paneles(){
    return (
    
        <div className="row">
            
            {cartProps.map( (movie, i) => {

                return <SmallCard {...movie} key={i}/>
            
            })}

        </div>
    )
}

export default Paneles;
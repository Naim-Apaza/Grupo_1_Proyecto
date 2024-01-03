import React from 'react';
import UltimoProducto from './UltimoProducto';
import Categorias from './Categorias';

function ContenidoCentral(){
    return (
        <div className="row">
            
            {/*<!-- Last Movie in DB -->*/}
            <UltimoProducto />
            {/*<!-- End content row last movie in Data Base -->*/}

            {/*<!-- Genres in DB -->*/}
            <Categorias />

        </div>
    )
}

export default ContenidoCentral;
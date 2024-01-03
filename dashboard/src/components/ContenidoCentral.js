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
            {/*<!-- End content row Genres in DB -->*/}

        </div>
    )
}

export default ContenidoCentral;
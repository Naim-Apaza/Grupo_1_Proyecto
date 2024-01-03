import React from 'react';
import ContenidoCentral from './ContenidoCentral';
import Paneles from './Paneles';
import Listado from './Listado';

function Contenido(){
    return(
        <React.Fragment>
				{/*<!-- Content Row Top -->*/}
				<div className="container-fluid">
					<div className="d-sm-flex aligns-items-center justify-content-between mb-4">
						<h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
					</div>
				
					{/*<!-- Content Row Movies-->*/}
					<Paneles />
					<ContenidoCentral />
					<Listado />
	
				</div>
				{/*<!--End Content Row Top-->*/}

        </React.Fragment>
    )

}
export default Contenido;
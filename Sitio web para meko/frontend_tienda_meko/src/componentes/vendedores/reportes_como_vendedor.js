import {Link} from 'react-router-dom';
import Barra_lateral_como_vendedor from "./barra_lateral_como_vendedor";
function Reportes_como_vendedor (){



    return (
        <div className={"container mt-4"}>
            <div className={"row"}>
                <div className={"col-md-3 col-12 mb-2"}>
                    <Barra_lateral_como_vendedor/>
                </div>

                <div className={"col-md-9 col-12 mb-2"}>
                    <div className={"row"}>

                        <div className={"col-md-4 mb-2"}>
                            <div className={"card"}>
                                <div className={"card-body text-center"}>
                                    <h4>Reportes diarios</h4>
                                    <h4><Link to={'/vendedor/reporte-diario'} className={"btn btn-info"}>Ver</Link></h4>
                                </div>
                            </div>
                        </div>

                        <div className={"col-md-4 mb-2"}>
                            <div className={"card"}>
                                <div className={"card-body text-center"}>
                                    <h4>Reportes mensuales</h4>
                                    <h4><Link to={'#'} className={"btn btn-info"}>Ver</Link></h4>

                                </div>
                            </div>
                        </div>


                    <div className={"col-md-4 mb-2"}>
                            <div className={"card"}>
                                <div className={"card-body text-center"}>
                                    <h4>Reportes anuales</h4>
                                    <h4><Link to={'#'} className={"btn btn-info"}>Ver</Link></h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Reportes_como_vendedor;

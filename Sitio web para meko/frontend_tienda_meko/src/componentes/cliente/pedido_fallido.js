import {Link} from 'react-router-dom';
function Pedido_fallido(props){
    return (


        <div className={"container mt-4"}>
            <div className={"row"}>
                <div className={"col-md-8 offset-2"}>
                    <div className={"card"}>
                        <div className={"card-body text-center"}>
                            <p><i className={"fa fa-times-circle text-danger fa-3x"}></i></p>
                            <h3 className={"text-danger"}>Oops...Lo sentimos hubo algún error</h3>
                            <p>
                                <Link className={"btn btn-primary mt-2"} to={"/"}>Inicio</Link>
                                <Link className={"btn btn-secondary ms-2 mt-2"} to={"/cliente/dashboard"}>Dashboard</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Pedido_fallido;

import logo from "../logo.svg";
import {Link, useParams} from 'react-router-dom';
import {TipoMonedaContext, UserContext} from "../context";
import {useContext, useState} from "react";
import axios from "axios";


function Producto_solo(props){

    const producto_id =props.producto_x.id;
    const { TipoMoneda } = useContext(TipoMonedaContext);
    const userContext = useContext(UserContext);
    const [Producto_en_lista_deseos,setProducto_en_lista_deseos] = useState(false);
    const [url, setUrl] = useState('http://127.0.0.1:8000/api');
    const [ProductoData,setProductoData] = useState([]);
    // Verifica que props.producto_x esté definido antes de acceder a sus propiedades
    if (!props.producto_x) {
        return null; // O cualquier otro componente de carga o mensaje de error que desees mostrar
    }


    const agregar_a_la_lista_de_deseos_handler = () => {
        const cliente_id=localStorage.getItem('cliente_id');
        const formData = new FormData();
        const parte_url_lista_deseos="/lista-de-deseos/";

        const urlCompleta=url+parte_url_lista_deseos;

        formData.append('clientes', parseInt(cliente_id));
        formData.append('productos', ProductoData.id);

        axios.post(urlCompleta,formData)
            .then(function (response) {
                console.log(response);
                revisar_si_el_producto_esta_en_la_lista_de_deseos(producto_id);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function revisar_si_el_producto_esta_en_la_lista_de_deseos(producto_id){
        const cliente_id=localStorage.getItem('cliente_id');
        const formData = new FormData();
        const parte_url_lista_deseos="/revisar-lista-de-deseos/";

        const urlCompleta=url+parte_url_lista_deseos;

        formData.append('clientes', parseInt(cliente_id));
        formData.append('productos',producto_id);

        axios.post(urlCompleta,formData)
            .then(function (response) {
                if (response.data.bool === true){
                    setProducto_en_lista_deseos(true);
                }
                else {
                    setProducto_en_lista_deseos(false);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
            <div className="col-12 col-md-3 mb-4 ">
                <div className="card shadow" >
                    <Link to={`/producto/${props.producto_x.slug}/${props.producto_x.id}`}> <img src={props.producto_x.imagen} className="card-img-top" alt="..."/></Link>
                    <div className="card-body">
                           <Link to={`/producto/${props.producto_x.titulo}/${props.producto_x.id}`}>  <h4 className="card-title">{props.producto_x.titulo}</h4></Link>

                        {
                            TipoMoneda !== 'usd' &&
                            <h5 className="card-title text-muted">Precio: <span>{props.producto_x.precio} Cup</span></h5>
                        }

                        {
                            TipoMoneda === 'usd' &&
                            <h5 className="card-title text-muted">Precio: <span>$ {props.producto_x.precioUSD}</span></h5>
                        }

                        {/* <h5 className="card-title text-muted">Precio: <span className={"text-muted"}>$ {props.producto_x.precio}</span></h5>*/}
                    </div>
                    {/*  <div className="card-footer">
                        <button className='btn btn-success btn-sm' title={"Agregar al carrito"}><i className="fa-solid fa-cart-plus fa-2x"></i></button>
                        {
                            userContext.login===null &&
                            <button type={"button"} className='btn btn-danger ms-1' disabled={true} onClick={agregar_a_la_lista_de_deseos_handler} ><i className="fa-solid fa-heart fa-2x"></i></button>
                        }

                        {
                            (userContext.login==='true' && !Producto_en_lista_deseos) &&
                            <button type={"button"} className='btn btn-danger btn-sm ms-1' onClick={agregar_a_la_lista_de_deseos_handler}><i className="fa-solid fa-heart fa-2x"></i></button>
                        }
                        {
                            (userContext.login==='true' && Producto_en_lista_deseos) &&
                            <button type={"button"} disabled={true} className='btn btn-danger ms-1' onClick={agregar_a_la_lista_de_deseos_handler}><i className="fa-solid fa-heart fa-2x"></i></button>
                        }
                        </div>*/}
                </div>
            </div>
    );
}
export default Producto_solo;
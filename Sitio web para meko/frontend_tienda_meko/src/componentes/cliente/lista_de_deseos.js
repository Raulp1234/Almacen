import {Link} from 'react-router-dom';
import Barra_lateral from "./barra_lateral";
import {useContext, useEffect, useState} from "react";
import {TipoMonedaContext} from "../../context";
import axios from "axios";


function Lista_de_deseos (){
    const base_url = 'http://127.0.0.1:8000/api';
    const parte_de_la_url = '/cliente/';
    const parte2_de_la_url='/productos-lista-de-deseos/';
    const [Productos_de_la_lista_deseos,setProductos_de_la_lista_deseos] = useState([]);
    const cliente_id = localStorage.getItem('cliente_id');
    const { TipoMoneda } = useContext(TipoMonedaContext);

    useEffect(() => {
        fetch_data(`${base_url}${parte_de_la_url}${cliente_id}${parte2_de_la_url}`);
    },[]);


    function fetch_data(url) {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setProductos_de_la_lista_deseos(data.results);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    function quitar_producto_de_lista_deseo(lista_deseos_id) {
        const formData = new FormData();
        const parte_url_lista_deseos="/eliminar-producto-de-lista-de-deseos/";

        const urlCompleta=base_url+parte_url_lista_deseos;

        formData.append('lista_deseos_id', lista_deseos_id);

        axios.post(urlCompleta,formData)
            .then(function (response) {
                if(response.data.bool === true){
                    document.getElementById('row'+lista_deseos_id).remove();
                }
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
    console.log("Productos_de_la_lista_deseos: ",Productos_de_la_lista_deseos)

    return (
        <div className={"container mt-4"}>
            <div className={"row"}>
                <div className={"col-md-3 col-12 mb-2"}>
                    <Barra_lateral/>
                </div>

                <div className={"col-md-9 col-12 mb-2"}>
                    <div className={"row"}>
                        <div className={"table-responsive"}>
                            <table className={"table table-bordered"}>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Producto</th>
                                    <th>Precio</th>
                                    <th>Acción</th>
                                </tr>
                                </thead>
                                <tbody>

                                {
                                    Productos_de_la_lista_deseos.map((item,index) =>{
                                        return <tr key={index} id={`row${item.id}`}>
                                            <td>{index+1}</td>
                                            <td>
                                                <Link><img src={item.productos.imagen } className={"img-thumbnail"} width={"80"} alt={item.productos.titulo}></img></Link>
                                                <p> <Link>{item.productos.titulo}</Link></p>

                                            </td>

                                            <td>
                                            {
                                                TipoMoneda !== 'usd' &&
                                                 <span>{item.productos.precio} Cup</span>
                                            }

                                            {
                                                TipoMoneda === 'usd' &&
                                               <span>$ {item.productos.precioUSD}</span>
                                            }
                                            </td>
                                            <td><button type={"button"} className={"btn btn-danger btn-sm"} onClick={()=>quitar_producto_de_lista_deseo(item.id)}>Quitar</button></td>
                                        </tr>
                                    })
                                }



                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Lista_de_deseos;

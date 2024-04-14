import {Link} from 'react-router-dom';
import logo from "../../logo.svg";
import Barra_lateral_como_vendedor from "./barra_lateral_como_vendedor";
import {useEffect, useState} from "react";
function Pedidos_del_vendedor (){

    const base_url = 'http://127.0.0.1:8000/api';
    const parte_de_la_url = '/vendedor/';
    const parte2_de_la_url='/productos-pedidos/';
    const parte1_de_la_url2='/actualizar-total-descargas-producto/';
    const parte1_de_la_url_modificar='/pedido-modificar/';

    const [Total_descargas,setTotal_descargas] = useState(0);
    const [Productos_del_pedido,setProductos_del_pedido] = useState([]);
    const vendedor_id=localStorage.getItem('vendedor_id');

    useEffect(() => {
        fetch_data(`${base_url}${parte_de_la_url}${vendedor_id}${parte2_de_la_url}`);
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
                setProductos_del_pedido(data.results);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    console.log("Productos_del_pedido: ",Productos_del_pedido)
    
    function cambiarEstado(pedido_id,estado_completado) {
        fetch(`${base_url}${parte1_de_la_url_modificar}${pedido_id}`+'/',{
            method:"PATCH",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({estado:estado_completado})
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data)=> {
                fetch_data(`${base_url}${parte_de_la_url}${vendedor_id}${parte2_de_la_url}`);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }
    
    return (
        <div className={"container mt-4"}>
            <div className={"row"}>
                <div className={"col-md-3 col-12 mb-2"}>
                    <Barra_lateral_como_vendedor/>
                </div>

                <div className={"col-md-9 col-12 mb-2"}>
                    <div className={"row"}>
                        <div className={"table-responsive"}>
                            <table className={"table table-bordered"}>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Producto</th>
                                    <th>Precio MN</th>
                                    <th>Precio USD</th>
                                    <th>Estado</th>
                                    <th>Acción</th>
                                </tr>
                                </thead>
                                <tbody>
                                    { Productos_del_pedido.map((item,index) => {
                                        return <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>
                                                <Link><img src={item.productos.imagen} className={"img-thumbnail"} width={"80"} alt={item.productos.titulo}></img></Link>
                                                <p> <Link>{item.productos.titulo}</Link></p>
                                            </td>
                                            <td>{item.productos.precio} Cup</td>
                                            <td>$ {item.productos.precioUSD} Cup</td>
                                            <td>
                                                {
                                                    item.pedidos.estado &&
                                                    <span className={"text-success"}><i className={"fa fa-check-circle"}></i> Completado</span>

                                                }
                                                {
                                                    !item.pedidos.estado &&
                                                    <span className={"text-dark"}><i className={"fa fa-spinner fa-spin"}></i> Pendiente</span>

                                                }
                                             </td>
                                            <td>
                                                <div>
                                                    <div className="dropdown">
                                                        <button className={"btn btn-primary dropdown-toggle btn-sm"} type={"button"} data-bs-toggle={"dropdown"} aria-expanded={"false"}>Cambiar estado</button>
                                                        <ul className="dropdown-menu">
                                                            {
                                                                !item.pedidos.estado &&
                                                                <li><Link className="dropdown-item" to="#" onClick={()=>cambiarEstado(item.pedidos.id,true)}>Completado</Link></li>
                                                            }
                                                            {
                                                                item.pedidos.estado &&
                                                                <li><Link className="dropdown-item" to="#" onClick={()=>cambiarEstado(item.pedidos.id,false)}>Pendiente</Link></li>

                                                            }
                                                        </ul>
                                                    </div>
                                                </div>

                                            </td>

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
export default Pedidos_del_vendedor;

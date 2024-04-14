import {Link} from 'react-router-dom';
import Barra_lateral_como_vendedor from "./barra_lateral_como_vendedor";
import { useEffect, useState} from "react";

function Productos_del_vendedor (){
    const vendedor_id=localStorage.getItem('vendedor_id');
    const [url, setUrl] = useState('http://127.0.0.1:8000/api');
    const parte_de_la_url_productos = '/productos/';
    const parte_de_la_url_producto_eliminar = '/producto/';
    const [ProductoData, setProductoData]= useState([]);

    useEffect(() => {
        fetch_data(`${url}${parte_de_la_url_productos}`);
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
                setProductoData(data.results); // Utiliza setProductoData para actualizar el estado*/
                console.log("ProductoData:", ProductoData)
            })
            .catch((error,data) => {
                console.error("Error fetching data:", error.response);
            });
    }

    function mostrarConfirmacionParaEliminar(producto_id) {
        let confirmacion = window.confirm("Estas seguro que desea eliminar este producto ?");

        if (confirmacion) {
            fetch(`${url}${parte_de_la_url_producto_eliminar}${producto_id}`+'/', {
                method: 'DELETE'
            })
                .then((response) => {
                    if (response.ok) {
                        // Producto eliminado correctamente, recargar la página
                        fetch_data(`${url}${parte_de_la_url_productos}`);
                        window.location.reload();
                    } else {
                        console.error('Error al eliminar el producto');
                    }
                  /*  if (response.bool === true) {
                        fetch_data(`${url}${parte_de_la_url_productos}`);
                        window.location.reload();
                    }*/
                });
        }
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
                                    <td colSpan={'5'} align={"left"}><Link to={"/vendedor/nuevo-producto"} className={"btn btn-primary mb-2"}>
                                        <i className={"fa fa-plus-circle"}></i> Agregar nuevo producto
                                    </Link>

                                    </td>
                                </tr>
                                <tr>
                                    <th>#</th>
                                    <th>Producto</th>
                                    <th>Precio MN</th>
                                    <th>Precio USD</th>
                                    {/* <th>Estado</th>*/}
                                    <th>Acción</th>
                                </tr>
                                </thead>
                                <tbody>

                                {
                                    ProductoData.map((item,index) =>{
                                        return <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>
                                                <Link to={`/vendedor/actualizar-producto/${item.id}`}>
                                                    {item.titulo}
                                                </Link>

                                            </td>
                                            <td>{item.precio}</td>
                                            <td>{item.precioUSD}</td>
                                            {/*<td>
                                            {item.estado_de_publicacion !==true && <span className={"text-dark"}>Pendiente</span>}
                                            {item.estado_de_publicacion ===true &&<span className={"text-success"}>Publicado</span>}
                                            </td>*/}
                                            <td>
                                                <Link to={`/vendedor/actualizar-producto/${item.id}`} className={"btn btn-primary ms-1"}>Editar</Link>
                                                <Link to={""} className={"btn btn-danger ms-1"} onClick={()=>mostrarConfirmacionParaEliminar(item.id)}>Eliminar</Link>
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
export default Productos_del_vendedor;

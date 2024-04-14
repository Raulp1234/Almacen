import {Link} from 'react-router-dom';
import Barra_lateral_como_vendedor from "./barra_lateral_como_vendedor";
import {useEffect, useState} from "react";
function Clientes_del_vendedor (){

    const base_url = 'http://127.0.0.1:8000/api';
    const parte_de_la_url = '/vendedor/';
    const parte2_de_la_url='/clientes/';
    const [ListaClientes,setListaClientes] = useState([]);
    const vendedor_id=localStorage.getItem('vendedor_id');
    const parte_de_la_url_pedido_eliminar= "/pedido-eliminar/";

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
                console.log("data: ",data)
                setListaClientes(data.results);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }


    function mostrarConfirmacionParaEliminar(cliente_id) {
        let confirmacion = window.confirm("Estas seguro que desea eliminar este cliente de la lista ?");

        if (confirmacion) {
            fetch(`${base_url}${parte_de_la_url_pedido_eliminar}${cliente_id}`+'/', {
                method: 'DELETE'
            })
                .then((response) => {
                    if (response.status === 204) {
                        fetch_data(`${base_url}${parte_de_la_url}${vendedor_id}${parte2_de_la_url}`);
                        window.location.reload();
                    }
                });
        }
    }

    console.log("ListaClientes: ",ListaClientes)

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
                                    <th>Nombre</th>
                                    <th>Correo</th>
                                    <th>Teléfono</th>
                                    <th>Acción</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        ListaClientes.map((item,index)=>{
                                            return <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>
                                                    {item.user.first_name}
                                                </td>
                                                <td>{item.user.email}</td>
                                                <td>{item.pedidos.cliente.telefono}</td>
                                                <td>
                                                    <Link to={`/vendedor/cliente/${item.pedidos.cliente.id}/productos-del-pedido`} className={"btn btn-primary btn-sm "}>Pedidos</Link>
                                                    <button className={"btn btn-danger btn-sm ms-3"} onClick={()=>mostrarConfirmacionParaEliminar(item.pedidos.cliente.id)}>Eliminar de la lista</button>

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
export default Clientes_del_vendedor;

import Barra_lateral from "./barra_lateral";
import {useEffect, useState} from "react";
import Pedidos_fila from "./pedidos_fila";
function Pedidos (){

    const base_url = 'http://127.0.0.1:8000/api';
    const parte_de_la_url = '/cliente/';
    const parte2_de_la_url='/productos-pedidos/';
    const [Productos_del_pedido,setProductos_del_pedido] = useState([]);
    const cliente_id = localStorage.getItem('cliente_id');

    console.log("cliente_id: ",cliente_id)

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
                setProductos_del_pedido(data.results);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

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
                                    <th>Estado</th>
                                    <th>Acción</th>
                                </tr>
                                </thead>
                                <tbody className={"text-center"}>
                                {
                                    Productos_del_pedido.map((item,index)=>{
                                        return <Pedidos_fila item={item} key={index} index={index}/>
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
export default Pedidos;

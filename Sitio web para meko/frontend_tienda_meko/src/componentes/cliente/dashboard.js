import {Link} from 'react-router-dom';
import Barra_lateral from "./barra_lateral";
import {useEffect, useState} from "react";
function Dashboard (){
    const cliente_id=localStorage.getItem('cliente_id');
    const [url, setUrl] = useState('http://127.0.0.1:8000/api');
    const parte_de_la_url = '/cliente/dashboard/'+parseInt(cliente_id)+'/';
    const [TotalData,setTotalData] = useState({
        'total_direcciones':0,
        'total_productos_lista_deseos':0,
        'total_pedidos':0
    });

console.log("url: ",`${url}${parte_de_la_url}`)
    useEffect(() => {
        fetch_data(`${url}${parte_de_la_url}`);

    }, []);
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

                setTotalData({
                    'total_direcciones':data.total_direcciones,
                    'total_productos_lista_deseos':data.total_productos_lista_deseos,
                    'total_pedidos':data.total_pedidos
                });
             })
            .catch((error,data) => {
                console.error("Error fetching data:", error.response);
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
                        <div className={"col-md-4 mb-2"}>
                            <div className={"card"}>
                                <div className={"card-body text-center"}>
                                    <h4>Total de pedidos</h4>
                                    <h4><Link to={'/cliente/pedidos'}>{TotalData.total_pedidos}</Link></h4>
                                </div>
                            </div>
                        </div>


                    <div className={"col-md-4 mb-2"}>
                            <div className={"card"}>
                                <div className={"card-body text-center"}>
                                    <h4>Total de direcciones</h4>
                                    <h4><Link to={'/cliente/direcciones'}>{TotalData.total_direcciones}</Link></h4>
                                </div>
                            </div>
                        </div>

                        <div className={"col-md-4 mb-2"}>
                            <div className={"card"}>
                                <div className={"card-body text-center"}>
                                    <h4>Total de productos en la lista de deseos</h4>
                                    <h4><Link to={'/cliente/lista_de_deseos'}>{TotalData.total_productos_lista_deseos}</Link></h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;

import {Link} from 'react-router-dom';
import Barra_lateral_como_vendedor from "./barra_lateral_como_vendedor";
import {useEffect, useState} from "react";
function Dashboard_como_vendedor (){
    const vendedor_id=localStorage.getItem('vendedor_id');
    const [url, setUrl] = useState('http://127.0.0.1:8000/api');
    const parte_de_la_url = '/productos/';
    const [Productos,setProductos] = useState([]);
  /*  const parte_de_la_url = '/vendedor/'+parseInt(vendedor_id)+'/dashboard/';
    const [TotalData,setTotalData] = useState({
      //  'total_clientes':0,
        'total_productos':0,
      //  'total_pedidos':0
    });*/

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
                setProductos(data.results);
             /*   setTotalData({
                 //   'total_clientes':data.total_clientes,
                    'total_productos':data.total_productos,
                 //   'total_pedidos':data.total_pedidos
                });*/
            })
            .catch((error,data) => {
                console.error("Error fetching data:", error.response);
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

                        <div className={"col-md-4 mb-2"}>
                            <div className={"card"}>
                                <div className={"card-body text-center"}>
                                    <h4>Total de productos</h4>
                                    <h4><Link to={'/vendedor/productos'}>{Productos.length}</Link></h4>
                                </div>
                            </div>
                        </div>

                        {/* <div className={"col-md-4 mb-2"}>
                            <div className={"card"}>
                                <div className={"card-body text-center"}>
                                    <h4>Total de pedidos</h4>
                                    <h4><Link to={'/vendedor/pedidos-vendedor'}>{TotalData.total_pedidos}</Link></h4>
                                </div>
                            </div>
                        </div>


                    <div className={"col-md-4 mb-2"}>
                            <div className={"card"}>
                                <div className={"card-body text-center"}>
                                    <h4>Total de clientes</h4>
                                    <h4><Link to={'/vendedor/clientes-vendedor'}>{TotalData.total_clientes}</Link></h4>
                                </div>
                            </div>
                        </div>
                        */}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Dashboard_como_vendedor;

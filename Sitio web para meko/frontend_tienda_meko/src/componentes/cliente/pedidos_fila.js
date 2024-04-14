import {Link} from 'react-router-dom';
import {useState} from "react";
import axios from "axios";

function Pedidos_fila(props) {
    const base_url = 'http://127.0.0.1:8000/api';
    const index = props.index;
    const item = props.item;
    console.log("item: ",item)
    const [Total_descargas,setTotal_descargas] = useState(item.productos.descargas);
    const parte1_de_la_url2='/actualizar-total-descargas-producto/';
    const contarDescargas = (producto_id) => {
        const formData=new FormData();
        formData.append('producto_id', producto_id);


        axios.post(base_url+parte1_de_la_url2+producto_id,formData)
            .then(function (response){
                console.log("response.data: ",response.data)
               if (response.data.bool===true){
                   setTotal_descargas(++item.productos.descargas);
                    window.open(
                        item.productos.archivo_del_producto,
                        '_blank'
                    )
               }
            })
            .catch(function (error){
                console.log(error);
            });
    }

    return (
        <tr>
            <td>{index + 1}</td>
            <td>
                <Link to={`/producto/${item.productos.slug}/${item.productos.id}`}><img src={item.productos.imagen}
                                                                                        className={"img-thumbnail"}
                                                                                        width={"80"} alt={item.productos.titulo}></img></Link>
                <p><Link to={`/producto/${item.productos.slug}/${item.productos.id}`}>{item.productos.titulo}</Link></p>
            </td>
            <td>$ {item.productos.precio}</td>
            <td>
              <span className={"text-success"}>
                {
                  item.pedidos.estado === true && <><i className={"fa fa-check-circle"}> </i><h4  className={"text-dark"}>Completado</h4></>
                }
                </span>
                <span className={"text-dark"}>
                {
                  item.pedidos.estado === false &&
                    <><i className={"fa fa-spinner fa-spin text-dark"}></i> <h4>Pendiente</h4></>
                }
              </span>
            </td>
            <td>
                {
                    item.pedidos.estado === true &&
                    <>
                        <button className={"btn btn-primary btn-sm mx-2"}
                                onClick={() => contarDescargas(item.productos.id)}>
                            Descargar <span className={"badge text-dark bg-white"}>{Total_descargas}</span></button>

                        <Link to={`/cliente/agregar-calificacion/${item.productos.id}`}><button className={"btn btn-primary btn-sm"}>
                            Agregar calificación</button>
                        </Link>
                    </>
                }
            </td>
        </tr>
    );
}

export default Pedidos_fila;

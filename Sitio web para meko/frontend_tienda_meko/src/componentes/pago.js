import {Link} from 'react-router-dom';

import { CarritoContext, TipoMonedaContext } from "../context";
import {useContext, useState} from "react";
function Pago(props){
  let carrito_items=0;
  const { Datos_carrito, setDatos_carrito } = useContext(CarritoContext);
  const [CarritoButtonStatus,setCarritoButtonStatus] = useState(false);
  const [ProductoData,setProductoData] = useState([]);
  const { TipoMoneda } = useContext(TipoMonedaContext);

    if(Datos_carrito ===null || Datos_carrito===[]){
         carrito_items = 0;
    }
    else{
        carrito_items = Datos_carrito.length;
    }

    let suma=0;

    Datos_carrito.map((item,index)=>{
        if(TipoMoneda!=='usd'){
             suma+=parseFloat(item.producto.precio);
        }
        else {
            console.log("emtra: ",item.producto.precioUSD)
            suma+=parseFloat(item.producto.precioUSD);
        }

    });

    const quitar_del_carrito_handler = (id_producto) => {
        let carrito_anterior = localStorage.getItem('datos_carrito');
        let carrito_json = JSON.parse(carrito_anterior) || [];

        // Filtrar el array para excluir el producto que coincida con ProductoData.id
        carrito_json = carrito_json.filter(
            (producto) => producto.producto.id !== id_producto
        );

        let carritoString = JSON.stringify(carrito_json);
        localStorage.setItem('datos_carrito', carritoString);
        setCarritoButtonStatus(false);
        setDatos_carrito(carrito_json);

    }

    return (
        <div className={"container mt-4"}>
            {/*     <h3>Todos los productos del carrito ({Datos_carrito.length})</h3>*/}
            <h3>Todos los productos del carrito ({carrito_items})</h3>
            {carrito_items!=0 &&
                <div className={"row"}>
                    <div className={"col-md-8 col-12"}>
                        <div className={"table-responsive"}>
                            <table className={"table table-bordered"}>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Producto</th>
                                    <th>Precio</th>
                                    <th>Acciones</th>
                                </tr>
                                </thead>
                                <tbody>
                                  {
                                    Datos_carrito.map((item, index)=>{
                                     return  (
                                         <tr key={index}>
                                             <td>{index+1}</td>
                                             <td>
                                                 <Link><img src={item.producto.imagen} className={"img-thumbnail"} width={"100"} alt={item.producto.titulo}></img></Link>
                                                 <p> <Link>{item.producto.titulo}</Link></p>
                                             </td>

                                             <td>
                                                 {
                                                     TipoMoneda !== 'usd' &&
                                                     <h5 className="card-title"><span>{item.producto.precio} Cup</span></h5>
                                                 }

                                                 {
                                                     TipoMoneda === 'usd' &&
                                                     <h5 className="card-title"><span>$ {item.producto.precioUSD}</span></h5>
                                                 }
                                             </td>


                                             <td>
                                                 <button type={"button"} onClick={()=>quitar_del_carrito_handler(item.producto.id)} className='btn btn-warning'><i className="fa-solid fa-cart-plus fa-2x"></i> Quitar del carrito</button>
                                             </td>
                                         </tr>
                                     )
                                    })
                                }
                                </tbody>
                                <tfoot>
                                <tr>
                                    <th></th>
                                    <th>Total</th>
                                    <th>
                                    {
                                        TipoMoneda !== 'usd' &&
                                        <h5 className="card-title"><span>{suma} Cup</span></h5>
                                    }

                                    {
                                        TipoMoneda === 'usd' &&
                                        <h5 className="card-title"><span>$ {suma}</span></h5>
                                    }
                                    </th>

                                </tr>
                                <tr>
                                    <td colSpan='3' align={"center"}>
                                        <Link to={"/categorias"} className={"btn btn-secondary"}>Continuar comprando</Link>
                                        <Link to={"/confirmar-pedido"} className={"btn btn-success ms-1"}>Pagar ahora</Link>
                                    </td>

                                </tr>
                                </tfoot>
                            </table>
                          </div>
                        </div>
                </div>
            }

            {carrito_items==0 &&


                <Link to={"/categorias"} className={"btn btn-secondary"}>Inicio</Link>

            }
        </div>
    );
}
export default Pago;

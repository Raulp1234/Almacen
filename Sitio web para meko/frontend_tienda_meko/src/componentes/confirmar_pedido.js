import {UserContext, CarritoContext, TipoMonedaContext} from "../context";
import {useContext, useState} from "react";
import axios from "axios";
function Confirmar_pedido(){
   // const base_url = useState('http://127.0.0.1:8000/api');
    const base_url = 'http://127.0.0.1:8000/api';
    const parte_1_de_la_url = '/pedidos/';
    const parte_2_de_la_url = '/productos-pedidos/';
    const parte_3_de_la_url='/actualizar-estado-pedido/';
    const urlCompleta_1 = `${base_url}${parte_1_de_la_url}`;
    const urlCompleta_2 = `${base_url}${parte_2_de_la_url}`;
    const urlCompleta_3 = `${base_url}${parte_3_de_la_url}`;
    const [pedidoConfirmado, setPedidoConfirmado] = useState(false);
    const [PedidoID, setPedidoID] = useState('');
    const [MetodoDePago, setMetodoDePago] = useState('');
    const [EstadoPedido, setEstadoPedido] = useState(false);
    const { TipoMoneda } = useContext(TipoMonedaContext);

  //  const url=base_url;
    const userContext = useContext(UserContext);
    const { Datos_carrito, setDatos_carrito } = useContext(CarritoContext);

    if(userContext == null ){
         window.location.href="/iniciar-sesion"
    }
    else{
        if (!pedidoConfirmado) {
            agregar_pedido_en_la_tabla();
            setPedidoConfirmado(true);
        }
    }

    async function agregar_pedido_en_la_tabla() {
            try {
                const cliente_id = localStorage.getItem('cliente_id');

                let total_a_pagar=0;
                let total_a_pagar_usd=0;
                let carrito_anterior = localStorage.getItem('datos_carrito');
                let carrito_json = JSON.parse(carrito_anterior) || [];

                if (carrito_json !== null) {
                    for (const carrito of carrito_json) {
                          total_a_pagar+=parseFloat(carrito.producto.precio);
                          total_a_pagar_usd+=parseFloat(carrito.producto.precioUSD);
                    }
                }

                const formData = new FormData();
                formData.append('cliente', cliente_id);
                formData.append('total_a_pagar', total_a_pagar);
                formData.append('total_a_pagar_usd', total_a_pagar_usd);

                console.log("cliente_id: ",cliente_id)
                const response = await axios.post(urlCompleta_1, formData);
                const pedido_id = response.data.id;

                console.log("pedido_id: ",pedido_id)
                setPedidoID(pedido_id);
                await productos_del_pedido_function(pedido_id);

            } catch (error) {
                console.error(error);
            }
    }

    async function productos_del_pedido_function(pedido_id) {
        let carrito_anterior = localStorage.getItem('datos_carrito');
        let carrito_json = JSON.parse(carrito_anterior) || [];

        if (carrito_json !== null) {
            for (const carrito of carrito_json) {
                console.log('Entrando en el bucle');
                try {
                    const formData = new FormData();
                    formData.append('pedidos', pedido_id);
                    formData.append('productos', carrito.producto.id);
                    formData.append('cantidad', 1);
                    formData.append('precio', carrito.producto.precio);
                    formData.append('precioUSD', carrito.producto.precioUSD);

                    console.log("pedidos: ",pedido_id)
                    console.log("productos: ", carrito.producto.id)
                    console.log("cantidad: ",1)
                    console.log("precio: ",carrito.producto.precio)

                    try {
                      const response = await axios.post(urlCompleta_2, formData);
                      console.log("response: ",response)
                    } catch (error) {
                        console.error('Error en axios.post:', error);
                    }
                    // Eliminar el producto del carrito después de agregarlo al pedido
                    carrito_json = carrito_json.filter(item => item.producto.id !== carrito.producto.id);
                    let carritoString = JSON.stringify(carrito_json);
                    localStorage.setItem('datos_carrito', carritoString);
                    setDatos_carrito(carrito_json);
                } catch (error) {
                    console.error(error);
                }
            }
        }
    }

    function cambiarMetodoDePago(metodo) {
        setMetodoDePago(metodo);
    }
    
    function botonPagarAhora() {
        if(MetodoDePago!==''){
          cambiarMetodoDePago(MetodoDePago);
            actualizarEstadoDelPedido(true)
        }
        else{
            alert('Debe seleccionar un método de pago antes de continuar!!!')
        }
    }

    function actualizarEstadoDelPedido(estado_del_pedido) {
        axios.post(urlCompleta_3+PedidoID)
            .then(function (response){
              //  window.location.href='/cliente/pedidos';
                window.location.href='/pedido/completado';

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className={"container"}>
            <div className={"row mt-5"}>
                <div className={"col-6 offset-3"}>
                    <div className={"card py-3 text-center"}>
                        <h3><i className={"fa fa-check-circle text-success"}></i> Su pedido ha sido confirmado</h3>
                        <h5>ID del pedido {PedidoID}</h5>
                    </div>

                    <div className={"card p-3 mt-4"}>
                         <form>
                             <div className={"form-group"}>
                                <label>
                                    <input type={"radio"} name={"metodo_de_pago"} onChange={()=> cambiarMetodoDePago('paypal')}/> PayPal
                                </label>
                             </div>

                             <div className={"form-group"}>
                                 <label>
                                     <input type={"radio"} name={"metodo_de_pago"} onChange={()=> cambiarMetodoDePago('stripe')}/> Stripe
                                 </label>
                             </div>

                             <div className={"form-group"}>
                                 <label>
                                     <input type={"radio"} name={"metodo_de_pago"} onChange={()=> cambiarMetodoDePago('tarjeta_nacional_MN')}/> Tarjeta nacional (MN)
                                 </label>
                             </div>

                             <div className={"form-group"}>
                                 <label>
                                     <input type={"radio"} name={"metodo_de_pago"} onChange={()=> cambiarMetodoDePago('efectivo')}/> Pagar en efectivo
                                 </label>
                             </div>

                             <button type={"button"} className={"btn btn-sm btn-success mt-3"} onClick={botonPagarAhora}>Continuar</button>
                         </form>

                    </div>
                </div>
            </div>
        </div>
    );


}
export default Confirmar_pedido;
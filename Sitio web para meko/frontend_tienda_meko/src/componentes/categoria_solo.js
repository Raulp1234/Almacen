import {TipoMonedaContext, UserContext} from "../context";
import {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";


function Categoria_solo(props){

    const categoria_id =props.categoria_x.id;
//    const { TipoMoneda } = useContext(TipoMonedaContext);
//    const userContext = useContext(UserContext);
 //   const [Producto_en_lista_deseos,setProducto_en_lista_deseos] = useState(false);
    const [url, setUrl] = useState('http://127.0.0.1:8000/api');
    const [CategoriaData,setCategoriaData] = useState([]);
    const [Productos,setProductos] = useState([]);
    const parte_de_la_url = "/productos/";
    const parte_de_la_url_categorias = "/categorias/";


    /*const agregar_a_la_lista_de_deseos_handler = () => {
        const cliente_id=localStorage.getItem('cliente_id');
        const formData = new FormData();
        const parte_url_lista_deseos="/lista-de-deseos/";

        const urlCompleta=url+parte_url_lista_deseos;

        formData.append('clientes', parseInt(cliente_id));
        formData.append('productos', CategoriaData.id);

        axios.post(urlCompleta,formData)
            .then(function (response) {
                console.log(response);
                revisar_si_el_producto_esta_en_la_lista_de_deseos(producto_id);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function revisar_si_el_producto_esta_en_la_lista_de_deseos(producto_id){
        const cliente_id=localStorage.getItem('cliente_id');
        const formData = new FormData();
        const parte_url_lista_deseos="/revisar-lista-de-deseos/";

        const urlCompleta=url+parte_url_lista_deseos;

        formData.append('clientes', parseInt(cliente_id));
        formData.append('productos',producto_id);

        axios.post(urlCompleta,formData)
            .then(function (response) {
                if (response.data.bool === true){
                    setProducto_en_lista_deseos(true);
                }
                else {
                    setProducto_en_lista_deseos(false);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }*/


    useEffect(() => {
        fetch_data(`${url}${parte_de_la_url}`);
        fetch_data_categoria(`${url}${parte_de_la_url_categorias}`);

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
                setProductos(data.results);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    function fetch_data_categoria(url) {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setCategoriaData(data.results);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    function contarProductosPorCategoria(productos, categoriaId) {
        let cantidad = 0;

        // Recorrer todos los productos
        for (let i = 0; i < productos.length; i++) {
            const producto = productos[i];
            console.log("producto: ",producto)
            // Verificar si el producto pertenece a la categoría deseada
            if (producto.categoria.id === categoriaId) {
                cantidad++;
            }
        }
    console.log("cantidad: ",cantidad)
        return cantidad;
    }

    // Verifica que props.producto_x esté definido antes de acceder a sus propiedades
    if (!props.categoria_x) {
        return null; // O cualquier otro componente de carga o mensaje de error que desees mostrar
    }

    return (
            <div className="col-12 col-md-3 mb-4 ">
                <div className="card shadow" >
                    <div className="card-body">
                           <Link to={`/categoria/${props.categoria_x.titulo}/${props.categoria_x.id}`}>  <h4 className="card-title">{props.categoria_x.titulo}</h4></Link>

                        {
                            <h5 className="card-title text-muted">Cantidad de productos: <span>{contarProductosPorCategoria(Productos, props.categoria_x.id)}</span></h5>
                        }


                        {/* <h5 className="card-title text-muted">Precio: <span className={"text-muted"}>$ {props.producto_x.precio}</span></h5>*/}
                    </div>
                    {/*  <div className="card-footer">
                        <button className='btn btn-success btn-sm' title={"Agregar al carrito"}><i className="fa-solid fa-cart-plus fa-2x"></i></button>
                        {
                            userContext.login===null &&
                            <button type={"button"} className='btn btn-danger ms-1' disabled={true} onClick={agregar_a_la_lista_de_deseos_handler} ><i className="fa-solid fa-heart fa-2x"></i></button>
                        }

                        {
                            (userContext.login==='true' && !Producto_en_lista_deseos) &&
                            <button type={"button"} className='btn btn-danger btn-sm ms-1' onClick={agregar_a_la_lista_de_deseos_handler}><i className="fa-solid fa-heart fa-2x"></i></button>
                        }
                        {
                            (userContext.login==='true' && Producto_en_lista_deseos) &&
                            <button type={"button"} disabled={true} className='btn btn-danger ms-1' onClick={agregar_a_la_lista_de_deseos_handler}><i className="fa-solid fa-heart fa-2x"></i></button>
                        }
                        </div>*/}
                </div>
            </div>
    );
}
export default Categoria_solo;
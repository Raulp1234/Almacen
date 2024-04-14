import {Link, useParams} from 'react-router-dom';
import {useContext, useEffect, useState} from "react";
import {CarritoContext, TipoMonedaContext, UserContext} from "../context";
import Producto_solo_relacionado from "./producto_solo_relacionado";
import axios from "axios";
function Producto_detalle(){
    const [url, setUrl] = useState('http://127.0.0.1:8000/api');
    const {producto_slug,producto_id} = useParams();
    const parte_de_la_url = `/producto/${producto_id}/`;
    const parte_de_la_url_relacionado = `/productos-relacionados/${producto_id}/`;
  //  const parte_de_la_url = '/producto/'+producto_id;
    const [ProductoData,setProductoData] = useState([]);
    const [ProductoImagen,setProductoImagen] = useState([]);
    const [ProductoEtiquetas,setProductoEtiquetas] = useState([]);
    const [ProductoRelacionado,setProductoRelacionado] = useState([]);
    const [NextPage, setNextPage] = useState(null);
    const [CarritoButtonStatus,setCarritoButtonStatus] = useState(false);
    const { Datos_carrito, setDatos_carrito } = useContext(CarritoContext);

    const userContext = useContext(UserContext);
    const { TipoMoneda } = useContext(TipoMonedaContext);

    const [Producto_en_lista_deseos,setProducto_en_lista_deseos] = useState(false);


    useEffect(() => {
        fetch_data(`${url}${parte_de_la_url}`);
        fetch_data_relacionado(`${url}${parte_de_la_url_relacionado}`);
        revisar_si_el_producto_esta_en_el_carrito(producto_id);
        revisar_si_el_producto_esta_en_la_lista_de_deseos(producto_id);
    }, [producto_id, Datos_carrito]);
    function fetch_data(url) {
        fetch(url)

            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setProductoData(data); // Utiliza setProductoData para actualizar el estado
                setProductoImagen(data.imagen_producto);
                setProductoEtiquetas(data.tag_list);

            })
            .catch((error,data) => {
                console.error("Error fetching data:", error);
            });
    }

    function fetch_data_relacionado(url) {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                // Utilizamos un conjunto (Set) para evitar duplicados
                const productosUnicos = new Set([...ProductoRelacionado, ...data.results]);
                setProductoRelacionado(Array.from(productosUnicos));
                setNextPage(data.next);

            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    const links_de_etiquetas=[]
    for(let i=0;i<ProductoEtiquetas.length;i++){
        let etiqueta=ProductoEtiquetas[i].trim();
        links_de_etiquetas.push(<Link  key={i} className={"badge bg-secondary text-white me-1"} to={`/productos/${etiqueta}`}>{etiqueta}</Link>)
    }

    function revisar_si_el_producto_esta_en_el_carrito(id_producto){
        let carrito_anterior = localStorage.getItem('datos_carrito');
        let carrito_json = JSON.parse(carrito_anterior) || [];

        const estaEnCarrito = carrito_json.some((carrito) => carrito != null && carrito.producto.id === id_producto);

        // Solo actualiza el estado si es necesario
        if (CarritoButtonStatus !== estaEnCarrito) {
            setCarritoButtonStatus(estaEnCarrito);
        }
        return estaEnCarrito;
    }

    const agregar_al_carrito_handler = () => {
        let carrito_anterior = localStorage.getItem('datos_carrito');
        let carrito_json = JSON.parse(carrito_anterior) || [];

        console.log("ProductoData: ",ProductoData)
        const nuevoProducto = {
            producto: {
                id: ProductoData.id,
                titulo: ProductoData.titulo,
                precio: ProductoData.precio,
                precioUSD: ProductoData.precioUSD,
                imagen: ProductoData.imagen
                ,
            },
            user: {
                id: 1,

            },
            total_a_pagar:0
        };

        carrito_json.push(nuevoProducto);

        let carritoString = JSON.stringify(carrito_json);
        localStorage.setItem('datos_carrito', carritoString);
        // Actualiza el contexto con el nuevo carrito
        setDatos_carrito(carrito_json);
        setCarritoButtonStatus(true);
    }

    const quitar_del_carrito_handler = () => {
        let carrito_anterior = localStorage.getItem('datos_carrito');
        let carrito_json = JSON.parse(carrito_anterior) || [];

        // Filtrar el array para excluir el producto que coincida con ProductoData.id
        carrito_json = carrito_json.filter(
            (producto) => producto.producto.id !== ProductoData.id
        );

        let carritoString = JSON.stringify(carrito_json);
        localStorage.setItem('datos_carrito', carritoString);
        setCarritoButtonStatus(false);
        setDatos_carrito(carrito_json);

    }

    // lista de deseos

    const agregar_a_la_lista_de_deseos_handler = () => {
        const cliente_id=localStorage.getItem('cliente_id');
        const formData = new FormData();
        const parte_url_lista_deseos="/lista-de-deseos/";

        const urlCompleta=url+parte_url_lista_deseos;

        formData.append('clientes', parseInt(cliente_id));
        formData.append('productos', ProductoData.id);

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
    }

    return (
        <section className="container mt-4">
            <div className="row">
                <div className="col-4">
                    {ProductoImagen.length > 0 && (
                        <div
                            id="ProductFotoSlider"
                            className="carousel carousel-dark slide mt-4 carousel-fade"
                            data-bs-ride={"true"}
                        >
                            <div className="carousel-indicators">
                                {ProductoImagen.map((imagen, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        data-bs-target="#ProductFotoSlider"
                                        data-bs-slide-to={index}
                                        className={index === 0 ? "active" : ""}
                                        aria-current={index === 0 ? "true" : ""}
                                        aria-label={`Slide ${index + 1}`}
                                    ></button>
                                ))}
                            </div>

                            <div className="carousel-inner">
                                {ProductoImagen.map((imagen, index) => (
                                    <div
                                        key={index}
                                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                                    >
                                        <img
                                            src={imagen.imagen}
                                            className="d-block w-100"
                                            alt={`Slide ${index + 1}`}
                                        />
                                    </div>
                                ))}
                            </div>

                            {ProductoImagen.length > 1 && (
                                <>
                                    <button
                                        className="carousel-control-prev"
                                        type="button"
                                        data-bs-target="#ProductFotoSlider"
                                        data-bs-slide="prev"
                                    >
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button
                                        className="carousel-control-next"
                                        type="button"
                                        data-bs-target="#ProductFotoSlider"
                                        data-bs-slide="next"
                                    >
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>

                <div className="col-8 mt-3">
                        <h3>{ProductoData.titulo}</h3>
                        <p>{ProductoData.detalles}</p>

                        {
                            TipoMoneda !== 'usd' &&
                            <h5 className="card-title">Precio: <span>{ProductoData.precio} Cup</span></h5>
                        }

                        {
                            TipoMoneda === 'usd' &&
                            <h5 className="card-title">Precio: <span>$ {ProductoData.precioUSD}</span></h5>
                        }

                    {/* <p className="mt-3">
                            {!revisar_si_el_producto_esta_en_el_carrito(ProductoData.id) &&
                                <button type={"button"} onClick={agregar_al_carrito_handler} className='btn btn-primary'><i className="fa-solid fa-cart-plus fa-2x"></i> Agregar al carrito</button>
                            }
                            { revisar_si_el_producto_esta_en_el_carrito(ProductoData.id) &&
                                <button type={"button"} onClick={quitar_del_carrito_handler} className='btn btn-warning'><i className="fa-solid fa-cart-plus fa-2x"></i> Quitar del carrito</button>
                            }
                            <button className='btn btn-success ms-1'><i className="fa-solid fa-bag-shopping fa-2x"></i> Comprar ahora</button>

                            {
                                userContext.login===null &&
                                <button type={"button"} className='btn btn-danger ms-1' disabled={true} onClick={agregar_a_la_lista_de_deseos_handler} ><i className="fa-solid fa-heart fa-2x"></i> Agregar a lista de deseos</button>
                            }

                            {
                                (userContext.login==='true' && !Producto_en_lista_deseos) &&
                                <button type={"button"} className='btn btn-danger ms-1' onClick={agregar_a_la_lista_de_deseos_handler}><i className="fa-solid fa-heart fa-2x"></i> Agregar a lista de deseos</button>
                            }

                            {
                                (userContext.login==='true' && Producto_en_lista_deseos) &&
                                <button type={"button"} disabled={true} className='btn btn-danger ms-1' onClick={agregar_a_la_lista_de_deseos_handler}><i className="fa-solid fa-heart fa-2x"></i> Agregar a lista de deseos</button>
                            }


                        </p>*/}

                        <div className="producttags mt-5">
                            <h5>Etiquetas</h5>
                            <p className="mt-3">
                                {links_de_etiquetas}
                            </p>
                        </div>
                    </div>
            </div>


            {/* RELATED PRODUCT */}
            <h3 className="mt-5 mb-3 text-center">Productos relacionados</h3>
            {ProductoRelacionado.length > 0 ? (
                <div id="relatedProductSlider" className="carousel carousel-dark slide mt-4" data-bs-ride="true">
                    <div className="carousel-indicators">
                        {ProductoRelacionado.map((producto, index) => (
                            <button
                                key={index}
                                type="button"
                                data-bs-target="#relatedProductSlider"
                                data-bs-slide-to={index}
                                className={index === 0 ? 'active' : ''}
                                aria-current={index === 0 ? 'true' : ''}
                                aria-label={`Slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                    <div className="carousel-inner">
                        {ProductoRelacionado.map((producto, index) => (
                            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                <Producto_solo_relacionado producto_x={producto} />
                            </div>
                        ))}
                    </div>
                    {ProductoRelacionado.length > 0 && (
                        <>

                            <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target="#relatedProductSlider"
                                data-bs-slide="prev"
                            >
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target="#relatedProductSlider"
                                data-bs-slide="next"
                                onClick={() => setUrl(NextPage)}
                            >
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>


                        </>
                    )}
                </div>
            ) : (
                <p>No hay productos relacionados.</p>
            )}
            {/* FIN RELATED PRODUCT */}


        </section>
    );
}
export default Producto_detalle;
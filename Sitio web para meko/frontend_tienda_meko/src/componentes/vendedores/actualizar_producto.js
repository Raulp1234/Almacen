import {Link, useParams} from 'react-router-dom';
import Barra_lateral_como_vendedor from "./barra_lateral_como_vendedor";
import {useEffect, useState} from "react";
import axios from "axios";
import button from "bootstrap/js/src/button";
function Actualizar_producto (){
    const vendedor_id=localStorage.getItem('vendedor_id');
    const [url, setUrl] = useState('http://127.0.0.1:8000/api');
    const parte_de_la_url_categorias = '/categorias/';
    const parte_de_la_url_imagenes = '/producto-imagenes/?from_update=1';
    const {producto_id} = useParams();

    const parte_de_la_url_producto_especifico = '/producto/'+parseInt(producto_id)+'/';
    const parte_de_la_url_imagenes_especifico  = '/producto-imagenes/'+parseInt(producto_id);
    const parte_de_la_url_imagenes_especifico_eliminar  = '/producto-imagenes-eliminar/';

    const [Mensaje_error,setMensaje_error] = useState('');
    const [Mensaje_exitoso,setMensaje_exitoso] = useState('');
    const [CategoriaData, setCategoriaData] = useState([]);
    const [ProductoImagenes, setProductoImagenes]= useState([]);

    const [HayImagenPrincipalSeleccionada,setHayImagenPrincipalSeleccionada] = useState(false);
    const [HayImagenExtrasSeleccionada,setHayImagenExtrasSeleccionada] = useState(false);
    const [HayArchivoSeleccionado,setHayArchivoSeleccionado] = useState(false);
    const [UnidadMedidaData, setUnidadMedidaData] = useState([]);
    const parte_de_la_url_unidades_de_medida = '/todas_las_unidades_de_medida/';

    let cantidad_entradas=1;
    const [ProductoData, setProductoData] = useState({
        'categoria':'',
        'vendedor':'',
        'titulo':'',
        'detalles':'',
        'precio':'',
        'precioUSD':'',
        'slug':'',
        'etiquetas':'',
        'imagen':'',
        'cantidad': '',
        'unidad_medida': '',
      //  'archivo_del_producto':'',
     //   'descargas':'',
    });

    const inputHandler = (event) => {
        setProductoData({
            ...ProductoData,
            [event.target.name]:event.target.value
        })
    };

    const fileHandler = (event) => {
        setProductoData({
            ...ProductoData,
            [event.target.name]:event.target.files[0]
        })

        if(event.target.name === 'imagen'){
            setHayImagenPrincipalSeleccionada(true);
        }
        if (event.target.name === 'archivo_del_producto') {
            setHayArchivoSeleccionado(true);
        }

        console.log("AKI: ",ProductoData)
    };


    const multipleFileHandler = (event) => {
        let archivos = event.target.files;

        if (archivos.length > 0) {
            setHayImagenExtrasSeleccionada(true);
            for(let i=0;i<ProductoImagenes.length;i++){
                console.log("ProductoImagenes 2: ",ProductoImagenes)
                eliminarImagen(ProductoImagenes[i].id,true);
            }

            setProductoImagenes(Array.from(archivos));
        }
    };


    console.log("HayArchivoSeleccionado: ",HayArchivoSeleccionado)
    const submitHandler = (event) => {
          const formData=new FormData();
          console.log("parseInt(vendedor_id): ",parseInt(vendedor_id))

        if(CategoriaData.length ===1){
            ProductoData.categoria=CategoriaData[0].id;
            console.log("ProductoData.categoria: ",ProductoData.categoria)
        }
        if(UnidadMedidaData.length ===1){
            ProductoData.unidad_medida=UnidadMedidaData[0].id;
            console.log("ProductoData.categoria: ",ProductoData.unidad_medida)
        }

        ProductoData.slug = ProductoData.titulo.toLowerCase(); // Convertir a minúsculas
        ProductoData.slug = ProductoData.slug.split(" ").join("-"); // Reemplazar espacios por guiones

        formData.append('vendedor', parseInt(vendedor_id));
             formData.append('categoria', ProductoData.categoria);
             formData.append('titulo', ProductoData.titulo);
             formData.append('detalles', ProductoData.detalles);
             formData.append('precio', ProductoData.precio);
             formData.append('precioUSD', ProductoData.precioUSD);
             formData.append('slug', ProductoData.slug);
             formData.append('etiquetas', ProductoData.etiquetas);
             formData.append('cantidad', ProductoData.cantidad);

             if(HayImagenPrincipalSeleccionada){
             // Verificar si se ha seleccionado una nueva imagen
                 if (ProductoData.imagen instanceof File) {
                     formData.append('imagen', ProductoData.imagen);
                 }
             }

            if(HayArchivoSeleccionado){
              // Verificar si se ha seleccionado una nueva imagen
              if (ProductoData.archivo_del_producto instanceof File) {
                  formData.append('archivo_del_producto', ProductoData.archivo_del_producto);
              }
            }

             axios.patch(`${url}${parte_de_la_url_producto_especifico}`,formData,{
                 headers: {
                     'content-type': 'multipart/form-data'
                 }
             })
                 .then(async function (response) {
                     if (response.status === 200) {
                         setMensaje_error('');
                         setMensaje_exitoso("Producto actualizado con éxito");

                         if (HayImagenExtrasSeleccionada) {

                             for (let i = 0; i < ProductoImagenes.length; i++) {
                                 const formDataImagenes = new FormData();
                                 formDataImagenes.append('producto', response.data.id);
                                 formDataImagenes.append('imagen', ProductoImagenes[i]);

                                 axios.post(`${url}${parte_de_la_url_imagenes}`, formDataImagenes)
                                     .then(function (response) {
                                         console.log(response);
                                     })
                                     .catch(function (error) {
                                         console.error(error);
                                     });

                             }
                         }


                         setProductoData({
                             'categoria': '',
                             'vendedor': '',
                             'titulo': '',
                             'detalles': '',
                             'precio': '',
                             'precioUSD': '',
                             'slug': '',
                             'etiquetas': '',
                             'imagen': '',
                             'cantidad': '',
                             'unidad_medida': '',
                             //  'archivo_del_producto':'',
                             //   'descargas':'',
                         });


                     } else {
                         setMensaje_error('Hay error en los datos');
                         setMensaje_exitoso('');
                     }
                 })
                 .catch(function (error){
                     console.log(error.response.data);
                 });

     };

    useEffect(() => {
        fetch_data(`${url}${parte_de_la_url_categorias}`);
        fetch_data_productos(`${url}${parte_de_la_url_producto_especifico}`);
        fetch_data_Imagenes(`${url}${parte_de_la_url_imagenes_especifico}`);
        fetch_data_unidades_medida(`${url}${parte_de_la_url_unidades_de_medida}`);
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
                setCategoriaData(data.results); // Utiliza setProductoData para actualizar el estado
            })
            .catch((error,data) => {
                console.error("Error fetching data:", error);
            });
    }
    function fetch_data_unidades_medida(url) {
        fetch(url)

            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setUnidadMedidaData(data.results); // Utiliza setProductoData para actualizar el estado
            })
            .catch((error,data) => {
                console.error("Error fetching data:", error);
            });
    }
    function fetch_data_productos(url) {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setProductoData(data); // Utiliza setProductoData para actualizar el estado
            })
            .catch((error,data) => {
                console.error("Error fetching data:", error);
            });
    }
    function fetch_data_Imagenes(url) {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setProductoImagenes(data.results); // Utiliza setProductoData para actualizar el estado
            })
            .catch((error,data) => {
                console.error("Error fetching data:", error);
            });
    }



    function eliminarImagen(imagen_id,es_actualizar){
           axios.delete(`${url}${parte_de_la_url_imagenes_especifico_eliminar}${imagen_id}`)
            .then((response) => {
                if(response.status === 204){
                    if(es_actualizar === false){
                        window.location.reload();
                    }
                }
            })
            .catch((error,data) => {
                console.error("Error fetching data:", error);
            });
    }

    return (
        <div className={"container mt-4"}>
            <div className={"row"}>
                <div className={"col-md-3 col-12 mb-2"}>
                    <Barra_lateral_como_vendedor/>
                </div>
                    <div className={"col-md-9 col-12 mb-2"}>
                <div className={"card"}>
                    <h4 className={"card-header"}>Actualizar producto</h4>
                    <div className={"card-body"}>

                        {Mensaje_exitoso && <p className={"text-success"}>{Mensaje_exitoso}</p>}
                        {Mensaje_error && <p className={"text-danger"}>{Mensaje_error}</p>}
                        <form>
                            <div className="mb-3">
                                <label htmlFor="titulo" className="form-label">Nombre:</label>
                                <input type="text" className="form-control" id="titulo" name={"titulo"} onChange={inputHandler} value={ProductoData.titulo}
                                       placeholder="Escriba el nombre del producto"/>
                            </div>
                         {/*  <div className="mb-3">
                                <label htmlFor="slug" className="form-label">Slug:</label>
                                <input type="text" className="form-control" id="slug" name={"slug"} onChange={inputHandler} value={ProductoData.slug}
                                       placeholder="Escriba el slug del producto"/>
                            </div>*/}
                            <div className="mb-3">
                                <label htmlFor="precio" className="form-label">Precio MN:</label>
                                <input type="number" className="form-control" id="precio" name={"precio"} onChange={inputHandler} value={ProductoData.precio}
                                       placeholder="Escriba el precio en MN"/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="precioUSD" className="form-label">Precio USD:</label>
                                <input type="number" className="form-control" id="precioUSD" name={"precioUSD"} onChange={inputHandler} value={ProductoData.precioUSD}
                                       placeholder="Escriba el precio en USD"/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="cantidad" className="form-label">Cantidad:</label>
                                <input type="number" className="form-control" id="cantidad" name={"cantidad"} onChange={inputHandler} value={ProductoData.cantidad} min={1}
                                       placeholder="Escriba la cantidad"/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="detalles" className="form-label">Descripción:</label>
                                <textarea className="form-control " id="detalles" rows={"8"} name={"detalles"} onChange={inputHandler} value={ProductoData.detalles}
                                       placeholder="Escriba la descripción del producto"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="etiquetas" className="form-label">Etiquetas:</label>
                                <input type="text" className="form-control" id="etiquetas" name={"etiquetas"} onChange={inputHandler} value={ProductoData.etiquetas}
                                       placeholder="Escriba las etiquetas del producto"/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="categoria" className="form-label">Categoría:</label>
                                <select
                                    className="form-control"
                                    id="categoria"
                                    name="categoria"
                                    onChange={inputHandler}
                                    value={ProductoData.categoria.id}
                                >
                                    {CategoriaData.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.titulo}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/*<div className="mb-3">
                                <label htmlFor="archivo_del_producto" className="form-label">Archivo del producto:</label>
                                <input className="form-control" type="file" id="archivo_del_producto" name="archivo_del_producto" onChange={fileHandler}/>
                                {
                                    HayArchivoSeleccionado &&
                                    <Link to={ProductoData.archivo_del_producto}>{ProductoData.archivo_del_producto.name}</Link>
                                }
                                {
                                    !HayArchivoSeleccionado &&
                                    <Link to={ProductoData.archivo_del_producto}>{ProductoData.archivo_del_producto}</Link>
                                }

                            </div>*/}

                            <div className="mb-3">
                                <label htmlFor="unidadMedida" className="form-label">Unidad de medida:</label>
                                <select className="form-control" id="unidadMedida" name="unidadMedida" onChange={inputHandler}>
                                    {UnidadMedidaData.map((item, index) => <option key={index} value={item.id}>{item.titulo}</option>)}
                                </select>

                            </div>
                            <div className="mb-3">
                                <label htmlFor="foto" className="form-label">Foto principal:</label>
                                <input className="form-control" type="file" id="foto" name="imagen" onChange={fileHandler}/>
                                <p>
                                    {ProductoData.imagen && (
                                        <img
                                            src={typeof ProductoData.imagen === 'string' ? ProductoData.imagen : URL.createObjectURL(ProductoData.imagen)}
                                            width={"100"}
                                            className={"mt-2 rounded"}
                                            alt="Vista previa"
                                        />
                                    )}
                                </p>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="otrasFotos" className="form-label">Fotos extras:</label>
                                <input className="form-control mb-3" multiple={true} type="file" id="otrasFotos" name="imagenes" onChange={multipleFileHandler}/>

                                <div className="mt-2">
                                    {
                                        HayImagenExtrasSeleccionada &&
                                        ProductoImagenes.map((item, index) => (
                                           <span className={"image-box d-inline p-3 my-2 mt-2"}  key={index}>
                                               <i className={"fa fa-trash text-danger"} style={estilos.botonEliminar} onClick={()=>eliminarImagen(item.id,false)} role={"button"}></i>
                                               <img
                                               key={index}
                                               src={URL.createObjectURL(item)}
                                               // src={item}
                                               width={"100"}
                                               className={"mr-2 mb-2 rounded my-4 mt-4"}
                                               alt={`Vista previa ${index}`}
                                           />
                                           </span>
                                        ))
                                    }
                                    { !HayImagenExtrasSeleccionada && ProductoImagenes.length > 0 &&
                                        ProductoImagenes.map((item, index) => (

                                            <span className={"image-box d-inline p-3 my-2 mt-2"}  key={index}>
                                               <i className={"fa fa-trash text-danger"} style={estilos.botonEliminar} onClick={()=>eliminarImagen(item.id,false)} role={"button"}></i>

                                                    <img
                                                        key={index}
                                                        //src={URL.createObjectURL(item.imagen)}
                                                        src={item.imagen}
                                                        width={"100"}
                                                        className={"mr-2 mb-2 rounded my-4 mt-4"}
                                                        alt={`Vista previa ${index}`}
                                                    />
                                                 </span>
                                        ))
                                    }
                                </div>
                            </div>


                            <div className="mb-3">
                                <Link to={"/vendedor/productos"}><button type={"button"} className={"btn btn-primary"} onClick={submitHandler} >Actualizar</button></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            </div>
        </div>
    );
}

const estilos={
  'botonEliminar':{
      'position':'absolute',
  }
};

export default Actualizar_producto;

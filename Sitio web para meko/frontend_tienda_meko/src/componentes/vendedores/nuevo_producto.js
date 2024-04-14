import {Link} from 'react-router-dom';
import Barra_lateral_como_vendedor from "./barra_lateral_como_vendedor";
import {useEffect, useState} from "react";
import axios from "axios";
function Nuevo_producto (){
    const vendedor_id=localStorage.getItem('vendedor_id');
    const [url, setUrl] = useState('http://127.0.0.1:8000/api');
    const parte_de_la_url_categorias = '/categorias/';
    const parte_de_la_url_unidades_de_medida = '/todas_las_unidades_de_medida/';
    const parte_de_la_url_productos = '/productos/';
    const parte_de_la_url_imagenes = '/producto-imagenes/';
    const [Mensaje_error,setMensaje_error] = useState('');
    const [Mensaje_exitoso,setMensaje_exitoso] = useState('');
    const [CategoriaData, setCategoriaData] = useState([]);
    const [UnidadMedidaData, setUnidadMedidaData] = useState([]);
    const [ProductoImagenes, setProductoImagenes]= useState([]);
    const [seleccion, setSeleccion] = useState('');


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
        // 'archivo_del_producto': '',
        // 'descargas': '',
    });


    const inputHandler = (event) => {
        setProductoData({
            ...ProductoData,
            [event.target.name]:event.target.value
        })
    };

    const inputHandler_categoria_unidadMedida = (event) => {
        setSeleccion(event.target.value);
    };

    const inputHandler_slug = (event) => {
        let value = event.target.value.toLowerCase(); // Convertir a minúsculas
        value = value.replace(/\s+/g, "-"); // Reemplazar espacios por guiones
        setProductoData({
            ...ProductoData,
            [event.target.name]: value
        });
    };


    const fileHandler = (event) => {
        setProductoData({
            ...ProductoData,
            [event.target.name]:event.target.files[0]
        })
    };

   /* const multipleFileHandler = (event) => {
        let archivos=event.target.files;

        if(archivos.left > 0){
            setProductoImagenes(archivos)
        }
    };*/

    const multipleFileHandler = (event) => {
        let archivos = event.target.files;

        if (archivos.length > 0) {
            setProductoImagenes(Array.from(archivos));
        }
    };


    const submitHandler = (event) => {
          const formData=new FormData();
          console.log("parseInt(vendedor_id): ",parseInt(vendedor_id))

        if(CategoriaData.length ===1 || seleccion === ''){
            ProductoData.categoria=CategoriaData[0].id;
            console.log("ProductoData.categoria: ",ProductoData.categoria)
        }
        if(UnidadMedidaData.length ===1 || seleccion === ''){
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
             formData.append('unidad_medida', ProductoData.unidad_medida);


             // Verificar si se ha seleccionado una nueva imagen
             if (ProductoData.imagen instanceof File) {
                 formData.append('imagen', ProductoData.imagen);
             }
              // Verificar si se ha seleccionado una nueva imagen
          /*    if (ProductoData.archivo_del_producto instanceof File) {
                  formData.append('archivo_del_producto', ProductoData.archivo_del_producto);
              }*/

             axios.post(`${url}${parte_de_la_url_productos}`,formData,{
                 headers: {
                     'content-type': 'multipart/form-data'
                 }
             })
                 .then(function (response){
                     if(response.status ===201){
                         setMensaje_error('');
                         setMensaje_exitoso("Producto creado con éxito");

                         for(let i=0;i<ProductoImagenes.length;i++){
                             const formDataImagenes=new FormData();
                             formDataImagenes.append('producto', response.data.id);
                             formDataImagenes.append('imagen', ProductoImagenes[i]);

                             axios.post(`${url}${parte_de_la_url_imagenes}`,formDataImagenes)
                                 .then(function (response) {
                                     console.log(response);
                                 })
                                 .catch(function (error) {
                                     console.error(error);
                                 });

                         }
                         setProductoImagenes('');

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
                            // 'archivo_del_producto': '',
                            // 'descargas': '',
                         });


                     }
                     else{
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

    return (
        <div className={"container mt-4"}>
            <div className={"row"}>
                <div className={"col-md-3 col-12 mb-2"}>
                    <Barra_lateral_como_vendedor/>
                </div>


                    <div className={"col-md-9 col-12 mb-2"}>
                <div className={"card"}>
                    <h4 className={"card-header"}>Nuevo producto</h4>
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
                                <select className="form-control" id="categoria" name="categoria" onChange={inputHandler_categoria_unidadMedida} value={seleccion}>
                                    {CategoriaData.map((item, index) => <option key={index} value={item.id}>{item.titulo}</option>)}
                                </select>

                            </div>

                            <div className="mb-3">
                                <label htmlFor="unidadMedida" className="form-label">Unidad de medida:</label>
                                <select className="form-control" id="unidadMedida" name="unidadMedida" onChange={inputHandler_categoria_unidadMedida}  value={seleccion}>
                                    {UnidadMedidaData.map((item, index) => <option key={index} value={item.id}>{item.titulo}</option>)}
                                </select>

                            </div>

                            {/*    <div className="mb-3">
                                <label htmlFor="archivo_del_producto" className="form-label">Archivo del producto:</label>
                                <input className="form-control" type="file" id="archivo_del_producto" name="archivo_del_producto" onChange={fileHandler}/>
                            </div>*/}
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
                                <input className="form-control" multiple={true} type="file" id="otrasFotos" name="imagenes" onChange={multipleFileHandler}/>

                                <div className="mt-2">
                                    {ProductoImagenes.length > 0 &&
                                        ProductoImagenes.map((item, index) => (
                                            <img
                                                key={index}
                                                src={URL.createObjectURL(item)}
                                                width={"100"}
                                                className={"mr-2 mb-2 rounded"}
                                                alt={`Vista previa ${index}`}
                                            />
                                        ))
                                    }
                                </div>
                            </div>


                            <div className="mb-3">
                                <button type={"button"} className={"btn btn-primary"} onClick={submitHandler} >Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            </div>
        </div>
    );
}
export default Nuevo_producto;

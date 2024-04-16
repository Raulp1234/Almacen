import React, {useEffect, useState} from "react";
import axios from "axios";

function UpdateProductForm ({onCancel,productoId }){
  const vendedor_id=localStorage.getItem('vendedor_id');
  const [url, setUrl] = useState('http://127.0.0.1:8000/api');
  const parte_de_la_url_producto = '/productos/';
  const parte_de_la_url_parte_de_la_url_producto_especifico = '/producto/'+parseInt(productoId)+'/';;
  const parte_de_la_url_categorias = '/categorias/';
  const parte_de_la_url_unidades = '/todas_las_unidades_de_medida/';

  const [Mensaje_error,setMensaje_error] = useState('');
  const [Mensaje_exitoso,setMensaje_exitoso] = useState('');
  //const [CategoriaData, setCategoriaData] = useState([]);

    const [CategoriaData, setCategoriaData] = useState([]);
    const [UnidadMedidaData, setUnidadMedidaData] = useState([]);
    const [selectCategoria, setSelectCategoria] = useState('');
    const [selectUnidadMedida, setSelectUnidadMedida] = useState('');

    const [ProductoData, setProductoData] = useState({
        // Define los campos del formulario y su estado inicial
        'titulo':'',
        'detalles':'',

        'precio':'',
        'precioUSD':'',

        'cantidad':'',
        'categoria':'',

        'unidad_medida':'',
        'vendedor_id':'',

        'imagen':'',
        // galleryImages: [] // Campo para la galería de imágenes
    });


    /* const inputHandler = (event) => {
       setCategoriaData({
         ...CategoriaData,
         [event.target.name]:event.target.value
       })
     };*/

  const inputHandler = (event) => {
    setProductoData({
      ...ProductoData,
      [event.target.name]: event.target.value
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



  const submitHandler = (event) => {
    const formData=new FormData();
    console.log("parseInt(vendedor_id): ",parseInt(vendedor_id))

      if(CategoriaData.length ===1 || selectCategoria === ''){
          ProductoData.categoria=CategoriaData[0].id;
          console.log("ProductoData.categoria: ",ProductoData.categoria)
      }
      else{
          console.log("selectCategoria: ",selectCategoria)
          ProductoData.categoria=selectCategoria;
      }


      if(UnidadMedidaData.length ===1 || selectUnidadMedida === ''){
          ProductoData.unidad_medida=UnidadMedidaData[0].id;
          console.log("ProductoData.categoria: ",ProductoData.unidad_medida)
      }
      else{
          console.log("selectUnidadMedida: ",selectUnidadMedida)
          ProductoData.unidad_medida=selectUnidadMedida;
      }
      console.log("ProductoData.unidad_medida: ",ProductoData.unidad_medida)

      formData.append('vendedor', parseInt(vendedor_id));
      formData.append('titulo', ProductoData.titulo);
      formData.append('detalles', ProductoData.detalles);
      formData.append('precio', ProductoData.precio);
      formData.append('precioUSD', ProductoData.precioUSD);
      formData.append('cantidad', ProductoData.cantidad);
      formData.append('categoria', ProductoData.categoria);
      formData.append('unidad_medida', ProductoData.unidad_medida);

       /* formData.append('categoria', selectCategoria);
       formData.append('unidad_medida',selectUnidadMedida);*/


      // Verificar si se ha seleccionado una nueva imagen
      if (ProductoData.imagen instanceof File) {
          formData.append('imagen', ProductoData.imagen);
      }

      axios.patch(`${url}${parte_de_la_url_parte_de_la_url_producto_especifico}`,formData,{
          headers: {
              'content-type': 'multipart/form-data'
          }
      })
        .then(function (response){
          if(response.status ===201){
            setMensaje_error('');
            setMensaje_exitoso("Producto actualizado con éxito");


              setProductoData({
                  'categoria': '',
                  'vendedor': '',
                  'titulo': '',
                  'detalles': '',
                  'precio': '',
                  'precioUSD': '',
                  'imagen': '',
                  'cantidad': '',
                  'unidad_medida': '',

              });
              setSelectCategoria(''); // Reinicia el estado selectCategoria
              setSelectUnidadMedida(''); // Reinicia el estado selectUnidadMedida

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
    fetch_data_producto(`${url}${parte_de_la_url_parte_de_la_url_producto_especifico}`);
    fetch_data_unit(`${url}${parte_de_la_url_unidades}`);
    fetch_data_category(`${url}${parte_de_la_url_categorias}`);

      //setSelectUnidadMedida(ProductoData.unidad_medida.id);
    //  setSelectCategoria(ProductoData.categoria.id);

  }, [productoId]);

    function fetch_data_producto(url) {
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
  function fetch_data(url) {
    fetch(url)

        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setProductoData(data.results); // Utiliza setProductoData para actualizar el estado
        })
        .catch((error,data) => {
          console.error("Error fetching data:", error);
        });
  }

    const inputHandler_categoria = (event) => {
        setSelectCategoria(event.target.value); // Actualiza el estado selectCategoria
    };

    const inputHandler_unidadMedida = (event) => {
        setSelectUnidadMedida(event.target.value); // Actualiza el estado selectUnidadMedida
    };




    function fetch_data_category(url) {
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

    function fetch_data_unit(url) {
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
        <form  className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2 flex items-center justify-center">
                <h2 className="text-3xl font-bold mb-4">Actualizar Producto</h2>
            </div>
            <div>
                {/* Campos del formulario */}
                <div className="mb-4">
                    <label htmlFor="titulo" className="block text-gray-700 font-bold mb-2">Nombre</label>
                    <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        value={ProductoData.titulo}
                        onChange={inputHandler}
                        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 border-2"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="precio" className="block text-gray-700 font-bold mb-2">Precio MN</label>
                    <input
                        type="number"
                        id="precio"
                        name="precio"
                        value={ProductoData.precio}
                        onChange={inputHandler}
                        min="0"
                        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 border-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="precioUSD" className="block text-gray-700 font-bold mb-2">Precio USD</label>
                    <input
                        type="number"
                        id="precioUSD"
                        name="precioUSD"
                        value={ProductoData.precioUSD}
                        onChange={inputHandler}
                        min="0"
                        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 border-2"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="detalles" className="block text-gray-700 font-bold mb-2">Descripción</label>
                    <textarea
                        id="detalles"
                        name="detalles"
                        value={ProductoData.detalles}
                        onChange={inputHandler}
                        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 border-2"
                    />
                </div>
            </div>
            <div>
                {/* Campos restantes del formulario */}
                <div className="mb-4">
                    <label htmlFor="cantidad" className="block text-gray-700 font-bold mb-2">Cantidad</label>
                    <input
                        type="number"
                        id="cantidad"
                        name="cantidad"
                        value={ProductoData.cantidad}
                        onChange={inputHandler}
                        min="0"
                        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 border-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="categoria" className="block text-gray-700 font-bold mb-2">Categoría</label>
                    <select
                        id="categoria"
                        name="categoria"
                        value={selectCategoria}
                        onChange={inputHandler_categoria}
                        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 border-2"

                    >
                        {CategoriaData.map((category, index) => (
                            <option key={index} value={category.id} >
                                {category.titulo}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="unidad_medida" className="block text-gray-700 font-bold mb-2">Unidad de Medida</label>
                    <select
                        id="unidad_medida"
                        name="unidad_medida"
                        value={selectUnidadMedida}
                        onChange={inputHandler_unidadMedida}
                        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 border-2"
                    >
                        {/*<option value="">Selecciona una unidad de medida</option>*/}
                        {UnidadMedidaData.map((unit, index) => (
                            <option key={index} value={unit.id} >
                                {unit.titulo}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Campo para la imagen principal */}
                <div className="mb-4">
                    <label htmlFor="imagen" className="block text-gray-700 font-bold mb-2">Añadir imagen principal</label>
                    <input className="form-control" type="file" id="imagen" name="imagen" onChange={fileHandler}/>
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

                    {/* <input
            type="file"
            id="imagen"
            name="imagen"
            accept="image/*"
            onChange={inputHandler}
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />*/}
                </div>
                {/* Campo para la galería de imágenes */}
                {/*<div className="mb-4">
          <label htmlFor="galleryImages" className="block text-gray-700 font-bold mb-2">Añadir galería de imágenes</label>
          <input
            type="file"
            id="galleryImages"
            name="galleryImages"
            accept="image/*"
            multiple // Permite seleccionar múltiples archivos
            onChange={inputHandler}
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>*/}
            </div>
            {/* Botones de acción */}
            <div className="col-span-2 md:col-span-2 flex justify-center">
                <button type="button" onClick={onCancel} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">
                    Cancelar
                </button>
                <button onClick={submitHandler} type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Guardar
                </button>
            </div>
        </form>
    );
};

export default UpdateProductForm;

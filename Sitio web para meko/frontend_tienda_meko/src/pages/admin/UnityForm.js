import React, {useEffect, useState} from "react";
import axios from "axios";

function UnityForm ({onCancel }){
  const vendedor_id=localStorage.getItem('vendedor_id');
  const [url, setUrl] = useState('http://127.0.0.1:8000/api');
  const parte_de_la_url_unidades = '/todas_las_unidades_de_medida/';
  const parte_de_la_url_parte_de_la_url_unidad = '/todas_las_unidades_de_medida/';

  const [Mensaje_error,setMensaje_error] = useState('');
  const [Mensaje_exitoso,setMensaje_exitoso] = useState('');
  //const [CategoriaData, setCategoriaData] = useState([]);

  const [UnidadData, setUnidadData] = useState({

    'titulo':'',
    'detalles':'',

  });


  /* const inputHandler = (event) => {
     setCategoriaData({
       ...CategoriaData,
       [event.target.name]:event.target.value
     })
   };*/

  const inputHandler = (event) => {
    setUnidadData({
      ...UnidadData,
      [event.target.name]: event.target.value
    });
  };


  const fileHandler = (event) => {
    setUnidadData({
      ...UnidadData,
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

    console.log("UnidadData.titulo: ",UnidadData.titulo)
    console.log("UnidadData.detalles: ",UnidadData.detalles)

    formData.append('titulo', UnidadData.titulo);
    formData.append('detalles', UnidadData.detalles);



    axios.post(`${url}${parte_de_la_url_parte_de_la_url_unidad}`,formData,{
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(function (response){
          if(response.status ===201){
            setMensaje_error('');
            setMensaje_exitoso("Unidad creada con éxito");


            setUnidadData({
              'titulo': '',
              'detalles': '',

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
    fetch_data(`${url}${parte_de_la_url_unidades}`);

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
          setUnidadData(data.results); // Utiliza setProductoData para actualizar el estado
        })
        .catch((error,data) => {
          console.error("Error fetching data:", error);
        });
  }

  return (
      <form  className="gap-4">
        <div className="flex items-center justify-center">
          <h2 className="text-3xl font-bold mb-4">Insertar Unidad de medida</h2>
        </div>
        {/* Campos del formulario */}
        <div className="mb-4">
          <label htmlFor="titulo" className="block text-gray-700 font-bold mb-2">
            Nombre
          </label>
          <input
              type="text"
              id="titulo"
              name="titulo"
              value={UnidadData.titulo}
              onChange={inputHandler}
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 border-2"
          />
        </div>
        <div className="mb-4">
          <label
              htmlFor="detalles"
              className="block text-gray-700 font-bold mb-2"
          >
            Descripción
          </label>
          <textarea
              id="detalles"
              name="detalles"
              value={UnidadData.detalles}
              onChange={inputHandler}
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 border-2"
          />
        </div>
        {/* Botones de acción */}
        <div className="col-span-2 md:col-span-2 flex justify-center">
          <button
              type="button"
              onClick={onCancel}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Cancelar
          </button>
          <button onClick={submitHandler}
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Guardar
          </button>
        </div>
      </form>
  );
};

export default UnityForm;

import React, {useEffect, useState} from "react";
import axios from "axios";

/*const CategoryForm = ({ onSubmit, onCancel }) => {

  const [url, setUrl] = useState('http://127.0.0.1:8000/api');
  const parte_de_la_url_categorias = '/categorias/';
  const parte_de_la_url_parte_de_la_url_categoria = '/categorias/';

  const [Mensaje_error,setMensaje_error] = useState('');
  const [Mensaje_exitoso,setMensaje_exitoso] = useState('');


  const [formData, setFormData] = useState({
    // Define los campos del formulario y su estado inicial
    titulo: "",
    detalles: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    formData.append('titulo', formData.titulo);
    formData.append('detalles', formData.detalles);

    axios.post(`${url}${parte_de_la_url_parte_de_la_url_categoria}`,formData,{
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(function (response){
          if(response.status ===201){
            setMensaje_error('');
            setMensaje_exitoso("Categoría creada con éxito");

            setFormData({
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
    onSubmit(formData);
  };*/
function CategoryForm ({onCancel }){
  const vendedor_id=localStorage.getItem('vendedor_id');
  const [url, setUrl] = useState('http://127.0.0.1:8000/api');
  const parte_de_la_url_categorias = '/categorias/';
  const parte_de_la_url_parte_de_la_url_categoria = '/categorias/';

  const [Mensaje_error,setMensaje_error] = useState('');
  const [Mensaje_exitoso,setMensaje_exitoso] = useState('');
  //const [CategoriaData, setCategoriaData] = useState([]);

  const [CategoriaData, setCategoriaData] = useState({

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
    setCategoriaData({
      ...CategoriaData,
      [event.target.name]: event.target.value
    });
  };


  const fileHandler = (event) => {
    setCategoriaData({
      ...CategoriaData,
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

    console.log("CategoriaData.titulo: ",CategoriaData.titulo)
    console.log("CategoriaData.detalles: ",CategoriaData.detalles)

    formData.append('titulo', CategoriaData.titulo);
    formData.append('detalles', CategoriaData.detalles);



    axios.post(`${url}${parte_de_la_url_parte_de_la_url_categoria}`,formData,{
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(function (response){
          if(response.status ===201){
            setMensaje_error('');
            setMensaje_exitoso("Categoría creada con éxito");


            setCategoriaData({
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
    fetch_data(`${url}${parte_de_la_url_categorias}`);

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

  return (
    <form  className="gap-4">
      <div className="flex items-center justify-center">
        <h2 className="text-3xl font-bold mb-4">Insertar Categoría</h2>
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
          value={CategoriaData.titulo}
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
          value={CategoriaData.detalles}
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

export default CategoryForm;

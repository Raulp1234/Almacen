import {Link} from 'react-router-dom';
import Barra_lateral_como_vendedor from "./barra_lateral_como_vendedor";
import {useEffect, useState} from "react";
import axios from "axios";
function Nuevo_categoria (){
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


    const inputHandler = (event) => {
        setCategoriaData({
            ...CategoriaData,
            [event.target.name]:event.target.value
        })
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
        <div className={"container mt-4"}>
            <div className={"row"}>
                <div className={"col-md-3 col-12 mb-2"}>
                    <Barra_lateral_como_vendedor/>
                </div>


                    <div className={"col-md-9 col-12 mb-2"}>
                <div className={"card"}>
                    <h4 className={"card-header"}>Nueva categoría</h4>
                    <div className={"card-body"}>

                        {Mensaje_exitoso && <p className={"text-success"}>{Mensaje_exitoso}</p>}
                        {Mensaje_error && <p className={"text-danger"}>{Mensaje_error}</p>}
                        <form>
                            <div className="mb-3">
                                <label htmlFor="titulo" className="form-label">Nombre:</label>
                                <input type="text" className="form-control" id="titulo" name={"titulo"} onChange={inputHandler} value={CategoriaData.titulo}
                                       placeholder="Escriba el nombre de la categoría"/>
                            </div>


                            <div className="mb-3">
                                <label htmlFor="detalles" className="form-label">Descripción:</label>
                                <textarea className="form-control " id="detalles" rows={"8"} name={"detalles"} onChange={inputHandler} value={CategoriaData.detalles}
                                       placeholder="Escriba la descripción de la categoría"/>
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
export default Nuevo_categoria;

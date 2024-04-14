import Barra_lateral from "./barra_lateral";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
function Agregar_calificacion (){
    const {producto_id} = useParams();
    const [MensajeError, setMensajeError] = useState('');
    const [MensajeExito, setMensajeExito] = useState('');
    const [CalificacionData,setCalificacionData] = useState({
        'vistas':'',
        'calificacion':1,
    });

    const cliente_id=localStorage.getItem('cliente_id');
    const [url, setUrl] = useState('http://127.0.0.1:8000/api');
   // const parte_de_la_url = '/cliente/'+cliente_id+"/";
    const parte_de_la_url_calificacion = '/calificacion/';

  /*  useEffect(() => {
        fetch_data(`${url}${parte_de_la_url}`);

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
                console.log("data: ",data)
                setCalificacionData({
                    'comentario':'',
                    'calificacion':1,

                }); // Utiliza setProductoData para actualizar el estado
            })
            .catch((error,data) => {
                console.error("Error fetching data:", error);
            });
    }*/


    const inputHandler = (event) => {
        setCalificacionData({
            ...CalificacionData,
            [event.target.name]:event.target.value
        })
    };


    const submitHandler = (event) => {
        const formData=new FormData();
        formData.append('calificacion', CalificacionData.calificacion);
        formData.append('vistas', CalificacionData.vistas);
        formData.append('cliente', cliente_id);
        formData.append('producto', producto_id);

        axios.post(`${url}${parte_de_la_url_calificacion}`,formData)
            .then(function (response){
                if(response.status!==201){
                    setMensajeError("Error al enviar la calificación")
                    setMensajeExito('')
                }
                else{
                    setMensajeError('')
                    setMensajeExito("Calificación enviada con éxito")
                    setCalificacionData({
                        'vistas':'',
                        'calificacion':1,
                    })
                }
                console.log("response: ",response);
            })
            .catch(function (error){
                console.log(error.response.data);
            });
    };

    const activarBoton = (CalificacionData.calificacion!='') && (CalificacionData.vistas!='')


    return (
        <div className={"container mt-4"}>
            <div className={"row"}>
                <div className={"col-md-3 col-12 mb-2"}>
                    <Barra_lateral/>
                </div>

              <div className={"col-md-9 col-12 mb-2"}>
                <div className={"card"}>
                    <h4 className={"card-header"}>Calificación del producto</h4>
                    {
                        MensajeExito && <h4 className={"text-success mx-4 my-4"}> Calificación enviada con éxito</h4>
                    }
                    {
                        MensajeError && <h4 className={"text-danger  mx-4 my-4"}> Oops ha ocurrido un error al enviar la calificación</h4>
                    }
                    <div className={"card-body"}>
                        <form encType="multipart/form-data" method="post">
                        <div className="mb-3">
                            <label htmlFor="calificacion" className="form-label">Calificación:</label>
                            <select  className="form-control" id="calificacion" name="calificacion" value={CalificacionData.calificacion} onChange={inputHandler}>
                                <option value={"1"}>1</option>
                                <option value={"2"}>2</option>
                                <option value={"3"}>3</option>
                                <option value={"4"}>4</option>
                                <option value={"5"}>5</option>
                            </ select >
                        </div>
                        <div className="mb-3">
                            <label htmlFor="vistas" className="form-label">Comentario:</label>
                            <textarea type="text" className="form-control" id="vistas" name="vistas" value={CalificacionData.vistas} onChange={inputHandler}
                                   placeholder="Escriba su comentario"/>
                        </div>
                    </form>
                        <div className="mb-3">
                            <button type={"button"} className={"btn btn-primary"} disabled={!activarBoton}  onClick={submitHandler}>Enviar</button>
                        </div>
                    </div>
                </div>
            </div>

            </div>
        </div>
    );
}
export default Agregar_calificacion;

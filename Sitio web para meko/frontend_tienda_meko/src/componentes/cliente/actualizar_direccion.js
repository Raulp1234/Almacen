import Barra_lateral from "./barra_lateral";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

function Actualizar_direccion() {
    const cliente_id=localStorage.getItem('cliente_id');
    const {direccion_id} = useParams();
    const [ErrorMsg, setErrorMsg] = useState('');
    const [ExitoMsg, setExitoMsg] = useState('');
    const [url, setUrl] = useState('http://127.0.0.1:8000/api');
    const parte_de_la_url = '/direccion/'+parseInt(direccion_id)+'/';
    const url_completa = url+parte_de_la_url;

    const [DireccionData,setDireccionData] = useState({
        'direccion': '',
        'cliente': cliente_id
    });

console.log("url_completa: ",url_completa)
    useEffect(() => {
        fetch_data(`${url}${parte_de_la_url}`);
     //   fetch_data(url_completa);
    }, [direccion_id]);
    function fetch_data(url) {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setDireccionData({
                    'direccion':data.direccion,
                    'cliente': cliente_id
                }); // Utiliza setProductoData para actualizar el estado*/
            })
            .catch((error,data) => {
                console.error("Error fetching data:", error.response);
            });
    }

    const inputHandler = (event) => {
        setDireccionData({
            ...DireccionData,
            [event.target.name]:event.target.value
        })
    };

    const submitHandler = (event) => {
        const formData=new FormData();
        formData.append('cliente', parseInt(DireccionData.cliente));
        formData.append('direccion', DireccionData.direccion);

        axios.put(`${url}${parte_de_la_url}`,formData)
            .then(function (response){
                if (response.status!==200){
                    setErrorMsg('Datos no guardados');
                    setExitoMsg('');
                }
                else {
                    setErrorMsg('');
                    setExitoMsg('Datos guardados');

                    // Después de 3000 milisegundos (3 segundos), quita el mensaje de éxito
                    setTimeout(() => {
                        setExitoMsg('');
                    }, 3000);
                }
            })
            .catch(function (error){
                console.log(error.response.data);
            });
    };
    
    const desactivarBoton = (DireccionData.direccion === '') ;



    return (
        <div className={"container mt-4"}>
            <div className={"row"}>
                <div className={"col-md-3 col-12 mb-2"}>
                    <Barra_lateral/>
                </div>

                <div className={"col-md-9 col-12 mb-2"}>
                    <div className={"card"}>
                        <h4 className={"card-header"}>Actualizar dirección</h4>
                        <div className={"card-body"}>
                            {
                                ErrorMsg && <p className={"alert alert-danger"}>{ErrorMsg}</p>
                            }
                            {
                                ExitoMsg && <p className={"alert alert-success"}>{ExitoMsg}</p>
                            }
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="direccion" className="form-label">Dirección:</label>
                                    <textarea className="form-control" id="direccion" name="direccion" value={DireccionData.direccion} onChange={inputHandler}
                                           placeholder="Escriba su dirección"/>
                                </div>
                                 <button type={"button"} className={"btn btn-primary"} onClick={submitHandler} disabled={desactivarBoton} >Crear dirección</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Actualizar_direccion;

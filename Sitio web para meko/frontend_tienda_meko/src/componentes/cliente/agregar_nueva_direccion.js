import Barra_lateral from "./barra_lateral";
import {useState} from "react";
import axios from "axios";

function Agregar_nueva_direccion() {
    const cliente_id=localStorage.getItem('cliente_id');
    const [ErrorMsg, setErrorMsg] = useState('');
    const [ExitoMsg, setExitoMsg] = useState('');
    const [url, setUrl] = useState('http://127.0.0.1:8000/api');
    const parte_de_la_url = '/direccion/';
    const [DireccionData,setDireccionData] = useState({
        'direccion': '',
        'cliente': cliente_id
    });

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

        axios.post(`${url}${parte_de_la_url}`,formData)
            .then(function (response){
                if (response.status!==201){
                    setErrorMsg('Datos no guardados');
                    setExitoMsg('');
                }
                else {
                    setErrorMsg('');
                    setExitoMsg('Datos guardados');
                    setDireccionData({
                        'direccion':'',
                        'cliente': cliente_id
                    });

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
                        <h4 className={"card-header"}>Agregar nueva dirección</h4>
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

export default Agregar_nueva_direccion;

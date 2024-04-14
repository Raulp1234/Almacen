import Barra_lateral_como_vendedor from "./barra_lateral_como_vendedor";
import axios from "axios";
import {useState} from "react";
import ojoAbierto from '../../iconos/ojo_abierto.png';
import ojoCerrado from '../../iconos/ojo_cerrado.png';

function Cambiar_contrasenha_como_vendedor (){

    const [ContrasenhaData,setContrasenhaData] = useState({
        'contrasenha':'',
        'confirmar_contrasenha':'',
    });

    const vendedor_id=localStorage.getItem('vendedor_id');
    const [url, setUrl] = useState('http://127.0.0.1:8000/api');
    const [ConfirmacionError, setConfirmacionError] = useState(false);
    const [ConfirmacionCambio, setConfirmacionCambio] = useState(false);
    const parte_de_la_url_cambiar_contraseña = '/vendedor-cambiar-contrasenha/'+vendedor_id+"/";
    const [MostrarPassword, setMostrarPassword] = useState(false);


    const inputHandler = (event) => {
        setContrasenhaData({
            ...ContrasenhaData,
            [event.target.name]:event.target.value
        });
    };

    const toggleShowPassword = () => {
        setMostrarPassword(!MostrarPassword);
    };

    const submitHandler = (event) => {

        if(ContrasenhaData.contrasenha!==ContrasenhaData.confirmar_contrasenha){
            setConfirmacionError(true);
            setConfirmacionCambio(false);
        }
        else{
            setConfirmacionError(false);
            setConfirmacionCambio(true);

            const formData=new FormData();
            formData.append('contrasenha', ContrasenhaData.contrasenha);

            axios.post(`${url}${parte_de_la_url_cambiar_contraseña}`,formData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
                .then(function (response){
                    console.log("response: ",response);
                })
                .catch(function (error){
                    console.log(error.response.data);
                });
        }
    };




    return (
        <div className={"container mt-4"}>
            <div className={"row"}>
                <div className={"col-md-3 col-12 mb-2"}>
                    <Barra_lateral_como_vendedor/>
                </div>

                    <div className={"col-md-9 col-12 mb-2"}>
                <div className={"card"}>
                    <h4 className={"card-header"}>Cambiar contraseña</h4>
                    <div className={"card-body"}>
                        {
                            ConfirmacionError &&
                            <p className={"text-danger"}>Las contraseñas no coinciden</p>
                        }
                        {
                            !ConfirmacionError && ConfirmacionCambio &&
                            <p className={"text-success"}>La contraseña sido modificada con éxito</p>
                        }

                        <div className="mb-3">
                            <label htmlFor="nueva_contrasenha" className="form-label">
                                Nueva contraseña:
                            </label>
                            <div className="input-group">
                                <input
                                    type={MostrarPassword ? "text" : "password"}
                                    className="form-control"
                                    id="nueva_contrasenha"
                                    name="contrasenha"
                                    value={ContrasenhaData.contrasenha}
                                    onChange={inputHandler}
                                    placeholder="Escriba su nueva contraseña"
                                />
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={toggleShowPassword}
                                >
                                    {MostrarPassword ? (
                                        <img
                                            src={ojoAbierto}  // Reemplaza con la ruta de tu imagen
                                            alt="Contraseña Visible"
                                            width="20"
                                            height="20"
                                        />
                                    ) : (
                                        <img
                                            src={ojoCerrado} // Reemplaza con la ruta de tu imagen
                                            alt="Contraseña No Visible"
                                            width="20"
                                            height="20"
                                        />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmarContraseña" className="form-label">
                                Confirmar contraseña:
                            </label>
                            <div className="input-group">
                                <input
                                    type={MostrarPassword ? "text" : "password"}
                                    className="form-control"
                                    id="confirmarContraseña"
                                    name="confirmar_contrasenha"
                                    value={ContrasenhaData.confirmar_contrasenha}
                                    onChange={inputHandler}
                                    placeholder="Escriba su nueva contraseña para confirmar"
                                />
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={toggleShowPassword}
                                >
                                    {MostrarPassword ? (
                                        <img
                                            src={ojoAbierto}  // Reemplaza con la ruta de tu imagen
                                            alt="Contraseña Visible"
                                            width="20"
                                            height="20"
                                        />
                                    ) : (
                                        <img
                                            src={ojoCerrado}  // Reemplaza con la ruta de tu imagen
                                            alt="Contraseña No Visible"
                                            width="20"
                                            height="20"
                                        />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="mb-3">
                            <button type={"button"} className={"btn btn-primary"}  onClick={submitHandler}>Cambiar</button>
                        </div>
                    </div>
                </div>
            </div>

            </div>
        </div>
    );
}
export default Cambiar_contrasenha_como_vendedor;

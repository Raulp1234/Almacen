import { useState } from "react";
import axios from "axios";
import usuarioIcono from '../../iconos/usuarioIcono.png';
import contrasenhaIcono from '../../iconos/contrasenhaIcono.png';
import ojoAbierto from '../../iconos/ojo_abierto.png';
import ojoCerrado from '../../iconos/ojo_cerrado.png';
import Encabezado from "../encabezado";
import Footer from "../footer";
import style_login from '../../CSS/style_login.css';


function Iniciar_sesion() {
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const urlBase = 'http://127.0.0.1:8000/api';
    const parteDeLaUrl = "/clientes/iniciar-sesion";
    const [formError, setFormError] = useState(false);
    const [mensajeError, setMensajeError] = useState('');
    const [loginFormData, setLoginFormData] = useState({
        "Usuario":'',
        "Contrasenha":'',
    });

    const inputHandler = (event) => {
        setLoginFormData({
            ...loginFormData,
            [event.target.name]: event.target.value
        });
    };

    const toggleShowPassword = () => {
        setMostrarPassword(!mostrarPassword);
    };

    const submitHandler = async () => {
        try {
            const formData = new FormData();
            formData.append('usuario', loginFormData.Usuario);
            formData.append('contrasenha', loginFormData.Contrasenha);

            const response = await axios.post(urlBase + parteDeLaUrl, formData);

            if (response.data.bool === false) {
                setFormError(true);
                setMensajeError(response.data.msg);
            } else {
                localStorage.setItem('cliente_id', response.data.id);
                localStorage.setItem('cliente_inicio_sesion', true);
                localStorage.setItem('usuario_del_cliente', response.data.user);
                setFormError(false);
                setMensajeError('');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const chequearCliente = localStorage.getItem('cliente_inicio_sesion');
    if (chequearCliente) {
        window.location.href = '/cliente/dashboard';
    }

    const activarBoton = loginFormData.Usuario !== '' && loginFormData.Contrasenha !== '';

    return (
        <div className="fullscreen-bg">
            <div className="container-fluid h-100 d-flex align-items-center justify-content-center">
            <div className="row ">
                {/* <div className="col-md-12 col-12 offset-4 d-lg-flex">*/}
                <div className="col-md-12 col-12">
                    <div className="card card-shadow">
                        <h4 className="card-header text-center">Iniciar sesión</h4>
                        <div className="card-body">
                            {formError && <p className="text-danger">{mensajeError}</p>}
                            <form>
                                <div className="mb-3">
                                    <div className="row align-items-center">
                                        <div className="col-auto d-flex align-items-center">
                                            <img src={usuarioIcono} alt="usuarioIcono" width="40" height="40" />
                                        </div>
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="Usuario"
                                                name="Usuario"
                                                value={loginFormData.Usuario}
                                                onChange={inputHandler}
                                                placeholder="Escriba su usuario"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="row align-items-center">
                                        <div className="col-auto d-flex align-items-center">
                                            <img src={contrasenhaIcono} alt="contrasenhaIcono" width="40" height="40" />
                                        </div>
                                        <div className="col">
                                            <input
                                                type={mostrarPassword ? "text" : "password"}
                                                className="form-control"
                                                id="Contrasenha"
                                                name="Contrasenha"
                                                value={loginFormData.Contrasenha}
                                                onChange={inputHandler}
                                                placeholder="Escriba su contraseña"
                                            />
                                        </div>
                                        <div className="col-auto">
                                            <button
                                                className="btn btn-outline-secondary"
                                                type="button"
                                                onClick={toggleShowPassword}
                                            >
                                                {mostrarPassword ? (
                                                    <img
                                                        src={ojoAbierto}
                                                        alt="Contraseña Visible"
                                                        width="20"
                                                        height="20"
                                                    />
                                                ) : (
                                                    <img
                                                        src={ojoCerrado}
                                                        alt="Contraseña No Visible"
                                                        width="20"
                                                        height="20"
                                                    />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 text-center">
                                    <button
                                        type="button"
                                        className="btn btn-primary rounded-5"
                                        onClick={submitHandler}
                                        disabled={!activarBoton}
                                    >
                                        Confirmar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Iniciar_sesion;

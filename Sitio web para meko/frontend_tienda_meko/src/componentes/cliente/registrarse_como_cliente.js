import {Link} from 'react-router-dom';
import {useState} from "react";
import axios from "axios";
function Registrarse_como_cliente (){

    const url_base = 'http://127.0.0.1:8000/api';
    const parte_de_la_url = "/clientes/registrarse";
    const [FormError,setFormError] = useState(false);
    const [Mensaje_error,setMensaje_error] = useState('');
    const [Mensaje_exitoso,setMensaje_exitoso] = useState('');
    const [RegistrarseFormData,setRegistrarseFormData] = useState({
        "nombre":'',
        "apellidos":'',
        "correo":'',
        "telefono":'',
        "usuario":'',
        "contrasenha":'',
    });

    const inputHandler = (event) => {
        setRegistrarseFormData({
            ...RegistrarseFormData,
            [event.target.name]:event.target.value
        })
    };

    const submitHandler = (event) => {
        const formData=new FormData();
        formData.append('nombre', RegistrarseFormData.nombre);
        formData.append('apellidos', RegistrarseFormData.apellidos);
        formData.append('correo', RegistrarseFormData.correo);
        formData.append('telefono', RegistrarseFormData.telefono);
        formData.append('usuario', RegistrarseFormData.usuario);
        formData.append('contrasenha', RegistrarseFormData.contrasenha);


        axios.post(url_base+parte_de_la_url,formData)
            .then(function (response){
                if(response.data.bool ==false){
                    setFormError(true);
                    setMensaje_error(response.data.msg)
                    setMensaje_exitoso('')

                }//cliente1
                else{
                  //  localStorage.setItem('cliente_inicio_sesion',true);
                //    localStorage.setItem('usuario_del_cliente',response.data.user);
                    setFormError(false);

                    setRegistrarseFormData({
                        "nombre":'',
                        "apellidos":'',
                        "correo":'',
                        "telefono":'',
                        "usuario":'',
                        "contrasenha":'',
                    });
                    setMensaje_error('')
                    setMensaje_exitoso(response.data.msg)
                }
            })
            .catch(function (error){
                console.log(error);
            });
    };


    const activarBoton = (RegistrarseFormData.nombre!='') && (RegistrarseFormData.apellidos!='') && (RegistrarseFormData.correo!='') && (RegistrarseFormData.usuario!='') && (RegistrarseFormData.contrasenha!='') && (RegistrarseFormData.telefono!='')


    return (
        <div className={"container mt-4"}>
            <div className={"row"}>
                <div className={"col-md-8 col-12 offset-2"}>
                    <div className={"card"}>
                        <h4 className={"card-header"}>Registrarse</h4>
                        <div className={"card-body"}>
                            <p className={"text-muted"}><strong>Nota:</strong> Debe llenar todos los campos</p>

                            {Mensaje_exitoso && <p className={"text-success"}>{Mensaje_exitoso}</p>}
                            {Mensaje_error && <p className={"text-danger"}>{Mensaje_error}</p>}
                            <form>
                            <div className="mb-3">
                                <label htmlFor="Nombre" className="form-label">Nombre:</label>
                                <input type="text" className="form-control" id="Nombre" name="nombre" onChange={inputHandler} value={RegistrarseFormData.nombre}
                                       placeholder="Escriba su nombre"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Apellido" className="form-label">Apellidos:</label>
                                <input type="text" className="form-control" id="Apellido" name="apellidos" onChange={inputHandler} value={RegistrarseFormData.apellidos}
                                       placeholder="Escriba sus apellidos"/>
                             </div>
                            <div className="mb-3">
                                <label htmlFor="Correo" className="form-label">Correo:</label>
                                <input type="email" className="form-control" id="Correo" name="correo" onChange={inputHandler} value={RegistrarseFormData.correo}
                                       placeholder="Escriba su correo"/>
                            </div>
                                <div className="mb-3">
                                    <label htmlFor="telefono" className="form-label">Teléfono:</label>
                                    <input type="text" className="form-control" id="telefono" name="telefono" onChange={inputHandler} value={RegistrarseFormData.telefono}
                                           placeholder="Escriba su teléfono"/>
                                </div>
                            <div className="mb-3">
                                <label htmlFor="Usuario" className="form-label">Usuario:</label>
                                     <input type="text" className="form-control" id="Usuario" name="usuario" onChange={inputHandler} value={RegistrarseFormData.usuario}
                                       placeholder="Escriba su nombre de usuario"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Contraseña" className="form-label">Contraseña:</label>
                                <input type="password" className="form-control" id="Contraseña" name="contrasenha" onChange={inputHandler} value={RegistrarseFormData.contrasenha}
                                       placeholder="Escriba su contraseña"/>
                            </div>
                            <div className="mb-3">
                                <button type={"button"} className={"btn btn-primary"} onClick={submitHandler}  disabled={!activarBoton}>Crear cuenta</button>
                            </div>
                         </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Registrarse_como_cliente;

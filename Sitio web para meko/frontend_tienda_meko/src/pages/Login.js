import {Link, useNavigate} from 'react-router-dom';
import {useState} from "react";
import axios from "axios";
import usuarioIcono from '../iconos/usuarioIcono.png';
import contrasenhaIcono from '../iconos/contrasenhaIcono.png';
import ojoAbierto from '../iconos/ojo_abierto.png';
import ojoCerrado from '../iconos/ojo_cerrado.png';
import {FaEye, FaEyeSlash} from "react-icons/fa";

function Login (){
   /* const [mostrarPassword, setMostrarPassword] = useState(false);

    const url_base = 'http://127.0.0.1:8000/api';
    const parte_de_la_url = "/vendedor/iniciar-sesion";
    const [FormError,setFormError] = useState(false);
    const [Mensaje_error,setMensaje_error] = useState('');

    const [LoginFormData,setLoginFormData] = useState({
        "Usuario":'',
        "Contrasenha":'',
    });
*/
    const inputHandler = (event) => {
        setFormData({
            ...formData,
            [event.target.name]:event.target.value
        })
    };

/*    const toggleShowPassword = () => {
        setMostrarPassword(!mostrarPassword);
    };

    const submitHandler = (event) => {
        const formData=new FormData();
        formData.append('usuario', LoginFormData.Usuario);
        formData.append('contrasenha', LoginFormData.Contrasenha);

        axios.post(url_base+parte_de_la_url,formData)
            .then(function (response){
                if(response.data.bool ===false){
                    console.log("url_base+parte_de_la_url: ",url_base+parte_de_la_url)
                    console.log("response.data: ",response.data)
                    setFormError(true);
                    setMensaje_error(response.data.msg)
                }//cliente1
                else{
                    localStorage.setItem('vendedor_id',response.data.id);
                    localStorage.setItem('vendedor_inicio_sesion',true);
                    localStorage.setItem('usuario_del_vendedor',response.data.user);
                    setFormError(false);
                    setMensaje_error('')
                }
            })
            .catch(function (error){
                console.log(error);
            });
    };

    const chequear_vendedor = localStorage.getItem('vendedor_inicio_sesion');
    if(chequear_vendedor){
        window.location.href='/vendedor/dashboard'
    }*/

    /*esto es codigo de raul*/
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      /*  identifier: "",
        password: "",*/
        "Usuario":'',
        "Contrasenha":'',
        showPassword: false, // Estado para controlar la visibilidad de la contraseña
    });

    const { identifier, password, showPassword } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();

       /* const formData=new FormData();
        formData.Usuario=identifier;
        formData.Contrasenha=password;
        formData.append('usuario', formData.Usuario);
        formData.append('contrasenha', formData.Contrasenha);

        axios.post(url_base+parte_de_la_url,formData)
            .then(function (response){
                if(response.data.bool ===false){
                    console.log("url_base+parte_de_la_url: ",url_base+parte_de_la_url)
                    console.log("response.data: ",response.data)
                    setFormError(true);
                    setMensaje_error(response.data.msg)
                }//cliente1
                else{
                    localStorage.setItem('vendedor_id',response.data.id);
                    localStorage.setItem('vendedor_inicio_sesion',true);
                    localStorage.setItem('usuario_del_vendedor',response.data.user);
                    navigate("/dashboard");
                    setFormError(false);
                    setMensaje_error('')
                }
            })
            .catch(function (error){
                console.log(error);
            });*/
        // Lógica de autenticación aquí
        // Si la autenticación es exitosa, redirigir al dashboard
        navigate("/dashboard");
    };

    const togglePasswordVisibility = () => {
        setFormData({ ...formData, showPassword: !showPassword });
    };

    const handleForgotPassword = () => {
        // Lógica para redirigir a la página de recuperación de contraseña
        navigate("/forgot-password");
    };

    /*hasta aqui*/

    const [FormError,setFormError] = useState(false);
    const [Mensaje_error,setMensaje_error] = useState('');
    const url_base = 'http://127.0.0.1:8000/api';
    const parte_de_la_url = "/vendedor/iniciar-sesion";
   /* const submitHandler = (event) => {
        const formData=new FormData();
        formData.append('usuario', formData.Usuario);
        formData.append('contrasenha', formData.Contrasenha);

        axios.post(url_base+parte_de_la_url,formData)
            .then(function (response){
                if(response.data.bool ===false){
                    console.log("url_base+parte_de_la_url: ",url_base+parte_de_la_url)
                    console.log("response.data: ",response.data)
                    setFormError(true);
                    setMensaje_error(response.data.msg)
                }//cliente1
                else{
                    localStorage.setItem('vendedor_id',response.data.id);
                    localStorage.setItem('vendedor_inicio_sesion',true);
                    localStorage.setItem('usuario_del_vendedor',response.data.user);
                    setFormError(false);
                    setMensaje_error('')
                }
            })
            .catch(function (error){
                console.log(error);
            });
    };*/

    //const activarBoton = (LoginFormData.Usuario!=='') && (LoginFormData.Contrasenha!=='')
    return (
        <div className="main-panel flex items-center justify-center">
            <div className="welcome-message p-10 pt-5 bg-white p-8 border rounded-lg shadow-md text-center fade-in">
                <h2 className="text-3xl font-bold mb-4 ">Iniciar sesión</h2>
                {FormError && <p className="text-danger">{Mensaje_error}</p>}
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="identifier"
                            className="block text-gray-700 text-left font-bold mb-2"
                        >
                            Correo electrónico o usuario
                        </label>
                        <input
                            type="text"
                            id="identifier"
                            name="identifier"
                            value={identifier}
                            onChange={onChange}
                            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 border-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 text-left font-bold mb-2"
                        >
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 border-2 pr-10" // Añadimos padding a la derecha para el botón de alternar
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 flex items-center px-3 py-2 focus:outline-none"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit" onClick={onSubmit}
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-blue-700"
                    >
                        Iniciar sesión
                    </button>
                    <div className="mt-4">
                        <p className="text-gray-700">
                            ¿Olvidaste tu contraseña?{" "}
                            <button onClick={handleForgotPassword} className="text-blue-500">
                                Haz click aquí
                            </button>
                        </p>
                    </div>
                    <div className="mt-1">
                        <p className="text-gray-700">
                            ¿No tienes una cuenta?{" "}
                            <Link to="/register" className="text-blue-500">
                                Regístrate aquí
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
    {/* return (

        <div className="fullscreen-bg">
            <div className="container-fluid h-100 d-flex align-items-center justify-content-center">
                <div className="row ">

                    <div className="col-md-12 col-12">
                        <div className="card card-shadow">
                            <h4 className="card-header text-center">Iniciar sesión</h4>
                            <div className="card-body">
                                {FormError && <p className="text-danger">{Mensaje_error}</p>}
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
                                                    value={LoginFormData.Usuario}
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
                                                    value={LoginFormData.Contrasenha}
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





    );*/}
}
export default Login;

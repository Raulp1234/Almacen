import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();

    const [mostrarPassword, setMostrarPassword] = useState(false);
    const urlBase = 'http://127.0.0.1:8000/api';
    const parteDeLaUrl = "/vendedor/iniciar-sesion";
    const [formError, setFormError] = useState(false);
    const [mensajeError, setMensajeError] = useState('');
    const [loginFormData, setLoginFormData] = useState({
        "Usuario":'',
        "Contrasenha":'',
    });

    const [formData, setFormData] = useState({
        identifier: "",
        password: "",
        showPassword: false, // Estado para controlar la visibilidad de la contraseña
    });

    const { identifier, password, showPassword } = formData;


    const chequear_vendedor =localStorage.getItem('vendedor_inicio_sesion');

  /*  if (chequear_vendedor) {
        navigate("/dashboard");
    }*/
    const togglePasswordVisibility = () => {
        setFormData({ ...formData, showPassword: !showPassword });
    };

    const handleForgotPassword = () => {
        // Lógica para redirigir a la página de recuperación de contraseña
        navigate("/forgot-password");
    };

    const inputHandler = (event) => {
        setLoginFormData({
            ...loginFormData,
            [event.target.name]: event.target.value
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('usuario', loginFormData.Usuario);
            formData.append('contrasenha', loginFormData.Contrasenha);

            const response = await axios.post(urlBase + parteDeLaUrl, formData);

            if (response.data.bool === false) {
                setFormError(true);
                setMensajeError(response.data.msg);
            } else {
                localStorage.setItem('vendedor_id', response.data.id);
                localStorage.setItem('vendedor_inicio_sesion', true);
                localStorage.setItem('usuario_del_vendedor', response.data.user);
                setFormError(false);
                setMensajeError('');
                navigate("/dashboard");
            }
        } catch (error) {
            console.error(error);
        }

        //navigate("/dashboard");
    };

    return (
        <div className="main-panel flex items-center justify-center">
            <div className="welcome-message p-10 pt-5 bg-white p-8 border rounded-lg shadow-md text-center fade-in">
                {formError && <p className="text-danger">{mensajeError}</p>}
                <h2 className="text-3xl font-bold mb-4 ">Iniciar sesión</h2>
                <form >
                    <div className="mb-4">
                        <label
                            htmlFor="Usuario"
                            className="block text-gray-700 text-left font-bold mb-2"
                        >
                            Correo electrónico o usuario
                        </label>
                        <input
                            type="text"
                            id="Usuario"
                            name="Usuario"
                            value={loginFormData.Usuario}
                            onChange={inputHandler}
                            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 border-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="Contrasenha"
                            className="block text-gray-700 text-left font-bold mb-2"
                        >
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="Contrasenha"
                                name="Contrasenha"
                                value={loginFormData.Contrasenha}
                                onChange={inputHandler}
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
                        type="button" onClick={submitHandler}
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
};

export default Login;

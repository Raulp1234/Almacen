import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const Register = () => {

  const url_base = 'http://127.0.0.1:8000/api';
  const parte_de_la_url = "/vendedor/registrarse";
  const [Mensaje_error,setMensaje_error] = useState('');
  const [Mensaje_exitoso,setMensaje_exitoso] = useState('');
  const [RegistrarseFormData,setRegistrarseFormData] = useState({
    "nombre":'',
    "apellidos":'',
    "correo":'',
    "telefono":'',
    "usuario":'',
    "contrasenha":'',
    "direccion":'',
  });

  const inputHandler = (event) => {
    setRegistrarseFormData({
      ...RegistrarseFormData,
      [event.target.name]:event.target.value
    })
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const formData=new FormData();
  /*  formData.append('nombre', RegistrarseFormData.nombre);
    formData.append('apellidos', RegistrarseFormData.apellidos);
    formData.append('correo', RegistrarseFormData.correo);
    formData.append('telefono', RegistrarseFormData.telefono);
    formData.append('usuario', RegistrarseFormData.usuario);
    formData.append('contrasenha', RegistrarseFormData.contrasenha);
    formData.append('direccion', RegistrarseFormData.direccion);*/

    const telefono_defecto=55555555;

    formData.append('nombre', "");
    formData.append('apellidos', "");
    formData.append('correo', RegistrarseFormData.correo);
    formData.append('telefono', telefono_defecto);
    formData.append('usuario', RegistrarseFormData.usuario);
    formData.append('contrasenha', RegistrarseFormData.contrasenha);
    formData.append('direccion',"");

    axios.post(url_base+parte_de_la_url,formData)
        .then(function (response){
          if(response.data.bool ===false){
            setMensaje_error(response.data.msg)
            setMensaje_exitoso('')

          }
          else{
            setRegistrarseFormData({
              "nombre":'',
              "apellidos":'',
              "correo":'',
              "telefono":'',
              "usuario":'',
              "contrasenha":'',
              "direccion":'',
            });
            setMensaje_error('')
            setMensaje_exitoso(response.data.msg)
          }
        })
        .catch(function (error){
          console.log(error);
        });
  };

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false, // Estado para controlar la visibilidad de la contraseña
    showConfirmPassword: false, // Estado para controlar la visibilidad de la contraseña
  });

  const { username, email, password, confirmPassword, showPassword ,showConfirmPassword} = formData;


 /* const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("Las contraseñas no coinciden");
    } else {
      console.log(formData);
      // Lógica para enviar datos de registro al backend
    }
  };*/

  const togglePasswordVisibility = () => {
    setFormData({ ...formData, showPassword: !showPassword });
  };

 /* const togglePasswordVisibilityConfirm = () => {
    setFormData({ ...formData, showConfirmPassword: !showConfirmPassword });
  };*/

  return (
      <div className="main-panel flex items-center justify-center">
        <div className="welcome-message p-10 pt-5 bg-white p-8 border rounded-lg shadow-md text-center fade-in">
          {Mensaje_exitoso && <p className={"text-success"}>{Mensaje_exitoso}</p>}
          {Mensaje_error && <p className={"text-danger"}>{Mensaje_error}</p>}

          <h2 className="text-3xl font-bold mb-4 ">Crear una cuenta</h2>
          <form >
            <div className="mb-4">
              <label
                  htmlFor="usuario"
                  className="block text-gray-700 text-left font-bold mb-2"
              >
                Nombre de usuario
              </label>
              <input
                  type="text"
                  id="usuario"
                  name="usuario"
                  value={RegistrarseFormData.usuario}
                  onChange={inputHandler}
                  className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 border-2"
              />
            </div>
            <div className="mb-4">
              <label
                  htmlFor="correo"
                  className="block text-gray-700 text-left font-bold mb-2"
              >
                Correo electrónico
              </label>
              <input
                  type="email"
                  id="correo"
                  name="correo"
                  value={RegistrarseFormData.correo}
                  onChange={inputHandler}
                  className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 border-2"
              />
            </div>
            <div className="mb-4">
              <label
                  htmlFor="contrasenha"
                  className="block text-gray-700 text-left font-bold mb-2"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    id="contrasenha"
                    name="contrasenha"
                    value={RegistrarseFormData.contrasenha}
                    onChange={inputHandler}
                    className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 border-2 pr-10"
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
            {/* <div className="mb-4">
              <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700 text-left font-bold mb-2"
              >
                Confirmar contraseña
              </label>
              <div className="relative">
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={onChange}
                    className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 border-2 pr-10"
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibilityConfirm}
                    className="absolute inset-y-0 right-0 flex items-center px-3 py-2 focus:outline-none"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>*/}
            <button
                type="submit" onClick={submitHandler}
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-blue-700"
            >
              Crear cuenta
            </button>
            <div className="pt-2">
              <p className="text-gray-700">
                ¿Ya tienes una cuenta?{" "}
                <Link to="/login" className="text-blue-500">
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Register;

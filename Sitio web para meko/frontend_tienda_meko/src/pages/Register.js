import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false, // Estado para controlar la visibilidad de la contraseña
    showConfirmPassword: false, // Estado para controlar la visibilidad de la contraseña
  });

  const { username, email, password, confirmPassword, showPassword ,showConfirmPassword} = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("Las contraseñas no coinciden");
    } else {
      console.log(formData);
      // Lógica para enviar datos de registro al backend
    }
  };

  const togglePasswordVisibility = () => {
    setFormData({ ...formData, showPassword: !showPassword });
  };

  const togglePasswordVisibilityConfirm = () => {
    setFormData({ ...formData, showConfirmPassword: !showConfirmPassword });
  };

  return (
    <div className="main-panel flex items-center justify-center">
      <div className="welcome-message p-10 pt-5 bg-white p-8 border rounded-lg shadow-md text-center fade-in">
        <h2 className="text-3xl font-bold mb-4 ">Crear una cuenta</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-left font-bold mb-2"
            >
              Nombre de usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={onChange}
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 border-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-left font-bold mb-2"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
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
          <div className="mb-4">
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
          </div>
          <button
            type="submit"
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

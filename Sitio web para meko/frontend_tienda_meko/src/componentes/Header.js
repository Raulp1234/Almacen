// src/components/Header.js

import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';


const Header = () => {


    const chequear_vendedor =localStorage.getItem('vendedor_inicio_sesion');

   // const chequear_vendedor = localStorage.getItem('vendedor_inicio_sesion');
    console.log("chequear_vendedor: ",chequear_vendedor)

    return (
        <header className="bg-gray-800 p-4 flex justify-between items-center">
            <h1 className="text-white text-xl">MEKO Store</h1>
            <div className="flex items-center space-x-5">
                <Link to="/" className="text-white hover:text-gray-300">Inicio</Link>
                <Link to="/register" className="text-white hover:text-gray-300">Registrarse</Link>

                {
                    chequear_vendedor &&
                    <>
                        <Link to="/logout" className="text-white hover:text-gray-300">Cerrar sesión</Link>

                    </>
                }
                {
                    !chequear_vendedor &&
                    <>
                        <Link to="/login" className="text-white hover:text-gray-300">Iniciar Sesión</Link>
                    </>
                }
                {/* <Link to="/login" className="text-white hover:text-gray-300">Iniciar Sesión</Link>*/}

            </div>
        </header>

    );
}

export default Header;

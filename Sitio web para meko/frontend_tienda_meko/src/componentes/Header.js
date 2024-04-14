import React from 'react';
import {Link} from 'react-router-dom';

{/*import {Link} from 'react-router-dom';
import { CarritoContext, UserContext, TipoMonedaContext } from "../context";
import {useContext, useState} from 'react';
import cerrarSesion from '../iconos/boton_apagado.png';
import iniciarSesion from '../iconos/iniciarSesion.png';
import registrar_usuario from '../iconos/registrar_usuario.png';
import tablero from '../iconos/tablero.png';
import inicio from '../iconos/inicio.png';
import carrito1 from '../iconos/carrito1.png';
import categoria_1 from '../iconos/categoria_1.png';
import cuenta from '../iconos/cuenta.png';
import cuenta_vendedor from '../iconos/cuenta_vendedor.png';

function Encabezado (){
    const chequear_vendedor = localStorage.getItem('vendedor_inicio_sesion');
    const userContext=useContext(UserContext);
    const { Datos_carrito } = useContext(CarritoContext);
    const {TipoMoneda, setTipoMoneda} = useContext(TipoMonedaContext);
    //const [TipoMoneda, setTipoMoneda] = useState('mn');


    const cambiarTipoDeMoneda = (e) => {
        const tipo_moneda = e.target.value;
        localStorage.setItem('tipo_moneda', tipo_moneda);
        setTipoMoneda(localStorage.getItem('tipo_moneda'));
      }



    return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <Link className="navbar-brand"  to="/">Meko Store</Link>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/">
                            <img src={inicio} alt="inicio"   width="40"
                                 height="40" /> Inicio</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/categorias">
                            <img src={categoria_1} alt="categoria_1"   width="40"
                                 height="40" /> Categorías</Link>
                    </li>
                    {/*  <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/pago">
                            <img src={carrito1} alt="carrito1"   width="40"
                                 height="40" /> Mi carrito ({Datos_carrito && Array.isArray(Datos_carrito) ? Datos_carrito.length : 0})
                        </Link>
                    </li>*/}
                    {/*   <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                           aria-expanded="false">
                            <img src={cuenta} alt="cuenta"   width="40"
                                 height="40" /> Cuenta
                        </a>
                        <ul className="dropdown-menu">
                            {userContext.login===null &&
                                <>
                            <li><Link className="dropdown-item" to="/registrarse_como_cliente">
                                <img src={registrar_usuario} alt="registrar_usuario"   width="30"
                                     height="30" /> Registrarse</Link></li>

                            <li><Link className="dropdown-item" to="/iniciar-sesion">
                                <img src={iniciarSesion} alt="iniciarSesion"   width="30"
                                     height="30" /> Iniciar sesión</Link></li>
                                </>
                            }

                            {userContext.login==='true' &&
                                <>

                                <li><Link className="dropdown-item" to="/cliente/dashboard">
                                    <img src={tablero} alt="tablero"    width="30"
                                         height="30" /> Dashboard</Link></li>
                                <li><Link className="dropdown-item" to="/cerrar-sesion">
                                    <img src={cerrarSesion} alt="Cerrar sesión" className="icono-cerrar-sesion"  width="30"
                                         height="30" /> Cerrar sesión</Link></li>
                                </>
                            }
                        </ul>
                    </li>*/}
{/*}   <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                           aria-expanded="false">
                            <img src={cuenta_vendedor} alt="cuenta_vendedor" width="40"
                                 height="40" /> Panel del vendedor
                        </a>
                        <ul className="dropdown-menu">

                            {
                                chequear_vendedor &&
                                <>
                                <li><Link className="dropdown-item" to="/vendedor/dashboard">
                                    <img src={tablero} alt="tablero"    width="30"
                                         height="30" /> Dashboard</Link></li>
                                <li><Link className="dropdown-item" to="/vendedor/cerrar-sesion">
                                    <img src={cerrarSesion} alt="Cerrar sesión" className="icono-cerrar-sesion"  width="30"
                                         height="30" /> Cerrar sesión</Link></li>

                                </>
                            }
                            {
                                !chequear_vendedor &&
                                <>
                                <li><Link className="dropdown-item" to="/vendedor/registrarse-como-vendedor">
                                    <img src={registrar_usuario} alt="registrar_usuario"   width="30"
                                         height="30" /> Registrarse</Link></li>
                                <li><Link className="dropdown-item" to="/vendedor/iniciar-sesion">
                                    <img src={iniciarSesion} alt="iniciarSesion"   width="30"
                                         height="30" /> Iniciar sesión</Link></li>
                                </>
                            }
                        </ul>
                    </li>

                    <li className="nav-item">
                        <div className="nav-link">
                            <select onChange={cambiarTipoDeMoneda}>
                               <option value={"mn"}>MN</option>
                               <option value={"usd"}>USD</option>
                            </select>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    );
}
export default Encabezado;*/}

const Header = () => {
    return (
        <header>
            <nav className="bg-gray-800 p-4">
                <div className="container mx-8">
                    <div className="flex items-center justify-between">
                        <h1 className="text-white text-xl"><Link to="/" className="hover:text-gray-300">MEKO Store</Link></h1>
                        <ul className="flex space-x-5 text-white">
                            <li><Link to="/" className="hover:text-gray-300">Inicio</Link></li>
                            <li><Link to="/login" className="hover:text-gray-300">Iniciar Sesión</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
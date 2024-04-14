/*import {Routes,Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Encabezado from "./componentes/encabezado";
import Inicio from "./componentes/pages/inicio";
import Footer from "./componentes/footer";
import Categorias from "./componentes/categorias";
import Productos_de_la_categoria from "./componentes/productos_de_la_categoria";
import Producto_todos from "./componentes/producto_todos";
import Producto_detalle from "./componentes/producto_detalle";
import Pago from "./componentes/pago";
import Registrarse_como_cliente from "./componentes/cliente/registrarse_como_cliente";
import Iniciar_sesion from "./componentes/cliente/iniciar_sesion";
import Dashboard from "./componentes/cliente/dashboard";
import Pedidos from "./componentes/cliente/pedidos";
import Pedido_completado from "./componentes/cliente/pedido_completado";
import Pedido_fallido from "./componentes/cliente/pedido_fallido";
import Lista_de_deseos from "./componentes/cliente/lista_de_deseos";
import Perfil from "./componentes/cliente/perfil";
import Cambiar_contrasenha from "./componentes/cliente/cambiar_contrasenha";
import Direcciones from "./componentes/cliente/direcciones";
import Agregar_nueva_direccion from "./componentes/cliente/agregar_nueva_direccion";
import Dashboard_como_vendedor from "./componentes/vendedores/dashboard_como_vendedor";
import Login from "./componentes/vendedores/Login";
import Registrarse_como_vendedor from "./componentes/vendedores/registrarse_como_vendedor";
import Productos_del_vendedor from "./componentes/vendedores/productos_del_vendedor";
import Nuevo_producto from "./componentes/vendedores/nuevo_producto";
import Pedidos_del_vendedor from "./componentes/vendedores/pedidos_del_vendedor";
import Clientes_del_vendedor from "./componentes/vendedores/clientes_del_vendedor";
import Reportes_como_vendedor from "./componentes/vendedores/reportes_como_vendedor";
import Cambiar_contrasenha_como_vendedor from "./componentes/vendedores/cambiar_contrasenha_como_vendedor";
import Perfil_como_vendedor from "./componentes/vendedores/perfil_como_vendedor";
import Producto_etiquetas from "./componentes/producto_etiquetas";
import Cerrar_sesion from "./componentes/cliente/cerrar_sesion";

import {CarritoContext, TipoMonedaContext} from "./context";
import {useState} from "react";
import Confirmar_pedido from "./componentes/confirmar_pedido";
import Actualizar_direccion from "./componentes/cliente/actualizar_direccion";
import Cerrar_sesion_vendedor from "./componentes/vendedores/cerrar_sesion_vendedor";
import Actualizar_producto from "./componentes/vendedores/actualizar_producto";
import Pedidos_del_cliente from "./componentes/cliente/pedidos_del_cliente";
import Reportes_diario_como_vendedor from "./componentes/vendedores/reportes_diario_como_vendedor";
import Agregar_calificacion from "./componentes/cliente/agregar_calificacion";
import Nuevo_unidad_medida from "./componentes/vendedores/nuevo_unidad_medida";
import Nuevo_categoria from "./componentes/vendedores/nuevo_categoria";
import Actualizar_categoria from "./componentes/vendedores/actualizar_categoria";*/

//const moneda=localStorage.getItem('tipo_moneda');
/*esto es de raul*/
import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./componentes/footer";
import Inicio from "./pages/inicio";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/admin/Dashboard";
import Header from "./componentes/Header";

const moneda='mn';
/*hasta aqui*/

function App() {
 //   const revisar_carrito = localStorage.getItem('datos_carrito');
 //   const [Datos_carrito, setDatos_carrito] = useState(revisar_carrito ? JSON.parse(revisar_carrito) : []);
  //  const [TipoMoneda, setTipoMoneda] = useState(moneda);
  return (
      <div>
          {/*  <TipoMonedaContext.Provider value={{ TipoMoneda, setTipoMoneda }}>
              <CarritoContext.Provider value={{ Datos_carrito, setDatos_carrito }}>
              <Encabezado />*/}

                  <Router>
                      <div>
                          <Header />
                          <Routes>
                              <Route path="/" element={<Inicio />} />
                              <Route path="/login" element={<Login />} />
                              <Route path="/register" element={<Register />} />
                              <Route path="/dashboard/*" element={<Dashboard />} />
                          </Routes>
                          <Footer />
                      </div>
                  </Router>
                  {/* <Routes>
                  <Route exact path={'/'} element={<Inicio/>} />
                  <Route path={'/productos'} element={<Producto_todos/>} />
                  <Route path={'/categorias'} element={<Categorias/>} />
                  <Route path={'/categoria/:categoria_slug/:categoria_id'} element={<Productos_de_la_categoria/>} />
                  <Route path={'/productos/:etiquetas'} element={<Producto_etiquetas/>} />
                  <Route path={'/producto/:producto_slug/:producto_id'} element={<Producto_detalle/>} />
                  <Route path={'/pago'} element={<Pago/>} />
                  <Route path={'/pedido/completado'} element={<Pedido_completado/>} />
                  <Route path={'/pedido/fallido'} element={<Pedido_fallido/>} />
                   {/*no  <Route path={'/categoria/:categoria_slug/:categoria_id'} element={<Producto_solo/>} />*/}


                  {/*  <Route path={'/registrarse_como_cliente'} element={<Registrarse_como_cliente/>} />
                  <Route path={'/iniciar-sesion'} element={<Iniciar_sesion/>} />
                  <Route path={'/cerrar-sesion'} element={<Cerrar_sesion/>} />
                  <Route path={'/cliente/dashboard'} element={<Dashboard/>} />
                  <Route path={'/cliente/pedidos'} element={<Pedidos/>} />
                  <Route path={'/cliente/lista_de_deseos'} element={<Lista_de_deseos/>} />
                  <Route path={'/cliente/perfil'} element={<Perfil/>} />
                  <Route path={'/cliente/cambiar_contraseña'} element={<Cambiar_contrasenha/>} />
                  <Route path={'/cliente/direcciones'} element={<Direcciones/>} />
                  <Route path={'/cliente/agregar_nueva_direccion'} element={<Agregar_nueva_direccion/>} />
                  <Route path={'/cliente/actualizar-direccion/:direccion_id'} element={<Actualizar_direccion/>} />
                  <Route path={'/cliente/agregar-calificacion/:producto_id'} element={<Agregar_calificacion/>} />

                  <Route path={'/confirmar-pedido'} element={<Confirmar_pedido/>} />
                  */}

                  {/*Vendedor*/}

                  {/*  <Route path={'/vendedor/registrarse-como-vendedor'} element={<Registrarse_como_vendedor/>} />
                  <Route path={'/vendedor/iniciar-sesion'} element={<Login/>} />
                  <Route path={'/vendedor/dashboard'} element={<Dashboard_como_vendedor/>} />
                  <Route path={'/vendedor/cerrar-sesion'} element={<Cerrar_sesion_vendedor/>} />
                  <Route path={'/vendedor/productos'} element={<Productos_del_vendedor/>} />
                  <Route path={'/vendedor/nuevo-producto'} element={<Nuevo_producto/>} />
                  <Route path={'/vendedor/actualizar-producto/:producto_id'} element={<Actualizar_producto/>} />
                  <Route path={'/vendedor/pedidos-vendedor'} element={<Pedidos_del_vendedor/>} />
                  <Route path={'/vendedor/clientes-vendedor'} element={<Clientes_del_vendedor/>} />
                  <Route path={'/vendedor/reportes-vendedor'} element={<Reportes_como_vendedor/>} />
                  <Route path={'/vendedor/reporte-diario'} element={<Reportes_diario_como_vendedor/>} />
                  <Route path={'/vendedor/perfil'} element={<Perfil_como_vendedor/>} />
                  <Route path={'/vendedor/cambiar-contraseña'} element={<Cambiar_contrasenha_como_vendedor/>} />
                  <Route path={'/vendedor/cliente/:cliente_id/productos-del-pedido'} element={<Pedidos_del_cliente/>} />

                  <Route path={'/vendedor/unidad-medida'} element={<Nuevo_unidad_medida/>} />

                  <Route path={'/vendedor/categoria'} element={<Nuevo_categoria/>} />
                  <Route path={'/vendedor/actualizar-categoria/:categoria_id'} element={<Actualizar_categoria/>} />*/}

                  {/*Fin Vendedor*/}
                  {/*</Routes>*/}

          {/*  </CarritoContext.Provider>
          </TipoMonedaContext.Provider>*/}
         <Footer />
      </div>
  );
}

export default App;

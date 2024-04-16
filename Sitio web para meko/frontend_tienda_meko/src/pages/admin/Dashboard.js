import React, {useEffect, useState} from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "../../componentes/Sidebar";
import ManageCategories from "./ManageCategories";
import ManageProducts from "./ManageProducts";
import ManageUnits from "./ManageUnits";
import ManageProfile from "./ManageProfile";

const Dashboard = () => {
  const [PerfilData,setPerfilData] = useState({
    'nombre':'',
    'apellidos':'',
    'usuario':'',
    'telefono':'',
    'direccion':'',
    'correo':'',
    'imagen':'',
  });

  const vendedor_id=localStorage.getItem('vendedor_id');
  const [url, setUrl] = useState('http://127.0.0.1:8000/api');
  const parte_de_la_url = '/vendedor/'+vendedor_id+"/";

  // Estado para controlar si se muestra el mensaje de bienvenida
  const [showWelcomeMessage] = useState(true);

  // Obtenemos la ubicación actual
  const location = useLocation();

  // Ocultar el mensaje de bienvenida cuando la ruta actual es "/dashboard/categories"
  const hideWelcomeMessage = location.pathname.includes("/dashboard/categories") || location.pathname.includes("/dashboard/products")|| location.pathname.includes("/dashboard/units")|| location.pathname.includes("/dashboard/profile");

  useEffect(() => {
    fetch_data(`${url}${parte_de_la_url}`);

  }, []);
  function fetch_data(url) {
    fetch(url)

        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("data: ",data)
          setPerfilData({
            'user_id':data.user.id,
            'nombre':data.user.first_name,
            'apellidos':data.user.last_name,
            'usuario':data.user.username,
            'telefono':data.telefono,
            'direccion':data.direccion,
            'correo':data.user.email,
            'imagen_perfil':data.imagen_perfil

          }); // Utiliza setProductoData para actualizar el estado
        })
        .catch((error,data) => {
          console.error("Error fetching data:", error);
        });
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Routes>
          <Route path="categories" element={<ManageCategories />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="units" element={<ManageUnits />} />
          <Route path="profile" element={<ManageProfile />} />
        </Routes>
        {showWelcomeMessage && !hideWelcomeMessage && (
          <div className="welcome-message fade-in">
            <h1 className="text-3xl font-bold mb-4">¡Bienvenido, {PerfilData.usuario}!</h1>
            <p className="text-lg">Aquí puedes gestionar las categorías y productos de tu almacén.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

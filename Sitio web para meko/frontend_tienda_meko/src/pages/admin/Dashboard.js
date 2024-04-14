import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "../../componentes/Sidebar";
import ManageCategories from "./ManageCategories";
import ManageProducts from "./ManageProducts";
import ManageUnits from "./ManageUnits";
import ManageProfile from "./ManageProfile";

const Dashboard = () => {
  const username = "Raul"; // Aquí puedes obtener dinámicamente el nombre del usuario

  // Estado para controlar si se muestra el mensaje de bienvenida
  const [showWelcomeMessage] = useState(true);

  // Obtenemos la ubicación actual
  const location = useLocation();

  // Ocultar el mensaje de bienvenida cuando la ruta actual es "/dashboard/categories"
  const hideWelcomeMessage = location.pathname.includes("/dashboard/categories") || location.pathname.includes("/dashboard/products")|| location.pathname.includes("/dashboard/units")|| location.pathname.includes("/dashboard/profile");

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
            <h1 className="text-3xl font-bold mb-4">¡Bienvenido, {username}!</h1>
            <p className="text-lg">Aquí puedes gestionar las categorías y productos de tu almacén.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

// Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
      <div className="bg-gray-900 text-white h-screen flex flex-col">
        <div className="flex-1 overflow-y-auto"> {/* Agregamos overflow-y-auto para permitir el desplazamiento vertical */}
          <div className="px-4 py-6">
            <h3 className="text-lg font-semibold mb-4 ml-2">Menú</h3>
            <ul>
              <li className="mb-2">
                <Link
                    to="/dashboard/categories"
                    className="block hover:bg-gray-800 py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                >
                  Gestionar Categorías
                </Link>
              </li>
              <li className="mb-2">
                <Link
                    to="/dashboard/products"
                    className="block hover:bg-gray-800 py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                >
                  Gestionar Productos
                </Link>
              </li>
              <li className="mb-2">
                <Link
                    to="/dashboard/units"
                    className="block hover:bg-gray-800 py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                >
                  Gestionar Unidades de Medida
                </Link>
              </li>
              <li className="mb-2">
                <Link
                    to="/dashboard/profile"
                    className="block hover:bg-gray-800 py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                >
                  Gestionar Perfil
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
  );
}

export default Sidebar;

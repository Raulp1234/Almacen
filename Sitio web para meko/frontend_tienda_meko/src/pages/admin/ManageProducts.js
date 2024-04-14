import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa"; // Importa los íconos de FontAwesome
import ProductForm from "./ProductForm"; // Importa el formulario de inserción de productos

const ManageProducts = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showInsertForm, setShowInsertForm] = useState(false); // Estado para controlar la visibilidad del formulario de inserción
  const [products] = useState([
    {
      id: 1,
      name: "Producto 1",
      description: "Descripción del Producto 1",
      quantity: 10,
      priceMN: 20,
      priceUSD: 3,
      category: "Categoría 1",
      unitOfMeasure: "Unidad de Medida 1",
      image: "url_de_la_imagen_1",
    },
    {
      id: 2,
      name: "Producto 2",
      description: "Descripción del Producto 2",
      quantity: 15,
      priceMN: 30,
      priceUSD: 5,
      category: "Categoría 2",
      unitOfMeasure: "Unidad de Medida 2",
      image: "url_de_la_imagen_2",
    },
    {
      id: 3,
      name: "Producto 3",
      description: "Descripción del Producto 3",
      quantity: 20,
      priceMN: 25,
      priceUSD: 4,
      category: "Categoría 1",
      unitOfMeasure: "Unidad de Medida 1",
      image: "url_de_la_imagen_3",
    },
  ]);

  useEffect(() => {
    if (selectedProducts.length === products.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedProducts, products]);

  const handleToggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedProducts(products.map((product) => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleToggleSelectProduct = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleDeleteSelectedProducts = () => {
    // Lógica para eliminar los productos seleccionados
    console.log("Eliminar los productos seleccionados:", selectedProducts);
    setSelectedProducts([]);
    setSelectAll(false);
  };

  // Función para manejar la eliminación de un producto
  const handleDeleteProduct = (productId) => {
    // Lógica para eliminar el producto con el ID proporcionado
    console.log(`Eliminar producto con ID ${productId}`);
  };

  // Función para manejar la modificación de un producto
  const handleEditProduct = (productId) => {
    // Lógica para modificar el producto con el ID proporcionado
    console.log(`Modificar producto con ID ${productId}`);
  };

  const handleInsertProduct = () => {
    // Lógica para insertar un nuevo producto
    console.log("Insertar nuevo producto");
    setShowInsertForm(true); // Mostrar el formulario al hacer clic en el botón "Insertar Producto"
  };

  const handleFormSubmit = (formData) => {
    // Lógica para enviar el formulario
    console.log("Datos del formulario:", formData);
    setShowInsertForm(false); // Ocultar el formulario después de enviarlo
  };

  const handleCancelForm = () => {
    setShowInsertForm(false); // Ocultar el formulario al hacer clic en "Cancelar"
  };

  return (
    <div className="m-8 fade-in">
      <h2 className="mb-7">Gestionar Productos</h2>
      <div className="mb-4 flex">
        <button
          onClick={handleInsertProduct}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4 flex items-center"
        >
          <FaPlus className="text-white mr-2" /> Insertar
        </button>
        {selectedProducts.length > 0 && (
          <button
            onClick={handleDeleteSelectedProducts}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <FaTrash className="text-white mr-2" /> Eliminar (
            {selectedProducts.length})
          </button>
        )}
      </div>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">
              <input
                type="checkbox"
                className="form-checkbox text-blue-500"
                checked={selectAll}
                onChange={handleToggleSelectAll}
              />
            </th>
            <th className="px-4 py-2">Imagen</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Descripción</th>
            <th className="px-4 py-2">Cantidad</th>
            <th className="px-4 py-2">Precio MN</th>
            <th className="px-4 py-2">Precio USD</th>
            <th className="px-4 py-2">Categoría</th>
            <th className="px-4 py-2">Unidad de Medida</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border px-4 py-2">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-500"
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => handleToggleSelectProduct(product.id)}
                />
              </td>
              <td className="border px-4 py-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-cover"
                />
              </td>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{product.description}</td>
              <td className="border px-4 py-2">{product.quantity}</td>
              <td className="border px-4 py-2">{product.priceMN}</td>
              <td className="border px-4 py-2">{product.priceUSD}</td>
              <td className="border px-4 py-2">{product.category}</td>
              <td className="border px-4 py-2">{product.unitOfMeasure}</td>
              <td className="px-4 py-2">
                {/* Botones de eliminar y modificar con íconos */}
                <button
                  onClick={() => handleEditProduct(product.id)}
                  className="text-blue-600 mr-3 hover:text-blue-900"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="text-red-600 ml-3 hover:text-red-900"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Formulario de inserción de producto (pop-up) */}
      {showInsertForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 fade-in">
          <div className="bg-white p-6 rounded-lg">
            <ProductForm
              onSubmit={handleFormSubmit}
              onCancel={handleCancelForm}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;

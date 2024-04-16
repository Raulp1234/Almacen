import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa"; // Importa los íconos de FontAwesome
import ProductForm from "./ProductForm";
import UpdateCategoryForm from "./UpdateCategoryForm";
import UpdateProductForm from "./UpdateProductForm";
import CategoryForm from "./CategoryForm"; // Importa el formulario de inserción de productos

const ManageProducts = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showInsertForm, setShowInsertForm] = useState(false); // Estado para controlar la visibilidad del formulario de inserción
  const [url, setUrl] = useState('http://127.0.0.1:8000/api');
  const parte_de_la_url = "/productos/";
  const parte_de_la_url_producto_eliminar = '/producto/';

  const [ProductosData,setProductosData] = useState([]);
  const [TotalResultados,setTotalResultados] = useState(0);

  const [showEditForm, setShowEditForm] = useState(false); // Estado para controlar la visibilidad del formulario de edición
  const [editProductId, setEditProductId] = useState(''); // ID de la categoría que se está editando


  useEffect(() => {
    fetch_data(`${url}${parte_de_la_url}`);
  }, [url]);


  function fetch_data(url) {
    fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("data.results: ",data.results)
          setProductosData(data.results); // Actualiza los datos de categorías
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
  }

  const productos = ProductosData.map(item => {
    return {
        id: item.id,
        titulo: item.titulo,
        detalles: item.detalles,

        precio: item.precio,
        precioUSD: item.precioUSD,
        imagen: item.imagen,
        cantidad: item.cantidad,

        categoria: item.categoria,
        unidad_medida: item.unidad_medida,
        vendedor_id: item.vendedor_id
    };
  });

  useEffect(() => {
    if (selectedProducts.length === productos.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedProducts, productos]);

  const handleToggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedProducts(productos.map((product) => product.id));
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

    mostrarConfirmacionParaEliminar(selectedProducts);
    setSelectedProducts([]);
    setSelectAll(false);
  };

  // Función para manejar la eliminación de un producto
  const handleDeleteProduct = (productId) => {
    // Lógica para eliminar el producto con el ID proporcionado
    console.log(`Eliminar producto con ID ${productId}`);

    mostrarConfirmacionParaEliminarSolo(productId);
  };

  const handleInsertProduct = () => {
    setShowInsertForm(true);
  };

  // Función para manejar la modificación de un producto
  const handleEditProduct = (productId) => {
    setEditProductId(productId);
    setShowEditForm(true);
  };

  const handleFormSubmit = (formData) => {
    console.log("Datos del formulario:", formData);

    console.log("Datos del formulario:", formData);
    if (showInsertForm) {
      // Lógica para enviar el formulario de inserción
    } else if (showEditForm) {
      UpdateProductForm.producto_id=editProductId; // Pasar undefined si editCategoryId es vacío
      // Lógica para enviar el formulario de edición
    }
    setShowInsertForm(false);
    setShowEditForm(false);

  };
  function mostrarConfirmacionParaEliminarSolo(producto_id) {
    let confirmacion = window.confirm("Estas seguro que desea eliminar este producto ?");

    if (confirmacion) {
      fetch(`${url}${parte_de_la_url_producto_eliminar}${producto_id}`+'/', {
        method: 'DELETE'
      })
          .then((response) => {
            if (response.ok) {
              // Producto eliminado correctamente, recargar la página
              fetch_data(`${url}${parte_de_la_url}`);

            } else {
              console.error('Error al eliminar el producto');
            }
            /*  if (response.bool === true) {
                  fetch_data(`${url}${parte_de_la_url_productos}`);
                  window.location.reload();
              }*/
          });
    }
  }
  function mostrarConfirmacionParaEliminar(producto_ids) {
    let confirmacion = window.confirm("¿Estás seguro que deseas eliminar estos productos?");
    if (confirmacion) {
      producto_ids.forEach(producto_id => {
        fetch(`${url}${parte_de_la_url_producto_eliminar}${producto_id}/`, {
          method: 'DELETE'
        })
            .then((response) => {
              if (response.ok) {
                fetch_data(`${url}${parte_de_la_url}`);
              } else {
                console.error(`Error al eliminar el producto con ID ${producto_id}`);
              }
            });
      });
    }
  }
  const handleCancelForm = () => {
    setShowInsertForm(false); // Ocultar el formulario al hacer clic en "Cancelar"
    setShowEditForm(false);// Ocultar el formulario al hacer clic en "Cancelar"
  };


  return (
    <div className="m-8 fade-in">
      <h2 className="text-2xl font-semibold mb-4">Gestionar Productos</h2>
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
          {productos.map((product) => (
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
                  src={product.imagen}
                  alt={product.titulo}
                  className="w-12 h-12 object-cover"
                />
              </td>
              <td className="border px-4 py-2">{product.titulo ? product.titulo : ''}</td>
              <td className="border px-4 py-2">{product.detalles}</td>
              <td className="border px-4 py-2">{product.cantidad}</td>
              <td className="border px-4 py-2">{product.precio}</td>
              <td className="border px-4 py-2">{product.precioUSD}</td>
              <td className="border px-4 py-2">{product.categoria.titulo ? product.categoria.titulo : ''}</td>
                <td className="border px-4 py-2">{product.unidad_medida.titulo ? product.unidad_medida.titulo : ''}</td>
              <td className="px-4 py-2">
                <div className="flex items-center">
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
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Formulario de inserción o edición de productos (pop-up) */}
      {(showInsertForm || showEditForm) && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 fade-in">
            <div className="bg-white p-6 rounded-lg">
              {showInsertForm ? (
                  // Formulario de inserción
                  <ProductForm
                      onSubmit={handleFormSubmit}
                      onCancel={handleCancelForm}
                      isEditForm={false}
                  />
              ) : (
                  console.log("Valor de editProductId:", editProductId),
                      // Formulario de edición
                      <UpdateProductForm
                          onSubmit={handleFormSubmit}
                          onCancel={handleCancelForm}
                          productoId={editProductId || undefined} // Pasar undefined si editCategoryId es vacío
                          isEditForm={true}
                      />
              )}
            </div>
          </div>
      )}

    </div>
  );
};

export default ManageProducts;

import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa"; // Importa los íconos de FontAwesome
import CategoryForm from "./CategoryForm";
import UpdateCategoryForm from "./UpdateCategoryForm"; // Importa el formulario de inserción de categorías

const ManageCategories = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showInsertForm, setShowInsertForm] = useState(false); // Estado para controlar la visibilidad del formulario de inserción
  const [showEditForm, setShowEditForm] = useState(false); // Estado para controlar la visibilidad del formulario de edición
  const [editCategoryId, setEditCategoryId] = useState(''); // ID de la categoría que se está editando
 // let editCategoryId='';
  const [url, setUrl] = useState('http://127.0.0.1:8000/api');
  const parte_de_la_url_categoria = '/categorias/';
  const parte_de_la_url_categoria_eliminar = '/categoria/';
  const [CategoriaData, setCategoriaData] = useState([]);

  useEffect(() => {
    fetch_data(`${url}${parte_de_la_url_categoria}`);
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
          setCategoriaData(data.results); // Actualiza los datos de categorías
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
  }

  const categories = CategoriaData.map(item => {
    return {
      id: item.id,
      titulo: item.titulo,
      detalles: item.detalles
    };
  });

  const handleToggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedCategories(categories.map((category) => category.id));
    } else {
      setSelectedCategories([]);
    }
  };

  const handleToggleSelectCategory = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleDeleteSelectedCategories = () => {
    mostrarConfirmacionParaEliminar(selectedCategories);
    setSelectedCategories([]);
    setSelectAll(false);
  };

  const handleDeleteCategory = (categoryId) => {
    mostrarConfirmacionParaEliminarSolo(categoryId);
  };

  const handleEditCategory = (categoryId) => {
    console.log("categoryId: ",categoryId)
    setEditCategoryId(categoryId);
  //  editCategoryId=categoryId;
    console.log("editCategoryId: ", editCategoryId); // Agregar este console.log
    setShowEditForm(true);

  };

  const handleInsertCategory = () => {
    setShowInsertForm(true);
  };

  const handleFormSubmit = (formData) => {
    console.log("Datos del formulario:", formData);

    console.log("Datos del formulario:", formData);
    if (showInsertForm) {
      // Lógica para enviar el formulario de inserción
    } else if (showEditForm) {
      UpdateCategoryForm.categoria_id=editCategoryId; // Pasar undefined si editCategoryId es vacío
      // Lógica para enviar el formulario de edición
    }
    setShowInsertForm(false);
    setShowEditForm(false);

  };
  function mostrarConfirmacionParaEliminarSolo(categoria_id) {
    let confirmacion = window.confirm("Estas seguro que desea eliminar esta categoría ?");

    if (confirmacion) {
      fetch(`${url}${parte_de_la_url_categoria_eliminar}${categoria_id}`+'/', {
        method: 'DELETE'
      })
          .then((response) => {
            if (response.ok) {
              // Producto eliminado correctamente, recargar la página
              fetch_data(`${url}${parte_de_la_url_categoria}`);
              window.location.reload();
            } else {
              console.error('Error al eliminar la categoría');
            }
            /*  if (response.bool === true) {
                  fetch_data(`${url}${parte_de_la_url_productos}`);
                  window.location.reload();
              }*/
          });
    }
  }
  function mostrarConfirmacionParaEliminar(categoria_ids) {
    let confirmacion = window.confirm("¿Estás seguro que deseas eliminar estas categorías?");
    if (confirmacion) {
      categoria_ids.forEach(categoria_id => {
        fetch(`${url}${parte_de_la_url_categoria_eliminar}${categoria_id}/`, {
          method: 'DELETE'
        })
            .then((response) => {
              if (response.ok) {
                fetch_data(`${url}${parte_de_la_url_categoria}`);
              } else {
                console.error(`Error al eliminar la categoría con ID ${categoria_id}`);
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
        <h2 className="mb-7">Gestionar Categorías</h2>
        <div className="mb-4 flex">
          <button
              onClick={handleInsertCategory}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4 flex items-center"
          >
            <FaPlus className="text-white mr-2" /> Insertar
          </button>
          {selectedCategories.length > 0 && (
              <button
                  onClick={handleDeleteSelectedCategories}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
              >
                <FaTrash className="text-white mr-2" /> Eliminar (
                {selectedCategories.length})
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
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Descripción</th>
            <th className="px-4 py-2"></th>
          </tr>
          </thead>
          <tbody>
          {categories.map((category) => (
              <tr key={category.id}>
                <td className="border px-4 py-2">
                  <input
                      type="checkbox"
                      className="form-checkbox text-blue-500"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleToggleSelectCategory(category.id)}
                  />
                </td>
                <td className="border px-4 py-2">{category.titulo}</td>
                <td className="border px-4 py-2">{category.detalles}</td>
                <td className="px-4 py-2">
                  {/* Botones de eliminar y modificar con íconos */}
                  <button
                      onClick={() => handleEditCategory(category.id)}
                      className="text-blue-600 mr-3 hover:text-blue-900"


                  >

                    <FaEdit />
                  </button>
                  <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-600 ml-3 hover:text-red-900"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
        {/* Formulario de inserción o edición de categoría (pop-up) */}
        {(showInsertForm || showEditForm) && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 fade-in">
              <div className="bg-white p-6 rounded-lg">
                {showInsertForm ? (
                    // Formulario de inserción
                    <CategoryForm
                        onSubmit={handleFormSubmit}
                        onCancel={handleCancelForm}
                        isEditForm={false}
                    />
                ) : (
                    console.log("Valor de editCategoryId:", editCategoryId),
                    // Formulario de edición
                    <UpdateCategoryForm
                        onSubmit={handleFormSubmit}
                        onCancel={handleCancelForm}
                        categoria_id={editCategoryId || undefined} // Pasar undefined si editCategoryId es vacío

                        isEditForm={true}
                    />
                )}
              </div>
            </div>
        )}

      </div>
  );
};


export default ManageCategories;

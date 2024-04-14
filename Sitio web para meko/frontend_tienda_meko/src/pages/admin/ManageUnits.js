// ManageUnits.js
import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa"; // Importa los íconos de FontAwesome
import UnityForm from "./UnityForm";
import UpdateUnitForm from "./UpdateUnitForm"; // Importa el formulario de inserción de unidades de medidas

const ManageUnits = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [showInsertForm, setShowInsertForm] = useState(false); // Estado para controlar la visibilidad del formulario de inserción
  const [showEditForm, setShowEditForm] = useState(false); // Estado para controlar la visibilidad del formulario de edición
  const [editUnidadId, setEditUnidadId] = useState(''); // ID de la categoría que se está editando

  const [url, setUrl] = useState('http://127.0.0.1:8000/api');
  const parte_de_la_url_unidades= '/todas_las_unidades_de_medida/';
  const parte_de_la_url_unidades_eliminar = '/unidad_medida_productos/';
  const [UnidadData, setUnidadData] = useState([]);

  useEffect(() => {
    fetch_data(`${url}${parte_de_la_url_unidades}`);
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
          setUnidadData(data.results); // Actualiza los datos de categorías
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
  }

  const unidades = UnidadData.map(item => {
    return {
      id: item.id,
      titulo: item.titulo,
      detalles: item.detalles
    };
  });

  const handleToggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedUnits(unidades.map((unity) => unity.id));
    } else {
      setSelectedUnits([]);
    }
  };

  const handleToggleSelectUnity = (unityId) => {
    if (selectedUnits.includes(unityId)) {
      setSelectedUnits(selectedUnits.filter((id) => id !== unityId));
    } else {
      setSelectedUnits([...selectedUnits, unityId]);
    }
  };

  const handleDeleteSelectedUnits = () => {
    // Lógica para eliminar las unidades de medidas seleccionadas
    console.log("Eliminar las unidades de medidas seleccionadas:", selectedUnits);

    mostrarConfirmacionParaEliminar(selectedUnits);
    setSelectedUnits([]);
    setSelectAll(false);
  };

  // Función para manejar la eliminación de una unidad de medida
  const handleDeleteUnity = (unityId) => {
    mostrarConfirmacionParaEliminarSolo(unityId);
    // Lógica para eliminar la unidad de medida con el ID proporcionado
    console.log(`Eliminar unidad de medida con ID ${unityId}`);
  };

  // Función para manejar la modificación de una unidad de medida
  const handleEditUnity = (unityId) => {
    // Lógica para modificar la unidad de medida con el ID proporcionado
    console.log(`Modificar unidad de medida con ID ${unityId}`);

    console.log("categoryId: ",unityId)
    setEditUnidadId(unityId);
    //  editCategoryId=categoryId;
    console.log("editCategoryId: ", editUnidadId); // Agregar este console.log
    setShowEditForm(true);
  };

  const handleInsertUnity = () => {
    // Lógica para insertar una nueva unidad de medida
    console.log("Insertar nueva unidad de medida");
    setShowInsertForm(true); // Mostrar el formulario al hacer clic en el botón "Insertar unidad de medida"
  };

  const handleFormSubmit = (formData) => {
    // Lógica para enviar el formulario
    console.log("Datos del formulario:", formData);
    if (showInsertForm) {
      // Lógica para enviar el formulario de inserción
    } else if (showEditForm) {
      UpdateUnitForm.unidad_id=editUnidadId; // Pasar undefined si editCategoryId es vacío
      // Lógica para enviar el formulario de edición
    }
    setShowInsertForm(false);
    setShowEditForm(false);

  };
  function mostrarConfirmacionParaEliminarSolo(unidad_id) {
    let confirmacion = window.confirm("Estas seguro que desea eliminar esta categoría ?");

    if (confirmacion) {
      fetch(`${url}${parte_de_la_url_unidades_eliminar}${unidad_id}`+'/', {
        method: 'DELETE'
      })
          .then((response) => {
            if (response.ok) {
              // Producto eliminado correctamente, recargar la página
              fetch_data(`${url}${parte_de_la_url_unidades}`);
              window.location.reload();
            } else {
              console.error('Error al eliminar la unidad de medida');
            }
            /*  if (response.bool === true) {
                  fetch_data(`${url}${parte_de_la_url_productos}`);
                  window.location.reload();
              }*/
          });
    }
  }
  function mostrarConfirmacionParaEliminar(unidades_ids) {
    let confirmacion = window.confirm("¿Estás seguro que deseas eliminar estas categorías?");
    if (confirmacion) {
      unidades_ids.forEach(unidad_id => {
        fetch(`${url}${parte_de_la_url_unidades_eliminar}${unidad_id}/`, {
          method: 'DELETE'
        })
            .then((response) => {
              if (response.ok) {
                fetch_data(`${url}${parte_de_la_url_unidades}`);
              } else {
                console.error(`Error al eliminar la unidad con ID ${unidad_id}`);
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
      <h2 className="mb-7">Gestionar Unidades de medida</h2>
      <div className="mb-4 flex">
        <button
          onClick={handleInsertUnity}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4 flex items-center"
        >
          <FaPlus className="text-white mr-2" /> Insertar
        </button>
        {selectedUnits.length > 0 && (
          <button
            onClick={handleDeleteSelectedUnits}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <FaTrash className="text-white mr-2" /> Eliminar (
            {selectedUnits.length})
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
          {unidades.map((unity) => (
            <tr key={unity.id}>
              <td className="border px-4 py-2">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-500"
                  checked={selectedUnits.includes(unity.id)}
                  onChange={() => handleToggleSelectUnity(unity.id)}
                />
              </td>
              <td className="border px-4 py-2">{unity.titulo}</td>
              <td className="border px-4 py-2">{unity.detalles}</td>
              <td className="px-4 py-2">
                {/* Botones de eliminar y modificar con íconos */}
                <button
                  onClick={() => handleEditUnity(unity.id)}
                  className="text-blue-600 mr-3 hover:text-blue-900"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteUnity(unity.id)}
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
                  <UnityForm
                      onSubmit={handleFormSubmit}
                      onCancel={handleCancelForm}
                      isEditForm={false}
                  />
              ) : (
                  console.log("Valor de editCategoryId:", editUnidadId),
                      // Formulario de edición
                      <UpdateUnitForm
                          onSubmit={handleFormSubmit}
                          onCancel={handleCancelForm}
                          unidad_id={editUnidadId || undefined} // Pasar undefined si editCategoryId es vacío

                          isEditForm={true}
                      />
              )}
            </div>
              </div>
      )}
    </div>
  );
};

export default ManageUnits;

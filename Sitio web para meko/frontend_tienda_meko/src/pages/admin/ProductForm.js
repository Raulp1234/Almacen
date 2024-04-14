import React, { useState, useEffect } from "react";

const ProductForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    // Define los campos del formulario y su estado inicial
    name: "",
    description: "",
    quantity: "",
    priceMN: "",
    priceUSD: "",
    category: "",
    unitOfMeasure: "",
    mainImage: null, // Campo para la imagen principal
    galleryImages: [] // Campo para la galería de imágenes
  });

  const [categories, setCategories] = useState([]);
  const [unitsOfMeasure, setUnitsOfMeasure] = useState([]);

  useEffect(() => {
    // Llamada al backend para obtener las categorías
    fetchCategories()
      .then(data => setCategories(data))
      .catch(error => console.error("Error al obtener categorías:", error));

    // Llamada al backend para obtener las unidades de medida
    fetchUnitsOfMeasure()
      .then(data => setUnitsOfMeasure(data))
      .catch(error => console.error("Error al obtener unidades de medida:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const fetchCategories = async () => {
    // Simulando la llamada al backend para obtener las categorías
    return ["Categoría 1", "Categoría 2", "Categoría 3"];
  };

  const fetchUnitsOfMeasure = async () => {
    // Simulando la llamada al backend para obtener las unidades de medida
    return ["Unidad 1", "Unidad 2", "Unidad 3"];
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="col-span-2 flex items-center justify-center">
        <h2 className="text-3xl font-bold mb-4">Insertar Producto</h2>
      </div>
      <div>
        {/* Campos del formulario */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 border-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Descripción</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 border-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="priceMN" className="block text-gray-700 font-bold mb-2">Precio MN</label>
          <input
            type="number"
            id="priceMN"
            name="priceMN"
            value={formData.priceMN}
            onChange={handleChange}
            min="0"
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 border-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="priceUSD" className="block text-gray-700 font-bold mb-2">Precio USD</label>
          <input
            type="number"
            id="priceUSD"
            name="priceUSD"
            value={formData.priceUSD}
            onChange={handleChange}
            min="0"
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 border-2"
          />
        </div>
      </div>
      <div>
        {/* Campos restantes del formulario */}
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-gray-700 font-bold mb-2">Cantidad</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="0"
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 border-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Categoría</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 border-2"
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="unitOfMeasure" className="block text-gray-700 font-bold mb-2">Unidad de Medida</label>
          <select
            id="unitOfMeasure"
            name="unitOfMeasure"
            value={formData.unitOfMeasure}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 border-2"
          >
            <option value="">Selecciona una unidad de medida</option>
            {unitsOfMeasure.map((unit, index) => (
              <option key={index} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
        {/* Campo para la imagen principal */}
        <div className="mb-4">
          <label htmlFor="mainImage" className="block text-gray-700 font-bold mb-2">Añadir imagen principal</label>
          <input
            type="file"
            id="mainImage"
            name="mainImage"
            accept="image/*"
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        {/* Campo para la galería de imágenes */}
        <div className="mb-4">
          <label htmlFor="galleryImages" className="block text-gray-700 font-bold mb-2">Añadir galería de imágenes</label>
          <input
            type="file"
            id="galleryImages"
            name="galleryImages"
            accept="image/*"
            multiple // Permite seleccionar múltiples archivos
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      {/* Botones de acción */}
      <div className="col-span-2 md:col-span-2 flex justify-center">
        <button type="button" onClick={onCancel} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">
          Cancelar
        </button>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Guardar
        </button>
      </div>
    </form>
  );
};

export default ProductForm;

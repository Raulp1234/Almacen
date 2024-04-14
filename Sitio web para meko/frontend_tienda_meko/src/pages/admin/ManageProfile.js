import React, { useState } from 'react';
import { FaEdit, FaCheck } from 'react-icons/fa';

const ManageProfile = () => {
  const [editMode, setEditMode] = useState({
    name: false,
    lastName: false,
    email: false,
    phone: false,
    address: false,
    username: false,
    profilePicture: false
  });

  const [userData, setUserData] = useState({
    name: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    address: '123 Main St, City',
    username: 'johndoe',
    profilePicture: 'profile.jpg'
  });

  const handleToggleEditMode = (field) => {
    setEditMode({ ...editMode, [field]: !editMode[field] });
  };

  const handleConfirmEdit = (field) => {
    setEditMode({ ...editMode, [field]: false });
  };

  const handleChange = (e, field) => {
    setUserData({ ...userData, [field]: e.target.value });
  };

  const isValidEmail = (email) => {
    // Expresión regular para validar un correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const renderField = (field, label) => {
    return (
      <div className="flex items-center mt-4">
        {editMode[field] && (
          <button onClick={() => handleConfirmEdit(field)} className="px-3 py-1 text-blue-700 rounded-md"><FaCheck /></button>
        )}
        {!editMode[field] && (
          <button onClick={() => handleToggleEditMode(field)} className="px-3 py-1 text-blue-600 hover:text-blue-900 rounded-md"><FaEdit /></button>
        )}
        {editMode[field] ? (
          field === 'profilePicture' ? (
            <input
              type="file"
              onChange={(e) => handleConfirmEdit(field)}
              className="border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 border-2 ml-2"
            />
          ) : (
            <input
              type={field === 'phone' ? 'tel' : 'text'}
              value={userData[field]}
              onChange={(e) => handleChange(e, field)}
              className="border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 border-2 ml-2"
            />
          )
        ) : (
          <>
            {field === 'email' && (
              <span className={`ml-2 ${isValidEmail(userData.email) ? 'text-green-500' : 'text-red-500'}`}>{userData[field]}</span>
            )}
            {field !== 'email' && (
              <span className="ml-2">{userData[field]}</span>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="m-8 fade-in">
      <h2 className="text-2xl font-semibold mb-4">Gestionar Perfil</h2>
      <div className="space-y-4">
        <div>
          <label className="w-24">Nombre:</label>
          {renderField('name')}
        </div>
        <div>
          <label className="w-24">Apellido:</label>
          {renderField('lastName')}
        </div>
        <div>
          <label className="w-24">Email:</label>
          {renderField('email')}
        </div>
        <div>
          <label className="w-24">Telefono:</label>
          {renderField('phone')}
        </div>
        <div>
          <label className="w-24">Direccion:</label>
          {renderField('address')}
        </div>
        <div>
          <label className="w-24">Usuario:</label>
          {renderField('username')}
        </div>
        <div>
          <label className="w-24">Foto de Perfil:</label>
          {renderField('profilePicture')}
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;

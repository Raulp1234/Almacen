import React, {useEffect, useState} from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const ProfilePage = () => {
 /* const initialUserData = {
    username: "johndoe",
    email: "john.doe@example.com",
    password: "********", // Contraseña cifrada por defecto
    name: "John",
    lastName: "Doe",
    phone: "12345678",
    address: "123 Main St, City",
    profilePicture: "",
  };*/

  const [PerfilData,setPerfilData] = useState({
    'nombre':'',
    'apellidos':'',
    'usuario':'',
    'telefono':'',
    'direccion':'',
    'correo':'',
    'imagen':'',
  });

  const [ContrasenhaData,setContrasenhaData] = useState({
    'contrasenha':'',
    'confirmar_contrasenha':'',
  });



  const vendedor_id=localStorage.getItem('vendedor_id');
  const [url, setUrl] = useState('http://127.0.0.1:8000/api');
  const parte_de_la_url = '/vendedor/'+vendedor_id+"/";
  const parte2_de_la_url = '/usuario/';
  const parte_de_la_url_cambiar_contraseña = '/vendedor-cambiar-contrasenha/'+vendedor_id+"/";

  const [ConfirmacionError, setConfirmacionError] = useState(false);
  const [ConfirmacionCambio, setConfirmacionCambio] = useState(false);

  //const [userData, setUserData] = useState(initialUserData);
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  /*const handleChange = (e, field) => {
    const value = e.target.value;
    if (field === "phone") {
      // Verificar si el valor es un número y tiene máximo 8 dígitos
      if (!isNaN(value) && value.length <= 8) {
        setUserData({ ...userData, [field]: value });
        if (value.length !== 8) {
          setPhoneError(
            "Por favor, ingrese un número de teléfono válido de exactamente 8 dígitos"
          );
        } else {
          setPhoneError("");
        }
      }
    } else {
      // Para otros campos, simplemente actualizar el estado con el valor ingresado
      setUserData({ ...userData, [field]: value });
    }
  
    if (field === "email") {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setEmailError(
        isValidEmail ? "" : "Por favor, ingrese un correo electrónico válido"
      );
    }
  };*/
  

  /*const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos actualizados:", userData);
    setEditMode(false);
  };*/

  const inputHandlerPassword = (event) => {
    setContrasenhaData({
      ...ContrasenhaData,
      [event.target.name]:event.target.value
    });
  };

  const submitHandler = (event) => {
    const formData=new FormData();
    // formData.append('user', idvendedor_id);
    formData.append('user', PerfilData.user_id);
    formData.append('telefono', PerfilData.telefono);
    formData.append('direccion', PerfilData.direccion);
    // formData.append('imagen_perfil', PerfilData.imagen_perfil);

    // Verificar si se ha seleccionado una nueva imagen
    if (PerfilData.imagen_perfil instanceof File) {
      formData.append('imagen_perfil', PerfilData.imagen_perfil);
    }

    axios.put(`${url}${parte_de_la_url}`,formData,{
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(function (response){
          console.log("response: ",response);
        })
        .catch(function (error){
          console.log(error.response.data);
        });

    const formUserData=new FormData();
    formUserData.append('first_name', PerfilData.nombre);
    formUserData.append('last_name', PerfilData.apellidos);
    formUserData.append('email', PerfilData.correo);
    formUserData.append('username', PerfilData.usuario);
    

    axios.put(`${url}${parte2_de_la_url}${PerfilData.user_id}`+"/",formUserData,{
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(function (response){
          console.log(response);
        })
        .catch(function (error){
          console.log(error);
        });

    if(ContrasenhaData.contrasenha!==ContrasenhaData.confirmar_contrasenha){
      setConfirmacionError(true);
      setConfirmacionCambio(false);
    }
    else{
      setConfirmacionError(false);
      setConfirmacionCambio(true);


      const formData3=new FormData();
      formData3.append('contrasenha', ContrasenhaData.contrasenha);

    axios.post(`${url}${parte_de_la_url_cambiar_contraseña}`,formData3,{
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(function (response){
          console.log("response: ",response);
          window.location.reload();
        })
        .catch(function (error){
          console.log(error.response.data);
        });

    }
  };


  const inputHandlerPhone = (event) => {
    const value = event.target.value;

    if (!isNaN(value) && value.length <= 8) {
      setPerfilData({
        ...PerfilData,
        [event.target.name]:event.target.value
      })
      if (value.length !== 8) {
        setPhoneError(
            "Por favor, ingrese un número de teléfono válido de exactamente 8 dígitos"
        );
      } else {
        setPhoneError("");
      }
    }
  };

  const handleCancel = () => {
    //setUserData(initialUserData);
    //fetch_data(`${url}${parte_de_la_url}`);
    window.location.reload();
    setEditMode(false);
    setPhoneError("");
    setEmailError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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


  const inputHandler = (event) => {
    setPerfilData({
      ...PerfilData,
      [event.target.name]:event.target.value
    })
  };

  const fileHandler = (event) => {
    setPerfilData({
      ...PerfilData,
      [event.target.name]:event.target.files[0]
    })
  };

  return (
    <div className="m-8 fade-in">
      <h2 className="text-2xl font-semibold mb-4">Gestionar Perfil</h2>
      {
          ConfirmacionError &&
          <p className={"text-danger text-2xl font-semibold mb-4"}>Las contraseñas no coinciden</p>
      }
      {
          !ConfirmacionError && ConfirmacionCambio &&
          <p className={"text-success text-2xl font-semibold mb-4"}>Datos actualizados con éxito</p>
      }
      <form>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Nombre de usuario:</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              value={PerfilData.usuario}
              onChange={inputHandler}
              className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:border-blue-500"
              disabled={!editMode}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={PerfilData.correo}
              onChange={inputHandler}
              className={`border border-gray-300 rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:border-blue-500 ${
                emailError ? "border-red-500" : ""
              }`}
              disabled={!editMode}
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>

          <div>
            <label>Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={PerfilData.nombre}
              onChange={inputHandler}
              className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:border-blue-500"
              disabled={!editMode}
            />
          </div>
          <div>
            <label>Apellido:</label>
            <input
              type="text"
              id="apellidos"
              name="apellidos"
              value={PerfilData.apellidos}
              onChange={inputHandler}
              className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:border-blue-500"
              disabled={!editMode}
            />
          </div>
          <div>
            <label>Teléfono:</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={PerfilData.telefono}
              onChange={inputHandlerPhone}
              className={`border border-gray-300 rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:border-blue-500 ${
                phoneError ? "border-red-500" : ""
              }`}
              disabled={!editMode}
            />
            {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
          </div>
          <div>
            <label>Dirección:</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={PerfilData.direccion}
              onChange={inputHandler}
              className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:border-blue-500"
              disabled={!editMode}
            />
          </div>


          <div>
            <label>Nueva contraseña:</label>
            <div className="relative">
              <input
                  id="contrasenha"
                  name="contrasenha"
                  type={showPassword ? "text" : "password"}
                  value={ContrasenhaData.contrasenha}
                  onChange={inputHandlerPassword}
                  className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:border-blue-500 pr-10"
                  disabled={!editMode}
              />
              <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 px-3 py-2 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label>Confirmar contraseña:</label>
            <div className="relative">
              <input
                  id="confirmar_contrasenha"
                  name="confirmar_contrasenha"
                  type={showPassword ? "text" : "password"}
                  value={ContrasenhaData.confirmar_contrasenha}
                  onChange={inputHandlerPassword}
                  className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:border-blue-500 pr-10"
                  disabled={!editMode}
              />
              <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 px-3 py-2 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/*<div>
            <label>Foto de perfil:</label>
            <input
                id="imagen_perfil" name="imagen_perfil"
              type="file"
              accept="image/*"
                onChange={fileHandler}
              className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:border-blue-500"
              disabled={!editMode}
            />
          </div>

        </div>*/}
          <div className="mb-4">
            <label htmlFor="imagen_perfil" className="block text-gray-700 font-bold mb-2">Añadir imagen principal</label>
            <input className="form-control" type="file" id="imagen_perfil" name="imagen_perfil" onChange={fileHandler} disabled={!editMode}/>
            <p>
              {PerfilData.imagen_perfil && (
                  <img
                      src={typeof PerfilData.imagen_perfil === 'string' ? PerfilData.imagen_perfil : URL.createObjectURL(PerfilData.imagen_perfil)}
                      width={"100"}
                      className={"mt-2 rounded"}
                      alt="Vista previa"
                  />
              )}

            </p>

          </div>
        </div>

        <div className="mt-4">
          {!editMode ? (
            <button
              type="button"
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Editar
            </button>
          ) : (
            <div>
              <button  onClick={submitHandler}
                type="button"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
              >
                Guardar cambios
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;

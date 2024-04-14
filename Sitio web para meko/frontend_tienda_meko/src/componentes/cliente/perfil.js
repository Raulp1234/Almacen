import Barra_lateral from "./barra_lateral";
import {useEffect, useState} from "react";
import axios from "axios";
function Perfil (){

    const [PerfilData,setPerfilData] = useState({
        'nombre':'',
        'apellidos':'',
        'usuario':'',
        'telefono':'',
        'correo':'',
        'imagen':'',
    });

    const cliente_id=localStorage.getItem('cliente_id');
    const [url, setUrl] = useState('http://127.0.0.1:8000/api');
    const parte_de_la_url = '/cliente/'+cliente_id+"/";
    const parte2_de_la_url = '/usuario/';

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

    const submitHandler = (event) => {
        const formData=new FormData();
        formData.append('user', PerfilData.user_id);
        formData.append('telefono', PerfilData.telefono);
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
    };

    return (
        <div className={"container mt-4"}>
            <div className={"row"}>
                <div className={"col-md-3 col-12 mb-2"}>
                    <Barra_lateral/>
                </div>

              <div className={"col-md-9 col-12 mb-2"}>
                  <h3 className={"mb-3"}>Bienvenido <span className={"text-primary"}>{PerfilData.usuario}</span></h3>
                <div className={"card"}>
                    <h4 className={"card-header"}>Actualizar perfil</h4>

                    <div className={"card-body"}>
                        <form encType="multipart/form-data" method="post">
                        <div className="mb-3">
                            <label htmlFor="Nombre" className="form-label">Nombre:</label>
                            <input type="text" className="form-control" id="Nombre" name="nombre" value={PerfilData.nombre} onChange={inputHandler}
                                   placeholder="Escriba su nombre"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Apellido" className="form-label">Apellidos:</label>
                            <input type="text" className="form-control" id="Apellido" name="apellidos" value={PerfilData.apellidos} onChange={inputHandler}
                                   placeholder="Escriba sus apellidos"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Correo" className="form-label">Correo:</label>
                            <input type="email" className="form-control" id="Correo" name="correo" value={PerfilData.correo} onChange={inputHandler}
                                   placeholder="Escriba su correo"/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Telefono" className="form-label">Teléfono:</label>
                            <input type="number" className="form-control" id="Telefono" name="telefono" value={PerfilData.telefono} onChange={inputHandler}
                                   placeholder="Escriba su teléfono"/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Usuario" className="form-label">Usuario:</label>
                            <input type="text" className="form-control" id="Usuario" name="usuario" value={PerfilData.usuario} onChange={inputHandler}
                                   placeholder="Escriba su nombre de usuario"/>
                        </div>
                            <div className="mb-3">
                                <div className="mb-3">
                                    <label htmlFor="foto" className="form-label">Foto de perfil:</label>
                                    <input className="form-control" type="file" id="foto" name="imagen_perfil" onChange={fileHandler} />
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
                    </form>
                        <div className="mb-3">
                            <button type={"button"} className={"btn btn-primary"} onClick={submitHandler}>Actualizar</button>
                        </div>
                    </div>
                </div>
            </div>

            </div>
        </div>
    );
}
export default Perfil;

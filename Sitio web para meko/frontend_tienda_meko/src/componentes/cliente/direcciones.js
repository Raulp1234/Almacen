import {Link} from 'react-router-dom';
import Barra_lateral from "./barra_lateral";
import {useEffect, useState} from "react";
import axios from "axios";
function Direcciones (){

    const cliente_id=localStorage.getItem('cliente_id');
    const [url, setUrl] = useState('http://127.0.0.1:8000/api');
    const parte_de_la_url = '/cliente/'+cliente_id+'/lista-direcciones/';
    const [DireccionListaData,setDireccionListaData] = useState([]);


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
                setDireccionListaData(data.results); // Utiliza setProductoData para actualizar el estado
            })
            .catch((error,data) => {
                console.error("Error fetching data:", error);
            });
    }
    
    function seleccionarDireccionPorDefecto(direccion_id) {
        const formData=new FormData();
     //   formData.append('cliente', parseInt(cliente_id));
     //   formData.append('direccion', direccion);
        formData.append('direccion_id',direccion_id);

        const parteUrl = '/direccion-por-defecto/'+parseInt(direccion_id)+'/';


        axios.post(`${url}${parteUrl}`,formData)
            .then(function (response){
           //     if (response.data.bool==="True"){
                if (response.data.bool===true){
                    window.location.reload();
                }
                else {


                }
            })
            .catch(function (error){
                console.log(error.response.data);
            });
    }

    return (
        <div className={"container mt-4"}>
            <div className={"row"}>
                <div className={"col-md-3 col-12 mb-2"}>
                    <Barra_lateral/>
                </div>

                    <div className={"col-md-9 col-12 mb-2"}>
                        <div className={"row"}>
                            <div className={"col-12"}>
                               <Link className={"btn btn-outline-dark mb-4 float-end"} to={"/cliente/agregar_nueva_direccion"}>
                                   <i className={"fa fa-plus-circle"}></i> Agregar nueva dirección

                               </Link>
                            </div>
                        </div>

                            <div className={"row"}>
                                {
                                    DireccionListaData.map((item, index)=>{
                                        return <div className={"col-4 mb-4"} key={index}>
                                            <div className={"card"}>
                                                <div className={"card-body text-muted"}>
                                                    <h6>
                                                        {
                                                            item.default_direccion === true &&
                                                            <span role={"button"}><i className={"fa fa-check-circle text-success mb-2"}></i><br/></span>

                                                        }
                                                        {
                                                            !item.default_direccion &&
                                                            <span role={"button"} onClick={()=>seleccionarDireccionPorDefecto(item.id)}><i className={"fa fa-check-circle text-secondary mb-2"}></i><br/></span>
                                                        }

                                                            <Link to={`/cliente/actualizar-direccion/${item.id}`} className={"page-link"}>{item.direccion}</Link>

                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                    </div>
            </div>
        </div>
    );
}
export default Direcciones;

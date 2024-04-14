import {Link} from 'react-router-dom';
import Barra_lateral_como_vendedor from "./barra_lateral_como_vendedor";
import {useEffect, useState} from "react";

import React, { Component } from "react";
//import Chart from "react-apexcharts";

function Reportes_diario_como_vendedor (){

    const base_url = 'http://127.0.0.1:8000/api';
    const parte_de_la_url_vendedor = '/vendedor/';
    const vendedor_id=localStorage.getItem('vendedor_id');
    const parte2_de_la_url_reporte_diario='/reporte-diario/';

    const [Datos,setDatos] = useState([]);
    const [Fechas,setFechas] = useState([]);
    const [Productos_del_pedido,setProductos_del_pedido] = useState([]);

    useEffect(() => {
        fetch_data(`${base_url}${parte_de_la_url_vendedor}${vendedor_id}${parte2_de_la_url_reporte_diario}`);
    },[]);

    function fetch_data(url) {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setDatos(data.data)
                setFechas(data.dates)
                console.log("dates: ", data.dates);
                console.log("data: ", data.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    const chartOpciones={
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: Fechas
              //  categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
            }
        },
        series: [
            {
                name: "series-1",
                data:Datos
             //   data: [30, 40, 45, 50, 49, 60, 70, 91]
            }
        ]
    };

   // const chart_elemento= <Chart options={chartOpciones.options} series={chartOpciones.series} type="bar" width="500"/>

    return (
        <div className={"container mt-4"}>
            <div className={"row"}>
                <div className={"col-md-3 col-12 mb-2"}>
                    <Barra_lateral_como_vendedor/>
                </div>

                <div className={"col-md-9 col-12 mb-2"}>
                    <h3>Reporte diario</h3>
                    <div className={"row"}>
                        {/* {chart_elemento}*/}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Reportes_diario_como_vendedor;

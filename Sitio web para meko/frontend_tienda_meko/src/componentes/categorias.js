import logo from "../logo.svg";
import {Link} from 'react-router-dom';
import {useEffect, useState} from "react";

function Categorias(){

    const [url, setUrl] = useState('http://127.0.0.1:8000/api');
    const parte_de_la_url = "/categorias/";
    const parte_de_la_url_productos = "/productos/";
    const [Categorias,setCategorias] = useState([]);
    const [Productos,setProductos] = useState([]);
    const [TotalResultados,setTotalResultados] = useState(0);

    useEffect(() => {
        fetch_data(`${url}${parte_de_la_url}`);
        fetch_data_productos(`${url}${parte_de_la_url_productos}`);
    },[]);

    function fetch_data_productos(url) {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setProductos(data.results);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }
    function fetch_data(url) {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setCategorias(data.results);
                setTotalResultados(data.count);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    function cambiarUrl(url){
        fetch_data(url);
    }

    let links = [];
    const limite = 5;
    const total_links = Math.ceil(TotalResultados / limite); // Usar Math.ceil para redondear hacia arriba

    for (let i = 1; i <= total_links; i++) {
        links.push(
            <li className="page-item" key={i}>
                <Link className="page-link" onClick={() => cambiarUrl(`${url}/categorias/?page=${i}`)}>{i}</Link>
            </li>
        );
    }

    function contarProductosPorCategoria(productos, categoriaId) {
        let cantidad = 0;

        // Recorrer todos los productos
        for (let i = 0; i < productos.length; i++) {
            const producto = productos[i];
            console.log("producto: ",producto)
            // Verificar si el producto pertenece a la categoría deseada
            if (producto.categoria.id === categoriaId) {
                cantidad++;
            }
        }
        console.log("cantidad: ",cantidad)
        return cantidad;
    }
    return (

        <section className={"container mt-4"}>
            <h3 className="mb-4">Todas las categorías</h3>
            <div className="row mb-4">

                {
                    Categorias.map((categoria)=>
                        <div  key={categoria.id} className="col-12 col-md-3 mb-4">
                            <div className="card shadow">
                                {/*<img src={logo} className="card-img-top" alt={categoria.titulo}/>*/}
                                <div className="card-body">
                                    <h4 className="card-title"><Link to={`/categoria/${categoria.titulo}/${categoria.id}`}>{categoria.titulo}</Link></h4>
                                </div>
                                <div className="card-footer">
                                    Cantidad de productos: {contarProductosPorCategoria(Productos, categoria.id)}
                                </div>
                            </div>
                        </div>
                    )

                }


                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <ul className="pagination">
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            {links}
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </ul>
                </nav>
            </div>

        </section>
    );
}
export default Categorias;
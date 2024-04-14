import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import Producto_solo from "../componentes/producto_solo";
import {useState,useEffect} from 'react'

function Productos_de_la_categoria(){
    const [url, setUrl] = useState('http://127.0.0.1:8000/api');
    const {categoria_slug,categoria_id} = useParams();
    const parte_de_la_url = "/productos/?categoria="+categoria_id;
    const [Productos,setProductos] = useState([]);
    const [TotalResultados,setTotalResultados] = useState(0);




    useEffect(() => {
        console.log("ver" ,parte_de_la_url)
        fetch_data(`${url}${parte_de_la_url}`);
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
                setProductos(data.results);
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
    let limite = 1;
    let total_links = TotalResultados/limite;
    for (let i = 1; i <= total_links; i++) {
        links.push(
            <li className="page-item"><Link to={`/categoria/${categoria_slug}/${categoria_id}/?page=${i}`} className="page-link" onClick={() => cambiarUrl(`${url}/productos/?categoria=${categoria_id}&page=${i}`)} >{i}</Link></li>
        );
    }

    return (
        <section className={"container mt-4"}>
            <h3 className={"mb-4"}>Productos de la categoría {categoria_slug}</h3>
            <div className="row mb-4">
                {
                    Productos.map((producto)=><Producto_solo key={producto.id} producto_x={producto}/>)
                }
            </div>


            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-start">
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

        </section>

    );
}
export default Productos_de_la_categoria;

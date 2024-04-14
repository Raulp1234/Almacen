import {Link} from 'react-router-dom';
function Producto_solo_relacionado(props){

    // Verifica que props.producto_x esté definido antes de acceder a sus propiedades
    if (!props.producto_x) {
        return null; // O cualquier otro componente de carga o mensaje de error que desees mostrar
    }

    return (
            <div className="col-2  offset-5 mb-4 align-content-center">
                <div className="card shadow" >
                    <Link to={`/producto/${props.producto_x.slug}/${props.producto_x.id}`}> <img src={props.producto_x.imagen} className="card-img-top" alt="..."/></Link>
                    <div className="card-body">
                           <Link to={`/producto/${props.producto_x.titulo}/${props.producto_x.id}`}>  <h4 className="card-title">{props.producto_x.titulo}</h4></Link>
                        <h5 className="card-title text-muted">Precio: <span className={"text-muted"}>$ {props.producto_x.precio}</span></h5>
                    </div>
                    <div className="card-footer">
                        <button className='btn btn-success btn-sm' title={"Agregar al carrito"}><i className="fa-solid fa-cart-plus fa-2x"></i></button>
                        <button className='btn btn-danger btn-sm ms-1' title={"Agregar a lista de deseos"}><i className="fa-solid fa-heart fa-2x"></i></button>
                    </div>
                </div>
            </div>
    );
}
export default Producto_solo_relacionado;
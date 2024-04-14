import {Link} from 'react-router-dom';
function Barra_lateral (){
    return (
        <div className="list-group">
            <Link to={'/cliente/dashboard'} className="list-group-item list-group-item-action active">Dashboard</Link>
            <Link to={'/cliente/pedidos'} className="list-group-item list-group-item-action">Pedidos</Link>
            <Link to={'/cliente/lista_de_deseos'} className="list-group-item list-group-item-action">Lista de deseos</Link>
            <Link to={'/cliente/perfil'} className="list-group-item list-group-item-action">Perfil</Link>
            <Link to={'/cliente/cambiar_contraseña'} className="list-group-item list-group-item-action">Cambiar contraseña</Link>
            <Link to={'/cliente/direcciones'} className="list-group-item list-group-item-action">Direcciones</Link>
            <Link to={'/cerrar-sesion'} className="list-group-item list-group-item-action text-danger">Cerrar sesión</Link>
        </div>
    );
}
export default Barra_lateral;
import {Link, NavLink} from 'react-router-dom';
function Barra_lateral_como_vendedor (){
    return (

        <div className="list-group">
            <NavLink exact to={'/vendedor/dashboard'} className="list-group-item list-group-item-action" activeClassName="active">Dashboard</NavLink>
            <NavLink exact to={'/vendedor/productos'} className="list-group-item list-group-item-action" activeClassName="active">Productos</NavLink>
            <NavLink exact to={'/vendedor/nuevo-producto'} className="list-group-item list-group-item-action" activeClassName="active">Agregar nuevo producto</NavLink>
            <NavLink exact to={'/vendedor/unidad-medida'} className="list-group-item list-group-item-action" activeClassName="active">Agregar nueva unidad de medida</NavLink>
            <NavLink exact to={'/vendedor/categoria'} className="list-group-item list-group-item-action" activeClassName="active">Agregar nueva categoría</NavLink>

            {/* Comenta estas opciones si no deseas que se muestren */}
            {/* <NavLink exact to={'/vendedor/pedidos-vendedor'} className="list-group-item list-group-item-action" activeClassName="active">Pedidos</NavLink>
            <NavLink exact to={'/vendedor/clientes-vendedor'} className="list-group-item list-group-item-action" activeClassName="active">Clientes</NavLink>
            <NavLink exact to={'/vendedor/reportes-vendedor'} className="list-group-item list-group-item-action" activeClassName="active">Reportes</NavLink> */}

            <NavLink exact to={'/vendedor/perfil'} className="list-group-item list-group-item-action" activeClassName="active">Perfil</NavLink>
            <NavLink exact to={'/vendedor/cambiar-contraseña'} className="list-group-item list-group-item-action" activeClassName="active">Cambiar contraseña</NavLink>

            <NavLink exact to={'/vendedor/cerrar-sesion'} className="list-group-item list-group-item-action text-danger" >Cerrar sesión</NavLink>
        </div>


    );
}
export default Barra_lateral_como_vendedor;
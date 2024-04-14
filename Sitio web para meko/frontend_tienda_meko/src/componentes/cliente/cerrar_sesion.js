
function Cerrar_sesion (){
    localStorage.removeItem('cliente_inicio_sesion');
    localStorage.removeItem('usuario_del_cliente');
    localStorage.removeItem('cliente_id');
    window.location.href='/iniciar-sesion'
}
export default Cerrar_sesion;

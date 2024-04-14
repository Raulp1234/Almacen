
function Cerrar_sesion_vendedor (){
    localStorage.removeItem('vendedor_inicio_sesion');
    localStorage.removeItem('usuario_del_vendedor');
    localStorage.removeItem('vendedor_id');
    window.location.href='/vendedor/iniciar-sesion'
}
export default Cerrar_sesion_vendedor;


function Logout (){
    localStorage.removeItem('vendedor_inicio_sesion');
    localStorage.removeItem('usuario_del_vendedor');
    localStorage.removeItem('vendedor_id');
    window.location.href='/'
}
export default Logout;

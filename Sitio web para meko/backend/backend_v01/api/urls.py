from django.urls import path
from rest_framework import routers

from api.serializers import listaUnidadesDeMedidaSerializer, detallesUnidadesDeMedidaSerializer

"""from api.deseos.views import lista_de_deseos_views, revisar_lista_de_deseos, cliente_productos_lista_deseos, \
    eliminar_de_lista_de_deseos
from api.pedidos.views import lista_de_pedidos, detalles_pedidos, actualizar_estado_del_pedido, \
    lista_de_productos_del_pedido, cliente_productos_pedidosOficial, vendedor_productos_pedidosOficial, \
    modificar_pedido_Vendedor, lista_clientes_del_Vendedor, productos_del_pedido_del_cliente_del_Vendedor, \
    eliminar_pedidos, mostrar_pedidos_diarios, cliente_productos_pedidos"""

"""from api.productos.views import detalles_categorias, lista_de_categorias, lista_de_etiquetas_productos, \
    lista_de_productos_relacionados, actualizar_descargas_del_producto, producto_imagenes, producto_imagenes_detalles, \
    producto_imagenes_detalles_eliminar, listaUnidadesDeMedida, detallesUnidadesDeMedida"""

"""from api.usuario.views import lista_de_vendedores, detalles_vendedores, lista_de_clientes, detalles_clientes, \
    lista_de_direcciones_clientes_ViewSet, cliente_iniciar_sesion, cliente_registrarse, detalles_usuarios, \
    cliente_lista_direcciones, direccion_de_cliente_por_defecto, cliente_dashboard, vendedor_registrarse, \
    vendedor_iniciar_sesion, vendedor_dashboard, cliente_cambiar_contrasenha, vendedor_cambiar_contrasenha"""

from api.productos.views import detalles_categorias, lista_de_categorias, \
    lista_de_productos_relacionados, producto_imagenes, producto_imagenes_detalles, \
    producto_imagenes_detalles_eliminar, listaUnidadesDeMedida, detallesUnidadesDeMedida

# from api.productos.views import lista_de_productos, detalles_productos, calificacion_productos_ViewSet
from api.productos.views import lista_de_productos, detalles_productos

# from api.usuario.views import lista_de_vendedores, detalles_vendedores, lista_de_clientes, detalles_clientes, \
#   lista_de_direcciones_clientes_ViewSet, detalles_usuarios, \
#  vendedor_registrarse, \
# vendedor_iniciar_sesion, vendedor_dashboard, vendedor_cambiar_contrasenha

from api.usuario.views import lista_de_vendedores, detalles_vendedores, \
    detalles_usuarios, \
    vendedor_registrarse, \
    vendedor_iniciar_sesion, vendedor_dashboard, vendedor_cambiar_contrasenha

router = routers.SimpleRouter()
# router.register('direccion', lista_de_direcciones_clientes_ViewSet)
# router.register('calificacion', calificacion_productos_ViewSet)

urlpatterns = [

    # vendedores

    path('vendedores/', lista_de_vendedores.as_view(), name='vendedores_process'),
    path('vendedor/<int:pk>/', detalles_vendedores.as_view(), name='vendedores_pk_process'),
    path('vendedor/iniciar-sesion', vendedor_iniciar_sesion, name='vendedor_iniciar_sesion'),
    path('vendedor/registrarse', vendedor_registrarse, name='cliente_registrarse'),
    # path('vendedor/<int:pk>/clientes/', lista_clientes_del_Vendedor.as_view(), name='lista_clientes_del_Vendedor'),
    # path('vendedor/<int:vendedor_id>/cliente/<int:cliente_id>/productos-pedidos/',
    #       productos_del_pedido_del_cliente_del_Vendedor.as_view(), name='productos_del_pedido_del_cliente_del_Vendedor'),
    path('vendedor/<int:pk>/dashboard/', vendedor_dashboard,
         name='vendedor_dashboard'),
    # path('vendedor/<int:vendedor_id>/reporte-diario/', mostrar_pedidos_diarios,
    #     name='vendedor-reporte-diario'),

    path('vendedor-cambiar-contrasenha/<int:vendedor_id>/', vendedor_cambiar_contrasenha,
         name='vendedor_cambiar_contrasenha'),

    # productos
    path('productos/', lista_de_productos.as_view(), name='productos_process'),
    path('producto/<int:pk>/', detalles_productos.as_view(), name='productos_pk_process'),
    #path('productos/<str:etiquetas>/', lista_de_etiquetas_productos.as_view(), name='productos-por-etiquetas'),
    path('productos-relacionados/<int:pk>/', lista_de_productos_relacionados.as_view(), name='productos-relacionados'),
    path('producto-imagenes/', producto_imagenes.as_view(), name='producto-imagenes'),
    path('producto-imagenes/<int:producto_id>', producto_imagenes_detalles.as_view(),
         name='producto_imagenes_detalles'),
    path('producto-imagenes-eliminar/<int:pk>', producto_imagenes_detalles_eliminar.as_view(),
         name='producto_imagenes_detalles_eliminar'),

    # categorias
    path('categorias/', lista_de_categorias.as_view(), name='categorias_process'),
    path('categoria/<int:pk>/', detalles_categorias.as_view(), name='categorias_pk_process'),

    # unidad_medida_productos
    path('todas_las_unidades_de_medida/', listaUnidadesDeMedida.as_view(), name='unidad_medida_productos_process'),
    path('unidad_medida_productos/<int:pk>/', detallesUnidadesDeMedida.as_view(),
         name='unidad_medida_productos_pk_process'),

    # clientes
    #  path('clientes/', lista_de_clientes.as_view(), name='clientes_process'),
    # path('cliente/<int:pk>/', detalles_clientes.as_view(), name='clientes_pk_process'),
    # path('cliente-cambiar-contrasenha/<int:cliente_id>/', cliente_cambiar_contrasenha,
    #    name='cliente_cambiar_contrasenha'),

    # path('clientes/iniciar-sesion', cliente_iniciar_sesion, name='cliente_iniciar_sesion'),
    # path('clientes/registrarse', cliente_registrarse, name='cliente_registrarse'),
    # path('cliente/<int:pk>/lista-direcciones/', cliente_lista_direcciones.as_view(),
    #  name='cliente_lista_direcciones'),
    path('usuario/<int:pk>/', detalles_usuarios.as_view(), name='usuario_pk_process'),

    # path('direccion-por-defecto/<int:pk>/', direccion_de_cliente_por_defecto,
    #     name='direccion-por-defecto'),
    # path('cliente/dashboard/<int:pk>/', cliente_dashboard,
    #     name='cliente-dashboard'),

    # pedidos
    # path('pedidos/', lista_de_pedidos.as_view(), name='pedidos_process'),
    # path('pedido-detalle/<int:pk>/', detalles_pedidos.as_view(), name='pedidos_pk_process'),
    # path('pedido-modificar/<int:pk>/', modificar_pedido_Vendedor.as_view(), name='modificar_pedido_Vendedor'),
    # path('pedido-eliminar/<int:cliente_id>/', eliminar_pedidos, name='pedido-eliminar'),
    # path('productos-pedidos/', lista_de_productos_del_pedido.as_view(), name='pedidos_productos_process'),

    # path('cliente/<int:pk>/productos-pedidos/', cliente_productos_pedidos.as_view(),
    #     name='cliente_productos_pedidos'),
    # path('cliente/<int:pk>/productos-pedidos/', cliente_productos_pedidosOficial.as_view(),
    #     name='cliente_productos_pedidos'),

    # vendedor_productos_pedidosOficial

    # path('vendedor/<int:pk>/productos-pedidos/', cliente_productos_pedidosOficial.as_view(),
    #     name='vendedor_productos_pedidos'),

    # path('actualizar-estado-pedido/<int:pedido_id>', actualizar_estado_del_pedido,
    # name='actualizar_estado_pk_process'),
    #  path('actualizar-total-descargas-producto/<int:producto_id>', actualizar_descargas_del_producto,
    #    name='actualizar_descargas_del_producto'),

    # lista de deseos

    #  path('lista-de-deseos/', lista_de_deseos_views.as_view(), name='lista-de-deseos'),
    # path('revisar-lista-de-deseos/', revisar_lista_de_deseos, name='revisar-lista-de-deseos'),
    # path('cliente/<int:pk>/productos-lista-de-deseos/', cliente_productos_lista_deseos.as_view(),
    #      name='productos-lista-de-deseos'),
    # path('eliminar-producto-de-lista-de-deseos/', eliminar_de_lista_de_deseos, name='eliminar_de_lista_de_deseos'),

]

urlpatterns += router.urls

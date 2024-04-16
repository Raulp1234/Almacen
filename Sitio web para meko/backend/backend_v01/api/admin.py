from django.contrib import admin

# Register your models here.
import api.productos.models
# from api.deseos.models import lista_de_deseos
# from api.pedidos.models import pedido, productos_del_pedido, productos_del_pedido_del_vendedor
# from api.usuario.models import vendedor, cliente, direccion_cliente
from api.usuario.models import vendedor
# from api.productos.models import categoria_productos, calificacion_productos, imagenes_productos
from api.productos.models import categoria_productos, unidad_medida_productos, imagenes_productos
from api.productos.models import producto

# from api.suscripcion.models import Suscripcion

admin.site.register(vendedor)
admin.site.register(categoria_productos)
admin.site.register(unidad_medida_productos)
# admin.site.register(producto)
# admin.site.register(pedido)
# admin.site.register(productos_del_pedido)
# admin.site.register(cliente)
# admin.site.register(direccion_cliente)
# admin.site.register(calificacion_productos)

admin.site.register(imagenes_productos)


# admin.site.register(productos_del_pedido_del_vendedor)

# admin.site.register(lista_de_deseos)

# class ClienteAdmin(admin.ModelAdmin):
#   list_display = ['get_username', 'telefono']

#  def get_username(self, obj):
#     return obj.user.username


# admin.site.register(cliente, ClienteAdmin)


class ImagenesProductosEnLinea(admin.StackedInline):
    model = imagenes_productos


class ProductosAdmin(admin.ModelAdmin):
    #  list_display = ['titulo', 'precio', 'precioUSD', 'descargas']
    list_display = ['titulo', 'precio', 'precioUSD']
    list_editable = ['precioUSD']
    #prepopulated_fields = {'slug': ('titulo',)}
    inlines = [
        ImagenesProductosEnLinea,
    ]


admin.site.register(producto, ProductosAdmin)

# class PedidosAdmin(admin.ModelAdmin):
#   list_display = ['id', 'cliente', 'fecha', 'estado', 'total_a_pagar', 'total_a_pagar_usd']


# admin.site.register(pedido, PedidosAdmin)


# class Productos_del_PedidosAdmin(admin.ModelAdmin):
#    list_display = ['id', 'pedidos', 'productos', 'cantidad', 'precio', 'precioUSD']


# admin.site.register(productos_del_pedido, Productos_del_PedidosAdmin)


# class lista_de_deseosAdmin(admin.ModelAdmin):
#   list_display = ['id', 'productos', 'clientes']


# admin.site.register(lista_de_deseos, lista_de_deseosAdmin)

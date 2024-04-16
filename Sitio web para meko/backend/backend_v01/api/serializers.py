from rest_framework import serializers

# from api.deseos.models import lista_de_deseos
# from api.pedidos.models import pedido, productos_del_pedido
# from api.productos.models import producto, calificacion_productos, categoria_productos, imagenes_productos
from api.usuario.models import vendedor
from api.productos.models import producto, categoria_productos, imagenes_productos, unidad_medida_productos
# from api.usuario.models import vendedor, cliente, direccion_cliente
from django.contrib.auth.models import User


# VENDEDOR
class vendedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = vendedor
        fields = ['id', 'user', 'direccion', 'telefono']

    def __init__(self, *args, **kwargs):
        super(vendedorSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1


class vendedorDetallesSerializer(serializers.ModelSerializer):
    class Meta:
        model = vendedor
        fields = ['id', 'user', 'direccion', 'telefono', 'imagen_perfil']

    def __init__(self, *args, **kwargs):
        super(vendedorDetallesSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = userSerializer(instance.user).data
        return response


# PRODUCTO

class listaProductosSerializer(serializers.ModelSerializer):
    # calificacion_producto = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = producto
        fields = ['id', 'categoria', 'vendedor', 'titulo', 'detalles', 'precio',
                  'imagen', 'precioUSD', 'cantidad', 'unidad_medida']

        """fields = ['id', 'categoria', 'vendedor', 'titulo', 'detalles', 'precio', 'slug', 'tag_list',
                  'imagen', 'precioUSD', 'etiquetas', 'cantidad', 'unidad_medida',
                  'estado_de_publicacion']"""

    def __init__(self, *args, **kwargs):
        super(listaProductosSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1


class imagenesProductosSerializer(serializers.ModelSerializer):
    class Meta:
        model = imagenes_productos
        fields = ['id', 'producto', 'imagen']


class detallesProductosSerializer(serializers.ModelSerializer):
    # calificacion_producto = serializers.StringRelatedField(many=True, read_only=True)
    imagen_producto = imagenesProductosSerializer(many=True, read_only=True)

    class Meta:
        model = producto
        fields = ['id', 'categoria', 'vendedor', 'titulo', 'detalles', 'precio',

                  'imagen_producto', 'imagen', 'precioUSD', 'cantidad', 'unidad_medida']

        """fields = ['id', 'categoria', 'vendedor', 'titulo', 'detalles', 'precio', 'slug', 'tag_list',

                  'imagen_producto', 'imagen', 'precioUSD', 'cantidad', 'unidad_medida',
                  'estado_de_publicacion', 'etiquetas']"""

    def __init__(self, *args, **kwargs):
        super(detallesProductosSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1


class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email']
    # fields = ['id', 'first_name', 'last_name', 'username', 'email', 'password']


# CLIENTE
"""
class clienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = cliente
        fields = ['id', 'user', 'telefono']

    def __init__(self, *args, **kwargs):
        super(clienteSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = userSerializer(instance.user).data
        return response


class clienteDetallesSerializer(serializers.ModelSerializer):
    class Meta:
        model = cliente
        fields = ['id', 'user', 'telefono', 'imagen_perfil']

    def __init__(self, *args, **kwargs):
        super(clienteDetallesSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = userSerializer(instance.user).data
        return response





class direccionClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = direccion_cliente
        fields = ['id', 'cliente', 'direccion', 'default_direccion']

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['cliente'] = clienteSerializer(instance.cliente).data
        return response"""

"""  def __init__(self, *args, **kwargs):
        super(direccionClienteSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1"""

# PEDIDO
"""
class pedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = pedido
        fields = ['id', 'cliente', 'fecha', 'estado', 'total_a_pagar', 'total_a_pagar_usd']

    def __init__(self, *args, **kwargs):
        super(pedidoSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1


class pedidoDetallesSerializer(serializers.ModelSerializer):
    class Meta:
        model = pedido
        fields = ['id', 'cliente', 'fecha', 'estado', 'total_a_pagar', 'total_a_pagar_usd']

    def __init__(self, *args, **kwargs):
        super(pedidoDetallesSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1"""

# PRODUCTOS DEL PEDIDO

"""
class productos_del_pedidoSerializer(serializers.ModelSerializer):
    # pedidos = pedidoSerializer()

    # productos = detallesProductosSerializer(source='productos', read_only=True)
    # productos = detallesProductosSerializer()

    class Meta:
        model = productos_del_pedido
        fields = ['id', 'pedidos', 'productos', 'cantidad', 'precio', 'precioUSD']
        depth = 1


class cliente_productos_pedidosSerializer(serializers.ModelSerializer):
    pedidos = pedidoSerializer()
    productos = detallesProductosSerializer()

    class Meta:
        model = productos_del_pedido
        fields = ['id', 'pedidos', 'productos', 'cantidad', 'precio', 'precioUSD']
        depth = 1

    def __init__(self, *args, **kwargs):
        super(cliente_productos_pedidosSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = userSerializer(instance.pedidos.cliente.user).data
        response['pedidos'] = pedidoSerializer(instance.pedidos).data
        response['cliente'] = clienteSerializer(instance.pedidos.cliente).data
        return response


class vendedor_productos_pedidosSerializer(serializers.ModelSerializer):
    pedidos = pedidoSerializer()
    productos = detallesProductosSerializer()

    class Meta:
        model = productos_del_pedido
        fields = ['id', 'pedidos', 'productos', 'cantidad', 'precio', 'precioUSD']
        depth = 1

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = userSerializer(instance.pedidos.cliente.user).data
        return response


class productos_del_pedidoDetallesSerializer(serializers.ModelSerializer):
    class Meta:
        model = productos_del_pedido
        fields = ['id', 'pedidos', 'productos', 'cantidad', 'precio', 'precioUSD']

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = userSerializer(instance.pedidos.cliente.user).data
        response['pedidos'] = pedidoSerializer(instance.pedidos).data
        response['cliente'] = clienteSerializer(instance.pedidos.cliente).data
        response['productos'] = listaProductosSerializer(instance.productos).data
        return response"""

# CALIFICACION

"""class calificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = calificacion_productos
        fields = ['id', 'cliente', 'producto', 'calificacion', 'vistas', 'fecha']

    def __init__(self, *args, **kwargs):
        super(calificacionSerializer, self).__init__(*args, **kwargs)"""


#       self.Meta.depth = 1


# CATEGORIA DEL PRODUCTO

class listaCategoriasSerializer(serializers.ModelSerializer):
    class Meta:
        model = categoria_productos
        fields = ['id', 'titulo', 'detalles']

    def __init__(self, *args, **kwargs):
        super(listaCategoriasSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1


class detallesCategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = categoria_productos
        fields = ['id', 'titulo', 'detalles']

    def __init__(self, *args, **kwargs):
        super(detallesCategoriaSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1


# UNIDAD DE MEDIDA DEL PRODUCTO

class listaUnidadesDeMedidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = unidad_medida_productos
        fields = ['id', 'titulo', 'detalles']

    def __init__(self, *args, **kwargs):
        super(listaUnidadesDeMedidaSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1


class detallesUnidadesDeMedidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = unidad_medida_productos
        fields = ['id', 'titulo', 'detalles']

    def __init__(self, *args, **kwargs):
        super(detallesUnidadesDeMedidaSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1


# lista de deseos

"""class lista_de_deseosSerializer(serializers.ModelSerializer):
    class Meta:
        model = lista_de_deseos
        fields = ['id', 'productos', 'clientes']

    def __init__(self, *args, **kwargs):
        super(lista_de_deseosSerializer, self).__init__(*args, **kwargs)

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['clientes'] = clienteSerializer(instance.clientes).data
        response['productos'] = detallesProductosSerializer(instance.productos).data
        return response


class lista_de_deseosDetallesSerializer(serializers.ModelSerializer):
    productos = detallesProductosSerializer()

    class Meta:
        model = lista_de_deseos
        fields = ['id', 'productos', 'clientes']

    def __init__(self, *args, **kwargs):
        super(lista_de_deseosDetallesSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['productos'] = detallesProductosSerializer(instance.productos).data
        return response"""

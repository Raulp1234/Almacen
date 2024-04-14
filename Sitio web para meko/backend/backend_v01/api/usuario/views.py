from django.contrib.auth import authenticate
from rest_framework import generics, permissions, viewsets
from api import serializers
# from api.deseos.models import lista_de_deseos
# from api.pedidos.models import pedido, productos_del_pedido
from api.productos.models import producto
from api.usuario import models
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.contrib.auth.hashers import make_password

# VENDEDOR
# from api.usuario.models import cliente, direccion_cliente, vendedor
from api.usuario.models import vendedor


class lista_de_vendedores(generics.ListCreateAPIView):
    queryset = models.vendedor.objects.all()
    serializer_class = serializers.vendedorSerializer


class detalles_vendedores(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.vendedor.objects.all()
    serializer_class = serializers.vendedorDetallesSerializer


# CLIENTE
"""
class lista_de_clientes(generics.ListCreateAPIView):
    queryset = models.cliente.objects.all()
    serializer_class = serializers.clienteSerializer


class detalles_clientes(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.cliente.objects.all()
    serializer_class = serializers.clienteDetallesSerializer"""


class detalles_usuarios(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.userSerializer


"""class lista_de_direcciones_clientes_ViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.direccionClienteSerializer
    queryset = models.direccion_cliente.objects.all()"""


"""
@csrf_exempt
def cliente_iniciar_sesion(request):
    usuario = request.POST.get('usuario')
    password = request.POST.get('contrasenha')

    print("usuario: ", usuario)
    print("password: ", password)
    # hashContrasenha = make_password(password)
    user = authenticate(username=usuario, password=password)

    print("user: ", user)
    if user:
        cliente_x = cliente.objects.get(user=user)
        msg = {
            'bool': True,
            'user': user.username,
            'id': cliente_x.id
        }
    else:
        msg = {
            'bool': False,
            'msg': 'Nombre de usuario o contraseña incorrecta!!'
        }
    return JsonResponse(msg)


@csrf_exempt
def cliente_registrarse(request):
    nombre = request.POST.get('nombre')
    apellidos = request.POST.get('apellidos')
    correo = request.POST.get('correo')
    telefono = request.POST.get('telefono')
    usuario = request.POST.get('usuario')
    password = request.POST.get('contrasenha')

    print("nombre: ", nombre)
    print("apellidos: ", apellidos)
    print("correo: ", correo)
    print("telefono: ", telefono)
    print("usuario: ", usuario)
    print("password: ", password)
    # hashContrasenha = make_password(password)

    try:
        user = User.objects.create(
            first_name=nombre,
            last_name=apellidos,
            email=correo,
            username=usuario,
            password=make_password(password),
        )

        print("user AKI: ", user)
        if user:
            try:

                # crear cliente

                cliente_x = cliente.objects.create(
                    user=user,
                    telefono=telefono
                )

                msg = {
                    'bool': True,
                    'user': user.id,
                    'cliente': cliente_x.id,
                    'msg': 'Gracias por registrarte. Ya puedes iniciar sesión ahora!!'
                }
            except IntegrityError:
                msg = {
                    'bool': False,
                    'msg': 'El teléfono ya existe!!'
                }
        else:
            msg = {
                'bool': False,
                'msg': 'Oops... hay algo mal!!'
            }
    except IntegrityError:
        msg = {
            'bool': False,
            'msg': 'El nombre de usuario ya existe!!'
        }
    return JsonResponse(msg)


class cliente_lista_direcciones(generics.ListAPIView):
    queryset = direccion_cliente.objects.all()
    serializer_class = serializers.direccionClienteSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        cliente_id = self.kwargs['pk']
        qs = qs.filter(cliente__id=cliente_id).order_by('id')
        return qs


@csrf_exempt
def direccion_de_cliente_por_defecto(request, pk):
    msg = {
        'bool': False,
    }

    if request.method == 'POST':
        direccion_id = request.POST.get('direccion_id')
        direccion_cliente.objects.all().update(default_direccion=False)
        respuesta = direccion_cliente.objects.filter(id=direccion_id).update(default_direccion=True)

        if respuesta:
            msg = {
                'bool': True,
            }

    return JsonResponse(msg)


@csrf_exempt
def cliente_cambiar_contrasenha(request, cliente_id):
    contrasenha = request.POST.get('contrasenha')
    clientes = models.cliente.objects.get(id=cliente_id)
    usuario = clientes.user
    usuario.password = make_password(contrasenha)
    usuario.save()
    print("usuario AKI: ", usuario)
    msg = {
        'bool': True,
        'msg': 'Contraseña cambiada'

    }
    return JsonResponse(msg)


@csrf_exempt
def cliente_dashboard(request, pk):
    msg = {
        'bool': False,
        'total_direcciones': 0,
        'total_productos_lista_deseos': 0,
        'total_pedidos': 0,
    }

    if request.method == 'GET':
        cliente_id = pk
        print("cliente_id: ", cliente_id)
        total_direcciones = direccion_cliente.objects.filter(cliente__id=cliente_id).count()
        total_productos_lista_deseos = lista_de_deseos.objects.filter(clientes__id=cliente_id).count()
        total_pedidos = pedido.objects.filter(cliente__id=cliente_id).count()

        msg = {
            'bool': True,
            'total_direcciones': total_direcciones,
            'total_productos_lista_deseos': total_productos_lista_deseos,
            'total_pedidos': total_pedidos,
        }

    return JsonResponse(msg)"""


#### vendedor

@csrf_exempt
def vendedor_registrarse(request):
    nombre = request.POST.get('nombre')
    apellidos = request.POST.get('apellidos')
    correo = request.POST.get('correo')
    telefono = request.POST.get('telefono')
    usuario = request.POST.get('usuario')
    password = request.POST.get('contrasenha')
    direccion = request.POST.get('direccion')

    print("nombre: ", nombre)
    print("apellidos: ", apellidos)
    print("correo: ", correo)
    print("telefono: ", telefono)
    print("usuario: ", usuario)
    print("password: ", password)
    print("direccion: ", direccion)
    # hashContrasenha = make_password(password)

    try:
        user = User.objects.create(
            first_name=nombre,
            last_name=apellidos,
            email=correo,
            username=usuario,
            password=make_password(password),
        )
        print("user: ", user)

        if user:
            try:
                # crear vendedor

                vendedor_x = vendedor.objects.create(
                    user=user,
                    telefono=telefono,
                    direccion=direccion,
                )

                msg = {
                    'bool': True,
                    'user': user.id,
                    'vendedor': vendedor_x.id,
                    'msg': 'Gracias por registrarte. Ya puedes iniciar sesión ahora!!'
                }
            except IntegrityError:
                msg = {
                    'bool': False,
                    'msg': 'El teléfono ya existe!!'
                }
        else:
            msg = {
                'bool': False,
                'msg': 'Oops... hay algo mal!!'
            }
    except IntegrityError:
        msg = {
            'bool': False,
            'msg': 'El nombre de usuario ya existe!!'
        }
    return JsonResponse(msg)


@csrf_exempt
def vendedor_iniciar_sesion(request):
    usuario = request.POST.get('usuario')
    password = request.POST.get('contrasenha')

    print("usuario: ", usuario)
    print("password: ", password)
    # hashContrasenha = make_password(password)
    user = authenticate(username=usuario, password=password)

    print("user: ", user)
    if user:
        vendedor_x = vendedor.objects.get(user=user)
        msg = {
            'bool': True,
            'user': user.username,
            'id': vendedor_x.id
        }
    else:
        msg = {
            'bool': False,
            'msg': 'Nombre de usuario o contraseña incorrecta!!'
        }
    return JsonResponse(msg)


@csrf_exempt
def vendedor_dashboard(request, pk):
    msg = {
        'bool': False,
        'total_clientes': 0,
        'total_productos': 0,
        'total_pedidos': 0,
    }

    if request.method == 'GET':
        vendedor_id = pk
        print("vendedor_id: ", vendedor_id)

        #  total_pedidos = productos_del_pedido.objects.filter(productos__vendedor__id=vendedor_id).count()
        #  total_productos = producto.objects.filter(vendedor__id=vendedor_id).count()
        #  total_clientes = productos_del_pedido.objects.filter(productos__vendedor__id=vendedor_id).values(
        #      'pedidos__cliente').count()

        msg = {
            'bool': True,
            #   'total_pedidos': total_pedidos,
            #   'total_productos': total_productos,
            #   'total_clientes': total_clientes,
        }

    return JsonResponse(msg)


@csrf_exempt
def vendedor_cambiar_contrasenha(request, vendedor_id):
    contrasenha = request.POST.get('contrasenha')
    vendedores = models.vendedor.objects.get(id=vendedor_id)
    usuario = vendedores.user
    usuario.password = make_password(contrasenha)
    usuario.save()
    print("usuario AKI: ", usuario)
    msg = {
        'bool': True,
        'msg': 'Contraseña cambiada'

    }
    return JsonResponse(msg)

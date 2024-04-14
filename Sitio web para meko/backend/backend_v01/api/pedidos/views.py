"""from django.http import JsonResponse, Http404
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from rest_framework.decorators import api_view

from api import serializers
from api.pedidos import models

import logging
from rest_framework.response import Response
from rest_framework import status
from api.pedidos.models import pedido, productos_del_pedido
from api.productos.models import producto
# from api.reportes.models import reporte
from api.usuario.models import cliente

from django.db.models import Count


# PEDIDO

class lista_de_pedidos(generics.ListCreateAPIView):
    queryset = models.pedido.objects.all()
    serializer_class = serializers.pedidoSerializer

    def post(self, request, *args, **kwargs):
        # Imprimir o registrar los datos del cuerpo de la solicitud
        logger = logging.getLogger(__name__)
        logger.debug("Datos del cuerpo de la solicitud: %s", request.data)

        # Asegúrate de que 'pedido' y 'producto' estén presentes en request.data y no sean None
        cliente_id = request.data.get('cliente')

        print("1 cliente_id: ", cliente_id)
        if cliente_id is not None:
            # Crea una copia mutable de request.data
            mutable_data = request.data.copy()
            print("A mutable_data: ", mutable_data)

            # Asegúrate de incluir 'pedido_id' y 'producto_id' en la copia mutable
            mutable_data['cliente'] = cliente_id
            print("mutable_data['cliente']: ", mutable_data['cliente'])

            # Continúa con el procesamiento
            serializer = self.get_serializer(data=mutable_data)
            serializer.is_valid()
            #   print("AKI: ", serializer.validated_data)

            if serializer.is_valid():
                # Imprime información antes de guardar
                print("2 serializer.validated_data: ", serializer.validated_data)
                logger.debug("Datos antes de guardar en la base de datos: %s", serializer.validated_data)

                # Obtén la instancia del modelo pedido
                cliente_instance = cliente.objects.get(id=cliente_id)

                print("cliente_instance.id: ", cliente_instance.id)
                # Establece el valor de 'pedido' en la instancia del modelo
                serializer.validated_data['cliente'] = cliente_instance

                # Guardar el objeto
                serializer.save()

                # Imprimir información después de guardar
                print("3 serializer.validated_data: ", serializer.validated_data)
                logger.debug("Datos después de guardar en la base de datos: %s", serializer.validated_data)

                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            # Maneja el caso en el que 'pedido' o 'producto' es None
            return Response({'error': 'Pedido ID o Producto ID no proporcionado'}, status=status.HTTP_400_BAD_REQUEST)



class detalles_pedidos(generics.RetrieveUpdateDestroyAPIView):
    # queryset = models.pedido.objects.all()
    serializer_class = serializers.pedidoDetallesSerializer

    def get_queryset(self):
        pedido_id = self.kwargs['pk']
        pedido = models.pedido.objects.get(id=pedido_id)
        productos_del_pedido = models.productos_del_pedido.objects.filter(pedido=pedido)
        return productos_del_pedido



class detalles_pedidos(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.pedidoDetallesSerializer

    def get_queryset(self):
        pedido_id = self.kwargs['pk']
        try:
            pedidos = pedido.objects.get(id=pedido_id)
            productos_del_pedido = models.productos_del_pedido.objects.filter(pedido=pedidos)
            return productos_del_pedido
        except models.pedido.DoesNotExist:
            raise Http404("Pedido no encontrado")


@csrf_exempt
def eliminar_pedidos(request, cliente_id):
    if request.method == 'DELETE':
        respuesta = pedido.objects.filter(cliente__id=cliente_id).delete()

        msg = {
            'bool': False,
        }
        if respuesta:
            msg = {
                'bool': True,
            }
    return JsonResponse(msg)


class eliminar_pedidos(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.pedido.objects.all()
    serializer_class = serializers.pedidoDetallesSerializer


# PRODUCTOS DEL PEDIDO


class lista_de_productos_del_pedido(generics.ListCreateAPIView):
    queryset = models.productos_del_pedido.objects.all()
    serializer_class = serializers.productos_del_pedidoSerializer

    def post(self, request, *args, **kwargs):
        # Imprimir o registrar los datos del cuerpo de la solicitud
        logger = logging.getLogger(__name__)
        logger.debug("Datos del cuerpo de la solicitud: %s", request.data)

        # Asegúrate de que 'pedido' y 'producto' estén presentes en request.data y no sean None
        pedido_id = request.data.get('pedidos')
        producto_id = request.data.get('productos')

        print("1 pedido_id: ", pedido_id)
        if pedido_id is not None and producto_id is not None:
            # Crea una copia mutable de request.data
            mutable_data = request.data.copy()
            print("A mutable_data: ", mutable_data)

            # Asegúrate de incluir 'pedido_id' y 'producto_id' en la copia mutable
            mutable_data['pedidos'] = pedido_id
            mutable_data['productos'] = producto_id
            cantidad = request.data.get('cantidad')
            precio = request.data.get('precio')
            print("mutable_data['productos']: ", mutable_data['productos'])

            # Continúa con el procesamiento
            serializer = self.get_serializer(data=mutable_data)
            serializer.is_valid()
            #   print("AKI: ", serializer.validated_data)

            if serializer.is_valid():
                # Imprime información antes de guardar
                print("2 serializer.validated_data: ", serializer.validated_data)
                logger.debug("Datos antes de guardar en la base de datos: %s", serializer.validated_data)

                # Obtén la instancia del modelo pedido
                pedido_instance = pedido.objects.get(id=pedido_id)
                producto_instance = producto.objects.get(id=producto_id)
                print("pedido_instance.id: ", pedido_instance.id)
                # Establece el valor de 'pedido' en la instancia del modelo
                serializer.validated_data['pedidos'] = pedido_instance
                # Establece el valor de 'producto' en la instancia del modelo
                serializer.validated_data['productos'] = producto_instance
                serializer.validated_data['cantidad'] = cantidad
                serializer.validated_data['precio'] = precio
                #    print("hokla: ", serializer.validated_data)

                # Guardar el objeto
                serializer.save()

                # Imprimir información después de guardar
                print("3 serializer.validated_data: ", serializer.validated_data)
                logger.debug("Datos después de guardar en la base de datos: %s", serializer.validated_data)

                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            # Maneja el caso en el que 'pedido' o 'producto' es None
            return Response({'error': 'Pedido ID o Producto ID no proporcionado'}, status=status.HTTP_400_BAD_REQUEST)


class detalles_productos_del_pedido(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.productos_del_pedido.objects.all()
    serializer_class = serializers.productos_del_pedidoDetallesSerializer


class cliente_productos_pedidosOficial(generics.ListCreateAPIView):
    queryset = models.productos_del_pedido.objects.all()
    serializer_class = serializers.cliente_productos_pedidosSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        cliente_id = self.kwargs['pk']
        qs = qs.filter(pedidos__cliente__id=cliente_id)
        return qs


class vendedor_productos_pedidosOficial(generics.ListCreateAPIView):
    queryset = models.productos_del_pedido_del_vendedor.objects.all()
    serializer_class = serializers.vendedor_productos_pedidosSerializer

    def get_queryset(self):
        try:
            vendedor_id = self.kwargs['pk']
            qs = models.productos_del_pedido_del_vendedor.objects.filter(productos__vendedor__id=vendedor_id)
            return qs
        except Exception as e:
            print(f"Error en la vista vendedor_productos_pedidosOficial: {str(e)}")
            return models.productos_del_pedido_del_vendedor.objects.none()


class cliente_productos_pedidos(generics.ListAPIView):
    queryset = models.productos_del_pedido.objects.all()
    serializer_class = serializers.productos_del_pedidoDetallesSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        cliente_id = self.kwargs['pk']
        qs = qs.filter(pedidos__cliente__id=cliente_id)
        return qs


@csrf_exempt
def actualizar_estado_del_pedido(request, pedido_id):
    if request.method == 'POST':
        respuesta = pedido.objects.filter(id=pedido_id).update(estado=True)
        msg = {
            'bool': False,
        }
        if respuesta:
            msg = {
                'bool': True,
            }
    return JsonResponse(msg)


## vendedor

class vendedor_productos_pedidos(generics.ListAPIView):
    queryset = models.productos_del_pedido.objects.all()
    serializer_class = serializers.productos_del_pedidoDetallesSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        vendedor_id = self.kwargs['pk']
        qs = qs.filter(producto__vendedor__id=vendedor_id)
        return qs


class modificar_pedido_Vendedor(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.pedido.objects.all()
    serializer_class = serializers.pedidoSerializer


class lista_clientes_del_Vendedor(generics.ListCreateAPIView):
    # queryset = models.productos_del_pedido_del_vendedor.objects.all()
    # serializer_class = serializers.vendedor_productos_pedidosSerializer

    queryset = models.productos_del_pedido.objects.all()
    serializer_class = serializers.cliente_productos_pedidosSerializer

    def get_queryset(self):
        try:
            vendedor_id = self.kwargs['pk']
            qs = models.productos_del_pedido.objects.filter(productos__vendedor__id=vendedor_id)
            return qs
        except Exception as e:
            print(f"Error en la vista vendedor_productos_pedidosOficial: {str(e)}")
            return models.productos_del_pedido_del_vendedor.objects.none()


class productos_del_pedido_del_cliente_del_Vendedor(generics.ListCreateAPIView):
    queryset = models.productos_del_pedido_del_vendedor.objects.all()
    serializer_class = serializers.vendedor_productos_pedidosSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        cliente_id = self.kwargs['cliente_id']
        vendedor_id = self.kwargs['vendedor_id']
        qs = models.productos_del_pedido_del_vendedor.objects.filter(pedidos__cliente__id=cliente_id,
                                                                     productos__vendedor__id=vendedor_id)

        return qs


@api_view(['GET'])
def mostrar_pedidos_diarios(request, vendedor_id):
    try:
        pedidos = productos_del_pedido.objects.filter(productos__vendedor__id=vendedor_id).values(
            'pedidos__fecha').annotate(cantidad_pedidos=Count('id'))

        lista_fechas = []
        lista_cantidad = []
        dataSet = {}

        if pedidos:
            for pedido_x in pedidos:
                lista_fechas.append(pedido_x['pedidos__fecha'])
                lista_cantidad.append(pedido_x['cantidad_pedidos'])
            dataSet = {'dates': lista_fechas, 'data': lista_cantidad}

        return Response(dataSet)
    except Exception as e:
        print(f"Error en la vista mostrar_pedidos_diarios: {str(e)}")
        return Response({'error': 'Error al procesar la solicitud'}, status=500)"""

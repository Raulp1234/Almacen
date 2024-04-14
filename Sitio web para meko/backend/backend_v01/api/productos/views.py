from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, permissions, pagination, viewsets
from api import serializers
from api.productos import models
from django.shortcuts import get_object_or_404

from api.productos.models import producto, categoria_productos, unidad_medida_productos

import logging
from rest_framework.response import Response
from rest_framework import status

from api.usuario.models import vendedor


class lista_de_productos(generics.ListCreateAPIView):
    queryset = models.producto.objects.all()
    serializer_class = serializers.listaProductosSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        categoria_id = self.request.GET.get('categoria')  # Usar get() en lugar de ['categoria']

        if categoria_id is not None:
            categoria = get_object_or_404(models.categoria_productos, id=categoria_id)
            qs = qs.filter(categoria=categoria)

        if 'fetch_limit' in self.request.GET:
            limit = int(self.request.GET['fetch_limit'])
            qs = qs[:limit]
        return qs

    def post(self, request, *args, **kwargs):
        # Imprimir o registrar los datos del cuerpo de la solicitud
        logger = logging.getLogger(__name__)
        logger.debug("Datos del cuerpo de la solicitud: %s", request.data)

        # Asegúrate de que 'pedido' y 'producto' estén presentes en request.data y no sean None
        categoria_id = request.data.get('categoria')
        vendedor_id = request.data.get('vendedor')
        unidad_medida_id = request.data.get('unidad_medida')

        print("1 categoria_id: ", categoria_id)
        print("1 vendedor_id: ", vendedor_id)
        if categoria_id is not None and vendedor_id is not None and unidad_medida_id is not None:
            # Crea una copia mutable de request.data
            mutable_data = request.data.copy()
            print("A mutable_data: ", mutable_data)

            # Asegúrate de incluir 'pedido_id' y 'producto_id' en la copia mutable
            mutable_data['unidad_medida'] = unidad_medida_id
            mutable_data['categoria'] = categoria_id
            mutable_data['vendedor'] = vendedor_id

            print("mutable_data['unidad_medida']: ", mutable_data['unidad_medida'])
            print("mutable_data['categoria']: ", mutable_data['categoria'])
            print("mutable_data['vendedor']: ", mutable_data['vendedor'])

            # Continúa con el procesamiento
            serializer = self.get_serializer(data=mutable_data)
            serializer.is_valid()
            #   print("AKI: ", serializer.validated_data)

            if serializer.is_valid():
                # Imprime información antes de guardar
                print("2 serializer.validated_data: ", serializer.validated_data)
                logger.debug("Datos antes de guardar en la base de datos: %s", serializer.validated_data)

                categoria_instance = categoria_productos.objects.get(id=categoria_id)
                vendedor_instance = vendedor.objects.get(id=vendedor_id)
                unidad_medida_instance = unidad_medida_productos.objects.get(id=unidad_medida_id)

                serializer.validated_data['unidad_medida'] = unidad_medida_instance
                serializer.validated_data['categoria'] = categoria_instance
                serializer.validated_data['vendedor'] = vendedor_instance
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


class lista_de_etiquetas_productos(generics.ListCreateAPIView):
    queryset = models.producto.objects.all()
    serializer_class = serializers.listaProductosSerializer

    def get_queryset(self):
        qs = super().get_queryset()

        etiqueta = self.kwargs.get('etiquetas')
        if etiqueta is not None:
            etiqueta = etiqueta.lower()
            qs = qs.filter(etiquetas__icontains=etiqueta)

        else:
            print("etiquetas no proporcionadas en la solicitud")

        return qs


class lista_de_productos_relacionados(generics.ListCreateAPIView):
    queryset = models.producto.objects.all()
    serializer_class = serializers.listaProductosSerializer

    def get_queryset(self):
        qs = super().get_queryset()

        producto_id = self.kwargs['pk']
        producto_x = producto.objects.get(id=producto_id)
        qs = qs.filter(categoria=producto_x.categoria).exclude(id=producto_id)
        print("qs: ", qs)
        return qs


class detalles_productos(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.producto.objects.all()
    serializer_class = serializers.detallesProductosSerializer


"""class calificacion_productos_ViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.calificacionSerializer
    queryset = models.calificacion_productos.objects.all()"""

"""
@csrf_exempt
def actualizar_descargas_del_producto(request, producto_id):
    if request.method == 'POST':
        producto_x = producto.objects.get(id=producto_id)
        print("producto_x: ", producto_x)
        print("producto_x.descargas: ", producto_x.descargas)
        total_descargas = producto_x.descargas
        total_descargas += 1

        if total_descargas == 0:
            total_descargas = 1

        respuesta = producto.objects.filter(id=producto_id).update(descargas=total_descargas)
        msg = {
            'bool': False,
        }
        if respuesta:
            msg = {
                'bool': True,
            }
    return JsonResponse(msg)"""


class producto_imagenes(generics.ListCreateAPIView):
    queryset = models.imagenes_productos.objects.all()
    serializer_class = serializers.imagenesProductosSerializer


class producto_imagenes_detalles(generics.ListCreateAPIView):
    queryset = models.imagenes_productos.objects.all()
    serializer_class = serializers.imagenesProductosSerializer

    def get_queryset(self):
        qs = super().get_queryset()

        producto_id = self.kwargs['producto_id']
        qs = qs.filter(producto__id=producto_id)
        return qs


class producto_imagenes_detalles_eliminar(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.imagenes_productos.objects.all()
    serializer_class = serializers.imagenesProductosSerializer


# CATEGORIAS
class lista_de_categorias(generics.ListCreateAPIView):
    queryset = models.categoria_productos.objects.all()
    serializer_class = serializers.listaCategoriasSerializer


class detalles_categorias(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.categoria_productos.objects.all()
    serializer_class = serializers.detallesCategoriaSerializer


# UNIDAD DE MEDIDA DEL PRODUCTO
class listaUnidadesDeMedida(generics.ListCreateAPIView):
    queryset = models.unidad_medida_productos.objects.all()
    serializer_class = serializers.listaUnidadesDeMedidaSerializer


class detallesUnidadesDeMedida(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.unidad_medida_productos.objects.all()
    serializer_class = serializers.detallesUnidadesDeMedidaSerializer
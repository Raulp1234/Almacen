"""from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from api import serializers
from api.deseos.models import lista_de_deseos

# lista de deseos
import logging
logger = logging.getLogger(__name__)


class lista_de_deseos_views(generics.ListCreateAPIView):
    queryset = lista_de_deseos.objects.all()
    serializer_class = serializers.lista_de_deseosSerializer


@csrf_exempt
def revisar_lista_de_deseos(request):
    if request.method == 'POST':
        producto_id = request.POST.get('productos')
        cliente_id = request.POST.get('clientes')

        respuesta = lista_de_deseos.objects.filter(productos__id=producto_id, clientes__id=cliente_id).count()

        msg = {
            'bool': False,
        }
        if respuesta > 0:
            msg = {
                'bool': True,
            }
    return JsonResponse(msg)


class cliente_productos_lista_deseos(generics.ListAPIView):
    queryset = lista_de_deseos.objects.all()
   # serializer_class = serializers.lista_de_deseosSerializer
    serializer_class = serializers.lista_de_deseosDetallesSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        cliente_id = self.kwargs['pk']
        qs = qs.filter(clientes__id=cliente_id)
        return qs


@csrf_exempt
def eliminar_de_lista_de_deseos(request):
    if request.method == 'POST':
        lista_deseos_id = request.POST.get('lista_deseos_id')
        respuesta = lista_de_deseos.objects.filter(id=lista_deseos_id).delete()

        msg = {
            'bool': False,
        }
        if respuesta:
            msg = {
                'bool': True,
            }
    return JsonResponse(msg)"""

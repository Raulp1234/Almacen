"""from django.db import models

from api.productos.models import producto
from api.usuario.models import cliente


class lista_de_deseos(models.Model):
    productos = models.ForeignKey(producto, on_delete=models.CASCADE)
    clientes = models.ForeignKey(cliente, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.productos.titulo} - {self.clientes.user.first_name}"""

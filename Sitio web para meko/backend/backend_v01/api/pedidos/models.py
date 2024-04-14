"""from django.db import models
from api.productos.models import producto
from api.usuario.models import cliente


class pedido(models.Model):
    cliente = models.ForeignKey(cliente, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)
    estado = models.BooleanField(default=False)
    total_a_pagar = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_a_pagar_usd = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __unicode__(self):
        return '%s' % self.fecha


class productos_del_pedido(models.Model):
    pedidos = models.ForeignKey(pedido, on_delete=models.CASCADE,
                                db_column='pedido_id', null=False)

    productos = models.ForeignKey(producto, on_delete=models.CASCADE, db_column='producto_id')
    cantidad = models.IntegerField(default=1)
    precio = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    precioUSD = models.DecimalField(max_digits=10, decimal_places=2, default=80)

    def __str__(self):
        return self.productos.titulo


class productos_del_pedido_del_vendedor(models.Model):
    pedidos = models.ForeignKey(pedido, on_delete=models.CASCADE,
                                db_column='pedido_id', null=False)

    productos = models.ForeignKey(producto, on_delete=models.CASCADE, db_column='producto_id')
    cantidad = models.IntegerField(default=1)
    precio = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    precioUSD = models.DecimalField(max_digits=10, decimal_places=2, default=80)

    def __str__(self):
        return self.productos.titulo"""

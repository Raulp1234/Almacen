from django.db import models

from api.usuario.models import vendedor


class categoria_productos(models.Model):
    titulo = models.CharField(max_length=200)
    detalles = models.TextField(null=True)

    def __str__(self):
        return self.titulo


class unidad_medida_productos(models.Model):
    titulo = models.CharField(max_length=200)
    detalles = models.TextField(null=True)

    def __str__(self):
        return self.titulo


class producto(models.Model):
    categoria = models.ForeignKey(categoria_productos, on_delete=models.SET_NULL, null=True,
                                  related_name='categoria_productos')
    vendedor = models.ForeignKey(vendedor, on_delete=models.SET_NULL, null=True)
    titulo = models.CharField(max_length=200)
    detalles = models.TextField(null=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    precioUSD = models.DecimalField(max_digits=10, decimal_places=2, default=80)
   # slug = models.CharField(max_length=300, unique=True, null=True)
   # etiquetas = models.TextField(null=True)
    imagen = models.ImageField(upload_to='product_imgs/', null=True)
    cantidad = models.IntegerField()
    unidad_medida = models.ForeignKey(unidad_medida_productos, on_delete=models.SET_NULL, null=True,
                                      related_name='unidad_medida_productos')

    # archivo_del_producto = models.FileField(upload_to='product_files/', null=True)
    # descargas = models.IntegerField(default=0, null=True)
    # estado_de_publicacion = models.BooleanField(default=False)

    def __str__(self):
        return self.titulo

        # def tag_list(self):
        #    if self.etiquetas is not None:
        #      taglist = self.etiquetas.split(',')
        #     return taglist
        #  else:
            # Puedes manejar el caso en que self.etiquetas sea None de alguna manera,
            # por ejemplo, devolver una lista vacía o levantar una excepción.
        #     return []


class imagenes_productos(models.Model):
    producto = models.ForeignKey(producto, on_delete=models.CASCADE, related_name='imagen_producto')
    imagen = models.ImageField(upload_to='product_imgs/', null=True)

    def __str__(self):
        return self.imagen.url

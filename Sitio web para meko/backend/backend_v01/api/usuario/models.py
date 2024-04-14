from django.contrib.auth.models import User
from django.db import models




class vendedor(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    direccion = models.TextField(null=True)
    telefono = models.PositiveBigIntegerField(unique=True, null=True)
    imagen_perfil = models.ImageField(upload_to='vendedor_imgs/', null=True)

    def __str__(self):
        return self.user.username


"""class cliente(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    telefono = models.PositiveBigIntegerField(unique=True)
    imagen_perfil = models.ImageField(upload_to='cliente_imgs/', null=True)

    def __str__(self):
        return self.user.username


class direccion_cliente(models.Model):
    cliente = models.ForeignKey(cliente, on_delete=models.CASCADE, related_name='direccion_cliente')
    direccion = models.TextField()
    default_direccion = models.BooleanField(default=False)

    def __str__(self):
        return self.direccion"""

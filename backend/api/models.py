from django.db import models

class Brand(models.Model):
    name = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    established = models.PositiveIntegerField()
    description = models.TextField(blank=True)
    logo = models.ImageField(upload_to="brands/")

    def __str__(self):
        return self.name

class Product(models.Model):
    brand = models.ForeignKey(Brand, related_name="products", on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField()
    image = models.ImageField(upload_to="products/")

    def __str__(self):
        return f"{self.name} ({self.brand.name})"

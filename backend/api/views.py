from rest_framework import viewsets
from .models import Brand, Product
from .serializers import BrandSerializer, ProductSerializer
from rest_framework.parsers import MultiPartParser, FormParser

class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    parser_classes = [MultiPartParser, FormParser]

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    parser_classes = [MultiPartParser, FormParser]

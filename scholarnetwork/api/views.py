from django.shortcuts import render

# Create your views here.
from .models import Article
from .serializers import ArticleSerializer
from rest_framework import generics

class ArticleListCreate(generics.ListCreateAPIView):
    queryset = Article.objects.all().filter(id=1)
    serializer_class = ArticleSerializer
from django.shortcuts import render

# Create your views here.
from .models import Article
from .serializers import ArticleSerializer
from rest_framework import generics

# pylint: disable=no-member

class ArticleListCreate(generics.ListCreateAPIView):
    queryset = Article.objects.all()[:10]
    serializer_class = ArticleSerializer
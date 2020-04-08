from django.shortcuts import render
from .models import Article, Author
from .serializers import ArticleSerializer, AuthorSerializer
from rest_framework import generics

# pylint: disable=no-member

class ArticleListCreate(generics.ListCreateAPIView):
    queryset = Article.objects.all()[:10]
    serializer_class = ArticleSerializer

class AuthorListCreate(generics.ListCreateAPIView):
    queryset = Author.objects.all()[:10]
    serializer_class = AuthorSerializer
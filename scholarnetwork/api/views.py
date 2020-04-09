from django.shortcuts import render
from .models import Article, Author
from .serializers import ArticleSerializer, AuthorSerializer
from rest_framework import generics

# pylint: disable=no-member

class ArticleListCreate(generics.ListCreateAPIView):
    queryset = Article.objects.get_article(10)
    # queryset = Article.objects.all()[:10]
    serializer_class = ArticleSerializer

class AuthorListCreate(generics.ListCreateAPIView):
    queryset = Author.objects.all()[:10]
    serializer_class = AuthorSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse

from django.core import serializers
from rest_framework.renderers import JSONRenderer

from rest_framework import status
from rest_framework.decorators import api_view

@api_view(['GET'])
def request_article(self):
    # result = Article.objects.get_article(2)
    result = Article.objects.raw("SELECT * FROM articles LIMIT 20")
    serializer = ArticleSerializer(result, many=True)
    return Response(serializer.data)
            
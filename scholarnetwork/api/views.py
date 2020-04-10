from django.shortcuts import render
from .models import Article, Author
from .serializers import ArticleSerializer, AuthorSerializer
from rest_framework import generics

# pylint: disable=no-member

# class ArticleListCreate(generics.ListCreateAPIView):
#     queryset = Article.objects.get_article(10)
#     # queryset = Article.objects.all()[:10]
#     serializer_class = ArticleSerializer

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
from django.http import Http404

from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser

class ArticleList(APIView):
    def get(self, request, foramt=None):
        articles = Article.objects.raw("SELECT * FROM articles LIMIT 10")
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ArticleDetail(APIView):
    def get_object(self, pk):
        try:
            return Article.objects.raw("SELECT * FROM articles WHERE id = %s", [pk])
        except Article.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    def get(self, request, pk, format=None):
        article = self.get_object(pk)
        serializer = ArticleSerializer(article, many=True)
        return Response(serializer.data)
    
    def put(self, request, pk, format=None):
        article = self.get_object(pk)
        serializer = ArticleSerializer(article, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        article = self.get_object(pk)
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
from django.shortcuts import render
from .models import Article, Author, User
from .serializers import ArticleSerializer, AuthorSerializer, UserSerializer
from rest_framework import generics

# pylint: disable=no-member

# class AuthorListCreate(generics.ListCreateAPIView):
#     queryset = Author.objects.all()[:10]
#     serializer_class = AuthorSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse

from django.core import serializers

from rest_framework import status
from rest_framework.decorators import api_view
from django.http import Http404

from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser

class ArticleList(APIView):
    def get(self, request, format=None):
        articles = Article.objects.raw("SELECT * FROM articles LIMIT 100")
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

class ArticleSearchTitle(APIView):
    def get(self, request, searchby, format=None):
        # Translator: xgettext:no-python-format
        # articles = Article.objects.raw("SELECT * FROM articles WHERE pub_title LIKE %%s%", searchby)
        articles = Article.objects.filter(pub_title__icontains=searchby)
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data)

class ArticleSearchAuthor(APIView):
    def get(self, request, searchby, format=None):
        # Translator: xgettext:no-python-format
        # articles = Article.objects.raw("SELECT * FROM articles WHERE pub_title LIKE %%s%", searchby)
        articles = Article.objects.filter(name__icontains=searchby)
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data)

class AuthorList(APIView):
    def get(self, request, format=None):
        authors = Author.objects.raw("SELECT * FROM authors LIMIT 100")
        serializer = AuthorSerializer(authors, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = AuthorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AuthorDetail(APIView):
    def get_object(self, pk):
        try:
            return Author.objects.raw("SELECT * FROM authors WHERE id = %s", [pk])
        except Author.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    def get(self, request, pk, format=None):
        author = self.get_object(pk)
        serializer = AuthorSerializer(author, many=True)
        return Response(serializer.data)
    
    def put(self, request, pk, format=None):
        author = self.get_object(pk)
        serializer = AuthorSerializer(author, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        author = self.get_object(pk)
        author.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class AuthorSearchName(APIView):
    def get(self, request, searchby, format=None):
        authors = Author.objects.filter(name__icontains=searchby)
        serializer = AuthorSerializer(authors, many=True)
        return Response(serializer.data)

class AuthorSearchAffiliation(APIView):
    def get(self, request, searchby, format=None):
        authors = Author.objects.filter(affiliation__icontains=searchby)
        serializer = AuthorSerializer(authors, many=True)
        return Response(serializer.data)

class UserList(APIView):
    def get(self, request, format=None):
        users = User.objects.raw("SELECT * FROM users LIMIT 100")
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetail(APIView):
    def get_object(self, pk):
        try:
            return User.objects.raw("SELECT * FROM users WHERE id = %s", [pk])
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    def get(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)
    
    def put(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        user = self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class UserSearchEmail(APIView):
    def get(self, request, searchby, format=None):
        users = User.objects.filter(email__icontains=searchby)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

class UserSearchAffiliation(APIView):
    def get(self, request, searchby, format=None):
        users = User.objects.filter(affiliation__icontains=searchby)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
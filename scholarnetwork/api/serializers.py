from rest_framework import serializers
from .models import Article, Author

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('id', 'name', 'affiliation', 'citedby', 'pub_title', 'pub_year', 'citations', 'pub_author', 'eprint')

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('id', 'name', 'affiliation', 'citedby', 'attributes', 'page', 'email', 'interests', 'url_picture')
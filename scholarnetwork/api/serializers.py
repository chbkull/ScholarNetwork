from rest_framework import serializers
from .models import Article, Author, User

# pylint: disable=no-member

class ArticleSerializer(serializers.ModelSerializer):
    
    def create(self, validated_data):
        return Article.objects.create(**validated_data) # TODO Refactor into MySQL

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name) # TODO Refactor into MySQL
        instance.affiliation = validated_data.get('affiliation', instance.affiliation)
        instance.citedby = validated_data.get('citedby', instance.citedby)
        instance.pub_title = validated_data.get('pub_title', instance.pub_title)
        instance.pub_year = validated_data.get('pub_year', instance.pub_year)
        instance.citations = validated_data.get('citations', instance.citations)
        instance.pub_author = validated_data.get('pub_author', instance.pub_author)
        instance.eprint = validated_data.get('eprint', instance.eprint)
    
    class Meta:
        model = Article
        fields = ('id', 'name', 'affiliation', 'citedby', 'pub_title', 'pub_year', 'citations', 'pub_author', 'eprint')

class AuthorSerializer(serializers.ModelSerializer):
    
    def create(self, validated_data):
        return Author.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.affiliation = validated_data.get('affiliation', instance.affiliation)
        instance.citedby = validated_data.get('citedby', instance.citedby)
        instance.attributes = validated_data.get('attributes', instance.attributes)
        instance.page = validated_data.get('page', instance.page)
        instance.email = validated_data.get('email', instance.email)
        instance.interests = validated_data.get('interests', instance.interests)
        instance.url_picture = validated_data.get('url_picture', instance.url_picture)
    
    class Meta:
        model = Author
        fields = ('id', 'name', 'affiliation', 'citedby', 'attributes', 'page', 'email', 'interests', 'url_picture')

class UserSerializer(serializers.ModelSerializer):
    
    def create(self, validated_data):
        return User.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.password = validated_data.get('password', instance.password)
        instance.affiliation = validated_data.get('affiliation', instance.affiliation)
        instance.history = validated_data.get('history', instance.history)
        instance.interests = validated_data.get('interests', instance.interests)

    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'affiliation', 'history', 'interests')
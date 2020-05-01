from rest_framework import serializers
from .models import Article, Author, User, ArticleSQL

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
        return instance
    
    class Meta:
        model = Article
        fields = ('id', 'name', 'affiliation', 'citedby', 'pub_title', 'pub_year', 'citations', 'pub_author', 'eprint')

class ArticleSQLSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    name = serializers.CharField(required=True, max_length=1024)
    affiliation = serializers.CharField(required=True, max_length=1024)
    citedby = serializers.CharField(required=True, max_length=1024)
    pub_title = serializers.CharField(required=True, max_length=1024)
    pub_year = serializers.CharField(required=True, max_length=1024) # no year serializer?
    citations = serializers.CharField(required=True, max_length=1024)
    pub_author = serializers.CharField(required=True, max_length=1024)
    eprint = serializers.CharField(required=True, max_length=1024)

    def create(self, validated_data):
        c = ArticleSQL()
        c.id = validated_data.get("id")
        c.name = validated_data.get("name")
        c.affiliation = validated_data.get("affiliation")
        c.citedby = validated_data.get("citedby")
        c.pub_title = validated_data.get("pub_title")
        c.pub_year = validated_data.get("pub_year")
        c.citations = validated_data.get("citations")
        c.pub_author = validated_data.get("pub_author")
        c.eprint = validated_data.get("eprint")
        c.save()
        return c
    
    def update(self, validated_data):
        c = ArticleSQL()
        c.id = validated_data.get("id", c.id)
        c.name = validated_data.get("name", c.name)
        c.affiliation = validated_data.get("affiliation", c.affiliation)
        c.citedby = validated_data.get("citedby", c.citedby)
        c.pub_title = validated_data.get("pub_title", c.pub_title)
        c.pub_year = validated_data.get("pub_year", c.pub_year)
        c.citations = validated_data.get("citations", c.citations)
        c.pub_author = validated_data.get("pub_author", c.pub_author)
        c.eprint = validated_data.get("eprint", c.eprint)
        c.save()
        return c

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
        return instance
    
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
        return instance

    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'affiliation', 'history', 'interests']
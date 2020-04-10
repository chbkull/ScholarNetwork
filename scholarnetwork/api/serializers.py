from rest_framework import serializers
from .models import Article, Author

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
    class Meta:
        model = Author
        fields = ('id', 'name', 'affiliation', 'citedby', 'attributes', 'page', 'email', 'interests', 'url_picture')
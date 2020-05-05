from rest_framework import serializers
from .models import Article, Author, User, ArticleSQL, AuthorSQL, UserSQL, PublisherSQL, JournalSQL

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
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True, max_length=1024)
    affiliation = serializers.CharField(required=True, max_length=1024)
    citedby = serializers.IntegerField(required=True)
    pub_title = serializers.CharField(required=True, max_length=1024)
    pub_year = serializers.IntegerField(required=True) # no year serializer?
    citations = serializers.IntegerField(required=True)
    pub_author = serializers.CharField(required=True, max_length=1024)
    eprint = serializers.CharField(required=True, max_length=1024)

    def create(self, validated_data):
        a = ArticleSQL()
        a.name = validated_data.get("name")
        a.affiliation = validated_data.get("affiliation")
        a.citedby = validated_data.get("citedby")
        a.pub_title = validated_data.get("pub_title")
        a.pub_year = validated_data.get("pub_year")
        a.citations = validated_data.get("citations")
        a.pub_author = validated_data.get("pub_author")
        a.eprint = validated_data.get("eprint")
        a.save()
        a.id = ArticleSQL.objects.last_id()
        return a
    
    def update(self, a, validated_data):
        a = a[0]
        a.name = validated_data.get("name", a.name)
        a.affiliation = validated_data.get("affiliation", a.affiliation)
        a.citedby = validated_data.get("citedby", a.citedby)
        a.pub_title = validated_data.get("pub_title", a.pub_title)
        a.pub_year = validated_data.get("pub_year", a.pub_year)
        a.citations = validated_data.get("citations", a.citations)
        a.pub_author = validated_data.get("pub_author", a.pub_author)
        a.eprint = validated_data.get("eprint", a.eprint)
        a.save()
        return a

class AuthorSerializer(serializers.ModelSerializer):
    
    def create(self, validated_data):
        return Author.objects.create(**validated_data)
    
    def update(self, a, validated_data):
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

class AuthorSQLSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True, max_length=1024)
    affiliation = serializers.CharField(required=True, max_length=1024)
    citedby = serializers.IntegerField(required=True)
    citedby_5 = serializers.IntegerField(required=True)
    h_index = serializers.IntegerField(required=True)
    h_index_5 = serializers.IntegerField(required=True)
    i10_index = serializers.IntegerField(required=True)
    i10_index_5 = serializers.IntegerField(required=True)
    citedby_history = serializers.CharField(required=True, max_length=1024)
    page = serializers.IntegerField(required=True)
    email = serializers.CharField(required=True, max_length=1024)
    interests = serializers.CharField(required=True, max_length=1024)
    url_picture = serializers.CharField(required=True, max_length=1024)

    def create(self, validated_data):
        a = AuthorSQL()
        a.name = validated_data.get("name")
        a.affiliation = validated_data.get("affiliation")
        a.citedby = validated_data.get("citedby")
        a.citedby_5 = validated_data.get("citedby_5")
        a.h_index = validated_data.get("h_index")
        a.h_index_5 = validated_data.get("h_index_5")
        a.i10_index = validated_data.get("i10_index")
        a.i10_index_5 = validated_data.get("i10_index_5")
        a.citedby_history = validated_data.get("citedby_history")
        a.page = validated_data.get("page")
        a.email = validated_data.get("email")
        a.interests = validated_data.get("interests")
        a.url_picture = validated_data.get("url_picture")
        a.save()
        a.id = AuthorSQL.objects.last_id()
        return a
    
    def update(self, a, validated_data):
        a = a[0]
        a.name = validated_data.get("name", a.name)
        a.affiliation = validated_data.get("affiliation", a.affiliation)
        a.citedby = validated_data.get("citedby", a.citedby)
        a.citedby_5 = validated_data.get("citedby_5", a.citedby_5)
        a.h_index = validated_data.get("h_index", a.h_index)
        a.h_index_5 = validated_data.get("h_index_5", a.h_index_5)
        a.i10_index = validated_data.get("i10_index", a.i10_index)
        a.i10_index_5 = validated_data.get("i10_index_5", a.i10_index_5)
        a.citedby_history = validated_data.get("citedby_history", a.citedby_history)
        a.page = validated_data.get("page", a.page)
        a.email = validated_data.get("email", a.email)
        a.interests = validated_data.get("interests", a.interests)
        a.url_picture = validated_data.get("url_picture", a.url_picture)
        a.save()
        return a

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

class UserSQLSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    email = serializers.CharField(required=True, max_length=1024)
    password = serializers.CharField(required=True, max_length=1024)
    affiliation = serializers.CharField(required=True, max_length=1024)
    history = serializers.CharField(required=True, max_length=1024)
    interests = serializers.CharField(required=True, max_length=1024)

    def create(self, validated_data):
        u = UserSQL()
        u.email = validated_data.get("email")
        u.password = validated_data.get("password")
        u.affiliation = validated_data.get("affiliation")
        u.history = validated_data.get("history")
        u.interests = validated_data.get("interests")
        u.save()
        u.id = UserSQL.objects.last_id()
        return u
    
    def update(self, u, validated_data):
        u = u[0]
        u.email = validated_data.get("email", u.email)
        u.password = validated_data.get("password", u.password)
        u.affiliation = validated_data.get("affiliation", u.affiliation)
        u.history = validated_data.get("history", u.history)
        u.interests = validated_data.get("interests", u.interests)
        u.save()
        return u

class PublisherSQLSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True, max_length=1024)

    def create(self, validated_data):
        p = PublisherSQL()
        p.name = validated_data.get("name")
        p.save()
        p.id = PublisherSQL.objects.last_id()
        return p
    
    def update(self, p, validated_data):
        p = p[0]
        p.name = validated_data.get("name", p.name)
        p.save()
        return p

class JournalSQLSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True, max_length=1024)

    def create(self, validated_data):
        j = JournalSQL()
        j.name = validated_data.get("name")
        j.save()
        j.id = JournalSQL.objects.last_id()
        return j
    
    def update(self, j, validated_data):
        j = j[0]
        j.name = validated_data.get("name", j.name)
        j.save()
        return j
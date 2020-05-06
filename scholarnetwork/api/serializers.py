from rest_framework import serializers
from .models import ArticleSQL, AuthorSQL, UserSQL, PublisherSQL, JournalSQL, ComplexSQL


class ArticleSQLSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=1024)
    author_id = serializers.IntegerField(required=False, allow_null=True)
    authors = serializers.CharField(max_length=1024)
    citations = serializers.IntegerField(required=False, default=-1)
    journal_id = serializers.IntegerField(required=False, allow_null=True)
    year = serializers.IntegerField(required=False, default=-1) # no year serializer?
    issue = serializers.CharField(required=False, default="", max_length=1024, allow_blank=True, allow_null=True)
    publisher_id = serializers.IntegerField(required=False, allow_null=True)
    eprint = serializers.CharField(required=False, default="", max_length=1024, allow_blank=True, allow_null=True)
    url = serializers.CharField(required=False, default="", max_length=1024, allow_blank=True, allow_null=True)

    def create(self, validated_data):
        a = ArticleSQL()
        a.title = validated_data.get("title")
        a.author_id = validated_data.get("author_id")
        a.authors = validated_data.get("authors")
        a.citations = validated_data.get("citations")
        a.journal_id = validated_data.get("journal_id")
        a.year = validated_data.get("year")
        a.issue = validated_data.get("issue")
        a.publisher_id = validated_data.get("publisher_id")
        a.eprint = validated_data.get("eprint")
        a.url = validated_data.get("url")
        a.save()
        a.id = ArticleSQL.objects.last_id()
        return a
    
    def update(self, a, validated_data):
        a = a[0]
        a.title = validated_data.get("title", a.title)
        a.author_id = validated_data.get("author_id", a.author_id)
        a.authors = validated_data.get("authors", a.authors)
        a.citations = validated_data.get("citations", a.citations)
        a.journal_id = validated_data.get("journal_id", a.journal_id)
        a.year = validated_data.get("year", a.year)
        a.issue = validated_data.get("issue", a.issue)
        a.publisher_id = validated_data.get("publisher_id", a.publisher_id)
        a.eprint = validated_data.get("eprint", a.eprint)
        a.url = validated_data.get("url", a.url)
        a.save()
        return a


class AuthorSQLSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=1024)
    affiliation = serializers.CharField(required=False, default="", max_length=1024, allow_blank=True, allow_null=True)
    citedby = serializers.IntegerField(required=False, default=0)
    citedby_5 = serializers.IntegerField(required=False, default=0)
    h_index = serializers.IntegerField(required=False, default=0)
    h_index_5 = serializers.IntegerField(required=False, default=0)
    i10_index = serializers.IntegerField(required=False, default=0)
    i10_index_5 = serializers.IntegerField(required=False, default=0)
    citedby_history = serializers.CharField(required=False, default="", max_length=1024, allow_blank=True, allow_null=True)
    page = serializers.IntegerField(required=False, default=0)
    email = serializers.CharField(required=False, default="", max_length=1024, allow_blank=True, allow_null=True)
    interests = serializers.CharField(required=False, default="", max_length=1024, allow_blank=True, allow_null=True)
    url_picture = serializers.CharField(required=False, default="", max_length=1024, allow_blank=True, allow_null=True)

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


class UserSQLSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    email = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=1024)
    affiliation = serializers.CharField(required=False, default="", max_length=1024, allow_blank=True, allow_null=True)
    history = serializers.CharField(required=False, default="", max_length=1024, allow_blank=True, allow_null=True)
    interests = serializers.CharField(required=False, default="", max_length=1024, allow_blank=True, allow_null=True)

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
    name = serializers.CharField(max_length=512)

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
    name = serializers.CharField(max_length=512)

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

class ComplexSQLSerializer(serializers.Serializer):
    str_1 = serializers.CharField(read_only=True, max_length=1024)
    str_2 = serializers.CharField(read_only=True, max_length=1024)
    str_3 = serializers.CharField(read_only=True, max_length=1024)
    str_4 = serializers.CharField(read_only=True, max_length=1024)
    str_5 = serializers.CharField(read_only=True, max_length=1024)
    str_6 = serializers.CharField(read_only=True, max_length=1024)
    str_7 = serializers.CharField(read_only=True, max_length=1024)
    str_8 = serializers.CharField(read_only=True, max_length=1024)
    int_1 = serializers.IntegerField(read_only=True)
    int_2 = serializers.IntegerField(read_only=True)
    int_3 = serializers.IntegerField(read_only=True)
    int_4 = serializers.IntegerField(read_only=True)
    dec_1 = serializers.DecimalField(read_only=True, max_digits=10, decimal_places=2, coerce_to_string=False)
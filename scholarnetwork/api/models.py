from django.db import models
from .managers import ArticleSQLManager, AuthorSQLManager

class Article(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField()
    affiliation = models.TextField()
    citedby = models.IntegerField()
    pub_title = models.TextField()
    pub_year = models.IntegerField()
    citations = models.IntegerField()
    pub_author = models.TextField()
    eprint = models.TextField()

    class Meta:
        db_table = 'articles'

class ArticleSQL():
    objects = ArticleSQLManager()
    
    def __init__(self):
        self.id = None
        self.name = None
        self.affiliation = None
        self.citedby = None
        self.pub_title = None
        self.pub_year = None
        self.citations = None
        self.pub_author = None
        self.eprint = None
    
    def save(self):
        if self.id is not None:
            self.objects.update(self)
        else:
            self.objects.insert(self)
    
    def delete(self):
        self.objects.delete(self)



class Author(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField()
    affiliation = models.TextField()
    citedby = models.TextField() # there are 8 tuples that all seem to offset this field and all others below by one column
    attributes = models.TextField() # it's possible that this bad data leaked into other tables
    page = models.TextField()
    email = models.TextField()
    interests = models.TextField()
    url_picture = models.TextField()

    class Meta:
        db_table = 'authors'

class AuthorSQL():
    objects = AuthorSQLManager()

    def __init__(self):
        self.id = None
        self.name = None
        self.affiliation = None
        self.citedby = None
        self.attributes = None
        self.page = None
        self.email = None
        self.interests = None
        self.url_picture = None
    
    def save(self):
        if self.id is not None:
            self.objects.update(self)
        else:
            self.objects.insert(self)
    
    def delete(self):
        self.objects.delete(self)

class User(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.TextField()
    password = models.TextField()
    affiliation = models.TextField()
    history = models.TextField()
    interests = models.TextField()

    class Meta:
        db_table = 'users'
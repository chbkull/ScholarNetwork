from django.db import models

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

class User(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.TextField()
    password = models.TextField()
    affiliation = models.TextField()
    history = models.TextField()
    interests = models.TextField()

    class Meta:
        db_table = 'users'
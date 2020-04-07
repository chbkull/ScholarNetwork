from django.db import models

class Article(models.Model):
    id = models.IntegerField(primary_key=True)
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
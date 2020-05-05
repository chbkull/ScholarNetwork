from django.db import models
from .managers import ArticleSQLManager, AuthorSQLManager, UserSQLManager, PublisherSQLManager, JournalSQLManager, ComplexSQLManager


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


class AuthorSQL():
    objects = AuthorSQLManager()

    def __init__(self):
        self.id = None
        self.name = None
        self.affiliation = None
        self.citedby = None
        self.citedby_5 = None
        self.h_index = None
        self.h_index_5 = None
        self.i10_index = None
        self.i10_index_5 = None
        self.citedby_history = None
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


class UserSQL():
    objects = UserSQLManager()

    def __init__(self):
        self.id = None
        self.email = None
        self.password = None
        self.affiliation = None
        self.history = None
        self.interests = None

    def save(self):
        if self.id is not None:
            self.objects.update(self)
        else:
            self.objects.insert(self)
    
    def delete(self):
        self.objects.delete(self)


class PublisherSQL():
    objects = PublisherSQLManager()

    def __init__(self):
        self.id = None
        self.name = None
    
    def save(self):
        if self.id is not None:
            self.objects.update(self)
        else:
            self.objects.insert(self)
    
    def delete(self):
        self.objects.delete(self)


class JournalSQL():
    objects = JournalSQLManager()

    def __init__(self):
        self.id = None
        self.name = None
    
    def save(self):
        if self.id is not None:
            self.objects.update(self)
        else:
            self.objects.insert(self)
    
    def delete(self):
        self.objects.delete(self)

class ComplexSQL():
    objects = ComplexSQLManager()

    def __init__(self):
        self.str_1 = None
        self.str_2 = None
        self.str_3 = None
        self.str_4 = None
        self.str_5 = None
        self.str_6 = None
        self.str_7 = None
        self.str_8 = None
        self.int_1 = None
        self.int_2 = None
        self.int_3 = None
        self.int_4 = None
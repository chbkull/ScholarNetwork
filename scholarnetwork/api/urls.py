from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    # articles
    path('api/articles/', views.ArticleSQLList),
    path('api/articles/<int:id>', views.ArticleSQLDetail),
    path('api/articles/searchtitle/<slug:search_term>', views.ArticleSQLSearchTitle),
    path('api/articles/searchtitle/', views.ArticleSQLSearchTitleJson),
    path('api/articles/searchauthor/<slug:search_term>', views.ArticleSQLSearchAuthor),
    path('api/articles/searchauthor/', views.ArticleSQLSearchAuthorJson),
    
    # authors
    path('api/authors/', views.AuthorSQLList),
    path('api/authors/<int:id>', views.AuthorSQLDetail),
    path('api/authors/searchname/<slug:search_term>', views.AuthorSQLSearchName),
    path('api/authors/searchname/', views.AuthorSQLSearchNameJson),
    path('api/authors/searchaffiliation/<slug:search_term>', views.AuthorSQLSearchAffiliation),
    path('api/authors/searchaffiliation/', views.AuthorSQLSearchAffiliationJson),
    
    # users
    path('api/users/', views.UserSQLList),
    path('api/users/<int:id>', views.UserSQLDetail),
    path('api/users/searchemail/<slug:search_term>', views.UserSQLSearchEmail),
    path('api/users/searchemail/', views.UserSQLSearchEmailJson),
    path('api/users/searchaffiliation/<slug:search_term>', views.UserSQLSearchAffiliation),
    path('api/users/searchaffiliation/', views.UserSQLSearchAffiliationJson),

    # publishers
    path('api/publishers/', views.PublisherSQLList),
    path('api/publishers/<int:id>', views.PublisherSQLDetail),
    path('api/publishers/searchname/<slug:search_term>', views.PublisherSQLSearchName),
    path('api/publishers/searchname/', views.PublisherSQLSearchNameJson),

    # journals
    path('api/journals/', views.JournalSQLList),
    path('api/journals/<int:id>', views.JournalSQLDetail),
    path('api/journals/searchname/<slug:search_term>', views.JournalSQLSearchName),
    path('api/journals/searchname/', views.JournalSQLSearchNameJson),
]

urlpatterns = format_suffix_patterns(urlpatterns)
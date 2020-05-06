from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    # articles
    path('api/articles/', views.ArticleSQLList), # GET - returns ALL articles, POST - creates new article

    path('api/articles/<int:id>', views.ArticleSQLDetail), # GET - returns article with id, PUT - updates article with id, DELETE - deletes article with id

    path('api/articles/searchtitle/<str:search_term>', views.ArticleSQLSearchTitle), # GET - searches for articles with term in title
    # path('api/articles/searchtitle/', views.ArticleSQLSearchTitleJson),

    path('api/articles/searchauthor/<str:search_term>', views.ArticleSQLSearchAuthor), # GET - searches for articles with term in author name
    # path('api/articles/searchauthor/', views.ArticleSQLSearchAuthorJson),
    

    # authors
    path('api/authors/', views.AuthorSQLList), # GET - returns ALL authors, POST - creates new author

    path('api/authors/<int:id>', views.AuthorSQLDetail), # GET - returns author with id, PUT - updates author with id, DELETE - deletes author with id

    path('api/authors/searchname/<str:search_term>', views.AuthorSQLSearchName), # GET - searches for authors with term in name
    # path('api/authors/searchname/', views.AuthorSQLSearchNameJson),

    path('api/authors/searchaffiliation/<str:search_term>', views.AuthorSQLSearchAffiliation), # GET - searches for authors with term in affiliation
    # path('api/authors/searchaffiliation/', views.AuthorSQLSearchAffiliationJson),
    

    # users
    path('api/users/', views.UserSQLList), # GET - returns ALL users, POST - creates new user

    path('api/users/<int:id>', views.UserSQLDetail), # GET - returns user with id, PUT - updates user with id, DELETE - deletes user with id

    path('api/users/searchemail/<str:search_term>', views.UserSQLSearchEmail), # GET - searches for users with term in email
    # path('api/users/searchemail/', views.UserSQLSearchEmailJson),

    path('api/users/searchaffiliation/<str:search_term>', views.UserSQLSearchAffiliation), # GET - searches for users with term in affiliation
    # path('api/users/searchaffiliation/', views.UserSQLSearchAffiliationJson),


    # publishers
    path('api/publishers/', views.PublisherSQLList), # GET - returns ALL publishers, POST - creates new publisher

    path('api/publishers/<int:id>', views.PublisherSQLDetail), # GET - returns publisher with id, PUT - updates publisher with id, DELETE - deletes publisher with id

    path('api/publishers/searchname/<str:search_term>', views.PublisherSQLSearchName), # GET - searches for publishers with term in name
    # path('api/publishers/searchname/', views.PublisherSQLSearchNameJson),


    # journals
    path('api/journals/', views.JournalSQLList), # GET - returns ALL journals, POST - creates new journal

    path('api/journals/<int:id>', views.JournalSQLDetail), # GET - returns journal with id, PUT - updates journal with id, DELETE - deletes journal with id

    path('api/journals/searchname/<str:search_term>', views.JournalSQLSearchName), # GET - searches for journals with term in name
    # path('api/journals/searchname/', views.JournalSQLSearchNameJson),

    
    # relationships
    path('api/writtenby/', views.AddWrittenBy), # POST - creates a new writtenby relationship


    # complex queries - joins, interesting statistics or both

    # Representation of published_in table
    # returns: int_1 = journals.id, str_1 = journals.name, int_2 = articles.id, str_2 = articles.pub_title, str_3 = articles.pub_author
    path('api/complex/articlesinjournal/<str:search_term>', views.ComplexSQLArticlesInJournal), # GET request

    # Representation of published_by table
    # returns: int_1 = publishers.id, str_1 = publishers.name, int_2 = articles.id, str_2 = articles.pub_title, str_3 = articles.pub_author
    path('api/complex/articlesfrompublisher/<str:search_term>', views.ComplexSQLArticlesFromPublisher), # GET request

    # Computes all journals' average h-index based on the h-index of contributing authors
    # returns: int_1 = journals.id, str_1 = journals.name, dec_1 = average h_index, int_2 = number of authors
    path('api/complex/journalavghindex/', views.ComplexSQLJournalAvgHIndex), # GET request

    # Computes all publishers' average h-index based on the h-index of contributing authors
    # returns: int_1 = publishers.id, str_1 = publishers.name, dec_1 = average h_index, int_2 = number of authors
    path('api/complex/publisheravghindex/', views.ComplexSQLPublisherAvgHIndex), # GET request

    # Computes the number of journals a publisher has published
    # returns: int_1 = publishers.id, str_1 = publishers.name, int_2 = number of journals
    path('api/complex/publisherjournalspublished/', views.ComplexSQLPublisherJournalsPublished), # GET request

    # Computes the number of journals an author has contributed to
    # returns: int_1 = authors.id, str_1 = authors.name, int_2 = number of journals
    path('api/complex/authorjournalspublishedin/', views.ComplexSQLAuthorJournalsPublishedIn), # GET request

    # Computes citedby statistics for a journal (avg, total, num articles)
    # returns: int_1 = journals.id, str_1 = journals.name, dec_1 = average citedby, int_2 = total citedby, int_3 = number of articles
    path('api/complex/journalcitedbystats/', views.ComplexSQLJournalCitedbyStats), # GET request

    # Computes citedby statistics for a publisher (avg, total, num articles)
    # returns: int_1 = publishers.id, str_1 = publishers.name, dec_1 = average citedby, int_2 = total citedby, int_3 = number of articles
    path('api/complex/publishercitedbystats/', views.ComplexSQLPublisherCitedbyStats),
]

urlpatterns = format_suffix_patterns(urlpatterns)
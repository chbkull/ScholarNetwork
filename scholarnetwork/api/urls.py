from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    # articles
    # path('api/articles/', views.ArticleList.as_view()),
    path('api/articles/', views.ArticleSQLList),
    # path('api/articles/<int:pk>', views.ArticleDetail.as_view()),
    path('api/articles/<int:id>', views.ArticleSQLDetail),
    # path('api/articles/searchtitle/<slug:searchby>', views.ArticleSearchTitle.as_view()),
    path('api/articles/searchtitle/<slug:search_term>', views.ArticleSQLSearchTitle),
    path('api/articles/searchtitle/', views.ArticleSQLSearchTitleJson),
    # path('api/articles/searchauthor/<slug:searchby>', views.ArticleSearchAuthor.as_view()),
    path('api/articles/searchauthor/<slug:search_term>', views.ArticleSQLSearchAuthor),
    path('api/articles/searchauthor/', views.ArticleSQLSearchAuthorJson),
    
    # authors
    # path('api/authors/', views.AuthorList.as_view()),
    path('api/authors/', views.AuthorSQLList),
    # path('api/authors/<int:pk>', views.AuthorDetail.as_view()),
    path('api/authors/<int:id>', views.AuthorSQLDetail),
    # path('api/authors/searchname/<slug:searchby>', views.AuthorSearchName.as_view()),
    path('api/authors/searchname/<slug:search_term>', views.AuthorSQLSearchName),
    path('api/authors/searchname/', views.AuthorSQLSearchNameJson),
    # path('api/authors/searchaffiliation/<slug:searchby>', views.AuthorSearchAffiliation.as_view()),
    path('api/authors/searchaffiliation/<slug:search_term>', views.AuthorSQLSearchAffiliation),
    path('api/authors/searchaffiliation/', views.AuthorSQLSearchAffiliationJson),
    
    # users
    # path('api/users/', views.UserList.as_view()),
    path('api/users/', views.UserSQLList),
    # path('api/users/<int:pk>', views.UserDetail.as_view()),
    path('api/users/<int:id>', views.UserSQLDetail),
    # path('api/users/searchemail/<slug:searchby>', views.UserSearchEmail.as_view()),
    path('api/users/searchemail/<slug:search_term>', views.UserSQLSearchEmail),
    path('api/users/searchemail/', views.UserSQLSearchEmailJson),
    # path('api/users/searchaffiliation/<slug:searchby>', views.UserSearchAffiliation.as_view()),
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


    # path('api/articlessql/', views.ArticleSQLList),
    # path('api/articlessqldetail/<int:id>', views.ArticleSQLDetail),
    # path('api/articlessql/searchtitle/<slug:search_term>', views.ArticleSQLSearchTitle),
    # path('api/articlessql/searchtitle/', views.ArticleSQLSearchTitleJson),
    # path('api/articlessql/searchauthor/<slug:search_term>', views.ArticleSQLSearchAuthor),
    # path('api/articlessql/searchauthor/', views.ArticleSQLSearchAuthorJson),
    # path('api/authorssql/', views.AuthorSQLList),
    # path('api/authorssqldetail/<int:id>', views.AuthorSQLDetail),
    # path('api/authorssql/searchaffiliation/<slug:search_term>', views.AuthorSQLSearchAffiliation),
    # path('api/authorssql/searchaffiliation/', views.AuthorSQLSearchAffiliationJson),
    # path('api/authorssql/searchname/<slug:search_term>', views.AuthorSQLSearchName),
    # path('api/authorssql/searchname/', views.AuthorSQLSearchNameJson),
    # path('api/userssql/', views.UserSQLList),
    # path('api/userssqldetail/<int:id>', views.UserSQLDetail),
    # path('api/userssql/searchaffiliation/<slug:search_term>', views.UserSQLSearchAffiliation),
    # path('api/userssql/searchaffiliation/', views.UserSQLSearchAffiliationJson),
    # path('api/userssql/searchemail/<slug:search_term>', views.UserSQLSearchEmail),
    # path('api/userssql/searchemail/', views.UserSQLSearchEmailJson),
    # path('api/publisherssql/', views.PublisherSQLList),
    # path('api/publisherssqldetail/<int:id>', views.PublisherSQLDetail),
    # path('api/publisherssql/searchname/<slug:search_term>', views.PublisherSQLSearchName),
    # path('api/publisherssql/searchname/', views.PublisherSQLSearchNameJson),
    # path('api/journalssql/', views.JournalSQLList),
    # path('api/journalssqldetail/<int:id>', views.JournalSQLDetail),
    # path('api/journalssql/searchname/<slug:search_term>', views.JournalSQLSearchName),
    # path('api/journalssql/searchname/', views.JournalSQLSearchNameJson),
]

urlpatterns = format_suffix_patterns(urlpatterns)
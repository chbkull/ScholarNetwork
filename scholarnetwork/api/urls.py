from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('api/articles/', views.ArticleList.as_view()),
    path('api/articles/<int:pk>', views.ArticleDetail.as_view()),
    path('api/articles/searchtitle/<slug:searchby>', views.ArticleSearchTitle.as_view()),
    path('api/articles/searchauthor/<slug:searchby>', views.ArticleSearchAuthor.as_view()),
    path('api/authors/', views.AuthorList.as_view()),
    path('api/authors/<int:pk>', views.AuthorDetail.as_view()),
    path('api/authors/searchname/<slug:searchby>', views.AuthorSearchName.as_view()),
    path('api/authors/searchaffiliation/<slug:searchby>', views.AuthorSearchAffiliation.as_view()),
    path('api/users/', views.UserList.as_view()),
    path('api/users/<int:pk>', views.UserDetail.as_view()),
    path('api/users/searchemail/<slug:searchby>', views.UserSearchEmail.as_view()),
    path('api/users/searchaffiliation/<slug:searchby>', views.UserSearchAffiliation.as_view()),
    path('api/articlessql/', views.ArticleSQLList),
    path('api/articlessqldetail/<int:id>', views.ArticleSQLDetail),
    path('api/articlessql/searchtitle/<slug:search_term>', views.ArticleSQLSearchTitle),
    path('api/articlessql/searchauthor/<slug:search_term>', views.ArticleSQLSearchAuthor)
]

urlpatterns = format_suffix_patterns(urlpatterns)
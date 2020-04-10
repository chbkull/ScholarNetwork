from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    # path('api/articles/', views.ArticleListCreate.as_view()),
    # path('api/articles/', views.request_article),
    path('api/articles/', views.ArticleList.as_view()),
    path('api/articles/<int:pk>', views.ArticleDetail.as_view()),
    path('api/authors/', views.AuthorListCreate.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
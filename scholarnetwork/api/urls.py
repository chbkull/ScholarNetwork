from django.urls import path
from . import views

urlpatterns = [
    path('api/articles/', views.ArticleListCreate.as_view()),
    path('api/authors/', views.AuthorListCreate.as_view())
]
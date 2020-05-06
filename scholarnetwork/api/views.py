from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import ArticleSQL, AuthorSQL, UserSQL, PublisherSQL, JournalSQL, ComplexSQL
from .serializers import ArticleSQLSerializer, AuthorSQLSerializer, UserSQLSerializer, PublisherSQLSerializer, JournalSQLSerializer, ComplexSQLSerializer
from .managers import RelationshipSQLManager


@api_view(['GET', 'POST'])
def ArticleSQLList(request, format=None):
    if request.method == 'GET':
        articles = ArticleSQL.objects.all()
        serializer = ArticleSQLSerializer(articles, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ArticleSQLSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def ArticleSQLDetail(request, id, format=None):
    article = ArticleSQL.objects.get(id)
    if article is None:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = ArticleSQLSerializer(article, many=True)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = ArticleSQLSerializer(article, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        article[0].delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def ArticleSQLSearchTitle(request, search_term, format=None):
    if request.method == 'GET':
        articles = ArticleSQL.objects.search_title(search_term)
        serializer = ArticleSQLSerializer(articles, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def ArticleSQLSearchTitleJson(request, format=None):
    if request.method == 'GET':
        if 'search_term' in request.data:
            articles = ArticleSQL.objects.search_title(request.data['search_term'])
            serializer = ArticleSQLSerializer(articles, many=True)
            return Response(serializer.data)
        else:
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def ArticleSQLSearchAuthor(request, search_term, format=None):
    if request.method == 'GET':
        articles = ArticleSQL.objects.search_author(search_term)
        serializer = ArticleSQLSerializer(articles, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def ArticleSQLSearchAuthorJson(request, format=None):
    if request.method == 'GET':
        if 'search_term' in request.data:
            articles = ArticleSQL.objects.search_author(request.data['search_term'])
            serializer = ArticleSQLSerializer(articles, many=True)
            return Response(serializer.data)
        else:
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def AuthorSQLList(request, format=None):
    if request.method == 'GET':
        authors = AuthorSQL.objects.all()
        serializer = AuthorSQLSerializer(authors, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = AuthorSQLSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def AuthorSQLDetail(request, id, format=None):
    author = AuthorSQL.objects.get(id)
    if author is None:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = AuthorSQLSerializer(author, many=True)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = AuthorSQLSerializer(author, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        author[0].delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def AuthorSQLSearchAffiliation(request, search_term, format=None):
    if request.method == 'GET':
        authors = AuthorSQL.objects.search_affiliation(search_term)
        serializer = AuthorSQLSerializer(authors, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def AuthorSQLSearchAffiliationJson(request, format=None):
    if request.method == 'GET':
        if 'search_term' in request.data:
            authors = AuthorSQL.objects.search_affiliation(request.data['search_term'])
            serializer = AuthorSQLSerializer(authors, many=True)
            return Response(serializer.data)
        else:
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def AuthorSQLSearchName(request, search_term, format=None):
    if request.method == 'GET':
        authors = AuthorSQL.objects.search_name(search_term)
        serializer = AuthorSQLSerializer(authors, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def AuthorSQLSearchNameJson(request, format=None):
    if request.method == 'GET':
        if 'search_term' in request.data:
            authors = AuthorSQL.objects.search_name(request.data['search_term'])
            serializer = AuthorSQLSerializer(authors, many=True)
            return Response(serializer.data)
        else:
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def UserSQLList(request, format=None):
    if request.method == 'GET':
        users = UserSQL.objects.all()
        serializer = UserSQLSerializer(users, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = UserSQLSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def UserSQLDetail(request, id, format=None):
    user = UserSQL.objects.get(id)
    if user is None:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = UserSQLSerializer(user, many=True)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = UserSQLSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        user[0].delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def UserSQLSearchAffiliation(request, search_term, format=None):
    if request.method == 'GET':
        users = UserSQL.objects.search_affiliation(search_term)
        serializer = UserSQLSerializer(users, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def UserSQLSearchAffiliationJson(request, format=None):
    if request.method == 'GET':
        if 'search_term' in request.data:
            users = UserSQL.objects.search_affiliation(request.data['search_term'])
            serializer = UserSQLSerializer(users, many=True)
            return Response(serializer.data)
        else:
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def UserSQLSearchEmail(request, search_term, format=None):
    if request.method == 'GET':
        users = UserSQL.objects.search_email(search_term)
        serializer = UserSQLSerializer(users, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def UserSQLSearchEmailJson(request, format=None):
    if request.method == 'GET':
        if 'search_term' in request.data:
            users = UserSQL.objects.search_email(request.data['search_term'])
            serializer = UserSQLSerializer(users, many=True)
            return Response(serializer.data)
        else:
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def PublisherSQLList(request, format=None):
    if request.method == 'GET':
        publishers = PublisherSQL.objects.all()
        serializer = PublisherSQLSerializer(publishers, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PublisherSQLSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def PublisherSQLDetail(request, id, format=None):
    publisher = PublisherSQL.objects.get(id)
    if publisher is None:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = PublisherSQLSerializer(publisher, many=True)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = PublisherSQLSerializer(publisher, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        publisher[0].delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def PublisherSQLSearchName(request, search_term, format=None):
    if request.method == 'GET':
        publishers = PublisherSQL.objects.search_name(search_term)
        serializer = PublisherSQLSerializer(publishers, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def PublisherSQLSearchNameJson(request, format=None):
    if request.method == 'GET':
        if 'search_term' in request.data:
            publishers = PublisherSQL.objects.search_name(request.data['search_term'])
            serializer = PublisherSQLSerializer(publishers, many=True)
            return Response(serializer.data)
        else:
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def JournalSQLList(request, format=None):
    if request.method == 'GET':
        journals = JournalSQL.objects.all()
        serializer = JournalSQLSerializer(journals, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = JournalSQLSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def JournalSQLDetail(request, id, format=None):
    journal = JournalSQL.objects.get(id)
    if journal is None:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = JournalSQLSerializer(journal, many=True)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = JournalSQLSerializer(journal, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        journal[0].delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def JournalSQLSearchName(request, search_term, format=None):
    if request.method == 'GET':
        journals = JournalSQL.objects.search_name(search_term)
        serializer = JournalSQLSerializer(journals, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def JournalSQLSearchNameJson(request, format=None):
    if request.method == 'GET':
        if 'search_term' in request.data:
            journals = JournalSQL.objects.search_name(request.data['search_term'])
            serializer = JournalSQLSerializer(journals, many=True)
            return Response(serializer.data)
        else:
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def AddWrittenBy(request, format=None):
    if request.method == 'POST':
        if 'article_id' in request.data and 'author_id' in request.data:
            article_id = request.data['article_id']
            author_id = request.data['author_id']
            RelationshipSQLManager.add_written_by(article_id, author_id)
            return HttpResponse(status=status.HTTP_204_NO_CONTENT)
        else:
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
        


@api_view(['GET'])
def ComplexSQLArticlesInJournal(request, search_term, format=None):
    if request.method == 'GET':
        results = ComplexSQL.objects.articles_in_journal(search_term)
        serializer = ComplexSQLSerializer(results, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def ComplexSQLArticlesFromPublisher(request, search_term, format=None):
    if request.method == 'GET':
        results = ComplexSQL.objects.articles_from_publisher(search_term)
        serializer = ComplexSQLSerializer(results, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def ComplexSQLJournalAvgHIndex(request, format=None):
    if request.method == 'GET':
        results = ComplexSQL.objects.journal_avg_h_index()
        serializer = ComplexSQLSerializer(results, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def ComplexSQLPublisherAvgHIndex(request, format=None):
    if request.method == 'GET':
        results = ComplexSQL.objects.publisher_avg_h_index()
        serializer = ComplexSQLSerializer(results, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def ComplexSQLPublisherJournalsPublished(request, format=None):
    if request.method == 'GET':
        results = ComplexSQL.objects.publisher_journals_published()
        serializer = ComplexSQLSerializer(results, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def ComplexSQLAuthorJournalsPublishedIn(request, format=None):
    if request.method == 'GET':
        results = ComplexSQL.objects.author_journals_published_in()
        serializer = ComplexSQLSerializer(results, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def ComplexSQLJournalCitedbyStats(request, format=None):
    if request.method == 'GET':
        results = ComplexSQL.objects.journal_citedby_stats()
        serializer = ComplexSQLSerializer(results, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def ComplexSQLPublisherCitedbyStats(request, format=None):
    if request.method == 'GET':
        results = ComplexSQL.objects.publisher_citedby_stats()
        serializer = ComplexSQLSerializer(results, many=True)
        return Response(serializer.data)
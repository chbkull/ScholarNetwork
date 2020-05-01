from django.db import connection

class ArticleSQLManager():
    def __init__(self):
        pass

    @staticmethod
    def format_boolean(value):
        return 'TRUE' if value else 'FALSE'

    @staticmethod
    def format_date(value):
        return value.isoformat()

    @staticmethod
    def format_datetime(value):
        return value.isoformat()

    @staticmethod
    def delete(c):
        pass

    @staticmethod
    def update(c):
        cursor = connection.cursor()
        query = """UPDATE articles
                   SET name='{1}',
                       affiliation='{2}',
                       citedby='{3}',
                       pub_title='{4}',
                       pub_year='{5}',
                       citations='{6}',
                       pub_author='{7}',
                       eprint='{8}'
                   WHERE id={0};""".format(
            c.id,
            c.name,
            c.affiliation,
            c.citedby,
            c.pub_title,
            c.pub_year,
            c.citations,
            c.pub_author,
            c.eprint)

        cursor.execute(query)

    @staticmethod
    def all():
        cursor = connection.cursor()
        query = """SELECT id, name, affiliation, citedby, pub_title, pub_year,
                    citations, pub_author, eprint
                  FROM articles;"""

        cursor.execute(query)
        objects = []

        from .models import ArticleSQL

        for row in cursor.fetchall():
            c = ArticleSQL()
            c.id = row[0],
            c.name = row[1],
            c.affiliation = row[2],
            c.citedby = row[3],
            c.pub_title = row[4],
            c.pub_year = row[5],
            c.citations = row[6],
            c.pub_author = row[7],
            c.eprint = row[8]
            objects.append(c)

        return objects
    
    @staticmethod
    def get(id):
        cursor = connection.cursor()
        query = """SELECT id, name, affiliation, citedby, pub_title, pub_year,
                    citations, pub_author, eprint
                  FROM articles WHERE id={0};""".format(id)

        cursor.execute(query)
        objects = []

        from .models import ArticleSQL
        print("fetching")

        for row in cursor.fetchall():
            c = ArticleSQL()
            c.id = row[0],
            c.name = row[1],
            c.affiliation = row[2],
            c.citedby = row[3],
            c.pub_title = row[4],
            c.pub_year = row[5],
            c.citations = row[6],
            c.pub_author = row[7],
            c.eprint = row[8]
            objects.append(c)

        return None if len(objects) == 0 else objects[0]
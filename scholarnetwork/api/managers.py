from django.db import connection


class ArticleSQLManager():

    @staticmethod
    def insert(c):
        cursor = connection.cursor()
        query = """
            INSERT INTO articles (name, affiliation, citedby, pub_title, pub_year, citations, pub_author, eprint)
            VALUES ('{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}');
        """.format(
            c.name, c.affiliation, c.citedby, c.pub_title, c.pub_year, c.citations, c.pub_author, c.eprint
        )

        cursor.execute(query)

    @staticmethod
    def get(id):
        cursor = connection.cursor()
        query = """
            SELECT id, name, affiliation, citedby, pub_title, pub_year, citations, pub_author, eprint
            FROM articles
            WHERE id={0};
        """.format(
            id
        )

        cursor.execute(query)
        objects = []

        from .models import ArticleSQL

        for row in cursor.fetchall():
            c = ArticleSQL()
            c.id = row[0]
            c.name = row[1]
            c.affiliation = row[2]
            c.citedby = row[3]
            c.pub_title = row[4]
            c.pub_year = row[5]
            c.citations = row[6]
            c.pub_author = row[7]
            c.eprint = row[8]
            objects.append(c)

        return None if len(objects) == 0 else objects[0]

    @staticmethod
    def update(c):
        cursor = connection.cursor()
        query = """
            UPDATE articles SET name='{0}', affiliation='{1}', citedby='{2}', pub_title='{3}',
                pub_year='{4}', citations='{5}', pub_author='{6}', eprint='{7}'
            WHERE id={8};
        """.format(
            c.name, c.affiliation, c.citedby, c.pub_title,
                c.pub_year, c.citations, c.pub_author, c.eprint,
            c.id
        )

        cursor.execute(query)

    @staticmethod
    def delete(c):
        cursor = connection.cursor()
        query = """DELETE FROM articles WHERE id = {0};""".format(c.id)

        cursor.execute(query)

    @staticmethod
    def all():
        cursor = connection.cursor()
        query = """
            SELECT id, name, affiliation, citedby, pub_title, pub_year, citations, pub_author, eprint
            FROM articles
            LIMIT 10;
        """

        cursor.execute(query)
        objects = []

        from .models import ArticleSQL

        for row in cursor.fetchall():
            c = ArticleSQL()
            c.id = row[0]
            c.name = row[1]
            c.affiliation = row[2]
            c.citedby = row[3]
            c.pub_title = row[4]
            c.pub_year = row[5]
            c.citations = row[6]
            c.pub_author = row[7]
            c.eprint = row[8]
            objects.append(c)

        return objects

    @staticmethod
    def last_id():
        cursor = connection.cursor()
        query = """
            SELECT LAST_INSERT_ID();
        """

        cursor.execute(query)
        id = []

        for row in cursor.fetchall():
            id.append(row[0])

        return id[0]

    
    @staticmethod
    def search_title(search_term):
        cursor = connection.cursor()
        query = """
            SELECT id, name, affiliation, citedby, pub_title, pub_year, citations, pub_author, eprint
            FROM articles
            WHERE pub_title LIKE '%{0}%';
        """.format(
            search_term
        )

        cursor.execute(query)
        objects = []

        from .models import ArticleSQL

        for row in cursor.fetchall():
            c = ArticleSQL()
            c.id = row[0]
            c.name = row[1]
            c.affiliation = row[2]
            c.citedby = row[3]
            c.pub_title = row[4]
            c.pub_year = row[5]
            c.citations = row[6]
            c.pub_author = row[7]
            c.eprint = row[8]
            objects.append(c)

        return objects

    @staticmethod
    def search_author(search_term):
        cursor = connection.cursor()
        query = """
            SELECT id, name, affiliation, citedby, pub_title, pub_year, citations, pub_author, eprint
            FROM articles
            WHERE pub_author LIKE '%{0}%';
        """.format(
            search_term
        )

        cursor.execute(query)
        objects = []

        from .models import ArticleSQL

        for row in cursor.fetchall():
            c = ArticleSQL()
            c.id = row[0]
            c.name = row[1]
            c.affiliation = row[2]
            c.citedby = row[3]
            c.pub_title = row[4]
            c.pub_year = row[5]
            c.citations = row[6]
            c.pub_author = row[7]
            c.eprint = row[8]
            objects.append(c)

        return objects

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
        query = """SELECT LAST_INSERT_ID();"""

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

class AuthorSQLManager():

    @staticmethod
    def insert(a):
        cursor = connection.cursor()
        query = """
            INSERT INTO authors (name, affiliation, citedby, attributes, page, email, interests, url_picture)
            VALUES ('{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}');
        """.format(
            a.name, a.affiliation, a.citedby, a.attributes, a.page, a.email, a.interests, a.url_picture
        )
    
        cursor.execute(query)

    @staticmethod
    def get(id):
        cursor = connection.cursor()
        query = """
            SELECT id, name, affiliation, citedby, attributes, page, email, interests, url_picture
            FROM authors
            WHERE id={0};
        """.format(
            id
        )

        cursor.execute(query)
        objects = []

        from .models import AuthorSQL

        for row in cursor.fetchall():
            a = AuthorSQL()
            a.id = row[0]
            a.name = row[1]
            a.affiliation = row[2]
            a.citedby = row[3]
            a.attributes = row[4]
            a.page = row[5]
            a.email = row[6]
            a.interests = row[7]
            a.url_picture = row[8]
            objects.append(a)
        
        return None if len(objects) == 0 else objects[0]
    
    @staticmethod
    def update(a):
        cursor = connection.cursor()
        query = """
            UPDATE authors SET name='{0}', affiliation='{1}', citedby='{2}', attributes='{3}',
                page='{4}', email='{5}', interests='{6}', url_picture='{7}'
            WHERE id={8};
        """.format(
            a.name, a.affiliation, a.citedby, a.attributes,
                a.page, a.email, a.interests, a.url_picture,
            a.id
        )

        cursor.execute(query)

    @staticmethod
    def delete(a):
        cursor = connection.cursor()
        query = """DELETE FROM authors WHERE id = {0};""".format(a.id)

        cursor.execute(query)
    
    @staticmethod
    def all():
        cursor = connection.cursor()
        query = """
            SELECT id, name, affiliation, citedby, attributes, page, email, interests, url_picture
            FROM authors
            LIMIT 10;
        """

        cursor.execute(query)
        objects = []

        from .models import AuthorSQL

        for row in cursor.fetchall():
            a = AuthorSQL()
            a.id = row[0]
            a.name = row[1]
            a.affiliation = row[2]
            a.citedby = row[3]
            a.attributes = row[4]
            a.page = row[5]
            a.email = row[6]
            a.interests = row[7]
            a.url_picture = row[8]
            objects.append(a)
        
        return objects
    
    @staticmethod
    def last_id():
        cursor = connection.cursor()
        query = """SELECT LAST_INSERT_ID();"""

        cursor.execute(query)
        id = []

        for row in cursor.fetchall():
            id.append(row[0])

        return id[0]
    
    @staticmethod
    def search_affiliation(search_term):
        cursor = connection.cursor()
        query = """
            SELECT id, name, affiliation, citedby, attributes, page, email, interests, url_picture
            FROM authors
            WHERE affiliation LIKE '%{0}%';
        """.format(
            search_term
        )

        cursor.execute(query)
        objects = []

        from .models import AuthorSQL

        for row in cursor.fetchall():
            a = AuthorSQL()
            a.id = row[0]
            a.name = row[1]
            a.affiliation = row[2]
            a.citedby = row[3]
            a.attributes = row[4]
            a.page = row[5]
            a.email = row[6]
            a.interests = row[7]
            a.url_picture = row[8]
            objects.append(a)
        
        return objects
    
    @staticmethod
    def search_name(search_term):
        cursor = connection.cursor()
        query = """
            SELECT id, name, affiliation, citedby, attributes, page, email, interests, url_picture
            FROM authors
            WHERE name LIKE '%{0}%';
        """.format(
            search_term
        )

        cursor.execute(query)
        objects = []

        from .models import AuthorSQL

        for row in cursor.fetchall():
            a = AuthorSQL()
            a.id = row[0]
            a.name = row[1]
            a.affiliation = row[2]
            a.citedby = row[3]
            a.attributes = row[4]
            a.page = row[5]
            a.email = row[6]
            a.interests = row[7]
            a.url_picture = row[8]
            objects.append(a)
        
        return objects

class UserSQLManager():
    
    @staticmethod
    def insert(u):
        cursor = connection.cursor()
        query = """
            INSERT INTO users (email, password, affiliation, history, interests)
            VALUES ('{0}', '{1}', '{2}', '{3}', '{4}');
        """.format(
            u.email, u.password, u.affiliation, u.history, u.interests
        )

        cursor.execute(query)
    
    @staticmethod
    def get(id):
        cursor = connection.cursor()
        query = """
            SELECT id, email, password, affiliation, history, interests
            FROM users
            WHERE id={0};
        """.format(
            id
        )

        cursor.execute(query)
        objects = []

        from .models import UserSQL

        for row in cursor.fetchall():
            u = UserSQL()
            u.id = row[0]
            u.email = row[1]
            u.password = row[2]
            u.affiliation = row[3]
            u.history = row[4]
            u.interests = row[5]
            objects.append(u)
        
        return None if len(objects) == 0 else objects[0]
    
    @staticmethod
    def update(u):
        cursor = connection.cursor()
        query = """
            UPDATE users SET email='{0}', password='{1}', affiliation='{2}', history='{3}', interests='{4}'
            WHERE id={5};
        """.format(
            u.email, u.password, u.affiliation, u.history, u.interests,
            u.id
        )

        cursor.execute(query)
    
    @staticmethod
    def delete(u):
        cursor = connection.cursor()
        query = """DELETE FROM users WHERE id = {0};""".format(u.id)

        cursor.execute(query)
    
    @staticmethod
    def all():
        cursor = connection.cursor()
        query = """
            SELECT id, email, password, affiliation, history, interests
            FROM users
            LIMIT 10;
        """

        cursor.execute(query)
        objects = []

        from .models import UserSQL

        for row in cursor.fetchall():
            u = UserSQL()
            u.id = row[0]
            u.email = row[1]
            u.password = row[2]
            u.affiliation = row[3]
            u.history = row[4]
            u.interests = row[5]
            objects.append(u)
        
        return objects
    
    @staticmethod
    def last_id():
        cursor = connection.cursor()
        query = """SELECT LAST_INSERT_ID();"""

        cursor.execute(query)
        id = []

        for row in cursor.fetchall():
            id.append(row[0])
        
        return id[0]
    
    @staticmethod
    def search_affiliation(search_term):
        cursor = connection.cursor()
        query = """
            SELECT id, email, password, affiliation, history, interests
            FROM users
            WHERE affiliation LIKE '%{0}%';
        """.format(
            search_term
        )

        cursor.execute(query)
        objects = []

        from .models import UserSQL

        for row in cursor.fetchall():
            u = UserSQL()
            u.id = row[0]
            u.email = row[1]
            u.password = row[2]
            u.affiliation = row[3]
            u.history = row[4]
            u.interests = row[5]
            objects.append(u)
        
        return objects
    
    @staticmethod
    def search_email(search_term):
        cursor = connection.cursor()
        query = """
            SELECT id, email, password, affiliation, history, interests
            FROM users
            WHERE email LIKE '%{0}%';
        """.format(
            search_term
        )

        cursor.execute(query)
        objects = []

        from .models import UserSQL

        for row in cursor.fetchall():
            u = UserSQL()
            u.id = row[0]
            u.email = row[1]
            u.password = row[2]
            u.affiliation = row[3]
            u.history = row[4]
            u.interests = row[5]
            objects.append(u)
        
        return objects

class PublisherSQLManager():

    @staticmethod
    def insert(p):
        cursor = connection.cursor()
        query = """
            INSERT INTO publishers (name)
            VALUES ('{0}');
        """.format(
            p.name
        )

        cursor.execute(query)
    
    @staticmethod
    def get(id):
        cursor = connection.cursor()
        query = """
            SELECT id, name
            FROM publishers
            WHERE id={0};
        """.format(
            id
        )

        cursor.execute(query)
        objects = []

        from .models import PublisherSQL

        for row in cursor.fetchall():
            p = PublisherSQL()
            p.id = row[0]
            p.name = row[1]
            objects.append(p)
        
        return None if len(objects) == 0 else objects[0]
    
    @staticmethod
    def update(p):
        cursor = connection.cursor()
        query = """
            UPDATE publishers SET name='{0}'
            WHERE id={1};
        """.format(
            p.name,
            p.id
        )

        cursor.execute(query)
    
    @staticmethod
    def delete(p):
        cursor = connection.cursor()
        query = """DELETE FROM publishers WHERE id = {0};""".format(p.id)

        cursor.execute(query)
    
    @staticmethod
    def all():
        cursor = connection.cursor()
        query = """
            SELECT id, name
            FROM publishers
            LIMIT 10;
        """.format(
            id
        )

        cursor.execute(query)
        objects = []

        from .models import PublisherSQL

        for row in cursor.fetchall():
            p = PublisherSQL()
            p.id = row[0]
            p.name = row[1]
            objects.append(p)
        
        return objects
    
    @staticmethod
    def last_id():
        cursor = connection.cursor()
        query = """SELECT LAST_INSERT_ID();"""

        cursor.execute(query)
        id = []

        for row in cursor.fetchall():
            id.append(row[0])
        
        return id[0]
    
    @staticmethod
    def search_name(search_term):
        cursor = connection.cursor()
        query = """
            SELECT id, name
            FROM publishers
            WHERE name LIKE '%{0}%';
        """.format(
            search_term
        )

        cursor.execute(query)
        objects = []

        from .models import PublisherSQL

        for row in cursor.fetchall():
            p = PublisherSQL()
            p.id = row[0]
            p.name = row[1]
            objects.append(p)
        
        return objects
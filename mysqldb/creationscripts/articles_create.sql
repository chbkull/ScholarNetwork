CREATE TABLE articles (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title TEXT,
    author_id INT,
    FOREIGN KEY (author_id) REFERENCES authors(id) ON UPDATE CASCADE ON DELETE SET NULL,
    authors TEXT,
    citations INT,
    journal_id INT,
    FOREIGN KEY (journal_id) REFERENCES journals(id) ON UPDATE CASCADE ON DELETE SET NULL,
    year YEAR,
    issue TEXT,
    publisher_id INT,
    FOREIGN KEY(publisher_id) REFERENCES publishers(id) ON UPDATE CASCADE ON DELETE SET NULL,
    eprint TEXT,
    url TEXT
);

INSERT INTO articles (
	SELECT articles_original.id, articles_original.pub_title as title, authors.id as author_id, articles_original.pub_author as authors, articles_original.citations, journals.id as journal_id, articles_original.pub_year as year, articles_original.pub_number as issue, publishers.id as publisher_id, articles_original.eprint, articles_original.pub_url as url 
	FROM articles_original
	LEFT JOIN authors
	ON articles_original.name = authors.name
	LEFT JOIN journals
	ON articles_original.journal = journals.name
	LEFT JOIN publishers
	ON articles_original.pub_publisher = publishers.name
	ORDER BY articles_original.id
);

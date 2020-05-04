CREATE TABLE written_by (
	article_id INT NOT NULL,
    author_id INT NOT NULL,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (article_id, author_id)
);

INSERT INTO written_by (
	SELECT articles_original.id as article_id, authors_original.id as author_id FROM articles_original
	INNER JOIN authors_original
	ON articles_original.name = authors_original.name
);

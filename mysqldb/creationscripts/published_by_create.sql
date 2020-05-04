CREATE TABLE published_by (
	article_id INT NOT NULL,
    publisher_id INT NOT NULL,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (publisher_id) REFERENCES publishers(id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (article_id, publisher_id)
);

INSERT INTO published_by (
	SELECT DISTINCT articles_original.id AS article_id, publishers.id AS publisher_id FROM articles_original
	INNER JOIN publishers
	ON articles_original.pub_publisher = publishers.name
);


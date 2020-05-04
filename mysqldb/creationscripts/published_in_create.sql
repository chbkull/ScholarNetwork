CREATE TABLE published_in (
	article_id INT NOT NULL,
    journal_id INT NOT NULL,
    edition TEXT,
    url TEXT,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    FOREIGN KEY (journal_id) REFERENCES journals(id) ON UPDATE CASCADE,
    PRIMARY KEY (article_id, journal_id)
);

INSERT INTO published_in (
	SELECT articles_original.id as article_id, journals.id as journal_id, articles_original.pub_number as edition, articles_original.pub_url FROM articles_original
	INNER JOIN journals
	ON articles_original.journal = journals.name
);
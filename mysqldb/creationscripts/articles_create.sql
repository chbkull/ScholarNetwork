CREATE TABLE articles (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name TEXT,
    affiliation TEXT,
    citedby INT,
    pub_title TEXT,
    pub_year YEAR,
    citations INT,
    pub_author TEXT,
    eprint TEXT
);

INSERT INTO articles (
	SELECT id, name, affiliation, citedby, pub_title, pub_year, citations, pub_author, eprint FROM articles_original
);

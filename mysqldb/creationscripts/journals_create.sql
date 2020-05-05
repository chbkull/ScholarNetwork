CREATE TABLE journals (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name TEXT
);

INSERT INTO journals(name) (
	SELECT DISTINCT journal as name FROM articles_original
	WHERE journal != ''
);
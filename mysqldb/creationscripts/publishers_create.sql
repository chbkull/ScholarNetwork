CREATE TABLE publishers (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(512) UNIQUE
);

INSERT INTO publishers(name) (
	SELECT DISTINCT pub_publisher FROM articles_original
	WHERE pub_publisher != ''
);
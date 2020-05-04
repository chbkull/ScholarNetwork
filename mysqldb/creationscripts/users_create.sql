CREATE TABLE users (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE,
    password TEXT,
    affiliation TEXT,
    history TEXT,
    interests TEXT
);
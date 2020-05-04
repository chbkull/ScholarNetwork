CREATE TABLE authors (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name TEXT,
    affiliation TEXT,
    citedby INT,
    citedby_5 INT,
    h_index INT,
    h_index_5 INT,
    i10_index INT,
    i10_index_5 INT,
    citedby_history TEXT,
    page INT,
    email TEXT,
    interests TEXT,
    url_picture TEXT
);

INSERT INTO authors (
	SELECT id, name, affiliation, citedby,
	SUBSTRING_INDEX(SUBSTRING_INDEX(attributes, ',', 2), ' ', -1) AS citedby_5,
	SUBSTRING_INDEX(SUBSTRING_INDEX(attributes, ',', 3), ' ', -1) AS h_index,
	SUBSTRING_INDEX(SUBSTRING_INDEX(attributes, ',', 4), ' ', -1) AS h_index_5,
	SUBSTRING_INDEX(SUBSTRING_INDEX(attributes, ',', 5), ' ', -1) AS i10_index,
	SUBSTRING_INDEX(SUBSTRING_INDEX(attributes, ',', 6), ' ', -1) AS i10_index_5,
	SUBSTRING_INDEX(SUBSTRING_INDEX(attributes, '], ', -1), ']', 1) AS citedby_history,
	page, email, interests, url_picture
	FROM authors_original
);
CREATE TABLE visited_by (
	user_id INT NOT NULL,
    article_id INT NOT NULL,
    timestamp TIME,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (article_id) REFERENCES articles(id),
    PRIMARY KEY (user_id, article_id)
)
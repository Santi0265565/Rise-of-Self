CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Profile (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    level_mente INT DEFAULT 1,
    xp_mente INT DEFAULT 0,
    level_cuerpo INT DEFAULT 1,
    xp_cuerpo INT DEFAULT 0,
    level_espiritu INT DEFAULT 1,
    xp_espiritu INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES User(id)
);

INSERT INTO User (username, password) VALUES ('heroe_de_prueba', '1234');
INSERT INTO Profile (user_id) VALUES (1);

INSERT INTO User (username, password) VALUES ('santi', 'santi123');
INSERT INTO Profile (user_id) VALUES (2);
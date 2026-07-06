create DATABASE games;
\c games_for_games

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(128),
  lastName VARCHAR(128),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  username VARCHAR(255),
  role VARCHAR(255)
);

CREATE TABLE studios(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE games(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  studio_id INTEGER NOT NULL,
  release_date DATE,
  director VARCHAR(255),
    CONSTRAINT fk_name FOREIGN KEY (studio_id)
        REFERENCES studios(id)
);

INSERT INTO studios (name) values
  ('fromcho'), ('frame geak'), ('kojimadas'), ('konmai'), ('banadi'), ('aturus'), ('erasqueeze');

INSERT INTO games(title,
studio_id,
release_date,
director) VALUES
('SHARK GHOULS', 1, '2011/04/02', 'Filetaka Miyazaki'),
('pokemon rojo', 2, '1996/04/02', 'pokemon san'),
('man standing', 3, '2011/04/02', 'Kojima san'),
('mental gear', 4, '1999/04/02', 'Kojima san'),
('digimon taim', 5, '2020/04/02', 'Kojima san'),
('pokemon verde', 2, '1996/04/02', 'pokemon san');
CREATE DATABASE herbario;
USE herbario;
 
CREATE TABLE plantas(
id INT AUTO_INCREMENT PRIMARY KEY,
nome_popular VARCHAR(255),
nome_cientifico VARCHAR(255) UNIQUE,
familia_botanica VARCHAR(255),
origem VARCHAR(255),
usos_medicinais TEXT,
principios_ativos TEXT,
parte_utilizada VARCHAR(150),
modo_preparo TEXT,
contraindicacoes TEXT,
imagem VARCHAR(2083) 
);
 
SELECT * FROM plantas;

DROP TABLE plantas;
DROP DATABASE herbario;
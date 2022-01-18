DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager VARCHAR(30),
    FOREIGN KEY (role_id)
    REFERENCES roles(title)
    ON DELETE SET NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    department VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
);

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department VARCHAR(30) NOT NULL,
);
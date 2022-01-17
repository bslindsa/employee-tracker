DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE employees (
    id INT NOT NULL AUTO-INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role VARCHAR(30) NOT NULL,
    manager VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO-INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    department VARCHAR(30) NOT NULL,
    salary INT NOT NULL
    FOREIGN KEY (title)
    REFERENCES roles(id)
    ON DELETE SET NULL
)

CREATE TABLE departments (
    id INT NOT NULL AUTO-INCREMENT PRIMARY KEY,
    department VARCHAR(30) NOT NULL
)
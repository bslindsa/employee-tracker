--  View Departments
SELECT * FROM employees_db.departments;

-- View Roles
SELECT * FROM employees_db.roles;

-- View Employees
SELECT employees.id, first_name, last_name, title, roles.department, salary, manager FROM employees_db
JOIN roles ON employees.role = roles.id;
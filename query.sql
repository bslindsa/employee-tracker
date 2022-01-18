--  View All Departments
SELECT * FROM employees_db.departments;

-- View ALL Roles
SELECT * FROM employees_db.roles;

-- View ALL Employees
SELECT employees.id, first_name, last_name, title, roles.department, salary, manager FROM employees
JOIN roles ON employees.role = roles.id;
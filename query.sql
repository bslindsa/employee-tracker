--  View All Departments
SELECT * FROM employees_db.departments;

-- View ALL Roles
SELECT roles.id, title, departments.department, salary FROM roles
JOIN departments ON roles.department_id = departments.id
ORDER BY id ASC;

-- View ALL Employees
SELECT employees.id, first_name, last_name, title, departments.department, salary, manager FROM employees
JOIN roles ON employees.role_id = roles.id
JOIN departments ON roles.department_id = departments.id
ORDER BY id ASC;


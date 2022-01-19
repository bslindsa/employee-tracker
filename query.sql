--  View All Departments
SELECT * FROM employees_db.departments;

-- View ALL Roles
SELECT roles.id, title, departments.department, salary FROM roles
JOIN departments ON roles.department_id = departments.id
ORDER BY id ASC;

-- View ALL Employees
SELECT employees.id, employees.first_name, employees.last_name, title, departments.department, salary, CONCAT(emp.first_name,' ',emp.last_name) as 'Manager ' FROM employees
LEFT JOIN employees emp ON emp.id = employees.manager_id
JOIN roles ON employees.role_id = roles.id
JOIN departments ON roles.department_id = departments.id   
ORDER BY id ASC;


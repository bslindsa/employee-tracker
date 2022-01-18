-- Add to Departments
INSERT INTO departments (department)
VALUES  ('Engineering'),
        ('Finance'),
        ('Legal'),
        ('Sales');

-- Add to Roles
INSERT INTO roles (title, department, salary)
VALUES   ('Sales Lead', 'Sales', 100000),
        ('Salesperson', 'Sales', 80000),
        ('Lead Engineer', 'Engineering', 150000),
        ('Software Engineer', 'Engineering', 120000),
        ('Account Manager', 'Finance', 160000),
        ('Accountant', 'Finance', 125000),
        ('Legal Team Lead', 'Legal', 250000),
        ('Lawyer', 'Legal', 190000);

-- Add to Employees
INSERT INTO employees (first_name, last_name, role, manager)
VALUES  ('John', 'Doe', 'Sales Lead', null),
        ('Mike', 'Chan', 'Salesperson', 'John Doe'),
        ('Ashley', 'Rodriguez', 'Lead Engineer', null),
        ('Kevin', 'Tupik', 'Software Engineer', 'Ashley Rodgriquez'),
        ('Kunal', 'Singh', 'Account Manager', null),
        ('Malia', 'Brown', 'Accountant', 'Kunal Singh'),
        ('Sarah', 'Lourd', 'Legal Team Lead', null),
        ('Tom', 'Allen', 'Lawyer', 'Sarah Lourd');
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'CSanderson1!',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );

const viewDepartments = () => {
    db.query(`SELECT * FROM employees_db.departments`, (err, data) => {
        console.table(data);
    })
}

const addDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the department?',
                name: 'department',
            }
        ])
        .then((data) => {
            // Add department to department table.
            db.query(`INSERT INTO departments (department) 
                VALUE (${data.department});`, (err, result) => {
                    console.log(result);
                });
        });
};

const addRole = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the role?',
                name: 'title',
            },
            {
                type: 'input',
                message: 'What is the salary of the role?',
                name: 'salary',
            },
            {
                type: 'list',
                message: 'Which department does the role belong to?',
                name: 'department',
                choices: [], 
            }
        ])
        .then((data) => {
            // Add role to roles table
            db.query(`INSERT INTO roles (title, salary, department_id) 
                VALUE   (${data.title}),
                        (${data.salary}),
                        (${data.department});`);
        });

};

const addEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the employee's first name?",
                name: 'firstName',
            },
            {
                type: 'input',
                message: "What is the employee's last name?",
                name: 'lastName',
            },
            {
                type: 'list',
                message: "What is the employee's role?",
                name: 'role',
                choices: [],
            },
            {
                type: 'list',
                message: "Who is the employee's manager?",
                name: 'manager',
                choices: []
            }
        ])
        .then((data) => {
            // Add employee data to employee table
            db.query(`INSERT INTO employees (first_name, last_name, role_id, manager) 
                VALUE   (${data.firstName}),
                        (${data.lastName}),
                        (${data.role}),
                        (${data.manager});`, (err, data) => {
                console.table(data);    
                });
        })
};

// Use console.table() to make formatted tables
const init = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'action',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit']
            }
        ])
        .then((data) => {
            switch (data.action) {
                case 'View all departments':
                    // Present formatted table showing department names and department ids
                    viewDepartments();
                    break;
                case 'View all roles':
                    // Present table with job titles, role ids, departments that the roles belong to, and salary for that role.
                    break;
                case 'View all employees':
                    // Present table with employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to.
                    break;
                case 'Add a department':
                    // Prompt to enter the name of a department and add to the database
                    addDepartment();
                    break;
                case 'Add a role':
                    // Prompt to enter the name, salary, and department for the role and add to the database.
                    addRole();
                    break;
                case 'Add an employee':
                    // Prompt to enter the employees first name, last name, role, and manager and add to the database.
                    addEmployee();
                    break;
                case 'Update an employee role':
                    // Prompt to select an employee to update and their new role and update in the database.
                    break;
                default:
                    return;
            }
        });
};


init();
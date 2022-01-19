const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

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
    db.query(`SELECT * FROM employees_db.departments`, (err, result) => {
        console.table(result);
        //ask question again 
        init();
    });

};

const viewRoles = () => {
    db.query(`SELECT roles.id, title, departments.department, salary FROM roles
    JOIN departments ON roles.department_id = departments.id
    ORDER BY id ASC;`, (err, result) => {
        console.table(result);
        //ask question again 
        init();
    });

};

const viewEmployees = () => {
    db.query(`SELECT employees.id, employees.first_name, employees.last_name, title, departments.department, salary, CONCAT(emp.first_name,' ',emp.last_name) as 'Manager ' FROM employees
    LEFT JOIN employees emp ON emp.id = employees.manager_id
    JOIN roles ON employees.role_id = roles.id
    JOIN departments ON roles.department_id = departments.id   
    ORDER BY id ASC;`, (err, result) => {
        console.table(result);
        //ask question again 
        init();
    });
};

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
            //`INSERT INTO departments SET ? `, {department: data.department}
            db.query(`INSERT INTO departments (department) 
            VALUES  ('${data.department}');`, (err, result) => {
                if (err) console.log(err);
                console.log('Department has been added');
                //ask question again
                init();
            });
        });
};

const addRole = () => {
    db.query('SELECT * FROM departments', (req, res) => {
        const departList = res.map((item, i) => ({
            name: item.department,
            value: item.id
        }));
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
                    name: 'department_id',
                    choices: departList,
                }
            ])
            .then((data) => {
                // Add role to roles table
                db.query(`INSERT INTO roles (title, salary, department_id) 
                VALUE   ('${data.title}',
                        ${data.salary},
                        ${data.department_id});`, (err, res) => {

                    if (err) console.log(err);
                    console.log('Role has been added');
                    //ask question again 
                    init();
                });
            });
    })
};

const addEmployee = () => {
    db.query('SELECT title, id FROM roles', (req, res) => {
        const roleList = res.map((item, i) => ({
            name: item.title,
            value: item.id
        }));
        db.query('SELECT id, first_name, last_name FROM employees', (req, empRes) => {
            const empList = empRes.map((item, i) => ({
                name: `${item.first_name} ${item.last_name}`,
                value: item.id
            }));
            empList.push({name: 'None', value: null});
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
                        choices: roleList,
                    },
                    {
                        type: 'list',
                        message: "Who is the employee's manager?",
                        name: 'manager',
                        choices: empList
                    }
                ])
                .then((data) => {
                    // Add employee data to employee table
                    db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) 
                VALUE   ('${data.firstName}',
                        '${data.lastName}',
                        '${data.role}',
                        ${data.manager});`, (err, data) => {
                        if (err) console.log(err);
                        console.log('Employee has been added');
                        init();
                    });
                }) //end of inquirer.prompt 
        }); //end of role query 
    }); //end of employee query 
};

const updateEmployeeRole = () => {
    db.query('SELECT id, first_name, last_name FROM employees', (req, empRes) => {
        const empList = empRes.map((item, i) => ({
            name: `${item.first_name} ${item.last_name}`,
            value: item.id
        }));
        db.query('SELECT title, id FROM roles', (req, res) => {
            const roleList = res.map((item, i) => ({
                name: item.title,
                value: item.id
            }));
            inquirer
                .prompt([
                    {
                        type: 'list',
                        message: "Which employee's role would you like to update?",
                        name: 'employee',
                        choices: empList
                    },
                    {
                        type: 'list',
                        message: "Which role do you want to assign the selected employee?",
                        name: 'role',
                        choices: roleList
                    }
                ])
                .then((data) => {
                    db.query(`UPDATE employees SET role_id = ${data.role} WHERE id = ${data.employee}`, (err, result) => {
                        if (err) console.log(err);
                        console.log('Employee role has been updated');
                        init();
                    });
                }) // End of inquirer.prompt
        }); // End of role query
    }); // End of employee query
};

const deleteDepartment = () => {
    db.query('SELECT id, department FROM departments', (req, res) => {
        const departList = res.map((item, i) => ({
            name: `${item.department}`,
            value: item.id
        }));
        inquirer
            .prompt([
                {
                    type: 'list',
                    message: "Which department would you like to remove?",
                    name: 'department',
                    choices: departList
                }
            ])
            .then((data) => {
                db.query(`DELETE FROM departments WHERE id = ${data.department}`, (err, result) => {
                    if (err) console.log(err);
                    console.log(`Department was removed`);
                    init();
                })
            })
    });
};

const deleteRole = () => {
    db.query('SELECT id, title FROM roles', (req, res) => {
        const roleList = res.map((item, i) => ({
            name: `${item.title}`,
            value: item.id
        }));
        inquirer
            .prompt([
                {
                    type: 'list',
                    message: "Which role would you like to remove?",
                    name: 'role',
                    choices: roleList
                }
            ])
            .then((data) => {
                db.query(`DELETE FROM roles WHERE id = ${data.role}`, (err, result) => {
                    if (err) console.log(err);
                    console.log(`Role was removed`);
                    init();
                })
            })
    });
};

const deleteEmployee = () => {
    db.query('SELECT id, first_name, last_name FROM employees', (req, empRes) => {
        const empList = empRes.map((item, i) => ({
            name: `${item.first_name} ${item.last_name}`,
            value: item.id
        }));
        inquirer
            .prompt([
                {
                    type: 'list',
                    message: "Which employee would you like to remove?",
                    name: 'employee',
                    choices: empList
                }
            ])
            .then((data) => {
                db.query(`DELETE FROM employees WHERE id = ${data.employee}`, (err, result) => {
                    if (err) console.log(err);
                    console.log(`Employee was removed`);
                    init();
                })
            })
    });
};



const init = () => {
        inquirer
            .prompt([
                {
                    type: 'list',
                    message: 'What would you like to do?',
                    name: 'action',
                    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Remove a department', 'Remove a role', 'Remove an employee', 'Quit']
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
                        viewRoles();
                        break;
                    case 'View all employees':
                        // Present table with employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to.
                        viewEmployees();
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
                        updateEmployeeRole();
                        break;
                    case 'Remove a department':
                        // Prompt to select a department to delete
                        deleteDepartment();
                        break;
                    case 'Remove a role':
                        // Prompt to select a role to delete
                        deleteRole();
                        break;
                    case 'Remove an employee':
                        // Prompt to select an employee to delete from the database
                        deleteEmployee();
                        break;
                    default:
                        // Exit the application with the 'Quit' Option
                        console.log('Exiting application');
                        process.exit(0);
                }
            });
    };

    init();
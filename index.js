const inquirer = require('inquirer');

inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
        }
    ])
    .then((data) => {
        switch (data.choices) {
            case 'View all departments':
                // Present formatted table showing department names and department ids
                break;
            case 'View all roles':
                // Present table with job titles, role ids, departments that the roles belong to, and salary for that role.
                break;
            case 'View all employees':
                // Present table with employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to.
                break;
            case 'Add a department':
                // Prompt to enter the name of a department and add to the database
                break;
            case 'Add a role':
                // Prompt to enter the name, salary, and department for the role and add to the database.
                break;
            case 'Add an employee':
                // Prompt to enter the employees first name, last name, role, and manager and add to the database.
                break;
            case 'Update an employee role':
                // Prompt to select an employee to update and their new role and update in the database.
                break;
            default:
                console.log('Please choose a viable option');
        }
    })



const inquirer = require("inquirer");
const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'employee_tracker',
    password: 'catherine loves roxy',
    port: 5432, 
  });
  
client.connect()
.then(() => console.log('Connected to the database'))
.catch(err => console.error('Error', err.stack));

const questions = [
    {
        type: 'list',
        name: 'Choice',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles','Add Employee','Quit']
    },
];

function mainmenu(){
    inquirer.prompt(questions)
    .then((answers) => {
        if (answers.Choice === 'View All Departments') ViewAllDepartments();
        if (answers.Choice === 'View All Roles') ViewAllRoles();
    })
    .catch((error) => {
        console.error(error);
    });
    };

function ViewAllDepartments(){
    client.query('SELECT * FROM departments', (err, res) => {
        if (err) {
          console.error(err);
        } else {
          console.log(res.rows);
        }
        mainmenu(); 
      });
}

function AddEmployee(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'FName',
            message: 'Enter Employee First Name',
        },
    ])
    .then((answers) => {
        //Values (FName, LName) must match schema value names and order in schema, Values (matches number of prompt), [answers.values]
        client.query('INSERT INTO employees (FName, LName) VALUES ($1,$2)', [answers.FName,answers.LName], (err, res) => {
            if (err) {
              console.error(err);
            } else {
              console.log(res.rows);
            }
            mainmenu(); 
          });
    })
};

mainmenu();
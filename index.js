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
        choices: [
          'View All Employees',
          'Add Employee', 
          'Update Employee Role', 
          'View All Roles',
          'Add Role', 
          'View All Departments', 
          'Add Department',
          'Quit'
        ]
    },
];

function mainmenu(){
    inquirer.prompt(questions)
    .then((answers) => {
      if (answers.Choice === 'View All Employees') ViewAllEmployees();
      if (answers.Choice === 'Add Employee') AddEmployee();
      if (answers.Choice === 'Update Employee Role') UpdateEmployeeRole();
      if (answers.Choice === 'View All Roles') ViewAllRoles();
      if (answers.Choice === 'Add Role') AddRole();
      if (answers.Choice === 'View All Departments') ViewAllDepartments();
      if (answers.Choice === 'Add Department') AddDepartment();
      if (answers.Choice === 'Quit') Quit();
    })
    .catch((error) => {
        console.error(error);
    });
    }

function ViewAllEmployees(){
  client.query('SELECT * FROM employee', (err, res) => {
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
        name: 'firstName',
        message: 'Enter the employee\'s first name:',
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'Enter the employee\'s last name:',
    },
    {
        type: 'input',
        name: 'roleId',
        message: 'Enter the role ID for the employee:',
    },
    {
        type: 'input',
        name: 'managerId',
        message: 'Enter the manager ID for the employee (leave blank if none):',
    },
  ])
  .then((answers) => {
      client.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1,$2,$3,$4)', 
        [answers.first_name, answers.last_name, answers.roleId, answers.managerId ||null], (err, res) => {
          if (err) {
            console.error(err);
          } else {
            console.log(res.rows);
          }
          mainmenu(); 
        }
      );
  });
}

function UpdateEmployeeRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'employeeId',
      message: 'Enter the ID of the employee whose role you want to update:',
    },
    {
      type: 'input',
      name: 'roleId',
      message: 'Enter the new role ID for the employee:',
    }
  ])
  .then((answers) => {
    client.query(
      'UPDATE employee SET role_id = $1 WHERE id = $2', 
      [answers.roleId, answers.employeeId], 
      (err, res) => {
      if (err) {
        console.error(err);
      } else {
        console.log(res.rows);
      }
      mainmenu(); 
    }
  );
})
  .catch((err) => {
    console.error(err);
  });
}

function ViewAllRoles(){
  client.query('SELECT * FROM role', (err, res) => {
      if (err) {
        console.error(err);
      } else {
        console.log(res.rows);
      }
      mainmenu(); 
    });
}

function AddRole(){
  inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the role title:',
    },
    {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for this role:',
    },
    {
        type: 'input',
        name: 'departmentId',
        message: 'Enter the department ID for this role:',
    },
  ])
  .then((answers) => {
    client.query(
      'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', 
      [answers.title, answers.salary, answers.departmentId], (err, res) => {
      if (err) {
        console.error(err);
      } else {
        console.log(res.rows);
      }
      mainmenu(); 
    });
  })
};

function ViewAllDepartments(){
    client.query(
      'SELECT * FROM department', (err, res) => {
        if (err) {
          console.error(err);
        } else {
          console.log(res.rows);
        }
        mainmenu(); 
      });
  };

function AddDepartment(){
  inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the department name:',
    },
  ])
  .then((answers) => {
    client.query(
      'INSERT INTO department (name) VALUES ($1)', 
      [answers.name], (err, res) => {
      if (err) {
        console.error(err);
      } else {
        console.log(res.rows);
      }
      mainmenu(); 
    });
  })
};

function Quit(){
  process.exit();
}

mainmenu();
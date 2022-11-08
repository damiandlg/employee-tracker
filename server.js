const mysql = require("mysql2");
const inquirer = require("inquirer");

const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();


app.use((req, res) => {
    res.status(404).end();
});

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Connect to database
const connection = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password,
    password: 'Ezedgp3354!',
    database: 'db_employee'
},
    console.log("connected to Employee DB")
);


function menuOptions() {
    inquirer
      .prompt({
        name: "task",
        type: "list",
        message: "What task would you like to do?",
        choices: [
          "View Tables",
          "Add",
          "Update",
          "Exit",
        ],
      })
      .then(function ({ task }) {
        switch (task) {
          case "View Tables":
            viewTables();
            break;
          case "Add":
            add();
            break;
            //NEED TO WORK ON UPDATE functionality. Diddnt have enough time"
          case "Update": 
            updateEmployee();
            break;
          case "Exit":
            connection.end();
            console.log("------Thankyou, Goodbye!");
            return;
        }
      });
  }
  
  //View Table function
  function viewTables() {
    inquirer
      .prompt({
        name: "view",
        message: "What would you like to do, we have information on employees, departments, and roles.",
        type: "list",
        choices: ["department", "role", "employee"],
      })
      .then(function ({ view }) {
        connection.query(`SELECT * FROM ${view}`, function (err, data) {
          if (err) throw err;
  
          console.table(data);
          menuOptions();
        });
      });
  }
  
//Adding Function
  function add() {
    inquirer
      .prompt({
        name: "table",
        message: "Wherre would you like to add a table?",
        type: "list",
        choices: ["department", "role", "employee"],
      })
      .then(function ({ table }) {
        switch (table) {
          case "department":
            addDepartment();
            break;
          case "role":
            addRole();
            break;
          case "employee":
            addEmployee();
            break;
        }
      });
  }

  //ADD Department Function
  function addDepartment() {
    inquirer
      .prompt({
        name: "department-add",
        message: "What is the departments name?",
        type: "input",
        validate: (value) => {
          if (value) {
            return true;
          } else {
            ("Please enter a value");
          }
        },
      })
      .then(function ({ departmentName }) {
        connection.query(
          `INSERT INTO department (name) VALUES ('${departmentName}')`,
          function (err, data) {
            if (err) throw err;
            console.log(`Department Added`);
            menuOptions();
          }
        );
      });
  }

  //ADD ROLE FUNCTION
  function addRole() {
    let departmentNames = [];
  
    connection.query(`SELECT * FROM department`, function (err, data) {
      if (err) throw err;
      for (var i = 0; i < data.length; i++) {
        departmentNames.push(data[i].name);
      }
  
      inquirer.prompt([
          {
            name: "roleTitle",
            message: "What is the title?",
            type: "input",
            validate: (value) => {
              if (value) {
                return true;
              } else {
                console.log("Please enter a value");
              }
            },
          },
          {
            name: "salary",
            message: "What is the salary?",
            type: "input",
            validate: (value) => {
              if (value) {
                return true;
              } else {
                console.log("Please enter a value");
              }
            },
          },
          {
            name: "department_id",
            message: "What is the department id of the role?",
            type: "list",
            choices: departmentNames,
          },
        ])
        .then(function ({ roleTitle, salary, department_id }) {
          let departmentIndex = departmentNames.indexOf(department_id) + 1;
  
          connection.query(
            `INSERT INTO role (title, salary, department_id) VALUES ('${roleTitle}', '${salary}', ${departmentIndex})`,
            function (err, data) {
              if (err) throw err;
              console.log(`Added role.`);
              menuOptions();
            }
          );
        });
    });
  }

  //ADD EMPLOYEE FUNCTION
  function addEmployee() {
    let employeeNames = [];
    let roles = [];
  
    connection.query(`SELECT * FROM role`, function (err, data) {
      if (err) throw err;
      for (var i = 0; i < data.length; i++) {
        roles.push(data[i].title);
      }
    });
  
    connection.query(`SELECT * FROM employee`, function (err, data) {
      if (err) throw err;
  
      for (var i = 0; i < data.length; i++) {
        employeeNames.push(data[i].first_name);
      }
  
      inquirer
        .prompt([
          {
            name: "first_name",
            message: "What is the first name of the employee?",
            type: "input",
            validate: (value) => {
              if (value) {
                return true;
              } else {
                console.log("Please enter a value");
              }
            },
          },
          {
            name: "last_name",
            message: "What is the last name of the employee?",
            type: "input",
            validate: (value) => {
              if (value) {
                return true;
              } else {
                console.log("Please enter a value");
              }
            },
          },
          {
            name: "role_id",
            message: "What is the role of the employee?",
            type: "list",
            choices: roles,
          },
          {
            name: "manager_id",
            message: "Please confirm the manager id.",
            type: "list",
            choices: ["none"].concat(employeeNames),
          },
        ])
        .then(function ({ first_name, last_name, role_id, manager_id }) {
          let addEmployeeQuery = `INSERT INTO employee (first_name, last_name, role_id`;
  
          if (manager_id == "none") {
            addEmployeeQuery += `) VALUES ('${first_name}', '${last_name}', ${
              roles.indexOf(role_id) + 1
            })`;
          } else {
            addEmployeeQuery += `, manager_id) VALUES ('${first_name}', '${last_name}', ${roles.indexOf(
              role_id
            )}, ${employeeNames.indexOf(manager_id) + 1})`;
          }
          console.log(addEmployeeQuery);
  
          connection.query(addEmployeeQuery, function (err, data) {
            if (err) throw err;
  
            console.log("Employee Added");
            menuOptions();
          });
        });
    });
  }
  menuOptions();

  
    app.listen(PORT, () => {
        console.log(`Server Running ${PORT}`);
    });

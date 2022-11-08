const db = require('./db/ connect');
const inquirer = require('inquirer');
const consoleTable = require("console.table");



//Prompt begins below
const promptUser = () => {
    inquirer.prompt([
        {
            message: "What would you like to do, we have information on employees, departments, and roles.",
            name: "start",
            type: "list",
            choices: [
                "View",
                "Add",
                "Update",
                "Exit"
            ]
        }
    ]).then(function(res){
        switch(res.start){
            case "View":
                view();
                break;
            case "Add":
                add();
                break;
            case "Update":
                updateEmployee();
                break;
            case "Exit":
                console.log("--All Done, Goodbye!---");
                break;
            default:
                console.log("default");
        }
    });
}
   function view() {
    inquirer.prompt([{
        message: "Select to view",
        name: "view",
        type:"list",
        choices: ["By Role, By Department, All Employees"]
    }]).then(function(res){
        switch(res.view){
            case "By Role":
                viewByRole();
                break;
            case "By Department":
                viewByDepartment();
                break;
            case "All Employees":
                viewAllEmployees();
                break;
            default:
                console.log("default");
        }
    });
   } 
   
   function viewAllEmployees(){
    const sql =  `SELECT employee.id,
    employee.first_name AS First,
    employee.last_name AS Last,
    role.title AS Title,
    role.salary AS Salary,
    department.name AS Department,
    CONCAT (manager.first_name, " ", manager.last_name) AS Manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id`
   }db.query(sql, (err, rows) => {
    if(err){
        throw err;
    }
    console.table(rows);
    return promptUser();
});

function viewByRole() {
    const sql = `SELECT role.id AS ID,
    role.title AS Title,
    role.salary AS Salary,
    department.name AS Department
    FROM role
    LEFT JOIN department ON role.department_id = department.id
    `
    db.query(sql, (err, rows) => {
        if(err){
            throw err;
        }
        console.table(rows);
        return promptUser();
    });
};

function viewByDepartment(){
    Connection.query("Select * FROM department", function(err, rows){
        if (err){
            throw err;
        }
        console.table(rows);
        });
    };

   
















module.exports = promptUser;
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
        
















module.exports = promptUser;
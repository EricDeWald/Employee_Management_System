const inquirer = require('inquirer');

mainMenue = function(){
    inquirer.prompt([
        {
            type: 'list',
            message: "pick it",
            choices: ['view all departments', 'view all roles', "view all employees", "add a department", "add a role", "add an employee", "and update an employee role"],
            name: "mainChoice"
        }
    ])
}

module.exports = mainMenue;
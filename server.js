//make sure you require
const inquirer = require('inquirer')
const menu = require('./Functions/index')
const mysql2 = require('mysql2');
const cTable = require('console.table');
const PORT = process.env.PORT || 3001
const db = mysql2.createConnection(
    {
    host: 'localhost',
    user: 'root',
    password: 'Root',
    database: 'department_db'
    },
    console.log(`Connected to the department_db database.`)
);

const init = function(){
    // menu.mainMenue()
    // .then(function(data){
    //     mainMenueChoice = data
    //     console.log(mainMenueChoice)       
    // })
    inquirer.prompt([
        {
            type: 'list',
            message: "pick it",
            choices: ['view all departments', 'view all roles', "view all employees", "add a department", "add a role", "add an employee", "and update an employee role"],
            name: "mainChoice"
        }
    ])
    .then(function(data){
        const answers = data
        // console.log(answers) { mainChoice: 'view all employees' }
        
        switch(answers.mainChoice){
            case 'view all departments':
                db.query(`SELECT * FROM department`, (err, result)=>{
                    if (err) {
                        console.log(err);
                      }
                    console.table(result);
                })
            break;
            
        }
    })
}

init()
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
            message: "Main Menu: ",
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
                    init();
                })
            break;
            case 'view all roles':
                db.query(`Select * from role JOIN department ON role.department_id = department.id;`, (err, result)=>{
                        if (err) {
                            console.log(err);
                          }
                          console.table(result);
                          init();
                })        
            break;
            case 'view all employees':
                db.query(`Select * from employee JOIN department ON employee.department_id = department.id Join role on employee.role_id;`, (err, result)=>{
                        if (err) {
                            console.log(err);
                          }
                          console.table(result);

                })        
            break;
            case 'add a department':
                inquirer.prompt([
                    {
                        type: 'input',
                        message: "Name of the new department: ",
                        name: "newDepartmentName"
                    }
                ])
                .then(function(data){
                    const newDepartmentAnswer= data
                    console.log(newDepartmentAnswer)
                    db.query("INSERT INTO department SET ? ",
                            {
                                name: newDepartmentAnswer.newDepartmentName
                            },
                            function (err) {
                                if (err) throw err
                                init();
                            }
                        )
                    });
                    break;
            case 'add a role':
                inquirer.prompt([
                    {
                        type: 'input',
                        message: "Name of the new role: ",
                        name: "newRoleName"
                    },{
                        type: 'input',
                        message: "Salary of the new role: ",
                        name: "newRoleSalary"
                    },{
                        type: 'input',
                        message: "Department of the new role: ",
                        name: "newRoledepartment"
                    }
                ])
                .then(function(data){
                    const newRoleAnswer= data
                    console.log(newRoleAnswer)
                    db.query("INSERT INTO role SET ? AND ? AND ? ",
                            {
                                name: newRoleAnswer.newRoleName
                            },{
                                name: newRoleAnswer.newRoleSalary
                            },{
                                name: newRoleAnswer.newRoledepartment
                            },
                            function (err) {
                                if (err) throw err
                                init();
                            }
                        )
                    });
                    break;
                    case 'add a role':
                inquirer.prompt([
                    {
                        type: 'input',
                        message: "Name of the new role: ",
                        name: "newRoleName"
                    },{
                        type: 'input',
                        message: "Salary of the new role: ",
                        name: "newRoleSalary"
                    },{
                        type: 'input',
                        message: "Department of the new role: ",
                        name: "newRoledepartment"
                    }
                ])
                .then(function(data){
                    const newRoleAnswer= data
                    console.log(newRoleAnswer)
                    db.query("INSERT INTO role SET ? ",
                            {
                                name: newRoleAnswer.newRoleName
                            },{
                                name: newRoleAnswer.newRoleSalary
                            },{
                                name: newRoleAnswer.newRoledepartment
                            },
                            function (err) {
                                if (err) throw err
                                init();
                            }
                        )
                    });
                    break;
        }
    })
}

init()
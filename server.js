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
            db.query(`Select employee.id, employee.first_name, employee.last_name,employee.role_id, employee.manager_id, title, salary, department_id, department.name FROM employee JOIN role ON employee.role_id = role.id JOIN department on role.department_id = department.id;`, (err, result)=>{
                    if (err) {
                        console.log(err);
                        }
                        console.table(result);
                        init();

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
                    message: "Title of the new role: ",
                    name: "newRoleTitle"
                },{
                    type: 'input',
                    message: "Salary of the new role: ",
                    name: "newRoleSalary"
                },{
                    type: 'input',
                    message: "Department number of the new role: ",
                    name: "newRoleDepartment"
                }
            ])
            .then(function(data){
                const newRoleAnswer= data
                console.log(newRoleAnswer)
                db.query("INSERT INTO role SET ?, ?, ? ",[
                        {
                            title: newRoleAnswer.newRoleTitle
                        },{
                            salary: newRoleAnswer.newRoleSalary
                        },{
                            department_id: newRoleAnswer.newRoleDepartment
                        }
                        ],
                        function (err) {
                            if (err) throw err
                            init();
                        }
                    )
                });
                break;
        case 'add an employee':
            inquirer.prompt([
                {
                    type: 'input',
                    message: "The First name of the new employee: ",
                    name: "newEmployeeFirstName"
                },{
                    type: 'input',
                    message: "The last name of the new employee: ",
                    name: "newEmployeeLastName"
                },{
                    type: 'input',
                    message: "Role id of the new employee: ",
                    name: "newEmployeeRole"
                },{
                    type: 'input',
                    message: "Manager id of the new employee: ",
                    name: "newEmployeeManager"
                }
            ])
            .then(function(data){
                const newRoleAnswer= data
                console.log(newRoleAnswer)
                db.query("INSERT INTO employee SET ?, ?, ?, ? ",[
                        {
                            first_name: newRoleAnswer.newEmployeeFirstName
                        },{
                            last_name: newRoleAnswer.newEmployeeLastName
                        },{
                            role_id: newRoleAnswer.newEmployeeRole
                        },{
                            manager_id: newRoleAnswer.newEmployeeManager
                        }
                        ],
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
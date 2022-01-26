const inquirer = require("inquirer")
const fs = require("fs")
const Employee = require("./lib/Employee")
const Intern = require("./lib/Intern")
const Manager = require("./lib/Manager")
const Engineer = require("./lib/Engineer")
const { log } = require("console")
const generateHTML = require("./src/page-template")
var answers = []
var team = []
questions = [
    {
        type:"input",
        message:"Enter employee name: ",
        name: "name"
    },{
        type:"input",
        message:"Enter employee ID#: ",
        name: "id"
    },{
        type:"input",
        message:"Enter employee email#: ",
        name: "email"
    },{
        type:"list",
        message:"What kind of employee?: ",
        choices:['Manager','Engineer','Intern'],
        name: "kind"
    },
]
moreEmployee = function(){
    inquirer.prompt([
        {
            type:"list", 
            message:"Enter another emplyee: ", 
            choices:["Yes", "No. Make the site."],
            name: "another"
        }
    ])
    .then(function(data){
        const {another}= data
        if(another == "Yes"){
            promptUser()
        }else if (another == "No. Make the site."){
            fs.writeFileSync('teamList.html', generateHTML(team))
            
        } 
    })

}
specificQs = function(){
    const {name,id,email,kind} = answers
    if (kind == "Manager"){
        inquirer.prompt(managerQs)
        .then(data => {
            const {officeNumber} = data;
            manager = new Manager(name,id,email,officeNumber);
            team.push(manager);
            moreEmployee();
        })
    }
    else if (kind == "Intern"){
        inquirer.prompt(internQs)
        .then(data => {
            const {school} = data;
            intern = new Intern(name,id,email,school);
            team.push(intern);
            moreEmployee();
        })
    }
    else if (kind == "Engineer"){
        const {name,id,email,kind} = answers
        inquirer.prompt(engineerQs)
        .then(data => {
            const {github} = data;
            engineer = new Engineer(name,id,email,github);
            team.push(engineer);
            moreEmployee();
        })
    }
}
managerQs =[
    {
    type:"input", 
    message:"Enter office number: ", 
    name: "officeNumber"
}]
internQs =[{
    type:"input", 
    message:"Enter school: ", 
    name: "school"
}]
engineerQs =[{
    type:"input", 
    message:"Enter GitHub ID: ", 
    name: "github"
}]

// make questions and write to-file use page template.js  create a new instance of whatever there role is to put into the html that can be used with fs 
const promptUser = function(){
    inquirer.prompt(questions)
    .then(function(data){
        answers = data
        specificQs()
    })
}


promptUser()


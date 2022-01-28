//make sure you require
const mysql2 = require('mysql2')
const PORT = process.env.PORT || 3001
const db = mysql.createConnection(
    {
    host: 'localhost',
    user: 'root',
    password: 'Root',
    database: 'department_db'
    },
    console.log(`Connected to the department_db database.`)
);

// us this to call all your functions to un program


init = function(){

}
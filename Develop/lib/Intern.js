const Employee = require('./Employee.js');
class Intern extends Employee {
    constructor(name,id,email,school) {
        super(name,id,email);
        this.school = school;
    }
    getSchool = function(choosenIntern){return this.school};

    getRole = function(choosenIntern){return 'Intern'};
}
module.exports = Intern;

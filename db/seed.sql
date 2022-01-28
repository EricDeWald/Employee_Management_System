INSERT INTO department (name)
VALUES ("The Ring"),("The Box"),("The Ship");

INSERT INTO role (title, salary, department_id)
VALUES ("pres", "100",1),("VP", "50",1),("Goon","1",1),('Tug','3',2);

INSERT INTO employee (first_name,last_name, role_id, manager_id)
VALUES ("King","Koopa",1,NULL),("Koopa","Troopa",2,1),("Goomba","Mushroom",3,4),("Green","Tutle",4,3);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
const inquirer = require('inquirer');
// const sequelize = require('./config/connections.js');
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Np600865",
    database: "employee_db"
})

db.connect(function (err) {
    if (err) throw err;
    startMyApp()
});

console.log("\n- - - Ｅｍｐｌｏｙｅｅ - Ｔｒａｃｋｅｒ - - -\n");

function startMyApp() {
    inquirer.prompt(
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'question',
            choices:
                ['View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Quit',
                ]
        }
    ).then((choice) => {
        if(choice.question === 'View All Employees') {
            viewEmp();
        } else if(choice.question == "Add Employee") {
            addEmployee();
        }  else if(choice.question == "Update Employee Role") {
            updateEmployee();
        }  else if(choice.question == "Add Department") {
            addDept();
        } else if(choice.question == "View All Roles") {
            viewRoles();
        } else if(choice.question == "Add Role") {
            addRole();
        } else if(choice.question == "View All Departments") {
            viewDepts();
        } else if(choice.question == "Add Department") {
            addDept();
        }
    });
}

function viewEmp() {
    const sqlString =
    `SELECT employees.first_name AS 'First Name',
    employees.last_name AS 'Last Name',
    roles.title AS 'Job Title',
    departments.dep_name AS 'Department',
    roles.salary AS 'Salary',
    IFNULL(concat(manager.first_name, ' ', manager.last_name), 'N/A') AS 'Manager'
    
    FROM employees
    JOIN roles
    ON employees.role_id = roles.id
    JOIN departments
    ON roles.dep_id = departments.id
    LEFT JOIN employees manager
    ON employees.manager_id = manager.id;`;

    db.query(sqlString, (err, data) => {
        if (err) throw err;
        console.log('\n');
        console.table(data);
        console.log('\n');
        startMyApp();
    })
};

function viewRoles() {
    const sqlString =
    `SELECT * FROM roles;`;

    db.query(sqlString, (err, data) => {
        if (err) throw err;
        console.log('\n');
        console.table(data);
        console.log('\n');
        startMyApp();
    })
};

function viewDepts() {
    const sqlString = `SELECT * FROM departments;`;

    db.query(sqlString, (err, data) => {
        if (err) throw err;
        console.log('\n');
        console.table(data);
        console.log('\n');
        startMyApp();
    })
};

function addRole() {

    const getDepts = `SELECT * FROM departments;`
    const deptList = []; 

    db.query(getDepts, (err, data) => {
        if (err) throw err;
        for(i=0; i < data.length; i++) {
            deptList.push(data[i].dep_name);
        }
    })

    inquirer.prompt([
        {
            message: "Enter the role name",
            name: "roleName"
        },
        {
            message: "Enter the role's salary",
            name: "roleSalary"
        },
        {
            type: 'list',
            message: "Please select the role's department",
            name: 'roleDept',
            choices: deptList
        }
    ]).then (roleAnswers => {

        const sqlString=`
        INSERT INTO roles(title, salary, dep_id)
        VALUES (?, ?, ?)`

        db.query(getDepts, (err, data) => {
            if (err) throw err;
            for(i=0; i < data.length; i++) {
                if(roleAnswers.roleDept === data[i].dep_name) {
                    roleAnswers.roleDept = data[i].id;
                }
            }
        })

        
        setTimeout(() => {
            db.query(sqlString, [roleAnswers.roleName, roleAnswers.roleSalary, roleAnswers.roleDept], function (err, data) {
                if (err) throw err;
                console.log("\nAdded new role\n");
                startMyApp();
            })
        }, 20);
    })
}

function addDept() {
    inquirer.prompt([
        {
            message: "Enter the name of the department",
            name: "newDept"
        }
    ]).then(deptAnswers => {

        const sqlString=`
        INSERT INTO departments(dep_name)
        VALUES (?)`
        
        db.query(sqlString, [deptAnswers.newDept], (err, data) => {
            if (err) throw err;
            console.log("\nAdded new Department\n");
            startMyApp();
        })
    })
};
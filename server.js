const inquirer = require('inquirer');
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Np600865",
    database: "employee_db"
})

db.connect(function (err) {
    if (err) throw err;
    startMyApp();
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
        } else quit();
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

function addEmployee() {
    const getRoles = `SELECT * FROM roles;`
    const roleList = [];

    db.query(getRoles, (err, data) => {
        if (err) throw err;
        for(i=0; i < data.length; i++) {
            const obj1 = {
                name: data[i].title,
                value: data[i].id
            }
            roleList.push(obj1);
        }
    })
    
    const getEmps = `SELECT * FROM employees;`
    const EmpsList = [];

    db.query(getEmps, (err, data) => {
        if (err) throw err;
        for(i=0; i < data.length; i++) {
            const obj1 = {
                name: data[i].first_name + ' ' + data[i].last_name,
                value: data[i].id
            }
            EmpsList.push(obj1);
        }
    })

    inquirer.prompt([
        {
            message: "Enter the employee's first name",
            name: "fName"
        },
        {
            message: "Enter the employee's last name",
            name: "lName"
        },
        {
            type: 'list',
            message: "Please select employee's role",
            name: 'role',
            choices: roleList,
        },
        {
            type: 'list',
            message: "Please select employee's Manager",
            name: 'manager',
            choices: EmpsList
        }
    ]).then (answers => {
        
            const sqlString=`
            INSERT INTO employees(first_name, last_name, role_id, manager_id)
            VALUES (?, ?, ?, ?)`
    
            console.log(answers);
    
                db.query(sqlString, [answers.fName, answers.lName, answers.role, answers.manager], function (err, data) {
                    if (err) throw err;
                    console.log("\nNew employee added\n");
                    startMyApp();
                });
        })
};

function updateEmployee() {
    const getEmps = `SELECT * FROM employees;`
    const EmpsList = [];

    db.query(getEmps, (err, data) => {
        if (err) throw err;
        for(i=0; i < data.length; i++) {
            const obj1 = {
                name: data[i].first_name + ' ' + data[i].last_name,
                value: data[i].id
            }
            EmpsList.push(obj1);
        }

        const getRoles = `SELECT * FROM roles;`
        const roleList = [];

        db.query(getRoles, (err, data) => {
            if (err) throw err;
            for(i=0; i < data.length; i++) {
                const obj1 = {
                    name: data[i].title,
                    value: data[i].id
                }
                roleList.push(obj1);
            }

            inquirer.prompt([
                {
                    type: "list",
                    message: "Which employee would you like to update?",
                    name: 'emp',
                    choices: EmpsList
                },
                {
                    type: "list",
                    message: "What role would you like to assign?",
                    name: 'role',
                    choices: roleList
                },
            ]).then((answers) => {
                const sqlString=
                `UPDATE employees
                SET role_id = ?
                WHERE id = ?`;
                console.log(answers);

                db.query(sqlString, [answers.role, answers.emp], function (err, data) {
                    if (err) throw err;
                    console.log("\nRole updated\n");
                    startMyApp();
                })
            })
        })
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
            const obj = {
                name: data[i].dep_name,
                value: data[i].id
            }
            deptList.push(obj);
        }
    });

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

        console.log(roleAnswers);

            db.query(sqlString, [roleAnswers.roleName, roleAnswers.roleSalary, roleAnswers.roleDept], function (err, data) {
                if (err) throw err;
                console.log("\nAdded new role\n");
                startMyApp();
            });
    })
};

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

function quit() {
    console.log("Goodbye");
    process.exit();
};
const inquirer = require('inquirer');

console.log("- - - Ｅｍｐｌｏｙｅｅ - Ｔｒａｃｋｅｒ - - -");

inquirer.prompt(
    {
        type: 'list',
        message: 'What languages do you know?',
        name: 'stack',
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
    
})
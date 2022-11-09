-- CREATE TABLE dashboard LIKE employees;

-- ALTER TABLE dashboard
-- ADD three INT NOT NULL;

USE employee_db;

SELECT employees.first_name AS 'First Name',
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
ON employees.manager_id = manager.id;
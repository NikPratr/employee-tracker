INSERT INTO departments (dep_name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO roles (id, title, salary, dep_id)
VALUES (1, "Sales Lead", 75000, 1),
       (2, "Salesperson", 35000, 1),
       (3, "Lead Engineer", 160000, 2),
       (4, "Software Engineer", 90000, 2),
       (5, "Account Manager", 120000, 3),
       (6, "Accountant", 75000, 3),
       (7, "Legal Team Lead", 200000, 4),
       (8, "Lawyer", 120000, 4);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Noah", "Smith", 1, null),
       (2, "Emma", "Johnson", 2, 1),
       (3, "Liam", "Williams", 3, null),
       (4, "Olivia", "Brown", 4, 3),
       (5, "Jacob", "Jones", 5, null),
       (6, "Sophia", "Garcia", 6, 5),
       (7, "William", "Miller", 7, null),
       (8, "Ava", "Davis", 8, 7);
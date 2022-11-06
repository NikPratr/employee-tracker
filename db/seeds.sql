INSERT INTO departments (id, dep_name)
VALUES (1, "Sales"),
       (2, "Engineering"),
       (3, "Finance"),
       (4, "Legal"),

INSERT INTO roles (id, title, salary, dep_id)
VALUES (1, "Sales Lead", 75000, 001),
       (2, "Salesperson", 35000, 001),
       (3, "Lead Engineer", 160000, 002),
       (4, "Software Engineer", 90000, 002),
       (5, "Account Manager", 120000, 003),
       (6, "Accountant", 75000, 003),
       (7, "Legal Team Lead", 200000, 004),
       (8, "Lawyer", 120000, 004),

INSERT INTO employees (id, first_name, last_name, position, manager_id)
VALUES (1, "Noah", "Smith", 1, null),
       (1, "Emma", "Johnson", 1, null),
       (1, "Liam", "Williams", 1, null),
       (1, "Olivia", "Brown", 1, null),
       (1, "Jacob", "Jones", 1, null),
       (1, "Sophia", "Garcia", 1, null),
       (1, "William", "Miller", 1, null),
       (1, "Ava", "Davis", 1, null),
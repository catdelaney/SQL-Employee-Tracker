INSERT INTO department (name)
VALUES
    ('Engineering'),
    ('Human Resources'),
    ('Marketing'),
    ('Sales'),
    ('Finance');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Software Engineer', 80000.00, 1),
    ('HR Manager', 75000.00, 2),
    ('Marketing Coordinator', 60000.00, 3),
    ('Sales Representative', 55000.00, 4),
    ('Accountant', 70000.00, 5),
    ('Senior Software Engineer', 95000.00, 1),
    ('Recruiter', 65000.00, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Alice', 'Johnson', 1, NULL),
    ('Bob', 'Smith', 6, 1),
    ('Charlie', 'Davis', 3, NULL),
    ('Diana', 'Miller', 2, NULL),
    ('Eve', 'Williams', 4, NULL),
    ('Frank', 'Brown', 5, NULL),
    ('Grace', 'Taylor', 7, 4);

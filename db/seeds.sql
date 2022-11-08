INSERT INTO department (id, name)
VALUES
(1, 'Managment'),
(2, 'Engineering'),
(3, 'Human Resources'),
(4, 'Finance');

INSERT INTO role (id, title, salary, department_id)
VALUES
(1, 'CFO', '210000', '1'),
(2, 'Recruiter', '80000', '3'),
(3, 'Analyst', '100000', '4'),
(4, 'Software Engineer', '90000', '2'),
(5, 'Quality Assurance', '100000', '2'),
(6, 'Scrum Master', '95000', '2'),
(7, 'Salesperson', '100000', '1'),
(8, 'People Leader', '120000', '3');

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
(1, 'Damian', 'Garza', 1, NULL),
(2, 'Claudia', 'Wiscovitch', 7, NULL),
(3, 'Monica', 'Romero', 2, NULL),
(4, 'Ayrton', 'Senna', 9,NULL),
(5, 'Jose', 'Alvarado', 4, NULL),
(6, 'Rachel', 'Cook', 1, NULL),
(7, 'Lana', 'Rhodes', 5, NULL),
(8, 'Troy', 'Aikman', 2, NULL),
(9, 'Nelson', 'Piquet', 1, NULL),
(10, 'Karina', 'Aldape', 6, NULL),
(11, 'Elizabeth', 'Queen', 7, NULL),
(12, 'Troy', 'Lee', 8, NULL),
(13, 'Stacey', 'Gurtrue', 8, NULL),
(14, 'Peyton', 'Manning', 5, NULL),
(15, 'Ed', 'Reed', 3, NULL);
INSERT INTO department (id, name)
VALUES
(1, 'Managment'),
(2, 'Engineering'),
(3, 'HR'),
(4, 'Finance');

INSERT INTO role (id, title, salary, department_id)
VALUES
(1, 'Director', '140000', '1'),
(2, 'Lead Engineer', '170000', '2'),
(3, 'Director of Finance', '100000', '4'),
(4, 'Front end Developer', '90000', '2'),
(5, 'Recruiter', '75000', '3'),
(6, 'People Leader', '120000', '3'),
(7, 'Salesperson', '85000', '1'),
(8, 'Relationship Manager', '120000', '1');

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
(1, 'Damian', 'Garza', 1, NULL),
(2, 'Claudia', 'Wiscovitch', 4, NULL),
(3, 'Sumit', 'Torre', 3, NULL),
(4, 'Cata', 'Sainz', 6,NULL),
(5, 'Lorena', 'Gonzales', 7, NULL),
(6, 'Maria', 'Mulata', 1, NULL),
(7, 'John', 'Wick', 5, NULL),
(8, 'Leonel', 'Messi', 2, NULL),
(9, 'Robert', 'Downety', 1, NULL),
(10, 'Johnny', 'Depp', 6, NULL),
(11, 'Roger', 'Waters', 7, NULL),
(12, 'Christian', 'Willis', 4, NULL),
(13, 'Al', 'Pacino', 8, NULL),
(14, 'Edward', 'Newton', 5, NULL),
(15, 'Ayrton', 'Senna', 3, NULL);
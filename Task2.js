// TABLE EMPLOYEE (For Creating in MYSQL)

/*
 CREATE TABLE `employee` (
 `id` int NOT NULL,
 `name` varchar(255) NOT NULL,
 `email` varchar(255) NOT NULL,
 `phone` int DEFAULT NULL
 );
*/

// TABLE EMPLOYEEJOBSTATUS (For Creating in MYSQL)

/*
 CREATE TABLE `employeeJobStatus` (
    `id` int NOT NULL,
    `empId` int NOT NULL,
    `jobsts` enum('complete','cancel','pending') DEFAULT NULL
  );

 ALTER TABLE `employeeJobStatus`
 ADD CONSTRAINT `empjobsts_ibfk_1` FOREIGN KEY (`empId`) REFERENCES `employee` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE; 
*/



// DUMPING DATA FOR TABLE EMPLOYEE
/*
INSERT INTO `employee` (`id`, `name`, `email`, `phone`) VALUES (1, 'john', 'john@gmail.com', '8956237412');
INSERT INTO `employee` (`id`, `name`, `email`, `phone`) VALUES (2, 'mathew', 'mathew@gmail.com', '7956237412');
INSERT INTO `employee` (`id`, `name`, `email`, `phone`) VALUES (3, 'stephan', 'stephan@gmail.com', '6956237412');
INSERT INTO `employee` (`id`, `name`, `email`, `phone`) VALUES (4, 'haris', 'haris@gmail.com', '5956237412');
INSERT INTO `employee` (`id`, `name`, `email`, `phone`) VALUES (5, 'luke', 'luke@gmail.com', '4956237412');
*/

// DUMPING DATA FOR TABLE EMPLOYEEJOBSTATUS
/*
INSERT INTO `employeeJobStatus` (`id`, `empId`, `jobsts`) VALUES (1, 5, 'complete');
INSERT INTO `employeeJobStatus` (`id`, `empId`, `jobsts`) VALUES (2, 3, 'cancel');
INSERT INTO `employeeJobStatus` (`id`, `empId`, `jobsts`) VALUES (3, 4, 'pending');
INSERT INTO `employeeJobStatus` (`id`, `empId`, `jobsts`) VALUES (4, 2, 'complete');
INSERT INTO `employeeJobStatus` (`id`, `empId`, `jobsts`) VALUES (5, 1, 'pending');
*/



//QUERY

/* 
SELECT employee.id,employee.name,employee.email,employee.phone,employeeJobStatus.jobsts  AS job_status FROM employee INNER JOIN employeeJobStatus WHERE employee.id = employeeJobStatus.empId;
*/ 
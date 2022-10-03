const fs = require('fs');

var employees, departments; // declaring global emp and depart variables

// In the below function, employees and departments var will be populated if the files are readable
initialize = () => {
    fs.readFile('./data/employees.json', (err, data) => {
        if (err) reject("Failure to read file employees.json!");
        employees = JSON.parse(data);
    })

    fs.readFile('./data/departments.json', (err, data) => {
        if (err) reject("Failure to read file departments.json!");
        departments = JSON.parse(data)
    })

    return new Promise((resolve, reject) => {
        if (!fs) {
            reject("unable to read the file");
        }
        else {
            resolve("Success!!");
        }
    })
}

// Getting all of the employees
getAllEmployees = () => {
    return new Promise((resolve, reject) => {
        if (employees.length == 0) {
            reject("no results returned");
        }
        else {
            resolve(employees);
        }
    })
}

// Getting all of the managers among employees
getManagers = () => {
    return new Promise((resolve, reject) => {
        if (employees.length === 0) {
            reject('no results returned');
        }
        else {
            let all_manag = [];
            for (let i = 0; i < employees.length; i++)
                if (employees[i].isManager === true)
                    all_manag.push(employees[i])
            resolve(all_manag);
        }
    })
}

// Getting all the departments
getDepartments = () => {
    return new Promise((resolve, reject) => {
        if (departments.length === 0) {
            reject('no results returned');
        }
        else {
            resolve(departments);
        }
    })
}
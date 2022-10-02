initialize = () => {
    let p = new Promise(fs.readFile('./data/employees.json', (err, data) => {
        if (err) reject("Failure to read file employees.json!");
        employees = JSON.parse(data)
    }),

        fs.readFile('./data/departments.json', (err, data) => {
            if (err) reject("Failure to read file departments.json!");
            departments = JSON.parse(data)
        }))

    p.then(() => {
        console.log(`HUrreyy!! the file was read successfully`);
    }).catch(() => {
        console.log(`Unable to read the file`);
    })
    return p;
}

getAllEmployees = () => {
    let data = require("./data/employees.json");
    return new Promise((resolve, reject) => {
        if (data.length === 0) {
            reject('no results returned');
        }
        else {
            var all_emp = new Object(data);
            all_emp = JSON.stringify(all_emp);
            resolve(all_emp);
        }
    })
}

function getManagers() {
    let data = require("./data/employees.json");
    return new Promise((resolve, reject) => {
        if (data.length === 0) {
            reject('no results returned');
        }
        else {
            var all_emp = [];
            for (let i = 0; i < data.length; i++)
                if (data[i].isManager === true)
                    all_emp.push(data[i])
            all_emp = JSON.stringify(all_emp);
            resolve(all_emp);
        }
    })
}

function getDepartments() {
    let data = require("./data/departments.json");
    return new Promise((resolve, reject) => {
        if (data.length === 0) {
            reject('no results returned');
        }
        else {
            var all_depart = new Object(data);
            all_depart = JSON.stringify(all_depart);
            resolve(all_depart);
        }
    })
}
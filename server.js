var express = require("express");
var app = express();

var path = require("path");
const { nextTick } = require("process");
var HTTP_PORT = process.env.PORT || 8080;
var data_service = require("./data-service");
var emp = data_service.getAllEmployees();
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

app.use(express.static('public'));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./views/home.html"));
});

app.get("/about", function (req, res) {
    res.sendFile(path.join(__dirname, "./views/about.html"));
});

app.get("/employees", (req, res) => {
    emp.then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
    });
});

app.get("/managers", (req, res) => {
    data_service.getManagers().then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
    });
});

app.get("/departments", (req, res) => {
    data_service.getDepartments().then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
    });
});

app.listen(HTTP_PORT, onHttpStart);
// app.get(HTTP_PORT, (req, res) => {
//     data_service.initialize().then(() => {
//         res.listen(HTTP_PORT, onHttpStart);
//     }).catch(() => {
//         console.log("Not able to read or access the file");
//     })
// })
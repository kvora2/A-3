// app url ---- https://tame-goat-housecoat.cyclic.app
var express = require("express");
var app = express();

var path = require("path");
const { nextTick } = require("process");
var HTTP_PORT = process.env.PORT || 8080;
require("./data-service.js");

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
    getAllEmployees().then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
    });
});

app.get("/managers", (req, res) => {
    getManagers().then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
    });
});

app.get("/departments", (req, res) => {
    getDepartments().then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
    });
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./views/404.html"));
})

initialize().then(() => {
    app.listen(HTTP_PORT, onHttpStart);
}).catch((err) => {
    console.log(err);
})
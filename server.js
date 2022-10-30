/*************************************************************************
* BTI325– Assignment 3
* I declare that this assignment is my own work in accordance with Seneca Academic
Policy. No part * of this assignment has been copied manually or electronically from any
other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Kelvin Vora  Student ID: 157616210 Date: 30th Oct 2022
*
* Your app’s URL (from Cyclic) : 
*
**************************************************************************/

var express = require("express");
var multer = require("multer");
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const fs = require('fs');
var path = require("path");

var HTTP_PORT = process.env.PORT || 8080;
const data = require("./data-service.js");

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: "./public/images/uploaded",
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./views/home.html"));
});

app.get("/about", function (req, res) {
    res.sendFile(path.join(__dirname, "./views/about.html"));
});

app.get("/images/add", function (req, res) {
    res.sendFile(path.join(__dirname, "./views/addImage.html"));
});

app.get("/employees/add", function (req, res) {
    res.sendFile(path.join(__dirname, "./views/addEmployee.html"));
});

app.get("/employees", (req, res) => {
    if (req.query.status) {
        data.getEmployeesByStatus(req.query.status).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({ ERROR: err });
        })
    }
    else if (req.query.department) {
        data.getEmployeesByDepartment(req.query.department).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({ ERROR: err });
        })
    }
    else if (req.query.manager) {
        data.getEmployeesByManager(req.query.manager).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({ ERROR: err });
        })
    }
    else {
        data.getAllEmployees().then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({ERROR : err});
        });
    }
});

app.get("/managers", (req, res) => {
    data.getManagers().then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
    });
});

app.get("/departments", (req, res) => {
    data.getDepartments().then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
    });
});

app.get("/images", (req, res) => {
    fs.readdir("./public/images/uploaded", (err, items) => {
        if (err) {
            console.log("error opening the file!");
        }
        else {
            res.json({ images: items });
        }
    });
});

app.post("/images/add", upload.single("imageFile"), (req, res) => {
    fs.readdir("./public/images/uploaded", (err, items) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json({ images: items });
        }
    })
})

app.post("/employees/add", (req, res) => {
    data.addEmployee(req.body).then(() => {
        res.redirect("/employees")
    }).catch((err) => {
        console.log(err);
    });
});

app.get("/employee/:value", (req, res) => {
    data.getEmployeeByNum(req.params.value).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
    })
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/404.html"));
})

data.initialize().then(() => {
    app.listen(HTTP_PORT, onHttpStart);
}).catch((err) => {
    console.log(err);
})
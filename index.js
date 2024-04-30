const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const req = require("express/lib/request");
const res = require("express/lib/response");

app.use(cors());
app.use(bodyparser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Lakshmi6",
  database: "student1",
});

db.connect(function (error) {
  if (error) {
    console.log("Error in connecting DB");
  } else {
    console.log("Successfully connected DB");
  }
});

app.use(express.json());
//app.use(bodyparser.urlencoded({ extended: true }));

//app.use(bodyParser.json());

app.listen(5000, () => {
  console.log("Hi saikrishna server is running on port number 5000");
});

app.get("/api/students/read", (req, res) => {
  console.log("I am in node js");
  //alert("I am in node js");
  //let dsno = req.params.sno;
  //alert("dsno is" + dsno);
  //console.log("node js dsno is " + dsno);
  let sql = "select * from student";
  // alert(sqlstatement);
  console.log("SQL STATEMENT IS " + sql);
  db.query(sql, function (error, result) {
    if (error) {
      console.log("The values retrivel is not successful" + error);
    } else {
      console.log("table values retrivel successful" + result);
      res.send({
        status: true,
        data: result,
      });
    }
  });
});

app.get("/api/students/onerecord/:sno", (req, res) => {
  console.log("I am in node js");
  //alert("I am in node js");
  let dsno = req.params.sno;
  console.log("node js dsno is " + dsno);
  let sql = "select * from student where sno=" + dsno;
  // alert(sqlstatement);
  console.log("SQL STATEMENT IS " + sql);
  db.query(sql, function (error, result) {
    if (error) {
      console.log("The values retrivel is not successful" + error);
    } else {
      console.log("table values retrivel successful" + result);
      res.send({
        status: true,
        data: result,
      });
    }
  });
});

app.post("/api/students/insert", (req, res) => {
  let sql = "insert into student set ?";
  let details = {
    sno: req.body.sno,
    sname: req.body.sname,
    marks1: req.body.marks1,
    marks2: req.body.marks2,
    marks3: req.body.marks3,
    tot: req.body.tot,
    aveg: req.body.aveg,
    grade: req.body.grade,
  };
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: "Student record insertion failed" });
    } else {
      res.send({
        status: true,
        message: "Student record insertion successfull",
      });
    }
  });
});

app.delete("/api/student/remove/:sno", (req, res) => {
  let sql = "delete from student where sno=" + req.params.sno;
  db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "Deleting student record failed" });
    } else {
      res.send({ status: true, message: "Deleting student record successful" });
    }
  });
});

app.put("/api/student/edit/:sno", (req, res) => {
  let usno = req.params.sno;
  var sql =
    "update student set sno=" +
    req.body.sno +
    ",sname='" +
    req.body.sname +
    "',marks1=" +
    req.body.marks1 +
    ",marks2=" +
    req.body.marks2 +
    ",marks3=" +
    req.body.marks3 +
    ",tot=" +
    req.body.tot +
    ",aveg=" +
    req.body.aveg +
    ",grade='" +
    req.body.grade +
    "'  where sno=" +
    usno;

  console.log("sql is " + sql);

  db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Updating student record failed" });
    } else {
      res.send({
        status: true,
        message: "Updasting student record successfull",
      });
    }
  });
});

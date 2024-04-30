import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  /*const [stud, setstud] = useState({
    sno: " ",
    sname: " ",
    marks1: " ",
    marks2: " ",
    marks3: " ",
    tot: " ",
    aveg: " ",
    grade: " ",
  });*/

  const [stud, setstud] = useState([]);

  const [sno, setsno] = useState(" ");
  const [sname, setsname] = useState(" ");
  const [marks1, setmarks1] = useState(" ");
  const [marks2, setmarks2] = useState(" ");
  const [marks3, setmarks3] = useState(" ");

  const [tot, settotal] = useState("");
  const [gra, setgrade] = useState("");
  const [aveg, setaveg] = useState("");

  const loading = "true";

  const oninputchange = (e) => {
    //setstud({ ...stud, [e.target.name]: e.target.value });
    console.log(
      sno + " " + sname + " " + marks1 + " " + marks2 + " " + marks3 + " "
    );
  };

  const cleardata = () => {
    setsno("");
    setsname("");
    setmarks1(" ");
    setmarks2(" ");
    setmarks3(" ");
  };

  const savestud = async (event) => {
    //event.preventDefault();
    const result = await axios
      .get(`http://localhost:5000/api/students/read`)
      .then((resp) => {
        if (!resp.data.data[0]) {
          alert("Student not found");
          return;
        }
        console.log(
          "records data" + resp.data.data[0].sno + " " + resp.data.data[0].sname
        );
        setstud(resp.data.data);
      });
    console.log(
      "stud values are" +
        stud.sno +
        stud.tvalue.sname +
        stud.tvalue.marks1 +
        stud.marks2 +
        stud.marks3
    );
    /*console.log(
      "on click" +
        sno +
        " " +
        sname +
        " " +
        marks1 +
        " " +
        marks2 +
        " " +
        marks3 +
        " "
    );*/
    //event.preventDefault();
  };

  /*
  useEffect(() => {
    console.log(
      "stud values are" +
        stud.sno +
        stud.sname +
        stud.marks1 +
        stud.marks2 +
        stud.marks3
    );
  }, [stud]);

  
*/

  useEffect(() => {
    if (!stud) {
      alert("Student does not exist");
      return;
    }
    //fstud();
    console.log(
      "Use effect stud values are" +
        stud.sno +
        stud.sname +
        stud.marks1 +
        stud.marks2 +
        stud.marks3
    ); // returns 0;
  }, [stud]);

  const fstud = async (event) => {
    event.preventDefault();
    console.log("sno value is " + sno);
    const result = await axios
      .get(`http://localhost:5000/api/students/onerecord/${sno}`)
      .then(
        (resp) => {
          if (!resp.data.data[0]) {
            alert("Student not found");
            return;
          }
          setstud(resp.data.data[0]);
        }

        //setstud(" ");
        //alert("Student does not exist");
        //console.log("Student does not exist");

        //return resp.data.data;
      )
      .catch((err) => {
        if (err.response) {
          console.log("Error response status is " + err.response.status);
          console.log("Error response stsatus text" + err.response.statusText);
          console.log("Error message " + err.message);
          console.log("error headers are" + err.response.headers);
          console.log("error response data" + err.response.data);
        }
      });

    //setstud(JSON.stringify(result.data.data));

    //setstud(result.data.data);

    //const look = JSON.stringify(result.data.data);
    //display(look);
    //setstud(look);
    //setstud(JSON.stringify(result.data.data[0]));
    //setstud([...stud, ...JSON.stringify(result.data.data)]);
    //setstud([...JSON.stringify(result.data.data)]);
    //console.log("Result details are " +result);
    //console.log("Result details are " + JSON.stringify(result));
    //console.log("Student details are " + JSON.stringify(result.data.data));
    //console.log("Student LOOK details are " + look);
    /*
    stud.sno=look.sno;
    stud.sname=look.sname;
    stud.marks1=look.marks1;
    stud.marks2=look.marks2;
    stud.marks3=look.marks3;
    */
    if (loading === "false") {
      alert("student does not exist");
      //setstud(null);
      return;
    }
    console.log(
      "stud values are" +
        stud.sno +
        stud.sname +
        stud.marks1 +
        stud.marks2 +
        stud.marks3
    );
  };

  const totalandavg = (event) => {
    event.preventDefault();
    const t =
      parseInt(stud.marks1) + parseInt(stud.marks2) + parseInt(stud.marks3);

    settotal(t);
    stud.tot = t;
    const a = t / 3;
    setaveg(a);
    stud.aveg = a;
  };

  const gradecal = (event) => {
    event.preventDefault();
    //const g = "";
    if (stud.marks1 >= 35 && stud.marks2 >= 35 && stud.marks3 >= 35) {
      if (aveg >= 60) {
        setgrade("First Class");
        stud.grade = "First Class";
      } else if (aveg >= 50 && aveg < 60) {
        setgrade("second Class");
        stud.grade = "second class";
      } else {
        setgrade("Third Class");
        stud.grade = "Third Class";
      }
    } else {
      setgrade("Fail");
      stud.grade = "Fail";
    }
    //setgrade(g);
  };

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/students/insert", {
        sno: sno,
        sname: stud.sname,
        marks1: stud.marks1,
        marks2: stud.marks2,
        marks3: stud.marks3,
        tot: tot,
        aveg: aveg,
        grade: gra,
      });
      console.log(
        "student in save values are" +
          sno +
          " " +
          stud.sname +
          " " +
          stud.marks1 +
          " " +
          stud.marks2 +
          " " +
          stud.marks3 +
          " " +
          tot +
          " " +
          aveg +
          " " +
          gra
      );
      alert("Student registration successful");
    } catch (err) {
      alert("Student registration failed " + err);
    }
  }

  const onChangehandler = (e) => {
    const { name, value } = e.target;
    setstud({ ...stud, [name]: value });
    console.log(
      "onchangehandler values are " +
        stud.sno +
        "name is " +
        stud.sname +
        "marks is" +
        stud.marks1
    );
  };

  const editstud = async (event) => {
    event.preventDefault();
    let esno = stud.sno;
    //onChangehandler();
    console.log(
      "onchangehandler values are " +
        stud.sno +
        "name is " +
        stud.sname +
        "marks is" +
        stud.marks1
    );

    try {
      await axios.put("http://localhost:5000/api/student/edit/" + esno, {
        sno: stud.sno,
        sname: stud.sname,
        marks1: stud.marks1,
        marks2: stud.marks2,
        marks3: stud.marks3,
        tot: tot,
        aveg: aveg,
        grade: gra,
      });
      alert("Update is successful");
    } catch (err) {
      alert("Registration failed");
    }
  };

  /* function display(l) {
    setstud(l);
    console.log(
      "display stud values are" +
        stud.sno +
        stud.sname +
        stud.marks1 +
        stud.marks2 +
        stud.marks3
    );
  }
*/
  /*
  const findstud = async (event) => {
    event.preventDefault();

    const trimsno = sno.trim();
    alert("Sno is " + sno);
    alert("trim sno is " + trimsno);
    alert(`http://localhost:5000/api/students/get/${trimsno}`);
    // alert(await axios.get(`http://localhost:5000/api/students/get/10`));
    const mydata = await axios.get(`http://localhost:5000/api/students/get/10`);

    alert(mydata.data.sname);

    alert("status is "+mydata.data.status);

    setstud(mydata.data);

    alert(mydata.data);  

    //setstud(result.data);

    console.log(
      "result values are" +
        mydata.data.sno +
        mydata.data.sname +
        mydata.marks1 +
        mydata.marks2 +
        mydata.marks3
    );
    console.log(
      "stud values are" +
        stud.sno +
        stud.sname +
        stud.marks1 +
        stud.marks2 +
        stud.marks3
    );
  };
*/

  return (
    <div>
      <h1>STUDENT MARKS CALCULATION</h1>
      <form onSubmit={cleardata}>
        <div className="input-group">
          <label>Sno:</label>
          <input
            id="snoid"
            type="number"
            name="sno"
            defaultValue={stud.sno || " "}
            placeholder="Enter student number"
            onChange={(e) => setsno(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Sname:</label>
          <input
            id="sname"
            type="text"
            name="sname"
            value={stud.sname || ""}
            placeholder="Enter student name"
            //onChange={(e) => setsname(e.target.value)}
            onChange={onChangehandler}
          />
        </div>
        <div className="input-group">
          <label>Marks1:</label>
          <input
            id="marks1id"
            type="number"
            name="marks1"
            value={stud.marks1 || " "}
            placeholder="Enter student marks1"
            //onChange={(e) => setmarks1(e.target.value)}
            onChange={onChangehandler}
          />
        </div>
        <div className="input-group">
          <label>Marks2:</label>
          <input
            id="marks2id"
            type="number"
            name="marks2"
            value={stud.marks2 || " "}
            placeholder="Enter student marks2"
            //onChange={(e) => setmarks2(e.target.value)}
            onChange={onChangehandler}
          />
        </div>
        <div className="input-group">
          <label>Marks3:</label>
          <input
            id="marks3id"
            type="number"
            name="marks3"
            value={stud.marks3 || " "}
            placeholder="Enter student marks3"
            //onChange={(e) => setmarks3(e.target.value)}
            onChange={onChangehandler}
          />
        </div>
        <div className="input-group">
          <label>Total:</label>
          <input
            type="number"
            name="tot"
            // value={tot || ""}
            value={stud.tot || ""}
            placeholder="Total"
            //onChange={(e) => settotal(e.target.value)}
            onChange={onChangehandler}
          />
        </div>
        <div className="input-group">
          <label>Avg:</label>
          <input
            type="number"
            name="aveg"
            //value={aveg || ""}
            value={stud.aveg || ""}
            placeholder="Average"
            //onChange={(e) => setaveg(e.target.value)}
            onChange={onChangehandler}
          />
        </div>
        <div className="input-group">
          <label>Grade:</label>
          <input
            type="text"
            name="gra"
            // value={gra || ""}
            value={stud.grade || ""}
            placeholder="Grade"
            //onChange={(e) => setgrade(e.target.value)}
            onChange={onChangehandler}
          />
        </div>
      </form>
      <form>
        <div>
          <button className="btn" onClick={save}>
            Save Student
          </button>
          <Link className="btn" to={`removerecord`}>
            Remove Student
          </Link>
          <button className="btn" onClick={fstud}>
            Find Student
          </button>
          <button className="btn" onClick={editstud}>
            Edit Student
          </button>
          <Link className="btn" to={`displayrecord`}>
            Display Students
          </Link>
          <button className="btn" onClick={totalandavg}>
            Total and Avg
          </button>
          <button className="btn" onClick={gradecal}>
            Grade
          </button>
          <button className="btn" type="submit">
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

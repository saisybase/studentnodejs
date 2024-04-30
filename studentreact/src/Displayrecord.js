import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Displayrecord() {
  const [records, setrecords] = useState([]);

  const load = async (event) => {
    //event.preventDefault();
    // event.preventDefault();
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
        setrecords(resp.data.data);
      });
  };

  useEffect(() => {
    //load();
    (async () => await load())();
    console.log("Records are " + records);
  });

  return (
    <div>
      <h1> Display Records </h1>
      <table className="table table-dark bg-primary" align="center">
        <thead>
          <tr>
            <th scope="col">SNO</th>
            <th scope="col">SNAME</th>
            <th scope="col">MARKS1</th>
            <th scope="col">MARKS2</th>
            <th scope="col">MARKS3</th>
            <th scope="col">TOTAL</th>
            <th scope="col">AVERAGE</th>
            <th scope="col">GRADE</th>
          </tr>
        </thead>
        <tbody>
          {records &&
            records.map(function fn(st) {
              return (
                <tr className="blue">
                  <th scope="row">{st.sno}</th>
                  <td>{st.sname}</td>
                  <td>{st.marks1}</td>
                  <td>{st.marks2}</td>
                  <td>{st.marks3}</td>
                  <td>{st.tot}</td>
                  <td>{st.aveg}</td>
                  <td>{st.grade}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Link className="btn" to={`/`}>
        Back
      </Link>
    </div>
  );
}

export default Displayrecord;

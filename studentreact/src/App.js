import logo from "./logo.svg";
import "./App.css";
import Home from "./Home";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./Design.css";
import Removerecord from "./Removerecord.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Displayrecord from "./Displayrecord.js";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/removerecord" element={<Removerecord />} />
          <Route exact path="/displayrecord" element={<Displayrecord />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

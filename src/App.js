import React from "react";
import NavBar from "./core/Navbar";
import "./App.css";

const App = ({ children }) => (
  <div>
    <NavBar />
    <div className="container-fluid">
      <div>{children}</div>
    </div>
  </div>
);

export default App;

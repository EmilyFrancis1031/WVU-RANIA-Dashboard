import React from "react";
import { Link } from "react-router-dom";

import "./Idle.css";

const Idle = () => {
  return (
    <div>
      <h1>Idle</h1>
      <Link to="/listening">Listening</Link>
    </div>
  );
};

export default Idle;

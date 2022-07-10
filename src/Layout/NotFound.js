import React from "react";
import {Link, useLocation} from "react-router-dom";

function NotFound() {
  const location = useLocation();
  return (
    <div className="NotFound">
      <h1>
        Not Found <code>{location.pathname}</code>
        </h1>
        <p>
          <Link to="/">Home</Link>
        </p>
    </div>
  );
}

export default NotFound;

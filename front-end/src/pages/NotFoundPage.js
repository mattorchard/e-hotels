import React from "react";
import {Link} from "react-router-dom";


const NotFoundPage = () => <main className="main-content">
  <h2>404 Not found</h2>
  <Link to="/">Back to the home page</Link>
</main>;

export default NotFoundPage;
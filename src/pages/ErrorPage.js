import React from "react";
import App from "../App";
import { isAuthenticated } from "../helper/AuthHelper";
import {  Link } from "react-router-dom";

const ErrorPage = () => {

  return (
    <App>
      {isAuthenticated()  ?  (
          <div className="errorpage" >
          <h4><b>Sorry, this page isn't available</b></h4> <br></br>
          <h6>The link you followed may be broken, or the page may have been removed. Go back to <Link  to="/explore">Instagram.</Link></h6>
         </div>
        )
       : (
        <div className="errorpage" >
            <h4 ><b>Sorry, this page isn't available</b></h4> <br></br>
            <h6>The link you followed may be broken, or the page may have been removed. Go back to <Link  to="/">Instagram.</Link></h6>
        </div>
      )}
    </App>
  );
};

export default ErrorPage;

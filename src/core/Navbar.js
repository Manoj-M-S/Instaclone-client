import React, { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { isAuthenticated, logout } from "../helper/AuthHelper";

const NavBar = () => {
  const history = useHistory();
  return (
    <div className="navbar-fixed">
            {isAuthenticated() && (
    <nav>

      <div className="nav-wrapper white hoverbutton">
          <Link to="/home" className="brand-logo left" style={{paddingLeft: "200px" }} >
            Instagram
          </Link>
       

        <ul id="nav-mobile" className="right" >

            <Fragment >
              <li>
                <Link to="/profile" className="brand" >
                <i className="material-icons"> home</i>
                </Link>  
              </li>
              <li>
                <Link to="/explore" className="brand">
                <i className="material-icons"
                  > explore</i>
                </Link>
              </li>
              <li>
                <Link to="/create" className="brand ">
                <i className="material-icons">add_to_photos</i>
                </Link>
              </li>

              <li>
                <button
                  className="btn-small waves-effect waves-light blue hoverbuttons"
                  onClick={() => {
                    logout(() => {
                      history.push("/");
                    });
                  }}
                >
                  logout
                </button>
              </li>
            </Fragment>
        </ul>
      </div>
    </nav>

          )}

  
    </div>
);
};

export default NavBar;

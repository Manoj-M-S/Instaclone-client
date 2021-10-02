import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { API } from "../backend";
import Grid from '@material-ui/core/Grid';
import M from "materialize-css";
import inst_image from '../images/9364675fb26a.svg';
import insta_logo from '../images/logoinsta.png';
import fb from '../images/fb.png';
import appstore from '../images/app.png';
import playstore from '../images/play.png';
import App from "../App";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const signupform = () => {
    const login = (user) => {
      return fetch(`${API}/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (!data.error) {
            localStorage.setItem("loggedIn", JSON.stringify(data));
            M.toast({
              html: "Login Successful",
              classes: "#43a047 green darken-1",
            });
            setTimeout(() => {
              history.push("/explore");
            }, 250);
          } else {
            M.toast({
              html: data.error,
              classes: "#c62828 red darken-2",
            });
          }
        })
        .catch((error) => console.log(error));
    };
    return (


      
      <div>
        <Grid container>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6}>
        <div className="loginpage__main">
                <div>
                   <img alt= "" src={inst_image} width="454px" />
               </div>
               <div>
                   <div className="loginpage_rightcomponent">
                      <img  alt= "" className="loginpage__logo" src={insta_logo} />
                       <div className="loginPage__signin">
                              <div >
                              <input
                                  type="email"
                                  placeholder="Email"
                                  className="loginpage__text"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                  type="password"
                                  placeholder="Password"
                                  className="loginpage__text"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                                 <button fontWeight = "bold" color ="#0395F6" className="login__button"
                                  onClick={() => login({ email, password })}
                                >
                                  Login
                                </button>
                                  <div className="login__ordiv">
                                <div className="login__dividor"></div>
                                <div className="login__or">OR</div>
                                <div className="login__dividor"></div>
                            </div>

                            <div className="login__fb">
                                <img alt= "" src={fb} width="15px" style={{ "marginRight":"5px" }} />Log in with Facebook
                            </div>
                            <div className="login_forgt"> Forgot password?</div>
                              </div>
                       </div>
                   </div>
                    <div className="loginpage__signupoption">
                    <div className="loginPage__signin">Don't have an account? <Link to="/" className="link" style={{ "fontWeight":"bold"}}>Sign up</Link></div>
                    </div>
                    <div className="loginPage__downloadSection">
                        <div>
                        Get the app.
                        </div>
                        <div className="loginPage__option">
                        <a href="https://www.apple.com/app-store/">
                        <img  alt= "" className="loginPage_dwimg" src={appstore} width="136px" /></a>
                        <a href="https://play.google.com/store">
                        <img  alt= "" className="loginPage_dwimg" src={playstore} width="136px" /></a>
                        </div>
                    </div>
               </div>
           </div>
           </Grid>
        <Grid item xs={3}>
        </Grid>
    </Grid>
      
      </div>

        
    );
  };
  return <App>{signupform()}</App>;
};

export default Login;

import React, { useState } from "react";
import { Link,  useHistory } from "react-router-dom";
import { API } from "../backend";
import Grid from '@material-ui/core/Grid';
import M from "materialize-css";
import inst_image from '../images/9364675fb26a.svg';
import insta_logo from '../images/logoinsta.png';
import fb from '../images/fb.png';
import appstore from '../images/app.png';
import playstore from '../images/play.png';
import App from "../App";
  
  
  const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const[fullname, setFullname] = useState("");//Backend
    const [password, setPassword] = useState("");
    const history = useHistory();
    const [image, setImage] = useState("");
    let photo = "";
  
  
    const signup = (user) => {
      return fetch(`${API}/signup`, {
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
              html: "Signup Successful",
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
  
    const uploadPic = () => {
      if (image) {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "insta-clone");
        data.append("cloud_name", "makarasu");
        fetch("https://api.cloudinary.com/v1_1/makarasu/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            photo = data.url;
          })
          .then(() => signup({ name, fullname, email, password, photo }))
          .catch((err) => {
            console.log(err);
          });
      } else {
        signup({ name, fullname, email, password });
      }
    };
  
  
  
    return (
      <App>
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
                                      className="loginpage__text"
                                      placeholder="Mobile number or Email"
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <input
                                      type="text"
                                      className="loginpage__text"
                                      placeholder="Full Name"
                                      value={fullname}
                                      onChange={(e) => setFullname(e.target.value)}
                                    />
                                    <input
                                      type="text"
                                      className="loginpage__text"
                                      placeholder="Username"
                                      value={name}
                                      onChange={(e) => setName(e.target.value)}
                                    />
                                    <input
                                      type="password"
                                      className="loginpage__text"
                                      placeholder="Password"
                                      value={password}
                                      onChange={(e) => setPassword(e.target.value)}
                                    />
                                  <div className="file-field input">
                                     <div className=" btn waves-effect waves-light #0395F6 blue darken-1">
                                        <i className="material-icons">add_a_photo</i>
                                        <input
                                          type="file"
                                          onChange={(e) => setImage(e.target.files[0])}
                                        />
                                      </div>
                                      <div className="file-path-wrapper">
                                        <input className="file-path validate" type="text" placeholder="Add profile picture" />
                                      </div>
                                  </div>
                                    <button fontWeight = "bold" color ="#0395F6" className="login__button"
                                      onClick={() => uploadPic()}
                                    >
                                      Signup
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
                        <div className="loginPage__signup">Have an account? <Link to="/login" className="link" style={{ "fontWeight":"bold"}}>Sign in</Link></div>
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
  </App>
      );
    }
  
  export default Signup;
  
  
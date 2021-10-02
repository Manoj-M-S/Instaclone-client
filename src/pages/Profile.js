import React, { useEffect, useState } from "react";
import App from "../App";
import { isAuthenticated } from "../helper/AuthHelper";
import { API } from "../backend";
import { Redirect, Link } from "react-router-dom";

const Profile = () => {
  const [mypics, setPics] = useState([]);
  const [userDetails, setDetails] = useState([]);
  const [dp, setDp] = useState([]);
  const { user, token } = isAuthenticated();



  useEffect(() => {
    if (user._id) {
      fetch(`${API}/myposts/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setPics(result);
        })
        .then(
          fetch(`${API}/profile/${user._id}`)
            .then((res) => res.json())
            .then((result) => {
              setDetails(result);
              console.log(result);
              setDp(result.profile);
            })
        );
    } else {
      return <Redirect to="/signup" />;
    }
  }, [user._id, token]);

  const deletePost = (postid) => {
    fetch(`${API}/post/delete/${user._id}/${postid}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = mypics.filter((item) => {
          return item._id !== result._id;
        });
        setPics(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <App>
      {isAuthenticated()  ? (
        userDetails.profile && dp.length > 0 ? (
          <div style={{ maxWidth: "550px", margin: "0px auto" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "18px 0px",
                borderBottom: "1px solid grey",
              }}
            >
              <div>
                <object
                    className="hoverbutton"

                  data={dp}
                  style={{
                    width: "160px",
                    height: "160px",
                    borderRadius: "80px",
                  }}
                >
                  <img
                    style={{
                      width: "160px",
                      height: "160px",
                      borderRadius: "80px",
                    }}
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    alt=""
                  />
                </object>
               
              </div>
              <div>
                <h5>{user.name}</h5>
                <div
                  style={{
                    display: "Flex",
                    justifyContent: "space-between",
                    width: "108%",
                  }}
                >
                  <h6><b>{mypics.length}</b> Post</h6>
                  <h6><b>{userDetails.followers.length}</b> Followers</h6>
                  <h6><b>{userDetails.following.length}</b> Following</h6>
                </div>
                <h6>{user.fullname}</h6>
              </div>
            </div>
            <div className="gallery">
              {mypics.map((item) => {
                return (
                  <div key={item._id}>
                    <div className="card profile-card hovernow">
                      <div className="card-content">
                        <div className="card-image ">
                          <img
                            key={item._id}
                            className="item"
                            alt={item.caption}
                            src={item.photo}
                          />
                        </div>
                        <div style={{"paddingTop": "50px"}}>
                        <i
                          className="material-icons hoverdelete"
                          style={{ float: "right" }}
                          onClick={() => {
                            deletePost(item._id);
                          }}
                        >
                          delete
                        </i>
                        <i className="material-icons" style={{ float: "left" }}>
                          <Link to={`/editpost/${item._id}/`}>create </Link>
                        </i>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <h2>Loading!</h2>
        )
      ) : (
        <Redirect to="/signup" />
      )}
    </App>
  );
};

export default Profile;

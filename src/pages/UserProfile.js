import React, { useEffect, useState } from "react";
import App from "../App";
import { isAuthenticated } from "../helper/AuthHelper";
import { API } from "../backend";
import { useParams, Redirect, useHistory } from "react-router-dom";
import M from "materialize-css";

const UserProfile = () => {
  const [userProfile, setProfile] = useState([]);
  const history = useHistory();
  const { user, token } = isAuthenticated();
  const { userId } = useParams();

  useEffect(() => {
    if (user._id) {
      fetch(`${API}/profile/${userId}`)
        .then((res) => res.json())
        .then((result) => {
          setProfile(result);
        });
    } else {
      return <Redirect to="/" />;
    }
  }, [user._id, userId]);

  const followUser = () => {
    fetch(`${API}/follow`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: userProfile.username,
        followId: userId,
        name: user.name,
        id: user._id,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        M.toast({
          html: `You are following ${userProfile.username}`,
          classes: "#43a047 green darken-1",
        });
        setTimeout(() => {
          history.push("/home");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unfollowUser = () => {
    fetch(`${API}/unfollow`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: userProfile.username,
        unfollowId: userId,
        name: user.name,
        id: user._id,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        M.toast({
          html: `You unfollowed ${userProfile.username}`,
          classes: "#43a047 green darken-1",
        });
        setTimeout(() => {
          history.push("/home");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <App>
      <>
        {isAuthenticated() ? (
          userProfile.profile ? (
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
                    data={userProfile.profile}
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
                  <h5>{userProfile.username}</h5>
                  <div
                    style={{
                      display: "Flex",
                      justifyContent: "space-between",
                      width: "108%",
                    }}
                  >
                    <h6><b>{userProfile.posts.length}</b> posts</h6>
                    <h6><b>{userProfile.followers.length}</b>  Followers</h6>
                    <h6><b>{userProfile.following.length}</b>  Following</h6>
                  </div>
                  <h6>{user.fullname}</h6>
                  <div style={{ padding: "10px 0px " }}>
                    {userProfile.followers.includes(user.name) ? (
                      <button
                        className="btn waves-effect waves-light blue "
                        onClick={() => unfollowUser()}
                      >
                        Unfollow
                      </button>
                    ) : (
                      <button
                        className="btn waves-effect waves-light blue "
                        onClick={() => followUser()}
                      >
                        Follow
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="gallery ">
                {userProfile.posts.map((item) => {
                  return (
                    <img
                      key={item._id}
                      className="item hoverbutton"
                      alt={item.caption}
                      src={item.photo}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <h2>Loading!</h2>
          )
        ) : (
          <Redirect to="/" />
        )}
      </>
    </App>
  );
};

export default UserProfile;

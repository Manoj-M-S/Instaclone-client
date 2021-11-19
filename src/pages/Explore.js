import React, { useEffect, useState } from "react";
import App from "../App";
import { isAuthenticated } from "../helper/AuthHelper";
import { API } from "../backend";
import { Redirect, Link } from "react-router-dom";


const Explore = () => {
  const [pics, setPics] = useState([]);
  const { user, token } = isAuthenticated();




  useEffect(() => {
    fetch(`${API}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {

        setPics(result);
      });
  }, [token]);

 
  const likePost = (id) => {
    fetch(`${API}/like`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        postId: id,
        userId: user.name,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = pics.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setPics(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unlikePost = (id) => {
    fetch(`${API}/unlike`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        postId: id,
        userId: user.name,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = pics.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setPics(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const deletePost = (postid) => {
  //   fetch(`${API}/post/delete/${user._id}/${postid}`, {
  //     method: "delete",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       const newData = pics.filter((item) => {
  //         return item._id !== result._id;
  //       });
  //       setPics(newData);
  //     })
  //     .then((data) => {
  //       if (!data.error) {
  //         M.toast({
  //           html: "Post Created Successful",
  //           classes: "#43a047 green darken-1",
  //         });
  //       } else {
  //         M.toast({
  //           html: data.error,
  //           classes: "#c62828 red darken-2",
  //         });
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // };

  const makeComment = (text, id) => {
    fetch(`${API}/comment`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text: text,
        postId: id,
        userName: user.name,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = pics.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setPics(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteComment = (cId, id) => {
    fetch(`${API}/comment/delete`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        commentId: cId,
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = pics.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setPics(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    
    <App>
      
      {isAuthenticated() ? (
        pics.length > 0 ? (
          pics.map((item) => {
            return (
              <div key={item._id}>
                <div className="card home-card hovernow">
                  <span className="card-title">
                    <div style={{ maxWidth: "100%" }}>
                      <div style={{
                        display: "flex",
                      }}>
                        <div className="profile">
                          <object
                              className="hoverbutton"
                              data={item.profile}
                              style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "25px",
                            }}
                          >
                            <img
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "25px",
                              }}
                              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                              alt=""
                            />
                          </object>
                        </div>
                        <div>
                          <h6 style={{ paddingLeft: "10px", paddingTop: "10px" }} className="text">
                            <Link
                              to={
                                item.userId !== user._id
                                  ? `/profile/${item.userId}`
                                  : `/profile`
                              }style={{ "fontWeight":"bold"}}
                            >
                              {item.postedBy}
                            </Link>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </span>
                  <p style={{ paddingLeft: "10px", marginTop:"0px"}}>{item.location}</p>
                  <div className="card-image">
                    <img alt={item.caption} src={item.photo} />
                  </div>
                  <div className="card-content">
                  <i className="fa fa-comment-o" aria-hidden="true" />
                  {item.like.includes(user.name) ? (
                      <i
                        className="material-icons"
                        style={{ color:"red" }}
                        onClick={() => {
                          unlikePost(item._id);
                        }}
                      >
                        favorite
                      </i>
                    ) : (
                      <i
                        className="material-icons"
                        onClick={() => {
                          likePost(item._id);
                        }}
                      >
                        favorite_border
                      </i>
                    )}
                    <p><b>{item.like.length} Likes</b></p>
                    <p>
                    <b>{item.postedBy} </b>
                      {item.caption}
                    </p>
                    {item.comment.map((record) => {
                      return (
                        <p key={record._id}>
                          <span style={{ fontWeight: "500" }}>
                            <b>{record.postedBy} </b>
                          </span>
                          {record.text}
                          {record.postedBy === user.name && (
                            <i
                              className="material-icons hoverdelete"
                              style={{ float: "right", fontSize:"20px" }}
                              onClick={() => {
                                deleteComment(record._id, item._id);
                              }}
                            >
                              delete
                            </i>
                          )}
                        </p>
                      );
                    })}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        makeComment(e.target[0].value, item._id);
                      }}
                    >
                      <input type="text" placeholder="Add a comment..." />
                    </form>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="loading" >
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fshopstatic-in.vivo.com%2Fdist%2Fcommon%2Fimages%2Floading_e5479cc.gif&f=1&nofb=1" alt="Loading.." width="100px" height="100px"/>
       </div>
        )
      ) : (
        <Redirect to="/" />
      )}
    </App>
  );
};

export default Explore;

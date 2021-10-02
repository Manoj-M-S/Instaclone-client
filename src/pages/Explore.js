import React, { useEffect, useState } from "react";
import App from "../App";
import { isAuthenticated } from "../helper/AuthHelper";
import { API } from "../backend";
import { Redirect, Link } from "react-router-dom";
import M from "materialize-css";


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
        console.log(result);

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

  const deletePost = (postid) => {
    fetch(`${API}/post/delete/${user._id}/${postid}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = pics.filter((item) => {
          return item._id !== result._id;
        });
        setPics(newData);
      })
      .then((data) => {
        if (!data.error) {
          M.toast({
            html: "Post Created Successful",
            classes: "#43a047 green darken-1",
          });
        } else {
          M.toast({
            html: data.error,
            classes: "#c62828 red darken-2",
          });
        }
      })
      .catch((error) => console.log(error));
  };

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
                      {item.postedBy === user.name && (
                        <i
                          className="material-icons hoverdelete"
                          style={{ float: "right", fontSize:"20px", paddingRight:"10px" }}
                          onClick={() => {
                            deletePost(item._id);
                          }}
                        >
                          delete
                        </i>
                      )}
                    </h6>
                  </span>
                  <p style={{ paddingLeft: "10px" }}>{item.location}</p>
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
          <h2>Loading!</h2>
        )
      ) : (
        <Redirect to="/" />
      )}
    </App>
  );
};

export default Explore;

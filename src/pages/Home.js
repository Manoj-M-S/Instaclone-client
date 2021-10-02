import React, { useEffect, useState } from "react";
import App from "../App";
import { isAuthenticated } from "../helper/AuthHelper";
import { API } from "../backend";
import { Redirect, Link } from "react-router-dom";

const Following = () => {
  const [pics, setPics] = useState([]);
  const [following, setFollowing] = useState([]);
  const { user, token } = isAuthenticated();
  console.log(user);

  useEffect(() => {
    if (user._id) {
      fetch(`${API}/feed/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setPics(result);
        }).then(
          fetch(`${API}/profile/${user._id}`)
            .then((res) => res.json())
            .then((result) => {
              setFollowing(result.following);
            })
        );
    } else {
      return <Redirect to="/" />;
    }
  }, [user._id, token, following.length]);

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
      .catch((err) => {
        console.log(err);
      });
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
            <h6 style={{ paddingLeft: "10px", paddingTop: "10px"}} className="text ">
              <Link
                to={
                  item.userId !== user._id
                    ? `/profile/${item.userId}`
                    : `/profile`
                } style={{ "fontWeight":"bold"}}
              >
                {item.postedBy}
              </Link>
              {item.postedBy === user.name && (
                <i
                  className="material-icons hoverdelete"
                  style={{ float: "right" }}
                  onClick={() => {
                    deletePost(item._id);
                  }}
                >
                  delete
                </i>
              )}
            </h6>
          <p style={{ paddingLeft: "10px" }}>{item.location}</p>
          <div className="card-image hovernow">
            <img alt={item.caption} src={item.photo} />
          </div>
          <div className="card-content">
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
  <h1>Loading... </h1>
  
  
  
   
))  : (
        <Redirect to="/" />
      )}
    </App>
  );
};

export default Following;








































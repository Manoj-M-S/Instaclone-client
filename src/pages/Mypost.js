import React, { useEffect, useState } from "react";
import App from "../App";
import { isAuthenticated } from "../helper/AuthHelper";
import { API } from "../backend";
import M from "materialize-css";

import { Redirect, useParams, useHistory } from "react-router-dom";
const Post = () => {
  const [pics, setPics] = useState([]);
  const { user, token } = isAuthenticated();
  const { postId } = useParams();
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const history = useHistory();

  useEffect(() => {
    fetch(`${API}/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPics(result);
        setCaption(result.caption);
        setLocation(result.location);
        setImage(result.photo);
      });
  }, [postId, token]);

  let photo = "";
  const UpdatePost = () => {
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
        photo = data.secure_url;
      })
      .then(() => Update(caption, location, photo, token, postId))
      .catch((err) => {
        console.log(err);
      });
  };
  const Update = (caption, location, photo, token, postId) => {
    fetch(`${API}/post/update/${postId}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        photo: photo,
        caption: caption,
        location: location,
        postId: postId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          M.toast({
            html: "Post Updated Successful",
            classes: "#43a047 green darken-1",
          });
          setTimeout(() => {
            history.push(`/profile`);
          }, 1000);
        } else {
          M.toast({
            html: data.error,
            classes: "#c62828 red darken-2",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <App>
      {isAuthenticated() ? (
        user.name === pics.postedBy ? (
          <div className="card home-card hovernow">
            <h5 style={{ padding: "7px" }}>Edit Post</h5>
            <div className="card-image">
              <img alt={pics.caption} src={pics.photo} />
            </div>
            <div className="card-content">
              <h5>
                {pics.caption}
              </h5>
              <h5>
                <b> {pics.location}</b>
              </h5>
            </div>
            <div className="card field">
              <input
                type="text"
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
              <input
                type="text"
                placeholder="Add Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              
              <div className="file-field input">
              <div className=" btn waves-effect waves-light blue">
          <i className="material-icons"> add_to_photos</i>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text"   placeholder="Upload a picture"/>
          </div>
        </div>
              <button
                className="btn waves-effect waves-light blue accent-2"
                onClick={() => UpdatePost()}
              >
                Update Post
              </button>
            </div>
          </div>
        ) : (
          <h2>Loading!</h2>
        )
      ) : (
        <Redirect to="/" />
      )}
    </App>
  );
};

export default Post;

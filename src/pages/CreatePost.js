import React, { useState } from "react";
import App from "../App";
import { isAuthenticated } from "../helper/AuthHelper";
import { API } from "../backend";
import { CreateaPost } from "../helper/PostHelper";
import { useHistory } from "react-router-dom";

const CreatePost = () => {
  const history = useHistory();
  const { user, token } = isAuthenticated();

  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const postedBy = user.name;
  const userId = user._id;
  let photo = "";

  const PostDetails = () => {
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
        console.log(data);
        photo = data.secure_url;
      })
      .then(() =>
        CreateaPost(photo, postedBy, API, user, token, caption, location, userId)
      )
      .then(() =>
        setTimeout(() => {
          history.push("/profile");
        }, 2500)
      )
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <App>
      <div className="card field hovernow">
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
          <div className=" btn waves-effect waves-light blue hoverbuttons">
          <i className="material-icons "> add_to_photos</i>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text"   placeholder="Upload a picture"/>
          </div>
        </div>
        <button
          className="btn waves-effect waves-light  blue hoverbuttons"
          onClick={() => PostDetails()}
        >
        Post
        </button>
      </div>
    </App>
  );
};

export default CreatePost;

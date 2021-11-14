import React, { useState } from "react";
import BlogItem from "../../Components/BlogItem/BlogItem";
import { useSelector, useDispatch } from "react-redux";
import API_URL from "../../Service/service";
import "./Writer.css";
import axios from "axios";
import { useNavigate } from "react-router";
function WriterPage() {
  const userPosts = useSelector((state) => state.userPosts);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch({
      type: "SET_USER",
      payload: { user: {} },
    });
    navigate("../");
  };
  const dispatch = useDispatch();
  console.log(title, content);
  console.log(userPosts);

  const createPostHandler = async () => {
    const res = await axios.post(`${API_URL}/posts/new`, {
      username: user.username,
      title,
      content,
    });
    console.log(res.data);
    const postRes = await axios.get(`${API_URL}/posts/`);
    const posts = postRes.data;
    const userPosts = posts.filter((item) => item.username === user.username);
    dispatch({
      type: "SET_USER_POSTS",
      payload: { userPosts: userPosts },
    });
    setContent('')
    setTitle('')
  };
  return (
    <div className="writer-container">
      <div className="writer-heading">
        Welcome to the content writer dashboard!
      </div>
      <div
        style={{ color: "blue", fontStyle: "italic" }}
        onClick={logoutHandler}
      >
        Logout
      </div>
      <div className="writer-posts">
        <div className="writer-posts-heading">Create new Post</div>
        <div className="post-form">
          <div>
            <div>Title:</div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <div>Content:</div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={20}
              cols={50}
            />
          </div>
          <div className="create-post-button" onClick={createPostHandler}>
            Create Post
          </div>
        </div>
        <div className="writer-posts-heading">Your Posts</div>
        {userPosts.map((item) => (
          <BlogItem post={item} />
        ))}
      </div>
    </div>
  );
}

export default WriterPage;

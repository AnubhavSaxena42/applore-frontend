import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import API_URL from "../../Service/service";
import "./Login.css";
function LoginPage() {
  const state = useSelector((state) => state);
  console.log("current State:", state);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  const loginHandler = async (username, password) => {
    axios
      .post(`${API_URL}/auth/login`, { username, password })
      .then(async (response) => {
        const user = response.data;

        dispatch({ type: "SET_USER", payload: { user: user } });

        const userRes = await axios.get(`${API_URL}/users/`);
        const postRes = await axios.get(`${API_URL}/posts/`, config);
        const users = userRes.data;
        const posts = postRes.data;
        if (user.role === "ADMIN") {
          const pendingPosts = posts.filter((item) => !item.isApproved);
          const approvedPosts = posts.filter((item) => item.isApproved);
          dispatch({
            type: "SET_USERS",
            payload: { users: users },
          });
          dispatch({
            type: "SET_USER_POSTS",
            payload: { userPosts: posts },
          });

          dispatch({
            type: "SET_PENDING",
            payload: { pendingPosts: pendingPosts },
          });
          dispatch({
            type: "SET_APPROVED",
            payload: { approvedPosts: approvedPosts },
          });
          navigate("/adminhome");
        } else {
          const userPosts = posts.filter(
            (item) => item.username === user.username
          );
          dispatch({
            type: "SET_USER_POSTS",
            payload: { userPosts: userPosts },
          });
          console.log("below");
          navigate("/writerhome");
        }
      })
      .catch((err) => console.log(err.message));
  };
  console.log(username, password);

  return (
    <div className="login-container">
      <h1 className="login-header">LOGIN</h1>
      <p>Username:</p>
      <input
        type="text"
        value={username}
        onChange={(e) => {
          console.log("called");
          setUsername(e.target.value);
        }}
        name="fname"
      />
      <p>Password:</p>
      <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        name="lname"
      />
      <div
        onClick={() => loginHandler(username, password)}
        className="log-in-button"
      >
        Log-in
      </div>
    </div>
  );
}

export default LoginPage;

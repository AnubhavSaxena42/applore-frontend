import React, { useState, useEffect } from "react";
import BlogItem from "../../Components/BlogItem/BlogItem";
import { useSelector, useDispatch } from "react-redux";
import API_URL from "../../Service/service";
import "./Admin.css";
import UserItem from "../../Components/UserItem/UserItem";
import axios from "axios";
import { useNavigate } from "react-router";
function Admin() {
  const pendingPosts = useSelector((state) => state.pendingPosts);
  const approvedPosts = useSelector((state) => state.approvedPosts);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const users = useSelector((state) => state.users);
  const logoutHandler = () => {
    dispatch({
      type: "SET_USER",
      payload: { user: {} },
    });
    navigate("../");
  };
  useEffect(() => {
    axios.get(`${API_URL}/posts`).then((res) => {
      const posts = res.data;

      const pendingPosts = posts.filter((item) => {
        if (!item.isApproved) return item;
      });
      const approvedPosts = posts.filter((item) => {
        if (item.isApproved) return item;
      });
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
    });
  }, []);
  const createUserHandler = async () => {
    const res = await axios.post(`${API_URL}/users/new`, {
      username,
      password,
      role,
    });
    console.log(res.data);
    const userRes = await axios.get(`${API_URL}/users/`);
    const usersNew = userRes.data;
    dispatch({
      type: "SET_USERS",
      payload: { users: usersNew },
    });
  };

  console.log(users);
  return (
    <div className="admin-page-container">
      <div className="admin-page-heading">Welcome to the admin dashboard!</div>
      <div
        style={{ color: "blue", fontStyle: "italic" }}
        onClick={logoutHandler}
      >
        Logout
      </div>
      <div className="pending-posts-heading">Users</div>
      <div className="user-items-container">
        {users.map((item) => (
          <UserItem key={item._id} user={item} />
        ))}
      </div>
      <div className="pending-posts-heading">Create new user</div>
      <div className="user-items-container">
        <div>
          <div>Username:</div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <div>Password:</div>
          <input
            value={password}
            type="text"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <div>Role:</div>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div className="create-user-button" onClick={createUserHandler}>
          Create user
        </div>
      </div>
      <div className="pending-posts-container">
        <div className="pending-posts-heading">Pending Posts</div>
        {pendingPosts.map((item) => (
          <BlogItem key={item._id} post={item} />
        ))}
      </div>
      <div className="approved-posts-container">
        <div className="approved-posts-heading">Approved Posts</div>
        {approvedPosts.map((item) => (
          <BlogItem key={item._id} post={item} />
        ))}
      </div>
    </div>
  );
}

export default Admin;

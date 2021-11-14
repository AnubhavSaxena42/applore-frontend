import axios from "axios";
import React, { useState } from "react";
import { useSelector  } from "react-redux";
import { useNavigate, useParams } from "react-router";
import API_URL from "../../Service/service";
import "./BlogPost.css";
function BlogPost(props) {
  const params = useParams();
  const isAdmin = useSelector((state) => state.user.role === "ADMIN");

  
  const navigate = useNavigate();
  const post = useSelector((state) =>
  state.userPosts.find((item) => item._id === params.postId)
  );
  const [isActive,setisActive] = useState(post.isActive)
  const [isEdit, setisEdit] = useState(false);
  const [content, setContent] = useState(post.content);
  const [title, setTitle] = useState(post.title);
  const editHandler = async () => {
      const newPost = {
          ...post,
          content,
          title,
      }
      const res = await axios.put(`${API_URL}/posts/${post._id}`,newPost)
      console.log(res.data)
      navigate("../adminhome")

  }
  const deleteHandler = async () => {
    const res = await axios.delete(`${API_URL}/posts/${post._id}`)
    console.log(res.data)
    navigate("../adminhome")
  }  
  const approveHandler = async () => {
      const newPost = {
          ...post,
          isApproved:true,
      }
      const res = await axios.put(`${API_URL}/posts/${post._id}`,newPost)
      console.log(res.data)
      navigate("../adminhome")
  }
  const softDeleteHandler = async () => {
      const newPost = {
          ...post,
          isActive:!isActive
      }
      const res = await axios.put(`${API_URL}/posts/${post._id}`,newPost)
      console.log(res.data)
      navigate("../adminhome")
  }
  return (
    <div className="blog-post-container">
      <div className="blog-post-top-container">
        <div className="blog-post-heading">
          {post.title}
        </div>
        <div className="blog-post-date">{post.createdAt.substr(0,10)}</div>
      </div>
      <div className="blog-post-content">
        {post.content}
      </div>
      <div className="blog-post-author">-{post.username}</div>
      {isAdmin && (
        <div className="blog-actions-container">
          <div className="blog-edit-button" onClick={() => setisEdit(!isEdit)}>
            Edit
          </div>
          <div className="blog-delete-button" onClick={deleteHandler}>Delete</div>
          {!post.isApproved && <div className="blog-approve-button" onClick={approveHandler}>Approve</div>}
          <div className="blog-active-button" onClick={softDeleteHandler}>{post.isActive?'Soft delete':'Restore to active'}</div>
        </div>
      )}
      {isEdit && (
        <div className="blog-edit-container">
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
          <div className="apply-edit-button" onClick={editHandler}>Apply Changes</div>
        </div>
      )}
    </div>
  );
}

export default BlogPost;

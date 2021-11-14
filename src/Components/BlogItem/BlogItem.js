import React from 'react'
import './BlogItem.css'
import {useNavigate} from 'react-router-dom'

function BlogItem(props) {
    const {post}= props
    const navigate = useNavigate();
    const navigateToPost = () => {
        navigate(`/posts/${post._id}`)
    }
    return (
        <div className="blog-item-container" onClick={navigateToPost}>
            <div className="blog-item-heading">
                {post.title} 
            </div>
            <div className="blog-item-description">
                {post.content.substr(0,25)}...
            </div>
        </div>
    )
}

export default BlogItem

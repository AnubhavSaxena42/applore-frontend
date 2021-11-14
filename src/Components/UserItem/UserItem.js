import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import API_URL from '../../Service/service'
import './UserItem.css'
function UserItem({user}) {
    console.log(user)
    const dispatch = useDispatch()
    const userDeleteHandler = async ()=>{
        const res = await axios.delete(`${API_URL}/users/${user._id}`)
        console.log(res.data);
        const userRes = await axios.get(`${API_URL}/users/`);
        const usersNew = userRes.data;
        dispatch({
          type: "SET_USERS",
          payload: { users: usersNew },
        });
    }
    const userSoftDeleteHandler = async ()=> {
    
        const newUser = {
            ...user,
            isActive:!user.isActive,
        }
        const res = await axios.put(`${API_URL}/users/${user._id}`,newUser)
        console.log(res.data)
        const userRes = await axios.get(`${API_URL}/users/`);
        const usersNew = userRes.data;
        dispatch({
          type: "SET_USERS",
          payload: { users: usersNew },
        });
    }
    return (
        <div className="user-item-container">
            <div>Username:{user.username}</div>
            <div>Role:{user.role}</div>
            <div>Active:{user.isActive?'True':'False'}</div>
            <div className="user-actions-container">
                <div className='user-status-button' onClick={userSoftDeleteHandler}>Switch Active status</div>
                <div className="user-delete-button" onClick={userDeleteHandler}>Delete</div>
            </div>
        </div>
    )
}

export default UserItem

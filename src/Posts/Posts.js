import React, { useState } from 'react'
import Post from './Post/Post'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { Link } from 'react-router-dom'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
const Posts = ({ posts, currentCategory, handleFormVisible, currentUser, users, isLoggedIn }) => {

    return (
        <div className="main-content">
            <div className="header">
                <h2>{currentCategory}</h2>
                <div className="search-field">
                    <input placeholder="search content here"></input>
                    <button className="search-btn"><SearchOutlinedIcon /></button>
                </div>
                <button className="add-post-btn" onClick={() => handleFormVisible(true)}>
                    {isLoggedIn ? <AddCircleOutlineIcon /> : ''}
                </button>
                <button className="bookmark-btn">
                    {isLoggedIn ? <BookmarkBorderIcon /> : ''}
                </button>
            </div>
            <div className="post-container">
                {posts.map((post, index) => (
                    post.category === currentCategory ?
                        <Post
                            post={post}
                            key={index}
                            currentUser={currentUser}
                            users={users}
                        /> : ""
                ))}
            </div>
        </div>

    )
}

export default Posts

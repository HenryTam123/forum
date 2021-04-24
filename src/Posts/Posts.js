import React, { useState } from 'react'
import Post from './Post/Post'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
const Posts = ({ posts, currentCategory, handleFormVisible, currentUser, users, isLoggedIn, handleLike, handleDislike }) => {

    const [searchQuery, setSearchQuery] = useState('')

    return (
        <div className="main-content">
            <div className="header">
                <h2>{currentCategory}</h2>
                <div className="search-field">
                    <input placeholder="search content here" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></input>
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
                    post.category === currentCategory && post.title.toLowerCase().includes(searchQuery.toLowerCase()) ?
                        <Post
                            post={post}
                            key={index}
                            currentUser={currentUser}
                            users={users}
                            handleLike={handleLike}
                            handleDislike={handleDislike}
                        /> : ""
                ))}
            </div>
        </div>

    )
}

export default Posts

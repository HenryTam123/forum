import React, { useEffect, useState } from 'react'
import KeyboardBackspaceRoundedIcon from '@material-ui/icons/KeyboardBackspaceRounded';
import ArrowBackIosSharpIcon from '@material-ui/icons/ArrowBackIosSharp';
import SendIcon from '@material-ui/icons/Send';
import { Link, useParams } from 'react-router-dom'
import PersonIcon from '@material-ui/icons/Person';
import Post from './Posts/Post/Post'
import axios from './axios'
const PostsDetail = ({ users, currentUser, isLoggedIn, responses }) => {
    const { id } = useParams()
    const [thisPost, setThisPost] = useState([])
    const [userInput, setUserInput] = useState('')

    useEffect(() => {
        getPost()

    }, [])

    const getPost = async () => {
        console.log(id)
        const user = {
            id: id
        }
        const res = await axios.post("/posts/post", { user }, { withCredentials: true })
        setThisPost(res.data[0])
        console.log(thisPost)

    }

    const handleSubmit = async () => {
        const response = {
            creator: currentUser.username,
            responseContent: userInput,
            id: thisPost._id
        }
        const res = await axios.post("/posts/response", { response }, { withCredentials: true })
        setThisPost(res.data[0])
        window.location.reload()
    }

    return (
        <div className="post-detail">
            <div className="header">
                <button className="return-btn">
                    <Link to="/"><ArrowBackIosSharpIcon /></Link>
                </button>
                {thisPost ? <Post post={thisPost} users={users} disable={true} /> : ''}
            </div>
            <div className="body">
                {thisPost.response ? responses.map((response, index) => {
                    for (var i = 0; i < thisPost.response.length; i++) {
                        if (response._id === thisPost.response[i]) {
                            return <div className={`container ${response.creator === currentUser.username ? "self" : ""}`} key={index}><div className="avatar">
                                {users ? users.map((user, index) => {
                                    if (response.creator === user.username) {
                                        if (user.icon === '') {
                                            return <PersonIcon />
                                        } else {
                                            return <img key={index} src={user.icon}></img>
                                        }
                                    }
                                }

                                ) : ""}
                            </div>
                                <div className={`response`}>
                                    {response.responseContent}</div></div>

                        }
                    }
                }) : ""}

            </div>
            {
                isLoggedIn ?
                    <div className="reply-box">
                        <h2></h2>
                        <div className="avatar">
                            {
                                currentUser && currentUser.icon !== '' ? <img src={currentUser.icon}></img> : <PersonIcon />
                            }
                        </div>
                        <button className="reply-button">
                        </button>
                        <input placeholder="Your quick reply here" value={userInput} onChange={(e) => setUserInput(e.target.value)} className="input" type="text" />
                        <button className="send" onClick={() => handleSubmit()}>
                            <SendIcon />
                        </button>
                    </div> : ''
            }

        </div>
    )
}

export default PostsDetail

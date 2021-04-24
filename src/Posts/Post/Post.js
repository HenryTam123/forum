import React from 'react'
import PersonIcon from '@material-ui/icons/Person';
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';
import ThumbDownAltRoundedIcon from '@material-ui/icons/ThumbDownAltRounded';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { Link } from 'react-router-dom'
const Post = ({ post, users, disable }) => {


  return (
    <div className="post" >
      <div className="left">
        <div className="avatar">
          {users ? users.map((user, index) => {
            if (post.creator === user.username) {
              if (user.icon === '') {
                return <PersonIcon />
              } else {
                return <img key={index} src={user.icon}></img>
              }
            }
          }

          ) : ""}
        </div>
        <p className="post-author">{post.creator}</p>
      </div>

      <div className="description">
        {
          disable ?
            <div className="upper">
              <h2 className="post-name">{post.title}</h2>
            </div> :
            <div className="upper">
              <Link to={`post/${post._id}`}><h2 className="post-name">{post.title}</h2></Link>
            </div>
        }

        <div className="lower">
          <p className="post-time">posted on {post.createdAt ? post.createdAt.substring(0, 10) : ' '}</p>
          <div className="group">
            <div>
              <button className="like">
                <ThumbUpAltRoundedIcon />
              </button>
              <p className="like-count">{post.likeCount}</p>
            </div>
            <div>
              <button className="dislike">
                <ThumbDownAltRoundedIcon />
              </button>
              <p className="dislike-count">{post.dislikeCount}</p>
            </div>
            <div>
              <button className="comment">
                <ChatBubbleIcon />
              </button>
              <p className="comment-count">{post.response ? post.response.length : ''}</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Post

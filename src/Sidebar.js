import React, { useState } from 'react'
import SettingsIcon from '@material-ui/icons/Settings';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Sidebar = (
  { categories, changeCategory, currentCategory, isLoggedIn, handleRegister, handleLogin, currentUser, logout }
) => {

  return (
    <div className="sidebar">
      <div className="upper">
        <div className="header">
          <h2>TJHKG (alpha)</h2>
          <button>
            <MenuRoundedIcon />
          </button>
        </div>

        {isLoggedIn ?
          <div className="personal-info">
            <div className="avatar">
              {currentUser.icon ?
                <img src={currentUser.icon}></img>
                : ''}
            </div>
            <div className="description">
              <p>{currentUser.username}</p>
              <p className="level">Level {currentUser.level}</p>
            </div>
          </div> :
          <div className="personal-info">
            <div className="avatar">
              <PersonIcon />

            </div>
            <div className="description">
              <p>Anonymous</p>
            </div>
          </div>}

        {isLoggedIn ?
          <div className="button-group">
            <button ><QuestionAnswerIcon /></button>
            <button ><PersonIcon /></button>
            <button ><ExitToAppIcon onClick={() => logout()} /></button>
            <button ><SettingsIcon /></button>
          </div> :
          <div className="button-group">
            <button className="register-btn" onClick={() => handleRegister(true)}>Register</button>
            <button className="register-btn" onClick={() => handleLogin(true)}>Sign in</button>

          </div>}

      </div>
      <div className="lower">
        {categories.map((category, index) => (
          <div className={`category ${category.category === currentCategory ? "selected" : ""}`} key={index} onClick={() => changeCategory(category.category)}>
            <h2>{category.category.charAt(0).toUpperCase() + category.category.slice(1)}</h2>
            <p className="post-count">{category.posts.length} Posts</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Sidebar

import React, { useState } from 'react'


const LoginForm = ({ handleLogin, login, err }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        login(username, password)
    }

    return (
        <div className="form-container">
            <div className="overlay-background" onClick={() => handleLogin(false)}></div>
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login with your account </h2>
                <label>Username <span className="warning">{err}</span><input autoComplete="off" type="text" name="username" value={username} required onChange={(e) => setUsername(e.target.value)}></input></label>
                <label>Password <input autoComplete="off" type="password" name="password" value={password} required onChange={(e) => setPassword(e.target.value)}></input></label>
                <div className="button-group">
                    <button type="button" className="cancel-btn" onClick={() => handleLogin(false)}>Cancel</button>
                    <button type="submit" className="submit-btn" >Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm

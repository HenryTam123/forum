import React, { useState } from 'react'
import axios from './axios'
import FileBase from 'react-file-base64'


const RegisterForm = ({ handleRegister }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [selectedFile, setSelectedFile] = useState('')
    const [usernameAlert, setUsernameAlert] = useState('')
    const [passwordAlert, setPasswordAlert] = useState('')


    const submitRegister = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setPasswordAlert("Password is different from Confirm Password ")
        } else {
            const data = {
                username: username,
                password: password,
                icon: selectedFile
            }
            axios.post('/register', data)
                .then(res => {
                    console.log(res.data.success)
                    if (res.data.success === 'true') {
                        window.location.href = '/'
                    } else {
                        setUsernameAlert(res.data.message)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    };
    return (
        <div className="form-container">
            <div className="overlay-background" onClick={() => handleRegister(false)}></div>
            <form className="register-form" onSubmit={(e) => submitRegister(e)}>
                <h2>Create a new account</h2>
                <label>Username
                    <span>{usernameAlert !== '' ? `(${usernameAlert})` : ''}</span>
                    <input autoComplete="off" type="text" name="username" value={username} required onChange={(e) => setUsername(e.target.value)}></input></label>
                <label>Password
                    <span>{passwordAlert !== '' ? `(${passwordAlert})` : ''}</span>
                    <input autoComplete="off" type="password" name="password" value={password} required onChange={(e) => setPassword(e.target.value)}>
                    </input>
                </label>
                <label>Confirm Password <input autoComplete="off" type="password" name="confirm-password" value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)}></input></label>
                <div className="filebase-div">
                    <label>Choose Your Favourite Icon
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => { setSelectedFile(base64) }} />
                    </label>
                </div>
                <div className="button-group">
                    <button type="button" className="cancel-btn" onClick={() => handleRegister(false)}>Cancel</button>
                    <button type="submit" className="submit-btn">Register</button>
                </div>
            </form>
        </div>


    )
}

export default RegisterForm

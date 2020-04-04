import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const Login = () => {
    return (
        <div>
            <h1>Login page</h1>
            <form>
                <TextField
                    style={{ marginBottom: '20px' }}
                    required
                    id="standard-required"
                    label="Username"
                    name="username"
                    //value={userDetails.username}
                    //onChange={handleChange()}
                />
                <TextField required
                    id="standard-password-input"
                    label="Password"
                    name="password"
                    type="password"
                    //value={userDetails.password}
                   // onChange={handleChange()}
                />
                <div className="button">
                    <Button type="submit" variant="contained">login</Button>
                </div>
            </form>
        </div>
    )
}

export default Login
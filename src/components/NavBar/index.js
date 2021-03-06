import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import { UserContext } from '../../store/UserContext'

import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'



const NavBar = () => {
    const user = useContext(UserContext)
    const [isLoggedIn, setIsLoggedIn] = user.isLoggedIn
    const [userName, setUserName] = user.userName


    useEffect(() => {
        const checkLogin = async () => {
            const response = await fetch('/users/status')
            const textResponse = await (response.json())
            if (textResponse.loggedIn) {
                setIsLoggedIn(true)
                setUserName(textResponse.user.username)
            }
        }
        checkLogin();
    }, [isLoggedIn, setIsLoggedIn, setUserName])

    const logOut = async () => {
        await fetch('/users/logout', { method: "POST" })
            .then(
                response => {
                    if (response.ok) {
                        setIsLoggedIn(false)
                    }
                }
            )
    }

    return (
        <div>
            <AppBar position="relative">
                <Toolbar>
                    <div style={{ flexGrow: "1" }}>
                        <Link to="/events"><Button style={{ color: "#ffff" }}>Events</Button ></Link>
                        <Link to="/dashboard"><Button style={{ color: "#ffff" }}>Dashboard</Button ></Link>
                    </div>
                    {
                        isLoggedIn ?
                            <div className="navbar-login">
                                <div>{userName}</div>
                                <Typography>
                                    <Button onClick={logOut} style={{ color: "#ffff" }}>
                                        Logout
                                </Button>
                                </Typography>
                            </div>
                            :
                            <div>
                                <Link to={`/`}>
                                    <Button style={{ color: "#ffff" }}>
                                        Login
                                </Button>
                                </Link>
                            </div>
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar

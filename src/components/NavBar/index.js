import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import { UserContext } from '../../store/UserContext'

import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'



const NavBar = () => {
    const user = useContext(UserContext)
    const [isLoggedIn, setIsLoggedIn] = user.isLoggedIn
    const [userName, setUserName] = useState(null)

    
    useEffect(() => {
        console.log("context-user", isLoggedIn)
        const checkLogin = async () => {
            // setFetchData(true)
            let response = await fetch('/users/status')
            //     .catch(error => {
            //         console.log("error", error)
            //         setFetchData(false)
            //         setFetchError(error)
            //     })
            // if (!response.ok) {
            //     // setFetchData(false)
            //     console.log(response.statusText)
            //     return setFetchError(response.statusText)
            // }
            // console.log(response)
            let textResponse = await (response.json())
            console.log("is logged in ", textResponse)
            if (textResponse.loggedIn) {
                setIsLoggedIn(true)
                setUserName(textResponse.user.username)
            }
            // setFetchData(false)
        }
        checkLogin();
    }, [ isLoggedIn])

    const logOut = async () => {
        let response = await fetch('/users/logout', { method: "POST" })
            .then(
                response => {
                    console.log(response)
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
                    {/* <Typography variant="h6" noWrap> */}
                    <div style={{ flexGrow: "1" }}>
                        <Link to="/events"><Button style={{ color: "#ffff" }}>Events</Button ></Link>
                        <Link to="/dashboard"><Button style={{ color: "#ffff" }}>Dashboard</Button ></Link>
                    </div>
                    {/* </Typography> */}
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

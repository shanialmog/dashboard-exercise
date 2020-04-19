import React, { useState, useContext } from 'react'
import { useHistory } from "react-router-dom"

import { UserContext } from '../../store/UserContext'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const Login = () => {

    let history = useHistory()
    const user = useContext(UserContext)
    const [_isLoggedIn, setIsLoggedIn] = user.isLoggedIn
    const [userName, setUserName] = user.userName
    const [tempUserName, setTempUserName] = useState(null)
    const [password, setPassword] = useState('')
    const [fetchData, setFetchData] = useState(false)
    const [fetchError, setFetchError] = useState(null)

    // useEffect(() => {
    //     setFetchError('')
    //     const isLoggedIn = async () => {
    //         setFetchData(true)
    //         let response = await fetch('/users/status')
    //             .catch(error => {
    //                 console.log("error", error)
    //                 setFetchData(false)
    //                 setFetchError(error)
    //             })
    //         if (!response.ok) {
    //             setFetchData(false)
    //             console.log(response.statusText)
    //             return setFetchError(response.statusText)
    //         }
    //         // console.log(response)
    //         let textResponse = await (response.json())
    //         // console.log("is logged in ", textResponse)
    //         setLoggedIn(true)
    //         setUserName(textResponse.user.username)
    //         setFetchData(false)
    //     }
    //     isLoggedIn();
    // }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        if (name === 'userName') {
            setTempUserName(value)
        } else { setPassword(value) }
        console.log("tempUserName",tempUserName)
        console.log("userName",userName)
    }

    const LogIn = async () => {
        // console.log(fetchError)
        setFetchError('')
        setFetchData(true)
        const requestLogin = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "username": tempUserName, password })
        }
        console.log(requestLogin)
        await fetch(`/users/login`, requestLogin)
            .then(
                response => {
                    console.log(response, response.ok, response.ok===true)
                    if (response.ok) {
                        setFetchData(false)
                        setIsLoggedIn(true)
                        console.log("pp")
                        setUserName(tempUserName)
                        return history.push('/events')
                    } else {
                        setFetchData(false)
                        console.log(response)
                        return setFetchError(response.statusText)
                        // setFetchError(response.statusText)
                        // return console.log(fetchError)
                    }
                }
            ).catch(error => {
                setFetchData(false)
                setFetchError(error)
            })
    }


    return (
        <div>
            <h1>Login page</h1>
            {fetchData ?
                <CircularProgress color="secondary" />
                :
                <div>
                    <form onSubmit={handleSubmit} noValidate>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '30px' }}>
                            <div>
                                <TextField
                                    style={{ width: '200px' }}
                                    required
                                    id="standard-required"
                                    label="Username"
                                    name="userName"
                                    value={userName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <TextField required
                                    style={{ marginBottom: '60px', width: '200px' }}
                                    id="standard-password-input"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="button">
                            <Button type="submit" onClick={LogIn} variant="contained">login</Button>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}

export default Login
import React, { useEffect } from 'react'
import { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import CircularProgress from '@material-ui/core/CircularProgress'
import Alert from '@material-ui/lab/Alert'

import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom"



const Event = ({ match, location }) => {
    const { params: { eventId } } = match
    let history = useHistory()

    const [event, setEvent] = useState({})
    const [edit, setEdit] = useState(false)
    const [fetchData, setFetchData] = useState(false)
    const [fetchError, setFetchError] = useState('')


    useEffect(() => {
        const eventFetch = async () => {
            setFetchData(true)
            // setFetchError('')
            let response = await fetch(`/events/${eventId}`)
                .catch(error => {
                    console.log("error", error)
                    setFetchData(false)
                    setFetchError(error)
                })
            if (!response.ok) {
                setFetchData(false)
                console.log(response.statusText)
                return setFetchError(response.statusText)
            }
            let textResponse = await (response.json())
            setFetchData(false)
            setEvent(textResponse)
        }
        eventFetch();
    }, [edit])

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setEvent(prevState => ({ ...prevState, [name]: value }))
    }

    const updateEvent = async () => {
        setFetchData(true)
        const requestEdit = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(event)
        }
        console.log("requestedit", requestEdit)
        await fetch(`/events/${eventId}`, requestEdit)
            .then(
                response => {
                    if (response.ok) {
                        setFetchData(false)
                        setEdit(false)
                    } else {
                        setFetchData(false)
                        console.log("response", response.statusText)
                        console.log(fetchError)
                        return setFetchError(response.statusText)
                    }
                }
            ).catch(error => {
                setFetchData(false)
                setEdit(false)
                setFetchError(error)
            })
    }

    const deleteEvent = async () => {
        setFetchData(true)
        const requestEdit = {
            method: "DELETE",
        }
        console.log("requestedit", requestEdit)
        await fetch(`/events/${eventId}`, requestEdit)
            .then(
                response => {
                    if (response.ok) {
                        setFetchData(false)
                        setEdit(false)
                        return history.push('/events')
                    } else {
                        setFetchData(false)
                        console.log("response", response.statusText)
                        console.log(fetchError)
                        return setFetchError(response.statusText)
                    }
                }
            ).catch(error => {
                setFetchData(false)
                setEdit(false)
                setFetchError(error)
            })
    }

    const cancelEditEvent = () => {
        setEdit(false)
    }


    console.log("event", event)
    console.log(edit)

    return (
        <div>
            {fetchData ?
                <CircularProgress color="secondary" />
                :
                <div>
                    {edit ?
                        <div className="event-cont">
                            <h1>Edit event</h1>
                            {fetchError &&
                                <Alert variant="filled" severity="error">
                                    {fetchError}
                                </Alert>
                            }
                            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                                <div style={{ marginBottom: '40px', display: 'flex', flexDirection: 'column' }}>
                                    <TextField
                                        style={{ marginBottom: '20px' }}
                                        required
                                        id="standard-required"
                                        label="Title"
                                        name="title"
                                        value={event.title}
                                        onChange={handleChange}
                                    />
                                    <TextField required
                                        id="standard-password-input"
                                        label="Summary"
                                        name="summary"
                                        value={event.summary}
                                        multiline
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="button-cont">
                                    <div>
                                        <Button onClick={deleteEvent} color="secondary" variant="contained">Delete</Button>
                                    </div>
                                    <div>
                                        <Button onClick={cancelEditEvent} color="primary" variant="contained">Cancel</Button>
                                    </div>
                                    <div>
                                        <Button onClick={updateEvent} color="primary" variant="contained">Update</Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        :
                        <div className="event-cont">
                            {fetchError &&
                                <Alert variant="filled" severity="error">
                                    {fetchError}
                                </Alert>
                            }
                            <div className="event-title-cont">
                                <div>
                                    <Link to={`/events/`}>
                                        <IconButton edge="end" color="inherit">
                                            <ArrowBackIosIcon />
                                        </IconButton>
                                    </Link>
                                </div>
                                <div className="event-title">
                                    {event.topics ?
                                        <span className="event-label">{event.topics}</span>
                                        :
                                        <span className="event-label">General</span>
                                    }
                                    <h1>{event.title}</h1>
                                    <IconButton onClick={() => setEdit(true)} edge="end" color="inherit">
                                        <EditIcon />
                                    </IconButton>
                                </div>
                            </div>
                            <Typography variant="h6" gutterBottom>
                                {event.summary}
                            </Typography>
                            {/*display the match and location props from Router-dom}
                    {/* <p>
                        <strong>Match Props: </strong>
                        <code>{JSON.stringify(match, null, 2)}</code>
                    </p>
                    <p>
                        <strong>Location Props: </strong>
                        <code>{JSON.stringify(location)}</code>
                    </p> */}
                        </div>
                    }
                </div>
            }
        </div>
    )
}



export default Event
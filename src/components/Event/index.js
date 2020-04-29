import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom"

import { UserContext } from '../../store/UserContext'

import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import CircularProgress from '@material-ui/core/CircularProgress'
import Alert from '@material-ui/lab/Alert'
import Input from '@material-ui/core/Input'



const Event = ({ match, location }) => {
    const { params: { eventId } } = match
    let history = useHistory()

    const user = useContext(UserContext)
    const [isLoggedIn] = user.isLoggedIn
    const [event, setEvent] = useState({ title: "", summary: "", thumbnail: "", topics: [] })
    const [tempEvent, setTempEvent] = useState({ title: "", summary: "", thumbnail: "", topics: [] })
    const [edit, setEdit] = useState(false)
    const [fetchData, setFetchData] = useState(false)
    const [fetchError, setFetchError] = useState(null)
    const isValid = tempEvent.title.length > 0 && tempEvent.summary.length > 0


    useEffect(() => {
        setFetchError('')
        const eventFetch = async () => {
            setFetchData(true)
            const response = await fetch(`/events/${eventId}`)
                .catch(error => {
                    console.log("error", error)
                    setFetchData(false)
                    setFetchError(error)
                })
            if (!response.ok) {
                setFetchData(false)
                return setFetchError(response.statusText)
            }
            const textResponse = await (response.json())
            setFetchData(false)
            setEvent(textResponse)
            setTempEvent(textResponse)
        }
        eventFetch();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        if (name === "topics") {
            const topics = value.split(',')
            setTempEvent(prevState => ({ ...prevState, [name]: topics }))
        } else {
            setTempEvent(prevState => ({ ...prevState, [name]: value }))
        }
    }

    const updateEvent = async () => {
        setFetchError('')
        setFetchData(true)
        const requestEdit = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tempEvent)
        }
        console.log("requestedit", requestEdit)
        await fetch(`/events/${eventId}`, requestEdit)
            .then(
                response => {
                    if (response.ok) {
                        setFetchData(false)
                        setEdit(false)
                        setEvent(tempEvent)
                    } else {
                        setFetchData(false)
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
        setFetchError('')
        setFetchData(true)
        const requestEdit = {
            method: "DELETE",
        }
        await fetch(`/events/${eventId}`, requestEdit)
            .then(
                response => {
                    if (response.ok) {
                        setFetchData(false)
                        setEdit(false)
                        return history.push('/events')
                    } else {
                        setFetchData(false)
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

    const handleImageSelect = async (e) => {
        const selectedImage = e.target.files[0]
        const data = new FormData()
        data.append("image", selectedImage)
        const response = await fetch('/images/upload', {
            method: 'POST',
            body: data
        })
        const body = await (response.json())
        setTempEvent(prevstate => ({ ...prevstate, thumbnail: body.url }))
    }


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
                                <div style={{ marginBottom: '40', display: 'flex', flexDirection: 'column' }}>
                                    <TextField
                                        error={tempEvent.title.length === 0}
                                        style={{ marginBottom: '20' }}
                                        required
                                        label="Title"
                                        name="title"
                                        value={tempEvent.title}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        style={{ marginBottom: '20' }}
                                        label="Topics"
                                        name="topics"
                                        value={tempEvent.topics}
                                        multiline
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        error={tempEvent.summary.length === 0}
                                        style={{ marginBottom: '20' }}
                                        required
                                        label="Summary"
                                        name="summary"
                                        value={tempEvent.summary}
                                        multiline
                                        onChange={handleChange}
                                    />
                                    <Input
                                        name="thumbnail"
                                        label="Image"
                                        type="file"
                                        onChange={handleImageSelect}
                                    >
                                    </Input>
                                </div>
                                <div className="button-cont">
                                    <div>
                                        <Button onClick={deleteEvent} color="secondary" variant="contained">Delete</Button>
                                    </div>
                                    <div>
                                        <Button
                                            onClick={cancelEditEvent}
                                            color="primary"
                                            variant="contained"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                    <div>
                                        <Button
                                            disabled={!isValid}
                                            onClick={updateEvent}
                                            color="primary"
                                            variant="contained"
                                        >
                                            Update
                                        </Button>
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
                                    <div>
                                        {
                                            event.topics ?
                                                event.topics.map(topic => {
                                                    return <span key={topic} className="event-label">{topic}</span>
                                                })
                                                :
                                                <span className="event-label">General</span>
                                        }
                                    </div>
                                    <h1>{event.title}</h1>
                                    {
                                        isLoggedIn &&
                                        <IconButton onClick={() => { setEdit(true); setTempEvent(event) }} edge="end" color="inherit">
                                            <EditIcon />
                                        </IconButton>
                                    }
                                </div>
                            </div>
                            <p className="event-content">
                                {/* <div className="typo-summary"> */}
                                <img className="event-img" src={tempEvent.thumbnail} alt="event"></img>
                                <Typography variant="body1" >
                                    {event.summary}
                                </Typography>
                                {/* </div> */}
                            </p>
                        </div>
                    }
                </div>
            }
        </div>
    )
}



export default Event
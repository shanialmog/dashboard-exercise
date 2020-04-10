import React, { useEffect } from 'react'
import { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import { Link } from 'react-router-dom'



const Event = ({ match, location }) => {
    const { params: { eventId } } = match
    const [event, setEvent] = useState({})
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        const eventFetch = async () => {
            try {
                // setEventTitle(event)
                const response = await fetch(`/events/${eventId}`)
                const textResponse = await (response.json())
                // console.log("textResponse", textResponse)
                setEvent(textResponse)
            } catch (e) {
                // console.log(e)
                setEvent(event)
            }
        }
        eventFetch();
    }, [edit])

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setEvent(prevState => ({ ...prevState, [name]: value }))
        // console.log(name)
        // console.log(value)
    }

    const updateEvent = async () => {
        const requestEdit = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(event)
        }
        console.log("requestedit", requestEdit)
        await fetch(`/events/${eventId}`, requestEdit)
        setEdit(false)
    }

    const deleteEvent = async () => {
        const requestEdit = {
            method: "DELETE",
        }
        console.log("requestedit", requestEdit)
        await fetch(`/events/${eventId}`, requestEdit)
        setEdit(false)
    }

    const cancelEditEvent = () => {
        setEdit(false)
    }

    // const handleClickEdit = () => {
    //     setEdit(true)
    // }

    console.log("event", event)
    console.log(edit)

    return (
        <div>
            {edit ?
                <div className="event-cont">
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
                                <Link to={`/events/`}>
                                    <Button onClick={deleteEvent} color="secondary" variant="contained">Delete</Button>
                                </Link>
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
    )
}



export default Event
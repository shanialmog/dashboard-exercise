import React, { useEffect } from 'react'
import { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'



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
                console.log("textResponse", textResponse)
                setEvent(textResponse)
            } catch (e) {
                console.log(e)
                setEvent(event)
            }
        }
        eventFetch();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setEvent(prevState => ({ ...prevState, [name]: value }))
        console.log(name)
        console.log(value)
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
                        <div className="button" style={{ marginTop: '20px' }}>
                            {/* <Button onClick={() => updateEvent} variant="contained">Update</Button> */}
                            <Button variant="contained">Update event</Button>
                        </div>
                    </form>
                </div>
                :
                <div className="event-cont">
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
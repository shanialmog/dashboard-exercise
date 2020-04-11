import React from 'react'
import { useState } from 'react'

import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
// import Typography from '@material-ui/core/Typography'


const NewEvent = () => {

    const [event, setEvent] = useState({ title: "Enter title", summary: "Enter summary" })
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setEvent(prevState => ({ ...prevState, [name]: value }))
        console.log(name)
        console.log(value)
    }

    const saveEvent = async () => {
        const requestAdd = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(event)
        }
        await fetch(`/events`, requestAdd)
    }

    return (
        <div className="event-cont">
            <h1>New event</h1>
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
                            <Button color="secondary" variant="contained">Cancel</Button>
                        </Link>
                    </div>
                    <div>
                        <Link to={`/events/`}>
                            <Button onClick={saveEvent} color="primary" variant="contained">Save</Button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}


export default NewEvent
import React from 'react'
import { useState } from 'react'

import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom"

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import Alert from '@material-ui/lab/Alert'


const NewEvent = () => {

    let history = useHistory()
    const [event, setEvent] = useState({ title: "Enter title", summary: "Enter summary", topics: ["Enter topics"] })
    const [fetchData, setFetchData] = useState(false)
    const [fetchError, setFetchError] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setEvent(prevState => ({ ...prevState, [name]: value }))
    }

    const saveEvent = async () => {
        setFetchError('')
        setFetchData(true)
        const requestAdd = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(event)
        }
        await fetch(`/events`, requestAdd)
            .then(
                response => {
                    if (response.ok) {
                        setFetchData(false)
                        return history.push('/events')
                    } else {
                        setFetchData(false)
                        console.log(response)
                        return setFetchError(response.statusText)
                    }
                }
            ).catch(error => {
                setFetchData(false)
                setFetchError(error)
            })
    }

    return (
        <div>
            {fetchData ?
                <CircularProgress color="secondary" />
                :
                <div className="event-cont">
                    {fetchError &&
                        <Alert variant="filled" severity="error">
                            {fetchError}
                        </Alert>
                    }
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
                            <TextField
                                style={{ marginBottom: '20px' }}
                                id="standard"
                                label="Topics"
                                name="topics"
                                value={event.topics}
                                multiline
                                onChange={handleChange}
                            />
                            <TextField
                                required
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
                                <Button onClick={saveEvent} color="primary" variant="contained">Save</Button>
                            </div>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}


export default NewEvent
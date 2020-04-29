import React from 'react'
import { useState } from 'react'

import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom"

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import Alert from '@material-ui/lab/Alert'
import Input from '@material-ui/core/Input'


const NewEvent = () => {

    let history = useHistory()
    const [event, setEvent] = useState({ title: "", summary: "", thumbnail: "", topics: [] })
    const [fetchData, setFetchData] = useState(false)
    const [fetchError, setFetchError] = useState(null)
    const isValid = event.title.length > 0 && event.summary.length > 0

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === "topics") {
            const topics = value.split(',')
            setEvent(prevState => ({ ...prevState, [name]: topics }))
        } else {
            setEvent(prevState => ({ ...prevState, [name]: value }))
        }
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
    const handleImageSelect = async (e) => {
        const selectedImage = e.target.files[0]
        const data = new FormData()
        data.append("image", selectedImage)
        const response = await fetch('/images/upload', {
            method: 'POST',
            body: data
        })
        const body = await (response.json())
        setEvent(prevstate => ({ ...prevstate, thumbnail: body.url }))
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
                        <div style={{ marginBottom: 40, display: 'flex', flexDirection: 'column' }}>
                            <TextField
                                error={!event.title}
                                style={{ marginBottom: 20 }}
                                required
                                label="Title"
                                name="title"
                                value={event.title}
                                onChange={handleChange}
                                placeholder="Add title"
                            />
                            <TextField
                                error={!event.topics}
                                style={{ marginBottom: 20 }}
                                label="Topics"
                                name="topics"
                                value={event.topics}
                                multiline
                                onChange={handleChange}
                                placeholder="Add topics"
                            />
                            <TextField
                                error={!event.summary}
                                style={{ marginBottom: 20 }}
                                required
                                label="Summary"
                                name="summary"
                                value={event.summary}
                                placeholder="Add summary"
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
                            {/* <Button
                                color="primary"
                                onClick={uploadImage}
                            >
                                Upload
                            </Button> */}
                        </div>
                        <div className="button-cont">
                            <div>
                                <Link to={`/events/`}>
                                    <Button color="secondary" variant="contained">Cancel</Button>
                                </Link>
                            </div>
                            <div>
                                <Button
                                    disabled={!isValid}
                                    onClick={saveEvent}
                                    color="primary"
                                    variant="contained"
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}


export default NewEvent
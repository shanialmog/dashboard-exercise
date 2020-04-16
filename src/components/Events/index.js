import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import Alert from '@material-ui/lab/Alert'

import { Link } from 'react-router-dom'

const EventsList = () => {
    const [events, setEventsList] = useState([])
    const [fetchData, setFetchData] = useState(false)
    const [fetchError, setFetchError] = useState(null)

    useEffect(() => {
        setFetchError('')
        const eventsFetch = async () => {
            setEventsList(events)
            setFetchData(true)
            let response = await fetch('/events')
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
            setEventsList(textResponse)
            setFetchData(false)
        }
        eventsFetch();
    }, [])


    console.log("events", events)
    return (
        <div>
            {fetchData ?
                <div>
                    <h1>Events</h1>
                    <CircularProgress color="secondary" />
                </div>
                :
                fetchError ?
                    <div>
                        <div>
                            <h1>Events</h1>
                        </div>
                        <Alert variant="filled" severity="error">
                            {fetchError}
                        </Alert>
                    </div>
                    :
                    <div>
                        <div className="events-title-cont">
                            <div>
                                <h1>Events</h1>
                            </div>
                            <div>
                                <Link to={`/newevent`}>
                                    <IconButton edge="end" color="primary">
                                        <AddCircleIcon fontSize="large" />
                                    </IconButton>
                                </Link>
                            </div>
                        </div>
                        <div>
                            {events.map(item => {
                                return (
                                    <div key={item.id}>
                                        <Link to={`/events/${item.id}`}>
                                            <Button>{item.title}</Button>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
            }
        </div>
    )
}

export default EventsList
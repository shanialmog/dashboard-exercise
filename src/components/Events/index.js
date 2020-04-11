import React, { useEffect } from 'react'
import { useState } from 'react'
import Button from '@material-ui/core/Button'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress'

import { Link } from 'react-router-dom'

const EventsList = () => {
    const [events, setEventsList] = useState([])
    const [fetchData, setFetchData] = useState(false)

    useEffect(() => {
        const eventsFetch = async () => {
            try {
                setEventsList(events)
                setFetchData(true)
                const response = await fetch('/events')
                const textResponse = await (response.json())
                // console.log(textResponse)
                setEventsList(textResponse)
                setFetchData(false)
            } catch (e) {
                // console.log(e)
                setEventsList(events)
                setFetchData(false)
            }
        }
        eventsFetch();
    }, [])


    console.log("events", events)
    return (
        <div>
            {fetchData ?
                <CircularProgress color="secondary" />
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
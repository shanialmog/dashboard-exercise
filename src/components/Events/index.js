import React, { useEffect } from 'react'
import { useState } from 'react'
import Button from '@material-ui/core/Button'

import { Link } from 'react-router-dom'
import Event from '../Event'



const EventsList = () => {
    const [events, setEventsList] = useState([])
    const [status, setStatus] = useState({ isFetching: false })

    useEffect(() => {
        const eventsFetch = async () => {
            try {
                setEventsList(events)
                setStatus({ isFetching: true })
                const response = await fetch('/events')
                const textResponse = await (response.json())
                console.log(textResponse)
                setEventsList(textResponse)
                setStatus({ isFetching: false })
            } catch (e) {
                console.log(e)
                setEventsList(events)
                setStatus({ isFetching: false })
            }
        }
        eventsFetch();
    }, [])


    console.log("events", events)
    return (
        <div>
            <h1>Events</h1>
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
    )
}

export default EventsList
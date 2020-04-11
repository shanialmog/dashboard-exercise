import React, { useEffect } from 'react'
import { useState } from 'react'
import Button from '@material-ui/core/Button'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import IconButton from '@material-ui/core/IconButton'

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

    // const addEvent = async () => {
    //     const newEvent =
    //     {
    //         title: "Event title",
    //         summary: "Event summary"
    //     }
    //     const requestAdd = {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(newEvent)
    //     }
    //     console.log("requestedit", requestAdd)
    //     await fetch(`/events`, requestAdd).then(response =>
    //         response.text()
    //     ).then(
    //         data => setEventsList({
    //             title: "Event title",
    //             summary: "Event summary",
    //             id: data.id
    //         })
    //     )
    //     console.log(events)
    // }


    console.log("events", events)
    return (
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
    )
}

export default EventsList
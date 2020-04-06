import React, { useEffect } from "react"
import { useState } from 'react'


const EventsList = () => {
    const [events, setEventsList] = useState({eventsList: [], isFetching: false})

    useEffect(() => {
        const eventsFetch = async () => {
            try {
                setEventsList({eventsList: events.eventsList, isFetching: true})
                const response = await fetch('/events')
                const textResponse = await (response.json())
                console.log(textResponse)
                setEventsList({eventsList: textResponse, isFetching: false})
            } catch (e) {
                console.log(e)
                setEventsList({eventsList: events.eventsList, isFetching: false})
            }
        }
        eventsFetch();
    }, [])


    console.log("events", events)
    return (
        <div>
            <h1>Events</h1>
            <div>
                {events.eventsList.map(item => {
                return (
                    <div>{item.title}</div>
                )
            })}
            </div>
        </div>
    )
}

export default EventsList
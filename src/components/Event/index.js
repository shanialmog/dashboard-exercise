import React, { useEffect } from 'react'
import { useState } from 'react'



const Event = ({ match, location }) => {
    const { params: { eventId } } = match
    const [event, setEvent] = useState({})

    useEffect(() => {
        const eventFetch = async () => {
            try {
                // setEventTitle(event)
                const response = await fetch(`/events/${eventId}`)
                const textResponse = await (response.json())
                console.log("textResponse",textResponse)
                setEvent(textResponse)
            } catch (e) {
                console.log(e)
                setEvent(event)
            }
        }
        eventFetch();
    }, [])

    console.log("event", event)

    return (
        <div>
            <h1>{event.title}</h1>
            <p>{event.summary}</p>
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
    )
}



export default Event
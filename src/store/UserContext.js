import React, { useState } from 'react'

export const UserContext = React.createContext(null)

export default ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const store = {
        isLoggedIn: [isLoggedIn, setIsLoggedIn]
    }
    return <UserContext.Provider value={store}>{children}</UserContext.Provider>
}

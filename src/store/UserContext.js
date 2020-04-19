import React, { useState } from 'react'

export const UserContext = React.createContext(null)

export default ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userName, setUserName] = useState(null)

    const store = {
        isLoggedIn: [isLoggedIn, setIsLoggedIn],
        userName: [userName, setUserName]
    }
    return <UserContext.Provider value={store}>{children}</UserContext.Provider>
}

import React from 'react'

import { Link } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'


const NavBar = () => {
    return (
        <div>
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        <Link to="/events"><Button style={{ color: "#ffff" }}>Events</Button ></Link>
                        <Link to="/dashboard"><Button style={{ color: "#ffff" }}>Dashboard</Button ></Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar

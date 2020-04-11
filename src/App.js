import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'

import Login from './components/Login'
import EventsList from './components/Events'
import Event from './components/Event'
import Dashboard from './components/Dashboard'
import NewEvent from './components/NewEvent'

function App() {
  return (
    <div>
      <CssBaseline />
      <div className="container">
        <Router>
          <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/dashboard' exact component={Dashboard} />
            <Route path='/events' exact component={EventsList} />
            <Route path='/events/:eventId' exact component={Event} />
            <Route path='/newevent' exact component={NewEvent} />
          </Switch>
        </Router>
      </div>
    </div>
  )
}

export default App

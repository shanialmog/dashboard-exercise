import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'

import Login from './components/Login'
import EventsList from './components/Events'
import Event from './components/Event'
import Dashboard from './components/Dashboard'

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
          </Switch>
        </Router>
      </div>
    </div>
  )
}

export default App

import React from 'react'
import Dashboard from './components/dashboard'
import Login from './components/login'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'

function App() {
  return (
    <div>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/dashboard' exact component={Dashboard} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
